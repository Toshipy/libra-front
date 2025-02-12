import { useEffect, useState } from 'react'

export async function useDebounce<T>(
  value: T,
  delay: number = 500
): Promise<T> {
  const [debouncedValue, setDebouncedValue] = useState(value)

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value)
    }, delay)

    return () => clearTimeout(timer)
  }, [value, delay])

  return debouncedValue
}
