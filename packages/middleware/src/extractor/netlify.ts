import type { Context as NFCtx } from "@netlify/edge-functions";
import type { Context } from 'hono'
import type { GeoExtractorFunc } from './type.ts'
import {getFlagFromCountryCode, tryDecodeURIText} from "../util.ts";

const REQUEST_ID_HEADER_NAME = 'X-Nf-request-id'
const IP_HEADER_NAME = "X-Nf-Client-Connection-Ip"

type Env = {
  Bindings: {
    context?: NFCtx
  }
}
// see https://docs.netlify.com/edge-functions/api/#netlify-specific-context-object
export const netlify:GeoExtractorFunc = (headers, c:Context<Env>)=> {
  if(!headers[REQUEST_ID_HEADER_NAME]) {
    return null;
  }
  const ctx = c.env.context
  const geo = c.env.context?.geo


  return {
    reqId: headers[REQUEST_ID_HEADER_NAME],
    ip: ctx?.ip ?? headers[IP_HEADER_NAME],
    city: tryDecodeURIText(geo?.city),
    country: geo?.country?.name,
    countryCode: geo?.country?.code,
    region: geo?.subdivision?.name,
    regionCode: geo?.subdivision?.code,
    latitude: geo?.latitude?.toString(),
    longitude: geo?.longitude?.toString(),
    // metroCode: ,
    postalCode: geo?.postalCode,
    timezone: geo?.timezone,
    flag: getFlagFromCountryCode(geo?.country?.code),
    idcRegion: ctx?.server.region,
  }
}

