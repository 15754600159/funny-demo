app.ckrqcy.check = {
	url: 'pages/kyrqdrypfx/ckrqcyCheckWindow.html',
	callback: null,
	vehicles: null,
	open: function(that) {
		var checkId = $(that).parent().parent('tr').data('id'); //记录操作的信息id,以便后面获取数据
		$('.ckrqcy').data('checkId', checkId);

		$m.page.openPage(this.url, 'fade', 'container-wrapper');
	},
	close: function() {
		this.clear();
		$m.page.closePage(this.url, 'fade', 'container-wrapper');
	},
	init: function() {
		var that = this;

		$('#window-ckrqcy-checkWindow').addClass('popIn');
		// 弹框 'x' 点击关闭按钮事件监听
		$('#window-ckrqcy-checkWindow .btn-window-close').off('click').on('click', function() {
			$('#window-ckrqcy-checkWindow').addClass('popOut');
			that.close();
		});

		// 禁用输入框
		$('input', $('#form-person-check')).prop('disabled', 'disabled');

		this.initForm();

	},
	clear: function() {
		this.callback = null;
		this.vehicles = null;
	},
	initForm: function() {
		// 初始化输入框内容内容
		$.ajax({
			url: app.api.kyrqdrypfx.kyryIdCxUrl + $('.ckrqcy').data('checkId') + '/',
			type: "get",
			success: function(response) {
				console.log(response)
				if (response.success === 1) {
					$m('#form-person-check').setFormValues(response.msg);
				} else {
					app.alert('可疑人员根据id查询失败！');
				}
			},
			error: function(e) {
				console.log('可疑人员根据id查询出错！')
			}
		});
	}

};
