import { fetchUnsplashContent } from '@actions/posts'
import Empty from '@components/Common/Empty'
import withAuth from '@hocs/withAuth'
import { IContent } from '@types'
import { Session } from 'next-auth'
// import Gallery from 'react-photo-gallery'
import Image from 'next/image'
import React, { useCallback, useEffect, useState } from 'react'
function index(props: { session: Session }): React.ReactElement {
  const { session } = props

  const [content, setContent] = useState<IContent[] | null>()
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    getContent()
  }, [])

  const getContent = useCallback(async () => {
    setLoading(true)
    const res = await fetchUnsplashContent()
    setContent(res)
    console.log(res)
    setLoading(false)
  }, [loading])

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
      content.map((c) => (
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
