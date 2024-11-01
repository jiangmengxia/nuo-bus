/*
 * @Author: jiangmengxia jiangmengxia@nnuo.com
 * @Date: 2024-11-01 18:04:06
 * @LastEditors: jiangmengxia jiangmengxia@nnuo.com
 * @LastEditTime: 2024-11-01 18:08:51
 * @FilePath: \nuo-bus\publish-before.js
 * @Description: Description
 */
/**
 * 发布前执行脚本
 */

const fs = require('fs');

// 删除目标目录
fs.rmSync(destinationDir, { recursive: true, force: true });

// 源目录路径
const sourceDir = 'packages';

// 目标目录路径
const destinationDir = 'lib';

// 使用fs.cpSync方法进行目录拷贝
fs.cpSync(sourceDir, destinationDir, { recursive: true });

console.log('目录拷贝成功！');
