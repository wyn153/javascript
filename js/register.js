var uesrObj = document.querySelector("#user");
var passObj = document.querySelector("#pass");
var passObj2 = document.getElementById("pass2");
var telObj = document.getElementById("tel");
var emlObj = document.getElementById("eml");
var butObj = document.querySelector(".btn");
// var spanObj = document.querySelectorAll('span')
// console.log(spanObj);
// 1-----用户名
var u = false;
uesrObj.onblur = function () {
  var tes = /^[\w\-\u4E00-\u9FA5]{4,20}$/;
  var val = this.value;
  if (tes.test(val)) {
    uesrObj.nextElementSibling.innerHTML = "用户名合格";
    uesrObj.nextElementSibling.style.color = "#479bb3";
    u = true;
  } else {
    uesrObj.nextElementSibling.innerHTML =
      "仅支持中文、字母、数字 4-20位的组合";
    u = false;
  }
};

var p = false;
// 2------密码
passObj.onblur = function () {
  var passVal = this.value;
  var a = 0;
  var b = 0;
  var c = 0;
  var str = "";
  // 数字字母特殊字符，一种类型，弱。两种类型为中，三种类型为强
  //  数字型
  if (passVal.length >= 6 && passVal.length <= 15) {
    var reg1 = /\d+/;
    a = reg1.test(passVal) ? 1 : 0;
    // 大小写字母
    var reg2 = /[a-zA-Z]+/;
    b = reg2.test(passVal) ? 1 : 0;
    // 特殊型
    var reg3 = /[^a-zA-Z\d]+/;
    c = reg3.test(passVal) ? 1 : 0;
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
    // 追加输出结果
    passObj.nextElementSibling.innerHTML = str;
    passObj.nextElementSibling.style.color = "#479bb3";
    p = true;
  } else {
    passObj.nextElementSibling.innerHTML = "输出密码长度不够";
    p = false;
  }
};

// 手机号的验证  第一位必须为1，后面再加10位数字
var t = false;
telObj.onblur = function () {
  var telVel = this.value;
  var abd = /^[1]{1}\d{10}$/;
  if (abd.test(telVel)) {
    telObj.nextElementSibling.innerHTML = "输入格式正确";
    telObj.nextElementSibling.style.color = "#479bb3";
    t = true;
  } else {
    telObj.nextElementSibling.innerHTML = "格式错误,";
    t = false;
  }
};
// 邮箱             数字大小写字母_- 3到12位   @  数字字母 2到9位  . 字母2到5位
var e = false;
emlObj.onblur = function () {
  var emlVal = this.value;
  var eml = /\w{3,12}@[0-9a-z]{2,9}\.[a-z]{2,5}/i;
  if (eml.test(emlVal)) {
    emlObj.nextElementSibling.innerHTML = "输入格式正确";
    emlObj.nextElementSibling.style.color = "#479bb3";
    e = true;
  } else {
    emlObj.nextElementSibling.innerHTML = "格式错误,";
    e = false;
  }
};
// 提交
butObj.onclick = function () {
  if (u && p && t && e) {
    window.open("lojin.html");
  } else {
    alert("提交失败");
  }
};
