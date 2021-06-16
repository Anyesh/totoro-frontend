import { postNewContent } from '@actions/posts'
import { Add } from '@assets/IconComponents'
import Card from '@components/Card'
import Loading from '@components/Common/Loading'
import PostDetails from '@components/PostDetails'
import { fetcher } from '@config/axios-config'
import withAuth from '@hocs/withAuth'
import { IContent, PostContnetData } from '@types'
import { validateCreatePost } from '@validations/create-post-validation'
import isEmpty from '@validations/is-empty'
import { Session } from 'next-auth'
import Head from 'next/head'
import { useRouter } from 'next/router'
import React, { useState } from 'react'
import Modal from 'react-modal'
import { toast } from 'react-toastify'
import useSWR from 'swr'

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

function index(props: { session: Session }): React.ReactElement {
  // Props
  const { session } = props

  // Router
  const router = useRouter()

  // State
  const [err, setErr] = useState<unknown>()
  const [uploadProgress, setUploadProgress] = useState(0)
  const [submissionLoading, setSubmissionLoading] = useState(false)
  const [postModal, setPostModal] = useState(false)
  const [post, setPost] = useState<PostContnetData>({
    title: '',
    image: new File([''], 'filename'),
  })

  // SWR State
  const { data, error, mutate } = useSWR(['/post/all/', session.accessToken], fetcher)

  const handlePostSubmission = async (e: React.SyntheticEvent): Promise<void> => {
    e.preventDefault()
    setUploadProgress(0)

    const callback = (evt: ProgressEvent) => {
      const progress = (evt.loaded / evt.total) * 100
      setUploadProgress(Math.ceil(progress / 5) * 5)
    }

    setSubmissionLoading(true)

    const { isValid, errors } = validateCreatePost(post)
    if (!isValid) {
      setErr(errors)
      setSubmissionLoading(false)
      return
    }

    const formData = new FormData()

    formData.append('title', post.title)
    formData.append('image', post.image, post.image.name)

    const resp = await postNewContent({
      method: 'POST',
      token: session?.accessToken as string,
      headers: { 'content-type': 'multipart/form-data' },
      data: formData,
      callback,
    })
    if (!resp.error) {
      setSubmissionLoading(false)
      setPost({ title: '', image: new File([''], 'filename') })

      mutate()
      setTimeout(() => {
        reset()
      }, 1000)
    } else {
      toast.error(resp.error.message)
      setErr(resp.error.errors)
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

  const reset = () => {
    setUploadProgress(0)
    setErr([])
    setPost({ title: '', image: new File([''], 'filename') })
    setPostModal(false)
  }

  const renderContent = () => {
    if (!data && !error) {
      return (
        <div>
          <Loading content="Loading contents.." />
        </div>
      )
    }
    if (error) {
      return (
        <div>
          <div className="flex flex-col justify-center justify-items-center gap-4 items-center w-full ">
            <h2>There was an error!</h2>
            <p className="text-nord11">{error.message}</p>
          </div>
        </div>
      )
    }

    return !isEmpty(data?.data?.result.data) ? (
      data?.data?.result.data.map((d: IContent) => <Card data={d} key={d?.id} />)
    ) : (
      <div>
        <div className="flex flex-col justify-center justify-items-center gap-4 items-center w-full ">
          <h1>It&apos;s soo empty here.</h1>
          <p className="text-nord14">Create some posts to fill this emptiness!</p>
        </div>
      </div>
    )
  }

  return (
    <>
      <Head>
        <title>Totoro | Home</title>
      </Head>
      <section
        className={error || isEmpty(data?.data?.result?.data) ? 'p-20' : 'masonry-with-columns p-6'}
      >
        {renderContent()}

        <button
          className="fixed bottom-0 right-0  bg-nord14  rounded-full w-10 h-10 p-1  focus:outline-none transform hover:-translate-y-2 transition duration-500"
          type="button"
          style={{ margin: '20px' }}
          onClick={() => setPostModal(!postModal)}
        >
          <Add className="mx-auto" />
        </button>
      </section>

      <Modal
        isOpen={postModal}
        shouldCloseOnOverlayClick={false}
        className="bg-nord6 dark:bg-nord0 border-2 border-nord10 rounded-md w-screen lg:w-1/2"
        style={{ ...customStyles }}
      >
        <div className="p-5">
          <div>
            <h1>Create Post</h1>
            <hr />

            <div className="p-4">
              {uploadProgress > 0 && !err ? (
                <div className="mt-2 mb-2">
                  <p>{uploadProgress}%</p>
                  <div className="relative pt-1">
                    <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-nord3 dark:bg-nord6">
                      <div
                        style={{ width: `${uploadProgress}%` }}
                        className="shadow-none transition-all ease-out duration-1000 flex flex-col text-center whitespace-nowrap dark:text-white justify-center bg-nord14"
                      ></div>
                    </div>
                  </div>
                </div>
              ) : (
                ''
              )}

              {/* TODO: Fix err type */}
              {err &&
                Object.keys(err as Record<string, string>).map((k, i) => (
                  <li key={i} className="text-nord11">
                    {k}: {Object.values(err as Record<string, string>)[i]}
                  </li>
                ))}
            </div>
            <form
              className="mt-5 mb-3 flex flex-col dark:text-white"
              noValidate
              onSubmit={handlePostSubmission}
            >
              <div className="border border-dashed flex items-center justify-center place-items-start border-nord10 relative mb-5 mt-3 p-2">
                <p className="absolute dark:text-gray-300">
                  {' '}
                  {post?.image?.type ? `Filename: ${post?.image?.name}` : 'Select an image'}
                </p>
                <input
                  className="w-full dark:bg-nord0 opacity-0 relative"
                  type="file"
                  name="image"
                  id="image"
                  onChange={(e) => handleFileChange(e, e.target.files)}
                />
              </div>
              <label htmlFor="title">Title: </label>
              <input
                id="title"
                type="text"
                placeholder="Give an awesome title to your post."
                name="title"
                required={true}
                value={post.title}
                onChange={handleChange}
                className="input dark:bg-nord0 placeholder-gray-500"
                autoFocus
              />
              <div className="mt-2 mb-5 flex justify-center ">
                {post?.image?.type && (
                  <div style={{ overflow: 'scroll', height: '300px' }}>
                    <img
                      src={URL.createObjectURL(post.image)}
                      className="object-cover"
                      loading="lazy"
                    />
                  </div>
                )}
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
                  onClick={() => reset()}
                  type="button"
                  disabled={submissionLoading}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      </Modal>

      <Modal
        isOpen={!!router?.query?.postID}
        onRequestClose={() => router.push('/')}
        className="bg-nord6 dark:bg-nord0 border-2 border-nord10 rounded-md w-screen lg:w-1/2"
        style={{ ...customStyles }}
      >
        <PostDetails id={router?.query?.postID as string} session={session} />
      </Modal>
    </>
  )
}

export default withAuth(index)
