/*
 * @Description:
 * @Author: fang
 * @Email: fangxusheng@nnuo.com
 * @Date: 2021-06-07 16:58:02
 * @LastEditors: fang
 * @LastEditTime: 2021-06-07 19:08:56
 */

export default {
  user: (state = null, { type, payload }) => {
    switch (type) {
      case 'user/login':
      case 'user/set':
        return {
          ...state,
          ...payload,
        };
      case 'user/logout':
        return null;

      default:
        return state;
    }
  },
};
