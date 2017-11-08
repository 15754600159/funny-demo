app.drypfx.import = {
    url: 'pages/kyrqdrypfx/excelWindow.html',
    callback: null,
    vehicles: null,
    open: function(that) {
        var importId = $(that).parent().parent('tr').data('id'); //记录操作的信息id,以便后面获取数据
        $('.page .drypfx').data('importId', importId);

        $m.page.openPage(this.url, 'fade', 'container-wrapper');
    },
    close: function() {
        this.clear();
        $m.page.closePage(this.url, 'fade', 'container-wrapper');
    },
    init: function() {
        var that = this,
            importId = $('.page .drypfx').data('importId'),
            url = app.api.kyrqdrypfx.kyryDrUrl.replace('{kyrqbh}', importId);

        $('#uploadExcelFile input[name="kyrqbh"]').val(importId); //初始化表单人群编号

        $('#window-excelWindow').addClass('popIn');
        // 弹框 'x' 点击关闭按钮事件监听
        $('#window-excelWindow .btn-window-close').off('click').on('click', function() {
            $('#window-excelWindow').addClass('popOut');
            that.close();
        });

        // 文件类型判断
        $('#fileupload').on('change', function() {
            var that = this,
                value = $(this).val(),
                reg = /(xls|xlsx)$/;

            if (!reg.test(value)) {
                app.alert('文件类型不符');
                $(this).val('');
            }
        })

        // 确定按钮
        $('#btn-ok-excel').on('click', function() {
            // 提交前判断
            if ($('#fileupload').val() === '') {
                app.alert('请选择文件');
                return;
            }

            // 文件上传
            $.ajax({
                url: url,
                type: 'POST',
                cache: false,
                data: new FormData($('#uploadExcelFile')[0]),
                processData: false,
                contentType: false,
                dataType: "json",
                beforeSend: function() {
                    app.loading.show();
                },
                success: function(data) {
                    app.loading.hide();
                    if (data.success === 1) {
                        app.alert('文件导入成功！');
                        if (page === 'gzqt') {
                            app.gzqt.search.initSearchForm(1, 10, app.gzqt.search.pagination);
                            return;
                        }
                        if (page === 'zxrygl') {
                            app.zxrygl.search.initSearchForm(0, 1, app.zxrygl.search.pagination);
                            return;
                        }
                    } else {
                        app.alert('文件导入失败！');
                    }
                },
                error: function(error) {
                    app.alert('文件导入出错！' + error);
                    app.loading.hide();
                }
            });

            that.close();
        });
    },
    clear: function() {
        this.callback = null;
        this.vehicles = null;
    },

};
