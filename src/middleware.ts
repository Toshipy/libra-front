import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { auth0 } from './lib/auth0'
import { logger } from './lib/logger'

export async function middleware(request: NextRequest) {
  const authRes = await auth0.middleware(request)

  // 認証関連のルート - ミドルウェアに処理を任せる
  if (request.nextUrl.pathname.startsWith('/auth')) {
    return authRes
  }

  const session = await auth0.getSession()
  if (!session) {
    return NextResponse.redirect(new URL('/auth/login', request.nextUrl.origin))
  }

  /**
   * @see https://github.com/auth0/nextjs-auth0/tree/v4?tab=readme-ov-file#passing-authorization-parameters:~:text=call%20external%20APIs.-,Important,as%20this%20will%20ensure%20the%20token%20is%20refreshed%20and%20correctly%20persisted.,-For%20example%3A
   * Server Componentsではクッキーを設定できません。Server Component内でgetAccessToken()を呼び出すと、
   * アクセストークンが期限切れの場合に更新されますが、更新されたトークンは永続化されません。
   *
   * Server Componentでリフレッシュトークンを使用する必要がある場合は、ミドルウェアでgetAccessToken(req, res)を
   * 呼び出すことを推奨します。これにより、トークンが確実に更新され、正しく永続化されます。
   */
  try {
    await auth0.getAccessToken(request, authRes)
  } catch (error) {
    logger.error(error)
    return NextResponse.redirect(new URL('/auth/login', request.nextUrl.origin))
  }

  return authRes
}

export const config = {
  matcher: [
    /*
     * 以下で始まるパス以外のすべてのリクエストパスにマッチ:
     * - _next/static (静的ファイル)
     * - _next/image (画像最適化ファイル)
     * - favicon.ico, sitemap.xml, robots.txt (メタデータファイル)
     */
    '/((?!_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)'
  ]
}
