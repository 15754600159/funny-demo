app.zxrygl.bdgzry = {
	pageno: 0,
	url: 'pages/sdryzxgl/bdzqWindow.html',
	lookurl: "pages/sdryzxgl/bdgzlook.html",
	daoruurl: "pages/sdryzxgl/daoru.html",
	init: function () {
		app.time.init();
		app.zxrygl.bdgzry.initSearchForm();
		app.zxrygl.bdgzry.guanzhulist();
	},
	// 关注人员
	guanzhulist: function () {
		app.api.bdgzry.guanzhulist({
			success: function (result) {
				var data = result;
				console.info(data);
				for (var i = 0; i < data.length; i++) {
					$("#bdgzry-type").append("<option value='" + data[i] + "'>" + data[i] + "</option>");
				}
			}
		});
		app.api.bdgzry.renlist({
			success: function (result) {
				var data = result;
				console.info(data);
				for (var i = 0; i < data.length; i++) {
					$("#bdgzry-rylx").append("<option value='" + data[i] + "'>" + data[i] + "</option>");
				}
			}
		});
	},
	time: function () {
		app.time.init();
	},
	initSearchForm: function (pageIndex, pageSize, pagination) {
		var beginTime = $('#drstart').val();
		var endTime = $('#drend').val();
		if (app.time.jiaoyan(beginTime, endTime) > 0) {
			return;
		}
		var dataType = $("#bdgzry-type").val();
		var national = $("#bdgzry-mz").val();
		var names = $("#bdgrzy-xm").val();
		var idcardNo = $("#bdgzry-sfzh").val();
		var reason = $("#bdgzry-rylx").val();
		var importName = $("#bdgrzy-dr").val();
		app.loading.show();
		app.api.bdgzry.view({
			data: {
				pageNo: app.zxrygl.bdgzry.pageno,
				pageSize: 10,
				beginTime: beginTime,
				endTime: endTime,
				dataType: dataType,
				national: national,
				name: names,
				idcardNo: idcardNo,
				reason: reason,
				importName: importName,
			},
			success: function (result) {
				app.loading.hide();
				var data = result.result;
				console.info(data);
				$(".table_all").html('');
				for (var i = 0; i < data.length; i++) {
					$(".table_all").append(
						"<tr>" +
						"<td class='checks'>" + '<label class="check"><input type="checkbox" name="r2" value="' + data[i].id +
						'"><span></span></label>' + "</td>" +
						"<td title='" + app.data(data[i].fdataType) + "'>" + app.data(data[i].fdataType) + '</td>' +
						"<td title='" + app.data(data[i].fssyj) + "'>" + app.data(data[i].fssyj) + "</td>" +
						"<td title='" + app.data(data[i].fgmsfhm) + "'>" + app.data(data[i].fgmsfhm) + "</td>" +
						"<td title='" + app.data(data[i].fxm) + "'>" + app.data(data[i].fxm) + "</td>" +
						"<td title='" + app.data(data[i].fxbdm) + "'>" + app.data(data[i].fxbdm) + "</td>" +
						"<td title='" + app.data(data[i].fmzdm) + "'>" + app.data(data[i].fmzdm) + "</td>" +
						"<td title='" + app.data(data[i].fhjdzSsxqdm) + "'>" + app.data(data[i].fhjdzSsxqdm) + "</td>" +
						"<td title='" + app.data(data[i].fhjdzQhnxxdz) + "'>" + app.data(data[i].fhjdzQhnxxdz) + "</td>" +
						"<td title='" + app.data(data[i].flgmc) + "'>" + app.data(data[i].flgmc) + "</td>" +
						"<td title='" + app.data(data[i].fssyj) + "'>" + app.data(data[i].fssyj) + "</td>" +
						"<td title='" + app.data(data[i].fdealtype) + "'>" + app.data(data[i].fdealtype) + "</td>" +
						"<td title='" + app.data(data[i].fdeadline) + "'>" + app.data(data[i].fdeadline) + "</td>" +
						"<td title='" + app.data(data[i].finputperson) + "'>" + app.data(data[i].finputperson) + "</td>" +
						"<td title='" + app.data(data[i].sysdate) + "'>" + app.data(data[i].sysdate) + "</td>" +
						`<td class="operate">
							<span class="glyphicon glyphicon-list-alt" onclick="app.zxrygl.bdgzry.chakan('${data[i].fid}', 'ck')" aria-hidden="true" data-toggle="tooltip" data-placement="bottom" title="查看"></span>
							<span class="glyphicon glyphicon-pencil" onclick="app.zxrygl.bdgzry.chakan('${data[i].fid}', 'ss')" aria-hidden="true" data-toggle="tooltip" data-placement="bottom" title="修改"></span>
						</td>`+
						"</tr >"
					);
				}
				// app.qbxsfx.initTooltip(); // 初始化表格最后一列操作文字的提示
				app.zxrygl.bdgzry.check();
				app.zxrygl.bdgzry.pagination && app.zxrygl.bdgzry.pagination(result);
			}
		});
	},
	pagination: function (data) {
		BootstrapPagination(
			$("#pagination"), {
				layoutScheme: "lefttext,firstpage,prevgrouppage,prevpage,pagenumber,nextpage,nextgrouppage,lastpage,pageinput,righttext",
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
				pageChanged: function (pageIndex, pageSize) {
					app.zxrygl.bdgzry.pageno = pageIndex + 1;
					app.zxrygl.bdgzry.initSearchForm(pageIndex + 1, pageSize, app.zxrygl.bdgzry.pagination);
				},
			});
	},
	check: function () {
		$("#Checkall").on('click', function () {
			var checkif = $('#Checkall').prop('checked');
			console.info(checkif);
			if (checkif) {
				$("input[type='checkbox']").prop("checked", true);
			} else {
				$("input[type='checkbox']").prop("checked", false);
			}
		});
		var a = $(".table_all input[type='checkbox']");
		$(a).on('click', function () {
			var checkif = $(this).prop('checked');
			console.info(checkif);
			if (checkif == false) {
				$('#Checkall').prop('checked', false);
			}
		});
	},
	xiugai: function () {
		var checklist = $("input[type='checkbox']");
		var ids = new Array();
		var idss = new Array();
		for (var i = 0; i < checklist.length; i++) {
			var checkif = $(checklist[i]).prop('checked');
			if (checkif) {
				ids.push($(checklist[i]).val());
			}
		};
		console.info(ids)
		console.info(typeof (ids))
		if (ids.length == '') {
			layer.alert('请选择需要修改的列表');
		} else {
			layer.confirm('您确定要修改吗？', {
				btn: ['确定', '取消'],
				title: '删除'
			}, function (index) {
				app.zxrygl.bdzq.id = ids;
				console.info(typeof (ids))
				$m.page.openPage(app.zxrygl.bdgzry.url, 'fade', 'container-wrapper');
				// app.api.zxrygl.delete({
				// 	data: {
				// 		ids: idss
				// 	},
				// 	success: function(result) {
				// 		app.zxrygl.search.initSearchForm(0, 1, app.zxrygl.search.pagination);
				// 	}
				// });
				layer.close(index);
			});
		}
	},
	daoru: function () {
		$m.page.openPage(app.zxrygl.bdgzry.daoruurl, 'fade', 'container-wrapper');
	},
	daochu: function () {
		layer.confirm('导出数据量较大，页面导出仅支持最多10000条数据的导出，如果要全部导出，请联系系统管理员', {
			btn: ['确定'],
			title: '提示'
		}, function (index) {
			window.location.href = app.api.url + '/localperson/info/export?pageNo=1&pageSize=10000' +
				'&names=' + $('#bdgrzy-xm').val() +
				'&idcardNo=' + $('#bdgzry-sfzh').val() +
				'&national=' + $("#bdgzry-mz").val() +
				'&dataType=' + $('#bdgzry-type').val() +
				'&beginTime=' + $('#drstart').val() +
				'&endTime=' + $('#drend').val() +
				'&reason=' + $("#bdgzry-rylx").val() +
				'&importName=' + $("#bdgrzy-dr").val();
			layer.close(index);
		});
	},
	chexiao: function () {
		var checklist = $("input[type='checkbox']");
		var ids = new Array();
		var idss = new Array();
		for (var i = 0; i < checklist.length; i++) {
			var checkif = $(checklist[i]).prop('checked');
			if (checkif) {
				ids.push($(checklist[i]).val());

			}
		};
		console.info(ids)
		console.info(typeof (ids))
		if (ids.length == '') {
			layer.alert('请选择需要撤销的列表');
		} else {
			layer.confirm('您确定要撤销吗？', {
				btn: ['确定', '取消'],
				title: '删除'
			}, function (index) {
				app.api.bdgzry.chexiao({
					data: {
						ids: ids
					},
					success: function (result) {
						app.zxrygl.bdgzry.initSearchForm();
					}
				});
				layer.close(index);
			});
		}
	},
	xiazai: function () {
		location.href = 'template/personImport.xlsx';
	},
	huifu: function () {
		var checklist = $("input[type='checkbox']");
		var ids = new Array();
		var idss = new Array();
		for (var i = 0; i < checklist.length; i++) {
			var checkif = $(checklist[i]).prop('checked');
			if (checkif) {
				ids.push($(checklist[i]).val());

			}
		};
		console.info(ids)
		console.info(typeof (ids))
		if (ids.length == '') {
			layer.alert('请选择需要恢复的列表');
		} else {
			layer.confirm('您确定要恢复吗？', {
				btn: ['确定', '取消'],
				title: '删除'
			}, function (index) {
				app.api.bdgzry.huifu({
					data: {
						ids: ids
					},
					success: function (result) {
						app.zxrygl.bdgzry.initSearchForm();
					}
				});
				layer.close(index);
			});
		}
	},
	all: function () {
		app.zxrygl.bdgzry.initSearchForm();
	},
	chakan: function (id, statu) {
		console.info(statu);
		app.zxrygl.bdgzlook.id = id,
			app.zxrygl.bdgzlook.statu = statu;
		$m.page.openPage(app.zxrygl.bdgzry.lookurl, 'fade', 'container-wrapper');
	},
};
8