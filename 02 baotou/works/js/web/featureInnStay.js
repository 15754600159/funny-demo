var sdCfg = {
	mz:[],
	jgdmSf:[],
	zlyb:[],
	hyky:[],
	zc:[],
	whcd:[],
	xq:[]
};
//根据code获取民族
var getMz = function(code){
	for(var i = 0;i< sdCfg.mz.length;i++){
		var mz = sdCfg.mz[i];
		if(mz.code == parseInt(code)){
			return mz.name;
		}
	}
	return "其他";
}
//根据年龄计算年龄段
var nld = function(age){
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
//根据性别代码计算性别名称
var xb = function(code){
	//return code == "1" ? "男" : "女";
	if(code == "1")
		return "男";
	else if(code == "2")
		return "女";
	else
		return "未知";
}
//根据省份（籍贯）代码获取籍贯省份
var jg_sf = function(code){
	for(var i = 0;i<sdCfg.jgdmSf.length;i++){
		if(sdCfg.jgdmSf[i].code.substr(0,2) == code){
			return sdCfg.jgdmSf[i].name;
		}
	}
	return "其他";
}
function parseMap(m){
	for(var i in m){
		return {key:i,value:m[i]};
	}
}
function getKssj(){
    var kssj = $("#reservation").val().split(",")
    var begin = kssj[0]
    var end = kssj[1]
    return begin + "," + end
}

$(function(){
	calendar();
	findBtn();
	initXq(sdCfg.xq);
	loadPic();

function loadPic(){
	//获取日期时间
	beginTime = "beginTime=" + $("#reservation").val().split(",")[0];
 	endTime = "&endTime=" + $("#reservation").val().split(",")[1];
	ajaxNationBar();//AJAX民族图表
	ajaxSex();//初始化性别
	ajaxNativePlace();//初始化籍贯
	ajaxAges();//初始化年龄
	ajaxRzsj();
	//ajaxTfsj();
}
//AJAX民族图表
function ajaxNationBar(){
	//拉取民族码表
	Get("/code/mzAll", function(data){
		var mz = [],total = [],mzCode = [];
		var analysisFields = "mz_dm";
		sdCfg.mz = data;
		
		$.each(data, function(k,v) {
			mzCode.push(v.code)
		});
		Get("/personHotel/features/mz?"+beginTime+endTime, function(res){
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
//初始化性别
function ajaxSex(){
	var analysisFields = "xbdm";
	Get("/personHotel/features/xbdm?"+beginTime+endTime, function(res){
	var x = [],y = [],map = {};
		$.each(res, function(k,v) {
			x.push(xb(k))
			y.push({value: v,name: xb(k)})
		});
		sexPie(x,y);
	});
}
//初始化籍贯
function ajaxNativePlace(){
	Get("/code/jgAll1", function(jgdm){
		sdCfg.jgdmSf = jgdm;
		Get("/personHotel/features/jgdm_sf?"+beginTime+endTime, function(res){
			var x = [],y = [];
			$.each(res, function(k,v) {
				x.push(jg_sf(k))
				y.push(v)
			});
			console.log(x)
			nativePlaceBar(x,y,document.getElementById('nativePlace'));
		});
	});
}
//初始化年龄
function ajaxAges(){
	Get("/personHotel/features/nl?"+beginTime+endTime, function(res){
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
		ageBar(x,y,document.getElementById('age'));
	});
}
//初始化rzsj
function ajaxRzsj(){
	 var x = [],y=[],x1=[],y1=[];
		Get("/personHotel/features/rzsj?"+beginTime+endTime, function(rs){
			var map = {};

			$.each(rs, function(k,v) {
				var xl = k;
				var val = parseInt(map[xl] || 0) + parseInt(v);
				map[xl] = val;
			});
			//排序
			var _tmp = [];
			for(var i in map){
				_tmp.push(i);
			};
			_tmp = _tmp.sort(function(a,b){
				return a.localeCompare(b);
			});
			for(var n =0;n<_tmp.length;n++){
				var i = _tmp[n];
				x.push(i);
				y.push(map[i]);
			}
			rzsjBar(x,y,x1,y1)
		});
}
//初始化tfsj
function ajaxTfsj(){
	Get("/code/whcdAll", function(data){
		sdCfg.whcd = data;
		Get(sdCfg.url + "?kssj="+getKssj()+"&analyzeType=zs&analysisFields=date_format(tfsj,'yyyy-MM-dd HH')&xzqhdm1="+$('#area').val(), function(rs){
			var data = rs.data;
			var map = {};

			for(var i=0;i<data.length;i++){//限制10条数据
				var r = parseMap(data[i]);
				var xl = r.key;
				var val = parseInt(map[xl] || 0) + parseInt(r.value);
				map[xl] = val;
			}

			//排序
			var _tmp = [];
			for(var i in map){
				_tmp.push(i);
			};

			_tmp = _tmp.sort(function(a,b){
				return a.localeCompare(b);
			});


			for(var n =0;n<_tmp.length;n++){
				var i = _tmp[n];
				x1.push(i);
				y1.push(map[i]);
			}

		});
	});
}
//查询按钮
function findBtn(){
	$("#find").click(function(){
		var xq = $('#area').val();
		var time=$('#reservation').val();
		loadPic();
	})

}
//加载日历
function calendar(){
	var startDate =moment(moment().subtract(30, 'days').calendar()).format("YYYY-MM-DD");
    var endDate = moment().format("YYYY-MM-DD");

    //日期，默认时间设成当日到前30天
    $('#reservation').val(startDate + ',' + endDate);
    //$('#reservation').val("2015-01-01,2015-10-01");
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
//性别
function sexPie(x,y){
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
//年龄
function ageBar(x,y){
	var myAge = echarts.init(document.getElementById('age'));
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
		            type : 'value',
		        }
		    ],
		    yAxis : [
		        {
		            type : 'category',
                    data:x,
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
	myAge.setOption(option);
	window.addEventListener("resize", function () {
		myAge.resize()
	});
}
//入住时间
function rzsjBar(x,y,x1,y1){
	var myJobs = echarts.init(document.getElementById('rzsj'));
	var option = {
		    color: ['#3398DB'],
            title : {
                text: '入住退房',

            },
            tooltip : {
                trigger: 'axis'
            },
            legend: {
                data:['入住时间','退房时间']
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
                        formatter: '{value} '
                    }
                }
            ],
            series : [
                {
                    name:'入住时间',
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
                },
                {
                    name:'退房时间',
                    type:'line',
					data:y1,
                    markPoint : {
                        data : [
                            {name : '周最低', value : -2, xAxis: 1, yAxis: -1.5}
                        ]
                    },
                    markLine : {
                        data : [
                            {type : 'average', name : '平均值'}
                        ]
                    }
                }
            ]
        };

    myJobs.setOption(option);
	window.addEventListener("resize", function () {
		myJobs.resize()
	});
}
//退房时间
function tfsjBar(x,y){
	var myJobs = echarts.init(document.getElementById('tfsj'));
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
	myJobs.setOption(option);
	window.addEventListener("resize", function () {
		myJobs.resize()
	});
}

});