$(function() {
	//获取数据
	getScData()
	//进度条
	jinDu()
	//搜索
	Search()
})
//删除数据
function DelData(id, userId, dom) {
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
	})
}
//数据详情
function DataDetail(id) {
	sessionStorage.setItem('taskid',id)
	location.href = 'subview/taskDetail.html'
}
//获取所有记录
function getScData() {
	$.ajax({
		type: "get",
		url: "http://10.101.139.21:8777/bjhc/task/info/get/1",
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
		},
		complete: function () {
			//排序
			$('#task_table').tablesorter({
				headers:{
					0:{sorter:false},
					1:{sorter:false},
					4:{sorter:false},
					5:{sorter:false},
					6:{sorter:false}
				}
			})
		}
	});
}

function content(data) {
	$('#task_tbody').empty();

	$.each(data, function(k, v) {
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
			'<td class="taskDel1" onclick="DelData(' + v.id + ',' + v.userId + ',' + 'this)">删除</td>' +
			'</tr>'
		)

	});
}
//进度条
function jinDu() {
	var i = 1;
	function run() {
		$('.progress-bar').css('width', i + '%')
		$('.progress-bar').text(i + '%')

		if(i >= 100) {
			i = 100
			clearInterval(timer)
		} else {
			i++;
		}
	}
	var timer = setInterval(run, 1000)
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