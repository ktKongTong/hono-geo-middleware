
import { vercel } from './vercel'
import { cloudflareWorker } from './cloudflare-worker'
import { cloudflare } from './cloudflare'
import { netlify } from './netlify'
import { GeoExtractorFunc } from './type'
import { cloudfront } from './cloudfront'


export const extractorFuncs: GeoExtractorFunc[] = [
  vercel,
  cloudflareWorker,
  cloudflare,
  netlify,
  cloudfront
]

// const res = await import('./netlify')
export const extractorFuncsMap = {
  'vercel': vercel,
  'cloudflare': cloudflare,
  'cloudflare-worker': cloudflareWorker,
  'netlify': netlify,
  'cloudfront': cloudfront
}

export type Extractor = (keyof typeof extractorFuncsMap) | GeoExtractorFunc