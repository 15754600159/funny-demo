app.fxmxgl.qtwjgzpz.search = {
	init: function() {
		// app.time.init();
		var data = 'RULE_STATUS';
		app.api.fxmxgl.types({
			data: {
				types: data
			},
			success: function(result) {
				console.info(result);
				var types = result.msg.RULE_STATUS; // 人员类别
				for (var o = 0; o < types.length; o++) {
					$("#qtwjgzpz_ruleStatusCx").append('<option value="' + types[o].value + '">' + types[o].label + '</option>')
				} // 人员类别搞定
			}
		});
		app.fxmxgl.qtwjgzpz.search.SearchInfo(1, 10, app.fxmxgl.qtwjgzpz.pagination);

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
	all: function() {
		app.fxmxgl.qtwjgzpz.search.SearchInfo(0, 1, app.fxmxgl.qtwjgzpz.pagination);
	},
	SearchInfo: function(pageNo, pageSize, pagination) {
		var ruleName = $('#qtwjgzpz_ruleNameCx').val();
		var ruleStatus = $('#qtwjgzpz_ruleStatusCx').val();
		$.ajax({
			url: app.api.fxmxgl.qtwjgzPageCxUrl,
			type: "get",
			data: {
				pageNo: app.zxrygl.search.pageno,
				pageSize: 10,
				ruleName: ruleName,
				ruleStatus: ruleStatus
			},
			success: function(result) {
				console.log(result.msg.result);
				$(".table_all").html('');
				var data = result.msg.result,
					resultHtml = '';
				taskTypeArray = [],
					taskStatusArray = [],
					typesJsonStr = sessionStorage.getItem('types'),
					taskTypeArray = JSON.parse(typesJsonStr),
					statusJsonStr = sessionStorage.getItem('status'),
					taskStatusArray = JSON.parse(statusJsonStr);

				// 拼接、并添加html代码
				for (var i = 0; i < data.length; i++) {
					resultHtml += "<tr data-id=" + data[i].id + ">" +
						'<td><label class="check"> <input type="checkbox" name="task" value="${data[i].id}"> <span> </span> </label> </td> ' +
						"<td>" + app.data(data[i].ruleName) + "</td>" +
						"<td>" + app.data("维族群体性活动预警模型") + "</td>" +
						// "<td>" + app.data(taskStatusArray[data[i].status]) + "</td>" +
						"<td>" + app.data(data[i].ruleDesc) + "</td>";
					var rstatus = data[i].ruleStatus;
					if (rstatus == "01") {
						resultHtml += "<td>" + app.data("停用") + "</td>";
					} else {
						resultHtml += "<td>" + app.data("在用") + "</td>";
					}
					resultHtml += "<td>" +
						'<button class="btn btn-sm btn-primary" onclick="app.fxmxgl.qtwjgzpz.check.open(this);">查看</button>' +
						'<button class="btn btn-sm btn-info" style="margin-left:10px;" onclick="app.fxmxgl.qtwjgzpz.update.open(this);">修改</button>' +
						'<button class="btn btn-sm btn-danger" style="margin-left:10px;" onclick="app.fxmxgl.qtwjgzpz.deleteSingle(this);">删除</button>' +
						"</td>" +
						"</tr >";
				}
				$(".qtwjgzpz .table_all").empty().append(resultHtml);
				// 分页器初始化
				app.fxmxgl.qtwjgzpz.pagination && app.fxmxgl.qtwjgzpz.pagination(result.msg);
			},
			error: function(e) {
				console.log('群体挖掘规则查询出错！');
			},
		});

	},

};
