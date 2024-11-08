import { Hono } from 'hono'
import {GeoMiddleware, getGeo} from "@repo/hono-geo-middleware";
import {cors} from "hono/cors";

const app = new Hono()
app
  .use('/*', cors())
  .use('/*', GeoMiddleware())
app.get('/', (c) => {
  return c.text('Hello Hono!')
})

app.get('/geo', (c) => {
  return c.json(getGeo(c))
})

export { app }
