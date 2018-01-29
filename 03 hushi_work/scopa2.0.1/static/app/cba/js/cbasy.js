/* 页面级别的变量 */
var baseUrl = mining.baseurl.apphost + '/';
//var baseUrl = "http://d25.mlamp.co:5000/";      //请求接口所使用的URL共通部分
//var baseUrl = "http://qbbigdata.sjzs.eb:5000/"; 
//var baseUrl = "http://10.25.192.110:5000/";
var SVLOG_BASE = 300;  							//scopa 3.0操作点记录用ID base
var SVLOG = {
	LIST_ClickType1: SVLOG_BASE+51,
	LIST_ClickType2: SVLOG_BASE+52,
	LIST_ClickType3: SVLOG_BASE+53,
	LIST_ClickSearch: SVLOG_BASE+54,
	LIST_CasesChange: SVLOG_BASE+55,
	LIST_OpenFile: SVLOG_BASE+56,
	LIST_DeepMining: SVLOG_BASE+57
};

window.onload=function(){
	 impSearch();
	 getTypeData("诈骗");
	 mining.utils.serverLog(SVLOG.LIST_ClickType1);	//SCOPA 3.0操作点记录
	 setTypeButtonStyle ();
	 initScollar();
}

    //打开弹出框
    function openDialog(title1,text){
		var d = $dialog({
		width: 350  ,
		title: title1,
		content: text
		});
		d.showModal();
		
}

	//颜色淡蓝色
	function initScollar(){
		$("#scl2").mCustomScrollbar({
			theme:'minimal',
		});
		$("#cenTexta").mCustomScrollbar({
			theme:'minimal'
		});
	}
	
	//跳转到案件关键字搜索
	function impSearch(){
		$("#btn_sure").on("click",function(){
			keywordSearch("");
			mining.utils.serverLog(SVLOG.LIST_ClickSearch);	//SCOPA 3.0操作点记录
		});
		$("#goApp").on("click", window.top.mining.utils.toAppHome);
	}
	
	//案件搜索页面
	 function keywordSearch(caseID){
		 	localStorage.setItem("caseID",caseID);
			sessionStorage.setItem("bread","案件搜索");
			var myurl="cbevent.html";
			window.location.assign(encodeURI(myurl));
	}

	  //打开文档
		  function openFile(id){
		  	var option = {
				url: mining.baseurl.core +'/query/getVertexByIndex',
			    data: {
			        value: id,
			        index: 'key'
			    },
			    success: function (data) {
			    	if(mining.utils.isEmpty(data.v)){
			    		$dialog.alert('未获取到数据，请稍后重试！','warning');
			    		return;
			    	}
					SCOPA_showModule.show(data, 'file', '1');
			    },
			    error: function (data) {
			        //TODO
			    } 
			}
		  	$ajax ? $ajax.ajax(option) : $.ajax(option); 
			mining.utils.serverLog(SVLOG.LIST_OpenFile);	//SCOPA 3.0操作点记录
		  }
	  
	  //跳转到深度挖掘
	  function deepWajue(caseID){
			localStorage.setItem("caseID",caseID);
			sessionStorage.setItem("bread","深度挖掘");
			mining.utils.serverLog(SVLOG.LIST_DeepMining);	//SCOPA 3.0操作点记录
			var myurl="cbevent.html";
			window.location.assign(encodeURI(myurl));
	  }
	  
	  //点击菜单
	  function getTypeData(type){//type:zp  qj dq
		  if(type == '诈骗') mining.utils.serverLog(SVLOG.LIST_ClickType1);	//SCOPA 3.0操作点记录
		  if(type == '抢劫') mining.utils.serverLog(SVLOG.LIST_ClickType2);	//SCOPA 3.0操作点记录
		  if(type == '盗窃') mining.utils.serverLog(SVLOG.LIST_ClickType3);	//SCOPA 3.0操作点记录
		  
		mining.utils.modalLoading();
	  	$.ajax({
	  		type:"get",
	  		url :baseUrl + "get_type_series",
	  		data:{type:type},
	  		dataType : "json",
	  		success : function(data) {
	  			//console.log(data.result);
	  			var data=eval(data);
	  			if(data.result.length==0){
					drawNoDataTab("");
					mining.utils.modalLoading('close');
	  				return;
	  			}
	  			drawPicture(data);//左边改变，默认第一个选中
	  			draw(data.result[0].series);
				mining.utils.modalLoading('close');
	  		},
			error: function(e) {
				drawNoDataTab(e.error);
				mining.utils.modalLoading('close');
			}
	  	});
	  }
	  
	   //页面初始加载的数据
		function draw(ta){
			$("#detailInfor").html("");			
			$("#detailInfor").append("<tr><th style='width: 100px;'>编号</th> <th style='width: 100px;'>特征标签</th><th style='width: 100px;'>涉案人员</th><th style='width: 400px;'>案件概述</th><th style='width: 100px;'>操作</th></tr>");			
			for(var i=0;i<ta.length;i++){
				//var caseID=JSON.stringify(ta[i].caseID);
				if(i >= 18) break;	//只显示18个关联案件
				
				if(ta[i].text.length>100){
					ss = "<a  style='text-decoration:none; color:#161726;' name='" + ta[i].text + "' onclick='openDialog(\"案件描述\",this.name)'>" + ta[i].text.substring(0,100)+"…</a>";
				}else{
					ss = "<a  style='text-decoration:none; color:#161726;' name='" + ta[i].text + "' onclick='openDialog(\"案件描述\",this.name)'>" + ta[i].text+"</a>";
				}
					$("#detailInfor").append(
						  "<tr><td style='display:none'>"+
						             ta[i].caseID+
						  "</td><td>"+ta[i].idx+"</td>"+
						  "<td>"+getCharactericLabels(ta[i])+"</td>"+
						  "<td>"+ ta[i].persons+ "</td>"+
						  "<td align=left>"+ss+ "</td>"+
						  "<td><input id='"+ta[i].caseID+"' class='button3' type='button'  value='打开档案' onclick='openFile(this.id)'><br><input class='button4' type='button'  value='深度挖掘' onclick='deepWajue(\""+ta[i].caseID+"\")'></td>"+
						  "</tr>"
					);
			}

		}
	  
	    //无数据的提示
	  	function drawNoDataTab(err){
			$("#cenText").html("<em>此页面没有数据。</em><p>可能是因为网络故障等原因出现了数据取得异常的情况，请刷新重试。"
			+ "如果问题不能解决，请联系运维团队。<br/>以下是服务器端返回的消息：<br/>" + err);
			$("#detailInfor").html("");	
		}
	    
		//拼接图片
		function drawPicture(data){
			//console.log(data);
			$("#cenText").html("");
			var zaj_num=data.result;
			if(zaj_num.length == 0) {
   		        drawNoDataTab("");
   		        return;
   		    }
	    	for(var i=0;i<zaj_num.length;i++){
				var ss = "案件特征描述 案件特征描述";
				if(zaj_num[i].series.length > 0){
					ss = zaj_num[i].series[0].keywords.join(" ");
					ajbh = zaj_num[i].series[0].caseID;
				}
				
				var selstr
				if(i==0) selstr=" selected";
				else selstr = "";
				
				var caseCount;
				caseCount = zaj_num[i].series.length;
				if(caseCount > 18) caseCount = 18;
				
				$("#cenText").append(
						"<div class='case-div" + selstr + "' id='cenText"+i+"'>"+
						"<div class='card-right" + selstr + "'>共<span id='span2'>"+caseCount+"</span>个案件</div>"+
						"<div class='card-left'>"+      
                               "<div class='card-left-top' >"+	   
							         "<div class='card-left-left"+ selstr+"' style='width:40px;padding-top:0px;float:left;'>&nbsp;</div>"+
									 "<div class='card-left-right"+ selstr+"' style='float:left;'>案件编号：&nbsp;"+ ajbh +"</div>"+
							   "</div><br>"+
							   "<div class='card-left-bottom" + selstr + "'>"+ ss +"</div>"+
                        "</div>"+
						"<div class='cl'></div></div>"
				 );
				 
				 $("#cenText"+i).click(zaj_num[i].series, function(evt){
					 $(this).addClass("selected");
					 $(this).siblings().removeClass("selected");
					 $(this).children(".card-left").children(".card-left-top").children(".card-left-left").addClass("selected");
					 $(this).siblings().children(".card-left").children(".card-left-top").children(".card-left-left").removeClass("selected");
					 $(this).children(".card-left").children(".card-left-top").children(".card-left-right").addClass("selected");
					 $(this).siblings().children(".card-left").children(".card-left-top").children(".card-left-right").removeClass("selected");
					 $(this).children(".card-left").children(".card-left-bottom").addClass("selected");
					 $(this).siblings().children(".card-left").children(".card-left-bottom").removeClass("selected");
					 $(this).children(".card-right").addClass("selected");
					 $(this).siblings().children(".card-right").removeClass("selected");
					 draw(evt.data);
				 });
			}
		}		
		
		function getCharactericLabels(case_info)
		{
			if(case_info.keywords == undefined){
				return case_info.type;
			}
			var kws = case_info.keywords;
			
			var resultStr = "<a style='text-decoration:none; color:#161726;' name='";
			var resultAbbrv = "";
			for(i=0; i<kws.length; i++){
				resultStr += kws[i];
				if(i!=kws.length-1){
					resultStr +=  "，";
				}
				if(resultAbbrv.length < 30){
					resultAbbrv += kws[i];
					if(i!=kws.length-1)
						resultAbbrv += "，";
				}
			}
			
			if(resultAbbrv.length < 30){
				return resultAbbrv;
			}
			resultAbbrv += "…";
			resultStr += "' onclick='openDialog(\"特征标签\",this.name)'>" + resultAbbrv + "</a>";
			return resultStr;
		}
		
		
		//点击菜单样式变换
		 function setTypeButtonStyle(){
			  $("#nav ul li").click(function(){
			    	$(this).addClass("selected");
			    	$(this).siblings().removeClass("selected");
			  });
			  $(zp).addClass("selected");
			 // $("#nav ul li a").click(function(){
			    	// $("#nav ul li a").each(function(){
			    		// $(this).css("color",'#7FC5FF');
			    	// });
			    	// $(this).css("color",'#fff');
			  // });
		}
	  