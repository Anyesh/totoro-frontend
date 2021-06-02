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
  user: {
    pk: string
    username: string
  }
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
  pages: { signIn: '/login', error: '/error' },
  secret: process.env.SESSION_SECRET,
  session: {
    jwt: true,
    maxAge: 24 * 60 * 60, // 24 hours
  },
  jwt: {
    secret: process.env.JWT_SECRET || 'totoro-secret',
  },
  debug: false, //process.env.NODE_ENV === 'development',
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
    jwt: async (token, user, account, profile, isNewUser) => {
      if (user) {
        console.log('user', user)
        console.log('account', account)
        console.log('profile', profile)
        console.log('newuser', isNewUser)
        if (account?.provider) {
          const { accessToken, idToken } = account

          let local_token = {}

          try {
            // make a POST request to the DRF backend
            const tokenPromise = await axios.post<ServerData>(
              makeUrl(ROOT_API, 'social', account.provider),
              {
                access_token: accessToken, // note the differences in key and value variable names
                id_token: idToken,
              }
            )

            // extract the returned token from the DRF backend and add it to the `user` object
            const { access_token, refresh_token, user } = tokenPromise.data
            // reform the `token` object from the access token we appended to the `user` object
            local_token = {
              ...token,
              ...user,
              accessToken: access_token,
              refreshToken: refresh_token,
            }
          } catch (err) {
            local_token = {}
          }
          return local_token
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

    session: async (session, userOrToken) => {
      session.user = {
        email: userOrToken?.email,
        name: userOrToken?.username as string,
        image: userOrToken?.picture as string,
      }
      session.accessToken = userOrToken.accessToken
      return session
    },
  },
}

export default (req: NextApiRequest, res: NextApiResponse): void | Promise<void> =>
  NextAuth(req, res, settings)
