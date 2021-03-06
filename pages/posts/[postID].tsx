import PostDetails from '@components/PostDetails'
import withAuth from '@hocs/withAuth'
import isEmpty from '@validations/is-empty'
import { Session } from 'next-auth'
import { useRouter } from 'next/router'
import React from 'react'

function Post({ session }: { session: Session }): React.ReactElement {
  const router = useRouter()
  const { postID } = router.query
  return (
    <div className="">
      {!isEmpty(postID) && <PostDetails id={postID as string} session={session} />}
    </div>
  )
}

export default withAuth(Post)
