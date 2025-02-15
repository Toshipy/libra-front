'use server'

import { actionClient } from '@/lib/actions/safe-action'
import { searchBooks } from '@/lib/services/books/search-books'
import { searchQuerySchema } from '@/lib/zod/schemas/books'

export const searchBooksAction = actionClient
  .schema(searchQuerySchema)
  .action(async input => {
    const books = await searchBooks({
      params: { keyword: input.parsedInput.keyword }
    })
    return books
  })
