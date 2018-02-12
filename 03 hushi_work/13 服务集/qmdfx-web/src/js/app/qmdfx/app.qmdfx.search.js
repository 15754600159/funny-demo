/*
 * @Author: 果实o
 * @Date: 2017-12-11 19:35:39
 * @Last Modified by: 果实o
 * @Last Modified time: 2018-02-12 14:22:53
 */
app.qmdfx.search = {
    pageContainer: '.qmdfx',
    url: 'pages/qmdfx/index.html',
    state: {
        isFold: true,
    },

    // 初始化页面
    init() {
        // 初始化页面元素点击功能
        this.initClickFunc();
        // 初始化表格最后一列操作文字的提示
        app.commonFunc.initTooltip();
        // 时间选择框初始化
        app.time.init();
    },

    //全局刷新
    reset() { },

    //当前页刷新
    refresh() {
        const page = $('#qmdfxPagination li.active a').text();
        this.initSearchForm(page, 10, app.commonFunc.pagination);
    },

    // 初始化页面元素点击功能
    initClickFunc() {
        const that = this;
        // 展开搜索详情
        $('.btn_search_detail', that.pageContainer).on('click', function() {
            if (that.state.isFold) {
                that.unfold();
            } else {
                that.fold();
            }
        });
        // 确定 收起搜索详情
        $('.btn_search_detail_ok', that.pageContainer).on('click', function() {
            that.fold();
        });
        // 点击规则设置按钮
        $('.btn_gzsz', that.pageContainer).on('click', function() {
            const button = $(this),
                model = $('.gzsz-model', that.pageContainer),
                left = button.offset().left,
                top = button.offset().top + 30;
            model.css({
                "display": "block",
                "left": left,
                "top": top
            });
        });
        // 模态框右上角关闭按钮 ‘X’
        $('.gzsz-model .glyphicon-remove', that.pageContainer).on('click', function() {
            const model = $(this).parents('.gzsz-model');
            model.hide();
        })

    },

    // 展开 详细搜索信息
    unfold() {
        this.state.isFold = !this.state.isFold;
        $('.top-part', this.pageContainer).css({ "height": "50vh" });
        $('.bottom-part', this.pageContainer).css({ "height": "47vh" });
    },

    // 收起 详细搜索信息
    fold() {
        this.state.isFold = !this.state.isFold;
        $('.top-part', this.pageContainer).css({ "height": "30vh" });
        $('.bottom-part', this.pageContainer).css({ "height": "67vh" });
    },


}
