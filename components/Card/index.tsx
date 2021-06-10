import { IContent } from '@types'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const Card = ({ data }: { data: IContent }): React.ReactElement => {
  return (
    <div className="bg-white dark:bg-nord3 rounded-lg shadow-lg " key={data?.id}>
      <div className="col-span-3 row-span-4 p-1 m-1 transition duration-500 transform hover:-translate-y-2 motion-reduce:transition-none motion-reduce:transform-none cursor-pointer">
        <Link href={`/?postID=${data?.id}`} as={`/posts/${data?.id}`}>
          <Image
            placeholder="blur"
            className="rounded-lg"
            objectFit="cover"
            alt={data?.title}
            src={data?.src?.thumbnail?.url}
            height={data?.src?.thumbnail?.height}
            width={data?.src?.thumbnail?.width}
          />
        </Link>
      </div>
      <div className="p-2">
        <a
          className="flex items-center hover:text-nord10"
          href={`/@${data.author.username}`}
          target="__blank"
        >
          <img
            loading="lazy"
            alt={data.author.username}
            className="block rounded-full w-7 h-7"
            src={data.src.thumbnail.url}
          />
          <span className="ml-2 text-sm font-bold"> {data.author.username} </span>
        </a>
      </div>

      {/* <div className="">
        <header className="flex items-center justify-between leading-tight p-2 md:p-4">
          <h1 className="text-lg">
            <a className="no-underline hover:underline text-black" href="#">
              {data.description}
            </a>
          </h1>
          <p className="text-grey-darker text-sm">9 min ago</p>
        </header>
      </div> */}
    </div>
  )
}

export default Card
