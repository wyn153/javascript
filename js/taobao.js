let ulObj = document.querySelector(".screen-ul");
let lisObj = ulObj.children;
let olObjAll = ulObj.nextElementSibling;
let screenObj = document.getElementById("screen");
let screenW = screenObj.clientWidth; //图片宽度
let boxObjA = document.querySelector(".all");
// let boxObj = document.getElementById('box');
let arrObj = document.querySelector("#arr");
let leftObj = document.getElementById("left");
let rightObj = document.getElementById("right");

let timess = "";
//  保存图片索引的全局变量。
let index = 0;
//1-1 渲染页面中的序列号 ，几张图片几个序号
for (let i = 0; i < lisObj.length; i++) {
  let newOlLi = document.createElement("li");
  // 1-2  追加到Ol 中去
  //  newOlLi.innerHTML = i + 1;
  // 1-3 设置第一张默认选中
  i == 0 && (newOlLi.className = "current");
  // 追加到ol中
  olObjAll.appendChild(newOlLi);
  // 1-4 给新节点对象，添加属性，保存对应的索引
  // *
  newOlLi.key = i;
  // 1-5 给每一个Li 追加点击事件 (点击切换对应索引的图片。)
  newOlLi.addEventListener("click", clickOl);
}

// 2-1序号中点击事件的回调函数(点击后的运动)
function clickOl() {
  //2-2 取出当前图片对应的索引
  index = this.key;
  selOlLi();
  //2-3 计算目标值
  let target = -screenW * index; // -宽度(500)*当前索引
  // 2-4 运动三属性 谁运动 方向，目标值
  startMove(ulObj, { left: target }, function () {
    //    console.log('完了...');
  });
}

// 2-5 获取页面中ol下li的数量
let olLisObj = document.querySelectorAll("ol li");

// 2-6 序号选中
function selOlLi() {
  //    点击的选中，其他的取消
  let tmpSelLi = document.querySelector(".current");
  tmpSelLi.classList.remove("current");
  // 当前点击的选中
  olLisObj[index].className = "current";
}

// 使用定时器,自动播放
function autoPlay() {
  timess = setInterval(function () {
    rightObj.onclick();
    //  console.log(qqqqq);
  }, 4000);
}
autoPlay();

// 2-7设置鼠标事件
// 鼠标移入 显示
boxObjA.onmouseover = function () {
  arrObj.style.display = "block";
  // 鼠标移入清除定时器
  clearInterval(timess);
};
// 鼠标移出  隐藏
boxObjA.onmouseout = function () {
  arrObj.style.display = "none";
  //开始轮播
  autoPlay();
};
/*******克隆第一张图片,放到最后*****/
let cloneLi = lisObj[0].cloneNode(true);
cloneLi.style.borderTop = "1px solid red";
// 追加到ul的最后
ulObj.appendChild(cloneLi);

/*******右边按钮的实现*******/
rightObj.onclick = () => {
  index++;
  // 1-1 判断索引是否为最大值
  if (index == olLisObj.length) {
    // 1-2 从下标从第五张,切换到克隆的第一张
    let target = -screenW * index;
    //console.log('aaaaa');

    startMove(ulObj, { left: target }, function () {
      // 1-3 将整个ul的left设置为0
      ulObj.style.left = "0px";
    });

    // 设置index为0
    index = 0;
  } else {
    // 2 计算目标值
    let target = -screenW * index;
    startMove(ulObj, { left: target }, function () {
      //  console.log('完了...');
    });
  }

  // console.log(index);
  // 3 调用选中序列号的的函数
  selOlLi();
};

/********左边按钮的实现*********/
leftObj.onclick = function () {
  index--;
  // 判断是否是第一张
  if (index == -1) {
    // console.log(-1);
    //将ul的left值设置为-2500
    ulObj.style.left = -olLisObj.length * screenW + "px";

    let target = -screenW * (olLisObj.length - 1);
    startMove(ulObj, { left: target }, function () {
      //  console.log('完了...');
    });
    // 将下标设置为最大索引
    index = olLisObj.length - 1;
  } else {
    let target = -screenW * index;
    startMove(ulObj, { left: target }, function () {
      //  console.log('完了...');
    });
  }
  selOlLi();
};
