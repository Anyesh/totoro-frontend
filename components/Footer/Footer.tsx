import { IStore } from '@interfaces/general'
import React from 'react'
import { useSelector } from 'react-redux'
export default function Footer({ name }: { name: string }): React.ReactElement {
  const auth = useSelector((state: IStore) => state.auth)

  const authFooter: JSX.Element = <div>HELLO</div>

  const unAuthFooter: JSX.Element = (
    <div className="px-6 py-4 mx-auto">
      <div className="lg:flex">
        <div className="w-full -mx-6 lg:w-2/5">
          <div className="px-6">
            <div>
              <a
                href="#"
                className="text-xl font-bold text-gray-800 dark:text-white hover:text-gray-700 dark:hover:text-gray-300"
              >
                {name}
              </a>
            </div>

            <p className="max-w-md mt-2 ">
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Repudiandae recusandae
              cupiditate voluptas neque quam soluta voluptates, ut quis laboriosam incidunt
              doloremque consectetur odit iure nisi quaerat eligendi animi eum at.
            </p>
          </div>
        </div>

        <div className="mt-6 lg:mt-0 lg:flex-1">
          <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-4"></div>
        </div>
      </div>

      <hr className="h-px my-6 bg-gray-300 border-none dark:bg-gray-700 opacity-25" />

      <div>
        <p className="text-center text-gray-800 dark:text-white">
          © {name} 2020-{new Date().getFullYear()} - All rights reserved
        </p>
      </div>
    </div>
  )

  return (
    <footer className="bg-white dark:bg-nord0 dark:text-white drop-shadow-sm">
      {auth.isAuthenticated ? authFooter : unAuthFooter}
    </footer>
  )
}
