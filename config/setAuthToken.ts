import axios from 'axios'

const setAuthToken = (token: string): void => {
  if (token) {
    // Apply to every req
    axios.defaults.withCredentials = true
    axios.defaults.headers.common['Authorization'] = `Bearer ` + token
  } else {
    // Delete header
    delete axios.defaults.headers.common['Authorization']
  }
}

export default setAuthToken
