import React from 'react'

export default function LoginForm(): React.ReactElement {
  return (
    <>
      <form className="mt-5  mb-5 flex flex-col dark:text-nord0">
        <input
          type="text"
          placeholder="Username or Email"
          required={true}
          className="mb-3 py-3 px-4 border border-nord9 focus:outline-none rounded-md focus:ring-1 dark:bg-nord4"
        />
        <input
          type="password"
          placeholder="Pasword"
          required={true}
          className="mb-3 py-3 px-4 border border-nord9 focus:outline-none rounded-md focus:ring-1 ring-cyan-500 dark:bg-nord4"
        />
        <button className="w-full bg-nord10 hover:bg-nord9 transition duration-700  text-white p-3 rounded-lg font-semibold text-lg">
          Login
        </button>
        <a className="light:text-nord10 dark:text-nord4 text-center my-2" href="#">
          Forgot Pasword?
        </a>
      </form>
    </>
  )
}
