import { useTheme } from 'next-themes'
import React from 'react'
import { Moon, Sun } from '../../assets/IconComponents'
export default function Nav({ name }: { name: string }): React.ReactElement {
  const { theme, setTheme } = useTheme()

  return (
    <nav className="flex items-center dark:bg-nord0 dark:text-white p-3 flex-wrap bg-white ">
      <a href="#" className="p-2 mr-4 inline-flex items-center">
        <svg
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
          className="fill-current dark:text-white light:text-nord0 h-8 w-8 mr-2"
        >
          <path d="M12.001 4.8c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624C13.666 10.618 15.027 12 18.001 12c3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C16.337 6.182 14.976 4.8 12.001 4.8zm-6 7.2c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624 1.177 1.194 2.538 2.576 5.512 2.576 3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C10.337 13.382 8.976 12 6.001 12z" />
        </svg>
        <span className="text-xl dark:text-white font-bold uppercase tracking-wide">{name}</span>
      </a>
      <button
        className=" inline-flex p-3 rounded lg:hidden ml-auto light:text-nord0 dark:text-white outline-none nav-toggler"
        data-target="#navigation"
      >
        <i className="material-icons">menu</i>
      </button>
      <div
        className="hidden top-navbar w-full lg:inline-flex lg:flex-grow lg:w-auto"
        id="navigation"
      >
        <div className="lg:inline-flex lg:flex-row lg:ml-auto lg:w-auto w-full lg:items-center items-start  flex flex-col lg:h-auto">
          {/* <a
            href="/login"
            className="lg:inline-flex lg:w-auto w-full px-3 py-2 rounded text-nord0 items-center justify-center dark:text-white"
          >
            <span>Login</span>
          </a> */}

          <button
            className="lg:inline-flex lg:w-auto w-full rounded text-nord0 items-center justify-center dark:text-white focus:outline-none"
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
          >
            <span>
              {theme == 'light' ? <Moon className="h-9 w-9" /> : <Sun className="h-9 w-9" />}
            </span>
          </button>
        </div>
      </div>
    </nav>
  )
}
