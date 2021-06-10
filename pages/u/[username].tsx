import { getUserDetails } from '@actions/auth'
import withAuth from '@hocs/withAuth'
import { IUserDetail } from '@types'
import { Session } from 'next-auth'
import { signOut } from 'next-auth/client'
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
      if (d) {
        setUserDetails(d)
      } else {
        signOut()
      }
    }
    getDetails()
  }, [])

  return (
    <div className="text-center flex justify-center items-center">
      <div>
        <h1>You are viewing {router.query.username}&apos;s profile!</h1>
        <p>The following detail is from the backend:</p>
        <code>{userDetails?.details}</code>
      </div>
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
