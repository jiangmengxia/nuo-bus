/*
 * @Description:
 * @Author: Jiangmengxia
 * @Email: jiangmengxia@nnuo.com
 * @Date: 2023-10-26 09:38:20
 * @LastEditors: jiangmengxia jiangmengxia@nnuo.com
 * @LastEditTime: 2024-11-01 17:57:11
 * @FilePath: \nuo-bus\packages\nuofe-bus-components\SearchListPage\redux\index.js
 */
import { combineReducers } from 'redux';
import { updateStateReducer } from './reducer';
const states = {
  // 根据模块进行存储的数据，动态添加的
  nameSpaces: {},
};
const NOOP = () => {};
const NOOP_OBJ = {};
// 默认表格数据
export const INIT_PAGE_STATE = {
  _init: {
    request: NOOP, // 列表请求的接口
    serialize: NOOP, // 将初始参数序列化成接口需要的参数
    query: NOOP_OBJ, // 初始存储的searchQuery,用于重置
  },
  // 搜索条件
  query: {},
  isMore: false, // 是否展开
  // 初始表数据
  loading: false,
  list: [],
  fields: [], // 定义展示的columns字段
  pagination: {
    pageNum: 1,
    pageSize: 20,
    total: 0,
  },
};

export const INIT_STATE = states;
export const GLOBAL_NAME_SPACE = 'GLOBAL_SERCH_LIST_PAGE'; // 本组件的作用域

const GStore = {
  // 全局store
  store: undefined,
  // 添加reducer的方法
  addReducer: (reducer = {}) => {
    console.error('默认设置的addReducer方法');
    //   if (Object.prototype.toString.call(reducer) !== '[object Object]') {
    //     throw new Error(`reducer must be a object.`);
    //   }

    //   Object.keys(reducer).forEach((key) => {
    //     if (dynamicReducers[key]) {
    //       throw new Error(`reducer ${key} is existed.`);
    //     }
    //   });

    //   Object.assign(dynamicReducers, reducer);
    //   if (!isEmptyStore()) {
    //     store.replaceReducer(combineReducers({ ...reducers, ...dynamicReducers }));
    //   } else {
    //     console.error(`请先调用injdect方法注册store`);
    //   }
  },
};
const isEmptyStore = () => {
  return GStore.store === undefined;
};
export const injectReduxStore = (store, addReducer) => {
  if (!isEmptyStore()) {
    console.error(`store已经注册，请勿重复注册`, Date.now());
  } else {
    GStore.store = store;
  }

  if (addReducer) {
    GStore.addReducer = addReducer;
    addReducer({ [GLOBAL_NAME_SPACE]: updateStateReducer });
  }
};

export const getState = ({ nameSpace }) => {
  if (isEmptyStore()) {
    console.error(`请先调用injdect方法注册store`);
    return;
  }
  const theGCStore = getGStore();

  try {
    const currentState = theGCStore.store.getState(); // 获取全局的state
    const searchListState = currentState[GLOBAL_NAME_SPACE] || INIT_STATE;
    const pageState = searchListState.nameSpaces[nameSpace] || INIT_PAGE_STATE;
    return {
      state: currentState,
      searchListState,
      pageState,
    };
  } catch (e) {
    console.error(e);
  }
};

export const getGStore = () => {
  return GStore;
};
