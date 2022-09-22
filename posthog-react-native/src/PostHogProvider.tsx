import React, { useCallback, useEffect, useRef } from 'react'
import { GestureResponderEvent, StyleProp, View, ViewStyle } from 'react-native'
import { PostHog, PostHogOptions } from './posthog-rn'
import { autocaptureFromTouchEvent } from './autocapture'
import { useNavigationTracker } from './hooks/useNavigationTracker'
import { useLifecycleTracker } from './hooks/useLifecycleTracker'
import { PostHogContext } from './PosthogContext'
import { PostHogAutocaptureOptions } from './types'
import ViewShot, { captureRef } from 'react-native-view-shot'
import {
  createFullSnapshotEvent,
  createInitialSnapshotEvent,
  createTouchEndSnapshotEvent,
  createTouchMoveSnapshotEvent,
  createTouchStartSnapshotEvent,
} from './session-recordings'
import { generateUUID } from 'posthog-core/src/utils'

export interface PostHogProviderProps {
  children: React.ReactNode
  options?: PostHogOptions
  apiKey?: string
  client?: PostHog
  autocapture?: boolean | PostHogAutocaptureOptions
  style?: StyleProp<ViewStyle>
}

function PostHogNavigationHook({ options }: { options?: PostHogAutocaptureOptions }): JSX.Element | null {
  useNavigationTracker(options?.navigation)
  return null
}

function PostHogLifecycleHook(): JSX.Element | null {
  useLifecycleTracker()
  return null
}

export const PostHogProvider = ({
  children,
  client,
  options,
  apiKey,
  autocapture,
  style,
}: PostHogProviderProps): JSX.Element => {
  const posthogRef = useRef<PostHog>()
  const viewshotRef = useRef<ViewShot>()
  const windowIdRef = useRef<string>(generateUUID())
  const touchTimeBaseline = useRef<number>(0)
  const touchPositions = useRef<any[]>([])

  if (!posthogRef.current) {
    posthogRef.current = client ? client : apiKey ? new PostHog(apiKey, options) : undefined
  }

  const autocaptureOptions = autocapture && typeof autocapture !== 'boolean' ? autocapture : {}

  const posthog = posthogRef.current
  const captureTouches = posthog && (autocapture === true || autocaptureOptions?.captureTouches)
  const captureScreens = posthog && (autocapture === true || (autocaptureOptions?.captureScreens ?? true)) // Default to true if not set
  const captureLifecycle = posthog && (autocapture === true || (autocaptureOptions?.captureLifecycleEvents ?? true)) // Default to true if not set

  const onTouchEnd = (): void => {
    const totalOffset = Date.now() - touchTimeBaseline.current

    const positions = touchPositions.current.map((p) => {
      p.timeOffset -= totalOffset
      return p
    })

    posthog?.snapshot({ $snapshot_data: createTouchMoveSnapshotEvent(positions) })
    console.log(JSON.stringify(createTouchMoveSnapshotEvent(positions), null, 2))

    touchPositions.current = []
    touchTimeBaseline.current = 0
  }

  const onTouch = useCallback(
    (type: 'start' | 'move' | 'end', e: GestureResponderEvent) => {
      // TODO: Improve this to ensure we only capture presses and not just ends of a drag for example

      console.log(type, e.nativeEvent.pageX, e.nativeEvent.pageY)
      if (!captureTouches) {
        return
      }

      // TODO: Handle multi touches
      if (type === 'start') {
        touchTimeBaseline.current = Date.now()
        posthog?.snapshot({
          $snapshot_data: createTouchStartSnapshotEvent(e.nativeEvent.pageX, e.nativeEvent.pageY),
        })
      }

      touchPositions.current.push({
        x: e.nativeEvent.pageX,
        y: e.nativeEvent.pageY,
        timeOffset: Date.now() - touchTimeBaseline.current,
      })

      if (type === 'end') {
        onTouchEnd()
        autocaptureFromTouchEvent(e, posthog, autocaptureOptions)
        posthog?.snapshot({
          $snapshot_data: createTouchEndSnapshotEvent(e.nativeEvent.pageX, e.nativeEvent.pageY),
        })
      }
    },
    [posthog, autocapture]
  )

  // Session Recording EXPERIMENTAL

  useEffect(() => {
    let previousData: string = ''

    posthog?.resetSessionId()
    posthog?.register({ $window_id: windowIdRef.current })
    posthog?.snapshot({ $snapshot_data: createInitialSnapshotEvent() })

    const interval = setInterval(() => {
      captureRef(viewshotRef, {
        result: 'data-uri',
        format: 'png',
      }).then((data) => {
        if (data === previousData) {
          previousData = data
          return
        }

        previousData = data

        posthog?.snapshot({ $snapshot_data: createFullSnapshotEvent(data) })
      })
    }, 1000)

    return () => clearInterval(interval)
  })

  return (
    <ViewShot ref={viewshotRef as any} style={{ flex: 1 }}>
      <View
        ph-label="PostHogProvider"
        style={style || { flex: 1 }}
        onTouchStart={captureTouches ? (e) => onTouch('start', e) : undefined}
        onTouchMove={captureTouches ? (e) => onTouch('move', e) : undefined}
        onTouchEndCapture={captureTouches ? (e) => onTouch('end', e) : undefined}
      >
        <PostHogContext.Provider value={{ client: posthogRef.current }}>
          <>
            {captureScreens ? <PostHogNavigationHook options={autocaptureOptions} /> : null}
            {captureLifecycle ? <PostHogLifecycleHook /> : null}
          </>
          {children}
        </PostHogContext.Provider>
      </View>
    </ViewShot>
  )
}
