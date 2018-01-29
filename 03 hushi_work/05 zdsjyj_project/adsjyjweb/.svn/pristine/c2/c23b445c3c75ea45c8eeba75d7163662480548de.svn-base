app.fxmxgl.qtwjgzpz.search = {
	init: function() {
		// app.time.init();
		app.fxmxgl.qtwjgzpz.search.SearchInfo(1, 10);

		// 结果表格全选checkbox按钮功能
		$('#list-qtwjgzpz .check-all').off('click').on('click', function(e) {
			var checkboxElem = $('#list-qtwjgzpz .table_all input[type="checkbox"]');

			if ($(this).find('input').is(':checked')) {
				checkboxElem.prop("checked", true);
			} else {
				checkboxElem.prop("checked", false);
			}
		})
	},

	SearchInfo: function(pageNo, pageSize) {
		$.ajax({
			url: app.api.fxmxgl.qtwjgzCxUrl,
			type: "get",
			// data: {
			//     pageNo: pageNo,
			//     pageSize: pageSize,
			// },
			success: function(result) {
				var data = result.msg,
					resultHtml = '',
					taskTypeArray = [],
					taskStatusArray = [];

				// 拼接、并添加html代码
				for (var i = 0; i < data.length; i++) {
					resultHtml += "<tr data-id=" + data[i].id + ">" +
						`<td>
                            <label class="check">
                                <input type="checkbox" name="task" value="${data[i].id}">
                                <span> </span>
                            </label> 
                        </td>` +
						"<td>" + app.data(data[i].rName) + "</td>" +
						// "<td>" + app.data(taskTypeArray[data[i].type]) + "</td>" +
						// "<td>" + app.data(taskStatusArray[data[i].status]) + "</td>" +
						"<td>" + app.data(data[i].rDesc) + "</td>" +
						"<td>" + app.data(data[i].rStatus) + "</td>" +
						"<td>" +
						'<button class="btn btn-sm btn-primary" onclick="app.fxmxgl.qtwjgzpz.check.open(this);">查看</button>' +
						'<button class="btn btn-sm btn-info" style="margin-left:10px;" onclick="app.fxmxgl.qtwjgzpz.update.open(this);">修改</button>' +
						'<button class="btn btn-sm btn-danger" style="margin-left:10px;" onclick="app.fxmxgl.qtwjgzpz.deleteSingle(this);">删除</button>' +
						"</td>" +
						"</tr >"
				}
				$(".qtwjgzpz .table_all").empty().append(resultHtml);
				// 分页器初始化
				// app.fxmxgl.qtwjgzpz.pagination && app.fxmxgl.qtwjgzpz.pagination(result.msg);
			},
			error: function(e) {
				console.log('群体挖掘规则查询出错！')
			},
		});
	},

};
