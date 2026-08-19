import mongoose from "mongoose";

export const connectDB = async()=>{
    try {
        await mongoose.connect(process.env.MONGO_URI);

        console.log("Mongo db connected Successfully");

    } catch (error) {
        console.log("Connection failed with db");
        console.error(error);
    }
}

