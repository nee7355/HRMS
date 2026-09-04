import mongoose from "mongoose";
import { hashPassword } from "../services/auth.service.js";

const employeeSchema = mongoose.Schema({
    firstName:{
        type: String,
        required: [true, "Name is required"],
        trim: true,
        minlength: [3, "Name must be atleast 3 character"],
    },
    lastName:{
        type: String,
        required: [true, "Name is required"],
        trim: true,
        minlength: [3, "Name must be atleast 3 character"],
    },
    email:{
        type: String,
        required: [true, "Email is required"],
        trim: true,
        unique: true,
        lowercase: true,
        match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Please enter a valid email address" ]
    },
    phone: {
        type: String,
        required: [true, "Phone is required"],
        trim: true
    },
    dialCode: {
        type: String,
        required: [true, "Phone is required"],
        trim: true
    },
    salary: {
        type: Number,
        min: 0
    },
    country: {
        type: String,
    },
    state: {
        type: String,
    },
    city: {
        type: String,
    },
    address: {
        type: String,
    },
    role: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Role",
        required: true,
        
    },
    password: {
        type: String,
        required: [true, "Password is required"], 
        minlength: 5,
        select: false

    },
    userId: {
        type:mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    managerId: {
        type:mongoose.Schema.Types.ObjectId,
        ref: 'Employee'
    },
    department: {
        type:mongoose.Schema.Types.ObjectId,
        ref: 'Department'
    },
    designation: {
        type:mongoose.Schema.Types.ObjectId,
        ref: 'Designation'
    },

},{
    timestamps: true,
});

employeeSchema.pre("save", async function(){
    if(!this.isModified("password")) return;
    this.password = await hashPassword(this.password);

});
export default mongoose.model("Employee", employeeSchema);