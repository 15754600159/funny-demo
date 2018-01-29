app.gzqt.search = {
    type: 'group_type',
    init: function() {
        app.time.init();
        // 下载模板
        $('.gzqt_body .download-template').on('click', function() {
            window.location.href = app.api.gzqt.gzqtExcelTemplateUrl;
        })

        // $('#begin_datetime').val(app.time.last());
        $('#begin_datetime').val('2001-01-01 00:00:00');
        $('#end_datetime').val(app.time.now());
        // app.gzqt.search.initSearchForm(1, 10, app.gzqt.search.pagination);
        app.gzqt.search.initType();
        app.gzqt.search.exportExcel();

    },
    reset: function() {
        $('#begin_datetime').val('2001-01-01 00:00:00');
        $('#end_datetime').val(app.time.now());
        $('#qtmc_input').val('');
        $('#qtbh_input').val('');
    },
    exportExcel: function() {
        var beginCjsj1 = $("#begin_datetime").val();
        var endCjsj1 = $('#end_datetime').val();
        var qtmc1 = $('#qtmc_input').val();
        var qtbh1 = $('#qtbh_input').val();
        // var qtlb1 = $('#qtlb_input').val();
        $('#qgzt-form-export').on('click', function() {
            var query = {
                pageNo: 1,
                pageSize: 10000,
                beginClsj: beginCjsj1,
                endClsj: endCjsj1,
                qtmc: qtmc1,
                zdqtbh: qtbh1,
                qtlb: ''
            };
            location.href = app.api.gzqt.exportFileUrl + $m.serialize(query);
        });
    },
    initType: function() {
        app.api.gzqt.viewgrouptype({
            data: {
                types: app.gzqt.search.type
            },
            success: function(result) {
                console.log(result);
                app.select.initMap($('#qtlb_input'), result.msg.group_type);
                app.gzqt.search.initSearchForm(1, 10, app.gzqt.search.pagination);
            },
            error: app.api.error
        });
    },
    initSearchForm: function(pageIndex, pageSize, pagination) {
        var beginCjsj = $("#begin_datetime").val();
        var endCjsj = $('#end_datetime').val();
        var qtmc = $('#qtmc_input').val();
        var qtbh = $('#qtbh_input').val();
        var qtlb = $('#qtlb_input').val();
        console.log(qtmc)
        console.log(qtbh)
        console.log(qtlb)
        app.api.gzqt.search({
            data: {
                pageNo: pageIndex,
                pageSize: pageSize,
                beginClsj: beginCjsj,
                endClsj: endCjsj,
                qtmc: qtmc,
                zdqtbh: qtbh,
                qtlb: qtlb
            },
            success: function(result) {
                var data = result.msg.result;
                console.info(data);
                var check = '';
                $(".table_all").empty();
                for (var i = 0; i < data.length; i++) {
                    check = '<label class="check">' +
                        '<input type="checkbox" name="sub" value="' + data[i].zdqtbh + '">' +
                        '<span> </span>' +
                        '</label>'
                    // check = "<input  type='checkbox' value='" + data[i].dqtbh + "' name='sub'>";
                    $(".table_all").append(
                        "<tr>" +
                        "<td>" + check + '</td>' +
                        "<td>" + data[i].qtmc + '</td>' +
                        "<td>" + data[i].clsj + "</td>" +
                        "<td>" + data[i].qtlb + "</td>" +
                        "<td>" + data[i].qtgm + "</td>" +
                        "<td>" + data[i].zysq + "</td>" +
                        "<td>" + data[i].csyy + "</td>" +
                        "<td>" + data[i].zdqtbh + "</td>" +
                        "<td>" + 40 + "</td>" +
                        "<td>" +
                        '<button class="btn btn-sm btn-primary" type="submit" onclick="app.gzqt.toqtryglViewPage(\'' + data[i].zdqtbh + '\');">人员</button>' +
                        '<button class="btn btn-sm btn-primary" type="submit" style="margin-left:10px;" onclick="app.gzqt.toqtrywgzglViewPage(\'' + data[i].zdqtbh + '\');">未关注人员</button>' +
                        '<button class="btn btn-sm btn-primary" type="submit" style="margin-left:10px;" onclick="app.gzqt.toglzdrViewPage(\'' + data[i].zdqtbh + '\');">关联重点人</button>' +
                        '<button class="btn btn-sm btn-info" type="submit" style="margin-left:10px;" onclick="app.gzqt.toViewPage(\'' + data[i].zdqtbh + '\');">查看</button>' +
                        '<button class="btn btn-sm btn-info" type="submit" style="margin-left:10px;" onclick="app.gzqt.toUpdatePage(\'' + data[i].zdqtbh + '\');">修改</button>' +
                        '<button class="btn btn-sm btn-info" type="submit" style="margin-left:10px;" onclick="app.gzqt.toxcxqtViewPage(\'' + data[i].zdqtbh + '\');">是否形成新群体</button>' +
                        '<button class="btn btn-sm btn-info" type="submit" style="margin-left:10px;" onclick="app.gzqt.togjyjViewPage(\'' + data[i].zdqtbh + '\');">轨迹预警</button>' +
                        // '<button class="btn btn-sm btn-info" type="submit" style="margin-left:10px;">异动预警</button>' +
                        '<button class="btn btn-sm btn-danger" type="submit" style="margin-left:10px;" onclick="app.gzqt.delone(\'' + data[i].zdqtbh + '\')">删除</button>' +
                        "</td>" +
                        "</tr >"
                    );
                }
                app.gzqt.search.pagination && app.gzqt.search.pagination(result.msg);
            }
        });
    },
    pagination: function(data) {
        BootstrapPagination(
            $("#qtgl_pagination"), {
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
                    app.gzqt.search.initSearchForm(pageIndex + 1, pageSize, app.gzqt.search.pagination);
                },
            });
    },

};
