/*
 * @Author: jiangmengxia jiangmengxia@nnuo.com
 * @Date: 2024-11-01 15:40:39
 * @LastEditors: jiangmengxia jiangmengxia@nnuo.com
 * @LastEditTime: 2024-11-01 16:50:26
 * @FilePath: \nuo-bus\src\UseTableRowSelectedTest\index.jsx
 * @Description: Description
 */
import React, { useState } from 'react';
import useTableRowSelected from '@nuofe/bus-hooks/useTableRowSelected';
import { Table } from 'antd';
import StandardPagination from '@nuofe/bus-components/StandardPagination';
import { generateUUID } from '@nuofe/bus-utils/uuid';

const mockList = ({ pageNum = 1, pageSize = 20 }) => {
  let list = [];
  for (let i = 0; i < pageSize; i++) {
    list.push({
      id: generateUUID(),
      name: `name-${pageNum}-${i}`,
    });
  }
  return list;
};
export default function () {
  const { rowSelection } = useTableRowSelected({
    rowKey: 'id',
  });
  const [pagination, setPagination] = useState({
    total: 120,
    pageSize: 10,
    current: 1,
  });
  const [list, setList] = useState(mockList({ pageNum: 1, pageSize: 20 }));

  const columns = [
    {
      title: 'id',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'name',
      dataIndex: 'name',
      key: 'name',
    },
  ];
  return (
    <>
      <Table dataSource={list} columns={columns} rowSelection={rowSelection} rowKey={'id'} />
      <StandardPagination
        pagination={pagination}
        onChange={({ pageSize, pageNum }) => {
          setPagination({
            ...pagination,
            pageSize,
            current: pageNum,
          });
          setList(mockList({ pageNum, pageSize }));
        }}
      />
    </>
  );
}
