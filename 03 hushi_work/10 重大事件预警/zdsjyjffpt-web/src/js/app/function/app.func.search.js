app.func.search = {
	init: function() {
		app.func.search.initSearchForm();
		app.func.search.initListPager();
	},
	initSearchForm: function() {
		$m('#form-func-search').validate({
			submitHandler: function(form) {
				app.func.search.listPager.query = $m(form).serializeObject();
				app.func.search.listPager.pageNum = 0;
				app.func.search.listPager.refresh();
			}
		});
	},
	initListPager: function() {
		app.func.search.listPager = $m.listPager({
			varName: 'app.func.search.listPager',
			itemId: 'list-func',
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
					var updateBtn = '<a class="btn btn-small" onclick="javascript:app.func.toUpdatePage(\'' + data.id +
						'\');">修改</a>';
					var delBtn = '<a class="btn btn-small" href="javascript:void(0);" onclick="javascript:app.func.del(\'' +
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
				app.api.func.search({
					data: query,
					success: function(result) {
						callback(result.totalNum, result.datas);
					}
				});
			}
		});
		app.func.search.listPager.refresh();
	}
};
