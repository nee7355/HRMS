import mongoose, { model } from "mongoose"


/* 
this is for the future when we implement email based verfication and the email based password generation
then we will use to this model
*/

const userSchema = mongoose.Schema({
    email: String,
    password: String,
    roleId: String,
    isActive: String,
    passwordSetupToken: String,
    passwordSetupTokenExpires: String,
},
{
    timestamps:true
});

export default mongoose.model("User", userSchema);