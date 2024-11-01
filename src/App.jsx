/*
 * @Author: zhoujianfei
 * @Email: zhoujianfei@nnuo.com
 * @Date: 2021-06-08 14:27:18
 * @LastEditors: jiangmengxia jiangmengxia@nnuo.com
 * @LastEditTime: 2024-11-01 16:50:52
 */
import React, { Suspense, lazy, useEffect } from 'react';
import { ConfigProvider, Tabs } from 'antd';
import zhCN from 'antd/lib/locale-provider/zh_CN';
import MultiLineText from '@nuofe/bus-components/MultiLineText';
import StandardPagination from '@nuofe/bus-components/StandardPagination';
import SearchListPageTest from './SearchListPageTest';
import UseTableRowSelectedTest from './UseTableRowSelectedTest';

function App() {
  return (
    <ConfigProvider locale={zhCN}>
      <Tabs>
        <Tabs.TabPane tab="小组件" key="1">
          <div style={{ width: 600, border: '1px solid #ccc', padding: 20 }}>
            <ul>
              <li>
                <div>MultiLineText组件:</div>
                <div>
                  <MultiLineText
                    content={
                      '我是多行文本组件我是多行文本组件我是多行文本组件我是多行文本组件我是多行文本组件我是多行文本组件'
                    }
                  />
                </div>
              </li>
              <li>
                <div>分页器standardPagination:</div>
                <div>
                  <StandardPagination
                    current={1}
                    pageSize={10}
                    total={100}
                    onChange={() => {
                      console.log('onChange');
                    }}
                  />
                </div>
              </li>
            </ul>
          </div>
        </Tabs.TabPane>
        <Tabs.TabPane tab="SearchListPage" key="2">
          <SearchListPageTest />
        </Tabs.TabPane>
        <Tabs.TabPane tab="UseTableRowSelected" key="3">
          <UseTableRowSelectedTest />
        </Tabs.TabPane>
      </Tabs>
    </ConfigProvider>
  );
}

export default App;
