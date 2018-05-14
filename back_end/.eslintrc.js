module.exports = {
  parser: 'babel-eslint',
  env: {
    browser: true,
    node: true,
  },
  extends: 'airbnb',
  // add your custom rules here,0 === off,1 === warn, 2 === error
  rules: {
    semi: ['error', 'always'], // 语句强制分号结尾
    camelcase: 'off', // 强制驼峰法命名
    'no-new': 'off', // 禁止在使用new构造一个实例后不赋值
    'space-before-function-paren': 'off', // 函数定义时括号前面不要有空格
    'no-plusplus': 'off', // 禁止使用 ++， ——
    'max-len': 'off', // 字符串最大长度
    'comma-dangle': ["error", 'always-multiline'], // 多行对象字面量项尾总是有逗号
    'func-names': 'off', // 函数表达式必须有名字
  },
};