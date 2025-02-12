import 'server-only'
import { path, handleFailed, handleSucceed } from '@/lib/services/utils'
import { SearchBooksRequest, SearchBooksResponse } from '@/lib/types/books'

export const searchBooks = async ({
  params: { keyword }
}: SearchBooksRequest): Promise<SearchBooksResponse> => {
  const url = path(`/books?keyword=${encodeURIComponent(keyword)}`)
  console.log('Request URL:', url)
  return fetch(url, {
    headers: {
      'Content-Type': 'application/json'
    },
    method: 'GET',
    cache: 'no-store'
  })
    .then(handleSucceed)
    .catch(handleFailed)
}
