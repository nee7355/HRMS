import dotenv from "dotenv";
dotenv.config();
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