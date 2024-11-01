import { useSelector } from 'react-redux';
import { GLOBAL_NAME_SPACE, INIT_PAGE_STATE, INIT_STATE } from './redux';

export default function ({ nameSpace }) {
  const currentState = useSelector((state) => state);
  const searchListState = currentState[GLOBAL_NAME_SPACE] || INIT_STATE;
  const pageState = searchListState.nameSpaces[nameSpace] || INIT_PAGE_STATE;
  const {
    query,
    isMore,
    loading = false,
    list = [],
    fields = [], // 定义展示的columns字段
    pagination: { pageNum = 1, pageSize = 20, total = 0 },
  } = pageState;
  return {
    query,
    isMore,
    loading,
    list,
    fields,
    pageNum,
    pageSize,
    total,
  };
}
