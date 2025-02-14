import { SearchBooksResponse } from '@/lib/types/books'
import { create } from 'zustand'

type SearchStore = {
  results: SearchBooksResponse | null
  setResults: (results: SearchBooksResponse | null) => void
  reset: () => void
}

export const useSearchStore = create<SearchStore>(set => ({
  results: null,
  setResults: results => set({ results }),
  reset: () => set({ results: null })
}))
