import { useTheme } from 'next-themes'
import React from 'react'
export default function index(): React.ReactElement {
  const { theme } = useTheme()
  return (
    <>
      <div className="light:bg-white dark:bg-nord0 h-full">Current model: {theme}</div>
    </>
  )
}
