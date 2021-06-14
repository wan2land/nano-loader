
export function defer(load) {
  let promise = null
  return () => promise ? promise : (promise = Promise.resolve(load()))
} 

export const load = typeof document === 'undefined'
  ? Promise.reject(new Error('not supported'))
  : (src, options = {}) => new Promise((onload, onerror) => {
    ;(document.head || document.body).appendChild(Object.assign(document.createElement('script'), options, {
      src,
      async: true,
      onload,
      onerror,
    }))
  })
