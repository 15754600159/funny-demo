app.qbxsfx.qbljx.search = {
	url: 'pages/qbxsfx/qbljx/index.html',
	pageContainer: '.qbljx',
	init: function() {
		// 初始化涉事类别树DOM
		app.qbxsfx.initSslbTree('.qbljx .sslb-tree-item');
		// 初始信息表搜索
		this.initSearchForm(1, 10, app.qbxsfx.pagination);
		// 初始化页面元素点击功能
		this.initClickFunc();

	},
	reset: function() { //全局刷新

	},
	refresh: function() { //当前页刷新
		const page = $('#qbljxPagination li.active a').text();
		this.initSearchForm(page, 10, app.qbxsfx.pagination);
	},
	initClickFunc: function() {
		const that = this;
		//查询按钮
		$('.qbljx .btn_search').on('click', function() {
			that.initSearchForm(1, 10, app.qbxsfx.pagination);
		});
		// 删除按钮
		$(document).on('click', '.qbljx .table-body .btn_delete', function() {
			const id = $(this).parents('tr').data('id'),
				param = {
					qbxxids: id,
				};
			layer.confirm('您确定要删除此条信息吗？', {
				btn: ['确定', '取消'],
				title: '删除'
			}, function(index) {
				app.api.qbxsfx.deleteQbxsLjx({
					data: param,
					success: function(result) {
						// console.log(result);
						if (result.success === 0) {
							app.alert('操作失败！');
							// app.loading.hide(); // 隐藏loading
							return;
						}

						// app.loading.hide(); // 隐藏loading
						app.alert('删除成功！');
						that.refresh();
					}
				});

				layer.close(index);
			});

		});
	},
	initSearchForm: function(pageNo, pageSize, pagination) {
		const that = this,
			startDate = $('.qbljx input[name="startDate"]').val(),
			endDate = $('.qbljx input[name="endDate"]').val();

		if (app.time.jiaoyan(startDate, endDate) > 0) { //检查开始时间是否小于结束时间
			return;
		}
		app.loading.show(); // 显示loading

		const param = app.qbxsfx.serializeForm($('.qbljx form')); // 获取查询所需数据
		param.pageNo = pageNo;
		param.pageSize = pageSize;

		app.api.qbxsfx.viewQbxsLjxList({
			data: param,
			success: function(result) {
				// console.log(result);
				if (result.success === 0) {
					app.alert('查询数据失败！');
					app.loading.hide(); // 隐藏loading
					return;
				}

				const data = result.msg ? result.msg.result : '';
				let tableBodyTemple = '';

				$(".qbljx .table-body").empty();
				for (let i = 0, j = data.length; i < j; i++) {
					// tableBodyTemple += `<tr data-id="${data[i].qbxxid}" data-sslb="${data[i].sslb}">
					tableBodyTemple +=
						`<tr data-id="${data[i].qbxxid}" data-sslb="301">
                        <td class="checks">
                            <label class="check">
                                <input type="checkbox" class="checkbox" val="${data[i].qbxxid}">
                                <span></span>
                            </label>
                        </td>
                        <td class="intelligence-name" title="${data[i].bt}">${app.data(data[i].bt)}</td>
                        <td title="${data[i].xxzw}">${app.data(data[i].xxzw)}</td>
                        <td title="${data[i].xsly}">${app.data(data[i].xsly)}</td>
                        <td title="${data[i].sslbmc}">${app.data(data[i].sslbmc)}</td>
                        <td title="${data[i].tbsj}">${app.data(data[i].tbsj)}</td>
                        ${data[i].cancelstatus === '0' ? '<td>有效</td>' : '<td class="invalid">无效</td>'}
                        <td class="operate">
                            <span class="glyphicon glyphicon-remove btn_delete" aria-hidden="true" data-toggle="tooltip" data-placement="bottom" title="删除"></span>
                        </td>
                    </tr>`;
				};
				$(".qbljx  .table-body").append(tableBodyTemple);
				app.qbxsfx.initCheckAll(); // 初始化checkbox按钮全选
				app.qbxsfx.initTooltip(); // 初始化表格最后一列操作文字的提示
				pagination && pagination(result, 'qbljxPagination', that.initSearchForm);
				app.loading.hide();
			}
		});
	},

}
