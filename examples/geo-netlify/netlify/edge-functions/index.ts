import { handle } from 'hono/netlify'
import { app } from "@repo/example-base";

export default handle(app)

export const config = {
  path: "/*",
  excludedPath: ["/*.css", "/*.js"]
}