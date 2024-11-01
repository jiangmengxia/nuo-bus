/* eslint-disable no-underscore-dangle */
/*
 * @Description:
 * @Author: Jiangmengxia
 * @Email: jiangmengxia@nnuo.com
 * @Date: 2023-09-27 13:14:45
 * @LastEditors: jiangmengxia jiangmengxia@nnuo.com
 * @LastEditTime: 2024-11-01 17:36:07
 * @FilePath: \nuo-bus\packages\nuofe-bus-components\SearchListPage\redux\reducer.js
 */
import { cloneDeep as deepClone } from 'lodash';
import { isEmpty } from '@nuofe/bus-utils';
import { INIT_STATE, GLOBAL_NAME_SPACE, INIT_PAGE_STATE } from '.';

const addNameSpace = ({ state, nameSpace, request, serialize, query }) => {
  if (isEmpty(nameSpace)) return false;
  const newPageState = deepClone(INIT_PAGE_STATE);
  if (state?.nameSpaces?.[nameSpace] === undefined) {
    newPageState._init = {
      request,
      serialize,
      query,
    };
    const newState = {
      ...state,
    };
    newState.nameSpaces[nameSpace] = newPageState;
    return newState; // 有变更
  }
  console.warn(`【addNameSpace】 ${nameSpace}已存在，无需新增`);
  return state; // 未变更
};
// 全局存储的数据的变更
const updateGlobalStateReducer = ({ state, payload = {}, type }) => {
  const doActions = {
    addNameSpace: () => {
      const { nameSpace, request, serialize, query } = payload;
      return addNameSpace({ state, nameSpace, request, serialize, query });
    },
  };
  if (!doActions[type]) {
    console.error(`【updateGlobalStateReducer】中未定义全局reducer:${type}`);
    return state;
  }
  return doActions[type]() || state;
};

const updatePageReducerByNamespace = ({
  state: globalState,
  nameSpace,
  payload,
  type, // action Type
}) => {
  const moduleState = deepClone(globalState?.nameSpaces?.[nameSpace]);
  let isModuleChanged = false;
  const doActions = {
    // 设置列表查询结果
    setTableList: () => {
      if (payload) {
        const { pagination, list, loading } = payload;
        moduleState.list = list;
        moduleState.pagination = pagination;
        moduleState.loading = loading;
        isModuleChanged = true;
      }
    },
    // 设置列表loading
    setTableLoading: () => {
      if (payload.loading) {
        // 当loading为true时，触发tabIndex修改
        isModuleChanged = true;
      }
      if (moduleState.loading !== payload.loading) {
        moduleState.loading = payload.loading;
        isModuleChanged = true;
      }
    },
    setIsMore: () => {
      if (moduleState.isMore !== payload.isMore) {
        moduleState.isMore = payload.isMore;
        isModuleChanged = true;
      }
    },
    // 设置列表展示字段
    setFields: () => {
      if (JSON.stringify(moduleState.fields) !== JSON.stringify(payload.fields || {})) {
        moduleState.fields = payload.fields || [];
        isModuleChanged = true;
      }
    },
    // 设置查询条件
    setQuery: () => {
      if (JSON.stringify(moduleState.query) !== JSON.stringify(payload.query || {})) {
        moduleState.query = payload.query || {};
        isModuleChanged = true;
      }
    },
  };
  if (!doActions[type]) {
    console.error(`【updatePageReducerByNamespace】中未定义reducer:${type}`);
    return globalState;
  }
  doActions[type]();
  if (isModuleChanged) {
    const newGloState = { ...globalState };
    newGloState.nameSpaces[nameSpace] = moduleState;
    return newGloState;
  }
  return globalState;
};

// 状态变更处理
/**
 * dispatch的入参格式
 * {
 *    type:'XXX',
 *    payload:{
 *      nameSpace:'XXX',
 *      payload: 需要的参数
 *  }
 * }
 *
 */
export const updateStateReducer = (state = INIT_STATE, { type: sourceType, payload }) => {
  if (sourceType?.split('/')?.[0] !== GLOBAL_NAME_SPACE) {
    return state;
  }
  const type = sourceType?.split('/')?.[1];
  const { nameSpace, ...actualPayload } = payload || {};
  // 修改全局的状态
  if (!nameSpace || nameSpace === GLOBAL_NAME_SPACE) {
    return updateGlobalStateReducer({ state, payload: actualPayload.payload, type }) || state;
  }
  // 修改单页数据
  return (
    updatePageReducerByNamespace({ state, nameSpace, payload: actualPayload.payload, type }) ||
    state
  );
};
