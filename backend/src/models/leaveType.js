import mongoose from "mongoose";

const LeaveTypeSchema = mongoose.Schema({
    name:{
        type: String,
        required: true,
        trim: true
    },
    code:{
        type: String,
        required:true,
        unique: true,
        uppercase: true
    },
    desription:{
        type: String,
        trim: true
    },
    totaldays:{
        type: Number,
        min: 0
    },
    status:{
        type: String,
        enum:["ACTIVE", "INACTIVE"],
        default: "ACTIVE"
    }
},
{timestamps:true}
)

export default mongoose.model("LeaveType", LeaveTypeSchema);