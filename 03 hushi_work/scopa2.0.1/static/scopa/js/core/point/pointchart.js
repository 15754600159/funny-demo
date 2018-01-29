/**
 * Created by admin on 2016/8/14.
 */
define(function (require) {
    var $page = $('.page-point');
    require('echarts');

    /*初始化*/
    var initPage = function (data) {
    	$page = $('.page-point')
        mining.utils.loadPage($page, function () {
            initChart(data);
        });
    };
    var initChart = function (obj) {

        var chart = {'scatter': getScatter, 'box': getBar,'line':getLine};
        var type = obj.chartType || obj.obj.chartType, data = obj.data || obj.obj.data;
        if (type)
            chart[type](data);
    };
    var color=['#ec5a6d','#f4b0bf'];
    function getScatter(data) {
        var ec = echarts,
            Chart = ec.init(document.getElementById('chart'));
        var serialsData = data.serials, legend = [], series = [],xAxis=[],yAxis=[],wMax=0;
        var mdata=[];
        $.each(serialsData, function (k, v) {
            legend.push(v['serial-name']);
            xAxis=xAxis.concat(v['x-data']) ;
            yAxis=yAxis.concat(v['y-data']);
            if(mining.utils.isEmpty(v)) return;
            var data = [];
            var length = v['x-data'].length;
            for (var i = 0; i < length; i++) {
                mdata.push({x:v['x-data'][i],y:v['y-data'][i],w: v['w-data'][i]});
            }
            mdata.sort(function(obj1,obj2){return obj2.w-obj1.w});
            for(var i = 0; i < 15; i++){
                data.push([mdata[i].x, mdata[i].y, mdata[i].w]);
                if(wMax< mdata[i].w)  wMax= mdata[i].w;
            }
            series.push({
                name: v['serial-name'],
                data: data,
                type: 'scatter',
                itemStyle: {
                    normal: {
                        color: color[k]
                    }
                }
            });
        });
        $.unique(xAxis);
        xAxis.sort(function(a, b) {
            return a - b;
        });
        var objY = {
            splitLine: {
                lineStyle: {
                    type: 'dashed'
                }
            },
            scale: true,
             name:data['y-name']
        };
        if(isNaN(yAxis[0])){
            objY= {
                splitLine: {
                    lineStyle: {
                        type: 'dashed'
                    }
                },
                scale: true,
                type: 'category', name:data['y-name'],
                data: yAxis
            };
        }
        var option = {
           
            legend: {
                right: 10,
                data: legend
            },
            xAxis: {
                splitLine: {
                    lineStyle: {
                        type: 'dashed'
                    }
                },
                type: 'category',
                data: xAxis,
                name:data['x-name']

            },
            tooltip:{
                formatter:function(obj){
                    var value=obj.value;
                    return value;
                }
            },
            yAxis:objY,
            visualMap: [
                {
                    left: 'right',
                    top: '10%',
                    dimension: 2,
                    min: 0,
                    max: wMax,
                    itemWidth: 30,
                    itemHeight: 30,
                    calculable: false,
                    precision: wMax,
                    textStyle:{color:'#fff'},
                    inRange: {
                        symbolSize: [10, 70]
                    },
                    controller:{
                        inRange:{
                            color:['#fff']
                        }
                    }

                }

            ],
            series: series
        };
        Chart.setOption(option);

    }
    function getBar(data) {
        var ec = echarts,
            Chart = ec.init(document.getElementById('chart'));
        var serialsData = data.serials, legend = [], series = [];

        $.each(serialsData, function (k, v) {
            legend.push(v['serial-name']);
            if(mining.utils.isEmpty(v)) return;
            var ydata=[];
            $.each(v['y-data'],function(m,n){
                if(m<20){
                    ydata.push(n.split('_')[0]);
                }

            });
            series.push({
                name:v['serial-name'],
                type:'bar',
                data:ydata
            });
        });
        var option =  {
            tooltip : {
                trigger: 'axis',
                axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                    type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                }
            },
            legend: {
                data:legend
            },
            grid: {
                left: '3%',
                right: '10%',
                bottom: '20%',
                containLabel: true
            },
            xAxis : [
                {
                    type : 'category',
                    data : serialsData[0]['x-data'],
                    name:data['x-name'],
                    nameLocation:'end',
                    nameGap:10,
                    axisLabel:{
                        interval:0,
                        rotate:-20
                    }
                }
            ],
            yAxis : [
                {
                    type : 'value',
                    name:data['y-name']
                }
            ],
            series: series
        };
        Chart.setOption(option);
    }
    function getLine(data){
        var ec = echarts,
            Chart = ec.init(document.getElementById('chart'));
        var serialsData = data.serials, legend = [], series = [],xAxis=[];
        var xyData=[];
        $.each(serialsData, function (k, v) {
            legend.push(v['serial-name']);
            if(mining.utils.isEmpty(v)) return;
            xAxis=xAxis.concat(v['x-data']) ;
            var objData={};
            for(var i=0;i<v['x-data'].length;i++){
                objData[v['x-data'][i]]=v['y-data'][i];
            }
            xyData.push(objData);

        });
        $.unique(xAxis);
        xAxis.sort(function(a, b) {
            return a - b;
        });
        $.each(xyData,function (index, obj) {
            var ydata=[];
            for(var i=0;i<xAxis.length;i++){
                ydata.push(obj[xAxis[i]]?obj[xAxis[i]]:0);
            }
            series.push({
                name:serialsData[index]['serial-name'],
                type:'line',
                data:ydata
            });
        });
        var option = {
           
            tooltip: {
                trigger: 'axis'
            },
            legend: {
                data:legend
            },
            grid: {
                left: '3%',
                right: '10%',
                bottom: '3%',
                containLabel: true
            },
            xAxis: {
                type: 'category',
                boundaryGap: false,
                data: xAxis,
                name:data['x-name']
            },
            yAxis: {
                type: 'value',
                name:data['y-name']
            },
            series: series
        };
        Chart.setOption(option);
    }
    return {
        init: initPage
    }
});