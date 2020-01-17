# nano-loader

## Installation

```bash
npm install nano-loader --save
```

## Usage

**script load**

```js
const { load } = require('nano-loader')

await load('foo.js')
console.log(window.Foo)
```

**script load once**

```js
const { create } = require('nano-loader')

const load = create('foo.js')

await Promise.all([...Array(10000).keys()].map(() => load())) // load 10000times, but load script once.

console.log(window.Foo)
```

## Examples

### Use with Kakao Map + Vue

```js
import { create } from 'nano-loader'

const KAKAO_KEY = process.env.KAKAO_KEY

const loadDaumMapSdk = create(
  `//dapi.kakao.com/v2/maps/sdk.js?appkey=${KAKAO_KEY}&libraries=services&autoload=false`,
  () => new Promise((resolve) => window.kakao.maps.load(resolve))
)

export default {
  mount() {
    await loadDaumMapSdk()
    new window.kakao.maps.Map(/* ... */)
  },
}

```

## License

MIT
