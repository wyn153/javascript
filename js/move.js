// 运动三要素: 谁运动  运动属性  目标值
let times = "";
function startMove(ele, obj, cb) {
  clearInterval(times);
  // 设置清除定时器的开关
  let onOff = false;
  times = setInterval(function () {
    // 遍历运动的属性
    for (var attr in obj) {
      // 获取当前元素的实时值
      let tmpVal = parseInt(getPos(ele, attr));
      // console.log(ele, attr, tmpVal);
      // 计算speed
      let speed = (obj[attr] - tmpVal) / 10;
      // 取整,向下取
      speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed);
      // 将speed设置到元素身上 box.style.left
      ele.style[attr] = tmpVal + speed + "px";

      // 到达目标值,设置开关
      if (tmpVal + speed == obj[attr]) onOff = true;
    }

    // 元素都到目标值,则清除定时器
    if (onOff) {
      clearInterval(times);
      // 有回调函数则调用
      cb && cb();
    }
  }, 30);
}
// 获取元素的实时位置的函数
function getPos(eleObj, attr) {
  if (eleObj.currentStyle) {
    // 判断当前浏览器是否支持
    return eleObj.currentStyle[attr]; // box.curreentStyle.left
  } else {
    return getComputedStyle(eleObj)[attr]; // getComputedStyle(box).left
  }
}
