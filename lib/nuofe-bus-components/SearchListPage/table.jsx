/*
 * @Author: jiangmengxia jiangmengxia@nnuo.com
 * @Date: 2024-05-16 15:43:35
 * @LastEditors: jiangmengxia jiangmengxia@nnuo.com
 * @LastEditTime: 2024-11-01 17:10:50
 * @FilePath: \nuo-bus\packages\nuofe-bus-components\SearchListPage\table.jsx
 * @Description: Description
 */
import React, { useImperativeHandle, forwardRef } from 'react';
import { Table as AntdTable } from 'antd';
import StandardPagination from '/packages/nuofe-bus-components/StandardPagination';
import useTableRowSelected from '@nuofe/bus-hooks/useTableRowSelected';

function Table(
  {
    doPageChange,
    pagination,
    columns,
    list,
    needCheck,
    loading,
    selectProps,
    rowKey = 'id',
    tableProps,
  },
  ref,
) {
  const { pageNum = 1, pageSize = 20, total = 0 } = pagination || {};
  const {
    rowSelection,
    selectedRowKeys, // 当前已选行的key的集合
    selectedTableRows, // 当前已选行的集合
    clearRowSelections, // 重置勾选
  } = useTableRowSelected([], 'disabled', { isSpreadPage: false, ...selectProps, rowKey });

  useImperativeHandle(ref, () => ({
    getSelections: () => {
      return {
        selectedRowKeys, // 当前已选行的key的集合
        selectedTableRows, // 当前已选行的集合
      };
    },
    clearRowSelections,
  }));
  return (
    <>
      <AntdTable
        {...tableProps}
        columns={columns}
        dataSource={list}
        pagination={false}
        loading={loading}
        rowKey={rowKey}
        rowSelection={needCheck ? rowSelection : undefined}
      />
      <StandardPagination
        // eslint-disable-next-line no-shadow
        onChange={({ pageSize, pageNum }) => doPageChange({ pageNum, pageSize })}
        current={pageNum}
        pageSize={pageSize}
        total={total}
      />
    </>
  );
}

export default forwardRef(Table);
