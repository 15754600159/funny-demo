app.zdsjyjgl.module.check = {
	pageContainer: '.module-check',
	url: 'pages/zdsjyjgl/moduleCheckWindow.html',
	open: function() {
		$m.page.openPage(this.url, 'fade', 'container-wrapper');
	},
	close: function() {
		$m.page.closePage(this.url, 'fade', 'container-wrapper');
	},
	init: function() {
		// 初始化页面元素点击功能
        this.initClickFunc();
        // 加载模型详细数据
        this.initForm();
	},
	initClickFunc: function() {
		const that = this;
		// 弹框 'x'或者'取消' 点击关闭弹窗
		$(that.pageContainer).find('.btn-window-close').off('click').on('click', function() {
			$(that.pageContainer).find('.window').addClass('popOut'); //增加关闭效果
			that.close();
		});

	},
	initForm: function() {
        app.loading.show(); // 显示loading
        const that = this,
            id = $(app.zdsjyjgl.module.pageContainer).data('check-id'); //读取查看的模型id
        $(app.zdsjyjgl.module.pageContainer).data('check-id', ''); //清除查看的模型id数据
        app.api.zdsjyjgl.checkModelById({
            id: id,
            success: function(result) {
                // console.log(result);
                if (result.success === 0) {
                    app.alert('获取数据失败！');
                    app.loading.hide(); // 隐藏loading
                    return;
                }

                // result.msg.sslbmc = app.constants.sslb.nameMap[result.msg.sslb]
                app.qbxsfx.setFormValues($(that.pageContainer).find('.content form'), result.msg);
                app.loading.hide(); // 隐藏loading
            }
        });
	},
}
