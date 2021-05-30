import axiosInstance from '@config/axios-config'
import { useTheme } from 'next-themes'
import { useRouter } from 'next/dist/client/router'
import React, { useEffect } from 'react'

function index(): React.ReactElement {
  const { theme } = useTheme()
  const router = useRouter()

  useEffect(() => {
    axiosInstance('/api/user/whoami/', {
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((res) => {
        console.log(res)
      })
      .catch(() => {
        router.push('/login', undefined, { shallow: true })
      })
  }, [])

  return (
    <>
      <div className="light:bg-white dark:bg-nord0 h-full">Current model: {theme}</div>
    </>
  )
}

export default index
