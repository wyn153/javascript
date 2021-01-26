<?php

$n = '123456';
$p ='123456';

// 接收ajax的参数
$name = $_POST['user'];
$pwd = $_POST['pwd'];

if($name==$n && $pwd==$p){
  echo 1;
}else{
  echo 2;
}
?>

