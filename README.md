# Nano Loader

<p>
  <a href="https://www.npmjs.com/package/nano-loader"><img alt="Version" src="https://img.shields.io/npm/v/nano-loader.svg?style=flat-square&logo=npm" /></a>
  <a href="https://npmcharts.com/compare/nano-loader?minimal=true"><img alt="Downloads" src="https://img.shields.io/npm/dt/nano-loader.svg?style=flat-square" /></a>
  <a href="https://www.npmjs.com/package/nano-loader"><img alt="License" src="https://img.shields.io/npm/l/nano-loader.svg?style=flat-square" /></a>
</p>

Dynamic Script Loader for Browser, enabling dynamic script loading from any URL.

## Installation

```bash
npm install nano-loader --save
```

## Usage

`load`

The load method loads a script from the given URL.

```ts
import { load } from 'nano-loader'

await load('https://something.com/foo.js')

console.log(someFunctionFromFoo()) // work!
```

`once`

The once method ensures that the script is loaded only once, no matter how many times it is called.

```js
import { once, load } from 'nano-loader'

const loadFoo = once(() => load('https://something.com/foo.js'))

await Promise.all([...Array(10000).keys()].map(() => loadFoo())) // load 10000times, but load script once.

console.log(someFunctionFromFoo())
```

## Examples

### Use with Kakao Map + Vue

```js
import { once, load } from 'nano-loader'

const KAKAO_KEY = process.env.KAKAO_KEY

const loadDaumMapSdk = once(
  () => load(`//dapi.kakao.com/v2/maps/sdk.js?appkey=${KAKAO_KEY}&libraries=services&autoload=false`)
    .then(() => new Promise((resolve) => window.kakao.maps.load(resolve)))
)

export default {
  mount() {
    await loadDaumMapSdk()
    new window.kakao.maps.Map(/* ... */)
  },
}

```

