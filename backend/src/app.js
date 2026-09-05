import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";

import userRoutes from "./routes/userRoutes.js"
import departmentrRoutes from "./routes/departmentRoutes.js"
import designationRoute from "./routes/designationRoute.js"
import managerRoute from "./routes/managerRoutes.js";
import authRoute from './routes/authRoute.js';
import attendanceRoute from './routes/attendanceRoute.js';
import cookieParser from 'cookie-parser';

const app = express();

app.use(express.json());

app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true,
}));

app.use(cookieParser());
app.use(helmet());
app.use(morgan("dev"));

app.get("/api/v1/health", (req, res)=>{
    try {
        return res.status(200).json({
            success:true,
            message: "api is running well"
        })
    } catch (error) {

        console.error(error);
        
        return  res.status(500).json({
            success: false,
            message: "api crashed"
        })
    }
})

app.use("/api/v1/", authRoute);
app.use("/api/v1/employees", userRoutes);
app.use("/api/v1/department", departmentrRoutes);
app.use("/api/v1/designation", designationRoute);
app.use("/api/v1/manager", managerRoute);
app.use("/api/v1/attendance", attendanceRoute);

export default app;