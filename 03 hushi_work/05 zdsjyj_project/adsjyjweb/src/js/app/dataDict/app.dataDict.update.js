app.dataDict.update = {
	id: null,
	init: function() {
		app.dataDict.update.initData();
	},
	initData: function() {
		app.api.dataDict.view({
			data: {
				id: app.dataDict.update.id
			},
			success: function(result) {
				app.select.init('#dataDict-update-type', app.constants.dataDictType.nameMap, {
					label: '请选择数据字典类型',
					value: ''
				});
				$m('#form-dataDict-update').setFormValues(result);
				app.dataDict.update.initForm();
			},
			error: app.api.error
		});
	},
	initForm: function() {
		$m('#form-dataDict-update').validate({
			submitHandler: function(form) {
				var data = $m(form).serializeObject();

				app.api.dataDict.update({
					data: data,
					success: function(result) {
						$m.message('保存成功');
						app.dataDict.toSearchPage();
					},
					error: app.api.error
				});
			},
			rules: {
				name: {
					required: true,
					maxlength: 60
				},
				code: {
					required: true,
					maxlength: 30
				}
			},
			messages: {
				name: {
					required: "请输入名称",
					maxlength: '名称长度不能超过20个汉字'
				},
				code: {
					required: '请输入代码',
					maxlength: '代码长度不能超过30个字符'
				}
			}
		});
	}
};
