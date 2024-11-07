import { handle } from 'hono/vercel'
import { Hono } from 'hono'
import {GeoMiddleware, getGeo} from "hono-middleware-geo";

export const config = {
  runtime: 'edge'
}


const app = new Hono().basePath('/api')
app.use('/*', GeoMiddleware())
app.get('/', (c) => {
  return c.text('Hello Hono!')
})

app.get('/geo', (c) => {
  return c.json(getGeo(c))
})

export default handle(app)
