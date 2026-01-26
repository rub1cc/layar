const { ipcRenderer } = require('electron')

window.layarApp = {
  deviceId: null,
  lastClickElement: null,
  isApplyingScroll: false,
  scrollRafId: null,
  pendingScrollPayload: null
}

const clamp = (value, min, max) => Math.min(Math.max(value, min), max)

const escapeSelector = (value) => {
  if (typeof CSS !== 'undefined' && typeof CSS.escape === 'function') {
    return CSS.escape(value)
  }
  return value.replace(/[^a-zA-Z0-9_-]/g, '\\$&')
}

const cssPath = (el) => {
  if (!(el instanceof Element)) return null
  const path = []
  while (el && el.nodeType === Node.ELEMENT_NODE) {
    if (el.id) {
      path.unshift(`#${escapeSelector(el.id)}`)
      break
    }
    let selector = el.nodeName.toLowerCase()
    let sib = el
    let nth = 1
    while ((sib = sib.previousElementSibling)) nth++
    selector += `:nth-child(${nth})`
    path.unshift(selector)
    el = el.parentElement
  }
  return path.join(' > ')
}

const getEventTargetElement = (event) => {
  if (event?.target instanceof Element) return event.target
  if (typeof event?.composedPath === 'function') {
    const path = event.composedPath()
    for (const node of path) {
      if (node instanceof Element) return node
    }
  }
  return null
}

const getViewportSize = () => {
  const width = Math.max(window.innerWidth || document.documentElement.clientWidth || 1, 1)
  const height = Math.max(window.innerHeight || document.documentElement.clientHeight || 1, 1)
  return { width, height }
}

const getNormalizedPoint = (event) => {
  const { width, height } = getViewportSize()
  return {
    x: clamp(event.clientX / width, 0, 1),
    y: clamp(event.clientY / height, 0, 1)
  }
}

const getScrollPayload = (event) => {
  const target = event?.target

  if (
    target instanceof Element &&
    target !== document.body &&
    target !== document.documentElement
  ) {
    const targetPath = cssPath(target)
    if (targetPath) {
      return {
        position: {
          x: target.scrollLeft,
          y: target.scrollTop
        },
        scrollTarget: {
          type: 'element',
          cssPath: targetPath
        }
      }
    }
  }

  return {
    position: {
      x: window.scrollX,
      y: window.scrollY
    },
    scrollTarget: {
      type: 'window'
    }
  }
}

const scheduleScrollSync = (event) => {
  if (window.layarApp.isApplyingScroll) return
  if (!window.layarApp.deviceId) return
  const payload = getScrollPayload(event)
  if (!payload) return

  window.layarApp.pendingScrollPayload = payload

  if (window.layarApp.scrollRafId) return
  window.layarApp.scrollRafId = window.requestAnimationFrame(() => {
    window.layarApp.scrollRafId = null
    const pending = window.layarApp.pendingScrollPayload
    window.layarApp.pendingScrollPayload = null
    if (!pending) return
    ipcRenderer.sendToHost('scroll', {
      ...pending,
      deviceId: window.layarApp.deviceId
    })
  })
}

// handle modifier + l to focus on the address bar
window.addEventListener('keydown', (e) => {
  if (e.key === 'l' && e.metaKey) {
    e.preventDefault()
    ipcRenderer.sendToHost('focusAddressBar')
  }
})

window.addEventListener('scroll', scheduleScrollSync, { passive: true, capture: true })

window.addEventListener(
  'click',
  (e) => {
    if (e.button !== 0) return
    if (!window.layarApp.deviceId) return

    const target = getEventTargetElement(e)
    if (!target) return

    if (target === window.layarApp.lastClickElement) {
      window.layarApp.lastClickElement = null
      return
    }

    ipcRenderer.sendToHost('click', {
      cssPath: cssPath(target),
      point: getNormalizedPoint(e),
      deviceId: window.layarApp.deviceId
    })
  },
  true
)

ipcRenderer.on('scrollMessage', (event, args = {}) => {
  const position = args.position || { x: 0, y: 0 }
  const scrollTarget = args.scrollTarget

  const applyScroll = (target, x, y) => {
    if (typeof target.scrollTo === 'function') {
      target.scrollTo({
        top: y,
        left: x
      })
      return
    }
    target.scrollTop = y
    target.scrollLeft = x
  }

  const finish = () => {
    window.requestAnimationFrame(() => {
      window.layarApp.isApplyingScroll = false
    })
  }

  if (scrollTarget?.type === 'element') {
    if (scrollTarget.cssPath) {
      const el = document.querySelector(scrollTarget.cssPath)
      if (el) {
        window.layarApp.isApplyingScroll = true
        applyScroll(el, position.x, position.y)
        finish()
        return
      }
    }
    return
  }

  window.layarApp.isApplyingScroll = true
  window.scrollTo({
    top: position.y,
    left: position.x
  })
  finish()
})

ipcRenderer.on('clickMessage', (event, args = {}) => {
  const { width, height } = getViewportSize()
  const point = args.point

  const shouldUseNativeClick = (element) => {
    if (!element?.tagName) return false
    const tagName = element.tagName.toLowerCase()
    return (
      tagName === 'a' ||
      tagName === 'button' ||
      tagName === 'input' ||
      tagName === 'select' ||
      tagName === 'textarea' ||
      tagName === 'label' ||
      tagName === 'summary' ||
      tagName === 'option'
    )
  }

  const getPointInViewport = () => {
    if (!point || typeof point.x !== 'number' || typeof point.y !== 'number') return null
    return {
      x: clamp(Math.round(point.x * width), 0, width),
      y: clamp(Math.round(point.y * height), 0, height)
    }
  }

  const viewportPoint = getPointInViewport()

  let el = null
  if (args.cssPath) {
    el = document.querySelector(args.cssPath)
  }

  if (el && viewportPoint) {
    const rect = el.getBoundingClientRect()
    const isInside =
      viewportPoint.x >= rect.left &&
      viewportPoint.x <= rect.right &&
      viewportPoint.y >= rect.top &&
      viewportPoint.y <= rect.bottom
    if (!isInside) {
      el = null
    }
  }

  if (!el && viewportPoint) {
    el = document.elementFromPoint(viewportPoint.x, viewportPoint.y)
  }

  if (!el) return

  window.layarApp.lastClickElement = el

  if (viewportPoint && !shouldUseNativeClick(el)) {
    const clickEvent = new MouseEvent('click', {
      bubbles: true,
      cancelable: true,
      view: window,
      clientX: viewportPoint.x,
      clientY: viewportPoint.y
    })
    el.dispatchEvent(clickEvent)
    return
  }

  el.click?.()
})

ipcRenderer.on('setDeviceIdMessage', (event, args) => {
  window.layarApp.deviceId = args.deviceId
})
