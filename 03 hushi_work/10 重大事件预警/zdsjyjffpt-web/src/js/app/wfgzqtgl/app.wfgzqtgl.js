app.wfgzqtgl = {
	pageno: 1,
	inputId:null,
	init: function() {
		// $("#wggzqt-caijishijianstart").val(app.time.last());
		// $('#wggzqt-caijishijianzhi').val(app.time.now());
		app.time.init();
		app.wfgzqtgl.initSearchForm(0, 1, app.wfgzqtgl.pagination);
		this.initForm();
	},
	all:function(){
		app.wfgzqtgl.initSearchForm(0, 1, app.wfgzqtgl.pagination);
	},
	reset:function(){
		$('#wggzqt-caijishijianstart').val("");
		$('#wggzqt-caijishijianzhi').val("");
		$("#wggzqt-qtlb").val("");
		$("#wggzqt-qtmc").val("");
	},
	initSearchForm: function(pageIndex, pageSize, pagination) {
		var startDate = $('#wggzqt-caijishijianstart').val();
		var endDate = $('#wggzqt-caijishijianzhi').val();
		if (app.time.jiaoyan(startDate, endDate) > 0) {
			return;
		} 
		var startDate = $("#wggzqt-caijishijianstart").val();
		var endDate = $("#wggzqt-caijishijianzhi").val();
		var qtlb = $("#wggzqt-qtlb").attr("code");
		var qtmc = $("#wggzqt-qtmc").val();
		app.loading.show();
		app.api.wfgzqtgl.view({
			data: {
				pageNo: app.wfgzqtgl.pageno,
				pageSize: 10,
				startDate: startDate,
				endDate: endDate,
				qtlb: qtlb,
				qtmc:qtmc
			},
			success: function(result) {
				console.info(result);
				$(".table_all").html('');
				var data = result.msg.result;
				for (var i = 0; i < data.length; i++) {
					$(".table_all").append(
						"<tr>" +
						"<td class='checks'>" + '<label class="check"><input type="checkbox" name="r2" value="' + data[i].zdqtbh +
						'"><span></span></label>' + "</td>" +
						"<td>" + app.data(data[i].qtmc) + '</td>' +
						"<td>" + app.data(data[i].qtlb) + "</td>" +
						"<td>" + app.data(data[i].qtgm) + "</td>" +
						"<td>" + "群体积分" + "</td>" +
						"<td>" + app.data(app.sp(data[i].spzt)) + "</td>" +
						`<td class="operate">
							<span class="glyphicon glyphicon-list-alt" onclick="app.wfgzqtgl.add.open('${data[i].zdqtbh}', 'chakan')" aria-hidden="true" data-toggle="tooltip" data-placement="bottom" title="查看"></span>
							<span class="glyphicon glyphicon-user" onclick="app.wfgzqtgl.add.viewWindow('${data[i].zdqtbh}')" aria-hidden="true" data-toggle="tooltip" data-placement="bottom" title="查看成员"></span>
							<span class="glyphicon glyphicon-pencil" onclick="app.zxrygl.add.view('${data[i].ssryid}', 'xg')" aria-hidden="true" data-toggle="tooltip" data-placement="bottom" title="修改"></span>
						</td>`+
						"</tr >"
					);
				}
				app.loading.hide();
				app.wfgzqtgl.check();
				app.qbxsfx.initTooltip(); // 初始化表格最后一列操作文字的提示
				app.wfgzqtgl.pagination && app.wfgzqtgl.pagination(result);
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
			$("#paginationjc"), {
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
					app.wfgzqtgl.pageno = pageIndex + 1;
					app.wfgzqtgl.initSearchForm(pageIndex + 1, pageSize, app.wfgzqtgl.pagination);
				},
			});
	},
	showMenu: function(id) {
		app.wfgzqtgl.inputId = id;
		console.info(app.wfgzqtgl.inputId);
		var cityObj = $("#" + app.wfgzqtgl.inputId);
		var cityOffset = $("#" + app.wfgzqtgl.inputId).offset();
		$("#" + app.wfgzqtgl.inputId + "Content").css({
			left: cityOffset.left - 165 + "px",
			top: cityOffset.top - 40  + "px"
		}).slideDown("fast");
		$("body").bind("mousedown", app.wfgzqtgl.onBodyDown);
	},
	hideMenu: function() {
		$("#" + app.wfgzqtgl.inputId + "Content").fadeOut("fast");
		$("body").unbind("mousedown", app.wfgzqtgl.onBodyDown);
	},
	onBodyDown: function() {
		if (!( $(event.target).parents("#" + app.wfgzqtgl.inputId + "Content").length > 0||event.target.id=="wggzqt-qtlbContent")) {
			app.wfgzqtgl.hideMenu();
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
			$('#wggzqt-qtlb').val(names.join(','));
			$('#wggzqt-qtlb').attr("code",codes.join(','));
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
				$.fn.zTree.init($("#wggzqt-qtlbUl"), setting3, qtlb);
			}
		});
	},
}
