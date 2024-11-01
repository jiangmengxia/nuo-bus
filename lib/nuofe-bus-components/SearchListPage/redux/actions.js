import { getState } from './index';
import { isEmpty } from '@nuofe/bus-utils/judgeValue';
import { GLOBAL_NAME_SPACE } from '.';

// 获取模板列表
export const getList = ({ nameSpace, isMore, query, pageSize, pageNum }) => {
  const { pageState } = getState({ nameSpace });
  const {
    isMore: oldIsMore,
    pagination: oldPagination,
    _init: { serialize, request },
  } = pageState;
  const newIsMore = !isEmpty(isMore) ? isMore : oldIsMore;
  return async (dispatch) => {
    // 先更新搜索项
    dispatch({
      type: `${GLOBAL_NAME_SPACE}/setQuery`,
      payload: {
        nameSpace,
        payload: { query },
      },
    });
    dispatch({
      type: `${GLOBAL_NAME_SPACE}/setTableLoading`,
      payload: {
        nameSpace,
        payload: {
          loading: true,
        },
      },
    });
    try {
      const data = await request({
        ...serialize(query, newIsMore),
        pageSize: pageSize || oldPagination?.pageSize || 20,
        pageNum: pageNum || oldPagination?.pageNum || 1,
      });
      if (!data) {
        throw new Error(`后端返回错误`);
      }
      const { list = [], total, pageNum: bkPageNum, pageSize: bkPageSize } = data || {};
      dispatch({
        type: `${GLOBAL_NAME_SPACE}/setTableList`,
        payload: {
          nameSpace,
          payload: {
            pagination: { total, pageNum: bkPageNum, pageSize: bkPageSize },
            loading: false,
            list,
          },
        },
      });
    } catch (e) {
      console.error(e);
      // // 更新后端返回数据在前端的缓存
      dispatch({
        type: `${GLOBAL_NAME_SPACE}/setTableList`,
        payload: {
          nameSpace,
          payload: {
            list: [], // 由于后端字段变更，后续需要序列化成与之前一直的字段，便于前端处理
            pagination: {
              pageSize: pageSize || oldPagination?.pageSize || 20,
              pageNum: pageNum || oldPagination?.pageNum || 1,
              total: 0,
            },
            loading: false,
          },
        },
      });
    }
  };
};

// 刷新,查询条件用初始值，分页用当前值(默认1,20)
export function onInit({ nameSpace }) {
  return async (dispatch) => {
    const {
      pageState: {
        _init: { query },
      },
    } = getState({ nameSpace });
    // 否则根据下拉内容来查询纳税
    dispatch(
      getList({
        nameSpace,
        query,
      }),
    );
  };
}

// 重置
export function onReset({ nameSpace }) {
  // 初始设置筛选条件及查询
  return async (dispatch) => {
    const {
      _init: { query },
      pagination: { pageSize },
    } = getState({ nameSpace });
    // 否则根据下拉内容来查询纳税
    try {
      dispatch(
        getList({
          nameSpace,
          query,
          pagination: {
            pageNum: 1,
            pageSize,
          },
        }),
      );
    } catch (e) {
      console.error(e);
    }
  };
}
