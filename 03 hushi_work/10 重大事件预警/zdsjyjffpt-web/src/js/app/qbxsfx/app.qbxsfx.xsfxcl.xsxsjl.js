app.qbxsfx.xsfxcl.xsxsjl = {

	initSubpageXsxsjl: function(qbxxid, sslb) {
		// 将请求相似线索聚类所需参数存储在相似线索聚类标签页上，供之后请求相似的线索使用
		let param = {
			qbxxid: qbxxid,
			sslb: sslb,
		};
		const tabElem = $('.xsfxcl .sub-page.xsxsjl');
		tabElem.data('param', param);
		// 初始信息表搜索
		this.initXsjlSearch(1, 10, app.qbxsfx.pagination);
		// 初始化页面元素点击功能
		this.initClickFunc();
	},
	reset: function() { //全局刷新

	},
	refresh: function() { //当前页刷新
		const page = $('#xsxsjlPagination li.active a').text();
		this.initXsjlSearch(page, 10, app.qbxsfx.pagination);
	},
	initClickFunc: function() {
		const that = this;
	},
	initXsjlSearch: function(pageNo, pageSize, pagination) {
		const that = this;

		// app.loading.show(); // 显示loading
		// 获取查询所需参数
		const tabElem = $('.xsfxcl .sub-page.xsxsjl'),
			param = tabElem.data('param');
		param.pageNo = pageNo;
		param.pageSize = pageSize;

		app.api.qbxsfx.viewXsxxjlList({
			data: param,
			success: function(result) {
				// console.log(result);
				if (result.success === 0) {
					app.alert('查询数据失败！');
					// app.loading.hide(); // 隐藏loading
					return;
				}

				const data = result.msg ? result.msg.result : '',
					tbodyElem = $('.xsfxcl .xsxsjl .table-body');
				let tableBodyTemple = '';

				tbodyElem.empty();
				for (let i = 0, j = data.length; i < j; i++) {
					tableBodyTemple +=
						`<tr data-id="${data[i].qbxxid}">
                        <td class="intelligence-name" title="${data[i].bt}">${data[i].bt}</td>
                        <td title="${data[i].xxzw}">${data[i].xxzw}</td>
                        ${data[i].cancelstatus === '0' ? '<td>有效</td>' : '<td class="invalid">无效</td>'}
                        <td class="operate">
                            <span class="glyphicon glyphicon-list-alt ${data[i].cancelstatus === '0' ? 'btn_qbfx' : 'btn-wxqbfx'}" aria-hidden="true" data-toggle="tooltip" data-placement="bottom" title="情报分析"></span>
                        </td>
                    </tr>`;
				};
				tbodyElem.append(tableBodyTemple);
				app.qbxsfx.initTooltip(); // 初始化表格最后一列操作文字的提示
				pagination && pagination(result, 'xsxsjlPagination', that.initXsjlSearch);
				// app.loading.hide();// 隐藏loading
			}
		});
	},

}
