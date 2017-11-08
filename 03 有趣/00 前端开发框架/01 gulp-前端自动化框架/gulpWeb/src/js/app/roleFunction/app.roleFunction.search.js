app.roleFunction.search = {
	appMap: null,
	init: function() {
		app.roleFunction.search.initListPager();
		app.roleFunction.search.initListFunction();
		app.roleFunction.save.init();
	},
	initListPager: function() {
		app.roleFunction.search.listRolePager = $m.listPager({
			varName: 'app.roleFunction.search.listRolePager',
			itemId: 'role-function-roleList',
			hideToolbar: true,
			hidePageSize: true,
			pageSize: 1000,
			columns: [{
				name: 'code',
				label: '',
				headStyle: 'width:30px;',
				dataRender: function(data, column) {
					return '<td><label class="check check-nolabel"><input type="checkbox" value="' + data.code +
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
		app.roleFunction.search.listRolePager.refresh();

		$('#role-function-roleList').on('click', 'tr', app.roleFunction.search.searchFunction);
	},
	searchFunction: function(e, that) {
		var item;
		if (that) {
			item = that;
		} else {
			item = this;
		}
		var roleCode = $(item).find('input')[0].value;
		console.log(roleCode);
		$("#role-function-roleList :checkbox").prop("checked", false);
		$("#role-function-roleList tbody").find("tr").css('background-color', '#fff').find('td').css('color', '#000');
		$(this).css('background-color', '#01458e').find('td').css('color', '#fff');

		$(':checkbox', this).prop('checked', true);
		app.roleFunction.save.initData(roleCode);
	},

	initListFunction: function() {
		var query = {
			pageSize: 500,
			pageNum: 0
		};
		app.api.func.search({
			data: query,
			success: function(result) {
				if (result.datas.length > 0) {
					$('#role-function-functionList-empty').hide();
				} else {
					$('#role-function-functionList-tree').hide();
					$('#rrole-function-functionList-button').hide();
				}
				var appMap = {};
				var codeMap = {};
				var i;
				for (i = 0; i < result.datas.length; i++) {
					if (!appMap[result.datas[i].appId]) {
						appMap[result.datas[i].appId] = {};
					}
					var parentCode = result.datas[i].parentCode;
					if (!parentCode) {
						parentCode = result.datas[i].appId;
					}
					console.log(parentCode);
					var node = {
						"name": result.datas[i].name,
						"code": result.datas[i].code,
						"appId": result.datas[i].appId,
						"icon": "",
						"parentCode": parentCode,
						"child": []
					};
					// 应用ID下的 父CODE
					if (!appMap[result.datas[i].appId][parentCode]) {
						appMap[result.datas[i].appId][parentCode] = [];
					}
					appMap[result.datas[i].appId][parentCode].push(node);
				}
				app.roleFunction.search.appMap = appMap;
				app.roleFunction.search.initFunctionTree();
			}
		});
	},
	initFunctionTree: function() {
		var query = {
			pageSize: 200,
			pageNum: 0
		};
		app.api.application.search({
			data: query,
			success: function(result) {
				var appMap = app.roleFunction.search.appMap;
				var treeData = [];
				for (i = 0; i < result.datas.length; i++) {
					var child = [];
					if (appMap[result.datas[i].appId]) {
						var appfuncSet = appMap[result.datas[i].appId];
						child = app.roleFunction.search.formatData(appfuncSet, result.datas[i].appId);
					}
					console.log(child);
					var rootData = {
						"name": result.datas[i].name,
						"code": result.datas[i].appId,
						"icon": "icon-tree-root",
						"child": child
					}
					treeData.push(rootData);
					console.log(treeData);
				}
				app.tree.init(treeData, 'role-function-functionList');
			}
		});
	},
	formatData: function(appParentMap, parentId) {
		var child = appParentMap[parentId];
		for (var i = 0; i < child.length; i++) {
			var node = child[i];
			if (appParentMap[child[i].code]) {
				child[i].child = app.roleFunction.search.formatData(appParentMap, child[i].code);
			}
		}
		return child;
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
