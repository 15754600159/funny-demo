app.zdsjyjgl.yjzxcx = {
	pageno: 1,
	inputId:null,
	url: 'pages/zdsjyjmxgl/mxpzadd.html',
	init: function() {
		// $("#wggzqt-caijishijianstart").val(app.time.last());
		// $('#wggzqt-caijishijianzhi').val(app.time.now());
		
		this.checks();
		this.mgsq();
		this.select();
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
					$("#mgsq").append("<option value='"+data[i].id+"' warningStartTime='"+data[i].warningStartTime+"' warningEndTime='"+data[i].warningEndTime+"'>"+data[i].sensitivePName+"</option>")
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
            $("#jssj").val(jssj);
            app.time.init();
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
		app.zdsjyjgl.yjzxcx.initSearchForm(1, 10, app.zdsjyjgl.yjzxcx.pagination);
	},

	//   现在在弄删除  千万别忘了
	initSearchForm: function(pageIndex, pageSize, pagination) {
		app.loading.show();
		var personCategory = $("#rylb").attr("code");
		var censusRegister = $("#citySel").attr("code");
		var nation = $("#minzu-inpu").val();
		var sex = $("#sex-inpu").val();
		var ageStart = $("#agestrat-inpu").val();
		var ageEnd = $("#ageend-inpu").val();
		var minsize = $("#renyuan-inpu").val();
		var checklist = $(".checkall").find("input[type='checkbox']")
		var ids = [];
		var mdd = $("#hc-inpu").find("option:selected").text();
		var lvdianSftwtz = $(".twtz").find('input:radio:checked').val();
		var cfdsfxt = $(".cfd").find('input:radio:checked').val();
		var tcc = $(".tcc").find('input:radio:checked').val();
		var actStartTime = $("#kssj").val();
		var actEndTime = $("#jssj").val();
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
        var area = $("#area").val();
		var activityType = ids.toString();
		app.api.zdsjyjgl.yjzxcx({
			data: {
				pageNo: app.zdsjyjgl.yjzxcx.pageno,
				pageSize: 10,
				area:area,
				personCategory:personCategory,
				isWwgzry:isWwgzry,
				groupTypes:groupTypes,
				actStartTime:actStartTime,
				actEndTime:actEndTime,
                cfdsfxt:cfdsfxt,
                tcc:tcc,
                localPersonTypes: localPersonTypes,
                censusRegister: censusRegister,
                nation: nation,
                sex: sex,
                ageEnd: ageEnd,
                ageStart: ageStart,
                minsize: minsize,
                activityType: activityType,
                mdd: mdd,
                lvdianSftwtz: lvdianSftwtz

			},
			success: function(result) {
				console.info(result);
				$(".table-body").html('');
				// for (var i = 0; i < data.length; i++) {
				// 	$(".table-body").append(
				// 		"<tr>" +
				// 		"<td class='checks'>" + '<label class="check"><input type="checkbox" name="r2" value="' + data[i].id +
				// 		'"><span></span></label>' + "</td>" +
				// 		"<td>" + app.data(data[i].modelName) + '</td>' +
				// 		"<td>" + app.data(data[i].modelType) + "</td>" +
				// 		"<td>" + app.data(data[i].modelDesc) + "</td>" +
				// 		"<td>" + app.data(data[i].createUser) + "</td>" +
				// 		"<td>" + app.data(data[i].createDate) + "</td>" +
				// 		"<td>" + app.data(app.yx(data[i].modelStatus)) + "</td>" +
				// 		"<td>" +
				// 		'<span class="glyphicon glyphicon-list-alt" aria-hidden="true" data-toggle="tooltip" data-placement="bottom" title="情报分析" onclick="app.zdsjyjmxgl.start(\'' +
				// 		data[i].id + '\',\'xg\')"></span>' +
				// 		"</td>" +
				// 		"</tr >"
				// 	);
				// }
				app.loading.hide();
				app.zdsjyjgl.yjzxcx.pagination && app.zdsjyjgl.yjzxcx.pagination(result);
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
		
        app.api.zdsjyjmxgl.updata({
            data: {
                
            },
            success: function (result) {
                console.info(result);
                app.loading.hide();
            }
        });
        $m.page.closePage(app.zdsjyjgl.yjzxcx.url, 'fade', 'container-wrapper');
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
            $("#Paginationzxcx"), {
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
                    app.zdsjyjmxgl.initSearchForm(pageIndex + 1, pageSize, app.zdsjyjgl.yjzxcx.pagination);
                },
            });
	},
	showMenu: function(id) {
		app.zdsjyjgl.yjzxcx.inputId = id;
		console.info(app.zdsjyjgl.yjzxcx.inputId);
		var cityObj = $("#" + app.zdsjyjgl.yjzxcx.inputId);
		var cityOffset = $("#" + app.zdsjyjgl.yjzxcx.inputId).offset();
		$("#" + app.zdsjyjgl.yjzxcx.inputId + "Content").css({
			left: cityOffset.left - 165 + "px",
			top: cityOffset.top - 35  + "px"
		}).slideDown("fast");
		$("body").bind("mousedown", app.zdsjyjgl.yjzxcx.onBodyDown);
	},
	hideMenu: function() {
		$("#" + app.zdsjyjgl.yjzxcx.inputId + "Content").fadeOut("fast");
		$("body").unbind("mousedown", app.zdsjyjgl.yjzxcx.onBodyDown);
	},
	onBodyDown: function() {
		if (!(event.target.id == "menuBtn" || event.target.id == "menuContent" || $(event.target).parents("#" + app.zdsjyjgl.yjzxcx.inputId + "Content").length > 0)) {
			app.zdsjyjgl.yjzxcx.hideMenu();
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
