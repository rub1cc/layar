import { useAtom, useSetAtom } from 'jotai'
import Mousetrap from 'mousetrap'
import { useEffect } from 'react'
import { searchingAtom, zoomAtom } from '../lib/state'

export const useRegisterShortcuts = (): void => {
  const [zoom, setZoom] = useAtom(zoomAtom)
  const setSearching = useSetAtom(searchingAtom)
  const registerShortcuts = (): void => {
    Mousetrap.reset()
    Mousetrap.bind('mod+r', function () {
      document.querySelectorAll('webview').forEach((webview: Element) => {
        const wv = webview as Electron.WebviewTag
        wv.reload()
      })
    })
    Mousetrap.bind('mod+l', function () {
      setSearching(true)
    })
    Mousetrap.bind('mod+0', function () {
      setZoom(0.5)
    })
    Mousetrap.bind('mod+-', function () {
      if (zoom <= 0.4) return
      setZoom(zoom - 0.1)
    })
    Mousetrap.bind('mod+=', function () {
      if (zoom >= 1.2) return
      setZoom(zoom + 0.1)
    })
    Mousetrap.bind('mod+left', function () {
      document.querySelectorAll('webview').forEach((webview: Element) => {
        ;(webview as Electron.WebviewTag).goBack()
      })
    })
    Mousetrap.bind('mod+right', function () {
      document.querySelectorAll('webview').forEach((webview: Element) => {
        ;(webview as Electron.WebviewTag).goForward()
      })
    })
  }

  useEffect(() => {
    registerShortcuts()
  }, [])
}
