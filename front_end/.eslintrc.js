module.exports = {
  root: true,
  parserOptions: {
    parser: 'babel-eslint',
  },
  env: {
    browser: true,
  },
  extends: ['plugin:vue/essential', 'airbnb-base', 'prettier'],
  plugins: ['prettier', 'vue'],
  rules: {
    'prettier/prettier': [
      'error',
      {
        singleQuote: true,
        trailingComma: 'all',
      },
    ],
    camelcase: 'off', // 强制驼峰法命名
    'no-new': 'off', // 禁止在使用new构造一个实例后不赋值
    'space-before-function-paren': 'off', // 函数定义时括号前面不要有空格
    'no-plusplus': 'off', // 禁止使用 ++， ——
    'max-len': 'off', // 字符串最大长度
    'func-names': 'off', // 函数表达式必须有名字
    'no-param-reassign': 'off', // 不准给函数入参赋值
  },
};
