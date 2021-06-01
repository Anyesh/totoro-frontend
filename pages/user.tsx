import { ROOT_API } from '@config'
import withAuth from '@hocs/withAuth'
import { Session } from 'next-auth'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'

interface IPost {
  details: string
}
function user({ session }: { session: Session }): React.ReactElement {
  const [posts, setPosts] = useState<IPost>()
  const [fetchingPosts, setFetchingPosts] = useState<boolean>(false)

  useEffect(() => {
    if (!session) {
      return
    }
    async function getPosts() {
      setFetchingPosts(true)
      const response = await fetch(ROOT_API + '/user/ping/', {
        method: 'get',
        headers: new Headers({
          Authorization: `Bearer ${session?.accessToken}`,
        }),
      })

      if (response.ok) {
        const postData = await response.json()

        setPosts(postData)
      }

      setFetchingPosts(false)
    }
    // initiate the post fetching mechanism once
    getPosts()
  }, [session])

  return (
    <div>
      {fetchingPosts}
      <h2>Fetched at {JSON.stringify(new Date())}</h2>
      <Link href="/">Back to homepage</Link>
      <h1>BACKED FROM: {posts?.details}</h1>
    </div>
  )
}

export default withAuth(user)
