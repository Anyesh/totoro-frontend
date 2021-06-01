// import { loginUser } from '@actions/authActions'

import { Google } from '@assets/IconComponents'
import { LoginUserData } from '@types'
import { GetServerSideProps } from 'next'
import { Session } from 'next-auth'
import { getProviders, getSession, signIn } from 'next-auth/client'
import Providers from 'next-auth/providers'
import { useRouter } from 'next/dist/client/router'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { useToasts } from 'react-toast-notifications'
import LoginForm from './LoginForm'

const pageDescriptions = 'Totoro is an AI-enabled social networking web application.'

function Login({
  providers,
  session,
}: {
  providers: typeof Providers.Google
  session: Session
}): React.ReactElement {
  const router = useRouter()
  const { addToast } = useToasts()

  const [loading, loadingSet] = useState<boolean>(false)
  // const [submission, submissionSet] = useState<boolean>(false)

  useEffect(() => {
    if (session) {
      router.push('/')

      return () => {
        loadingSet(false)

        addToast('Logged in succesfully!', {
          appearance: 'success',
          autoDismiss: true,
        })
      }
    }
  }, [])

  const [state, stateSet] = useState<LoginUserData>({
    username: '',
    password: '',
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value }: { name: string; value: string } = e.target

    stateSet((prevState) => ({
      ...prevState,
      [name]: value,
    }))
  }

  // const auth = useSelector((state: IStore) => state.authentication)

  const handleSubmission = (e: React.SyntheticEvent): void => {
    e.preventDefault()

    const userData = { username: state.username, password: state.password }
    console.log(userData)
  }

  const handleSignIn = (e: React.SyntheticEvent, id: string) => {
    e.preventDefault()
    loadingSet(true)
    setTimeout(() => {
      signIn(id)
    }, 1.5 * 1000)
  }

  return (
    <div className="sm:p-5 grid lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-1 place-items-center">
      <div className="text-3xl text-center sm:text-center mx-auto md:text-left w-full items-center xl:w-3/5">
        <h1 className="text-5xl lg:text-left light:text-nord1 dark:text-nord4 font-bold">Totoro</h1>
        <p className="dark:text-nord4 light:text-nord0">{pageDescriptions}</p>
      </div>
      <div className="items-center xl:w-3/5 w-full  shadow-xl light:bg-white dark:bg-nord3 bg-nord5 rounded-lg p-5 mt-10">
        {/* <h1 className="font-semibold text-left p-2">Log in to Totoro</h1> */}
        {/* <hr className="opacity-20 mt-2 mb-3" /> */}

        <div className="mt-3 mb-3">
          {providers &&
            Object.values(providers).map((provider) => (
              <div key={provider.name}>
                <button
                  onClick={(e) => handleSignIn(e, provider.id)}
                  className="btn hover:opacity-80 bg-nord11 items-center inline-flex justify-center "
                  disabled={loading ? true : false}
                  type="button"
                >
                  <Google className={loading ? 'mr-3 animate-spin' : 'mr-3'} />

                  <span> Continue with {provider.name}</span>
                </button>
              </div>
            ))}
        </div>
        <hr className="opacity-20 hr-text " data-content="OR" />
        <LoginForm state={state} handleSubmission={handleSubmission} handleChange={handleChange} />

        {/* <Link href="/signup">
          <a className="btn hover:opacity-80 text-center bg-nord11 mt-4 mb-4">Create New Account</a>
        </Link> */}

        <p className="text-center text-sm mt-4">
          By loggin in you agree to our{' '}
          <span className="font-semibold text-center w-full">
            <Link href="/terms">terms & conditions</Link>
          </span>
          .
        </p>
      </div>
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const providers = await getProviders()
  const session = await getSession(context)

  return {
    props: { providers, session },
  }
}

export default Login
