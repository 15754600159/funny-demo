app.dataDict = {
	init: function() {

	},
	/**
	 * 跳转到查询页面
	 */
	toSearchPage: function() {
		$m.page.loadPage({
			url: 'pages/dataDict/index.html',
			container: 'workspace',
			effect: 'fade'
		});
	},
	/**
	 * 跳转到新增页面
	 */
	toAddPage: function() {
		$m.page.loadPage({
			url: 'pages/dataDict/add.html',
			container: 'workspace',
			effect: 'fade'
		});
	},
	/**
	 * 跳转到编辑页面
	 */
	toUpdatePage: function(id) {
		app.dataDict.update.id = id;
		$m.page.loadPage({
			url: 'pages/dataDict/update.html?id=' + id,
			container: 'workspace',
			effect: 'fade'
		});
	},

	del: function(id) {
		app.api.dataDict.del({
			data: {
				id: id
			},
			success: function(result) {
				$m.message('删除成功');
				app.dataDict.search.listPager.refresh();
			},
			error: app.api.error
		});
	}
};
