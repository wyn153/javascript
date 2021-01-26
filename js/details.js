// 1.获取节点
let smallObj = document.getElementById("Xcont-small");
let maskObj = document.getElementById("Xcont-mask");
let bigObj = document.getElementById("Xcont-big");
let imgObj = document.getElementById("Xcont-img");
let boxObj = document.getElementById("Xcont-box");

// 2 绑定鼠标事件
// 鼠标移入
smallObj.addEventListener("mouseenter", enterFn);
// 鼠标移出
smallObj.addEventListener("mouseleave", leaveFn);
// 鼠标移动
smallObj.addEventListener("mousemove", moveFn);

//3-1 鼠标移入
function enterFn() {
  maskObj.style.display = "block";
  bigObj.style.display = "block";
}

// 4-1 鼠标移出
function leaveFn() {
  maskObj.style.display = "none";
  bigObj.style.display = "none";
}

// 5-2获取box位置
let boxL = boxObj.offsetLeft;
let boxT = boxObj.offsetTop;

// 5-1 鼠标移动
function moveFn(eve) {
  // 5-3 获取鼠标到文档的位置
  let mouseX = eve.pageX;
  let mouseY = eve.pageY;

  // 5-4 获取黄盒子的宽高
  let maskW = maskObj.offsetWidth;
  let maskH = maskObj.offsetHeight;
  //  因为鼠标的位置坐标和mask的坐标参照位置,需要重新计算,
  // (鼠标位置-box的位置)
  let tmpMaskT = mouseY - boxT - maskH / 2;
  let tmpMaskL = mouseX - boxL - maskW / 2;

  // 5-5 设置四边不超出边界
  if (tmpMaskT < 0) tmpMaskT = 0;
  if (tmpMaskL < 0) tmpMaskL = 0;

  // 5-5-2 设置右边不超出边界
  // 小图片的宽度减去 黄盒子的宽高
  let targetLeft = smallObj.offsetWidth - maskW;
  let targetTop = smallObj.offsetHeight - maskH;

  if (tmpMaskL > targetLeft) tmpMaskL = targetLeft;
  if (tmpMaskT > targetTop) tmpMaskT = targetTop;

  maskObj.style.left = tmpMaskL + "px";
  maskObj.style.top = tmpMaskT + "px";
  //
  let bigImgTargetW = imgObj.offsetWidth - bigObj.offsetWidth;
  let bigImgTargetH = imgObj.offsetHeight - bigObj.offsetHeight;

  // 5-2 计算大图的实时位置
  let bigImgTmpL = (tmpMaskL / targetLeft) * bigImgTargetW;
  let bigImgTmpT = (tmpMaskT / targetTop) * bigImgTargetH;

  // 设置给大图
  imgObj.style.left = -bigImgTmpL + "px";
  imgObj.style.top = -bigImgTmpT + "px";
}

// 点击减少
//  let XcontReduce  = document.querySelector('.XcontReduce')
// //  点击添加
//  let XcontAdd =document.querySelector('.XcontAdd')
//  let XcontInput =document.querySelector('.Xcont-input')

// let dex= 1;
// // console.log(dex);
//  XcontReduce.onclick=function(){
//     if(dex>1){
//         dex--
//         XcontInput.value = dex
//         // console.log(index);
//     }
//  }
//  XcontAdd.onclick=function(){
//         dex++
//        XcontInput.value = dex
//        // console.log(dex);
//  }

// tab栏
let tab = document.querySelector(".tabTab-list");
let tabLi = document.querySelectorAll("li");
let tabCon = document.querySelectorAll(".tabTab-con");
let divObj = document.querySelectorAll(".tabTab-item");
//    for循环绑定点击事件，
for (let i = 0; i < tabLi.length; i++) {
  // 给每一个例追加index名为对应的索引
  tabLi[i].setAttribute("index", i);
  // 设置点击事件点击获取颜色
  tabLi[i].onclick = function () {
    // 清除所有li里面的颜色
    for (let i = 0; i < tabLi.length; i++) {
      tabLi[i].className = "";
    }
    // 留下点击的。
    this.className = "tabTab-current";

    // 下面的显示内容模块
    // 点击到哪一个获取到哪一个的索引号。
    var index = this.getAttribute("index");
    // console.log(index);
    // 清除其余的
    for (let i = 0; i < divObj.length; i++) {
      divObj[i].style.display = "none";
    }
    //    显示对应序号的页面
    divObj[index].style.display = "block";
  };
}
