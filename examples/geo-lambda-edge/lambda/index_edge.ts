import { handle } from 'hono/lambda-edge'
import {app} from "@repo/example-base";

export const handler = handle(app)