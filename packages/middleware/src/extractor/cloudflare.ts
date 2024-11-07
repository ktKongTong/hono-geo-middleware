import { GeoExtractorFunc } from './type'

const REQUEST_ID_HEADER_NAME = 'CF-ray'

const IP_HEADER_NAME = 'CF-Connecting-IP'

// see https://developers.cloudflare.com/rules/transform/managed-transforms/reference/#add-visitor-location-headers

// cf-ipcountry: The visitor’s country (value from the ip.src.country field).
const COUNTRY_HEADER_NAME = 'CF-IPCountry'
// cf-ipcity: The visitor’s city (value from the ip.src.city field).
const CITY_HEADER_NAME = 'CF-ipcity'
// cf-ipcontinent: The visitor’s continent (value from the ip.src.continent field).
const CONTINENT_HEADER_NAME = 'cf-ipcontinent';
// cf-iplongitude: The visitor’s longitude (value from the ip.src.lon field).
const LATITUDE_HEADER_NAME = 'cf-iplatitude';
// cf-iplatitude: The visitor’s latitude (value from the ip.src.lat field).
const LONGITUDE_HEADER_NAME = 'cf-iplongitude';
// cf-region: The visitor’s region (value from the ip.src.region field).
const REGION_HEADER_NAME = 'cf-region';
// cf-region-code: The visitor’s region code (value from the ip.src.region_code field).
const REGION_CODE_HEADER_NAME = 'cf-region-code';

// cf-timezone
const TIMEZONE_HEADER_NAME = 'cf-timezone';

// cf-metro-code: The visitor’s metro code (value from the ip.src.metro_code field).
const METRO_HEADER_NAME = 'cf-metro-code';

// cf-postal-code: The visitor’s postal code (value from the ip.src.postal_code field).
const POSTAL_HEADER_NAME = 'cf-postal-code';

export const cloudflare:GeoExtractorFunc = (headers)=> {
  if(!headers[REQUEST_ID_HEADER_NAME]) {
    return null;
  }
  return {
    reqId: headers[REQUEST_ID_HEADER_NAME],
    ip: headers[IP_HEADER_NAME],
    city: headers[CITY_HEADER_NAME],
    country: headers[COUNTRY_HEADER_NAME],
    region: headers[REGION_HEADER_NAME],
    regionCode: headers[REGION_CODE_HEADER_NAME],
    latitude: headers[LATITUDE_HEADER_NAME],
    longitude: headers[LONGITUDE_HEADER_NAME],
    continent: headers[CONTINENT_HEADER_NAME],
    metroCode: headers[METRO_HEADER_NAME],
    postalCode: headers[POSTAL_HEADER_NAME],
    timezone: headers[TIMEZONE_HEADER_NAME]
  }
}