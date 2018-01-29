app.gxrfx.history = {
	pageContainer: '.gxrfx-history',
	url: 'pages/gxrfx/historyWindow.html',
	open: function() {
		$m.page.openPage(this.url, 'fade', 'container-wrapper');
	},
	close: function() {
		$m.page.closePage(this.url, 'fade', 'container-wrapper');
	},
	init: function() {
		// 初始信息表搜索
		this.initSearchForm(1, 10, app.commonFunc.pagination);
		// 初始化页面元素点击功能
		this.initClickFunc();
	},
	//当前页刷新
	refresh: function() {
		const page = $('#gxrfxPagination li.active a').text();
		this.initSearchForm(page, 10, app.commonFunc.pagination);
	},
	initClickFunc: function() {
		const that = this;
		// 弹框 'x'或者'取消' 点击关闭弹窗
		$(that.pageContainer).find('.btn-window-close').off('click').on('click', function() {
			$(that.pageContainer).find('.window').addClass('popOut'); //增加关闭效果
			that.close();
		});
		// 信息删除
		$('.table-body', that.pageContainer).on('click', '.btn_restore', function() {
			const _this = this;
			layer.confirm('您确定要还原此条信息？', {
				btn: ['确定', '取消'],
				title: '还原'
			}, function(index) {
				const gxsfzh = $(_this).parents('tr').data('gxsfzh'),
					 key = 'delete_dybkxx',
					 param = {
						 key,
						 gxsfzh,
						 yxx: '0',
					 };
				app.api.gxrfx.deleteDybc({
					data: param,
					success: function(result) {
						// console.log(result);
						if (result.success === 0) {
							app.alert('操作失败！');
							return;
						}

						that.refresh();
						app.gxrfx.search.refresh();
					}
				});

				layer.close(index);
			});
		});

	},
	// 初始信息表搜索
	initSearchForm: async function(pageNo, pageSize, pagination) {
		const that = app.gxrfx.history;  //因为要将initSearchForm函数传入pagination中执行，所以that要指向具体的对象，不能用this

		const param = app.commonFunc.serializeForm($('form', app.gxrfx.search.pageContainer)); // 获取查询所需数据
		param.key = 'select_dybkxx';
		param.yxx = 2; //已删除类型
		param.pageNo = pageNo;
		param.limit = pageSize;
		console.log(param);

		const result = await app.api.gxrfx.viewGxrfxList({ data: param });
//	 	console.log(result);
		if (result.status === 0) {
			app.alert('查询数据失败！');
			return;
		}

		const data = result.data ? result.data.result : '',
			tbodyContainer = $(that.pageContainer).find(".table-body");
		let tableBodyTemple = '';

		tbodyContainer.empty();
		for (let i = 0, j = data.length; i < j; i++) {
			tableBodyTemple +=
				`<tr data-id="${data[i].relationid}" data-gxsfzh="${data[i].gxsfzh}">
					<td title="${data[i].gxxm}">${app.data(data[i].gxxm)}</td>
					<td title="${data[i].gxsfzh}">${app.data(data[i].gxsfzh)}</td>
					<td title="${data[i].zdrxlmc}">${app.data(data[i].zdrxlmc)}</td>
					<td title="${data[i].rylbmc}">${app.data(data[i].rylbmc)}</td>
					<td title="${data[i].gx}">${app.data(data[i].gx)}</td>
					<td class="operate">
						<span class="glyphicon glyphicon-ok-circle btn_restore" aria-hidden="true" data-toggle="tooltip" data-placement="bottom" title="还原"></span>
					</td>
				</tr>`;
		};
		tbodyContainer.append(tableBodyTemple);
		if (app.gxrfx.search.state === 0) {
			app.commonFunc.initTooltip(); // 初始化表格最后一列操作文字的提示
		} else {
			$('.table-body .btn_restore', that.pageContainer).prop('disabled', true).css('cursor', 'not-allowed');
		}
		pagination && pagination(result, 'historyPagination', that.initSearchForm);

	},
	initForm: function() {

	},
}
