app.pzgl.mgsqgl.add = {
	pageContainer: '.mgsqgl-add',
	url: 'pages/pzgl/mgsqgl/addWindow.html',
	open: function() {
		$m.page.openPage(this.url, 'fade', 'container-wrapper');
	},
	close: function() {
		$m.page.closePage(this.url, 'fade', 'container-wrapper');
	},
	init: function() {
		// 初始时间选择框
		app.time.init();
		// 初始化页面元素点击功能
		this.initClickFunc();
	},
	initClickFunc: function() {
		const that = this;
		// 弹框 'x'或者'取消' 点击关闭弹窗
		$(that.pageContainer).find('.btn-window-close').off('click').on('click', function() {
			$(that.pageContainer).find('.window').addClass('popOut'); //增加关闭效果
			that.close();
		});
		// 弹框 '确定' 点击提交内容
		$(that.pageContainer).find('footer .btn_submit').on('click', function() {
			const startDateSq = $(that.pageContainer).find('input[name="sensitivePStartTime"]').val(),
				endDateSq = $(that.pageContainer).find('input[name="sensitivePEndTime"]').val(),
				startDateYj = $(that.pageContainer).find('input[name="warningStartTime"]').val(),
				endDateYj = $(that.pageContainer).find('input[name="warningEndTime"]').val();
			// 检查是否只选了开始时间
			if (app.qbxsfx.checkEndTime(startDateSq, endDateSq) === 0 || app.qbxsfx.checkEndTime(startDateYj, endDateYj) ===
				0) {
				return;
			};
			//检查开始时间是否小于结束时间
			if (app.time.jiaoyan(startDateSq, endDateSq) > 0 || app.time.jiaoyan(startDateYj, endDateYj) > 0) {
				return;
			};

			const param = app.qbxsfx.serializeForm($(that.pageContainer).find('.content .form')); // 获取参数

			app.api.pzgl.addMgsqgl({
				data: param,
				success: function(result) {
					// console.log(result);
					if (result.success === 0) {
						app.alert('操作失败！');
						return;
					}

					that.close();
					app.alert('新增信息成功！');
					app.pzgl.mgsqgl.search.refresh();
				}
			});
		});

	},
	initForm: function() {

	},
}
