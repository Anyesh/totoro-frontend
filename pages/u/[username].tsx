import { fetcher } from '@config/axios-config'
import withAuth from '@hocs/withAuth'
import { Session } from 'next-auth'
import { signOut } from 'next-auth/client'
import Head from 'next/head'
import { useRouter } from 'next/router'
import React, { useEffect } from 'react'
import useSWR from 'swr'

function User({ session }: { session: Session }): React.ReactElement {
  const router = useRouter()
  const { data, error } = useSWR(['/user/ping/', session.accessToken], fetcher)

  useEffect(() => {
    if (!session) {
      signOut()
    }
  }, [])

  const renderContent = () => {
    if (error) {
      return 'There was an error' + error?.message
    }
    if (!error && !data) {
      return 'Loading....'
    }

    return <code>{data?.data?.details}</code>
  }
  return (
    <>
      <Head>
        <title>Totoro | {router.query.username}</title>
      </Head>
      <div className="text-center flex justify-center items-center">
        <div>
          <h1>You are viewing {router.query.username}&apos;s profile!</h1>
          <p>Following detail is from the backend:</p>
          {renderContent()}
        </div>
      </div>
    </>
  )
}

// export const getStaticPaths: GetStaticPaths = async () => {
//   // Return a list of possible value for id
// }

// export const getStaticProps: GetStaticProps = async ({ params }) => {
//   // Return a list of possible value for id
// }

export default withAuth(User)
