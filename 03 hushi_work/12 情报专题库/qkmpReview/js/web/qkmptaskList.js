//搜索
function SearchTask() {
	paginationQuery(1,15,qkmpPagination);
	
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

var isConcat = {
	"1" : "融合",
	"2" : "去重"
}
var qkmpTaskIdMap = {};
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
						statusHtml = '<div class="progress-bar" role="progressbar" style="width:0%;height:20px;" id="qkmp-progressbar-'+items[i].id+'">&nbsp;</div>';
						qkmpTaskIdMap[items[i].id] = 2;
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
				+ '<td>' + isConcat[items[i].isConcat]+ '</td>'
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
				if(items[i].status == 2){  
					// htmlStr +=  '<a href="#" onclick="executeOnce('+ items[i].id + ',this)" >执行一次</a>';
					 htmlStr += '<div id="qkmp-task-btn-'+items[i].id+'" style="display:none;"><a href="subview/qkmp.html?from=qkmprwlb&operation=alter&taskId=' + items[i].id + '">修改</a>'
					  + '<a href="#" onclick="qmkpDel('+ items[i].id + ')" >删除</a>'
					  + '<a href="#" onclick="showResult('+ items[i].id + ','+ items[i].isConcat + ',\''+formatDate(items[i].exeEndTime)+'\')" >查看摸排结果</a><div>';
				}
				// 执行完成
				if(items[i].status == 3){  
					htmlStr +=  '<a href="#" onclick="showResult('+ items[i].id + ','+ items[i].isConcat + ',\''+formatDate(items[i].exeEndTime)+'\')" >查看摸排结果</a>';
				}
				// 执行完成
				if(items[i].status == 1|| items[i].status == 4  ){ //    
					htmlStr +=  '<a href="#" onclick="executeOnce('+ items[i].id + ')" >执行</a>';
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

			for(var id in qkmpTaskIdMap){
				qkmpJinDu(id);
			}
			
			//分页
			qkmpPagination && qkmpPagination(page)
		}
	});
	
}

//进度条
function qkmpJinDu(id) {
	var i = 1;
	function run() {
		if(i==0){
			$('#qkmp-progressbar-'+id).css('display', 'none');
		}else{
			$('#qkmp-progressbar-'+id).css('display', 'block');
		}
		$('#qkmp-progressbar-'+id).css('width', i + '%');
		// $('#task_tbody>tr:first-child').find('.progress-bar').text(i + '%');
		
		var finish = qkmpTaskIdMap[id];
			
		if(finish != 2) {
//			i = 100;
//			$('#qkmp-progressbar-'+id).css('display', 'block');
//			$('#qkmp-task-btn-'+id).css('display', 'block');
//			$('#qkmp-progressbar-'+id).css('width', i + '%');
//			$('#qkmp-progressbar-'+id).text(i + '%');
//			clearInterval(timer);
		}else{
			i++;
			if(i >= 100) {
				i = 0;
				$.ajax({
					type:"get",
					url:qkmphost + "/api/task/view?taskId="+id,
					async:true,
					success: function (data) {
						console.log(data);
						qkmpTaskIdMap[id] = data.status;
						if(data.status != 2){
							paginationQuery(qkmpPageIndex, qkmpPageSize, qkmpPagination);
						}
					}
				});
				
			}
		}
	}
		
	var timer = setInterval(function () {
		run();		
	}, 100)
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
		$('#choseresule-unconcat-a').show();
		paginationResultQuery(1,15,qkmpResultPagination);
		$('#choseresule-unconcat-a').on('click', function (e) {
			$('#choseresule-unconcat-a').hide();
			$('#choseresule-concat').modal('hide');
			$('#choseresule').modal('show');
			resultTableQuery(taskId);
        });
		
		$('#download-result').on('click', function (e) {
        	location.href = qkmphost +'/api/task/resultlistExp?sourceTable=&targetTable=&pageSize=10000&taskId='+taskId;
        });
	}
}

function resultTableQuery(taskId){
	$("#list-qkmp-content").empty();
	$.ajax({
		type : 'get',
		url : qkmphost + 'api/task/listUnConcatTableList?taskId='+taskId,
		async : true,
		success : function(data) {
			var targetHtmlMap = {
				'0':'<div class="listall"><p class="head">资源类</p><div class="content-table my-style-scrollbar">',
				'1':'<div class="listall"><p class="head">轨迹类</p><div class="content-table my-style-scrollbar">',
				'2':'<div class="listall"><p class="head">人员类</p><div class="content-table my-style-scrollbar">',
				'5':'<div class="listall"><p class="head">物品类</p><div class="content-table my-style-scrollbar">',
				'6':'<div class="listall"><p class="head">案件类</p><div class="content-table my-style-scrollbar">',
				'7':'<div class="listall"><p class="head">组织类</p><div class="content-table my-style-scrollbar">',
				'4':'<div class="listall"><p class="head">本地类</p><div class="content-table my-style-scrollbar">'
			};
			var sourceHtml = '<div class="listall"><p>比对源</p>';
			
			for(var i=0;i<data.msg.list.length;i++){
				var table = data.msg.list[i];
				//  比对源
				if(table.compareType == "1"){
					sourceTable = table.tableId;
					sourceHtml+='<p>'+table.tableName+'</p>';
				}else{
					// 表类型（0资源 1轨迹 2人员,5物品，6案件，7组织，4 本地,3车辆 （弃用））
					var count = data.msg.resultCount[table.tableId] ? data.msg.resultCount[table.tableId] : '0';
					var targetHtml = "";
					if(count > 0){
						targetHtml +='<p class="have" onclick="showUnconcatResult(\''+table.tableId+'\');">'+table.tableName+'('+count+')</p>';
					}else{
						targetHtml +='<p>'+table.tableName+'(0)</p>';
					}
					targetHtmlMap[table.tableType] = targetHtmlMap[table.tableType] + targetHtml;
				}
			}
			$("#list-qkmp-content").append(sourceHtml+'</div>');
			for(var i in targetHtmlMap){
				$("#list-qkmp-content").append(targetHtmlMap[i]+'</div></div>');
			}
		 
		}
	});
	
}

function showUnconcatResult(targetTableId){
	$('#choseresule-unconcat-a').hide();
	$('#choseresule-concat').modal('show');
	console.log(targetTableId);
	targetTable = targetTableId;
	$('#download-result').on('click', function (e) {
    	location.href = qkmphost +'/api/task/resultlistExp?sourceTable='+sourceTable+'&targetTable='+targetTable+'&pageSize=10000&taskId='+qkmptaskId;
    });
	paginationUNConcatQuery(1,15,qkmpResultPagination);
}

function qmkpDel(taskId) {
	userId = getUser().loginName;
	if(confirm('您确定要删除吗？')) {
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
	} else {
		return false;
	}
}
/**
 * 比对结果 翻页
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
			addCompareTaskResult(data,"concat",pageIndex, pageSize);
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
			addCompareTaskResult(data,"unconcat",pageIndex, pageSize,sourceTable,targetTable);
		}
	});
}
/**
 * 
 * @param data 结果
 * @param concat 是否融合
 * @param pageIndex 页数
 * @param pageSize 页面大小
 * @param sourceTable 源表（去重，用来显示去重结果现实的哪个表） 
 * @param targetTable 目标表 
 */
function addCompareTaskResult(data,concat,pageIndex, pageSize,sourceTable,targetTable){
	$('#list-contcat-result').empty();
	console.log(data);
	var  thHeadHtml= '<tr style="background-color: #f8f8f8;">';
	var  thHtml= '<tr style="background-color: #f8f8f8;">';
	// 表格属性key
	var  tableList = [];
	var  tableListMap = {};
	// 比对表结构列表 组合 表格 th
	thHeadHtml += '<td rowspan="2">序号</td>';
	thHeadHtml += '<td rowspan="2" style="min-width: 95px;">命中时间</td>';
	thHeadHtml += '<td rowspan="2" style="min-width: 80px;">数量</td>';
	for(var i=0;i<data.msg.list.length;i++){
		var table = data.msg.list[i];
		// 比对源  比对目标 (sourceTable 或者 targetTable 为空  融合 ) 或者 (去重  属于 比对表  和目标表  才显示) 
		if((!sourceTable || !targetTable) || table.tableId == sourceTable || table.tableId == targetTable  ){
			var thArray = table.compareColumnName.split(",");
			var columnArray = table.compareColumn.split(",");
			//当前表 的属性key
			var columnList = [];
			var headSize = 0;
			for(var j=0;j<thArray.length;j++){
				if(thArray[j]){
					headSize++;
					thHtml += '<td>' + thArray[j]+'</td>';
					columnList.push(columnArray[j]);
				}
			}
			thHeadHtml += '<td colspan="'+headSize+'">' + table.tableName+'</td>';
			
			tableList.push(table.tableId);
			tableListMap[table.tableId] = columnList;
		}
	}
	thHeadHtml +='</tr>';
	thHtml +="</tr>";
	console.log(columnList);
	$('#list-contcat-result').append(thHeadHtml);
	$('#list-contcat-result').append(thHtml);
	
	var trHtml = "";
	var listData = data.msg.page;
	for(var i=0;i<listData.items.length;i++){
		var trindex = (((parseInt(pageIndex)-1)*parseInt(pageSize))+i+1);
		var compareData = listData.items[i]; // 比对结果  源 和 目标
		trHtml += '<tr style="cursor: pointer;" onclick="openOtherTr(\''+trindex+'\')">';
		trHtml += '<td>'+ trindex +'</td>';
		trHtml += '<td>'+ compareTime +'</td>';
		var otherTableTrSize = 0;
		
		// 取得行合并总数   和  合并总数之后的td 
		var trAfterHtml = '';
		// 根据比对的表 取出对应条数的  对应值
		for(var j=0;j<tableList.length;j++){
			var tableStr = compareData[tableList[j]]; // 一个表的 当前行 数据
			var tableData = JSON.parse(tableStr); // 表格当前行 数据list
			var columnList = tableListMap[tableList[j]];
			//  取出表对应列
			for(var k=0;k<columnList.length;k++){
				// 机动车  车牌种类 处理
				if(tableList[j] == 'QB_ZY_GA_JDCDJXX' || tableList[j] == 'QB_ZY_GA_JDCDJ'){
					if(columnList[k] == 'hpzl' || columnList[k] == 'jdccllxdm'){
						trAfterHtml += '<td>' + getCllx(tableData[0][columnList[k]]) +'</td>';
						continue;
					}
				}
				trAfterHtml += '<td>' + formatHtmlValue(tableData[0][columnList[k]]) +'</td>';
			}
			if(otherTableTrSize < (tableData.length - 1)){
				otherTableTrSize = (tableData.length - 1);
			}
		}
		
		console.log(otherTableTrSize);
		if(otherTableTrSize > 1){
			trHtml += '<td style="text-align: center;"><a href="#" title="点击展开/合并">共('+(otherTableTrSize+1)+'条)<br><a><span style="display:none" id="result-sub-index'+trindex+'">1</span></td>';
		}else{
			trHtml += '<td></td>';
		}
		trHtml += trAfterHtml;
		trHtml +="</tr>";
		
		// 当前行对应的 其他数据
		var otherTableTr = {};
		for(var j=0;j<tableList.length;j++){
			var tableStr = compareData[tableList[j]]; // 表格当前行 数据
			var tableData = JSON.parse(tableStr); // 表格当前行 数据list
			var columnList = tableListMap[tableList[j]];
			//  取出表对应列
			var tableTdHtmlArray = [];
			for(var n=1;n<tableData.length;n++){
				var tableTdHtml = "";
				for(var k=0;k<columnList.length;k++){
					// 机动车  车牌种类 处理
					if(tableList[j] == 'QB_ZY_GA_JDCDJXX' || tableList[j] == 'QB_ZY_GA_JDCDJ'){
						if(columnList[k] == 'hpzl' || columnList[k] == 'jdccllxdm'){
							tableTdHtml += '<td>' + getCllx(tableData[n][columnList[k]]) +'</td>';
							continue;
						}
					}
					tableTdHtml += '<td>' + formatHtmlValue(tableData[n][columnList[k]]) +'</td>';
				}
				tableTdHtmlArray.push(tableTdHtml);
			}
			otherTableTr[tableList[j]] = tableTdHtmlArray;
		}
		
		var trHtmlOther = "";
		for(var n=0;n<otherTableTrSize;n++){
			trHtmlOther += '<tr class="'+trindex+'" style="display:none;">';
			if(n == 0){
				trHtmlOther += '<td rowspan="'+otherTableTrSize+'">-</td><td rowspan="'+otherTableTrSize+'"></td>';
			}
			trHtmlOther += '<td style="text-align: center;">'+(n+2)+'</td>';
			for(var j=0;j<tableList.length;j++){
				var tdHtmlArray = otherTableTr[tableList[j]]; // 表格当前行 数据
				if(tdHtmlArray[n]){
					trHtmlOther += tdHtmlArray[n];
				}else{
					var columnList = tableListMap[tableList[j]];
					for(var k=0;k<columnList.length;k++){
						trHtmlOther += "<td></td>";
					}
				}
			}
			trHtmlOther += "</tr>";
		}
		trHtml += trHtmlOther;
	}
	
	$('#list-contcat-result').append(trHtml);
	var page = {};
	page.total = listData.totalCount;
	page.pageNumber = listData.page;
	page.pageSize = listData.pageSize;
	
	//分页
	qkmpResultPagination && qkmpResultPagination(page,concat)
}

function openOtherTr(trindex){
	$('#result-sub-index'+trindex).toggle();
	$('#list-contcat-result .'+trindex).toggle();
}

var cllxMap = {'01':'大型汽车号牌','02':'小型汽车号牌','03':'使馆汽车号牌','04':'领馆汽车号牌','05':'境外汽车号牌','06':'外籍汽车号牌','07':'两、三轮摩托车号牌','08':'两、三轮摩托车号牌','09':'使馆摩托车号牌','10':'领馆摩托车号牌','11':'境外摩托车号牌','12':'外籍摩托车号牌','13':'农用运输车号牌','14':'拖拉机号牌','15':'挂车号牌','16':'教练汽车号牌','17':'教练摩托车号牌','18':'试验汽车号牌','19':'试验摩托车号牌','20':'临时入境汽车号牌','21':'临时入境摩托车号牌','22':'临时行驶车号牌','23':'警用汽车号牌','24':'警用摩托号牌','99':'其他号牌'};

/**
 * 查询车辆类型
 * @param cartype
 */
function getCllx(cartype){
	var tdstr = '';
	if(cartype && cartype != 'null'){
		tdstr = cllxMap[cartype];
		if(tdstr){
			return tdstr;
		}else{
			return '';
		}
	}
	return tdstr;
}

/**
 * 数据格式化
 * @param htmlStr
 */
function formatHtmlValue(htmlStr){
	var tdstr = '';
	if(htmlStr && htmlStr != 'null'){
		tdstr = htmlStr;
	}
	return tdstr;
}

function executeOnce(taskId){
	userId = getUser().loginName;
	$.ajax({
		type : "get",
		url : qkmphost + "api/task/executeOnce?taskId=" + taskId + "&userId=" + userId,
		async : true,
		success : function(data) {
			console.log(data);
			if (data.success == "1") {
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
