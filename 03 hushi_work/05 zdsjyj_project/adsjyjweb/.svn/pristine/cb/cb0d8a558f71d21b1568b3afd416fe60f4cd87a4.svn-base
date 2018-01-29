app.appApiFunction.save = {
	init: function() {
		app.appApiFunction.save.initForm();
	},
	initForm: function() {
		$m('#form-appApiFunction-save').validate({
			submitHandler: function(form) {
				var formData = $m(form).serializeObject();
				var apiFunctionName = [];
				if (Object.prototype.toString.call(formData.apiFunctionName) !== '[object Array]') {
					apiFunctionName.push(formData.apiFunctionName);
				} else {
					apiFunctionName = formData.apiFunctionName;
				}
				var data = {
					appId: formData.appId,
					apiFunctionName: apiFunctionName
				}
				app.api.appApiFunction.save({
					data: data,
					success: function(result) {
						$m.message('保存成功');

					},
					error: app.api.error
				});
			},
			rules: {
				appId: {
					required: true
				}
			},
			messages: {
				appId: {
					required: "请选择应用"
				}
			}
		});
	},
	initData: function(appId) {
		var query = {
			pageSize: 200,
			pageNum: 0,
			appId: appId
		};
		app.api.appApiFunction.search({
			data: query,
			success: function(result) {
				var data = {};
				data.appId = appId;
				var apiFunctionName = [];
				for (var i = 0; i < result.datas.length; i++) {
					apiFunctionName.push(result.datas[i].apiFunctionName);
				}
				data.apiFunctionName = apiFunctionName;
				$m('#form-appApiFunction-save').reset();
				$m('#form-appApiFunction-save').setFormValues(data);
			}
		});
	}
}
