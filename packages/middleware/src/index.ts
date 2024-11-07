import { createMiddleware } from 'hono/factory'
import { Context } from 'hono'
import { Geo } from './interface'

import { extractorFuncs, extractorFuncsMap, Extractor } from './extractor'
import { ExtractorOptions, GeoExtractorFunc } from './extractor/type'
import { createInsensitiveHeaderProxy } from './util'

declare module 'hono' {
  interface ContextVariableMap {
    geo: Geo
  }
}


interface GeoMiddlewareOptions {
  extractors?: Extractor[]
  extractorOption?: ExtractorOptions
}

export const GeoMiddleware = (options?: GeoMiddlewareOptions) => {
  const extractors = options?.extractors ?? extractorFuncs
  const availableExtractorFuncs = extractors.map(it => typeof it === 'string' ? extractorFuncsMap[it] : it)
  return createMiddleware(async (c, next) => {
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




