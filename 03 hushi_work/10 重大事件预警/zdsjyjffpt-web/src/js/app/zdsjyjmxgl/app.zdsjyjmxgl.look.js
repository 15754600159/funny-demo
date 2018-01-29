app.zdsjyjmxgl.look = {
	pageno: 1,
	inputId:null,
	url: 'pages/zdsjyjmxgl/mxpzlook.html',
	init: function() {
		// $("#wggzqt-caijishijianstart").val(app.time.last());
		// $('#wggzqt-caijishijianzhi').val(app.time.now());
		app.time.init();
		app.zdsjyjmxgl.look.checks();
		app.zdsjyjmxgl.look.mgsq();
		app.zdsjyjmxgl.look.select();
		this.initForm();
		this.mxpzbdfz();
		//app.zdsjyjmxgl.initSearchForm(0, 1, app.zdsjyjmxgl.pagination);
	},
	mgsq: function() {
		// $("#wggzqt-caijishijianstart").val(app.time.last());
		// $('#wggzqt-caijishijianzhi').val(app.time.now());
		app.api.zdsjyjmxgl.mgsq({
			success: function(result) {
				console.info(result.msg.length);
				var data = result.msg;
				for(var i = 0;i<data.length;i++){
					$("#mgsq").append("<option value='' warningStartTime='"+data[i].warningStartTime+"' warningEndTime='"+data[i].warningEndTime+"'>"+data[i].sensitivePName+"</option>")
				}
				
			}
		});
		//app.zdsjyjmxgl.initSearchForm(0, 1, app.zdsjyjmxgl.pagination);
	},
	select:function(){
		$("select#mgsq").change(function(){
			var kssj = $("#mgsq option:selected").attr("warningStartTime");
			var jssj = $("#mgsq option:selected").attr("warningEndTime");
			$("#kssj").val(kssj);
			$("#jssj").val(jssj)
			 });
	},
	checks: function() {
		$("#chw").on('click', function() {
			var checkif = $('#chw').prop('checked');
			console.info(checkif);
			if (checkif) {
				$(".tx").find("input").removeAttr("disabled");
				$(".tx").find("select").removeAttr("disabled");
			} else {
				$(".tx").find("input").attr("disabled", "disabled");
				$(".tx").find("select").attr("disabled", "disabled");
			}
		});
		$("#bg").on('click', function() {
			var checkif = $('#bg').prop('checked');
			console.info(checkif);
			if (checkif) {
				$(".txx").find("input").removeAttr("disabled");
				$(".txx").find("select").removeAttr("disabled");
			} else {
				$(".txx").find("input").attr("disabled", "disabled");
				$(".txx").find("select").attr("disabled", "disabled");
			}
		});
	},
	search: function() {
		app.zdsjyjmxgl.initSearchForm(1, 10, app.zdsjyjmxgl.pagination);
	},
	close: function() {
		$m.page.closePage(app.zdsjyjmxgl.look.url, 'fade', 'container-wrapper');
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
				app.api.zdsjyjmxgl.delete({
					data: {
						ids: ids
					},
					success: function(result) {
						console.info(result);
						app.zdsjyjmxgl.initSearchForm(0, 1, app.zdsjyjmxgl.pagination);
					}
				});
				layer.close(index);
			});
		}
	},
	//   现在在弄删除  千万别忘了
	initSearchForm: function(pageIndex, pageSize, pagination) {
		var startDate = $('#startDate').val();
		var endDate = $('#endDate').val();
		if (app.time.jiaoyan(startDate, endDate) > 0) {
			return;
		}
		var mxlx = $("#mxlx").find("option:selected").text();
		var sfyx = $("#sfyx").val();
		var cjr = $("#cjr").val();
		var mxmz = $("#mxmz").val();
		app.loading.show();
		app.api.zdsjyjmxgl.view({
			data: {
				pageNo: app.zdsjyjmxgl.pageno,
				pageSize: 10,
				createStartTime: startDate,
				createEndTime: endDate,
				modelType: mxlx,
				modelStatus: sfyx,
				modelName: mxmz,
				createUser: cjr

			},
			success: function(result) {
				console.info(result);
				$(".table-body").html('');
				var data = result.msg.result;
				for (var i = 0; i < data.length; i++) {
					$(".table-body").append(
						"<tr>" +
						"<td class='checks'>" + '<label class="check"><input type="checkbox" name="r2" value="' + data[i].id +
						'"><span></span></label>' + "</td>" +
						"<td>" + app.data(data[i].modelName) + '</td>' +
						"<td>" + app.data(data[i].modelType) + "</td>" +
						"<td>" + app.data(data[i].modelDesc) + "</td>" +
						"<td>" + app.data(data[i].createUser) + "</td>" +
						"<td>" + app.data(data[i].createDate) + "</td>" +
						"<td>" + app.data(app.yx(data[i].modelStatus)) + "</td>" +
						"<td>" +
						'<span class="glyphicon glyphicon-list-alt" aria-hidden="true" data-toggle="tooltip" data-placement="bottom" title="情报分析" onclick="app.zdsjyjmxgl.start(\'' +
						data[i].id + '\',\'xg\')"></span>' +
						"</td>" +
						"</tr >"
					);
				}
				app.loading.hide();
				app.zdsjyjmxgl.check();
				app.zdsjyjmxgl.pagination && app.zdsjyjmxgl.pagination(result);
			}
		});
	},
	start: function(id) {
		app.loading.show();
		app.api.zdsjyjmxgl.start({
			data: {
				id: id
			},
			success: function(result) {
				console.info(result);
				app.loading.hide();
			}
		});

	},
	updata: function() {
		app.loading.show();
		var modelName = $("#name-inpu").val();
		var modelType = $("#mxlx-inpu").find("option:selected").text();
		var modelDesc = $("#miaoshu").val();
		var modelStatus = $("#sfyx-inpu").val();
		var modelRylb = $("#rylb").attr("code");
		var modelHuji = $("#citySel").attr("code");
		var modelMinzu = $("#minzu-inpu").val();
		var modelXingbie = $("#sex-inpu").val();
		var modelAgeStart = $("#agestrat-inpu").val();
		var modelAgeEnd = $("#ageend-inpu").val();
		var modelMinsize = $("#renyuan-inpu").val();
		var checklist = $(".checkall").find("input[type='checkbox']")
		var ids = [];
		var mdd = $("#hc-inpu").find("option:selected").text();
		var lvdianSftwtz = $(".twtz").find('input:radio:checked').val();
		var cfdsfxt = $(".cfd").find('input:radio:checked').val();
		var tcc = $(".tcc").find('input:radio:checked').val();
		var warningStartTime = $("#kssj").val();
		var warningEndTime = $("#jssj").val();
		var check2 = $(".wfgzry").find("input[type='checkbox']");
		var isWwgzry = 0;
		var groupTypes = $("#qtlb").attr("code");
		if($(check2[0]).prop('checked')){
			isWwgzry = 1;
		};
		var localPersonTypes = $("#mxpz-bdgzry").find("option:selected").val();
		for (var i = 0; i < checklist.length; i++) {
			var checkif = $(checklist[i]).prop('checked');
			if (checkif) {
				ids.push($(checklist[i]).val());
			}
		};
		var activityType = ids.toString();
        app.api.zdsjyjmxgl.updata({
            data: {
				localPersonTypes:localPersonTypes,
				isWwgzry:isWwgzry,
				groupTypes:groupTypes,
				warningStartTime:warningStartTime,
				warningEndTime:warningEndTime,
                cfdsfxt:cfdsfxt,
                tcc:tcc,
                modelName: modelName,
                modelType: modelType,
                modelDesc: modelDesc,
                modelStatus: modelStatus,
                modelRylb: modelRylb,
                modelHuji: modelHuji,
                modelMinzu: modelMinzu,
                modelXingbie: modelXingbie,
                modelAgeEnd: modelAgeEnd,
                modelAgeStart: modelAgeStart,
                modelMinsize: modelMinsize,
                activityType: activityType,
                mdd: mdd,
                lvdianSftwtz: lvdianSftwtz
            },
            success: function (result) {
                console.info(result);
                app.loading.hide();
            }
        });
        $m.page.closePage(app.zdsjyjmxgl.look.url, 'fade', 'container-wrapper');
        app.loading.show();
        app.zdsjyjmxgl.initSearchForm(0, 10, app.zdsjyjmxgl.pagination);
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
    pagination: function (data) {
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
                pageChanged: function (pageIndex, pageSize) {
                    app.zdsjyjmxgl.pageno = pageIndex + 1;
                    app.zdsjyjmxgl.initSearchForm(pageIndex + 1, pageSize, app.zdsjyjmxgl.pagination);
                },
            });
	},
	showMenu: function(id) {
		app.zdsjyjmxgl.look.inputId = id;
		console.info(app.zdsjyjmxgl.look.inputId);
		var cityObj = $("#" + app.zdsjyjmxgl.look.inputId);
		var cityOffset = $("#" + app.zdsjyjmxgl.look.inputId).offset();
		$("#" + app.zdsjyjmxgl.look.inputId + "Content").css({
			left: cityOffset.left + "px",
			top: cityOffset.top + cityObj.outerHeight() + 2 + "px"
		}).slideDown("fast");
		$("body").bind("mousedown", app.zdsjyjmxgl.look.onBodyDown);
	},
	hideMenu: function() {
		$("#" + app.zdsjyjmxgl.look.inputId + "Content").fadeOut("fast");
		$("body").unbind("mousedown", app.zdsjyjmxgl.look.onBodyDown);
	},
	onBodyDown: function() {
		if (!(event.target.id == "menuBtn" || event.target.id == "menuContent" || $(event.target).parents("#" + app.zdsjyjmxgl.look
				.inputId + "Content").length > 0)) {
			app.zdsjyjmxgl.look.hideMenu();
		}
	},
	mxpzbdfz:function(){
		$.ajax({
			type: "get",
			url: app.api.url+"/localperson/info/findDataType",
			dataType: "json",
			success: function (response) {
				for (var j = 0; j < response.length; j++) {
					$("#mxpz-bdgzry").append('<option value="' + response[j] + '">' + response[j] + '</option>');
				} // 民族搞定了
			}
		});
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
				onClick:onClick
			}
		};
		var setting2 = {
			view: {
				dblClickExpand: false // 屏蔽掉双击事件
			},
			data: {
				simpleData: {
					enable: true
				}
			},
			callback: {
				onCheck: zTreeOnCheck
			},
			check: {  
                enable: true,  
                chkStyle: "checkbox",  
                chkboxType: { "Y": "s", "N": "ps" }  
            }
		};
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
		var data = 'tb_d_zdryxl,qg_xzqh_tree,tb_d_zjlx,dwdm_tree,nation,sex';
		 function zTreeOnCheck  (event, treeId, treeNode) {
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
			$('#rylb').val(names.join(','));
			$('#rylb').attr("code",codes.join(','));
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
			$('#qtlb').val(names.join(','));
			$('#qtlb').attr("code",codes.join(','));
		};
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
					v += nodes[i].name ;
					code += nodes[i].id ;
				}
			} else {
				for (var i = 0, l = nodes.length; i < l; i++) {
					v += nodes[i].name + ",";
					code += nodes[i].id + ",";
				}
			}
			if (treeId == 'citySelUl') {
				$("#citySel").val(v);
				$("#citySel").attr("code",code)
			}

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
				//$.fn.zTree.init($("#cjdwUl"), setting, dwdmNodes); // 单位树已经种好了
				$.fn.zTree.init($("#citySelUl"), setting, hjdqhNodes); // 户籍地已经种好了
				
				//$.fn.zTree.init($("#jzdSelUl"), setting, hjdqhNodes); // 居住地已经种好了
				for (var j = 0; j < nation.length; j++) {
					$("#minzu-inpu").append('<option value="' + nation[j].value + '">' + nation[j].label + '</option>');
				} // 民族搞定了
			}
		});
		var data = "";
		var rylb = [];
		$.ajax({
			type: "get",
			url: app.api.url+"/zdsjyj/dict/getDictPersonCategory",
			data: data,
			dataType: "json",
			success: function (response) {
				var data = response.msg;
				for (var h = 0; h < data.length; h++) {
					var lb = {
						id: data[h].code,
						pId: data[h].pcode,
						name: data[h].name
					};
					rylb.push(lb);
				};
				$.fn.zTree.init($("#rylbUl"), setting2, rylb);
			}
		});
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
				$.fn.zTree.init($("#qtlbUl"), setting3, qtlb);
			}
		});
	},
}
