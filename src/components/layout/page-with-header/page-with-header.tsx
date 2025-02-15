import { Geist, Geist_Mono } from 'next/font/google'
import { FC, ReactNode } from 'react'

type Props = {
  header: ReactNode
  children: ReactNode
}

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin']
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin']
})

export const PageWithHeader: FC<Props> = ({ header, children }) => {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <div className="fixed left-0 top-0 flex h-screen w-screen flex-col">
          <header className="border-b border-stroke">{header}</header>
          {children}
        </div>
      </body>
    </html>
  )
}
