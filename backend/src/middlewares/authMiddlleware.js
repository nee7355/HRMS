import jwt from 'jsonwebtoken';
import { failed } from '../utils/response.js';

export const authMiddleware = async(req, res, next)=>{
    const token = req.cookies.jwtToken;

    if(!token){
        return failed(res, 401, "Unautherized")
    }
    try {
        const verifiedUser = jwt.verify(token, process.env.JWT_SECRET)
        if(!verifiedUser)  return failed(res, 400, "Unautherized")

            req.user = verifiedUser;

            next();
    } catch (error) {
        return failed(res, 400, "Invalid or expired Token");
    }
}