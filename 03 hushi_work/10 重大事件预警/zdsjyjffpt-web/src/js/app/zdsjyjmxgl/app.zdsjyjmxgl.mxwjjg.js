app.zdsjyjmxgl.mxwjjg = {
    pageno: 1,
    init: function () {
        // $("#wggzqt-caijishijianstart").val(app.time.last());
        // $('#wggzqt-caijishijianzhi').val(app.time.now());
        app.time.init();
        app.zdsjyjmxgl.mxwjjg.initSearchForm(0, 1, app.zdsjyjmxgl.mxwjjg.pagination);
    },
    opennew: function () {
        $m.page.openPage(app.zdsjyjmxgl.add.url, 'fade', 'page-content-wrapper');
    },
    search: function () {
        app.zdsjyjmxgl.initSearchForm(1, 10, app.zdsjyjmxgl.mxwjjg.pagination);
    },
    del: function () {
        var checklist = $("input[type='checkbox']");
        var ids = [];
        var idss = '';
        for (var i = 0; i < checklist.length; i++) {
            var checkif = $(checklist[i]).prop('checked');
            if (checkif) {
                ids.push($(checklist[i]).val());
            }
        };
        if (ids == '') {
            layer.alert('请选择需要删除的列表');
        } else {
            layer.confirm('您确定要删除吗？', {
                btn: ['确定', '取消'],
                title: '删除'
            }, function (index) {
                idss = ids.join();
                console.info(typeof (idss))
                app.api.zdsjyjmxgl.delete({
                    data: {
                        ids: ids
                    },
                    success: function (result) {
                        console.info(result);
                        app.zdsjyjmxgl.initSearchForm(0, 1, app.zdsjyjmxgl.pagination);
                    }
                });
                layer.close(index);
            });
        }
    },
    //   现在在弄删除  千万别忘了
    initSearchForm: function (pageIndex, pageSize, pagination) {
        var startDate = $('#startDate').val();
        var endDate = $('#endDate').val();
        if (app.time.jiaoyan(startDate, endDate) > 0) {
            return;
        }
        var modelType = $
        ("#mxlx").find("option:selected").text();
        var mxmc = $("#mxmc").val();
        var sfyx = $("#sfyx").val();
        app.loading.show();
        app.api.zdsjyjmxgl.wjjg({
            data: {
                pageNo: app.zdsjyjmxgl.pageno,
                pageSize: 10,
                warningStartTime: startDate,
                warningEndTime: endDate,
                modelType: modelType,
                isGroup: sfyx,
                modelName: mxmc,
            },
            success: function (result) {
                console.info(result);
                $(".table-body").html('');
                var data = result.msg.result;
                for (var i = 0; i < data.length; i++) {
                    $(".table-body").append(
                        "<tr>"  +
                        "<td>" + app.data(data[i].modelName) + '</td>' +
                        "<td>" + app.data(data[i].modelType) + "</td>" +
                        "<td title='"+data[i].warningDetail+"'>" + app.data(data[i].warningDetail) + "</td>" +
                        "<td>" + app.data(data[i].warningTime) + "</td>" +
                        "<td>" + app.data(data[i].actTime) + "</td>" +
                        "<td>" + app.data(app.yx(data[i].isGroup)) + "</td>" +
                        "<td>" +
                        '<span class="glyphicon glyphicon-list-alt" aria-hidden="true" data-toggle="tooltip" data-placement="bottom" title="情报分析" onclick="app.zdsjyjmxgl.start(\'' +
                        data[i].id + '\',\'xg\')"></span>' +
                        "</td>" +
                        "</tr >"
                    );
                }
                app.loading.hide();
                app.zdsjyjmxgl.mxwjjg.pagination && app.zdsjyjmxgl.mxwjjg.pagination(result);
            }
        });
    },
    start: function (id) {
        app.loading.show();
        app.api.zdsjyjmxgl.start({
            data: {
                id: id
            },
            success: function (result) {
                console.info(result);
                app.loading.hide();
            }
        });

	},
	check: function() {
		$("#Checkall").on('click', function() {
			var checkif = $('#Checkall').prop('checked');
			console.info(checkif);
			if (checkif) {
				$("input[type='checkbox']").prop("checked", true);
			} else {
				$("input[type='checkbox']").prop("checked", false);
			}
		});
		var a = $(".table_all input[type='checkbox']");
		$(a).on('click', function() {
			var checkif = $(this).prop('checked');
			console.info(checkif);
			if (checkif == false) {
				$('#Checkall').prop('checked', false);
			}
		});
	},
	pagination: function(data) {
		BootstrapPagination(
			$("#pagination"), {
				layoutScheme: "lefttext,firstpage,prevgrouppage,prevpage,pagenumber,nextpage,nextgrouppage,lastpage,pageinput,righttext",
				// 记录总数。
				total: data.msg.total,
				// 分页尺寸。指示每页最多显示的记录数量。
				pageSize: data.msg.pageSize,
				// 当前页索引编号。从其开始（从0开始）的整数。
				pageIndex: data.msg.pageNo - 1,
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
					app.zdsjyjmxgl.mxwjjg.pageno = pageIndex + 1;
					app.zdsjyjmxgl.mxwjjg.initSearchForm(pageIndex + 1, pageSize, app.zdsjyjmxgl.mxwjjg.pagination);
				},
			});
	},
}
