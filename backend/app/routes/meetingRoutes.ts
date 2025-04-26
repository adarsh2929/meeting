import express from 'express';
import { meetingService } from '../service/meetingService';

const router = express.Router();


router.get('/meetings', meetingService.getAllMeetings);

router.post('/meeting',  meetingService.createMeeting);

router.get('/meetings/room', meetingService.getMeetingsByRoomId);

router.put('/meeting', meetingService.updateMeeting);

router.delete('/meeting', meetingService.deleteMeeting);


export default router;
