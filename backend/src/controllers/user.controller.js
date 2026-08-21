import Role from "../models/Role.js";
import User from "../models/User.js";
import { comparePassword, generateToken } from "../services/auth.service.js";

export const addUserController = async (req, res) => {

    try {
        const { firstName, lastName, dialCode, email, phone, salary, country, city, address, role, password } = req.body;

        const isUserExist = await User.findOne({ email: email.trim().toLowerCase() });
        if (isUserExist) return res.status(409).json({
            success: false,
            message: "User already exist"
        });

        const userRole = await Role.findOne({ name: role || "USER" });

        if (!userRole) return res.status(400).json({
            success: false,
            message: "Invalid Role",
        });

        const data = {
            firstName, lastName, dialCode, email, phone, salary, country, city, address, password,
            role: userRole._id
        };

        const user = await User.create(data);

        res.status(201).json({
            success: true,
            message: "User created successfully",
            data: {
                _id: user._id,
                name: user.name,
                email: user.email,
                role: userRole.name
            }
        });
    } catch (error) {
        if (error.name === "ValidationError") {
            const errors = {};
            Object.keys(error.errors).forEach((field) => {
                errors[field] = error.errors[field].message
            });

            return res.status(400).json({
                success: false,
                message: "Validation failed",
                errors,
            })
        }

        console.error("Add User Error:", error);

        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        })
    }
}


export const userLoginController = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) return res.status(400).json({
            success: false,
            message: "Email and password is required",
        });

        const user = await User.findOne({ email: email.trim().toLowerCase() }).select("+password");

        if (!user) return res.status(400).json({
            success: false,
            message: "Invalid Email or Password"
        });

        const isPasswordValid = await comparePassword(password, user.password);

        if (!isPasswordValid) return res.status(400).json({
            success: false,
            message: "Invalid Email or Password"
        });

        const role = await Role.find({ _id: user._id });
        //   console.log("role", role)
        const userData = {
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            phone: user.phone,
            dialCode: user.dialCode,
            salary: user.salary,
            country: user.country,
            address: user.address,
            role: role.name,
        };
        delete userData.password;
        console.log("userData", userData);
        const token = await generateToken(userData);

        if (token.success) return res.status(200).json({
            success: true,
            message: "Login Successfull",
            data: {
                user: userData,
                token
            }

        });

        console.error(token);

        return res.status(500).json({ message: "Internal server erroor", success: false });

    } catch (error) {
        console.log(`login api failed: `, error);

        return res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
}

export const usersController = async (req, res) => {
    try {
        const users = await User.find({});
        return res.status(200).json({
            success: true,
            data: users
        })
    } catch (error) {
        console.error(`Error in get User api: ${error}`);

        return res.status(500).json({
            success: false,
            message: "Internal Server error"
        })
    }
}

export const editUserController = async (req, res) => {
    try {
        const id = req.params.id;
        if (!id) return res.status(401).json({
            success: false,
            message: "Invalid User"
        })

        const updatedUser = await User.findByIdAndUpdate(id, req.body, {
            new: true,
            runValidators: true
        });
        if (!updatedUser) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }
        return res.status(200).json({
            success: true,
            message: "User  updated successfully"
        })

    } catch (error) {
        console.error(error);

        return res.status(500).json({
            success: false,
            message: "Internal Server error"
        })
    }

}

export const deleteUserController = async (req, res) => { }