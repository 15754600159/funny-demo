app.ckrqcy.search = {
	url: 'pages/kyrqdrypfx/ckrqcy.html',
	callback: null,
	vehicles: null,
	open: function(that) {
		var groupId = $(that).parent().parent('tr').data('id'); //记录操作的信息id,以便后面获取数据
		$('.page .drypfx').data('groupId', groupId);

		$m.page.openPage(this.url, 'fade', 'container-wrapper');
	},
	close: function() {
		this.clear();
		$m.page.closePage(this.url, 'fade', 'container-wrapper');
	},
	init: function() {
		//弹窗按钮
		var that = this;
		$('#window-drypfx-addWindow').addClass('popIn');
		// 弹框 'x' 点击关闭按钮事件监听
		$('#window-drypfx-addWindow .btn-window-close').off('click').on('click', function() {
			$('#window-drypfx-addWindow').addClass('popOut');
			that.close();
		});

		// 页面内容初始化
		app.time.init();
		// 初始化可疑人群编号
		$('#form-person-search input[name="kyrqbh"]').val($('.page .drypfx').data('groupId'));
		// 初始化查询
		this.SearchInfo(1, 10);

		// 结果表格全选checkbox按钮功能
		$('#list-ckrqcy .checks').off('click').on('click', function(e) {
			var checkboxElem = $('#list-ckrqcy .table_all input[type="checkbox"]');

			if ($(this).find('input').is(':checked')) {
				checkboxElem.prop("checked", true);
			} else {
				checkboxElem.prop("checked", false);
			}
		})
	},

	SearchInfo: function(pageNo, pageSize) {
		var formData = $m('#form-person-search').serializeObject(),
			that = this;
		formData.pageNo = pageNo;
		formData.pageSize = pageSize;

		$.ajax({
			url: app.api.kyrqdrypfx.kyryCxUrl,
			type: "get",
			data: formData,
			success: function(result) {
				if (result.success !== 1) {
					app.alert('可疑人员查询失败！');
					return;
				}

				var msg = result.msg,
					data = msg.result,
					resultHtml = '';

				// 拼接、并添加html代码
				for (var i = 0; i < data.length; i++) {
					resultHtml += "<tr data-id=" + data[i].kyryid + ">" +
						`<td><label class="check"><input type="checkbox" name="task" value="${data[i].kyryid}"><span> </span></label></td>` +
						"<td>" + app.data(data[i].kyrqbh) + "</td>" +
						"<td>" + app.data(data[i].sfzh) + "</td>" +
						`<td class="operate">
							<span class="glyphicon glyphicon-list-alt" onclick="app.ckrqcy.check.open(this);" aria-hidden="true" data-toggle="tooltip" data-placement="bottom" title="查看"></span>
							<span class="glyphicon glyphicon-pencil" onclick="app.ckrqcy.update.open(this);" aria-hidden="true" data-toggle="tooltip" data-placement="bottom" title="修改"></span>
							<span class="glyphicon glyphicon-remove" onclick="app.ckrqcy.deleteSingle(this);" aria-hidden="true" data-toggle="tooltip" data-placement="bottom" title="删除"></span>
						</td>` +
						"</tr >"
				}
				$(".ckrqcy .table_all").empty().append(resultHtml);
				// 分页器初始化
				app.drypfx.pagination && app.drypfx.pagination(msg, $('#personPagination'), that);
			},
			error: function(e) {
				console.log('可疑人员查询出错！');
			},
		});
	},

	clear: function() {
		this.callback = null;
		this.vehicles = null;
	},

	initForm: function() {

	},

	reset: function() {
		app.drypfx.resetForm($('#form-person-search'));
	},

};
