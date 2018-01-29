app.zdsjyjgl.module = {
	pageContainer: '.zdsjyjgl .module',
	constant: {
		eventType: {
			keyMap: {
				'swsjyj': '涉稳重大事件预警模型',
				'sjsjyj': '涉疆重大事件预警模型',
				'zasjyj': '治安重大事件预警模型',
			}
		}
	},
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
			app.zdsjyjgl.module.download();
		});
		// 详情查看
		$('.table-body', that.pageContainer).on('click', '.operate .btn_check', function() {
			$(that.pageContainer).data('check-id', $(this).parents('tr').data('id')); //存储数据
			app.zdsjyjgl.module.check.open();
		});

	},
	initSearchForm: function(pageNo, pageSize, pagination) {
		const that = app.zdsjyjgl.module,
			startDate = $(that.pageContainer).find('input[name="warningStartTime"]').val(),
			endDate = $(that.pageContainer).find('input[name="warningEndTime"]').val();

		if (app.time.jiaoyan(startDate, endDate) > 0) { //检查开始时间是否小于结束时间
			return;
		}
		app.loading.show(); // 显示loading

		const param = app.qbxsfx.serializeForm($(that.pageContainer).find('.filter-conditions form')); // 获取查询所需数据
		param.modelType = that.constant.eventType.keyMap[$(app.zdsjyjgl.pageContainer).find('.top-part .left-part .active').attr('class').split(' ')[1]];
		param.pageNo = pageNo;
		param.pageSize = pageSize;

		app.api.zdsjyjgl.viewModelList({
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
                    tableBodyTemple += `<tr data-id="${data[i].id}">
                        <td title="${data[i].modelName}">${app.data(data[i].modelName)}</td>
                        <td title="${data[i].warnId}">${app.data(data[i].warnId)}</td>
                        <td title="${data[i].modelType}">${app.data(data[i].modelType)}</td>
                        <td title="${data[i].warningDetail}">${app.data(data[i].warningDetail)}</td>
                        <td title="${data[i].warningTime}">${app.data(data[i].warningTime)}</td>
                        <td title="${data[i].actTime}">${app.data(data[i].actTime)}</td>
                        <td title="${data[i].isGroup}">${app.data(data[i].isGroup)}</td>
                        <td class="operate">
                            <span class="glyphicon glyphicon-list-alt btn_check" aria-hidden="true" data-toggle="tooltip" data-placement="bottom" title="详情"></span>
                            <span class="glyphicon glyphicon-share-alt" aria-hidden="true" data-toggle="tooltip" data-placement="bottom" title="反馈"></span>
                        </td>
                    </tr>`;
				};
				tbodyContainer.append(tableBodyTemple);
				app.qbxsfx.initTooltip(); // 初始化表格最后一列操作文字的提示
				pagination && pagination(result, 'modelPagination', that.initSearchForm);
				app.loading.hide();
			}
		});
	},
	download: function(){
		const that = app.zdsjyjgl.module,
		startDate = $(that.pageContainer).find('input[name="warningStartTime"]').val(),
		endDate = $(that.pageContainer).find('input[name="warningEndTime"]').val();

		if (app.time.jiaoyan(startDate, endDate) > 0) { //检查开始时间是否小于结束时间
			return;
		}
		app.loading.show(); // 显示loading
	
		const param = app.qbxsfx.serializeForm($(that.pageContainer).find('.filter-conditions form')); // 获取查询所需数据
		param.modelType = that.constant.eventType.keyMap[$(app.zdsjyjgl.pageContainer).find('.top-part .left-part .active').attr('class').split(' ')[1]];
		param.pageNo = 1;
		param.pageSize = 10000;
		location.href = app.api.zdsjyjgl.exportWarnModels + $m.serialize(param);
	}
}
