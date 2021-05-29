import { IStore } from '@interfaces/general'
import { useTheme } from 'next-themes'
import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
export default function index(): React.ReactElement {
  const { theme } = useTheme()
  const auth = useSelector((state: IStore) => state.auth)
  useEffect(() => {
    if (!auth.isAuthenticated) {
      window.location.href = '/login'
    }
  }, [auth.isAuthenticated])

  return (
    <>
      <div className="light:bg-white dark:bg-nord0 h-full">Current model: {theme}</div>
    </>
  )
}
