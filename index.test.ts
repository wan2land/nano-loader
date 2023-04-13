import { once } from '.'

describe('nano-loader, once', () => {
  it("test once sync success", async () => {
    const mock = jest.fn()
    const load = once(() => {
      mock()
      return true
    })

    expect(await load()).toBe(true)
    expect(await load()).toBe(true)
    expect(await load()).toBe(true)
    expect(await load()).toBe(true)
    expect(await load()).toBe(true)

    expect(mock.mock.calls.length).toBe(1)
  })

  it("test once sync promise success", async () => {
    const mock = jest.fn()
    const load = once(() => {
      mock()
      return Promise.resolve(true)
    })

    expect(await load()).toBe(true)
    expect(await load()).toBe(true)
    expect(await load()).toBe(true)
    expect(await load()).toBe(true)
    expect(await load()).toBe(true)

    expect(mock.mock.calls.length).toBe(1)
  })

  it("test once async success", async () => {
    const mock = jest.fn()
    const load = once(async () => {
      mock()
      return true
    })

    expect(await load()).toBe(true)
    expect(await load()).toBe(true)
    expect(await load()).toBe(true)
    expect(await load()).toBe(true)
    expect(await load()).toBe(true)

    expect(mock.mock.calls.length).toBe(1)
  })

  it("test once sync error", async () => {
    const mock = jest.fn()
    const load = once(() => {
      mock()
      throw new Error('test')
    })

    await expect(load()).rejects.toThrow(new Error('test'))
    await expect(load()).rejects.toThrow(new Error('test'))
    await expect(load()).rejects.toThrow(new Error('test'))
    await expect(load()).rejects.toThrow(new Error('test'))

    expect(mock.mock.calls.length).toBe(4)
  })

  it("test once sync promise error", async () => {
    const mock = jest.fn()
    const load = once(() => {
      mock()
      return Promise.reject(new Error('test'))
    })

    await expect(load()).rejects.toThrow(new Error('test'))
    await expect(load()).rejects.toThrow(new Error('test'))
    await expect(load()).rejects.toThrow(new Error('test'))
    await expect(load()).rejects.toThrow(new Error('test'))

    expect(mock.mock.calls.length).toBe(4)
  })

  it("test once async error", async () => {
    const mock = jest.fn()
    const load = once(async () => {
      mock()
      throw new Error('test')
    })

    await expect(load()).rejects.toThrow(new Error('test'))
    await expect(load()).rejects.toThrow(new Error('test'))
    await expect(load()).rejects.toThrow(new Error('test'))
    await expect(load()).rejects.toThrow(new Error('test'))

    expect(mock.mock.calls.length).toBe(4)
  })

  it("test once async lazy error", async () => {
    const mock = jest.fn()

    let resume = () => {}
    const purge = () => new Promise<void>((resolve) => { resume = resolve })

    const load = once(async () => {
      mock()
      await purge()
      throw new Error('test')
    })

    let lazyCases = [] as Promise<void>[]

    lazyCases.push(expect(load()).rejects.toThrow(new Error('test')))
    lazyCases.push(expect(load()).rejects.toThrow(new Error('test')))
    lazyCases.push(expect(load()).rejects.toThrow(new Error('test')))
    lazyCases.push(expect(load()).rejects.toThrow(new Error('test')))

    await new Promise((resolve) => setTimeout(resolve, 100))

    lazyCases.push(expect(load()).rejects.toThrow(new Error('test')))
    lazyCases.push(expect(load()).rejects.toThrow(new Error('test')))

    resume()

    await Promise.all(lazyCases)

    expect(mock.mock.calls.length).toBe(1)
  })

  it("test once async lazy error with success", async () => {
    const mock = jest.fn()

    let resume = () => {}
    let success = false
    const purge = () => new Promise<void>((resolve) => { resume = resolve })

    const load = once(async () => {
      mock()
      await purge()
      if (success) return true
      throw new Error('test')
    })

    {
      const lazyLoads = [] as Promise<boolean>[]

      lazyLoads.push(load())
      await new Promise((resolve) => setTimeout(resolve, 100))
      lazyLoads.push(load())
      await new Promise((resolve) => setTimeout(resolve, 100))
      lazyLoads.push(load())
      await new Promise((resolve) => setTimeout(resolve, 100))
      lazyLoads.push(load())
      await new Promise((resolve) => setTimeout(resolve, 100))

      resume()

      await Promise.all(lazyLoads).catch(() => { /* ignore */ })

      expect(mock.mock.calls.length).toBe(1)
    }

    {
      const lazyLoads = [] as Promise<boolean>[]

      lazyLoads.push(load())
      await new Promise((resolve) => setTimeout(resolve, 100))
      lazyLoads.push(load())
      await new Promise((resolve) => setTimeout(resolve, 100))
      lazyLoads.push(load())
      await new Promise((resolve) => setTimeout(resolve, 100))
      lazyLoads.push(load())
      await new Promise((resolve) => setTimeout(resolve, 100))

      success = true
      resume()

      expect(await Promise.all(lazyLoads)).toEqual([true, true, true, true])

      expect(mock.mock.calls.length).toBe(2)
    }
  })
})
