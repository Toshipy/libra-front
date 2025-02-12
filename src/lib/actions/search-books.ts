'use server'

import { actionClient } from '@/lib/actions/books/safe-action'
import { searchBooks } from '@/lib/services/books/search-books'
import { searchQuerySchema } from '../zod/schemas/books'

export const searchBooksAction = actionClient
  .schema(searchQuerySchema)
  .action(async ({ parsedInput }) => {
    const books = await searchBooks({
      params: { keyword: parsedInput.keyword }
    })
    return books
  })
