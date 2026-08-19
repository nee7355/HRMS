import dotenv from "dotenv";
dotenv.config();

import { connectDB } from "../config/db.js";
import Permission from "../models/Permission.js";
import Role from "../models/Role.js";

const permissions = [
    // User
    {
        name: "user:create",
        resource: "user",
        action: "create",
        description: "Create users",
    },
    {
        name: "user:read",
        resource: "user",
        action: "read",
        description: "View users",
    },
    {
        name: "user:update",
        resource: "user",
        action: "update",
        description: "Update users",
    },
    {
        name: "user:delete",
        resource: "user",
        action: "delete",
        description: "Delete users",
    },

    // Employee
    {
        name: "employee:create",
        resource: "employee",
        action: "create",
        description: "Create employees",
    },
    {
        name: "employee:read",
        resource: "employee",
        action: "read",
        description: "View employees",
    },
    {
        name: "employee:update",
        resource: "employee",
        action: "update",
        description: "Update employees",
    },
    {
        name: "employee:delete",
        resource: "employee",
        action: "delete",
        description: "Delete employees",
    },

    // Attendance
    {
        name: "attendance:create",
        resource: "attendance",
        action: "create",
        description: "Create attendance",
    },
    {
        name: "attendance:read",
        resource: "attendance",
        action: "read",
        description: "View attendance",
    },
    {
        name: "attendance:update",
        resource: "attendance",
        action: "update",
        description: "Update attendance",
    },
    {
        name: "attendance:delete",
        resource: "attendance",
        action: "delete",
        description: "Delete attendance",
    },

    // Leave
    {
        name: "leave:create",
        resource: "leave",
        action: "create",
        description: "Create leave",
    },
    {
        name: "leave:read",
        resource: "leave",
        action: "read",
        description: "View leave",
    },
    {
        name: "leave:update",
        resource: "leave",
        action: "update",
        description: "Update leave",
    },
    {
        name: "leave:delete",
        resource: "leave",
        action: "delete",
        description: "Delete leave",
    },

    // Salary
    {
        name: "salary:create",
        resource: "salary",
        action: "create",
        description: "Create salary",
    },
    {
        name: "salary:read",
        resource: "salary",
        action: "read",
        description: "View salary",
    },
    {
        name: "salary:update",
        resource: "salary",
        action: "update",
        description: "Update salary",
    },
    {
        name: "salary:delete",
        resource: "salary",
        action: "delete",
        description: "Delete salary",
    },
];

// insert the data 

const seedRoleAndPermisions = async()=>{
    try {
        await connectDB();

        // const createdPermissions = await Permission.findOneAndUpdate(permissions);

        let permissionCount = 0
        const permissionMap = {};
        const createdPermissions = [];

        for(const permission of permissions){
            const savedPermission = await Permission.findOneAndUpdate(
                {name: permission.name},
                permission,
                {
                    upsert: true,
                    new: true
                }
            );
            createdPermissions.push(savedPermission);
            permissionMap[permission.name] = savedPermission._id;
            permissionCount++;
        }
        console.log(`${permissionCount} permissions seeded`);

       

        // createdPermissions.forEach((permission)=>{
        //     permissionMap[permission.name] = permission._id;
        // });

        const roles = [
            {
                name: "ADMIN",
                description: "Full system access",
                permissions: createdPermissions.map(
                    (permission) => permission._id
                ),
            },

            {
                name: "HR",
                description: "Human resource management access",
                permissions: [
                    permissionMap["user:create"],
                    permissionMap["user:read"],
                    permissionMap["user:update"],
                    permissionMap["employee:create"],
                    permissionMap["employee:read"],
                    permissionMap["employee:update"],
                    permissionMap["employee:delete"],
                    permissionMap["attendance:read"],
                    permissionMap["leave:read"],
                    permissionMap["leave:update"],
                    permissionMap["salary:read"],
                ],
            },

            {
                name: "MANAGER",
                description: "Manager level access",
                permissions: [
                    permissionMap["employee:read"],
                    permissionMap["attendance:read"],
                    permissionMap["leave:read"],
                    permissionMap["leave:update"],
                ],
            },

            {
                name: "USER",
                description: "Regular employee access",
                permissions: [
                    permissionMap["employee:read"],
                    permissionMap["attendance:create"],
                    permissionMap["attendance:read"],
                    permissionMap["leave:create"],
                ],
            },
        ];

        // await Role.insertMany(roles);

        for(const role of roles){
            await Role.findOneAndUpdate(
                {name: role.name},
                role,
                {
                    upsert:true,
                    new: true
                }
            )
        }

        console.log("Roles created Successfully");
        process.exit(0);
    } catch (error) {
        console.error("Seeding failled", error);
        process.exit(1);
    }
}

seedRoleAndPermisions();
