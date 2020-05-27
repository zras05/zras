export const mailTest = (mail:string) => {
  const reg = new RegExp(
    '^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$'
  )
  if (!reg.test(mail)) {
    return false
  } else {
    return true
  }
}

export const getScrollTop = () => {
  let scrollTop = 0
  if (document.documentElement && document.documentElement.scrollTop) {
    scrollTop = document.documentElement.scrollTop
  } else if (document.body) {
    scrollTop = document.body.scrollTop
  }
  return scrollTop
}
export const getWindowHeight = () => {
  let windwoHeight = 0
  if (document.body.clientHeight && document.documentElement.clientHeight) {
    windwoHeight =
      document.body.clientHeight < document.documentElement.clientHeight
        ? document.body.clientHeight
        : document.documentElement.clientHeight
  } else {
    windwoHeight =
      document.body.clientHeight > document.documentElement.clientHeight
        ? document.body.clientHeight
        : document.documentElement.clientHeight
  }
  return windwoHeight
}
export const getScrollHeight = () => {
  return Math.max(
    document.body.scrollHeight,
    document.documentElement.scrollHeight
  )
}
export const backTop = () => {
  const scrollTop = getScrollTop()
  if (scrollTop > 0) {
    window.requestAnimationFrame(backTop)
    window.scrollTo(0, scrollTop - scrollTop / 5)
  }
}

// new Set()
