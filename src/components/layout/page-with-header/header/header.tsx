import { Button } from '@/components/ui/button'
import type { FC } from 'react'
import { HeaderLogo } from '../header-logo/header-logo'

export const Header: FC = () => {
  return (
    <div className="flex items-center justify-between px-4 py-2">
      <div className="flex items-center gap-3">
        <HeaderLogo />
      </div>
    </div>
  )
}
