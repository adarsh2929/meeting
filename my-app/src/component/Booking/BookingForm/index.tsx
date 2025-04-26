import React, { useEffect, useState } from 'react';
import { Modal, Form, Input, DatePicker, TimePicker, Button, message, Select } from 'antd';
import { createBooking, updateBooking } from '../../../API/bookingApi';
import { getRoom } from '../../../API/roomApi';
import moment from 'moment';
import '../index.css';
import { BookingFormProps, Room } from './types';
import { toastText } from '../../../utils/utils';

const { TextArea } = Input;
const { Option } = Select;



const BookingForm = (props:BookingFormProps) => {
    const {visible, onCancel, onSuccess, initialValues, isUpdate} = props;
  const [form] = Form.useForm();
  const [rooms, setRooms] = useState<Room[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (visible) {
      fetchRooms();
      if (initialValues) {
        form.setFieldsValue({
          ...initialValues,
          date: moment(initialValues.date),
          start: moment(initialValues.start),
          end: moment(initialValues.end),
        });
      } else {
        form.resetFields();
      }
    }
  }, [visible, initialValues, form]);

  const fetchRooms = async () => {
    try {
      const response = await getRoom('/room/rooms');
      setRooms(response.data.data);
    } catch (error) {
      message.error('Failed to fetch rooms');
    }
  };

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      setLoading(true);

      // Format the data for API
      const bookingData = {
        ...(isUpdate && initialValues?.id ? { id: initialValues.id } : {}),
        title: values.title,
        description: values.description,
        date: values.date.format('YYYY-MM-DD'),
        start: values.start.format(),
        end: values.end.format(),
        roomId: values.roomId
      };

      const url = isUpdate ? '/meeting/meeting' : '/meeting/meeting';
      const apiCall = isUpdate ? updateBooking : createBooking;
      
      const response = await apiCall(url, bookingData);
      
      if (response.data.statusCode === 200 || response.data.statusCode === 201) {
        toastText(isUpdate ? 'Booking updated successfully' : 'Booking created successfully', 'success');
        form.resetFields();
        onSuccess();
      } else {
        toastText(response.data.message || 'Operation failed', 'error');
      }
    } catch (error: any) {
      if (error.response?.data?.message) {
        toastText(error.response.data.message, 'error');
      } else if (error.message) {
        toastText(error.message, 'error');
      } else {
        toastText('An error occurred', 'error');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      title={isUpdate ? 'Update Booking' : 'Add New Booking'}
      open={visible}
      onCancel={onCancel}
      footer={null}
      destroyOnClose
      width={600}
      centered
    >
      <Form
        form={form}
        layout="vertical"
        initialValues={{ title: '', description: '' }}
      >
        <Form.Item
          name="roomId"
          label="Meeting Room"
          rules={[{ required: true, message: 'Please select a room' }]}
          className="booking-form-item"
        >
          <Select placeholder="Select a room">
            {rooms.map(room => (
              <Option key={room.id} value={room.id}>{room.name} (Capacity: {room.capacity})</Option>
            ))}
          </Select>
        </Form.Item>
        
        <Form.Item
          name="date"
          label="Date"
          rules={[{ required: true, message: 'Please select a date' }]}
          className="booking-form-item"
        >
          <DatePicker style={{ width: '100%' }} />
        </Form.Item>
        
        <Form.Item
          name="start"
          label="Start Time"
          rules={[{ required: true, message: 'Please select start time' }]}
          className="booking-form-item"
        >
          <TimePicker 
            format="HH:mm" 
            style={{ width: '100%' }} 
            minuteStep={15}
          />
        </Form.Item>
        
        <Form.Item
          name="end"
          label="End Time"
          rules={[{ required: true, message: 'Please select end time' }]}
          className="booking-form-item"
        >
          <TimePicker 
            format="HH:mm" 
            style={{ width: '100%' }} 
            minuteStep={15}
          />
        </Form.Item>
        
        <Form.Item
          name="title"
          label="Meeting Title (Optional)"
          className="booking-form-item"
        >
          <Input placeholder="Enter meeting title" />
        </Form.Item>
        
        <Form.Item
          name="description"
          label="Meeting Description (Optional)"
          className="booking-form-item"
        >
          <TextArea rows={4} placeholder="Enter meeting description" />
        </Form.Item>
        
        <Form.Item>
          <div className="actions">
            <Button onClick={onCancel}>
              Cancel
            </Button>
            <Button type="primary" onClick={handleSubmit} loading={loading}>
              {isUpdate ? 'Update' : 'Book'}
            </Button>
          </div>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default BookingForm;