import { body, validationResult } from "express-validator"





export const roomValidator = [
    body('name').notEmpty().withMessage('Name is required'),
    body('capacity').notEmpty().withMessage('Capacity is required'),
]

export const updateRoomValidator = [
    body('id').notEmpty().withMessage('Id is required'),
    body('name').notEmpty().withMessage('Name is required'),
    body('capacity').optional().isInt().withMessage('Capacity is must be a number'),
]



