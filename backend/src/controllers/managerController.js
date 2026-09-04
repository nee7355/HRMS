import mongoose from "mongoose";
import Employee from "../models/Employee.js";
import Role from "../models/Role.js";
import { failed, success } from "../utils/response.js";

export const getManagerController = async(req, res)=>{
    const {departmentId} = req.params;
    
    
    
    if(!departmentId) return failed(res, 400, "Bad request department not found");

    const role = await Role.find({name:"MANAGER"});
    const manager = await Employee.aggregate([
        {$match: {
            department: new mongoose.Types.ObjectId(departmentId),
            role: new mongoose.Types.ObjectId(role[0]._id)
        }},
        {
            $addFields:{
                name: {$concat: ["$firstName", " ", "$lastName"]}
            }
        }
    ])
    // const manager = await Employee.find({
    //     department: departmentId,
    //     role: role[0]._id
    // })
 console.log("manager..............................",manager);

    return success(res, 200, "", manager);
}