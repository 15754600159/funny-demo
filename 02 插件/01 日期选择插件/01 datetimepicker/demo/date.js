/**
 * 1.本地示例: bootstrap-datetimepicker-master/sample in bootstrap v3
 * 2.demo: http://www.bootcss.com/p/bootstrap-datetimepicker/demo.htm
 * 3.API: http://www.bootcss.com/p/bootstrap-datetimepicker/
 */

$(function(){
    $(".form_datetime").datetimepicker({
        format: 'yyyy-mm-dd hh:ii',
        autoclose: true, //选完时间 则关闭
        todayBtn: true,//增加选择现在时间的按钮
        pickerPosition: "bottom-left",//打开位置
        startDate: "2013-02-14 10:00",//可选最早时间
        endDate: "2013-02-16 10:00",//可选最晚时间
        initialDate: "2013-02-15 10:00",//-------------------初始时间貌似不好用
    });
})