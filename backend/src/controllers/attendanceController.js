import Attendance from "../models/attendance.js";
import { failed, success } from "../utils/response.js";

export const checkInController = async(req, res)=>{
    try {
        const employeeId = req.user._id;
        const startOfDay = new Date();
        startOfDay.setHours(0,0,0,0);
    
        const endOfDay = new Date();
        endOfDay.setHours(23, 59, 59, 999)
    
         let attendance = await Attendance.findOne(
            {
                employeeId, 
                date: {
                    $gte: startOfDay,
                    $lte: endOfDay
                }
            }
        );
        const checkIn = new Date();


        if(!attendance){
            attendance = await Attendance({
                employeeId,
                date: new Date(),
                sessions:[
                    {
                        checkIn,
                        checkOut: null,
                        workingHours: 0
                    }
                ],
                status: "PERSENT"
            });

            await attendance.save();

            return success(res, 201, "Check-in successful", attendance);
        }
    

        const activeSession = attendance.sessions.find(session=>!session?.checkOut);

        if(activeSession) return failed(res, 400, "You have already checked in");

        attendance.sessions.push({
            checkIn,
            checkOut: null,
            workingHours: 0
        })
        attendance.status = "PERSENT";

        await attendance.save()
    
        return success(res, 201, "Check-in successful", attendance);
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
            return failed(res, 400, "You are not currently checked in");
        };
    
 
        const activeSession = attendance?.sessions?.find(session=> session.checkIn && !session?.checkOut)
        console.log('attendance...', attendance)
        console.log('activeSession...', activeSession);
        
        if(!activeSession) return failed(res, 400, "Please check in first");

        const checkout = new Date();
        const workingMiliSeconds = checkout.getTime() - activeSession.checkIn.getTime();
        const workingHours = workingMiliSeconds /(1000 * 60 * 60);
        
        activeSession.checkOut = checkout;
        activeSession.workingHours = Number(workingHours.toFixed(2));
        activeSession.status = "COMPLETED";

        attendance.totalWorkingHours = Number(
            attendance.sessions.reduce((total, item)=>total+ item.workingHours,0)
        ).toFixed(2);
        
        attendance.status = "COMPLETED";

        await attendance.save();
    
        return success(res, 200, "Checked Out Successfully", attendance);
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