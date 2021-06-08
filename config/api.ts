export const ROOT_API =
  process.env.NODE_ENV == 'production'
    ? 'https://totoro.anishshrestha.info.np/api'
    : 'http://localhost:8000/api'
