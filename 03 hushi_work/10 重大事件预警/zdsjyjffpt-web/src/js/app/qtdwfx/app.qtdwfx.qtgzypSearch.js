app.qtdwfx.qtgzypSearch = {
	type: 'group_type',
	load: '',
	init: function() {
		app.time.init();
		// // 下载模板
		// $('.gzqt_body .download-template').on('click', function() {
		//     window.location.href = app.api.gzqt.gzqtExcelTemplateUrl;
		// })

		$('#begin_datetime').val(app.time.last());
		$('#begin_datetime').val('2001-01-01 00:00:00');
		$('#end_datetime').val(app.time.now());
		app.qtdwfx.qtgzypSearch.initSearchForm(1, 5, app.qtdwfx.qtgzypSearch.pagination);
		app.qtdwfx.qtgzypSearch.initType();
		app.qtdwfx.qtgzypSearch.exportExcel();

	},
	reset: function() {
		$('#begin_datetime').val('2001-01-01 00:00:00');
		$('#end_datetime').val(app.time.now());
		$('#qtmc_input').val('');
		$('#qtbh_input').val('');
	},

	refresh: function() {
		app.qtdwfx.qtgzypSearch.reset();
		app.qtdwfx.qtgzypSearch.initSearchForm(1, 10, app.qtdwfx.qtgzypSearch.pagination);
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
				types: app.qtdwfx.qtgzypSearch.type
			},
			success: function(result) {
				console.log(result);
				app.select.initMap($('#qtlb_gxyp_input'), result.msg.group_type);
				app.qtdwfx.qtgzypSearch.initSearchForm(1, 5, app.qtdwfx.qtgzypSearch.pagination);
			},
			error: app.api.error
		});
	},
	initSearchForm: function(pageIndex, pageSize, pagination) {
		var beginCjsj = $("#begin_datetime").val();
		var endCjsj = $('#end_datetime').val();
		var qtmc = $('#qtmc_input').val();
		var qtbh = $('#qtbh_input').val();
		var qtlb = $('#qtlb_gxyp_input').val();
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
				$(".table_all_qtyp").empty();
				for (var i = 0; i < data.length; i++) {
					// check = "<input  type='checkbox' value='" + data[i].dqtbh + "' name='sub'>";
					$(".table_all_qtyp").append(
						'<tr onclick="app.qtdwfx.qtgzypSearch.click(\'' + data[i].zdqtbh + '\')">' +
						"<td>" + data[i].qtmc + '</td>' +
						"<td>" + data[i].clsj + "</td>" +
						"<td>" + data[i].qtlb + "</td>" +
						"<td>" + data[i].qtgm + "</td>" +
						"<td>" + data[i].zysq + "</td>" +
						"<td>" + data[i].csyy + "</td>" +
						"<td>" + data[i].zdqtbh + "</td>" +
						"<td>" + 40 + "</td>" +
						`<td class="operate">
							<span class="glyphicon glyphicon-list-alt" onclick="app.gzqt.toViewPage('${data[i].zdqtbh}')" aria-hidden="true" data-toggle="tooltip" data-placement="bottom" title="查看"></span>
						</td>`+
						"</tr >"
					);
				}
				app.qtdwfx.qtgzypSearch.pagination && app.qtdwfx.qtgzypSearch.pagination(result.msg);
				app.qbxsfx.initTooltip(); // 初始化表格最后一列操作文字的提示
			}
		});
	},
	click: function(data) {
		var url = 'http://yp.hsga.nn:8055/core.html?username=014591#!scopa/graph/key/';
		console.info(data);
		app.api.gzqt.ids({
			data: {
				types: data
			},
			success: function(result) {
				console.log(result);
				if (result != '') {
					for (var i = 0; i < result.length; i++) {
						url = url + result[i] + ',';
					}
					console.info(url);
					if (localStorage.url == url) {
						//$('#qtgxyp_ifram').removeAttr('src');
						$('#qtgxyp_ifram').prop('src', 'http://yp.hsga.nn:8055/core.html?username=014591#!scopa/graph/key/');

					}
					setTimeout('$("#qtgxyp_ifram").prop("src", \'' + url + '\')', '1000')
					// $('#qtgxyp_ifram').prop('src', url);
					localStorage.url = url;
				}
			},
		});

	},
	load: function() {
		app.qtdwfx.qtgzypSearch.load = 'true';

	},
	pagination: function(data) {
		BootstrapPagination(
			$("#qtgl_qtyp_pagination"), {
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
					app.qtdwfx.qtgzypSearch.initSearchForm(pageIndex + 1, pageSize, app.qtdwfx.qtgzypSearch.pagination);
				},
			});
	},

};
