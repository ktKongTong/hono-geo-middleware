import { Hono } from 'hono'
import {GeoMiddleware, getGeo} from './index'
import {describe, it, expect} from "vitest";

describe('Hello middleware', () => {
  const app = new Hono()

  app.use('/*', GeoMiddleware())
  app.get('/', (c) => c.text('foo'))
  app.get('/geo', (c) => {return c.json(getGeo(c))})


  it('Should be hello', async () => {
    const res = await app.request('http://localhost/')
    expect(res).not.toBeNull()
    expect(res.status).toBe(200)
    expect(await res.text()).toBe('foo')
  })

  it('local should be empty', async () => {
    const res = await app.request('http://localhost/geo')
    expect(res).not.toBeNull()
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({})
  })
})
