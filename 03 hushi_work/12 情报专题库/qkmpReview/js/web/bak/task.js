$(function() {
	//获取数据
	getScData()
	//搜索
	Search();
	
	//搜索
	SearchTask();
	
	// 页面点击事件监听
	bindClickFunc();
	
	paginationQuery(1,15,qkmpPagination);
})

/**
 * @desc 页面点击事件监听
 * @param none
 * @return undefined
 */
function bindClickFunc(){
	var from = GetQueryString("from");
	if(from=='qkmp'){
		$('.subtitle-box .bjsc').removeClass("active");
		$('.subtitle-box .qkmp').addClass("active");
		$('#bjsc-task-div').css('display', 'none');
		$('#qkmp-task-div').css('display', '');
	}
	
	// 副标题 背景审查、情况摸排页面切换
	$('.subtitle-box span').on('click', function(e){
		var target = $(e.currentTarget);
		if(target.hasClass('bjsc')){
			$('.subtitle-box .qkmp').removeClass("active");
			$('.subtitle-box .bjsc').addClass("active");
			$('#qkmp-task-div').css('display', 'none');
			$('#bjsc-task-div').css('display', '');
		}else{
			$('.subtitle-box .bjsc').removeClass("active");
			$('.subtitle-box .qkmp').addClass("active");
			$('#bjsc-task-div').css('display', 'none');
			$('#qkmp-task-div').css('display', '');
		}
	})
}

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
		url: bjhchost+ "/task/info/delete/" + id + '/' + userId,
		async: true,
		success: function(data) {
			console.log(data)
			if(confirm('您确定要删除吗？')) {
				if(data.success != 1) {
					alert('未找到记录');
					return false;
				}
				$(dom).parents('tr').remove();
				// $('#task_tbody>tr:first-child').find('.progress-bar').css('width', '100%')
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
			url:bjhchost+ "/task/info/name",
			data:{
				userId: userId,
				name: taskInput
			},
			async:true,
			success: function (data) {
				content(data);
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
	var num = sessionStorage.getItem('finish')
		location.href = 'subview/taskListDetail.html?taskId='+id
}
//获取所有记录
function getScData() {
	var userId = sessionStorage.getItem('sessionId');
	$.ajax({
		type: "get",
		url: bjhchost+ "/task/info/get/"+userId,
		async: true,
		success: function(data) {
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
function Load(jobid,seq,finish,dom) {
	console.log(finish)
	if(finish == 1) {
		return false;
	}else{
		$.ajax({
			type:"get",
			url:bjhchost+ "/task/info/load/"+jobid+'/'+seq,
			async:true,
			success: function (data) {
				console.log(data);
				console.log($(dom).parents('tr'));
				$(dom).parents('tr').find('.task-status').html('执行中');
				$(dom).parents('tr').find('.progress-bar').css('width', '80%');
				$(dom).parents('tr').find('.progress-bar').text('80%');
				sessionStorage.setItem('sos',data.success)
			}
		});
	}
	
}
/**
 * 背景审核任务列表修改
 * @param data
 */
function content(data) {
	$('#task_tbody').empty();
	var jobid = '',seq = '';
	
	$.each(data, function(k, v) {
		var statusHtml = '<div class="progress"><div class="progress-bar" role="progressbar">100%</div></div>';
		var statusStr = '';
		var loadBtn = '';
		var btnHtml = '';
		if (v.finish == 0) {
			statusStr = "创建完成";
			statusHtml = '<div class="progress-bar" role="progressbar" style="width: 50%;">50%</div>';
			btnHtml = '<a href="#" onclick="Load(\''+v.id+'\',\''+v.seq+'\','+v.finish+',this);">执行</a>';
		}if (v.finish == 1) {
			statusStr = "执行完成";
			statusHtml = '<div class="progress-bar" role="progressbar" style="width: 100%;">100%</div>';
			btnHtml = '<a href="#" onclick="DataDetail('+v.id+')">详情</a>'+ 
			'<a href="#" onclick="DelData(' + v.id + ',this)">删除</a>';
		} else if (v.finish == 2) {
			statusStr = "执行中";
			statusHtml = '<div class="progress-bar" role="progressbar" style="width: 80%;">80%</div>';
			// btnHtml = '<a href="#">详情</a><a href="#">删除</a>';
		} else if (v.finish == 3) {
			statusStr = "执行失败";
			statusHtml = '<div class="progress-bar" role="progressbar" style="width: 0%;">0%</div>';
			btnHtml = '<a href="#" onclick="DelData(' + v.id + ',this)">删除</a><a href="#" onclick="Load(\''+v.id+'\',\''+v.seq+'\','+v.finish+',this);">重新执行</a>';
		}
		
		//console.log(v)
		$('#task_tbody').append(
			'<tr>' +
			'<td>' + v.name + '</td>' +
			'<td>' + v.userName + '</td>' +
			'<td>' + (v.createTime == null ? '' : v.createTime) + '</td>' +
			'<td>' + v.upCount + '</td>' +
			'<td><span class="task-status">' + statusStr +'</span></td>' +
			'<td>' + statusHtml +'</td>' +
			'<td class="cz taskDetail1">'+ btnHtml +
			'</td>' +
			'</tr>'
		)
		sessionStorage.setItem('finishs',v.finish)
	});
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
 
