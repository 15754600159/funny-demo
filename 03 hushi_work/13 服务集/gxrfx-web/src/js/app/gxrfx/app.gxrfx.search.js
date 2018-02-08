/*
 * @Author: 果实o
 * @Date: 2017-12-11 19:35:39
 * @Last Modified by: 果实o
 * @Last Modified time: 2018-02-08 20:13:32
 */
app.gxrfx.search = {
    pageContainer: '.gxrfx',
    url: 'pages/gxrfx/index.html',

    // 初始化页面
    init: function() {
        // 初始化页面元素点击功能
        this.initClickFunc();

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

    },

}
