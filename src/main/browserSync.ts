import BrowserSync, { BrowserSyncInstance } from 'browser-sync'

export const BROWSER_SYNC_PORT = 12720
export const BROWSER_SYNC_HOST = `localhost:${BROWSER_SYNC_PORT}`
export const BROWSER_SYNC_URL = `https://${BROWSER_SYNC_HOST}/browser-sync/browser-sync-client.js?v=2.27.10`

const browserSyncEmbed: BrowserSyncInstance = BrowserSync.create()

let created = false

export async function initInstance(): Promise<BrowserSyncInstance> {
  if (created) {
    return browserSyncEmbed
  }
  created = true
  return new Promise((resolve, reject) => {
    browserSyncEmbed.init(
      {
        open: false,
        localOnly: true,
        https: true,
        notify: false,
        ui: false,
        port: BROWSER_SYNC_PORT
      },
      (err: Error, bs: BrowserSyncInstance) => {
        if (err) {
          return reject(err)
        }
        return resolve(bs)
      }
    )
  })
}
