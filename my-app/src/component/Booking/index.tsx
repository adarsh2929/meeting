import { useState, useEffect } from 'react';
import BookingTable from './Bookingtable';
import BookingForm from './BookingForm';
import { getBooking, deleteBooking } from '../../API/bookingApi';
import { message, Button } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import './index.css';
import { Booking } from './BookingForm/types';


const BookingManagement = () => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(false);
  const [formVisible, setFormVisible] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState<Booking | undefined>(undefined);
  const [isUpdate, setIsUpdate] = useState(false);

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    setLoading(true);
    try {
      const response = await getBooking('/meeting/meetings');
      setBookings(response.data.data);
    } catch (error) {
      message.error('An error occurred while fetching bookings');
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (booking: Booking) => {
    setSelectedBooking(booking);
    setIsUpdate(true);
    setFormVisible(true);
  };

  const handleAdd = () => {
    setSelectedBooking(undefined);
    setIsUpdate(false);
    setFormVisible(true);
  };

  const handleFormCancel = () => {
    setFormVisible(false);
  };

  const handleFormSuccess = () => {
    setFormVisible(false);
    fetchBookings();
  };

  const handleDelete = async (bookingId: string) => {
    try {
      setLoading(true);
      const response = await deleteBooking('/meeting/meeting', { id: bookingId });
      
      if (response.data.statusCode === 200) {
        message.success('Booking deleted successfully');
        fetchBookings();
      } else {
        message.error(response.data.message || 'Failed to delete booking');
      }
    } catch (error) {
      message.error('An error occurred while deleting the booking');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="container">
        <h1>Booking Management</h1>
        <Button 
          type="primary" 
          icon={<PlusOutlined />} 
          onClick={handleAdd}
        >
          Add Booking
        </Button>
      </div>
      
      <BookingTable 
        data={bookings} 
        onEdit={handleEdit} 
        loading={loading} 
        onDelete={handleDelete}
      />
      
      <BookingForm
        visible={formVisible}
        onCancel={handleFormCancel}
        onSuccess={handleFormSuccess}
        initialValues={selectedBooking}
        isUpdate={isUpdate}
      />
    </div>
  );
};

export default BookingManagement;