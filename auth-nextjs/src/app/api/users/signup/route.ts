import {connect} from "@/dbConfig/dbConfig";
import User from "@/models/Users";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs"
import { sendEmail } from "@/helpers/mailer";

export async function POST(request: NextRequest){
    try {
        const reqBody = await request.json();
        const {username, email,password} = reqBody;
        console.log(reqBody);

        //check is USer already exists
        const user = await User.findOne({email});
        if(user){
            return NextResponse.json({message: "User already exists"}, {status: 400});
        }
      //hash password  
      const salt = await bcryptjs.genSalt(10)
      const hashedPassword = await bcryptjs.hash(password, salt)
  

      //create new user

      const newUser = new User({
        username,
        email,
        password: hashedPassword
      })
      
      const savedUser = await newUser.save()

      console.log(savedUser);

      await sendEmail(
        {
          email , emailType: "VERIFY", userId : savedUser._id
        }
      )

      return NextResponse.json({
        message: "User created successfully",
        success: true,
        savedUser
    }, {status: 201})
      

     
    } catch (error: any) {
     return NextResponse.json({error: error.message},
        {status: 500})       
    }
}

connect()