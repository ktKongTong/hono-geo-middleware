// import {app} from "example-base";
import { Hono } from 'hono'
import {GeoMiddleware, getGeo} from "hono-middleware-geo";

const app = new Hono()
app.use('/*', GeoMiddleware())
app.get('/', (c) => {
  return c.text('Hello Hono!')
})

app.get('/geo', (c) => {
  return c.json(getGeo(c))
})
export default {
  fetch: app.fetch
}
