import { cn } from '@/lib/utils'
import { Slot } from '@radix-ui/react-slot'
import { cva } from 'class-variance-authority'
import type { VariantProps } from 'class-variance-authority'
import { forwardRef } from 'react'
import type { HTMLAttributes } from 'react'

const typographyVariants = cva('text-text-main', {
  variants: {
    variant: {
      '6xl': 'text-6xl leading-none',
      '5xl': 'text-5xl leading-none',
      '4xl': 'text-4xl font-bold leading-tight',
      '3xl': 'text-[28px] font-bold leading-tight',
      '2xl': 'text-2xl leading-normal',
      xl: 'text-xl leading-normal',
      lg: 'text-lg leading-normal',
      base: 'text-base leading-normal',
      sm: 'text-sm',
      xs: 'text-xs'
    }
  },
  defaultVariants: {
    variant: 'base'
  }
})

type VariantPropType = VariantProps<typeof typographyVariants>

const variantElementMap: Record<
  NonNullable<VariantPropType['variant']>,
  string
> = {
  '6xl': 'h1',
  '5xl': 'h2',
  '4xl': 'h3',
  '3xl': 'h4',
  '2xl': 'h5',
  xl: 'h6',
  lg: 'div',
  base: 'div',
  sm: 'div',
  xs: 'div'
}

export type Props = {
  asChild?: boolean
  as?: string
} & HTMLAttributes<HTMLElement> &
  VariantProps<typeof typographyVariants>

const Typography = forwardRef<HTMLElement, Props>(
  ({ className, variant, as, asChild, ...props }, ref) => {
    const Comp = asChild
      ? Slot
      : (as ?? (variant ? variantElementMap[variant] : undefined) ?? 'div')
    return (
      <Comp
        className={cn(typographyVariants({ variant, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)

Typography.displayName = 'Typography'

export { Typography, typographyVariants }
