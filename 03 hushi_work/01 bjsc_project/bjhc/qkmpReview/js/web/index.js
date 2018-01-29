$(function() {
	//搜索
	SearchTask()
	
  //弹框1
	dialog();
	
  //模板下载
	MoBan()
	//按回车
	$(document).on('keyup',function (event) {
		var e = event || event.srcElement
		
		if(e.keyCode == 13) {
			$('#beijing').click()
		}
	})
	
	getTagLevel();
	
	var userId = location.href.split('=')[1]
	sessionStorage.setItem('sessionId',userId)
	
	resizeFunc();
    // 页面窗口大小变化 重新计算布局
	$(window).resize(resizeFunc);
	
	initPage();

})

/**
 * @desc: 改变页面html的font-size大小 和 搜索结果result-table-box 元素的top值
 * @param: none
 * @return: undefined 
 */
function resizeFunc(){

	//重新设置搜索结果result-table-box 元素的top值
	var height = $("body").height() + 18;
	$('.result-table-box').css('top', height);
}

/**
 * @desc: 页面初始化
 * @param: none
 * @return: undefined 
 */
function initPage(){
	// 获取url参数 若来自情况摸排页面并且带有personID参数，则根据personID触发背景审查按钮
	var from = GetQueryString('from'),
		personID = GetQueryString('personID');

	if(from === 'qkmp' && personID.length > 0){
		$('.search-bar input.input').val(personID);
		$('.search-bar .bjsc-buttons .check').trigger('click');
	}

	// 搜索栏 情况摸排 页面切换点击功能
	$('.search-bar .search-type span:nth-child(2)').on('click', function(){
		var searchPersonID = $.trim($('.search-bar input.input').val());
		if(searchPersonID.length > 0){
			window.location.href = 'subview/qkmp.html?from=bjsc&personID=' + searchPersonID;
		}else{
			window.location.href = 'subview/qkmp.html';
		}
	})
}

//搜索
function SearchTask() {
	$('#task_btn').on('click', function() {
		var sfzh = $('#task_text').val()
		var reg = /^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/i //18位身份证号
		var reg1 = /^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$/ //15位身份证号
		var sfzhArry = sfzh.split(/[,， ]/);;
		for (var i = 0; i < sfzhArry.length; i++) {
			if (!reg.test(sfzhArry[i]) || reg1.test(sfzhArry[i])) {
				alert(sfzhArry[i] + '身份证号不正确或无记录')
				return false;
			}
		}

		$.ajax({
			type : "get",
			url : bjhchost + "/task/info/one/" + sfzh,
			async : true,
			success : function(data) {
				console.log(data);
				$('.results-list').empty();
				if (data.msg) {
					for (var i = 0; i < data.msg.length; i++) {
						var data1 = data.msg[i].details;
						appendList(data1);
					}
				}
			}
		});
		
	});
	
}

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

function appendList(data){
	var sex = '';
	
	if(data.sex == 1 || data.sex == '男') {
		sex = '男'
	} else if(data.sex == 2 || data.sex == '女') {
		sex = '女'
	} else {
		sex = ''
	}
	var tag = data.tag==null?'' : data.tag;
	var tagLevelMap = tagLevel;
	var tagHtml = '';
	if(tag){
		var tagArr = tag.split(",");
		if(tagArr.length > 0){
			var i = 0;
			for(i=0;i<tagArr.length;i++){
				var tagStr = tagArr[i].trim();
				console.log(tagStr);
				if(tagLevelMap[tagStr] && tagLevelMap[tagStr] == "1"){
					tagHtml += '<span class="label label-danger">'+ tagArr[i] +'</span>';
				}else if(tagLevelMap[tagStr] && tagLevelMap[tagStr] == "2"){
					tagHtml += '<span class="label label-warning">'+ tagArr[i] +'</span>';
				}else{
					tagHtml += '<span class="label label-info">'+ tagArr[i] +'</span>';
				}
			}
		}else{
			tagHtml = '<span class="label label-info">无背景</span>'
		}
	}else{
		tagHtml = '<span class="label label-info">无背景</span>'
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
			zyHtml = '<li>'+zyStr+'</li>';
		}
	}else{
		 zyHtml = '<li>无职业</li>';
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
							'<div class="col-md-2">民族：<span class="person-nation">' + (data.nation == null ? '' : data.nation) + '</span></div>' +
							'<div class="col-md-5">职业：<span class="person-occupation">' + (data.zy1 == null||data.zy1 == 'null' ? '' : data.zy1) + '</span></div>' +
                            '<div class="col-md-2">性别：<span class="person-sex">' + sex + '</span></div>' +
                        '</div>' +
                        '<div class="person-info-row row">' +
                            '<div class="col-md-12">户籍地：<span class="person-domicile">' + (data.birthplace == null||data.birthplace == 'null' ? '' : data.birthplace) + '</span></div>' +
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
                   		'<div class="view-details-button">' +
	                        '<div class="button" onclick="TzDetail(\'' + data.idCard + '\')">' +
	                            '<img src="../img/bjscxq/page-icon.png" alt="check">' +
	                            '<span>查看详情</span>' +
	                        '</div>' +
	                        '<div class="button" onclick="toSCOPA(\'' + data.idCard + '\')">' +
			                	'<img src="../img/bjscxq/page-icon.png" alt="check">' +
			                	'<span>跳到图析</span>' +
			                '</div>' +
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

//详情1
function TzDetail(id) {
	var newTab = window.open('about:_blank');
	newTab.location.href = 'subview/yjlDetails.html?sfzh=' + id;
}

//模板下载
function MoBan() {
	$('#moban').on('click',function () {
		location.href = 'http://10.101.139.21:8777/xls/template.xls'
	})
}
//弹框1
function dialog() {
	$('.hecha_input').val('');
	$('.liulan_file').val('');
	$('#shangchuan').on('click', function() {
		$('.tankuang').show();
		$('.panduan').hide();
		$('.panfile').hide();
	})
	$('.close').on('click', function() {
		$('.tankuang').hide();
	})
	$('.ok').on('click', function() {

		if($('.hecha_input').val() == '') {
			$('.panduan').show();
			//$(this).attr('disabled',false)
			return false;
		} else {
			$('.panduan').hide();
		}
		if($('.liulan_file').val() == '') {
			$('.panfile').show()
			//$(this).attr('disabled',false)
			return false;
		} else {
			$('.panfile').hide()
		}

		$('#liulan-form').ajaxSubmit({
			url: bjhchost+ '/task/info/check/',
			success: function(data) {
				console.log(data)
				var total = data.msg.success
				var seq = data.msg.data

				$('.tankuang1_success').text(data.msg.success)
				$('.tankuang1_fail').text(data.msg.failed)
				$('.tankuang1').show()
				$('.tankuang').hide()
				$('.ok1').on('click', function() {
					var success = Number(data.msg.success)+Number(data.msg.failed);
					console.log(success);
					if(success == 0){
						alert('上传数量为空,请重新上传。')
						return false;
					}
					if(success > 5000) {
						alert('不能上传超过5000条的数据!!!')
						return false;
					}else{
						if(data.success == 1) {
							//上传获取数据
							getData()
						}else{
							alert('上传失败')
							return false;
						}
						//获取数据
						function getData() {
							var taskName = $('.hecha_input').val(); //任务名
							var taskTotal = total;
							var taskSeq = seq;
							var userId = getUser().loginName;
	
							$.ajax({
								type: "post",
								url: bjhchost+ "/task/info/add",
								data: {
									name: taskName,
									count: taskTotal,
									sessionId: userId,
									seq: taskSeq
								},
								async: true,
								success: function(data) {
									console.log(data);
									// alert("保存成功!");
									location.href = 'taskManagement.html'
								}
							});
	
						}
					}
					
				})
				$('.esc1').on('click', function() {
					$('.tankuang1').hide()
					$('.tankuang').show()
					$('.ok').attr('disabled',false)
				})
			}
		}).submit(function() {
			return false;
		});
		$(this).attr('disabled',true)
	})
	$('.esc').on('click', function() {
		location.href = 'index.html'
	})

}