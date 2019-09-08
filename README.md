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

## License

MIT
