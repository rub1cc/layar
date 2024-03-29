const { ipcRenderer } = require('electron')
window.layarApp = {}
const cssPath = (el) => {
  if (!(el instanceof Element)) return
  const path = []
  while (el.nodeType === Node.ELEMENT_NODE) {
    let selector = el.nodeName.toLowerCase()
    let sib = el
    let nth = 1
    while (sib.nodeType === Node.ELEMENT_NODE && (sib = sib.previousElementSibling) && nth++);
    selector += `:nth-child(${nth})`
    path.unshift(selector)
    el = el.parentNode
  }
  return path.join(' > ')
}

// handle modifier + l to focus on the address bar
window.addEventListener('keydown', (e) => {
  if (e.key === 'l' && e.metaKey) {
    e.preventDefault()
    ipcRenderer.sendToHost('focusAddressBar')
  }
})

window.addEventListener('wheel', () => {
  ipcRenderer.sendToHost('scroll', {
    position: {
      x: window.scrollX,
      y: window.scrollY
    },
    deviceId: window.layarApp.deviceId
  })
})

window.addEventListener('mousedown', (e) => {
  if (e.target === window.layarApp.lastClickElement) {
    window.layarApp.lastClickElement = null
    return
  }

  ipcRenderer.sendToHost('click', {
    cssPath: cssPath(e.target),
    deviceId: window.layarApp.deviceId
  })
})

ipcRenderer.on('scrollMessage', (event, args) => {
  window.scrollTo({
    top: args.position.y,
    left: args.position.x
  })
})

ipcRenderer.on('clickMessage', (event, args) => {
  const el = document.querySelector(args.cssPath)
  if (!el) return
  window.layarApp.lastClickElement = el
  el.click?.()
})

ipcRenderer.on('setDeviceIdMessage', (event, args) => {
  window.layarApp.deviceId = args.deviceId
})
