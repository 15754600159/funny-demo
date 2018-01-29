app.qbxsfx.xsfxcl.glssqt = {

	// 获取群体列表数据
	initSubpageGlssqt: function(id) {
		const that = this;

		// 初始化页面元素点击功能
		this.initClickFunc();

		// app.loading.show(); // 显示loading
		app.api.qbxsfx.viewGlssqt({
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

				const qtlist = result.msg.qtlist,
					qtXsMap = result.msg.qtXsMap;
				// 存储群体和线索信息到sessionStorage
				let qt_xsObj = {};
				for (let i in qtXsMap) {
					qt_xsObj[i] = {};
					qt_xsObj[i].xs = qtXsMap[i];
					for (let n = 0, m = qtlist.length; n < m; n++) {
						if (qtlist[n].zdqtbh == i) {
							qt_xsObj[i].detail = qtlist[n];
							break;
						}
					}
				}
				sessionStorage.setItem("qt_xsObj", JSON.stringify(qt_xsObj));

				// 涉事群体下拉框
				let qtSelectTemp = '';
				const qtSelectElem = $('.xsfxcl .glssqt select[name="ssqt"]');
				for (let i = 0, j = qtlist.length; i < j; i++) {
					qtSelectTemp += `<option value="${qtlist[i].zdqtbh}">${qtlist[i].qtmc}</option>`;
				}
				if (qtlist.length < 1) {
					qtSelectTemp += `<option value="">无群体数据</option>`;
				}
				qtSelectElem.empty().append(qtSelectTemp);

				// 将请求群体相关的线索所需参数存储在设施群体下拉框上，供之后请求群体关联的线索使用
				let param = {
					zdqtbh: qtSelectElem.val(),
					qbxxid: id,
				}
				qtSelectElem.data('param', param);

				that.initQtInfo();
				// app.loading.hide();
			}
		});
	},

	initClickFunc: function() {
		const that = this;
		// 页面bottom-part 关联涉事群体subpage 涉事群体下拉框选择，改变群体信息显示
		$('.xsfxcl .glssqt select[name="ssqt"]').change(function() {
			let param = $(this).data('param');
			param.zdqtbh = $(this).val();
			$(this).data('param', param);

			that.initQtInfo();
		});
		//表格数据 涉事群体subpage 取消关联按钮
		$(document).on('click', '.xsfxcl .glssqt .btn_qxgl', function() {
			const that = $(this);
			let param = {
				qbxxid: $(this).parents('tr').data('id'),
				zdqtbh: $('.xsfxcl .glssqt select[name="ssqt"]').val(),
				status: '1'
			};

			app.loading.show(); // 显示loading
			app.api.qbxsfx.cancel_qt_xs_Connet({
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

	// 获取单个群体详细信息
	initQtInfo: function() {
		// 涉事群体详情
		const qtSelectElem = $('.xsfxcl .glssqt select[name="ssqt"]'),
			currentQtbh = qtSelectElem.val(),
			qt_xsObj = JSON.parse(sessionStorage.getItem("qt_xsObj")),
			currentQt = qt_xsObj[currentQtbh],
			glssqtSubpage = $('.xsfxcl .glssqt');
			// console.log(currentQt); // 单个群体详细数据
		if (currentQt) {
			glssqtSubpage.find('.qtmc span').text(app.data(currentQt.detail.qtmc));
			glssqtSubpage.find('.qtlx span').text(app.data(currentQt.detail.qtlb));
			glssqtSubpage.find('.qtcyin span').text(app.data(currentQt.detail.qtcsyy));
			glssqtSubpage.find('.qtgm span').text(app.data(currentQt.detail.qtgm));
		}

		// 相似线索
		this.initQt_XsSearch(1, 10, app.qbxsfx.pagination);
	},

	// 查询群体相关的线索
	initQt_XsSearch: function(pageNo, pageSize, pagination) {
		app.loading.show(); // 显示loading

		const that = this,
			qtSelectElem = $('.xsfxcl .glssqt select[name="ssqt"]'),
			param = qtSelectElem.data('param'); // 获取查询所需参数
		param.pageNo = pageNo;
		param.pageSize = pageSize;

		app.api.qbxsfx.viewQt_xs({
			data: param,
			success: function(result) {
				// console.log(result);
				if (result.success === 0) {
					app.alert('查询数据失败！');
					app.loading.hide(); // 隐藏loading
					return;
				}

				const data = result.msg ? result.msg.result : '',
					tbodyElem = $('.xsfxcl .glssqt .sub-right-part .table-body');
				let tableBodyTemple = '';

				tbodyElem.empty();
				for (let i = 0, j = data.length; i < j; i++) {
					tableBodyTemple +=
						`<tr data-id="${data[i].qbxxid}">
                                <td class="intelligence-name" title="${app.data(data[i].bt)}">${app.data(data[i].bt)}</td>
                                <td title="${app.data(data[i].xxzw)}">${app.data(data[i].xxzw)}</td>
                                ${data[i].cancelstatus === '0' ? '<td>有效</td>' : '<td class="invalid">无效</td>'}
                                <td class="operate">
                                    <span class="glyphicon glyphicon-list-alt ${data[i].cancelstatus === '0' ? 'btn_qbfx' : 'btn-wxqbfx'}" aria-hidden="true" data-toggle="tooltip" data-placement="bottom" title="情报分析"></span>
                                    <span class="glyphicon glyphicon-link btn_qxgl" aria-hidden="true" data-toggle="tooltip" data-placement="bottom" title="取消关联"></span>
                                </td>
                            </tr>`;
				};
				tbodyElem.append(tableBodyTemple);
				app.qbxsfx.initTooltip(); // 初始化表格最后一列操作文字的提示
				pagination && pagination(result, 'glssqtPagination', that.initQt_XsSearch);
				app.loading.hide(); // 隐藏loading
			}
		});
	},
}
