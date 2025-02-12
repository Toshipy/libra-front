import { SearchBox } from '@/components/search-box/search-box'
import { Typography } from '@/components/ui/typography'

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <div className="w-full max-w-[584px]">
        <div className="flex flex-col">
          <Typography variant="3xl" className="text-center">
            Your library.
          </Typography>
        </div>
        <div className="flex items-center size-full justify-center p-4">
          <SearchBox />
        </div>
      </div>
    </div>
  )
}
