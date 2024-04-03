import { mobileDevices, notebookDevices, tabletDevices } from '@/lib/devices'
import { devicesAtom, rightPanelAtom, updateHistoryAtom, urlAtom, zoomAtom } from '@/lib/state'
import { cn, generateRandomId } from '@/lib/utils'
import { Device as IDevice } from '@/shared/types'
import { useAtom, useAtomValue, useSetAtom } from 'jotai'
import {
  ChevronRight,
  PlusSquareIcon,
  RefreshCcw,
  Smartphone,
  TerminalSquare,
  Trash2Icon,
  XIcon
} from 'lucide-react'
import pubsub from 'pubsub.js'
import { FC, useEffect, useRef, useState } from 'react'

type DeviceProps = {
  device: IDevice
}

export const Device: FC<DeviceProps> = (props) => {
  const ref = useRef<Electron.WebviewTag>(null)
  const [rotated, setRotated] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<{ code: number; description: string } | null>(null)

  const [url, setUrl] = useAtom(urlAtom)
  const [devices, setDevices] = useAtom(devicesAtom)
  const zoom = useAtomValue(zoomAtom)
  const updateHistory = useSetAtom(updateHistoryAtom)
  const setRightPanel = useSetAtom(rightPanelAtom)

  const [isShowDevices, setIsShowDevices] = useState<boolean>(!props.device.name)

  let { width, height } = props.device

  if (rotated) {
    ;[width, height] = [height, width]
  }

  const scaledWidth = width * zoom
  const scaledHeight = height * zoom

  const ipcMessageHandler = ({
    channel: type,
    args: [message]
  }: Electron.IpcMessageEvent): void => {
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
        updateHistory({ url: webview.getURL(), label: webview.getTitle() })
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

  const updateDevice = (device: IDevice): void => {
    const temp = devices
    const currentItem = temp.find((d) => d.id === props.device.id)
    if (!currentItem) {
      return
    }
    const index = temp.indexOf(currentItem)
    temp[index] = {
      ...device,
      id: props.device.id
    }

    setDevices([...temp])
    setIsShowDevices(false)
  }

  return (
    <>
      <div className="mb-2 text-white/80">
        <div className="flex items-center justify-between">
          <p className="relative flex justify-between items-center gap-1 w-full group">
            <span>{props.device.name || 'New Device'}</span>
            <p className="text-white/50 text-xs ml-1 relative h-3">
              <span
                className={cn(
                  'absolute right-0 top-0 transform',
                  'group-hover:translate-y-4 group-hover:opacity-0',
                  'transition duration-300'
                )}
              >
                {width}x{height}
              </span>
              <span
                className={cn(
                  'absolute right-0 top-0 transform -translate-y-4 opacity-0',
                  'group-hover:translate-y-0 group-hover:opacity-100',
                  'transition duration-300'
                )}
              >
                Change
              </span>
            </p>
            <button className="absolute inset-0 opacity-0" onClick={() => setIsShowDevices(true)}>
              Change device
            </button>
          </p>
        </div>
        {!isShowDevices && (
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
              {width > height ? (
                <Smartphone className="w-4 text-white/50 hover:text-white transform rotate-90" />
              ) : (
                <Smartphone className="w-4 text-white/50 hover:text-white" />
              )}
              <span className="hidden">Rotate</span>
            </button>
            <button
              onClick={() => {
                window.electron.ipcRenderer.invoke('close-devtools')
                setRightPanel(null)

                window.electron.ipcRenderer.invoke('open-devtools', {
                  webviewId: ref.current?.getWebContentsId()
                })
                setTimeout(() => {
                  setRightPanel('devtools')
                }, 0)
              }}
            >
              <TerminalSquare className="w-4 text-white/50 hover:text-white" />
              <span className="hidden">Devtools</span>
            </button>
            {devices.length > 1 && (
              <button
                onClick={() => {
                  setDevices(devices.filter((d) => d.id !== props.device.id))
                }}
              >
                <Trash2Icon className="w-4 text-white/50 hover:text-white" />
                <span className="hidden">Remove</span>
              </button>
            )}

            <button
              className="ml-auto"
              onClick={() => {
                const temp = devices

                const index = temp.findIndex((d) => d.id === props.device.id)
                const nextIndex = index + 1

                const newItem = {
                  id: generateRandomId(),
                  width: 320,
                  height: 568,
                  userAgent:
                    'Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/88.0.4324.182 Mobile Safari/537.36'
                }

                temp.splice(nextIndex, 0, newItem)

                setDevices([...temp])
              }}
            >
              <PlusSquareIcon className="w-4 text-white/50 hover:text-white" />
              <span className="hidden">Add new</span>
            </button>
          </div>
        )}
        {isShowDevices && props.device.name && (
          <div className="flex flex-wrap items-center gap-2 py-1">
            <button
              onClick={() => {
                setIsShowDevices(false)
              }}
            >
              <XIcon className="w-4 text-white/50 hover:text-white" />
              <span className="hidden">Close</span>
            </button>
          </div>
        )}
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
          // @ts-ignore need to pass a string for allowpopups
          // eslint-disable-next-line react/no-unknown-property
          nodeintegration="true"
        />

        {error && (
          <div className="absolute inset-0 w-full h-full flex flex-col justify-center items-center bg-gray-800 text-white/50 p-4 text-xs">
            <p>Error: {error?.code}</p>
            <p>{error?.description}</p>
          </div>
        )}
        {isShowDevices && (
          <div className="absolute inset-0 bg-neutral-950 text-white/60 w-full h-full py-2 overflow-auto">
            <p className="font-bold text-xs mb-2 px-2 text-white/80">Mobile</p>
            <div className="space-y-1 pr-4">
              {mobileDevices.map((device) => {
                return (
                  <div
                    key={`template-device-${device.id}`}
                    className="flex items-center justify-between text-xs hover:text-white group text-left relative"
                  >
                    <button
                      className="absolute inset-0 opacity-0"
                      onClick={() => updateDevice(device)}
                    >
                      Change to {device.name}
                    </button>
                    <div className="flex items-center ">
                      <ChevronRight className="w-4 opacity-0 group-hover:opacity-100" />
                      <p>{device.name}</p>
                    </div>
                    <p>
                      {device.width}x{device.height}
                    </p>
                  </div>
                )
              })}
            </div>
            <p className="font-bold text-xs mb-2 px-2 text-white/80 mt-4">Tablet</p>
            <div className="space-y-1 pr-4">
              {tabletDevices.map((device) => {
                return (
                  <div
                    key={`template-device-${device.id}`}
                    className="flex items-center justify-between text-xs hover:text-white group text-left relative"
                  >
                    <button
                      className="absolute inset-0 opacity-0"
                      onClick={() => updateDevice(device)}
                    >
                      Change to {device.name}
                    </button>
                    <div className="flex items-center ">
                      <ChevronRight className="w-4 opacity-0 group-hover:opacity-100" />
                      <p>{device.name}</p>
                    </div>
                    <p>
                      {device.width}x{device.height}
                    </p>
                  </div>
                )
              })}
            </div>
            <p className="font-bold text-xs mb-2 px-2 text-white/80 mt-4">Desktop</p>
            <div className="space-y-1 pr-4">
              {notebookDevices.map((device) => {
                return (
                  <div
                    key={`template-device-${device.id}`}
                    className="flex items-center justify-between text-xs hover:text-white group text-left relative"
                  >
                    <button
                      className="absolute inset-0 opacity-0"
                      onClick={() => updateDevice(device)}
                    >
                      Change to {device.name}
                    </button>
                    <div className="flex items-center ">
                      <ChevronRight className="w-4 opacity-0 group-hover:opacity-100" />
                      <p>{device.name}</p>
                    </div>
                    <p>
                      {device.width}x{device.height}
                    </p>
                  </div>
                )
              })}
            </div>
          </div>
        )}
      </div>
    </>
  )
}
