app.login = {
	checkLogin: function(callback) {
		app.api.user.loginUser({
			success: function(data) {
				if (data) {
					app.user.listFunctions(function() {
						callback(true);
					});
				} else {
					app.login.open();
				}
			},
			error: function() {
				app.login.open();
			}
		});
	},
	open: function() {
		// 跳转到单点登录页面
		window.location = '/login/sso';
	}

};
