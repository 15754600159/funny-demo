app.gzqt.glzdrSearch = {
	qtbh: null,
	url: 'pages/gzqt/glzdrview.html',
	close: function() {
		app.gzqt.glzdrSearch.clear();
		$m.page.closePage(app.gzqt.glzdrSearch.url, 'fade', 'container-wrapper');
	},
	clear: function() {
		app.gzqt.glzdrSearch.callback = null;
		app.gzqt.glzdrSearch.vehicles = null;
	},
	init: function() {
		$('#window-glzdr-addWindow').addClass('popIn');
		$('#window-glzdr-addWindow .btn-window-close').on('click', function() {
			$('#window-glzdr-addWindow').addClass('popOut');
			app.gzqt.glzdrSearch.close();

		});
		app.gzqt.glzdrSearch.initSearchForm(1, 10, app.gzqt.glzdrSearch.pagination);
	},

	initSearchForm: function(pageIndex, pageSize, pagination) {

		app.api.gzqt.glzdrview({
			data: {
				qtbh: app.gzqt.glzdrSearch.qtbh,
				pageNo: pageIndex,
				pageSize: pageSize
			},
			success: function(result) {
				var data = result.msg.result;
				console.info(data);
				$("#glzdr_list").empty();
				for (var i = 0; i < data.length; i++) {
					$("#glzdr_list").append(
						"<tr>" +
						"<td>" + data[i].qtbh + '</td>' +
						"<td>" + data[i].qtmc + "</td>" +
						"<td>" + data[i].glzdrmc + "</td>" +
						"<td>" + data[i].glzdrsfzh + "</td>" +
						"<td>" + data[i].zdrlb + "</td>" +
						"<td>" + data[i].cymc + "</td>" +
						"<td>" + data[i].cysfzh + "</td>" +
						"</tr >"
					);
				}
				app.gzqt.glzdrSearch.pagination && app.gzqt.glzdrSearch.pagination(result.msg);
			}
		});
	},
	pagination: function(data) {
		BootstrapPagination(
			$("#glzdrpagination"), {
				layoutScheme: "lefttext,pagesizelist,firstpage,prevgrouppage,prevpage,pagenumber,nextpage,nextgrouppage,lastpage,pageinput,righttext",
				//记录总数。
				total: data.total,
				//分页尺寸。指示每页最多显示的记录数量。
				pageSize: data.pageSize,
				//当前页索引编号。从其开始（从0开始）的整数。
				pageIndex: data.pageNo - 1,
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
				// 当分页更改后引发此事件。
				pageChanged: function(pageIndex, pageSize) {
					app.gzqt.glzdrSearch.initSearchForm(pageIndex + 1, pageSize, app.gzqt.glzdrSearch.pagination);
				},
			});
	},
};
