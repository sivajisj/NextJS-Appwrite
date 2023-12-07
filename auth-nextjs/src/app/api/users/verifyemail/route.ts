import {connect} from "@/dbConfig/dbConfig"
import User from "@/models/Users";
import { NextResponse, NextRequest } from "next/server"


connect()

export async function POST(request: NextRequest){

    try {
        
        const reqBody = await request.json();
        const {token} = reqBody
        console.log(token);

        User.findOne({verifyToken: token ,
        verifyTokenExpiry: {$gt : Date.now()}})
        
    } catch (error: any) {
        return NextResponse.json({error : error.message}, {status : 500})
    }
}