import Link from 'next/link'
import React from 'react'
import { Layout } from '../../components/Layout'
import LoginForm from './LoginForm'

const pageDescriptions: string = 'Totoro is an AI-enalbled social networking web application.'

export default function Login() {
  return (
    <Layout>
      <div className="lg:pl-20 lg:pr-20 md:pl-10 md:pr-10 sm:p-5 h-screen w-screen grid lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-1 items-center justify-center dark:bg-nord1 bg-white">
        <div className="text-3xl text-center sm:text-center mx-auto md:text-left w-full">
          <h1 className="text-5xl lg:text-left light:text-nord1 dark:text-nord4 font-bold">
            Totoro
          </h1>
          <p className="dark:text-nord4 light:text-nord0">{pageDescriptions}</p>
        </div>
        <div className="mx-auto items-center xl:w-1/2 md:w-full sm:w-full  shadow-lg light:bg-white dark:bg-nord3 bg-nord6 rounded-lg p-5">
          <h1 className="font-light text-center p-2">Login to continue</h1>
          <hr className="opacity-20" />

          <LoginForm />

          <hr className="opacity-30" />

          <div className="text-center bg-nord11 mt-4 mb-4 text-white p-3 rounded-lg font-semibold text-lg">
            <Link href="/signup">Create New Account</Link>
          </div>
          <p className="text-center text-sm m-4">
            <span className="font-semibold text-center w-full">Create a Page</span> for a celebrity,
            band or business
          </p>
        </div>
      </div>
    </Layout>
  )
}
