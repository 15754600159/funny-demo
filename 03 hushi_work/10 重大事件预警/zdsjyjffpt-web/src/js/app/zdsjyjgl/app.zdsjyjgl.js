/*
 * @Author: 果实o 
 * @Date: 2017-12-11 19:35:11 
 * @Last Modified by: 果实o
 * @Last Modified time: 2018-01-05 15:05:06
 */
app.zdsjyjgl = {
	pageContainer: '.zdsjyjgl',
	init: function() {
		// 初始化时间选择框
		app.time.init();
		// 初始化页面元素点击功能
		this.initClickFunc();
		// 初始化页面 统计图 
		this.initSjyjtj();
		// 初始化模型标签页
		app.zdsjyjgl.module.init();
		// 初始化群体标签页
		app.zdsjyjgl.group.init();
		// 初始化人员标签页
		app.zdsjyjgl.person.init();

	},
	reset: function() { //全局刷新

	},
	refresh: function() { //当前页刷新

	},
	initClickFunc: function() {
		const that = this;
		// 页面头部 圆 点击事件
		$(that.pageContainer).find('.top-part .ring').on('click', function() {
			const tab = $(this),
				subPage = tab.data('subpage');

			tab.addClass('active').siblings('.ring').removeClass('active');
			tab.parents('.zdsjyjgl').find('.' + subPage).addClass('active').siblings('.sub-page').removeClass('active');
			// 是模型页面，则刷新列表
			if (subPage === 'module') { 
				app.zdsjyjgl.module.initSearchForm(1, 10, app.qbxsfx.pagination);
			}
		});

	},
	initSjyjtj: function() {
		const that = this;

		// 初始化统计图
		app.api.zdsjyjgl.getSjyjCount({
			success: function(result) {
				// console.log(result);
				if (result.success === 0) {
					app.alert('获取事件预警统计数据失败！');
					// app.loading.hide(); // 隐藏loading
					return;
				}
				const msg = result.msg;
				$(that.pageContainer).find('.top-part .swsjyj span').text(msg['涉稳重大事件预警模型']);
				$(that.pageContainer).find('.top-part .sjsjyj span').text(msg['涉疆重大事件预警模型']);
				$(that.pageContainer).find('.top-part .zasjyj span').text(msg['治安重大事件预警模型']);
				$(that.pageContainer).find('.top-part .wwqtyj span').text(msg['countAllWarnGroups']);
				$(that.pageContainer).find('.top-part .wwryyj span').text(msg['countAllWarnPersons']);
			}
		});
	},

}
