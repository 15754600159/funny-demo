//定义辖区列表 cookie?
var xqlb = {};


$(function(){
    //初始化时间控件
    initCalender();
    initXq(xqlb);
    initData();
    $("#find").bind('click', function () {
        initData()
    })
});

/**
 * 整理echars参数
 * @param xq
 */
function initData() {
    var xq = $("#yijixiaqu").val();
    var param = "kssj=" + $("#reservation").val().replace(/\s/g, '') + "&" + "_type=sf";
    if (xq != null && xq != "") {
        param = "kssj=" + $("#reservation").val().replace(/\s/g, '') + "&" + "_type=sf&xzqh=" + xq
    }
    var xiaquAdd = [];
    var numberOfPerson = [];
    var checkIn=[];
    Get("/personAreaAnalysis?" + param, function (data) {
/*
        $.each(data, function (index, item) {
        	
            for (var obj in item) {
            	for(var  xq in item[obj]){
                xiaquAdd.push(xqlb[xq]);
                numberOfPerson.push(item[obj][xq]);
              }
            }
            
        });
        */
        var list = data.data;
        for(var i =0;i<list.length;i++){
        	var obj = list[i];
        	for(var  xq in obj){
                xiaquAdd.push(xqlb[xq]);
                numberOfPerson.push(obj[xq]);
              }
        	
        }
        
        
        onlinePersonData(xiaquAdd, numberOfPerson)
    })
}

/**
 * 初始化图标
 * @param xiaquAdd
 * @param xiaquCount
 */
function onlinePersonData(xiaquAdd, numberOfPerson) {
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
            data: ['上访人数'],
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
            splitNumber:xiaquAdd.length
        }],
        yAxis: [{
            type: 'value',
            name: '数量',
            axisLabel: {
                formatter: '{value}'
            }
        }],
        series: [{
            name: '上访人数',
            type: 'bar',
            itemStyle: {
                normal: {
                    color: barColor1
                }
            },
            barWidth:25,
            // data: [20, 12, 55, 45,11]
            data:numberOfPerson
        }
        ]
    };

    // 使用刚指定的配置项和数据显示图表。
    myChart.setOption(option);
}