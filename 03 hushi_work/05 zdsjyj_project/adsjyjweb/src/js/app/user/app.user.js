app.user = {
	currentUser: null,
	functions: null,
	clear: function() {
		app.user.currentUser = null;
		app.user.userFunctions = null;
	},
	/**
	 * 获取当前登陆用户
	 */
	getCurrentUser: function() {
		if (app.user.currentUser) {
			return app.user.currentUser;
		}

		var user = localStorage.user;
		if (user) {
			app.user.currentUser = JSON.parse(user);
			return app.user.currentUser;
		} else {
			return null;
		}
	},
	/**
	 * 获取用户权限
	 */
	listFunctions: function(callback) {
		app.api.user.listFunctions({
			success: function(userFunctions) {
				app.user.userFunctions = userFunctions;

				callback && callback();
			},
			error: app.api.error
		});
	},
	/**
	 * 跳转到查询页面
	 */
	toSearchPage: function() {
		$m.page.loadPage({
			url: 'pages/user/index.html',
			container: 'workspace',
			effect: 'fade'
		});
	},
	/**
	 * 跳转到新增页面
	 */
	toAddPage: function() {
		$m.page.loadPage({
			url: 'pages/user/add.html',
			container: 'workspace',
			effect: 'fade'
		});
	},
	/**
	 * 跳转到编辑页面
	 */
	toUpdatePage: function(id) {
		app.user.update.id = id;
		$m.page.loadPage({
			url: 'pages/user/update.html?id=' + id,
			container: 'workspace',
			effect: 'fade'
		});
	},
	/**
	 * 删除
	 */
	del: function(id) {
		app.api.user.del({
			data: {
				userId: id
			},
			success: function(result) {
				$m.message('删除成功');
				app.user.search.listPager.refresh();
			},
			error: app.api.error
		});
	},
	/**
	 * 激活
	 */
	enable: function(id) {
		app.api.user.enable({
			data: {
				userId: id
			},
			success: function(result) {
				$m.message('激活成功');
				app.user.search.listPager.refresh();
			},
			error: app.api.error
		});
	},
	/**
	 * 禁用
	 */
	disable: function(id) {
		app.api.user.disable({
			data: {
				userId: id
			},
			success: function(result) {
				$m.message('禁用成功');
				app.user.search.listPager.refresh();
			},
			error: app.api.error
		});
	}
};
