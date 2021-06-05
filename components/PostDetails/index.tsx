import Loading from '@components/Common/Loading'
import { IContent } from '@types'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'

export default function PostDetails({ id }: { id: string }): React.ReactElement {
  const fetchPostDetail = (id: string): Promise<IContent> => {
    const headers = { Authorization: '563492ad6f91700001000001fe2538f16d4147ff9f71b738107108be' }
    return fetch(`https://api.pexels.com/v1/photos/${id}`, { headers }).then((res) => res.json())
  }

  const [data, setData] = useState<IContent>()

  useEffect(() => {
    const fetcher = async () => {
      const data = await fetchPostDetail(id)
      setData(data)
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
          alt={data?.alt_description}
          src={data?.src?.original}
          height={data?.height * 0.15}
          width={data?.width * 0.15}
        />
      </div>
      <div className="place-self-center self-center space-y-7">
        <h1>Post Details</h1>
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
