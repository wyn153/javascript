// 搜索框
// 获取节点
let searchInput = document.querySelector(".prompt-text");
let searchUl = document.querySelector(".search-res");
// 表单输入事件
let searchTimes = "";
searchInput.oninput = function () {
  searchUl.style.display = "block";
  // console.log(11111);
  // 延时2s获取一次输入内容
  clearTimeout(searchTimes);
  searchTimes = setTimeout(() => {
    let val = this.value;
    script(val);
  }, 500);
};
function script(val) {
  let scr = document.createElement("script");
  scr.src =
    "https://sp0.baidu.com/5a1Fazu8AA54nxGko9WTAnF6hhy/su?wd=" +
    val +
    "&json=1&p=3&sid=22084_1436_13548_21120_22036_22073&req=2&csor=0&cb=callback";
  // 追加
  document.querySelector("head").appendChild(scr);
  // 删除
  scr.remove();
}
function callback(data) {
  // console.log(data);
  let { s } = data;
  // console.log(s);
  // 遍历创建li,添加到ul中
  let li = "";
  s.forEach((kw) => {
    li += "<li>" + kw + "</li>";
    // console.log(li);
  });
  searchUl.innerHTML = li;
}

searchInput.onblur = function () {
  searchUl.style.display = "none";
};

// 遮罩
// 左
let bannerAside = document.querySelector(".banner-aside");
// 右
let bannerBox = document.querySelector(".banner-left-hid-box");
// 左边鼠标事件
bannerAside.onmouseover = function () {
  bannerBox.style.display = "block";
};
bannerAside.onmouseout = function () {
  bannerBox.style.display = "none";
};

// 右边鼠标事件
bannerBox.onmouseover = function () {
  bannerBox.style.display = "block";
};
bannerBox.onmouseout = function () {
  bannerBox.style.display = "none";
};

// 设置遮盖对应的li
// let bannerULi = document.querySelector('.banner-aside-ul')
// let bannerLi = bannerULi.children;
// // console.log(bannerLi);
// let indexB
// Array.from(bannerLi).forEach(function(v,k){

//    indexB = k
// })
// console.log(indexB);

// 倒计时
var hour = document.querySelector(".hour-m");
var minute = document.querySelector(".minute-m");
var second = document.querySelector(".second-m");
var inputTime = +new Date("2020-12-31 18:00:00"); //返回用户输入的时间
// countDown();//先调用一次这个函数，防止第一次刷新页面无数字显示
var timeH;
var timeM;
var timtS;
function countDown() {
  var nowTime = +new Date(); // 返回的是当前时间总的毫秒数
  var times = (inputTime - nowTime) / 1000; // times是的秒数
  timeH = parseInt(times / 60 / 60); //时
  timeH = timeH < 10 ? "0" + timeH : timeH;

  hour.innerHTML = timeH; // 把剩余的小时给 小时黑色盒子
  timeM = parseInt((times / 60) % 60); // 分
  timeM = timeM < 10 ? "0" + timeM : timeM;
  minute.innerHTML = timeM;
  timtS = parseInt(times % 60); // 当前的秒
  // timtS = timtS < 10 ? '0' + timtS : timtS;

  if (0 <= timtS && timtS < 10) {
    timtS = "0" + timtS;
  }
  second.innerHTML = timtS;
  if (timtS < 0) {
    console.log(1);
    second.innerHTML = "00";
    minute.innerHTML = "00";
    hour.innerHTML = "00";
    clearInterval(timer);
  }
}

var timer = ""; //全局变量
function timeFn() {
  timer = setInterval(countDown, 1000);
}
timeFn();

// 走马灯

class Play {
  constructor() {
    // 获取节点
    this.wrapObj = document.querySelector(".wrap");
    this.ulObj = document.querySelector(".ul");
    this.lisObj = this.ulObj.children;
    // 获取大盒子和ul的宽度
    this.wrapObjW = this.wrapObj.offsetWidth;
    this.ulObjW = this.ulObj.offsetWidth;
    // 计算可以移动的距离
    this.maxW = this.wrapObjW - this.ulObjW;
    this.times = "";
    this.left1 = 0;

    // 给大盒子绑定鼠标事件
    this.wrapObj.addEventListener("mouseover", this.divover.bind(this));
    this.wrapObj.addEventListener("mouseout", this.divout.bind(this));
    this.autoPlay();
  }

  //   设置鼠标移入时清除定时器停止播放
  divover() {
    clearInterval(this.times);
  }

  // 鼠标移出时继续自动播放
  divout() {
    this.autoPlay();
  }
  // 封装自动播放函数
  autoPlay() {
    // 定时器
    this.speed = this.maxW / 4000;
    // clearInterval(this.times);
    this.times = setInterval(() => {
      this.left1 += this.speed;
      if (this.left1 <= this.maxW) {
        this.ulObj.style.left = 0;
        this.left1 = 0; //
        this.left1 += this.speed;
        this.ulObj.style.left = this.left1 + "px";
      } else {
        this.ulObj.style.left = this.left1 + "px";
      }
    }, 10);
  }
}
new Play();



// 右下角 点击回到顶部
let hahaH = document.querySelector(".hahaH");
// console.log(hahaH);
window.onscroll = function () {
  var hahaT = document.documentElement.scrollTop || document.body.scrollTop;
  //   console.log(hahaT);
};

 hahaH.onclick = setInterval(function () {
  hahaT = 0;
}, 1000);

