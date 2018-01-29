app.pzgl.mgsqgl.search = {
	pageContainer: '.mgsqgl',
	init: function() {
		// 初始时间选择框
		app.time.init();
		// 初始化页面元素点击功能
		this.initClickFunc();
		// 初始页面查询
		this.initSearchForm(1, 10, app.qbxsfx.pagination);
	},
	reset: function() { //全局刷新

	},
	refresh: function() { //当前页刷新
		const page = $('#mgsqglPagination li.active a').text();
		this.initSearchForm(page, 10, app.qbxsfx.pagination);
	},
	initClickFunc: function() {
		const that = this;
		// 查询按钮
		$(that.pageContainer).find('.filter-conditions .btn_search').on('click', function() {
			that.initSearchForm(1, 10, app.qbxsfx.pagination);
		});
		// 新增按钮
		$(that.pageContainer).find('.filter-conditions .btn_add').on('click', function() {
			app.pzgl.mgsqgl.add.open();
		});
		// 表格数据最后一列操作 修改 按钮
		$(document).on('click', that.pageContainer + ' .btn_update', function() {
			const id = $(this).parents('tr').data('id');
			$('.new-page .mgsqgl').data('updateId', id); //存储需要修改的信息id
			app.pzgl.mgsqgl.update.open();
		});
		// 表格数据最后一列操作 删除 按钮
		$(document).on('click', that.pageContainer + ' .btn_delete', function() {
			const param = {
				id: $(this).parents('tr').data('id'),
			};
			layer.confirm('您确定要删除此条信息吗？', {
				btn: ['确定', '取消'],
				title: '删除'
			}, function(index) {
				app.api.pzgl.deleteMgsqgl({
					data: param,
					success: function(result) {
						// console.log(result);
						if (result.success === 0) {
							app.alert('操作失败！');
							return;
						}

						app.alert('修改删除成功！');
						app.pzgl.mgsqgl.search.refresh();
					}
				});

				layer.close(index);
			});
		});

	},
	initSearchForm: function(pageNo, pageSize, pagination) {
		const that = app.pzgl.mgsqgl.search,
			startDate = $(that.pageContainer).find('input[name="sensitivePStartTime"]').val(),
			endDate = $(that.pageContainer).find('input[name="sensitivePEndTime"]').val();

		if (app.time.jiaoyan(startDate, endDate) > 0) { //检查开始时间是否小于结束时间
			return;
		}
		app.loading.show(); // 显示loading

		const param = app.qbxsfx.serializeForm($(that.pageContainer).find('.filter-conditions form')); // 获取查询所需数据
		param.pageNo = pageNo;
		param.pageSize = pageSize;

		app.api.pzgl.viewMgsqglList({
			data: param,
			success: function(result) {
				// console.log(result);
				if (result.success === 0) {
					app.alert('查询数据失败！');
					app.loading.hide(); // 隐藏loading
					return;
				}

				const data = result.msg ? result.msg.result : '',
					tbodyContainer = $(that.pageContainer).find('.table-box .table-body');
				let tableBodyTemple = '';

				tbodyContainer.empty();
				for (let i = 0, j = data.length; i < j; i++) {
					tableBodyTemple +=
						`<tr data-id="${data[i].id}">
                        <td title="${data[i].sensitivePName}">${app.data(data[i].sensitivePName)}</td>
                        <td title="${data[i].sensitivePStartTime} - ${data[i].sensitivePEndTime}">${app.data(data[i].sensitivePStartTime)} - ${app.data(data[i].sensitivePEndTime)}</td>
                        <td title="${data[i].warningStartTime} - ${data[i].warningEndTime}">${app.data(data[i].warningStartTime)} - ${app.data(data[i].warningEndTime)}</td>
                        <td title="${data[i].createUser}">${app.data(data[i].createUser)}</td>
                        <td title="${data[i].createTime}">${app.data(data[i].createTime)}</td>
                        <td title="${data[i].status}">${app.data(data[i].status)}</td>
                        <td class="operate">
                            <span class="btn_update glyphicon glyphicon-pencil" aria-hidden="true" data-toggle="tooltip" data-placement="bottom" title="修改"></span>
                            <span class="btn_delete glyphicon glyphicon-remove-circle" aria-hidden="true" data-toggle="tooltip" data-placement="bottom" title="删除"></span>
                        </td>
                    </tr>`;
				};
				tbodyContainer.append(tableBodyTemple);
				app.qbxsfx.initTooltip(); // 初始化表格最后一列操作文字的提示
				pagination && pagination(result, 'mgsqglPagination', that.initSearchForm);
				app.loading.hide();
			}
		});
	},

}
