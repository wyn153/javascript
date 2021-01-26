// 获取节点对象
var loginCheck = document.querySelector('#logincheck');
var user1Check = document.querySelector('#user');
var password1Check = document.querySelector('#password1')
//先获取所有用户的对象//变成数组   
if (window.localStorage.userArr) {
  //判断是否存在        
  var array = JSON.parse(window.localStorage.userArr);
} else {
  array = [];//创建一个新数组    
}

loginCheck.addEventListener('click', function () {
  let username = user1Check.value;
  let password = password1Check.value;
  let flag = false;
  let index = 0;
  //遍历数组进行匹配
  if (!username) {
    alert('用户名不能为空');
  } else {
    for (let i = 0; i < array.length; i++) {
      //判断是否有相同账号            
      if (username == array[i].username) {//有这个账号                
        flag = true;
        index = i;
      }
    }
    if (flag) {//如果存在            
      if (password == array[index].password) {
        alert("登录成功");
        var yonghu = user1Check;
        // localStorage.name = user1Check.value;
        // console.log(localStorage.name);
        window.location.href = "../index.html";
      } else {
        alert("密码错误,请重新输入");
      }
    } else {//账号不存在或输入错误            
      alert("用户名不存在，请先注册");
    }
  }
}) 
