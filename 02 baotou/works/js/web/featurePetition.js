var sdCfg = {
    mz:[],
    jgdmQx:[],
    zlyb:[],
    hyky:[],
    zc:[],
    whcd:[],
    jzry:[],
    url:"/personFeaturesAnalysis"
};

function parseMap(m){
	for(var i in m){
		return {key:i,value:m[i]};
	}
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
	return code == "1" ? "男" : "女";
}
$(function() {
    calendar();
    // geturl();
    getCanshu();
    // onlinePersonData();

    findBtn();

ajaxNationBar();//AJAX民族图表
function ajaxNationBar(){
    //拉取民族码表
    Get("/code/mzAll", function(data){

        sdCfg.mz = data;

        var analysisFields = "mzdm";
        Get(sdCfg.url + "?analyzeType=sf&analysisFields=" + analysisFields, function(rs){
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
function findBtn(){
	$("#find").click(function(){
            //var yiji=$(".hushi-xiaqu1").text();
            //var erji=$(".hushi-xiaqu2").text();
		time=startDate+","+endDate;
		alert(time);
		geturl();
	})
}


ajaxSex();//初始化性别
function ajaxSex(){
    var analysisFields = "xbdm";
    Get(sdCfg.url + "?analyzeType=sf&analysisFields=" + analysisFields, function(rs){
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
	Get("/code/jgAll1",function (jgdm) {
        sdCfg.jgdmQx = jgdm;
        Get(sdCfg.url+"?analyzeType=sf&analysisFields=jgdm_sf",function(rs){
			var data = rs.data;
			var map = {};
			for(i=0;i<data.length&&i<20;i++){
				var r  = parseMap(data[i]);
				var jgqx = jg_qx(r.key);
				var val = parseInt(map[jgqx] || 0) + parseInt(r.value);
				map[jgqx]=val;
			}
			var x = [],y = [];
			for(var i in map){
				x.push(i);
				y.push(map[i])
			}
            nativePlaceBar(x,y);
		})
    })
}

ajaxAges();//初始化年龄
function ajaxAges(){
	Get(sdCfg.url + "?analyzeType=sf&analysisFields=nl",function (rs) {
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
            return b.localeCompare(a);
        });
        for(var i=0;i<x.length;i++){
            y.push(map[x[i]]);
        }
        ageBar(x,y);
    });
}

ajaxEducation();//初始化学历
function ajaxEducation(){
    Get("/code/whcdAll", function(data){
        sdCfg.whcd = data;
        Get(sdCfg.url + "?analyzeType=sf&analysisFields=xldm", function(rs){
            var data = rs.data;
            var map = {};
            for(var i=0;i<data.length&&i<10;i++){//限制10条数据
                var r = parseMap(data[i]);
                var xl = whcd(r.key);
                var val = parseInt(map[xl] || 0) + parseInt(r.value);
                map[xl] = val;
            }
            var x = [],y=[];
            for(var i in map){
                x.push(i);
                y.push(map[i]);
            }
            educationBar(x,y);
        });
    });
}

//ajaxAddress();//初始化现住址
function ajaxAddress(){

	Get("/code/xzz",function (data) {
		sdCfg.xzz = data;
		Get(sdCfg.url+"",function (rs) {
			var data = rs.data;
			var map={};
			for(var i = 0;i<data.length&&i<10;i++){
				var r = parseMap(data[i]);
				var xzz = xzz(r.key);
				var val = parseInt(map[xzz]||0)+parseInt(r.value);
				map[xzz] = val;
			}
			var x = [], y = [];
			for(var i in map){
				x.push(i);
				y.push(map[i]);
			}
            addressBar(x,y);
        })
    })
}

//ajaxEmphasis();//重点人员细类
function ajaxEmphasis(){

	Get("/code/jzryAll",function () {
		sdCfg.jzry = data;
		Get(sdCfg.url+"",function (jz) {
			var data  = jz.data;
			var map={};
			for(var i = 0;i<data.length&&i<10;i++){
				var r = parseMap(data[i]);
				var jz = jzry(r.key)
				var val = parseInt(map[jz] || 0)+parseInt(r.value);
				map[jz] = val;
        	}
        	var x=[],y=[];
			for(var i in map){
				x.push(i);
				y.push(map[i])
			}
            emphasisBar(x,y);
        })
    })
}

var jg_qx = function(code){
	for(var i = 0;i<sdCfg.jgdmQx.length;i++){
		if(sdCfg.jgdmQx[i].code == code){
			return sdCfg.jgdmQx[i].value;
		}
	}
	return "其他";
}
// //加载url配置文件
// function geturl(){
// 	$.ajax({
// 		  type: "get",
// 		  dataType : 'json',
// 		  url: "../json/url.json",   //每页显示多少条有3处标记
// 		  async:false,// 异步请求
// 		  success:function(data,states){
// 		  	//console.log(data.url[0].local);
// 		  	var url=data.url[0].local;
//             getData(url);
// 		  },
// 		  error:function(e){}
//     })
// }

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

function nationBar(data,name){//民族
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
	        		// data : ['汉族','回族','维吾尔族','满族','蒙古族','土族','水族','京族','保安族'],//name
					splitNumber:data.length,
		            data:data,
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
		            // data:[10, 52, 200, 334, 390, 330, 220,200,12,5]//data
					data:name
		        }
		    ]
		};

	myNation.setOption(option);
	window.addEventListener("resize", function () {
	     myNation.resize();
	});
}

    function nativePlaceBar(data,name){//籍贯
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
                    // data : ['冀', '晋', '辽', '吉', '黑', '苏', '浙','皖','闽','赣'],//name
					data : data,
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
                    // data:[10, 52, 200, 334, 390, 330, 220,200,12,5]//data
					data : name
                }
            ]
        };
        mynativePlace.setOption(option);
        window.addEventListener("resize", function () {
            mynativePlace.resize()
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
		        //data:['男','女']
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

function ageBar(data,age){//年龄
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
					//data:data
		        }
		    ],
		    yAxis : [
		        {
		            type : 'category',
		            // data : ['16岁以下', '16~20岁', '21~30岁', '31~40岁', '41~50岁', '50~60岁', '61岁以上'],//age
		            data:data,
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
		            // data:[10, 52, 200, 334, 390, 330, 220]//data
					data:age
		        }
		    ]
		};
	myAge.setOption(option);
	window.addEventListener("resize", function () {
		myAge.resize()
	});
}

function educationBar(data,name){//学历
	var myEducation = echarts.init(document.getElementById('education'));
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
        			axisTick: {show: false}
					
		        }
		    ],
		    yAxis : [
		        {
		            type : 'category',
		            // data : ['初中', '高中', '专科', '大专', '本科', '研究生', '博士'],//name
					//data:name,
					data:data,
		            axisLine: {show: false},
			        axisTick: {show: false},
			        axisLabel: {interval: 0}
		        }
		    ],
		    series : [
		        {
		            name:'人数',
		            type:'bar',
		            barWidth: '60%',
		            // data:[10, 52, 200, 334, 390, 330, 220]//data
					data:name
		        }
		    ]
		};
	myEducation.setOption(option);
	window.addEventListener("resize", function () {
		myEducation.resize()
	});
}

function addressBar(data,name){//现住址
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
		            // data : ['现住址', '居住地', '现住址', '现住址', '现住址', '现住址', '现住址','现住址','现住址','现住址'],//name
					data:name,
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
		            // data:[10, 52, 200, 334, 390, 330, 220,200,12,5]//data
		        	data:data
		        }
		    ]
		};
	myAddress.setOption(option);
	window.addEventListener("resize", function () {
		myAddress.resize()
	});	
}

function emphasisBar(data,name){//重点人员细类
	var myEmphasis = echarts.init(document.getElementById('emphasis'));
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
        			axisTick: {show: false}
		        }
		    ],
		    yAxis : [
		        {
		            type : 'category',
		            // data : ['重点人员细类', '重点人员细类', '重点人员细类', '重点人员细类', '重点人员细类', '重点人员细类', '重点人员细类'],//name
		            data:data,
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
		            // data:[10, 52, 200, 334, 390, 330, 220]//data
					data:name
		        }
		    ]
		};
	myEmphasis.setOption(option);
	window.addEventListener("resize", function () {
		myEmphasis.resize()
	});
}

});
