import Image from 'next/image'
import type { ImageProps } from 'next/image'
import type { FC } from 'react'

type Props = {} & Omit<ImageProps, 'src' | 'alt'>

export const Logo: FC<Props> = ({ width, height, ...props }) => {
  return (
    <Image
      alt=""
      src="/logo/libra.jpg"
      width={width}
      height={height}
      {...props}
    />
  )
}
