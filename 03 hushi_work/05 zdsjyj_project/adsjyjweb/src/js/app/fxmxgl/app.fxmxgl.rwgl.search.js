app.fxmxgl.rwgl.search = {
	init: function() {
		// app.time.init();
		app.fxmxgl.rwgl.search.SearchInfo(1, 10);

		// 结果表格全选checkbox按钮功能
		$('#list-rwgl .check-all').off('click').on('click', function(e) {
			var checkboxElem = $('#list-rwgl .table_all input[type="checkbox"]');

			if ($(this).find('input').is(':checked')) {
				checkboxElem.prop("checked", true);
			} else {
				checkboxElem.prop("checked", false);
			}
		})
	},

	SearchInfo: function(pageNo, pageSize) {
		app.api.fxmxgl.rwgl.view({
			data: {
				pageNo: pageNo,
				pageSize: pageSize,
			},
			success: function(result) {
				var data = result.msg.result,
					resultHtml = '',
					taskTypeArray = [],
					taskStatusArray = [],
					typesJsonStr = sessionStorage.getItem('types'),
					taskTypeArray = JSON.parse(typesJsonStr),
					statusJsonStr = sessionStorage.getItem('status'),
					taskStatusArray = JSON.parse(statusJsonStr);

				// 拼接、并添加html代码
				for (var i = 0; i < data.length; i++) {
					resultHtml += "<tr data-id=" + data[i].id + ">" +
						`<td>
                            <label class="check">
                                <input type="checkbox" name="task" value="${data[i].id}">
                                <span> </span>
                            </label> 
                        </td>` +
						"<td>" + app.data(data[i].name) + "</td>" +
						"<td>" + app.data(taskTypeArray[data[i].type]) + "</td>" +
						"<td>" + app.data(taskStatusArray[data[i].status]) + "</td>" +
						"<td>" + app.data(data[i].startTime) + "</td>" +
						"<td>" + app.data(data[i].endTime) + "</td>" +
						"<td>" + app.data(data[i].prevTime) + "</td>" +
						"<td>" + app.data(data[i].interval) + "</td>" +
						"<td>" +
						'<button class="btn btn-sm btn-primary" onclick="app.fxmxgl.rwgl.check.open(this);">查看</button>' +
						'<button class="btn btn-sm btn-info" style="margin-left:10px;" onclick="app.fxmxgl.rwgl.update.open(this);">修改</button>' +
						'<button class="btn btn-sm btn-danger" style="margin-left:10px;" onclick="app.fxmxgl.rwgl.deleteSingle(this);">删除</button>' +
						"</td>" +
						"</tr >"
				}
				$(".rwgl .table_all").empty().append(resultHtml);
				// 分页器初始化
				app.fxmxgl.rwgl.pagination && app.fxmxgl.rwgl.pagination(result.msg);
			}
		});
	},

};
