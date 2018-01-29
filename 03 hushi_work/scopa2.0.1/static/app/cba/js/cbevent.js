    /* 页面级别的变量 */
    var baseUrl = mining.baseurl.apphost + '/';
    //var baseUrl = "http://d25.mlamp.co:5000/";      
    //var baseUrl = "http://qbbigdata.sjzs.eb:5000/";      //请求接口所使用的URL共通部分
    //var baseUrl = "http://10.25.192.110:5000/";
    var index = 0;                                  //Tab页的面板ID，递增1
    var LIMIT_LENGTH = 100;                        	//限制表格内案件描述显示的最大字符数。
	var SVLOG_BASE = 300;  							//scopa 3.0操作点记录用ID base
	var SVLOG = {
		LIST_OpenFile: SVLOG_BASE+56,
		LIST_DeepMining: SVLOG_BASE+57,
		SEARCH_CaseAnalyze: SVLOG_BASE+58,
		SEARCH_KeywordsMining: SVLOG_BASE+59,
		MINING_AddKeyword: SVLOG_BASE+60,
		MINING_RemoveKeyword: SVLOG_BASE+61,
		MINING_CloseTab: SVLOG_BASE+62
	};

    //获取json文件的数据
	window.onload=function(){

		var title = sessionStorage.getItem("bread");
		mkBreadCrumb(title);

	    var caseID=localStorage.getItem("caseID");
	    if (caseID != ""){
	        loadRelatedCasesByID(caseID);
	    }
	    else {
	        var tab_panel = drawDataTab("案件搜索", function(){
				drawCaseContent(tab_panel, "");
				drawKeyWords(tab_panel, []);
				drawCasesTable(tab_panel, [], "");
				setButtonClick(tab_panel);
				initScrollBar(tab_panel);
				$("#myTab a:last").tab("show");
			});
	    }

	} 
	
	 //打开弹出框
    function openDialog(title1,text){
		var d = $dialog({
		width: 350,
		title: title1,
		content: text
		});
		d.showModal();
		
}
	
	//根据不同的跳转显示不同的面包屑导航
	function mkBreadCrumb(params){
		$("#goApp").on("click", window.top.mining.utils.toAppHome);
		$("#goParent").on("click", function(){
			window.location.assign(encodeURI("index.html"));
		});
		if(params=="案件搜索"){
			$(".breadcrumb").children('.active').html("案件搜索");
		}else{
			$(".breadcrumb").children('.active').html("深度挖掘");
		}
	}

    // 根据案件ID取得相关的案件信息
	function loadRelatedCasesByID(case_id) {
		var isOpened = false;
		var pannel;
		$(".placeholder").each(function(){
			if ($(this).text() == case_id) {
				isOpened = true;
				pannel = $(this).parent().attr("id");
				return;
			}
		});
		
		if(isOpened) {
			if(typeof(pannel) == "string" && pannel.substring(0, 5) == "panel")
			{
				$("#tab" + pannel.substring(5) + " a").tab("show");
			}
			return;
		}
		
		mining.utils.modalLoading();
	    $.ajax({
            type:   "get",
     		url:    baseUrl + "get_related_cases",
     		data:   {caseID:case_id, userId:mining.userinfo.user_id},
			async:	false,
     		dataType: "json",
     		success: function(result) {
     		    //console.log(result);
				mkBreadCrumb("");
				if(typeof(result.keywords) == "undefined"){
					//drawNoDataTab("");
					mining.utils.modalLoading('close');
     		        return;
				}
     		    if(result.keywords.length == 0 && result.result.length == 0) {
     		       // drawNoDataTab("");
					mining.utils.modalLoading('close');
     		        return;
     		    }

     		    var tab_title = result.casename;
     		    if(typeof(tab_title) == "undefined" || tab_title == ""){
     		        tab_title = case_id;
     		    }
     		    var tab_panel = drawDataTab(tab_title, function() {
					var cc = "";
					if(result.result.length > 0)
						cc = result.result[0].content;
					drawCaseContent(tab_panel, cc);
					drawKeyWords(tab_panel, result.keywords);
					drawCasesTable(tab_panel, result.result, case_id);

					setButtonClick(tab_panel);
					initScrollBar(tab_panel);
					$("#myTab a:last").tab("show");
				});
				mining.utils.modalLoading('close');
     		},
     		error: function(err){
     		    //drawNoDataTab(err.error);
				window.location.reload();
				mining.utils.modalLoading('close');
     		}
        });
	}

	//无数据的提示
	function drawNoDataTab(msg) {
		var html = "<em>页面未能正常加载。</em><p>可能是因为网络故障等原因出现了数据取得异常的情况，请刷新重试。"
		+ "如果问题不能解决，请联系运维团队。<br/>以下是服务器端返回的消息：<br/><span class=errmsg>" + JSON.stringify(msg) + "</span>";
		html="";
		if($('.tab-pane.fade.active.in').length > 0)
		{
			$('.tab-pane.fade.active.in').html(html);
		}
		else {
			$(".tab-content").html(html);
		}
	}
	
    //动态添加Tab页面
    function drawDataTab(tab_title, func)
    {
        index++;
        var html="<li id='tab"+index+"'><a href='#panel"+index+"' data-toggle='tab'>" +
                   "<img class='del-tab-sign' src='./image/chahao1.png' onclick='closeTab("+index+")'/>" +
                   tab_title + "</a></li>";
    	$("#myTab").append(html);

    	//添加Tab Panel，加载 tab-content.html
    	html = "<div class='tab-pane fade' id='panel"+index+"'></div>";
    	$(".tab-content").append(html);
    	$("#panel"+index).load("tab-content.html", func);

    	return "#panel"+index;
    }

    //删除Tab页
    function closeTab(tab_index)
    {
        if($("#myTab li").length==1){
        	return;
        }

        //删除Tab的pannel
        var pid = $("#panel"+tab_index);
        //console.log(pid);
        if(typeof(pid) == "object" && pid.length > 0)
            pid.remove();
		
        //删除tab标签
		var tab = $("#tab"+tab_index);
        //console.log(tab);
        if(typeof(tab) == "object" && tab.length > 0)
            tab.remove();

		mining.utils.serverLog(SVLOG.MINING_CloseTab);	//SCOPA 3.0操作点记录
		
        //激活另外一个标签
        $("#myTab a:last").tab("show");
    }

	// 为Tab上的button指定click处理函数
	function setButtonClick(tab_class){
        $(tab_class + " .btn-ana .center-button").click( function(){
            var caseContent = $(tab_class + " .left .content").text();
			if(caseContent.length == 0)
				return;
			mining.utils.serverLog(SVLOG.SEARCH_CaseAnalyze);	//SCOPA 3.0操作点记录
            $.ajax({
                type:"get",
                url: baseUrl + "direct_match_series",       //分析关键词
                data: {casetext:caseContent,
                        keywordonly:"true",
						userId:mining.userinfo.user_id},
             	dataType:"json",
             	success:function(data){
             	    var obj = data.keywords;
             		drawKeyWords(tab_class, obj);
					removeHighLightLable();
					highLightKeywords();
             	},
             	error:function(error){
             	}
            });
        });

        $(tab_class + " .btn-comb .center-button").click( function(){
            var tags=[];
            $(tab_class + " .keywords .kw-text").each(function(){
            	tags.push($(this).text());
            });

			if(tags.length == 0)
				return;
			
			mining.utils.serverLog(SVLOG.SEARCH_KeywordsMining);	//SCOPA 3.0操作点记录
            $.ajax({
                type:"get",
                url: baseUrl + "get_cases",             //根据关键词搜索案件
                data:{
					tags:JSON.stringify(tags),
					userId:mining.userinfo.user_id
				},
             	dataType:"json",
             	success:function(data){
             	    var obj = eval(data.result);
             	    console.info(obj);
             	    drawCasesTable(tab_class, obj, "");
             	},
             	error: function(error){

             	}
            });
        });
		
		$(tab_class + " .add-kw").click( function() {
			addKeyword(tab_class);
		});
	}

	// 为Tab动态创建滚动条
	function initScrollBar(tab_class){
        $(tab_class + " .left .content").mCustomScrollbar({
            theme:'dark'
        });
		
		$(tab_class + " .left .keywords-all").mCustomScrollbar({
            theme:'dark'
        });
		
		$(tab_class + " .right .table-footer").mCustomScrollbar({
            theme:'dark'
        });
	}

    // 显示主案件内容
    function drawCaseContent(tab_panel, content)
    {
        $(tab_panel + " .left .content").html(content);
		changeButtonState(tab_panel);
		$(tab_panel + " .left .content").blur(function() {
			changeButtonState(tab_panel);
			highLightKeywords();
			///添加滚动条
			$(tab_panel + " .left .content").mCustomScrollbar({
				theme:'dark'
			});
		});
		$(tab_panel + " .left .content").focus(function() {
			removeHighLightLable();
			// 编辑模式去掉滚动条
			$(tab_panel + " .left .content").mCustomScrollbar("destroy");
		});
    }

	// 案件分析按钮的状态控制
	function changeButtonState(tab_class)
	{
		var content = $(tab_class + " .left .content").text();
		if($.trim(content) == "") {
			$(tab_class + " .btn-ana .center-button").addClass("disable");
		}
		else {
			$(tab_class + " .btn-ana .center-button").removeClass("disable");
		}
	}
	
	// 显示关键词
	function drawKeyWords(tab_panel, keywords)
	{
        $(tab_panel + " .keywords").html( "");

        for(i=0; i<keywords.length; i++)
        {
            $(tab_panel + " .keywords").append("<div class='keyword'><div class='del-kw-sign'>" +
            		        "<img src='./image/chahao.png' onclick='deleteKeyword(this)'></div>" +
            		        "<div class='kw-text'>"+keywords[i]+"</div></div>");
        }
	}

    //显示串并案件内容列表
	function drawCasesTable(tab_panel, cases, mainCaseID)
	{
	    //画表头
	    $(tab_panel + " .case-list").html("<tr><th style='width:60px;height:50px;'>编号</th>" +
                                           	"<th style='width:100px;height:50px;'>特征标签</th>" +
                                           	"<th style='width:75px;height:50px;'>涉案人员</th>" +
                                           	"<th style='height:50px;'>案件概述</th>" +
                                           	"<th style='width:75px;height:50px;'>操作</th></tr>");

        //根据案件内容画表格
		var i = 0;
        for (var k=0; k<cases.length; k++) {
			if (cases[k].caseID == mainCaseID && mainCaseID != "")
				continue;	/* 0826 深度挖掘时不显示主案件 */
			
			if(k >= 18) break;	//只显示18个关联案件
			
            $(tab_panel + " .case-list").append("<tr><td class='td1'>"+(i+1)+"</td><td class='td1'>"+getCharactericLabels(cases[k])
                                        +"</td><td class='td1'>"+cases[k].persons+"</td><td align=left class='td1'>" +
                                        limitLen(cases[k].text)+"</td><td class='td1'><input class='btn-in-table' "+
            //                          "type='button' value='打开档案' onclick='openFile(\""+cases[k].caseID+"\")'>"+
            //                          "<input class='btn-in-table' type='button' value='深度挖掘' onclick='loadRelatedCasesByID(\""+
            //                          cases[k].caseID+"\")'></td></tr>");
										"type='button' value='打开档案'><input class='btn-in-table' type='button' "+
										"value='深度挖掘'></td></tr>");

            $(tab_panel + " .case-list .btn-in-table:eq("+2*i+")").click({id:cases[k].caseID}, function(evt) {
                openFile(evt.data.id);
            });
			$(tab_panel + " .case-list .btn-in-table:eq("+(2*i+1)+")").click({id:cases[k].caseID}, function(evt) {
                loadRelatedCasesByID(evt.data.id);
				mining.utils.serverLog(SVLOG.LIST_DeepMining);	//SCOPA 3.0操作点记录
            });
			i++;
        }
		 
		 // 描画空白行
		if(cases.length == 0){
			$(tab_panel + " .case-list").append("<tr><td class='td1'></td><td class='td1'></td><td class='td1'></td><td class='td1'></td><td class='td1'></td></tr>");
		}else{
			//添加底边渐变条，呈现立体效果
			$(tab_panel + " .case-list tr:last td").each(function(){
				$(this).addClass("last-td");
			});
			
			// 埋入主案件ID
			$(tab_panel + " .placeholder").text(mainCaseID);
		}
	}

   //删除关键词
    function deleteKeyword(obj_kw){
	    $(obj_kw).parent().parent()[0].remove();
		removeHighLightLable();
	    highLightKeywords();
		mining.utils.serverLog(SVLOG.MINING_RemoveKeyword);	//SCOPA 3.0操作点记录
    }

   //添加关键词
    function addKeyword(tab_panel){
	    var w=$(tab_panel + " .input-kw")[0];
	    if(w.value==undefined || w.value=="" || w.value==null){
			$dialog.alert('关键词输入不能为空！','输入关键词');
	    }else{
			exists = false;
			$(tab_panel + " .keywords .kw-text").each(function(){
            	if(w.value == $(this).text())
					exists = true;
            });
			//关键词已存在，忽略本次添加
			if(exists) return;
			
		    var new_kw = "<div class='keyword'><div class='del-kw-sign'>" +
            		        "<img src='./image/chahao.png' onclick='deleteKeyword(this)'></div>" +
            		        "<div class='kw-text'>"+$.trim(w.value)+"</div></div>";
	        $(tab_panel + " .keywords").append(new_kw);
			removeHighLightLable();
		    highLightKeywords();
			mining.utils.serverLog(SVLOG.MINING_AddKeyword);	//SCOPA 3.0操作点记录
			$(tab_panel + " .input-kw").select();
	    }
    }

    //限制表格某一列显示多少个字数
    function limitLen(strContent){
        if(strContent.length > LIMIT_LENGTH){
            return "<a  style='text-decoration:none; color:#161726;' name='" + strContent + "' onclick='openDialog(\"案件描述\",this.name)'>" + strContent.substring(0,LIMIT_LENGTH)+"…</a>";
        }
        return "<a  style='text-decoration:none; color:#161726;' name='" + strContent + "' onclick='openDialog(\"案件描述\",this.name)'>" + strContent+"</a>";;
    }

	// 去除html中的span标签
	function removeHighLightLable()
	{
		$(".tab-pane.fade.active.in .content .mCSB_container span").replaceWith(function() {
			return htmlencode($(this).text());
		});
	}
  
    //获取关键词显示高亮
    function highLightKeywords() {
		var content;
	    var contentEditBox = $('.tab-pane.fade.active.in .content .mCSB_container');
	    if(contentEditBox.length != 0) {
			content = contentEditBox.text();
		} else if($('.tab-pane.fade.active.in .content').length != 0){
			contentEditBox = $('.tab-pane.fade.active.in .content');
			content = contentEditBox.text();
		} else {
			return;
		}
/*	        var strKeywords = "/(";
	        var paramPos = "";
	        var i = 1;
	        //循环每个关键字标签元素
	        $('.tab-pane.fade.active.in .keyword').each(function(){
	            strKeywords += $(this).children(".kw-text").text() + ")|(";
	            paramPos += "$" + i++;
	        });
	        // 去掉末尾的|(
	        strKeywords = strKeywords.substring(0, strKeywords.length - 2);
	        if(paramPos.length > 0) {   // 正常获取了1个以上的关键字
	            strKeywords += "| (js)/gi";
	            contentEditBox.html(content.replace(eval(strKeywords), "<span class=\"kw_highlight\">" + paramPos + "</span>"));
	        }
*/
			var tags=[];
			//循环每个关键字标签元素
	        $('.tab-pane.fade.active.in .keyword').each(function(){
	            strKeywords = htmlencode($(this).children(".kw-text").text());
				tags.push(strKeywords);
	        });
			
			tags.sort(function(a,b){
				//关键字排序
				if(a.length == b.length){
					if(a > b) return 1;
					if(a < b) return -1;
					return 0;
				}
				
				return a.length - b.length;
			});
			
			for(i=tags.length-1; i>=0; i--){
				var replacement = content.split(tags[i]);
	            content = replacement.join("<span class=\"kw_highlight\">" + tags[i] + "</span>");
			}
			contentEditBox.html(content);
	}

   	//打开文档
	function openFile(id){
		var option = {
			url: mining.baseurl.core + '/query/getVertexByIndex',
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
				//console.log(data)
		    },
		    error: function (data) {
		        //TODO
		    }
		}
	  	$ajax ? $ajax.ajax(option) : $.ajax(option); 
		mining.utils.serverLog(SVLOG.LIST_OpenFile);	//SCOPA 3.0操作点记录
	}
	
	// tool function
	var div;
	function htmlencode(s){
		if(typeof(div) == "undefined") {
			div = document.createElement('div');
		}
		div.innerHTML = "";
		div.appendChild(document.createTextNode(s));
		return div.innerHTML;
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
		resultStr +=  "' onclick='openDialog(\"特征标签\",this.name)'>" + resultAbbrv + "</a>";
		return resultStr;
	}
