import { Request,Response,NextFunction } from "express";
import { CustomError } from "./customError";

export const errorHandler = (err: CustomError, req: Request, res: Response, next: NextFunction) => {
    const error = new CustomError(err.statusCode,err.message, err.additionalInfo);

    if (error.statusCode === 500) {
        return res.status(500).json({
            status:error.statusCode,
            message:error.message,
            additionalInfo:error.additionalInfo,


        })
        
    }else{
        return res.status(error.statusCode).json({
            status:error.statusCode,
            message:error.message,
            additionalInfo:error.additionalInfo,
        })

    }
}

export const notFoundHandler = (req: Request, res: Response, next: NextFunction) => {
    const error = new CustomError(404, "Not Found")
    next(error);
}