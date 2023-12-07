import nodemailer from 'nodemailer';

import User from '@/models/Users';
import bcryptjs from 'bcryptjs';


export const sendEmail = async({email, emailType, userId}: any) => {

    try {
        const hashedToken = await bcryptjs.hash(userId.toString(), 10);

        //  await User.findByIdAndUpdate({verifyToken :hashedToken, verifyTokenExpiry:  Date.now() + 3600000},{new :true , runValidators : true})
     if(emailType === 'VERIFY') {
         await User.findByIdAndUpdate(userId,{verifyToken :hashedToken, verifyTokenExpiry:  Date.now() + 3600000},{new :true , runValidators : true})
    }else if(emailType === 'RESET'){

         await User.findByIdAndUpdate(userId,{forgotPasswordToken :hashedToken, forgotPasswordTokenExpiry:  Date.now() + 3600000},{new :true , runValidators : true})

    }

    const transporter = nodemailer.createTransport({
        host: "sandbox.smtp.mailtrap.io",
        port: 2525,
        auth: {
          user: "9c28c2836b9995",
          pass: "fa855389b1f77a"
        }
      });

      const mailOptions = {
        from: 'sivajigsivajig703@gmail.com',
        to : email,
        subject: emailType === "VERIFY" ? "Verify your email" : "Reset your password",
        html: `<p>Click <a href="${process.env.DOMAIN}/verifyemail?token=${hashedToken}">here</a> to ${emailType === "VERIFY" ? "verify your email" : "reset your password"}
        or copy and paste the link below in your browser. <br> ${process.env.DOMAIN}/verifyemail?token=${hashedToken}
        </p>`      }

        const mailResponse = await transporter.sendMail(mailOptions)
        
        return mailResponse;
    } catch (error: any) {
      throw new Error(error)  
    }
}
