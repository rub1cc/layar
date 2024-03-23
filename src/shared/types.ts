export type StoreSchema = {
  url: string
  zoom: number
  devices: Array<Device>
  devicesAlignment: 'grid' | 'horizontal' | 'vertical'
  browserView: 'full' | 'responsive'
  history: Array<{ url: string; label: string }>
}

export interface Device {
  id?: string
  code: string
  height: number
  width: number
  name: string
  userAgent: string
  type: string
  dpi: number
  isTouchCapable: boolean
  isMobileCapable: boolean
  capabilities: string[]
  isCustom?: boolean
}
