app.qtdwfx.search = {
	dataMap: {},
	mbObject: null,
	listPager: {
		query: null,
		pageNo: 1,
		pageSize: 10
	},
	init: function() {
		var pageId = $m.page.idGenerator.getId('pages/qtdwfx/index.html');
		$m('#' + pageId).prop('destroyCallback', app.qtdwfx.search.destroy);

		app.qtdwfx.search.initSubRole();
		app.qtdwfx.search.initSearchFrom();
		app.qtdwfx.search.initSearchButton();

		// app.qtdwfx.search.getListPager();
	},
	destroy: function() {
		app.qtdwfx.search.dataMap = {};
		app.qtdwfx.search.mbObject = null;
		app.qtdwfx.search.listPager = {
			query: null,
			pageNo: 1,
			pageSize: 10
		};
	},
	initSearchFrom: function() {
		if (sessionStorage.getItem('mbObject')) {
			var mbJsonStr = sessionStorage.getItem('mbObject');
			app.qtdwfx.search.mbObject = JSON.parse(mbJsonStr);
			app.qtdwfx.search.initFormSelect();
		} else {
			app.api.fxmxgl.getSysDict({
				success: function(result) {
					var data = result.msg;
					var mbObject = {};

					for (let table of Object.keys(data)) {
						mbObject[table] = {};
						for (let i = 0, j = data[table].length; i < j; i++) {
							mbObject[table][data[table][i]['value']] = data[table][i]['label'];
						}
					}
					// 存储值：将对象转换为Json字符串
					sessionStorage.setItem('mbObject', JSON.stringify(mbObject));
					app.qtdwfx.search.mbObject = mbObject;
					app.qtdwfx.search.initFormSelect();
				}
			});
		}

		app.time.init();
		$m('#form-qtdwfx-search').validate({
			submitHandler: function(form) {
				app.qtdwfx.search.initFormData();
				app.qtdwfx.search.getListPager();
			}
		});
		$m('#form-qtdwfx-role-add').validate({
			submitHandler: function(form) {
				app.qtdwfx.search.initFormData();
				app.qtdwfx.search.getGroupListPager();
			}
		});
	},
	initFormData: function() {
		var formData = $m("#form-qtdwfx-search").serializeObject();
		var subRuleForm = $('#form-qtdwfx-role-add > section');
		subRuleForm.each(function(i) {
			app.fxmxgl.serializeFromWidget($(this), formData, i);
		})
		console.log(formData);

		app.qtdwfx.search.listPager.query = formData;
		app.qtdwfx.search.listPager.pageNo = 1;
	},
	initSearchButton: function() {
		$('#form-qtdwfx-submit').on('click', function() {
			$("#qtdwfx-search-div").show();
			$("#qtdwfx-qtwj-search-div").hide();
			$m('#form-qtdwfx-search').submit();
		});
		$('#form-qtdwfx-reset').on('click', function() {
			$m('#form-qtdwfx-search').reset()
			//初始化
			var tempHtml = $('#tmpl-qtdwfx-role-add').html();
			$('#form-qtdwfx-role-add').html(tempHtml);
		});
		$('#qtdwfx-role-group-btn').on('click', function() {
			$("#qtdwfx-search-div").hide();
			$("#qtdwfx-qtwj-search-div").show();
			$m('#form-qtdwfx-role-add').submit();
		});
	},
	getListPager: function() {
		var query = app.qtdwfx.search.listPager.query || {};
		query.pageNo = app.qtdwfx.search.listPager.pageNo;
		query.pageSize = app.qtdwfx.search.listPager.pageSize;
		app.loading.show();
		app.api.qtdwfx.search({
			data: query,
			success: function(result) {
				app.loading.hide();
				console.log(result);
				if (result.success == 1) {
					var list = result.msg.result;
					for (var i = 0; i < list.length; i++) {
						app.qtdwfx.search.dataMap[list[i].id] = list[i];
					}
					var template = $('#tmpl-list-qtdwfx-search').html();
					var html = $m.tmpl(template, list);
					$('#list-qtdwfx-search').html(html);
				} else {
					app.alert(result.success.alert);
				}
				result.msg.paginationId = "qtdwfx-search-pagebtn";
				app.qtdwfx.search.pagination && app.qtdwfx.search.pagination(result.msg);
			}
		});
	},
	getGroupListPager: function() {
		var query = app.qtdwfx.search.listPager.query || {};
		query.pageNo = app.qtdwfx.search.listPager.pageNo;
		query.pageSize = app.qtdwfx.search.listPager.pageSize;
		app.loading.show();
		app.api.qtdwfx.searchGroup({
			data: query,
			success: function(result) {
				app.loading.hide();
				console.log(result);
				if (result.success == 1) {
					var list = result.msg.result;
					for (var i = 0; i < list.length; i++) {
						app.qtwj.search.dataMap[list[i].id] = list[i];
					}
					var template = $('#tmpl-list-qtdwfx-qtwj-search').html();
					var html = $m.tmpl(template, list);
					$('#list-qtdwfx-qtwj-search').html(html);
				} else {
					app.alert(result.success.alert);
				}

				result.paginationId = "qtdwfx-qtwj-search-pagebtn";
				result.total = result.msg.total;
				result.pageNo = app.qtdwfx.search.listPager.pageNo;
				result.pageSize = app.qtdwfx.search.listPager.pageSize;
				app.qtdwfx.search.pagination && app.qtdwfx.search.pagination(result);
			}
		});
	},
	initFormSelect: function() {
		app.select.init($('#form-qtdwfx-search select[name="rHuji"]'), app.qtdwfx.search.mbObject.tb_d_qgxzqh);
		app.select.init($('#form-qtdwfx-search select[name="rMinzu"]'), app.qtdwfx.search.mbObject.nation);
		app.select.init($('#form-qtdwfx-search select[name="rXingbie"]'), app.qtdwfx.search.mbObject.sex);
		app.select.init($('#form-qtdwfx-search select[name="rXiaqu"]'), app.qtdwfx.search.mbObject.tb_d_qgxzqh);
		app.select.init($('#form-qtdwfx-search select[name="rRylb"]'), app.qtdwfx.search.mbObject.tb_d_zdryxl);
		app.select.init($('#form-qtdwfx-search select[name="rHdcslx"]'), app.qtdwfx.search.mbObject.RULE_TYPE);
		app.select.init($('#form-qtdwfx-search select[name="rCfd"]'), app.qtdwfx.search.mbObject.tb_d_qgxzqh);
		app.select.init($('#form-qtdwfx-search select[name="rMdd"]'), app.qtdwfx.search.mbObject.tb_d_qgxzqh);
	},
	initSubRole: function() {
		// 新增规则任务子表
		$('#qtdwfx-role-add-btn').on('click', function() {
			if ($('#form-qtdwfx-role-add .col4').length >= 5) {
				app.alert('最多只能增加5个规则任务子表！');
				return;
			}
			var tempHtml = $('#tmpl-qtdwfx-role-add').html();
			$('#form-qtdwfx-role-add').append(tempHtml);
		});

		// 删除规则任务子表
		$(document).on('click', '#form-qtdwfx-role-add .delete-sub-rule', function() {
			var subRuleElem = $(this).parent('.col4');
			subRuleElem.remove();
		});

		// 规则任务子表 下拉框的联动
		$(document).on('change', '#form-qtdwfx-role-add select[name="fType"]', function() {
			var fType = $(this).val(),
				subRuleElem = $(this).parents('section.col4'),
				fRuleSelect = subRuleElem.find('select[name="fRule"]'),
				limitConditionElem = subRuleElem.find('div.limit-condition'),
				planeElem = subRuleElem.find('div.plane'),
				carElem = subRuleElem.find('div.car'),
				railwayElem = subRuleElem.find('div.railway'),
				innElem = subRuleElem.find('div.inn'),
				internetElem = subRuleElem.find('div.internet');

			switch (fType) {
				case '02': //飞机
					fRuleSelect.empty().append('<option value="01">同行</option>');
					limitConditionElem.css('display', 'none');
					planeElem.css('display', 'block');
					break;
				case '01': //火车
					fRuleSelect.empty().append('<option value="01">同行</option>');
					limitConditionElem.css('display', 'none');
					railwayElem.css('display', 'block');
					break;
				case '00': //汽车
					fRuleSelect.empty().append('<option value="01">同行</option>');
					limitConditionElem.css('display', 'none');
					carElem.css('display', 'block');
					break;
				case '03': //宾馆
					fRuleSelect.empty().append('<option value="02">同屋同住</option><option value="03">多次同住</option>');
					limitConditionElem.css('display', 'none');
					// innElem.css('display', 'block');
					break;
				case '04': //网吧
					fRuleSelect.empty().append('<option value="04">同上网</option>');
					limitConditionElem.css('display', 'none');
					internetElem.css('display', 'block');
					break;
				default:
					console.log('你选的活动类型不符合！');
			}
		});

		$(document).on('change', '#form-rule-add-sub select[name="fRule"]', function() {
			var fRule = $(this).val(),
				subRuleElem = $(this).parents('section.col4'),
				fType = subRuleElem.find('select[name="fType"]').val(),
				limitConditionElem = subRuleElem.find('div.limit-condition'),
				innElem = subRuleElem.find('div.inn');

			if (fType !== '03') { //宾馆
				return;
			}

			switch (fRule) {
				case '02': //同屋居住
					limitConditionElem.css('display', 'none');
					break;
				case '03': //多次同住
					limitConditionElem.css('display', 'none');
					innElem.css('display', 'block');
					break;
				default:
					console.log('你选的活动类型不符合！');
			}
		});

		//初始化
		var tempHtml = $('#tmpl-qtdwfx-role-add').html();
		$('#form-qtdwfx-role-add').append(tempHtml);
	},
	openView: function(id) {
		app.qtdwfx.viewWindow.data = app.qtdwfx.search.dataMap[id];
		app.qtdwfx.viewWindow.open();
	},
	pagination: function(data) {
		BootstrapPagination(
			$("#" + data.paginationId), {
				layoutScheme: "lefttext,firstpage,prevgrouppage,prevpage,pagenumber,nextpage,nextgrouppage,lastpage,pageinput,righttext",
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
					app.qtdwfx.search.listPager.pageNo = pageIndex + 1;
					app.qtdwfx.search.listPager.pageSize = pageSize;
					if (data.paginationId == "qtdwfx-qtwj-search-pagebtn") {
						app.qtdwfx.search.getGroupListPager();
					} else {
						app.qtdwfx.search.getListPager();
					}
				},
			});
	}
};
