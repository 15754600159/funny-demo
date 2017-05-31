<?php
//Content-Type指定返回的数据格式，text/xml 对应responXML，text/html对应responseText
  header('Content-Type: text/html;charset=utf-8');
  
  //告诉浏览器不要缓存数据
  header('Cache-Control: no-cache');
  

  // $info = '{"province": ["浙江", "北京", "上海"]}'
  echo '{"province": ["浙江", "北京", "上海"]}';//echo的数据是返回给发送请求的页面
  
?>