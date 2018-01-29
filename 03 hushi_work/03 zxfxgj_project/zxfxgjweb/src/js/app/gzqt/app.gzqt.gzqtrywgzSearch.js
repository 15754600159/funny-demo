app.gzqt.gzqtrywgzSearch = {
    qtbh: null,
    init: function() {
        $("#qtrywgzgl-qtbh").val(app.gzqt.gzqtrywgzSearch.qtbh),
            app.gzqt.gzqtrywgzSearch.initSearchForm(0, 10, app.gzqt.gzqtrywgzSearch.pagination);
    },
    viewback: function() {
        sessionStorage.setItem("from", "gzqtwgzrygl");
        var url = app.urls();
        window.location.href = url;
    },
    reset: function() {
        $("#qtrywgzgl-qtbh").val('');
        $('#qtrywgzgl-sfzh').val('');
        $('#qtrywgzgl-name').val('');
        $('#qtrywgzgl-label').val('');
    },
    initSearchForm: function(pageIndex, pageSize, pagination) {
        var zdqtbh = $("#qtrywgzgl-qtbh").val();
        var sfzh = $('#qtrywgzgl-sfzh').val();
        var xm = $('#qtrywgzgl-name').val();
        var bq = $('#qtrywgzgl-label').val();
        app.api.gzqt.qtrywgzglview({
            data: {
                zdqtbh: zdqtbh,
                sfzh: sfzh,
                xm: xm,
                tag: bq,
                pageNo: pageIndex,
                pageSize: pageSize
            },
            success: function(result) {
                var data = result.msg.result;
                console.info(data);
                var check = '';
                $("#qtrywgzgl_table").empty();
                for (var i = 0; i < data.length; i++) {
                    check = '<label class="check">' +
                        '<input type="checkbox" name="sub" value="' + data[i].id + '">' +
                        '<span> </span>' +
                        '</label>'
                    $("#qtrywgzgl_table").append(
                        "<tr>" +
                        "<td>" + check + '</td>' +
                        "<td>" + data[i].zdqtbh + '</td>' +
                        "<td>" + data[i].sfzh + "</td>" +
                        "<td>" + data[i].xm + "</td>" +
                        "<td>" + data[i].hdgj + "</td>" +
                        "<td>" + data[i].cylx + "</td>" +
                        "<td>" + data[i].flag + "</td>" +
                        "<td>" +
                        '<button class="btn btn-sm btn-primary" type="submit" onclick="app.gzqt.toqtrywgzViewPage(\'' + data[i].id + '\')">查看</button>' +
                        '<button class="btn btn-sm btn-primary" type="submit" style="margin-left:10px;" onclick="app.gzqt.toqtrywgzUpdatePage(\'' + data[i].id + '\')">修改</button>' +
                        '<button class="btn btn-sm btn-primary" style="margin-left:10px;" onclick="app.gzqt.gzqtrywgzdel.delone(\'' + data[i].id + '\');" >删除</button>' +
                        "</td>" +
                        "</tr >"
                    );
                }
                app.gzqt.gzqtrywgzSearch.pagination && app.gzqt.gzqtrywgzSearch.pagination(result.msg);
            }
        });
    },

    initForm: function() {
        app.gzqt.gzqtrywgzSearch.initSearchForm(0, 10, app.gzqt.gzqtrywgzSearch.pagination);
    },

    pagination: function(data) {
        BootstrapPagination(
            $("#gzqtrywgzpagination"), {
                layoutScheme: "lefttext,pagesizelist,firstpage,prevgrouppage,prevpage,pagenumber,nextpage,nextgrouppage,lastpage,pageinput,righttext",
                // 记录总数。
                total: data.total,
                // 分页尺寸。指示每页最多显示的记录数量。
                pageSize: data.pageSize,
                // 当前页索引编号。从其开始（从0开始）的整数。
                pageIndex: data.pageNo - 1,
                // 指示分页导航栏中最多显示的页索引数量。
                pageGroupSize: 10,
                // 位于导航条左侧的输出信息格式化字符串
                leftFormateString: "本页{count}条记录/共{total}条记录",
                // 位于导航条右侧的输出信息格式化字符串
                rightFormateString: "第{pageNumber}页/共{totalPages}页",
                // 页码文本格式化字符串。
                pageNumberFormateString: "{pageNumber}",
                // 分页尺寸输出格式化字符串
                pageSizeListFormateString: "每页显示{pageSize}条记录",
                // 上一页导航按钮文本。
                prevPageText: "上一页",
                // 下一页导航按钮文本。
                nextPageText: "下一页",
                // 上一组分页导航按钮文本。
                prevGroupPageText: "上一组",
                // 下一组分页导航按钮文本。
                nextGroupPageText: "下一组",
                // 首页导航按钮文本。
                firstPageText: "首页",
                // 尾页导航按钮文本。
                lastPageText: "尾页",
                // 设置页码输入框中显示的提示文本。
                pageInputPlaceholder: "GO",
                // 接受用户输入内容的延迟时间。单位：毫秒
                pageInputTimeout: 800,
                // 分页尺寸列表。
                pageSizeList: [5, 10, 20],
                // 当分页更改后引发此事件。
                pageChanged: function(pageIndex, pageSize) {
                    app.gzqt.gzqtrywgzSearch.initSearchForm(pageIndex + 1, pageSize, app.gzqt.gzqtrywgzSearch.pagination);
                },
            });
    },
};