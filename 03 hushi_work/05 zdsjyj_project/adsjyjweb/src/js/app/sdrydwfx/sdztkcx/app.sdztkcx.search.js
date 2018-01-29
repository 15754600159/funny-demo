app.sdztkcx.search = {
	pageno: 1,
	data: [{
		"id": "1",
		"name": "xd",
		"sex": "男",
		"diff": "涉毒",
		"sfzh": "230622199909090909",
		"mz": "蒙",
		"hjdqh": "呼和浩特市回民区",
		"cjsj": "出生日期",
		"state": "审批中"
	}],
	init: function() {
		app.time.init();
		$("#sdztk_startTime").val(app.time.last100year());
		$('#sdztk_endTime').val(app.time.now());
		app.sdztkcx.search.initSearchForm(0, 1, app.sdztkcx.search.pagination);
		app.sdztkcx.search.exportExcel();
	},
	all: function() {
		app.sdztkcx.search.initSearchForm(0, 1, app.sdztkcx.search.pagination);
	},
	reset: function() {
		$('#sdztk-name').val('');
		$('#sdztk-sfzh').val('');
		// $('#rygl-type').val('');
	},
	initSearchForm: function(pageIndex, pageSize, pagination) {
		var csrqks = $('#sdztk_startTime').val();
		var csrqjs = $('#sdztk_endTime').val();
		if (app.time.jiaoyan(csrqks, csrqjs) > 0) {
			return;
		}
		var name = $('#sdztk-name').val();
		var sfzh = $('#sdztk-sfzh').val();
		app.api.sdztkcx.view({
			data: {
				pageNo: app.sdztkcx.search.pageno,
				pageSize: 10,
				csrqks: csrqks,
				csrqjs: csrqjs,
				xm: name,
				sfzh: sfzh
				// rylb: type
			},
			success: function(result) {
				var data = result.msg.result;
				$(".table_all").html('');
				for (var i = 0; i < data.length; i++) {
					$(".table_all").append(
						"<tr>" +
						"<td class='checks'>" + '<label class="check"><input type="checkbox" name="r2" value="' + data[i].id +
						'"><span></span></label>' + "</td>" +
						"<td>" + app.data(data[i].xm) + '</td>' +
						"<td>" + app.data(data[i].xb) + "</td>" +
						"<td>" + app.data(data[i].sfzh) + "</td>" +
						"<td>" + app.data(data[i].mz) + "</td>" +
						"<td>" + app.data(data[i].hjdqh) + "</td>" +
						"<td>" + app.data(data[i].hjdxz) + "</td>" +
						"<td>" + app.data(data[i].csrq) + "</td>" +
						"<td>" +
						'<button class="btn btn-sm btn-primary look" type="submit" onclick="" >查看</button>' +
						'<button class="btn btn-sm btn-info" type="submit" style="margin-left:10px;"  onclick="">轨迹</button>' +
						"</td>" +
						"</tr >"
					);
				}
				app.sdztkcx.search.check();
				app.sdztkcx.search.pagination && app.sdztkcx.search.pagination(result);
			}
		});
		var data = 'tb_d_zdryxl';
		app.api.sdztkcx.types({
			data: {
				types: data
			},
			success: function(result) {
				console.info(result);
				var types = result.msg.tb_d_zdryxl; // 人员类别
				for (var o = 0; o < types.length; o++) {
					$("#rygl-type").append('<option value="' + types[o].value + '">' + types[o].label + '</option>')
				} // 人员类别搞定
			}
		});
	},
	pagination: function(data) {
		BootstrapPagination(
			$("#sdztkcx_pagination"), {
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
					app.sdztkcx.search.pageno = pageIndex + 1;
					app.sdztkcx.search.initSearchForm(pageIndex + 1, pageSize, app.sdztkcx.search.pagination);
				},
			});
	},
	initListPager: function() {
		app.sdztkcx.search.listPager = $m.listPager({
			varName: 'app.sdztkcx.search.listPager',
			itemId: 'list-sdztkcx',
			columns: [{
				name: 'name',
				label: '名称',
				sortable: true,
			}, {
				name: 'sex',
				label: '性别',
				sortable: true
			}, {
				name: 'diff',
				label: '类别',
				sortable: true
			}, {
				name: 'sfzh',
				label: '身份证号',
				sortable: true
			}, {
				name: 'mz',
				label: '民族',
				sortable: true
			}, {
				name: 'hjdqh',
				label: '户籍地区划',
				sortable: true
			}, {
				name: 'hjdxz',
				label: '户籍地详细地址',
				sortable: true
			}, {
				name: 'cjsj',
				label: '出生日期',
				sortable: true
			}, {
				name: 'state',
				label: '审批状态',
				sortable: true
			}, {
				name: 'id',
				label: '操作',
				headStyle: 'width:255px;text-align:center',
				dataRender: function(data, column) {
					var viewBtn = '<a class="btn" onclick="">查看</a>';
					var updateBtn = '<a class="btn" onclick="">修改</a>';
					var approveBtn =
						'<a class="btn btn-orange" href="javascript:void(0);" onclick="">审批</a>';
					return '<td style="text-align:center">' + viewBtn + updateBtn + approveBtn + '</td>';
				}
			}],
			dataProvider: function(listPager, callback) {
				var query = listPager.query || {};
				query.pageSize = listPager.pageSize;
				query.pageNum = listPager.pageNum;
				if (listPager.orderBy) {
					query.orderBy = listPager.orderBy;
					query.sort = listPager.asc ? 'asc' : 'desc';
				}
				//				app.api.sdztkcx.search({
				//					data: query,
				//					success: function(result) {
				callback(app.sdztkcx.search.data.length, app.sdztkcx.search.data);
				//					}
				//				});
			}
		});
		app.sdztkcx.search.listPager.refresh();
	},
	check: function() {
		$("#sdztkcx_checkall").on('click', function() {
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
				$('#sdztkcx_checkall').prop('checked', false);
			}
		});
	},
	exportExcel: function() {
		$('#sdztk-form-export').on('click', function() {
			var xm = $("#sdztk-name").val();
			var sfzh = $("#sdztk-sfzh").val();
			var beginCjsj1 = $("#sdztk_startTime").val();
			var endCjsj1 = $('#sdztk_endTime').val();
			var query = {
				xm: xm,
				sfzh: sfzh,
				pageNo: 1,
				pageSize: 10000,
				beginCjsj: beginCjsj1,
				endCjsj: endCjsj1
			};
			// location.href = app.api.sdztkcx.view + $m.serialize(query);
		});
	}
};
