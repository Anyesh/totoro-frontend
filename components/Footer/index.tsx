import { useAuthState } from '@providers/Auth'
import React from 'react'

export default function Footer({ name }: { name: string }): React.ReactElement {
  const { isAuthenticated } = useAuthState()
  // const authFooter: JSX.Element = (
  //   <small className="light:text-nord3 fixed bottom-0">&copy; Totoro 2021</small>
  // )

  const unAuthFooter: JSX.Element = (
    <div className="p-6">
      <div className="lg:flex hidden">
        <div className="w-full  lg:w-2/5 ">
          <div>
            <div>
              <a
                href="#"
                className="text-xl font-bold text-gray-800 dark:text-white hover:text-gray-700 dark:hover:text-gray-300"
              >
                {name}
              </a>
            </div>

            <p className="max-w-md mt-2 ">
              I will think about the intro later, for now you can just enjoy the login functionality
              and some images.
            </p>
          </div>
        </div>

        <div className="mt-6 lg:mt-0 lg:flex-1">
          <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-4"></div>
        </div>
      </div>

      <hr className="bg-gray-300 border-none dark:bg-gray-700 opacity-25" />

      <div>
        <p className="text-center text-gray-800 dark:text-white">
          © {name} 2020-{new Date().getFullYear()} - All rights reserved
        </p>
      </div>
    </div>
  )

  return isAuthenticated ? <> </> : unAuthFooter
}
