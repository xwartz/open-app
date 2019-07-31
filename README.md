# open-app

通过 URL Scheme 从手机页面唤起 imToken App 到指定页

### Usage

#### install:

```bash
yarn add git+https://github.com/xwartz/open-app
```

或者 script 引用

```html
<script src="https://cdn.whale.token.im/open-app/index.umd.js"></script>
```

#### 调用：
```ts
import OpenApp from 'open-app'
const props = {}
const openApp = new OpenApp(props)
```

#### 参数：
```ts
interface Props {
  schemeUrl?: string
  fallbackUrl?: string
  buttonStyle?: object
  buttonText?: string
  timeout?: number
}
```

#### 默认参数:
```ts
const props = {
  schemeUrl: 'imtokenv2://navigate?screen=DappView',
  fallbackUrl: 'https://token.im/download',
  buttonStyle: buttonStyle,
  buttonText: isZh ? '打开 imToken' : 'Open imToken',
  timeout: 2000,
}
```

以上参数都可以自定义

### 处理逻辑

组件初始化后：

1. 渲染 「打开 imToken」按钮
2. 渲染 「浏览器打开 tips」，隐藏状态
3. 用户点击 「打开 imToken」按钮，如果是微信，弹出「在浏览器打开提示」；否则，执行 url scheme 打开
4. 如果失败，fallback 到 fallback_url，进入下载页面
5. 下载页面检测到参数 form = open-app，显示下载提示(待 UI 确定)
