import Designation from "../models/designation.js"
import { failed, success } from "../utils/response.js";

// GET /api/designations
export const getDesignationController = async(req, res)=>{
        try {
            const designation = await Designation.find({}).populate("departmentId", 'name');
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
        const id = req.params.id;

        const {name, description, departmentId} = req.body;
        if(!name || !departmentId) return failed(res, 400, "Name or department can't empty");
    
        const isExist = await Designation.findOne({
            name: name.trim(),
            _id: {$ne:id}
        });
        if(isExist) return failed(res, 400, "Designation with this name already exists");
    
        const designation = await Designation.findByIdAndUpdate(
            id,
            {
                $set:{
                    name: name.trim(),
                    description,
                    departmentId
                }
            },
            {
                new:true,
                runValidators: true
            }
        )
    
        if(!designation) return failed(res, 404, "Designation not found")
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
        const deleted = await Designation.findByIdAndDelete(id);
    
        return success(res, 200, "Deleted Successfully");
    } catch (error) {
        console.error(error);
        return failed(res, 500, null, error);
    }
}