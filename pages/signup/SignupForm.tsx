import React from 'react'
import { Github, Google } from '../../assets/IconComponents'

export default function SignupForm(): React.ReactElement {
  return (
    <>
      <form className="mt-5 mb-5 dark:text-nord0 space-y-7">
        <button className="btn bg-nord11  inline-flex  justify-start items-center">
          <Google className="mr-3" /> Signup with Google
        </button>
        <button className="btn bg-nord0  inline-flex items-center fill-current">
          <Github className="mr-3" /> Signup with GitHub
        </button>
      </form>
    </>
  )
}
