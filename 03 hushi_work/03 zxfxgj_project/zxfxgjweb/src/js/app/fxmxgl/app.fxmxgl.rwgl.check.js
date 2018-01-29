app.fxmxgl.rwgl.check = {
	url: 'pages/fxmxgl/rwglCheckWindow.html',
	callback: null,
	vehicles: null,
	open: function(that) {
		var checkId = $(that).parent().parent('tr').data('id'); //记录操作的信息id,以便后面获取数据
		$('.page .rwgl').data('checkId', checkId);

		$m.page.openPage(app.fxmxgl.rwgl.check.url, 'fade', 'container-wrapper');
	},
	close: function() {
		app.fxmxgl.rwgl.check.clear();
		$m.page.closePage(app.fxmxgl.rwgl.check.url, 'fade', 'container-wrapper');
	},
	init: function() {
		$('#window-rwgl-checkWindow').addClass('popIn');
		// 弹框 'x' 点击关闭按钮事件监听
		$('#window-rwgl-checkWindow .btn-window-close').off('click').on('click', function() {
			$('#window-rwgl-checkWindow').addClass('popOut');
			app.fxmxgl.rwgl.check.close();
		});

		// 禁用输入框
		$('input', $('#form-task-check')).prop('disabled', 'disabled');

		app.fxmxgl.rwgl.check.initForm();

	},
	clear: function() {
		app.fxmxgl.rwgl.check.callback = null;
		app.fxmxgl.rwgl.check.vehicles = null;
	},
	initForm: function() {
		// 初始化输入框内容内容
		$.ajax({
			url: app.api.fxmxgl.qtwjrwxqCxUrl + $('.page .rwgl').data('checkId') + '/',
			type: "get",
			success: function(response) {
				if (response.success === 1) {
					// app.alert('体挖掘任务详细信息查询成功！');
					// 替换码表内容
					let ruleId = response.msg.ruleId,
						type = response.msg.type,
						status = response.msg.status;
					response.msg.ruleId = app.fxmxgl.rwgl.getRuleName(ruleId);
					response.msg.type = app.fxmxgl.rwgl.getTypeName(type);
					response.msg.status = app.fxmxgl.rwgl.getStatusName(status);

					$m('#form-task-check').setFormValues(response.msg);
				} else {
					app.alert('体挖掘任务详细信息查询失败！');
				}
			},
			error: function(e) {
				console.log('群体挖掘任务详细信息查询出错！')
			}
		});
	}

};
