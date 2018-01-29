$(function() {
	//获取数据
	getScData()
	//搜索
	Search()
})
//删除数据
function DelData(id,dom) {
	var userId = sessionStorage.getItem('sessionId')
	if(userId == null) {
		if(confirm('请重新登录')) {
			location.href = 'http://10.102.6.141:8183/systemManage/login/login.html'
		}else{
			alert('不重新登录,无法获取数据!!!')
		}
	}
	$.ajax({
		type: "delete",
		url: "http://10.101.139.21:8777/bjhc/task/info/delete/" + id + '/' + userId,
		async: true,
		success: function(data) {
			console.log(data)
			if(confirm('您确定要删除吗？')) {
				if(data.success != 1) {
					alert('未找到记录');
					return false;
				}
				$(dom).parent('tr').remove();
				$('#task_tbody>tr:first-child').find('.progress-bar').css('width', '100%')
			} else {
				return false;
			}
		}
	});
}
//搜索
function Search() {
	$('#chaxun').on('click',function () {
		var taskInput = $.trim($('#chaxun_input').val())
		var userId = sessionStorage.getItem('sessionId')
		if(userId == null) {
			if(confirm('请重新登录')) {
				location.href = 'http://10.102.6.141:8183/systemManage/login/login.html'
			}else{
				alert('不重新登录,无法获取数据!!!')
			}
		}
		
		$.ajax({
			type:"post",
			url:"http://10.101.139.21:8777/bjhc/task/info/name",
			data:{
				userId: userId,
				name: taskInput
			},
			async:true,
			success: function (data) {
				var data = data.msg
				$('#task_tbody').empty();
				var userId = sessionStorage.getItem('sessionId')
				
				$.each(data, function(k,v) {
					$('#task_tbody').append(
						'<tr>' +
						'<td>' + v.name + '</td>' +
						'<td>' + v.userName + '</td>' +
						'<td>' + (v.createTime == null ? '' : v.createTime) + '</td>' +
						'<td>' + v.upCount + '</td>' +
						'<td>' +
						' <div class="progress">' +
						'<div class="progress-bar" role="progressbar" style="width: 0;">' +
						'0' +
						'</div>' +
						'</div>' +
						'</td>' +
						'<td class="taskDetail1" onclick="DataDetail('+v.id+')">详情</td>' +
						'<td class="taskDel1" onclick="DelData(' + v.id + ',' + 'this)">删除</td>' +
						'</tr>'
					)
				});
				$('#task_tbody>tr').find('.progress-bar').css('width', '100%').text('100%')
			}
		});
	})
	$('#chaxun_input').on('blur',function () {
		if($('#chaxun_input').val() == '') {
			console.log(11)
			$('#task_tbody').empty();
			//获取所有记录
			getScData()
		}
	})
}
//数据详情
function DataDetail(id) {
	//location = 'subview/taskDetail.html?'+id
	//window.open('subview/taskDetail.html?'+id)
	var num = sessionStorage.getItem('finish')
	//if(num == 1) {
		var newTab = window.open('about:_blank')
		newTab.location.href = 'subview/taskDetail.html?'+id
	/*}else{
		return false;
	}*/
	
}
//获取所有记录
function getScData() {
	var userId = sessionStorage.getItem('sessionId')
	// if(userId == null) {
	// 	if(confirm('请重新登录')) {
	// 		location.href = 'http://10.102.6.141:8183/systemManage/login/login.html'
	// 	}else{
	// 		alert('不重新登录,无法获取数据!!!')
	// 	}
	// }
	
	$.ajax({
		type: "get",
		url: "http://10.101.139.21:8777/bjhc/task/info/get/"+userId,
		async: true,
		success: function(data) {
			console.log(data)
			// if(data.msg == 'login deny') {
			// 	alert('session已过期，请重新登录')
			// 	if(confirm('是否请重新登录？')) {
			// 		location.href = 'http://10.102.6.141:8183/systemManage/login/login.html'
			// 	}else{
			// 		alert('不重新登录,无法获取数据!!!')
			// 	}
			// 	return false;
			// }
			var total = data.msg.count;
			var data = data.msg.data
	
			var size = 15;
			var arr = [];
			datas = [];
			for(var i = 0; i < data.length; i++) {
				if(i % size == 0) {
					arr = [];
					datas.push(arr);
				}
				arr.push(data[i]);
			}
			content(datas[0])
			//分页
			pagination(total)
		}
	});
}
//调用load
function Load(jobid,seq,finish) {
	console.log(finish)
	if(finish == 1) {
		return false;
	}else{
		$.ajax({
			type:"get",
			url:"http://10.101.139.21:8777/bjhc/task/info/load/"+jobid+'/'+seq,
			async:true,
			success: function (data) {
				console.log(data)
				sessionStorage.setItem('sos',data.success)
			}
		});
	}
	
}
function content(data) {
	$('#task_tbody').empty();
	var jobid = '',seq = '';
	
	$.each(data, function(k, v) {
		//console.log(v)
		$('#task_tbody').append(
			'<tr>' +
			'<td>' + v.name + '</td>' +
			'<td>' + v.userName + '</td>' +
			'<td>' + (v.createTime == null ? '' : v.createTime) + '</td>' +
			'<td>' + v.upCount + '</td>' +
			'<td>' +
			' <div class="progress">' +
			'<div class="progress-bar" role="progressbar">' +
			'100%' +
			'</div>' +
			'</div>' +
			'</td>' +
			'<td class="taskDetail1" onclick="DataDetail('+v.id+')">详情</td>' +
			'<td class="taskDel1" onclick="DelData(' + v.id + ',' + 'this)">删除</td>' +
			'</tr>'
		)
		sessionStorage.setItem('finishs',v.finish)
	});
	for(var i in data) {
		seq = data[0].seq;
		jobid = data[0].id;
		finish = data[0].finish;
	}

	console.log(seq);
	console.log(jobid);
	sessionStorage.setItem('finish',finish)
	//调用load
	Load(jobid,seq,finish);
	
	if(sessionStorage.getItem('finish') == 0) {
		/*var finish1 = sessionStorage.getItem('finish')

		if(sessionStorage.getItem('finishs') == 1) {
			return false;
		}else{
			//进度条*/
			jinDu(finish);
		//}
		
	}else{
		$('#task_tbody>tr:first-child').find('.progress-bar').css('width', '100%')
	}
	
}
//进度条
function jinDu(finish) {
	var i = 1;
	var finishs = finish;
		function run(finishs) {
			$('#task_tbody>tr:first-child').find('.progress-bar').css('width', i + '%')
			$('#task_tbody>tr:first-child').find('.progress-bar').text(i + '%')
			
			if(finishs == 1) {
				i = 100;
				$('#task_tbody>tr:first-child').find('.progress-bar').css('width', i + '%')
				$('#task_tbody>tr:first-child').find('.progress-bar').text(i + '%')
				clearInterval(timer)
			}else{
				var g = sessionStorage.getItem('sos')
				
				if(g == 1) {
					i = 100;
					$('#task_tbody>tr:first-child').find('.progress-bar').css('width', i + '%')
					$('#task_tbody>tr:first-child').find('.progress-bar').text(i + '%')
					clearInterval(timer)
				}else{
					i++;
					if(i >= 100) {
						//alert('尚未加载成功，请稍候')
						i = 0
					}
				}
			}
		}
		
	var timer = setInterval(function () {
		run(finishs);		
	}, 100)
}
/**
 * 分页控件
 * @param total
 */
function pagination(total) {
	var demo2 = BootstrapPagination($("#pagination"), {
		layoutScheme: "lefttext,pagesizelist,firstpage,prevgrouppage,prevpage,pagenumber,nextpage,nextgrouppage,lastpage,pageinput,righttext",
		//记录总数。
		total: total,
		//分页尺寸。指示每页最多显示的记录数量。
		pageSize: 15,
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
			//getScData();

			content(datas[pageIndex])
//			$('#task_table').tablesorter({
//				sortList:[[2,0]]
//			})
		},
	});
}