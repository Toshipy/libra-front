'use client'

import { Button } from '@/components/ui/button'
import { Book, X } from 'lucide-react'

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList
} from '@/components/ui/command'
import { searchBooksAction } from '@/lib/actions/books/search-books'
import { useSearchStore } from '@/store/search'
import { useAction } from 'next-safe-action/hooks'
import { FC, type KeyboardEvent, useRef, useState } from 'react'

export const SearchBox: FC = () => {
  const inputRef = useRef<HTMLInputElement>(null)
  const [inputText, setInputText] = useState('')
  const [open, setOpen] = useState(false)
  const [selected, setSelected] = useState<string>()
  const setResults = useSearchStore(state => state.setResults)
  const reset = useSearchStore(state => state.reset)

  const {
    execute: executeSearch,
    result,
    status
  } = useAction(searchBooksAction, {
    onSuccess: data => {
      setResults(data.data ?? null)
    }
  })

  const handleSearch = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && inputText.trim()) {
      e.preventDefault()
      reset()
      executeSearch({ keyword: inputText })
      setOpen(true)
    }
  }

  const handleClear = () => {
    setInputText('')
    reset()
    inputRef.current?.focus()
  }

  return (
    <div className="w-full">
      <div className="flex items-center gap-2">
        <Command className="rounded-lg border shadow-md overflow-visible w-full">
          <div className="flex items-center px-3 w-full">
            <CommandInput
              ref={inputRef}
              placeholder="Search..."
              value={inputText}
              onKeyDown={handleSearch}
              onValueChange={text => {
                setInputText(text)
                if (selected) {
                  setSelected(undefined)
                }
              }}
              onFocus={() => {
                setOpen(true)
                if (selected) {
                  inputRef.current?.select()
                }
              }}
              onBlur={() => {
                setOpen(false)
              }}
              className="w-full"
            />
          </div>
          <div className="relative mt-2">
            <CommandList className="top-0 left-0 w-full rounded">
              {!selected && open && status === 'executing' && (
                <CommandEmpty>Searching...</CommandEmpty>
              )}
              {!selected &&
                open &&
                status === 'hasSucceeded' &&
                result.data?.hits === 0 && (
                  <CommandEmpty>No results found.</CommandEmpty>
                )}
              <CommandGroup>
                {open &&
                  result.data?.results.map(book => (
                    <CommandItem
                      className="flex items-center gap-2 cursor-pointer"
                      key={book.id}
                    >
                      <Book />
                      <span>{book.title}</span>
                    </CommandItem>
                  ))}
              </CommandGroup>
            </CommandList>
          </div>
        </Command>
        {inputText && (
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8"
            onClick={handleClear}
            type="button"
          >
            <X className="h-4 w-4" />
          </Button>
        )}
      </div>
    </div>
  )
}
