<?php
// 执行连接
function con(){
//1 连接
// @ 警告抑制符
$link = @mysqli_connect('127.0.0.1','root','root','test');
// 判断连接状态,连接失败返回false
//var_dump($link)
if(!$link){
  die('连接失败...');
}

return $link;
}

// 非查询操作
function query($sql){
  // 调用连接的函数
  $link = con();
  $res = mysqli_query( $link,$sql);
  return $res;
}

// 查询操作
function select($sql){
  $link = con();
  $res = mysqli_query($link,$sql);
  //print_r($res);
  // 使用while将数据进行遍历
  $arr = [];
  while($str = mysqli_fetch_assoc($res)){
    $arr[] = $str;
  }
  return $arr;
}
?>