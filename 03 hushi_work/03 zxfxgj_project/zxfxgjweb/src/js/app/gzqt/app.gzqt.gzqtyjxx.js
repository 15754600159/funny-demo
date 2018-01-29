app.gzqt.gzqtyjxx = {
	qtbh: '',
	init: function() {
		app.gzqt.gzqtyjxx.initSearchForm(0, 10, app.gzqt.gzqtyjxx.pagination);
	},
	initSearchForm: function(pageIndex, pageSize, pagination) {

		app.api.gzqt.gzqtyjxx({
			data: {
				pageNo: pageIndex,
				pageSize: pageSize,
				qtbh: app.gzqt.gzqtyjxx.qtbh
			},
			success: function(result) {
				var data = result.msg.result;
				console.info(data);
				$("#gzqtyj-table").empty();
				for (var i = 0; i < data.length; i++) {
					$("#gzqtyj-table").append(
						"<tr>" +
						"<td>" + data[i].xm + '</td>' +
						"<td>" + data[i].sfzh + "</td>" +
						"<td>" + data[i].fssj + "</td>" +
						"<td>" + data[i].xxdz + "</td>" +
						"<td>" + data[i].hdcs + "</td>" +
						"<td>" + data[i].hdxxxx + "</td>" +
						"</tr >"
					);
				}
				app.gzqt.gzqtyjxx.pagination && app.gzqt.gzqtyjxx.pagination(result.msg);
			}
		});
	},
	pagination: function(data) {
		BootstrapPagination(
			$("#gzqtyj_pagination"), {
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
					app.gzqt.gzqtyjxx.initSearchForm(pageIndex + 1, pageSize, pagination);
				},
			});
	},

};
