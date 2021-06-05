import { fetchContent } from '@actions/posts'
import Empty from '@components/Common/Empty'
import withAuth from '@hocs/withAuth'
import { PexelContent } from '@types'
import { Session } from 'next-auth'
// import Gallery from 'react-photo-gallery'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { useToasts } from 'react-toast-notifications'
function index(props: { session: Session }): React.ReactElement {
  const { session } = props

  const [content, setContent] = useState<PexelContent | null>()
  const [loading, setLoading] = useState(false)

  const { addToast } = useToasts()

  useEffect(() => {
    getContent()
  }, [])

  const getContent = async () => {
    setLoading(true)
    const res = await fetchContent()
    if (res.error) {
      addToast(res.error.message, {
        appearance: 'error',
        autoDismiss: true,
      })
      setContent(null)
    } else {
      const content = res.data as PexelContent

      setContent(content)
    }
    setLoading(false)
  }

  const [pills] = useState<string[]>([
    'Movies',
    'Art',
    'Design',
    'Science',
    'Cluture',
    'Music',
    'Politics',
    'Books',
  ])

  const renderPills = () => {
    return pills.map((p) => (
      <button
        key={p}
        className="bg-nord10 text-white py-2 px-4 shadow-md no-underline rounded-xl  font-sans font-semibold text-sm border-blue btn-primary  focus:outline-none active:shadow-none mr-2 hover:animate-pulse transition duration-700"
      >
        {p}
      </button>
    ))
  }

  const renderContent = () => {
    return loading ? (
      <span className="animate-bounce">Loading...</span>
    ) : content ? (
      content?.photos?.map((c) => (
        <Image
          className="hover:animate-pulse"
          key={c.id}
          alt={c.alt_description}
          src={c?.src?.original}
          height={c?.height * 0.05}
          width={c?.width * 0.09}
        />
      ))
    ) : (
      <Empty />
    )
  }

  return (
    <>
      <div className="justify-center select-none flex flex-wrap gap-4">{renderPills()}</div>
      <div className="select-none flex flex-wrap gap-2 mt-5 justify-center">{renderContent()}</div>
    </>
  )
}

export default withAuth(index)
