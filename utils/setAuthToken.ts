import axios from 'axios'

const setAuthToken = (token: string) => {
  if (token) {
    // Apply to every req
    axios.defaults.headers.common['Authorization'] = token
  } else {
    // Delete header
    delete axios.defaults.headers.common['Authorization']
  }
}

export default setAuthToken
