import { loginUser } from '@actions/authActions'
import axiosInstance from '@config/axios-config'
import { LoginUserData } from '@interfaces/user'
import { useRouter } from 'next/dist/client/router'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useToasts } from 'react-toast-notifications'
import LoginForm from './LoginForm'

const pageDescriptions = 'Totoro is an AI-enalbled social networking web application.'

function Login(): React.ReactElement {
  const dispatch = useDispatch()
  const router = useRouter()
  const { addToast } = useToasts()

  const [state, stateSet] = useState<LoginUserData>({
    username: '',
    password: '',
  })
  useEffect(() => {
    axiosInstance('/api/user/whoami/', {
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(() => {
        router.push('/', undefined, { shallow: true })
      })
      .catch((err) => {
        addToast(err.response.data.detail, {
          appearance: 'error',
          autoDismiss: true,
        })
      })
  }, [])

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
    dispatch(loginUser(userData))
  }

  return (
    <div className="lg:pl-20 lg:pr-20 md:pl-10 md:pr-10 sm:p-5 grid lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-1 items-center justify-center ">
      <div className="text-3xl text-center sm:text-center mx-auto md:text-left w-full">
        <h1 className="text-5xl lg:text-left light:text-nord1 dark:text-nord4 font-bold">Totoro</h1>
        <p className="dark:text-nord4 light:text-nord0">{pageDescriptions}</p>
      </div>
      <div className="mx-auto items-center xl:w-1/2 w-full  shadow-xl light:bg-white dark:bg-nord3 bg-nord5 rounded-lg p-5">
        <h1 className="font-light text-left p-2">Login to continue</h1>
        <hr className="opacity-20" />

        <LoginForm state={state} handleSubmission={handleSubmission} handleChange={handleChange} />

        <hr className="opacity-20" />
        <Link href="/signup">
          <a className="btn hover:opacity-80 text-center bg-nord11 mt-4 mb-4">Create New Account</a>
        </Link>
      </div>
    </div>
  )
}

export default Login
