import type { Metadata } from 'next'
import './globals.css'
import { Header } from '@/components/layout/page-with-header/header/header'
import { PageWithHeader } from '@/components/layout/page-with-header/page-with-header'
import { ReactNode } from 'react'
import { UserProvider } from '@auth0/nextjs-auth0/client'

export const metadata: Metadata = {
  title: 'Libra'
}

export default function RootLayout({
  children
}: Readonly<{
  children: ReactNode
}>) {
  return (
    <UserProvider>
      <PageWithHeader header={<Header />}>{children}</PageWithHeader>
    </UserProvider>
  )
}
