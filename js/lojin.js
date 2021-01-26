// 1.获取节点
let inObj1 = document.querySelector(".inpt1");
let inObj2 = document.querySelector(".inpt2");
let butObj = document.querySelector(".but");
let butBox = document.querySelector(".butBox");
// console.log(butObj);
// 设置判断条件
let x = false;
let y = false;

// 验证用户名
inObj1.onblur = function () {
  var val = this.value;
  var reg = /^[\w\-\u4E00-\u9FA5]{4,20}/;
  if (reg.test(val)) {
    this.nextElementSibling.innerHTML = "输入正确";
    this.nextElementSibling.style.color = "#479bb3";
    x = true;
  } else {
    this.nextElementSibling.innerHTML = "输入错误";
    this.value = "";
    x = false;
  }
};

inObj2.onblur = function () {
  let vel = this.value;
  if (vel.length >= 6 && vel.length <= 20) {
    //记录密码的强度状态
    var a = 0,
      b = 0;
    c = 0;
    // 验证是否是有数字
    var reg = /\d+/;
    a = reg.test(vel) ? 1 : 0;
    //console.log(a);
    // 验证是否有字母
    var reg1 = /[a-zA-Z]+/;
    b = reg1.test(vel) ? 1 : 0;
    // 验证是否包含特殊字符
    var reg2 = /[^a-zA-Z\d]+/;
    c = reg2.test(vel) ? 1 : 0;
    // 给出面强度判断
    var str = "";
    switch (a + b + c) {
      case 1:
        str = "弱";
        break;
      case 2:
        str = "中";
        break;
      case 3:
        str = "强";
        break;
    }
    // 将密码强度追加到密码框后
    this.nextElementSibling.innerHTML = str;
    this.nextElementSibling.style.color = "#479bb3";
    y = true;
  } else {
    this.nextElementSibling.innerHTML = "密码不正确";
    y = false;
  }
};

// 提交表单
butObj.onclick = function () {
  if (x && y) {
    window.open("./index.html");
  } else {
    alert("提交失败");
  }
};
