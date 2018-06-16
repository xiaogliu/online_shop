// 设置 rem 函数
function setRem() {
  const deviceWidth = document.documentElement.clientWidth;
  // console.log(deviceWidth, 111);
  const dpr = window.devicePixelRatio;
  const metaEl = document.querySelector('meta[name="viewport"]');

  // 更改 scale，解决 1px 像素问题
  metaEl.setAttribute(
    'content',
    `initial-scale=${1 / dpr},maximum-scale=${1 / dpr},minimum-scale=${1 /
      dpr},user-scalable=no`,
  );

  // 设置rem
  document.querySelector('html').style.fontSize = `${deviceWidth * dpr / 10}px`;
}
// 初始化
// document.addEventListener('DOMContentLoaded', () => {
setRem();
// });

// 改变窗口大小时重新设置 rem
// window.addEventListener('resize', () => {
//   setRem();
// });
