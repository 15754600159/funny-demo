app.appApiFunction.search = {
	init: function() {
		app.appApiFunction.search.initListPager();
		app.appApiFunction.search.initListApi();
		app.appApiFunction.save.init();
	},
	initSearchForm: function() {
		$m('#form-appApiFunction-search').validate({
			submitHandler: function(form) {
				app.appApiFunction.search.listPager.query = $m(form).serializeObject();
				app.appApiFunction.search.listPager.pageNum = 0;
				app.appApiFunction.search.listPager.refresh();
			}
		});
	},
	initListPager: function() {
		app.appApiFunction.search.listPager = $m.listPager({
			varName: 'app.appApiFunction.search.listPager',
			itemId: 'app-api-appList',
			hideToolbar: true,
			hidePageSize: true,
			pageSize: 1000,
			columns: [{
				name: 'userId',
				label: '',
				headStyle: 'width:30px;',
				dataRender: function(data, column) {
					return '<td><label class="check check-nolabel"><input type="checkbox" value="' + data.appId +
						'"><span></span></label></td>';
				}
			}, {
				name: 'name',
				label: '名称',
				sortable: true,
				dataRender: function(data, column) {
					return '<td>' + data.name + '</td>';
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
				app.api.application.search({
					data: query,
					success: function(result) {
						callback(result.totalNum, result.datas);
					}
				});
			}
		});
		app.appApiFunction.search.listPager.refresh();

		$('#app-api-appList').on('click', 'tr', app.appApiFunction.search.searchRole);
	},
	searchRole: function(e, that) {
		var item;
		if (that) {
			item = that;
		} else {
			item = this;
		}

		var appId = $(item).find('input')[0].value;
		$("#app-api-appList :checkbox").prop("checked", false);
		$("#app-api-appList tbody").find("tr").css('background-color', '#fff').find('td').css('color', '#000');
		$(this).css('background-color', '#01458e').find('td').css('color', '#fff');

		$(':checkbox', this).prop('checked', true);
		app.appApiFunction.save.initData(appId);

	},
	initListApi: function() {
		app.appApiFunction.search.listApiPager = $m.listPager({
			varName: 'app.appApiFunction.search.listApiPager',
			itemId: 'app-api-apiList',
			hideToolbar: true,
			hidePageSize: true,
			pageSize: 1000,
			columns: [{
				name: 'code',
				label: '<label class="check check-nolabel"><input type="checkbox" onchange="app.appApiFunction.search.selectAll(this);"><span></span></label>',
				headStyle: 'width:30px;',
				dataRender: function(data, column) {
					return '<td><label class="check check-nolabel"><input type="checkbox" name="apiFunctionName" value="' +
						data.functionName + '"><span></span></label></td>';
				}
			}, {
				name: 'description',
				label: '名称',
				sortable: true,
				dataRender: function(data, column) {
					return '<td>' + data.description + '</td>';
				}
			}],
			dataProvider: function(listApiPager, callback) {
				var query = listApiPager.query || {};
				query.pageSize = listApiPager.pageSize;
				query.pageNum = listApiPager.pageNum;
				if (listApiPager.orderBy) {
					query.orderBy = listApiPager.orderBy;
					query.sort = listApiPager.asc ? 'asc' : 'desc';
				}
				app.api.appApiFunction.listApi({
					data: query,
					success: function(result) {
						callback(result.length, result);
					}
				});
			}
		});
		app.appApiFunction.search.listApiPager.refresh();
	},
	selectAll: function(check) {
		console.log(check.checked);
		if (check.checked) {
			$("#app-api-apiList :checkbox").prop("checked", true);
		} else {
			$("#app-api-apiList :checkbox").prop("checked", false);
		}
	}
};
