app.func.update = {
	id: null,
	init: function() {
		app.func.update.initData();
	},
	initData: function() {
		app.api.func.view({
			data: {
				id: app.func.update.id
			},
			success: function(result) {
				$m('#form-func-update').setFormValues(result);
				app.func.update.initAppSelect(result.appId);
				$('#func-update-code').val(result.code);
				app.func.update.initParentCodeSelect(result);
				app.func.update.initForm();
			},
			error: app.api.error
		});
	},
	initForm: function() {
		$m('#form-func-update').validate({
			submitHandler: function(form) {
				var data = $m(form).serializeObject();

				app.api.func.update({
					data: data,
					success: function(result) {
						app.func.toSearchPage();
						$m.message('保存成功');
					},
					error: app.api.error
				});
			},
			rules: {
				name: {
					required: true,
					maxlength: 60
				},
				appId: {
					required: true,
				},
				code: {
					required: true,
					maxlength: 60
				}
			},
			messages: {
				name: {
					required: "请输入名称",
					maxlength: '名称长度不能超过20个汉字'
				},
				appId: {
					required: "请选择应用",
				},
				code: {
					required: '请输入代码',
					maxlength: '代码长度不能超过60个字符'
				}
			}
		});
	},
	initAppSelect: function(value) {
		var query = {
			pageSize: 200,
			pageNum: 0
		};
		app.api.application.search({
			data: query,
			success: function(result) {
				var nameMap = {};
				var i;
				for (i = 0; i < result.datas.length; i++) {
					nameMap[result.datas[i].appId] = result.datas[i].name;
				}
				app.select.init('#func-update-appId', nameMap, {
					label: '请选择应用',
					value: ''
				});
				if (value) {
					$('#func-update-appId').val(value);
				}
			}
		});
	},
	initParentCodeSelect: function(data) {
		var parentCode = data.parentCode;
		var code = data.code;
		var query = {
			pageSize: 200,
			pageNum: 0,
			appId: data.appId
		};
		app.api.func.search({
			data: query,
			success: function(result) {
				var nameMap = {};
				var i;
				for (i = 0; i < result.datas.length; i++) {
					if (result.datas[i].code != code && result.datas[i].parentCode != code) {
						nameMap[result.datas[i].code] = result.datas[i].name;
					}
				}
				app.select.init('#func-update-parentCode', nameMap, {
					label: '请选择父级代码',
					value: ''
				});
				if (value) {
					$('#func-update-parentCode').val(value);
				}
			}
		});
	},
	changeApp: function() {
		var query = {
			pageSize: 200,
			pageNum: 0,
			appId: $('#func-update-appId').val()
		};
		app.api.func.search({
			data: query,
			success: function(result) {
				var nameMap = {};
				var i;
				var code = $('#func-update-code').val();
				for (i = 0; i < result.datas.length; i++) {
					if (result.datas[i].code != code && result.datas[i].parentCode != code) {
						nameMap[result.datas[i].code] = result.datas[i].name;
					}
				}
				app.select.init('#func-update-parentCode', nameMap, {
					label: '请选择父级代码',
					value: ''
				});
			}
		});
	}
};
