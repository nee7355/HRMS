import Designation from "../models/designation.js"
import { failed, success } from "../utils/response.js";

// GET /api/designations
export const getDesignationController = async(req, res)=>{
        try {
            const designation = await Designation.find({});
            return success(res, 200, "Data fetched successfully", designation);

        } catch (error) {
            console.error(error);
            return failed(res, 500, null, error);
        }
}
// GET /api/designations/:id
export const getDesignationByIdController = async(req, res)=>{
    try {
        const id = req.query.params;
    
        const designation = await Designation.findById(id);
        return success(res, 200, "Fetched Successfully", designation);
    } catch (error) {
        console.error(error);
        return failed(res, 500, null, error)
        
    }

    
}
// POST /api/designations
export const addDesignationController = async(req, res)=>{
    try {
        const {name, description, departmentId} = req.body;
        if(!name) return failed(res, 400, "Name is required");
    
        const isExist = await Designation.findOne({name: name});

        if(isExist) return failed(res, 400, `${name} is already exist`);
    

        const designation = new Designation({name, description, departmentId});
        designation.save();
    
        return success(res, 201, "Created successfully", designation);
    } catch (error) {
        console.error(error);
        return failed(res, 500, null, error);
    }

}
// PUT /api/designations/:id
export const editDesignationController = async(req, res)=>{
    try {
        const id = req.query.params;
        const {name, description, departmentId} = req.body;
        if(!name || !departmentId) return failed(res, 400, "Name or department can't empty");
    
        const isExist = await Designation.find({name: name});
        if(!isExist) return failed(res, 400, "Not Found");
    
        const designation = await Designation.updateOne(
            {_id: id},
            {
                $set:{
                    name: name,
                    description: description,
                    departmentId: departmentId
                }
            }
        )
    
        return success(res, 200, "Updated successfully");
    } catch (error) {
        console.error(error);
        return failed(res, 500, null, error);
    }
}
// DELETE /api/designations/:id
export const deleteDesignationController = async(req, res)=>{
    try {
        const id = req.params.id;
        if(!id) return failed(res,400, "Not found");
        const designation = await Designation.findById(id);
    
        if(!designation) return failed(res,400, "Not found");
        const deleted = await Designation.findByIdAndUpdate(id);
    
        return success(res, 200, "Deleted Successfully");
    } catch (error) {
        console.error(error);
        return failed(res, 500, null, error);
    }
}