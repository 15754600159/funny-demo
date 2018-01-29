app.pzgl.mgsqgl.update = {
	pageContainer: '.mgsqgl-update',
	url: 'pages/pzgl/mgsqgl/updateWindow.html',
	open: function() {
		$m.page.openPage(this.url, 'fade', 'container-wrapper');
	},
	close: function() {
		$m.page.closePage(this.url, 'fade', 'container-wrapper');
	},
	init: function() {
		// 填充原本的信息
		this.initForm();
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

			if (app.time.jiaoyan(startDateSq, endDateSq) > 0 || app.time.jiaoyan(startDateSq, endDateSq) > 0) { //检查开始时间是否小于结束时间
				return;
			};

			const param = app.qbxsfx.serializeForm($(that.pageContainer).find('.content .form')), // 获取参数
				id = $('.new-page .mgsqgl').data('updateId');
			param.id = id;
			$('.new-page .mgsqgl').data('updateId', ''); //重置存储信息

			app.api.pzgl.updateMgsqgl({
				data: param,
				success: function(result) {
					// console.log(result);
					if (result.success === 0) {
						app.alert('操作失败！');
						return;
					}

					that.close();
					app.alert('修改信息成功！');
					app.pzgl.mgsqgl.search.refresh();
				}
			});
		});

	},
	initForm: function() {
        app.loading.show(); // 显示loading
        const that = this,
            id = $('.new-page .mgsqgl').data('updateId'); //读取需要修改的信息id
        app.api.pzgl.getSingleMgsqgl({
            id: id,
            success: function(result) {
                // console.log(result);
                if (result.success === 0) {
                    app.alert('操作失败！');
                    app.loading.hide(); // 隐藏loading
                    return;
                }

                app.qbxsfx.setFormValues($(that.pageContainer).find('.content form'), result.msg);
                app.loading.hide(); // 隐藏loading
            }
        });
	},
}
