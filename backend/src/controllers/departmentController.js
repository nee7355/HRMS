import departments from "../models/departments.js"
import { failed, success } from "../utils/response.js";

export const getDepartmentController = async(req, res)=>{
    
    try {
        const department = await departments.find({});
        return success(res, 200, "Departments fetched successfully", department);
        
    } catch (error) {
        console.error(`Error in get department api: ${error}`);
        return failed(res, 500, "Internal server error", error);
    }

}
export const getDepartmentByIdController = async(req, res)=>{
        try {
            const id = req.params.id;

        const department = await departments.findById({_id: id});

        return success(res, 200, "Departments fetched successfully", department);
        
    } catch (error) {
        console.error(`Error in get department api: ${error}`);
        return failed(res, 500, "Internal server error", error);
    }
}

export const addDepartmentController = async(req, res)=>{
        try {
            const {name, description} = req.body;

        const department = await departments.findOne({name: name});
      
        if(department){
            return failed(res, 400, "Already exists")
        }

       const created =  new departments({
            name: name,
            description: description
        })
        await created.save();
        return success(res, 200, "Created successfully", created);
        
    } catch (error) {
        console.error(`Error in get department api: ${error}`);
        return failed(res, 500, "Internal server error", error);
    }
}

export const updateDepartmentController = async(req, res)=>{
         try {
            const id = req.params.id;
            const {name, description} = req.body;

        const department = await departments.findById(id);
        
        if(!department){
            return failed(res, 400, "Not found");
        }

        const exisitingDepartment = await departments.findOne({
            name: name.trim(),
            _id:{ $ne: id }
        });

        if(exisitingDepartment){
            return failed(res, 400, "Department with this name is already exists")
        }

       const updated =  await departments.updateOne(
           { _id: id },
           {
               $set: {
                   name: name,
                   description: description
               }
           }
       )
        return success(res, 200, "Updated successfully", updated);
        
    } catch (error) {
        console.error(`Error in get department api: ${error}`);
        return failed(res, 500, "Internal server error", error);
    }
}

export const deleteDepartmentController = async(req, res)=>{
 try {
            const id = req.params.id;
            

        const department = await departments.findById(id);
        
        if(!department){
            return failed(res, 400, "Department not found");
        }

       const deleted =  await departments.deleteOne({_id: id});

        return success(res, 200, "Deleted successfully", deleted);
        
    } catch (error) {
        console.error(`Error in get department api: ${error}`);
        return failed(res, 500, "Internal server error", error);
    }
}