import React, { useState } from 'react'

export const useFetch = async (url) => {
  const [results, setResults] = useState()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState()

  const res = await fetch(url)
  console.log(res)

  return { results, loading, error }
}
