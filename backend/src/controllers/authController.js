import Employee from "../models/Employee.js"
import { failed, success } from "../utils/response.js";

export const getProfile = async(req, res) =>{
    const user = await Employee.findById(req.user._id);

    return success(res, 200, "User Authenticated", user);
    
}

export const getCurrentUser = async(req, res)=>{
    try {
        const user = await Employee.findById(req.user._id).populate("role", 'name');
        if(!user) failed(res, 404, "User not found");
    
        return success(res, 200, "", user);
    } catch (error) {
        console.log(error)
        return failed(res, 500, "Something went wrong");
    }

}