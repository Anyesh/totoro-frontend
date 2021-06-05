import PostDetails from '@components/PostDetails'
import { useRouter } from 'next/router'
import React from 'react'

export default function Post(): React.ReactElement {
  const router = useRouter()
  const { postID } = router.query
  return (
    <div className="">
      <PostDetails id={postID as string} />
    </div>
  )
}
