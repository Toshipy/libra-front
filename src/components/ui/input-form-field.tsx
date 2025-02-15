import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form'
import { Input, InputProps } from '@/components/ui/input'
import type { JSX } from 'react'
import type { Control, FieldPath, FieldValues } from 'react-hook-form'

type Props<TFieldValues extends FieldValues> = {
  control: Control<TFieldValues>
  name: FieldPath<TFieldValues>
  label?: string
} & InputProps

export const InputFormField = <TFieldValues extends FieldValues>({
  control,
  name,
  label,
  required = false,
  placeholder = label,
  type = 'text'
}: Props<TFieldValues>): JSX.Element => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          {label && (
            <FormLabel className="font-bold">
              {label}
              {required && <span className="text-lg text-red-500">*</span>}
            </FormLabel>
          )}
          <FormControl>
            <Input placeholder={placeholder} type={type} {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}
