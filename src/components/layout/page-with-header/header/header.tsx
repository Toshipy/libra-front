import type { FC } from 'react'
import { HeaderLogo } from '../header-logo/header-logo'
import { HeaderDropdownMenu } from './header-dropdown-menu/header-dropdown-menu'

export const Header: FC = () => {
  return (
    <div className="flex items-center justify-between px-4 py-2">
      <div className="flex items-center gap-3">
        <HeaderLogo />
      </div>
      <HeaderDropdownMenu />
    </div>
  )
}
