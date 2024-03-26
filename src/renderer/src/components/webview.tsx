import { searchingAtom, updateHistoryAtom, urlAtom } from '@/lib/state'
import { useAtom, useSetAtom } from 'jotai'
import { FC, useEffect, useRef, useState } from 'react'

export const Webview: FC = () => {
  const ref = useRef<Electron.WebviewTag>(null)
  const [error, setError] = useState<{ code: number; description: string } | null>(null)
  const setSearching = useSetAtom(searchingAtom)

  const [url, setUrl] = useAtom(urlAtom)
  const updateHistory = useSetAtom(updateHistoryAtom)

  const ipcMessageHandler = ({ channel: type }: Electron.IpcMessageEvent): void => {
    switch (type) {
      case 'focusAddressBar':
        setSearching(true)
        return
    }
  }

  // @ts-ignore temporarily
  useEffect(() => {
    if (ref.current) {
      const webview = ref.current as Electron.WebviewTag
      const handlerRemovers: (() => void)[] = []

      const didNavigate = (e: Electron.WillNavigateEvent): void => {
        setUrl(e.url)
        updateHistory({ url: webview.getURL(), label: webview.getTitle() })
      }

      webview.addEventListener('did-navigate', didNavigate)
      handlerRemovers.push(() => {
        webview.removeEventListener('did-navigate', didNavigate)
      })

      const didStartLoading = (): void => {
        setError(null)
      }

      webview.addEventListener('did-start-loading', didStartLoading)
      handlerRemovers.push(() => {
        webview.removeEventListener('did-start-loading', didStartLoading)
      })

      const didFailLoadHandler = ({
        errorCode,
        errorDescription
      }: Electron.DidFailLoadEvent): undefined => {
        if (errorCode === -3) {
          // Aborted error, can be ignored
          return
        }
        setError({
          code: errorCode,
          description: errorDescription
        })
      }
      webview.addEventListener('did-fail-load', didFailLoadHandler)
      handlerRemovers.push(() => {
        webview.removeEventListener('did-fail-load', didFailLoadHandler)
      })

      // watching all message that sent to host from webview
      webview.addEventListener('ipc-message', ipcMessageHandler)
      handlerRemovers.push(() => {
        webview.removeEventListener('ipc-message', ipcMessageHandler)
      })

      return () => {
        handlerRemovers.forEach((remove) => remove())
      }
    }
  }, [ref])

  return (
    <>
      <div className="bg-white origin-top-left relative w-full h-full">
        <webview
          id="main-webview"
          ref={ref}
          src={url}
          className="origin-top-left w-full h-full"
          // @ts-ignore need to pass a string for allowpopups
          // eslint-disable-next-line react/no-unknown-property
          allowpopups="true"
          /* eslint-disable-next-line react/no-unknown-property */
          webpreferences="allowRunningInsecureContent=yes"
          /* eslint-disable-next-line react/no-unknown-property */
          preload={`file://${window.app.webviewPreloadPath}`}
        />

        {error && (
          <div className="absolute inset-0 w-full h-full flex flex-col justify-center items-center bg-gray-800 text-white/50 p-4 text-xs">
            <p>Error: {error?.code}</p>
            <p>{error?.description}</p>
          </div>
        )}
      </div>
    </>
  )
}
