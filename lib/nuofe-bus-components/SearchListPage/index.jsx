/* eslint-disable no-shadow */
/*
 * @Description:
 * @Author: Jiangmengxia
 * @Email: jiangmengxia@nnuo.com
 * @Date: 2023-09-27 11:30:58
 * @LastEditors: jiangmengxia jiangmengxia@nnuo.com
 * @LastEditTime: 2024-11-01 17:47:17
 * @FilePath: \nuo-bus\packages\nuofe-bus-components\SearchListPage\index.jsx
 */
import React, { useEffect, useImperativeHandle, forwardRef, useRef } from 'react';
import { useDispatch } from 'react-redux';
import Search from './search';
import * as actions from './redux/actions';
import { getGStore, GLOBAL_NAME_SPACE } from './redux';
import Table from './table';
import './redux/reducer';
import useSearchListPage from './useSearchListPage';

// 支持一个搜索项，多个Tab的形式
const SearchListPage = forwardRef(function (
  {
    formClassName,
    formItems, // 搜索条件集合
    formRef, // 通过这个可以重置部分搜索项
    formShrinkSize = 5, // 展开收起的size,超过formShrinkSize，需要显示展开收起的组件
    nameSpace, // 自定义的作用域
    serialize, // 序列化搜索条件的方法（searchParams, isMore）
    request, // 请求列表的方法
    initQuery, // 初始化搜索条件
    columns,
    needCheck = false, // 是否需要勾选
    selectProps = {}, // 勾选属性配置，参考useTableRowSelected
    tablePreContent, // table上面的按钮集合或其他内容
    beforeReset, // 充值前的钩子
    rowKey = 'id', // table的key
    wrapList, // 列表数据包裹后产生新列表数据
    tableProps = {},
  },
  ref,
) {
  const dispatch = useDispatch();
  const { pageSize, pageNum, total, list, loading } = useSearchListPage({ nameSpace });
  const tableRefs = useRef({});

  const init = async () => {
    // 新增作用域
    await dispatch({
      type: `${GLOBAL_NAME_SPACE}/addNameSpace`,
      payload: {
        nameSpace: GLOBAL_NAME_SPACE,
        payload: {
          nameSpace,
          request, // 列表请求的接口
          serialize, // 将初始参数序列化成接口需要的参数
          query: initQuery, // 初始存储的searchQuery,用于重置
        },
      },
    });
  };
  useEffect(() => {
    if (dispatch) {
      console.log('---init---', getGStore());
      init();

      dispatch(actions.onInit({ nameSpace }));
    }
  }, []);

  const clearSelections = () => {
    const clearRowSelections = tableRefs.current?.clearRowSelections;
    if (needCheck) {
      clearRowSelections();
    }
  };

  const queryList = ({ query, pageSize, pageNum, isMore }) => {
    dispatch(
      actions.getList({
        nameSpace,
        isMore,
        query,
        pageSize,
        pageNum,
      }),
    );
  };
  const doReset = () => {
    beforeReset && beforeReset();
    dispatch(
      actions.onReset({
        nameSpace,
      }),
    );

    clearSelections();
  };

  const doSearch = (payloads, isMore) => {
    queryList({ query: payloads, pageNum: 1, isMore });
    clearSelections();
  };

  const doPageChange = ({ pageSize, pageNum }) => {
    queryList({ pageSize, pageNum });
  };

  // 刷新,默认重置到第一页
  const doRefresh = (isResetPageNum = true) => {
    queryList({ pageNum: isResetPageNum ? 1 : undefined });
    clearSelections();
  };

  useImperativeHandle(ref, () => ({
    doRefresh, // 当前页面刷新
    clearSelections, // 当前页面清除勾选项
    getSelections: () => {
      // 当前页面的
      const { selectedRowKeys, selectedTableRows } = tableRefs.current?.getSelections();
      return {
        selectedRowKeys, // 当前已选行的key的集合
        selectedTableRows, // 当前已选行的集合
      };
    },
  }));

  return (
    <>
      <Search
        formItems={formItems}
        onSearch={doSearch}
        onReset={doReset}
        formShrinkSize={formShrinkSize}
        nameSpace={nameSpace}
        ref={formRef}
        className={formClassName}
        loading={loading}
      />
      {tablePreContent}
      <Table
        columns={columns}
        doPageChange={doPageChange}
        pagination={{ pageNum, pageSize, total }}
        rowKey={rowKey}
        list={wrapList ? wrapList(list) : list}
        loading={loading}
        selectProps={selectProps}
        ref={tableRefs}
        needCheck={needCheck}
        tableProps={tableProps}
      />
    </>
  );
});
export default SearchListPage;
