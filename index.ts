
export type LoadOptions = Partial<Omit<HTMLScriptElement, keyof HTMLElement | 'src' | 'async'>>

export function once<T>(load: () => T | Promise<T>): () => Promise<T> {
  let promise = null as Promise<T> | null
  return () => {
    try {
      return promise ? promise : (promise = Promise.resolve(load()).catch(e => { promise = null; throw e }))
    } catch (e) {
      return Promise.reject(e)
    }
  }
}

/** @deprecated use `once` instead */
export const defer = once

export let load = (src: string, options?: LoadOptions) => new Promise<void>((onload, reject) => {
  const el = document.createElement('script')
  ;(document.head || document.body).appendChild(Object.assign(el, options, {
    src,
    async: true,
    onload,
    onerror: () => {
      el.remove()
      reject(new Error(`Failed to load script: ${src}`))
    },
  }))
})

if (typeof document === 'undefined') {
  load = () => Promise.reject(new Error('load is not supported in nodejs'))
}
