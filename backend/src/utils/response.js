export const success = (res, statusCode, messaage, data=null)=>{
    return res.status(statusCode).json({
        success: true,
        messaage: messaage,
        data: data
    })
}

export const failed = (res, statusCode, messaage="Some thing went wrong", error)=>{
    return res.status(statusCode).json({
        success: false,
        messaage: messaage,
        error
    })
}