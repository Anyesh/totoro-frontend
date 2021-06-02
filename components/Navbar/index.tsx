import { handleLogout } from '@actions/auth'
import { Cat, Gear, Moon, Sun } from '@assets/IconComponents'
import { Transition } from '@headlessui/react'
import { useSession } from 'next-auth/client'
import { useTheme } from 'next-themes'
import Link from 'next/link'
import React, { useRef, useState } from 'react'
export default function Nav({ name }: { name: string }): React.ReactElement {
  const { theme, setTheme } = useTheme()
  const [isOpen, setIsOpen] = useState(false)

  const [session, loading] = useSession()
  const navRef = useRef(null)

  const isAuthenticated = !loading && !!session

  const navItems = () => {
    if (isAuthenticated)
      return (
        <>
          <Link href={`/u/@${session?.user?.name}`}>
            <a className="dark:text-nord4 block text-right hover:bg-nord10 text-nord3 hover:text-white px-3 py-2 text-sm font-medium rounded-md ">
              <img
                src={`${session?.user?.image}`}
                alt={`${session?.user?.name}`}
                className="rounded-full w-10 h-10 inline-flex align-middle p-1"
              />
              {session?.user?.name}
            </a>
          </Link>

          <div className="group relative">
            <button className="focus:outline-none mt-3">
              <Gear className="fill-current" />
            </button>
            <ul className="hidden absolute bg-nord4  pt-1 group-hover:block">
              <li className="">
                <a
                  className="rounded-t  hover:bg-nord10 py-2 px-4 block whitespace-no-wrap"
                  href="#"
                >
                  One
                </a>
              </li>
              <li className="">
                <a className=" hover:bg-nord10 py-2 px-4 block whitespace-no-wrap" href="#">
                  Two
                </a>
              </li>
              <li className="">
                <button
                  className="rounded-b  hover:bg-nord10 py-2 px-4 block whitespace-no-wrap"
                  type="button"
                  onClick={() => handleLogout()}
                >
                  logout
                </button>
              </li>
            </ul>
          </div>

          <button
            className="focus:outline-none p-2"
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
          >
            <span>
              {theme == 'light' ? (
                <Moon className="fill-current" />
              ) : (
                <Sun className="fill-current" />
              )}
            </span>
          </button>
        </>
      )
    else
      return (
        <button
          className="focus:outline-none p-2"
          onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
        >
          <span>
            {theme == 'light' ? (
              <Moon className="fill-current" />
            ) : (
              <Sun className="fill-current" />
            )}
          </span>
        </button>
      )
  }

  return (
    <nav className="bg-nord6 px-5 dark:bg-nord1">
      <div className="max-w-full mx-auto">
        <div className="flex items-center h-16 justify-between">
          <Link href="/">
            <a className="inline-flex items-center">
              <Cat className="h-14 w-14 p-0 fill-current ml-1.5" />
              <p className="text-lg dark:text-nord4 text-gray-100 uppercase font-semibold">
                {name}
              </p>
            </a>
          </Link>

          <div className="hidden md:flex items-center">
            <div className="ml-10 inline-flex space-x-4 align-middle">{navItems()}</div>
          </div>

          <div className="-mr-2 md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              type="button"
              className="items-center justify-center p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
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
        <div className="md:hidden" id="mobile-menu">
          <div ref={navRef} className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navItems()}
          </div>
        </div>
      </Transition>
    </nav>
  )
}
