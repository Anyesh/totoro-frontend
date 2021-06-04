import axios from 'axios'

export const fetchUnsplashContent = () => {
  const headers = {
    Authorization: process.env.PEXEL_KEY,
  }
  return axios
    .get('https://api.pexels.com/v1/search?query=nature&per_page=20', { headers: headers })
    .then((res) => res.data?.photos)
    .catch(() => null)
}
