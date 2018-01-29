/*
 * @Author: 果实o 
 * @Date: 2017-12-14 09:38:40 
 * @Last Modified by: 果实o
 * @Last Modified time: 2018-01-05 09:45:30
 */
app.qbxsfx.qbxsgl.add = {
	url: 'pages/qbxsfx/qbxsgl/addWindow.html',
	pageContainer: '.add-qb',
	template: {
		ssryTemplate: `<div class="single-message message-glssry">
				<div class="input-item">
					<label>骨干成员：</label>
					<input name="xm" type="text" class="input" placeholder="请输入姓名" />
					<input name="sfzh" type="text" class="input" placeholder="请输入身份证号" />
				</div>
				<div class="input-item">
					<label>性别：</label>
					<select name="xb" class="form-control select"></select>
				</div>
				<div class="input-item">
					<label>民族：</label>
					<select name="mz" class="form-control select" data-name="nation"></select>
				</div>
				<div class="input-item personCategory-tree-item tree-item">
					<label>人员类别：</label>
					<input name="personCategoryCn" class="input node-name" style="width:200px;" type="text" placeholder="请选择人员类别" readonly />
					<span class="glyphicon glyphicon-remove" aria-hidden="true"></span>
					<input name="rylb" class="input node-code" type="text" style="display: none;" readonly />
					<div class="ztree personCategory-tree-dom tree-dom" style="display: none;"></div>
				</div>
				<span class="glyphicon glyphicon-remove" aria-hidden="true"></span>
			</div>`,
	},
	init: function() {
		// 初始化时间选择框
		app.time.init();
		// 初始化下拉框码表信息
		app.qbxsfx.initDictSelect(this.pageContainer);
		// 初始化涉事类别树DOM
		app.qbxsfx.initSslbTree(this.pageContainer + ' .sslb-tree-item');
		// 初始化页面元素点击功能
		this.initClickFunc();

	},
	reset: function() { //全局刷新

	},
	open: function() {
		const that = this;
		$m.page.openPage(that.url, 'fade', 'container-wrapper');
	},
	close: function() {
		const that = this;
		$m.page.closePage(that.url, 'fade', 'container-wrapper');
	},
	initClickFunc: function() {
		const that = this;
		// 关联涉事人员新增
		$(that.pageContainer).find('.content-block-glssry .btn_add').on('click', function() {
			const template = that.template.ssryTemplate;
			$(that.pageContainer).find('.content-block-glssry .block-content').append(template);
			// 初始化下拉框选项
			app.qbxsfx.initDictSelect(that.pageContainer + ' .content-block-glssry .block-content .single-message:last');
			// 初始化人员类别树
			app.qbxsfx.initPersonCategoryTree(that.pageContainer + ' .personCategory-tree-item');
		});
		// 关联涉事群体新增
		$(that.pageContainer).find('.content-block-ssqt .btn_add').on('click', function() {
			app.qbxsfx.qbxsgl.addSsqt.open('addQbxs');
		});
		// 人员信息删除
		$(document).on('click', that.pageContainer + ' .message-glssry .glyphicon-remove', function() {
			$(this).parent('.single-message').remove();
		});
		// 群体信息删除
		$(document).on('click', that.pageContainer + ' .message-ssqt .glyphicon-remove', function() {
			const _this = this,
				zdqtbh = $(_this).parent('.single-message').data('zdqtbh');
			// 删除addSsqt弹窗页面的存储的对应的群体数据
			app.qbxsfx.qbxsgl.addSsqt.deleteSingleSsqt(zdqtbh);
			$(_this).parent('.single-message').remove();
		});
		// 弹框 'x'或者'取消' 点击关闭弹窗
		$(that.pageContainer).find('.btn-window-close').off('click').on('click', function() {
			$(that.pageContainer).find('.window').addClass('popOut'); //增加关闭效果
			that.close();
		});
		// 保存按钮
		$('footer .btn_submit', that.pageContainer).on('click', function() {
			that.submit();
			app.qbxsfx.qbxsgl.addSsqt.clear(); //清空群体数据
		});
	},
	// 保存提交新增内容
	submit: function() {
		const that = this,
			zdqtbhs = [],
			ssryList = [],
			ssryNodeList = $(that.pageContainer).find('.content-block-glssry .single-message');
		app.loading.show(); // 显示loading
		let param = app.qbxsfx.serializeForm($(that.pageContainer).find('.content-block-jbxx')); //拼凑参数
		//添加涉事群体数据
		for (let elem of app.qbxsfx.qbxsgl.addSsqt.ssqt) {
			zdqtbhs.push(elem.zdqtbh);
		};
		param.zdqtbhs = zdqtbhs; 
		// 添加涉事人员的数据
		ssryNodeList.each(function() {
			ssryList.push(app.qbxsfx.serializeForm($(this)));
		});
		param.ssryList = ssryList;

		// console.log(param);
		app.api.qbxsfx.addQbxx({
			data: param,
			success: function(result) {
				// console.log(result);
				if (result.success === 0) {
					app.alert('操作失败！');
					app.loading.hide(); // 隐藏loading
					return;
				}

				app.loading.hide(); // 隐藏loading
				app.alert('新增成功！');
				app.qbxsfx.qbxsgl.search.refresh();
				that.close(); //关闭新增页面
			}
		});
	},
	// 根据添加群体弹窗返回的信息，添加群体html代码
	addSsqt: function(ssqtArray) {
		let ssqtTemplate = '';
		const ssqtContainer = $(this.pageContainer).find('.content-block-ssqt .block-content');
		for (let elem of ssqtArray) {
			ssqtTemplate += `<div class="single-message message-ssqt" data-zdqtbh="${elem.zdqtbh}">
					<div class="input-item">
						<label>群体名称：</label>
						<input name="qtmc" type="text" class="input" value="${app.data(elem.qtmc)}" readonly />
					</div>
					<div class="input-item">
						<label>群体类别：</label>
						<input name="qtlb" type="text" class="input" value="${app.data(elem.qtlb)}" readonly />
					</div>
					<span class="glyphicon glyphicon-remove" aria-hidden="true"></span>
				</div>`;
		};
		ssqtContainer.find('.message-ssqt').remove();
		ssqtContainer.append(ssqtTemplate);
	},

}
