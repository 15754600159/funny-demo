app.qbxsfxyj.qbxssj.search = {
    init: function() {
        // app.time.init();
        // this.SearchInfo(1, 10);

        // 结果表格全选checkbox按钮功能
        $('.list-qbxssj .checkAllBox').off('click').on('click', function(e) {
            var checkboxElem = $('.list-qbxssj tbody input[type="checkbox"]');

            if ($(this).is(':checked')) {
                checkboxElem.prop("checked", true);
                $('.qbxssj .btn-combination').removeClass('btn-current-disabled').addClass('btn-current');
            } else {
                checkboxElem.prop("checked", false);
                $('.qbxssj .btn-combination').addClass('btn-current-disabled').removeClass('btn-current');
            }
        })
        // 选中两条以上记录 就恢复组合报送按钮点击功能
        $('.list-qbxssj tbody').on('change', 'input.checkSingleData', function() {
            var selectLength = $('.list-qbxssj input.checkSingleData:checked').length;
            if (selectLength > 1) {
                $('.qbxssj .btn-combination').removeClass('btn-current-disabled').addClass('btn-current');
            } else {
                $('.qbxssj .btn-combination').addClass('btn-current-disabled').removeClass('btn-current');
            }
        })

        // 初始化标签选择-树-
        this.initTree();

        // 分页器初始化
        var msg = {
            total: 20,
            pageSize: 10,
            pageNo: 1,
        }
        app.qbxsfxyj.pagination && app.qbxsfxyj.pagination(msg, $('#qbxssjPagination'), this);
    },

    /**
     * @desc 表格信息查询函数
     * @param pageNo {Number} 第几页
     * @param pageSize {Number} 每一页信息条数
     * @return undefined
     */
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

    initTree: function() {
        var zTreeObj,
            onCheck = function(e, treeId, treeNode) { // 点击数checkbox函数
                var treeObj = $.fn.zTree.getZTreeObj(treeId),
                    nodes = treeObj.getCheckedNodes(true),
                    nodeStr = '';
                for (var i = 0; i < nodes.length; i++) {
                    nodeStr += i === 0 ? nodes[i].name : ',' + nodes[i].name;
                }
                sessionStorage.setItem('qbxssjTreeSelectedNode', nodeStr);
            },
            closeAlert = function(e) { // 关闭树弹窗函数
                var target = e.target;
                if (!$(target).hasClass('label-filter-tree') && $(e.target).parents('.label-filter-tree').length === 0) {
                    $('.label-filter-tree').addClass('hidden');
                }
            },
            setting = {
                check: {
                    enable: true,
                    chkStyle: "checkbox",
                    chkboxType: { "Y": "s", "N": "s" }
                },
                view: {
                    showIcon: false,
                    showTitle: false,
                    selectedMulti: false
                },
                data: {
                    simpleData: {
                        enable: true
                    }
                },
                callback: {
                    onCheck: onCheck
                },
            },
            zNodes = [
                {
                    name: "test1", open: true, children: [
                        { name: "test1_1" }, { name: "test1_2" }
                    ]
                },
                {
                    name: "test2", open: true, children: [
                        { name: "test2_1" }, { name: "test2_2" }
                    ]
                }
            ];
        zTreeObj = $.fn.zTree.init($("#qbxssjFilterTree"), setting, zNodes);
        // 事件监听
        $('.intelligence .label-filter').on('click', function(e) {
            e.stopPropagation();
            $('.label-filter-tree').removeClass('hidden');

            $(document).off().on('click', closeAlert);
        })
        $('.intelligence .label-btn-box .ok').on('click', function() {
            var selectedArray = sessionStorage.getItem('qbxssjTreeSelectedNode').split(',');
            $('.label-filter-tree').addClass('hidden');
            console.log('您选择的分类是:' + selectedArray);
        })
        $('.intelligence .label-btn-box .cancel').on('click', function() {
            $('.label-filter-tree').addClass('hidden');
        })
    },


}