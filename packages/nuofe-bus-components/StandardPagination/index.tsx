/*
 * @Description:
 * @Author: wangfuyuan
 * @Email: wangfuyuan#nuo.com
 * @Date: 2024-05-09 10:18:28
 * @LastEditors: jiangmengxia jiangmengxia@nnuo.com
 * @LastEditTime: 2024-11-01 17:13:23
 * @FilePath: \nuo-bus\packages\nuofe-bus-components\standardPagination\index.tsx
 * Copyright (c) 2024 by 诺诺网 , All Rights Reserved.
 *
 */
import React from 'react';

import { Pagination } from 'antd';
import { PaginationProps } from 'antd/lib/Pagination';
import style from './index.less';

export interface paginationType {
  pageNum?: number; // 当前页 ,优先
  current?: number; // 当前页
  pageSize?: number; // 每页条数
  total?: number; // 总条数
}

export declare type StandardPaginationProps = {
  wrapStyle?: React.CSSProperties; // 外层样式
  wrapClass?: string; // 外层样式
  onChange?: (values: { pageNum: number; pageSize: number }) => void; // 改变
} & paginationType &
  PaginationProps;

const StandardPagination: React.FC<StandardPaginationProps> = (props) => {
  const {
    total = 0,
    current,
    pageNum,
    pageSize,
    onChange,
    wrapStyle,
    wrapClass,
    ...restProps
  } = props;
  const handleShowSizeChange = (_, size) => {
    if (onChange) {
      onChange({ pageNum: 1, pageSize: size });
    }
  };

  const handlePageChange = (current, size) => {
    if (onChange) {
      onChange({ pageNum: current, pageSize: size });
    }
  };

  const paginationProps: PaginationProps = {
    showSizeChanger: true,
    showTotal: (size) => `共 ${size} 条`,
    pageSizeOptions: ['20', '50', '100', '500'],
    ...restProps,
    current: current || pageNum,
    total: +total,
    pageSize,
  };

  return (
    <>
      {+total > 0 ? (
        <div className={`${style['standard-pagination-wrapper']} ${wrapClass}`} style={wrapStyle}>
          <Pagination
            {...paginationProps}
            onChange={handlePageChange}
            onShowSizeChange={handleShowSizeChange}
          />
        </div>
      ) : null}
    </>
  );
};
StandardPagination.defaultProps = {
  onChange: null,
  pageNum: 1,
  pageSize: 20,
  total: null,
};

export default StandardPagination;
