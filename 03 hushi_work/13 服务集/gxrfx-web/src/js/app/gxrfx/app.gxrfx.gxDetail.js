app.gxrfx.gxDetail = {
    pageContainer: '.gxrfx-gxDetail',
    url: 'pages/gxrfx/gxDetailWindow.html',
    open: function() {
        $m.page.openPage(this.url, 'fade', 'container-wrapper');
    },
    close: function() {
        $m.page.closePage(this.url, 'fade', 'container-wrapper');
    },
    init: function() {
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
        // 历史记录
        $('.btn_history', that.pageContainer).on('click', function() {
            app.gxrfx.history.open();
        });

    },

    initForm: function() {

    },

}
