import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import dotenv from "dotenv";

dotenv.config();

export const hashPassword = async(pass)=>{
    return await bcrypt.hash(pass, 10);
}

export const comparePassword = async(plainPass, hashPass)=>{
    return  await bcrypt.compare(plainPass, hashPass);
}

const JWT_SECRET = process.env.JWT_SECRET;

export const generateToken = async(user)=>{
    try {
        const token = await jwt.sign(user, JWT_SECRET, {expiresIn: '1h'});
        return {
            success: true,
            token
        };

    } catch (error) {
        console.error(error);
        
        return {
            success: false,
            token: `Token generation failed: ${error}`
        };
    }

}


export const verifyToken = async(token)=>{

    const isValidToken = jwt.verify(token, JWT_SECRET);
    if(isValidToken) return isValidToken;

    return "Token verification failed";
}