import Attendance from "../models/attendance.js";
import { failed, success } from "../utils/response.js";

export const checkInController = async(req, res)=>{
    try {
        const employeeId = req.user._id;
        const startOfDay = new Date();
        startOfDay.setHours(0,0,0,0);
    
        const endOfDay = new Date();
        endOfDay.setHours(23, 59, 59, 999)
    
        const existingAandance = await Attendance.findOne(
            {
                employeeId, 
                date: {
                    $gte: startOfDay,
                    $lte: endOfDay
                }
            }
        );

        if(existingAandance){
            return failed(res, 400, "You have already checkIn");
        }
    
        const checkIn = await Attendance({
            employeeId,
            date: new Date(),
            checkIn: new Date(),
            status: "PERSENT"
        });
    
        await checkIn.save();
    
        return success(res, 201, "Check-in successful", checkIn);
    } catch (error) {
        console.error(error);

        return failed(res, 500, "Something went wrong");
    }
};

export const checkOutController = async(req, res)=>{
    try {
        const employeeId = req.user._id;
        const startOfDay = new Date();
        startOfDay.setHours(0, 0, 0, 0);
    
        const endOfDay = new Date();
        endOfDay.setHours(23,59,59,999);
    
        const attendance = await Attendance.findOne(
            {
                employeeId,
                date: {
                    $gte: startOfDay,
                    $lte: endOfDay
                }
            }
        );
        if(!attendance){
            return failed(res, 400, "Please check in first");
        };
    
        // if(attendance.checkout){
        //     return failed(res, 400, "you have already checked out");
        // }
    
        const checkout = new Date();
        const workingMiliSeconds = checkout.getTime() - attendance.checkIn.getTime();
        const workingHours = workingMiliSeconds /(1000 * 60 * 60);
    
        attendance.checkout = checkout;
        attendance.workingHours = Number(workingHours.toFixed(2));
        attendance.status = "COMPLETED";
    
        await attendance.save();
    
        return success(res, 200, "Checked Out Successfully");
    } catch (error) {
        console.error(error);

        return failed(res, 500, "Somethin went wrong")
    }

}

export const getTodayAttendanceController = async(req, res)=>{
    try {
        const employeeId = req.user._id;
        const startOfDay = new Date();
        startOfDay.setHours(0, 0, 0, 0); 

        const endOfDay = new Date();
        endOfDay.setHours(23, 59, 59, 999);


        const todayAttendance = await Attendance.findOne(
            {
                employeeId,
                date:{
                    $gte: startOfDay,
                    $lte: endOfDay
                }
            }
        )

        return success(res, 200, "", todayAttendance);
    } catch (error) {
        console.error(error);
        return failed(res, 500, 'Internal server error');
    }
}