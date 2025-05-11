import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
 

const middleware = (request: NextRequest) => {

  const path = request.nextUrl.pathname
  const isPublicPath = path === "/login" || path === "/signup"

  const token = request.cookies.get("authToken")?.value || ""

  if(isPublicPath && token){

    return NextResponse.redirect(new URL("/", request.nextUrl))
  }

  if(!isPublicPath && !token){

    return NextResponse.redirect(new URL("/login", request.nextUrl))
  }
}
 

export const config = {
  matcher: [
    "/",
    "/profile/:id*",
    "/login",
    "/signup"
  ],
}

export {middleware}