import dotenv from "dotenv";
dotenv.config();

import { connectDB } from "../config/db.js"
import LeaveType from "../models/leaveType.js";

const leaveTypes = [
    {
        name: "Casual Leave",
        code: "CL",
        totalDays: 12,
        description: "Leave for personal or short-term needs.",
        status: "ACTIVE"
    },
    {
        name: "Sick Leave",
        code: "SL",
        totalDays: 10,
        description: "Leave taken due to illness or medical reasons.",
        status: "ACTIVE"
    },
    {
        name: "Earned Leave",
        code: "EL",
        totalDays: 15,
        description: "Leave accumulated based on employee service and eligibility.",
        status: "ACTIVE"
    },
    {
        name: "Paid Leave",
        code: "PL",
        totalDays: 10,
        description: "Paid time off available to eligible employees.",
        status: "ACTIVE"
    },
    {
        name: "Leave Without Pay",
        code: "LWP",
        totalDays: 0,
        description: "Approved leave taken without salary payment.",
        status: "ACTIVE"
    },
    {
        name: "Maternity Leave",
        code: "ML",
        totalDays: 182,
        description: "Leave provided for maternity and childbirth.",
        status: "ACTIVE"
    },
    {
        name: "Paternity Leave",
        code: "PTL",
        totalDays: 15,
        description: "Leave provided to eligible employees following the birth or adoption of a child.",
        status: "ACTIVE"
    },
    {
        name: "Bereavement Leave",
        code: "BL",
        totalDays: 5,
        description: "Leave provided following the loss of an immediate family member.",
        status: "ACTIVE"
    },
    {
        name: "Work From Home",
        code: "WFH",
        totalDays: 12,
        description: "Permission to work remotely for an approved period.",
        status: "ACTIVE"
    }
];

const leaveTypeSeeder = async () => {
    try {
        await connectDB();

        const count = await LeaveType.countDocuments();
        if (count > 0) {
            console.log("Leave Type already exists");
        }

        await LeaveType.insertMany(leaveTypes);

        console.log("leave type seeded successfully");
         process.exit(0);

    } catch (error) {
        console.error("leave type data seeding failed", error);
         process.exit(1);

    }
}

leaveTypeSeeder()