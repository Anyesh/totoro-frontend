import { AxiosError } from 'axios'

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
    400: 'There was Some Problem, while processing your Request', // not being used currently
    401: 'Unauthorized, You are not Allowed',
    403: 'Sorry, You are not allowed for This Action',
    404: 'API Route is Missing or Undefined',
    405: 'API Route Method Not Allowed',
    500: 'Server Error, please try again later',
    request: 'There is Some Problem With Our Servers, Please Try again Later',
    other: 'There was some Problem with your Request, Please Try again Later',
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
  if (error && error.response) {
    errorResponse.errors = error.response.data.result

    // client received an error response (5xx, 4xx)
    if (error.response.status === 400) {
      // console.log('unauthorized, logging out ...');
      errorResponse.message = error.response.data.message
    } else if (error.response.status === 401) {
      // console.log('unauthorized, logging out ...');
      errorResponse.message = ErrorMessages['401']
    } else if (error.response.status === 403) {
      errorResponse.message = ErrorMessages['403']
    } else if (error.response.status === 404) {
      errorResponse.message = ErrorMessages['404']
    } else if (error.response.status === 422) {
      errorResponse.isValidationError = true
      errorResponse.errors = error.response.data.errors
      errorResponse.message = error.response.data.message
    } else if (error.response.status === 405) {
      errorResponse.message = ErrorMessages['405']
    } else if (error.response.status >= 500) {
      errorResponse.message = ErrorMessages['500']
    } else if (error.response.status === 429) {
      console.log('A weird error!')
    }
  } else if (error && error.request) {
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
