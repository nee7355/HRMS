import dotenv from "dotenv";
const envFile = `.env.${process.env.NODE_ENV || 'development'}`;

console.log("process.env.NODE_ENV", process.env.NODE_ENV);

dotenv.config({
    path: envFile
});

import app from "./app.js"
import { connectDB } from "./config/db.js";"./config/db";

const port = process.env.PORT || 5000;

const startServer = async()=>{
    try {
        await connectDB();

        app.listen(port, ()=>{
            console.log(`Server is running on ${port}`);
        });

    } catch (error) {
        console.error("Failed to start server", error);
        process.exit(1);
    }
}

startServer();