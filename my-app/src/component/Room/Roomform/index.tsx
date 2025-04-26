import React, { useEffect } from 'react';
import { Modal, Form, Input, InputNumber, Button, message } from 'antd';
import { createRoom, updateRoom } from '../../../API/roomApi';
import { RoomFormProps } from './types';
import { toastText } from '../../../utils/utils';

const RoomForm= (props:RoomFormProps) => {
    const {visible,onCancel,onSuccess,initialValues,isUpdate} = props;
  const [form] = Form.useForm();
  
  useEffect(() => {
    if (visible && initialValues) {
      form.setFieldsValue(initialValues);
    } else if (visible) {
      form.resetFields();
    }
  }, [visible, initialValues, form]);

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      const payload = {
        id: initialValues?.id,
        name: values.name,
        capacity: values.capacity
      }
      let response:any;
      if(isUpdate){
        response = await updateRoom('/room/room',payload)
      }else{
        response = await createRoom('/room/room',payload)
      }
      console.log("Response",response)
      if(response.data.statusCode === 200){
        toastText(isUpdate ? 'Room updated successfully' : 'Room added successfully', 'success');
        form.resetFields();
        onSuccess();
        onCancel();
      }
    } catch (error) {
      if (error instanceof Error) {
        toastText(error.message, 'error');
      } else {
        toastText('An error occurred', 'error');
      }
    }
  };

  return (
    <Modal
      title={isUpdate ? 'Update Room' : 'Add New Room'}
      open={visible}
      onCancel={onCancel}
      footer={null}
      destroyOnClose
    >
      <Form
        form={form}
        layout="vertical"
        initialValues={{ name: '', capacity: 0 }}
      >
        <Form.Item
          name="name"
          label="Room Name"
          rules={[{ required: true, message: 'Please enter room name' }]}
        >
          <Input placeholder="Enter room name" />
        </Form.Item>
        
        <Form.Item
          name="capacity"
          label="Capacity"
          rules={[{ required: true, message: 'Please enter room capacity' }]}
        >
          <InputNumber 
            min={1} 
            placeholder="Enter capacity" 
            style={{ width: '100%' }}
          />
        </Form.Item>
        
        <Form.Item>
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px' }}>
            <Button onClick={onCancel}>
              Cancel
            </Button>
            <Button type="primary" onClick={handleSubmit}>
              {isUpdate ? 'Update' : 'Add'}
            </Button>
          </div>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default RoomForm;