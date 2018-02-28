var sdCfg = {
	mz:[],
	jgdmSf:[],
	zlyb:[],
	hyky:[],
	zc:[],
	whcd:[],
	url:"/personFeaturesAnalysis"
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

//根据职业类别代码获取职业名称
var zylb = function(code){
	for(var i = 0;i< sdCfg.zylb.length;i++){
		if(("" + code) == sdCfg.zylb[i].code){
			return sdCfg.zylb[i].name;
		}
	}
	return "其他";
}

//根据汉语口音代码获取汉语口音名称
var hyky = function(code){
	for(var i = 0;i<sdCfg.hyky.length;i++){
		if(("" + code) == sdCfg.hyky[i].code){
			return sdCfg.hyky[i].name;
		}
	}
	return "其他";
}

//根据专长代码获取专长名称
var zcmc = function(code){
	for(var i = 0;i<sdCfg.zc.length;i++){
		if(("" + code) == sdCfg.zc[i].code){
			return sdCfg.zc[i].name;
		}
	}
	return "其他";
}

//根据学历代码获取文化程度名称
var whcd = function(code){
	for(var i = 0;i<sdCfg.whcd.length;i++){
		if(("" + code) == sdCfg.whcd[i].code){
			return sdCfg.whcd[i].name;
		}
	}
	return "其他";
}

function parseMap(m){
	for(var i in m){
		return {key:i,value:m[i]};
	}
}
$(function(){
    calendar();
    
    function loadPic() {
    	ajaxNationBar();//AJAX民族图表
    	ajaxSex();//初始化性别
    	ajaxNativePlace();//初始化籍贯
    	ajaxAges();//初始化年龄
    	ajaxJobs();//初始化职业
    	ajaxCulture();//初始化文化程度
    	ajaxAccent();//初始化口音
    	ajaxSpeciality();//初始化专长
    }
 
ajaxNationBar();//AJAX民族图表
function ajaxNationBar(){
	//拉取民族码表
	Get("/code/mzAll", function(data){

		sdCfg.mz = data;
		var mz = [],total = [],mzCode = [];
		$.each(data, function(k,v) {
			mzCode.push(v.code)
		});
		Get("/personQlzdr/features/mzdm", function(res){
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

ajaxSex();//初始化性别
function ajaxSex(){
	var analysisFields = "xbdm";
	Get("/personQlzdr/features/xbdm", function(res){
		var x = [],y = [],map = {};
		$.each(res, function(k,v) {
			x.push(xb(k))
			y.push({value: v,name: xb(k)})
		});
		sexPie(x,y);
	});
}

ajaxNativePlace();//初始化籍贯
function ajaxNativePlace(){
	Get("/code/jgAll1", function(jgdm){
		sdCfg.jgdmSf = jgdm;
		Get("/personQlzdr/features/jgdm_sf", function(res){
				var x = [],y = [];
			$.each(res, function(k,v) {
				x.push(jg_sf(k))
				y.push(v)
			});
			nativePlaceBar(x,y);
		});
	});

}

ajaxAges();//初始化年龄
function ajaxAges(){
	Get("/personQlzdr/features/nl", function(res){
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
		ageBar(x,y);
	});
}

ajaxJobs();//初始化职业
function ajaxJobs(){
	Get("/code/zylbAll", function(zylbdm){
		sdCfg.zylb = zylbdm;
		Get("/personQlzdr/features/zylbdm", function(rs){
			var map = {},x = [],y=[];

			$.each(rs, function(k,v) {
				var zy = zylb(k);
				var val = parseInt(map[zy] || 0) + parseInt(v);
				map[zy] = val;
			});
			
			for(var i in map){
				if(i == "undefined") {
					var g = ""
					x.push(g);
				}else{
					x.push(i);
				}
				y.push(map[i]);
			}
			jobsBar(x,y);
		});
	});
}

ajaxCulture();//初始化文化程度
function ajaxCulture(){
	Get("/code/whcdAll", function(data){
		sdCfg.whcd = data;
		Get("/personQlzdr/features/xldm", function(rs){
			var map = {}, x = [],y=[];
			$.each(rs, function(k,v) {
				var xl = whcd(k);
				var val = parseInt(map[xl] || 0) + parseInt(v);
				map[xl] = val;
			});
			
			for(var i in map){
				x.push(i);
				y.push(map[i]);
			}
			cultureBar(x,y);
		});
	});
}

ajaxAccent();//初始化口音
function ajaxAccent(){
	Get("/code/kyAll", function(hykydm){
		sdCfg.hyky = hykydm;
		Get("/personQlzdr/features/hykydm", function(rs){
			var map = {},x = [],y=[];

			$.each(rs, function(k,v) {
				var hykymc = hyky(k);
				var val = parseInt(map[hykymc] || 0) + parseInt(v);
				map[hykymc] = val;
			});
			for(var i in map){
				x.push(i);
				y.push(map[i]);
			}
			accentBar(x,y);
		});
	});
}

ajaxSpeciality();//初始化专长
function ajaxSpeciality(){
	Get("/code/zcAll", function(zcdm){
		sdCfg.zc = zcdm;
		Get("/personQlzdr/features/zcdm", function(rs){
			var data = rs.data;
				var map = {}, x = [],y=[];

				$.each(rs, function(k,v) {
					var _zc = zcmc(k);
					var val = parseInt(map[_zc] || 0) + parseInt(v);
					map[_zc] = val;
				});
				for(var i in map){
					x.push(i);
					y.push(map[i]);
				}
				specialityBar(x,y);
		});
	});
}


var time="";
var startDate;
var endDate;
//获取参数
function getCanshu(){
	startDate =moment(moment().subtract(30, 'days').calendar()).format("YYYY-MM-DD");
    endDate = moment().format("YYYY-MM-DD");
    time=startDate+","+endDate;
    //alert(time);
}

var xiaquAdd=[];//横轴辖区名
var xiaquCount=[];//数量

//级联菜单数据
var provinceList = [
  {name:'北京', cityList:[           
  {name:'东城区'},          
  {name:'西城区'}
  ]},
  {name:'上海', cityList:[           
  {name:'黄浦区'},           
  {name:'卢湾区'}
  ]},
  {name:'澳门', cityList:[
  {name:'澳门特别行政区'}
  ]}
  ];

//加载日历
function calendar(){
	startDate =moment(moment().subtract(30, 'days').calendar()).format("YYYY-MM-DD");
    endDate = moment().format("YYYY-MM-DD");

    //日期，默认时间设成当日到前30天
    $('#reservation').val(startDate + ' - ' + endDate);
    $('#reservation').daterangepicker({
        'locale': locale,
        format:"YYYY-MM-DD",
        startDate:startDate,
        endDate:endDate,
    }, function(start, end) {
        startDate=start.format('YYYY-MM-DD');
        endDate=end.format('YYYY-MM-DD');
        loadPic()
    });

}

function nationBar(x,y){//民族
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

function sexPie(x,y){//性别
	var mySex = echarts.init(document.getElementById('sex'));
	var option = {
		    color:['#00c6dd', '#698B69'],
		    tooltip: {
		        trigger: 'item',
		        formatter: "{a} <br/>{b}: {c} ({d}%)"
		    },
		    legend: {
		        orient: 'vertical',
		        x: 'left',
                data:x,
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

function nativePlaceBar(x,y){//籍贯
	var mynativePlace = echarts.init(document.getElementById('nativePlace'));
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

function ageBar(x,y){//年龄
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
		            position: 'top',
		            //splitLine: {show: false},
		            //axisLine: {show: false},
        			//axisTick: {show: false},
		        }
		    ],
		    yAxis : [
		        {
		            type : 'category',
                    data:x,
		            //axisLine: {show: false},
			        //axisTick: {show: false},
			        //axisLabel: {interval: 0},
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

function jobsBar(x,y){//职业
	var myJobs = echarts.init(document.getElementById('jobs'));
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

function cultureBar(x,y){//文化程度
	var myCulture = echarts.init(document.getElementById('culture'));
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
		            position: 'top',
		            //splitLine: {show: false},
		            //axisLine: {show: false},
        			//axisTick: {show: false},
		        }
		    ],
		    yAxis : [
		        {
		            type : 'category',
                    data:x,
		            //axisLine: {show: false},
			        //axisTick: {show: false},
			        //axisLabel: {interval: 0},
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
	myCulture.setOption(option);
	window.addEventListener("resize", function () {
		myCulture.resize()
	});
}

function addressBar(x,y){//现住址
	var myAddress = echarts.init(document.getElementById('address'));
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
	myAddress.setOption(option);
	window.addEventListener("resize", function () {
		myAddress.resize()
	});	
}

function accentBar(x,y){//口音
	var myAccent = echarts.init(document.getElementById('accent'));
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
		            position: 'top',
		            //splitLine: {show: false},
		            //axisLine: {show: false},
        			//axisTick: {show: false},
		        }
		    ],
		    yAxis : [
		        {
		            type : 'category',
                    data:x,
		            //axisLine: {show: false},
			        //axisTick: {show: false},
			        //axisLabel: {interval: 0},
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
	myAccent.setOption(option);
	window.addEventListener("resize", function () {
		myAccent.resize()
	});
}

function specialityBar(x,y){//专长
	var mySpeciality = echarts.init(document.getElementById('speciality'));
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
	mySpeciality.setOption(option);
	window.addEventListener("resize", function () {
		mySpeciality.resize()
	});	
}

});
