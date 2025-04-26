import { useState, useEffect } from 'react';
import RoomTable from './Roomtable';
import RoomForm from './Roomform';
import { getRoom, deleteRoom } from '../../API/roomApi';
import { message, Button } from 'antd';
import { CalendarOutlined, PlusOutlined } from '@ant-design/icons';
import './index.css';
import { Room } from './types';
import { useNavigate } from 'react-router-dom';



const RoomManagement = () => {
  const [rooms, setRooms] = useState<Room[]>([]);
  const [loading, setLoading] = useState(false);
  const [formVisible, setFormVisible] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState<Room | undefined>(undefined);
  const [isUpdate, setIsUpdate] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    fetchRooms();
  }, []);

  const fetchRooms = async () => {
    setLoading(true);
    try {
      const response = await getRoom('/room/rooms');
      setRooms(response.data.data);
    } catch (error) {
      message.error('An error occurred while fetching rooms');
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (room: Room) => {
    setSelectedRoom(room);
    setIsUpdate(true);
    setFormVisible(true);
  };

  const handleAdd = () => {
    setSelectedRoom(undefined);
    setIsUpdate(false);
    setFormVisible(true);
  };

  const handleFormCancel = () => {
    setFormVisible(false);
  };


  const handleDelete = async (roomId: string) => {
    try {
      setLoading(true);
      const response = await deleteRoom('/room/room', { id: roomId });
      
      if (response.data.statusCode === 200) {
        message.success('Room deleted successfully');
        fetchRooms();
      } else {
        message.error(response.data.message || 'Failed to delete room');
      }
    } catch (error) {
      message.error('An error occurred while deleting the room');
    } finally {
      setLoading(false);
    }
  };

  const goToBookings = () => {
    navigate('/booking');
  };


  return (
    <div>
      <div className="container">
        <h1>Room Management</h1>
        <div style={{ display: 'flex', gap: '10px' }}>
          <Button 
            type="primary" 
            icon={<CalendarOutlined />}
            onClick={goToBookings}
          >
            View Bookings
          </Button>
          <Button 
            type="primary" 
            icon={<PlusOutlined />} 
            onClick={handleAdd}
          >
            Add Room
          </Button>
        </div>
      </div>
      
      
      <RoomTable 
        data={rooms} 
        onEdit={handleEdit} 
        loading={loading} 
        onDelete={handleDelete}
      />
      
      <RoomForm
        visible={formVisible}
        onCancel={handleFormCancel}
        onSuccess={fetchRooms}
        initialValues={selectedRoom}
        isUpdate={isUpdate}
      />
    </div>
  );
};

export default RoomManagement;