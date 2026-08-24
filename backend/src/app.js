import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";

import userRoutes from "./routes/user.routes.js"

const app = express();

app.use(cors());
app.use(helmet());
app.use(morgan("dev"));
app.use(express.json());


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

app.use("/api/v1/employees", userRoutes)


export default app;