import SearchListPage from '@nuofe/bus-components/SearchListPage';
import { injectReduxStore } from '@nuofe/bus-components/SearchListPage/redux';
import { Input, DatePicker } from 'antd';
import React, { useRef } from 'react';
import store, { addReducer } from '../redux';
import useSearchListPage from '@nuofe/bus-components/SearchListPage/useSearchListPage';

// 添加reducer及store
injectReduxStore(
  store,
  addReducer, // 添加reducer
);

export default function () {
  const nameSpace = 'swztRegulatoryDatabase_policiesRegulations';
  const initSearchPayload = {
    title: '',
    source: '',
    issuedNumber: '',
    issueDate: [],
  };
  const formItems = [
    {
      label: '标题',
      field: 'title',
      fieldProps: {
        initialValue: initSearchPayload.title,
      },
      span: { span: 8 },
      component: <Input placeholder="请输入" maxLength={100} />,
    },
    {
      label: '来源网站',
      field: 'source',
      fieldProps: {
        initialValue: initSearchPayload.source,
      },
      span: { span: 16, offset: 0 },
      component: <Input placeholder="请输入" maxLength={100} />,
    },
    {
      label: '发文字号',
      field: 'issuedNumber',
      fieldProps: {
        initialValue: initSearchPayload.issuedNumber,
      },
      span: { span: 8 },
      component: <Input placeholder="请输入" maxLength={100} />,
    },
    {
      label: '发文日期',
      field: 'issueDate',
      fieldProps: {
        initialValue: initSearchPayload.issueDate,
      },
      span: { span: 16, offset: 0 },
      component: <DatePicker.RangePicker style={{ width: '100%' }} />,
    },
  ];
  const formRef = useRef();
  const serialize = () => {};
  const request = () => {
    return new Promise((resolve) => {
      resolve({
        list: [
          {
            id: 1,
            title: '张三',
            issuedNumber: '123',
            issueDate: '2021-01-01',
          },
          {
            id: 2,
            title: '李四',
            issuedNumber: '123',
            issueDate: '2021-01-01',
          },
        ],
        total: 100,
        pageNum: 2,
        pageSize: 50,
      });
    });
  };
  const columns = [
    {
      title: '序号',
      dataIndex: 'index',
    },
    {
      title: '标题',
      dataIndex: 'title',
    },
    {
      title: '发文字号',
      dataIndex: 'issuedNumber',
    },
    {
      title: '发文日期',
      dataIndex: 'issueDate',
    },
    {
      title: '来源网站',
      dataIndex: 'source',
    },
  ];
  return (
    <SearchListPage
      formClassName=""
      formItems={formItems} // 搜索条件集合
      formRef={formRef} // 通过这个可以重置部分搜索项
      formShrinkSize={5} // 展开收起的size,超过formShrinkSize，需要显示展开收起的组件
      nameSpace={nameSpace} // 自定义的作用域
      serialize={serialize} // 序列化搜索条件的方法（searchParams, isMore）
      request={request} // 请求列表的方法
      initQuery={initSearchPayload} // 初始化搜索条件
      columns={columns}
      needCheck={false} // 是否需要勾选
      selectProps={{}} // 勾选属性配置，参考useTableRowSelected
      tableProps={{
        style: {
          marginTop: 24,
        },
      }}
      tablePreContent={null} // table上面的按钮集合或其他内容
      beforeReset={null} // 充值前的钩子
    />
  );
}
