'use client'

import { Button } from '@/components/ui/button'
import { Logo } from '@/components/ui/logo'
import { HOME } from '@/lib/constants/route'
import { usePathname, useRouter } from 'next/navigation'
import type { FC } from 'react'

export const HeaderLogo: FC = () => {
  const router = useRouter()
  const pathname = usePathname()
  const home = `${HOME}`

  const handleClick = () => {
    if (pathname === home) {
      router.refresh()
      return
    }
    router.push(home)
  }

  return (
    <Button
      className="p-0 hover:bg-transparent"
      onClick={handleClick}
      variant="ghost"
    >
      <Logo height={40} width={40} />
    </Button>
  )
}
