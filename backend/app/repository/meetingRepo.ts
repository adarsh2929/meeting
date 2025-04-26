import prisma from "../client/prisma";

const createMeeting = async (meetingData: {
    title?: string,
    description?: string,
    date: Date,
    start: Date,
    end: Date,
    roomId: string
}) => {
    try {
        const meeting = await prisma.meeting.create({
            data: meetingData,
            select: {
                id: true,
                title: true,
                description: true,
                date: true,
                start: true,
                end: true,
                roomId: true,
                room: {
                    select: {
                        name: true,
                        capacity: true
                    }
                }
            }
        });
        return meeting;
    } catch (error) {
        throw error;
    }
}

const checkOverlappingMeetings = async (roomId: string, date: Date, start: Date, end: Date, excludeMeetingId?: string) => {
    try {
        const whereClause: any = {
            roomId: roomId,
            date: date,
            OR: [
                { 
                    start: { lte: start },
                    end: { gt: start }
                },
                {
                    start: { lt: end },
                    end: { gte: end }
                },
                {
                    start: { gte: start },
                    end: { lte: end }
                }
            ]
        };

        if (excludeMeetingId) {
            whereClause.id = { not: excludeMeetingId };
        }

        const overlappingMeetings = await prisma.meeting.findMany({
            where: whereClause
        });

        return overlappingMeetings;
    } catch (error) {
        throw error;
    }
}

const getAllMeetings = async () => {
    try {
        const meetings = await prisma.meeting.findMany({
            select: {
                id: true,
                title: true,
                description: true,
                date: true,
                start: true,
                end: true,
                roomId: true,
                room: {
                    select: {
                        name: true
                    }
                }
            }
        });
        return meetings;
    } catch (error) {
        throw error;
    }
}


const getMeetingsByRoomId = async (roomId: string) => {
    try {
        const meetings = await prisma.meeting.findMany({
            where: {
                roomId: roomId
            },
            select: {
                id: true,
                title: true,
                description: true,
                date: true,
                start: true,
                end: true,
                roomId: true,
                room: {
                    select: {
                        name: true,
                        capacity: true
                    }
                },
            },
            orderBy: {
                date: 'asc'
            }
        });
        return meetings;
    } catch (error) {
        throw error;
    }
}


const updateMeeting = async (id: string, meetingData: {
    title?: string,
    description?: string,
    date?: Date,
    start?: Date,
    end?: Date,
    roomId?: string
}) => {
    try {
        const meeting = await prisma.meeting.update({
            where: {
                id: id
            },
            data: meetingData,
            select: {
                id: true,
                title: true,
                description: true,
                date: true,
                start: true,
                end: true,
                roomId: true,
                room: {
                    select: {
                        name: true,
                        capacity: true
                    }
                },
                updatedAt: true
            }
        });
        return meeting;
    } catch (error) {
        throw error;
    }
}


const findMeetingById = async (id: string) => {
    try {
        const meeting = await prisma.meeting.findUnique({
            where: {
                id: id
            },
            include: {
                room: {
                    select: {
                        name: true,
                        capacity: true
                    }
                }
            }
        });
        return meeting;
    } catch (error) {
        throw error;
    }
}


const deleteMeeting = async (id: string) => {
    try {
        const meeting = await prisma.meeting.delete({
            where: {
                id: id
            },
            select: {
                id: true,
                title: true,
                date: true,
                start: true,
                end: true,
                roomId: true
            }
        });
        return meeting;
    } catch (error) {
        throw error;
    }
}




export const meetingRepository = {
    createMeeting,
    getAllMeetings,
    checkOverlappingMeetings,
    getMeetingsByRoomId,
    updateMeeting,
    findMeetingById,
    deleteMeeting
}

