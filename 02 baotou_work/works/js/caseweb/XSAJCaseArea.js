var controller = {
	init: function(){
		amGloable.common.initCalender();
		this.bindPcsFj();
		this.bindAjlb();
		//绑定事件
		this.bindFindButton();
		//窗口大小更改事件
		this.resizeCharts();
		
		this.getData();
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
	bindAjlb: function(){
		//三级案件类别下拉框
		var $select1 = $('#ajlb1').empty().append('<option value="">一级案件类别</option>');
		var $select2 = $('#ajlb2');
		var $select3 = $('#ajlb3');
		var map1 = {}, map2 = {};//保存一级，二级code和id的映射
		amGloable.api.codeAjlbList1.get("", function(data){
			$.each(data, function(i, item){
				var code = item.code;
				var value = item.value || item.name;
				map1[code] = item.id;
				$select1.append('<option value="'+code+'">'+value+'</option>');
			});
		});
		$select1.change(function(){
			var id = map1[this.value];//根据code获取到一级的id
			amGloable.api.codeAjlbList2.get("code=" + id, function(data){
				$select2.empty().append('<option value="">二级案件类别</option>');
				$.each(data, function(i, item){
					var code = item.code;
					var value = item.value || item.name;
					map2[code] = item.id;
					$select2.append('<option value="'+code+'">'+value+'</option>');
				});
				$select2.change();
			});
		});
		$select2.change(function(){
			var id = map2[this.value];//根据code获取二级的id
			amGloable.api.codeAjlbList2.get("code=" + id, function(data){
				$select3.empty().append('<option value="">三级案件类别</option>');
				$.each(data, function(i, item){
					var code = item.code;
					var value = item.value || item.name;
					$select3.append('<option value="'+code+'">'+value+'</option>');
				});
			});
		});
	},
	getData: function(){
		var _this = this;
		$.when(
			amGloable.api.anjianAreaAnalysis.getAjax(_this.getParams()),
			amGloable.api.codePcsFjAll.getAjax("")
		).done(function(ret1, ret2){
			//数据
			var data1 = $.parseJSON(ret1[2].responseText); data1 = data1.data || data1;
			//码表
			var data2 = $.parseJSON(ret2[2].responseText); data2 = data2.data || data2;
			
			var code = {};
			$.each(data2, function(i, item){
				code[item.code] = (item.value || item.name)
			});
			
			var x = [], y = [];
			$.each(data1, function(i, item){
				var entry = amGloable.tools.toEntry(item);
				x.push(code[entry.key]);
				y.push(entry.value);
			});
			_this.fillCharts(x, y);
		});
	},
	getParams: function(){
		var kssj = $('#reservation').val().split(',');
		var _ajssfj_dm = $('#ajssfj_dm').val();
		var _ajsspcs_dm = $('#ajsspcs_dm').val();
		var _ajlb_dm1 = $('#ajlb1').val();
		var _ajlb_dm2 = $('#ajlb2').val();
		var _ajlb_dm = $('#ajlb3').val();
		
		var opt = {};
		opt._type = "sfxsaj";
		opt.beginTime = kssj[0];
		opt.endTime = kssj[1];
		
		_ajssfj_dm && (opt.ajssfj_dm = _ajssfj_dm);
		_ajsspcs_dm && (opt.ajsspcs_dm = _ajsspcs_dm);
		_ajlb_dm1 && (opt.ajlb_dm1 = _ajlb_dm1);
		_ajlb_dm2 && (opt.ajlb_dm2 = _ajlb_dm2);
		_ajlb_dm && (opt.ajlb_dm = _ajlb_dm);
		
		opt.fields = "ajsspcs_dm";
		
		return $.param(opt);
	},
	bindFindButton(){
		var _this = this;
		$('#find').click(function(){
			_this.getData();
		});
	},
	fillCharts: function(x,y){
		var charts = echarts.init(document.getElementById("userLiveness"));
		this.charts.push(charts);//将图表添加到resize数组
		charts.setOption({
			color: ['#3398DB'],
			tooltip : {
				trigger: 'axis',
				axisPointer : {            // 坐标轴指示器，坐标轴触发有效
					type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
				}
			},
			grid: {
				left: '2%',
				right: '2%',
				bottom: '3%',
				containLabel: true
			},
			xAxis : [
				{
					type : 'category',
					data:x,
					axisTick: {
						alignWithLabel: true
					}
				}
			],
			yAxis : [
				{
					type : 'value'
				}
			],
			series : [
				{
					name:'人数',
					type:'bar',
					barWidth: '60%',
					data:y
				}
			]
		});
	},
	charts: [],
	//窗口大小更改
	resizeCharts: function(){
		var _this = this;
		$(window).on("resize", function(){
			$.each(_this.charts, function(i, item){
				item.resize && item.resize();
			});
		});
	}
};

$(function(){
	controller.init();
});