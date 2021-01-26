// 1.封装post请求
let post = {
  // 传入三个参数，请求地址，请求数据，回调函数
  request(url, data, cb) {
    // a.创建ajax对象
    let xhr = new XMLHttpRequest;
    // b.设置请求方式，请求地址
    xhr.open('post', url);
    // c.设置请求头
    xhr.setRequestHeader('content-type', 'application/x-www-form-urlencoded');
    // d.发送数据
    xhr.send(data);
    // 添加监听事件
    xhr.addEventListener('readystatechange', () => {
      if (xhr.readyState == 4 && xhr.status == 200) {
        // 调用回调函数
        cb(xhr.response)
        // console.log(xhr.response);
      }
    })
  }
}
// 2.获取节点
let inputsObj = document.querySelector('#zhuce1');
let passwordRepeat = document.querySelector('#passwordRepeat');
let user1 = document.querySelector('#user1');
// 3.给注册按钮绑定点击事件
inputsObj.addEventListener('click', btnClickFn);
function a(res) {
  // console.log(res);
  if (res == 1) {
    alert('用户名已存在')
  }
}
function btnClickFn() {
  // 4.获取用户名和密码
  let user = user1.value;
  let pwd = passwordRepeat.value;
  // 5.构造参数
  let data = `user=${user}&pwd=${pwd}`;
  console.log(data);
  // 6.ajax请求,设置回调函数,处理成功之后的结果
  post.request('./sever/login.php', data, a);
}