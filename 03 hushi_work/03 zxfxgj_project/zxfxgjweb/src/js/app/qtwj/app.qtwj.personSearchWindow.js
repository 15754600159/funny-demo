app.qtwj.personSearchWindow = {
	id: null,
	url: 'pages/qtwj/personSearchWindow.html',
	callback: null,
	open: function() {
		$m.page.openPage(app.qtwj.personSearchWindow.url, 'fade', 'container-wrapper');
	},
	close: function() {
		app.qtwj.personSearchWindow.clear();
		$m.page.closePage(app.qtwj.personSearchWindow.url, 'fade', 'container-wrapper');
	},
	init: function() {
		$('#window-qtwj-personSearchWindow').addClass('popIn');
		$('#window-qtwj-personSearchWindow .btn-window-close').on('click', function() {
			$('#window-qtwj-personSearchWindow').addClass('popOut');
			app.qtwj.personSearchWindow.close();
		});

		app.qtwj.personSearchWindow.initSearchForm();
		app.qtwj.personSearchWindow.initSearchButton();
		app.qtwj.personSearchWindow.getListPager();
	},
	clear: function() {
		app.qtwj.personSearchWindow.callback = null;
		app.qtwj.personSearchWindow.listPager = {
			query: null,
			pageNo: 1,
			pageSize: 10
		};
	},
	listPager: {
		query: null,
		pageNo: 1,
		pageSize: 10
	},
	initSearchForm: function() {
		$m('#form-qtwj-person-search').validate({
			submitHandler: function(form) {
				app.qtwj.personSearchWindow.listPager.query = $m(form).serializeObject();
				app.qtwj.personSearchWindow.listPager.pageNo = 1;
				app.qtwj.personSearchWindow.getListPager();
			}
		});
	},
	initSearchButton: function() {
		$('#form-qtwj-person-submit').on('click', function() {
			$m('#form-qtwj-person-search').submit();
		});
		$('#form-qtwj-person-reset').on('click', function() {
			$m('#form-qtwj-person-search').reset()
		});
		$('#form-qtwj-person-refresh').on('click', function() {
			$m('#form-qtwj-person-search').submit();
		});
		$('#form-qtwj-person-export').on('click', function() {
			var query = app.qtwj.personSearchWindow.listPager.query || {};
			query.wjjgId = app.qtwj.personSearchWindow.id;
			query.pageNo = 1;
			query.pageSize = 10000;
			location.href = app.api.qtwj.exportRyFileUrl + $m.serialize(query);
		});
	},
	getListPager: function() {
		var query = app.qtwj.personSearchWindow.listPager.query || {};
		query.wjjgId = app.qtwj.personSearchWindow.id;
		query.pageNo = app.qtwj.personSearchWindow.listPager.pageNo;
		query.pageSize = app.qtwj.personSearchWindow.listPager.pageSize;
		app.loading.show();
		app.api.qtwj.searchRy({
			data: query,
			success: function(result) {
				app.loading.hide();
				console.log(result);
				if (result.success == 1) {
					var list = result.msg.result;
					var template = $('#tmpl-list-qtwj-person-search').html();
					var html = $m.tmpl(template, list);
					$('#list-qtwj-person-search').html(html);
				} else {
					app.alert(result.success.alert);
				}
				app.qtwj.personSearchWindow.pagination && app.qtwj.personSearchWindow.pagination(result);
			}
		});
	},
	pagination: function(data) {
		BootstrapPagination(
			$("#qtwj-search-person-pagebtn"), {
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
				pageChanged: function(pageIndex, pageSize) {
					app.qtwj.personSearchWindow.listPager.pageNo = pageIndex + 1;
					app.qtwj.personSearchWindow.listPager.pageSize = pageSize;
					app.qtwj.personSearchWindow.getListPager();
				},
			});
	}

};
