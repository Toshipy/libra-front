import { z } from 'zod'

export const bookSchema = z.object({
  id: z.number(),
  title: z.string(),
  story: z.string(),
  attributes: z.array(z.string()),
  created_at: z.string(),
  updated_at: z.string()
})

export const booksSchema = z.array(bookSchema)

// Get Book
export const getBookParamsSchema = bookSchema.pick({
  id: true
})
export const getBookRequestSchema = z.object({
  params: getBookParamsSchema
})
export const getBookResponseSchema = bookSchema

// Get Books
export const getBooksParamsSchema = z.object({
  keyword: z.string()
})
export const getBooksRequestSchema = z.object({
  params: getBooksParamsSchema
})
export const getBooksResponseSchema = booksSchema

// Search Books
export const searchBooksParamsSchema = z.object({
  keyword: z.string()
})
export const searchBooksRequestSchema = z.object({
  params: searchBooksParamsSchema
})
export const searchQuerySchema = z.object({
  keyword: z.string().min(1).max(100)
})
export const searchResultSchema = z.object({
  hits: z.number(),
  results: z.array(bookSchema)
})
export const searchBooksResponseSchema = searchResultSchema
