import Loadin from '@assets/IconComponents/Loadin'
import React from 'react'
export default function Loading(): React.ReactElement {
  return (
    <div className="grid place-items-center">
      <h1 className="flex items-center">
        <Loadin className="animate-spin" />
        <span className="ml-5 animate-pulse font-light">Loading</span>
      </h1>
    </div>
  )
}
