/*
 * @Author: 果实o
 * @Date: 2017-12-11 19:35:39
 * @Last Modified by: 果实o
 * @Last Modified time: 2018-02-27 20:51:52
 */
app.gztIndex = {
    pageContainer: '.gzt-index',
    url: 'pages/gztIndex/index.html',

    // 初始化页面
    init() {
        // 初始化页面元素点击功能
        this.initClickFunc();
    },

    //全局刷新
    reset() { },

    // 初始化页面元素点击功能
    initClickFunc() {
        const _this = this;

        // 初始化标签页切换
        app.myUil.initTabPage('.window-content');

        // 历史记录
        $('.advanced_search_btn', _this.pageContainer).on('click', function() {
            app.gxrfx.advancedSearch.open();
        });

    },

}
