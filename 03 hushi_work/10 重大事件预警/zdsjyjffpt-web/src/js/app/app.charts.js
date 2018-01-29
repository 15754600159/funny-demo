app.charts = {
	init: function(host) {
		// ajax 多维分析接口
		var listmoe = $(".list-botton");
		function ajxasize(i) {
			$.ajax({
				type: "get",
				async: false,
				url: host + "/zx/dwcx/tj/?dxlx=1&hdlx=" + i,
				dataType: "json",
				success: function(response) {
					var data = response.msg[0];
					var content;
					if (data) {
						content = '<p>群体</p>' +
							'<p>总量：' + data.totalNum + '</p>' +
							'<p>今日：' + data.dayNum + '</p>';
					} else {
						content = '<p>群体</p>' +
							'<p>总量：0</p>' +
							'<p>今日：0</p>';
					}

					$(all).html(content);
				}
			});
		}
		function ajaxone(i) {
			$.ajax({
				type: "get",
				async: false,
				url: host + "/zx/dwcx/tj/?dxlx=2&hdlx=" + i,
				dataType: "json",
				success: function(response) {
					var data = response.msg[0];
					var content;
					if (data) {
						content = '<p>个体</p>' +
							'<p>总量：' + data.totalNum + '</p>' +
							'<p>今日：' + data.dayNum + '</p>';
					} else {
						content = '<p>个体</p>' +
							'<p>总量：0</p>' +
							'<p>今日：0</p>';
					}
					$(one).html(content);
				}
			});
		}

		for (var j = 0; j < listmoe.length; j++) {
			var all = $(listmoe[j]).find(".all");
			var one = $(listmoe[j]).find(".one");
			ajxasize(j);
			ajaxone(j);
		}
		
		// 指定图表的配置项和数据
		option = {
			tooltip : {
				trigger: 'axis',
				axisPointer : {            // 坐标轴指示器，坐标轴触发有效
					type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
				}
			},
			legend: {
				data:['群体总数','核心人员']
			},
			grid: {
				left: '3%',
				right: '4%',
				bottom: '3%',
				containLabel: true
			},
			xAxis : [
				{
					type : 'category',
					data : ['涉访群体','涉访群体','涉访群体','涉访群体','涉访群体','涉访群体','涉访群体']
				}
			],
			yAxis : [
				{
					type : 'value'
				}
			],
			series : [
				{
					name:'直接访问',
					type:'bar',
					data:[320, 332, 301, 334, 390, 330, 320],
					stack: '广告',
					itemStyle:{
						normal:{
							color:"#249dd0"
						}
					}
				},
				{
					name:'邮件营销',
					type:'bar',
					stack: '广告',
					data:[120, 132, 101, 134, 90, 230, 210],
					itemStyle:{
						normal:{
							color:"#ff7200"
						}
					}
				}
			]
		};
		myChart.setOption(option);
		// $.ajax({
		// 	type: "get",
		// 	url: host + "/zx/group/gzqttj/",
		// 	dataType: "json",
		// 	success: function(response) {
		// 		var qtlist = [];
		// 		var data = response.msg;
		// 		var datax = response.alert;
		// 		var schema = [
		// 			{ name: 'date', index: 0, text: '日' },
		// 			{ name: '积分', index: 1, text: '积分' },
		// 			{ name: '规模', index: 2, text: '规模' },
		// 		];
		// 		option = {
		// 			title: {
		// 				text: '关注群体 ',
		// 				left: '10',
		// 				top: '10',
		// 				textStyle: {
		// 					color: '#6447f1',
		// 					fontWeight: 'normal',
		// 					fontSize: '18',
		// 				}
		// 			},
		// 			backgroundColor: '#fff',
		// 			legend: {
		// 				top: '10',
		// 				data: qtlist,
		// 				textStyle: {
		// 					fontSize: 12
		// 				}
		// 			},
		// 			grid: {
		// 				x: '10%',
		// 				x2: 80,
		// 				y: '27%',
		// 				y2: '10%'
		// 			},
		// 			tooltip: {
		// 				padding: 10,
		// 				backgroundColor: '#222',
		// 				borderColor: '#777',
		// 				borderWidth: 1,
		// 				formatter: function(obj) {
		// 					var value = obj.value;
		// 					return '<div style="border-bottom: 1px solid rgba(255,255,255,.3); font-size: 18px;padding-bottom: 7px;margin-bottom: 7px">'
		// 						+ obj.seriesName + ' ' + value[0] + '日：'
		// 						+ '</div>'
		// 						+ schema[1].text + '：' + value[1] + '<br>'
		// 						+ schema[2].text + '：' + value[2] + '<br>';
		// 				}
		// 			},
		// 			xAxis: {
		// 				data: datax,
		// 				name: '日期',
		// 				nameGap: 16,
		// 				nameTextStyle: {
		// 					color: '#000',
		// 					fontSize: 14
		// 				},
		// 				splitLine: {
		// 					show: false
		// 				},
		// 				axisLine: {
		// 					lineStyle: {
		// 						color: '#d3d9e1'
		// 					}
		// 				},
		// 				axisLabel: {
		// 					show: true,
		// 					textStyle: {
		// 						color: '#000'
		// 					}
		// 				}
		// 			},
		// 			yAxis: {
		// 				type: 'value',
		// 				name: '积分',
		// 				nameLocation: 'end',
		// 				nameGap: 20,
		// 				nameTextStyle: {
		// 					color: '#000',
		// 					fontSize: 16
		// 				},
		// 				axisLine: {
		// 					lineStyle: {
		// 						color: '#d3d9e1'
		// 					}
		// 				},
		// 				axisLabel: {
		// 					show: true,
		// 					textStyle: {
		// 						color: '#000'
		// 					}
		// 				},
		// 				splitLine: {
		// 					show: false
		// 				}
		// 			},
		// 			series: []
		// 		};
		// 		// 使用刚指定的配置项和数据显示图表。			
		// 		$.each(data, function(i, val) {
		// 			qtlist.push(i);
		// 			console.info(data[i]);
		// 			var item = {
		// 				name: i,
		// 				type: 'scatter',
		// 				data: data[i],
		// 				symbolSize: function(data) {
		// 					return data[2];
		// 				},
		// 			};

		// 			option.series.push(item);
		// 		});
		// 		myChart.setOption(option);
		// 	}
		// });
		$.ajax({
			type: "get",
			url: host + "/zx/yj/yjdtgk/",
			dataType: "json",
			success: function(response) {
				var data = response;
				piesoption = {
					title: {
						text: '动态预警管控 ' + data.date,
						left: '10',
						top: '10',
						textStyle: {
							color: '#6447f1',
							fontWeight: 'normal',
							fontSize: '18',
						}
					},
					tooltip: {
						trigger: 'item',
						formatter: "{a} <br/>{b}: {c} ({d}%)"
					},
					legend: {
						orient: 'vertical',
						right: '20',
						top: '20',
						data: ['红色预警', '橙色预警', '黄色预警', '蓝色预警']
					},
					color: ['red', '#fc863e', '#f5b12e', '#246be6'],
					series: [

						{
							name: '预警管控',
							type: 'pie',
							radius: ['40%', '55%'],
							itemStyle: {
								normal: {
									// color: 各异,
									borderColor: '#fff',
									borderWidth: 2,
									label: {
										show: true,
										position: 'outer'
										// textStyle: null      // 默认使用全局文本样式，详见TEXTSTYLE
									}
								}
							},
							data: [{
								value: data.redNum,
								name: '红色预警'
							},
							{
								value: data.orangeNum,
								name: '橙色预警'
							},
							{
								value: data.yellowNum,
								name: '黄色预警'
							},
							{
								value: data.blueNum,
								name: '蓝色预警'
							}
							]
						}
					]
				};
				pieChart.setOption(piesoption);
			}
		});
		$.ajax({
			type: "get",
			url: host + "/zx/group/qttj/",
			dataType: "json",
			success: function(response) {
				var data = response;
				var dataAxis = [];
				var databar = [];
				for (var i = 0; i < data.length; i++) {
					dataAxis.push(data[i].gxfjmc);
					databar.push(data[i].num);
				}
				var yMax = 10;
				var dataShadow = [];
				for (var i = 0; i < databar.length; i++) {
					dataShadow.push(yMax);
				}
				optionbar = {
					title: {
						text: '群体统计',
						left: '10',
						top: '10',
						textStyle: {
							color: '#6447f1',
							fontWeight: 'normal',
							fontSize: '18',
						}
					},
					xAxis: {
						data: dataAxis,
					},
					yAxis: {
						axisLine: {
							show: false
						},
						axisTick: {
							show: false
						},
						axisLabel: {
							textStyle: {
								color: '#999'
							}
						}
					},
					series: [{ // For shadow
						type: 'bar',
						itemStyle: {
							normal: {
								color: 'rgba(0,0,0,0.05)'
							}
						},
						barMaxWidth: '20px',
						barGap: '-100%',
						barCategoryGap: '40%',
						data: dataShadow,
						animation: false
					},
					{
						type: 'bar',
						barMaxWidth: '20px',
						itemStyle: {
							normal: {
								color: new echarts.graphic.LinearGradient(
									0, 0, 0, 1, [{
										offset: 0,
										color: '#83bff6'
									},
									{
										offset: 0.5,
										color: '#188df0'
									},
									{
										offset: 1,
										color: '#188df0'
									}
									]
								)
							},
							emphasis: {
								color: new echarts.graphic.LinearGradient(
									0, 0, 0, 1, [{
										offset: 0,
										color: '#2378f7'
									},
									{
										offset: 0.7,
										color: '#2378f7'
									},
									{
										offset: 1,
										color: '#83bff6'
									}
									]
								)
							}
						},
						data: databar
					}
					]
				};
				barChart.setOption(optionbar);
			},
		});
		// Enable data zoom when user click bar.
	}
};
