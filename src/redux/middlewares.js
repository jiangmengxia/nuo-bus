/*
 * @Author: jiangmengxia jiangmengxia@nnuo.com
 * @Date: 2024-11-01 17:08:56
 * @LastEditors: jiangmengxia jiangmengxia@nnuo.com
 * @LastEditTime: 2024-11-01 17:14:43
 * @FilePath: \nuo-bus\src\redux\middlewares.js
 * @Description: Description
 */
import thunk from 'redux-thunk';

const middlewares = [thunk];

// if (process.env.NODE_ENV === 'development') {
//   const { logger } = require('redux-logger');

//   middlewares.push(logger);
// }

export default middlewares;
