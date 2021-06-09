import { fetchContent, postNewContent } from '@actions/posts'
import { Add, Loadin } from '@assets/IconComponents'
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
import Head from 'next/head'
import { AxiosInterceptorManager, AxiosRequestConfig } from 'axios'

Modal.setAppElement('#__next')

function index(props: { session: Session }): React.ReactElement {
  const { session } = props

  const router = useRouter()

  const [content, setContent] = useState<PexelContent | null>()
  const [loading, setLoading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [submissionLoading, setSubmissionLoading] = useState(false)

  const [postModal, setPostModal] = useState(true)
  const [post, setPost] = useState({
    title: '',
    body: '',
  })

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

  const handlePostSubmission = async (e: React.SyntheticEvent): Promise<void> => {
    e.preventDefault()

    const config = {
      onUploadProgress: (evt: ProgressEvent) => {
        const progress = (evt.loaded / evt.total) * 100
        setUploadProgress(progress)
      },
    }

    setSubmissionLoading(true)

    const res = await postNewContent(post, session?.accessToken as string, config)
    if (res) {
      setPost({ title: '', body: '' })
      setSubmissionLoading(false)

      setPostModal(false)
    } else {
      setSubmissionLoading(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
    const { name, value }: { name: string; value: string } = e.target

    setPost((prevState) => ({
      ...prevState,
      [name]: value,
    }))
  }

  // const [pills] = useState<string[]>([
  //   'Movies',
  //   'Art',
  //   'Design',
  //   'Science',
  //   'Cluture',
  //   'Music',
  //   'Politics',
  //   'Books',
  // ])

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
    <>
      <Head>
        <title>Totoro | Home</title>
        {/* <meta name="viewport" content="initial-scale=1.0, width=device-width" /> */}
      </Head>
      <section className="masonry-with-columns p-6">
        {renderContent()}

        {/* <div className="justify-center select-none flex flex-wrap gap-4 ">{renderPills()}</div> */}

        <button
          className="fixed bottom-0 right-0  bg-white dark:bg-nord3  rounded-full w-50 h-20 p-2  focus:outline-none animate-bounce"
          type="button"
          style={{ margin: '20px' }}
          onClick={() => setPostModal(!postModal)}
        >
          <Add className="fill-current" />
        </button>

        <Modal
          isOpen={postModal}
          shouldCloseOnOverlayClick={false}
          className="bg-nord6 dark:bg-nord0 border-2 border-nord10 rounded-md"
          style={{ ...customStyles }}
        >
          <div className="p-5">
            <h1>Create Post</h1>
            <hr />

            {uploadProgress > 0 ? <div className="p-4">Uploaded: {uploadProgress}%</div> : ''}
            <form
              className="mt-5 mb-3 flex flex-col dark:text-nord0"
              onSubmit={handlePostSubmission}
            >
              <input
                id="title"
                type="text"
                placeholder="Give an awesome title to your post."
                name="title"
                required={true}
                value={post.title}
                onChange={handleChange}
                className="input dark:bg-nord4"
                autoFocus
              />
              <textarea
                className="input dark:bg-nord4"
                name="body"
                id="body"
                onChange={handleChange}
                value={post.body}
                placeholder="Write something more about your post. "
              ></textarea>

              <div className="flex gap-4">
                <button
                  className={
                    submissionLoading
                      ? 'btn bg-nord10 hover:bg-nord9 animate-pulse'
                      : 'btn bg-nord10 hover:bg-nord9'
                  }
                  type="submit"
                  disabled={submissionLoading}
                >
                  {submissionLoading ? <span>Creating...</span> : 'Create'}
                </button>
                <button
                  className="btn bg-nord11"
                  onClick={() => setPostModal(false)}
                  type="button"
                  disabled={submissionLoading}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </Modal>

        <Modal
          isOpen={!!router?.query?.postID}
          onRequestClose={() => router.push('/')}
          className="bg-nord6 dark:bg-nord0 border-2 border-nord10 rounded-md"
          style={{ ...customStyles }}
        >
          <PostDetails id={router?.query?.postID as string} />
        </Modal>
      </section>
    </>
  )
}

export default withAuth(index)
