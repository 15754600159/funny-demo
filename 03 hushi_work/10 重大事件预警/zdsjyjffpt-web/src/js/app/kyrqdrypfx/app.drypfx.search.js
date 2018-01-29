app.drypfx.search = {
	init: function () {
		app.time.init();
		this.SearchInfo(1, 10);

		// 结果表格全选checkbox按钮功能
		$('.drypfx .table-box .checks').off('click').on('click', function (e) {
			var checkboxElem = $('.drypfx .table-body input[type="checkbox"]');

			if ($(this).find('input').is(':checked')) {
				checkboxElem.prop("checked", true);
			} else {
				checkboxElem.prop("checked", false);
			}
		})
	},

	SearchInfo: function (pageNo, pageSize) {
		var formData = $m('#form-group-search').serializeObject(),
			that = this;
		formData.pageNo = pageNo;
		formData.pageSize = pageSize;

		$.ajax({
			url: app.api.kyrqdrypfx.kyrqCxUrl,
			type: "get",
			data: formData,
			success: function (result) {
				if (result.success !== 1) {
					app.alert('可疑人群查询失败！');
					return;
				}

				var msg = result.msg,
					data = msg.result,
					resultHtml = '';

				// 拼接、并添加html代码
				for (var i = 0; i < data.length; i++) {
					resultHtml += "<tr data-id=" + data[i].kyrqbh + ">" +
						`<td>
							<label class="check">
								<input type="checkbox" name="task" value="${data[i].kyrqbh}"> 
								<span> </span> 
							</label>
						</td>` +
						"<td>" + app.data(data[i].kyrqbh) + "</td>" +
						"<td>" + app.data(data[i].rqmc) + "</td>" +
						"<td>" + app.data(data[i].rqlx) + "</td>" +
						"<td>" + app.data(data[i].rqgm) + "</td>" +
						"<td>" + app.data(data[i].drsj) + "</td>" +
						"<td>" + app.data(data[i].drr) + "</td>" +
						"<td>" + app.data(data[i].yzyy) + "</td>" +
						`<td class="operate"> 
							<span class="glyphicon glyphicon-log-in" onclick="app.drypfx.import.open(this);" aria-hidden="true" data-toggle="tooltip" data-placement="bottom" title="导入"></span>
							<span class="glyphicon glyphicon-user" onclick="app.ckrqcy.search.open(this);" aria-hidden="true" data-toggle="tooltip" data-placement="bottom" title="人员"></span>
							<span class="glyphicon glyphicon-list-alt" onclick="app.drypfx.check.open(this);" aria-hidden="true" data-toggle="tooltip" data-placement="bottom" title="查看"></span>
							<span class="glyphicon glyphicon-pencil" onclick="app.drypfx.update.open(this);" aria-hidden="true" data-toggle="tooltip" data-placement="bottom" title="修改"></span>
							<span class="glyphicon glyphicon-circle-arrow-right" aria-hidden="true" data-toggle="tooltip" data-placement="bottom" title="到图析"></span>
							<span class="glyphicon glyphicon-sort" aria-hidden="true" data-toggle="tooltip" data-placement="bottom" title="关系碰撞"></span>
						</tr >`;
				}
				$(".drypfx .table-body").empty().append(resultHtml);
				app.qbxsfx.initTooltip(); // 初始化表格最后一列操作文字的提示
				// 分页器初始化
				app.drypfx.pagination && app.drypfx.pagination(msg, $('#drypfxPagination'), that);
			},
			error: function (e) {
				console.log('可疑人群查询出错！')
			},
		});
	},

	reset: function () {
		app.drypfx.resetForm($('#form-group-search'));
	},

};
