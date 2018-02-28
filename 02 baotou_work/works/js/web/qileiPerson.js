//定义辖区列表 cookie?
var xqlb = {};


$(function(){
    //初始化时间控件
    initCalender();
    initXq(xqlb);
    initData();
    Tab();
    $("#find").bind('click', function () {
        initData()
    })
});

/**
 * 整理echars参数
 * @param xq
 */
function initData() {
  	var zdrylbbj = "zdrylbbj="
    var xiaquAdd = [];
    var numberOfPerson = [];
    var checkIn=[];
    var arr = [];
    var str = '';
    var i = 1;
    Get("/personQlzdr/area", function (data) {
    	$('#zz_tbody').empty();
        $.each(data, function (index, item) {
        
        	xiaquAdd.push(xqlb[index]);
            numberOfPerson.push(item);
            arr.push({name: xqlb[index],value: item})
        	str = Number(str) + Number(item)
        	$('#zz_tbody').append(
        		"<tr>"+
        		"<td>"+i+"</td>"+
        		"<td>"+(xqlb[index] == undefined ? '' : xqlb[index])+"</td>"+
        		"<td>"+item+"</td>"+
        		"</tr>"
        	)
        	i++;
        });
		
        onlinePersonData(xiaquAdd, numberOfPerson)
        BtMap(arr);
        $('#gwp_span').text(str)
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
            data: ['七类重点人数'],
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
            name: '七类重点人数',
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