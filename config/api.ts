export const ROOT_API =
  process.env.NODE_ENV == 'production'
    ? 'https://totoro-cezq5fxh3a-uc.a.run.app/api'
    : 'http://localhost:8000/api'
