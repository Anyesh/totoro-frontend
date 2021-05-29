import { Transition } from '@headlessui/react'
import { IStore } from '@interfaces/general'
import { Cat, Moon, Sun } from 'assets/IconComponents'
import { useTheme } from 'next-themes'
import Link from 'next/link'
import React, { useState } from 'react'
import { useSelector } from 'react-redux'
export default function Nav({ name }: { name: string }): React.ReactElement {
  const { theme, setTheme } = useTheme()
  const [isOpen, setIsOpen] = useState(false)
  const auth = useSelector((state: IStore) => state.auth)

  const navItems = () => {
    if (auth.isAuthenticated)
      return (
        <>
          <Link href="#">
            <a className="dark:text-gray-50 block text-right hover:bg-gray-700 text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
              Home
            </a>
          </Link>

          <Link href="#">
            <a className="dark:text-gray-50 block text-right text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
              Team
            </a>
          </Link>

          <Link href="#">
            <a className="dark:text-gray-50 block text-right text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
              Projects
            </a>
          </Link>

          <Link href="#">
            <a className="dark:text-gray-50 block text-right text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
              Calendar
            </a>
          </Link>
        </>
      )
    else return
  }

  return (
    <nav className="bg-white dark:bg-nord0">
      <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0 ">
              <Cat className="h-9 w-9 fill-current ml-1.5" />
              <p className="text-sm dark:text-nord4 text-gray-100 uppercase font-semibold text-center">
                {name}
              </p>
            </div>

            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">{navItems()}</div>
            </div>
          </div>
          <div className="flex">
            <button
              className="inline-flex  justify-end p-2 rounded-md focus:outline-none"
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            >
              <span>
                {theme == 'light' ? <Moon className="h-7 w-7" /> : <Sun className="h-7 w-7" />}
              </span>
            </button>
          </div>
          <div className="-mr-2 flex md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              type="button"
              className=" inline-flex items-center justify-center p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
              aria-controls="mobile-menu"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              {!isOpen ? (
                <svg
                  className="block h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              ) : (
                <svg
                  className="block h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      <Transition
        show={isOpen}
        enter="transition ease-out duration-100 transform"
        enterFrom="opacity-0 scale-95"
        enterTo="opacity-100 scale-100"
        leave="transition ease-in duration-75 transform"
        leaveFrom="opacity-100 scale-100"
        leaveTo="opacity-0 scale-95"
      >
        {(ref) => (
          <div className="md:hidden" id="mobile-menu">
            <div ref={ref} className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              {navItems()}
            </div>
          </div>
        )}
      </Transition>
    </nav>
  )
}
