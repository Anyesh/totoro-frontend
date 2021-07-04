import { useRouter } from 'next/router'

import React, { useEffect, useState } from 'react'

function error(): React.ReactElement {
  const router = useRouter()
  const [error, setError] = useState<string | string[] | null | undefined>()

  useEffect(() => {
    setError(router?.query?.error)
  }, [router?.query?.error])

  const renderErrorContent = () => {
    if (error) return <h1>{error}</h1>
  }

  return <div>{renderErrorContent()}</div>
}

export default error
