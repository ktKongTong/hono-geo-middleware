import type { GeoExtractorFunc } from './type.ts'

export const CITY_HEADER_NAME = 'CloudFront-Viewer-City';
export const COUNTRY_HEADER_NAME = 'CloudFront-Viewer-country';
export const IP_HEADER_NAME = 'CloudFront-Viewer-Address';
export const LATITUDE_HEADER_NAME = 'CloudFront-Viewer-Latitude';
export const LONGITUDE_HEADER_NAME = 'CloudFront-Viewer-Longitude';
export const REGION_HEADER_NAME = 'CloudFront-Viewer-Country-Region';
export const REQUEST_ID_HEADER_NAME = 'x-amz-cf-id';


export const cloudfront:GeoExtractorFunc = (headers)=> {
  if(!headers[REQUEST_ID_HEADER_NAME]) {
    return null;
  }
  return {
    ip: headers[IP_HEADER_NAME],
    city: headers[CITY_HEADER_NAME],
    country: headers[COUNTRY_HEADER_NAME],
    /* ISO 3166-2 code */
    regionCode: headers[REGION_HEADER_NAME],
    latitude: headers[LATITUDE_HEADER_NAME],
    longitude: headers[LONGITUDE_HEADER_NAME],
    region: headers[REGION_HEADER_NAME],
  }
}