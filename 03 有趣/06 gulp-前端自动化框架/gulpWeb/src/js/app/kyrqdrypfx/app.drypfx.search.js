app.drypfx.search = {
    init: function() {
        app.time.init();
        this.SearchInfo(1, 10);

        // 结果表格全选checkbox按钮功能
        $('#list-drypfx .checks').off('click').on('click', function(e) {
            var checkboxElem = $('#list-drypfx .table_all input[type="checkbox"]');

            if ($(this).find('input').is(':checked')) {
                checkboxElem.prop("checked", true);
            } else {
                checkboxElem.prop("checked", false);
            }
        })
    },

    SearchInfo: function(pageNo, pageSize) {
        var formData = $m('#form-group-search').serializeObject(),
            that = this;
        formData.pageNo = pageNo;
        formData.pageSize = pageSize;

        $.ajax({
            url: app.api.kyrqdrypfx.kyrqCxUrl,
            type: "get",
            data: formData,
            success: function(result) {
                if (result.success !== 1) {
                    app.alert('可疑人群查询失败！');
                    console.log('result.success !=== 1');
                    return;
                }

                var msg = result.msg,
                    data = msg.result,
                    resultHtml = '';

                // 拼接、并添加html代码
                for (var i = 0; i < data.length; i++) {
                    resultHtml += "<tr data-id=" + data[i].kyrqbh + ">" +
                        `<td>
                            <label class="check">
                                <input type="checkbox" name="task" value="${data[i].kyrqbh}">
                                <span> </span>
                            </label> 
                        </td>` +
                        "<td>" + app.data(data[i].kyrqbh) + "</td>" +
                        "<td>" + app.data(data[i].rqmc) + "</td>" +
                        "<td>" + app.data(data[i].rqlx) + "</td>" +
                        "<td>" + app.data(data[i].rqgm) + "</td>" +
                        "<td>" + app.data(data[i].drsj) + "</td>" +
                        "<td>" + app.data(data[i].drr) + "</td>" +
                        "<td>" + app.data(data[i].yzyy) + "</td>" +
                        `<td>
                            <button class="btn btn-sm btn-primary" onclick="app.drypfx.import.open(this);">导入</button>
                            <button class="btn btn-sm btn-primary" style="margin-left:3px;" onclick="app.ckrqcy.search.open(this);">人员</button>
                            <button class="btn btn-sm btn-primary" style="margin-left:3px;" onclick="app.drypfx.check.open(this);">查看</button>
                            <button class="btn btn-sm btn-info" style="margin-left:3px;" onclick="app.drypfx.update.open(this);">修改</button>
                            <button class="btn btn-sm btn-danger" style="margin-left:3px;">到图析</button>
                            <button class="btn btn-sm btn-danger" style="margin-left:3px;">关系碰撞</button>
                        </td>` +
                        "</tr >"
                }
                $(".drypfx .table_all").empty().append(resultHtml);
                // 分页器初始化
                app.drypfx.pagination && app.drypfx.pagination(msg, $('#drypfxPagination'), that);
            },
            error: function(e) {
                console.log('可疑人群查询出错！')
            },
        });
    },

    reset: function() {
        app.drypfx.resetForm($('#form-group-search'));
    },

};
