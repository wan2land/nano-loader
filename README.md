# Nano Loader

<p>
  <a href="https://npmcharts.com/compare/nano-loader?minimal=true"><img alt="Downloads" src="https://img.shields.io/npm/dt/nano-loader.svg?style=flat-square" /></a>
  <a href="https://www.npmjs.com/package/nano-loader"><img alt="Version" src="https://img.shields.io/npm/v/nano-loader.svg?style=flat-square" /></a>
  <a href="https://www.npmjs.com/package/nano-loader"><img alt="License" src="https://img.shields.io/npm/l/nano-loader.svg?style=flat-square" /></a>
</p>

## Installation

```bash
npm install nano-loader --save
```

## Usage

**Load a script file.**

```ts
import { load } from 'nano-loader'

await load('https://something.com/foo.js')

console.log(someFunctionFromFoo()) // work!
```

**Defer load**

```js
import { defer, load } from 'nano-loader'

const load = defer(() => load('https://something.com/foo.js'))

await Promise.all([...Array(10000).keys()].map(() => load())) // load 10000times, but load script once.

console.log(someFunctionFromFoo())
```

## Examples

### Use with Kakao Map + Vue

```js
import { defer, load } from 'nano-loader'

const KAKAO_KEY = process.env.KAKAO_KEY

const loadDaumMapSdk = defer(
  () => load(`//dapi.kakao.com/v2/maps/sdk.js?appkey=${KAKAO_KEY}&libraries=services&autoload=false`).then(() => new Promise((resolve) => window.kakao.maps.load(resolve)))
)

export default {
  mount() {
    await loadDaumMapSdk()
    new window.kakao.maps.Map(/* ... */)
  },
}

```
