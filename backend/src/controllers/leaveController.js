import leaveType from "../models/leaveType.js";
import LeaveType from "../models/leaveType.js";
import { failed, success } from "../utils/response.js";
import applyLeave from "../models/leave.js";
import leave from "../models/leave.js";

export const applyLeaveController = async(req, res)=>{
    try {
        const userId = req.user._id;
        if(!userId) return failed(res, 401, "Unautherized User");

        const { leaveTypeId, startDate, endDate, reason } = req.body;
        
        let totalDays = new Date(endDate)- new Date(startDate);
        totalDays = totalDays/(1000*60*60*24);

        const leaveTypeList = await leaveType.findOne({_id: leaveTypeId});
        const leave = {
                employeeId: userId,
                totalDays: totalDays,
                leaveTypeId: leaveTypeList._id, 
                startDate, endDate, reason
        }
        const create = await applyLeave.insertOne(leave);
         
        return success(res, 201, "Leave Applied Successfully", create);
        

    } catch (error) {
        console.error("leave apply api", error);
        return failed(res, 401, "Unautherized User", error);
    }
}

export const getLeaveTypeController = async(req, res)=>{
    try {
        const leaveTypeList = await leaveType.find({});

        return success(res, 200, "", leaveTypeList);
    } catch (error) {
        console.error(error);
                return failed(res, 401, "Unautherized User", error);

    }
}
export const getLeaveListController = async(req, res)=>{
    try {
        const employeeId = req.user._id;
        const leaveTypeList = await leave.find({employeeId}).populate("leaveTypeId", 'name');

        return success(res, 200, "", leaveTypeList);
    } catch (error) {
        console.error(error);
                return failed(res, 401, "Unautherized User", error);

    }
}