'use server'

import { createBook } from '@/lib/services/books/create-book'
import { createBookRequestSchema } from '@/lib/zod/schemas/books'
import { actionClient } from '../safe-action'

export const createBookAction = actionClient
  .schema(createBookRequestSchema)
  .action(async ({ parsedInput }) => {
    const book = await createBook({ body: parsedInput })
    console.log('createBookAction', book)

    return {
      book
    }
  })
