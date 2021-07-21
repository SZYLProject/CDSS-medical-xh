function zoom (stap = 10, element, style, target, interval, add = true) {
  if (element === undefined || element === null) {
    return
  }
  let tag = 0
  let defaultInterval = null
  if (defaultInterval) {
    clearInterval(defaultInterval)
  }
  defaultInterval = setInterval(() => {
    if (add) {
      tag += stap
      if (tag >= target) {
        element.style[style] = `${target}px`
        clearInterval(defaultInterval)
      } else {
        element.style[style] = `${tag}px`
      }
    } else {
      target -= stap
      if (target <= 0) {
        element.style[style] = `${0}px`
        clearInterval(defaultInterval)
      } else {
        element.style[style] = `${target}px`
      }
    }
  }, interval)
}

export {
  zoom
}
