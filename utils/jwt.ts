import { TToken } from '@types'
import jwtDecode from 'jwt-decode'

export const isJwtExpired = (token: string): boolean => {
  // offset by 60 seconds, so we will check if the token is "almost expired".
  const currentTime = Math.round(Date.now() / 1000 + 60)
  const decoded = jwtDecode<TToken>(token)

  console.log(`Current time + 60 seconds: ${new Date(currentTime * 1000)}`)

  if (decoded['exp']) {
    console.log(`Token lifetime: ${new Date(decoded['exp'] * 1000)}`)
    const adjustedExpiry = decoded['exp']

    if (adjustedExpiry < currentTime) {
      console.log('Token expired')
      return true
    }

    console.log('Token has not expired yet')
    return false
  }

  console.log('Token["exp"] does not exist')
  return true
}

export const makeUrl = (...endpoints: string[]): string => {
  const url = endpoints.reduce((prevUrl, currentPath) => {
    if (prevUrl.length === 0) {
      return prevUrl + currentPath
    }

    return prevUrl.endsWith('/') ? prevUrl + currentPath + '/' : prevUrl + '/' + currentPath + '/'
  }, '')
  return url
}
