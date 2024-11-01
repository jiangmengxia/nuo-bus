/*
 * @Description: 长度受限的文本，设置受限长度,超出溢出，用省略号表示，并用toolTip包裹（hover上去看全部内容）
 * @Author: Jiangmengxia
 * @Email: jiangmengxia@nnuo.com
 * @Date: 2022-07-12 16:15:30
 * @LastEditors: jiangmengxia jiangmengxia@nnuo.com
 * @LastEditTime: 2024-11-01 15:05:13
 * @FilePath: \nuo-bus\packages\nuofe-bus\MultiLineText\index.tsx
 */

import { Tooltip } from 'antd';
import React from 'react';
import styles from './index.less';
import { TooltipProps } from 'antd/lib/tooltip';

export declare type MultiLineTextProps = {
  content?: string; // 文本内容
  maxLength?: number; // 文本长度限制
  showLine?: number; // 默认显示行数
  noTextTag?: React.ReactNode; // 无文本时显示的内容
} & TooltipProps;

const MultiLineText: React.FC<MultiLineTextProps> = (props) => {
  const { content, maxLength, showLine = 1, noTextTag = '-', ...tooltipProps } = props;
  if (content === null || content === undefined || content === '') return <>{noTextTag}</>;
  if (maxLength && maxLength > 0 && content.length <= maxLength) {
    return content;
  }
  return (
    <>
      <Tooltip title={<div className={styles.title}>{content}</div>} {...tooltipProps}>
        <div className={styles.ellipsis} style={{ WebkitLineClamp: showLine }}>
          {content}
        </div>
      </Tooltip>
    </>
  );
};

export default MultiLineText;
