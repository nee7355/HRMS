import mongoose from "mongoose";

const roleModel = mongoose.Schema({
    name:{
        type: String,
        required: true,
        unique: true,
        uppercase: true,
        trim: true,
        enum:["ADMIN", "HR", "MANAGER", "USER"]
    },
    description: {
        type: String,
    },
    permissions: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Permission"
        }
    ]
},{
    timestamps: true
})

export default mongoose.model("Role", roleModel);