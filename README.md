# Nano Loader

<p>
  <a href="https://www.npmjs.com/package/nano-loader"><img alt="Version" src="https://img.shields.io/npm/v/nano-loader.svg?style=flat-square&logo=npm" /></a>
  <a href="https://npmcharts.com/compare/nano-loader?minimal=true"><img alt="Downloads" src="https://img.shields.io/npm/dt/nano-loader.svg?style=flat-square" /></a>
  <a href="https://www.npmjs.com/package/nano-loader"><img alt="License" src="https://img.shields.io/npm/l/nano-loader.svg?style=flat-square" /></a>
</p>

The Nano Loader is a dynamic script loader for browsers, allowing you to seamlessly load and use scripts from any URL on-the-fly. This enables you to efficiently access and integrate scripts from various sources.

## Installation

```bash
npm install nano-loader --save
```

## Usage

`load`

The load method retrieves a script from the specified URL, making it readily available for use within your code. This enables you to easily fetch and incorporate scripts from various sources.

```ts
import { load } from 'nano-loader'

await load('https://something.com/payment.js')

console.log(window.Something.payment()) // work!
```

`once`

The once method guarantees that a script is loaded just once, regardless of how often it is called. This feature is helpful for preventing unnecessary script loading and enhancing overall performance.

```js
import { once, load } from 'nano-loader'

const loadPayment = once(() => load('https://something.com/payment.js'))

// Attempts to load the script 10000 times, but only loads it once.
await Promise.all([...Array(10000).keys()].map(() => loadPayment()))

console.log(window.Something.payment())
```

## Examples

### Use with Kakao Map + Vue

```js
import { once, load } from 'nano-loader'

const KAKAO_KEY = process.env.KAKAO_KEY

const loadKakaoMapSdk = once(
  () => load(`//dapi.kakao.com/v2/maps/sdk.js?appkey=${KAKAO_KEY}&libraries=services&autoload=false`)
    .then(() => new Promise((resolve) => window.kakao.maps.load(resolve)))
    .then(() => window.kakao.maps)
)

export default {
  mount() {
    const maps = await loadKakaoMapSdk()
    maps.Map(/* ... */)
  },
}

```

