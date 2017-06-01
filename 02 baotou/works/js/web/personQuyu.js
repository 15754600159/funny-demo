$(function(){
   // calendar();  
    geturl();
   // getCanshu();  
    onlinePersonData();
  //  caidan();
  //  findBtn();
})

//加载url配置文件
function geturl(){
	$.ajax({
		  type: "get",
		  dataType : 'json',  
		  url: "../json/url.json",   //每页显示多少条有3处标记
		  async:false,// 异步请求
		  success:function(data,states){
		  	//console.log(data.url[0].local);
		  	var url=data.url[0].local;
            getData(url);
		  },
		  error:function(e){}
    })
}

var time="";
var startDate;
var endDate;
//获取参数
/*function getCanshu(){
	startDate =moment(moment().subtract(30, 'days').calendar()).format("YYYY-MM-DD");
    endDate = moment().format("YYYY-MM-DD");
    time=startDate+","+endDate;
    //alert(time);
}*/

var xiaquAdd=[];//横轴辖区名
var xiaquCount=[];//数量
//初始化获取数据
function getData(dataUrl){
	xiaquAdd=[];
	xiaquCount=[];
	$.ajax({
		  type: "get",
		  dataType : 'json',  
		  url: dataUrl,   
		//  data:{_type:'xj'},//---------------------注：传参数时不要注释
		  async:false,// 异步请求
		  success:function(data,states){
		  	xiaqu=data.data[0];
		  	for(var key in xiaqu){	
                xiaquAdd.push(key);
                xiaquCount.push(xiaqu[key]);
		  	}			
				
		  	//console.log(xiaquAdd);
		  	onlinePersonData();

		  },
		  error:function(e){}
    })
}

//查询按钮
/*function findBtn(){
	$("#find").click(function(){
		//var yiji=$(".hushi-xiaqu1").text();
		//var erji=$(".hushi-xiaqu2").text();
		var yiji=$("#yijixiaqu").val();
		var erji=$("#erjixiaqu").val()
		time=startDate+","+endDate;
		alert(yiji+"--"+erji+"----"+time);
		geturl();
	})
	
}*/


//级联菜单数据
/*var provinceList = [
  {name:'北京', cityList:[           
  {name:'东城区', areaList:['111','222']},          
  {name:'西城区', areaList:['密云县','延庆县']}
  ]},
  {name:'上海', cityList:[           
  {name:'黄浦区', areaList:['333']},           
  {name:'卢湾区', areaList:['崇明县']}
  ]},
  {name:'澳门', cityList:[
  {name:'澳门特别行政区', areaList:['望德堂区','圣安多尼堂区','大堂区','望德堂区','风顺堂区','氹仔','路环']}
  ]}
  ];*/

//级联菜单
/*function caidan(){
     var form=document.myform;
			var sheng=myform.sheng;
			var shi=myform.shi;
		//	var qu=myform.qu;
			sheng.onfocus=function(){
				var shengnum=provinceList.length;
				this.innerHTML="<option>一级辖区</option>"
				for (var i = 0; i < provinceList.length; i++) {     
					var option=document.createElement("option")
					option.text=provinceList[i].name;
					sheng.appendChild(option)
				};
			}
			sheng.onchange=function(){
				shi.innerHTML="<option>二级辖区</option>"
			//	qu.innerHTML="<option>选择地区</option>"
				shengindex=sheng.selectedIndex-1;
				for (var i = 0; i < provinceList[shengindex].cityList.length; i++) {
					var option=document.createElement("option")
					option.text=provinceList[shengindex].cityList[i].name;
					shi.appendChild(option)
				};

			}
			shi.onchange=function(){
				qu.innerHTML="<option>选择地区</option>"
				var shiindex=shi.selectedIndex-1;
				for (var i = 0; i < provinceList[shengindex].cityList[shiindex].areaList.length; i++) {
					var option=document.createElement("option")
					option.text=provinceList[shengindex].cityList[shiindex].areaList[i];
					qu.appendChild(option)
				};
			}

}*/


//加载echarts柱状图
function onlinePersonData(){
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
          //data: ['辖区一', '辖区二', '辖区三', '辖区四','辖区五'],
            data: xiaquAdd,
            splitNumber:1
        }],
        yAxis: [{
            type: 'value',
            name: '数量',
            axisLabel: {
                formatter: '{value}'
            }
        }],
        series: [{
            name: '辖区数量',
            type: 'bar',
            itemStyle: {
                normal: {
                    color: barColor1
                }
            },
            barWidth:40,
           // data: [20, 12, 55, 45,11]
            data:xiaquCount
            
        }/*, {
            name: '上网次数',
            type: 'bar',
            itemStyle: {
                normal: {
                    color: barColor2
                }
            },
            barWidth:40,
            data: [10, 20, 34, 32,22]
        }*/
        ]
    };

    // 使用刚指定的配置项和数据显示图表。
    myChart.setOption(option);
}

//加载日历
/*function calendar(){
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

}*/