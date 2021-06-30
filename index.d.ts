
export declare function defer<T>(createLoad: () => T | Promise<T>): () => Promise<T>

export declare function load(src: string, options?: Partial<Omit<HTMLScriptElement, keyof HTMLElement | 'src' | 'async'>>): Promise<undefined>
