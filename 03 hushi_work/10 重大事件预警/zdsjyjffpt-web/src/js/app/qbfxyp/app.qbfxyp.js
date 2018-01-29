app.qbfxyp = {
	pageno: 0,
	qtbhs: null,
	newspageno: 0,
	oldpageno: 0,
	zdroldpageno: 0,
	zdrpageno: 1,
	glpageno: 0,
	cypageno: 0,
	qtbhNo: null,
	xspageno: 1,
	init: function () {
		// 初始化页面元素点击功能
		this.initClickFunc();
		app.time.init();
		// 加载页面信息
		app.qbfxyp.initSearchForm(0, 1, app.qbfxyp.pagination);


	},
	initClickFunc: function () {
		const that = this;

		// 页面bottom-part标签切换的点击功能
		$('.xsfxcl .tabs').on('click', 'span', function () {
			const tab = $(this);
			var tags = $(tab).attr("tags");
			var subPage = tab.data('subpage');
			tab.addClass('active').siblings().removeClass('active');
			tab.parents('.bottom-part').find('.tab-content .' + subPage).addClass('active').siblings().removeClass('active');
			if (tags == 1 && app.qbfxyp.qtbhs) {
				app.qbfxyp.qtbhnewsSearchForm(0, 10, app.qbfxyp.newspagination);
			}
			if (tags == 2 && app.qbfxyp.qtbhs) {
				app.qbfxyp.zdrSearchForm(0, 1, app.qbfxyp.zdrpageno);
			}
			if (tags == 3 && app.qbfxyp.qtbhs) {
				app.qbfxyp.glSearchForm(0, 1, app.qbfxyp.glpageno);
			}
			if (tags == 5) {
				app.qbfxyp.initCharts();
			}

		});
		//表格数据 情报分析按钮
	},
	initSearchForm: function (pageIndex, pageSize, pagination) {
		var startDate = $('#startDate').val();
		var endDate = $('#endDate').val();
		if (app.time.jiaoyan(startDate, endDate) > 0) {
			return;
		}
		var qtlb = $("#qtlx").val();
		var qtmc = $("#qtmc").val();
		var qtgm = $("#qtgm").val();
		app.loading.show();
		app.api.qbfxyp.view({
			data: {
				pageNo: app.qbfxyp.pageno,
				pageSize: 5,
				beginClsj: startDate,
				endClsj: endDate,
				qtlb: qtlb,
				qtmc: qtmc,
				qtgm: qtgm
			},
			success: function (result) {

				$(".table_all").html('');
				var data = result.msg.result;
				for (var i = 0; i < data.length; i++) {
					$(".table_all").append(
						"<tr style='height:30px' >" +
						"<td>" + app.data(data[i].qtmc) + '</td>' +
						"<td>" + app.data(data[i].qtlb) + "</td>" +
						"<td>" + app.data(data[i].qtgm) + "</td>" +
						"<td class='operate'>" +
						'<span class="glyphicon glyphicon-list-alt" aria-hidden="true" data-toggle="tooltip" data-placement="bottom" title="情报分析" sp="' + data[i].zdqtbh + '" ></span>' +
						"</td>" +
						"</tr >"
					);
				}
				app.qbfxyp.clickinit();
				if ($(".table_all tr")[0]) {
					var tabl = $(".table_all tr")[0];
					$(tabl).addClass("sad")
					var sp = $(tabl).find("span")[0];
					app.qbfxyp.qtbhs = $(sp).attr("sp");
					app.qbfxyp.qtbhnews(app.qbfxyp.qtbhs);
					app.qbfxyp.qtbholdSearchForm(0, 10, app.qbfxyp.oldpagination);
					var tags = $(".tabs .active").attr("tags");
					if (tags == 1) {
						app.qbfxyp.qtbhnewsSearchForm(0, 10, app.qbfxyp.newspagination);
					}
					if (tags == 2) {
						app.qbfxyp.zdrSearchForm(0, 1, app.qbfxyp.zdrpageno);
					}
					if (tags == 3) {
						app.qbfxyp.glSearchForm(0, 1, app.qbfxyp.glpageno);
					}
					if (tags == 5) {
						app.qbfxyp.initCharts();
					}
				}
				;
				app.loading.hide();
				app.qbfxyp.pagination && app.qbfxyp.pagination(result);
			}
		});
	},
	pagination: function (data) {
		BootstrapPagination(
			$("#qtcypagination"), {
				layoutScheme: "lefttext,firstpage,prevgrouppage,prevpage,pagenumber,nextpage,nextgrouppage,lastpage,pageinput,righttext",
				// 记录总数。
				total: data.msg.total,
				// 分页尺寸。指示每页最多显示的记录数量。
				pageSize: data.msg.pageSize,
				// 当前页索引编号。从其开始（从0开始）的整数。
				pageIndex: data.msg.pageNo - 1,
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
				pageChanged: function (pageIndex, pageSize) {
					app.qbfxyp.pageno = pageIndex + 1;
					app.qbfxyp.initSearchForm(pageIndex + 1, pageSize, app.qbfxyp.pagination);
				},
			});
	},
	search: function () {
		// 加载页面信息
		app.qbfxyp.pageno = 0;
		app.qbfxyp.initSearchForm(0, 1, app.qbfxyp.pagination);
	},
	qtbh: function (data) {

		// 加载页面信息
		if (data != app.qbfxyp.qtbhs) {
			app.qbfxyp.qtbhs = data;
			console.info(this.parents("td"))
			var paren = $(this).parents("td");
			var broth = $(paren).siblings("tr");
			console.info(broth)
			app.qbfxyp.qtbhnews(data);
			app.qbfxyp.qtbholdSearchForm(0, 10, app.qbfxyp.oldpagination);
			var tags = $(".tabs .active").attr("tags");
			if (tags == 1) {
				app.qbfxyp.qtbhnewsSearchForm(0, 10, app.qbfxyp.newspagination);
			}
			if (tags == 2) {
				app.qbfxyp.zdrSearchForm(0, 1, app.qbfxyp.zdrpageno);
			}
			if (tags == 3) {
				app.qbfxyp.glSearchForm(0, 1, app.qbfxyp.glpageno);
			}
		}

		// app.qbfxyp.xinchengyuan.init(data);
	},
	clickinit: function () {
		var span = $(".table_all tr td").find("span");
		$(span).on('click', function () {
			var qtbh = $(this).attr("sp");
			if (qtbh != app.qbfxyp.qtbhs) {
				app.qbfxyp.qtbhs = qtbh;
				var paren = $(this).parents("td");
				var broth = $(paren).parents("tr");
				$(broth).addClass("sad");
				var other = $(broth).siblings("tr");
				for (var i = 0; i < other.length; i++) {
					$(other[i]).removeClass("sad");
				}
				app.qbfxyp.qtbhnews(qtbh);
				app.qbfxyp.qtbholdSearchForm(0, 10, app.qbfxyp.oldpagination);
				var tags = $(".tabs .active").attr("tags");
				if (tags == 1) {
					app.qbfxyp.qtbhnewsSearchForm(0, 10, app.qbfxyp.newspagination);
				}
				if (tags == 2) {
					app.qbfxyp.zdrSearchForm(0, 1, app.qbfxyp.zdrpageno);
				}
				if (tags == 3) {
					app.qbfxyp.glSearchForm(0, 1, app.qbfxyp.glpageno);
				}
				if (tags == 5) {
					app.qbfxyp.initCharts();
				}
			}

		});
	},
	qtbhnews: function (data) {
		app.api.qbfxyp.view({
			data: {
				pageNo: app.qbfxyp.pageno,
				pageSize: 10,
				zdqtbh: data,
			},
			success: function (result) {
				if (result.msg.result[0]) {
					console.info(result.msg.result[0]);
					var data = result.msg.result[0];
					$(".bot-qtmc").html(data.qtmc);
					$(".bot-lx").html(data.qtlb);
					$(".bot-qtcy").html(data.csyy);
					$(".bot-qtgm").html(data.qtgm)
				} else {
					$(".bot-qtmc").html('');
					$(".bot-lx").html('');
					$(".bot-qtcy").html('');
					$(".bot-qtgm").html('');
				}

			}
		});
	},
	qtbhnewsSearchForm: function (pageIndex, pageSize, newspagination) {
		app.loading.show();
		app.api.qbfxyp.newsview({
			data: {
				pageNo: app.qbfxyp.newspageno,
				pageSize: 10,
				zdqtbh: app.qbfxyp.qtbhs,
			},
			success: function (result) {

				$(".xinwajue").html('');
				var data = result.msg.result;
				for (var i = 0; i < data.length; i++) {
					$(".xinwajue").append(
						"<tr style='height:30px'>" +
						"<td>" + app.data(data[i].xm) + '</td>' +
						"<td>" + app.data(data[i].sfzh) + "</td>" +
						"<td>" + app.data(data[i].cylb) + "</td>" +
						"<td>" + "关联成因" + "</td>" +
						"<td class='operate'>" +
                        `<span class='glyphicon glyphicon-user' onclick="app.qbfxyp.openPerson('${data[i].sfzh}')"
							   aria-hidden='true' data-toggle='tooltip' data-placement='bottom' title='人员档案'
							   data-original-title='人员'></span>`+
                        `<span class='glyphicon glyphicon-book' onclick="app.qbfxyp.openbeijing('${data[i].sfzh}')"
							   aria-hidden='true' data-toggle='tooltip' data-placement='bottom' title='背景审核'
							   data-original-title='人员'></span>`+
						" </td>" +
					"</tr >"
				)
					;
				}
				app.loading.hide();
				app.qbfxyp.newspagination && app.qbfxyp.newspagination(result);
			}
		});
	},
	openPerson: function (data) {
		var data1 = data.substring(data.length - 1, data.length);
		window.open("http://10.101.140.157:8556/cxgzt/business/person/peopleDetail.html?zjhm=" + data1 + data)
	},
	openbeijing: function (data) {
		var data1 = data.substring(data.length - 1, data.length);
		window.open("http://10.101.139.21:5011/qkmp/view/subview/yjlDetails.html?sfzh=" + data)
	},
	newspagination: function (data) {
		BootstrapPagination(
			$("#newspagination"), {
				layoutScheme: "lefttext,firstpage,prevgrouppage,prevpage,pagenumber,nextpage,nextgrouppage,lastpage,pageinput,righttext",
				// 记录总数。
				total: data.msg.total,
				// 分页尺寸。指示每页最多显示的记录数量。
				pageSize: data.msg.pageSize,
				// 当前页索引编号。从其开始（从0开始）的整数。
				pageIndex: data.msg.pageNo - 1,
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
				pageChanged: function (pageIndex, pageSize) {
					app.qbfxyp.newspageno = pageIndex + 1;
					app.qbfxyp.qtbhnewsSearchForm(pageIndex + 1, pageSize, app.qbfxyp.newspagination);
				},
			});
	},
	//原群体成员
	qtbholdSearchForm: function (pageIndex, pageSize, oldpagination) {
		app.loading.show();
		app.api.qbfxyp.oldview({
			data: {
				pageNo: app.qbfxyp.oldpageno,
				pageSize: 10,
				zdqtbh: app.qbfxyp.qtbhs,
			},
			success: function (result) {

				$(".oldchengyuan").html('');
				$(".zdrchengyuan").html('');
				$(".glyuanqunti").html('');
				$(".table_qtcy").html('');
				var data = result.msg.result;
				for (var i = 0; i < data.length; i++) {
					$(".oldchengyuan").append(
						"<tr style='height:30px'>" +
						"<td>" + app.data(data[i].xm) + '</td>' +
						"<td title='" + data[i].sfzh + "'>" + app.data(data[i].sfzh) + "</td>" +
						"<td>" + app.data(data[i].cylb) + "</td>" +
						"<td>" + app.data(data[i].ggFlag) + "</td>" +
						"<td class='operate'>" +
                        `<span class='glyphicon glyphicon-user' onclick="app.qbfxyp.openPerson('${data[i].sfzh}')"
							   aria-hidden='true' data-toggle='tooltip' data-placement='bottom' title='人员档案'
							   data-original-title='人员'></span>`+
                        `<span class='glyphicon glyphicon-book' onclick="app.qbfxyp.openbeijing('${data[i].sfzh}')"
							   aria-hidden='true' data-toggle='tooltip' data-placement='bottom' title='背景审核'
							   data-original-title='人员'></span>`+
						" </td>" +

					"</tr >"
				)
					;
					$(".zdrchengyuan").append(
						"<tr style='height:30px'>" +
						"<td>" + app.data(data[i].xm) + '</td>' +
						"<td title='" + data[i].sfzh + "'>" + app.data(data[i].sfzh) + "</td>" +
						"<td>" + app.data(data[i].cylb) + "</td>" +
						"<td>" + app.data(data[i].ggFlag) + "</td>" +
						"<td class='operate'>" +
                        `<span class='glyphicon glyphicon-user' onclick="app.qbfxyp.openPerson('${data[i].sfzh}')"
							   aria-hidden='true' data-toggle='tooltip' data-placement='bottom' title='人员档案'
							   data-original-title='人员'></span>`+
                        `<span class='glyphicon glyphicon-book' onclick="app.qbfxyp.openbeijing('${data[i].sfzh}')"
							   aria-hidden='true' data-toggle='tooltip' data-placement='bottom' title='背景审核'
							   data-original-title='人员'></span>`+
						" </td>" +
					"</tr >"
				)
					;
					$(".glyuanqunti").append(
						"<tr style='height:30px'>" +
						"<td>" + app.data(data[i].xm) + '</td>' +
						"<td title='" + data[i].sfzh + "'>" + app.data(data[i].sfzh) + "</td>" +
						"<td>" + app.data(data[i].cylb) + "</td>" +
						"<td>" + app.data(data[i].ggFlag) + "</td>" +
						"<td class='operate'>" +
                        `<span class='glyphicon glyphicon-user' onclick="app.qbfxyp.openPerson('${data[i].sfzh}')"
							   aria-hidden='true' data-toggle='tooltip' data-placement='bottom' title='人员档案'
							   data-original-title='人员'></span>`+
                        `<span class='glyphicon glyphicon-book' onclick="app.qbfxyp.openbeijing('${data[i].sfzh}')"
							   aria-hidden='true' data-toggle='tooltip' data-placement='bottom' title='背景审核'
							   data-original-title='人员'></span>`+
						" </td>" +
					"</tr >"
				)
					;
					$(".table_qtcy").append(
						"<tr style='height:30px'>" +
						"<td>" + app.data(data[i].xm) + '</td>' +
						"<td title='" + data[i].sfzh + "'>" + app.data(data[i].sfzh) + "</td>" +
						"<td>" + app.data(data[i].cylb) + "</td>" +
						"<td>" + app.data(data[i].ggFlag) + "</td>" +
						"<td class='operate'>" +
                        `<span class='glyphicon glyphicon-user' onclick="app.qbfxyp.openPerson('${data[i].sfzh}')"
							   aria-hidden='true' data-toggle='tooltip' data-placement='bottom' title='人员档案'
							   data-original-title='人员'></span>`+
                        `<span class='glyphicon glyphicon-book' onclick="app.qbfxyp.openbeijing('${data[i].sfzh}')"
							   aria-hidden='true' data-toggle='tooltip' data-placement='bottom' title='背景审核'
							   data-original-title='人员'></span>`+
						" </td>" +
					"</tr >"
				)
					;
				}
				app.loading.hide();
				app.qbfxyp.oldpagination && app.qbfxyp.oldpagination(result);
				app.qbfxyp.zdroldPagination && app.qbfxyp.zdroldPagination(result);
				app.qbfxyp.gloldPagination && app.qbfxyp.gloldPagination(result);
				app.qbfxyp.cyPagination && app.qbfxyp.cyPagination(result);
			}
		});
	},
	oldpagination: function (data) {
		BootstrapPagination(
			$("#oldPagination"), {
				layoutScheme: "lefttext,firstpage,prevgrouppage,prevpage,pagenumber,nextpage,nextgrouppage,lastpage,pageinput,righttext",
				// 记录总数。
				total: data.msg.total,
				// 分页尺寸。指示每页最多显示的记录数量。
				pageSize: data.msg.pageSize,
				// 当前页索引编号。从其开始（从0开始）的整数。
				pageIndex: data.msg.pageNo - 1,
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
				pageChanged: function (pageIndex, pageSize) {
					app.qbfxyp.oldpageno = pageIndex + 1;
					app.qbfxyp.qtbholdSearchForm(pageIndex + 1, pageSize, app.qbfxyp.oldpagination);
				},
			});
	},
	// 关联重点人原群体
	zdroldPagination: function (data) {
		BootstrapPagination(
			$("#zdroldPagination"), {
				layoutScheme: "lefttext,firstpage,prevgrouppage,prevpage,pagenumber,nextpage,nextgrouppage,lastpage,pageinput,righttext",
				// 记录总数。
				total: data.msg.total,
				// 分页尺寸。指示每页最多显示的记录数量。
				pageSize: data.msg.pageSize,
				// 当前页索引编号。从其开始（从0开始）的整数。
				pageIndex: data.msg.pageNo - 1,
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
				pageChanged: function (pageIndex, pageSize) {
					app.qbfxyp.zdroldpageno = pageIndex + 1;
					app.qbfxyp.qtbholdSearchForm(pageIndex + 1, pageSize, app.qbfxyp.zdroldPagination);
				},
			});
	},
	// 关联新群体原群体
	gloldPagination: function (data) {
		BootstrapPagination(
			$("#gloldpagination"), {
				layoutScheme: "lefttext,firstpage,prevgrouppage,prevpage,pagenumber,nextpage,nextgrouppage,lastpage,pageinput,righttext",
				// 记录总数。
				total: data.msg.total,
				// 分页尺寸。指示每页最多显示的记录数量。
				pageSize: data.msg.pageSize,
				// 当前页索引编号。从其开始（从0开始）的整数。
				pageIndex: data.msg.pageNo - 1,
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
				pageChanged: function (pageIndex, pageSize) {
					app.qbfxyp.gloldpageno = pageIndex + 1;
					app.qbfxyp.qtbholdSearchForm(pageIndex + 1, pageSize, app.qbfxyp.gloldPagination);
				},
			});
	},
	//群体成员
	cyPagination: function (data) {
		BootstrapPagination(
			$("#cypagination"), {
				layoutScheme: "lefttext,firstpage,prevgrouppage,prevpage,pagenumber,nextpage,nextgrouppage,lastpage,pageinput,righttext",
				// 记录总数。
				total: data.msg.total,
				// 分页尺寸。指示每页最多显示的记录数量。
				pageSize: data.msg.pageSize,
				// 当前页索引编号。从其开始（从0开始）的整数。
				pageIndex: data.msg.pageNo - 1,
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
				pageChanged: function (pageIndex, pageSize) {
					app.qbfxyp.cypageno = pageIndex + 1;
					app.qbfxyp.qtbholdSearchForm(pageIndex + 1, pageSize, app.qbfxyp.cyPagination);
				},
			});
	},
	// 重点人
	zdrSearchForm: function (pageIndex, pageSize, zdrnewspagination) {
		app.loading.show();
		app.api.qbfxyp.zdrview({
			data: {
				pageNo: app.qbfxyp.zdrpageno,
				pageSize: 10,
				qtbh: app.qbfxyp.qtbhs,
			},
			success: function (result) {
				console.info(result)
				$(".xinwajuezdr").html('');
				var data = result.msg.result;
				for (var i = 0; i < data.length; i++) {
					$(".xinwajuezdr").append(
						"<tr style='height:30px'>" +
						"<td>" + app.data(data[i].glzdrmc) + '</td>' +
						"<td title='" + data[i].glzdrsfzh + "'>" + app.data(data[i].glzdrsfzh) + "</td>" +
						"<td>" + app.data(data[i].qtmc) + "</td>" +
						"<td>" + app.data(data[i].cymc) + "</td>" +
						"<td class='operate'>" +
                        `<span class='glyphicon glyphicon-user' onclick="app.qbfxyp.openPerson('${data[i].sfzh}')"
							   aria-hidden='true' data-toggle='tooltip' data-placement='bottom' title='人员档案'
							   data-original-title='人员'></span>`+
                        `<span class='glyphicon glyphicon-book' onclick="app.qbfxyp.openbeijing('${data[i].sfzh}')"
							   aria-hidden='true' data-toggle='tooltip' data-placement='bottom' title='背景审核'
							   data-original-title='人员'></span>`+
						" </td>" +
					"</tr >"
				)
					;
				}
				app.qbfxyp.zdrnewspagination && app.qbfxyp.zdrnewspagination(result);
				app.loading.hide();
			}
		});
	},
	zdrnewspagination: function (data) {
		BootstrapPagination(
			$("#zdrnewspagination"), {
				layoutScheme: "lefttext,firstpage,prevgrouppage,prevpage,pagenumber,nextpage,nextgrouppage,lastpage,pageinput,righttext",
				// 记录总数。
				total: data.msg.total,
				// 分页尺寸。指示每页最多显示的记录数量。
				pageSize: data.msg.pageSize,
				// 当前页索引编号。从其开始（从0开始）的整数。
				pageIndex: data.msg.pageNo - 1,
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
				pageChanged: function (pageIndex, pageSize) {
					app.qbfxyp.zdrpageno = pageIndex + 1;
					app.qbfxyp.zdrSearchForm(pageIndex + 1, pageSize, app.qbfxyp.zdrnewspagination);
				},
			});
	},
	//  关联新群体

	glSearchForm: function (pageIndex, pageSize, glpagination) {
		app.loading.show();
		app.api.qbfxyp.glview({
			data: {
				pageNo: app.qbfxyp.glpageno,
				pageSize: 10,
				qtbh: app.qbfxyp.qtbhs,
			},
			success: function (result) {

				$(".glchengyuan").html('');
				var data = result.msg;
				for (var i = 0; i < data.length; i++) {
					$(".glchengyuan").append(
						"<tr style='height:30px'>" +
						"<td>" + app.data(data[i].xm) + '</td>' +
						"<td title='" + data[i].sfzh + "'>" + app.data(data[i].sfzh) + "</td>" +
						"<td>" + app.data(data[i].cylb) + "</td>" +
						"<td>" + app.data(data[i].ggFlag) + "</td>" +
						"<td class='operate'>" +
                        `<span class='glyphicon glyphicon-user' onclick="app.qbfxyp.openPerson('${data[i].sfzh}')"
							   aria-hidden='true' data-toggle='tooltip' data-placement='bottom' title='人员档案'
							   data-original-title='人员'></span>`+
                        `<span class='glyphicon glyphicon-book' onclick="app.qbfxyp.openbeijing('${data[i].sfzh}')"
							   aria-hidden='true' data-toggle='tooltip' data-placement='bottom' title='背景审核'
							   data-original-title='人员'></span>`+
						" </td>" +
					"</tr >"
				)
					;
				}
				app.qbfxyp.glpagination && app.qbfxyp.glpagination(result);
				app.loading.hide();
			}
		});
	},
	glpagination: function (data) {
		BootstrapPagination(
			$("#glpagination"), {
				layoutScheme: "lefttext,firstpage,prevgrouppage,prevpage,pagenumber,nextpage,nextgrouppage,lastpage,pageinput,righttext",
				// 记录总数。
				total: data.msg.total,
				// 分页尺寸。指示每页最多显示的记录数量。
				pageSize: data.msg.pageSize,
				// 当前页索引编号。从其开始（从0开始）的整数。
				pageIndex: data.msg.pageNo - 1,
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
				pageChanged: function (pageIndex, pageSize) {
					app.qbfxyp.glpageno = pageIndex + 1;
					app.qbfxyp.glSearchForm(pageIndex + 1, pageSize, app.qbfxyp.glpagination);
				},
			});
	},
	// 群体关联线索统计echart
	initCharts: function () {
		// 初始化柱状图
		var myChart = echarts.init(document.getElementById('fuck'));
		var secChart = echarts.init(document.getElementById('listSsqtRksjChart'));
		// 指定图表的配置项和数据
		var option = {
			color: ['#3398DB'],
			tooltip: {
				trigger: 'axis',
				axisPointer: { // --坐标轴指示器，坐标轴触发有效
					type: 'shadow' // --默认为直线，可选为：'line' | 'shadow'
				}
			},
			grid: {
				top: '14%',
				left: '1%',
				right: '1%',
				bottom: '1%',
				containLabel: true
			},
			xAxis: [{
				type: 'category',
				data: [],
				axisTick: {
					alignWithLabel: true
				},
				splitLine: {
					show: false,
				},
			}],
			yAxis: [{
				type: 'value',
				splitLine: {
					show: false,
				},
			}],
			series: [{
				name: '群体人数',
				type: 'bar',
				barWidth: '40%',
				itemStyle: {
					normal: {
						color: new echarts.graphic.LinearGradient(
							0, 0, 0, 1, [{
								offset: 0,
								color: '#22b6a2'
							},
								{
									offset: 1,
									color: '#249dd0'
								}
							]
						)
					},
				},
				label: {
					normal: {
						show: true,
						position: 'top',
						color: '#249dd0',
					}
				},
				data: [],
			}]
		};
		var secoption = {
			tooltip: {
				trigger: 'axis'
			},
			grid: {
				left: '3%',
				right: '4%',
				bottom: '3%',
				containLabel: true
			},
			xAxis: {
				type: 'category',
				boundaryGap: false,
				data: []
			},
			yAxis: {
				type: 'value'
			},
			series: [
				{
					name: '趋势分析',
					type: 'line',
					stack: '总量',
					data: [],
					lineStyle: {
						normal: {
							color: "#249dd0",
						}
					},
					itemStyle: {
						normal: {
							color: "#249dd0",
						}
					}
				}
			]
		};

		// 使用刚指定的配置项和数据显示图表。
		// myChart.setOption(option);
		const startDateyp = $("#ypstartDate").val(),
			endDateyp = $("#ypendDate").val(),
			bt = $("#bt").val(),
			gjc = $("#gjc").val(),
			xxzw = $("#xxzw").val(),
			sslx = $("#sslx").val(),
			cancelstatus = $("#cancelstatus").val();
		app.loading.show();
		app.api.qbfxyp.listSsqtGjcChart({
			data: {
				zdqtbh: app.qbfxyp.qtbhs,
				startDate: startDateyp,
				endDate: endDateyp,
				bt: bt,
				gjc: gjc,
				xxzw: xxzw,
				sslx: sslx,
				cancelstatus: cancelstatus
			},
			success: function (result) {
				// console.log(result);
				if (result.success === 0) {
					app.alert('获取线索关联涉事群体统计失败！');
					// app.loading.hide(); // 隐藏loading
					return;
				}
				const msg = result.msg,
					qtlbArray = [],
					qtlbmcArray = [],
					countArray = [];
				// for (let i = 0, j = msg.length; i < j; i++) {
				// 	qtlbArray.push(msg[i].qtlb);
				// 	qtlbmcArray.push(msg[i].qtlbmc);
				// 	countArray.push(msg[i].count);
				// }
				$.each(msg, function (inx, value) {
					qtlbmcArray.push(inx);
					countArray.push(value);
					console.info(inx);
					console.info(value)
				})
				option.xAxis[0].data = qtlbmcArray;
				option.series[0].data = countArray;

				// 使用刚指定的配置项和数据显示图表。
				myChart.setOption(option);
				app.api.qbfxyp.listSsqtRksjChart({
					data: {
						zdqtbh: app.qbfxyp.qtbhs,
						startDate: startDateyp,
						endDate: endDateyp,
						bt: bt,
						gjc: gjc,
						xxzw: xxzw,
						sslx: sslx,
						cancelstatus: cancelstatus
					},
					success: function (result) {
						// console.log(result);
						if (result.success === 0) {
							app.alert('获取线索关联涉事群体统计失败！');
							// app.loading.hide(); // 隐藏loading
							return;
						}
						const msg = result.msg,
							shirt = [],
							zhey = [];
						// for (let i = 0, j = msg.length; i < j; i++) {
						// 	qtlbArray.push(msg[i].qtlb);
						// 	qtlbmcArray.push(msg[i].qtlbmc);
						// 	countArray.push(msg[i].count);
						// }
						for (let i = 0; i < msg.length; i++) {
							shirt.push(msg[i].name);
							zhey.push(msg[i].total)
						}
						secoption.xAxis.data = shirt;
						secoption.series[0].data = zhey;

						// 使用刚指定的配置项和数据显示图表。
						secChart.setOption(secoption);
						//app.loading.hide();
						app.qbfxyp.tjSearchForm(0, 10, app.qbfxyp.xspagination)
					}
				});
			}
		});

	},
	//  群体情报统计
	tjSearchForm: function (pageIndex, pageSize, xspagination) {
		const startDateyp = $("#ypstartDate").val(),
			endDateyp = $("#ypendDate").val(),
			bt = $("#bt").val(),
			gjc = $("#gjc").val(),
			xxzw = $("#xxzw").val(),
			sslx = $("#sslx").val(),
			cancelstatus = $("#cancelstatus").val();
		app.api.qbfxyp.xsview({
			data: {
				pageNo: app.qbfxyp.xspageno,
				pageSize: 10,
				zdqtbh: app.qbfxyp.qtbhs,
				startDate: startDateyp,
				endDate: endDateyp,
				bt: bt,
				gjc: gjc,
				xxzw: xxzw,
				sslx: sslx,
				cancelstatus: cancelstatus
			},
			success: function (result) {

				$(".xschengyuan").html('');
				var data = result.msg.result;
				for (var i = 0; i < data.length; i++) {
					$(".xschengyuan").append(
						"<tr style='height:30px'>" +
						"<td>" + app.data(data[i].bt) + '</td>' +
						"<td title='" + data[i].xsnr + "'>" + app.data(data[i].xsnr) + "</td>" +
						"<td>" + app.data(data[i].xsly) + "</td>" +
						"<td>" + app.data(data[i].sslbmc) + "</td>" +
						"<td>" + app.data(data[i].tbsj) + "</td>" +
						"<td>" + app.yx(app.data(data[i].cancelstatus)) + "</td>" +
						"</tr >"
					);
				}
				app.qbfxyp.xspagination && app.qbfxyp.xspagination(result);
				app.loading.hide();
			}
		});
	},
	xspagination: function (data) {
		BootstrapPagination(
			$("#xspagination"), {
				layoutScheme: "lefttext,firstpage,prevgrouppage,prevpage,pagenumber,nextpage,nextgrouppage,lastpage,pageinput,righttext",
				// 记录总数。
				total: data.msg.total,
				// 分页尺寸。指示每页最多显示的记录数量。
				pageSize: data.msg.pageSize,
				// 当前页索引编号。从其开始（从0开始）的整数。
				pageIndex: data.msg.pageNo - 1,
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
				pageChanged: function (pageIndex, pageSize) {
					app.qbfxyp.xspageno = pageIndex + 1;
					app.qbfxyp.tjSearchForm(pageIndex + 1, pageSize, app.qbfxyp.xspagination);
				},
			});
	},
	resatchart: function () {
		app.qbfxyp.initCharts();
		//  app.qbfxyp.tjSearchForm(0,10,app.qbfxyp.xspagination)
	},

}
