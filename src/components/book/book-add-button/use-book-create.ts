import { useToast } from '@/hooks/use-toast'
import { createBookAction } from '@/lib/actions/books/create-books'
import { createBookRequestSchema } from '@/lib/zod/schemas/books'
import { zodResolver } from '@hookform/resolvers/zod'
import { useHookFormAction } from '@next-safe-action/adapter-react-hook-form/hooks'

type UseBookCreateFormProps = {
  onSuccess?: () => void
}

export const useBookCreateForm = ({ onSuccess }: UseBookCreateFormProps) => {
  const { toast } = useToast()
  const form = useHookFormAction(
    createBookAction,
    zodResolver(createBookRequestSchema),
    {
      actionProps: {
        onSuccess: ({ data }) => {
          if (!data) return

          toast({
            title: '本を登録しました'
          })
          onSuccess?.()
          form.resetFormAndAction()
        },
        onError: () => {
          toast({
            variant: 'destructive',
            title: '本の登録に失敗しました',
            description: 'もう一度お試しください'
          })
        }
      },
      formProps: {
        defaultValues: {
          title: ''
        },
        mode: 'onChange'
      },
      errorMapProps: {}
    }
  )
  return { ...form }
}
