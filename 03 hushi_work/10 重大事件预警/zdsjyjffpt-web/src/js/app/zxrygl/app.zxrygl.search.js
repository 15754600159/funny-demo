app.zxrygl.search = {
	pageno: 1,
	inputId:null,
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
		app.time.init();
		app.zxrygl.search.initSearchForm(0, 1, app.zxrygl.search.pagination);
		this.initForm();
	},
	all: function() {
		app.zxrygl.search.initSearchForm(0, 1, app.zxrygl.search.pagination);
	},
	reset: function() {
		$("#caistart").val('');
		$('#caiend').val('');
		$('#rygl-xm').val('');
		$("#rygl-sfzh").val('');
		$('#rygl-name').val('');
		$('#rygl-sfzh').val('');
		$('#rygl-type').val('');
		$("#cjdw").attr('code','');
		$("#cjdw").val('');
		$("#jjffbkbs").val('');
		$('#yxx').val('');
		$("#shengpizhuangtai").val('');
		$('#ssryfl').val("");
	},
	refresh: function() {
		app.zxrygl.search.reset();
		app.zxrygl.search.initSearchForm(0, 1, app.zxrygl.search.pagination);
	},
	initSearchForm: function(pageIndex, pageSize, pagination) {
		var startDate = $('#caistart').val();
		var endDate = $('#caiend').val();
		if (app.time.jiaoyan(startDate, endDate) > 0) {
			return;
		}
		var ssryfl = $("#ssryfl").val();
		var cjdw = $("#cjdw").attr("code");
		var xm = $("#rygl-xm").val();
		var sfzh = $("#rygl-sfzh").val();
		var yxx = $("#yxx").val();
		var spzt = $("#shengpizhuangtai").val();
		var jjffbkbs = $("#jjffbkbs").val();
		app.loading.show();
		app.api.zxrygl.view({
			data: {
				pageNo: app.zxrygl.search.pageno,
				pageSize: 10,
				startDate: startDate,
				endDate: endDate,
				xm: xm,
				sfzh: sfzh,
				yxx: yxx,
				ssryfl: ssryfl,
				cjdw: cjdw,
				spzt: spzt,
				jjffbkbs: jjffbkbs
			},
			success: function(result) {
				app.loading.hide();
				var data = result.msg.result;
				console.info(data);
				$(".table_all").html('');
				for (var i = 0; i < data.length; i++) {
					$(".table_all").append(
						"<tr>" +
						"<td class='checks'>" + '<label class="check"><input type="checkbox" name="r2" value="' + data[i].ssryid +
						'"><span></span></label>' + "</td>" +
						"<td>" + app.data(data[i].xm) + '</td>' +
						"<td>" + app.data(data[i].sfzh) + "</td>" +
						"<td>" + app.data(data[i].hjdqh) + "</td>" +
						"<td>" + app.data(data[i].hjdxz) + "</td>" +
						"<td>" + app.data(data[i].cjrxm) + "</td>" +
						"<td>" + app.data(app.date.formatDateTime(data[i].lrsj)) + "</td>" +
						"<td>" + app.data(data[i].gkdw) + "</td>" +
						"<td>" + app.data(data[i].yxx == '01'?'有效':'无效') + "</td>" +
						"<td>" + app.data(data[i].ssryfl) + "</td>" + 
						"<td>" + app.data(app.sp(data[i].spzt)) + "</td>" +
						`<td class="operate">
							<span class="glyphicon glyphicon-list-alt" onclick="app.zxrygl.add.view('${data[i].ssryid}')" aria-hidden="true" data-toggle="tooltip" data-placement="bottom" title="查看"></span>
							<span class="glyphicon glyphicon-pencil" onclick="app.zxrygl.add.view('${data[i].ssryid}', 'ss')" aria-hidden="true" data-toggle="tooltip" data-placement="bottom" title="修改"></span>
						</td>`+
						"</tr >"
					);
				}
				app.qbxsfx.initTooltip(); // 初始化表格最后一列操作文字的提示
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
	},
	showMenu: function(id) {
		app.zxrygl.search.inputId = id;
		console.info(app.zxrygl.search.inputId);
		var cityObj = $("#" + app.zxrygl.search.inputId);
		var cityOffset = $("#" + app.zxrygl.search.inputId).offset();
		$("#" + app.zxrygl.search.inputId + "Content").css({
			left: cityOffset.left - 165 + "px",
			top: cityOffset.top - 20  + "px"
		}).slideDown("fast");
		$("body").bind("mousedown", app.zxrygl.search.onBodyDown);
	},
	hideMenu: function() {
		$("#" + app.zxrygl.search.inputId + "Content").fadeOut("fast");
		$("body").unbind("mousedown", app.zxrygl.search.onBodyDown);
	},
	onBodyDown: function() {
		if (!( $(event.target).parents("#" + app.zxrygl.search.inputId + "Content").length > 0||event.target.id=="wggzqt-qtlbContent")) {
			app.zxrygl.search.hideMenu();
		}
	}, 
	initForm: function(ww) {
		var setting = {
			view: {
				dblClickExpand: false // 屏蔽掉双击事件
			},
			data: {
				simpleData: {
					enable: true
				}
			},
			callback: {
				onClick: onClick
			}
		};
		
		var data = 'tb_d_zdryxl,qg_xzqh_tree,tb_d_zjlx,dwdm_tree,nation,sex';

		function onClick(e, treeId, treeNode) {
			var zTree = $.fn.zTree.getZTreeObj(treeId),
				nodes = zTree.getSelectedNodes(),
				v = "",
				code = "";
			nodes.sort(function compare(a, b) {
				return a.id - b.id;
			})
			if (treeId == 'citySelUl') {
				for (var i = 0, l = nodes.length; i < l; i++) {
					v += nodes[i].name + ",";
					code += nodes[i].id + ",";
				}
			} else {
				for (var i = 0, l = nodes.length; i < l; i++) {
					v += nodes[i].name + ",";
					code += nodes[i].id + ",";
				}
			}
			console.log(code);
			var cityObj = $("#" + app.zxrygl.search.inputId);
			console.log(cityObj);
			if (v.length > 0) v = v.substring(0, v.length - 1);
			cityObj.val(v);
			if (treeId == 'citySelUl') {
				$("#ucodeName").val(v);
			}
			if (code.length > 0) code = code.substring(0, code.length - 1);
			cityObj.attr("code", code);
		}
		var dwdmNodes = [];
		$.ajax({
			type: "get",
			url: app.api.url+"/localperson/info/getDwdmList",
			dataType: "json",
			success: function (response) {
				for (var h = 0; h < data.length; h++) {
					var hs = {
						id: response[h].code,
						pId: response[h].pid,
						name: response[h].name
					};
					dwdmNodes.push(hs);
				}
				$.fn.zTree.init($("#cjdwUl"), setting, dwdmNodes); // 单位树已经种好了
			}
		});
	},
};
