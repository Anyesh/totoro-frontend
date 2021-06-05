import Loadin from '@assets/IconComponents/Loadin'
import React from 'react'
export default function Loading(): React.ReactElement {
  return (
    <div className="grid place-items-center p-20">
      <h1 className="flex items-center">
        <Loadin className="animate-bounce fill-current" />
        <span className="ml-5 animate-pulse font-light">loading...</span>
      </h1>
    </div>
  )
}
