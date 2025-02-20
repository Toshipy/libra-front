'use client'

import { LogOutIcon } from 'lucide-react'
import { Button } from '../ui/button'

export const LogoutButton = () => {
  const handleClick = () => {
    document.cookie = 'max-age=0; path=/;'
  }

  return (
    <Button variant="ghost" onClick={handleClick}>
      <LogOutIcon className="w-4 h-4" />
      <a href="/auth/logout">ログアウト</a>
    </Button>
  )
}
