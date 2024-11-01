/*
 * @Description:
 * @Author: fang
 * @Email: fangxusheng@nnuo.com
 * @Date: 2021-06-04 16:07:52
 * @LastEditors: zhoujianfei
 * @LastEditTime: 2022-05-11 17:08:34
 */
process.env.NODE_ENV = process.env.NODE_ENV || 'development';
module.exports = {
  root: true,
  extends: '@nuofe/eslint-config-react',
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'func-names': 'off',
    'react/jsx-no-bind': 'off',
    'no-tabs': 0,
    'react/prop-types': 0,
    'no-import-assign': 0,
    'react/display-name': 0,
    'no-unused-vars': 1,
    'jsx-a11y/no-noninteractive-element-interactions': 0,
    'react-hooks/exhaustive-deps': 0,
    'space-before-function-paren': 0,
    'node/no-callback-literal': 0,
    'no-unmodified-loop-condition': 0,
    'multiline-ternary': 0,
    'comma-dangle': 0,
    'no-control-regex': 0,
    'quote-props': 0, // 使得允许json对象的key值可使用中文、双引号等 https://cloud.tencent.com/developer/section/1135814
    quotes: 0,
    semi: ['error', 'always'],
  },
  settings: {
    'import/resolver': {
      node: {},
      webpack: {
        config: require('@nuofe/ndk-builder').default.getResolveConfig(),
      },
    },
  },
};
