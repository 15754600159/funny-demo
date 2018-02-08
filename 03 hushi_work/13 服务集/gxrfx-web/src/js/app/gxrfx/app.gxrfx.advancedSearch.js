app.gxrfx.advancedSearch = {
    pageContainer: '.gxrfx-advancedSearch',
    url: 'pages/gxrfx/advancedSearchWindow.html',
    open: function() {
        $m.page.openPage(this.url, 'fade', 'container-wrapper');
    },
    close: function() {
        $m.page.closePage(this.url, 'fade', 'container-wrapper');
    },
    init: function() {
        // 初始化时间选择框
        app.time.init();
        // 初始化人员类别下拉框
        this.initRylbSelector();
        // 初始化页面元素点击功能
        this.initClickFunc();
    },
    //当前页刷新
    refresh: function() {

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

    },

    // 初始化人员类别下拉框
    initRylbSelector: async function() {
        const param = {
            key: 'select_rylb',
        },
            selectContainer = $('select[name="rylbmc"]', $(this).pageContainer);
        let selectTemplate = '<option value="">请选择</option>';

        const result = await app.api.gxrfx.getRylbTreeData({ data: param });
        if (result.status === 0) {
            app.alert('查询人员类别下拉框数据失败！');
            return;
        };

        for (let elem of result.data.result) {
            selectTemplate += `<option value="${elem.name}">${elem.name}</option>`;
        };
        selectContainer.empty().append(selectTemplate);

    },
}
