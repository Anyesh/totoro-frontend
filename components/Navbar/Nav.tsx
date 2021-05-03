import React from 'react'
import { Pinterest } from '../../assets/IconComponents'

export default function Nav() {
  return (
    <div className="flex border overflow-hidden">
      <div className="flex flex-wrap justify-between w-screen h-20 text-black bg-white md:flex-nowrap">
        <div className="z-30 flex items-center h-full pl-3 space-x-3 bg-white">
          <Pinterest className="text-white" />
          <p className="text-3xl text-red-500 font-bold">Pinterest</p>
        </div>

        <div className="flex flex-col items-stretch w-screen text-xl text-center transform bg-white md:flex-row md:translate-y-0 md:space-x-5 md:items-center md:justify-end md:pr-3 font-semibold">
          <a href="#" className="h-10 leading-10 border-b-2 border-dotted md:border-none">
            About
          </a>
          <a href="#" className="h-10 leading-10 border-b-2 border-dotted md:border-none">
            Business
          </a>
          <a href="#" className="h-10 leading-10 border-b-2 border-dotted md:border-none">
            Blog
          </a>
          <a
            href="#"
            className="text-white h-10 leading-10 border-b-2 border-dotted md:border-none md:bg-red-600 md:rounded-full md:w-24"
          >
            Log In
          </a>
          <a
            href="#"
            className="h-10 leading-10 border-b-2 border-dotted md:border-red-600 md:border-solid md:border-2 md:rounded-full md:w-24 md:leading-9"
          >
            Sign Up
          </a>
        </div>
      </div>
    </div>
  )
}
