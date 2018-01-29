app.fxmxgl.rwgl = {
	// 分页器
	pagination: function(data) {
		BootstrapPagination(
			$("#rwglPagination"), {
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
					app.fxmxgl.rwgl.search.SearchInfo(pageIndex + 1, pageSize);
				},
			});
	},

	// 单条信息删除 (that参数为 html onclick中传入的事件target对象)
	deleteSingle: function(that) {
		var id = $(that).parent().parent('tr').data('id');

		layer.confirm('您确定要删除此条信息吗？', {
			btn: ['确定', '取消'],
			title: '删除'
		}, function(index) {
			$.ajax({
				url: app.api.fxmxgl.qtwjrwscUrl + '?ids=' + id,
				type: "delete",
				success: function(response) {
					// console.log(response);
					if (response.success === 1) {
						app.alert('群体挖掘任务单条信息删除成功！');
						app.fxmxgl.rwgl.search.SearchInfo(1, 10); // 初始查询
					} else {
						app.alert('群体挖掘任务单条信息删除失败！');
					}
				},
				error: function(e) {
					console.log('群体挖掘任务单条信息删除出错！');
				}
			});

			layer.close(index);
		});
	},

	// 多条信息删除
	deleteMutiple: function() {
		var idsArray = [],
			ids = '';

		$('#list-rwgl .table_all input[type="checkbox"]:checked').each(function() {
			idsArray.push($(this).val());
		});
		ids = idsArray.join(',');

		layer.confirm('您确定要删除这些信息吗？', {
			btn: ['确定', '取消'],
			title: '删除'
		}, function(index) {
			$.ajax({
				url: app.api.fxmxgl.qtwjrwscUrl + '?ids=' + ids,
				type: "delete",
				success: function(response) {
					// console.log(response);
					if (response.success === 1) {
						app.alert('群体挖掘任务多条信息删除成功！');
						app.fxmxgl.rwgl.search.SearchInfo(1, 10); // 初始查询
					} else {
						app.alert('群体挖掘任务多条信息删除失败！');
					}
				},
				error: function(e) {
					console.log('群体挖掘任务多条信息删除出错！');
				}
			});

			layer.close(index);
		});
	},

	// sessionStorage获取、存储码表信息
	get_saveMbInfo: function() {
		// 存储计划规则的信息(id,name)
		$.get(app.api.fxmxgl.qtwjgzCxUrl, function(result) {
			var data = result.msg,
				gzObject = {};
			for (let i = 0, j = data.length; i < j; i++) {
				gzObject[data[i].id] = data[i].rName;
			};
			// 存储值：将对象转换为Json字符串
			sessionStorage.setItem('rules', JSON.stringify(gzObject));
		});

		// 存储计划类型、计划状态信息 (coed,name)
		$.get(app.api.fxmxgl.jhlx_jhztCxUrl, function(result) {
			var data = result.msg,
				typeObject = {},
				statusObject = {};
			for (let i = 0, j = data.TASK_TYPE.length; i < j; i++) {
				typeObject[data.TASK_TYPE[i].value] = data.TASK_TYPE[i].label;
			};
			for (let i = 0, j = data.TASK_STATUS.length; i < j; i++) {
				statusObject[data.TASK_STATUS[i].value] = data.TASK_STATUS[i].label;
			};
			sessionStorage.setItem('types', JSON.stringify(typeObject));
			sessionStorage.setItem('status', JSON.stringify(statusObject));
		});
	},

	// 根据规则id获取规则名称
	getRuleName: function(id) {
		// 取值时：把获取到的Json字符串转换回对象
		var rulesJsonStr = sessionStorage.getItem('rules'),
			rules = JSON.parse(rulesJsonStr);

		return rules[id];
	},

	// 根据计划类型code获取计划类型名称
	getTypeName: function(code) {
		// 取值时：把获取到的Json字符串转换回对象
		var typesJsonStr = sessionStorage.getItem('types'),
			types = JSON.parse(typesJsonStr);
		return types[code];
	},

	// 根据计划状态code获取计划状态名称
	getStatusName: function(code) {
		// 取值时：把获取到的Json字符串转换回对象
		var statusJsonStr = sessionStorage.getItem('status'),
			status = JSON.parse(statusJsonStr);

		return status[code];
	},

};
