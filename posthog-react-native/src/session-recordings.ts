import { Dimensions } from 'react-native'

export const createInitialSnapshotEvent = (): any => {
  return {
    type: 4, // Information
    data: {
      href: 'com.mealyo.app://Screen1',
      width: Dimensions.get('window').width,
      height: Dimensions.get('window').height,
    },
    timestamp: Date.now(),
  }
}

/**
 *
 * @returns A full snapshot simulating a browser page by rendering a "body" with a single background image of the page
 */
export const createFullSnapshotEvent = (base64Image: string): any => {
  base64Image = base64Image.replace(/(\n|\r)/g, '')
  return {
    type: 2,
    data: {
      node: {
        type: 0,
        childNodes: [
          {
            type: 1,
            name: 'html',
            publicId: '',
            systemId: '',
            id: 2,
          },
          {
            type: 2,
            tagName: 'html',
            attributes: {
              lang: 'en',
            },
            childNodes: [
              {
                type: 2,
                tagName: 'body',
                attributes: {
                  style: `background-image: url("${base64Image}");`,
                },
                id: 4,
              },
            ],
            id: 3,
          },
        ],
        id: 1,
      },
      initialOffset: {
        left: 0,
        top: 0,
      },
    },
    timestamp: Date.now(),
  }
}

export const createConsoleLogSnapshotEvent = (event: any): any => {
  return {
    type: 6,
    data: {
      plugin: 'rrweb/console@1',
      payload: {
        level: 'error',
        trace: [
          'printWarning (http://localhost:8234/static/chunk-AYYYJEEC.js:2808:38)',
          'error6 (http://localhost:8234/static/chunk-AYYYJEEC.js:2790:25)',
          'validateProperty$1 (http://localhost:8234/static/chunk-AYYYJEEC.js:6539:21)',
          'warnUnknownProperties (http://localhost:8234/static/chunk-AYYYJEEC.js:6571:47)',
          'validateProperties$2 (http://localhost:8234/static/chunk-AYYYJEEC.js:6590:32)',
          'validatePropertiesInDevelopment (http://localhost:8234/static/chunk-AYYYJEEC.js:6620:33)',
          'setInitialProperties (http://localhost:8234/static/chunk-AYYYJEEC.js:6802:44)',
          'finalizeInitialChildren (http://localhost:8234/static/chunk-AYYYJEEC.js:7887:31)',
          'completeWork (http://localhost:8234/static/chunk-AYYYJEEC.js:15718:46)',
          'completeUnitOfWork (http://localhost:8234/static/chunk-AYYYJEEC.js:17756:24)',
          'performUnitOfWork (http://localhost:8234/static/chunk-AYYYJEEC.js:17742:20)',
          'workLoopSync (http://localhost:8234/static/chunk-AYYYJEEC.js:17719:30)',
          'performSyncWorkOnRoot (http://localhost:8234/static/chunk-AYYYJEEC.js:17456:17)',
          'node_modules/react-dom/cjs/react-dom.development.js/flushSyncCallbackQueueImpl/< (http://localhost:8234/static/chunk-AYYYJEEC.js:10177:33)',
          'unstable_runWithPriority (http://localhost:8234/static/chunk-AYYYJEEC.js:2285:20)',
          'runWithPriority$1 (http://localhost:8234/static/chunk-AYYYJEEC.js:10138:18)',
          'flushSyncCallbackQueueImpl (http://localhost:8234/static/chunk-AYYYJEEC.js:10173:32)',
          'flushSyncCallbackQueue (http://localhost:8234/static/chunk-AYYYJEEC.js:10164:11)',
          'scheduleUpdateOnFiber (http://localhost:8234/static/chunk-AYYYJEEC.js:17135:17)',
          'dispatchAction (http://localhost:8234/static/chunk-AYYYJEEC.js:13376:25)',
          'handleStoreChange (http://localhost:8234/static/chunk-AYYYJEEC.js:52493:28)',
          'pausedObserver2 (http://localhost:8234/static/chunk-AYYYJEEC.js:52684:15)',
          'dispatch3 (http://localhost:8234/static/chunk-AYYYJEEC.js:51542:11)',
          'node_modules/kea-waitfor/lib/index.js/waitForPlugin2/beforeReduxStore/</</< (http://localhost:8234/static/chunk-AYYYJEEC.js:68519:38)',
          'node_modules/kea-subscriptions/lib/index.js/beforeReduxStore/</</< (http://localhost:8234/static/chunk-AYYYJEEC.js:68244:36)',
          'node_modules/kea/lib/index.cjs.js/beforeReduxStore/</</< (http://localhost:8234/static/chunk-AYYYJEEC.js:53500:36)',
          'node_modules/kea/lib/index.cjs.js/actions29/</_loop2/logic.actions[key18] (http://localhost:8234/static/chunk-AYYYJEEC.js:52996:33)',
          'loadScene (http://localhost:8234/static/chunk-AYYYJEEC.js:144827:17)',
          'async*node_modules/kea/lib/index.cjs.js/listeners27/</_loop2/listenerWrapperArray</< (http://localhost:8234/static/chunk-AYYYJEEC.js:52916:28)',
          'node_modules/kea/lib/index.cjs.js/beforeReduxStore/</</< (http://localhost:8234/static/chunk-AYYYJEEC.js:53508:36)',
          'node_modules/kea/lib/index.cjs.js/actions29/</_loop2/logic.actions[key18] (http://localhost:8234/static/chunk-AYYYJEEC.js:52996:33)',
          'openScene (http://localhost:8234/static/chunk-AYYYJEEC.js:144756:17)',
          'node_modules/kea/lib/index.cjs.js/listeners27/</_loop2/listenerWrapperArray</< (http://localhost:8234/static/chunk-AYYYJEEC.js:52916:28)',
          'node_modules/kea/lib/index.cjs.js/beforeReduxStore/</</< (http://localhost:8234/static/chunk-AYYYJEEC.js:53508:36)',
          'node_modules/kea/lib/index.cjs.js/actions29/</_loop2/logic.actions[key18] (http://localhost:8234/static/chunk-AYYYJEEC.js:52996:33)',
          'urlToAction/mapping[path32] (http://localhost:8234/static/chunk-AYYYJEEC.js:144672:85)',
          'node_modules/kea-router/lib/builders.js/urlToAction10/</newListeners[router_1.router.actionTypes.locationChanged] (http://localhost:8234/static/chunk-AYYYJEEC.js:54785:26)',
          'node_modules/kea/lib/index.cjs.js/listeners27/</_loop2/listenerWrapperArray</< (http://localhost:8234/static/chunk-AYYYJEEC.js:52916:28)',
          'node_modules/kea-router/lib/builders.js/urlToAction10/</< (http://localhost:8234/static/chunk-AYYYJEEC.js:54794:21)',
          'afterMount9 (http://localhost:8234/static/chunk-AYYYJEEC.js:52837:20)',
          'node_modules/kea/lib/index.cjs.js/events6/</_loop2/logic.events[key18] (http://localhost:8234/static/chunk-AYYYJEEC.js:52822:67)',
          'mountLogic (http://localhost:8234/static/chunk-AYYYJEEC.js:53555:178)',
          'mount (http://localhost:8234/static/chunk-AYYYJEEC.js:53649:21)',
          'node_modules/kea/lib/index.cjs.js/useMountedLogic2/< (http://localhost:8234/static/chunk-AYYYJEEC.js:52582:40)',
          'batchChanges (http://localhost:8234/static/chunk-AYYYJEEC.js:52615:9)',
          'useMountedLogic2 (http://localhost:8234/static/chunk-AYYYJEEC.js:52581:21)',
          'App (http://localhost:8234/static/index.js:1551:36)',
          'renderWithHooks (http://localhost:8234/static/chunk-AYYYJEEC.js:12766:37)',
          'mountIndeterminateComponent (http://localhost:8234/static/chunk-AYYYJEEC.js:14778:22)',
          'beginWork (http://localhost:8234/static/chunk-AYYYJEEC.js:15477:22)',
          'beginWork$1 (http://localhost:8234/static/chunk-AYYYJEEC.js:18392:22)',
          'performUnitOfWork (http://localhost:8234/static/chunk-AYYYJEEC.js:17737:20)',
          'workLoopSync (http://localhost:8234/static/chunk-AYYYJEEC.js:17719:30)',
          'performSyncWorkOnRoot (http://localhost:8234/static/chunk-AYYYJEEC.js:17456:17)',
          'scheduleUpdateOnFiber (http://localhost:8234/static/chunk-AYYYJEEC.js:17130:36)',
          'updateContainer (http://localhost:8234/static/chunk-AYYYJEEC.js:19262:23)',
          'node_modules/react-dom/cjs/react-dom.development.js/legacyRenderSubtreeIntoContainer/< (http://localhost:8234/static/chunk-AYYYJEEC.js:19550:30)',
          'unbatchedUpdates (http://localhost:8234/static/chunk-AYYYJEEC.js:17563:20)',
          'legacyRenderSubtreeIntoContainer (http://localhost:8234/static/chunk-AYYYJEEC.js:19549:29)',
          'render6 (http://localhost:8234/static/chunk-AYYYJEEC.js:19612:18)',
          'renderApp (http://localhost:8234/static/index.js:1665:30)',
          'http://localhost:8234/static/index.js:1671:3',
        ],
        payload: [
          '"Warning: React does not recognize the `%s` prop on a DOM element. If you intentionally want it to appear in the DOM as a custom attribute, spell it as lowercase `%s` instead. If you accidentally passed it from a parent component, remove it from the DOM element.%s"',
          '"disableClientSideRouting"',
          '"disableclientsiderouting"',
          '"\\n    in button (created by Trigger6)\\n    in Trigger6 (created by ForwardRef(Tooltip8))\\n    in ForwardRef(Tooltip8) (created by Tooltip)\\n    in Tooltip (created by Tooltip4)\\n    in Tooltip4 (created by ForwardRef(LemonButtonInternal))\\n    in ForwardRef(LemonButtonInternal) (created by ForwardRef(_LemonInput))\\n    in span (created by ForwardRef(_LemonInput))\\n    in ForwardRef(_LemonInput) (created by Login)\\n    in div (created by PureField)\\n    in PureField (created by Field3)\\n    in Field3 (created by Field2)\\n    in Field2 (created by Login)\\n    in div (created by Login)\\n    in form (created by Form4)\\n    in Form4 (created by Login)\\n    in div (created by Login)\\n    in div (created by BridgePage)\\n    in div (created by BridgePage)\\n    in div (created by BridgePage)\\n    in div (created by BridgePage)\\n    in BridgePage (created by Login)\\n    in Login (created by AppScene)\\n    in BindLogic10 (created by AppScene)\\n    in ErrorBoundary2 (created by ErrorBoundary3)\\n    in ErrorBoundary3 (created by AppScene)\\n    in section (created by BasicLayout2)\\n    in BasicLayout2 (created by Layout)\\n    in Layout (created by AppScene)\\n    in AppScene (created by App)\\n    in App\\n    in ErrorBoundary2 (created by ErrorBoundary3)\\n    in ErrorBoundary3"',
        ],
      },
    },
    timestamp: 1662998922925,
  }
}
