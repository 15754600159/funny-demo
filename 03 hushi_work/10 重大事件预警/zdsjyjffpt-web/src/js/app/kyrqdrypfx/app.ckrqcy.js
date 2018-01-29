app.ckrqcy = {
	// 多条信息删除
	deleteMutiple: function() {
		var idsArray = [],
			ids = '';

		$('#list-ckrqcy .table_all input[type="checkbox"]:checked').each(function() {
			idsArray.push($(this).val());
		});
		ids = idsArray.join(',');

		layer.confirm('您确定要删除这些信息吗？', {
			btn: ['确定', '取消'],
			title: '删除'
		}, function(index) {
			$.ajax({
				url: app.api.kyrqdrypfx.kyryScUrl + '?ids=' + ids,
				type: "delete",
				success: function(response) {
					// console.log(response);
					if (response.success === 1) {
						app.alert('可疑人员删除成功！');
						app.ckrqcy.search.SearchInfo(1, 10); // 初始查询
					} else {
						app.alert('可疑人员删除失败！');
					}
				},
				error: function(e) {
					console.log('可疑人员删除出错！');
				}
			});

			layer.close(index);
		});
	},
};
