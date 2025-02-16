import { SelectGroup } from '@/components/ui/select'
import type { FC } from 'react'
import { LogoutButton } from '@/components/logout-button/logout-button'

export const HeaderDropdownMenu: FC = () => {
  return (
    <>
      <SelectGroup className="p-0 flex flex-col gap-2">
        <LogoutButton />
      </SelectGroup>
    </>
  )
}
