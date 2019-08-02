# open-app

A component for opening imToken app from webpage.

### Usage

#### install:

```bash
yarn add git+https://github.com/xwartz/open-app
```

or

```html
<script src="https://cdn.whale.token.im/open-app/index.umd.js"></script>
```

#### Basic Usage：
```ts
import OpenApp from 'open-app'
const props = {}
const openApp = new OpenApp(props)
```

#### Parameters：
```ts
interface Props {
  schemeUrl?: string
  fallbackUrl?: string
  buttonStyle?: object
  buttonText?: string
  timeout?: number
}
```

#### Default Parameters:
```ts
const props = {
  schemeUrl: 'imtokenv2://navigate?screen=DappView',
  fallbackUrl: 'https://token.im/download',
  buttonStyle: buttonStyle,
  buttonText: isZh ? '打开 imToken' : 'Open imToken',
  timeout: 2000,
}
```

### How it works

1. Render the「打开 imToken」button.
2. Render the「请使用浏览器打开」tip, and set it display to none.
3. The component will try to open imToken app with URL Scheme if user clicks the「打开 imToken」button.
4. Use a fallback url if failed to open app.
