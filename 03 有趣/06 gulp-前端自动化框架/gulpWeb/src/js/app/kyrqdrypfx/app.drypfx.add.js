app.drypfx.add = {
    url: 'pages/kyrqdrypfx/drypfxAddWindow.html',
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

        $('#window-drypfx-addWindow').addClass('popIn');
        // 弹框 'x' 点击关闭按钮事件监听
        $('#window-drypfx-addWindow .btn-window-close').off('click').on('click', function() {
            $('#window-drypfx-addWindow').addClass('popOut');
            that.close();
        });

        this.initForm();

        // 弹框 ‘确定’ 按钮点击提交表单事件监听
        $('#btn-ok-group-add').off('click').on('click', function() {
            $('#form-group-add').submit();
        })
    },
    clear: function() {
        this.callback = null;
        this.vehicles = null;
    },
    initForm: function() {
        $m('#form-group-add').validate({
            submitHandler: function(form) {
                var formData = $m(form).serializeObject();
                $.ajax({
                    url: app.api.kyrqdrypfx.kyrqXzUrl,
                    type: "post",
                    data: formData,
                    success: function(response) {
                        // console.log(response);
                        if (response.success === 1) {
                            app.alert('可疑人群新增成功！');
                            that.close(); // 关闭弹窗
                            app.drypfx.search.SearchInfo(1, 10);; // 初始查询
                        } else {
                            app.alert('可疑人群新增失败！');
                        }
                    },
                    error: function(e) {
                        console.log('可疑人群新增出错！')
                    }
                });
            },
            rules: {
                rqmc: {
                    required: true,
                    // maxlength: 60
                },
                rqlx: {
                    required: true,
                },
                yzyy: {
                    required: true,
                }
            },
            messages: {
                rqmc: {
                    required: "请输入人群名称",
                    // maxlength: '名称长度不能超过20个汉字'
                },
                rqlx: {
                    required: "请输入人群类型",
                },
                yzyy: {
                    required: '请输入研制原因',
                }
            }
        });
    }
};
