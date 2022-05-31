import { useState, useCallback, useRef, useEffect } from 'react'

function getDefaultHeaders(options) {
    const headers = new Headers()
    const token = localStorage.getItem('accessToken').replaceAll("\"", "")
    headers.append("Authorization", `Bearer ${token}` ?? '')

    const body = options?.body
    const isFormData = body ? (body instanceof FormData) : false

    if (!isFormData) {
        headers.append("Content-Type", isFormData ? 'multipart/form-data' : 'application/json')
    }

    return headers
}

export const useHttp = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState()

  const activeHttpRequests = useRef([])

  const sendRequest = useCallback(
    async (url, method = "GET", body = null,  ...options) => {

      setIsLoading(true)
      const httpAbortCtrl = new AbortController()
      activeHttpRequests.current.push(httpAbortCtrl)
      const headers = getDefaultHeaders(options)

      try {
        const response = await fetch(url, {
          method,
          body,
          ...options,
          headers,
          signal: httpAbortCtrl.signal
        })

        const responseData = await response.json()

        activeHttpRequests.current = activeHttpRequests.current.filter(
          reqCtrl => reqCtrl !== httpAbortCtrl
        )

        if (!response.ok) {
          throw new Error(responseData.message)
        }

        setIsLoading(false)
        return responseData
      } catch (error) {
        setError(error.message)
        setIsLoading(false)
        throw error
      }
    },
    []
  )

  const clearError = () => {
    setError(null)
  }

  useEffect(() => {
    return () => {
      activeHttpRequests.current.forEach(abortCtrl => abortCtrl.abort())
    }
  }, [])

  return [isLoading, error, sendRequest, clearError]
}