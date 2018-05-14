/**
 * 这个文件设置环境变量的值
 * 根据这个文件的内容在同级目录新建 env.js 供 conf.js 使用
 * 为了避免不同环境的 env.js 相互覆盖， env.js 不放入版本办理
 * 其中 master 分支对应 production 环境
 * dev 分支对应 development 环境
 */

export default 'env_variable';
