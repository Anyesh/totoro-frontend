import React from 'react'

export default function Login() {
  return (
    <div className="container">
      <div className="lg:pl-20 lg:pr-20 md:pl-10 md:pr-10 sm:p-5 h-screen w-screen grid lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-1 items-center justify-center bg-gray-200 overflow-hidden">
        <div className="text-3xl text-center sm:text-center  mx-auto md:text-left ">
          <h1 className="text-5xl lg:text-left text-red-500 font-bold">Pinterest</h1>
          <p className="mt-4">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. In, suscipit? Corrupti
            voluptatibus ratione voluptas consectetur. A deserunt nulla porro mollitia rerum, vero
            doloremque repellendus quisquam, vel dolore cupiditate eveniet tempore!
          </p>
        </div>
        <div className="mx-auto items-center ">
          <form className="shadow-lg w-80 p-4 flex flex-col bg-white rounded-lg">
            <input
              type="text"
              placeholder="Username or Email"
              required={true}
              className="mb-3 py-3 px-4 border border-gray-400 focus:outline-none rounded-md focus:ring-1"
            />
            <input
              type="password"
              placeholder="Pasword"
              required={true}
              className="mb-3 py-3 px-4 border border-gray-400 focus:outline-none rounded-md focus:ring-1 ring-cyan-500"
            />
            <button className="w-full bg-red-500 text-white p-3 rounded-lg font-semibold text-lg">
              Login
            </button>
            <a className="text-blue-400 text-center my-2" href="#">
              Forgot Pasword?
            </a>
            <hr />
            <button className="w-full bg-green-400 mt-8 mb-4 text-white p-3 rounded-lg font-semibold text-lg">
              Create New Account
            </button>
          </form>
          <p className="text-center text-sm my-4">
            <span className="font-semibold text-center w-full">Create a Page</span> for a celebrity,
            band or business
          </p>
        </div>
      </div>
    </div>
  )
}
