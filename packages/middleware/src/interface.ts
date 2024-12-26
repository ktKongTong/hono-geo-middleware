export interface Geo {
  reqId?: string;
  ip?: string;
  city?: string;
  country?: string;
  /* ISO 3166-2 code */
  countryCode?: string;
  region?: string;
  /* ISO 3166-2 code */
  regionCode?: string;
  latitude?: string;
  longitude?: string;
  continent?: string;
  postalCode?: string;
  metroCode?: string;
  timezone?: string;
  asn?: string;
  idcRegion?: string;
  /** flag emoji */
  flag?: string;
}
