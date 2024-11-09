import {useEffect, useState} from "react";


const availableProvider = ['vercel', 'cloudflare', 'cloudflare-worker', 'netlify']

const providerHostName = {
  'vercel': '/api/geo',
  'cloudflare':`${process.env.NEXT_PUBLIC_CF_WORKER_URL}/geo`,
  'cloudflare-worker':`${process.env.NEXT_PUBLIC_CF_WORKER_URL}/geo`,
  'netlify': `${process.env.NEXT_PUBLIC_NETLIFY_URL}/geo`
}

const request = (provider: string)=> {
  return fetch(providerHostName[provider as keyof typeof providerHostName]).then(res => res.json()).catch(err => null);
}

type Status = {
  loading: boolean,
  error: Error | null,
  success: boolean,
}

const defaultStatus = {
  loading: false,
  success: false,
  error: null
}


export const useGeo = ()=> {

  const [provider, setProvider] = useState('vercel')
  const [geo, setGeo] = useState<Record<string, any> | null>(null)
  const [preData, setPreData] = useState<Record<string, any> | null>(null)
  const [status, setStatus] = useState<Status>(defaultStatus)
  const req = async ()=> {
    setPreData(geo)
    setStatus({
      loading: true,
      success: false,
      error: null
    })
    try {
      const res = await request(provider ?? 'vercel')
      setGeo(res)
      setStatus({
        loading: false,
        error: null,
        success: true,
      })
    }catch(err){
      setGeo(null)
      setStatus({
        loading: false,
        error: err as any,
        success: false,
      })
    }
  }
  useEffect(() => {
    const r = req()
  }, [provider])
  return {
    status,
    preData,
    provider,
    setProvider,
    geo,
    availableProvider
  }
}