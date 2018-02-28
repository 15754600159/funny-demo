<?php
//Content-Type指定返回的数据格式，text/xml 对应responXML，text/html对应responseText
  header('Content-Type: text/html;charset=utf-8');
  
  //告诉浏览器不要缓存数据
  header('Cache-Control: no-cache');
  
  $sheng = $_GET['jgdm_sf'];
  if ($sheng == '浙江'){
  	echo '{"shi": ["金华", "浦江", "义务"]}';
  }elseif($sheng == '北京'){
  	echo '{"shi": ["海淀", "西二旗", "昌平"]}';
  }else{
  	echo '{"shi": ["虹桥", "浦东", "不知道"]}';
  }
  // $info = '{"province": ["浙江", "北京", "上海"]}'
  // echo '{"province": ["浙江", "北京", "上海"]}';//echo的数据是返回给发送请求的页面
  
?>