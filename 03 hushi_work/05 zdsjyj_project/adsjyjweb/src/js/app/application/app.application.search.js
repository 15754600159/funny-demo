app.application.search = {
	init: function() {
		app.application.search.initSearchForm();
		app.application.search.initListPager();
	},
	initSearchForm: function() {
		$m('#form-application-search').validate({
			submitHandler: function(form) {
				app.application.search.listPager.query = $m(form).serializeObject();
				app.application.search.listPager.pageNum = 0;
				app.application.search.listPager.refresh();
			}
		});
	},
	initListPager: function() {
		app.application.search.listPager = $m.listPager({
			varName: 'app.application.search.listPager',
			itemId: 'list-application',
			columns: [{
				name: 'name',
				label: '应用名称',
				sortable: true,
			}, {
				name: 'appUrl',
				label: '应用地址',
				sortable: true
			}, {
				name: 'enableAuthorization',
				label: '权限授权',
				sortable: true,
				dataRender: function(data) {
					var enableAuthorization = '';
					if (data.enableAuthorization) {
						enableAuthorization = '开启'
					} else {
						enableAuthorization = '关闭'
					}
					return '<td style="">' + enableAuthorization + '</td>';
				}
			}, {
				name: 'enableSso',
				label: '单点登录',
				sortable: true,
				dataRender: function(data) {
					var enableSso = '';
					if (data.enableSso) {
						enableSso = '接入'
					} else {
						enableSso = '关闭'
					}
					return '<td style="">' + enableSso + '</td>';
				}
			}, {
				name: 'id',
				label: '操作',
				headStyle: 'width:200px;text-align:center',
				dataRender: function(data, column) {
					var updateBtn = '<a class="btn btn-small" onclick="javascript:app.application.toUpdatePage(\'' + data.id +
						'\');">修改</a>';
					var delBtn =
						'<a class="btn btn-small" href="javascript:void(0);" onclick="javascript:app.application.del(\'' + data.id +
						'\');">删除</a>';
					return '<td style="text-align:center">' + updateBtn + delBtn + '</td>';
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
		app.application.search.listPager.refresh();
	}
};
