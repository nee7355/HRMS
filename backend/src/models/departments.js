import mongoose from "mongoose";

const departmenetSchema = mongoose.Schema({
    name:{
        type: String,
        required: true,
        trim: true,
        unique: true,
    },
    description:{
        type: String,
        trim: true,
    },
    status:{
        type:String,
        enum:["ACTIVE", "INACTIVE"],
        default: "ACTIVE"
    }
},
{
    timestamps: true
}
);

export default mongoose.model('Department', departmenetSchema);