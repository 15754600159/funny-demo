app.ckrqcy.update = {
    url: 'pages/kyrqdrypfx/ckrqcyUpdateWindow.html',
    callback: null,
    vehicles: null,
    open: function(that) {
        var updateId = $(that).parent().parent('tr').data('id'); //记录操作的信息id,以便后面获取数据
        $('.ckrqcy').data('updateId', updateId);

        $m.page.openPage(this.url, 'fade', 'container-wrapper');
    },
    close: function() {
        this.clear();
        $m.page.closePage(this.url, 'fade', 'container-wrapper');
    },
    init: function() {
        var that = this;

        $('#window-ckrqcy-updateWindow').addClass('popIn');
        // 弹框 'x' 点击关闭按钮事件监听
        $('#window-ckrqcy-updateWindow .btn-window-close').off('click').on('click', function() {
            $('#window-ckrqcy-updateWindow').addClass('popOut');
            that.close();
        });

        this.initForm();

        // 弹框 ‘确定’ 按钮点击提交表单事件监听
        $('#btn-ok-person-update').off('click').on('click', function() {
            var updateId = $('.ckrqcy').data('updateId'),
                formData = $m('#form-person-update').serializeObject();

            $.ajax({
                url: app.api.kyrqdrypfx.kyryXgUrl + updateId + '/',
                type: "put",
                data: formData,
                success: function(response) {
                    // console.log(response);
                    if (response.success === 1) {
                        app.alert('可疑人员修改成功！');
                        that.close(); // 关闭弹窗
                        app.ckrqcy.search.SearchInfo(1, 10); // 初始查询
                    } else {
                        app.alert('可疑人员修改失败！');
                    }
                },
                error: function(e) {
                    console.log('可疑人员修改出错！');
                }
            });
        })
    },
    clear: function() {
        this.callback = null;
        this.vehicles = null;
    },
    initForm: function() {
        // 复现表单数据
        $.ajax({
            url: app.api.kyrqdrypfx.kyryIdCxUrl + $('.ckrqcy').data('updateId') + '/',
            type: "get",
            success: function(response) {
                if (response.success === 1) {
                    $m('#form-person-update').setFormValues(response.msg);
                } else {
                    app.alert('可疑人员根据id查询失败！');
                }
            },
            error: function(e) {
                console.log('可疑人员根据id查询出错！');
            }
        });
    }
};
