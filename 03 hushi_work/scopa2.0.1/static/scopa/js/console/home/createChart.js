/**
 * Created by Administrator on 2015/11/26.
 */
define(function(require, exports, module){

    var createChart=function(continer,data){
        require('echarts');
        var getTile=function(data){
            var reData=[];
            $.each(data,function(k,v){
                reData.push(v.name);
            });
            return reData;
        }
        var option = {
            color: ['#50aadd', '#57cb80', '#7b67a8', '#467bd3'],
            tooltip: {
                trigger: 'item',
                formatter: "{b} : {c} ({d}%)",
                padding: 20,
                backgroundColor: 'rgba(5,67,104,0.7)'
            },
            legend: {
                y:'bottom',
                data: getTile(data),
                textStyle: {
                    color: '#3c4f69'
                },
                padding: 0
            },
            calculable: false,
            series: [
                {

                    type: 'pie',

                    radius: [0, '90%'],
                    itemStyle: {
                        normal: {
                            label: {
                                position: 'inner',
                                formatter: function (data) {
                                    return Number(data.percent).toFixed(0) + '%'
                                }
                            },
                            labelLine: {
                                show: false
                            }
                        }
                    },
                    data: data
                }
            ]

        };
        var mychart=echarts.init(continer);
        mychart.setOption(option);
    }
    return createChart;
})

