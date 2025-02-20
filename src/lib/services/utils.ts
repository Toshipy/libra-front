import { notFound } from 'next/navigation'
import { logger } from '../logger'

export const host = process.env.NEXT_PUBLIC_API_HOST

export const path = (path?: string) => {
  if (!path) return `${host}/`
  return `${host}/${path.replace(/^\//, '')}`
}

export class FetchError extends Error {
  status: number
  constructor(message: string, status: number) {
    super(message)
    this.status = status
  }
}

export const handleSucceed = async (res: Response) => {
  if (!res.ok) {
    if (res.status === 404) {
      notFound()
    }
    throw new FetchError(res.statusText, res.status)
  }
  try {
    return await res.json()
  } catch (error) {
    logger.error({ message: error }, 'Failed to parse JSON response.')
    return null
  }
}

export const handleFailed = async (error: unknown) => {
  if (error instanceof FetchError) {
    logger.error(
      { message: error.message, status: error.status },
      'Failed to fetch data.'
    )
    return null
  }

  throw error
}
