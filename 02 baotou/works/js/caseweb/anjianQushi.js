var controller = {
	consts: {
		TB: 1,
		HB: 2
	},
    init: function(){
		//日历
        amGloable.common.initCalender();
		//下拉框
		this.bindPcsFj();
		//this.bindAjlb();
		amGloable.common.initLdaj($('#ajlb1'),$('#ajlb2'),$('#ajlb3'));
		//按钮click事件
		this.findButton();
		//自动调整统计图大小
		this.resizeCharts()();
		
		this.getData(this.consts.TB);
    },
	resizeCharts: function(key, myChart){
		var _this = this;
		var charts = this.charts || {};
		myChart && (charts[key] = myChart);
		this.charts = charts;
		return function(){
			$(window).on("resize", function(){
				$.each(charts, function(i, item){
					item.resize && item.resize();
				});
			});
		}
	},
    //查询按钮事件绑定
	findButton: function(){
		var _this = this;
		$('#find').click(function(){
			_this.getData(_this.consts.TB);
		});
		//同比
		$('#tb').click(function(){
			//_this.getData(_this.consts.TB);
			$('#tb,#hb').removeClass('active1');
			$(this).addClass('active1');
			_this.processThbRet();
		});
		//环比
		$('#hb').click(function(){
			// _this.getData(_this.consts.HB);
			$('#tb,#hb').removeClass('active1');
			$(this).addClass('active1');
			_this.processThbRet();
		});
	},
	//所属分局和所属派出所下拉框
	bindPcsFj: function(){
		//案件所属分局下拉框数据绑定
		var $select1 = $('#ajssfj_dm').empty().append('<option value="">案件所属分局</option>');
		var $select2 = $('#ajsspcs_dm');
		var map = {};
		amGloable.api.codeAjssfj.get("", function(data){
			$.each(data, function(i, item){
				map[item.code] = item.id;
				var key = item.code;
				var value = item.value || item.name;
				$select1.append('<option value="'+key+'">'+value+'</option>');
			});
		});
		//分局onchange事件
		$select1.change(function(){
			$select2.empty().append('<option value="">案件所属派出所</option>');
			amGloable.api.codeAjsspcs.get("code="+map[this.value], function(data){
				$.each(data, function(i, item){
					var key = item.code;
					var value = item.value || item.name;
					$select2.append('<option value="'+key+'">'+value+'</option>');
				});
			});
		});
	},
	//获取同比时间
	getThbKssj: function(kssj, format){
		var time = kssj.split(',');
		var start = time[0], end = time[1];
		start = moment(start).subtract(1, format).format("YYYY-MM-DD");
		end = moment(end).subtract(1, format).format("YYYY-MM-DD");
		kssj = start + "," + end;
		return kssj;
	},
	getParams: function(thbType){
		var kssj = $('#reservation').val();
		if(thbType == controller.consts.TB){
			//同比
			kssj = this.getThbKssj(kssj, 'y');
		} else if(thbType == controller.consts.HB){
			//环比
			kssj = this.getThbKssj(kssj, 'M');
		}
		kssj = kssj.split(',');
		var _ajssfj_dm = $('#ajssfj_dm').val();
		var _ajsspcs_dm = $('#ajsspcs_dm').val();
		var _ajlb_dm1 = $('#ajlb1').val();
		var _ajlb_dm2 = $('#ajlb2').val();
		var _ajlb_dm = $('#ajlb3').val();
		
		var opt = {};
		opt._type = (typeof _type != "undefined") ? _type : "sfxsaj";
		opt.beginTime = kssj[0].replace(/-/g,'');
		opt.endTime = kssj[1].replace(/-/g,'');
		
		_ajssfj_dm && (opt.ajssfj_dm = _ajssfj_dm);
		_ajsspcs_dm && (opt.ajsspcs_dm = _ajsspcs_dm);
		_ajlb_dm1 && (opt.ajlb_dm1 = _ajlb_dm1);
		_ajlb_dm2 && (opt.ajlb_dm2 = _ajlb_dm2);
		_ajlb_dm && (opt.ajlb_dm = _ajlb_dm);
		
		opt.wd = "MM";
		
		return $.param(opt);
	},
	parseData: function(data){
		var map = {};
		$.each(data, function(i, item){
			var entry = amGloable.tools.toEntry(item);
			var key = entry.key.substr(0,4)+'-'+entry.key.substr(4,2);
			map[key] = entry.value;
		});
		return map;
	},
	getData: function(){
		var _this = this;
		$.when(
			//第一个图表数据
			amGloable.api.anjianQushi.getAjax(_this.getParams()),
			//同比数据
			amGloable.api.anjianQushi.getAjax(_this.getParams(_this.consts.TB)),
			//环比数据
			amGloable.api.anjianQushi.getAjax(_this.getParams(_this.consts.HB))
		).done(function(jqXHR1, jqXHR2, jqXHR3){
			//由于加条件查询和不加条件查询的返回值结构不一样，需要进一步处理
			var ret1 = $.parseJSON(jqXHR1[2].responseText); ret1 = _this.parseData(ret1.data);
			var ret2 = $.parseJSON(jqXHR2[2].responseText); ret2 = _this.parseData(ret2.data);
			var ret3 = $.parseJSON(jqXHR3[2].responseText); ret3 = _this.parseData(ret3.data);
			
			_this.fillDataToCharts(ret1);
			//将数据缓存
			_this.consts.data = [ret1, ret2, ret3];
			_this.processThbRet();
		});
	},
	//填充第一个图表
	fillDataToCharts: function(map){
		var x = [], y = [];
		for(var i in map){
			x.push(i);
		}
		x = x.sort(function(a, b){
			return a.localeCompare(b);
		});
		
		for(var i in x){
			y.push(map[x[i]]);
		}
		this.fillDailyCharts(x, y);
	},
	//填充同比环比数据
	processThbRet: function(){
		var ret1 = this.consts.data[0], ret2;
		var $thb = $('.active1').get(0);
		var res1;
		if($thb.id == "tb"){
			ret2 = this.consts.data[1];
			res1 = this.countThb(ret1, ret2, this.consts.TB);
		}else {
			ret2 = this.consts.data[2];
			res1 = this.countThb(ret1, ret2, this.consts.HB);
		}
			
		
		var x = [];
		$.each(res1, function(key, value){
			if($.inArray(key, x) == -1)
				x.push(key);
		});
		
		x = x.sort(function(a, b){
			return a.localeCompare(b);
		});
		
		var y1 = [];
		$.each(x, function(i, item){
			y1.push(res1[item]||0);
		});
		this.fillThbCharts(x, y1);
	},
	/*
	*ret1 第一个图表的数据
	*ret2 同比或环比数据
	*/
	countThb: function(ret1, ret2, thbType){
		var _this = this;
		//处理同环比数据
		if(thbType == this.consts.TB){
			var _ret2 = {};
			for(var i in ret2){
				var key = moment(i).subtract(-1, 'y').format('YYYY-MM');//将环比数据的时间加1年
				_ret2[key] = ret2[i];
			}
			ret2 = _ret2;
		} else if(thbType == this.consts.HB){
			var _ret2 = {};
			for(var i in ret2){
				var key = moment(i).subtract(-1, 'M').format('YYYY-MM');//将同比数据的时间加1月
				_ret2[key] = ret2[i];
			}
			ret2 = _ret2;
		}
		
		var x = [], y = [];
		//合并x轴数据
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
		var thb = (parseInt(value1) - parseInt(value2));
		return thb;
	},
	//加载echarts折线图
	fillDailyCharts:function(x, y) {
		var myChart = echarts.init(document.getElementById('userLiveness'));
		this.resizeCharts("daily", myChart);
		myChart.setOption({
			title: {
				// text: '高危人员流入流出',
				//subtext: '高危人员流入流出'
			},
			tooltip: {
				trigger: 'axis'
			},
			legend: {
				//data: ['流入数', '流出数']
			},
			yAxis: [
				{
					name: '人数',
					type: 'value'
				}
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
					name: '总人数',
					type: 'line',
					smooth: true,
					itemStyle: {
						normal: {
							areaStyle: {color: '#65E2BF'},
							lineStyle: {color: '#09A472'}
						}
					},
					data: y
				}
			]
		});
	},
	fillThbCharts: function(x, y1){
		var myChart1 = echarts.init(document.getElementById('userLiveness1'));
		this.resizeCharts("thb", myChart1);
		myChart1.setOption({
			title: {
				//subtext: '高危人员流入流出'
			},
			tooltip: {
				trigger: 'axis'
			},
			legend: {
				//data: ['流入数', '流出数']
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
				}
			]
		});
	},
};

$(function(){
    controller.init();
});