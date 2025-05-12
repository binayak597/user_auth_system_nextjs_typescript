import nodemailer from "nodemailer";
import bcrypt from "bcryptjs";
import { EmailType } from "@/utils/appConstants";
import User from "@/models/userSchema";

const sendEmail = async (
  email: string,
  emailType: EmailType,
  userId: string
) => {
  try {
    //create the hashedToken
    const hashedToken = await bcrypt.hash(userId.toString(), 10);

    if (emailType === EmailType.VERIFY_TOKEN) {
      //update the user
      await User.findByIdAndUpdate(userId, {
        verifyToken: hashedToken,
        verifyTokenExpiry: Date.now() + 3600000, //1 HOUR
      });
    } else if (emailType === EmailType.FORGOT_PASSWORD_TOKEN) {
      //update the user

      await User.findByIdAndUpdate(userId, {
        fogotPasswordToken: hashedToken,
        forgotPasswordTokenExpiry: Date.now() + 3600000, //1 HOUR
      });
    }

    const transport = nodemailer.createTransport({
      host: "sandbox.smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: process.env.MAILTRAP_USER,
        pass: process.env.MAILTRAP_PASS,
      },
    });

    const mailOptions = {
      form: "binayak@gmail.com",
      to: email,
      subject:
        emailType === EmailType.VERIFY_TOKEN
          ? "Verify your email"
          : "Reset your password",
      html: `<p>Click <a href="${process.env.BASE_URL}/${
        emailType === EmailType.VERIFY_TOKEN ? "verify-email" : "reset-password"
      }?token=${hashedToken}">here</a> to ${
        emailType === EmailType.VERIFY_TOKEN
          ? "verify your email"
          : "reset your password"
      }</p>
  <p>copy and paste the link below in your browser to get the verification </p>
  <p>${process.env.BASE_URL}/${
        emailType === EmailType.VERIFY_TOKEN ? "verify-email" : "reset-password"
      }?token=${hashedToken}</p>
  <p>Note: The link will expire in 1 hour</p>
  <p>Thanks</p>`,
    };

    const info: any = await transport.sendMail(mailOptions);
    console.log("Email sent:", info.repsonse);
  } catch (error) {

    console.error("Error sending email:", error);
    if (error instanceof Error) {
      throw new Error(error.message);
    } else {
      console.error("Unexpected error ->", error);
      throw new Error("An unexpected error occurred");
    }
    
  }
};

export { sendEmail };
