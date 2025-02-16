'use client'

import { Button } from '@/components/ui/button'

export const LogoutButton = () => {
  return (
    <Button variant="secondary" asChild>
      <a href="/api/auth/logout">ログアウト</a>
    </Button>
  )
}
