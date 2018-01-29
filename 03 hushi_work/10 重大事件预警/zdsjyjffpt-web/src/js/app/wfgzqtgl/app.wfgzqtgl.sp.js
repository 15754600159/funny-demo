app.wfgzqtgl.sp = {
	pageno: 1,
	inputId:null,
	init: function() {
		app.time.init();
		app.wfgzqtgl.sp.initSearchForm(0, 1, app.wfgzqtgl.sp.pagination);
		this.initForm();
	},
	all: function() {
		app.wfgzqtgl.sp.initSearchForm(0, 1, app.wfgzqtgl.sp.pagination);
	},
	sp: function(zdqtbh) {
		layer.confirm('是否审批通过？', {
			btn: ['是', '否'],
			title: '审批'
		}, function(index) {
			app.loading.show();
			app.api.wfgzqtgl.sp({
				data: {
					spzt: '02',
					zdqtbh: zdqtbh,
				},
				success: function(result) {
					console.info(result);
					app.loading.hide();
					app.wfgzqtgl.sp.initSearchForm(1, 10, app.wfgzqtgl.sp.pagination);
				}
			});
			layer.close(index);
		}, function(index) {
			app.api.wfgzqtgl.sp({
				data: {
					spzt: '03',
					zdqtbh: zdqtbh,
				},
				success: function(result) {
					console.info(result);
					app.wfgzqtgl.sp.initSearchForm(0, 10, app.wfgzqtgl.sp.pagination);
				}
			});
			layer.close(index);
		});
	},
	initSearchForm: function(pageIndex, pageSize, pagination) {
		var startDate = $('#sqsjq').val();
		var endDate = $('#sqsjz').val();
		if (app.time.jiaoyan(startDate, endDate) > 0) {
			return;
		}
		var cjrxm = $("#xm").val();
		var spzt = $("#spzt").val();
		var qtlb = $("#sp-qtlb").attr("code");
		app.loading.show();
		app.api.wfgzqtgl.view({
			data: {
				pageNo: app.wfgzqtgl.sp.pageno,
				pageSize: 10,
				startDate: startDate,
				endDate: endDate,
				qtlb: qtlb,
				spzt: spzt,
				cjrxm: cjrxm
			},
			success: function(result) {
				console.info(result);
				$(".table_all").html('');
				var data = result.msg.result;
				for (var i = 0; i < data.length; i++) {
					$(".table_all").append(
						"<tr>" +
						"<td>" + app.data(data[i].clsj) + '</td>' +
						"<td>" + app.data(data[i].cjrxm) + "</td>" +
						"<td>" + app.data(data[i].qtmc) + "</td>" +
						"<td>" + app.data(app.sp(data[i].spzt)) + "</td>" +
						"<td>" + app.data(data[i].qtgm) + "</td>" +
						`<td class="operate">
							<span class="glyphicon glyphicon-ok-circle" onclick="app.wfgzqtgl.sp.sp('${data[i].zdqtbh}', 'xg')" aria-hidden="true" data-toggle="tooltip" data-placement="bottom" title="审批"></span>
						</td>`+
						"</tr >"
					);
				}
				app.loading.hide();
				app.qbxsfx.initTooltip(); // 初始化表格最后一列操作文字的提示
				app.wfgzqtgl.sp.pagination && app.wfgzqtgl.sp.pagination(result);
			}
		});
	},
	pagination: function(data) {
		BootstrapPagination(
			$("#paginationsps"), {
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
					app.wfgzqtgl.sp.pageno = pageIndex + 1;
					app.wfgzqtgl.sp.initSearchForm(pageIndex + 1, pageSize, app.wfgzqtgl.sp.pagination);
				},
			});
	},
	showMenu: function(id) {
		app.wfgzqtgl.sp.inputId = id;
		console.info(app.wfgzqtgl.sp.inputId);
		var cityObj = $("#" + app.wfgzqtgl.sp.inputId);
		var cityOffset = $("#" + app.wfgzqtgl.sp.inputId).offset();
		$("#" + app.wfgzqtgl.sp.inputId + "Content").css({
			left: cityOffset.left - 165 + "px",
			top: cityOffset.top - 30  + "px"
		}).slideDown("fast");
		$("body").bind("mousedown", app.wfgzqtgl.sp.onBodyDown);
	},
	hideMenu: function() {
		$("#" + app.wfgzqtgl.sp.inputId + "Content").fadeOut("fast");
		$("body").unbind("mousedown", app.wfgzqtgl.sp.onBodyDown);
	},
	onBodyDown: function() {
		if (!( $(event.target).parents("#" + app.wfgzqtgl.sp.inputId + "Content").length > 0||event.target.id=="wggzqt-qtlbContent")) {
			app.wfgzqtgl.sp.hideMenu();
		}
	},
	initForm: function(ww) {
		var setting3 = {
			view: {
				dblClickExpand: false // 屏蔽掉双击事件
			},
			data: {
				simpleData: { 
					enable: true
				}
			},
			callback: {
				onCheck: zTreeOnCheck1
			},
			check: {  
                enable: true,  
                chkStyle: "checkbox",  
                chkboxType: { "Y": "s", "N": "ps" }  
            }
		};
		function zTreeOnCheck1  (event, treeId, treeNode) {
			const sslbTreeDom = $(event.currentTarget),
				treeObj = $.fn.zTree.getZTreeObj(treeId),
				nodes = treeObj.getCheckedNodes(true),
				names = [],
				codes = [];
			for (let elem of nodes) {
				names.push(elem.name);
				codes.push(elem.id);
			}
			console.info(names)
			$('#sp-qtlb').val(names.join(','));
			$('#sp-qtlb').attr("code",codes.join(','));
		};

		var qtlb= [];
		$.ajax({
			type: "get",
			url: app.api.url+"/qtlb/list",
			dataType: "json",
			success: function (response) {
				var data = response;
				for (var h = 0; h < data.length; h++) {
					var lb = {
						id: data[h].qtlb,
						pId: data[h].qtlbp,
						name: data[h].qtlbmc
					};
					qtlb.push(lb);
				};
				$.fn.zTree.init($("#sp-qtlbUl"), setting3, qtlb);
			}
		});
	},

}
