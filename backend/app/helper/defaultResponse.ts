import { Response } from "express";
import { defaultResponse } from "../interface/global";

export const defaultResponsehandler = (res: Response, statusCode: number, message: string, data?: any) => {
    let response: defaultResponse = {
        statusCode: statusCode,
        message: message,
        data: data}

    return res.status(statusCode).json(response);
}