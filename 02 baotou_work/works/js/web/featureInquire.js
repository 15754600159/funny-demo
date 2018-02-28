var sdCfg = {
	mz:[],
	jgdmSf:[],
	zlyb:[],
	hyky:[],
	zc:[],
	whcd:[],
	url:"/personFeaturesAnalysis",
	feature: 'bpw'
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
		if(sdCfg.jgdmSf[i].code == code){
			return sdCfg.jgdmSf[i].value;
		}
	}
	return "其他";
}

//根据职业类别代码获取职业名称
var zylb = function(code){
	for(var i = 0;i< sdCfg.zylb.length;i++){
		if(("" + code) == sdCfg.zylb[i].code){
			return sdCfg.zylb[i].value;
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
			return sdCfg.whcd[i].value;
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
//    geturl();
//    getCanshu();
//    onlinePersonData();
    
ajaxNationBar();//AJAX民族图表
function ajaxNationBar(){
	//拉取民族码表
	Get("/code/mzAll", function(data){

		sdCfg.mz = data;

		var analysisFields = "mzdm";
		Get(sdCfg.url + "?analyzeType="+sdCfg.feature+"&analysisFields=" + analysisFields, function(rs){
			var data = rs.data;
			var mz = [];//x轴，民族
			var rs = [];//y轴，数量
			var map = {};
			//for(var i=0;i<data.length;i++){
			for(var i=0;i<data.length&&i<=10;i++){//限制10条数据
				var r = parseMap(data[i]);
				var key = getMz(r.key);
				var s = parseInt((map[key] || 0)) + parseInt(r.value);
				map[key] = s;
			}
			for(var i in map){
				mz.push(i);
				rs.push(map[i]);
			}
			nationBar(mz,rs);
		});
	});
}

ajaxSex();//初始化性别
function ajaxSex(){
	var analysisFields = "xbdm";
	Get(sdCfg.url + "?analyzeType=bpw&analysisFields=" + analysisFields, function(rs){
		var data = rs.data;
		var x = [];//x轴，性别代码
		var y = [];//y轴，数量
		var map = {};
		for(var i=0;i<data.length&&i<=10;i++){
			var r = parseMap(data[i]);
			x.push(xb(r.key));
			y.push({value:r.value, name:xb(r.key)});
		}
		sexPie(x,y);
	});
}

ajaxNativePlace();//初始化籍贯
function ajaxNativePlace(){
	Get("/code/jgAll1", function(jgdm){
		sdCfg.jgdmSf = jgdm;
		Get(sdCfg.url + "?analyzeType=bpw&analysisFields=jgdm_sf", function(rs){
			var data = rs.data;
			var map = {};

			for(var i=0;i<data.length&&i<20;i++){//限制10条数据
				var r = parseMap(data[i]);
				var jgsf = jg_sf(r.key);
				var val = parseInt(map[jgsf] || 0) + parseInt(r.value);
				map[jgsf] = val;
			}
			var x = [],y=[];
			for(var i in map){
				x.push(i);
				y.push(map[i]);
			}
			nativePlaceBar(x,y);
		});
	});
}

ajaxAges();//初始化年龄
function ajaxAges(){
	Get(sdCfg.url + "?analyzeType=bpw&analysisFields=nl", function(rs){
		var data = rs.data;
		var map = {};

		for(var i=0;i<data.length;i++){
			var r = parseMap(data[i]);
			var nl = nld(parseInt(r.key));//计算年龄段
			var val = parseInt(map[nl] || 0) + parseInt(r.value);
			map[nl] = val;
		}
		var x = [],y=[];
		for(var i in map){
			x.push(i);
		}
		x = x.sort(function(a,b){
			//a = parseInt(a.substr(0,1));
			//b = parseInt(b.substr(0,1));
			//return a-b;
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
		Get(sdCfg.url + "?analyzeType=bpw&analysisFields=zylbdm", function(rs){
			var data = rs.data;
			var map = {};

			for(var i=0;i<data.length&&i<10;i++){//限制10条数据
				var r = parseMap(data[i]);
				var zy = zylb(r.key);
				var val = parseInt(map[zy] || 0) + parseInt(r.value);
				map[zy] = val;
			}
			var x = [],y=[];
			for(var i in map){
				x.push(i);
				y.push(map[i]);
			}
			jobsBar(x,y);
		});
	});
}

ajaxAddress();//初始化现住址
function ajaxAddress(){
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
        console.log(startDate);
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
		            splitLine: {show: false},
		            axisLine: {show: false},
        			axisTick: {show: false},
		        }
		    ],
		    yAxis : [
		        {
		            type : 'category',
                    data:x,
		            axisLine: {show: false},
			        axisTick: {show: false},
			        axisLabel: {interval: 0},
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

function addressBar(x,y){//现住址
	var myAddress = echarts.init(document.getElementById('administrative'));
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
});
