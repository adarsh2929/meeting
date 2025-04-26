export class CustomError {
    statusCode: number;
    message: string;
    additionalInfo?: any
    constructor(statusCode: number, message: string, additionalInfo?: any) {
        this.statusCode = statusCode;
        this.message = message;
        this.additionalInfo = additionalInfo
        
    }
}