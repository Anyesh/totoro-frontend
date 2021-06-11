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
    if (!data && !error) return <Loading />

    if (error) return <div className="p-5 text-nord11"> There was an error! {error.message}</div>

    const result = data?.data.result.data
    return (
      <div className="grid md:grid-cols-2 sm:grid-cols-1 text-center p-6 ">
        <div className="place-self-center">
          <Image
            className=" rounded-lg"
            objectFit="cover"
            alt={result?.title}
            src={result?.src?.original?.url}
            height={result?.src?.original?.height}
            width={result?.src?.original?.width}
          />
        </div>
        <div className="place-self-center self-center space-y-7 p-5">
          <h1 className="font-semibold">{result?.title}</h1>
          <hr />
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum, enim? Itaque obcaecati
            dolor, molestias dicta officia natus nostrum sequi ea commodi, cupiditate, odio
            veritatis minima hic quaerat aperiam quibusdam labore.
          </p>
        </div>
      </div>
    )
  }

  return <>{renderContent()}</>
}

export default PostDetails
