app.pzgl.gjcgl.search = {
	pageContainer: '.gjcgl',
	init: function() {
		// 初始时间选择框
        app.time.init();
        // 初始化涉事类别树DOM
		app.qbxsfx.initSslbTree(this.pageContainer + ' .sslb-tree-item', 2);
		// 初始化页面元素点击功能
		this.initClickFunc();
		// 初始页面查询
		this.initSearchForm(1, 10, app.qbxsfx.pagination);
	},
	reset: function() { //全局刷新

	},
	refresh: function() { //当前页刷新
		const page = $('#gjcglPagination li.active a').text();
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
			app.pzgl.gjcgl.add.open();
		});
		// 表格数据最后一列操作 修改 按钮
		$(document).on('click', that.pageContainer + ' .btn_update', function() {
			const id = $(this).parents('tr').data('id');
			$('.new-page ' + that.pageContainer).data('updateId', id); //存储需要修改的信息id
			app.pzgl.gjcgl.update.open();
		});
		// 表格数据最后一列操作 删除 按钮
		$(document).on('click', that.pageContainer + ' .btn_delete', function() {
			const param = {
				ids: $(this).parents('tr').data('id').toString(),
			};
			layer.confirm('您确定要删除此条信息吗？', {
				btn: ['确定', '取消'],
				title: '删除'
			}, (index) => {
				app.api.pzgl.deleteGjcgl({
					data: param,
					success: (result) => {
						// console.log(result);
						if (result.success === 0) {
							app.alert('操作失败！');
							return;
						}

						app.alert('修改删除成功！');
						that.refresh();
					}
				});

				layer.close(index);
			});
		});

	},
	initSearchForm: function(pageNo, pageSize, pagination) {
		const that = app.pzgl.gjcgl.search,
			startDate = $(that.pageContainer).find('input[name="startDate"]').val(),
			endDate = $(that.pageContainer).find('input[name="endDate"]').val();

		if (app.time.jiaoyan(startDate, endDate) > 0) { //检查开始时间是否小于结束时间
			return;
		}
		app.loading.show(); // 显示loading

		const param = app.qbxsfx.serializeForm($(that.pageContainer).find('.filter-conditions form')); // 获取查询所需数据
		param.pageNo = pageNo;
		param.pageSize = pageSize;
		param.sslb = param.sslb.split(',');

		app.api.pzgl.viewGjcglList({
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
                        <td title="${app.constants.sslb.nameMap[data[i].sslb]}">${app.data(app.constants.sslb.nameMap[data[i].sslb])}</td>
                        <td title="${data[i].gjc}">${app.data(data[i].gjc)}</td>
                        <td title="${data[i].createUser}">${app.data(data[i].createUser)}</td>
                        <td title="${data[i].createdate}">${app.data(data[i].createdate)}</td>
                        <td class="operate">
							<span class="btn_update glyphicon glyphicon-pencil" aria-hidden="true" data-toggle="tooltip" data-placement="bottom" title="修改"></span>
                            <span class="btn_delete glyphicon glyphicon-remove-circle" aria-hidden="true" data-toggle="tooltip" data-placement="bottom" title="废除"></span>
                        </td>
                    </tr>`;
				};
				tbodyContainer.append(tableBodyTemple);
				app.qbxsfx.initTooltip(); // 初始化表格最后一列操作文字的提示
				pagination && pagination(result, 'gjcglPagination', that.initSearchForm);
				app.loading.hide();
			}
		});
	},

}
