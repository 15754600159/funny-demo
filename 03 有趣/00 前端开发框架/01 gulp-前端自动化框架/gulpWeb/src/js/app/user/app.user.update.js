app.user.update = {
	id: null,
	init: function() {
		app.user.update.initData();
	},
	initData: function() {
		app.select.init('#user-update-genderCode', app.constants.genderCode.nameMap, {
			label: '请选择性别',
			value: ''
		});
		app.select.init('#user-update-nativePlaceCode', app.constants.originCode.nameMap, {
			label: '请选择籍贯',
			value: ''
		});
		app.select.init('#user-update-nationCode', app.constants.nationCode.nameMap, {
			label: '请选择民族',
			value: ''
		});
		app.select.init('#user-update-politicsStatus', app.constants.politicsStatus.nameMap, {
			label: '请选择政治面貌',
			value: ''
		});
		app.select.init('#user-update-policeRankCode', app.constants.policeRankCode.nameMap, {
			label: '请选择警衔',
			value: ''
		});
		app.select.init('#user-update-positionCode', app.constants.positionCode.nameMap, {
			label: '请选择职务',
			value: ''
		});
		app.api.user.view({
			data: {
				id: app.user.update.id
			},
			success: function(result) {
				$m('#form-user-update').setFormValues(result.userInfo);
				app.user.update.initDepartmentSelect(result.userInfo.departmentCode);
				app.user.update.initFormDate(result.userInfo);
				app.user.update.initForm();
			},
			error: app.api.error
		});
	},
	initForm: function() {
		$m('#form-user-update').validate({
			submitHandler: function(form) {
				var data = $m(form).serializeObject();

				app.api.user.update({
					data: data,
					success: function(result) {
						$m.message('保存成功');
						app.user.toSearchPage();
					},
					error: app.api.error
				});
			},
			rules: {
				name: {
					required: true
				},
				idNo: {
					required: true,
					pattern: /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/
				}
			},
			messages: {
				name: {
					required: "请输入姓名",
				},
				idNo: {
					required: "请输入身份证号",
					pattern: "身份证号输入不正确"
				}
			}
		});
	},
	initDepartmentSelect: function(departmentCode) {
		var query = {
			pageSize: 200,
			pageNum: 0
		};
		app.api.department.search({
			data: query,
			success: function(result) {
				var nameMap = {};
				var i;
				for (i = 0; i < result.datas.length; i++) {
					nameMap[result.datas[i].code] = result.datas[i].name;
				}
				app.select.init('#user-update-departmentCode', nameMap, {
					label: '请选择工作单位',
					value: ''
				});
				if (departmentCode) {
					$('#user-update-departmentCode').val(departmentCode);
				}
			}
		});
	},
	initFormDate: function(data) {
		//生日
		var pattern = 'yyyy-MM-dd';
		var now = $m.date.toString(new Date(), pattern)

		var picker = $m.datePicker({
			elementId: 'user-update-birthday-input',
			format: 'yyyy-MM-dd',
			value: data.birthday,
			limit: {
				startDate: null,
				endDate: now
			},
			callback: function(date) {
				$('#user-update-birthday').val(date);
			}
		});
		// 授衔日期
		var picker = $m.datePicker({
			elementId: 'user-update-rankDate-input',
			format: 'yyyy-MM-dd',
			value: data.rankDate,
			limit: {
				startDate: null,
				endDate: now
			},
			callback: function(date) {
				$('#user-update-rankDate').val(date);
			}
		});
		// 批准任职日期
		var picker = $m.datePicker({
			elementId: 'user-update-positionDate-input',
			format: 'yyyy-MM-dd',
			value: data.positionDate,
			limit: {
				startDate: null,
				endDate: now
			},
			callback: function(date) {
				$('#user-update-positionDate').val(date);
			}
		});
		// 参加工作时间
		var picker = $m.datePicker({
			elementId: 'user-update-workStartDate-input',
			format: 'yyyy-MM-dd',
			value: data.workStartDate,
			limit: {
				startDate: null,
				endDate: now
			},
			callback: function(date) {
				$('#user-update-workStartDate').val(date);
			}
		});
		// 参加警务工作时间
		var picker = $m.datePicker({
			elementId: 'user-update-policeStartDate-input',
			format: 'yyyy-MM-dd',
			value: data.policeStartDate,
			limit: {
				startDate: null,
				endDate: now
			},
			callback: function(date) {
				$('#user-update-policeStartDate').val(date);
			}
		});
	}
};
