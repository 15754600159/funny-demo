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
    $("#jsrq").val(noww);
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
    $("#ksrq").val(sec);
 
 /*定义下载方法*/
 $(document).on("click", "#export-ry", function() {
      var a =  timechuo($('#ksrq').val(),$('#jsrq').val());
        if(a ==1){
            return
        }
 	console.log(host+'/personcheck/info/exportInfofind?beginTime='+$('#ksrq').val()+'&endTime='+$('#jsrq').val());
     if($("#domicile-query").prop('checked')){
     	// 户籍区域统计
    	 window.location.href=host+'/personcheck/info/exportDomicileCount?beginTime='+$('#ksrq').val()+'&endTime='+$('#jsrq').val();
     }else{
     	// 核录单位统计
    	 window.location.href=host+'/personcheck/info/exportInfofind?beginTime='+$('#ksrq').val()+'&endTime='+$('#jsrq').val();
     }
 });
     
function init_ryhltj(){
    $("#loading").css('display', 'block');
    Post("/personcheck/info/infofind",$.param({
        beginTime: $('#ksrq').val(),
        endTime: $('#jsrq').val()
        /*ucode: $('#hldw').val(),
        policeName:$('#hlr').val()*/
    }), function (data) {
    	$(".thead-name").html("核查区域");
    	$(".modal-thead-name").html("核查单位");
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
            $.each(data[1], function (index, item) {
                /*var a = item.countPt;
                if(a.indexOf(',')>-1){
                    console.log('1111')
                }*/
                if(item.personneltype){
                    var a = item.personneltype.substr(0,12);   
                }else{
                    var a = null;
                }
                
                data_opt1.push({value:item.countPt,name:zdryxlMap[a]});
            })
        };
        data_opt2 = [];
        data_opt2.push(x);
        data_opt2.push(y1);
        data_opt2.push(y2);

        initChart(data_opt2);
    })
}

function initChart(data_opt2){
	var myChart2 = echarts.init(document.getElementById('main2'));
    option2 = {
	    tooltip: {
	        trigger: 'axis',
	        axisPointer: {
	            //type: 'cross',
	            crossStyle: {
	                //color: '#999'
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
	        data:['全部','比中']
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
	            name:'比中',
	            type:'bar',
	            //data:[2.6, 5.9, 9.0, 26.4, 28.7, 70.7, 175.6, 182.2, 48.7, 18.8, 6.0, 2.3]
	            data:data_opt2[2],
	            itemStyle:{  normal:{color:'#b51c1c'} } 
	        }
	    ]
	};
    myChart2.setOption(option2);
}

function domicileCount(){
	Get('/personcheck/info/domicileCount?beginTime='+$('#ksrq').val()+'&endTime='+$('#jsrq').val(),
	        function(data){
				var x = [];
				var y1 = [];
		        var y2 = [];
				$(".thead-name").html("户籍地区")
				$(".modal-thead-name").html("户籍地区");
				$("#tableBody1").empty();
		        $("#tableBody2").empty();
		        if(data && data.length > 0 ) {
		            $.each(data, function (index, item) {
		                if(index!=data.length-1){
		                	 if(item.codeName){
				            		x.push(item.codeName);
				            	}
		                	 y1.push(item.countQp);
				             y2.push(item.countQpCompare);
		                }
		                if((index+1)%2==1){
		                    $("#tableBody1").append(
		                        "<tr>"+
		                        "<td>"+(item.codeName)+"</td>"+
		                        "<td><a tid='"+item.queryPlace+"' class='hldw_domicile'>"+(item.countQp==undefined?'':item.countQp)+"</a></td>"+
		                        "<td><a tid='"+item.queryPlace+"' class='hldw_domicile_compare'>"+(item.countQpCompare==undefined?'':item.countQpCompare)+"</a></td>"+
		                        "</tr>"
		                    );
		                }else{
		                    $("#tableBody2").append(
		                        "<tr>"+
		                       "<td>"+(item.codeName)+"</td>"+
		                        "<td><a tid='"+item.queryPlace+"' class='hldw_domicile'>"+(item.countQp==undefined?'':item.countQp)+"</a></td>"+
		                        "<td><a tid='"+item.queryPlace+"' class='hldw_domicile_compare'>"+(item.countQpCompare==undefined?'':item.countQpCompare)+"</a></td>"+                       
		                        "</tr>"
		                    );
		                }
		            });
		        }
		        data_opt2 = [];
		        data_opt2.push(x);
		        data_opt2.push(y1);
		        data_opt2.push(y2);
		        
		        initChart(data_opt2);
	        }
	    );
}


$(document).ready(function($) {
    init_ryhltj();
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
        var a =  timechuo($('#ksrq').val(),$('#jsrq').val());
        if(a ==1){
            return
        }
        console.log($("#domicile-query").prop('checked'));
        if($("#domicile-query").prop('checked')){
        	// 户籍区域统计
        	domicileCount();
        }else{
        	// 核录单位统计
        	init_ryhltj();
        }
    }); 
    
  //绑定查询按钮事件
    $("#domicile-query").bind('change', function () {
    	 var a =  timechuo($('#ksrq').val(),$('#jsrq').val());
         if(a ==1){
             return
         }
         console.log($("#domicile-query").prop('checked'));
         if($("#domicile-query").prop('checked')){
         	// 户籍区域统计
         	domicileCount();
         }else{
         	// 核录单位统计
         	init_ryhltj();
         }
    }); 
});

$(document).on('click','.hldw_xs',function(){
    console.log($(this).attr('tid'));
    $('#myModal').modal('show');
    $('#tableBody_modal').html('请稍等...');
    $(".modal-thead-type-name").html("核查数量");
    Get('/personcheck/info/tjUcode?checkAddress='+$(this).attr('tid')+'&beginTime='+$('#ksrq').val()+'&endTime='+$('#jsrq').val(),
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
    $('#myModal').modal('show');
    $('#tableBody_modal').html('请稍等...');
    $(".modal-thead-type-name").html("比中数量");
    Get('/personcheck/info/tjUcodeCompare?checkAddress='+$(this).attr('tid')+'&beginTime='+$('#ksrq').val()+'&endTime='+$('#jsrq').val(),
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

$(document).on('click','.hldw_domicile',function(){
    console.log($(this).attr('tid'));
    $('#myModalCity').modal('hide');
    $('#myModal').modal('show');
    $(".modal-thead-type-name").html("核查数量");
    $('#tableBody_modal').html('请稍等...');
    var total = "";
    if($(this).attr('tid') == "total"){
    	total = "total";
    }
    Get('/personcheck/info/domicileCountByProvince?code='+$(this).attr('tid')+'&beginTime='+$('#ksrq').val()+'&endTime='+$('#jsrq').val(),
        function(data){
            console.log(data);
            $('#tableBody_modal').html('');
            $.each(data, function (index, item) {
            	if(item.queryPlace != "00"){
            		 $("#tableBody_modal").append(
                         "<tr>"+
                         "<td>"+(item.codeName==undefined?'':item.codeName)+"</td>"+
                         "<td><a tid='"+item.queryPlace+"' total='"+total+"'  class='hldw_domicile_city'>"+(item.countQp==undefined?'':item.countQp)+"</a></td>"+
                         "</tr>"
                     );
            	}else{
            		$("#tableBody_modal").append(
                        "<tr>"+
                        "<td>"+(item.codeName==undefined?'':item.codeName)+"</td>"+
                        "<td>"+(item.countQp==undefined?'':item.countQp)+"</td>"+
                        "</tr>"
                    );
            	}
               
            });
        }
    );
});


$(document).on('click','.hldw_domicile_compare',function(){
    console.log($(this).attr('tid'));
    $('#myModalCity').modal('hide');
    $('#myModal').modal('show');
    $(".modal-thead-type-name").html("比中数量");
    $('#tableBody_modal').html('请稍等...');
    var total = "";
    // 从全部点击 传参给查看市明细 返回全部或者 对应省
    if($(this).attr('tid') == "total"){
    	total = "total";
    }
    Get('/personcheck/info/domicileCountByProvince?code='+$(this).attr('tid')+'&beginTime='+$('#ksrq').val()+'&endTime='+$('#jsrq').val(),
        function(data){
            console.log(data);
            $('#tableBody_modal').html('');
            $.each(data, function (index, item) {
            	if(item.countQpCompare&&item.countQpCompare > 0){
            		if(item.queryPlace != "00"){
	            		$("#tableBody_modal").append(
	                         "<tr>"+
	                         "<td>"+(item.codeName==undefined?'':item.codeName)+"</td>"+
	                         "<td><a tid='"+item.queryPlace+"' total='"+total+"' class='hldw_domicile_city_compare'>"+(item.countQpCompare==undefined?'':item.countQpCompare)+"</a></td>"+
	                         "</tr>"
	                     );
            		}else{
            			$("#tableBody_modal").append(
                            "<tr>"+
                            "<td>"+(item.codeName==undefined?'':item.codeName)+"</td>"+
                            "<td>"+(item.countQpCompare==undefined?'':item.countQpCompare)+"</td>"+
                            "</tr>"
                        );
            		}
            	}
            });
        }
    );
});



$(document).on('click','.hldw_domicile_city',function(){
    console.log($(this).attr('tid'));
    var tid = $(this).attr('tid');
    if($(this).attr('total')){
    	tid = $(this).attr('total');
    }
    $('#myModal').modal('hide');
    $('#myModalCity').modal('show');
    $('#tableBody_modal_city').html('请稍等...');
    Get('/personcheck/info/domicileCountByCity?code='+$(this).attr('tid')+'&beginTime='+$('#ksrq').val()+'&endTime='+$('#jsrq').val(),
        function(data){
            console.log(data);
            $('#tableBody_modal_city').html('');
            $.each(data, function (index, item) {
                $("#tableBody_modal_city").append(
                    "<tr>"+
                    "<td>"+(item.codeName==undefined?'':item.codeName)+"</td>"+
                    "<td>"+(item.countQp==undefined?'':item.countQp)+"</td>"+
                    "</tr>"
                );
            });
        }
    );
    $('#modal-footer').html('<button id="back" class="btn btn-default hldw_domicile" style="position: relative;" tid="'+tid+'">返回</button>');
});


$(document).on('click','.hldw_domicile_city_compare',function(){
    console.log($(this).attr('tid'));
    var tid = $(this).attr('tid');
    if($(this).attr('total')){
    	tid = $(this).attr('total');
    }
    $('#myModal').modal('hide');
    $('#myModalCity').modal('show');
    $('#tableBody_modal_city').html('请稍等...');
    Get('/personcheck/info/domicileCountByCity?code='+$(this).attr('tid')+'&beginTime='+$('#ksrq').val()+'&endTime='+$('#jsrq').val(),
        function(data){
            console.log(data);
            $('#tableBody_modal_city').html('');
            $.each(data, function (index, item) {
            	if(item.countQpCompare&&item.countQpCompare > 0){
            		$("#tableBody_modal_city").append(
                         "<tr>"+
                         "<td>"+(item.codeName==undefined?'':item.codeName)+"</td>"+
                         "<td>"+(item.countQpCompare==undefined?'':item.countQpCompare)+"</td>"+
                         "</tr>"
                     );
            	}
            });
        }
    );
    $('#modal-footer').html('<button id="back" class="btn btn-default hldw_domicile_compare" style="position: relative;" tid="'+tid+'">返回</button>');
});