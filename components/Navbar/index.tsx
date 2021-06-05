import { handleLogout } from '@actions/auth'
import { Cat, Moon, Sun } from '@assets/IconComponents'
import { Menu, Transition } from '@headlessui/react'
import { useSession } from 'next-auth/client'
import { useTheme } from 'next-themes'
import Link from 'next/link'
import React from 'react'
export default function Nav({ name }: { name: string }): React.ReactElement {
  const { theme, setTheme } = useTheme()
  // const [isOpen, setIsOpen] = useState(false)

  const [session, loading] = useSession()
  // const navRef = useRef(null)

  const isAuthenticated = !loading && !!session

  const navItems = () => {
    if (isAuthenticated)
      return (
        <>
          <div className="flex items-center">
            <div className="relative inline-block text-left ">
              <Menu>
                {({ open }) => (
                  <>
                    <Menu.Button className="hover:bg-nord10 text-nord3 hover:text-white dark:text-nord4 px-3 text-sm font-medium rounded-md focus:outline-none inline-flex items-center ">
                      <img
                        src={`${session?.user?.image}`}
                        alt={`${session?.user?.name}`}
                        className="rounded-full w-10 h-10 inline-flex align-middle p-1"
                      />
                      <span className="hidden md:flex">{session?.user?.name}</span>
                      <svg
                        className="fill-current h-4 w-4 ml-1.5 mt-1"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                      </svg>
                      {/* <Gear className="fill-current p-0" /> */}
                    </Menu.Button>

                    <Transition
                      show={open}
                      enter="transition ease-out duration-100"
                      enterFrom="transform opacity-0 scale-95"
                      enterTo="transform opacity-100 scale-100"
                      leave="transition ease-in duration-75"
                      leaveFrom="transform opacity-100 scale-100"
                      leaveTo="transform opacity-0 scale-95"
                    >
                      <Menu.Items className="absolute right-0 w-56 origin-top-right  border rounded-md shadow-lg outline-none bg-nord6 dark:bg-nord0 ">
                        <div className="py-1 ">
                          <Menu.Item>
                            <Link href={`/u/@${session?.user?.name}`}>
                              <a
                                className="text-nord0 dark:text-nord6 hover:text-nord11 flex justify-between w-full px-4 py-2 text-sm leading-5 text-left focus:outline-none"
                                role="button"
                              >
                                Profile
                              </a>
                            </Link>
                          </Menu.Item>
                        </div>

                        <div className="py-1">
                          <Menu.Item>
                            <button
                              className="text-nord0 dark:text-nord6 hover:text-nord11 flex justify-between w-full px-4 py-2 text-sm leading-5 text-left focus:outline-none"
                              onClick={() => handleLogout()}
                              type="button"
                            >
                              Sign out
                            </button>
                          </Menu.Item>
                        </div>
                        <div className="px-4 mt-2 p-1 mb-3">
                          <hr className="opacity-25" />
                          <p className="text-sm   dark:text-nord4 text-nord0">Signed in as</p>
                          <p className="text-sm font-medium  dark:text-nord4 text-nord0 truncate">
                            {session?.user?.email || 'no-one@email.com'}
                          </p>
                        </div>
                      </Menu.Items>
                    </Transition>
                  </>
                )}
              </Menu>
            </div>
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
    <nav className="bg-nord6 px-5 dark:bg-nord1 ">
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

          <div className="flex items-center z-10">
            <div className="ml-10 inline-flex space-x-4 align-middle">{navItems()}</div>
          </div>

          {/* <div className="-mr-2 md:hidden">
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
       
        
         */}
        </div>
      </div>

      {/* <Transition
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
      </Transition> */}
    </nav>
  )
}
