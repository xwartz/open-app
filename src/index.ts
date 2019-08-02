import { isimToken, isZh, isUnSupportScheme, isAndroid, openByIframe, openByLocation, isiOS, isChrome, openByTagA, isiPhoneX } from './utils'

interface Props {
  schemeUrl?: string
  fallbackUrl?: string
  buttonStyle?: any
  buttonText?: string
  timeout?: number
}

const buttonStyle = {
  position: 'fixed',
  zIndex: 9999,
  bottom: '25px',
  left: '50%',
  transform: 'translateX(-50%)',
  background: '#0890BE',
  boxShadow: '0px 6px 8px rgba(22, 21, 60, 0.2)',
  borderRadius: '50px',
  padding: '14px 28px',
  fontSize: '15px',
  color: '#fff',
  borderStyle: 'none',
  outline: 'none',
  fontFamily: 'PingFang SC',
}

const getDefaultProps = () => {
  return {
    schemeUrl: 'imtokenv2://navigate/DappView',
    fallbackUrl: 'https://token.im/download',
    buttonStyle: isiPhoneX() ? { ...buttonStyle, bottom: '59px' } : buttonStyle,
    buttonText: isZh ? '打开 imToken' : 'Open imToken',
    timeout: 2000,
  }
}

export default class OpenApp {
  props: any
  tip: any
  timer: any

  constructor(props: Props = {}) {
    const defaultProps = getDefaultProps()
    this.props = { ...defaultProps, ...props }
    this.render()
  }

  render() {
    if (isimToken()) {
      return
    }

    if (isAndroid() || isiOS()) {
      this.renderButton()
      this.renderTip()
    }
  }

  renderButton() {
    const { buttonStyle, buttonText } = this.props
    const button = document.createElement('button')
    // apply btn text
    button.innerHTML = buttonText
    // apply style
    Object.keys(buttonStyle).forEach(attr => {
      button.style[attr as any] = buttonStyle[attr]
    })
    // append to body
    const body = document.getElementsByTagName('body')[0]
    body.appendChild(button)
    // add click event
    button.addEventListener('click', this.open)
  }

  renderTip() {
    this.tip = document.createElement('div')
    const step1Text = isZh ? '1. 点击更多' : '1. Click More'
    const step2Text = isZh ? '2. 请选择「在浏览器中打开」' : '2. Choose “Open in Browser”'
    const styleContainner = `
      position: fixed;
      z-index: 10000;
      top: 0;
      right: 0;
      left: 0;
      bottom: 0;
      background-color: rgba(35, 33, 71, 0.8);
    `
    const styleArrow = `
      position: absolute;
      top: -16px;
      right: 6px;
    `
    const styleMore = `
      position: absolute;
      top: 70px;
      right: 130px;
      text-align: center;
    `

    const styleText = `
      font-size: 17px;
      line-height: 17px;
      text-align: center;
      color: #fff;
      margin-top: 16px;
    `

    const styleArrowOpen = `
      position: absolute;
      top: 94px;
      right: 194px;
    `

    const styleOpen = `
      position: absolute;
      top: 195px;
      right: 60px;
      text-align: center;
    `

    this.tip.innerHTML = `
      <div style="${styleContainner}">
        <img style="${styleArrow}" src="https://cdn.whale.token.im/open-app/oa-arrow-click.svg" alt="arrow" />
        <div style="${styleMore}">
          <img src="https://cdn.whale.token.im/open-app/oa-more.svg" alt="more" />
          <div style="${styleText}">${step1Text}</div>
        </div>
        <img style="${styleArrowOpen}" src="https://cdn.whale.token.im/open-app/oa-arrow-open.svg" alt="arrow" />
        <div style="${styleOpen}">
          <img src="https://cdn.whale.token.im/open-app/oa-browser.svg" alt="arrow" />
          <div style="${styleText}">${step2Text}</div>
        </div>
      </div>
    `
    // hide
    this.tip.style.display = 'none'
    // append to body
    const body = document.getElementsByTagName('body')[0]
    body.appendChild(this.tip)
    // add click event
    this.tip.addEventListener('click', this.hideTip)
  }

  showTip = () => {
    this.tip.style.display = 'block'
  }

  hideTip = () => {
    this.tip.style.display = 'none'
  }

  open = () => {
    // imToken
    if (isimToken()) {
      return
    }

    // show tip
    if (isUnSupportScheme()) {
      this.showTip()
      return
    }

    // try to open app
    const { schemeUrl } = this.props
    const url = `${schemeUrl}?url=${location.href}`
    if (isAndroid()) {
      if (isChrome()) {
        openByTagA(url)
      } else {
        openByIframe(url)
      }
    } else {
      openByLocation(url)
    }
    this._checkOpen()
  }

  fallback = () => {
    const { fallbackUrl } = this.props
    location.href = `${fallbackUrl}?from=open-app`
  }

  _checkOpen = () => {
    let haveChange = false
    let property = 'hidden'
    let eventName = 'visibilitychange'

    // Opera 12.10 and Firefox 18 and later support
    if (typeof document.hidden !== 'undefined') {
      property = 'hidden'
      eventName = 'visibilitychange'
    } else if (typeof (document as any).msHidden !== 'undefined') {
      property = 'msHidden'
      eventName = 'msvisibilitychange'
    } else if (typeof (document as any).webkitHidden !== 'undefined') {
      property = 'webkitHidden'
      eventName = 'webkitvisibilitychange'
    }

    const pageChange = (e: any) => {
      haveChange = true
      if ((document as any)[property] || e.hidden || document.visibilityState === 'hidden') {
        // success
      } else {
        this.fallback()
      }
      removeEvents()
    }

    const removeEvents = () => {
      document.removeEventListener(eventName, pageChange)
      document.removeEventListener('baiduboxappvisibilitychange', pageChange)
    }

    const addEvents = () => {
      document.addEventListener(eventName, pageChange, false)
      document.addEventListener('baiduboxappvisibilitychange', pageChange, false)
    }

    addEvents()

    clearTimeout(this.timer)
    this.timer = setTimeout(() => {
      if (haveChange) {
        return
      }

      removeEvents()

      this.fallback()
      haveChange = true
    }, this.props.timeout)
  }
}
