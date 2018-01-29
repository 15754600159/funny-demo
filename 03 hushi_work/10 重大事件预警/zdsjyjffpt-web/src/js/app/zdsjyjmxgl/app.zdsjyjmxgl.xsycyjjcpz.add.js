app.zdsjyjmxgl.xsycyjjcpz.add = {
	pageContainer: '.xsycyjjcpz-add',
	url: 'pages/zdsjyjmxgl/xsycyjjcpz/addWindow.html',
	open: function() {
		$m.page.openPage(this.url, 'fade', 'container-wrapper');
	},
	close: function() {
		$m.page.closePage(this.url, 'fade', 'container-wrapper');
	},
	init: function() {
		// 初始时间选择框
		app.time.init();
		// 初始化下拉框码表信息
		app.qbxsfx.initDictSelect(this.pageContainer);
		// 初始化关键词多选下拉框
		app.qbxsfx.initGjcSlect2(this.pageContainer);
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
			param.gjc = param.gjc.join(',');

			app.api.zdsjyjmxgl.addXsycyjjcpz({
				data: param,
				success: function(result) {
					// console.log(result);
					if (result.success === 0) {
						app.alert('操作失败！');
						return;
					}

					that.close();
					app.alert('新增信息成功！');
					app.zdsjyjmxgl.xsycyjjcpz.search.refresh();
				}
			});
		});
		// 敏感时期下拉框选择，为预警时间段赋值
		$('select[name="sensitive"]', that.pageContainer).change(function() {
			const id = $(this).val(),
				mgsqFullData = app.constants.mgsqFullData;
			let startTime = '',
				endTime = '';
			for (let elem of mgsqFullData) {
				if (elem.id === id) {
					$('input[name="startTime"]', that.pageContainer).val(elem.warningStartTime);
					$('input[name="endTime"]', that.pageContainer).val(elem.warningEndTime);
					break;
				}
			}
		});

	},
	initForm: function() {

	},
}
