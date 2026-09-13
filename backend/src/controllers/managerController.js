import mongoose from "mongoose";
import Employee from "../models/Employee.js";
import Role from "../models/Role.js";
import { failed, success } from "../utils/response.js";
import Leave from "../models/leave.js";

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

    return success(res, 200, "", manager);
}

export const getMyTeam = async(req, res)=>{
    try {
        const employeeId = req.user._id;

        const team = await Employee.find({manager: new mongoose.Types.ObjectId(employeeId)});
        return success(res, 200, null, team);
        
    } catch (error) {
        console.error(error);
        return failed(res, 500, "Something went wrong");
    }
}

export const getTeamSummary = async(req, res)=>{
     try {
        const employeeId = req.user._id;

        const team = await Employee.find({manager: new mongoose.Types.ObjectId(employeeId)});
        const size = team.length;
        const active = team.filter((p)=>p.status==="ACTIVE").length;

        const departmentCount = new Set(
            team.map((employee)=>employee.department.toString())
        ).size;

        // console.log("team.map((employee)=>employee.department)", team.map((employee)=>employee.department))
        const designationCount = new Set(
            team.map((employee)=>employee.designation.toString())
        ).size;

        const summary = {size, active, departmentCount, designationCount }
        return success(res, 200, null, summary);
        
    } catch (error) {
        console.error(error);
        return failed(res, 500, "Something went wrong");
    }
}

export const getLeaveRequest = async (req, res) => {
  try {
    const managerId = req.user._id;

    // Get employees under this manager
    const team = await Employee.find(
      { manager: managerId },
      { _id: 1 }
    );

    const teamId = team.map((employee) => employee._id);

    // Get leave requests of team members
    const leaveList = await Leave.find({
      employeeId: { $in: teamId },
    }).populate([
        {
        path: 'employeeId', 
        select: 'firstName lastName designation',
        // populate: {
        //     path:  'designation',
        //     select: 'name'
        // }
    },
    {
        path: 'leaveTypeId', select: 'name'
    }
]);

    return success(res, 200, null, leaveList);
  } catch (error) {
    console.error(error);
    return failed(res, 500, "Something went wrong");
  }
};