import Loading from '@components/Common/Loading'
import { fetcher } from '@config/axios-config'
import isEmpty from '@validations/is-empty'
import { Session } from 'next-auth'
import Image from 'next/image'
import React from 'react'
import useSWR from 'swr'

function PostDetails({ id, session }: { id: string; session: Session }): React.ReactElement {
  const { data, error } = useSWR(
    !isEmpty(id) ? [`/post/${id}/`, session.accessToken] : null,
    fetcher
  )

  const renderContent = () => {
    if (!data && !error)
      return (
        <div className="flex w-100">
          <Loading />
        </div>
      )

    if (error)
      return (
        <div className="flex w-100 p-5 text-nord11 mx-auto justify-center font-semibold">
          {' '}
          There was an error! {error?.message}
        </div>
      )

    const result = data?.data.result.data
    return (
      <div className="flex flex-row justify-center items-center p-6 gap-4 ">
        <div className="">
          <Image
            className=" rounded-lg"
            objectFit="cover"
            alt={result?.title}
            src={result?.src?.original?.url}
            height={result?.src?.original?.height}
            width={result?.src?.original?.width}
          />
          <h1 className="font-semibold">{result?.title}</h1>
        </div>
        <div className="">
          <h3 className="font-semibold mt-2 mb-2">Comments</h3>
          <hr />
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. At eligendi iure doloremque
            sed. Dicta, cum voluptas, itaque excepturi sunt necessitatibus nihil asperiores numquam,
            eveniet nobis ex quidem? Laboriosam, saepe dignissimos.
          </p>
        </div>
      </div>
    )
  }

  return <>{renderContent()}</>
}

export default PostDetails
