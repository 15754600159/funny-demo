app.pzgl.gjcgl.add = {
	pageContainer: '.gjcgl-add',
	url: 'pages/pzgl/gjcgl/addWindow.html',
	open: function() {
		$m.page.openPage(this.url, 'fade', 'container-wrapper');
	},
	close: function() {
		$m.page.closePage(this.url, 'fade', 'container-wrapper');
	},
	init: function() {
        // 初始化涉事类别树DOM
		app.qbxsfx.initSslbTree(this.pageContainer + ' .sslb-tree-item');
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
			const param = app.qbxsfx.serializeForm($(that.pageContainer).find('.content .form')); // 获取参数

			app.api.pzgl.addGjcgl({
				data: param,
				success: function(result) {
					// console.log(result);
					if (result.success === 0) {
						app.alert('操作失败！');
						return;
					}

					that.close();
					app.alert('新增信息成功！');
					app.pzgl.gjcgl.search.refresh();
				}
			});
		});

	},
	initForm: function() {

	},
}
