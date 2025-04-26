import { Request, Response,NextFunction} from 'express';
import { CustomError } from '../helper/customError';
import { defaultResponsehandler } from '../helper/defaultResponse';
import { meetingRepository } from '../repository/meetingRepo';
import { roomRepository } from '../repository/roomRepo';





const createMeeting = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { title, description, date, start, end, roomId } = req.body;
        
        const room = await roomRepository.findRoomById(roomId);
        if (!room) {
            throw new CustomError(404, 'Room not found');
        }
        
        const bookingDate = new Date(date);
        const startTime = new Date(start);
        const endTime = new Date(end);
        
        if (startTime >= endTime) {
            throw new CustomError(400, 'Start time must be before end time');
        }
        
        const startHour = startTime.getHours();
        const endHour = endTime.getHours();
        const endMinutes = endTime.getMinutes();
        
        if (startHour < 8 || (endHour > 18 || (endHour === 18 && endMinutes > 0))) {
            throw new CustomError(400, 'Bookings can only be made between 8:00 AM and 6:00 PM');
        }
        
        const durationMs = endTime.getTime() - startTime.getTime();
        const durationMinutes = durationMs / (1000 * 60);
        
        if (durationMinutes < 30) {
            throw new CustomError(400, 'Minimum booking duration is 30 minutes');
        }
        
        if (durationMinutes > 240) { // 4 hours = 240 minutes
            throw new CustomError(400, 'Maximum booking duration is 4 hours');
        }
        
        const overlappingMeetings = await meetingRepository.checkOverlappingMeetings(roomId, bookingDate, startTime, endTime);
        
        if (overlappingMeetings.length > 0) {
            throw new CustomError(409, 'There is a scheduling conflict with another meeting in this room');
        }
        
        const meeting = await meetingRepository.createMeeting({
            title,
            description,
            date: bookingDate,
            start: startTime,
            end: endTime,
            roomId
        });
        
        return defaultResponsehandler(res, 201, 'Meeting created successfully', meeting);
    } catch (error) {
        next(error);
    }
}

const getAllMeetings = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const meetings = await meetingRepository.getAllMeetings();
        const formattedMeetings = meetings.map(meeting => ({
            id: meeting.id,
            title: meeting.title,
            description: meeting.description,
            date: meeting.date,
            start: meeting.start,
            end: meeting.end,
            roomId: meeting.roomId,
            room: meeting.room.name
        }));
        
        return defaultResponsehandler(res, 200, 'Meetings fetched successfully', formattedMeetings);
    } catch (error) {
        next(error);
    }
}

const getMeetingsByRoomId = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const roomId = req.query.roomId as string;
        
        if (!roomId) {
            throw new CustomError(400, 'Room ID is required');
        }
        
        const room = await roomRepository.findRoomById(roomId);
        if (!room) {
            throw new CustomError(404, 'Room not found');
        }
        
        const meetings = await meetingRepository.getMeetingsByRoomId(roomId);
        return defaultResponsehandler(res, 200, 'Meetings fetched successfully', meetings);
    } catch (error) {
        next(error);
    }
}

const updateMeeting = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id, title, description, date, start, end, roomId } = req.body;
        

        const existingMeeting = await meetingRepository.findMeetingById(id);
        if (!existingMeeting) {
            throw new CustomError(404, 'Meeting not found');
        }
        
        const updateData: any = {};
        
        if (roomId && roomId !== existingMeeting.roomId) {
            const room = await roomRepository.findRoomById(roomId);
            if (!room) {
                throw new CustomError(404, 'Room not found');
            }
            updateData.roomId = roomId;
        }
        
        // Process and validate date/time if provided
        let bookingDate = existingMeeting.date;
        let startTime = existingMeeting.start;
        let endTime = existingMeeting.end;
        
        if (date) {
            bookingDate = new Date(date);
            updateData.date = bookingDate;
        }
        
        if (start) {
            startTime = new Date(start);
            updateData.start = startTime;
        }
        
        if (end) {
            endTime = new Date(end);
            updateData.end = endTime;
        }
        
        if (date || start || end) {
            if (startTime >= endTime) {
                throw new CustomError(400, 'Start time must be before end time');
            }
            
            const startHour = startTime.getHours();
            const endHour = endTime.getHours();
            const endMinutes = endTime.getMinutes();
            
            if (startHour < 8 || (endHour > 18 || (endHour === 18 && endMinutes > 0))) {
                throw new CustomError(400, 'Bookings can only be made between 8:00 AM and 6:00 PM');
            }
            
            const durationMs = endTime.getTime() - startTime.getTime();
            const durationMinutes = durationMs / (1000 * 60);
            
            if (durationMinutes < 30) {
                throw new CustomError(400, 'Minimum booking duration is 30 minutes');
            }
            
            if (durationMinutes > 240) {
                throw new CustomError(400, 'Maximum booking duration is 4 hours');
            }
            
            const targetRoomId = updateData.roomId || existingMeeting.roomId;
            const overlappingMeetings = await meetingRepository.checkOverlappingMeetings(
                targetRoomId, 
                bookingDate, 
                startTime, 
                endTime, 
                id 
            );
            
            if (overlappingMeetings.length > 0) {
                throw new CustomError(409, 'There is a scheduling conflict with another meeting in this room');
            }
        }
        
        if (title !== undefined) updateData.title = title;
        if (description !== undefined) updateData.description = description;
        
        const updatedMeeting = await meetingRepository.updateMeeting(id, updateData);
        
        return defaultResponsehandler(res, 200, 'Meeting updated successfully', updatedMeeting);
    } catch (error) {
        next(error);
    }
}


const deleteMeeting = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { id } = req.body;
        
        if (!id) {
            throw new CustomError(400, 'Meeting ID is required');
        }
        
        const existingMeeting = await meetingRepository.findMeetingById(id);
        if (!existingMeeting) {
            throw new CustomError(404, 'Meeting not found');
        }
        
        const deletedMeeting = await meetingRepository.deleteMeeting(id);
        
        return defaultResponsehandler(res, 200, 'Meeting deleted successfully', deletedMeeting);
    } catch (error) {
        next(error);
    }
}











export const meetingService = {
    createMeeting,
    getAllMeetings,
    getMeetingsByRoomId,
    updateMeeting,
    deleteMeeting,
    
}





