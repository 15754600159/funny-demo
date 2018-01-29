$(function() {
	//根据身份证号 加载数据
	getData()
	//分页
	pagination(6);
	//加载任务详情
	getTaskData()
	//筛选数据
	SxData()
})
//根据身份证号 加载数据
function getData() {
	var sfzh = sessionStorage.getItem('sfzh')
	if(sfzh == null) return false;
	
	$.ajax({
		type: "get",
		url: "http://10.101.139.21:8778/bjhc/task/info/one/" + sfzh,
		async: true,
		success: function(data) {
			var data1 = data.msg.details
			console.log(data)
			var sex = '';
			$.each(data1, function(k, v) {
				console.log(v)
				if(v.sex == 1) {
					sex = '男'
				}else if(v.sex == null){
					sex = ''
				}else{
					sex = '女'
				}
				$('.task-detail-box').append(
					'<div class="task-detail-card">' +
					'<div class="img-box">' +
					'<img src=http://10.101.5.157/sfz/' + v.idCard + '/0.jpeg onerror="this.src=\'../../img/nav-logo.png\'" />' +
					'</div>' +
					'<div class="detail-box">' +
					'<div class="person-info">' +
					'<p>' +
					'姓名：<span class="person-name">' + (v.name == null ? '' : v.name) + '</span> 身份证号：' +
					'<span class="person-sfzh">' + v.idCard + '</span> 性别：' +
					'<span class="person-sex">' + sex + '</span>' +
					'</p>' +
					'<p>出生日期：<span class="person-date">' + (v.birthday == null ? '' : v.birthday) + '</span></p>' +
					'</div>' +
					'<div class="tags">' +
					'<span class="label label-warning">'+v.tag+'</span>' +
					'</div>' +
					'</div>' +
					'<div class="button-box">' +
					'<button type="button" class="btn btn-default details-info"  onclick="location.href = \'yjlDetails.html\'">详细信息</button>' +
					'<button type="button" class="btn btn-default">跳到图析</button>' +
					'<button type="button" class="btn btn-default">人工研判</button>' +
					'</div>' +
					'</div>'
				);
			});
		},
		complete: function () {
			sessionStorage.removeItem('sfzh')
		}
	});
}
function getTaskData() {
	var id = sessionStorage.getItem('taskid')
	if(id == null) return false;
	$.ajax({
		type:"get",
		url:"http://10.101.139.21:8778/bjhc/task/detail/get/"+id,
		async:true,
		success: function (data) {
			console.log(data)
			var data1 = data.msg.data
			var sex = '';
			$.each(data1, function(k, v) {
				//console.log(v)
				if(v.sex == 1) {
					sex = '男'
				}else if(v.sex == null){
					sex = ''
				}else{
					sex = '女'
				}
				$('.task-detail-box').append(
					'<div class="task-detail-card">' +
					'<div class="img-box">' +
					'<img src=http://10.101.5.157/sfz/' + v.idCard + '/0.jpeg onerror="this.src=\'../../img/nav-logo.png\'" />' +
					'</div>' +
					'<div class="detail-box">' +
					'<div class="person-info">' +
					'<p>' +
					'姓名：<span class="person-name">' + (v.name == null ? '' : v.name) + '</span> 身份证号：' +
					'<span class="person-sfzh">' + v.idCard + '</span> 性别：' +
					'<span class="person-sex">' + sex + '</span>' +
					'</p>' +
					'<p>出生日期：<span class="person-date">' + (v.birthday == null ? '' : v.birthday) + '</span></p>' +
					'</div>' +
					'<div class="tags">' +
					'<span class="label label-warning">'+v.tag+'</span>' +
					'</div>' +
					'</div>' +
					'<div class="button-box">' +
					'<button type="button" class="btn btn-default details-info"  onclick="location.href = \'yjlDetails.html\'">详细信息</button>' +
					'<button type="button" class="btn btn-default">跳到图析</button>' +
					'<button type="button" class="btn btn-default">人工研判</button>' +
					'</div>' +
					'</div>'
				);
			});
		},
		complete: function () {
			sessionStorage.removeItem('taskid')
		}
	});
}
//筛选数据
function SxData() {
	var str = '';
	var id = sessionStorage.getItem('taskid')
	
	$('#ck_btn').on('click',function () {
		$.each($('input[type="checkbox"]:checked'), function(k,v) {
			str += $(this).val()+','
		});
		
		$.ajax({
			type:"post",
			url:"http://10.101.139.21:8778/bjhc/task/detail/tag",
			data:{
				id:id,
				tags:str
			},
			async:true,
			success: function (data) {
				console.log(data)
			}
		});
	})
	
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
		pageSizeList: [5, 10, 20, 50, 100, 200],
		//当分页更改后引发此事件。
		pageChanged: function(pageIndex, pageSize) {
			pagipationQuery(pageIndex, pageSize);
		},
	});
}