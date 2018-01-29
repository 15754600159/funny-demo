app.fxmxgl.qtwjgzpz = {
	// 分页器
	pagination: function(data) {
		BootstrapPagination(
			$("#qtwjgzpzPagination"), {
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
					app.fxmxgl.qtwjgzpz.search.SearchInfo(pageIndex + 1, pageSize);
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
				url: app.api.fxmxgl.qtwjgzScUrl + '?ids=' + id,
				type: "delete",
				success: function(response) {
					// console.log(response);
					if (response.success === 1) {
						app.alert('群体挖掘规则单条信息删除成功！');
						app.fxmxgl.qtwjgzpz.search.SearchInfo(1, 10); // 初始查询
					} else {
						app.alert('群体挖掘规则单条信息删除失败！');
					}
				},
				error: function(e) {
					console.log('群体挖掘规则单条信息删除出错！');
				}
			});

			layer.close(index);
		});
	},

	// 多条信息删除
	deleteMutiple: function() {
		var idsArray = [],
			ids = '';

		$('#list-qtwjgzpz .table_all input[type="checkbox"]:checked').each(function() {
			idsArray.push($(this).val());
		});
		ids = idsArray.join(',');

		layer.confirm('您确定要删除这些信息吗？', {
			btn: ['确定', '取消'],
			title: '删除'
		}, function(index) {
			$.ajax({
				url: app.api.fxmxgl.qtwjgzScUrl + '?ids=' + ids,
				type: "delete",
				success: function(response) {
					// console.log(response);
					if (response.success === 1) {
						app.alert('群体挖掘规则多条信息删除成功！');
						app.fxmxgl.qtwjgzpz.search.SearchInfo(1, 10); // 初始查询
					} else {
						app.alert('群体挖掘规则多条信息删除失败！');
					}
				},
				error: function(e) {
					console.log('群体挖掘规则多条信息删除出错！');
				}
			});

			layer.close(index);
		});
	},

	// sessionStorage获取、存储码表信息
	get_saveMbInfo: function() {
		// RULE_STATUS 规则状态
		// tb_d_qgxzqh 户籍、辖区、出发地、目的地
		// nation 民族
		// sex 性别
		// tb_d_zdryxl 人员类别
		// RULE_TYPE 活动场所类别
		$.get(app.api.fxmxgl.qtwjgzMbCxUrl, function(result) {
			var data = result.msg,
				mbObject = {};

			for (let table of Object.keys(data)) {
				mbObject[table] = {};
				for (let i = 0, j = data[table].length; i < j; i++) {
					mbObject[table][data[table][i]['value']] = data[table][i]['label'];
				}
			}

			// 存储值：将对象转换为Json字符串
			sessionStorage.setItem('mbObject', JSON.stringify(mbObject));
		});

	},

};
