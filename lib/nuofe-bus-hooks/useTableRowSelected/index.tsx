/*
 * @Description: antd Table 行可选时，提供的操作 仅适用于列表分页时重新刷新数据（即请求新的接口数据）的情况
 * @Author: Jiangmengxia
 * @Email: jiangmengxia@nnuo.com
 * @Date: 2023-02-16 09:54:49
 * @LastEditors: jiangmengxia jiangmengxia@nnuo.com
 * @LastEditTime: 2024-11-01 16:32:24
 * @FilePath: \nuo-bus\packages\nuofe-bus\hooks\useTableRowSelected.tsx
 */

import { useState } from 'react';
import { TableRowSelection } from 'antd/lib/table';

/**
 * @param {*} initSelectedRowKeys : 默认选中的行，以keys进行识别
 * @returns {*}  rowSelection: 直接传给table的属性
 *               isSelected:是否有选中项， 可用于其他按钮可用的条件触发
 */

interface IUseTableRowSelected extends TableRowSelection<any> {
  initSelectedRowKeys: any[]; // 默认选中的行，以keys进行识别
  checkboxDisabledProp: string; // 是否禁用checkbox的属性名
  isSpreadPage: boolean; // 是否跨页
  rowKey: string | number;
  onSelectChange: (data: any) => void; // 监听行勾选变更的事件
}

function useTableRowSelected(props: IUseTableRowSelected) {
  const {
    initSelectedRowKeys = [],
    checkboxDisabledProp = 'disabled',
    isSpreadPage = true, // 是否跨页勾选
    rowKey,
    onSelectChange, // 监听行勾选变更的事件
    ...otherRowSelectionProps
  } = props || {};
  const [selectedRowKeys, setSelectedRowKeys] = useState(initSelectedRowKeys);
  const [selectedTableRows, setSelectedTableRows] = useState([]); // 已选内容的详细列表

  // 删除keys
  const onDeleteRowByKeys = (keys = []) => {
    if (keys?.length) {
      const newKeys = selectedRowKeys.filter((sKey) => !keys?.includes(sKey));
      setSelectedRowKeys(newKeys);
      if (!rowKey) {
        console.error(
          `【ERROR __onDeleteRowByKeys__】缺省rowKey字段，无法对selectedTableRows进行过滤`,
        );
      }
      const newRows = selectedTableRows.filter((rowItem) => !keys?.includes(rowItem[rowKey]));
      setSelectedTableRows(newRows);
      onSelectChange && onSelectChange({ keys: newKeys, rows: newRows });
      return [newKeys, newRows];
    }
    return [];
  };

  // 重置已勾选项
  const onReset = () => {
    setSelectedRowKeys([]);
    setSelectedTableRows([]);
    onSelectChange && onSelectChange({ keys: [], rows: [] });
  };

  const rowSelection = {
    columnWidth: 40,
    fixed: 'left',
    selectedRowKeys,
    onChange: (selectedKeys, selectedRows) => {
      if (!isSpreadPage) {
        // 不跨页
        const newKeys = selectedRows.map((row) => row[rowKey]);
        setSelectedRowKeys(newKeys);
        setSelectedTableRows(selectedRows);
        onSelectChange && onSelectChange({ keys: newKeys, rows: selectedRows });
      } else {
        let cachedSelectedRows = [];
        if (selectedKeys.length > selectedRows.length) {
          cachedSelectedRows = selectedTableRows.filter((row) =>
            selectedKeys.includes(row[rowKey]),
          );
        }
        const mergedSelectedRows = [...cachedSelectedRows, ...selectedRows];
        // 去重
        const obj = {};
        const uniqueArr = [];
        mergedSelectedRows.forEach((row) => {
          if (!obj[row[rowKey]]) {
            uniqueArr.push(row);
            obj[row[rowKey]] = row;
          }
        });
        setSelectedTableRows(uniqueArr);
        setSelectedRowKeys(selectedKeys);
        onSelectChange && onSelectChange({ keys: selectedKeys, rows: uniqueArr });
      }
    },
    // 设置勾选项diabled
    getCheckboxProps: (record) => {
      return {
        disabled: !!record[checkboxDisabledProp],
        name: record.name,
      };
    },
  };

  // rowSelection属性覆盖
  if (otherRowSelectionProps) {
    Object.keys(otherRowSelectionProps).forEach((key) => {
      rowSelection[key] = otherRowSelectionProps[key];
    });
  }

  const clearRowSelections = () => {
    setSelectedRowKeys([]);
    setSelectedTableRows([]);
    onSelectChange && onSelectChange({ keys: [], rows: [] });
  };

  return {
    rowSelection,
    isSelected: selectedRowKeys?.length > 0, // 当前是否已选择行，已选行数>0
    selectedRowKeys, // 当前已选行的key的集合
    setSelectedRowKeys, // 设置当前已选行的key的集合
    selectedTableRows, // 当前已选行的集合
    setSelectedTableRows, // 设置当前已选行的集合
    clearRowSelections,
    // 提供的可能用到的外部控制内部state的方法
    deleteRowByKeys: onDeleteRowByKeys,
    reset: onReset, // 重置
  };
}

export default useTableRowSelected;
