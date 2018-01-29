//搜索
function SearchTask() {
	$('#chaxun_task').on('click',function () {
		paginationQuery(1,15,qkmpPagination);
	})
}

/**
 * 分页控件
 * @param total
 */
var qkmpPageSize = 15;
var qkmpPageIndex = 1;
function qkmpPagination(data) {
	qkmpPageSize = data.pageSize;
	qkmpPageIndex = data.pageNumber;
	BootstrapPagination(
			$("#qkmp-pagination"),
			{
				layoutScheme : "lefttext,pagesizelist,firstpage,prevgrouppage,prevpage,pagenumber,nextpage,nextgrouppage,lastpage,pageinput,righttext",
				//记录总数。
				total : data.total,
				//分页尺寸。指示每页最多显示的记录数量。
				pageSize : data.pageSize,
				//当前页索引编号。从其开始（从0开始）的整数。
				pageIndex : data.pageNumber - 1,
				//指示分页导航栏中最多显示的页索引数量。
				pageGroupSize : 10,
				//位于导航条左侧的输出信息格式化字符串
				leftFormateString : "本页{count}条记录/共{total}条记录",
				//位于导航条右侧的输出信息格式化字符串
				rightFormateString : "第{pageNumber}页/共{totalPages}页",
				//页码文本格式化字符串。
				pageNumberFormateString : "{pageNumber}",
				//分页尺寸输出格式化字符串
				pageSizeListFormateString : "每页显示{pageSize}条记录",
				//上一页导航按钮文本。
				prevPageText : "上一页",
				//下一页导航按钮文本。
				nextPageText : "下一页",
				//上一组分页导航按钮文本。
				prevGroupPageText : "上一组",
				//下一组分页导航按钮文本。
				nextGroupPageText : "下一组",
				//首页导航按钮文本。
				firstPageText : "首页",
				//尾页导航按钮文本。
				lastPageText : "尾页",
				//设置页码输入框中显示的提示文本。
				pageInputPlaceholder : "GO",
				//接受用户输入内容的延迟时间。单位：毫秒
				pageInputTimeout : 800,
				//分页尺寸列表。
				pageSizeList : [ 5, 10, 20 ],
				//当分页更改后引发此事件。
				pageChanged : function(pageIndex, pageSize) {
					//getScData();
					paginationQuery(pageIndex + 1, pageSize, qkmpPagination)
				},
			});
}

function paginationQuery(pageIndex, pageSize, qkmpPagination) {
	$.ajax({
		url : qkmphost + "/api/task/serach?name="+$.trim($('#chaxun_task_input').val())+"&pageSize=" + pageSize + "&pageNum=" + pageIndex,
		type: 'get',
		async : true,
		success : function(data) {
			console.log(data)
			taskMap = {};
			var total = data.msg.totalCount;
			var items = data.msg.items
			$('#bd_task_tbody').empty()
			for (var i = 0; i < items.length; i++) {
				var statusStr = "";
				var statusHtml = '<div class="progress-bar" role="progressbar" style="width: 50%;">50%</div>';
				if (items[i].status) {
					if (items[i].status == 1) {
						statusStr = "创建完成";
					} else if (items[i].status == 2) {
						statusStr = "执行中";
						statusHtml = '<div class="progress-bar" role="progressbar" style="width: 80%;">80%</div>';
					}else if (items[i].status == 3) {
						statusStr = "执行完成";
						statusHtml = '<div class="progress-bar" role="progressbar" style="width: 100%;">100%</div>';
					}else if (items[i].status == 4) {
						statusStr = "执行失败";
						statusHtml = '<div class="progress-bar" role="progressbar" style="width: 0%;">0%</div>';
					}
				}
				var htmlStr = '<tr>' 
				+ '<td>' + (items[i].id ? items[i].id : "") + '</td>'
				+ '<td>' +  (items[i].name?items[i].name : "") + '</td>'
				+ '<td>'+ (items[i].updateUserid?items[i].updateUserid:items[i].createUserid) + '</td>' 
				+ '<td>' + formatDate(items[i].exeTime) + '</td>'
				+ '<td>' + formatDate(items[i].exeEndTime) + '</td>'
				+ '<td>' + statusStr + '</td>'
				+ '<td><div class="progress">' + statusHtml + '</div></td>' 
				+ '<td class="cz">'
				+'<a href="subview/qkmp.html?from=qkmprwlb&operation=check&taskId=' + items[i].id + '">查看</a>';
				// 非执行中
				if(items[i].status != 2){  
					// htmlStr +=  '<a href="#" onclick="executeOnce('+ items[i].id + ',this)" >执行一次</a>';
					 htmlStr += '<a href="subview/qkmp.html?from=qkmprwlb&operation=alter&taskId=' + items[i].id + '">修改</a>';
					 htmlStr += '<a href="#" onclick="qmkpDel('+ items[i].id + ')" >删除</a>';
				}
				// 执行完成
				if(items[i].status == 3){  
					htmlStr +=  '<a href="#" onclick="showResult('+ items[i].id + ','+ items[i].isConcat + ',\''+formatDate(items[i].exeEndTime)+'\')" >查看摸排结果</a>';
				}
				htmlStr += '</td></tr>';
				$("#bd_task_tbody").append(htmlStr);
			}
			
			
			var page = {};
			page.total = data.msg.totalCount;
			page.count = items.length;
			page.pageNumber = data.msg.page;
			page.totalPages = data.msg.totalPageCount;
			page.pageSize = data.msg.pageSize;

			
			
			//分页
			qkmpPagination && qkmpPagination(page)
		}
	});
}



var qkmptaskId = "";
var targetTable = "";
var sourceTable = "";
var compareTime = "";
/**
 * 查询摸排结果
 * @param taskId
 * @param isConcat
 */
function showResult(taskId,isConcat,time){
	qkmptaskId = taskId;
	compareTime = time;
	// 2 去重
	if(isConcat=="2"){
		$('#choseresule').modal('show');
		resultTableQuery(taskId);
	// 1 融合
	}else{
		$('#choseresule-concat').modal('show');
		paginationResultQuery(1,15,qkmpResultPagination);
	}
}


function resultTableQuery(taskId){
	$("#list-qkmp-content").empty();
	$.ajax({
		type : 'get',
		url : qkmphost + 'api/task/listUnConcatTableList?taskId='+taskId,
		async : true,
		success : function(data) {
			var comareHtml = '<div class="list-name listall">';
			var peopleHtml = '<div class="people listall"><p>人员类</p>';
			var carHtml = '<div class="car listall"><p>车辆类</p>';
			var guijiHtml = '<div class="guiji listall"><p>轨迹类</p>';
			var ziyuanHtml = '<div class="ziyuan listall"><p>资源类</p>';
			var bendiHtml = '<div class="bendi listall"><p>本地类</p>';
				// <p class="have">重点人信息（1）</p>
			console.log(data.msg.list);
			for(var i=0;i<data.msg.list.length;i++){
				var table = data.msg.list[i];
				if(table.compareType == "1"){
					sourceTable = table.tableId;
					comareHtml+='<p>'+table.tableName+'</p>';
				}else{
					// 表类型（0资源 1轨迹 2人员,3车辆 4 本地）
					var count = data.msg.resultCount[table.tableId] ? data.msg.resultCount[table.tableId] : '0';
					if(table.tableType = "0"){
						if(data.msg.resultCount[table.tableId]==0){
							ziyuanHtml +='<p>'+table.tableName+'(0)</p>';
						}else{
							ziyuanHtml +='<p class="have" onclick="showUnconcatResult(\''+table.tableId+'\');">'+table.tableName+'('+count+')</p>';
						}
					}else if(table.tableType = "1"){
						if(data.msg.resultCount[table.tableId]==0){
							guijiHtml +='<p>'+table.tableName+'(0)</p>';
						}else{
							guijiHtml +='<p class="have" onclick="showUnconcatResult(\''+table.tableId+'\');">'+table.tableName+'('+count+')</p>';
						}
					}else if(table.tableType = "2"){
						if(data.msg.resultCount[table.tableId]==0){
							peopleHtml +='<p>'+table.tableName+'(0)</p>';
						}else{
							peopleHtml +='<p class="have" onclick="showUnconcatResult(\''+table.tableId+'\');">'+table.tableName+'('+count+')</p>';
						}
					}else if(table.tableType = "3"){
						if(data.msg.resultCount[table.tableId]==0){
							carHtml +='<p>'+table.tableName+'(0)</p>';
						}else{
							carHtml +='<p class="have" onclick="showUnconcatResult(\''+table.tableId+'\');">'+table.tableName+'('+count+')</p>';
						}
					}else if(table.tableType = "4"){
						if(data.msg.resultCount[table.tableId]==0){
							bendiHtml +='<p>'+table.tableName+'(0)</p>';
						}else{
							bendiHtml +='<p class="have" onclick="showUnconcatResult(\''+table.tableId+'\');">'+table.tableName+'('+count+')</p>';
						}
					}
				}
			}
			
		 comareHtml += '</div>';
		 peopleHtml +='</div>';
		 carHtml +='</div>';
		 guijiHtml +='</div>';
		 ziyuanHtml +='</div>';
		 bendiHtml +='</div>';
			
		 $("#list-qkmp-content").html(comareHtml+peopleHtml+carHtml+guijiHtml+ziyuanHtml+bendiHtml);
		}
	});
	
}

function showUnconcatResult(targetTableId){
	$('#choseresule-concat').modal('show');
	console.log(targetTableId);
	targetTable = targetTableId;
	paginationUNConcatQuery(1,15,qkmpResultPagination);
}

function qmkpDel(taskId) {
	userId = getUser().loginName;
	$.ajax({
		type : "get",
		url : qkmphost + "api/task/delete?taskId=" + taskId + "&userId=" + userId,
		async : true,
		success : function(data) {
			console.log(data);
			if (data.success == "1") {
				alert("删除成功");
				paginationQuery(qkmpPageIndex, qkmpPageSize, qkmpPagination);
			}
		}
	});
}
/**
 * 融合翻页
 * @param data
 */
function qkmpResultPagination(data,concat) {
	console.log(data);
	BootstrapPagination(
			$("#qkmp-result-pagination"),
			{
				layoutScheme : "lefttext,pagesizelist,firstpage,prevgrouppage,prevpage,pagenumber,nextpage,nextgrouppage,lastpage,pageinput,righttext",
				//记录总数。
				total : data.total,
				//分页尺寸。指示每页最多显示的记录数量。
				pageSize : data.pageSize,
				//当前页索引编号。从其开始（从0开始）的整数。
				pageIndex : data.pageNumber - 1,
				//指示分页导航栏中最多显示的页索引数量。
				pageGroupSize : 10,
				//位于导航条左侧的输出信息格式化字符串
				leftFormateString : "本页{count}条记录/共{total}条记录",
				//位于导航条右侧的输出信息格式化字符串
				rightFormateString : "第{pageNumber}页/共{totalPages}页",
				//页码文本格式化字符串。
				pageNumberFormateString : "{pageNumber}",
				//分页尺寸输出格式化字符串
				pageSizeListFormateString : "每页显示{pageSize}条记录",
				//上一页导航按钮文本。
				prevPageText : "上一页",
				//下一页导航按钮文本。
				nextPageText : "下一页",
				//上一组分页导航按钮文本。
				prevGroupPageText : "上一组",
				//下一组分页导航按钮文本。
				nextGroupPageText : "下一组",
				//首页导航按钮文本。
				firstPageText : "首页",
				//尾页导航按钮文本。
				lastPageText : "尾页",
				//设置页码输入框中显示的提示文本。
				pageInputPlaceholder : "GO",
				//接受用户输入内容的延迟时间。单位：毫秒
				pageInputTimeout : 800,
				//分页尺寸列表。
				pageSizeList : [ 5, 10, 20 ],
				//当分页更改后引发此事件。
				pageChanged : function(pageIndex, pageSize) {
					//getScData();
					if(concat == "concat"){
						paginationResultQuery(pageIndex + 1, pageSize, qkmpResultPagination);
					}else{
						paginationUNConcatQuery(pageIndex + 1, pageSize, qkmpResultPagination);
					}
				},
			});
}

/**
 * 融合翻页
 * @param pageIndex
 * @param pageSize
 * @param qkmpResultPagination
 */

function paginationResultQuery(pageIndex, pageSize, qkmpResultPagination){
	$.ajax({
		type : 'get',
		url : qkmphost + 'api/task/listData?taskId='+qkmptaskId+'&pageSize='+pageSize+'&pageNum='+pageIndex,
		async : true,
		success : function(data) {
			$('#list-contcat-result').empty();
			console.log(data);
			var  thHeadHtml= "<tr>";
			var  thHtml= "<tr>";
			var  columnList = [];
			// 比对表结构列表 组合 表格 th
			thHeadHtml += '<td rowspan="2">序号</td>';
			thHeadHtml += '<td rowspan="2">命中时间</td>';
			// 比对表结构列表 组合 表格 th
			for(var i=0;i<data.msg.list.length;i++){
				var table = data.msg.list[i];
				var thArray = table.compareColumnName.split(",");
				var columnArray = table.compareColumn.split(",");
				thHeadHtml += '<td colspan="'+thArray.length+'">' + table.tableName+'</td>';
				
				for(var j=0;j<thArray.length;j++){
					thHtml += '<td>' + thArray[j]+'</td>';
					columnList.push(table.tableId + columnArray[j]);
				}
			}
			thHeadHtml +="</tr>";
			thHtml +="</tr>";
			console.log(columnList);
			$('#list-contcat-result').append(thHeadHtml);
			$('#list-contcat-result').append(thHtml);
			
			var trHtml = "";
			var listData = data.msg.listData;
			for(var i=0;i<listData.items.length;i++){
				var tableData = listData.items[i];
				trHtml += "<tr>";
				trHtml += '<td>'+ (((parseInt(pageIndex)-1)*parseInt(pageSize))+i+1) +'</td>';
				trHtml += '<td>'+ compareTime +'</td>';
				for(var j=0;j<columnList.length;j++){
					
					trHtml += '<td>' + (tableData[columnList[j]]?tableData[columnList[j]] : "") +'</td>';
				}
				trHtml +="</tr>";
			}
			$('#list-contcat-result').append(trHtml);
			var page = {};
			page.total = listData.totalCount;
			page.count = listData.items.length;
			page.pageNumber = listData.page;
			page.totalPages = listData.totalPageCount;
			page.pageSize = listData.pageSize;

			//分页
			qkmpResultPagination && qkmpResultPagination(page,"concat")
		}
	});
}


/**
 * 非融合翻页
 * @param pageIndex
 * @param pageSize
 * @param qkmpResultPagination
 */

function paginationUNConcatQuery(pageIndex, pageSize, qkmpResultPagination){
	$.ajax({
		type : 'get',
		url : qkmphost + 'api/task/listUnConcatData?taskId='+qkmptaskId+'&sourceTable='+sourceTable+'&targetTable='+targetTable+'&pageSize='+pageSize+'&pageNum='+pageIndex,
		async : true,
		success : function(data) {
			$('#list-contcat-result').empty();
			console.log(data);
			var  thHeadHtml= "<tr>";
			var  thHtml= "<tr>";
			// 字段属性名称
			var  columnList = [];
			// 比对表结构列表 组合 表格 th
			thHeadHtml += '<td rowspan="2">序号</td>';
			thHeadHtml += '<td rowspan="2">命中时间</td>';
			for(var i=0;i<data.msg.list.length;i++){
				var table = data.msg.list[i];
				// 比对源  比对目标
				if(table.tableId == sourceTable || table.tableId == targetTable  ){
					var thArray = table.compareColumnName.split(",");
					var columnArray = table.compareColumn.split(",");
					// 表头 第一行  表名
					var headSize = 0;
					// 表头  第二行  列名
					for(var j=0;j<thArray.length;j++){
						if(thArray[j]){
							headSize++;
							thHtml += '<td>' + thArray[j]+'</td>';
							columnList.push(table.tableId + columnArray[j]);
						}
					}
					thHeadHtml += '<td colspan="'+headSize+'">' + table.tableName+'</td>';
				}
			}
			thHeadHtml +="</tr>";
			thHtml +="</tr>";
			console.log(columnList);
			$('#list-contcat-result').append(thHeadHtml);
			$('#list-contcat-result').append(thHtml);
			
			var trHtml = "";
			var listData = data.msg.page;
			for(var i=0;i<listData.items.length;i++){
				var tableData = listData.items[i];
				trHtml += "<tr>";
				trHtml += '<td>'+ (((parseInt(pageIndex)-1)*parseInt(pageSize))+i+1) +'</td>';
				trHtml += '<td>'+ compareTime +'</td>';
				for(var j=0;j<columnList.length;j++){
					
					trHtml += '<td>' + (tableData[columnList[j]]?tableData[columnList[j]] : "") +'</td>';
				}
				trHtml +="</tr>";
			}
			$('#list-contcat-result').append(trHtml);
			var page = {};
			page.total = listData.totalCount;
			page.count = listData.items.length;
			page.pageNumber = listData.page;
			page.totalPages = listData.totalPageCount;
			page.pageSize = listData.pageSize;

			//分页
			qkmpResultPagination && qkmpResultPagination(page,"unconcat")
		}
	});
}

function executeOnce(taskId,obj){
	userId = getUser().loginName;
	$.ajax({
		type : "get",
		url : qkmphost + "api/task/executeOnce?taskId=" + taskId + "&userId=" + userId,
		async : true,
		success : function(data) {
			console.log(data);
			if (data.success == "1") {
//				var $tr = $(obj).closest("tr");
//				$tr.children().eq(4).html('执行中');
//				$tr.children().eq(5).html('<div class="progress-bar" role="progressbar" style="width: 80%;">80%</div>');
//				$(obj).hide();
				alert("执行成功");
				paginationQuery(qkmpPageIndex, qkmpPageSize, qkmpPagination);
			}
		}
	});
}

function centerModals() {
	$('.modal').each(function(i) {
		var $clone = $(this).clone().css('display', 'block').appendTo('body');
		var top = Math.round(($clone.height() - $clone.find('.modal-content').height()) / 2);
		top = top > 50 ? top : 0;
		$clone.remove();
		$(this).find('.modal-content').css("margin-top", 100);
	});
}
// 在模态框出现的时候调用垂直居中函数
$('.modal').on('show.bs.modal', centerModals);
// 在窗口大小改变的时候调用垂直居中函数
$(window).on('resize', centerModals);
