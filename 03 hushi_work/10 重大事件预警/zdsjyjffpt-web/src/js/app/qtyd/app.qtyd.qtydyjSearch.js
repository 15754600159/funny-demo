app.qtyd.qtydyjSearch = {

	init: function() {
		app.time.init();
		$('#begin_datetime').val('2001-01-01 00:00:00');
		$('#end_datetime').val(app.time.now());
		app.qtyd.qtydyjSearch.initSearchForm(1, 5, app.qtyd.qtydyjSearch.pagination);
		app.qtyd.qtydyjSearch.exportExcel();
	},
	exportExcel: function() {
		var groupName = $("#qtmc-name").val();
		var groupType = $('#qtlx-name').val();
		var changingStartTime = $('#begin_datetime').val();
		var changingEndTime = $('#end_datetime').val();
		var degreeType = $('#qt-ydwd').val();
		var localPopulation = $('#qt-bdqt').val();
		$('#qtyd_form_exportExcel').on('click', function() {
			var query = {
				pageNo: 1,
				pageSize: 10000,
				groupName: groupName,
				groupType: groupType,
				changingStartTime: changingStartTime,
				changingEndTime: changingEndTime,
				degreeType: degreeType,
				localPopulation: localPopulation
			};
			location.href = app.api.ydqtfx.exportFileUrl + $m.serialize(query);
		});
	},
	initSearchForm: function(pageIndex, pageSize, pagination) {
		var groupName = $("#qtmc-name").val();
		var groupType = $('#qtlx-name').val();
		var changingStartTime = $('#begin_datetime').val();
		var changingEndTime = $('#end_datetime').val();
		var degreeType = $('#qt-ydwd').val();
		var localPopulation = $('#qt-bdqt').val();
		app.api.ydqtfx.view({
			data: {
				groupName: groupName,
				groupType: groupType,
				changingStartTime: changingStartTime,
				changingEndTime: changingEndTime,
				degreeType: degreeType,
				localPopulation: localPopulation,
				pageNo: pageIndex,
				pageSize: pageSize
			},
			success: function(result) {
				var data = result.msg.result;
				console.info(data);
				var check = '';
				$("#qtydyj_search").empty();
				for (var i = 0; i < data.length; i++) {
					check = '<label class="check">' +
						'<input type="checkbox" name="sub" value="' + data[i].id + '">' +
						'<span> </span>' +
						'</label>'
					// check = "<input  type='checkbox' value='" + data[i].dqtbh + "' name='sub'>";
					$(".table_all").append(
						"<tr ondblclick=\"app.qtyd.qtydyjSearch.getActiveevents('" + data[i].groupName + "','" + data[i].groupType +
						"','" + data[i].countTime + "',1,10)\">" +
						"<td >" + check + '</td>' +
						"<td >" + data[i].groupName + '</td>' +
						//"<td ondblclick=\"app.qtyd.qtydyjSearch.getActiveevents(1,2,3)\">" + data[i].groupName + '</td>' +
						"<td>" + data[i].groupType + "</td>" +
						"<td>" + data[i].groupSize + "</td>" +
						"<td>" + data[i].changingPopulation + "</td>" +
						"<td>" + data[i].countTime + "</td>" +
						"<td>" + data[i].gatherDegree + "</td>" +
						"<td>" + data[i].activeDegree + "</td>" +
						"<td>" + data[i].abnormalDegree + "</td>" +
						"<td>" + '' +
						"</td>" +
						"</tr >"
					);
				}
				app.qtyd.qtydyjSearch.pagination && app.qtyd.qtydyjSearch.pagination(result.msg);
			}
		});
	},
	pagination: function(data) {
		BootstrapPagination(
			$("#ydqtyj_pagination"), {
				layoutScheme: "lefttext,pagesizelist,firstpage,prevgrouppage,prevpage,pagenumber,nextpage,nextgrouppage,lastpage,pageinput,righttext",
				// 记录总数。
				total: data.total,
				// 分页尺寸。指示每页最多显示的记录数量。
				pageSize: data.pageSize,
				// 当前页索引编号。从其开始（从0开始）的整数。
				pageIndex: data.pageNo - 1,
				// 指示分页导航栏中最多显示的页索引数量。
				pageGroupSize: 10,
				// 位于导航条左侧的输出信息格式化字符串
				leftFormateString: "本页{count}条记录/共{total}条记录",
				// 位于导航条右侧的输出信息格式化字符串
				rightFormateString: "第{pageNumber}页/共{totalPages}页",
				// 页码文本格式化字符串。
				pageNumberFormateString: "{pageNumber}",
				// 分页尺寸输出格式化字符串
				pageSizeListFormateString: "每页显示{pageSize}条记录",
				// 上一页导航按钮文本。
				prevPageText: "上一页",
				// 下一页导航按钮文本。
				nextPageText: "下一页",
				// 上一组分页导航按钮文本。
				prevGroupPageText: "上一组",
				// 下一组分页导航按钮文本。
				nextGroupPageText: "下一组",
				// 首页导航按钮文本。
				firstPageText: "首页",
				// 尾页导航按钮文本。
				lastPageText: "尾页",
				// 设置页码输入框中显示的提示文本。
				pageInputPlaceholder: "GO",
				// 接受用户输入内容的延迟时间。单位：毫秒
				pageInputTimeout: 800,
				// 分页尺寸列表。
				pageSizeList: [5, 10, 20],
				// 当分页更改后引发此事件。
				pageChanged: function(pageIndex, pageSize) {
					app.qtyd.qtydyjSearch.initSearchForm(pageIndex + 1, pageSize, app.qtyd.qtydyjSearch.pagination);
				},
			});
	},
	getActiveevents: function(groupName, groupType, countTime, pageIndex, pageSize, pagination) {
		app.api.ydqtfx.getActiveevents({
			data: {
				groupName: groupName,
				groupType: groupType,
				countTime: countTime,
				pageNo: pageIndex,
				pageSize: pageSize
			},
			success: function(result) {
				var data = result.msg.result;
				console.info(data);
				var check = '';
				$("#activeevents_search").empty();
				for (var i = 0; i < data.length; i++) {
					check = '<label class="check">' +
						'<input type="checkbox" name="sub" value="' + data[i].id + '">' +
						'<span> </span>' +
						'</label>'
					// check = "<input  type='checkbox' value='" + data[i].dqtbh + "' name='sub'>";
					$(".table_act").append(
						"<tr>" +
						"<td>" + data[i].id + '</td>' +
						"<td>" + data[i].sfzh + "</td>" +
						"<td>" + data[i].xm + "</td>" +
						"<td>" + data[i].ggbs + "</td>" +
						"<td>" + data[i].hdsj + "</td>" +
						"<td>" + data[i].hdd + "</td>" +
						"<td>" + data[i].hdxq + "</td>" +
						"</tr >"
					);
				}
				app.qtyd.qtydyjSearch.paginationAcT && app.qtyd.qtydyjSearch.paginationAcT(result.msg, groupName, groupType,
					countTime);
			}
		});
	},
	paginationAcT: function(data, groupName, groupType, countTime) {
		BootstrapPagination(
			$("#activeevents_pagination"), {
				layoutScheme: "lefttext,pagesizelist,firstpage,prevgrouppage,prevpage,pagenumber,nextpage,nextgrouppage,lastpage,pageinput,righttext",
				// 记录总数。
				total: data.total,
				// 分页尺寸。指示每页最多显示的记录数量。
				pageSize: data.pageSize,
				// 当前页索引编号。从其开始（从0开始）的整数。
				pageIndex: data.pageNo - 1,
				// 指示分页导航栏中最多显示的页索引数量。
				pageGroupSize: 10,
				// 位于导航条左侧的输出信息格式化字符串
				leftFormateString: "本页{count}条记录/共{total}条记录",
				// 位于导航条右侧的输出信息格式化字符串
				rightFormateString: "第{pageNumber}页/共{totalPages}页",
				// 页码文本格式化字符串。
				pageNumberFormateString: "{pageNumber}",
				// 分页尺寸输出格式化字符串
				pageSizeListFormateString: "每页显示{pageSize}条记录",
				// 上一页导航按钮文本。
				prevPageText: "上一页",
				// 下一页导航按钮文本。
				nextPageText: "下一页",
				// 上一组分页导航按钮文本。
				prevGroupPageText: "上一组",
				// 下一组分页导航按钮文本。
				nextGroupPageText: "下一组",
				// 首页导航按钮文本。
				firstPageText: "首页",
				// 尾页导航按钮文本。
				lastPageText: "尾页",
				// 设置页码输入框中显示的提示文本。
				pageInputPlaceholder: "GO",
				// 接受用户输入内容的延迟时间。单位：毫秒
				pageInputTimeout: 800,
				// 分页尺寸列表。
				pageSizeList: [5, 10, 20],
				// 当分页更改后引发此事件。
				pageChanged: function(pageIndex, pageSize) {
					app.qtyd.qtydyjSearch.getActiveevents(groupName, groupType, countTime, pageIndex + 1, pageSize, app.qtyd.qtydyjSearch
						.paginationAcT);
				},
			});
	},
};
