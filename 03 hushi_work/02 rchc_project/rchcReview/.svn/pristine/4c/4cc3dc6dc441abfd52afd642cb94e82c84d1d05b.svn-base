var data_opt1 = [];
var data_opt2 = [];
var date = new Date();
     var year = date.getFullYear();
     var month = date.getMonth()+1;
     var day = date.getDate();
     var hour = date.getHours();
     var minute = date.getMinutes();
     var second = date.getSeconds();
      if(Number(month)<10){
        month="0"+month;
     }
     if(Number(day)<10){
        day = "0"+day
     }
     var noww= year+'-'+month+'-'+day+' '+'23:'+'59:'+'59';
     console.info(noww)
    $("#cl_jsrq").val(noww);
     var dates = new Date(date.getTime());
     var month = dates.getMonth()+1;
     var day = dates.getDate();
     var hour = dates.getHours();
     var minute = dates.getMinutes();
     var second = dates.getSeconds();
     if(Number(month)<10){
        month="0"+month;
     }
     if(Number(day)<10){
        day = "0"+day
     }
     var sec = year+'-'+month+'-'+day+' '+'00:'+'00:'+'00';
     console.info(sec)
    $("#cl_ksrq").val(sec);

 /*定义下载方法*/
 $(document).on("click", "#export-ry", function() {
 	console.log(host+'/carcheck/info/exportInfofind?beginTime='+$('#ksrq').val()+'&endTime='+$('#cl_ksrq').val());
     window.location.href=host+'/carcheck/info/exportInfofind?beginTime='+$('#cl_ksrq').val()+'&endTime='+$('#cl_jsrq').val();
 });
     
function init_clhltj(){
    $("#loading").css('display', 'block');
    Post("/carcheck/info/infofind",$.param({
        beginTime: $('#cl_ksrq').val(),
        endTime: $('#cl_jsrq').val()/*,
        ucode:  $('#hldw').val(),
        policeName: $('#hlr').val()*/
    }), function (data) {
        var x = [];
        var y1 = [];
        var y2 = [];
        var htmlobj="";
        $("#tableBody1").empty();
        $("#tableBody2").empty();
        count=data[0].length;
        if(data[0] && count > 0 ) {
            $.each(data[0], function (index, item) {
            	if(item.codeName){
                    x.push(item.codeName);
                }
                y1.push(item.countQp);
                y2.push(item.countQpCompare);
                if((index+1)%2==1){
                    $("#tableBody1").append(
                        "<tr>"+
                        "<td>"+(item.codeName)+"</td>"+
                        "<td><a tid='"+item.queryPlace+"' class='hldw_xs'>"+(item.countQp==undefined?'':item.countQp)+"</a></td>"+
                        "<td><a tid='"+item.queryPlace+"' class='hldw_xs2'>"+(item.countQpCompare==undefined?'':item.countQpCompare)+"</a></td>"+ 
                        "</tr>"
                    );
                }else{
                    $("#tableBody2").append(
                        "<tr>"+
                        "<td>"+(item.codeName)+"</td>"+
                        "<td><a tid='"+item.queryPlace+"' class='hldw_xs'>"+(item.countQp==undefined?'':item.countQp)+"</a></td>"+
                        "<td><a tid='"+item.queryPlace+"' class='hldw_xs2'>"+(item.countQpCompare==undefined?'':item.countQpCompare)+"</a></td>"+ 
                        "</tr>"
                    );
                }
            });
            $.each(data[2], function (index, item) {
                $("#tableBody1").append(
                        "<tr>"+
                        "<td>合计</td>"+
                        "<td><a tid='' class='hldw_xs'>"+(item.countQp==undefined?'':item.countQp)+"</a></td>"+
                        "<td><a tid='' class='hldw_xs2'>"+(item.countQpCompare==undefined?'':item.countQpCompare)+"</a></td>"+ 
                        "</tr>"
                    );
            });

        }
        else{
            $("#tableBody").append(
                "<tr>"+
                "<td colspan='999'>"+ "搜索结果为空" + "</td>" +
                "</tr>"
            )
        }
        
        if(data[1] && data[1].length > 0 ) { 
            data_opt1 = [];
            $.each(data[1], function (index, item) {
                data_opt1.push({value:item.countPlt,name:cllxMap[item.plateType]});
            })
        };
        data_opt2 = [];
        data_opt2.push(x);
        data_opt2.push(y1);
        data_opt2.push(y2);
         // 基于准备好的dom，初始化echarts实例
    /*var myChart1 = echarts.init(document.getElementById('main1'));

    // 指定图表的配置项和数据
    option1 = {
        title : {
            text: '车辆分类统计',
            //x:'center'
        },
        tooltip : {
            trigger: 'item',
            formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        legend: {
            orient: 'vertical',
            left: 'left',
            //data: ['临控人员','重点人员','进京人员']
        },
        series : [
            {
                name: '车辆分类统计',
                type: 'pie',
                radius : '55%',
                center: ['50%', '60%'],
                data:data_opt1,
                itemStyle: {
                    emphasis: {
                        shadowBlur: 10,
                        shadowOffsetX: 0,
                        shadowColor: 'rgba(0, 0, 0, 0.5)'
                    }
                }
            }
        ]
    };
    // 使用刚指定的配置项和数据显示图表。
    myChart1.setOption(option1);*/


   var myChart2 = echarts.init(document.getElementById('main2'));

    /*option2 = {
        color: ['#3398DB'],
        tooltip : {
            trigger: 'axis',
            axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
            }
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '35%',
            containLabel: true
        },
        xAxis : [
            {
                type : 'category',
                data : data_opt2[0],
                axisLabel:{
                        interval:0,
                        rotate:45
                        margin:2,
                        textStyle:{
                            color:"#222"
                        },
                        formatter:function(val){
                            return val.split("").join("\n");
                        }
                    },
                axisTick: {
                    alignWithLabel: false
                }
            }
        ],
        yAxis : [
            {
                type : 'value'
            }
        ],
        dataZoom : {  
             show : true,  
             realtime : true,  
             start : 0,  
             end : 100  
            },
        series : [
            {
                name:'数量',
                type:'bar',
                barWidth: '30%',
                data:data_opt2[1]
            }
        ]
    };*/
    option2 = {
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                //type: 'cross',
                crossStyle: {
                    color: '#999'
                }
            }
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '30%',
            containLabel: true
        },
        toolbox: {
            feature: {
                //dataView: {show: true, readOnly: false},
                //magicType: {show: true, type: ['line', 'bar']},
                restore: {show: true},
                saveAsImage: {show: true}
            }
        },
        legend: {
            data:['全部','比对']
        },
        xAxis: [
            {
                type: 'category',
                //data: ['1月','2月','3月','4月','5月','6月','7月','8月','9月','10月','11月','12月'],
                data: data_opt2[0],
                axisLabel:{
                    interval:0,
                    rotate:45
                },
                axisPointer: {
                    type: 'shadow'
                }
            }
        ],
        yAxis: [
            {
                type: 'value',
                name: '数量',
                //interval: 50,
            }
        ],
        series: [
            {
                name:'全部',
                type:'bar',
                //data:[2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 135.6, 162.2, 32.6, 20.0, 6.4, 3.3]
                data:data_opt2[1],
                itemStyle:{  normal:{color:'#183f88'} } 
            },
            {
                name:'比对',
                type:'bar',
                //data:[2.6, 5.9, 9.0, 26.4, 28.7, 70.7, 175.6, 182.2, 48.7, 18.8, 6.0, 2.3]
                data:data_opt2[2],
                
                itemStyle:{  normal:{color:'#b51c1c'} } 
            }
        ]
    };


    /*var colors = ['#5793f3', '#d14a61'];

        option2 = {
            color: colors,

            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    type: 'cross'
                }
            },
            grid: {
                right: '2%',
                bottom: '35%'
            },
            toolbox: {
                feature: {
                    dataView: {show: true, readOnly: false},
                    restore: {show: true},
                    saveAsImage: {show: true}
                }
            },
            legend: {
                data:['全部','比对']
            },
            xAxis: [
                {
                    type: 'category',
                    data: data_opt2[0],
                    axisLabel:{
                        interval:0,
                        rotate:45
                    },
                    axisTick: {
                        alignWithLabel: true
                    },
                    //data: ['1月','2月','3月','4月','5月','6月','7月','8月','9月','10月','11月','12月']
                }
            ],

            yAxis: [
                {
                    type: 'value',
                    //position: 'right',
                    axisLine: {
                        lineStyle: {
                            color: colors[0]
                        }
                    }
                    /*axisLabel: {
                        formatter: '{value} ml'
                    }
                },
                {
                    //type: 'value',
                    //position: 'right',
                    offset: 80,
                    axisLine: {
                        lineStyle: {
                            color: colors[1]
                        }
                    },
                    axisLabel: {
                        formatter: '{value} ml'
                    }
                }
            ],
            series: [
                {
                    name:'全部',
                    type:'bar',
                    //data:[2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 135.6, 162.2, 32.6, 20.0, 6.4, 3.3]
                    data:data_opt2[1],
                },
                {
                    name:'比对',
                    type:'bar',
                    yAxisIndex: 1,
                    //data:[2.6, 5.9, 9.0, 26.4, 28.7, 70.7, 175.6, 182.2, 48.7, 18.8, 6.0, 2.3]
                    data:data_opt2[2],
                }
            ]
        };*/
    myChart2.setOption(option2);
        
    })
}
        

$(document).ready(function($) {
    init_clhltj();
    var options;
    $('#identifier').modal(options);
    var today = new Date();
    $('.daterangepicker8').daterangepicker({
        "singleDatePicker": true,
        "startDate": today,
        "timePickerSeconds":true,
        "endDate": today,
        "showDropdowns": false,  
        "showWeekNumbers": false,  
        "timePicker": true,  
        "timePickerIncrement": 1, 
        "timePicker12Hour": true,  
        "format": 'YYYY-MM-DD HH:mm:ss',
        
    });
    //绑定查询按钮事件
    $("#search-ry").bind('click', function () {
         var a =  timechuo($('#cl_ksrq').val(),$('#cl_jsrq').val());
        if(a ==1){
            return
        }
        init_clhltj();
    }); 
        
});


$(document).on('click','.hldw_xs',function(){
    console.log($(this).attr('tid'));
    console.log($('#cl_ksrq').val());
    console.log($('#cl_jsrq').val());

    $('#myModal').modal('show');
    $('#tableBody_modal').html('请稍等...');
    //http://localhost:9897/personcheck/info/tjUcode/{checkAddress}
    Get('/carcheck/info/tjUcode?checkAddress='+$(this).attr('tid')+'&beginTime='+$('#cl_ksrq').val()+'&endTime='+$('#cl_jsrq').val(),
        function(data){
            console.log(data);
            $('#tableBody_modal').html('');
            $.each(data, function (index, item) {
                $("#tableBody_modal").append(
                    "<tr>"+
                    "<td>"+(item.name==undefined?'':item.name)+"</td>"+
                    "<td>"+(item.count==undefined?'':item.count)+"</td>"+
                    "</tr>"
                );
            });
        }
    );
});

$(document).on('click','.hldw_xs2',function(){
    console.log($(this).attr('tid'));
    console.log($('#cl_ksrq').val());
    console.log($('#cl_jsrq').val());
    $('#myModal').modal('show');
    $('#tableBody_modal').html('请稍等...');
    //http://localhost:9897/personcheck/info/tjUcode/{checkAddress}
    Get('/carcheck/info/tjUcodeCompare?checkAddress='+$(this).attr('tid')+'&beginTime='+$('#cl_ksrq').val()+'&endTime='+$('#cl_jsrq').val(),
        function(data){
            console.log(data);
            $('#tableBody_modal').html('');
            $.each(data, function (index, item) {
                $("#tableBody_modal").append(
                    "<tr>"+
                    "<td>"+(item.name==undefined?'':item.name)+"</td>"+
                    "<td>"+(item.count==undefined?'':item.count)+"</td>"+
                    "</tr>"
                );
            });
        }
    );
});