import axiosInstance from '@config/axios-config'

export const getCSRF = async (): Promise<Record<string, unknown>> => {
  const csrf: Record<string, unknown> = { token: '', success: false, msg: '' }

  try {
    const res = await axiosInstance.get('/api/user/get-csrf/', {
      withCredentials: true,
    })

    csrf.token = res.headers['x-csrftoken']
    csrf.success = true
    csrf.msg = 'CSRF token obtained!'
  } catch (err) {
    csrf.msg = err
  }
  return csrf
}
