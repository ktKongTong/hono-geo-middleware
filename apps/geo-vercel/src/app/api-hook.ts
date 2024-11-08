import {useEffect, useState} from "react";



const providerHostName = {
  'vercel': '/api/geo',
  'cloudflare':`${process.env.NEXT_PUBLIC_CF_WORKER_URL}/geo`,
  'cloudflare-worker':`${process.env.NEXT_PUBLIC_CF_WORKER_URL}/geo`,
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
  const availableProvider = ['vercel', 'cloudflare', 'cloudflare-worker']
  const [provider, setProvider] = useState('vercel')
  const [geo, setGeo] = useState<Record<string, any> | null>(null)
  const [status, setStatus] = useState<Status>(defaultStatus)
  const req = async ()=> {
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
    provider,
    setProvider,
    geo,
    availableProvider
  }
}