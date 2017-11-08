app.func.add = {
	init: function() {
		app.func.add.initForm();
	},
	initForm: function() {
		app.func.add.initAppSelect();
		app.func.add.initParentCodeSelect();
		$m('#form-func-add').validate({
			submitHandler: function(form) {
				var data = $m(form).serializeObject();

				app.api.func.add({
					data: data,
					success: function(result) {
						$m.message('保存成功');
						app.func.toSearchPage();
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
	initAppSelect: function() {
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
				app.select.init('#func-add-appId', nameMap, {
					label: '请选择应用',
					value: ''
				});
			}
		});
	},
	initParentCodeSelect: function() {
		var query = {
			pageSize: 200,
			pageNum: 0
		};
		app.api.func.search({
			data: query,
			success: function(result) {
				var nameMap = {};
				var i;
				for (i = 0; i < result.datas.length; i++) {
					nameMap[result.datas[i].code] = result.datas[i].name;
				}
				app.select.init('#func-add-parentCode', nameMap, {
					label: '请选择父级代码',
					value: ''
				});
			}
		});
	},
	changeApp: function() {
		var query = {
			pageSize: 200,
			pageNum: 0,
			appId: $('#func-add-appId').val()
		};
		app.api.func.search({
			data: query,
			success: function(result) {
				var nameMap = {};
				var i;
				for (i = 0; i < result.datas.length; i++) {
					nameMap[result.datas[i].code] = result.datas[i].name;
				}
				app.select.init('#func-add-parentCode', nameMap, {
					label: '请选择父级代码',
					value: ''
				});
			}
		});
	}
};
