import { createMiddleware } from 'hono/factory'
import type { Context } from 'hono'
import type { Geo } from './interface.ts'

import { extractorFuncs, extractorFuncsMap, type Extractor } from './extractor/index.ts'
import type { ExtractorOptions, GeoExtractorFunc } from './extractor/type.ts'
import { createInsensitiveHeaderProxy } from './util.ts'
import type {Env, Input} from "hono/types";

declare module 'hono' {
  interface ContextVariableMap {
    geo: Geo
  }
}


interface GeoMiddlewareOptions {
  extractors?: Extractor[]
  extractorOption?: ExtractorOptions
}

// deno-lint-ignore ban-types no-explicit-any
export const GeoMiddleware = <E extends Env = any, P extends string = string, I extends Input = {}>(options?: GeoMiddlewareOptions) => {
  const extractors = options?.extractors ?? extractorFuncs
  const availableExtractorFuncs = extractors.map(it => typeof it === 'string' ? extractorFuncsMap[it] : it)
  return createMiddleware<E,P,I>(async (c, next) => {
    const geo = extractGeo(c, availableExtractorFuncs, options?.extractorOption)
    c.set('geo', geo)
    await next()
  })
}


function extractGeo(c:Context, extractorFuncs: GeoExtractorFunc[],options?: ExtractorOptions):Geo {
  const headers = c.req.header()
  let ans: Geo | null = null
  const h = createInsensitiveHeaderProxy(headers)
  for (const func of extractorFuncs) {
    ans = func(h, c, options)
    if(ans) break
  }
  return ans || {}
}

export const getGeo = (c:Context)=> {
  return c.get('geo');
}




