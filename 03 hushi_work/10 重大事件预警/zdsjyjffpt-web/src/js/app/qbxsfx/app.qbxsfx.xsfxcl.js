app.qbxsfx.xsfxcl = {
	init: function() {
		// 初始化页面元素点击功能
		this.initClickFunc();
		// 加载页面信息
		this.loadMessage();
	},
	loadMessage: function() {
		// 检查是否从 情报线索管理 跳转而来
		const prePageStr = sessionStorage.getItem("prePage"),
			prePage = prePageStr ? JSON.parse(sessionStorage.getItem("prePage")) : '';
		if (prePage && prePage.do === 'qbfx') {
			// console.log('from qbxsgl id:' + prePage.qbxxid);
			this.initTopForm(prePage.qbxxid);
			app.qbxsfx.xsfxcl.glssqt.initSubpageGlssqt(prePage.qbxxid);
			app.qbxsfx.xsfxcl.glssry.initSubpageGlssry(prePage.qbxxid);
			app.qbxsfx.xsfxcl.xsxsjl.initSubpageXsxsjl(prePage.qbxxid, prePage.sslb);
			app.qbxsfx.xsfxcl.ystq.initSubpageYstq(prePage.qbxxid);

            sessionStorage.setItem("prePage", ""); //清除值
        }
    },
    initClickFunc: function() {
        const that = this;
        // 页面bottom-part标签切换的点击功能
        $('.xsfxcl .tabs').on('click', 'span', function() {
            const tab = $(this),
                subPage = tab.data('subpage');
            tab.addClass('active').siblings().removeClass('active');
            tab.parents('.bottom-part').find('.tab-content .' + subPage).addClass('active').siblings().removeClass('active');
        });
        //表格数据 情报分析按钮
        $(document).on('click', '.xsfxcl .btn_qbfx', function() {
            const id = $(this).parents('tr').data('id'),
                prePage = {
                    do: 'qbfx',
                    qbxxid: id
                };
            sessionStorage.setItem("prePage", JSON.stringify(prePage));
            that.loadMessage();
        });
    },
    initTopForm: function(id) {
        app.loading.show(); // 显示loading
        app.api.qbxsfx.viewQbxsDetail({
            qbxxid: id,
            success: function(result) {
                // console.log(result);
                if (result.success === 0) {
                    app.alert('查询数据失败！');
                    app.loading.hide(); // 隐藏loading
                    return;
                }

				const data = result.msg;
				app.qbxsfx.setFormValues($('.xsfxcl .top-part'), data);

				app.loading.hide();
			}
		});
	},

}
