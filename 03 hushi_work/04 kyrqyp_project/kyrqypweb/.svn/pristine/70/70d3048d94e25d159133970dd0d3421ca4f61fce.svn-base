app.roleFunction.save = {
	init: function() {
		app.roleFunction.save.initForm();
	},
	initForm: function() {
		$m('#form-roleFunction-save').validate({
			submitHandler: function(form) {
				var formData = $m(form).serializeObject();
				var functionCode = [];
				var appId = [];
				$("#form-roleFunction-save input[name='functionCode']:checkbox:checked").each(function() {
					functionCode.push($(this).data('code'));
					appId.push($(this).data('appid'));
				});

				var data = {
					roleCode: formData.roleCode,
					functionCode: functionCode,
					appId: appId
				}
				app.api.roleFunction.save({
					data: data,
					success: function(result) {
						$m.message('保存成功');

					},
					error: app.api.error
				});
			},
			rules: {
				roleCode: {
					required: true
				}
			},
			messages: {
				roleCode: {
					required: "请选择角色"
				}
			}
		});
	},
	initData: function(roleCode) {
		var query = {
			pageSize: 200,
			pageNum: 0,
			roleCode: roleCode
		};
		app.api.roleFunction.search({
			data: query,
			success: function(result) {
				var data = {};
				data.roleCode = roleCode;
				var functionCode = [];
				for (var i = 0; i < result.datas.length; i++) {
					var code = result.datas[i].functionCode + '-' + result.datas[i].appId
					functionCode.push(code);
				}
				data.functionCode = functionCode;
				$m('#form-roleFunction-save').reset();
				$m('#form-roleFunction-save').setFormValues(data);
			}
		});
	}
}
