'use client'

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import { Typography } from '@/components/ui/typography'
import { useSearchStore } from '@/store/search'
import { FC } from 'react'

export const SearchResults: FC = () => {
  const results = useSearchStore(state => state.results)

  if (!results) return null

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
      {results.results.map(book => (
        <Card key={book.id}>
          <CardHeader>
            <CardTitle>{book.title}</CardTitle>
          </CardHeader>
          <CardContent>
            <CardDescription className="line-clamp-3">
              {book.story}
            </CardDescription>
            <div className="flex gap-2 mt-4 flex-wrap">
              {book.attributes.map((attr, index) => (
                <Typography
                  key={index}
                  variant="sm"
                  className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-full"
                >
                  {attr}
                </Typography>
              ))}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
