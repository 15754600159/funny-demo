app.user.add = {
	init: function() {
		app.user.add.initForm();
	},
	initForm: function() {
		app.user.add.initFormDate();
		//		app.user.add.initDepartmentSelect();
		//		app.select.init('#user-add-genderCode', app.constants.genderCode.nameMap, {
		//			label: '请选择性别',
		//			value: ''
		//		});
		//		app.select.init('#user-add-nativePlaceCode', app.constants.originCode.nameMap, {
		//			label: '请选择籍贯',
		//			value: ''
		//		});
		//		app.select.init('#user-add-nationCode', app.constants.nationCode.nameMap, {
		//			label: '请选择民族',
		//			value: ''
		//		});
		//		app.select.init('#user-add-politicsStatus', app.constants.politicsStatus.nameMap, {
		//			label: '请选择政治面貌',
		//			value: ''
		//		});
		//		app.select.init('#user-add-policeRankCode', app.constants.policeRankCode.nameMap, {
		//			label: '请选择警衔',
		//			value: ''
		//		});
		//		app.select.init('#user-add-positionCode', app.constants.positionCode.nameMap, {
		//			label: '请选择职务',
		//			value: ''
		//		});
		//		$m('#form-user-add').validate({
		//			submitHandler: function(form) {
		//				var formdata = $m(form).serializeObject();
		//
		//				var data = {
		//					user: {
		//						username: formdata.idNo,
		//						password: '',
		//					},
		//					userInfo: formdata
		//				};
		//
		//				app.api.user.add({
		//					data: data,
		//					success: function(result) {
		//						$m.message('保存成功');
		//						app.user.toSearchPage();
		//					},
		//					error: app.api.error
		//				});
		//			},
		//			rules: {
		//				name: {
		//					required: true
		//				},
		//				idNo: {
		//					required: true,
		//					pattern: /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/
		//				}
		//			},
		//			messages: {
		//				name: {
		//					required: "请输入姓名",
		//				},
		//				idNo: {
		//					required: "请输入身份证号",
		//					pattern: "身份证号输入不正确"
		//				}
		//			}
		//		});
	},
	initDepartmentSelect: function() {
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
				app.select.init('#user-add-departmentCode', nameMap, {
					label: '请选择工作单位',
					value: ''
				});
			}
		});
	},
	initFormDate: function() {
		//生日
		var pattern = 'yyyy-MM-dd';
		var now = $m.date.toString(new Date(), pattern)

		var picker = $m.datePicker({
			elementId: 'zxrygl-search-cjsj-input',
			format: 'yyyy-MM-dd',
			value: null,
			limit: {
				startDate: null,
				endDate: now
			},
			callback: function(date) {
				$('#user-add-birthday').val(date);
			}
		});
		// 授衔日期
		var picker = $m.datePicker({
			elementId: 'user-add-rankDate-input',
			format: 'yyyy-MM-dd',
			value: null,
			limit: {
				startDate: null,
				endDate: now
			},
			callback: function(date) {
				$('#user-add-rankDate').val(date);
			}
		});
		// 批准任职日期
		var picker = $m.datePicker({
			elementId: 'user-add-positionDate-input',
			format: 'yyyy-MM-dd',
			value: null,
			limit: {
				startDate: null,
				endDate: now
			},
			callback: function(date) {
				$('#user-add-positionDate').val(date);
			}
		});
		// 参加工作时间
		var picker = $m.datePicker({
			elementId: 'user-add-workStartDate-input',
			format: 'yyyy-MM-dd',
			value: null,
			limit: {
				startDate: null,
				endDate: now
			},
			callback: function(date) {
				$('#user-add-workStartDate').val(date);
			}
		});
		// 参加警务工作时间
		var picker = $m.datePicker({
			elementId: 'user-add-policeStartDate-input',
			format: 'yyyy-MM-dd',
			value: null,
			limit: {
				startDate: null,
				endDate: now
			},
			callback: function(date) {
				$('#user-add-policeStartDate').val(date);
			}
		});
	}
};
