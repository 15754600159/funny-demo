var controller = {
	//加载日历
	initCalendar : function(){
		var startDate =moment(moment().subtract(30, 'days').calendar()).format("YYYY-MM-DD");
		var endDate = moment().format("YYYY-MM-DD");
		//日期，默认时间设成当日到前30天
		$('#reservation').val(startDate + ',' + endDate);
		$('#reservation').daterangepicker({
			'locale': locale,
			format:"YYYY-MM-DD",
			startDate:startDate,
			endDate:endDate
		}, function(start, end) {
			startDate=start.format('YYYY-MM-DD');
			endDate=end.format('YYYY-MM-DD');
			$('#reservation').val(startDate + ',' + endDate);
		});
	},
	//查询按钮
	findBtn: function(){
		var _this = this;
		$("#find").click(function(){
			_this.getData();
		});
	},
	getData: function(){
		_this = this;
		var param = _this.getParam();
		var gwryLjdFxAjax = amGloable.api.gwryljd.getAjax(param);//请求高危人员落脚点分析接口
		var codeAjax;
		if("hotel" == $('#csType').val()){
			var ldCodeAjax = amGloable.api.codeLdAll.getAjax();//请求旅店编码码表接口
			codeAjax = ldCodeAjax;
		} else {
			var internetCodeAjax = amGloable.api.codeWbAll.getAjax();//请求网吧编码接口
			codeAjax = internetCodeAjax;
		}
		
		$.when(gwryLjdFxAjax, codeAjax).done(function(ret, codeAll){
			codeAll = $.parseJSON(codeAll[2].responseText);
			
			_this.getCode = function(code){
				var mc = ''
				$.each(codeAll, function(k,v) {
					if(v.lddm == code) {
						 mc = v.ldmc
					}
				});
				return mc
			}
			var data = $.parseJSON(ret[2].responseText);
			var map = data;
			
			var x = [],y = [];
			for(var i in map){
				x.push(_this.getCode(i));
				y.push(map[i]);
			}
			_this.onlinePersonData(x,y);
		});
	},
	//加载echarts柱状图
	onlinePersonData: function(x,y){
		var myChart = echarts.init(document.getElementById('userLiveness'));
		var barColor1 = '#0c89ff';
		var barColor2 = '#79beff';
		// 指定图表的配置项和数据
		var option = {
			title: {
				text: ''
			},
			tooltip: {
				trigger: 'axis',
				axisPointer: { // 坐标轴指示器，坐标轴触发有效
					type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
				}
			},
			legend: {
				data: ['辖区数量', '上网次数'],
				align: 'left',
				right: 50
			},
			grid: {
				left: '3%',
				right: '4%',
				bottom: '3%',
				containLabel: true
			},
			xAxis: [{
				type: 'category',
				data: x,
				splitNumber:1
			}],
			yAxis: [{
				type: 'value',
				name: '数量',
				axisLabel: {
					formatter: '{value}'
				}
			}],
			series: [
				{
					name: '辖区数量',
					type: 'bar',
					itemStyle: {
						normal: {
							color: barColor1
						}
					},
					barWidth:40,
					data:y
				}
			]
		};
		window.onresize = function () {
			 myChart.resize(); 
		};
		// 使用刚指定的配置项和数据显示图表。
		myChart.setOption(option);
	},
	getParam: function(){
		var beginTime = $("#reservation").val().split(",")[0];
 		var endTime = $("#reservation").val().split(",")[1];
		var cslx = $("#csType").val();
		var gwrylbdm = $("#gwType").val();
		var xzqh1 = $('#area').val();
		var postData = $.param({
			beginTime:beginTime,
			endTime:endTime,
			xzqh1:xzqh1,
			cslx:cslx,
			gwrylbdm:gwrylbdm
		});
		return postData;
	},
	xqlb:{},
	init: function(){
		this.initCalendar();
		initXq(this.xqlb);
		this.findBtn();
		this.getData();
	}
};

$(function(){
	controller.init();
});



