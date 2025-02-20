import { Auth0Client } from '@auth0/nextjs-auth0/server'

export const auth0 = new Auth0Client({
  authorizationParameters: {
    audience: process.env.AUTH0_AUDIENCE ?? '',
    scope: 'openid profile email'
  },
  session: {
    /**
     * @see https://github.com/auth0/nextjs-auth0/tree/v4?tab=readme-ov-file#session-configuration
     * 有効にすると、inactivityDuration期間内に使用されている限り、セッションは延長され続けます。absoluteDurationで設定された上限に達すると、セッションはそれ以上延長されません
     */
    rolling: true,
    absoluteDuration: 60 * 60 * 24 * 3, // 3 day in seconds
    inactivityDuration: 60 * 60 * 24 * 1 // 1 day in seconds
  }
})
