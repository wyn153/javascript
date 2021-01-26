const baseUrl = 'http://localhost/item2/server/';
// 封装ajax请求
let axios = {
  // get请求封装
  get (url, dataType) {
    // 接收调用方法
    return this.publicFn('get', url)
  },
    // post请求封装
  post (url, data, dataType) {
    return this.publicFn('post', url, data)
  },

  publicFn (type, url, data = '', dataType = 'json') {
    return new Promise((resolve, reject) =>{
      let xhr = new XMLHttpRequest();
      // type表示什么类型的请求。
      xhr.open(type, url);
      // post请求设置请求头
      (type == 'post') && xhr.setRequestHeader('content-type', 'application/x-www-form-urlencoded');
      // 发送请求
      // 默认为空，存在就使用它
      xhr.send(data && data);
      // 监听接收
      xhr.onreadystatechange = function () {
        if (xhr.readyState == 4) {  // ajax状态有5个
          if (xhr.status == 200) {
            // 转化为json ,如果dataType 等于json，则转换，
            let res = (dataType == 'json') ? JSON.parse(xhr.response) : xhr.response;
            // 成功的
            resolve(res)
          } else {
            reject('服务器错误')
          }
        }
      }
    })
  }
}

// 获取节点的方法
function $ (tag) {
  return document.querySelector(tag)
}
function $$ (tag) {
  return document.querySelectorAll(tag)
}


