import { Hono } from 'hono'
import {GeoMiddleware, getGeo} from "@repo/hono-geo-middleware";
const app = new Hono()

// @ts-nocheck
app.use('/*', GeoMiddleware())
app.get('/', (c) => {
  return c.text('Hello Hono!')
})

app.get('/geo', (c) => {
  return c.json(getGeo(c))
})
Deno.serve(app.fetch)
