app.ckrqcy.add = {
    url: 'pages/kyrqdrypfx/ckrqcyAddWindow.html',
    callback: null,
    vehicles: null,
    open: function() {
        $m.page.openPage(this.url, 'fade', 'container-wrapper');
    },
    close: function() {
        this.clear();
        $m.page.closePage(this.url, 'fade', 'container-wrapper');
    },
    init: function() {
        var that = this;

        $('#window-ckrqcy-addWindow').addClass('popIn');
        // 弹框 'x' 点击关闭按钮事件监听
        $('#window-ckrqcy-addWindow .btn-window-close').off('click').on('click', function() {
            $('#window-ckrqcy-addWindow').addClass('popOut');
            that.close();
        });

        // this.initForm();

        // 弹框 ‘确定’ 按钮点击提交表单事件监听
        $('#btn-ok-person-add').off('click').on('click', function() {
            var formData = $m('#form-person-add').serializeObject();
            $.ajax({
                url: app.api.kyrqdrypfx.kyryXzUrl,
                type: "post",
                data: formData,
                success: function(response) {
                    // console.log(response);
                    if (response.success === 1) {
                        app.alert('可疑人员新增成功！');
                        that.close(); // 关闭弹窗
                        app.ckrqcy.search.SearchInfo(1, 10);; // 初始查询
                    } else {
                        app.alert('可疑人员新增失败！');
                    }
                },
                error: function(e) {
                    console.log('可疑人员新增出错！')
                }
            });
        })
    },
    clear: function() {
        this.callback = null;
        this.vehicles = null;
    },
    initForm: function() {

    }
};
