var controller = {
	consts: {
		TB: 1,	//同比
		HB: 2	//环比
	},
	//加载日历
	initCalendar: function() {
		var startDate = moment(moment().subtract(30, 'days').calendar()).format("YYYY-MM-DD");
		var endDate = moment().format("YYYY-MM-DD");

		//日期，默认时间设成当日到前30天
		var $datePicker = $('#reservation').val(startDate + ',' + endDate);
		$datePicker.daterangepicker({
			'locale': locale,
			format: "YYYY-MM-DD",
			startDate: startDate,
			endDate: endDate,
		}, function (start, end) {
			startDate = start.format('YYYY-MM-DD');
			endDate = end.format('YYYY-MM-DD');
			$datePicker.val(startDate + ',' + endDate);
		});
	},
	//按钮和下拉框操作
	option: function() {
		var _this = this;
		//查询按钮点击事件
		$("#find").click(function () {
			_this.lrlc();
			_this.getData();
			QianxiData();
			QianxiData1();
		});

		//高危人员类别
		$('#hushi-xiaqu ul li a').on('click', function (x, i) {
			var text = x.currentTarget.innerHTML;
			$('#hushi-xiaqu .text').text(text);
		});

		//出行类型
		$('#hushi-people ul li a').on('click', function (x, i) {
			var text = x.currentTarget.innerHTML;
			//alert(text);
			$('#hushi-people .text').text(text);
		});

		//自定义时间(月，周，日)
		$('#hushi-time ul li a').on('click', function (x, i) {
			var text = x.currentTarget.innerHTML;
			//alert(text);
			$('#hushi-time .text').text(text);
			if (text == "月") {
				startDate = moment(moment().subtract(30, 'days').calendar()).format("YYYY-MM-DD");
				endDate = moment().format("YYYY-MM-DD");
				$('#reservation').val(startDate + ',' + endDate);
				$('#reservation').attr("disabled", true);
			} else if (text == "周") {
				startDate = moment(moment().subtract(7, 'days').calendar()).format("YYYY-MM-DD");
				endDate = moment().format("YYYY-MM-DD");
				$('#reservation').val(startDate + ',' + endDate);
				$('#reservation').attr("disabled", true);
			} else if (text == "日") {
				startDate = moment(moment().subtract(1, 'days')).format("YYYY-MM-DD");
				endDate = moment().format("YYYY-MM-DD");
				$('#reservation').val(startDate + ',' + endDate);
				$('#reservation').attr("disabled", true);
			} else {
				$('#reservation').attr("disabled", false);
			}
		});
		//同比环比按钮切换样式
		$(".Btn").click(function () {
			$(".Btn").removeClass("active1");
			$(this).addClass("active1");
			//填充折线图
			_this.fillThbCharts();
		});
	},
	lrlc: function(ret1, ret2){
		var _this = this;
		//流入流出
		
		var x = [], y1 = [], y2 = [];
		for(var i in ret1){
			if($.inArray(i, x) == -1)
				x.push(i);
		}
		
		for(var i in ret2){
			if($.inArray(i, x) == -1)
				x.push(i);
		}
		//排序
		x = x.sort(function(a,b){
			return a.localeCompare(b);
		});
		
		$.each(x, function(i, item){
			y1.push(ret1[item]||0);
			y2.push(ret2[item]||0);
		});
		_this.getZhexianPic(x,y1, y2);
	},
	//加载echarts折线图
	getZhexianPic:function(x, y1, y2) {
		var myChart = echarts.init(document.getElementById('userLiveness'));
		var oneOption = {
			title: {
				// text: '高危人员流入流出',
				//subtext: '高危人员流入流出'
			},
			tooltip: {
				trigger: 'axis'
			},
			legend: {
				data: ['流入数', '流出数']
			},
			yAxis: [
				{
					name: '人数',
					type: 'value'
				}/*,
				{
					name: '流出人数',
					type: 'value'
				}*/
			],
			xAxis: [
				{
					boundaryGap: false,
					splitNumber:x.length,
					data:x
				}
			],
			series: [
				{
					name: '流入数',
					type: 'line',
					smooth: true,
					itemStyle: {
						normal: {
							areaStyle: {color: '#65E2BF'},
							lineStyle: {color: '#09A472'}
						}
					},
					data: y1
				},
				{
					name: '流出数',
					type: 'line',
					smooth: true,
					//yAxisIndex: 1,//流出数使用右边的y轴
					itemStyle: {
						normal: {
							areaStyle: {color: '#3CC1F6'},
							lineStyle: {color: '#008BD3'}
						}
					},
					data:y2
				}
			]
		};
		myChart.setOption(oneOption);
		$(window).resize(function () {
			myChart.resize();
		});
	},
	//加载同环比echarts折线图
	getThbZhexianPic: function(x, y1, y2) {
		var myChart1 = echarts.init(document.getElementById('userLiveness1'));
		//var barColor = '#0c89ff';
		twoOption = {
			title: {
				//subtext: '高危人员流入流出'
			},
			tooltip: {
				trigger: 'axis'
			},
			legend: {
				data: ['流入数', '流出数']
			},
			yAxis: [
				{
					name: '数量',
					type: 'value'
				}
			],
			xAxis: [
				{
					type: 'category',
					boundaryGap: false,
					data: x
				}
			],
			series: [
				{
					name: '流入数',
					type: 'line',
					smooth: true,
					itemStyle: {
						normal: {
							areaStyle: {color: '#65E2BF'},
							lineStyle: {color: '#09A472'}
						}
					},
					data: y1
				},
				{
					name: '流出数',
					type: 'line',
					smooth: true,
					itemStyle: {
						normal: {
							areaStyle: {color: '#3CC1F6'},
							lineStyle: {color: '#008BD3'}
						}
					},
					data: y2
				}
			]
		};
		myChart1.setOption(twoOption);
		$(window).resize(function () {
			myChart1.resize();
		});
	},
	getCxlx: function(){
		var chuxing = $('#hushi-people .text').text();
		var chuxingType;
		if (chuxing == '飞机') {
            chuxingType = 'flight';
        } else if (chuxing == '火车') {
            chuxingType = 'train';
        } else {
            chuxingType = '';
        }
        return chuxingType;
	},
	getPersonType:function(){
		var person = $('#hushi-xiaqu .text').text();
		var personType;
		if (person == '涉藏') {
            personType = '54';
        } else if (person == '涉疆') {
            personType = '65';
        } else {
            personType = '';
        }
        return personType;
	},
	getParams: function(direction, thb){
		var person = $('#hushi-xiaqu .text').text();
        var chuxing = $('#hushi-people .text').text();
		var kssj = $('#reservation').val();
		if(thb == this.consts.TB)//同比
			kssj = this.getThbKssj(kssj, 'y');
		else  if(thb == this.consts.HB)//环比
			kssj = this.getThbKssj(kssj, 'M');
		
        var personType;
        var chuxingType;
        if (person == '涉藏') {
            personType = '54';
        } else if (person == '涉疆') {
            personType = '65';
        } else {
            personType = '';
        }
        if (chuxing == '飞机') {
            chuxingType = 'flight';
        } else if (chuxing == '火车') {
            chuxingType = 'train';
        } else {
            chuxingType = '';
        }
        var beginTime = $("#reservation").val().split(",")[0];
 		var endTime = $("#reservation").val().split(",")[1];
		var reqData = "beginTime="+beginTime+"&endTime="+endTime+"&gwrylbdm="+personType;
		return reqData;
	},
	parseData: function(data){
		var ret = {};
		for(var i in data){
			var map = amGloable.tools.toEntry(data[i]);
			ret[map.key] = map.value;
		}
		return ret;
	},
/*	//自动缩放
	autoResize: function(){
		$(window).resize(function () {
			myChart.resize();
			myChart1.resize();
		});
	},*/
	//获取同比时间
	getThbKssj: function(kssj, ymd){
		var time = kssj.split(',');
		var start = time[0], end = time[1];
		start = moment(start).subtract(1, ymd).format("YYYY-MM-DD");
		end = moment(end).subtract(1, ymd).format("YYYY-MM-DD");
		kssj = start + "," + end;
		return kssj;
	},
	getData: function(){
		var _this = this;
		var rets = [];
		var cxlx = _this.getCxlx();
		var lr, lc, tblr,tblc, hblr, hblc;
		if(cxlx == "flight"){
			lr = amGloable.api.lrj.getAjax(this.getParams(0));
			lc = amGloable.api.lcj.getAjax(this.getParams(1));
			tblr = amGloable.api.lrj.getAjax(this.getParams(0, this.consts.TB));
			tblc = amGloable.api.lcj.getAjax(this.getParams(1, this.consts.TB));
			hblr = amGloable.api.lrj.getAjax(this.getParams(0, this.consts.HB));
			hblc = amGloable.api.lcj.getAjax(this.getParams(1, this.consts.HB));
		} else if(cxlx == "train"){
			lr = amGloable.api.lrc.getAjax(this.getParams(0));
			lc = amGloable.api.lcc.getAjax(this.getParams(1));
			tblr = amGloable.api.lrc.getAjax(this.getParams(0, this.consts.TB));
			tblc = amGloable.api.lcc.getAjax(this.getParams(1, this.consts.TB));
			hblr = amGloable.api.lrc.getAjax(this.getParams(0, this.consts.HB));
			hblc = amGloable.api.lcc.getAjax(this.getParams(1, this.consts.HB));
		} else {
			lr = amGloable.api.lrcj.getAjax(this.getParams(0));
			lc = amGloable.api.lccj.getAjax(this.getParams(1));
			tblr = amGloable.api.lrcj.getAjax(this.getParams(0, this.consts.TB));
			tblc = amGloable.api.lccj.getAjax(this.getParams(1, this.consts.TB));
			hblr = amGloable.api.lrcj.getAjax(this.getParams(0, this.consts.HB));
			hblc = amGloable.api.lccj.getAjax(this.getParams(1, this.consts.HB));
		}
		
		//流入流出
		$.when(
			lr,//流入
			lc,//流出
			tblr,//同比流入
			tblc,//同比流出
			hblr,//环比流入
			hblc//环比流出
		).done(function(jqXHR1, jqXHR2, jqXHR3, jqXHR4, jqXHR5, jqXHR6){
			
			//由于加条件查询和不加条件查询的返回值结构不一样，需要进一步处理
			var ret1 = jqXHR1[0]; //ret1 = ret1.data && _this.parseData(ret1.data) || ret1;
			var ret2 = jqXHR2[0]; //ret2 = ret2.data && _this.parseData(ret2.data) || ret2;
			var ret3 = jqXHR3[0]; //ret3 = ret3.data && _this.parseData(ret3.data) || ret3;
			var ret4 = jqXHR4[0]; //ret4 = ret4.data && _this.parseData(ret4.data) || ret4;
			var ret5 = jqXHR5[0]; //ret5 = ret5.data && _this.parseData(ret5.data) || ret5;
			var ret6 = jqXHR6[0]; //ret6 = ret6.data && _this.parseData(ret6.data) || ret6;
			console.log(ret1)
			console.log(ret2)
			console.log(ret3)
			console.log(ret4)
			console.log(ret5)
			console.log(ret6)
			rets = [ret1, ret2, ret3, ret4, ret5, ret6];
			
			//流入流出
			_this.lrlc(ret1, ret2);
			//流入流出同比
			_this.fillThbCharts(rets);
		});
		_this.getRets = function(){
			return rets;
		}
	},
	fillThbCharts: function(arg){
		var _this = this;
		var rets = arg || this.getRets();
		var lrtb = this.countThb(rets[0], rets[2], _this.consts.TB);//流入同比
		var lctb = this.countThb(rets[1], rets[3], _this.consts.TB);//流出同比
		var lrhb = this.countThb(rets[0], rets[4], _this.consts.HB);//流入环比
		var lchb = this.countThb(rets[1], rets[5], _this.consts.HB);//流出环比
		
		var ret1, ret2;
		if($('.active1').attr('id') == 'hb'){
			//环比
			ret1 = lrhb;
			ret2 = lchb;
		} else {
			//同比
			ret1 = lrtb;
			ret2 = lctb;
		}
		
		var x = [], y1 = [], y2 = [];
		for(var i in ret1){
			if($.inArray(i, x) == -1)
				x.push(i);
		}
		
		for(var i in ret2){
			if($.inArray(i, x) == -1)
				x.push(i);
		}
		//排序
		x = x.sort(function(a,b){
			return a.localeCompare(b);
		});
		
		$.each(x, function(i, item){
			y1.push(ret1[item]||0);
			y2.push(ret2[item]||0);
		});
		_this.getThbZhexianPic(x,y1, y2);
	},
	countThb: function(ret1, ret2, thbType){
		var _this = this;
		//处理同环比数据
		if(thbType == this.consts.TB){
			var _ret2 = {};
			for(var i in ret2){
				var key = moment(i).subtract(-1, 'y').format('YYYY-MM');
				_ret2[key] = ret2[i];
			}
			ret2 = _ret2;
		} else if(thbType == this.consts.HB){
			var _ret2 = {};
			for(var i in ret2){
				var key = moment(i).subtract(-1, 'M').format('YYYY-MM');
				_ret2[key] = ret2[i];
			}
			ret2 = _ret2;
		}
		
		var x = [], y = [];
		for(var i in ret1){
			if($.inArray(i, x) == -1)
				x.push(i);
		}
		
		for(var i in ret2){
			if($.inArray(i, x) == -1)
				x.push(i);
		}
		//排序
		x = x.sort(function(a,b){
			return a.localeCompare(b);
		});
		var map = {};
		$.each(x, function(i, item){
			var thb = _this.thbSf((ret1[item]||0), (ret2[item]||0));
			map[item] = thb;
		});
		return map;
	},
	//具体的同环比算法
	thbSf: function(value1, value2, thbType){
		var thb = (value1 - value2);
		return thb;
	},
	init: function(){
		this.initCalendar();
		this.option();
		this.getData();
		//this.autoResize();
	}
};
//tab1切换
function Tab1() {
	$('.uls_second').hide()
	$('.gw_tab').on('click','li',function () {
		var i = $(this).index()
		$(this).addClass('hover').siblings('li').removeClass('hover')
		
		$('.gw_uls>li').eq(i).show().siblings('li').hide()
	})
}
//tab2切换
function Tab2() {
	$('.liuchu_second').hide()
	$('.cc_ols').on('click','li',function () {
		var i = $(this).index()
		$(this).addClass('cc_hover').siblings('li').removeClass('cc_hover')
		
		$('.liuchu_uls>li').eq(i).show().siblings('li').hide()
	})
}
var sdCfg = { jgdmSf:[] };
//根据省份（籍贯）代码获取籍贯省份
	var jg_sf = function(code){
		for(var i = 0;i<sdCfg.jgdmSf.length;i++){
			if(sdCfg.jgdmSf[i].code.substr(0,2) == code){
				return sdCfg.jgdmSf[i].name;
			}
		}
		return "其他";
}
function QianxiData() {
	var beginTime = "beginTime=" + $("#reservation").val().split(",")[0];
 	var endTime = "&endTime=" + $("#reservation").val().split(",")[1];
 	var person = $('#hushi-xiaqu .text').text();
 	var CCarr = [],CJarr = [];
 	var personType;
    if (person == '涉藏') {
        personType = '54';
    } else if (person == '涉疆') {
        personType = '65';
    } else {
        personType = '';
    }
   	var gwrylbdm = "&gwrylbdm=" + personType
   	
   	$.when(
   		$.ajax({type:"get",url:host + "/code/jgAll1"}),
   		$.ajax({type:"get",url:host + "/personGwry/gwryLrlcBySf/lr/tf?"+beginTime+endTime+gwrylbdm})
   	).done(function (jgdm,data) {
   		sdCfg.jgdmSf = jgdm[0];
   		var data = data[0];
   		$('#gw_table>tbody').empty();
		var total = '';
		var i = 1;
		$.each(data, function(k,v) {
			CCarr.push([{name:jg_sf(k),value:v}, {name:'包头'}])
			total = Number(total) + Number(v)
			$('#gw_table>tbody').append(
				"<tr>"+
				"<td>"+i+"</td>"+
				"<td>"+jg_sf(k)+"</td>"+
				"<td>"+v+"</td>"+
				"</tr>"
			)
			i++;
		});
		console.log(CCarr)
		Qianxi(CCarr)
		
		$('#gw_span').text(total)
   	})
   	
}
function QianxiData1() {
	var beginTime = "beginTime=" + $("#reservation").val().split(",")[0];
 	var endTime = "&endTime=" + $("#reservation").val().split(",")[1];
 	var person = $('#hushi-xiaqu .text').text();
 	var CCarr = [],CJarr = [];
 	var personType;
    if (person == '涉藏') {
        personType = '54';
    } else if (person == '涉疆') {
        personType = '65';
    } else {
        personType = '';
    }
    var gwrylbdm = "&gwrylbdm=" + personType
   $.when(
   		$.ajax({type:"get",url:host + "/code/jgAll1"}),
   		$.ajax({type:"get",url:host + "/personGwry/gwryLrlcBySf/lc/tf?"+beginTime+endTime+gwrylbdm})
   ).done(function (jgdm,data) {
   		sdCfg.jgdmSf = jgdm[0];
   		var data = data[0];
   		$('#gw_table1>tbody').empty();
		var total = '';
		var i = 1;
		$.each(data, function(k,v) {
			CCarr.push([{name:'包头'}, {name:jg_sf(k),value:v}])
			total = Number(total) + Number(v)
			$('#gw_table1>tbody').append(
				"<tr>"+
				"<td>"+i+"</td>"+
				"<td>"+jg_sf(k)+"</td>"+
				"<td>"+v+"</td>"+
				"</tr>"
			)
			i++;
		});
		console.log(CCarr)
		Qianxi1(CCarr)
		
		$('#gw_span1').text(total)
   	})
}
//迁徙图
function Qianxi(CCarr) {
	var geoCoordMap = {
	    '上海': [121.4648,31.2891],
	    '包头': [110.3467,41.4899],
	    '北京': [116.4551,40.2539],
	    '天津': [117.4219,39.4189],
	    '内蒙古': [111.670801,40.818311],
	    '河北': [114.502461,38.045474],
	    "山西": [112.549248,37.857014],
	    "台湾": [121.509062,25.044332],
	    "辽宁": [123.429096,41.796767],
	    "吉林": [125.3245,43.886841],
	    "黑龙江": [126.642464,45.756967],
	    "江苏": [118.767413,32.041544],
	    "浙江": [120.153576,30.287459],
	    "安徽": [117.283042,31.86119],
	    "福建": [119.306239,26.075302],
	    "江西": [115.892151,28.676493],
	    "山东": [117.000923,36.675807],
	    "河南": [113.665412,34.757975],
	    "湖北": [114.298572,30.584355],
	    "湖南": [112.982279,28.19409],
	    "广东": [113.280637,23.125178],
	    "广西": [108.320004,22.82402],
	    "海南": [110.33119,20.031971],
	    "四川": [104.065735,30.659462],
	    "贵州": [106.713478,26.578343],
	    "云南": [102.712251,25.040609],
	    "西藏": [91.132212,29.660361],
	    "陕西": [108.948024,34.263161],
	    "甘肃": [103.823557,36.058039],
	    "青海": [101.778916,36.623178],
	    "宁夏": [106.278179,38.46637],
	    "新疆": [87.617733,43.792818],
	    "重庆": [106.504962,29.533155],
	    "香港": [114.173355,22.320048],
	    "澳门": [113.54909,22.198951],
	};
//	var planePath = 'path://M1705.06,1318.313v-89.254l-319.9-221.799l0.073-208.063c0.521-84.662-26.629-121.796-63.961-121.491c-37.332-0.305-64.482,36.829-63.961,121.491l0.073,208.063l-319.9,221.799v89.254l330.343-157.288l12.238,241.308l-134.449,92.931l0.531,42.034l175.125-42.917l175.125,42.917l0.531-42.034l-134.449-92.931l12.238-241.308L1705.06,1318.313z';
	var convertData = function (data) {
	    var res = [];
	    for (var i = 0; i < data.length; i++) {
	        var dataItem = data[i];
	        var fromCoord = geoCoordMap[dataItem[0].name];
	        var toCoord = geoCoordMap[dataItem[1].name];
	        if (fromCoord && toCoord) {
	            res.push({
	                fromName: dataItem[0].name,
	                toName: dataItem[1].name,
	                coords: [fromCoord, toCoord]
	            });
	        }
	    }
	    return res;
	};
	var color = ['#269ABC'];
	var series = [];
	[['包头', CCarr]].forEach(function (item, i) {
	    series.push({
	        name: '流入人员',
	        type: 'lines',
	        zlevel: 1,
	        effect: {
	            show: true,
	            period: 6,
	            trailLength: 0.7,
	            color: '#fff',
	            symbolSize: 3
	        },
	        lineStyle: {
	            normal: {
	                color: color[i],
	                width: 0,
	                curveness: 0.2
	            }
	        },
	        data: convertData(item[1])
	    },
	    {
	        name: '流入人员',
	        type: 'lines',
	        zlevel: 2,
	        symbol: ['none', 'circle'],
	        symbolSize: 10,
	        effect: {
	            show: true,
	            period: 6,
	            trailLength: 0,
	            //symbol: planePath,
	            symbolSize: 8
	        },
	        lineStyle: {
	            normal: {
	                color: color[i],
	                width: 1,
	                opacity: 0.6,
	                curveness: 0.2
	            }
	        },
	        data: convertData(item[1])
	    },
	    {
	        name: '流入人员',
	        type: 'effectScatter',
	        coordinateSystem: 'geo',
	        zlevel: 2,
	        rippleEffect: {
	            brushType: 'stroke'
	        },
	        label: {
	            normal: {
	                show: true,
	                position: 'right',
	                formatter: '{b}'
	            }
	        },
	        symbolSize: function (val) {
	           return Math.pow(val[2],1/7)
	        },
	        itemStyle: {
	            normal: {
	                color: color[i]
	            }
	        },
	        data: item[1].map(function (dataItem) {
	            return {
	                name: dataItem[0].name,
	                value: geoCoordMap[dataItem[0].name].concat([dataItem[0].value])
	            };
	        })
	    });
	});
	option = { 
	    backgroundColor: '#f6f7f9',
	    tooltip : {
	        trigger: 'item'
	    },
	    geo: {
	        map: 'china',
	        label: {
	            emphasis: {
	                show: false
	            }
	        },
	        roam: true,
	        itemStyle: {
	            normal: {
	                areaColor: '#bacae3',
	                borderColor: '#fff'
	            },
	            emphasis: {
	                areaColor: '#a6c84c'
	            }
	        }
	    },
	    series: series
	};
	var app = echarts.init(document.getElementById('gw_qianxi'))
	
	app.setOption(option)
	$(window).resize(function () {
		app.resize();
	});
}
//迁徙图
function Qianxi1(CCarr) {
	var geoCoordMap = {
	    '上海': [121.4648,31.2891],
	    '包头': [110.3467,41.4899],
	    '北京': [116.4551,40.2539],
	    '天津': [117.4219,39.4189],
	    '内蒙古': [111.670801,40.818311],
	    '河北': [114.502461,38.045474],
	    "山西": [112.549248,37.857014],
	    "台湾": [121.509062,25.044332],
	    "辽宁": [123.429096,41.796767],
	    "吉林": [125.3245,43.886841],
	    "黑龙江": [126.642464,45.756967],
	    "江苏": [118.767413,32.041544],
	    "浙江": [120.153576,30.287459],
	    "安徽": [117.283042,31.86119],
	    "福建": [119.306239,26.075302],
	    "江西": [115.892151,28.676493],
	    "山东": [117.000923,36.675807],
	    "河南": [113.665412,34.757975],
	    "湖北": [114.298572,30.584355],
	    "湖南": [112.982279,28.19409],
	    "广东": [113.280637,23.125178],
	    "广西": [108.320004,22.82402],
	    "海南": [110.33119,20.031971],
	    "四川": [104.065735,30.659462],
	    "贵州": [106.713478,26.578343],
	    "云南": [102.712251,25.040609],
	    "西藏": [91.132212,29.660361],
	    "陕西": [108.948024,34.263161],
	    "甘肃": [103.823557,36.058039],
	    "青海": [101.778916,36.623178],
	    "宁夏": [106.278179,38.46637],
	    "新疆": [87.617733,43.792818],
	    "重庆": [106.504962,29.533155],
	    "香港": [114.173355,22.320048],
	    "澳门": [113.54909,22.198951],
	};
	var convertData = function (data) {
	    var res = [];
	    for (var i = 0; i < data.length; i++) {
	        var dataItem = data[i];
	        var fromCoord = geoCoordMap[dataItem[0].name];
	        var toCoord = geoCoordMap[dataItem[1].name];
	        if (fromCoord && toCoord) {
	            res.push({
	                fromName: dataItem[0].name,
	                toName: dataItem[1].name,
	                coords: [fromCoord, toCoord]
	            });
	        }
	    }
	    return res;
	};
	
	var color = ['#269ABC'];
	var series = [];
	[['包头', CCarr]].forEach(function (item, i) {
	    series.push({
	        name: '流出人员',
	        type: 'lines',
	        zlevel: 1,
	        effect: {
	            show: true,
	            period: 6,
	            trailLength: 0.7,
	            color: '#fff',
	            symbolSize: 3
	        },
	        lineStyle: {
	            normal: {
	                color: color[i],
	                width: 0,
	                curveness: 0.2
	            }
	        },
	        data: convertData(item[1])
	    },
	    {
	        name: '流出人员',
	        type: 'lines',
	        zlevel: 2,
	        symbol: ['none', 'circle'],
	        symbolSize: 10,
	        effect: {
	            show: true,
	            period: 6,
	            trailLength: 0,
	            //symbol: planePath,
	            symbolSize: 8
	        },
	        lineStyle: {
	            normal: {
	                color: color[i],
	                width: 1,
	                opacity: 0.6,
	                curveness: 0.2
	            }
	        },
	        data: convertData(item[1])
	    },
	    {
	        name: '流出人员',
	        type: 'effectScatter',
	        coordinateSystem: 'geo',
	        zlevel: 2,
	        rippleEffect: {
	            brushType: 'stroke'
	        },
	        label: {
	            normal: {
	                show: true,
	                position: 'right',
	                formatter: '{b}'
	            }
	        },
	        symbolSize: function (val) {
	           return Math.pow(val[2],1/7)
	        },
	        itemStyle: {
	            normal: {
	                color: color[i]
	            }
	        },
	        data: item[1].map(function (dataItem) {
	            return {
	                name: dataItem[1].name,
	                value: geoCoordMap[dataItem[1].name].concat([dataItem[1].value])
	            };
	        })
	    });
	});
	option = { 
	    backgroundColor: '#f6f7f9',
	    tooltip : {
	        trigger: 'item'
	    },
	    geo: {
	        map: 'china',
	        label: {
	            emphasis: {
	                show: false
	            }
	        },
	        roam: true,
	        itemStyle: {
	            normal: {
	                areaColor: '#bacae3',
	                borderColor: '#fff'
	            },
	            emphasis: {
	                areaColor: '#a6c84c'
	            }
	        }
	    },
	    series: series
	};
	var app = echarts.init(document.getElementById('gw_qianxi1'))
	
	app.setOption(option)
	$(window).resize(function () {
		app.resize();
	});
}
$(function(){
	controller.init();
	Tab1();
	Tab2();
	QianxiData();
	QianxiData1();
});
