/*
 * @Author: jiangmengxia jiangmengxia@nnuo.com
 * @Date: 2024-11-01 12:23:16
 * @LastEditors: jiangmengxia jiangmengxia@nnuo.com
 * @LastEditTime: 2024-11-01 16:22:09
 * @FilePath: \nuo-bus\packages\nuofe-bus\utils.js
 * @Description: Description
 */
/**
 * @description 工具函数
 */
export const generateUUID = () => {
  let d = new Date().getTime();
  const uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    const r = (d + Math.random() * 16) % 16 | 0;
    d = Math.floor(d / 16);
    return (c == 'x' ? r : (r & 0x7) | 0x8).toString(16);
  });
  return uuid;
};
