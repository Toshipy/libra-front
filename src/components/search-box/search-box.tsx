'use client'

import { Book } from 'lucide-react'

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList
} from '@/components/ui/command'
import { searchBooksAction } from '@/lib/actions/search-books'
import { useAction } from 'next-safe-action/hooks'
import { FC, type KeyboardEvent, useRef, useState } from 'react'

export const SearchBox: FC = () => {
  const inputRef = useRef<HTMLInputElement>(null)
  const [inputText, setInputText] = useState('')
  const [open, setOpen] = useState(false)
  const [selected, setSelected] = useState<string>()

  const {
    execute: executeSearch,
    result,
    status
  } = useAction(searchBooksAction)

  const handleSearch = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && inputText.trim()) {
      e.preventDefault()
      executeSearch({ keyword: inputText })
      setOpen(true)
    }
  }

  console.log('Search results:', result.data)

  return (
    <Command
      value={selected}
      className="rounded-lg border shadow-md md:min-w-[450px] overflow-visible w-[512px]"
    >
      <CommandInput
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
      />
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
  )
}
