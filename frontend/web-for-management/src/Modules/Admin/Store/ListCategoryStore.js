import {  deleteCategoryService, getCategoryByIDService, postCategory, updateCategoryService, uploadImage } from "../../../Services/AdminService";

export async function addNewCategory(data) {
    try{
        const result = await postCategory(data);
        return result
    }catch(error){
        console.log(error);
        return null
    }

}

export async function uploadFile(data){
    try{
        const rs = await uploadImage(data);
        return rs;
    }catch(err){
        console.log(err);
        return null;
    }
}

export async function getCategoryByID(id){
    try{
        const result = await getCategoryByIDService(id);
        if(result.status==="success"){
            console.log(result)
            return result;
        }
        return "Failed to fetch";
    }catch(error){
        console.log(error)
        return "Failed to fetch";
    }
}

export async function updateCategory(id, data){
    try{
        const result = await updateCategoryService(id,data);
        if(result.status==="successs"){
            return result;
        }else{
            return "Failed to update";
        }
    }catch(error){
        console.log(error)
        return "Failed to update"
    }
}

export async function deleteCategory(id){
    try{
        const result = await deleteCategoryService(id);
        console.log(result)
        if(result.status==="successs"){
            return result;
        }else{
            return "Failed to delete";
        }
    }catch(error){
        return "Failed to delete";
    }
}