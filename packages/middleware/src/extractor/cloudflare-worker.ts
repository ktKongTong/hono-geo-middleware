import type { GeoExtractorFunc } from './type.ts'
import { getRuntimeKey } from 'hono/adapter'
import type {Request} from '@cloudflare/workers-types'

const REQUEST_ID_HEADER_NAME = 'CF-ray'
const IP_HEADER_NAME = 'CF-Connecting-IP'
export const cloudflareWorker:GeoExtractorFunc = (headers, c)=> {
  if(getRuntimeKey() !== 'workerd' && !headers[REQUEST_ID_HEADER_NAME]) {
    return null;
  }
  const req = c.req.raw as any as Request
  return {
    runner: 'cf-worker',
    reqId: headers[REQUEST_ID_HEADER_NAME],
    ip: headers[IP_HEADER_NAME],
    city: req.cf?.city as string,
    /* ISO 3166-2 code */
    countryCode: req.cf?.country as string,
    continent: req.cf?.continent as string,
    region: req.cf?.region as string,
    /* ISO 3166-2 code */
    regionCode: req.cf?.regionCode as string,
    latitude: req.cf?.latitude as string,
    longitude: req.cf?.longitude as string,
    postalCode: req.cf?.postalCode as string,
    metroCode: req.cf?.metroCode as string,
    timezone: req.cf?.timezone as string,
    asn: req.cf?.asOrganization as string,
    /** flag emoji */
    // flag: req.cf?.region
  }
}