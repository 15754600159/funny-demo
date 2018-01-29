app.qbxsfx.qbxsgl.addSsqt = {
	pageContainer: '.qbxsgl-addSsqt',
    url: 'pages/qbxsfx/qbxsgl/addSsqtWindow.html',
	ssqt: [],  //用于存储用户勾选的涉事群体
	fromPage: '', //用于标记页面是新增线索页面弹出addQbxs，还是组合线索页面弹出combineQbxs 
	open: function(page) {
		$m.page.openPage(this.url, 'fade', 'container-wrapper');
		this.fromPage = page;
	},
	close: function() {
		$m.page.closePage(this.url, 'fade', 'container-wrapper');
	},
	clear: function() {
		this.ssqt.splice(0, this.ssqt.length); //清空群体数据
		this.fromPage = ''; // 清空页面来源标记
	},
	init: function() {
        // 初始信息表搜索
		this.initSearchForm(1, 10, app.qbxsfx.pagination);
		// 初始化页面元素点击功能
		this.initClickFunc();
	},
	initClickFunc: function() {
		const that = this;
		// 弹框 'x'或者'取消' 点击关闭弹窗
		$(that.pageContainer).find('.btn-window-close').off('click').on('click', function() {
			$(that.pageContainer).find('.window').addClass('popOut'); //增加关闭效果
			that.close();
		});
		// 弹框 '确定' 点击提交内容
		$(that.pageContainer).find('footer .btn_submit').on('click', function() {
			$(that.pageContainer).find('.window').addClass('popOut'); //增加关闭效果
			that.close();
			if (that.fromPage === 'addQbxs') { //新增
				app.qbxsfx.qbxsgl.add.addSsqt(that.ssqt);
			} else if (that.fromPage === 'updateQbxs') { //修改
				app.qbxsfx.qbxsgl.add.addSsqt.call(app.qbxsfx.qbxsgl.update, that.ssqt);
			} else { //组合线索
				app.qbxsfx.qbxsgl.add.addSsqt.call(app.qbxsfx.qbxsgl.combineClue, that.ssqt);
			}
			// that.ssqt.splice(0, that.ssqt.length); //清空群体数据
        });
        // 点击checkbox来改变存储的选择群体数据
        $(that.pageContainer).find('.table-body').on('change', 'input[type="checkbox"]', function() {
            const qtObj = {},
				_this = this;
			let ifRepeat = false;

			if ($(_this).prop('checked') === true) { //被选中
				qtObj.zdqtbh = $(_this).data('zdqtbh');
				qtObj.qtmc = $(_this).data('qtmc');
				qtObj.qtlb = $(_this).data('qtlb');
				for (let elem of that.ssqt) { //添加群体数据去重
					if (qtObj.zdqtbh === elem.zdqtbh) {
						ifRepeat = true;
						break;
					}
				}
				if (!ifRepeat) { //如果数据没有重复，再添加
					that.ssqt.push(qtObj);
				}
			} else { //被解除选中
				that.deleteSingleSsqt($(_this).data('zdqtbh'));
			}
        });

    },
    initSearchForm: function(pageNo, pageSize, pagination) {
        const that = app.qbxsfx.qbxsgl.addSsqt; //因为要将initSearchForm函数传入pagination中执行，所以that要指向具体的对象，不能用this

		app.loading.show(); // 显示loading

		const param = {}; // 获取查询所需数据
		param.pageNo = pageNo;
		param.pageSize = pageSize;

		app.api.wfgzqtgl.view({
			data: param,
			success: function(result) {
				// console.log(result);
				if (result.success === 0) {
					app.alert('查询数据失败！');
					app.loading.hide(); // 隐藏loading
					return;
				}

                const data = result.msg ? result.msg.result : '',
                    tbodyContainer = $(that.pageContainer).find('.table-body');
				let tableBodyTemple = '';

				tbodyContainer.empty();
				for (let i = 0, j = data.length; i < j; i++) {
					tableBodyTemple +=
						`<tr data-id="${data[i].id}" data-zdqtbh="${data[i].zdqtbh}">
                            <td class="checks">
                                <label class="check">
                                    <input type="checkbox" class="checkbox" data-zdqtbh="${data[i].zdqtbh}" data-qtmc="${data[i].qtmc}" data-qtlb="${data[i].qtlb}">
                                    <span></span>
                                </label>
                            </td>
                            <td title="${data[i].qtmc}">${app.data(data[i].qtmc)}</td>
                            <td title="${data[i].qtlb}">${app.data(data[i].qtlb)}</td>
                        </tr>`;
                };
				tbodyContainer.append(tableBodyTemple);
				app.qbxsfx.initCheckAll('.qbxsgl-addSsqt'); // 初始化checkbox按钮全选
				pagination && pagination(result, 'ssqtPagination', that.initSearchForm);
				that.checkedSelectedSsqt(); // 根据ssqt数组中保存的群体数据，勾选列表中已选择的群体
				app.loading.hide(); // 隐藏loading
			}
		});
	},
	// 根据涉事群体编号删除ssqt数组中的单条群体信息
	deleteSingleSsqt: function(zdqtbh) {
		for (let [index, elem] of this.ssqt.entries()) {
			if (elem.zdqtbh === zdqtbh) {
				this.ssqt.splice(index, 1);
			}
		}
	},
	// 根据ssqt数组中保存的群体数据，勾选列表中已选择的群体
	checkedSelectedSsqt: function() {
		const that = this;
			listCheckbox = $(that.pageContainer).find('.table-body input[type="checkbox"]');
		for (let elem of that.ssqt) {
			listCheckbox.each(function() {
				if ($(this).data('zdqtbh') === elem.zdqtbh) {
					$(this).prop('checked', true);
					return false; //跳出each循环
				}
			});
		}
	},

	initForm: function() {

	},
}
