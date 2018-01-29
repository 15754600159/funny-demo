app.zxrygl.search = {
	pageno: 1,
	data: [{
		"id": "1",
		"name": "xd",
		"sex": "男",
		"diff": "涉毒",
		"sfzh": "230622199909090909",
		"mz": "蒙",
		"hjdqh": "呼和浩特市回民区",
		"cjsj": "采集时间",
		"state": "审批中"
	}],
	init: function() {
		// app.zxrygl.search.initListPager();
		app.time.init();
		//	$("#caistart").val(app.time.last());
		$("#caistart").val('2001-01-01 00:00:00');
		$('#caiend').val(app.time.now());
		app.zxrygl.search.initSearchForm(0, 1, app.zxrygl.search.pagination);
		$('.zxry .download-template').on('click', function() {
			window.location.href = app.api.zxrygl.zxryglExcelTemplateUrl;
		});
		app.zxrygl.search.exportExcel();
	},
	all: function() {
		app.zxrygl.search.initSearchForm(0, 1, app.zxrygl.search.pagination);
	},
	reset: function() {
		$("#caistart").val('2001-01-01 00:00:00');
		$('#caiend').val(app.time.now());
		$('#rygl-name').val('');
		$('#rygl-sfzh').val('');
		$('#rygl-type').val('');
	},
	initSearchForm: function(pageIndex, pageSize, pagination) {
		var beginCjsj = $('#caistart').val();
		var endCjsj = $('#caiend').val();
		if (app.time.jiaoyan(beginCjsj, endCjsj) > 0) {
			return;
		}
		var name = $('#rygl-name').val();
		var sfzh = $('#rygl-sfzh').val();
		var type = $('#rygl-type').val();
		app.api.zxrygl.view({
			data: {
				pageNo: app.zxrygl.search.pageno,
				pageSize: 10,
				beginCjsj: beginCjsj,
				endCjsj: endCjsj,
				xm: name,
				sfzh: sfzh,
				rylb: type
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
						"<td>" + app.data(data[i].cjsj) + "</td>" +
						"<td>" +
						'<button class="btn btn-sm btn-primary look" type="submit" onclick="app.zxrygl.add.view(\'' + data[i].id +
						'\')" >查看</button>' +
						'<button class="btn btn-sm btn-info" type="submit" style="margin-left:10px;"  onclick="app.zxrygl.add.view(\'' +
						data[i].id + '\',\'ss\')">修改</button>' +
						"</td>" +
						"</tr >"
					);
				}
				app.zxrygl.search.check();
				app.zxrygl.search.pagination && app.zxrygl.search.pagination(result);
			}
		});
		var data = 'tb_d_zdryxl';
		app.api.zxrygl.types({
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
					app.zxrygl.search.pageno = pageIndex + 1;
					app.zxrygl.search.initSearchForm(pageIndex + 1, pageSize, app.zxrygl.search.pagination);
				},
			});
	},
	initListPager: function() {
		app.zxrygl.search.listPager = $m.listPager({
			varName: 'app.zxrygl.search.listPager',
			itemId: 'list-zxrygl',
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
				label: '采集时间',
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
					var viewBtn = '<a class="btn" onclick="javascript:app.zxrygl.openViewPage(\'' + data.id +
						'\');">查看</a>';
					var updateBtn = '<a class="btn" onclick="javascript:app.zxrygl.openUpdatePage(\'' + data.id +
						'\');">修改</a>';
					var approveBtn =
						'<a class="btn btn-orange" href="javascript:void(0);" onclick="javascript:app.zxrygl.approve(\'' +
						data.id + '\');">审批</a>';
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
				//				app.api.zxrygl.search({
				//					data: query,
				//					success: function(result) {
				callback(app.zxrygl.search.data.length, app.zxrygl.search.data);
				//					}
				//				});
			}
		});
		app.zxrygl.search.listPager.refresh();
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
	exportExcel: function() {
		$('#zxrygl-form-export').on('click', function() {
			var xm = $("#rygl-name").val();
			var sfzh = $("#rygl-sfzh").val();
			var beginCjsj1 = $("#caistart").val();
			var endCjsj1 = $('#caiend').val();
			var rylb = $('#rygl-type').val();
			var query = {
				xm: xm,
				sfzh: sfzh,
				pageNo: 1,
				pageSize: 10000,
				beginCjsj: beginCjsj1,
				endCjsj: endCjsj1,
				rylb: rylb,
			};
			location.href = app.api.zxrygl.exportFileUrl + $m.serialize(query);
		});
	}
};
