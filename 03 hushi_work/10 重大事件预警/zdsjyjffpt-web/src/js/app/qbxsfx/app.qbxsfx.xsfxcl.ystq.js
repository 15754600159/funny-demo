app.qbxsfx.xsfxcl.ystq = {
	data: {}, //临时存储，用于重置
	pageContainer: '.xsfxcl .sub-page.ystq',
	initSubpageYstq: function(qbxxid) {
		// 将请求相似线索聚类所需参数存储在相似线索聚类标签页上，供之后请求相似的线索使用
		let param = {
			qbxxid: qbxxid,
		};
		const tabElem = $('.xsfxcl .sub-page.ystq');
		tabElem.data('param', param);
		// 初始信息表搜索
		this.initYstqSearch();
		// 初始化页面元素点击功能
		this.initClickFunc();
	},
	reset: function() { //重置表单
		const tabElem = $('.xsfxcl .sub-page.ystq');
		app.qbxsfx.setFormValues(tabElem, this.data);
	},
	refresh: function() { //当前页刷新
		const page = $('#xsxsjlPagination li.active a').text();
		this.initYstqSearch(page, 10, app.qbxsfx.pagination);
	},
	initClickFunc: function() {
		const that = this;
		// 表单 iput后的‘X’清楚按钮
		$(that.pageContainer).on('click', '.glyphicon-remove', function() {
			$(this).siblings('input').val('');
		})
		// 表单重置
		$('.xsfxcl .sub-page.ystq .reset').on('click', function() {
			that.reset();
		});
		// 保存修改
		$('.xsfxcl .sub-page.ystq .save').on('click', function() {
			that.alertYstqRck();
		});
	},
	initYstqSearch: function() {
		const that = this;

		// app.loading.show(); // 显示loading
		// 获取查询所需参数
		const tabElem = $('.xsfxcl .sub-page.ystq'),
			param = tabElem.data('param');

		app.api.qbxsfx.viewQbxsRck({
			qbxxid: param.qbxxid,
			success: function(result) {
				// console.log(result);
				if (result.success === 0) {
					app.alert('查询数据失败！');
					// app.loading.hide(); // 隐藏loading
					return;
				}

				const data = result.msg;
				that.data = data; //存储数据
				// 将返回数据填入表单
				if (data !== '') {
					app.qbxsfx.setFormValues(tabElem, data);
				}

				// app.loading.hide();// 隐藏loading
			}
		});
	},
	alertYstqRck: function() {
		const that = this,
			tabElem = $('.xsfxcl .sub-page.ystq');
		let param = tabElem.data('param');

		param = app.qbxsfx.serializeForm(tabElem, param);
		app.api.qbxsfx.alterQbxsRck({
			data: param,
			success: function(result) {
				// console.log(result);
				if (result.success === 0) {
					app.alert('操作失败！');
					// app.loading.hide(); // 隐藏loading
					return;
				}

				that.data = param; //更新数据
				app.alert('修改成功！');

				// app.loading.hide();// 隐藏loading
			}
		});
	},

}
