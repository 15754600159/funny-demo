app.fxmxgl.rwgl.update = {
	url: 'pages/fxmxgl/rwglUpdateWindow.html',
	callback: null,
	vehicles: null,
	open: function(that) {
		var updateId = $(that).parent().parent('tr').data('id'); //记录操作的信息id,以便后面获取数据
		$('.page .rwgl').data('updateId', updateId);

		$m.page.openPage(app.fxmxgl.rwgl.update.url, 'fade', 'container-wrapper');
	},
	close: function() {
		app.fxmxgl.rwgl.update.clear();
		$m.page.closePage(app.fxmxgl.rwgl.update.url, 'fade', 'container-wrapper');
	},
	init: function() {
		$('#window-rwgl-updateWindow').addClass('popIn');
		// 弹框 'x' 点击关闭按钮事件监听
		$('#window-rwgl-updateWindow .btn-window-close').off('click').on('click', function() {
			$('#window-rwgl-updateWindow').addClass('popOut');
			app.fxmxgl.rwgl.update.close();
		});

		app.fxmxgl.rwgl.update.initForm();

		// 弹框 ‘确定’ 按钮点击提交表单事件监听
		$('#btn-ok-task-update').off('click').on('click', function() {
			var updateId = $('.page .rwgl').data('updateId'),
				formData = $m('#form-task-update').serializeObject();
			formData.id = updateId;

			$.ajax({
				url: app.api.fxmxgl.qtwjrwXgUrl + updateId + '/',
				type: "put",
				data: formData,
				success: function(response) {
					// console.log(response);
					if (response.success === 1) {
						app.alert('群体挖掘任务修改成功！');
						app.fxmxgl.rwgl.update.close(); // 关闭弹窗
						app.fxmxgl.rwgl.search.SearchInfo(1, 10); // 初始查询
					} else {
						app.alert('群体挖掘任务修改失败！');
					}
				},
				error: function(e) {
					console.log('群体挖掘任务修改出错！')
				}
			});
		})
	},
	clear: function() {
		app.fxmxgl.rwgl.update.callback = null;
		app.fxmxgl.rwgl.update.vehicles = null;
	},
	initForm: function() {
		// 初始化计划规则下拉框内容
		var rulesJsonStr = sessionStorage.getItem('rules'),
			rules = JSON.parse(rulesJsonStr),
			selectHtml = '<option value="-1">请选择</option>';

		for (let i in rules) {
			selectHtml += `<option value="${i}">${rules[i]}</option>`;
		};
		$('.container #form-task-update select[name="ruleId"]').empty().append(selectHtml);

		// 初始化计划类型、计划状态下拉框内容
		var typesJsonStr = sessionStorage.getItem('types'),
			types = JSON.parse(typesJsonStr),
			statusJsonStr = sessionStorage.getItem('status'),
			status = JSON.parse(statusJsonStr);

		app.select.init($('.container #form-task-update select[name="type"]'), types);
		app.select.init($('.container #form-task-update select[name="status"]'), status);

		// 复现表单数据
		$.ajax({
			url: app.api.fxmxgl.qtwjrwxqCxUrl + $('.page .rwgl').data('updateId') + '/',
			type: "get",
			success: function(response) {
				if (response.success === 1) {
					// app.alert('体挖掘任务详细信息查询成功！');
					$m('#form-task-update').setFormValues(response.msg);
					// 初始时间选择框 在时间填入之后再初始化，可以保持控件时间一致
					app.time.init();
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
