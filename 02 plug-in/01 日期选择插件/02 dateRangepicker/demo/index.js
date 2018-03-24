/**
 * 1.本地示例: bootstrap-daterangepicker-master / demo.html
 * 2.入门: http://blog.csdn.net/zdx1515888659/article/details/41675555
 * 3.API: http://www.daterangepicker.com/
 */
$(function(){

    $('#daterangepicker').daterangepicker({
        // format: 'YYYY-MM-DD', //不知为何不起作用
        startDate: "09/22/2017",
        // endDate: "09/28/2017",
        // minDate: '01/01/2017',    //最小时间  
        // maxDate : moment().format('YYYY-MM-DD'),//最大时间
        dateLimit : {  
            days : 30  
        }, //起止时间的最大间隔  
        showDropdowns : true, //弹窗中是否显示年月选择的下拉框
        showWeekNumbers : true, //是否显示第几周 
        timePicker : true, //是否显示小时和分钟  
        timePickerIncrement : 60, //时间的增量，单位为分钟  
        timePicker12Hour : true, //是否使用12小时制来显示时间 
        ranges : {  //快捷选择时间范围
            //'最近1小时': [moment().subtract('hours',1), moment()],  
            '今日': [moment().startOf('day'), moment()],  
            '昨日': [moment().subtract('days', 1).startOf('day'), moment().subtract('days', 1).endOf('day')],  
            '最近7日': [moment().subtract('days', 6), moment()],  
            '最近30日': [moment().subtract('days', 29), moment()]  
        },  
        opens : 'right', //日期选择框的弹出位置  [left,right,center]
        buttonClasses : [ 'btn btn-default' ],  //按钮类型
        applyClass : 'btn-small btn-primary blue',  //按钮类型
        cancelClass : 'btn-small',  //按钮类型
        locale: {   //国际化
            applyLabel : '确定',  
            cancelLabel : '取消',  
            fromLabel : '起始时间',  
            toLabel : '结束时间',  
            customRangeLabel : '自定义',  
            daysOfWeek : [ '日', '一', '二', '三', '四', '五', '六' ],  
            monthNames : [ '一月', '二月', '三月', '四月', '五月', '六月',  
                    '七月', '八月', '九月', '十月', '十一月', '十二月' ],  
            firstDay : 1  
        },
    }, function(start, end, label) { //label是自定义和ranges里面的值
      console.log("New date range selected: " + start.format('YYYY-MM-DD') + " to " + end.format('YYYY-MM-DD') + " (predefined range: " + label + ")");
    });

})