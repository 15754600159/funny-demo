app.zxrygl.add = {
	url: 'pages/zxrygl/addWindow.html',
	views: 'pages/zxrygl/viewWindow.html',
	callback: null,
	vehicles: null,
	inputId: null,
	viewsId: null,
	ss: null,
	open: function() {
		$m.page.openPage(app.zxrygl.add.url, 'fade', 'container-wrapper');
	},
	view: function(id, ss) {
		app.zxrygl.add.viewsId = id;
		app.zxrygl.add.ss = ss;
		$m.page.openPage(app.zxrygl.add.views, 'fade', 'container-wrapper');
	},
	close: function() {
		app.zxrygl.add.clear();
		$m.page.closePage(app.zxrygl.add.url, 'fade', 'container-wrapper');
	},
	viewclose: function() {
		app.zxrygl.add.clear();
		$m.page.closePage(app.zxrygl.add.views, 'fade', 'container-wrapper');
	},
	init: function() {
		$('#window-zxrygl-addWindow').addClass('popIn');
		$('#window-zxrygl-addWindow .btn-window-close').on('click', function() {
			$('#window-zxrygl-addWindow').addClass('popOut');
			app.zxrygl.add.close();
		});
		$('#btn-ok-person-excel').on('click', function() {
			app.zxrygl.add.updata();
		});
		app.zxrygl.add.initForm();
		app.time.init();
	},
	viewinit: function() {
		$('#window-zxrygl-addWindows').addClass('popIn');
		$('#window-zxrygl-addWindows .btn-window-close').on('click', function() {
			$('#window-zxrygl-addWindows').addClass('popOut');
			app.zxrygl.add.viewclose();
		});
		$('#btn-ok-person-excel').on('click', function() {
			app.zxrygl.add.putdata();
		});
		app.zxrygl.add.viewForm();
	},
	viewForm: function() {
		var id = app.zxrygl.add.viewsId;
		app.api.zxrygl.ids({
			data: {
				types: id
			},
			success: function(result) {
				console.info(result);
				var data = result.msg;

				$('.xm').val(app.data(data.xm));
				$('.bmch').val(app.data(data.bmch));
				$('.xb').append('<option selected="selected">' + data.xb + '</option>');
				$('#birday').val(app.data(data.csrq));
				$('.sfzh').val(app.data(data.sfzh));
				$('#user-add-nationCode').append('<option selected="selected">' + data.mz + '</option>');
				$('#user-add-politicsStatus').append('<option selected="selected">' + data.rylb + '</option>');
				$('.lkyy').val(app.data(data.lkyy));
				$('.lxfs').val(app.data(data.lxfs));
				$('.jtfs').val(app.data(data.jtfs));
				$('#citySel').val(app.data(data.hjdqh));
				$('#jzdSel').val(app.data(data.jzdqh));
				$('.jzdxz').val(app.data(data.jzdxz));
				$('.hjdxz').val(app.data(data.hjdxz));
				$('.hjdpcs').val(app.data(data.hjdpcs));
				$('.jzdpcs').val(app.data(data.jzdpcs));
				$('.zjlx').append('<option selected="selected">' + data.zjlx + '</option>');
				$('.zjhm').val(app.data(data.zjhm));
				$('.gongxiang').val(app.data(data.sfgx));
				$('.guiji').val(app.data(data.sfhqqggj));
				$('.caiji').val(app.data(data.cjry));
				$('.caijiph').val(app.data(data.cjrlxfs));
				$('#cjdwcode').val(app.data(data.cjdw));
				$('#cjsj').val(app.data(data.cjsj));
				$('#cjsj').attr('value', '' + app.data(data.cjsj) + '');
				if (app.zxrygl.add.ss) {
					$(".ss").css('display', 'block');
					var inp = $('.h-box').find('input');
					var sel = $('.h-box').find('select');
					$(inp).removeAttr('readonly');
					$(sel).removeAttr('disabled');
					$('#newpop').html('修改人员信息')
					app.zxrygl.add.initForm();
					app.time.init();
				}
			}
		});
	},
	clear: function() {
		app.zxrygl.add.callback = null;
		app.zxrygl.add.vehicles = null;
		app.zxrygl.add.ss = null;
	},
	showMenu: function(id) {
		app.zxrygl.add.inputId = id;
		console.info(app.zxrygl.add.inputId);
		var cityObj = $("#" + app.zxrygl.add.inputId);
		var cityOffset = $("#" + app.zxrygl.add.inputId).offset();
		$("#" + app.zxrygl.add.inputId + "Content").css({
			left: cityOffset.left + "px",
			top: cityOffset.top + cityObj.outerHeight() + 2 + "px"
		}).slideDown("fast");
		$("body").bind("mousedown", app.zxrygl.add.onBodyDown);
	},
	hideMenu: function() {
		$("#" + app.zxrygl.add.inputId + "Content").fadeOut("fast");
		$("body").unbind("mousedown", app.zxrygl.add.onBodyDown);
	},
	onBodyDown: function() {
		if (!(event.target.id == "menuBtn" || event.target.id == "menuContent" || $(event.target).parents("#" + app.zxrygl.add
			.inputId + "Content").length > 0)) {
			app.zxrygl.add.hideMenu();
		}
	},
	initForm: function() {
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
			console.log(app.zxrygl.add.inputId);
			var cityObj = $("#" + app.zxrygl.add.inputId);
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
		var hjdqhNodes = [];
		app.api.zxrygl.types({
			data: {
				types: data
			},
			success: function(result) {
				console.info(result);
				var data = result.msg.dwdm_tree; // 单位数据
				var nation = result.msg.nation; // 名族数据
				var types = result.msg.tb_d_zdryxl; // 人员类别
				var zjlx = result.msg.tb_d_zjlx; // 人员类别
				var hjdqh = result.msg.qg_xzqh_tree; // 户籍地区划
				var xb = result.msg.sex; // 性别
				for (var i = 0; i < data.length; i++) {
					var n = {
						id: data[i].value,
						pId: data[i].parent,
						name: data[i].label
					};
					dwdmNodes.push(n);
				}
				for (var h = 0; h < data.length; h++) {
					var hs = {
						id: hjdqh[h].value,
						pId: hjdqh[h].parent,
						name: hjdqh[h].label
					};
					hjdqhNodes.push(hs);
				}
				console.info(dwdmNodes);
				$.fn.zTree.init($("#cjdwUl"), setting, dwdmNodes); // 单位树已经种好了
				$.fn.zTree.init($("#citySelUl"), setting, hjdqhNodes); // 户籍地已经种好了
				$.fn.zTree.init($("#jzdSelUl"), setting, hjdqhNodes); // 居住地已经种好了
				for (var j = 0; j < nation.length; j++) {
					$("#user-add-nationCode").append('<option value="' + nation[j].value + '">' + nation[j].label + '</option>');
				} // 民族搞定了
				for (var o = 0; o < types.length; o++) {
					$("#user-add-politicsStatus").append('<option value="' + types[o].value + '">' + types[o].label + '</option>')
				} // 人员类别搞定
				for (var l = 0; l < zjlx.length; l++) {
					$(".zjlx").append('<option value="' + zjlx[l].value + '">' + zjlx[l].label + '</option>')
				} // 证件类别搞定
				for (var s = 0; s < xb.length; s++) {
					$(".xb").append('<option value="' + xb[s].value + '">' + xb[s].label + '</option>')
				} // 性别搞定

			}
		});
	},
	updata: function() {
		// 参数
		var xm = $('.xm').val();
		var bmch = $('.bmch').val();
		var xb = $('.xb').val();
		var csrq = $('#birday').val();
		var sfzh = $('.sfzh').val();
		var mz = $('#user-add-nationCode').val();
		var rylb = $('#user-add-politicsStatus').val();
		var lkyy = $('.lkyy').val();
		var lxfs = $('.lxfs').val();
		var jtfs = $('.jtfs').val();
		var hjdqh = $('#citySel').attr('code');
		var jzdqh = $('#jzdSel').attr('code');
		var hjdxz = $('.hjdxz').val();
		var jzdxz = $('.jzdxz').val();
		var hjdpcs = $('.hjdpcs').val();
		var jzdpcs = $('.jzdpcs').val();
		var zjlx = $('.zjlx').val();
		var zjhm = $('.zjhm').val();
		var sfgx = $('.gongxiang').val();
		var sfhqqggj = $('.guiji').val();
		var cjry = $('.caiji').val();
		var cjrlxfs = $('.caijiph').val();
		var cjdw = $('#cjdwcode').attr('code');
		var cjsj = $('#cjsj').val();
		if (xm == '' || cjsj == '' || sfzh == '') {
			layer.alert('请输入必填项');

		} else {
			app.api.zxrygl.updata({
				data: {
					xm: xm,
					bmch: bmch,
					xb: xb,
					jtfs: jtfs,
					csrq: csrq,
					sfzh: sfzh,
					mz: mz,
					rylb: rylb,
					lkyy: lkyy,
					lxfs: lxfs,
					hjdqh: hjdqh,
					hjdxz: hjdxz,
					jzdqh: jzdqh,
					jzdxz: jzdxz,
					hjdpcs: hjdpcs,
					jzdpcs: jzdpcs,
					zjlx: zjlx,
					sfgx: sfgx,
					zjhm: zjhm,
					sfhqqggj: sfhqqggj,
					cjry: cjry,
					cjrlxfs: cjrlxfs,
					cjdw: cjdw,
					cjsj: cjsj
				},
				success: function(result) {
					console.info(result);
					app.zxrygl.search.initSearchForm(0, 1, app.zxrygl.search.pagination);
					app.zxrygl.add.close();
					app.zxrygl.add.viewclose();
				}
			});
		}
	},
	putdata: function() {
		// 参数
		var id = app.zxrygl.add.viewsId;
		var xm = $('.xm').val();
		var bmch = $('.bmch').val();
		var xb = $('.xb').val();
		var csrq = $('#birday').val();
		var sfzh = $('.sfzh').val();
		var mz = $('#user-add-nationCode').val();
		var rylb = $('#user-add-politicsStatus').val();
		var lkyy = $('.lkyy').val();
		var lxfs = $('.lxfs').val();
		var jtfs = $('.jtfs').val();
		var hjdqh = $('#citySel').attr('code');
		var jzdqh = $('#jzdSel').attr('code');
		var hjdxz = $('.hjdxz').val();
		var jzdxz = $('.jzdxz').val();
		var hjdpcs = $('.hjdpcs').val();
		var jzdpcs = $('.jzdpcs').val();
		var zjlx = $('.zjlx').val();
		var zjhm = $('.zjhm').val();
		var sfgx = $('.gongxiang').val();
		var sfhqqggj = $('.guiji').val();
		var cjry = $('.caiji').val();
		var cjrlxfs = $('.caijiph').val();
		var cjdw = $('#cjdwcode').attr('code');
		var cjsj = $('#cjsj').val();
		if (xm == '' || cjsj == '' || sfzh == '') {
			layer.alert('请输入必填项');

		} else {
			app.api.zxrygl.putdata({
				data: {
					id: id,
					xm: xm,
					bmch: bmch,
					xb: xb,
					jtfs: jtfs,
					csrq: csrq,
					sfzh: sfzh,
					mz: mz,
					rylb: rylb,
					lkyy: lkyy,
					lxfs: lxfs,
					hjdqh: hjdqh,
					hjdxz: hjdxz,
					jzdqh: jzdqh,
					jzdxz: jzdxz,
					hjdpcs: hjdpcs,
					jzdpcs: jzdpcs,
					zjlx: zjlx,
					sfgx: sfgx,
					zjhm: zjhm,
					sfhqqggj: sfhqqggj,
					cjry: cjry,
					cjrlxfs: cjrlxfs,
					cjdw: cjdw,
					cjsj: cjsj
				},
				success: function(result) {
					console.info(result);
					app.zxrygl.search.initSearchForm(0, 1, app.zxrygl.search.pagination);
					app.zxrygl.add.close();
					app.zxrygl.add.viewclose();
				}
			});
		}
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
				console.info(typeof (idss))
				app.api.zxrygl.delete({
					data: {
						ids: idss
					},
					success: function(result) {
						app.zxrygl.search.initSearchForm(0, 1, app.zxrygl.search.pagination);
					}
				});
				layer.close(index);
			});
		}

	}
};
