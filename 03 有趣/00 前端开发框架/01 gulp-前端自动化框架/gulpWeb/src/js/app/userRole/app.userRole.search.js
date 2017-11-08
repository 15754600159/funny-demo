app.userRole.search = {
	departmentNameMap: {},
	init: function() {
		app.userRole.search.initDepartmentSelect();
		app.userRole.search.initSearchForm();
		app.userRole.search.initListRole();
		app.userRole.save.init();
	},
	initSearchForm: function() {
		$m('#form-userRole-searchUser').validate({
			submitHandler: function(form) {
				app.userRole.search.listPager.query = $m(form).serializeObject();
				app.userRole.search.listPager.pageNum = 0;
				app.userRole.search.listPager.refresh();
			}
		});
	},
	initListPager: function() {
		app.userRole.search.listPager = $m.listPager({
			varName: 'app.userRole.search.listPager',
			itemId: 'user-role-userList',
			columns: [{
				name: 'userId',
				label: '',
				headStyle: 'width:30px;',
				dataRender: function(data, column) {
					return '<td><label class="check check-nolabel"><input type="checkbox"><span></span></label></td>';
				}
			}, {
				name: 'name',
				label: '姓名',
				sortable: true,
				headStyle: 'width:61px;',
				dataRender: function(data, column) {
					return '<td>' + data.name + '<input type="hidden" value="' + data.userId + '"></td>';
				}
			}, {
				name: 'idNo',
				label: '身份证号',
				sortable: true,
				headStyle: 'width:82px;',
			}, {
				name: 'policeRankCode',
				label: '警衔',
				sortable: true,
				headStyle: 'width:84px;',
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
				headStyle: 'width:61px;',
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
						department = app.userRole.search.departmentNameMap[data.departmentCode];
					}
					return '<td>' + department + '</td>';
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
		app.userRole.search.listPager.refresh();

		$('#user-role-userList').on('click', 'tr', app.userRole.search.searchRole);
	},
	searchRole: function(e, that) {
		var item;
		if (that) {
			item = that;
		} else {
			item = this;
		}
		var userId = $(item).find('input')[1].value;
		$("#user-role-userList :checkbox").prop("checked", false);
		$("#user-role-userList tbody").find("tr").css('background-color', '#fff').find('td').css('color', '#000');
		$(this).css('background-color', '#01458e').find('td').css('color', '#fff');
		$(':checkbox', this).prop('checked', true);
		app.userRole.save.initData(userId);
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
				app.userRole.search.departmentNameMap = nameMap;
				app.select.init('#userRole-search-departmentCode', nameMap, {
					label: '请选择工作单位',
					value: ''
				});
				app.userRole.search.initListPager();
			}
		});
	},
	initListRole: function() {
		app.userRole.search.listRolePager = $m.listPager({
			varName: 'app.userRole.search.listRolePager',
			itemId: 'user-role-roleList',
			hideToolbar: true,
			hidePageSize: true,
			pageSize: 1000,
			columns: [{
				name: 'code',
				label: '<label class="check check-nolabel"><input type="checkbox" onchange="app.userRole.search.selectAll(this);"><span></span></label>',
				headStyle: 'width:30px;',
				dataRender: function(data, column) {
					return '<td><label class="check check-nolabel"><input type="checkbox" name="roleCode" value="' + data.code +
						'"><span></span></label></td>';
				}
			}, {
				name: 'name',
				label: '名称',
				sortable: true,
				dataRender: function(data, column) {
					return '<td>' + data.name + '</td>';
				}
			}],
			dataProvider: function(listRolePager, callback) {
				var query = listRolePager.query || {};
				query.pageSize = listRolePager.pageSize;
				query.pageNum = listRolePager.pageNum;
				if (listRolePager.orderBy) {
					query.orderBy = listRolePager.orderBy;
					query.sort = listRolePager.asc ? 'asc' : 'desc';
				}
				app.api.role.search({
					data: query,
					success: function(result) {
						callback(result.totalNum, result.datas);
					}
				});
			}
		});
		app.userRole.search.listRolePager.refresh();
	},
	selectAll: function(check) {
		console.log(check.checked);
		if (check.checked) {
			$("#user-role-roleList :checkbox").prop("checked", true);
		} else {
			$("#user-role-roleList :checkbox").prop("checked", false);
		}
	}
};
