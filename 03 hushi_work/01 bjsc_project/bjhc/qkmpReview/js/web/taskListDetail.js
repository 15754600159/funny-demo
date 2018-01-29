$(function() {
	// 获取标签颜色
	getTagLevel();
	
	intTagList();
	 // 页面初始化
    initPage();
	//根据身份证号 加载数据
	getData();
	//导出
	Daochu();
	//筛选数据
	SxData();
	//搜索
	SearchTask();
	//加载任务详情
	getTaskData();

})

var tagLevel = null;
function getTagLevel(){
	if(!tagLevel){
		$.ajax({
			type : "get",
			url : bjhchost + "/task/tag/getLevelMaps",
			async : true,
			success : function(data) {
				tagLevel = data.msg;
				console.log(tagLevel);
			}
		});
	}
}

function selectTag(id)
{
	 var el=$("#"+id);
	 //-------- 如果点击了展开或收缩按钮---------
	 var targetid=el.attr('id')+"d";
	 console.log($("#"+targetid).is(":hidden"));
	 if ($("#"+targetid).is(":hidden")){
		 console.log(targetid);
		 $("#"+targetid).show();
		$(document).one('click', function () {  
	   		$("#"+targetid).blur();  
	   		$("#"+targetid).click();
	   		$("#"+targetid).hide();  
		})
	    $("#"+targetid).on('click', function (e) {  
	        e.stopPropagation();  
	    })  
	 }else{
		 $("#"+targetid).hide();
	 }
}

function intTagList(){
	$.ajax({
		type: "get",
		url: bjhchost+"/task/tag/getMaps",
		async: true,
		success: function(data) {
			//var data = {"success":1,"msg":{"拘留所在押人员":["拘留所在押人员"],"涉案人员":["涉案团伙人员","涉案人员","刑事涉案团伙人员","刑事行政涉案人员","刑事案件团伙成员","民事涉案人员","团伙涉案人员"],"缉控人员":["缉控人员"],"刑侦打处":["刑侦打处人员"],"司法矫正":["司法矫正人员"],"潜在风险人员":["呼市国税局个体非正常认定人员","呼市国税局处罚人员","呼市国税局个体非正常解除人员","行政处罚人员"],"经侦黑名单":["传销黑名单人员","银行卡黑名单人员","制假币人员","制假票人员","制假产品人员","犯法经侦黑名单"],"刑事前科人员":["撤逃人员人员","劳教出入所人员","两劳释放人员","违法犯罪人员"],"监狱服刑人员":["监狱服刑人员"],"涉毒人员":["涉毒人员"],"涉国保类人员":["帮教人员","法轮功人员"],"部级重点人员":["情报部级重点人员"],"监管人员":["监管人员"],"嫌疑人":["嫌疑人","带破外市嫌疑人","毒检嫌疑人","SIS犯罪嫌疑人"],"看守所在押人员":["看守所在押人员"],"犯罪团伙":["团伙成员","犯罪团伙"],"本地重点人员":["涉爆前科人员","涉枪前科人员","重点精神病人员","重点人员","重点人员控制力量","涉访人员","涉恐前科人员","涉恐在逃人员","在逃人员"],"工作对象":["工作对象"]}};
			var tagHtml = "";
			var j = 0;
			$.each(data.msg, function (index, item) {
				 j++;
				 tagHtml+='<ul class="menuUl">'+ 
					'<li class="L1"><label class="check-label"><input type="checkbox" class="check-all"><span><a href="#" id="m0'+j+'" class="tagList-a">'+index+'</a></span></label></li>'+
					'<ul id="m0'+j+'d" class="U1" style="display: none;">';
				 	for(var i=0;i<item.length;i++){
				 		tagHtml+='<li class="L22"><label class="check-label"><input type="checkbox" class="check-sub" name="tagName" value='+item[i]+'><span>'+item[i]+'</span></label></li>';
				 	}
				 	tagHtml+='</ul></ul>';	 
			});
			$('#tag-list').append(tagHtml);

			resizeFunc();
			
			$(".tagList-a").on('click', function (event) { 
				 
				 //-------- 如果点击了展开或收缩按钮---------
				 var targetid=$(this).attr('id')+"d";
				 console.log($("#"+targetid).is(":hidden"));
				 if ($("#"+targetid).is(":hidden")){
					 // 隐藏所有的
					 $(".U1").hide();
					 
					 $("#"+targetid).show();
					$(document).one('click', function () { 
				   		$("#"+targetid).hide();  
					})
				 }else{
					 $("#"+targetid).hide();
				 }
				 event.stopPropagation();  
		    });
			$(".menuUl").on('click', function (e) {  
		        e.stopPropagation();  
		    })
		    
		    $(".select-all").on('change', function (e) {  
		    	if($(this).is(':checked')){
		    		$('#tag-list').find('input:checkbox').prop('checked', true);
		    	}else{
		    		$('#tag-list').find('input:checkbox').prop('checked', false);
		    	}
		    })
		    
		    $(".check-all").on('change', function (e) {  
		    	console.log($(this).is(':checked'));
		    	if($(this).is(':checked')){
		    		$(this).parents('.menuUl').find('input[type="checkbox"]').prop('checked', true);
		    	}else{
		    		$(this).parents('.menuUl').find('input[type="checkbox"]').prop('checked', false);
		    	}
		    })
		    
		    $(".check-sub").on('change', function (e) {  
		    	if($(this).is(':checked')){
		    		$(this).parents('.menuUl').find('.check-all').prop('checked', true);
		    	}else{
		    		var ischeck = true;
		    		$('#check-sub1').parents('.menuUl').find('.check-sub').each(function (i) {
		                if ($(this).prop("checked")) {
		                	// 父选中
		                	ischeck = false;
		                	return;
		                } 
		            });
		    		if(ischeck){
		    			$(this).parents('.menuUl').find('.check-all').prop('checked', false);
		    		}
		    	}
		    })
		}
	});
}

 function initPage(){
        // 页面窗口大小变化 重新计算布局
        $(window).resize(resizeFunc);
    }
/**
 * @desc: 改变页面html的font-size大小 和 搜索结果result-table-box 元素的top值
 * @param: none
 * @return: undefined 
 */
function resizeFunc(){
    //重新设置html的font-size
    var width = $(document).width();
    var fontSize = (width - 1680) * 0.0298 + 50;
    $('html').css('font-size', fontSize);

    //重新设置搜索结果result-table-box 元素的top值
    var height = $("body").height() + 18;
    $('.result-table-box').css('top', height);
}

//导出
function Daochu() {
	var id = GetQueryString('taskId');
	var sessionId = sessionStorage.getItem('cookieUserId');

	$('#task_daochu').on('click', function() {
		location.href = bjhchost+ "/task/export/" + id + '/' + sessionId
	})
}
//搜索
function SearchTask() {
	$('#task_btn').on('click', function() {
		var str = $('#task_text').val();
		if($('#task_text').val() == '') {
			$('.results-list').empty()
			//获取所有记录
			getTaskData();
			return;
		}
		var reg = /^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/i //18位身份证号
		var reg1 = /^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$/ //15位身份证号
		if(!reg.test(str) || reg1.test(str)) {
			alert('身份证号不正确或无记录')
		}
		//		var jobId = sessionStorage.getItem('taskids')
		//console.log(jobId)
		var jobId = GetQueryString('taskId');
		
		$.ajax({
			type: "get",
			url: bjhchost+"/task/detail/detail/" + str + '/' + jobId,
			async: true,
			success: function(data) {
				$('.results-list').empty()
				var data1 = data.msg
				var sex = '';

				$.each(data1, function(k, v) {
					appendList(v)
				});
			}
		});
	});
	$('#task_text').on('blur', function() {
		if($('#task_text').val() == '') {
			$('.results-list').empty()
			
			var num = location.href.split('?')
			//console.log(num.length)
			if(num.length > 2) {
				//获取所有记录
				getTaskData();
			}else{
				//根据身份证号 加载数据
				getData()
			}
			
		}
	})
}
//详情1
function TzDetail(id) {
	var newTab = window.open('about:_blank')
	newTab.location.href = 'yjlDetails.html?sfzh=' + id
}
//根据身份证号 加载数据
function getData() {
	var x = location.href.split('?')
	var sfzh = location.href.split('?')[1]
	var reg = /^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/i //18位身份证号
	var reg1 = /^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$/ //15位身份证号
		
	if(!reg.test(sfzh) || reg1.test(sfzh)) {
		return false;
	} else {
		$(".task-detail").css("display","none");
		$(".check-filter-box").css("display","none");
		$.ajax({
			type: "get",
			url: bjhchost+ "/task/info/one/" + sfzh,
			async: true,
			success: function(data) {
				var data1 = data.msg.details
				console.log(data)
				appendList(data1)
			}
		});
	}

}

// 增加到list

function appendList(data){
	var sex = '';
	
	if(data.sex == 1 || data.sex == '男') {
		sex = '男'
	} else if(data.sex == 2 || data.sex == '女') {
		sex = '女'
	} else {
		sex = ''
	}
	var tag = data.tag==null||data.tag=='null' ?'' : data.tag;
	var tagHtml = '';
	if(tag){
		console.log(tag);
		var tagArr = tag.split(",");
		var tagLevelMap = tagLevel;
		console.log(tagArr.length);
		if(tagArr.length > 0){
			var i = 0;
			for(i=0;i<tagArr.length;i++){
				var tagStr = tagArr[i].trim();
				console.log(tagStr);
				if(tagLevelMap && tagLevelMap[tagStr] && tagLevelMap[tagStr] == "1"){
					tagHtml += '<span class="label label-danger">'+ tagArr[i] +'</span>';
				}else if(tagLevelMap && tagLevelMap[tagStr] && tagLevelMap[tagStr] == "2"){
					tagHtml += '<span class="label label-warning">'+ tagArr[i] +'</span>';
				}else{
					tagHtml += '<span class="label label-info">'+ tagArr[i] +'</span>';
				}
			}
		}
	}else{
		tagHtml += '<span class="label label-info">无资料</span>';
	}
	
	var zyHtml = '';
	var zyStr = (data.zy2==null||data.zy2=='null'?'' : data.zy2)+"";
	console.log(zyStr);
	if(zyStr){
		if(isJSON(zyStr)){
			var zyArray = JSON.parse(zyStr);
			var i;
			for(i = 0; i<zyArray.length; i++){
				var zyinfo = zyArray[i].fields;
				var infoStr = "";
				$.each(zyinfo,function(index,item){
					if(item&&formatStr(item)){
						infoStr+= index + ":" + formatStr(item) + " ";
					}
				});
				zyHtml += '<li>'+zyArray[i].tag+ ' ' +infoStr + '</li>'
			}
		}else{
			zyHtml = '<li>'+zyStr+'</li>'
		}
	}else{
		zyHtml = '<li>无数据</li>'
	}
	
	$('.results-list').append(
		'<div class="result-box">' +
            '<div class="head-icon-box">' +
    			'<img src="http://10.100.9.60:9082/dzda/rygk/RequestPhoto.jsp?sfzh=' + (data.idCard == null ? '' : data.idCard) + '" />' +
            '</div>' +
            '<div class="person-info-box">' +
                '<div class="top-right-part">' +
                    '<div class="basic-info-box">' +
                        '<h3 class="person-name">' + (data.name == null ? '' : data.name) + '</h3>' +
                        '<div class="person-info-row row">' +
							'<div class="col-md-5">身份证号：<span class="person-sfzh">' + (data.idCard == null ? '' : data.idCard) + '</span></div>' +
						'</div>' +
						'<div class="person-info-row row">' +
							'<div class="col-md-2">民族：<span class="person-nation">' + (data.nation == null||data.nation == 'null' ? '' : data.nation) + '</span></div>' +
							'<div class="col-md-5">职业：<span class="person-occupation">' + (data.zy1 == null||data.zy1 == 'null' ? '' : data.zy1) + '</span></div>' +
							'<div class="col-md-2">性别：<span class="person-sex">' + sex + '</span></div>' +
						'</div>' +
						'<div class="person-info-row row">' +
							'<div class="col-md-12">户籍地：<span class="person-domicile">' + (data.birthplace == null||data.birthplace == 'null' ? '' : data.birthplace.replace('\\n','')) + '</span></div>' +
						'</div>' +
						'<div class="person-info-row row">' +
							'<div class="col-md-12">现住地：<span class="person-residence">' + (data.xzz == null||data.xzz == 'null' ? '' : data.xzz) + '</span></div>' +
						'</div>' +
                    '</div>' +
                    '<div class="occupation-box">' +
                        '<span class="occu-label">职业：</span>' +
                        '<ol>' + zyHtml +
                            //'<li>退役军人：2017-08-06至2017-08-15     在XX部队入伍</li>' +
                        '</ol>' +
                    '</div>' +
                    '<div class="view-details-button">' +
                        '<div class="button" onclick="TzDetail(\'' + data.idCard + '\')">' +
                            '<img src="../../img/bjscxq/page-icon.png" alt="check">' +
                            '<span>查看详情</span>' +
                        '</div>' +
                        '<div class="button" onclick="toSCOPA(\'' + data.idCard + '\')">' +
                        	'<img src="../../img/bjscxq/page-icon.png" alt="check">' +
                        	'<span>跳到图析</span>' +
                        '</div>' +
                    '</div>' +
                '</div>' +
                '<div class="bottom-right-part">' +
                    '<div class="tags row">' +
                        '<div class="col-md-1 label-word">标签：</div>' +
                        '<div class="col-md-11 labels">' + tagHtml + 
//                            '<span class="label label-danger">部下发涉稳人员</span>' +
//                            '<span class="label label-warning">打处记录</span>' +
//                            '<span class="label label-info">频繁更换酒店</span>' +
                        '</div>' +
                    '</div>' +
                '</div>' +
            '</div>' +
        '</div>'
		);
}

function formatStr(itemStr){
	itemStr = itemStr.replace('\\n','').replace(' ','');
	return itemStr;
}

//跳到图析
function toSCOPA(id){
	var username = '014591';
	window.open('http://yp.hsga.nn/core.html?username='+username+'#!scopa/graph/key/'+id);
	
}

//加载任务列表
function getTaskData() {
	//var id = sessionStorage.getItem('taskid')
	var id = GetQueryString('taskId');
	$.ajax({
		type: "get",
		url: bjhchost+ "/task/detail/get/" + id,
		async: true,
		success: function(data) {
			var page = data.msg.data.slice(0, 20);
			//任务列表分页
			Task_content(page)
			//分页
			pagination(data);
		},
		complete: function(data) {
			console.log($('.task-detail-card').length)
		}
	});
}
//任务列表分页
function Task_content(data1) {
	var sex = '';
	$('.results-list').empty();
	$.each(data1, function(k, v) {
		//console.log(v)
		appendList(v)
		/*$('.tags').append(
			'<span>'+v.tag+'</span>'
		)*/
	});
}

//筛选数据
function SxData() {
	$('#ck_btn').on('click', function() {
		var str = '';
		var id = GetQueryString('taskId');
		
		$.each($('input[name="tagName"]:checked'), function(k, v) {
			str += $(this).val() + ','
		});
		if(str == '') {
			alert('没选择标签');
			return false;
		}
		if(str.indexOf("10") != -1){
			str = "0,1,2,3,4,5,6,7,8,9,"
		}
		str = str.substring(0, str.length - 1) //去掉最后一个逗号
		console.log(str)

		$.ajax({
			type: "post",
			url: bjhchost+ "/task/detail/tag",
			data: {
				id: id,
				tags: str
			},
			async: true,
			success: function(data) {
				var data1 = data//.msg.data
				var page = data1.msg.data.slice(0, 20);
				$('.results-list').empty();
				
				//任务列表分页
				Task_content(page)
				//分页
				pagination(data1);
				
				//Task_content(data1)
			}
		});
	})
	
	$('#qx_btn').on('click',function () {
		var str = '';
		$.each($('input[type="checkbox"]:checked'), function(k, v) {
			str += $(this).val() + ','
		});
		if(str == '') {
			return false;
		}
		$('input[type="checkbox"]').attr('checked',false)
		//加载之前清空列表
		$('.results-list').empty();
		//加载任务列表
		getTaskData()
	})

}
/**
 * 分页控件
 * @param total
 */
function pagination(data) {
	var demo2 = BootstrapPagination($("#pagination"), {
		layoutScheme: "lefttext,pagesizelist,firstpage,prevgrouppage,prevpage,pagenumber,nextpage,nextgrouppage,lastpage,pageinput,righttext",
		//记录总数。
		total: data.msg.count,
		//分页尺寸。指示每页最多显示的记录数量。
		pageSize: 20,
		//当前页索引编号。从其开始（从0开始）的整数。
		pageIndex: 0,
		//指示分页导航栏中最多显示的页索引数量。
		pageGroupSize: 10,
		//位于导航条左侧的输出信息格式化字符串
		leftFormateString: "本页{count}条记录/共{total}条记录",
		//位于导航条右侧的输出信息格式化字符串
		rightFormateString: "第{pageNumber}页/共{totalPages}页",
		//页码文本格式化字符串。
		pageNumberFormateString: "{pageNumber}",
		//分页尺寸输出格式化字符串
		pageSizeListFormateString: "每页显示{pageSize}条记录",
		//上一页导航按钮文本。
		prevPageText: "上一页",
		//下一页导航按钮文本。
		nextPageText: "下一页",
		//上一组分页导航按钮文本。
		prevGroupPageText: "上一组",
		//下一组分页导航按钮文本。
		nextGroupPageText: "下一组",
		//首页导航按钮文本。
		firstPageText: "首页",
		//尾页导航按钮文本。
		lastPageText: "尾页",
		//设置页码输入框中显示的提示文本。
		pageInputPlaceholder: "GO",
		//接受用户输入内容的延迟时间。单位：毫秒
		pageInputTimeout: 800,
		//分页尺寸列表。
		pageSizeList: [5, 10, 20],
		//当分页更改后引发此事件。
		pageChanged: function(pageIndex, pageSize) {
			//Task_content(datas[pageIndex])
			var start = pageIndex * pageSize;
			var end = start + pageSize;
			var page = data.msg.data.slice(start, end);
			Task_content(page)
		},
	});
}
