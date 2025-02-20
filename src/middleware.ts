import { type NextRequest, NextResponse } from 'next/server'
import { auth0 } from './lib/auth0'

export async function middleware(request: NextRequest) {
  try {
    if (request.nextUrl.pathname.startsWith('/auth')) {
      return await auth0.middleware(request)
    }

    const authRes = await auth0.middleware(request)

    try {
      await auth0.getAccessToken(request, authRes)
    } catch (error) {
      // エラーログ記録
      console.error('Token refresh error:', error)
      return NextResponse.redirect(
        new URL('/auth/login', request.nextUrl.origin)
      )
    }

    return authRes
  } catch (error) {
    // エラーログ記録
    console.error('Auth0 middleware error:', error)

    // ログインページへリダイレクト
    return NextResponse.redirect(new URL('/auth/login', request.nextUrl.origin))
  }
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)'
  ]
}
