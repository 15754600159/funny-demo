app.wfgzqtgl.add = {
	url: 'pages/ssqtjc/addWindow.html',
	zt: null,
	id: null,
	viewUrl: 'pages/ssqtjc/viewWindow.html',
	viewUrlcy: 'pages/ssqtjc/addcy.html',
	pageno: 0,
	open: function(ids, zt) {
		app.wfgzqtgl.add.zt = zt;
		app.wfgzqtgl.add.id = ids;
		$m.page.openPage(app.wfgzqtgl.add.url, 'fade', 'container-wrapper');
	},
	close: function() {
		app.wfgzqtgl.add.clear();
		$m.page.closePage(app.wfgzqtgl.add.url, 'fade', 'container-wrapper');
	},
	viewclose: function() {
		app.wfgzqtgl.add.clear();
		$m.page.closePage(app.wfgzqtgl.add.viewUrl, 'fade', 'container-wrapper');
	},
	cyclose: function() {
		$m.page.closePage(app.wfgzqtgl.add.viewUrlcy, 'fade', 'container-wrapper');
	},
	clear: function() {
		app.wfgzqtgl.add.zt = null;
		app.wfgzqtgl.add.id = null;
	},
	init: function() {
		$('#window-wfgzqtgl-addWindow').addClass('popIn');
		$('#window-wfgzqtgl-addWindow .btn-window-close').on('click', function() {
			$('#window-wfgzqtgl-addWindow').addClass('popOut');
			app.wfgzqtgl.add.close();
		});
		$('#btn-ok-person-excel').on('click', function() {
			if (app.wfgzqtgl.add.zt == 'xg') {
				$("#wfgzqt").html("涉事群体修改");
				app.wfgzqtgl.add.put();
			} else {
				app.wfgzqtgl.add.updata();
			}
		});
		if (app.wfgzqtgl.add.zt == 'chakan') {
			var inp = $('.h-box').find('input');
			var sel = $('.h-box').find('select');
			$(inp).attr("readonly", "readonly");
			$(inp).attr("disabled", "disabled");
			$(sel).attr('disabled', "disabled");
			$("#wfgzqt-footer").css("display", "none");
			$("#wfgzqt").html("涉事群体查看");
			app.wfgzqtgl.add.initForm();
		}
		if (app.wfgzqtgl.add.zt == 'xg') {
			app.wfgzqtgl.add.initForm();
		}
		app.time.init();
	},
	viewinit: function() {
		$('#window-wfgzqtgl-addWindow').addClass('popIn');
		$('#window-wfgzqtgl-addWindow .btn-window-close').on('click', function() {
			$('#window-wfgzqtgl-addWindow').addClass('popOut');
			app.wfgzqtgl.add.viewclose();
		});
		app.wfgzqtgl.add.viewinitForm(0, 1, app.wfgzqtgl.add.pagination);
	},
	initcy: function() {
		$('#window-wfgzqtgl-addWindow-cy').addClass('popIn');
		$('#window-wfgzqtgl-addWindow-cy .btn-window-close').on('click', function() {
			$('#window-wfgzqtgl-addWindow-cy').addClass('popOut');
			app.wfgzqtgl.add.cyclose();

		});
		$('#btn-ok-person-excel-cy').on('click', function() {
			app.loading.show();
			app.wfgzqtgl.add.viewFromCy();
			app.wfgzqtgl.add.cyclose();
		});
		// app.wfgzqtgl.add.viewinitForm(0, 1, app.wfgzqtgl.add.pagination);
	},
	viewFromCy: function() {
		var cylb = $(".cylb").val();
		var sfzh = $(".sfzh").val();
		var xm = $(".xm").val();
		app.api.wfgzqtgl.viewcyform({
			data: {
				zdqtbh: app.wfgzqtgl.add.id,
				cylb: cylb,
				xm: xm,
				sfzh: sfzh
			},
			success: function(result) {
				console.info(result);
				app.loading.hide();
				app.wfgzqtgl.add.cyclose();
			}
		});
	},
	viewinitForm: function(pageIndex, pageSize, pagination) {
		app.loading.show();
		app.api.wfgzqtgl.viewcy({
			data: {
				pageNo: app.wfgzqtgl.add.pageno,
				pageSize: 10,
				zdqtbh: app.wfgzqtgl.add.id,
			},
			success: function(result) {
				console.info(result);
				$(".table_alls").html('');
				var data = result.msg.result;
				for (var i = 0; i < data.length; i++) {
					$(".table_alls").append(
						"<tr>" +
						"<td class='checkss'>" + '<label class="check"><input type="checkbox" name="r2" value="' + data[i].id +
						'"><span></span></label>' + "</td>" +
						"<td>" + app.data(data[i].zdqtbh) + '</td>' +
						"<td>" + app.data(data[i].cylb) + "</td>" +
						"<td>" + app.data(data[i].sfzh) + "</td>" +
						"<td>" + app.data(data[i].xm) + "</td>" +
						"<td>" + app.data(data[i].sccjsj) + "</td>" +
						`<td class="operate">
							<span class="glyphicon glyphicon-pencil" onclick="app.wfgzqtgl.add.open(${data[i].id}, 'xg')" aria-hidden="true" data-toggle="tooltip" data-placement="bottom" title="修改"></span>
						</td>` +
						"</tr >"
					);
				}
				app.loading.hide();
				app.wfgzqtgl.add.checks();
				app.wfgzqtgl.add.pagination && app.wfgzqtgl.add.pagination(result);
			}
		});
	},
	checks: function() {
		$("#Checkalls").on('click', function() {
			var checkif = $('#Checkalls').prop('checked');
			console.info(checkif);
			if (checkif) {
				$(".checkss").find("input[type='checkbox']").prop("checked", true);
			} else {
				$(".checkss").find("input[type='checkbox']").prop("checked", false);
			}
		});
		var a = $(".table_alls input[type='checkbox']");
		$(a).on('click', function() {
			var checkif = $(this).prop('checked');
			console.info(checkif);
			if (checkif == false) {
				$('#Checkalls').prop('checked', false);
			}
		});
	},
	pagination: function(data) {
		BootstrapPagination(
			$("#paginations"), {
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
					app.wfgzqtgl.add.pageno = pageIndex + 1;
					app.wfgzqtgl.add.viewinitForm(pageIndex + 1, pageSize, app.wfgzqtgl.add.pagination);
				},
			});
	},
	initForm: function() {
		var qtbh = app.wfgzqtgl.add.id;
		app.api.wfgzqtgl.views({
			data: {
				types: qtbh
			},
			success: function(result) {
				console.info(result);
				var data = result.msg;
				$(".qtmc").val(data.qtmc);
				$("#clsj").val(data.clsj);
				$(".qtlb").val(data.qtlb);
				$(".cjdwdm").val(data.cjdwdm);
				$(".cjdwmc").val(data.cjdwmc);
				$(".cjrxm").val(data.cjrxm);
				$(".cjrlxfs").val(data.cjrlxfs);
				$(".qtgm").val(data.qtgm);
				$(".zysq").val(data.zysq);
				$(".csyy").val(data.csyy);
				$(".xcgc").val(data.xcgc);
				$(".zzjg").val(data.zzjg);
				$(".wkcs").val(data.wkcs);
				$(".zyhd").val(data.zyhd);

				// app.wfgzqtgl.initSearchForm(0, 1, app.wfgzqtgl.pagination);
				// app.wfgzqtgl.add.close();
				// app.zxrygl.add.viewclose();
			}
		});

	},
	updata: function() {
		var qtmc = $(".qtmc").val();
		var clsj = $("#clsj").val();
		var qtlb = $(".qtlb").val();
		var cjdwdm = $(".cjdwdm").val();
		var cjdwmc = $(".cjdwmc").val();
		var cjrxm = $(".cjrxm").val();
		var cjrlxfs = $(".cjrlxfs").val();
		var qtgm = $(".qtgm").val();
		var zysq = $(".zysq").val();
		var csyy = $(".csyy").val();
		var xcgc = $(".xcgc").val();
		var zzjg = $(".zzjg").val();
		var wkcs = $(".wkcs").val();
		var zyhd = $(".zyhd").val();
		app.api.wfgzqtgl.updata({
			data: {
				qtmc: qtmc,
				clsj: clsj,
				qtlb: qtlb,
				cjdwdm: cjdwdm,
				cjdwmc: cjdwmc,
				cjrxm: cjrxm,
				cjrlxfs: cjrlxfs,
				qtgm: qtgm,
				zysq: zysq,
				csyy: csyy,
				xcgc: xcgc,
				zzjg: zzjg,
				wkcs: wkcs,
				zyhd: zyhd
			},
			success: function(result) {
				console.info(result);
				app.wfgzqtgl.initSearchForm(0, 1, app.wfgzqtgl.pagination);
				app.wfgzqtgl.add.close();
				// app.zxrygl.add.viewclose();
			}
		});
	},
	put: function() {
		var zdqtbh = app.wfgzqtgl.add.id;
		var qtmc = $(".qtmc").val();
		var clsj = $("#clsj").val();
		var qtlb = $(".qtlb").val();
		var cjdwdm = $(".cjdwdm").val();
		var cjdwmc = $(".cjdwmc").val();
		var cjrxm = $(".cjrxm").val();
		var cjrlxfs = $(".cjrlxfs").val();
		var qtgm = $(".qtgm").val();
		var zysq = $(".zysq").val();
		var csyy = $(".csyy").val();
		var xcgc = $(".xcgc").val();
		var zzjg = $(".zzjg").val();
		var wkcs = $(".wkcs").val();
		var zyhd = $(".zyhd").val();
		app.api.wfgzqtgl.put({
			data: {
				zdqtbh: zdqtbh,
				qtmc: qtmc,
				clsj: clsj,
				qtlb: qtlb,
				cjdwdm: cjdwdm,
				cjdwmc: cjdwmc,
				cjrxm: cjrxm,
				cjrlxfs: cjrlxfs,
				qtgm: qtgm,
				zysq: zysq,
				csyy: csyy,
				xcgc: xcgc,
				zzjg: zzjg,
				wkcs: wkcs,
				zyhd: zyhd
			},
			success: function(result) {
				console.info(result);
				app.wfgzqtgl.initSearchForm(0, 1, app.wfgzqtgl.pagination);
				app.wfgzqtgl.add.close();
				// app.zxrygl.add.viewclose();
			}
		});
	},
	del: function() {
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
			}, function(index) {
				idss = ids.join();
				console.info(typeof(idss))
				app.api.wfgzqtgl.delete({
					data: {
						ids: idss
					},
					success: function(result) {
						console.info(result);
						app.wfgzqtgl.initSearchForm(0, 1, app.wfgzqtgl.pagination);
					}
				});
				layer.close(index);
			});
		}

	},
	delcy: function() {
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
			}, function(index) {
				idss = ids.join();
				console.info(typeof(idss))
				app.api.wfgzqtgl.deletecy({
					data: {
						ids: idss
					},
					success: function(result) {
						console.info(result);
						app.wfgzqtgl.add.viewinitForm(0, 1, app.wfgzqtgl.add.pagination);
					}
				});
				layer.close(index);
			});
		}

	},
	viewWindow: function(id) {
		app.wfgzqtgl.add.id = id;
		console.info(app.wfgzqtgl.add.id)
		$m.page.openPage(app.wfgzqtgl.add.viewUrl, 'fade', 'container-wrapper');
	},
	viewWindowcy: function(id) {
		console.info(app.wfgzqtgl.add.id)
		$m.page.openPage(app.wfgzqtgl.add.viewUrlcy, 'fade', 'container-wrapper');
	},
}
