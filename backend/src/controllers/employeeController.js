import Role from "../models/Role.js";
import Employee from "../models/Employee.js";
import { comparePassword, generateToken } from "../services/auth.service.js";
import { success } from "../utils/response.js";

export const addEmployeeController = async (req, res) => {

    try {
        const { firstName, lastName, dialCode, email, phone, salary, country, city, address, role, password, designation, department, userId, manager } = req.body;

        const isUserExist = await Employee.findOne({ email: email.trim().toLowerCase() });
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
            firstName, lastName, dialCode, email, phone, salary, country, city, address, password, designation, department, userId, manager,
            role: userRole._id
        };

        const user = await Employee.create(data);

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

        const user = await Employee.findOne({ email: email.trim().toLowerCase() }).select("+password");

        if (!user) return res.status(400).json({
            success: false,
            message: "Invalid Email or Password"
        });

        const isPasswordValid = await comparePassword(password, user.password);

        if (!isPasswordValid) return res.status(400).json({
            success: false,
            message: "Invalid Email or Password"
        });

        const role = await Role.find({ _id: user.role });

        const userData = {
            _id: user._id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            phone: user.phone,
            dialCode: user.dialCode,
            salary: user.salary,
            country: user.country,
            address: user.address,
            role: role[0].name,
        };
        delete userData.password;
        // console.log("userData", userData);
        const token = await generateToken(userData);

        res.cookie("jwtToken", token.token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
            maxAge: 24 * 60 * 60 * 1000
        })

        if (token.success) return res.status(200).json({
            success: true,
            message: "Login Successfull",
            data: {
                user: userData,
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

export const logOutController = async (req, res) => {
    try {
        res.clearCookie("jwtToken");

        return success(res, 200, "Logout successfully");
    } catch (error) {

    }
}

export const employeeController = async (req, res) => {
    try {
        let {
            page,
            limit,
            search = ""
        } = req.query;

        page = parseInt(page || 1);
        limit = parseInt(limit || 50);
        search = search.trim();

        const filter = {};

        if (search) {
            filter.$or = [
                {
                    firstName: {
                        $regex: search,
                        $options: 'i'
                    }
                },
                {
                    lastName: {
                        $regex: search,
                        $options: 'i'
                    }
                },
                {
                    email: {
                        $regex: search,
                        $options: 'i'
                    }
                },
                {
                    phone: {
                        $regex: search,
                        $options: 'i'
                    }
                },
                // {
                //     salary:{
                //         $regex: search,
                //         $options: 'i'
                //     }
                // },
                {
                    state: {
                        $regex: search,
                        $options: 'i'
                    }
                },
                {
                    address: {
                        $regex: search,
                        $options: 'i'
                    }
                },
                // {
                //     role:{
                //         $regex: search,
                //         $options: 'i'
                //     }
                // },
            ]
        }

        const skip = (page - 1) * limit;

        const employees = await Employee.find(filter).populate([
            {path: 'role', select:"name"},
            {path: 'department', select:"name"},
        ]).skip(skip).limit(limit);

        const totalUsers = await Employee.countDocuments(filter);
        const totalPages = Math.ceil(totalUsers / limit);

        return res.status(200).json({
            success: true,
            data: {
                employees,
                totalPages,
                totalUsers,
                currentPage: page
            }
        })
    } catch (error) {
        console.error(`Error in get Employee api: ${error}`);

        return res.status(500).json({
            success: false,
            message: "Internal Server error"
        })
    }
}

export const editEmployeeController = async (req, res) => {
    try {
        const id = req.params.id;
        if (!id) return res.status(401).json({
            success: false,
            message: "Invalid User"
        })

            ;
        const role = await Role.find({ name: req.body.role });
        const userInput = {
            ...req.body,
            role: role[0]._id
        }


        const updatedUser = await Employee.findByIdAndUpdate(id, userInput, {
            new: true,
            runValidators: true
        });
        console.log("req.body..........", req.body)
        console.log("updatedUser..........", updatedUser)
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

export const deleteEmployeeController = async (req, res) => {
    try {
        const { id } = req.params;
        if (id) {
            const user = await Employee.findByIdAndDelete(id);
            console.log('deleted user', user)
            return res.status(200).json({
                success: true,
                message: "User Deleted Successfully"
            })
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Some thing went wrong"
        })
    }
}