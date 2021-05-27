import React from 'react'
import { Github, Google } from '../../assets/IconComponents'

export default function SignupForm() {
  return (
    <>
      <form className="mt-5 mb-5 dark:text-nord0 space-y-7">
        <button className="w-full bg-nord11 text-white p-4 rounded-lg font-semibold text-lg inline-flex  justify-start items-center">
          <Google className="mr-3" /> Signup with Google
        </button>
        <button className="w-full bg-nord0 text-white p-4 rounded-lg font-semibold text-lg inline-flex items-center">
          <Github className="mr-3" /> Signup with GitHub
        </button>
      </form>
    </>
  )
}
