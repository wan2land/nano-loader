
export function create(src, init) {
  let cache = null
  return () => cache ? cache : (cache = load(src, init))
}

export function load(src, init) {
  return new Promise((resolve, reject) => {
    (document.head || document.body).appendChild(Object.assign(document.createElement("script"), {
      src,
      async: true,
      charset: "utf8",
      onload() {
        const result = init && init()
        result instanceof Promise ? result.then(resolve) : resolve()
      },
      onerror() {
        reject(new Error(`Failed to load ${src}`))
      },
    }))
  })
}
