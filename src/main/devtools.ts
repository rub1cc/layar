import { BrowserView, BrowserWindow, ipcMain, webContents } from 'electron'

let devtoolsBrowserView: BrowserView | undefined
let devtoolsWebview: Electron.WebContents
let mainWindow: BrowserWindow | undefined

export interface OpenDevtoolsArgs {
  webviewId: number
  bounds?: Electron.Rectangle
}

export interface OpenDevtoolsResult {
  status: boolean
}

const openDevtools = async (
  _: Electron.IpcMainInvokeEvent,
  arg: OpenDevtoolsArgs
): Promise<OpenDevtoolsResult> => {
  const { webviewId } = arg
  const optionalWebview = webContents.fromId(webviewId)
  if (mainWindow == null || optionalWebview === undefined) return { status: false }

  devtoolsWebview = optionalWebview

  devtoolsBrowserView = new BrowserView()
  mainWindow.setBrowserView(devtoolsBrowserView)
  devtoolsBrowserView.setBounds({
    x: 0,
    y: 0,
    width: 0,
    height: 0
  })
  devtoolsWebview.setDevToolsWebContents(devtoolsBrowserView.webContents)
  devtoolsWebview.openDevTools()

  return { status: true }
}

const resizeDevtools = async (
  _: Electron.IpcMainInvokeEvent,
  arg: OpenDevtoolsArgs
): Promise<void> => {
  try {
    if (devtoolsBrowserView == null) return
    const { bounds } = arg
    if (bounds == null) return

    devtoolsBrowserView.setBounds({
      x: Math.round(bounds.x),
      y: Math.round(bounds.y),
      width: Math.round(bounds.width),
      height: Math.round(bounds.height)
    })
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error('Error resizing devtools', err)
  }
}

const closeDevTools = async (): Promise<void> => {
  if (devtoolsWebview == null) return
  devtoolsWebview.closeDevTools()
  if (devtoolsBrowserView == null) return
  mainWindow?.removeBrowserView(devtoolsBrowserView)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ;(devtoolsBrowserView.webContents as any).destroy()
  devtoolsBrowserView.webContents.close()
  devtoolsBrowserView = undefined
}

export const initDevtoolsHandlers = (_mainWindow: BrowserWindow | undefined): void => {
  mainWindow = _mainWindow

  ipcMain.removeHandler('open-devtools')
  ipcMain.handle('open-devtools', openDevtools)

  ipcMain.removeHandler('resize-devtools')
  ipcMain.handle('resize-devtools', resizeDevtools)

  ipcMain.removeHandler('close-devtools')
  ipcMain.handle('close-devtools', closeDevTools)
}
