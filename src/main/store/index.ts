import Store from 'electron-store'
import { StoreSchema } from '../../shared/types'

const schema: Store.Schema<StoreSchema> = {
  lastOpened: {
    type: 'number',
    default: Date.now()
  },
  url: {
    type: 'string',
    default: ''
  },
  zoom: {
    type: 'number',
    default: 1
  },
  devices: {
    type: 'array',
    default: []
  },
  devicesAlignment: {
    type: 'string',
    enum: ['grid', 'horizontal', 'vertical'],
    default: 'grid'
  },
  browserView: {
    type: 'string',
    enum: ['full', 'responsive'],
    default: 'full'
  },
  history: {
    type: 'array',
    default: []
  }
}

export const store = new Store({ schema, watch: true })
