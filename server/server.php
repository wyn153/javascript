<?php
include('./mysql.php');
// 获取访问的方法名称
$fn = $_GET['fn']; 
// add();
$fn();  // add()

 // 查询数据
 function lst(){
   $sql = 'select * from shop';
   $res = select($sql);
   if($res){
     echo json_encode([
       "meta"=>[
         "status"=>200,
        "msg"=>"数据获取成功"
       ],
       "data"=>$res
     ]);
   }
 }
?>