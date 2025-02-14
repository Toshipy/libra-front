import { BookAddButton } from '@/components/book/book-add-button/book-add-button'
import { SearchBox } from '@/components/search-box/search-box'
import { SearchResults } from '@/components/search-results/search-results'
import { Button } from '@/components/ui/button'
import { Typography } from '@/components/ui/typography'

export default async function Home() {
  return (
    <div>
      <div className="flex items-center justify-end p-4">
        <BookAddButton />
      </div>
      <div className="flex flex-col items-center justify-center min-h-screen">
        <div className="relative top-[-200px] w-full max-w-[584px]">
          <div className="flex flex-col gap-4">
            <Typography variant="3xl" className="text-center">
              Your library.
            </Typography>
            <SearchBox />
          </div>
        </div>
        <div className="w-full max-w-7xl px-4">
          <SearchResults />
        </div>
      </div>
    </div>
  )
}
