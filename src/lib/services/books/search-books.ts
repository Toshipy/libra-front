import 'server-only'
import { path, handleFailed, handleSucceed } from '@/lib/services/utils'
import { SearchBooksRequest, SearchBooksResponse } from '@/lib/types/books'

export const searchBooks = async ({
  params: { keyword }
}: SearchBooksRequest): Promise<SearchBooksResponse> => {
  // console.log('API called with keyword:', keyword)
  return fetch(
    path(`/api/books/search?${new URLSearchParams({ keyword: encodeURIComponent(keyword) })}
    `),
    {
      headers: {
        'Content-Type': 'application/json'
      },
      method: 'GET',
      cache: 'force-cache'
    }
  )
    .then(handleSucceed)
    .catch(handleFailed)
}
