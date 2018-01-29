$(function() {
	//根据身份证号 加载数据
	getData()
	//导出
	Daochu()
	//筛选数据
	SxData()
	//搜索
	SearchTask()
	//加载任务详情
	getTaskData()
})
//导出
function Daochu() {
	var id = location.href.split('?')[1]
	var sessionId = sessionStorage.getItem('sessionId')

	$('#task_daochu').on('click', function() {
		/*$.ajax({
			type: "get",
			url: "http://10.101.139.22:9897/task/export/" + id + '/' + sessionId,
			async: true,
			success: function(data) {
				console.log(data)
			}
		});*/
		location.href = "http://10.101.139.22:9897/task/export/" + id + '/' + sessionId
	})
}
//搜索
function SearchTask() {
	$('#task_btn').on('click', function() {
		var str = $('#task_text').val()
		var reg = /^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/i //18位身份证号
		var reg1 = /^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$/ //15位身份证号
		if(!reg.test(str) || reg1.test(str)) {
			alert('身份证号不正确或无记录')
		}
		//		var jobId = sessionStorage.getItem('taskids')
		var jobId = location.href.split('?')[1]
		//console.log(jobId)

		$.ajax({
			type: "get",
			url: "http://10.101.139.22:9897/task/detail/detail/" + str + '/' + jobId,
			async: true,
			success: function(data) {
				$('.task-detail-box').empty()
				var data1 = data.msg
				var sex = '';

				$.each(data1, function(k, v) {
					console.log(v)
					if(v.sex == 1 || v.sex == '男') {
						sex = '男'
					} else if(v.sex == 2 || v.sex == '女') {
						sex = '女'
					} else {
						sex = ''
					}
					$('.task-detail-box').append(
						'<div class="task-detail-card">' +
						'<div class="img-box">' +
						'<img src="http://10.101.139.22:9897/sfz/' + v.idCard + '/0.jpeg" />' +
						'</div>' +
						'<div class="detail-box">' +
						'<div class="person-info">' +
						'<p>' +
						'姓名：<span class="person-name">' + (v.name == null ? '' : v.name) + '</span> 身份证号：' +
						'<span class="person-sfzh">' + (v.idCard == null ? '' : v.idCard) + '</span> 性别：' +
						'<span class="person-sex">' + sex + '</span>' +
						'</p>' +
						'<p>出生日期：<span class="person-date">' + (v.birthday == null ? '' : v.birthday.split(' ')[0]) + '</span></p>' +
						'</div>' +
						'<div class="tags">' +
						'<span class="label label-warning">' + v.tag + '</span>' +
						'</div>' +
						'</div>' +
						'<div class="button-box">' +
						'<button type="button" class="btn btn-default details-info"  onclick="TzDetail(\'' + v.idCard + '\')">详细信息</button>' +
						'<button type="button" class="btn btn-default">跳到图析</button>' +
						'<button type="button" class="btn btn-default">人工研判</button>' +
						'</div>' +
						'</div>'
					);
				});
			}
		});
	});
	$('#task_text').on('blur', function() {
		if($('#task_text').val() == '') {
			$('.task-detail-box').empty()
			
			var num = location.href.split('?')
			//console.log(num.length)
			if(num.length > 2) {
				//获取所有记录
				getTaskData()
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
	newTab.location.href = 'yjlDetails.html?' + id
}
/*//详情2
function TzDetails(idc) {
	var id = location.href.split('?')[1]
	
	var newTab = window.open('about:_blank')
	newTab.location.href = 'yjlDetails.html?' + idc+'?'+id
}*/
//根据身份证号 加载数据
function getData() {
	var x = location.href.split('?')
	var sfzh = location.href.split('?')[1]
	var reg = /^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/i //18位身份证号
	var reg1 = /^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$/ //15位身份证号
	if(!reg.test(sfzh) || reg1.test(sfzh)) {
		return false;
	} else {
		$.ajax({
			type: "get",
			url: "http://10.101.139.22:9897/task/info/one/" + sfzh,
			async: true,
			success: function(data) {
				var data1 = data.msg.details
				console.log(data)
				var sex = '';
			
					if(data1.sex == 1 || data1.sex == '男') {
						sex = '男'
					} else if(data1.sex == 2 || data1.sex == '女') {
						sex = '女'
					} else {
						sex = ''
					}
					$('.task-detail-box').append(
						'<div class="task-detail-card">' +
						'<div class="img-box">' +
						'<img src="http://10.101.139.21:8778/sfz/' + data1.idCard + '/0.jpeg" />' +
						'</div>' +
						'<div class="detail-box">' +
						'<div class="person-info">' +
						'<p>' +
						'姓名：<span class="person-name">' + (data1.name == null ? '' : data1.name) + '</span> 身份证号：' +
						'<span class="person-sfzh">' + (data1.idCard == null ? '' : data1.idCard) + '</span> 性别：' +
						'<span class="person-sex">' + sex + '</span>' +
						'</p>' +
						'<p>出生日期：<span class="person-date">' + (data1.birthday == null ? '' : data1.birthday.split(' ')[0]) + '</span></p>' +
						'</div>' +
						'<div class="tags">' +
						'<span class="label label-warning">' + data1.tag + '</span>' +
						'</div>' +
						'</div>' +
						'<div class="button-box">' +
						'<button type="button" class="btn btn-default details-info"  onclick="TzDetail(\'' + data1.idCard + '\')">详细信息</button>' +
						'<button type="button" class="btn btn-default">跳到图析</button>' +
						'<button type="button" class="btn btn-default">人工研判</button>' +
						'</div>' +
						'</div>'
					);
				
			}
		});
	}

}
//加载任务列表
function getTaskData() {
	//var id = sessionStorage.getItem('taskid')
	var id = location.href.split('?')[1]
	if(id.length >= 15) {
		return false;
	}

	$.ajax({
		type: "get",
		url: "http://10.101.139.22:9897/task/detail/get/" + id,
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
	$('.task-detail-box').empty();
	$.each(data1, function(k, v) {
		//console.log(v)
		if(v.sex == 1 || v.sex == '男') {
			sex = '男'
		} else if(v.sex == 2 || v.sex == '女') {
			sex = '女'
		} else {
			sex = ''
		}
		
		$('.task-detail-box').append(
			'<div class="task-detail-card">' +
			'<div class="img-box">' +
			'<img src="http://10.101.139.21:8778/sfz/' + v.idCard + '/0.jpeg" />' +
			'</div>' +
			'<div class="detail-box">' +
			'<div class="person-info">' +
			'<p>' +
			'姓名：<span class="person-name">' + (v.name == null ? '' : v.name) + '</span> 身份证号：' +
			'<span class="person-sfzh">' + (v.idCard == null ? '' : v.idCard) + '</span> 性别：' +
			'<span class="person-sex">' + sex + '</span>' +
			'</p>' +
			'<p>出生日期：<span class="person-date">' + (v.birthday == null ? '' : v.birthday.split(' ')[0]) + '</span></p>' +
			'</div>' +
			'<div class="tags">' +
			'<span class="label label-warning">' + v.tag + '</span>' +
			'</div>' +
			'</div>' +
			'<div class="button-box">' +
			'<button type="button" class="btn btn-default details-info"  onclick="TzDetail(\'' + v.idCard + '\')">详细信息</button>' +
			'<button type="button" class="btn btn-default">跳到图析</button>' +
			'<button type="button" class="btn btn-default">人工研判</button>' +
			'</div>' +
			'</div>'
		);
		/*$('.tags').append(
			'<span>'+v.tag+'</span>'
		)*/
	});
}
//筛选数据
function SxData() {
	$('#ck_btn').on('click', function() {
		var str = '';
		var id = location.href.split('?')[1]
		
		$.each($('input[type="checkbox"]:checked'), function(k, v) {
			str += $(this).val() + ','
		});
		if(str == '') {
			alert('没选择标签');
			return false;
		}
		str = str.substring(0, str.length - 1) //去掉最后一个逗号
		console.log(str)

		$.ajax({
			type: "post",
			url: "http://10.101.139.22:9897/task/detail/tag",
			data: {
				id: id,
				tags: str
			},
			async: true,
			success: function(data) {
				var data1 = data//.msg.data
				var page = data1.msg.data.slice(0, 20);
				$('.task-detail-box').empty();
				
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
		$('.task-detail-box').empty();
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