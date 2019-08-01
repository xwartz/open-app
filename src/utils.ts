export const isZh = () => {
  return /zh/i.test(navigator.language)
}

export const isimToken = () => {
  const imToken = (window as any).imToken
  return imToken && imToken.version
}

export const isUnSupportScheme = () => {
  const ua = navigator.userAgent
  const isWechat = /micromessenger\/([\d.]+)/i.test(ua)
  const isQQ = /qq\/([\d.]+)/i.test(ua)
  return isWechat || isQQ
}

export const isAndroid = () => {
  const ua = navigator.userAgent
  return /android/i.test(ua)
}

export const isChrome = () => {
  const ua = navigator.userAgent
  return /chrome\/[\d.]+ Mobile Safari\/[\d.]+/i.test(ua)
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

export const openByTagA = (url: string) => {
  const tagA = document.createElement('a')
  tagA.setAttribute('href', url)
  tagA.style.display = 'none'
  document.body.appendChild(tagA)
  tagA.click()
}
