import 'server-only'
import { path, handleFailed, handleSucceed } from '@/lib/services/utils'
import { CreateBookRequest, CreateBookResponse } from '@/lib/types/books'

export const createBook = async ({
  body
}: {
  body: CreateBookRequest
}): Promise<CreateBookResponse> => {
  console.log('createBook', body)
  return fetch(path('/books'), {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  })
    .then(handleSucceed)
    .catch(handleFailed)
}
