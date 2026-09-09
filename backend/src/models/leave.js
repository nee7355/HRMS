import mongoose from "mongoose";

const leaveSchema = mongoose.Schema({
    employeeId:{
        type: mongoose.Types.ObjectId,
        ref: 'Employee',
        required: true,
    },
    leaveTypeId:{
        type: mongoose.Types.ObjectId,
        ref: 'LeaveType',
        required: true
    },
    startDate: {
        type: Date,
        required: true
    },
    endDate: {
        type: Date,
        required: true
    },
    totalDays:{
        type: Number,
        required: true,
    },
    reason:{
        type: String,
        // required: true,
        trim: true,
    },
    status: {
        type: String,
        enum: [
            "PENDING",
            "APPROVED",
            "REJECTED",
            "CANCELLED"
        ],
        default: "PENDING"
    },
    approvedBy:{
        type: mongoose.Types.ObjectId,
        ref: 'Employee',
        default: null,
    },
    approvedAt: {
        type: Date,
        default: null,
    },
    rejectionReason: {
        type: String,
        default: null
    }
},
{
    timestamps: true
}
);

export default mongoose.model("leave", leaveSchema);