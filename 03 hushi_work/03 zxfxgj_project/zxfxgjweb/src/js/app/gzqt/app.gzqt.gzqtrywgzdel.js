app.gzqt.gzqtrywgzdel = {
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
				app.api.gzqt.gzqtrywgzdel({
					data: {
						ids: idss
					},
					success: function(result) {
						console.info(result);
						if (result.success == 1) {
							app.alert("删除成功");

						} else {
							app.alert("删除失败")
						}
						app.gzqt.gzqtrywgzSearch.initSearchForm(0, 10, app.gzqt.gzqtrywgzSearch.pagination);

					}
				});
				layer.close(index);
			});
		}

	},

	delone: function(idss) {
		console.log('idss:' + idss);
		//	var idss = '';
		layer.confirm('您确定要删除吗？', {
			btn: ['确定', '取消'],
			title: '删除'
		}, function(index) {
			//	idss = ids.join();
			console.info(typeof(idss));
			app.api.gzqt.gzqtrywgzdel({
				data: {
					ids: idss
				},
				success: function(result) {
					console.info(result);
					if (result.success == 1) {
						app.alert("删除成功");

					} else {
						app.alert("删除失败")
					}
					app.gzqt.gzqtrywgzSearch.initSearchForm(0, 10, app.gzqt.gzqtrywgzSearch.pagination);

				}
			});
			layer.close(index);
		});

	}
};
