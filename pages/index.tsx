import { fetchContent, postNewContent } from '@actions/posts'
import { Add } from '@assets/IconComponents'
import Card from '@components/Card'
import Empty from '@components/Common/Empty'
import PostDetails from '@components/PostDetails'
import withAuth from '@hocs/withAuth'
import { IContent, IContentArr, IContentRecord } from '@types'
import { Session } from 'next-auth'
import Head from 'next/head'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import Modal from 'react-modal'
import { useToasts } from 'react-toast-notifications'

Modal.setAppElement('#__next')

const customStyles: Modal.Styles = {
  content: {
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

interface PostContnetData {
  title: string
  image: File
}

function index(props: { session: Session }): React.ReactElement {
  const { session } = props

  const router = useRouter()

  const [content, setContent] = useState<IContent[]>([])
  const [loading, setLoading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [submissionLoading, setSubmissionLoading] = useState(false)

  const [postModal, setPostModal] = useState(false)
  const [post, setPost] = useState<PostContnetData>({
    title: '',
    image: new File([''], 'filename'),
  })

  const { addToast } = useToasts()

  useEffect(() => {
    getContent()
  }, [])

  const getContent = async () => {
    setLoading(true)
    const res = await fetchContent(session?.accessToken as string)
    if (res.error) {
      addToast(res.error.message, {
        appearance: 'error',
        autoDismiss: true,
      })
      setContent([])
    } else {
      const data = res.data as IContentArr
      setContent(data.result.data)
    }
    setLoading(false)
  }

  const handlePostSubmission = async (e: React.SyntheticEvent): Promise<void> => {
    e.preventDefault()

    const callback = (evt: ProgressEvent) => {
      const progress = (evt.loaded / evt.total) * 100
      setUploadProgress(progress)
    }

    setSubmissionLoading(true)

    const formData = new FormData()

    formData.append('title', post.title)
    formData.append('image', post.image, post.image.name)

    const res = await postNewContent({
      method: 'POST',
      token: session?.accessToken as string,
      headers: { 'content-type': 'multipart/form-data' },
      data: formData,
      callback,
    })
    if (res) {
      if (!res.error) {
        setSubmissionLoading(false)
        setPost({ title: '', image: new File([''], 'filename') })
        const data = res.data as IContentRecord

        setContent([...content, data.result.data])
        setPostModal(false)
      }

      // setPostModal(false)
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

  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    files: FileList | null
  ): void => {
    const { name }: { name: string } = e.target

    setPost((prevState) => ({
      ...prevState,
      [name]: files && files[0],
    }))
  }

  const renderContent = () => {
    return loading ? (
      <div></div>
    ) : content ? (
      content?.map((data) => <Card data={data} key={data?.id} />)
    ) : (
      <Empty />
    )
  }

  return (
    <>
      <Head>
        <title>Totoro | Home</title>
      </Head>
      <section className="masonry-with-columns p-6">
        {renderContent()}

        <button
          className="fixed bottom-0 right-0  bg-white dark:bg-nord3  rounded-full w-10 h-10 p-1  focus:outline-none animate-bounce"
          type="button"
          style={{ margin: '20px' }}
          onClick={() => setPostModal(!postModal)}
        >
          <Add className="fill-current" />
        </button>
      </section>

      <Modal
        isOpen={postModal}
        shouldCloseOnOverlayClick={false}
        className="bg-nord6 dark:bg-nord0 border-2 border-nord10 rounded-md w-screen lg:w-1/2"
        style={{ ...customStyles }}
      >
        <div className="p-5">
          <h1>Create Post</h1>
          <hr />

          {uploadProgress > 0 ? <div className="p-4">Uploaded: {uploadProgress}%</div> : ''}
          <form className="mt-5 mb-3 flex flex-col dark:text-nord0" onSubmit={handlePostSubmission}>
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

            <div className="border border-dashed grid place-items-start border-nord11 relative mb-5 mt-3">
              <input
                type="file"
                name="image"
                id="image"
                onChange={(e) => handleFileChange(e, e.target.files)}
              />
            </div>

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
        <PostDetails id={router?.query?.postID as string} session={session} />
      </Modal>
    </>
  )
}

export default withAuth(index)
