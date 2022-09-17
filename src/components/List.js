import React from 'react';
import { Table } from 'antd';

export default function List({ dataSource }) {
  const columns = [
    {
      title: 'Navn',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '🅿 Tilgjengelige låser',
      dataIndex: 'num_docks_available',
      key: 'num_docks_available',
    },
    {
      title: '🚲 Ledige sykler',
      dataIndex: 'num_bikes_available',
      key: 'num_bikes_available',
    },
  ];

  return <Table columns={columns} dataSource={dataSource} />;
}
