app.fxmxgl.rwgl.add = {
	url: 'pages/fxmxgl/rwglAddWindow.html',
	callback: null,
	vehicles: null,
	open: function() {
		$m.page.openPage(app.fxmxgl.rwgl.add.url, 'fade', 'container-wrapper');
	},
	close: function() {
		app.fxmxgl.rwgl.add.clear();
		$m.page.closePage(app.fxmxgl.rwgl.add.url, 'fade', 'container-wrapper');
	},
	init: function() {
		$('#window-rwgl-addWindow').addClass('popIn');
		// 弹框 'x' 点击关闭按钮事件监听
		$('#window-rwgl-addWindow .btn-window-close').off('click').on('click', function() {
			$('#window-rwgl-addWindow').addClass('popOut');
			app.fxmxgl.rwgl.add.close();
		});

		app.fxmxgl.rwgl.add.initForm();

		// 弹框 ‘确定’ 按钮点击提交表单事件监听
		$('#btn-ok-task-add').off('click').on('click', function() {
			var formData = $m('#form-task-add').serializeObject();
			$.ajax({
				url: app.api.fxmxgl.qtwjrwxzUrl,
				type: "post",
				data: formData,
				success: function(response) {
					// console.log(response);
					if (response.success === 1) {
						app.alert('群体挖掘任务新增成功！');
						app.fxmxgl.rwgl.add.close(); // 关闭弹窗
						app.fxmxgl.rwgl.search.SearchInfo(1, 10); // 初始查询
					} else {
						app.alert('群体挖掘任务新增失败！');
					}
				},
				error: function(e) {
					console.log('群体挖掘任务新增出错！')
				}
			});
		})
	},
	clear: function() {
		app.fxmxgl.rwgl.add.callback = null;
		app.fxmxgl.rwgl.add.vehicles = null;
	},
	initForm: function() {
		// 初始时间选择框
		app.time.init();

		// 初始化计划规则下拉框内容
		var rulesJsonStr = sessionStorage.getItem('rules'),
			rules = JSON.parse(rulesJsonStr),
			selectHtml = '<option value="-1">请选择</option>';

		for (let i in rules) {
			selectHtml += `<option value="${i}">${rules[i]}</option>`;
		};
		$('.container #form-task-add select[name="ruleId"]').empty().append(selectHtml);

		// 初始化计划类型、计划状态下拉框内容
		var typesJsonStr = sessionStorage.getItem('types'),
			types = JSON.parse(typesJsonStr),
			statusJsonStr = sessionStorage.getItem('status'),
			status = JSON.parse(statusJsonStr);

		app.select.init($('.container #form-task-add select[name="type"]'), types);
		app.select.init($('.container #form-task-add select[name="status"]'), status);

	}
};
