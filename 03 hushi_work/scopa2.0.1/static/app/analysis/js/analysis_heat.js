var SVLOG_BASE = 300;  							//scopa 3.0操作点记录用ID base
var SVLOG = {
	MAP_ClickLevel1: SVLOG_BASE+1,
	MAP_InfoClickDetail: SVLOG_BASE+2,
	MAP_ZoomInOut: SVLOG_BASE+3,
	SELECT_TimeStart1: SVLOG_BASE+4,
	SELECT_TimeEnd1: SVLOG_BASE+5,
	SELECT_AreaLevel1: SVLOG_BASE+6,
	SELECT_TimeStart2: SVLOG_BASE+7,
	SELECT_TimeEnd2: SVLOG_BASE+8,
	SELECT_AreaLevel2: SVLOG_BASE+9
};

/**由于该js方法较多，写方法的顺序：一.获取json文件数据 二.过滤数据，处理数据 三.面包屑方法 四.1.操作地图相关方法，
   2.操作警情类型相关方法、3.操作时间、地点下拉框相关方法、4.操作表格相关方法、5.样式处理**/

window.onload =function() {
  initMethods();
}

//初始化页面需加载的方法
function initMethods(){
  selectTimeStyle();
  initParentMap();
  bread();
  jingQingTypeData();
  tableAndHuanxingtuForType();
  tableAndHuanxingtuForAddr();
  tableAndHuanxingtuForTime();
  tableAndHuanxingtuForZidingyiTime();
  $('.tooltip-toggle').tooltip('toggle');
}

//得到石家庄所有区的数据  
var locations; 
//var mining = {"baseurl":{"gongan":"http://localhost/sjz/gongan"}, "utils":{formatHeatData: function(o){return o;}, serverLog: function(c){}}};                         
function getDataAllQu(){
     var getDataAllQu;
	    $.ajax({   
      	type:'get',
      	url:'./json/sjzqh.json',
      	dataType:'json',
  		  async: false,
      	success:function(data){
        getDataAllQu=data;
    		},
    		error:function(e){
    			$dialog.alert('出现错误，请稍后重试！\n' + e.message,'warning');
    		}       
      }); 
      return getDataAllQu; 
}

//得到派出所的数据
function paiChuSuoData(){
    var paiChuSuoData;;
    $.ajax({
       type:"get",
       url:"./json/sjzpcs.json",
       dataType:"json",
       async:false,
       success:function(data){
           paiChuSuoData=data;
       },
       error:function(e){
          $dialog.alert('出现错误，请稍后重试！\n' + e.message,'warning');
       }
    });
    return paiChuSuoData;
}

//石家庄11种警情类型的数据  
function jingQingTypeData(){
		$.ajax({
  		type: "get",
  		url:mining.baseurl.gongan + "/alarm/city?type=7",
  		dataType: "json",
  		async:false,
  		success: function(data){ 
  			  if(data.statusCode != 200){
  					if(typeof(data.obj) == "undefined"){
  					$dialog.alert('出现错误，请稍后重试！\n' + data.message,'warning');
  						return;
  					}
  			  } 
  			  if(data.obj == null || data.obj.data == null){
  				   dataNullOfTable();
  			  }else{
  				   fileterDate(data,"shiJiaZhuang");
  			  }
  		},
  		error:function(e){
  			  $dialog.alert('出现错误，请稍后重试！\n' + e.message,'warning');
  		}
    });   
} 

//根据param判断是石家庄数据,或是石家庄区以及派出所的请求数据
function fileterDate(data,params){
    var sjzData;
    if(params=='shiJiaZhuang'){//石家庄
        sjzData=data.obj.data;
    }else if(params==""){//区县以及派出所
        sjzData=data.obj.data.data;
    }
    try {
        showStartAndEndTime(data.obj.start,data.obj.end);
        initTable(sjzData);
    }
    catch(e) {
        dataNullOfTable();
    }
}

//面包屑的‘应用’,点击返回
function bread(){
    $("#goApp").on("click", function(){//面包屑的‘应用’
      window.top.mining.utils.toAppHome();
    });
}
//面包屑跳到具体区或县
function breadChildren(citys){
    if($(".breadcrumb li:eq(2)").text()===""){
         $(".breadcrumb").append("<li>"+citys+"</li>");
         $("#goUp").css("cursor","pointer");
         $("#goUp").on('click',function(){
             $(".breadcrumb li:eq(2)").remove();
             $("#goUp").css("cursor","");
             $("#goUp").off('click');
             initMethods();
         })
    }  
}

/**1.操作地图相关方法**/
//初始化父地图
var flagpoc;//判断是父地图1还是子地图2
var area;
var heatmapOverlay;
var map;
function initParentMap(){
    flagpoc=1;
    map = new BMap.Map("map",{minZoom:11,maxZoom:14,enableMapClick:false}); // 创建地图实例  
    var point = new BMap.Point(114.520828,38.048684);                       // 创建点坐标  
    map.centerAndZoom(point, 12);                                           //初始化地图，设置中心点坐标和地图级别  
	  heatmapOverlay = new BMapLib.HeatmapOverlay({"radius":20});             //热力图的半径大小
    var b = new BMap.Bounds(new BMap.Point(112.713792,36.618505),new BMap.Point(116.836487,39.428776));//范围左下角，右上角的点位置
  	try {
  		BMapLib.AreaRestriction.setBounds(map, b);                          //map为中心，b为范围
  	} catch (e) {
  	} 
    var data=getDataAllQu();
    locations = data.area;
    selecteAddress(locations);                                  
    var markimgs=["sjzqu.png"];
    makePoints(map,locations,markimgs); //在地图上瞄点      
    getParentHeat();
}

//初始化子地图
var newloc=null;
function initChildrenMap(map,locations,marker){
     flagpoc=0;
     newloc = new BMap.Point(locations.postion[0],locations.postion[1]);
     map.centerAndZoom(newloc, 14);
     area=locations.citys;
     var zoom=map.getZoom();
     mining.utils.serverLog(SVLOG.MAP_ZoomInOut); //SCOPA 3.0操作点记录
     if(zoom==14){
        breadChildren(area);
        map.clearOverlays();
        getChildHeat(area);
        getPaiChuSuoData(area,locations);
     }
     map.closeInfoWindow(); 
     var type=CheckedType();
     var addressValue= $(".selectAddress").val();
     var timeValue= $(".selectTime").children("option:selected").val();
     if(timeValue=="0"){
         timeValue=ziDingYiTime();
     }
     sohData(type,addressValue,timeValue);
     dataOfAddTime(addressValue,timeValue,"p");
}

//点击某个区得到对应的派出所同时显示到地点下拉框中(名字需要和json文件中的名字进行匹配)
function getPaiChuSuoData(district,locations){
     var time=$(".selectTime").val();
     var url;
     if(time!=0){
          url=mining.baseurl.gongan + "/alarm/districts_single/places?type="+time+"&district="+encodeURI(encodeURI("河北省石家庄市"+district));
     }else{
          time=ziDingYiTime();
          url=mining.baseurl.gongan + "/alarm/districts_single/places?type=0&startTime="+time+"&district="+encodeURI(encodeURI("河北省石家庄市"+district));
     }
     $.ajax({
          type:"get",
          url:url,
          async:false,
          dataType:"json",
          success:function(data){
              if(data.statusCode != 200){
                  if(typeof(data.obj) == "undefined"){
                  $dialog.alert('出现错误，请稍后重试！\n' + data.message,'warning');
                    return;
                  }
              } 
              $(".selectAddress").html("");
              $(".selectAddress").append("<option value="+district+">"+district+"</option>");
              if(data.obj==null || data.obj.data==null || data.obj.data.length==0){
                   return;
              }
              var clocations=data.obj.data;
              var places=[];
              for(var i=0;i<clocations.length;i++){
                  var place={};
                  place.citys=clocations[i].area;//后台返回某个区的派出所或交警大队
                  places.push(place);
              }
              var pcsData=paiChuSuoData();
              var citys=pcsData.place;//citys：json得到所有的派出所数据
              var clocations=[];
              for(var i=0;i<citys.length;i++){
                  for(var j=0;j<places.length;j++){
                      var cys = citys[i].citys.split(",");  //把json文件派出所名用“，”分开 
                      if(cys[0]==cys[1]){
                          if(places[j].citys.endsWith(cys[1])){//后台返回的数据以json文件中某个派出所结尾
                               citys[i].citys = cys[1];//把数组1的值赋给json文件的city
                               clocations.push(citys[i]);
                               $(".selectAddress").append("<option value="+places[j].citys+">"+cys[1]+"</option>");
                               break;
                          }
                      }else{
                           //后台返回的派出所既包含数组1的值，又包含数组0的值
                           if(places[j].citys.indexOf(cys[0])!=-1&&places[j].citys.indexOf(cys[1])!=-1){
                               citys[i].citys = cys[1];
                               clocations.push(citys[i]);
                               $(".selectAddress").append("<option  value="+places[j].citys+">"+cys[1]+"</option>");
                               break;
                           }
                      }  
                  }
              }        
              var markimgs=["pcs.png"];
              makePointChildren(map,locations,markimgs,clocations);
          }
     })
}

//父地图热力图数据(赋值位置信息)
var hgjqposition=[];
function getParentHeat(){
     var data=getDataAllQu();
     var hgjq =[];
     var time=getTimeRange();
     var url;
     var allqu;
     if(time!=0){
          url=mining.baseurl.gongan + "/alarm/districts?type="+time;
     }else{
          time=ziDingYiTime();
          url=mining.baseurl.gongan + "/alarm/districts?type=0&startTime="+time;
     }
     $.ajax({
          type:"get",
          url:url,
          async:false,
          dataType:"json",
          success:function(data1){          
              allqu=data1.obj.data;//各个区（包含区名称和数据）
          }
     })
     hgjqposition=[];
     if(allqu==null){
          getTotalCountByCategory(map,hgjqposition);//计算部分
          return;
     }
     for(var i=0;i<data.area.length;i++){//json文件数据
        for(var j=0;j<allqu.length;j++){//接口数据
             if(allqu[j].area.indexOf(data.area[i].citys)>0){
                 var q=data.area[i].postion;//json文件中每个区的坐标
                 var pcs=new Object();
                 pcs.lng=q[0];
                 pcs.lat=q[1];
                 pcs.city=data.area[i].citys;
                 pcs.data=allqu[j].data;
                 hgjq.push(pcs);//新创建好的对象放入数组
             }
        }
     }
     hgjqposition=hgjq;
     getTotalCountByCategory(map,hgjqposition);   
}

//子地图热力图数据(赋值位置信息)
var hgjqposition=[];
function getChildHeat(area){
      var time=$(".selectTime").val();
      var district=area;
      var url;
      if(time!=0){
          url=mining.baseurl.gongan + "/alarm/districts_single/places?type="+time+"&district="+encodeURI(encodeURI("河北省石家庄市"+district));
      }else{
          time=ziDingYiTime();
          url=mining.baseurl.gongan + "/alarm/districts_single/places?type=0&startTime="+time+"&district="+encodeURI(encodeURI("河北省石家庄市"+district));
      }
      $.ajax({
           type:"get",
            url:url,
            async:false,
            dataType:"json",
            success:function(data){
                if(data.statusCode != 200){
                     $dialog.alert('出现错误，请稍后重试！\n' + data.message,'warning');
                     return;
                }    
                if(data.obj==null || data.obj.data==null || data.obj.data.length==0){
                     hgjqposition=[];     
                     getTotalCountByCategory(map,hgjqposition);
                     return;
                }
                var clocations=data.obj.data;//派出所11种警情类型的数据
                var pscData=paiChuSuoData();
                hgjqposition=[];
                var citys=pscData.place;
                for(var i=0;i<citys.length;i++){
                    for(var j=0;j<clocations.length;j++){
                        var cys = citys[i].citys.split(",");
                        if(cys[0]==cys[1]){
                             if(clocations[j].area.endsWith(cys[1])){
                                 var pcs=new Object();
                                 pcs.lng=citys[i].postion[0];
                                 pcs.lat=citys[i].postion[1];
                                 pcs.data = clocations[j].data;
                                 pcs.area = clocations[j].area;
                                 hgjqposition.push(pcs);
                                 break;
                             }
                        }else{
                              if(clocations[j].area.indexOf(cys[0])!=-1&&clocations[j].area.indexOf(cys[1])!=-1){
                                 var pcs=new Object();
                                 pcs.lng=citys[i].postion[0];
                                 pcs.lat=citys[i].postion[1];
                                 pcs.data = clocations[j].data;
                                 pcs.area = clocations[j].area;
                                 hgjqposition.push(pcs);
                                 break;
                              }
                        }
                    }
                }
                getTotalCountByCategory(map,hgjqposition);  
            },error:function(e){
                $dialog.alert('出现错误，请稍后重试！\n' + e.message,'warning');
            }
      })
}

//类型数量求和（应用于热力图中）
function getTotalCountByCategory(map,jqData){
      if(jqData.length==0){
          try{
              map.removeOverlay(heatmapOverlay);
          }catch(e){}
      }
      var types=CheckedType();
      var mk2={"举报线索":"jbxs","交通警情":"jtjq","其他报警类别":"qt","刑事警情":"xsjq","投诉监督":"tsjd","治安警情":"zajq","消防警情":"xfjq","灾害事故":"zhsg","社会联动":"shld","群众求助":"qzqz","群体事件":"qtsj"};
      var heatMapData = [];
      var max=0;
      for(dw=0; dw<jqData.length; dw++){//jqData.length区的数量 
           var hd = {};//创建空对象
           hd.count=0; 
           for(idx=0; idx<jqData[dw].data.length; idx++){//每个区警情类型数量（jqData[dw].data.length） 
              tData = jqData[dw].data[idx];//每种类型的详细数据（cs,tb,hb...）
              //根据类别求和
              if(types.indexOf(mk2[tData.ajlbmc]) !=-1){//mk2[key]
                    hd.count += tData.cs; //求和
              }
           }
          if(hd.count!=0){
                hd.count=(1-1000/(hd.count+1100))*100;//该公式的作用是把数映射到了0到100的范围内，避免count最大值太大，当数量小时热力图显示不出效果
          }else{
                hd.count=0;
          }
          hd.lat=jqData[dw].lat;
          hd.lng=jqData[dw].lng;
          heatMapData.push(hd);//hd(count:,lat:,lng:)
      }
      heatMap(heatMapData);
}

//加载热力图
function heatMap(heatMapData){
      try{
          //赋值坐标(石家庄市或每个区)
          var tloc = null;
          if($('#selectAddress').val() == '石家庄市'){
              tloc = new BMap.Point(114.520828,38.048684);
          }else{
              $.each(locations, function(i,n){//i:index;n:value
                 if($('#selectAddress').val() == n.citys){
                     tloc = new BMap.Point(n.position[0],n.position[1]);
                     return false;
                 }
              })
          }
          //初始化地图，设置中心点坐标和地图级别 (tloc:每个区的坐标为准)
          if(tloc)map.centerAndZoom(tloc, 12);
      }catch(e){}
      map.removeOverlay(heatmapOverlay);
      if(heatMapData && heatMapData.length > 0){
          //添加热力图
          map.addOverlay(heatmapOverlay);
          heatmapOverlay.setDataSet({data:heatMapData,max:100});
          if(newloc){
            map.centerAndZoom(newloc, 14);
            newloc = null;
          }
          var oldcenter = map.getCenter(), //返回当前位置中心点(lng:,lat:)
          newgap = 0.000001, 
          newzoom = 14;
          if($('#selectAddress').val() == '石家庄市')newzoom = 12;
          map.centerAndZoom(new BMap.Point(oldcenter.lng+newgap, oldcenter.lat+newgap), newzoom);
      }
}


//传入坐标绘制标注和点击标注触发的事件（在父地图上瞄点）
function makePoints(map,locations,markimgs){
    for(var i=0;i<locations.length;i++){
       var pt = new BMap.Point(locations[i].postion[0],locations[i].postion[1]);
       var myIcon = new BMap.Icon("./image/"+markimgs[0], new BMap.Size(29, 40));
       var marker = new BMap.Marker(pt,{icon: myIcon,offset: new BMap.Size(0, -20)});
       marker.setTitle(locations[i].citys);
       var opts = {
            position : pt,                                    // 指定文本标注所在的地理位置
            offset   : new BMap.Size(-28, -5)                 //设置文本偏移量
       };
       var label = new BMap.Label(locations[i].citys, opts);  // 创建文本标注对象
       label.setStyle({"color" : "black","fontSize" : "20px","fontWeight":"bold","width": "60px","height" : "25px","lineHeight" : "20px","fontFamily":"微软雅黑","border":"0",});
       map.addOverlay(label);  
       map.addOverlay(marker);
     
       var content="<div id='inforBorder'>"+
       "<div class='mcontent' style='width:100%;height:15px;background-color: #EFF2F9;'>"+
           "<p class='ptitle'>石家庄市-"+locations[i].citys+"</p >"+
       "</div><hr>"+ 
       "<div id='pied' style='width:100%;height:100%'>"+
       "<p class='pfont' style='margin:10px auto auto 10px'></p>"+
           "<div id='hd1' style='width:100%;height=100px'>"+
               "<canvas id='myChart' width='100px' height='100px'></canvas>"+
               "<div id='syaj'></div>"+
           "</div>"+
       "</div>"+
       "<div class='xiangqing'><a  class='moreinfo' id='moreinfo"+i+"'>详情</ a></div>"+                            
       "</div>";
       var id='moreinfo'+i;
       addClickHandler(content,marker,map,id,locations[i]);//bind点击事件监听 
    }
}

//子地图上瞄点
function makePointChildren(map,locations,markimgs,clocations){
      for(var i=0;i<clocations.length;i++){
          var pt = new BMap.Point(clocations[i].postion[0],clocations[i].postion[1]);
          var myIcon = new BMap.Icon("./image/"+markimgs[0], new BMap.Size(29,40));
          var marker = new BMap.Marker(pt, { icon: myIcon,offset: new BMap.Size(0, -20) });
          marker.setTitle(clocations[i].citys);
          var len= clocations[i].citys.length;//获取派出所字符串长度
          var width= len *15 +"px";
          var offsetX=len*7;
          var opts = {
              position : pt,                            // 指定文本标注所在的地理位置
              offset   : new BMap.Size(-offsetX, -5)    //设置文本偏移量
          };
          var label = new BMap.Label(clocations[i].citys, opts);  // 创建文本标注对象
          label.setStyle({
              "color" : "black",
              "fontSize" : "12px",
              "width": width,
              "height" : "20px",
              "lineHeight" : "20px",
              "fontFamily":"微软雅黑",
              "border":"0",
              "background-image":"url(./image/back.png)",
           });
           map.addOverlay(marker);
           map.addOverlay(label);  
           var content="<div id='inforBorder'>"+
           "<div class='mcontent' style='width:100%;height:15px;background-color: #EFF2F9;'>"+     
           "<p>"+locations.citys+"-"+clocations[i].citys+"</p >"+
           "</div><hr>"+ 
           "<div id='pied' style='width:100%;height:100%'>"+
             "<p class='pfont' style='margin:10px auto auto 10px'></p>"+
               "<div id='hd1' style='width:100%;height=100px'>"+
                   "<canvas id='myChart' width='100px' height='100px'></canvas>"+
                   "<div id='syaj'></div>"+
               "</div>"+
           "</div>"+                           
           "</div>";
           addClickHandler(content,marker,map,"c",locations,clocations[i]);//bind点击事件监听   
      }
}

//给描画的点添加click事件
function addClickHandler(content,marker,map,id,locations,clocations){//marker:图片，id:'moreinfo'+i，locations:json文件中的区和坐标
    var infoWindow = new BMap.InfoWindow(content,{
      boxStyle:{
        width: "270px",height: "300px"
      }
      ,closeIconMargin: "1px 1px 0 0"
      ,enableAutoPan: true
      ,align: INFOBOX_AT_TOP
    });
    if(id=="c"){
      marker.addEventListener('click',function(e){
        $("#selectAddress option").each(function(index){
            if($(this).text()==clocations.citys){
                  document.getElementById("selectAddress").selectedIndex=index;
            }
        });
        openInfo(infoWindow,e,map,id,locations,marker,$(".selectAddress").val());
        mining.utils.serverLog(SVLOG.MAP_ClickLevel1);  //SCOPA 3.0操作点记录
      });
    }else{
        marker.addEventListener('click',function(e){
          $(".selectAddress").val(locations.citys);
          openInfo(infoWindow,e,map,id,locations,marker);
        });
    }
}

//点击事件触发弹出框
function openInfo(infoWindow,e,map,id,locations,marker,clocations){
      var p=e.target; //触发事件的元素
      var point = new BMap.Point(p.getPosition().lng, p.getPosition().lat);   
      map.openInfoWindow(infoWindow,point);
      var type=CheckedType();
      var time=getTimeRange();
      style();
      $("#"+id).on('click',function(){//点击详情按钮
          mining.utils.serverLog(SVLOG.MAP_InfoClickDetail);  //SCOPA 3.0操作点记录
          area=locations.citys; //全局变量area使用
          initChildrenMap(map,locations,marker);//子地图瞄点 
      });
      if(id!="c"){
          if(time==0){
              time=ziDingYiTime();
          }
          $(".gridTbody").html("");
          sohData(type,locations.citys,time);
          dataOfAddTime(locations.citys,time,"p");
      }else{
          if(time==0){
              time=ziDingYiTime();
          }
          $(".gridTbody").html("");
          sohData(type,locations.citys,time,clocations);
          dataOfAddTime(locations.citys,time,"c",clocations);
      }
}

//根据已选的警情类型，控制环形图的显示和隐藏
function sohData(type,citys,time,cctiys){
      var data=gdChart(citys,time,cctiys);//11个
      if(data==null){
        //  dataNullOfTable();
          return;
      }
      var showType=type.split(",");//已选警情类型的id
      showType.pop();
      var selData=[];
      for(var i=0;i<data.length;i++){
          for(var j=0;j<showType.length;j++){
              if(data[i].id===showType[j]){
                 var sel= new Object();              
                 sel.id=data[i].id;
                 sel.color=data[i].color;
                 sel.name=data[i].name;
                 sel.value=data[i].value;
                 selData.push(sel);//选中的复选框放入sel数组里
                 break;
              }
          }
      }
      initChart(selData);
      $('.clounm1 input[type=checkbox]:checked').each(function() {
          $("."+$(this).attr("value")).css("display","");//环形图的数量样式  
          $(".pp"+$(this).attr("value")).css("display",""); 
      });
      $('.clounm1 input:not(:checked)').each(function() {        
          $("."+$(this).attr("value")).css("display","none"); 
          $(".pp"+$(this).attr("value")).css("display","none");  
      });
}

//画环形图
function initChart(params){
    if(document.getElementById("myChart")==null){
        return;
    }
    var ctx = document.getElementById("myChart").getContext("2d");
    new Chart(ctx).Doughnut(params,{
          segmentShowStroke : false,
    });
}

//点击详情，获取石家庄市所有区的数据,拼接弹出框右面的数据
function gdChart(citys,time,ccitys){
    $("#syaj").html("");
    var redata;
    var mk={"举报线索":"pjbxs","交通警情":"pjtjq","其他报警类别":"pqt","刑事警情":"pxsjq","投诉监督":"ptsjd","治安警情":"pzajq","消防警情":"pxfjq","灾害事故":"pzhsg","社会联动":"pshld","群众求助":"pqzqz","群体事件":"pqtsj"};
    var url;
    if(ccitys!=""&&ccitys!=null){
        if(time.indexOf("&endTime=") > 0 ){
            url=mining.baseurl.gongan + '/alarm/districts_single/places_single?district='+encodeURI(encodeURI("河北省石家庄市"+citys))+"&type=0&startTime="+time+"&place="+encodeURI(encodeURI(ccitys));
        }else{
            url=mining.baseurl.gongan + '/alarm/districts_single/places_single?district='+encodeURI(encodeURI("河北省石家庄市"+citys))+"&type="+time+"&place="+encodeURI(encodeURI(ccitys));
        }
    }else{
        if(time.indexOf("&endTime=") > 0 ){
            url=mining.baseurl.gongan + '/alarm/districts_single?district='+encodeURI(encodeURI("河北省石家庄市"+citys))+"&type=0&startTime="+time;
        }else{
            url=mining.baseurl.gongan + '/alarm/districts_single?district='+encodeURI(encodeURI("河北省石家庄市"+citys))+"&type="+time;
        }
    }
	//console.log('%c'+url,'color:red');
    $.ajax({
        type:'get',
        url:url,
        dataType:'json',
        async:false,
        success:function(data){
          if(data.statusCode != 200){
            if(typeof(data.obj) == "undefined"){
              $dialog.alert('出现错误，请稍后重试！\n' + data.message,'warning');
              return;
              }
          } 
          if(data.obj==null || data.obj.data==null ||data.obj.data.data==null){
            //  dataNullOfTable();
              return;
          }
          var boxData=data.obj.data.data;//{"ajlbmc":"交通警情","cs":61,"tb":"NA","hb":"36"},
          for(var i=0;i<boxData.length;i++){ 
            for(var key in mk){
              if(key==boxData[i].ajlbmc){
                   $("#syaj").append("<div style='width:100px;float:left;' class='p"+mk[key]+"'>"+boxData[i].ajlbmc+":"+boxData[i].cs+"</div>");
                   break;
              }
            }                       
          }                 
          redata= getPieData(boxData);
        },
        error:function(e){
          $dialog.alert('出现错误，请稍后重试！\n' + e.message,'warning');
        }
     });

     if($("#syaj").html() == ""||$("#syaj").html()==null){
        $(".pfont").html("");
        $(".pfont").append("暂无数据");
        $("#hd1").css("display","none");
        return null;
      }else{
        $("#hd1").css("display","block");
        $(".pfont").html("");
      }
      return redata;
}

//点击详情，把{"ajlbmc":"交通警情","cs":61,"tb":"NA","hb":"36"}中的cs赋给下面的数组（绘制饼图数据）
function getPieData(dataNew){
    var dataArr = [
    {name:'刑事警情',id:'xsjq',color:"#4AA5F0"},
    {name:'治安警情',id:'zajq',color : "#4CB6DA"},
    {name:'交通警情',id:'jtjq',color : "#4BC6DF"},
    {name:'消防警情',id:'xfjq',color : "#39A690"},
    {name:'群众求助',id:'qzqz',color : "#428E66"},
    {name:'社会联动',id:'shld',color : "#50A455"},
    {name:'群体事件',id:'qtsj',color : "#74B353"},
    {name:'灾害事故',id:'zhsg',color : "#9CD765"},
    {name:'举报线索',id:'jbxs',color : "#BBE779"},
    {name:'投诉监督',id:'tsjd',color : "#DCE678"},
    {name:'其他报警类别',id:'qt',color : "#FDF697"},
    ];
    for(var i=0;i<dataNew.length;i++){
      for(var j=0;j<dataArr.length;j++ ){
        if(dataNew[i].ajlbmc==dataArr[j].name){
          dataArr[j].value=dataNew[i].cs;//数量
          break;
         }
       }
    }
    return dataArr;
}

/**2.操作警情类型相关方法**/
//获取已选的警情类型
function CheckedType(){    
    var type = "";
    $('.clounm1 input[type=checkbox]:checked').each(function(){
         type += $(this).val() + ",";             
    });
    return type;
}

//点击警情分析类别之后刷新表格和环形图数据
var JQstate=null;
function tableAndHuanxingtuForType(){
     $('.clounm1 input[type=checkbox]:checked').on("click", function(){  
        if(JQstate!=null){       
          clearTimeout(JQstate);//多次点击时清除前几次记录
        }
        JQstate=setTimeout(function () {    
             TimeOutOfJingQing();
        }, 1000); 
        function TimeOutOfJingQing(){
             var type=CheckedType();
             var time=getTimeRange();
             var addr=$(".selectAddress").val();
             if(flagpoc==1){
                //  getTotalCountByCategory(map,hgjqposition);
                  if(time!=0){
                      dataOfAddTime(addr,time,"p");//刷新表格数据
                      sohData(type,addr,time);     //刷新环形图数据
                  }else if(time==0){
                      time=ziDingYiTime();
                      dataOfAddTime(addr,time,"p");
                      sohData(type,addr,time);  
                  }

             }else if(flagpoc==0){
                  getTotalCountByCategory(map,hgjqposition);
                  if(time!=0){
                      if(addr==area){//area是当前区(全局变量)，addr地点下拉框的value值
                          dataNullOfTable();
                          sohData(type,area,time);
                          dataOfAddTime(area,time,"p");
                          map.closeInfoWindow();
                      }else{
                          dataOfAddTime(area,time,"c",addr); 
                          sohData(type,area,time,addr);
                      }  
                  }else if(time==0){
                      time=ziDingYiTime();
                      if(addr==area){//area是当前区(全局变量)，addr地点下拉框的value值
                           dataNullOfTable();
                           sohData(type,area,time);
                           dataOfAddTime(area,time,"p");
                           map.closeInfoWindow();
                      }else{
                           dataOfAddTime(area,time,"c",addr); 
                           sohData(type,area,time,addr);
                      }
                  }
             }
        }
     })
}

/**3.操作时间、地点下拉框相关方法**/
//获取自定义时间作为参数
function  ziDingYiTime(){  
  var startTime=document.getElementById('input-append date starttime').value;
    var endTime=document.getElementById('input-append date endtime').value;
    time=startTime+"&endTime="+endTime;
    return time;
}

//获取时间范围  
function getTimeRange(){
  var time= $(".selectTime").val();
  return time;
}

//根据时间下拉框的值控制自定义时间输入框的颜色
function selectTimeStyle(){
   $("#selectTime").on('change',function(){
       var timeValue= $(this).children("option:selected").val();
       if(timeValue!=0){//非自定义时间的情况
           $(".form_datetime").css({"border":"1px solid #D8DDE7","background-color":"#F7FAFE","color":"#DCDEE2"});
           $(".timefont").css("color","#DCDEE2");
           $(".form_datetime").attr("disabled",true);  
           $(".img1 img").attr("src","./image/xialagray.png"); 
           $(".img2 img").attr("src","./image/xialagray.png");        
       }else{ //自定义时间的情况 
           $(".form_datetime").css({"border":"1px solid #58688B","background-color":"#F7FAFE","color":"#707070"});       
           $(".timefont").css("color","#707070");
           $(".form_datetime").attr("disabled",false);
           $(".img1 img").attr("src","./image/xiala.png"); 
           $(".img2 img").attr("src","./image/xiala.png"); 
           //加载时间控件
           $(".form_datetime").datetimepicker({
		       format: 'yyyy-mm-dd',
		       startView:2,
		       minView:2,
		       todayHighlight: true,
		       initialDate: new Date(),
		       autoclose:true,    
		    });
       }
   });
}

//点击时间下拉框，输入框显示相应的时间段
function  showStartAndEndTime(stratTime,endTime){
    var timeValue=$("#selectTime").val();
	if(timeValue!=0){
		document.getElementById("input-append date starttime").value=stratTime;
		document.getElementById("input-append date endtime").value=endTime;		
	}
}

//选择时间的下拉框列表刷新表格和环形图
function tableAndHuanxingtuForTime(){
         $(".selectTime").on('change',function(){
              var type=CheckedType();
              timeValue= $(this).children("option:selected").val();
              addressValue=$(".selectAddress").val();
              if(timeValue==0){
                  var timeValue=ziDingYiTime();
              }
              if(flagpoc==1){
                  getParentHeat();
                  area = addressValue;
                  dataOfAddTime(addressValue,timeValue,"p");
                  sohData(type,addressValue,timeValue);
              }else if(flagpoc==0){
                  if(addressValue==area){
                      for(var i=0;i<locations.length;i++){
                           if(area==locations[i].citys){
                                $(".selectAddress").html("");//子地图先清空地点下拉框，在子地图初始化时重新加载列表
                                initChildrenMap(map,locations[i]);//子地图瞄点 
                                break;
                           }
                      }
                      dataNullOfTable();
                      map.closeInfoWindow();
                  }else{
                      getChildHeat(area);
                      dataOfAddTime(area,timeValue,"c",addressValue);
                      sohData(type,area,timeValue,addressValue);
                  }
              }
         })
}

//选择自定义时间刷新表格和环形图
function tableAndHuanxingtuForZidingyiTime(){
     $(".input-append").on("change",function(){
          if($(this).attr("id") == "input-append date starttime"){
               mining.utils.serverLog(SVLOG.SELECT_TimeStart1 ); //SCOPA 3.0操作点记录
          }else{
               mining.utils.serverLog(SVLOG.SELECT_TimeEnd1 ); //SCOPA 3.0操作点记录
          }
          var type=CheckedType();
          var time=ziDingYiTime();
          var addr=$(".selectAddress").val();
          if(flagpoc==1){
              getParentHeat();
              dataOfAddTime(addr,time,"p");
              sohData(type,addr,time);  
          }else if(flagpoc==0){
              if(addressValue==area){
                 dataNullOfTable();
                 sohData(type,area,timeValue);
                 dataOfAddTime(area,time,"p");
                 map.closeInfoWindow();
              }else{
                 getChildHeat(area);
                 dataOfAddTime(area,time,"c",addr); 
                 sohData(type,area,time,addr);
              }
          }
          timeMotaikuang();
     })
}

//自定时间选择有误时弹出摸态框
function  timeMotaikuang(){ 
    var startTime=document.getElementById("input-append date starttime").value;
    var endTime=document.getElementById("input-append date endtime").value;   
    if(Number(startTime.replace(/-/g,""))>Number(endTime.replace(/-/g,""))){
        $(".tooltip-options a").tooltip({ //弹出摸态框
            html : true,
            title:"选择有误",
        });
        $(".tooltip-options a").tooltip('show');
        return;
    }else{
        $(".tooltip-options a").tooltip('hide');
    } 
}

//地区下拉框数据
function selecteAddress(locations){
     $(".selectAddress").html("");
	   $(".selectAddress").append("<option value='石家庄市'>石家庄市</option>");
     var k=0;
     for(var i=0;i<locations.length;i++){
    		 $(".selectAddress").append("<option  value="+locations[i].citys+">"+locations[i].citys+"</option>");  
             k++;
    }  
}

//选择地点的下拉框列表刷新表格和环形图
function tableAndHuanxingtuForAddr(){
      $(".selectAddress").on('change',function(){
          mining.utils.serverLog(SVLOG.SELECT_AreaLevel1);  //SCOPA 3.0操作点记录
          var type=CheckedType();
          timeValue= $(".selectTime").children("option:selected").val();
          var addressValue=$(".selectAddress").val();
          if(timeValue=="0"){
               timeValue=ziDingYiTime();
          } 
          if(flagpoc==1){ //父地图
                area=addressValue;
                style();
                for(var i=0;i<locations.length;i++){
                    if(addressValue==locations[i].citys){
                        initChildrenMap(map,locations[i]);//子地图瞄点 
                        dataNullOfTable();
                        sohData(type,addressValue,timeValue);
                        dataOfAddTime(addressValue,timeValue,"p");              
                    }
                }    
                if(addressValue=="石家庄市"){
                    map.closeInfoWindow();
                }
          }else if(flagpoc==0){  //子地图
                if(addressValue==area){
                     dataNullOfTable();
                     dataOfAddTime(area,timeValue,"p");
                     map.closeInfoWindow();
                }else{
                     dataOfAddTime(area,timeValue,"c",addressValue);
                }
                $(".BMap_Marker").each(function(){
                    if($(this).attr("title")==$(".selectAddress").find('option:selected').text()){ //地点下拉框和弹出框的标题相同时
                       $(this).trigger("click");  //再次点击弹出框消失
                    }
                });
          }
      })
}

//通过时间参数和地点参数查取数据
function dataOfAddTime(addressValue,timeValue,flag,ccitys){//参数意义：区县，时间，父子地图标志，派出所
    var url;
    var param;
    if(flag=="p"&&addressValue!="石家庄市"){//flag=="p"指父地图
          if(timeValue.indexOf("&endTime=") > 0&&addressValue!="石家庄市"){
               url=mining.baseurl.gongan + '/alarm/districts_single?district='+encodeURI(encodeURI("河北省石家庄市"+addressValue))+"&type=0&startTime="+timeValue;
          }else if(timeValue.indexOf("&endTime=") < 0&&addressValue!="石家庄市"){
               url=mining.baseurl.gongan + '/alarm/districts_single?district='+encodeURI(encodeURI("河北省石家庄市"+addressValue))+"&type="+timeValue;
          }
          param="";
    }else if(flag=="p"&&addressValue=="石家庄市"){
           if(timeValue.indexOf("&endTime=") > 0&&addressValue=="石家庄市"){
               url=mining.baseurl.gongan + "/alarm/city?type=0&startTime="+timeValue;
           }else if(timeValue.indexOf("&endTime=") ==-1&&addressValue=="石家庄市"){
               url=mining.baseurl.gongan + "/alarm/city?type="+timeValue;
           }
           param="shiJiaZhuang";
    }else if(flag=="c"){//flag=="c"指子地图
           if(timeValue.indexOf("&endTime=") > 0 ){
               url=mining.baseurl.gongan + '/alarm/districts_single/places_single?district='+encodeURI(encodeURI("河北省石家庄市"+addressValue))+"&type=0&startTime="+timeValue+"&place="+encodeURI(encodeURI(ccitys));
           }else{
               url=mining.baseurl.gongan + '/alarm/districts_single/places_single?district='+encodeURI(encodeURI("河北省石家庄市"+addressValue))+"&type="+timeValue+"&place="+encodeURI(encodeURI(ccitys));         
           }
           param="";
    }
    $.ajax({
          type:'get',
          url:url,
          dataType:'json',
          success:function(data){
              if(data.statusCode != 200){
                if(typeof(data.obj) == "undefined"){
                    $dialog.alert('出现错误，请稍后重试！\n' + data.message,'warning');
                    dataNullOfTable();
                    return;
                }
              }        
              if(data.obj===null || data.obj.data == null || data.obj.data.length == 0){
                  dataNullOfTable();
              }else{
                  fileterDate(data,param);
              }                
          },
          error:function(e){
              $dialog.alert('出现错误，请稍后重试！\n' + e.message,'warning');
              dataNullOfTable();
          }
    });
}

/**4.操作表格相关方法**/
//生成表格
function initTable(params){
    var mk={"举报线索":"jbxs","交通警情":"jtjq","其他报警类别":"qt","刑事警情":"xsjq", "投诉监督":"tsjd","治安警情":"zajq","消防警情":"xfjq","灾害事故":"zhsg","社会联动":"shld","群众求助":"qzqz","群体事件":"qtsj"}; 
    var udata = eval(params);
    $(".gridTbody").html("");
    var type=CheckedType();
    var ty=type.split(",");
    ty.pop();//方法用于删除并返回数组的最后一个元素。
    //拼接表格
    for(var i=0;i<udata.length;i++){      
        for(var key in mk){
            if(key==udata[i].ajlbmc && ty.indexOf(mk[key])>-1){
                $(".gridTbody").append("<tr class='"+mk[key]+"'><td style='width:100px;'>"+udata[i].ajlbmc+"</td>"+
                "<td style='width:90px;'>"+udata[i].cs+"</td>" +                             
                "<td class='tm"+i+"' style='width:70px;'>"+udata[i].tb+"</td>" +                              
                "<td class='hm"+i+"' style='width:70px;'>"+udata[i].hb+"</td></tr>");  
                break;
            }
        }  
    colorOfTableFont(i,udata[i].tb,udata[i].hb);
    }
}

//设置表格同比环比的颜色 ↑↓
function  colorOfTableFont(i,tb,hb){
    //同比	
    if(tb.indexOf("NA")!=-1){
          $(".tm"+i).css("color","black");
    }else if(tb=="0"){
          $(".tm"+i).css("color","black");
          $(".tm"+i).append("%");
    }else{
		 if(tb.indexOf("-")!=-1){
		    var tb=tb.substring(1,tb.length);
		    var t=tb+"%";
		    $(".tm"+i).html(t);
		    $(".tm"+i).prepend("↓");
		    $(".tm"+i).css("color","green");
		  }
		  else{
		    $(".tm"+i).prepend("↑");
		    $(".tm"+i).append("%");
		    $(".tm"+i).css("color","red");
		  }
    }
    //环比 
    if(hb.indexOf("NA")!=-1){
          $(".hm"+i).css("color","black");
    }else if(hb=="0"){
          $(".hm"+i).css("color","black");
          $(".hm"+i).append("%");
    }else{
		  if(hb.indexOf("-")!=-1){ 
		    var hb=hb.substring(1,hb.length);
		    var h=hb+"%";
		    $(".hm"+i).html(h);
		    $(".hm"+i).prepend("↓");
		    $(".hm"+i).css("color","green");
	      }else{
		    $(".hm"+i).prepend("↑");
		    $(".hm"+i).append("%");
		    $(".hm"+i).css("color","red");
		  }
    } 
}

//表格数据为空时，显示没有相关数据
function dataNullOfTable(){
	$(".gridTbody").html("");
	$(".gridTbody").append("<tr><td colspan='4'><div style='text-align:center;font-size:16px;'>没有相关数据！！！</div></td></tr>");  
}

/**5.样式处理**/
//地图详情弹出框的内部样式设置
function style(){
  $("#myChart").parent().css({   
      "background-color": "#FBFBFC",
      "padding-left": "10px"  
    }); 
  $(".BMap_bubble_title").parent().css({
      "top": "0px",
      "left": "0px",
      "width":"360",
      "height":"150",
      "background-color": "#FBFBFC"
    }); 
  $(".BMap_bottom").css({
       "width":"0",
       "background-color": "#FBFBFC"
    });
}