app.dataDict.search = {
	init: function() {
		app.dataDict.search.initSearchForm();
		app.dataDict.search.initListPager();
	},
	initSearchForm: function() {
		app.select.init('#dataDict-search-type', app.constants.dataDictType.nameMap, {
			label: '请选择数据字典类型',
			value: ''
		});
		$m('#form-dataDict-search').validate({
			submitHandler: function(form) {
				app.dataDict.search.listPager.query = $m(form).serializeObject();
				app.dataDict.search.listPager.pageNum = 0;
				app.dataDict.search.listPager.refresh();
			}
		});
	},
	initListPager: function() {
		app.dataDict.search.listPager = $m.listPager({
			varName: 'app.dataDict.search.listPager',
			itemId: 'list-dataDict',
			columns: [{
				name: 'type',
				label: '类型',
				sortable: true,
				dataRender: function(data, column) {
					var type = '';
					if (data.type) {
						type = app.constants.dataDictType.nameMap[data.type];
					}
					return '<td>' + type + '</td>';
				}
			}, {
				name: 'name',
				label: '名称',
				sortable: true,
			}, {
				name: 'code',
				label: '代码',
				sortable: true
			}, {
				name: 'id',
				label: '操作',
				headStyle: 'width:200px;text-align:center',
				dataRender: function(data, column) {
					var updateBtn = '<a class="btn btn-small" onclick="javascript:app.dataDict.toUpdatePage(\'' + data.id +
						'\');">修改</a>';
					var delBtn = '<a class="btn btn-small" href="javascript:void(0);" onclick="javascript:app.dataDict.del(\'' +
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
				app.api.dataDict.search({
					data: query,
					success: function(result) {
						callback(result.totalNum, result.datas);
					}
				});
			}
		});
		app.dataDict.search.listPager.refresh();
	}
};
