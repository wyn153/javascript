// 1.获取元素节点
var useObj = document.querySelector('#user1');
var passObj = document.querySelectorAll('input')[1];
var repassObj = document.querySelectorAll('input')[2];
var youxiang = document.querySelectorAll('input')[3];
let zhuce1 = document.querySelector('#zhuce1')
var mobile = document.querySelectorAll('input')[4];
// 2.设置五个状态，用于标记用户名、密码、再次输入密码是否成功,默认为false
var useState = false;
var passState = false;
var repassState = false;
var youxiangState = false;
var mobileState = false;
var flag;
//3.给元素绑定事件，失去焦点触发，验证用户名
useObj.onblur = function () {
  // a.获取用户名表单值
  var val = this.value;
  // b.验证的正则表达式
  var reg = /^[\w\-\u4E00-\u9FA5]{2,20}$/;
  if (reg.test(val)) {
    this.nextElementSibling.innerHTML = '用户名合法';
    useState = true;
    flag = 0;
  } else {
    this.nextElementSibling.innerHTML = '用户名不合法';
    useState = false;
    flag = 1;
  }
}

youxiang.onblur = function () {
  // a.获取邮箱表单值
  var val3 = this.value;
  // b.验证的正则表达式
  var reg3 = /^\w+@\w+(\.[a-zA-Z]{2,3}){1,2}$/;
  if (reg3.test(val3)) {
    this.nextElementSibling.innerHTML = '邮箱合法';
    youxiangState = true;
    flag = 0;
  } else {
    this.nextElementSibling.innerHTML = '邮箱不合法';
    youxiangState = false;
    flag = 4
  }
}

mobile.onblur = function () {
  // a.获取邮箱表单值
  var val4 = this.value;
  // b.验证的正则表达式
  var reg4 = /^1\d{10}$/;
  if (reg4.test(val4)) {
    this.nextElementSibling.innerHTML = '手机号合法';
    mobileState = true;
    flag = 0;
  } else {
    this.nextElementSibling.innerHTML = '手机号不合法';
    mobileState = false;
    flag = 5;
  }
}

//4.验证密码
passObj.onblur = function () {
  // a.获取密码表单值
  var passVal = this.value;
  // b.验证密码的长度,符合再往下走
  if (passVal.length >= 6 && passVal.length <= 20) {
    //c.验证密码内容部分
    //记录密码强度状态，初始为0
    var a = 0, b = 0, c = 0;
    //必须为数字、字母、特殊字符三种，可以组合，也可以完全只用一种
    //判断是否包含数字
    var num = /\d+/;
    //若包含数字则test()返回true,a=1,即强度1
    a = num.test(passVal) ? 1 : 0;
    //判断是否包含字母，包含则强度设1
    var alp = /[a-zA-Z]+/
    b = alp.test(passVal) ? 1 : 0;
    //判断是否包含特殊字符,非数字，大小写字母，包含则强度设1
    var cha = /[^a-a-zA-Z\d]/;
    c = cha.test(passVal) ? 1 : 0;
    //强度判断
    var str = '';
    switch (a + b + c) {
      case 1:
        str = '弱';
        break;
      case 2:
        str = '中';
        break;
      case 3:
        str = '强';
        break;
      default:
        console.log('408');
    }
    // 将密码强度打印到密码框后
    this.nextElementSibling.innerHTML = str;
    // 设置y为true表示密码为真
    passState = true;
    flag = 0;
  } else {
    this.nextElementSibling.innerHTML = '密码长度不够';
    passState = false;
    flag = 2;
  }
}

//5.验证重复密码
repassObj.onblur = function () {
  var repassval = this.value;
  var passVal = passObj.value;
  if (repassval === passVal && repassval && passVal) {
    this.nextElementSibling.innerHTML = '密码一致';
    repassState = true;
    flag = 0;
  } else if (repassval != passVal) {
    this.nextElementSibling.innerHTML = '密码不一致';
    repassState = false;
    flag = 3;
  } else {
    this.nextElementSibling.innerHTML = '密码不能为空';
    repassState = false;
    flag = 6;
  }
}
// 6.提交表单，注册
zhuce1.addEventListener('click', function () {
  if (useState && passState && repassState && mobileState && youxiangState) {
    if (window.localStorage.userArr) {
      //判断是否存在        
      var array = JSON.parse(window.localStorage.userArr);
    } else {
      array = [];//创建一个新数组    
    }
    let username = useObj.value;
    let password = repassObj.value;
    //遍历数组进行匹配        
    for (let i = 0; i < array.length; i++) {
      //判断是否有相同账号            
      if (username == array[i].username) {
        alert("该账号已存在");
        return;
      }
    }
    //创建对象 
    // console.log(flag2);
    let obj = {
      username: username, password: password
    }
    array.push(obj);
    window.localStorage.userArr = JSON.stringify(array);
    // alert("注册成功");
    window.location.href = "./succ.html";
  } else {
    switch (flag) {
      // case 0: ;
      //   break;
      case 1: alert("请重新输入用户名");
        break;
      case 2: alert("请重新输入密码");
        break;
      case 3: alert("请输入一致密码");
        break;
      case 4: alert("请输入正确邮箱");
        break;
      case 5: alert("请输入正确手机号");
        break;
      case 6: alert("密码不能为空");
        break;
      default: alert("请先检查各项信息");
    }
  }
})
