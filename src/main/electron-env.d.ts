/// <reference types="vite-plugin-electron/electron-env" />

import { IpcRenderer } from '../preload/preload'

declare namespace NodeJS {
  interface ProcessEnv {
    CLIENT_PATH: string
    VITE_PORT: string
    APP_ROOT: string
    /** /dist/ or /public/ */
    VITE_PUBLIC: string
  }
}

declare global {
  // Used in Renderer process, expose in `preload.ts`
  interface Window {
    ipcRenderer: IpcRenderer
  }
}