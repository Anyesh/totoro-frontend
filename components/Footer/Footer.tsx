import { useAuthState } from '@providers/Auth'
import React from 'react'
export default function Footer({ name }: { name: string }): React.ReactElement {
  const { isAuthenticated } = useAuthState()
  const authFooter: JSX.Element = <div>HELLO</div>

  const unAuthFooter: JSX.Element = (
    <div className="mx-auto">
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
    <footer className="bg-white p-6  dark:bg-nord0 dark:text-white drop-shadow-sm">
      {isAuthenticated ? authFooter : unAuthFooter}
    </footer>
  )
}
