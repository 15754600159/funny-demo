/*
 * @Author: 果实o
 * @Date: 2017-12-11 19:35:39
 * @Last Modified by: 果实o
 * @Last Modified time: 2018-02-09 11:31:13
 */
app.gxrfx.search = {
    pageContainer: '.gxrfx',
    url: 'pages/gxrfx/index.html',

    // 初始化页面
    init: function() {
        // 初始化页面元素点击功能
        this.initClickFunc();
        // 初始化表格最后一列操作文字的提示
        app.commonFunc.initTooltip();
    },

    //全局刷新
    reset: function() { },

    //当前页刷新
    refresh: function() {
        const page = $('#gxrfxPagination li.active a').text();
        this.initSearchForm(page, 10, app.commonFunc.pagination);
    },

    // 初始化页面元素点击功能
    initClickFunc: function() {
        const that = this;
        // 历史记录
        $('.advanced_search_btn', that.pageContainer).on('click', function() {
            app.gxrfx.advancedSearch.open();
        });
        // 页面‘下-右’部分 关系详情
        $('.right-table', that.pageContainer).on('click', '.btn_detail', function() {
            app.gxrfx.gxDetail.open();
        });

    },

}
