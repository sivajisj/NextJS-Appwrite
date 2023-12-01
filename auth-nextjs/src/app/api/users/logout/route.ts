import { NextResponse } from "next/server";


export async function GET(){
    const response = NextResponse.json({
        message: "Logout successfull",
        success: true
    })

    response.cookies.set("token", "", {
        expires: new Date(0),
        httpOnly: true
    })

    return response

    try {
        
    } catch (error: any) {
        return NextResponse.json({error : error.message}, {status: 500})
        
    }
}