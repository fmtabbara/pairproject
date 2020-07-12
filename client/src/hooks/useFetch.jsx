import React, { useState } from 'react'

export const useFetch = () => {
  const [results, setResults] = useState()
  const [response, setResponse] = useState()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState()

  const baseOpts = {
    headers: {
      accept: 'application/json',
      'content-type': 'application/json',
    },
  }

  const fetchUrl = async (url, opts) => {
    setLoading(true)
    try {
      const response = await fetch(url, { ...baseOpts, ...opts })
      setResponse(response)
      if (response?.status === 200) {
        const json = await response.json()
        setResults(json)
        setError(false)
        setLoading(false)
      } else {
        setError(response?.statusText)
        setLoading(false)
      }
    } catch (e) {
      setError(e)
      setLoading(false)
    }
  }

  return { fetch: fetchUrl, results, response, loading, error }
}
