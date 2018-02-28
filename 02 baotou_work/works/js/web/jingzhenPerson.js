//定义辖区列表 cookie?
var xqlb = {};


$(function(){
    //初始化时间控件
    initCalender();
    initXq(xqlb);
    initData();
    Tab()
    $("#find").bind('click', function () {
        initData()
    })
});

/**
 * 整理echars参数
 * @param xq
 */
//包头地图
function BtMap(x) {
	var app = echarts.init(document.getElementById('gwP_qianxi'))
	option = {
	      title: {
	            text: '高危人员区域活动分析',
	            left: 'center' //组件的位置
	      },
	      tooltip: {
	            trigger: 'item'
	      },
	      visualMap: {
	            min: 0,
	            max: 10000,
	            left: '10%',
	            top: 'bottom',
	            text: ['高','低'],           // 文本，默认为数值文本
	            calculable: true
	      },
	      series: [
	            {
	                  name: '经侦人员',
	                  type: 'map',
	                  mapType: 'baotou',
	                  roam: false,
	                  label: {
	                        normal: {
	                              show: false
	                        },
	                        emphasis: {
	                              show: true
	                        }
	                  },
	                  data: x
	            }
	      ]
	};
	app.setOption(option)
	app.on('click',function (params) {
		location.href = 'http://127.0.0.1:8020/works/view/zanzhuPerson.html?' + params.name
	})
}
function initData() {
  /*  var xq = $("#yijixiaqu").val();
    var param = "kssj=" + $("#reservation").val().replace(/\s/g, '') + "&" + "_type=jz";
    if (xq != null && xq != "") {
        param = "kssj=" + $("#reservation").val().replace(/\s/g, '') + "&" + "_type=jz&xzqh=" + xq
    }*/
    var xiaquAdd = [];
    var numberOfPerson = [];
    var checkIn=[];
    var arr = [];
    var str = '';
    var i = 1;
    Get("/personJzry/area", function (data) {
    	$('#zz_tbody').empty();
        $.each(data, function (k, v) {
                xiaquAdd.push(xqlb[k]);
                numberOfPerson.push(v);
                arr.push({name: xqlb[k],value: v})
        	str = Number(str) + Number(v)
        	$('#zz_tbody').append(
        		"<tr>"+
        		"<td>"+i+"</td>"+
        		"<td>"+(xqlb[k] == undefined ? '' : xqlb[k])+"</td>"+
        		"<td>"+v+"</td>"+
        		"</tr>"
        	)
        	i++;
        });

        onlinePersonData(xiaquAdd, numberOfPerson)
        BtMap(arr)
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
            data: ['经侦人数'],
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
            name: '经侦人数',
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