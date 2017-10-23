app.drypfx.check = {
    url: 'pages/kyrqdrypfx/drypfxCheckWindow.html',
    callback: null,
    vehicles: null,
    open: function(that) {
        var checkId = $(that).parent().parent('tr').data('id'); //记录操作的信息id,以便后面获取数据
        $('.page .drypfx').data('checkId', checkId);

        $m.page.openPage(this.url, 'fade', 'container-wrapper');
    },
    close: function() {
        this.clear();
        $m.page.closePage(this.url, 'fade', 'container-wrapper');
    },
    init: function() {
        var that = this;

        $('#window-drypfx-checkWindow').addClass('popIn');
        // 弹框 'x' 点击关闭按钮事件监听
        $('#window-drypfx-checkWindow .btn-window-close').off('click').on('click', function() {
            $('#window-drypfx-checkWindow').addClass('popOut');
            that.close();
        });

        // 禁用输入框
        $('input', $('#form-group-check')).prop('disabled', 'disabled');

        this.initForm();

    },
    clear: function() {
        this.callback = null;
        this.vehicles = null;
    },
    initForm: function() {
        // 初始化输入框内容内容
        $.ajax({
            url: app.api.kyrqdrypfx.kyrqIdCxUrl + $('.page .drypfx').data('checkId') + '/',
            type: "get",
            success: function(response) {
                if (response.success === 1) {
                    $m('#form-group-check').setFormValues(response.msg);
                } else {
                    app.alert('可疑人群根据id查询失败！');
                }
            },
            error: function(e) {
                console.log('群可疑人群根据id查询出错！')
            }
        });
    }

};
