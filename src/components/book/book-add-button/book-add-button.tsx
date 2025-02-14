import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { FC } from 'react'

export const BookAddButton: FC = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="secondary">追加する</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>本を追加する</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="title" className="text-right">
              タイトル
            </Label>
            <Input id="title" value="" className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="story" className="text-right">
              ストーリー
            </Label>
            <Input id="story" value="" className="col-span-3" />
          </div>
        </div>
        <DialogFooter>
          <Button type="submit">追加する</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
