export type StoreSchema = {
  lastOpened: number
  url: string
  zoom: number
  devices: Array<Device>
  devicesAlignment: 'grid' | 'horizontal' | 'vertical'
  browserView: 'full' | 'responsive'
  history: Array<{ url: string; label: string }>
  panelSize: number
}

export interface Device {
  id?: string
  height: number
  width: number
  name?: string
  userAgent: string
}
