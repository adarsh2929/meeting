import express from 'express';
import { roomService } from '../service/roomService';
import { roomValidator, updateRoomValidator } from '../helper/validator';

const router = express.Router();


router.get('/rooms', roomService.getAllRooms);

router.post('/room', roomValidator, roomService.createRoom);

router.put('/room', updateRoomValidator, roomService.updateRoom);

router.delete('/room', roomService.deleteRoom);

export default router;
