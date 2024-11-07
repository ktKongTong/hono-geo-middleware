import { Context } from 'hono'
import { Geo } from '../interface'

export interface ExtractorOptions {

}

export type GeoExtractorFunc = (headers: Record<string, string>, c: Context, options?: ExtractorOptions)=>Geo|null