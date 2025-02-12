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
import { useDebounce } from '@/lib/hooks/use-debounce'
import { Books } from '@/lib/types/books'
import { useAction } from 'next-safe-action/hooks'
import { FC, useEffect, useRef, useState } from 'react'

// type SearchBoxProps = {
//   books: Books
// }

// const books = [
//   {
//     id: 1,
//     title: '桃太郎',
//     story:
//       '桃川上から流れてきた大きな桃から生まれた桃太郎が、犬・猿・きじを家来にして、鬼を討伐する',
//     attributes: ['正義感', 'チームワーク', '勇気']
//   },
//   {
//     id: 2,
//     title: '浦島太郎',
//     story:
//       '浦島太郎は、亀を助けたことで竜宮城へ招かれ、そこで時の流れを忘れる。しかし、地上に戻ると時が大きく過ぎていて驚く。',
//     attributes: ['弱いものを守る', '約束', '玉手箱']
//   },
//   {
//     id: 3,
//     title: 'かぐや姫',
//     story:
//       '竹の中から現れた美しい女性、かぐや姫は多くの求婚者を試しふるいにかけ、最終的には月に帰る。',
//     attributes: ['知的', 'お金と権力', '結婚']
//   },
//   {
//     id: 4,
//     title: '一寸法師',
//     story:
//       '一寸法師は非常に小さな男の子で、大小の武器を使って大きな冒険を繰り広げる。最終的には巨大な鬼を倒す。',
//     attributes: ['お椀の舟', '機転', '打ち出の小槌']
//   },
//   {
//     id: 5,
//     title: '金太郎',
//     story:
//       '赤い服を着た力持ちの金太郎は、山の動物たちと毎日楽しく過ごしていた。最終的にはお偉いさんの家来となる。',
//     attributes: ['強い', '急ぐな休むな', 'まさかり']
//   }
// ]

export const SearchBox: FC = () => {
  // export const SearchBox: FC<SearchBoxProps> = () => {
  const inputRef = useRef<HTMLInputElement>(null)
  const [inputText, setInputText] = useState('')
  const [open, setOpen] = useState(false)
  const [selected, setSelected] = useState<string>()
  const debouncedText = useDebounce(inputText, 500)

  const {
    execute: executeSearch,
    result,
    status
  } = useAction(searchBooksAction)

  // const handleSearch = (text: string) => {
  //   if (!text) return
  //   executeSearch({ keyword: inputText })
  // }

  useEffect(() => {
    if (debouncedText) {
      // console.log('Executing search with:', debouncedText)
      executeSearch({ keyword: debouncedText })
    }
  }, [debouncedText, executeSearch])

  return (
    <Command
      value={selected}
      className="rounded-lg border shadow-md md:min-w-[450px] overflow-visible w-[512px]"
    >
      <CommandInput
        placeholder="Search..."
        value={inputText}
        onValueChange={text => {
          setInputText(text)
          // handleSearch(text)
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
            result.data?.length === 0 && (
              <CommandEmpty>No results found.</CommandEmpty>
            )}
          <CommandGroup>
            {open &&
              // books?.map(book => (
              result.data?.map(book => (
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
