import Loading from '@components/Common/Loading'
import { fetcher } from '@config/axios-config'
import { IContent, IContentArr } from '@types'
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

    const result = data?.data.result as IContentArr
    const res_data = result?.data?.find((e) => !!e) as IContent
    return (
      <div className="flex flex-row justify-center items-center p-6 gap-4 ">
        <div className="">
          <Image
            className=" rounded-lg"
            objectFit="cover"
            alt={res_data?.title}
            src={res_data?.src?.original?.url}
            height={res_data?.src?.original?.height}
            width={res_data?.src?.original?.width}
          />
          <h1 className="font-semibold">{res_data?.title}</h1>
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
