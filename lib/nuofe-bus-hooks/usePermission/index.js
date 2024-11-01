/* eslint-disable prettier/prettier */
/*
 * @Description: permission
 * @Author: liyue
 * @Email: liyue@nnuo.com
 * @Date: 2022-06-15 10:10:44
 * @LastEditors: chengxu
 * @LastEditTime: 2022-10-25 10:01:06
 * @FilePath: /swzt-spreadjs-front/src/hooks/usePermission.js
 */
import { Base64 } from 'js-base64';
import { getUrlparameter } from '@/utils';

export default (key) => {
  const nuonuoUserType = getUrlparameter('nuonuoUserType')?.split('?')[0] || '';
  const userPermission =
  getUrlparameter('source') === 'swzt' && getUrlparameter('nstAuth')
  ? JSON.parse(Base64.decode(getUrlparameter('nstAuth')))
  : {};
  // 2代表超管放开所有权限
  return nuonuoUserType === '2' ? true : userPermission[key];
};
