import mongoose from "mongoose";

export const connectDB = async()=>{
    try {
        await mongoose.connect(process.env.MONGO_URI);

        // console.log("process.env.node_env", process.env.NODE_ENV);

        console.log('process.env.MONGO_URI', process.env.MONGO_URI)

        console.log("Mongo db connected Successfully");

    } catch (error) {
        console.log("Connection failed with db");
        console.error(error);
    }
}

