import { Dots } from '@assets/IconComponents'
import { IContent } from '@types'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const Card = ({ data }: { data: IContent }): React.ReactElement => {
  return (
    <div className="first-child bg-white dark:bg-nord3 rounded-lg shadow-lg " key={data?.id}>
      <div className="col-span-3 row-span-4 p-1 m-1 transition duration-500 hover:transform hover:translate-y-1 cursor-pointer">
        <Link href={`/?postID=${data?.id}`} as={`/posts/${data?.id}`}>
          <a>
            <Image
              placeholder="blur"
              className="rounded-lg"
              // objectFit="cover"
              alt={data?.title}
              src={data?.src?.thumbnail?.url}
              height={data?.src?.thumbnail?.height + 90}
              width={data?.src?.thumbnail?.width}
            />
          </a>
        </Link>
      </div>
      <div className="p-2">
        <h1 className="text-base text-left truncate overflow-ellipsis">
          <Link href={`/?postID=${data?.id}`} as={`/posts/${data?.id}`}>
            <a className="hover:text-nord12 transition duration-500">{data?.title}</a>
          </Link>
        </h1>
      </div>
      <div className="p-2 flex justify-between">
        <Link href={`/u/@${data?._author.username}`}>
          <a
            className="flex items-center hover:text-nord10 transition duration-500"
            target="__blank"
          >
            <img
              loading="lazy"
              alt={data?._author.username}
              className="block object-cover rounded-full w-7 h-7"
              src={data.src.thumbnail.url}
            />
            <span className="ml-2 text-sm font-bold"> {data?._author.username} </span>
          </a>
        </Link>
        <button
          type="button"
          className="focus:outline-none transform hover:-translate-y-1 transition duration-500"
        >
          <Dots className="fill-current" />
        </button>
      </div>
    </div>
  )
}

export default Card
