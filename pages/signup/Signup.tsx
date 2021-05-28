import Link from 'next/link'
import React from 'react'
import SignupForm from './SignupForm'

const pageDescriptions = 'Totoro is an AI-enalbled social networking web application.'

export default function Signup(): React.ReactElement {
  return (
    <div className="lg:pl-20 lg:pr-20 md:pl-10 md:pr-10 sm:p-5 h-screen w-screen grid lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-1 items-center justify-center dark:bg-nord1 bg-white">
      <div className="text-3xl text-center sm:text-center mx-auto md:text-left w-full">
        <h1 className="text-5xl lg:text-left light:text-nord1 dark:text-nord4 font-bold">Totoro</h1>
        <p className="dark:text-nord4 light:text-nord0">{pageDescriptions}</p>
      </div>
      <div className="mx-auto items-center xl:w-1/2 md:w-full sm:w-full  shadow-lg light:bg-white dark:bg-nord3 bg-nord6 rounded-lg p-5">
        <h1 className="font-light  dark:text-white light:text-nord2 text-left p-2"> Signup</h1>
        <hr className="opacity-20" />

        <SignupForm />

        <hr className="opacity-30" />

        <div className="text-center text-lg mt-4 mb-4 dark:text-white light:text-nord2  p-2 rounded-lgtext-lg ">
          <p className="inline">Go back to</p>
          <p className=" font-semibold inline">
            <Link href="/login"> Login</Link>
          </p>
        </div>
      </div>
    </div>
  )
}
