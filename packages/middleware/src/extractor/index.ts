
import { vercel } from './vercel.ts'
import { cloudflareWorker } from './cloudflare-worker.ts'
import { cloudflare } from './cloudflare.ts'
import { netlify } from './netlify.ts'
import type { GeoExtractorFunc } from './type.ts'
import { cloudfront } from './cloudfront.ts'


export const extractorFuncs: GeoExtractorFunc[] = [
  vercel,
  cloudflareWorker,
  cloudflare,
  netlify,
  cloudfront
]

export const extractorFuncsMap = {
  'vercel': vercel,
  'cloudflare': cloudflare,
  'cloudflare-worker': cloudflareWorker,
  'netlify': netlify,
  'cloudfront': cloudfront
}

export type Extractor = (keyof typeof extractorFuncsMap) | GeoExtractorFunc