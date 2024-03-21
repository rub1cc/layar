import { Device as IDevice } from '@/lib/devices'
import { devicesAtom, urlAtom, zoomAtom } from '@/lib/state'
import { cn } from '@/lib/utils'
import { RotateCounterClockwiseIcon } from '@radix-ui/react-icons'
import { useAtom, useAtomValue, useSetAtom } from 'jotai'
import { RefreshCcw, TerminalSquare, Trash2Icon } from 'lucide-react'
import pubsub from 'pubsub.js'
import React, { useEffect, useRef } from 'react'

type DeviceProps = {
  device: IDevice
}

export const Device: React.FC<DeviceProps> = (props) => {
  const ref = useRef<Electron.WebviewTag>(null)
  const [rotated, setRotated] = React.useState<boolean>(false)
  const [loading, setLoading] = React.useState<boolean>(false)
  const [error, setError] = React.useState<{ code: number; description: string } | null>(null)

  const [url, setUrl] = useAtom(urlAtom)
  const setDevices = useSetAtom(devicesAtom)
  const zoom = useAtomValue(zoomAtom)

  let { width, height } = props.device

  if (rotated) {
    ;[width, height] = [height, width]
  }

  const scaledWidth = width * zoom
  const scaledHeight = height * zoom

  const ipcMessageHandler = ({ channel: type, args: [message] }: Electron.IpcMessageEvent) => {
    switch (type) {
      case 'scroll':
        pubsub.publish('scroll', [message])
        return
      case 'click':
        pubsub.publish('click', [message])
        return
    }
  }

  // @ts-ignore temporarily
  useEffect(() => {
    if (ref.current) {
      const webview = ref.current as Electron.WebviewTag
      const handlerRemovers: (() => void)[] = []

      const subscriptions: unknown[] = []

      subscriptions.push(
        pubsub.subscribe('scroll', (message) => {
          if (message.deviceId === props.device.id) return
          webview.send('scrollMessage', message)
        })
      )

      subscriptions.push(
        pubsub.subscribe('click', (message) => {
          if (message.deviceId === props.device.id) return
          webview.send('clickMessage', message)
        })
      )

      const domReadyHandler = (): void => {
        const message = {
          deviceId: props.device.id
        }
        webview.send('setDeviceIdMessage', message)
      }

      webview.addEventListener('dom-ready', domReadyHandler)
      handlerRemovers.push(() => {
        webview.removeEventListener('dom-ready', domReadyHandler)
      })

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

      // watching all message that sent to host from webview
      webview.addEventListener('ipc-message', ipcMessageHandler)
      handlerRemovers.push(() => {
        webview.removeEventListener('ipc-message', ipcMessageHandler)
      })

      return () => {
        handlerRemovers.forEach((remove) => remove())
        subscriptions.forEach(pubsub.unsubscribe)
      }
    }
  }, [ref])

  return (
    <>
      <div className="mb-2 text-white/80">
        <div className="flex items-center justify-between">
          <div>
            <span>{props.device.name}</span>
            <span className="opacity-50 text-xs ml-1">
              {width}x{height}
            </span>
          </div>
        </div>
        <div className="flex flex-wrap items-center gap-2 py-1">
          <button
            className={cn(loading && 'animate-spin')}
            onClick={() => {
              if (ref.current) {
                ref.current.reload()
              }
            }}
          >
            <RefreshCcw className="w-4 text-white/50 hover:text-white" />
            <span className="hidden">Reload</span>
          </button>
          <button
            onClick={() => {
              setRotated((old) => !old)
            }}
          >
            <RotateCounterClockwiseIcon className="w-4 text-white/50 hover:text-white" />
            <span className="hidden">Rotate</span>
          </button>
          <button
            onClick={() => {
              ref?.current?.openDevTools()
            }}
          >
            <TerminalSquare className="w-4 text-white/50 hover:text-white" />
            <span className="hidden">Devtools</span>
          </button>
          <button
            onClick={() => {
              setDevices((old) => old.filter((d) => d.id !== props.device.id))
            }}
          >
            <Trash2Icon className="w-4 text-white/50 hover:text-white" />
            <span className="hidden">Remove</span>
          </button>
        </div>
      </div>
      <div
        className="bg-white origin-top-left relative"
        style={{
          width: scaledWidth,
          height: scaledHeight
        }}
      >
        <webview
          ref={ref}
          id={props.device.name}
          src={url}
          style={{
            width: width,
            height: height,
            transform: `scale(${zoom})`
          }}
          className="origin-top-left"
          /* eslint-disable-next-line react/no-unknown-property */
          useragent={props.device.userAgent}
          /* eslint-disable-next-line react/no-unknown-property */
          preload={`file://${window.app.webviewPreloadPath}`}
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
