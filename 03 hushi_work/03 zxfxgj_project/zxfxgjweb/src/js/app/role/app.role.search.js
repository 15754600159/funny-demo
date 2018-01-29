app.role.search = {
	init: function() {
		app.role.search.initSearchForm();
		app.role.search.initListPager();
	},
	initSearchForm: function() {
		$m('#form-role-search').validate({
			submitHandler: function(form) {
				app.role.search.listPager.query = $m(form).serializeObject();
				app.role.search.listPager.pageNum = 0;
				app.role.search.listPager.refresh();
			}
		});
	},
	initListPager: function() {
		app.role.search.listPager = $m.listPager({
			varName: 'app.role.search.listPager',
			itemId: 'list-role',
			columns: [{
				name: 'name',
				label: '名称',
				sortable: true,
			}, {
				name: 'code',
				label: '代码',
				sortable: true
			}, {
				name: 'parentCode',
				label: '父级代码',
				sortable: true
			}, {
				name: 'id',
				label: '操作',
				headStyle: 'width:200px;text-align:center',
				dataRender: function(data, column) {
					var updateBtn = '<a class="btn btn-small" onclick="javascript:app.role.toUpdatePage(\'' + data.id +
						'\');">修改</a>';
					var delBtn = '<a class="btn btn-small" href="javascript:void(0);" onclick="javascript:app.role.del(\'' +
						data.id + '\');">删除</a>';
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
				app.api.role.search({
					data: query,
					success: function(result) {
						callback(result.totalNum, result.datas);
					}
				});
			}
		});
		app.role.search.listPager.refresh();
	}
};
