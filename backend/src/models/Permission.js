import mongoose from "mongoose";

const PermissionModel = mongoose.Schema({
    name:{
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    resource: {
        type: String,
        required: true,
        uique: true,
        trim: true
    },
    action: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String,
    }
},
{
    timestamps: true
});

export default mongoose.model("Permission", PermissionModel);