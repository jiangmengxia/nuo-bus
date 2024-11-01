/*
 * @Description:
 * @Author: Jiangmengxia
 * @Email: jiangmengxia@nnuo.com
 * @Date: 2023-09-27 11:34:29
 * @LastEditors: jiangmengxia jiangmengxia@nnuo.com
 * @LastEditTime: 2024-11-01 17:18:35
 * @FilePath: \nuo-bus\packages\nuofe-bus-components\SearchListPage\search.jsx
 */
import React from 'react';
import StandardSearchForm from './SearchForm';
import { Form } from 'antd';
import { useDispatch } from 'react-redux';
import useSearchListPage from './useSearchListPage';

import { GLOBAL_NAME_SPACE } from './redux';

function Search({
  formItems,
  onSearch,
  onReset,
  nameSpace,
  formShrinkSize = 5, // 超出formShrinkSize，显示更多选项
  form,
  className,
}) {
  const { isMore, loading } = useSearchListPage({
    nameSpace,
  });
  const dispatch = useDispatch();

  const doReset = () => {
    onReset && onReset();
  };

  const doSearch = () => {
    form.validateFieldsAndScroll((err, values) => {
      if (err) {
        console.error(err);
        return;
      }
      if (values) {
        onSearch && onSearch(values);
      }
    });
  };

  const { getFieldDecorator } = form;
  return (
    <div className={`bgc_ff pt_20 pl_20 pr_20 ${className}`}>
      <StandardSearchForm
        layout="inline"
        colon={false}
        autoComplete="off"
        onReset={doReset}
        onSubmit={doSearch}
        min={formShrinkSize}
        isMore={isMore}
        onMoreChange={(e) => {
          dispatch({
            type: `${GLOBAL_NAME_SPACE}/setIsMore`,
            payload: {
              nameSpace,
              payload: { isMore: e },
            },
          });
        }}
        getFieldDecorator={getFieldDecorator}
        formItems={formItems}
      />
    </div>
  );
}
export default Form.create()(Search);
