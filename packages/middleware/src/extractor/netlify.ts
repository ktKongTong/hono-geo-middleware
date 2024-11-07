// import type { Context as NFCtx } from "@netlify/edge-functions";
import { Context } from 'hono'
import { GeoExtractorFunc } from './type'

const REQUEST_ID_HEADER_NAME = 'X-Nf-request-id'
const IP_HEADER_NAME = "X-Nf-Client-Connection-Ip"

type Env = {
  Bindings: {
    context?: any
  }
}

export const netlify:GeoExtractorFunc = (headers, c:Context<Env>)=> {
  if(!headers[REQUEST_ID_HEADER_NAME]) {
    return null;
  }
  const ctx = c.env.context
  const geo = c.env.context?.geo


  return {
    reqId: headers[REQUEST_ID_HEADER_NAME],
    ip: ctx?.ip ?? headers[IP_HEADER_NAME],
    city: geo?.city,
    country: geo?.country?.code,
    countryRegion: geo?.subdivision?.code,
    latitude: geo?.latitude?.toString(),
    longitude: geo?.longitude?.toString(),
  }
}

