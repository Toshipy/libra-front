import 'server-only'
import { path, handleFailed, handleSucceed } from '@/lib/services/utils'
import { GetBooksResponse } from '@/lib/types/books'

export const getBooks = async (): Promise<GetBooksResponse> => {
  return fetch(path('/api/books'), {
    headers: {
      'Content-Type': 'application/json'
    },
    method: 'GET',
    cache: 'force-cache'
  })
    .then(handleSucceed)
    .catch(handleFailed)
}
