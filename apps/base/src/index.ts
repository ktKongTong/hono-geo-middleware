import { Hono } from 'hono'
import {GeoMiddleware, getGeo} from "hono-geo-middleware";
import {cors} from "hono/cors";

const createApp = (app:Hono) => {
  app
    .use('/*', cors())
    .use('/*', GeoMiddleware())
  app.get('/', (c) => {
    return c.text('Hello Hono!')
  })

  app.get('/geo', (c) => {
    return c.json(getGeo(c))
  })
  return app
}

const app = createApp(new Hono())

export {
  app,
  createApp
}