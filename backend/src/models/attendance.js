import mongoose from "mongoose";

const attandanceSchema = mongoose.Schema({
    employeeId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Employee',
        required: true,
    },
    date:{
        required:true,
        type: Date,
    },
    sessions:[
        {
        checkIn:{
        type: Date,
        default: null,
        
    },
    checkOut:{
        type: Date,
        default: null,

    },
        workingHours:{
        type: Number,
        default: 0,
    }
    }
],
    status:{
        type: String,
        status: ["PERSENT", "COMPLETED", "INCOMPLETE"],
        default: "PERSENT"

    },
    totalWorkingHours:{
        type: Number,
        default: 0,
    }
},
{
    timestamps: true
}
);

attandanceSchema.index(
    {employeeId: 1, date: 1},
    { unique: true }
)

export default mongoose.model('Attandance', attandanceSchema);