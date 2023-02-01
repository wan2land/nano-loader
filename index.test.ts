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

  it("test once sync error", async () => {
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
})
