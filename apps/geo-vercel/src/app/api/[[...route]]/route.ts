import { handle } from 'hono/vercel'
import {createApp} from "@repo/example-base";
import {Hono} from "hono";

export const config = {
  runtime: 'edge'
}

const hono = new Hono().basePath('/api')
const app = createApp(hono)

export const GET = handle(app)
