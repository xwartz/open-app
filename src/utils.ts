export const isZh = () => {
  return /zh/i.test(navigator.language)
}

export const isimToken = () => {
  return typeof (window as any).imToken !== 'undefined'
}

export const isUnSupportScheme = () => {
  const ua = navigator.userAgent
  const isWechat = /micromessenger\/([\d.]+)/i.test(ua)
  return isWechat
}

export const isAndroid = () => {
  const ua = navigator.userAgent
  return /android/i.test(ua)
}

export const isiOS = () => {
  const ua = navigator.userAgent
  return /iphone|ipad|ipod/i.test(ua)
}

export const openByLocation = (url: string) => {
  location.href = url
}

export const openByIframe = (url: string) => {
  const ifr = document.createElement('iframe')
  ifr.src = url
  ifr.style.display = 'none'
  document.body.appendChild(ifr)
}
