import { getDataFromToken } from "@/helpers/getDataFromToken";
import { NextRequest, NextResponse } from "next/server";
import User from "@/models/Users";
import { connect } from "@/dbConfig/dbConfig";

connect();

export async function GET(request: NextRequest) {

    try {
        const id = await getDataFromToken(request);
        const user = await User.findById(id).select("-password");

        return NextResponse.json(user);
        
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });       
    }
}