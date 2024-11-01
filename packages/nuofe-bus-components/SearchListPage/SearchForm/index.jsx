/*
 * @Author: zhangbin_fed zhangbin_fed@nnuo.com
 * @Date: 2022-08-16 09:57:50
 * @LastEditors: jiangmengxia jiangmengxia@nnuo.com
 * @LastEditTime: 2024-11-01 18:02:10
 */
import React from 'react';
import { isEmpty } from '@nuofe/bus-utils/judgeValue';
import { Button, Col, Form, Icon, Row } from 'antd';
import styles from './index.less';

/**
 * @description 标准表单查询组件，查询与重置位置固定，
 * 默认每个表项的宽度是33.3%,也就是一行最多展示3个表项
 */
function StandardSearchForm({
  children, // 中每一项都是form.item形式
  onSubmit = () => {
    console.error('StandardSearchForm onSubmit缺省');
  },
  onReset,
  onMoreChange,
  style,
  className,
  showSearchButtons = true,
  min = 3, // 收起时的长度
  isMore,
  formItems,
  getFieldDecorator,
}) {
  //  是否显示展示更多的按钮
  const showShowMoreBtn = formItems?.length && formItems?.length > min;

  const renderFormItems = () => {
    return formItems?.map(
      ({
        field,
        fieldProps,
        component,
        formItemProps,
        label,
        span: originSpan = { span: 6, offset: 0 },
        originOffset = 0,
      }) => {
        const initSpan = { span: 6, offset: 0 };
        // const originOffset = 0;
        const span = {
          xs: initSpan,
          sm: initSpan,
          md: initSpan,
          lg: initSpan,
          xl: initSpan,
          xxl: initSpan,
        };

        if (typeof originSpan === 'object') {
          const coverSpan = originSpan;
          const keys = Object.keys(coverSpan);
          //  originSpan = {span:1, offset:1} 所有窗口大小都按照originSpan.span
          if (!isEmpty(originSpan?.span)) {
            Object.keys(span).forEach((key) => {
              span[key].span = originSpan.span;
              span[key].offset = originSpan.offset || originOffset;
            });
          } else {
            keys.forEach((key) => {
              //  span = {xs:1, sm:1, ...}
              if (typeof coverSpan[key] === 'number') {
                span[key] = {
                  span: coverSpan[key],
                  offset: originOffset,
                };
              } else {
                // span={xs:{span:1, offset:1}, sm:{span:1, offset:1}, ...}
                span[key].offset = coverSpan[key]?.offset || originOffset;
                span[key].span = coverSpan[key]?.span || originSpan.span;
              }
            });
          }
        } else if (typeof originSpan === 'number' || isEmpty(span)) {
          Object.keys(span).forEach((key) => {
            span[key] = { span: originSpan };
          });
        }
        return (
          <Col {...span} key={field}>
            <Form.Item key={field} label={label} {...formItemProps}>
              {getFieldDecorator(field, { ...fieldProps })(component)}
            </Form.Item>
          </Col>
        );
      },
    );
  };
  return (
    <Form
      className={`${styles.StandardSearchForm} ${className} over-antd-form`}
      layout="inline"
      style={style}
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit(e);
      }}
      onReset={onReset}
      colon={false}
    >
      {showShowMoreBtn && !isMore ? children?.slice(0, min) : children}
      <Row>
        {renderFormItems()}
        {showSearchButtons && (
          <Col span={4} style={{ float: 'right' }}>
            <Form.Item className={`${styles.buttons} formButtons`}>
              <Button htmlType="reset">重置</Button>
              <Button style={{ marginLeft: 12 }} type="primary" htmlType="submit">
                查询
              </Button>
              {showShowMoreBtn && (
                <Button type="link" onClick={() => onMoreChange(!isMore)}>
                  {!isMore ? (
                    <span>
                      更多筛选 <Icon type="down" />
                    </span>
                  ) : (
                    <span>
                      精简筛选 <Icon type="up" />
                    </span>
                  )}
                </Button>
              )}
            </Form.Item>
          </Col>
        )}
      </Row>
    </Form>
  );
}

export default StandardSearchForm;
