app.zxrygl.sp ={
	pageno:1,
	inputId:null,
    init:function(){
        app.time.init();
		app.zxrygl.sp.initSearchForm(0, 1, app.zxrygl.sp.pagination);
		this.initForm();
    },
    initSearchForm: function(pageIndex, pageSize, pagination) {
		var startDate = $('#sqtart').val();
		var endDate = $('#sqiend').val();
		if (app.time.jiaoyan(startDate, endDate) > 0) {
			return;
		}
		var ssryfl = $("#ry-type").val();
		var cjdw = $("#cjdw").attr("code");
		var xm = $("#rygl-xm").val();
		var sfzh = $("#rygl-sfzh").val();
		var yxx = $("#yxx").val();
		var spzt = $("#sp-type").val();
		var jjffbkbs = $("#jjffbkbs").val();
		app.loading.show();
		app.api.zxrygl.view({ 
			data: {
				pageNo: app.zxrygl.sp.pageno,
				pageSize: 10,
				startDate: startDate,
				endDate: endDate,
				xm: xm,
				sfzh: sfzh,
				yxx: yxx,
				ssryfl: ssryfl,
				cjdw: cjdw,
				spzt: spzt,
			},
			success: function(result) {
				app.loading.hide();
				var data = result.msg.result;
				console.info(data);
				$(".table_all").html('');
				for (var i = 0; i < data.length; i++) {
					$(".table_all").append(
						"<tr>" +
						"<td>" + app.data(data[i].xm) + '</td>' +
						"<td>" + app.data(data[i].sfzh) + "</td>" +
						"<td>" + app.data(data[i].hjdqh) + "</td>" +
						"<td>" + app.data(data[i].hjdxz) + "</td>" +
						"<td>" + app.data(data[i].cjrxm) + "</td>" +
						"<td>" + app.data(data[i].lrsj) + "</td>" +
						"<td>" + app.data(app.sp(data[i].spzt)) + "</td>" +
						"<td>" + app.data(data[i].csrq) + "</td>" +
						"<td>" + app.data(data[i].yxx) + "</td>" +
						"<td>" + app.data(data[i].ssryfl) + "</td>" +
						`<td class="operate">
							<span class="glyphicon glyphicon-ok-circle" onclick="app.zxrygl.sp.sp('${data[i].ssryid}')" aria-hidden="true" data-toggle="tooltip" data-placement="bottom" title="审批"></span>
						</td>`+
						"</tr >"
					);
				}
				app.zxrygl.sp.pagination && app.zxrygl.sp.pagination(result);
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
			$("#paginationspry"), {
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
					app.zxrygl.sp.pageno = pageIndex + 1;
					app.zxrygl.sp.initSearchForm(pageIndex + 1, pageSize, app.zxrygl.sp.pagination);
				},
			});
    },
    sp: function(zdqtbh) {
		layer.confirm('是否审批通过？', {
			btn: ['是', '否'],
			title: '审批'
		}, function(index) {
			app.loading.show();
			app.api.zxrygl.sp({
				data: {
					spzt: '02',
					id: zdqtbh,
				},
				success: function(result) {
					console.info(result);
					app.loading.hide();
					app.zxrygl.sp.initSearchForm(1, 10, app.zxrygl.sp.pagination);
				}
			});
			layer.close(index);
		}, function(index) {
			app.api.zxrygl.sp({
				data: {
					spzt: '03',
					id: zdqtbh,
				},
				success: function(result) {
					console.info(result);
					app.zxrygl.sp.initSearchForm(0, 10, app.zxrygl.sp.pagination);
				}
			});
			layer.close(index);
		});
    },
    all:function(){
        app.zxrygl.sp.initSearchForm(0, 1, app.zxrygl.sp.pagination);
	},
	showMenu: function(id) {
		app.zxrygl.sp.inputId = id;
		console.info(app.zxrygl.sp.inputId);
		var cityObj = $("#" + app.zxrygl.sp.inputId);
		var cityOffset = $("#" + app.zxrygl.sp.inputId).offset();
		$("#" + app.zxrygl.sp.inputId + "Content").css({
			left: cityOffset.left - 165 + "px",
			top: cityOffset.top - 20  + "px"
		}).slideDown("fast");
		$("body").bind("mousedown", app.zxrygl.sp.onBodyDown);
	},
	hideMenu: function() {
		$("#" + app.zxrygl.sp.inputId + "Content").fadeOut("fast");
		$("body").unbind("mousedown", app.zxrygl.sp.onBodyDown);
	},
	onBodyDown: function() {
		if (!( event.target.id == app.zxrygl.sp.inputId+"Content" || $(event.target).parents("#" + app.zxrygl.sp.inputId + "Content").length >0 )) {
			app.zxrygl.sp.hideMenu();
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
				$.fn.zTree.init($("#cjdwspUl"), setting, dwdmNodes); // 单位树已经种好了
			}
		});
	},  
}