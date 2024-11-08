import type { GeoExtractorFunc } from './type.ts'
import {getFlagFromCountryCode, tryDecodeURIText} from "../util.ts";


export const CITY_HEADER_NAME = 'x-vercel-ip-city';
/**
 * Country of the original client IP as calculated by Vercel Proxy.
 */
export const COUNTRY_HEADER_NAME = 'x-vercel-ip-country';
/**
 * Client IP as calculated by Vercel Proxy.
 */
export const IP_HEADER_NAME = 'x-real-ip';
/**
 * Latitude of the original client IP as calculated by Vercel Proxy.
 */
export const LATITUDE_HEADER_NAME = 'x-vercel-ip-latitude';
/**
 * Longitude of the original client IP as calculated by Vercel Proxy.
 */
export const LONGITUDE_HEADER_NAME = 'x-vercel-ip-longitude';
/**
 * Country region of the original client IP calculated by Vercel Proxy.
 *
 * See [docs](https://vercel.com/docs/concepts/edge-network/headers#x-vercel-ip-country-region).
 */
export const REGION_HEADER_NAME = 'x-vercel-ip-country-region';
/**
 * The request ID for each request generated by Vercel Proxy.
 */
export const REQUEST_ID_HEADER_NAME = 'x-vercel-id';

/**
 * Unicode characters for emoji flags start at this number, and run up to 127469.
 */
export const EMOJI_FLAG_UNICODE_STARTING_POSITION = 127397;

export const vercel:GeoExtractorFunc = (headers)=> {
  if(!headers[REQUEST_ID_HEADER_NAME]) {
    return null;
  }
  return {
    ip: headers[IP_HEADER_NAME],
    city: tryDecodeURIText(headers[CITY_HEADER_NAME]),
    countryCode: headers[COUNTRY_HEADER_NAME],
    regionCode: headers[REGION_HEADER_NAME],
    latitude: headers[LATITUDE_HEADER_NAME],
    longitude: headers[LONGITUDE_HEADER_NAME],

    /** flag emoji */
    flag: getFlagFromCountryCode(headers[COUNTRY_HEADER_NAME]),
    // Vercel Edge Network region name
    idcRegion: getRegionFromRequestId(headers[REQUEST_ID_HEADER_NAME]),
  }
}

function getRegionFromRequestId(requestId?: string): string | undefined {
  if (!requestId) {
    return 'dev1';
  }

  // The request ID is in the format of `region::id` or `region1:region2:...::id`.
  return requestId.split(':')[0];
}