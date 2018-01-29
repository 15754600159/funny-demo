app.zdsjyjgl.group = {
	pageContainer: '.zdsjyjgl .group',
	init: function() {
		// 初始化页面元素点击功能
		this.initClickFunc();
		// 初始页面查询
		this.initSearchForm(1, 10, app.qbxsfx.pagination);
	},
	reset: function() { //全局刷新

	},
	refresh: function() { //当前页刷新

	},
	initClickFunc: function() {
		const that = this;
		// 查询按钮
		$(that.pageContainer).find('.filter-conditions .btn_search').on('click', function() {
			that.initSearchForm(1, 10, app.qbxsfx.pagination);
		});
		// 下载按钮
		$(that.pageContainer).find('.filter-conditions .btn_download').on('click', function() {
			app.zdsjyjgl.group.download();
		});
		// 详情查看
		$('.table-body', that.pageContainer).on('click', '.operate .btn_check', function() {
			$(that.pageContainer).data('check-id', $(this).parents('tr').data('id')); //存储数据
			app.zdsjyjgl.group.check.open();
		});
	},
	initSearchForm: function(pageNo, pageSize, pagination) {
		const that = app.zdsjyjgl.group,
			startDate = $(that.pageContainer).find('input[name="warningStartTime"]').val(),
			endDate = $(that.pageContainer).find('input[name="warningEndTime"]').val();

		if (app.time.jiaoyan(startDate, endDate) > 0) { //检查开始时间是否小于结束时间
			return;
		}
		app.loading.show(); // 显示loading

		const param = app.qbxsfx.serializeForm($(that.pageContainer).find('.filter-conditions form')); // 获取查询所需数据
		param.pageNo = pageNo;
		param.pageSize = pageSize;

		app.api.zdsjyjgl.viewGroupList({
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
                        <td title="${data[i].processStatus}">${app.data(data[i].processStatus)}</td>
                        <td title="${data[i].groupName}">${app.data(data[i].groupName)}</td>
                        <td title="${data[i].groupType}">${app.data(data[i].groupType)}</td>
						<td title="${data[i].warnDetail}">${app.data(data[i].warnDetail)}</td>
						<td title="${data[i].warnTime}">${app.data(data[i].warnTime)}</td>
                        <td title="${data[i].actTime}">${app.data(data[i].actTime)}</td>
                        <td title="${data[i].actZoning}">${app.data(data[i].actZoning)}</td>
                        <td title="${data[i].actType}">${app.data(data[i].actType)}</td>
						<td title="${data[i].transactUnit}">${app.data(data[i].transactUnit)}</td>
                        <td class="operate">
                            <span class="glyphicon glyphicon-list-alt btn_check" aria-hidden="true" data-toggle="tooltip" data-placement="bottom" title="详情"></span>
                            <span class="glyphicon glyphicon glyphicon-saved" aria-hidden="true" data-toggle="tooltip" data-placement="bottom" title="签收"></span>
                            <span class="glyphicon glyphicon-share-alt" aria-hidden="true" data-toggle="tooltip" data-placement="bottom" title="反馈"></span>
                        </td>
                    </tr>`;
				};
				tbodyContainer.append(tableBodyTemple);
				app.qbxsfx.initTooltip(); // 初始化表格最后一列操作文字的提示
				pagination && pagination(result, 'groupPagination', that.initSearchForm);
				app.loading.hide();
			}
		});
	},
	download: function(){
		const that = app.zdsjyjgl.group,
		startDate = $(that.pageContainer).find('input[name="warningStartTime"]').val(),
		endDate = $(that.pageContainer).find('input[name="warningEndTime"]').val();

		if (app.time.jiaoyan(startDate, endDate) > 0) { //检查开始时间是否小于结束时间
			return;
		}
		app.loading.show(); // 显示loading
	
		const param = app.qbxsfx.serializeForm($(that.pageContainer).find('.filter-conditions form')); // 获取查询所需数据
		param.pageNo = 1;
		param.pageSize = 10000;
		location.href = app.api.zdsjyjgl.exportWarnGroups + $m.serialize(param);
	}
}
