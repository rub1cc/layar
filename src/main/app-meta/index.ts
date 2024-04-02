import { BrowserWindow, dialog, ipcMain } from 'electron'
import preload from '../../preload/preload-webview.js?asset'
import { StoreSchema } from '../../shared/types'
import { store } from '../store'

interface AppMetaResponse {
  webviewPreloadPath: string
}

const handleAppMeta = (): AppMetaResponse => {
  return {
    webviewPreloadPath: preload
  }
}

const onElectronStoreGet = async (
  event: Electron.IpcMainEvent,
  val: keyof StoreSchema
): Promise<void> => {
  event.returnValue = store.get(val)
}

const onElectronStoreSet = async (
  _: Electron.IpcMainEvent,
  key: keyof StoreSchema,
  val: StoreSchema[keyof StoreSchema]
): Promise<void> => {
  store.set(key, val)
}

const onElectronStoreDelete = async (
  _: Electron.IpcMainEvent,
  key: keyof StoreSchema
): Promise<void> => {
  store.delete(key)
}

export const initAppMetaHandlers = (_mainWindow: BrowserWindow): void => {
  ipcMain.removeHandler('app-meta')
  ipcMain.handle('app-meta', handleAppMeta)

  ipcMain.on('electron-store-get', onElectronStoreGet)

  ipcMain.on('electron-store-set', onElectronStoreSet)
  ipcMain.on('electron-store-delete', onElectronStoreDelete)

  ipcMain.removeHandler('get-metadata')
  ipcMain.handle('get-metadata', async (event, { url }) => {
    try {
      const data = await fetch(url)
      const robots = await fetch(`${new URL(url).origin}/robots.txt`)
      return {
        status: 'success',
        data: await data.text(),
        robots: await robots.text()
      }
    } catch {
      return {
        status: 'error',
        message: 'Failed to fetch metadata'
      }
    }
  })

  _mainWindow.on('close', function (e) {
    const response = dialog.showMessageBoxSync(_mainWindow, {
      type: 'question',
      buttons: ['Yes', 'No'],
      title: 'Confirm',
      message: 'Are you sure you want to quit?'
    })

    if (response == 1) e.preventDefault()
  })
}
