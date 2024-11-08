import { Hono } from 'hono'
import { handle } from 'hono/netlify'
import {GeoMiddleware, getGeo} from "hono-geo-middleware";
const app = new Hono()

// @ts-nocheck
app.use('/*', GeoMiddleware())
app.get('/', (c) => {
  return c.text('Hello Hono!')
})
app.get('/header', (c) => {
  return c.newResponse("", 200, c.req.header())
})
app.get('/geo', (c) => {
  return c.json(getGeo(c))
})

app.notFound((c)=>{
  return c.text("Oh, 404")
})


// export default async () => app.request('')
export default handle(app)
export const config = {
  path: "/*",
  excludedPath: ["/*.css", "/*.js"]
}



//
// export const config = {
//   path: "/*",
// };

