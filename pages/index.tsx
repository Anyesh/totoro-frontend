import Loading from '@components/Common/Loading'
import withAuth from '@hocs/withAuth'
import { Session } from 'next-auth'
import { signOut } from 'next-auth/client'
import React from 'react'

function index(props: { session: Session }) {
  const { session } = props

  return (
    session && (
      <>
        <Loading />
        Signed in as {session?.user?.name} <br />
        <button onClick={() => signOut()}>Sign out</button>
        {session.accessToken && <pre>User has access token</pre>}
      </>
    )
  )
}

export default withAuth(index)
