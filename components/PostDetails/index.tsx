import { fetchPostDetail } from '@actions/posts'
import Loading from '@components/Common/Loading'
import { IContent, IContentRecord } from '@types'
import { Session } from 'next-auth'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'

function PostDetails({ id, session }: { id: string; session: Session }): React.ReactElement {
  const [data, setData] = useState<IContent>()

  useEffect(() => {
    const fetcher = async () => {
      const response = await fetchPostDetail(session?.accessToken as string, id)
      if (response.error) {
        console.table(response.error)
      } else {
        const data = response.data as IContentRecord

        setData(data.result.data)
      }
    }
    fetcher()
  }, [id])

  if (!data) return <Loading />

  return (
    <div className="grid md:grid-cols-2 sm:grid-cols-1 text-center p-6 ">
      <div className="place-self-center">
        <Image
          className=" rounded-lg"
          objectFit="cover"
          alt={data?.title}
          src={data?.src?.original?.url}
          height={data.src?.original?.height}
          width={data.src?.original?.width}
        />
      </div>
      <div className="place-self-center self-center space-y-7 p-5">
        <h1 className="font-semibold">{data?.title}</h1>
        <hr />
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum, enim? Itaque obcaecati
          dolor, molestias dicta officia natus nostrum sequi ea commodi, cupiditate, odio veritatis
          minima hic quaerat aperiam quibusdam labore.
        </p>
      </div>
    </div>
  )
}

export default PostDetails
