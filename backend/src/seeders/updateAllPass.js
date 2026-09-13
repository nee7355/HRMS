import dotenv from "dotenv";
dotenv.config();

import { connectDB } from "../config/db.js"
import Employee from "../models/Employee.js";
import { hashPassword } from "../services/auth.service.js";


const changePassword = async () => {
  try {
    await connectDB();

    const hashPass = await hashPassword("Admin@123");

    const updated = await Employee.updateMany(
      {email: {$exists: true}},
      {
        $set: {
          password: hashPass,
        },
      }
    );

    console.log(`Matched: ${updated.matchedCount}`);
    console.log(`Modified: ${updated.modifiedCount}`);

    process.exit(0);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

changePassword();