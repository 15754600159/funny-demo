app.user.search = {
	departmentNameMap: {},
	init: function() {
		app.user.search.initDepartmentSelect();
		app.user.search.initSearchForm();
	},
	initSearchForm: function() {
		$m('#form-user-search').validate({
			submitHandler: function(form) {
				app.user.search.listPager.query = $m(form).serializeObject();
				app.user.search.listPager.pageNum = 0;
				app.user.search.listPager.refresh();
			}
		});
	},
	initListPager: function() {
		app.user.search.listPager = $m.listPager({
			varName: 'app.user.search.listPager',
			itemId: 'list-user',
			columns: [{
				name: 'name',
				label: '姓名',
				sortable: true,
			}, {
				name: 'idNo',
				label: '身份证号',
				sortable: true
			}, {
				name: 'genderCode',
				label: '性别',
				sortable: true,
				dataRender: function(data, column) {
					var gender = '';
					if (data.genderCode) {
						gender = app.constants.genderCode.nameMap[data.genderCode];
					}
					return '<td>' + gender + '</td>';
				}
			}, {
				name: 'nativePlaceCode',
				label: '籍贯',
				sortable: true,
				dataRender: function(data, column) {
					var nativePlace = '';
					if (data.nativePlaceCode) {
						nativePlace = app.constants.originCode.nameMap[data.nativePlaceCode];
					}
					return '<td>' + nativePlace + '</td>';
				}
			}, {
				name: 'nationCode',
				label: '民族',
				sortable: true,
				dataRender: function(data, column) {
					var nation = '';
					if (data.nationCode) {
						nation = app.constants.nationCode.nameMap[data.nationCode];
					}
					return '<td>' + nation + '</td>';
				}
			}, {
				name: 'policeRankCode',
				label: '警衔',
				sortable: true,
				dataRender: function(data, column) {
					var policeRank = '';
					if (data.policeRankCode) {
						policeRank = app.constants.policeRankCode.nameMap[data.policeRankCode];
					}
					return '<td>' + policeRank + '</td>';
				}
			}, {
				name: 'positionCode',
				label: '职务',
				sortable: true,
				dataRender: function(data, column) {
					var position = '';
					if (data.positionCode) {
						position = app.constants.positionCode.nameMap[data.positionCode];
					}
					return '<td>' + position + '</td>';
				}
			}, {
				name: 'departmentCode',
				label: '工作单位',
				sortable: true,
				dataRender: function(data, column) {
					var department = '';
					if (data.departmentCode) {
						department = app.user.search.departmentNameMap[data.departmentCode];
					}
					return '<td>' + department + '</td>';
				}
			}, {
				name: 'id',
				label: '操作',
				headStyle: 'width:226px;text-align:center',
				dataRender: function(data, column) {
					var updatePassword = '<a class="btn btn-small" onclick="javascript:app.user.search.openResetPassword(\'' +
						data.userId +
						'\');">重置密码</a>';
					var updateBtn = '<a class="btn btn-small" onclick="javascript:app.user.toUpdatePage(\'' + data.userId +
						'\');">修改</a>';
					var delBtn = '<a class="btn btn-small" href="javascript:void(0);" onclick="javascript:app.user.del(\'' +
						data.userId + '\');">删除</a>';
					var statusBtn = '';
					if (data.status == app.constants.userStatus.keyMap['可用']) {
						statusBtn = '<a class="btn btn-small" onclick="javascript:app.user.disable(\'' + data.userId +
							'\');">禁用</a>';
					} else if (data.status == app.constants.userStatus.keyMap['禁用']) {
						statusBtn = '<a class="btn btn-small" onclick="javascript:app.user.enable(\'' + data.userId +
							'\');">激活</a>';
					}
					return '<td style="text-align:center">' + updatePassword + statusBtn + updateBtn + delBtn + '</td>';
				}
			}],
			dataProvider: function(listPager, callback) {
				var query = listPager.query || {};
				query.pageSize = listPager.pageSize;
				query.pageNum = listPager.pageNum;
				query.status = [app.constants.userStatus.keyMap['可用'], app.constants.userStatus.keyMap['禁用']];
				if (listPager.orderBy) {
					query.orderBy = listPager.orderBy;
					query.sort = listPager.asc ? 'asc' : 'desc';
				}
				app.api.user.search({
					data: query,
					success: function(result) {
						callback(result.totalNum, result.datas);
					}
				});
			}
		});
		app.user.search.listPager.refresh();
	},
	initDepartmentSelect: function() {
		var query = {
			pageSize: 1000,
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
				app.user.search.departmentNameMap = nameMap;
				app.select.init('#user-search-departmentCode', nameMap, {
					label: '请选择工作单位',
					value: ''
				});
				app.user.search.initListPager();
			}
		});
	},
	openResetPassword: function(userId) {
		app.user.resetPasswordWindow.id = userId;
		app.user.resetPasswordWindow.open();
	}
};
