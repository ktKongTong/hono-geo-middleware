import {useEffect, useState} from "react";

const request = (host: string)=> {
  return fetch(`${host}`).then(res => res.json())
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

const providerHostName = {
  'vercel': '/api/geo',
  'cloudflare':'https://geo-cf-worker.kt-f63.workers.dev/geo',
  'cloudflare-worker':'https://geo-cf-worker.kt-f63.workers.dev/geo',
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
      const res = await request(providerHostName[provider as keyof typeof providerHostName] ?? 'vercel')
      setGeo(res)
      setStatus({
        loading: false,
        error: null,
        success: true,
      })
    }catch(err){
      setStatus({
        loading: false,
        error: err as any,
        success: false,
      })
    }
  }
  useEffect(() => {
    setGeo(null)
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