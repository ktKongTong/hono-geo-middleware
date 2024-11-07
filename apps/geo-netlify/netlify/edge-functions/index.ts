import { Hono } from 'npm:hono'
import { handle } from 'npm:hono/netlify'

const app = new Hono()

app.get('/', (c) => {
  return c.text('Hello Hono!')
})

export default handle(app)
