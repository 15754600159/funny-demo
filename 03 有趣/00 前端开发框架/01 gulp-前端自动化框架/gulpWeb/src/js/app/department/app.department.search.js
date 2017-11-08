app.department.search = {
	init: function() {
		app.tree.init(app.tree.json);
		app.department.search.initSearchForm();
		app.department.search.initListPager();
	},
	initSearchForm: function() {
		$m('#form-department-search').validate({
			submitHandler: function(form) {
				app.department.search.listPager.query = $m(form).serializeObject();
				console.log(app.department.search.listPager.query);
				app.department.search.listPager.pageNum = 0;
				app.department.search.listPager.refresh();
			}
		});
	},
	initListPager: function() {
		app.department.search.listPager = $m.listPager({
			varName: 'app.department.search.listPager',
			itemId: 'list-department',
			columns: [{
				name: 'name',
				label: '名称',
				sortable: true,
			}, {
				name: 'code',
				label: '代码',
				sortable: true
			}, {
				//				name: 'parentCode',
				//				label: '父级代码',
				//				sortable: true
				//			}, {
				name: 'id',
				label: '操作',
				headStyle: 'width:200px;text-align:center',
				dataRender: function(data, column) {
					var updateBtn = '<a class="btn btn-small" onclick="javascript:app.department.toUpdatePage(\'' + data.id +
						'\');">修改</a>';
					var delBtn =
						'<a class="btn btn-small" href="javascript:void(0);" onclick="javascript:app.department.del(\'' + data.id +
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
				app.api.department.search({
					data: query,
					success: function(result) {
						callback(result.totalNum, result.datas);
					}
				});
			}
		});
		app.department.search.listPager.refresh();
	}
};
