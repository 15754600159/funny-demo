/*
 * @Author: 果实o 
 * @Date: 2017-12-11 19:35:39 
 * @Last Modified by: 果实o
 * @Last Modified time: 2018-01-05 11:37:51
 */
app.qbxsfx.qbxsgl.search = {
	pageContainer: '.qbxsgl',
	url: 'pages/qbxsfx/qbxsgl/index.html',
	constant: {
		qbxsType: { // 线索总体统计中的分类
			nameMap: {
				'1': 'ssqt',
				'2': 'ssry',
				// '3': 'total',
				'4': 'glxs',
				'5': 'wxxs',
			},
			keyMap: {
				'ssqt': '1',
				'ssry': '2',
				// 'total': '3',
				'glxs': '4',
				'wxxs': '5',
			}
		}
	},
	
	// 初始化页面
	init: function() {
		// 初始化时间选择框
		app.time.init();
		// // 初始化码表类型下拉框
		// app.qbxsfx.initDictSelect(this.pageContainer);
		// 初始化涉事类别树DOM
		app.qbxsfx.initSslbTree(this.pageContainer + ' .sslb-tree-item');
		// 初始化采集单位树DOM
		app.qbxsfx.initCjdwTree(this.pageContainer + ' .cjdw-tree-item');
		// 初始化页面 统计图 
		this.initXszttj();
		// 初始化页面 柱状图echarts 
		this.initCharts();
		// 初始信息表搜索
		this.initSearchForm(1, 10, app.qbxsfx.pagination);
		// 初始化页面元素点击功能
		this.initClickFunc();

	},

	//全局刷新
	reset: function() { 

	},

	//当前页刷新
	refresh: function() { 
		const page = $('#qbxsglPagination li.active a').text();
		this.initSearchForm(page, 10, app.qbxsfx.pagination);
	},

	// 初始化页面元素点击功能
	initClickFunc: function() {
		const that = this;
		// 查询按钮
		$('.btn_search', that.pageContainer).on('click', function() {
			// 清楚之前选择的 线索总体统计 类别
			$('.nowrap-block .clue-statistics-content', that.pageContainer).removeData('type');
			$('.nowrap-block .clue-statistics-content .active', that.pageContainer).removeClass('active');
			// 刷新列表
			that.initSearchForm(1, 10, app.qbxsfx.pagination);
			// 初始化页面 统计图 
			that.initXszttj();
		});
		// 线索总体统计 圆圈分类 点击刷新列表
		$('.nowrap-block .clue-statistics-content', that.pageContainer).on('click', '.ring', function() {
			const _this = this,
				qbxsType = $(_this).attr('class').split(' ')[1].split('C')[0],
				qbxsTypeCode = that.constant.qbxsType.keyMap[qbxsType];
			if ($(_this).hasClass('active')) { //点击active状态的类型。则是清楚线索类型，查询全部线索
				$(_this).removeClass('active');
				$(_this).parents('.clue-statistics-content').removeData('type'); //清楚之前选择的 线索总体统计 类别
			} else {
				$(_this).addClass('active').siblings('.active').removeClass('active');
				$(_this).parents('.clue-statistics-content').data('type', qbxsTypeCode); //存储类型数据到父级元素
			}
			that.initSearchForm(1, 10, app.qbxsfx.pagination);
		});
		// 转为无效
		$('.turn_invalid', that.pageContainer).on('click', function() {
			const selectXs = $('.table-body input.checkbox', that.pageContainer).filter(function() {
				return $(this).is(':checked');
			});
			if (selectXs.length < 1) {
				app.alert('请选择至少一条线索！');
				return;
			}

			layer.confirm('您确定要将选中的线索转为无效？', {
				btn: ['确定', '取消'],
				title: '转为无效'
			}, function(index) {
				let idsArray = [],
					param = {};
				selectXs.each(function() {
					idsArray.push($(this).parents('tr').data('id'));
				});
				param = {
					qbxxids: idsArray,
					cancelstatus: '1',
				}
				app.api.qbxsfx.turnXsInvalid({
					data: param,
					success: function(result) {
						// console.log(result);
						if (result.success === 0) {
							app.alert('操作失败！');
							return;
						}
	
						that.refresh();
					}
				});
				
				layer.close(index);
			});

		});
		// 表格数据 情报分析按钮
		$(document).on('click', that.pageContainer + ' .btn_qbfx', function() {
			const id = $(this).parents('tr').data('id'),
				sslb = $(this).parents('tr').data('sslb'),
				prePage = {
					do: 'qbfx',
					qbxxid: id,
					sslb: sslb,
				};
			sessionStorage.setItem("prePage", JSON.stringify(prePage));
			app.nav.toPage('pages/qbxsfx/xsfxcl/index.html');
		});
		// 新增线索
		$('.operate-buttons-box .btn_addNewClue', that.pageContainer).on('click', function() {
			// 在原有页面上覆盖一个页面，而不是替换
			app.qbxsfx.qbxsgl.add.open();
		});
		// 修改线索
		$(document).on('click', that.pageContainer + ' .table-box .btn_update', function() {
			const id = $(this).parents('tr').data('id');
			$(that.pageContainer).data('update-id', id); // 储存数据
			app.qbxsfx.qbxsgl.update.open();
		});
		// 组合线索
		$('.operate-buttons-box .combine_clue', that.pageContainer).on('click', function() {
			let ids = [],
				selected = $(that.pageContainer).find('.table-box .table-body input[type="checkbox"]:checked'),
				ifHasInvalid = false;
			if (selected.length < 2) { // 至少先选择两条线索用于组合
				app.alert('请至少先选择两条线索用于组合！');
				return ;
			}
			selected.each(function() {
				if ($(this).parents('tr').find('.invalid').length > 0) { //无效线索不能参与线索组合
					app.alert('无效线索不能参与线索组合！');
					ifHasInvalid = true;
					return false;
				}
				ids.push($(this).parents('tr').data('id'));
			});
			if (ifHasInvalid) {
				return ;
			}
			$(that.pageContainer).data('combine-clue-ids', ids); //存储数据
			// 在原有页面上覆盖一个页面，而不是替换
			app.qbxsfx.qbxsgl.combineClue.open();
		});

	},

	// 初始信息表搜索
	initSearchForm: async function(pageNo, pageSize, pagination) {
		const that = app.qbxsfx.qbxsgl.search,  //因为要将initSearchForm函数传入pagination中执行，所以that要指向具体的对象，不能用this
			startDate = $('input[name="startDate"]', that.pageContainer).val(),
			endDate = $('input[name="endDate"]', that.pageContainer).val();

		if (app.time.jiaoyan(startDate, endDate) > 0) return; //检查开始时间是否小于结束时间

		const param = app.qbxsfx.serializeForm($('form', that.pageContainer)), // 获取查询所需数据
			type = $('.nowrap-block .clue-statistics-content', that.pageContainer).data('type');
		param.type = type ? type : '';
		param.pageNo = pageNo;
		param.pageSize = pageSize;

		const result = await app.api.qbxsfx.viewQbxsList({data: param});
		// console.log(result);
		if (result.success === 0) {
			app.alert('查询数据失败！');
			return;
		}

		const data = result.msg ? result.msg.result : '',
			tbodyContainer = $(that.pageContainer).find(".table-body");
		let tableBodyTemple = '';

		tbodyContainer.empty();
		for (let i = 0, j = data.length; i < j; i++) {
			tableBodyTemple +=
				`<tr data-id="${data[i].qbxxid}" data-sslb="${data[i].sslb}">
				<td class="checks">
					<label class="check">
						<input type="checkbox" class="checkbox" val="${data[i].qbxxid}">
						<span></span>
					</label>
				</td>
				<td class="intelligence-name" title="${data[i].bt}">${app.data(data[i].bt)}</td>
				<td title="${data[i].xxzw}">${app.data(data[i].xxzw)}</td>
				<td title="${data[i].category==='0'? '人力' : '自采'}">${data[i].category==='0'? '人力' : '自采'}</td>
				<td title="${data[i].xsly}">${app.data(data[i].xsly)}</td>
				<td title="${data[i].sslbmc}">${app.data(data[i].sslbmc)}</td>
				<td title="${app.date.formatDateTime(data[i].tbsj)}">${app.data(app.date.formatDateTime(data[i].tbsj))}</td>
				<td title="${data[i].qtmc}" class="qtmc">${app.data(data[i].qtmc)}</td>
				${data[i].cancelstatus === '0' ? '<td>有效</td>' : '<td class="invalid">无效</td>'}
				<td class="operate">
					<span class="glyphicon glyphicon-list-alt ${data[i].cancelstatus === '0' ? 'btn_qbfx' : 'btn-wx'}" aria-hidden="true" data-toggle="tooltip" data-placement="bottom" title="情报分析"></span>
					<span class="glyphicon glyphicon-pencil ${data[i].category === '1' ? 'btn_update' : 'btn-wx'}" aria-hidden="true" data-toggle="tooltip" data-placement="bottom" title="修改"></span>
				</td> 
			</tr>`;
		};
		tbodyContainer.append(tableBodyTemple);
		app.qbxsfx.initCheckAll(); // 初始化checkbox按钮全选
		app.qbxsfx.initTooltip(); // 初始化表格最后一列操作文字的提示
		pagination && pagination(result, 'qbxsglPagination', that.initSearchForm);
		// 根据是否选择关联群体类，来判断是否显示群体名称这一列
		if ($('.nowrap-block .ssqtCount', that.pageContainer).hasClass('active')) {
			$('.table-box .qtmc', that.pageContainer).css('display', 'table-cell');
		} else {
			$('.table-box .qtmc', that.pageContainer).css('display', 'none');
		}
		
	},

	// 初始化页面 统计图 
	initXszttj: async function() {
		const param = app.qbxsfx.serializeForm($('form', this.pageContainer));

		// 初始化统计图
		const result = await app.api.qbxsfx.getCountQbxs({data: param});
		// console.log(result);
		if (result.success === 0) {
			app.alert('获取线索统计数据失败！');
			return;
		}
		const msg = result.msg;
		for (let key in msg) {
			$('.clue-statistics-box .' + key + ' span', this.pageContainer).text(msg[key]);
		}
		$('.clue-statistics-box > .color-block-title > span', this.pageContainer).text(msg.totalCount);
	},

	// 初始化页面 柱状图echarts 
	initCharts: async function() {
		// 初始化柱状图
		const histogram = echarts.init($('.clue-relation-content', this.pageContainer)[0]);
		// -指定图表的配置项和数据
		const option = {
			color: ['#3398DB'],
			tooltip: {
				trigger: 'axis',
				axisPointer: { // --坐标轴指示器，坐标轴触发有效
					type: 'shadow' // --默认为直线，可选为：'line' | 'shadow'
				}
			},
			grid: {
				top: '14%',
				left: '1%',
				right: '1%',
				bottom: '1%',
				containLabel: true
			},
			xAxis: [{
				type: 'category',
				data: [],
				axisTick: {
					alignWithLabel: true
				},
				splitLine: {
					show: false,
				},
			}],
			yAxis: [{
				type: 'value',
				splitLine: {
					show: false,
				},
			}],
			series: [{
				name: '群体人数',
				type: 'bar',
				barWidth: '40%',
				itemStyle: {
					normal: {
						color: new echarts.graphic.LinearGradient(
							0, 0, 0, 1, [{
									offset: 0,
									color: '#22b6a2'
								},
								{
									offset: 1,
									color: '#249dd0'
								}
							]
						)
					},
				},
				label: {
					normal: {
						show: true,
						position: 'top',
						color: '#249dd0',
					}
				},
				data: [],
			}]
		};

		const result = await app.api.qbxsfx.getCountQbxsSsqt();
		// console.log(result);
		if (result.success === 0) {
			app.alert('获取线索关联涉事群体统计失败！');
			return;
		}
		const msg = result.msg,
			qtlbArray = [],
			qtlbmcArray = [],
			countArray = [];
		for (let i = 0, j = msg.length; i < j; i++) {
			qtlbArray.push(msg[i].code);
			qtlbmcArray.push(app.data(msg[i].name));
			countArray.push(msg[i].count);
		}
		option.xAxis[0].data = qtlbmcArray;
		option.series[0].data = countArray;

		// 使用刚指定的配置项和数据显示图表。
		histogram.setOption(option);

	},

}
