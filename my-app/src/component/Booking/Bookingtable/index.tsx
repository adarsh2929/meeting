import React from 'react';
import { Table, Button, Space, Popconfirm } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { Booking, BookingTableProps } from './types';
import moment from 'moment';


const BookingTable = (props: BookingTableProps) => {
  const { data, onEdit, onDelete, loading } = props;
  
  const columns = [
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
      sorter: (a: Booking, b: Booking) => (a.title || '').localeCompare(b.title || ''),
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
      ellipsis: true,
    },
    {
      title: 'Date',
      dataIndex: 'date',
      key: 'date',
      render: (date: string) => moment(date).format('YYYY-MM-DD'),
      sorter: (a: Booking, b: Booking) => new Date(a.date).getTime() - new Date(b.date).getTime(),
    },
    {
      title: 'Start Time',
      dataIndex: 'start',
      key: 'start',
      render: (start: string) => moment(start).format('HH:mm A'),
    },
    {
      title: 'End Time',
      dataIndex: 'end',
      key: 'end',
      render: (end: string) => moment(end).format('HH:mm A'),
    },
    {
      title: 'Room',
      dataIndex: 'room',
      key: 'room',
    },
    {
      title: 'Action',
      key: 'action',
      render: (record: Booking) => ( 
        <Space size="small">
          <Button 
            type="primary" 
            icon={<EditOutlined />} 
            onClick={() => onEdit && onEdit(record)}
          >
            Edit
          </Button>
          <Popconfirm
            title="Delete Booking"
            description="Are you sure you want to delete this booking?"
            onConfirm={() => onDelete && onDelete(record.id)}
            okText="Yes"
            cancelText="No"
          >
            <Button 
              type="primary" 
              danger
              icon={<DeleteOutlined />}
            >
              Delete
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <Table 
      rowKey="id"
      dataSource={data} 
      columns={columns} 
      loading={loading}
    />
  );
};

export default BookingTable;