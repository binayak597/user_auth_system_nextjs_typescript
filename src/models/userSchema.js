import mongoose from 'mongoose'



const userSchema = new mongoose.Schema({

  username: {
    type: String,
    required: [true, "username is required"],
    unique: true,
   },

   email: {
    type: String,
    required: [true, "email is required"],
    unique: true,
   },
   password: {
    type: String,
    required: [true, "password is required"],
   },
   isVerified: {
    type: Boolean,
    default: false
   },
   isAdmin:{
    type: Boolean,
    defult: false
   },
   verifyToken: String,
   verifyTokenExpiry: Date,
   forgotPasswordToken: String,
   forgotPasswordTokenExpiry: Date
})

const User = mongoose.models.User || mongoose.model("User", userSchema)


export default User