app.user.resetPasswordWindow = {
	url: 'pages/user/resetPasswordWindow.html',
	id: null,
	open: function() {
		$m.page.openPage(app.user.resetPasswordWindow.url, 'fade', 'container-wrapper');
	},
	close: function() {
		app.user.resetPasswordWindow.clear();
		$m.page.closePage(app.user.resetPasswordWindow.url, 'fade', 'container-wrapper');
	},
	init: function() {
		$('#window-user-resetPasswordWindow').addClass('popIn');
		$('#window-user-resetPasswordWindow .btn-window-close').on('click', function() {
			$('#window-user-resetPasswordWindow').addClass('popOut');
			app.user.resetPasswordWindow.close();
		});

		// 确定按钮
		$('#btn-ok-user-resetPassword').on('click', function() {
			$m('#form-user-resetPasswordWindow').submit();
		});

		app.user.resetPasswordWindow.initData();

	},
	clear: function() {
		app.user.resetPasswordWindow.callback = null;
	},
	initData: function() {
		app.api.user.view({
			data: {
				id: app.user.resetPasswordWindow.id
			},
			success: function(result) {
				$m('#form-user-resetPasswordWindow').setFormValues(result.user);
				$('#user-resetPasswordWindow-username').val(result.user.username);
				$('#user-resetPasswordWindow-userId').val(result.user.id);
				app.user.resetPasswordWindow.initForm();
			},
			error: app.api.error
		});
	},
	initForm: function() {
		$m('#form-user-resetPasswordWindow').validate({
			submitHandler: function(form) {
				var data = $m(form).serializeObject();

				app.api.user.resetPassword({
					data: data,
					success: function(result) {
						$m.message('保存成功');
						app.user.resetPasswordWindow.close();
					},
					error: app.api.error
				});
			},
			rules: {
				password: {
					required: true,
					maxlength: 20,
					minlength: 6,
					pattern: /[A-Za-z0-9\-_!@#$%^&]+/
				},
				passwordConfirm: {
					required: true,
					maxlength: 20,
					minlength: 6,
					equalTo: '#user-resetPasswordWindow-password'
				}
			},
			messages: {
				password: {
					required: '请输入密码',
					maxlength: '密码长度为6到20位',
					minlength: '密码长度为6到20位',
					pattern: '密码格式不正确'
				},
				passwordConfirm: {
					required: '请再次输入密码',
					maxlength: '密码长度为6到20位',
					minlength: '密码长度为6到20位',
					equalTo: '密码输入不一致'
				}
			}
		});
	}
};
