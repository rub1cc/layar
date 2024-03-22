export type StoreSchema = {
  url: string
  zoom: number
  devices: Device[]
  devicesAlignment: 'grid' | 'horizontal' | 'vertical'
  browserView: 'full' | 'responsive'
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
