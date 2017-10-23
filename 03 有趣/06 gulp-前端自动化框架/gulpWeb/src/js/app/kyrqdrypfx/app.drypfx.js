app.drypfx = {
    // 表单自动填值 测试用
    testFrom: function(formElem) {
        formElem.find('input[type="text"]').val('test form submit');
        formElem.find('input[type="number"]').val(2);
        formElem.find('input[type="number"][name*="End"]').val(3);
        formElem.find('select option:nth-child(2)').prop("selected", true);;
        formElem.find('input.form_datetime[name*="Start"]').val('2017-09-06 09:09:32');
        formElem.find('input.form_datetime[name*="End"]').val('2017-09-20 09:09:32');

        formElem.find('input[type="text"][name*="Name"]').val('testForSubmit' + Math.random().toFixed(2) * 100); //任务名 可具体表单具体调整
    },

    // 序列化 一般容器中的 表单控件
    serializeFromWidget: function(container, formObject, i) {
        var formObject = formObject || {},
            input_selectElem = container.find('input[type="text"],select'),
            checkboxElem = container.find('input[type="checkbox"]');

        input_selectElem.each(function() {
            let key = $(this).attr('name'),
                value = $(this).val();
            formObject['ruleTableList[' + i + '].' + key] = value;
        })
        checkboxElem.each(function() {
            let key = $(this).attr('name'),
                value = $(this).is(':checked');
            formObject['ruleTableList[' + i + '].' + key] = value;
        })

        return formObject;
    },

    // 将后台返回值填入表单输入框
    setFormValues: function(elem, formObject) {
        var input_selectElem = elem.find('input, select'),
            checkboxElem = elem.find('input[type="checkbox"]');
        input_selectElem.each(function() {
            let name = $(this).attr('name');

            $(this).val(formObject[name]);
        })
        checkboxElem.each(function() {
            let name = $(this).attr('name');

            $(this).prop('checked', formObject[name]);
        })
    },

    // 多条信息删除
    deleteMutiple: function() {
        var idsArray = [],
            ids = '';

        $('#list-drypfx .table_all input[type="checkbox"]:checked').each(function() {
            idsArray.push($(this).val());
        });
        ids = idsArray.join(',');

        layer.confirm('您确定要删除这些信息吗？', {
            btn: ['确定', '取消'],
            title: '删除'
        }, function(index) {
            $.ajax({
                url: app.api.kyrqdrypfx.kyrqScUrl + '?ids=' + ids,
                type: "delete",
                success: function(response) {
                    // console.log(response);
                    if (response.success === 1) {
                        app.alert('可疑人群删除成功！');
                        app.drypfx.search.SearchInfo(1, 10); // 初始查询
                    } else {
                        app.alert('可疑人群删除失败！');
                    }
                },
                error: function(e) {
                    console.log('可疑人群删除出错！');
                }
            });

            layer.close(index);
        });
    },

    // 分页器
    pagination: function(data, container, page) {
        // console.log(data)
        BootstrapPagination(
            container, {
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
                    page.SearchInfo(pageIndex + 1, pageSize);
                },
            });
    },

    resetForm: function(form) {
        form.find('input').val('');
    },

};
