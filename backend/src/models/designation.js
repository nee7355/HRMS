import mongoose from "mongoose";

const designationSchema = mongoose.Schema({
    name:{
        type: String,
        required: true,
        trim: true
    },
    description:{
        type: String,
        trim: true
    },
    status:{
        type: String,
        enum: ["ACTIVE", "INACTIVE"],
        default: "ACTIVE"
    },
    departmentId:{
        type: mongoose.Types.ObjectId,
        ref: 'department',
        required: true
    }
},
{
    timestamps: true
}
);

export default mongoose.model('Desgination', designationSchema);