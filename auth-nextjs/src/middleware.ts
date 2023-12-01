import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

//This is a middleware function
export function middleware(req: NextRequest, res: NextResponse) {
        const path = req.nextUrl.pathname 

        const isPublicPath = path === '/login' || path === '/signup'
       const token = req.cookies.get('token')?.value || ""
       
       if(isPublicPath && token){
           return NextResponse.redirect(new URL('/',req.nextUrl))
       }
       if(!isPublicPath && !token){

        return NextResponse.redirect(new URL('/login',req.nextUrl))
       }
    }   

export const config = {
    matcher : [
        "/",
        "/profile",
        "/login",
        "/signup",
        
    ]
}