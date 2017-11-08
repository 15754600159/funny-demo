app.application = {
	init: function() {

	},
	/**
	 * 跳转到查询页面
	 */
	toSearchPage: function() {
		$m.page.loadPage({
			url: 'pages/application/index.html',
			container: 'workspace',
			effect: 'fade'
		});
	},
	/**
	 * 跳转到新增页面
	 */
	toAddPage: function() {
		$m.page.loadPage({
			url: 'pages/application/add.html',
			container: 'workspace',
			effect: 'fade'
		});
	},
	/**
	 * 跳转到编辑页面
	 */
	toUpdatePage: function(id) {
		app.application.update.id = id;
		$m.page.loadPage({
			url: 'pages/application/update.html?id=' + id,
			container: 'workspace',
			effect: 'fade'
		});
	},

	del: function(id) {
		app.api.application.del({
			data: {
				id: id
			},
			success: function(result) {
				$m.message('删除成功');
				app.application.search.listPager.refresh();
			},
			error: app.api.error
		});
	},
	autogeneration: function(type) {
		var len = 7;　　
		var $chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678'; /****默认去掉了容易混淆的字符oOLl,9gq,Vv,Uu,I1****/ 　　
		var $charsId = 'abcdefhijkmnprstwxyz2345678'; /****默认去掉了容易混淆的字符oOLl,9gq,Vv,Uu,I1****/ 　　
		var maxPos = $chars.length;　　
		var maxIdPos = $charsId.length;　　
		var appId = '';　　
		var appSecret = '';　　
		for (i = 0; i < len; i++) {　　　　
			appId += $charsId.charAt(Math.floor(Math.random() * maxIdPos));　　　　
			if (i < 5) {　　　　
				appSecret += $chars.charAt(Math.floor(Math.random() * maxPos));　　　　
			}　　
		}　　
		$('#application-' + type + '-appId').val(appId);　　
		$('#application-' + type + '-appSecret').val(appSecret);
	}
};
