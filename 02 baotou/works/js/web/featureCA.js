var sdCfg = {
	mz:[],
	jgdmSf:[],
	zlyb:[],
	hyky:[],
	zc:[],
	whcd:[],
	szdm:[],
	url:"/personFeaturesAnalysis"
};
//加载日历
function calendar(){
	var startDate =moment(moment().subtract(30, 'days').calendar()).format("YYYY-MM-DD");
    var endDate = moment().format("YYYY-MM-DD");

    //日期，默认时间设成当日到前30天
    $('#reservation').val(startDate + ',' + endDate);
    $('#reservation').daterangepicker({
        'locale': locale,
        format:"YYYY-MM-DD",
        startDate:startDate,
        endDate:endDate,
    }, function(start, end) {
        startDate=start.format('YYYY-MM-DD');
        endDate=end.format('YYYY-MM-DD');
		$('#reservation').val(startDate + ',' + endDate);
		loadPic();
    });

}
//民族图表
function ajaxNationBar(){
	Get("/code/mzAll", function(data){
		sdCfg.mz = data;
		var mz = [],total = [],mzCode = [];
		$.each(data, function(k,v) {
			mzCode.push(v.code)
		});
		Get("/personFlight/features/mz?"+beginTime+endTime, function(res){
			$.each(res, function(k,v) {
				if(mzCode.indexOf(k) != -1) {
					total.push(v)
					mz.push(getMz(k))
				}
			});
			nationBar(mz,total);
		});
	});
}
//根据code获取民族 
function getMz(code){
	for(var i = 0;i< sdCfg.mz.length;i++){
		var mz = sdCfg.mz[i];
		if(mz.code == parseInt(code)){
			return mz.name;
		}
	}
	return "其他";
}
//民族
function nationBar(x,y){
	var myNation = echarts.init(document.getElementById('nation'));
	var option = {
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
		};

	myNation.setOption(option);
	window.addEventListener("resize", function () {
	     myNation.resize();
	});
}
//初始化性别
function ajaxSex(){
	var analysisFields = "xb";
	Get("/personFlight/features/xb?"+beginTime+endTime, function(res){
		var x = [],y = [],map = {};
		$.each(res, function(k,v) {
			x.push(xb(k))
			y.push({value: v,name: xb(k)})
		});
		sexPie(x,y);
	});
}
//根据性别代码计算性别名称
function xb(code){
	if(code == "1"){
		return "男";
	}else if(code == "2"){
		return "女";
	}else{
		return "未知";
	}
}
//性别
function sexPie(x, y){
	var mySex = echarts.init(document.getElementById('sex'));
	var option = {
		    color:['#00c6dd', '#698B69', 'red'],
		    tooltip: {
		        trigger: 'item',
		        formatter: "{a} <br/>{b}: {c} ({d}%)"
		    },
		    legend: {
		        orient: 'vertical',
		        x: 'left',
                data:x
		    },
		    series: [
		        {
		            name:'人数',
		            type:'pie',
		            radius: ['50%', '70%'],
		            avoidLabelOverlap: false,
		            label: {
		                normal: {
		                    show: false,
		                    position: 'center'
		                },
		                emphasis: {
		                    show: true,
		                    textStyle: {
		                        fontSize: '30',
		                        fontWeight: 'bold'
		                    }
		                }
		            },
		            labelLine: {
		                normal: {
		                    show: false
		                }
		            },
		            data:y
		        }
		    ]
		};
	mySex.setOption(option);
	window.addEventListener("resize", function () {
		mySex.resize()
	});
}
//籍贯
function ajaxNativePlace(){
	Get("/code/jgAll1", function(data){
		sdCfg.jgdmSf = data
		Get("/personFlight/features/jgdm_sf?"+beginTime+endTime, function(res){
			var x = [],y = [];
			$.each(res, function(k,v) {
				x.push(jg_sf(k))
				y.push(v)
			});
			nativePlaceBar(x,y,document.getElementById('nativePlace'));
		});
	})
	
}
//根据省份（籍贯）代码获取籍贯省份
function jg_sf(code){
	for(var i = 0;i<sdCfg.jgdmSf.length;i++){
		if(sdCfg.jgdmSf[i].code.substr(0,2) == code){
			return sdCfg.jgdmSf[i].name;
		}
	}
	return "其他";
}
//籍贯图表
function nativePlaceBar(x,y,dom){
	var mynativePlace = echarts.init(dom);
	var option = {
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
		};
	mynativePlace.setOption(option);
	window.addEventListener("resize", function () {
		mynativePlace.resize()
	});
}
//初始化年龄
function ajaxAges(){
	Get("/personFlight/features/nl?"+beginTime+endTime, function(res){
		var x = [],y = [],map = {};
		$.each(res, function(k,v) {
			var nl = nld(parseInt(k));//计算年龄段
			var val = parseInt(map[nl] || 0) + parseInt(v);
			map[nl] = val;
		});
		for(var i in map){
			x.push(i);
		}
		x = x.sort(function(a,b){
			return b.localeCompare(a);
		});
		for(var i=0;i<x.length;i++){
			y.push(map[x[i]]);
		}
		nativePlaceBar1(x,y,document.getElementById('age'));
	});

}
//根据年龄计算年龄段
function nld(age){
	var min = 20,max = 60, increment = 10;
	for(var i = min;i<=max; i+=increment){
		if(age < min)
			return min+" 以下";
		if(age < i){
			return (i-10) +"-"+i;
		}
	}
	return max+" 以上";
}
//年龄图表
function nativePlaceBar1(x,y,dom){
	var mynativePlace = echarts.init(dom);
	var option = {
		    color: ['#7CCD7C'],
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
		            type : 'value'
		        }
		    ],
		    yAxis : [
		        {
		            type : 'category',
                    data:x,
		            axisTick: {
		                alignWithLabel: true
		            }
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
		};
	mynativePlace.setOption(option);
	window.addEventListener("resize", function () {
		mynativePlace.resize()
	});
}
//离岗时间
function lgsjPic(){
    Get("/personFlight/features/lgsj?"+beginTime+endTime, function(res){
    	var x = [],y = [],map = {};

        $.each(res, function(k,v) {
            var hykymc = k;
            var val = parseInt(map[hykymc] || 0) + parseInt(v);
            map[hykymc] = val;
        });
        //排序
        var _tmp = [];
        for(var i in map) _tmp.push(i);

       _tmp.sort(function(a,b){
            return a.localeCompare(b);
       });
        for(var n =0;n<_tmp.length;n++){
            var i = _tmp[n];
            x.push(i);
            y.push(map[i]);
        }
        
       lgsjP(x,y);
    });
}
//离岗时间图表
function lgsjP(x,y){
    var mySpeciality = echarts.init(document.getElementById('lgsj'));
    var opts = {
        color: ['#3398DB'],
        tooltip : {
            trigger: 'axis'
        },
        calculable : true,
        xAxis : [
            {
                type : 'category',
                boundaryGap : false,
				data:x
            }
        ],
        yAxis : [
            {
                type : 'value',
                axisLabel : {
                    formatter: '{value}'
                }
            }
        ],
        series : [
            {
                name:'離港人数',
                type:'line',
				data:y,
                markPoint : {
                    data : [
                        {type : 'max', name: '最大值'},
                        {type : 'min', name: '最小值'}
                    ]
                },
                markLine : {
                    data : [
                        {type : 'average', name: '平均值'}
                    ]
                }
            }
        ]
    };
    mySpeciality.setOption(opts);
    window.addEventListener("resize", function () {
        mySpeciality.resize()
    });
}
//出发地和目的地
function loadDwmcCode(){
    Get("/code/szdmAll", function(res){
        sdCfg.szdm = res;
        ajaxCfd();
        ajaxMdd();
    });
}
function flightDwmc(code){
    for(var i = 0;i<sdCfg.szdm.length;i++){
        if(sdCfg.szdm[i].code == code){
            return sdCfg.szdm[i].name;
        }
    }
    return "其他";
}
//初始化出发地
function ajaxCfd(){
	Get("/personFlight/features/cfd_szdm?"+beginTime+endTime, function(res){
		var map = {},x = [],y=[];

		$.each(res, function(k,v) {
			var _zc = flightDwmc(k);
			var val = parseInt(map[_zc] || 0) + parseInt(v);
			map[_zc] = val;
		});
		for(var i in map){
			x.push(i);
			y.push(map[i]);
		}
		cfdBar(x,y);
	});
}

//初始化目的地
function ajaxMdd(){
	Get("/personFlight/features/mdd_szdm?"+beginTime+endTime, function(res){
		var map = {},x = [],y=[];
			
		$.each(res, function(k,v) {
			var _zc = flightDwmc(k);
			var val = parseInt(map[_zc] || 0) + parseInt(v);
			map[_zc] = val;
		});
			
		for(var i in map){
			x.push(i);
			y.push(map[i]);
		}
		mddBar(x,y);
	});
}
//出发地
function cfdBar(x,y){
	var mySpeciality = echarts.init(document.getElementById('cfd_dwbh'));
	var option = {
		    color: ['#7CCD7C'],
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
		            type : 'value'
		        }
		    ],
		    yAxis : [
		        {
		            type : 'category',
                    data:x,
		            axisTick: {
		                alignWithLabel: true
		            }
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
		};
	mySpeciality.setOption(option);
	window.addEventListener("resize", function () {
		mySpeciality.resize()
	});	
}
//目的地
function mddBar(x,y){
	var mySpeciality = echarts.init(document.getElementById('mdd_dwbh'));
	var option = {
		    color: ['#7CCD7C'],
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
		            type : 'value'
		        }
		    ],
		    yAxis : [		       
		        {
		            type : 'category',
                    data:x,
		            axisTick: {
		                alignWithLabel: true
		            }
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
		};
	mySpeciality.setOption(option);
	window.addEventListener("resize", function () {
		mySpeciality.resize()
	});	
}

/*加载图表*/
function loadPic() {
	//获取日期时间
	beginTime = "beginTime=" + $("#reservation").val().split(",")[0];
 	endTime = "&endTime=" + $("#reservation").val().split(",")[1];
	//民族图表
	ajaxNationBar();
	//初始化性别
	ajaxSex();
	//初始化籍贯
	ajaxNativePlace();
	//初始化年龄
	ajaxAges();
	//离岗时间
	lgsjPic();
	//出发地和目的地
	loadDwmcCode();
}
$(function () {
	//加载日历
	calendar();
 	/*加载图表*/
 	loadPic();
})
