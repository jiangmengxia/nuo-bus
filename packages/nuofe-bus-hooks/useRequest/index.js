/*
 * @Description: 接口请求的数据处理部分的功能提取成Hook
 * @Author: Jiangmengxia
 * @Email: jiangmengxia@nnuo.com
 * @Date: 2022-07-25 14:41:11
 * @LastEditors: jiangmengxia jiangmengxia@nnuo.com
 * @LastEditTime: 2024-11-01 18:02:16
 * @FilePath: \nuo-bus\packages\nuofe-bus-hooks\useRequest\index.js
 */
// 在请求数据时，返回loading的状态

import { useEffect, useState } from 'react';

/**
 * @param {*} initData : 未请求之前的数据初始值
 * @param {*} handler : request请求的方法
 * @param {*} immediate : 是否初始就需要请求
 * @returns data： 请求结果
 *          loading：请求状态（用于spin或按钮的loading,提示正在请求中）
 *          disabled：等于!loading，用于一些按钮的置灰
 *          request：就是封装后的接口请求
 */
export default function useRequest(
  initData,
  handler,
  {
    immediate = false, // 首次是否发送请求
    initHandlerParam, // 首次请求数据时的入参
    dataPackHandler, // 对返回数据的封装处理,处理后结果本地存储
    cb, // 数据返回后的回调
  },
) {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(initData);
  const request = async (params) => {
    if (loading === false) {
      setLoading(true);
    }
    try {
      const d = await handler(params);
      if (dataPackHandler) {
        setData(dataPackHandler(d));
      } else {
        setData(d);
      }
      cb && cb(d);
      setLoading(false);
    } catch (e) {
      setLoading(false); // 后端报错后loading消失
    }
  };

  useEffect(() => {
    if (immediate === true) {
      request(initHandlerParam);
    }
  }, []);

  const disabled = !loading;

  return [data, loading, disabled, request, setData];
}
