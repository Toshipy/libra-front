'use client'

import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog'
import { Form } from '@/components/ui/form'
import { InputFormField } from '@/components/ui/input-form-field'
import { Typography } from '@/components/ui/typography'
import { Loader2 } from 'lucide-react'
import { FC, useState } from 'react'
import { useBookCreateForm } from './use-book-create'

export const BookAddButton: FC = () => {
  const [open, setOpen] = useState(false)
  const { form, handleSubmitWithAction } = useBookCreateForm({
    onSuccess: () => {
      setOpen(false)
      form.reset()
    }
  })

  const openCreateBookDialog = () => {
    setOpen(true)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button onClick={openCreateBookDialog} variant="secondary">
          追加する
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>本を追加する</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form id="book-create-form" onSubmit={handleSubmitWithAction}>
            <div className="flex flex-col justify-start gap-2 py-4 mb-4">
              <Typography className="text-left font-bold">タイトル</Typography>
              <InputFormField
                control={form.control}
                name="title"
                placeholder="タイトルを入力してください"
                required={true}
              />
            </div>
            <DialogFooter>
              <Button
                disabled={
                  form.formState.isSubmitting ||
                  !form.formState.isDirty ||
                  !form.formState.isValid
                }
                form="book-create-form"
                type="submit"
                variant="secondary"
              >
                {form.formState.isSubmitting && (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                )}
                追加する
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
