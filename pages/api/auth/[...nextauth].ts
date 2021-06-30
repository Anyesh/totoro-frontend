import { getInitialTokenFromDRF, handleLogout, refreshTokenFromDRF } from '@actions/auth'
import { isJwtExpired } from '@utils/jwt'
import { NextApiRequest, NextApiResponse } from 'next'
import NextAuth, { NextAuthOptions, Session } from 'next-auth'
import Providers from 'next-auth/providers'

// interface ServerResponse {
//   data: ServerData
// }

const settings: NextAuthOptions = {
  pages: { signIn: '/login', error: '/error' },

  secret: process.env.SESSION_SECRET,
  session: {
    jwt: true,
    maxAge: 6 * 60 * 60, // 6 hours
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
  events: {
    signOut: async (message: Session) => {
      handleLogout({
        token: message?.accessToken as string,
        refreshToken: message?.refreshToken as string,
      })
    },
  },
  callbacks: {
    jwt: async (token, user, account) => {
      if (user) {
        if (account?.provider) {
          const { accessToken, idToken } = account

          const token_response = getInitialTokenFromDRF({
            provider: account.provider,
            accessToken,
            idToken,
          })

          return {
            ...token,
            ...(await token_response).user,
            accessToken: (await token_response).access_token,
            refreshToken: (await token_response).refresh_token,
          }
        }
      }

      // user was signed in previously, we want to check if the token needs refreshing
      // token has been invalidated, try refreshing it
      if (isJwtExpired(token.accessToken as string)) {
        const [newAccessToken, newRefreshToken] = await refreshTokenFromDRF(
          token.refreshToken as string
        )

        if (newAccessToken && newRefreshToken) {
          return {
            ...token,
            accessToken: newAccessToken,
            refreshToken: newRefreshToken,
            iat: Math.floor(Date.now() / 1000),
            exp: Math.floor(Date.now() / 1000 + 2 * 60 * 60),
          }
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
      session.refreshToken = userOrToken.refreshToken
      return session
    },
  },
}

export default (req: NextApiRequest, res: NextApiResponse): void | Promise<void> =>
  NextAuth(req, res, settings)
