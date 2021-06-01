import { ROOT_API } from '@config'
import { isJwtExpired, makeUrl } from '@utils/jwt'
import axios from 'axios'
import { NextApiRequest, NextApiResponse } from 'next'
import NextAuth, { NextAuthOptions } from 'next-auth'
import Providers from 'next-auth/providers'

// interface ServerResponse {
//   data: ServerData
// }

interface ServerData {
  access_token: string
  refresh_token: string
}

export const refreshToken = async function (refreshToken: string): Promise<string[] | null[]> {
  try {
    const response = await axios.post(makeUrl(ROOT_API, 'auth', 'token', 'refresh'), {
      refresh: refreshToken,
    })

    const { access, refresh } = response.data
    // still within this block, return true
    return [access, refresh]
  } catch {
    return [null, null]
  }
}

const settings: NextAuthOptions = {
  pages: { signIn: '/login', error: '/welcome' },
  secret: process.env.SESSION_SECRET,
  session: {
    jwt: true,
    maxAge: 24 * 60 * 60, // 24 hours
  },
  jwt: {
    secret: process.env.JWT_SECRET || 'totoro-secret',
  },
  debug: process.env.NODE_ENV === 'development',
  providers: [
    Providers.Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    Providers.GitHub({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
    }),

    Providers.Discord({
      clientId: process.env.DISCORD_CLIENT_ID,
      clientSecret: process.env.DISCORD_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async jwt(token, user, account) {
      // user just signed in
      if (user) {
        // may have to switch it up a bit for other providers
        if (account?.provider) {
          // extract these two tokens
          const { accessToken, idToken } = account

          let token = {}

          try {
            // make a POST request to the DRF backend
            const tokenPromise = await axios.post<ServerData>(
              // tip: use a seperate .ts file or json file to store such URL endpoints
              // "http://127.0.0.1:8000/api/social/login/google/",
              makeUrl(ROOT_API, 'social', account.provider),
              {
                access_token: accessToken, // note the differences in key and value variable names
                id_token: idToken,
              }
            )

            // extract the returned token from the DRF backend and add it to the `user` object
            const { access_token, refresh_token } = tokenPromise.data
            // reform the `token` object from the access token we appended to the `user` object
            token = {
              ...token,
              accessToken: access_token,
              refreshToken: refresh_token,
            }
          } catch (err) {
            token = {}
          }
          return token
        }
      }

      // user was signed in previously, we want to check if the token needs refreshing
      // token has been invalidated, try refreshing it
      if (isJwtExpired(token.accessToken as string)) {
        const [newAccessToken, newRefreshToken] = await refreshToken(token.refreshToken as string)

        if (newAccessToken && newRefreshToken) {
          token = {
            ...token,
            accessToken: newAccessToken,
            refreshToken: newRefreshToken,
            iat: Math.floor(Date.now() / 1000),
            exp: Math.floor(Date.now() / 1000 + 2 * 60 * 60),
          }

          return token
        }

        // unable to refresh tokens from DRF backend, invalidate the token
        return {
          ...token,
          exp: 0,
        }
      }

      // token valid
      return token
    },

    async session(session, userOrToken) {
      session.accessToken = userOrToken.accessToken
      return session
    },
  },
}

export default (req: NextApiRequest, res: NextApiResponse): void | Promise<void> =>
  NextAuth(req, res, settings)
