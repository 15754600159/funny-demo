
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


window.onload =function() {
   initData();
   $('.tooltip-toggle').tooltip('toggle');

}

function initData(){//初始化页面这个时候只放表格数据
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
			initBaiduMap();
			initKj();
			if(data.obj == null || data.obj.data == null){
			  $(".gridTbody").html("");
			  $(".gridTbody").append("<tr><td colspan='4'><div style='text-align:center;font-size:16px;'>没有相关数据！！！</div></td></tr>");  
			}else{
			  fileterDate(data,"i");
			}
		},
		error:function(e){
			$dialog.alert('出现错误，请稍后重试！\n' + e.message,'warning');
		}
    });   
 
}  
//var lc;
var area;
var flagpoc;//判断是父地图还是子地图
//var mining = {"baseurl":{"gongan":"http://10.10.18.120/sjz/gongan"}};

/*初始化地图*/ 
var locations;
var map;
function initBaiduMap(data){
    flagpoc=1;
	//支持缩放、拖动、鼠标点上去显示区域案件情况、点击区域下钻到本区域的地图、每个区域有柱状图{}
     map = new BMap.Map("map",{minZoom:11,maxZoom:14,enableMapClick:false});          // 创建地图实例  
    /*map.setMapStyle({style:'grayscale'});//现场离线地图不支持自定义地图样式*/
    var point = new BMap.Point(114.520828,38.048684);  // 创建点坐标  
    map.centerAndZoom(point, 11);// 初始化地图，设置中心点坐标和地图级别  
    //map.enableScrollWheelZoom(false); //鼠标滚轮地图大小改变
	map.disableScrollWheelZoom();
    var b = new BMap.Bounds(new BMap.Point(112.713792,36.618505),new BMap.Point(116.836487,39.428776));// 范围 左下角，右上角的点位置
	try {	
		BMapLib.AreaRestriction.setBounds(map, b);//map为中心，b为范围
	} catch (e) {
	}
    //在地图上绘制标注
	    $.ajax({   //图片做好后用这个方法
    	type:'get',
    	url:'./json/sjzqh.json',
    	dataType:'json',
		async: false,
    	success:function(data){
    		locations = data.area;
    		var markimgs=["sjzqu.png"];
    	    makePoints(map,locations,markimgs); //在地图上瞄点			
			selecteAddress(locations);//初始化区域的下拉列表
    	},
		error:function(e){
			$dialog.alert('出现错误，请稍后重试！\n' + e.message,'warning');
		}
    });  
}
//传入坐标绘制标注和点击标注触发的事件
function makePoints(map,locations,markimgs){
    for(var i=0;i<locations.length;i++){
       var pt = new BMap.Point(locations[i].postion[0],locations[i].postion[1]);
       var myIcon = new BMap.Icon("./image/"+markimgs[0], new BMap.Size(29, 40));
       var marker = new BMap.Marker(pt,{icon: myIcon,offset: new BMap.Size(0, -20)});
	   marker.setTitle(locations[i].citys);
	   var opts = {
				  position : pt,    // 指定文本标注所在的地理位置
				  offset   : new BMap.Size(-28, -5)    //设置文本偏移量
		};
	   var label = new BMap.Label(locations[i].citys, opts);  // 创建文本标注对象
	   label.setStyle({
			 "color" : "black",
			 "fontSize" : "20px",
			 "fontWeight":"bold",
			 "width": "60px",
			"height" : "25px",
			 "lineHeight" : "20px",
			 "fontFamily":"微软雅黑",
			 "border":"0",
	   });
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
	/* map.addEventListener("zoomend", function(){
			if(map.getZoom()==14){
				var addr=$(".selectAddress").val();
				
				initChildrenMap(map,locations,marker)
			}
	} */	
}
function addClickHandler(content,marker,map,id,locations,clocations){
    var infoWindow = new BMap.InfoWindow(content,{
    	boxStyle:{
    		width: "270px",
    		height: "300px"
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
			mining.utils.serverLog(SVLOG.MAP_ClickLevel1);	//SCOPA 3.0操作点记录
        });
    }else{
        marker.addEventListener('click',function(e){
        	$(".selectAddress").val(locations.citys);
            openInfo(infoWindow,e,map,id,locations,marker);
        });
    }
}

function openInfo(infoWindow,e,map,id,locations,marker,clocations){//点击事件触发弹出框
    var p=e.target;
    var point = new BMap.Point(p.getPosition().lng, p.getPosition().lat);   
    map.openInfoWindow(infoWindow,point);
    var type = "";
    $('.clounm1 input[type=checkbox]:checked').each(function() {
        type += $(this).val() + ",";             
    });
    var time= $(".selectTime").val();
    style();
    $("#"+id).on('click',function(){//点击详情按钮初始化子区域,修改面包屑导航，初始化子地图，和table上方的下拉列表
		mining.utils.serverLog(SVLOG.MAP_InfoClickDetail);	//SCOPA 3.0操作点记录
        area=locations.citys;
        initChildrenMap(map,locations,marker);//子地图瞄点 
    });
    if(id!="c"){
         if(time==0){
           var startTime=document.getElementById('input-append date starttime').value;
           var endTime=document.getElementById('input-append date endtime').value;
           time=startTime+"&endTime="+endTime;
         }
         $(".gridTbody").html("");
         $(".gridTbody").append("<tr><td colspan='4'><div style='text-align:center;font-size:16px;'>没有相关数据！！！</div></td></tr>");  
          sohData(type,locations.citys,time);
          dataOfAddTime(locations.citys,time,"p");
    }else{ //子地图打开时候，点击上面的节点，要考虑两种情况，自定义和事件定值
         if(time==0){
           var startTime=document.getElementById('input-append date starttime').value;
           var endTime=document.getElementById('input-append date endtime').value;
           time=startTime+"&endTime="+endTime;
         }
         $(".gridTbody").html("");
         $(".gridTbody").append("<tr><td colspan='4'><div style='text-align:center;font-size:16px;'>没有相关数据！！！</div></td></tr>"); 
         sohData(type,locations.citys,time,clocations);
         dataOfAddTime(locations.citys,time,"c",clocations);
    }  
}
function initChildrenMap(map,locations,marker){
    flagpoc=0;
   //var area = $("#pied p").html();
   map.panTo(new BMap.Point(locations.postion[0],locations.postion[1]));
   map.setZoom(14);
   //map.addEventListener("zoomend", function(){
	    //mining.utils.serverLog(SVLOG.MAP_ZoomInOut);	//SCOPA 3.0操作点记录
        if(map.getZoom()==14){
        	if($(".breadcrumb li:eq(2)").text()===""){
        		$(".breadcrumb").append("<li>"+locations.citys+"</li>");
				$("#goUp").css("cursor","pointer");
				$("#goUp").on('click',function(){
					$(".breadcrumb li:eq(2)").remove();
					$("#goUp").css("cursor","");
					$("#goUp").off('click');
					initData();
				});
        	}
        	map.clearOverlays();
        	var time=$(".selectTime").val();
			area=locations.citys;
        	var district=locations.citys;
        	var url;
        	if(time!=0){
        		url=mining.baseurl.gongan + "/alarm/districts_single/places?type="+time+"&district="+encodeURI(encodeURI("河北省石家庄市"+district));
        	}else{
        		var startTime=document.getElementById('input-append date starttime').value;
                var endTime=document.getElementById('input-append date endtime').value;
                time=startTime+"&endTime="+endTime;
        		url=mining.baseurl.gongan + "/alarm/districts_single/places?type=0&startTime="+time+"&district="+encodeURI(encodeURI("河北省石家庄市"+district));
        	}
        	$.ajax({
        		type:"get",
        		url:url,
        		dataType:"json",
        		success:function(data){
					if(data.statusCode != 200){
						if(typeof(data.obj) == "undefined"){
						$dialog.alert('出现错误，请稍后重试！\n' + data.message,'warning');
							return;
						}
					} 
        			$(".selectAddress").html("");
				    $(".selectAddress").append("<option value="+area+">"+area+"</option>");
                    if(data.obj==null || data.obj.data==null || data.obj.data.length==0){
						
                        return;
                    }
                    var clocations=data.obj.data;
        			var places=[];
        			//$(".selectAddress").html("");
					//$(".selectAddress").append("<option value="+area+">"+area+"</option>");
					for(var i=0;i<clocations.length;i++){
						//$(".selectAddress").append("<option  value="+clocations[i].area+">"+clocations[i].area+"</option>");
						var place={};
						place.citys=clocations[i].area;
						places.push(place);
					}
        			$.ajax({
        				type:"get",
        				url:"./json/sjzpcs.json",
        				dataType:"json",
        				success:function(data){
							var citys=data.place;
        					var clocations=[];
        					for(var i=0;i<citys.length;i++){
        						for(var j=0;j<places.length;j++){
                                   var cys = citys[i].citys.split(",");
								   if(cys[0]==cys[1]){
									   if(places[j].citys.endsWith(cys[1])){
										citys[i].citys = cys[1];
        								clocations.push(citys[i]);
										$(".selectAddress").append("<option  value="+places[j].citys+">"+cys[1]+"</option>");
        								break;
        							}
								   }else{
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
        				},
						error:function(e){
							$dialog.alert('出现错误，请稍后重试！\n' + e.message,'warning');
						}
        			});
                    }
        		//}
        	});
        }else if(map.getZoom()==11){
			$(".breadcrumb li:eq(2)").remove();
			$("#goUp").css("cursor","");
			$("#goUp").off('click');
             initData();
        }
        map.closeInfoWindow(); 
   // }); 
	var type = "";
	$('.clounm1 input[type=checkbox]:checked').each(function() {
		 type += $(this).val() + ",";             
	});
    var addressValue= $(".selectAddress").val();
    var timeValue= $(".selectTime").children("option:selected").val();
	if(timeValue=="0"){//获取自定义的时间
        var startTime=document.getElementById('input-append date starttime').value;
        var endTime=document.getElementById('input-append date endtime').value;
        timeValue=startTime+"&endTime="+endTime;
    } 
	sohData(type,addressValue,timeValue);
	dataOfAddTime(addressValue,timeValue,"p");
}
function makePointChildren(map,locations,markimgs,clocations){//子地图瞄点
      for(var i=0;i<clocations.length;i++){
	       var pt = new BMap.Point(clocations[i].postion[0],clocations[i].postion[1]);
	       var myIcon = new BMap.Icon("./image/"+markimgs[0], new BMap.Size(29,40));
	       var marker = new BMap.Marker(pt, { icon: myIcon,offset: new BMap.Size(0, -20) });
		    marker.setTitle(clocations[i].citys);
			var len= clocations[i].citys.length;//获取派出所字符串长度
			var width= len *15 +"px";
			var offsetX=len*7;
			var opts = {
	    			  position : pt,    // 指定文本标注所在的地理位置
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
function gdChart(citys,time,ccitys){//点击地图某个点，发送请求获取石家庄市所有区的数据
		var url;
		$("#syaj").html("");
		var redata;
		var mk={"举报线索":"pjbxs","交通警情":"pjtjq","其他报警类别":"pqt","刑事警情":"pxsjq",
				"投诉监督":"ptsjd","治安警情":"pzajq","消防警情":"pxfjq","灾害事故":"pzhsg",
				"社会联动":"pshld","群众求助":"pqzqz","群体事件":"pqtsj"};
		if(ccitys!=""&&ccitys!=null){
			if(time.indexOf("&endTime=") > 0 ){
			   url=mining.baseurl.gongan + '/alarm/districts_single/places_single?district='+encodeURI(encodeURI("河北省石家庄市"+citys))+"&type=0&startTime="+time+"&place="+encodeURI(encodeURI(ccitys));
			}else{
				url=mining.baseurl.gongan + '/alarm/districts_single/places_single?district='+encodeURI(encodeURI("河北省石家庄市"+citys))+"&type="+time+"&place="+encodeURI(encodeURI(ccitys));
			}
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
							$(".gridTbody").html("");
							$(".gridTbody").append("<tr><td colspan='4'><div style='text-align:center;font-size:16px;'>没有相关数据！！！</div></td></tr>");
							return;
						}
						var boxData=data.obj.data.data;
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
		}else{
			if(time.indexOf("&endTime=") > 0 ){
				url=mining.baseurl.gongan + '/alarm/districts_single?district='+encodeURI(encodeURI("河北省石家庄市"+citys))+"&type=0&startTime="+time;
			}else{
			   url=mining.baseurl.gongan + '/alarm/districts_single?district='+encodeURI(encodeURI("河北省石家庄市"+citys))+"&type="+time;
			}
			$.ajax({
				type:'get',
				url:url,
				async:false,
				success:function(data){
			   if(data.statusCode != 200){
					if(typeof(data.obj) == "undefined"){
					$dialog.alert('出现错误，请稍后重试！\n' + data.message,'warning');
						return;
					}
				} 
			   if(data.obj==null || data.obj.data==null ||data.obj.data.data==null){
					$(".gridTbody").html("");
                    $(".gridTbody").append("<tr><td colspan='4'><div style='text-align:center;font-size:16px;'>没有相关数据！！！</div></td></tr>");
					return;
				}
				var boxData=data.obj.data.data;         
				console.log("boxData..."+JSON.stringify(boxData));
				for(var i=0;i<boxData.length;i++){ 
					for(var key in mk){
						if(key==boxData[i].ajlbmc){
							$("#syaj").append("<div style='width:100px;float:left;' class='p"+mk[key]+"'>"+boxData[i].ajlbmc+":"+boxData[i].cs+"</div>");           
						//	$("#syaj").append("<div style='width:100px;float:left;' class='p"+mk[key]+"'>"+boxData[i].ajlbmc+":"+boxData[i].cs+"</div>");           
							break;
						}
					}
					
				}
				//var dataNew = data.obj.data.data;
					redata= getPieData(boxData);
				},
				error:function(e){
					$dialog.alert('出现错误，请稍后重试！\n' + e.message,'warning');
				}
			});
	  }

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

function getPieData(dataNew){
     var dataArr = [
	{
        name:'刑事警情',
        id:'xsjq',
		color:"#4AA5F0"
	},
	{
        name:'治安警情',
        id:'zajq',
		color : "#4CB6DA"
	},
	{
        name:'交通警情',
        id:'jtjq',
		color : "#4BC6DF"
	},
	{
        name:'消防警情',
        id:'xfjq',
		color : "#39A690"
	},
	{
        name:'群众求助',
        id:'qzqz',
		color : "#428E66"
	},
    {
        name:'社会联动',
        id:'shld',
		color : "#50A455"
	},
    {
        name:'群体事件',
        id:'qtsj',
		color : "#74B353"
	},
      {
        name:'灾害事故',
        id:'zhsg',
		color : "#9CD765"
	},
      {
        name:'举报线索',
        id:'jbxs',
		color : "#BBE779"
	},
      {
        name:'投诉监督',
        id:'tsjd',
		color : "#DCE678"
	},
      {
        name:'其他报警类别',
        id:'qt',
		color : "#FDF697"
	},
];
 /*for(var i=0;i<dataNew.length;i++){
     dataArr[i].value=dataNew[i].cs;
 }*/
 
 for(var i=0;i<dataNew.length;i++){
	 for(var j=0;j<dataArr.length;j++ ){
		 if(dataNew[i].ajlbmc==dataArr[j].name){
			 dataArr[j].value=dataNew[i].cs;
			 break;
		 }
	 }
 }
 return dataArr;
}
function initChart(params){
	if(document.getElementById("myChart")==null){
		return;
	}
    var ctx = document.getElementById("myChart").getContext("2d");
    new Chart(ctx).Doughnut(params,{
    			segmentShowStroke : false,
    });
}
/*在table中显示数据(建议采用 bootstrapTable)
 * 格式为：{区域：[案件:数量]}
 * 如 {"桥西区":["刑事":20,"治安"：1500,"盗窃":1100,"诈骗":50],
 *    "新华区":["刑事":20,"治安"：1500,"盗窃":1100,"诈骗":50]}
 *表格注意滚动条 ,点击地图上某个区域，表格对应列高亮，如果不在表格当前，表格此条数据滚上来
 *注意没有数据的提示
 * */
function initTable(params){
    var udata = eval(params);
    $(".gridTbody").html("");
    var type = "";
    $('.clounm1 input[type=checkbox]:checked').each(function(){
         type += $(this).val() + ",";             
     });
    var ty=type.split(",");
    ty.pop();
    //拼接表格
    for(var i=0;i<udata.length;i++){ 
         var mk={"举报线索":"jbxs","交通警情":"jtjq","其他报警类别":"qt","刑事警情":"xsjq",
            "投诉监督":"tsjd","治安警情":"zajq","消防警情":"xfjq","灾害事故":"zhsg",
            "社会联动":"shld","群众求助":"qzqz","群体事件":"qtsj"}; 
             for(var key in mk){
                   if(key==udata[i].ajlbmc && ty.indexOf(mk[key])>-1){
                        $(".gridTbody").append("<tr class='"+mk[key]+"'><td style='width:100px;'>"+udata[i].ajlbmc+"</td>"+
                                    "<td style='width:90px;'>"+udata[i].cs+"</td>" +                             
                                    "<td class='tm"+i+"' style='width:70px;'>"+udata[i].tb+"</td>" +                              
                                    "<td class='hm"+i+"' style='width:70px;'>"+udata[i].hb+"</td></tr>");  
                        break;
                   }
              }   
        //设置表格同比环比的颜色 ↑↓
       if(udata[i].tb.indexOf("NA")!=-1){
        	$(".tm"+i).css("color","black");
        }else if(udata[i].tb=="0"){
          $(".tm"+i).css("color","black");
          $(".tm"+i).append("%");
        }else{
		       if(udata[i].tb.indexOf("-")!=-1){
		            var tb=udata[i].tb.substring(1,udata[i].tb.length);
		            var t=tb+"%";
		            $(".tm"+i).html(t);
		            $(".tm"+i).prepend("↓");
		            $(".tm"+i).css("color","green");
		       }else{
		             $(".tm"+i).prepend("↑");
		             $(".tm"+i).append("%");
		             $(".tm"+i).css("color","red");
		       }
        } 
        
        
        if(udata[i].hb.indexOf("NA")!=-1){
        	$(".hm"+i).css("color","black");
        }else if(udata[i].hb=="0"){
          $(".hm"+i).css("color","black");
          $(".hm"+i).append("%");
        }else{
		       if(udata[i].hb.indexOf("-")!=-1){ 
		            var hb=udata[i].hb.substring(1,udata[i].hb.length);
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
 
}
function initKj(){
	//初始化括复选框、下拉菜单、日期控件、面包屑导航
   $(".form_datetime").datetimepicker({
       format: 'yyyy-mm-dd',
       startView:2,
       minView:2,
       todayHighlight: true,
       initialDate: new Date(),
       autoclose:true,    
    });
    initTime();
    selecttime();
    selectAddressAndTime("p");
	
    $("#goApp").on("click", function(){
		window.top.mining.utils.toAppHome();
	});
	
    $('.clounm1 input[type=checkbox]:checked').on("click", function(){
           var type = "";
           $('.clounm1 input[type=checkbox]:checked').each(function(){
                type += $(this).val() + ",";             
            });         
            var time= $(".selectTime").val();
            var addr=$(".selectAddress").val();
            if(flagpoc==1){
            	if(time!=0){
            		dataOfAddTime(addr,time,"p");
                    sohData(type,addr,time);  
            	}else if(time==0){
            		var startTime=document.getElementById('input-append date starttime').value;
                    var endTime=document.getElementById('input-append date endtime').value;
                    time=startTime+"&endTime="+endTime;
            		dataOfAddTime(addr,time,"p");
                    sohData(type,addr,time);  
            	}
            	
            }else if(flagpoc==0){
            	if(time!=0){
					 if(addr==area){
						$(".gridTbody").html("");
						$(".gridTbody").append("<tr><td colspan='4'><div style='text-align:center;font-size:16px;'>没有相关数据！！！</div></td></tr>");  
						sohData(type,area,time);
						dataOfAddTime(area,time,"p");
						map.closeInfoWindow();
					} else{
						dataOfAddTime(area,time,"c",addr); 
						sohData(type,area,time,addr);
					}
            	}else if(time==0){
            		var startTime=document.getElementById('input-append date starttime').value;
                    var endTime=document.getElementById('input-append date endtime').value;
                    time=startTime+"&endTime="+endTime;
					if(addr==area){
						$(".gridTbody").html("");
						$(".gridTbody").append("<tr><td colspan='4'><div style='text-align:center;font-size:16px;'>没有相关数据！！！</div></td></tr>");  
						sohData(type,area,time);
						dataOfAddTime(area,time,"p");
						map.closeInfoWindow();
					}else{
						dataOfAddTime(area,time,"c",addr); 
						sohData(type,area,time,addr);
					} 
            	}
            	
            }
    });
	}
//选择某区的下拉框列表
function selecteAddress(locations){
     $(".selectAddress").html("");
	 $(".selectAddress").append("<option value='石家庄市'>石家庄市</option>");
     var k=0;
     for(var i=0;i<locations.length;i++){
    		 $(".selectAddress").append("<option  value="+locations[i].citys+">"+locations[i].citys+"</option>");  
             k++;
    }  
}
//选择某区的下拉框列表的value值并刷新表格
function selectAddressAndTime(params){
     var addressValue;
     var timeValue;
    $(".selectAddress").on('change',function(){
		mining.utils.serverLog(SVLOG.SELECT_AreaLevel1);	//SCOPA 3.0操作点记录
        var type = "";
        $('.clounm1 input[type=checkbox]:checked').each(function() {
             type += $(this).val() + ",";             
        });
        addressValue= $(this).val();
        timeValue= $(".selectTime").children("option:selected").val();
        if(timeValue=="0"){//获取自定义的时间
           var startTime=document.getElementById('input-append date starttime').value;
           var endTime=document.getElementById('input-append date endtime').value;
            timeValue=startTime+"&endTime="+endTime;
        }  
        if(flagpoc==1){ 
	    area=addressValue;
		style();
		for(var i=0;i<locations.length;i++){
			if(addressValue==locations[i].citys){
				initChildrenMap(map,locations[i]);//子地图瞄点 
				$(".gridTbody").html("");
				$(".gridTbody").append("<tr><td colspan='4'><div style='text-align:center;font-size:16px;'>没有相关数据！！！</div></td></tr>");  
				sohData(type,addressValue,timeValue);
				dataOfAddTime(addressValue,timeValue,"p");
				
			}
		}
        //dataOfAddTime(addressValue,timeValue,"p");
        }else if(flagpoc==0){
            if(addressValue==area){
				$(".gridTbody").html("");
				$(".gridTbody").append("<tr><td colspan='4'><div style='text-align:center;font-size:16px;'>没有相关数据！！！</div></td></tr>");  
				//sohData(type,area,timeValue);
				dataOfAddTime(area,timeValue,"p");
				map.closeInfoWindow();
			}else{
				
				dataOfAddTime(area,timeValue,"c",addressValue);
			}
			$(".BMap_Marker").each(function(){
				if($(this).attr("title")==$(".selectAddress").find('option:selected').text()){
					$(this).trigger("click");
				}
		});
        } 
		
    });
    $(".selectTime").on('change',function(){
       var type = "";
       $('.clounm1 input[type=checkbox]:checked').each(function() {
            type += $(this).val() + ",";             
       });
       timeValue= $(this).children("option:selected").val();
       addressValue=$(".selectAddress").val();
       if(timeValue==0){
           var startTime=document.getElementById('input-append date starttime').value;
           var endTime=document.getElementById('input-append date endtime').value;
           timeValue=startTime+"&endTime="+endTime;
        } 
        if(flagpoc==1){
			area = addressValue;
            dataOfAddTime(addressValue,timeValue,"p");
            sohData(type,addressValue,timeValue);
        }else if(flagpoc==0){

			if(addressValue==area){
				for(var i=0;i<locations.length;i++){
					if(area==locations[i].citys){
						$(".selectAddress").html("");
						initChildrenMap(map,locations[i]);//子地图瞄点 
						break;
					}
				}
				$(".gridTbody").html("");
				$(".gridTbody").append("<tr><td colspan='4'><div style='text-align:center;font-size:16px;'>没有相关数据！！！</div></td></tr>");  
				//initChildrenMap(map,locations[i]);//子地图瞄点
				sohData(type,area,timeValue);
				dataOfAddTime(area,timeValue,"p");
				map.closeInfoWindow();
			}else{
				dataOfAddTime(area,timeValue,"c",addressValue);
				sohData(type,area,timeValue,addressValue);
			}
		}
           
    });
    $(".input-append").on("change",function(){
		if($(this).attr("id") == "input-append date starttime"){
			mining.utils.serverLog(SVLOG.SELECT_TimeStart1 );	//SCOPA 3.0操作点记录
		}else{
			mining.utils.serverLog(SVLOG.SELECT_TimeEnd1 );	//SCOPA 3.0操作点记录
		}
        var type = "";
        $('.clounm1 input[type=checkbox]:checked').each(function(){
             type += $(this).val() + ",";             
         });
    	 var startTime=document.getElementById('input-append date starttime').value;
         var endTime=document.getElementById('input-append date endtime').value;
         time=startTime+"&endTime="+endTime;
         var addr=$(".selectAddress").val();
         if(flagpoc==1){
         	dataOfAddTime(addr,time,"p");
            sohData(type,addr,time);  
         }else if(flagpoc==0){
			 if(addressValue==area){
				$(".gridTbody").html("");
				$(".gridTbody").append("<tr><td colspan='4'><div style='text-align:center;font-size:16px;'>没有相关数据！！！</div></td></tr>");  
				sohData(type,area,timeValue);
				dataOfAddTime(area,time,"p");
				map.closeInfoWindow();
			}else{
				dataOfAddTime(area,time,"c",addr); 
				sohData(type,area,time,addr);
			}

         }
         if(Number(startTime.replace(/-/g,""))>Number(endTime.replace(/-/g,""))){
             $(".tooltip-options a").tooltip({ 
            	 html : true,
            	 title:"选择有误",
              });
             $(".tooltip-options a").tooltip('show');
        	return;
         }else{
        	 $(".tooltip-options a").tooltip('hide');
         }
    });  
}
//通过时间参数和地点参数查取数据
function dataOfAddTime(addressValue,timeValue,flag,ccitys){
		var url;
		if(flag=="p"&&addressValue!="石家庄市"){
		  if(timeValue.indexOf("&endTime=") > 0&&addressValue!="石家庄市"){
				url=mining.baseurl.gongan + '/alarm/districts_single?district='+encodeURI(encodeURI("河北省石家庄市"+addressValue))+"&type=0&startTime="+timeValue;
			}else if(timeValue.indexOf("&endTime=") < 0&&addressValue!="石家庄市"){
				url=mining.baseurl.gongan + '/alarm/districts_single?district='+encodeURI(encodeURI("河北省石家庄市"+addressValue))+"&type="+timeValue;
			}
			  $.ajax({
					type:'get',
					url:url,
					dataType:'json',
					success:function(data){
						if(data.statusCode != 200){
							if(typeof(data.obj) == "undefined"){
							$dialog.alert('出现错误，请稍后重试！\n' + data.message,'warning');
								return;
							}
						} 
						if(data.obj===null || data.obj.data == null || data.obj.data.data == null){
							$(".gridTbody").html("");
							$(".gridTbody").append("<tr><td colspan='4'><div style='text-align:center;font-size:16px;'>没有相关数据！！！</div></td></tr>");  
						}else{
							fileterDate(data,"");
						}                
					},
					error:function(e){
						$dialog.alert('出现错误，请稍后重试！\n' + e.message,'warning');
					}
			 });
		}else if(flag=="p"&&addressValue=="石家庄市"){
		  if(timeValue.indexOf("&endTime=") > 0&&addressValue=="石家庄市"){
			 url=mining.baseurl.gongan + "/alarm/city?type=0&startTime="+timeValue;
		  }else if(timeValue.indexOf("&endTime=") ==-1&&addressValue=="石家庄市"){
			 url=mining.baseurl.gongan + "/alarm/city?type="+timeValue;
		  }
			 $.ajax({
				 type:'get',
				 url:url,
				 dataType:'json',
				 success:function(data){
				   if(data.statusCode != 200){
						if(typeof(data.obj) == "undefined"){
						$dialog.alert('出现错误，请稍后重试！\n' + data.message,'warning');
							return;
						}
					} 
					 
					 if(data.obj===null || data.obj.data == null){           
						 $(".gridTbody").html("");
						 $(".gridTbody").append("<tr><td colspan='4'><div style='text-align:center;font-size:16px;'>没有相关数据！！！</div></td></tr>");  
					 }else{
						 fileterDate(data,"i");
					 }                
				 },
				error:function(e){
					$dialog.alert('出现错误，请稍后重试！\n' + e.message,'warning');
				}
		  });
		 }else if(flag=="c"){
			if(timeValue.indexOf("&endTime=") > 0 ){
			 url=mining.baseurl.gongan + '/alarm/districts_single/places_single?district='+encodeURI(encodeURI("河北省石家庄市"+addressValue))+"&type=0&startTime="+timeValue+"&place="+encodeURI(encodeURI(ccitys));
			}else{
			 url=mining.baseurl.gongan + '/alarm/districts_single/places_single?district='+encodeURI(encodeURI("河北省石家庄市"+addressValue))+"&type="+timeValue+"&place="+encodeURI(encodeURI(ccitys)); 	    	
			}	
				$.ajax({
					type:'get',
					url:url,
					dataType:'json',
					success:function(data){
						if(data.statusCode != 200){
							if(typeof(data.obj) == "undefined"){
							$dialog.alert('出现错误，请稍后重试！\n' + data.message,'warning');
								return;
							}
						} 
						
						if(data.obj===null || data.obj.data == null || data.obj.data.length == 0){
							$(".gridTbody").html("");
							$(".gridTbody").append("<tr><td colspan='4'><div style='text-align:center;font-size:16px;'>没有相关数据！！！</div></td></tr>");  
						}else{
							fileterDate(data,"");
						}                
					},
					error:function(e){
						$dialog.alert('出现错误，请稍后重试！\n' + e.message,'warning');
					}
			 });
		}
}
//过滤数据然后绘制表格 
function fileterDate(data,params){
    var tdata;
    var mdata;
	
	if(data.statusCode != 200){
		if(typeof(data.obj) == "undefined"){
	   $(".gridTbody").html("");
       $(".gridTbody").append("<tr><td colspan='4'><div style='text-align:center;font-size:16px;'>没有相关数据！！！</div></td></tr>");  
			 return;
		}
	}
	
    if(params=='i'){    //init时使用
        tdata=data.obj.data;
    }else if(params==""){
        tdata=data.obj.data.data;
    }else if(params=='c'){ //子地图使用
        tdata=data.obj.data[0].data;
    }else if(params=='spz'){//不用
    	tdata=data.obj.data;
    }
	var tvalue=$("#selectTime").val();
	if(tvalue!=0){
		var s=data.obj.start;
		var e=data.obj.end;
		document.getElementById("input-append date starttime").value=s;
		document.getElementById("input-append date endtime").value=e;		
	}
	initTable(tdata);
}
//复选框变化地图弹出框数据变化
function sohData(type,citys,time,cctiys){
    var data=gdChart(citys,time,cctiys);
	if(data==null){
		return;
	}
    var showType=type.split(",");
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
                selData.push(sel);
                break;
            }
        }
    }  
    initChart(selData);//环形图变化  
    $('.clounm1 input[type=checkbox]:checked').each(function() {
        $("."+$(this).attr("value")).css("display","");  
        $(".pp"+$(this).attr("value")).css("display",""); 
    });
    $('.clounm1 input:not(:checked)').each(function() {        
        $("."+$(this).attr("value")).css("display","none"); 
        $(".pp"+$(this).attr("value")).css("display","none");  
    });
    
}
//初始化自定义的时间
function initTime(){
	    // var myDate = new Date();
	    //var month=myDate.getMonth()+1;
		//if(month<10){
		//   var mm="0"+month;
		//}
		//else{
		//   var mm=month; 
		//}
		//var date=myDate.getDate();
		// if(date<10){
		//  var  dd="0"+date;
		//	}else{
		//   var dd=date;
		//   }
		//   var s = myDate.getFullYear()+"-"+mm+"-"+dd;
		//   var e = myDate.getFullYear()+"-"+mm+"-"+dd;
        //   document.getElementById("input-append date starttime").value=s;
		//   document.getElementById("input-append date endtime").value=e;			   
		//getStartAndEndTime();
}

//点击时间下拉框获取时间段
function f(){
	var tvalue=$("#selectTime").val();
	var url;
	if(tvalue==0){	
	}else{
		    if(tvalue==7){
				var  url1=mining.baseurl.gongan + "/alarm/city?type=7";//前七天时间	
				url=url1;
			}else if(tvalue==15){
				var  url2=mining.baseurl.gongan + "/alarm/city?type=15";//前15天时间 
				url=url2;
			}else if(tvalue==30){
				var  url3=mining.baseurl.gongan + "/alarm/city?type=30";//前30天时间
				url=url3;
			}else if(tvalue==90){
				var  url4=mining.baseurl.gongan + "/alarm/city?type=90"; //前三个月天时间
				url=url4;
			}else if(tvalue==180){
				var  url5=mining.baseurl.gongan + "/alarm/city?type=180"; //前半年天时间 
				url=url5;
			}
			
			$.ajax({
				type:"get",
				url:url,
				dataType:"json",
				success:function(data){
				  if(data.statusCode != 200){
					if(typeof(data.obj) == "undefined"){
					$dialog.alert('出现错误，请稍后重试！\n' + data.message,'warning');
						return;
					}
				  } 
					if(data.obj==null || data.obj.start==null ||data.obj.start=="undefined" || data.obj.end == null || data.obj.end=="undefined"){
						$(".gridTbody").html("");
						$(".gridTbody").append("<tr><td colspan='4'><div style='text-align:center;font-size:16px;'>没有相关数据！！！</div></td></tr>");
						return;
					}
					var s=data.obj.start;
					var e=data.obj.end;
					document.getElementById("input-append date starttime").value=s;
					document.getElementById("input-append date endtime").value=e;
				},
				error:function(e){
					$dialog.alert('出现错误，请稍后重试！\n' + e.message,'warning');
				}
			})
	}
}





//取得时间段的value值
function selecttime(){
   $("#selectTime").on('change',function(){
       var timeValue= $(this).children("option:selected").val();
       if(timeValue!=0){
           $(".form_datetime").css("border","1px solid #D8DDE7");
           $(".form_datetime").css("background-color","#F7FAFE");
           $(".form_datetime").css("color","#DCDEE2");
           $(".timefont").css("color","#DCDEE2");
           $(".form_datetime").attr("disabled",true);  
           $(".img1 img").attr("src","./image/xialagray.png"); 
           $(".img2 img").attr("src","./image/xialagray.png");        
       }else{         
           $(".form_datetime").css("border","1px solid #58688B");
           $(".form_datetime").css("background-color","#F7FAFE");
           $(".form_datetime").css("color","#707070");
           $(".timefont").css("color","#707070");
           $(".form_datetime").attr("disabled",false);
           $(".img1 img").attr("src","./image/xiala.png"); 
           $(".img2 img").attr("src","./image/xiala.png"); 
       }
	   //getStartAndEndTime();
   });
}
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
function getArea(){
	$.ajax({
		type:"get",
		url:"../json/area.json",
		dataType:"json",
		success:function(){
			
		}
	});
}