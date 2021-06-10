import { Placeholder } from '@assets/IconComponents'
import React from 'react'

export default function ImageLoading(): React.ReactElement {
  return (
    <>
      {Array.from({ length: 30 }, (_, i) => (
        <Placeholder className="fill-current" />
      ))}
    </>
  )
}
