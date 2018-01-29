app.qbxsfx.xsfxcl.glssry = {

	// 获取人员列表数据
	initSubpageGlssry: function(id) {
		const that = this;

		// 初始化页面元素点击功能
		this.initClickFunc();

		// app.loading.show(); // 显示loading
		app.api.qbxsfx.viewGlssry({
			data: {
				qbxxid: id,
			},
			success: function(result) {
				// console.log(result);
				if (result.success === 0) {
					app.alert('查询数据失败！');
					// app.loading.hide(); // 隐藏loading
					return;
				}

				const rylist = result.msg.rylist,
					tbodyElem = $('.xsfxcl .glssry .sub-left-part .table-body');
				let tableBodyTemple = '';

				tbodyElem.empty();
				for (let i = 0, j = rylist.length; i < j; i++) {
					tableBodyTemple +=
						`<tr data-id="${app.data(rylist[i].ssryid)}">
                        <td title="${app.data(rylist[i].xm)}">${app.data(rylist[i].xm)}</td>
                        <td title="${app.data(rylist[i].sfzh)}">${app.data(rylist[i].sfzh)}</td>
                        <td>${app.constants.genderCode.nameMap[rylist[i].xb]}</td>
                        <td title="${app.data(rylist[i].rylb)}">${app.data(rylist[i].rylb)}</td>
                    </tr> `;
				};
				tbodyElem.append(tableBodyTemple);
				tbodyElem.find('tr:first').addClass('active');
				app.qbxsfx.initTooltip(); // 初始化表格最后一列操作文字的提示

				// 将请求人员相关的线索所需参数存储在关联涉事人员标签页上，供之后请求人员关联的线索使用
				let param = {
					qbxxid: id,
				};
				const tabElem = $('.xsfxcl .sub-page.glssry');
				tabElem.data('param', param);

				// 相似线索
				that.initRy_XsSearch(1, 10, app.qbxsfx.pagination);
				// app.loading.hide();
			}
		});
	},

	initClickFunc: function() {
		const that = this;
		// 页面bottom-part 关联涉事人员subpage 涉事人员列表行点击，改变右侧相关线索
		$(document).on('click', '.xsfxcl .glssry .sub-left-part tbody tr', function() {
			if ($(this).hasClass('active')) {
				return;
			}
			$(this).addClass('active').siblings('tr').removeClass('active');
			that.initRy_XsSearch(1, 10, app.qbxsfx.pagination);
		});
		//表格数据 关联涉事人员subpage 取消关联按钮
		$(document).on('click', '.xsfxcl .glssry .btn_qxgl', function() {
			const that = $(this);
			let param = {
				qbxxid: $(this).parents('tr').data('id'),
				ssryid: $('.xsfxcl .glssry .sub-left-part tbody tr.active').data('id'),
				status: '1'
			};

			app.loading.show(); // 显示loading
			app.api.qbxsfx.cancel_ry_xs_Connet({
				data: param,
				success: function(result) {
					// console.log(result);
					if (result.success === 0) {
						app.alert('操作失败！');
						app.loading.hide(); // 隐藏loading
						return;
					}

					app.loading.hide(); // 隐藏loading
					that.parents('tr').remove();
					app.alert('操作成功！');
				}
			});
		});
	},

	// 查询人员相关的线索
	initRy_XsSearch: function(pageNo, pageSize, pagination) {
		// app.loading.show(); // 显示loading

		const that = this,
			tabElem = $('.xsfxcl .sub-page.glssry'),
			param = tabElem.data('param'); // 获取查询所需参数
		param.ssryid = tabElem.find('.sub-left-part .table-body tr.active').data('id');
		param.pageNo = pageNo;
		param.pageSize = pageSize;

		app.api.qbxsfx.viewRy_xs({
			data: param,
			success: function(result) {
				// console.log(result);
				if (result.success === 0) {
					app.alert('查询数据失败！');
					// app.loading.hide(); // 隐藏loading
					return;
				}

				const data = result.msg ? result.msg.result : '',
					tbodyElem = $('.xsfxcl .glssry .sub-right-part .table-body');
				let tableBodyTemple = '';

				tbodyElem.empty();
				for (let i = 0, j = data.length; i < j; i++) {
					tableBodyTemple +=
						`< tr data-id="${app.data(data[i].qbxxid)}">
                        <td class="intelligence-name" title="${app.data(data[i].bt)}">${app.data(data[i].bt)}</td>
                        <td title="${app.data(data[i].xxzw)}">${app.data(data[i].xxzw)}</td>
                        ${ data[i].cancelstatus === '0' ? '<td>有效</td>' : '<td class="invalid">无效</td>'}
                        <td class= "operate">
                            <span class="glyphicon glyphicon-list-alt ${data[i].cancelstatus === '0' ? 'btn_qbfx' : 'btn-wxqbfx'}" aria-hidden="true" data-toggle="tooltip" data-placement="bottom" title="情报分析"></span>
                            <span class="glyphicon glyphicon-link btn_qxgl" aria-hidden="true" data-toggle="tooltip" data-placement="bottom" title="取消关联"></span>
                        </td>
                    </tr> `;
				};
				tbodyElem.append(tableBodyTemple);
				app.qbxsfx.initTooltip(); // 初始化表格最后一列操作文字的提示
				pagination && pagination(result, 'glssryPagination', that.initRy_XsSearch);
				// app.loading.hide(); // 隐藏loading
			}
		});
	},
}
