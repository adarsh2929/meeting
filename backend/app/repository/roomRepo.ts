import prisma from "../client/prisma";


const getAllRooms = async () => {
    try {
        const rooms = await prisma.room.findMany({
            select: {
                id: true,
                name: true,
                capacity: true,
                
            }
        });
        return rooms;
    } catch (error) {
        throw error;
    }
}


const createRoom = async (name: string, capacity: number) => {
    try {
        const room = await prisma.room.create({
            data: {
                name,
                capacity
            }
            ,select:{
                id: true,
                name: true,
                capacity: true,
            }
        })
        return room;
    } catch (error) {
        throw error;
    }
    
}


const findRoom = async (name: string) => {
    try {
        const room = await prisma.room.findUnique({
            where:{
                name: name
            }
        })
        return room;
    } catch (error) {
        throw error;
    }
}

const updateRoom = async (id: string, data: { name?: string, capacity?: number }) => {
    try {
        const room = await prisma.room.update({
            where: {
                id: id
            },
            data: data,
            select: {
                id: true,
                name: true,
            }
        });
        return room;
    } catch (error) {
        throw error;
    }
}

const findRoomById = async (id: string) => {
    try {
        const room = await prisma.room.findUnique({
            where: {
                id: id
            }
        });
        return room;
    } catch (error) {
        throw error;
    }
}

const deleteRoom = async (id: string) => {
    try {
        const room = await prisma.room.delete({
            where: {
                id: id
            },
        });
        return room;
    } catch (error) {
        throw error;
    }
}

export const roomRepository = {
    createRoom,
    findRoom,
    getAllRooms,
    updateRoom,
    findRoomById,
    deleteRoom
}
