app.drypfx.update = {
	url: 'pages/kyrqdrypfx/drypfxUpdateWindow.html',
	callback: null,
	vehicles: null,
	open: function(that) {
		var updateId = $(that).parent().parent('tr').data('id'); //记录操作的信息id,以便后面获取数据
		$('.new-page .drypfx').data('updateId', updateId);

		$m.page.openPage(this.url, 'fade', 'container-wrapper');
	},
	close: function() {
		this.clear();
		$m.page.closePage(this.url, 'fade', 'container-wrapper');
	},
	init: function() {
		var that = this;

		$('#window-drypfx-updateWindow').addClass('popIn');
		// 弹框 'x' 点击关闭按钮事件监听
		$('#window-drypfx-updateWindow .btn-window-close').off('click').on('click', function() {
			$('#window-drypfx-updateWindow').addClass('popOut');
			that.close();
		});

		this.initForm();

		// 弹框 ‘确定’ 按钮点击提交表单事件监听
		$('#btn-ok-group-update').off('click').on('click', function() {
			var updateId = $('.new-page .drypfx').data('updateId'),
				formData = $m('#form-group-update').serializeObject();
			formData.kyrqbh = updateId;

			$.ajax({
				url: app.api.kyrqdrypfx.kyrqXgUrl + updateId + '/',
				type: "put",
				data: formData,
				success: function(response) {
					// console.log(response);
					if (response.success === 1) {
						app.alert('可疑人群修改成功！');
						that.close(); // 关闭弹窗
						app.drypfx.search.SearchInfo(1, 10); // 初始查询
					} else {
						app.alert('可疑人群修改失败！');
					}
				},
				error: function(e) {
					console.log('可疑人群修改出错！');
				}
			});
		})
	},
	clear: function() {
		this.callback = null;
		this.vehicles = null;
	},
	initForm: function() {
		// 复现表单数据
		$.ajax({
			url: app.api.kyrqdrypfx.kyrqIdCxUrl + $('.new-page .drypfx').data('updateId') + '/',
			type: "get",
			success: function(response) {
				if (response.success === 1) {
					$m('#form-group-update').setFormValues(response.msg);
				} else {
					app.alert('可疑人群根据id查询失败！');
				}
			},
			error: function(e) {
				console.log('群可疑人群根据id查询出错！');
			}
		});
	}
};
