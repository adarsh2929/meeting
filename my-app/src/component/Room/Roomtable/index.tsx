import React from 'react';
import { Table, Button, Space, Popconfirm } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { Room, RoomTableProps } from './types';

const RoomTable = (props: RoomTableProps) => {
  const { data, onEdit, onDelete, loading } = props;
  
  const columns = [
    {
      title: 'Room Name',
      dataIndex: 'name',
      key: 'name',
      sorter: (a: Room, b: Room) => a.name.localeCompare(b.name),
    },
    {
      title: 'Capacity',
      dataIndex: 'capacity',
      key: 'capacity',
      sorter: (a: Room, b: Room) => a.capacity - b.capacity,
    },
    {
      title: 'Action',
      key: 'action',
      render: (record: Room) => (
        <Space size="small">
          <Button 
            type="primary" 
            icon={<EditOutlined />} 
            onClick={() => onEdit && onEdit(record)}
          >
            Edit
          </Button>
          <Popconfirm
            title="Delete Room"
            description="Are you sure you want to delete this room?"
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

export default RoomTable;