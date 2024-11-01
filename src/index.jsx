/*
 * @Author: jiangmengxia jiangmengxia@nnuo.com
 * @Date: 2024-11-01 14:37:47
 * @LastEditors: jiangmengxia jiangmengxia@nnuo.com
 * @LastEditTime: 2024-11-01 17:18:59
 * @FilePath: \nuo-bus\src\index.jsx
 * @Description: Description
 */
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import reduxStore from './redux';
import App from './App';

ReactDOM.render(
  <Provider store={reduxStore}>
    <App />,
  </Provider>,
  document.getElementById('root'),
);
