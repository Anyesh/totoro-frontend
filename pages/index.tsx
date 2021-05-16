import { useTheme } from 'next-themes'
import React from 'react'
export default function index() {
  const { theme, setTheme } = useTheme()
  return (
    <>
      <div className="light:bg-white dark:bg-nord0 h-full">
        Current model: {theme}
        <button
          aria-label="Toggle Dark Mode"
          type="button"
          className="p-3 h-12 w-12 order-2 md:order-3  dark:bg-darkgrey light:bg-white"
          onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
        >
          Dark mode
        </button>
      </div>
    </>
  )
}
