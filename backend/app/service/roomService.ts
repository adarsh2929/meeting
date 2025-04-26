import { Request, Response,NextFunction} from 'express';
import { CustomError } from '../helper/customError';
import { defaultResponsehandler } from '../helper/defaultResponse';
import { roomRepository } from '../repository/roomRepo';




const createRoom = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { name, capacity } = req.body;

        const existingRoom = await roomRepository.findRoom(name);

        if(existingRoom){
            throw new CustomError(400, 'Room already exists');
        }

        const room = await roomRepository.createRoom(name, capacity);

       return defaultResponsehandler(res, 200, 'Room created successfully', room);

    } catch (error) {
        next(error);
    }
}

const getAllRooms = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const rooms = await roomRepository.getAllRooms();
        return defaultResponsehandler(res, 200, 'Rooms fetched successfully', rooms);
    } catch (error) {
        next(error);
    }
}

const updateRoom = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id, name, capacity } = req.body;
        
        const existingRoom = await roomRepository.findRoomById(id);

        if(!existingRoom){
            throw new CustomError(404, 'Room not found');
        }

       

        const updateData: { name?: string, capacity?: number } = {};
        if (name) updateData.name = name;
        if (capacity) updateData.capacity = capacity;

        const updatedRoom = await roomRepository.updateRoom(id, updateData);
        
        return defaultResponsehandler(res, 200, 'Room updated successfully', updatedRoom);
    } catch (error) {
        next(error);
    }
}


const deleteRoom = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.body;
        
        

        const existingRoom = await roomRepository.findRoomById(id);

        if (!existingRoom) {
            throw new CustomError(404, 'Room not found');
        }

        const deletedRoom = await roomRepository.deleteRoom(id);
        
        return defaultResponsehandler(res, 200, 'Room deleted successfully');
    } catch (error) {
        next(error);
    }
}









export const roomService = {
    createRoom,
    getAllRooms,
    updateRoom,
    deleteRoom
}






