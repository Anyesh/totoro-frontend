/* eslint-disable @typescript-eslint/no-var-requires */
const withPWA = require('next-pwa')
const runtimeCaching = require('next-pwa/cache')

module.exports = withPWA({
  pwa: {
    dest: 'public',
    runtimeCaching,
  },
  images: {
    domains: [
      'source.unsplash.com',
      'images.unsplash.com',
      'api.pexels.com',
      'images.pexels.com',
      'localhost',
      'localhost:8000',
      'storage.googleapis.com',
      'storage.cloud.google.com',
    ],
  },
  i18n: {
    locales: ['en-US'],
    defaultLocale: 'en-US',
  },
})
