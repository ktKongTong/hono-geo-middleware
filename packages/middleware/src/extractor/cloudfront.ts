import type { GeoExtractorFunc } from './type.ts'
import {getFlagFromCountryCode, tryDecodeURIText} from "../util.ts";

const IP_HEADER_NAME = 'CloudFront-Viewer-Address';

const CITY_HEADER_NAME = 'CloudFront-Viewer-City';
const COUNTRY_CODE_HEADER_NAME = 'CloudFront-Viewer-Country';
const COUNTRY_NAME_HEADER_NAME = 'CloudFront-Viewer-Country-Name';
const REGION_CODE_HEADER_NAME = 'CloudFront-Viewer-Country-Region';
const REGION_NAME_HEADER_NAME = 'CloudFront-Viewer-Country-Region-Name';

const LATITUDE_HEADER_NAME = 'CloudFront-Viewer-Latitude';
const LONGITUDE_HEADER_NAME = 'CloudFront-Viewer-Longitude';
const TIMEZONE_HEADER_NAME = 'CloudFront-Viewer-Time-Zone';

const METRO_CODE_HEADER_NAME = 'CloudFront-Viewer-Metro-Code';
const POSTAL_CODE_HEADER_NAME = 'CloudFront-Viewer-Postal-Code';

const ASN_HEADER_NAME = 'CloudFront-Viewer-ASN';

const REQUEST_ID_HEADER_NAME = 'x-amz-cf-id';

// aws lambda@edge
// see https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/adding-cloudfront-headers.html#cloudfront-headers-viewer-location
export const cloudfront:GeoExtractorFunc = (headers)=> {
  if(!headers[REQUEST_ID_HEADER_NAME]) {
    return null;
  }
  return {
    reqId: headers[REQUEST_ID_HEADER_NAME],
    ip: headers[IP_HEADER_NAME],
    city: tryDecodeURIText(headers[CITY_HEADER_NAME]),
    country: headers[COUNTRY_NAME_HEADER_NAME],
    countryCode: headers[COUNTRY_CODE_HEADER_NAME],
    region: headers[REGION_NAME_HEADER_NAME],
    regionCode: headers[REGION_CODE_HEADER_NAME],
    latitude: headers[LATITUDE_HEADER_NAME],
    longitude: headers[LONGITUDE_HEADER_NAME],
    // continent?: string;
    postalCode: headers[POSTAL_CODE_HEADER_NAME],
    metroCode: headers[METRO_CODE_HEADER_NAME],
    timezone: headers[TIMEZONE_HEADER_NAME],
    asn: headers[ASN_HEADER_NAME],
    // idcRegion?
    flag: getFlagFromCountryCode(headers[COUNTRY_CODE_HEADER_NAME]),
  }
}