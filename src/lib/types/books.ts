import { z } from 'zod'
import {
  bookSchema,
  booksSchema,
  createBookRequestSchema,
  createBookResponseSchema,
  getBookRequestSchema,
  getBookResponseSchema,
  getBooksRequestSchema,
  getBooksResponseSchema,
  searchBooksRequestSchema,
  searchBooksResponseSchema
} from '../zod/schemas/books'

export type Book = z.infer<typeof bookSchema>
export type Books = z.infer<typeof booksSchema>

// Get Book
export type GetBookRequest = z.infer<typeof getBookRequestSchema>
export type GetBookResponse = z.infer<typeof getBookResponseSchema>

// Get Books
export type GetBooksRequest = z.infer<typeof getBooksRequestSchema>
export type GetBooksResponse = z.infer<typeof getBooksResponseSchema>

// Search Books
export type SearchBooksRequest = z.infer<typeof searchBooksRequestSchema>
export type SearchBooksResponse = z.infer<typeof searchBooksResponseSchema>

// Create Book
export type CreateBookRequest = z.infer<typeof createBookRequestSchema>
export type CreateBookResponse = z.infer<typeof createBookResponseSchema>
