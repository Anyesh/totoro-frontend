import isEmpty from '@validations/is-empty'
import { AxiosError } from 'axios'
import { signOut } from 'next-auth/client'

export const errorResponse = {
  isValidationError: false,
  message: 'Network Error.',
  type: 'error',
  errors: [],
  timeout: 2500,
}

function handleError(
  error: AxiosError,
  customMessages: Record<string, string> = {}
): typeof errorResponse {
  const ErrorMessages = {
    400: 'There was some problem, while processing your request', // not being used currently
    401: 'Unauthorized, You are not allowed',
    403: 'Sorry, You are not allowed for this action',
    404: 'API route is missing or undefined',
    405: 'API route method not allowed',
    500: 'Server Error, please try again later',
    request: 'There is some problem with our servers, Please try again later',
    other: 'There was some problem with your request, Please Try again later',
  }
  if (isEmpty(error)) {
    errorResponse.message = ''
    errorResponse.type = ''
    return errorResponse
  }
  if (Object.prototype.hasOwnProperty.call(customMessages, '400')) {
    ErrorMessages['400'] = customMessages['400']
  }
  if (Object.prototype.hasOwnProperty.call(customMessages, '401')) {
    ErrorMessages['401'] = customMessages['401']
  }
  if (Object.prototype.hasOwnProperty.call(customMessages, '403')) {
    ErrorMessages['403'] = customMessages['403']
  }
  if (Object.prototype.hasOwnProperty.call(customMessages, '404')) {
    ErrorMessages['404'] = customMessages['404']
  }
  if (Object.prototype.hasOwnProperty.call(customMessages, '405')) {
    ErrorMessages['405'] = customMessages['405']
  }
  if (Object.prototype.hasOwnProperty.call(customMessages, '500')) {
    ErrorMessages['500'] = customMessages['500']
  }
  if (Object.prototype.hasOwnProperty.call(customMessages, 'request')) {
    ErrorMessages.request = customMessages.request
  }
  if (Object.prototype.hasOwnProperty.call(customMessages, 'other')) {
    ErrorMessages.other = customMessages.other
  }
  if (error && error?.response) {
    errorResponse.errors = error.response.data.result

    // client received an error response (5xx, 4xx)
    if (error?.response?.status === 400) {
      // console.log('unauthorized, logging out ...');
      errorResponse.message = error.response.data.message
    } else if (error.response.status === 401) {
      // console.log('unauthorized, logging out ...');
      errorResponse.message = ErrorMessages['401']
      // Signout immediately if 401
      signOut()
    } else if (error?.response?.status === 403) {
      errorResponse.message = ErrorMessages['403']
    } else if (error.response.status === 404) {
      errorResponse.message = ErrorMessages['404']
    } else if (error?.response?.status === 422) {
      errorResponse.isValidationError = true
      errorResponse.errors = error.response.data.errors
      errorResponse.message = error.response.data.message
    } else if (error?.response?.status === 405) {
      errorResponse.message = ErrorMessages['405']
    } else if (error?.response?.status >= 500) {
      errorResponse.message = ErrorMessages['500']
    } else if (error?.response?.status === 429) {
      console.log('A weird error!')
    }
  } else if (error && error?.request) {
    errorResponse.message = ErrorMessages.request
    // client never received a response, or request never left
  } else if (error instanceof Error) {
    errorResponse.message = error.message
  } else if (typeof error === 'string') {
    errorResponse.message = error
  } else {
    //this.$buefy.toast.open({
    //  message: 'Going Too Fast hun?, Please Slow Down',
    // type: 'is-danger',
    // })
    // anything else
    errorResponse.message = ErrorMessages.other
  }
  return errorResponse
}

export default handleError
