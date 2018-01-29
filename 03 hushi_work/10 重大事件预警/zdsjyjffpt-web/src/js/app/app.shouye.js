app.shouye = {
	init: function () {
		app.container.init();
		this.initcharts();
		this.initXszttj();
		this.initSjyjtj();
		//初始化动态预警数据
		this.initDtyj();
	},
	yj:function(){
		app.nav.toPage("pages/zdsjyjgl/index.html");
		var list = $("#sidebar-menu").children("li");
		$(".nav-index").removeClass("active");
		$(".nav-zdsjyjgl").addClass("active");
	},
	toBJ:function(){
		app.nav.toPage("pages/ztjc/index.html");
		var list = $("#sidebar-menu").children("li");
		$(".nav-index").removeClass("active");
		$(".nav-ztjc").addClass("active");
	},
	xs:function(){
		$(".nav-qbxsfx").siblings('li').find('.active').removeClass('active');
		if ($(".nav-qbxsfx").children(".sencend-menu").is(':hidden')) {
			$(".nav-qbxsfx").children(".sencend-menu").animate({
					height: 'show'
				}, 400)
				//siblings遍历sencend-menu的元素
				.end().siblings().find(".sencend-menu").hide(400);
				app.nav.toPage("pages/qbxsfx/qbxsgl/index.html");
				$(".nav-index").removeClass("active");
				$(".nav-qbxsfx").addClass("active");
				var li = $(".nav-qbxsfx").children("ul");
				var chli = $(li).children("li")[0];
				$(chli).addClass("active")
		} else {
			$(".nav-qbxsfx").children(".sencend-menu").animate({
					height: 'hide'
				}, 400)
				.end().siblings().find(".sencend-menu").hide(400)
				.end().siblings().find(".thired-menu").hide(400);;
		}
	},
	initcharts: function () {
		const that = this;

		// 初始化柱状图-------------------------------------------------------------------------------------------------
		// -指定图表的配置项和数据
		const option_histogram = {
			color: ['#3398DB'],
			title: {
				// text: '近一周（9月11-17日） 共 500 人进京',
				left: 'center',
				textStyle: {
					color: '#343434',
					fontSize: '14',
					fontFamily: 'MicrosoftYaHei',
					fontWeight: 'lighter',
				},
			},
			tooltip: {
				trigger: 'axis',
				axisPointer: {            // --坐标轴指示器，坐标轴触发有效
					type: 'shadow'        // --默认为直线，可选为：'line' | 'shadow'
				}
			},
			legend: { //图例
				right: '1%',
				data: [
					{
						name: '群体总数',
						// 图形
						icon: 'roundRect',
						// 文本
						textStyle: {
							color: '#249dd0',
							fontSize: '12'
						}
					},
					{
						name: '进京人数',
						// 图形
						icon: 'roundRect',
						// 文本
						textStyle: {
							color: '#ff7200',
							fontSize: '12'
						}
					},
				],
			},
			grid: {
				top: '24%',
				left: '1%',
				right: '1%',
				bottom: '1%',
				containLabel: true
			},
			xAxis: [
				{
					type: 'category',
					// data : ['涉访群体', '涉访群体', '涉访群体', '涉访群体', '涉访群体', '涉访群体', '涉访群体'],
					axisTick: {
						alignWithLabel: true
					},
					splitLine: {
						show: false,
					},
				}
			],
			yAxis: [
				{
					type: 'value',
					splitLine: {
						show: false,
					},
				}
			],
			series: [
				{
					name: '进京人数',
					type: 'bar',
					barWidth: '30%',
					// stack: '人数',
					barGap: '-100%', // 不用堆叠，用控制两个柱状图重叠来实现对撞图堆叠
					z: '2',
					// data:[10, 102, 120, 110, 90, 100, 70],
					itemStyle: {
						normal: {
							color: '#ff7200',
						},
					},
					label: {
						normal: {
							show: true,
							position: 'top',
							color: '#fff',
						}
					},
				},
				{
					name: '群体总数',
					type: 'bar',
					barWidth: '30%',
					// stack: '人数',
					barGap: '-100%', // 不用堆叠，用控制两个柱状图重叠来实现对撞图堆叠
					z: '1',
					// data:[590, 620, 520, 510, 580, 460, 570],
					itemStyle: {
						normal: {
							color: '#249dd0',
						},
					},
					label: {
						normal: {
							show: true,
							position: 'top',
							color: '#249dd0',
						}
					},
				}
			]
		};
		// 请求表格数据
		app.api.ztjc.getJjryCount({
			success: function (result) {
				// console.log(result);
				const histogram = echarts.init(document.getElementById('test1'));

				if (result.success === 0) {
					app.alert('获取进京人员统计信息失败！');
					// app.loading.hide(); // 隐藏loading
					return;
				}
				const msg = result.msg,
					groupPersonList = msg.countGroupPersonList,
					jjGroupArray = [], //群体进京人数统计
					groupArray = [], //群体总数
					groupNameArray = []; //群体名称
				// 添加群体数据
				for (let i = 0, j = groupPersonList.length; i < j; i++) {
					jjGroupArray.push(groupPersonList[i].counts);
					groupArray.push(groupPersonList[i].groupSize);
					groupNameArray.push(app.data(groupPersonList[i].groupName));
				}
				// 添加个人数据
				jjGroupArray.push(msg.noGroupCounts);
				groupArray.push(msg.noGroupCounts);
				groupNameArray.push('涉事个人');

				option_histogram.series[0].data = jjGroupArray;
				option_histogram.series[1].data = groupArray;
				option_histogram.xAxis[0].data = groupNameArray;
				// 设置表格标题
				option_histogram.title.text = `近一周共
				${msg.countAll}
				人进京`;

				// 使用刚指定的配置项和数据显示图表。
				histogram.setOption(option_histogram);
			}
		});


		// 初始化饼图----------------------------------------------------------------------------------------------------
		//const pie = echarts.init($(that.pageContainer + ' .jrjjrs-content-block .left-pie-chart')[0]);
		// -指定图表的配置项和数据
		const option_pie = {
			color: ['#b3dffd', '#9bc9e8', '#f39e59', '#50e6d3', '#f265fb', '#ff0000', '#fff67e', '#749f83', '#c4ccd3', '#d48265', '#abdc00', '#bda29a'],
			tooltip: {
				trigger: 'item',
				formatter: "{a} <br/>{b} : {c} ({d}%)"
			},
			series: [
				{
					name: '今日进京人数',
					type: 'pie',
					radius: '85%',
					center: ['50%', '50%'],
					// data:[
					//     {value:335, name:'赛罕区'},
					//     {value:310, name:'玉泉区'},
					// ],
					itemStyle: {
						emphasis: {
							shadowBlur: 10,
							shadowOffsetX: 0,
							shadowColor: 'rgba(0, 0, 0, 0.5)'
						}
					},
					label: {
						normal: {
							position: 'inside',
							show: true,
							formatter: '{c}',
						}
					},
					labelLine: {
						normal: {
							show: false,
						}
					}
				}
			]
		};
		// 请求表格数据
		app.api.ztjc.getJjryTodayCount({
			success: function (result) {
				// console.log(result);
				const pie = echarts.init(document.getElementById('test2'));

				if (result.success === 0) {
					app.alert('获取今日进京人员统计信息失败！');
					// app.loading.hide(); // 隐藏loading
					return;
				}
				const msg = result.msg,
					countToBJTodayList = msg.countToBJTodayList,
					dataArray = [];
				let jrjjrsTbodyTemp = '';
				for (let i = 0, j = countToBJTodayList.length; i < j; i++) {
					dataArray[i] = {};
					dataArray[i].value = countToBJTodayList[i].counts;
					dataArray[i].name = countToBJTodayList[i].censusAreaCn;
					jrjjrsTbodyTemp += `<tr>
						<td class="color-${(i)%12 + 1}">${countToBJTodayList[i].censusAreaCn}</td>
						<td>${countToBJTodayList[i].counts}</td>
					</tr>`;
				}
				option_pie.series[0].data = dataArray;
				// 总数设置
				$('.jjrs-num').text(msg.countTodayAll);
				// 今日人数统计表初始化
				$('.table-body').html(jrjjrsTbodyTemp);

				// 使用刚指定的配置项和数据显示图表。
				pie.setOption(option_pie);
			}
		});

	},
	initXszttj: function () {
		const param = app.qbxsfx.serializeForm($('form', this.pageContainer));

		// 初始化统计图
		app.api.qbxsfx.getCountQbxs({
				data: param,
				success: (result) => {
				// console.log(result);
				if (result.success === 0)
				{
					app.alert('获取线索统计数据失败！');
					// app.loading.hide(); // 隐藏loading
					return;
				}
				const msg = result.msg;
				for (let key in msg) {
					$('.clue-statistics-box .' + key + ' span', this.pageContainer).text(msg[key]);
				}
				$('.clue-statistics-box > .color-block-title > span', this.pageContainer).text(msg.totalCount);
			}
		});
	},
	initSjyjtj: function () {
		const that = this;

		// 初始化统计图
		app.api.zdsjyjgl.getSjyjCount({
			success: function (result) {
				// console.log(result);
				if (result.success === 0) {
					app.alert('获取事件预警统计数据失败！');
					// app.loading.hide(); // 隐藏loading
					return;
				}
				const msg = result.msg;
				$(".left-part").find('.swsjyj span').text(msg['涉稳重大事件预警模型']);
				$(".left-part").find('.sjsjyj span').text(msg['涉疆重大事件预警模型']);
				//$(".left-part").find('.zasjyj span').text(msg['治安重大事件预警模型']);
				$(".left-part").find('.wwqtyj span').text(msg['countAllWarnGroups']);
				$(".left-part").find('.wwryyj span').text(msg['countAllWarnPersons']);
				//$('.clue-statistics-box > .color-block-title > span', this.pageContainer).text(msg['countAllWarns']);
				$('#countAllWarns', this.pageContainer).text(msg['countAllWarns']);
			}
		});
	},
	initDtyj: function () {
		const that = this;
		const param = app.qbxsfx.serializeForm($(that.pageContainer).find('.filter-conditions form')); // 获取查询所需数据
		param.pageNo = 1;
		param.pageSize = 10;
		// 初始化统计图
		app.api.zdsjyjgl.viewPersonList({
			data: param,
			success: function (result) {
				// console.log(result);
				if (result.success === 0) {
					app.alert('查询数据失败！');
					app.loading.hide(); // 隐藏loading
					return;
				}
				const data = result.msg ? result.msg.result : '';
				let tableBodyTemple = '';
				$("#dynamicWarnIndexTable").empty();
				for (let i = 0, j = data.length; i < j; i++) {
					tableBodyTemple +=
					`<tr data-id="${data[i].id}">
						<td><img src='images/blueled.png'>
						</td><td title="${data[i].name}">${app.data(data[i].name)}</td>
							<td title="${data[i].sfzh}">${app.data(data[i].sfzh)}</td>
							<td title="${data[i].actType}">${app.data(data[i].actType)}</td>
							<td title="${data[i].actTime}">${app.data(data[i].actTime)}</td>
							<td class="pop" title="${data[i].warnDetail}">${app.data(data[i].warnDetail)}</td>
							<td title="${data[i].warnTime}">${app.data(data[i].warnTime)}</td>
						</tr>`;
				};
				$("#dynamicWarnIndexTable").append(tableBodyTemple);
				//app.qbxsfx.initTooltip(); // 初始化表格最后一列操作文字的提示
				//pagination && pagination(result, 'personPagination', that.initSearchForm);
				app.loading.hide();
			}
		});
	},
}
