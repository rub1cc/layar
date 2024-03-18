/// <reference types="vite/client" />

declare global {
  interface Window {
    app: {
      webviewPreloadPath: string
    }
  }
}

export { }

