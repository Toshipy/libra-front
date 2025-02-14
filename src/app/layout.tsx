import type { Metadata } from 'next'
import './globals.css'
import { ReactNode } from 'react'
import { PageWithHeader } from '@/components/layout/page-with-header/page-with-header'
import { Header } from '@/components/layout/page-with-header/header/header'

export const metadata: Metadata = {
  title: 'Libra'
}

export default function RootLayout({
  children
}: Readonly<{
  children: ReactNode
}>) {
  return <PageWithHeader header={<Header />}>{children}</PageWithHeader>
}
