import { useCallback, useEffect, useRef, useState } from 'react'

export const useSimulatedAsync = (callback: () => void, delay: number) => {
  const [loading, setLoading] = useState(false)

  const savedCallback = useRef<() => void>()

  useEffect(() => {
    savedCallback.current = callback
  }, [callback])

  const trigger = useCallback(() => {
    setLoading(true)

    const call = () => {
      savedCallback.current?.()
      setLoading(false)
    }

    if (delay !== null) {
      const id = setTimeout(call, delay)

      return () => clearTimeout(id)
    }
  }, [callback])

  return {
    loading,
    trigger,
  }
}
