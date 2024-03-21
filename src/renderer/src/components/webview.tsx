import { urlAtom } from '@/lib/state'
import { useAtom } from 'jotai'
import React, { useEffect, useRef } from 'react'

export const Webview: React.FC = () => {
  const ref = useRef<Electron.WebviewTag>(null)
  const [loading, setLoading] = React.useState<boolean>(false)
  const [error, setError] = React.useState<{ code: number; description: string } | null>(null)

  const [url, setUrl] = useAtom(urlAtom)

  // @ts-ignore temporarily
  useEffect(() => {
    if (ref.current) {
      const webview = ref.current as Electron.WebviewTag
      const handlerRemovers: (() => void)[] = []

      const didNavigate = (e: Electron.WillNavigateEvent): void => {
        setUrl(e.url)
      }

      webview.addEventListener('did-navigate', didNavigate)
      handlerRemovers.push(() => {
        webview.removeEventListener('did-navigate', didNavigate)
      })

      const didStartLoading = (): void => {
        setLoading(true)
        setError(null)
      }

      webview.addEventListener('did-start-loading', didStartLoading)
      handlerRemovers.push(() => {
        webview.removeEventListener('did-start-loading', didStartLoading)
      })

      const didStopLoading = (): void => {
        setLoading(false)
      }

      webview.addEventListener('did-stop-loading', didStopLoading)
      handlerRemovers.push(() => {
        webview.removeEventListener('did-stop-loading', didStopLoading)
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
          /* eslint-disable-next-line react/no-unknown-property */
          webpreferences="allowRunningInsecureContent=yes"
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
