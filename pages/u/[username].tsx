import { getUserDetails } from '@actions/auth'
import withAuth from '@hocs/withAuth'
import { IUserDetail } from '@types'
import { Session } from 'next-auth'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'

function User({ session }: { session: Session }): React.ReactElement {
  const router = useRouter()

  const [userDetails, setUserDetails] = useState<IUserDetail | null>()

  useEffect(() => {
    if (!session) {
      return
    }

    const getDetails = async () => {
      const d = await getUserDetails(session?.accessToken as string)
      setUserDetails(d)
    }
    getDetails()
  }, [])

  return (
    <div>
      <h1>User: {router.query.username}</h1>
      <h1>{userDetails?.details}</h1>
      <pre>{JSON.stringify(router, null, 2)}</pre>
    </div>
  )
}

// export const getStaticPaths: GetStaticPaths = async () => {
//   // Return a list of possible value for id
// }

// export const getStaticProps: GetStaticProps = async ({ params }) => {
//   // Return a list of possible value for id
// }

export default withAuth(User)
