import { fetchContent } from '@actions/posts'
import Card from '@components/Card'
import Empty from '@components/Common/Empty'
import PostDetails from '@components/PostDetails'
import withAuth from '@hocs/withAuth'
import { PexelContent } from '@types'
import { Session } from 'next-auth'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import Modal from 'react-modal'
import { useToasts } from 'react-toast-notifications'

Modal.setAppElement('#__next')

function index(props: { session: Session }): React.ReactElement {
  const { session } = props

  const router = useRouter()

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

  // const renderPills = () => {
  //   return pills.map((p) => (
  //     <button
  //       key={p}
  //       className="bg-nord10 text-white py-2 px-4 shadow-md no-underline rounded-xl  font-sans font-semibold text-sm border-blue btn-primary  focus:outline-none active:shadow-none mr-2 hover:animate-pulse transition duration-700"
  //     >
  //       {p}
  //     </button>
  //   ))
  // }

  const renderContent = () => {
    return loading ? (
      <div></div>
    ) : content ? (
      content?.photos?.map((data) => <Card data={data} key={data?.id} />)
    ) : (
      <Empty />
    )
  }

  const customStyles: Modal.Styles = {
    content: {
      width: '50%',
      margin: 'auto',
      top: '50%',
      left: '50%',
      position: 'absolute',
      transform: 'translate(-50%, -50%)',
    },
    overlay: {
      zIndex: 11,
      background: '#434c5ec9',
    },
  }

  return (
    <section className="masonry-with-columns p-6">
      {renderContent()}

      {/* <div className="justify-center select-none flex flex-wrap gap-4 ">{renderPills()}</div> */}

      <Modal
        isOpen={!!router?.query?.postID}
        onRequestClose={() => router.push('/')}
        className="bg-nord6 dark:bg-nord0 border-2 border-nord10 rounded-md"
        style={{ ...customStyles }}
      >
        <PostDetails id={router?.query?.postID as string} />
      </Modal>
    </section>
  )
}

export default withAuth(index)
