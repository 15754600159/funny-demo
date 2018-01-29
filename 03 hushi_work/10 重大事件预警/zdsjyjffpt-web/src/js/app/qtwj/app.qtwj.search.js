app.qtwj.search = {
	dataMap: {},
	listPager: {
		query: null,
		pageNo: 1,
		pageSize: 10
	},
	init: function() {
		var pageId = $m.page.idGenerator.getId('pages/qtwj/index.html');
		$m('#' + pageId).prop('destroyCallback', app.qtwj.search.destroy);

		app.qtwj.search.initSearchForm();
		app.qtwj.search.initSearchButton();
		app.qtwj.search.getListPager();
	},
	destroy: function() {
		app.qtwj.search.dataMap = {};
		app.qtwj.search.listPager = {
			query: null,
			pageNo: 1,
			pageSize: 10
		};
	},
	initSearchForm: function() {
		app.time.init();
		app.qtwj.search.initCheckAll();

		$m('#form-qtwj-search').validate({
			submitHandler: function(form) {
				app.qtwj.search.listPager.query = $m(form).serializeObject();
				app.qtwj.search.listPager.pageNo = 1;
				app.qtwj.search.getListPager();
			}
		});
	},
	initSearchButton: function() {
		$('#form-qtwj-submit').on('click', function() {
			$m('#form-qtwj-search').submit();
		});
		$('#form-qtwj-reset').on('click', function() {
			$m('#form-qtwj-search').reset()
		});
		$('#form-qtwj-refresh').on('click', function() {
			$m('#form-qtwj-search').submit();
		});
		$('#form-qtwj-export').on('click', function() {
			var query = app.qtwj.search.listPager.query || {};
			query.pageNo = 1;
			query.pageSize = 10000;
			location.href = app.api.qtwj.exportFileUrl + $m.serialize(query);
		});
	},
	getListPager: function() {
		var query = app.qtwj.search.listPager.query || {};
		query.pageNo = app.qtwj.search.listPager.pageNo;
		query.pageSize = app.qtwj.search.listPager.pageSize;
		app.loading.show();
		app.api.qtwj.search({
			data: query,
			success: function(result) {
				app.loading.hide();
				console.log(result);
				if (result.success == 1) {
					var list = result.msg.result;
					for (var i = 0; i < list.length; i++) {
						app.qtwj.search.dataMap[list[i].id] = list[i];
					}
					var template = $('#tmpl-list-qtwj-search').html();
					var html = $m.tmpl(template, list);
					$('#list-qtwj-search').html(html);
					app.qbxsfx.initTooltip(); // 初始化表格最后一列操作文字的提示
				} else {
					app.alert(result.success.alert);
				}
				app.qtwj.search.pagination && app.qtwj.search.pagination(result);
			}
		});
	},
	pagination: function(data) {
		BootstrapPagination(
			$("#qtwj-search-pagebtn"), {
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
					app.qtwj.search.listPager.pageNo = pageIndex + 1;
					app.qtwj.search.listPager.pageSize = pageSize;
					app.qtwj.search.getListPager();
				},
			});
	},
	initCheckAll: function() {
		$("#list-qtwj-search-checkAll").on('change', function() {
			var checkif = $(this).prop('checked');
			console.info(checkif);
			if (checkif) {
				$("#list-qtwj-search input[type='checkbox']").prop("checked", true);
			} else {
				$("#list-qtwj-search input[type='checkbox']").prop("checked", false);
			}
		});
	},
	openView: function(id) {
		app.qtwj.viewWindow.data = app.qtwj.search.dataMap[id];
		app.qtwj.viewWindow.open();
	},
	openPerson: function(id) {
		app.qtwj.personSearchWindow.id = id;
		app.qtwj.personSearchWindow.open();
	}
};
