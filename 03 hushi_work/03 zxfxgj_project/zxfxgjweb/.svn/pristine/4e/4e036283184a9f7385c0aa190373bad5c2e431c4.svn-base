app.gzqt = {
	//	idss: '',
	init: function() {
		app.time.init();
	},
	/**
	 * 	
	 * 跳转到新增页面
	 */
	toAddPage: function() {
		$m.page.openPage({
			url: 'pages/gzqt/gzqtaddWindow.html',
			container: 'container-wrapper',
			effect: 'fade'
		});
	},
	/**
	 * 跳转到查询页面
	 */
	toSearchPage: function() {
		$m.page.loadPage({
			url: 'pages/gzqt/gzqtgl.html',
			container: 'container-wrapper',
			effect: 'fade'
		});
	},

	/**
	 * 跳转到编辑页面
	 */
	toUpdatePage: function(id) {

		// console.log($(that).data('cont'));
		// var obj = JSON.parse($(that).data('cont'));
		// console.log(obj);
		app.gzqt.update.id = id;
		//app.gzqt.update.obj = obj;
		console.log(id);
		$m.page.openPage({
			url: 'pages/gzqt/gzqtupdate.html',
			container: 'container-wrapper',
			effect: 'fade'
		});

	},

	/**
	 * 跳转到查看页面
	 */
	toViewPage: function(id) {

		app.gzqt.view.id = id;
		//app.gzqt.update.obj = obj;
		console.log(id);
		$m.page.openPage({
			url: 'pages/gzqt/gzqtview.html',
			container: 'container-wrapper',
			effect: 'fade'
		});

	},
	/**
	 * 跳转到关联重点人查看页面
	 */
	toglzdrViewPage: function(qtbh) {
		app.gzqt.glzdrSearch.qtbh = qtbh;
		$m.page.openPage({
			url: 'pages/gzqt/glzdrview.html',
			container: 'container-wrapper',
			effect: 'fade'
		});

	},

	/**
	 * 跳转到是否形成新群体查看页面
	 */
	toxcxqtViewPage: function(qtbh) {
		app.gzqt.xcxqtSearch.qtbh = qtbh;
		$m.page.openPage({
			url: 'pages/gzqt/xcxqtview.html',
			container: 'container-wrapper',
			effect: 'fade'
		});

	},
	/**
	 * 跳转到轨迹预警查看页面
	 */
	togjyjViewPage: function(qtbh) {
		app.gzqt.gjyjSearch.qtbh = qtbh;
		$m.page.openPage({
			url: 'pages/gzqt/qtgjyjview.html',
			container: 'container-wrapper',
			effect: 'fade'
		});

	},
	/**
	 * 跳转到人员显示页面
	 */
	toqtryglViewPage: function(qtbh) {
		app.gzqt.gzqtrySearch.qtbh = qtbh;
		$m.page.openPage({
			url: 'pages/gzqt/gzqtrygl.html',
			container: 'container-wrapper',
			effect: 'fade'
		});
		// window.open("pages/gzqt/gzqtrygl.html");

	},
	/**
	 * 跳转到人员查看页面
	 */
	toqtryViewPage: function(id) {
		app.gzqt.gzqtryview.id = id;
		$m.page.openPage({
			url: 'pages/gzqt/gzqtryview.html',
			container: 'container-wrapper',
			effect: 'fade'
		});

	},
	/**
	 * 跳转到人员添加页面
	 */
	toqtryAddPage: function(qtbh) {
		app.gzqt.gzqtryadd.qtbh = qtbh;
		$m.page.openPage({
			url: 'pages/gzqt/gzqtryaddWindow.html',
			container: 'container-wrapper',
			effect: 'fade'
		});

	},
	/**
	 * 跳转到人员修改页面
	 */
	toqtryUpdatePage: function(id) {
		app.gzqt.gzqtryupdate.id = id;
		$m.page.openPage({
			url: 'pages/gzqt/gzqtryupdate.html',
			container: 'container-wrapper',
			effect: 'fade'
		});

	},
	/**
	 * 跳转到未关注人员显示页面
	 */
	toqtrywgzglViewPage: function(qtbh) {
		console.log('qtbh:' + qtbh);
		app.gzqt.gzqtrywgzSearch.qtbh = qtbh;
		$m.page.openPage({
			url: 'pages/gzqt/gzqtwgzrygl.html',
			container: 'container-wrapper',
			effect: 'fade'
		});

	},
	/**
	 * 跳转到未关注人员添加页面
	 */
	toqtrywgzAddPage: function(qtbh) {
		app.gzqt.gzqtrywgzadd.qtbh = qtbh;
		$m.page.openPage({
			url: 'pages/gzqt/gzqtrywgzaddWindow.html',
			container: 'container-wrapper',
			effect: 'fade'
		});

	},
	/**
	 * 跳转到非关注人员查看页面
	 */
	toqtrywgzViewPage: function(id) {
		app.gzqt.gzqtrywgzview.id = id;
		$m.page.openPage({
			url: 'pages/gzqt/gzqtrywgzview.html',
			container: 'container-wrapper',
			effect: 'fade'
		});

	},

	/**
	 * 跳转到未关注人员修改页面
	 */
	toqtrywgzUpdatePage: function(id) {
		app.gzqt.gzqtrywgzupdate.id = id;
		$m.page.openPage({
			url: 'pages/gzqt/gzqtrywgzupdate.html',
			container: 'container-wrapper',
			effect: 'fade'
		});

	},

	/**
	 * 跳转到群体预警页面
	 */
	// toqtyjview: function(id) {
	// 	$m.page.openPage({
	// 		url: 'pages/gzqt/qtyjxx.html',
	// 		container: 'container-wrapper',
	// 		effect: 'fade'
	// 	});

	// },

	del: function() {
		var checklist = $("input[type='checkbox']");
		var ids = [];
		var idss = '';
		for (var i = 0; i < checklist.length; i++) {
			var checkif = $(checklist[i]).prop('checked');
			if (checkif) {
				ids.push($(checklist[i]).val());
			}
		};
		if (ids == '') {
			layer.alert('请选择需要删除的列表');
		} else {
			layer.confirm('您确定要删除吗？', {
				btn: ['确定', '取消'],
				title: '删除'
			}, function(index) {
				idss = ids.join();
				console.info(typeof(idss))
				app.api.gzqt.del({
					data: {
						ids: idss
					},
					success: function(result) {
						console.info(result);
						if (result.success == 1) {
							app.alert("删除成功");
							app.gzqt.search.initSearchForm(1, 10, app.gzqt.search.pagination);
						} else {
							app.alert("删除失败")
						}

					}
				});
				layer.close(index);
			});
		}

	},

	delone: function(idss) {
		//	var idss = '';

		layer.confirm('您确定要删除吗？', {
			btn: ['确定', '取消'],
			title: '删除'
		}, function(index) {
			//	idss = ids.join();
			console.info(typeof(idss));
			app.api.gzqt.del({
				data: {
					ids: idss
				},
				success: function(result) {
					console.info(result);
					if (result.success == 1) {
						app.alert("删除成功")
					} else {
						app.alert("删除失败")
					}
					app.gzqt.search.initSearchForm(1, 10, app.gzqt.search.pagination);
				}
			});
			layer.close(index);
		});

	}

};
