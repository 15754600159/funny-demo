var exportTotal;
$(document).ready(function($) {
	select();
    initSelect('qqly',sblxMap);
    initSelect('cllx',cllxMap);
    initSelect('yjlx',yjlxC);
    //initCheckSource();
	var today = new Date();
	$('.daterangepicker8').daterangepicker({
	    "singleDatePicker": true,
        "startDate": today,
        "endDate": today,
        "showDropdowns": false,  
        "showWeekNumbers": false,  
        "timePicker": true,  
        "timePickerIncrement": 1, 
        "timePicker24Hour": true,  
        "format": 'YYYY-MM-DD HH:mm:ss'
	});
    $("#endTime").val(now());
    $("#startTime").val(lastweek());
    $("#search-cl").bind('click', function () {
        var a =  timechuo($('#startTime').val(),$('#endTime').val());
            if(a ==1){
                return
            }
        pagipationQuery(0,10,pagination);
         mapload(0,10);
    });
    pagipationQuery(0,10,pagination);
     $(".map").css('display', 'none');
     mapload(0,10);
});

  function select(){
    $.ajax({
        url: host+'/importantCarCategory/listCategory',
        type: 'get',
        dataType: 'json',
    })
    .done(function(data) {
        var list="<option value='' tid=''>-全部-</option>";
        for (var i = 0; i < data.length; i++) {
             list+="<option value='"+data[i].code+"' tid='"+data[i].name+"'>"+data[i].name+"</option>";
           
        }
         $("#clbq").html(list);
    })
    .fail(function() {
        console.log("error");
    })
    .always(function() {
        console.log("complete");
    });
    
} 
  

/**
 * 分页控件
 * @param total
 */
function pagination(data) {
    BootstrapPagination(
        $("#pagination"), {
        layoutScheme: "lefttext,pagesizelist,firstpage,prevgrouppage,prevpage,pagenumber,nextpage,nextgrouppage,lastpage,pageinput,righttext",
        //记录总数。
        total: data.msg.totalElements,
        //分页尺寸。指示每页最多显示的记录数量。
        pageSize: data.msg.pageSize,
        //当前页索引编号。从其开始（从0开始）的整数。
        pageIndex: data.msg.number,
        //指示分页导航栏中最多显示的页索引数量。
        pageGroupSize: 10,
        //位于导航条左侧的输出信息格式化字符串
        leftFormateString: "本页{count}条记录/共{total}条记录",
        //位于导航条右侧的输出信息格式化字符串
        rightFormateString: "第{pageNumber}页/共{totalPages}页",
        //页码文本格式化字符串。
        pageNumberFormateString: "{pageNumber}",
        //分页尺寸输出格式化字符串
        pageSizeListFormateString: "每页显示{pageSize}条记录",
        //上一页导航按钮文本。
        prevPageText: "上一页",
        //下一页导航按钮文本。
        nextPageText: "下一页",
        //上一组分页导航按钮文本。
        prevGroupPageText: "上一组",
        //下一组分页导航按钮文本。
        nextGroupPageText: "下一组",
        //首页导航按钮文本。
        firstPageText: "首页",
        //尾页导航按钮文本。
        lastPageText: "尾页",
        //设置页码输入框中显示的提示文本。
        pageInputPlaceholder: "GO",
        //接受用户输入内容的延迟时间。单位：毫秒
        pageInputTimeout: 800,
        //分页尺寸列表。
        pageSizeList: [5, 10, 20],
        //当分页更改后引发此事件。
        pageChanged: function (pageIndex, pageSize) {
            pagipationQuery(pageIndex,pageSize,pagination);
            mapload(pageIndex,pageSize)
        },
    });
}

/*导出*/
$(document).on('click','#export-cl',function(){
     $.confirm({
            title: '提示',
            content: '列表数据为实时动态变化数据，导出过程中不影响数据实时更新，但最新数据会有导出延迟',
            buttons: {
                确定: function () {
                    if(exportTotal>10000){
                        $.confirm({
                            title: '提示',
                            content: '导出数据量较大，页面导出仅支持最多10000条数据的导出，如果要全部导出，请联系系统管理员',
                            buttons: {
                                确定: function () {
                                    var keng='';
                                    if($('#clbq').find("option:selected").attr('tid')){
                                        keng = $('#clbq').find("option:selected").attr('tid');
                                    }
                                    window.location.href=host+'/carcheck/info/exportPlateCheckLog?personif='+$('#yj').val()+
                                                                                        '&plateNo='+$('#cph').val()+
                                                                                        '&source='+$('#qqly').val()+ 
                                                                                        '&startTime='+ $('#startTime').val()+
                                                                                        '&endTime='+ $('#endTime').val()+
                                                                                        '&checkaddress='+$('#checkAddress').val()+
                                                                                        '&plateType='+$('#cllx').val()+
                                                                                        '&tags='+keng+
                                                                                        '&ucode='+getUcode()+
                                                                                        '&tags2='+$('#yjlx').val()+
                                                                                        '&policename='+$('#jyxm').val()+
                                                                                        '&name='+$('#xm').val()+
                                                                                        '&sfzh='+$('#sfzh').val()+
                                                                                        '&policeno='+$('#jyjh').val();
                                },
                                取消: function () {
                                   
                                },
                            }
                        })
                    }else{
                        var keng='';
                        if($('#clbq').find("option:selected").attr('tid')){
                            keng = $('#clbq').find("option:selected").attr('tid');
                        }
                        window.location.href=host+'/carcheck/info/exportPlateCheckLog?personif='+$('#yj').val()+
                                                                            '&plateNo='+$('#cph').val()+
                                                                            '&source='+$('#qqly').val()+ 
                                                                            '&startTime='+ $('#startTime').val()+
                                                                            '&endTime='+ $('#endTime').val()+
                                                                            '&checkaddress='+$('#checkAddress').val()+
                                                                            '&plateType='+$('#cllx').val()+
                                                                            '&tags='+keng+
                                                                            '&ucode='+getUcode()+
                                                                            '&tags2='+$('#yjlx').val()+
                                                                            '&policename='+$('#jyxm').val()+
                                                                            '&name='+$('#xm').val()+
                                                                            '&sfzh='+$('#sfzh').val()+
                                                                            '&policeno='+$('#jyjh').val();
                    }
                    
                },
                取消: function () {
                   
                },
            }
        })
});
/**
 * 分页器查询
 * @param pageIndex 当前页数
 * @param pageSize 每页显示条数
 */
function pagipationQuery(pageIndex,pageSize, pagination){
    var huji = shirt();
    var keng='';
    if($('#clbq').find("option:selected").attr('tid')){
        keng = $('#clbq').find("option:selected").attr('tid');
    }
    $("#loading").css('display', 'block');
    $.ajax({
    	url: host+'/carcheck/info/findplatechecklog',
    	type: 'GET',
    	dataType: 'json',
    	//data: {'startTime': '2017-07-21 17:00:00','endTime': '2017-07-21 17:00:02', 'page': pageIndex, 'pageSize': pageSize},
    	data: {
            'personif':$('#yj').val(),
            'plateNo':$('#cph').val(),
            'name':$('#xm').val(),
            'birthplace':huji,
            'sfzh': $('#sfzh').val(),
            'source':$('#qqly').val(), 
            'startTime': $('#startTime').val(),
            'endTime': $('#endTime').val(), 
            'checkaddress':$('#checkAddress').val(),
            'plateType':$('#cllx').val(),
            'tags':keng,
            'ucode':getUcode(),
            'tags2':$('#yjlx').val(),
            'policename':$('#jyxm').val(),
            'policeno':$('#jyjh').val(),
            'page': pageIndex, 
            'pageSize': pageSize
        },
    	success: function (data) {
	        $("#tableBody").empty();
	        count=data.msg.totalElements;
	        if(data.msg.content && data.msg.content.length > 0 ) {
                exportTotal = data.msg.totalElements;
	            $.each(data.msg.content, function (index, item) {
                    var waring = "";
                    if(item.personif === '01'){
                        waring ="<img src='../images/waring.png'/ style='width:26px;height:auto'>"
                    }
                    var ly='';
                    if(item.pushTarget){
                        if(item.pushTarget.indexOf(',')>-1){
                            $.each(item.pushTarget.split(','),function(index, el) {
                                ly += dataJx(el,ssbdly)+',';
                            });
                            ly=ly.substring(0,ly.length-1);
                        }else{
                            ly = dataJx(item.pushTarget,ssbdly);
                        }
                    }else{
                        ly = '';
                    }

                    if(item.tags.indexOf("无背景")>-1||item.tags.indexOf("无资料")>-1||item.tags==''){
                        tag = "<span class='btn btn-success'  cont='"+item.tagsContent+"'>无背景</span>"; 
                    }else if(item.tags&&item.tags!=''){
                        tag = "<span class='btn btn-danger'  cont='"+item.tagsContent+"'>"+(dataJx(item.tags,clbqMap,''))+"</span>"; 
                    }else{
                        tag = ''; 
                    }
	               $("#tableBody").append(
	                    "<tr class='line_h' tid='"+(item.id==undefined?'':item.id)+"'>"+
                        "<td>"+waring+"</td>"+
	                    "<td class='aa' title='"+(item.plateNo==undefined?'':item.plateNo)+"'>"+(item.plateNo==undefined?'':item.plateNo)+"</td>"+
                        "<td class='aa' title='"+(dataJx(item.plateType,cllxMap))+"'>"+(dataJx(item.plateType,cllxMap))+"</td>"+
                        "<td class='aa' title='"+(item.name==undefined?'':item.name)+"'>"+(item.name==undefined?'':item.name)+"</td>"+
                        "<td class='aa' title='"+(item.sfzh==undefined?'':item.sfzh)+"'>"+(item.sfzh==undefined?'':item.sfzh)+"</td>"+
                        "<td class='aa' title='"+(item.birthplace==undefined?'':item.birthplace)+"'>"+(item.birthplace==undefined?'':item.birthplace)+"</td>"+
                        "<td class='aa' title='"+ly+"'>"+ly+"</td>"+
	                    "<td class='aa' title='"+(item.createTime==undefined?'':item.createTime)+"'>"+(item.createTime==undefined?'':item.createTime)+"</td>"+
                        "<td class='aa' title='"+(item.checkaddress=='null'?'':item.checkaddress)+"'>"+(item.checkaddress=='null'?'':item.checkaddress)+"</td>"+
                        "<td class='aa' title='"+(dataJx(item.checkdept,dwdm))+"'>"+(dataJx(item.checkdept,dwdm))+"</td>"+
                        "<td class='aa' title='"+(dataJx(item.source,sblxMap))+"'>"+(dataJx(item.source,sblxMap))+"</td>"+
                        "<td class='aa' title='"+(item.policename==undefined?'':item.policename)+"'>"+(item.policename==undefined?'':item.policename)+"</td>"+
                        "<td class='aa' title='"+(item.policeno==undefined?'':item.policeno)+"'>"+(item.policeno==undefined?'':item.policeno)+"</td>"+
                        "<td class='aa' title='"+item.policephone+"'>"+item.policephone+"</td>"+
	                    "<td class='aa' title='"+(item.czyq==undefined?'':item.czyq)+"'>"+(item.czyq==undefined?'':item.czyq)+"</td>"+
                        "<td class='clTag aa' title='"+(dataJx(item.tags,clbqMap,''))+"'>"+tag+"</td>"+ 
	                    "<td class='aa lineh'  tid='"+(item.plateNo==undefined?'':item.plateNo)+"'><img title='查看' class='cz see' data='"+JSON.stringify(item)+"' src='../img/ck.png'>&nbsp<img title='地图' id='"+item.id+"'  class='cz fuck lineh' src='../img/dt.png'></td>"+
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
	        pagination && pagination(data);
	        
	    }
    });
}

function getUcode(){
	var ucode="";
	ucode = $('#citySel').val();
	if(ucode!=""){
		if($("#ucodeName").val()==ucode){
			ucode = $('#citySel').attr('code');
		}else{
			ucode = $('#citySel').val();
		}
	}
	return ucode;
}
/*标签详情*/
$(document).on('click','.clTag span',function(){
    $('#myModal').modal('show');
    var data ='';
    //data = JSON.parse(JSON.parse($(this).attr('cont')));
    var tag = $(this).html();
    $('.modal-body').html('');
    if(tag.indexOf("无背景")==-1){
    	var dataStr =$(this).attr('cont');
        console.log(dataStr);

    	if(isJSON(dataStr)){
    		data = JSON.parse(dataStr);
		    if(!data){
		        $('.modal-body').html('无内容');
		    }else{
		        var tag = data.tag+'-'+data.source+'-'+data.info;
		        //$('#myModalLabel').html(tag);
		        $.each(data,function(ind, el) {
                    var tag = el.tag+'-'+el.source+'-'+el.info;
                    //$('#myModalLabel').html(tag);
                    $('.modal-body').append('<span>'+tag+'</span><br>');  
                    $.each(el.fields, function(index, item) {
                        if(index=='重点人员类别标记'){
                            var a = item.split(',')[1].substring(0, 4);
                            item = dataJx(a,zdrylbbj);
                            
                        }else if(index=='重点人员细类'){
                            item = (dataJx(item,zdryxlMap));
                        }
                        
                        $('.modal-body').append('<span>'+index+'：</span><span>'+(item=="null"?'':item)+'</span><br>');  
                    });
                    $('.modal-body').append('<span style="color:#3b72d2;">———————————————————————————</span>');
                    $('.modal-body').append('<br>');
                });
		    }
    	}else{
    		$('.modal-body').html($(this).attr('cont'));
    	}	
    }else{
    	  $('.modal-body').html('无背景');
    }
});

function isJSON(str) {
	try {
		JSON.parse(str);
    } catch (e) {
        return false;
    }
    return true;
}
$(document).on('click','.see',function(){
    var data = JSON.parse($(this).attr('data'));
    console.log(data);
     if(data.tags.indexOf("无背景")>-1||data.tags.indexOf("无资料")>-1||data.tags==''){
                        tag = "<span class='btn btn-success'  cont='"+data.tagsContent+"'>无背景</span>"; 
                    }else if(data.tags&&data.tags!=''){
                        tag = "<span class='btn btn-danger'  cont='"+data.tagsContent+"'>"+(dataJx(data.tags,clbqMap,''))+"</span>"; 
                    }else{
                        tag = ''; 
                    }
    $('#myModal_see').modal('show');
    $('#tableBody_modal_see').html('');
    console.info(data.cardno);
        $('#tableBody_modal_see').append(
        '<tr><td>车牌号</td><td><span>'+data.plateNo+'</span></td></tr>'+
        '<tr><td>车辆类型</td><td><span>'+data.plateType+'</span></td></tr>'+
        '<tr><td>机动车所有人</td><td><span>'+data.name+'</span></td></tr>'+
        '<tr><td>身份证号</td><td><span>'+data.sfzh+'</span></td></tr>'+
        '<tr><td>户籍地</td><td><span>'+(data.birthplace==null?'':data.birthplace)+'</span></td></tr>'+
        '<tr><td>核录时间</td><td><span>'+data.createTime+'</span></td></tr>'+
        '<tr><td>核查地点</td><td><span>'+data.checkaddress+'</span></td></tr>'+
        '<tr><td>核录单位</td><td><span>'+data.checkdept+'</span></td></tr>'+
        '<tr><td>推送目标</td><td><span>'+data.pushTarget+'</span></td></tr>'+
        '<tr><td>列管单位</td><td><span>'+(data.lgdw==null?'':data.lgdw)+'</span></td></tr>'+
        '<tr><td>警员姓名</td><td><span>'+data.name+'</span></td></tr>'+
        '<tr><td>警员警号</td><td><span>'+data.policeno+'</span></td></tr>'+
        '<tr><td>警员手机号</td><td><span>'+data.policephone+'</span></td></tr>'+
        '<tr><td>车辆标签</td><td><span>'+tag+'</span></td></tr>'


        )

});


/*这里地图开始*/

function mapload(pageIndex,pageSize){   
                   var huji = shirt();
                   var keng='';
                   if($('#clbq').find("option:selected").attr('tid')){
                       keng = $('#clbq').find("option:selected").attr('tid');
                   }
                 $.ajax({
                    url:host+'/carcheck/info/findplatechecklog',
                    type: 'GET',
                    dataType: 'json',
                    data: { 
                       'personif':$('#yj').val(),
                       'plateNo':$('#cph').val(),
                       'name':$('#xm').val(),
                       'birthplace':huji,
                       'sfzh': $('#sfzh').val(),
                       'source':$('#qqly').val(), 
                       'startTime': $('#startTime').val(),
                       'endTime': $('#endTime').val(), 
                       'checkaddress':$('#checkAddress').val(),
                       'plateType':$('#cllx').val(),
                       'tags':keng,
                       'ucode':getUcode(),
                       'tags2':$('#yjlx').val(),
                       'policename':$('#jyxm').val(),
                       'policeno':$('#jyjh').val(),
                       'page': pageIndex, 
                       'pageSize': pageSize
                    },
                 })

                 .done(function(data) {
                    console.log(data.msg); 
                    var data = data.msg.content;
                     map.clear();
                     $("#loading").css('display', 'none');
                    //[0].location;
                    for (var i = 0; i < data.length; i++) {
                        if(data[i].location){
                            if(data[i].location.indexOf(',')>0){
                                if(Number(data[i].personif)==1){
                                var jd = data[i].location.split(",")[0];
                                var wd = data[i].location.split(",")[1];
                                var position = new EzCoord(jd,wd);
                                var icon3 = new EzIcon({
                                src: '../images/redmarker.png',
                                });
                                var marker = new EzMarker(position,icon3);
                                map.addOverlay(marker);
                                }else{
                                var jd = data[i].location.split(",")[0];
                                var wd = data[i].location.split(",")[1];
                                var position = new EzCoord(jd,wd);

                                var marker = new EzMarker(position);
                                map.addOverlay(marker);
                                }
                            }

                        }
                        
                                           
                    };
                    markerclick(data)
                 })
                 .fail(function() {
                    console.log("error");
                 })
                 .always(function() {
                    console.log("complete");
                 });

            map.addMapEventListener(Ez.Event.MAP_MOUSEMOVE,function(evt){
            var pixel = evt.pixel;
            var marker = map.forEachFeatureAtPixel(pixel,function(feature,layer){
                if (feature instanceof EzMarker) {
                    return feature;
                }
            });
            if (marker) {
                this.getViewport().style.cursor = 'pointer';
            } else {
                this.getViewport().style.cursor = '';
            }
        },map);
            var markerclick = function(data){
            map.addMapEventListener(Ez.Event.MAP_CLICK,function(evt){

               var pixel = evt.pixel;
               var coord = evt.coordinate;
               
               var marker = map.forEachFeatureAtPixel(pixel,function(feature,layer){
                   if (feature instanceof EzMarker) {
                       return feature;
                   }
               });

               if (marker) {
                
                  if (data) {
                    console.info(data)
                    $(".ol-overlaycontainer").html("")
                    for (var i = 0; i < data.length; i++) {
                        var arry = new Array;
                        if(data[i].location||data[i].location.indexOf(',')){
                            arry = [Number(data[i].location.split(",")[0]).toFixed(6),Number(data[i].location.split(",")[1]).toFixed(6)];
                            var oldstring = arry.toString();
                            var arryold = new Array;
                            arryold = [Number(marker.getPoint().coordinate_[0]).toFixed(6),Number(marker.getPoint().coordinate_[1]).toFixed(6)];
                            var newstring = arryold.toString();
                            if(newstring === oldstring){
                                console.info(data[i]);
                                var strHTML1 = '<p>核录地点:</br>'+data[i].checkdept+'</p><p>机动车所有人:</br>'+data[i].name+'</p><p>身份证号:</br>'+data[i].sfzh+'<p>车牌号:</br>'+data[i].plateNo+'<p>'+'<p>警员姓名:</br>'+data[i].policename+'<p>'+'<p>警员手机号:</br>'+data[i].policephone+'<p>';
                                marker.openInfoWindow(strHTML1)
                            }
                        
                        }
                       
                    }
                  }
               }
            },map);  
            } 
}


$(document).on('click', '#daomap', function(event) {
 
 gomap("reload");


   
});
$(document).on('click', '.fuck', function(event) {
    console.info(this);
    var no = $(this).attr('id');
    gomap(no);
    /* Act on the event */
});
function gomap(data){
     if(data =="reload"){
      var text = $("#daomap").html();
      var startTime,endTime
      if (text=="到地图") {
        $(".tableall").addClass('animated bounceOutLeft');
        $("#daomap").html("到表格")
        setTimeout(function(){
        $(".tableall").css('display',"none");
        $(".map").css('display', 'block');
        $(".tableall").removeClass('bounceOutLeft');
        $(".map").addClass('animated bounceInRight');
        },500);
        setTimeout(function(){
         $(".map").removeClass('bounceInRight');
        },1500);
    }else{
        $("#daomap").html("到地图");
        $(".map").addClass('bounceOutLeft');
        $(".map").css('display', 'none');
        setTimeout(function(){
        $(".map").removeClass('bounceOutLeft');
        $(".tableall").css('display', 'block');
         $(".tableall").addClass('bounceInRight');
        },500)
    };
   

     }else{
     var text = $("#daomap").html();
      var startTime,endTime
      if (text=="到地图") {
        $(".tableall").addClass('animated bounceOutLeft');
        $("#daomap").html("到表格")
        setTimeout(function(){
        $(".tableall").css('display',"none");
        $(".map").css('display', 'block');
        $(".tableall").removeClass('bounceOutLeft');
        $(".map").addClass('animated bounceInRight');
        },500);
        setTimeout(function(){
         $(".map").removeClass('bounceInRight');
        },1500);
    }else{
        $("#daomap").html("到地图");
        $(".map").addClass('bounceOutLeft');
        $(".map").css('display', 'none');
        setTimeout(function(){
        $(".map").removeClass('bounceOutLeft');
        $(".tableall").css('display', 'block');
         $(".tableall").addClass('bounceInRight');
        },500)

    };
    console.info(data)

     pointpop(data);
     }

     

}
function pointpop(data){
        var data =data;
        console.info(data)
         map.clear();
             var hosturl = "http://10.101.139.22:9897";
             $("#loading").css('display', 'block');

             $.ajax({
                url: hosturl+"/carcheck/info/findById/"+data,
                type: 'get',
                dataType: 'json',
             })

             .done(function(data) {
                console.log(data); 
                var data = data;
                 $("#loading").css('display', 'none');
                //[0].checkLocation;
                    if(data.location||data.location.indexOf(',')){
                        var jd = data.location.split(",")[0];
                        var wd = data.location.split(",")[1];
                        var position = new EzCoord(jd,wd);

                        var marker = new EzMarker(position);
                        map.addOverlay(marker);
                     

                    }
                markerclick(data)
             })
             .fail(function() {
                console.log("error");
             })
             .always(function() {
                console.log("complete");
             });

        map.addMapEventListener(Ez.Event.MAP_MOUSEMOVE,function(evt){
        var pixel = evt.pixel;
        var marker = map.forEachFeatureAtPixel(pixel,function(feature,layer){
            if (feature instanceof EzMarker) {
                return feature;
            }
        });
        if (marker) {
            this.getViewport().style.cursor = 'pointer';
        } else {
            this.getViewport().style.cursor = '';
        }
    },map);
        var markerclick = function(data){
        map.addMapEventListener(Ez.Event.MAP_CLICK,function(evt){

           var pixel = evt.pixel;
           var coord = evt.coordinate;
           
           var marker = map.forEachFeatureAtPixel(pixel,function(feature,layer){
               if (feature instanceof EzMarker) {
                   return feature;
               }
           });

           if (marker) {
            
              if (data) {
                console.info(data)
                $(".ol-overlaycontainer").html("")

                    var arry = new Array;
                    if(data.location){
                         arry = [Number(data.location.split(",")[0]).toFixed(6),Number(data.location.split(",")[1]).toFixed(6)];
                    var oldstring = arry.toString();
                    var arryold = new Array;
                    arryold = [Number(marker.getPoint().coordinate_[0]).toFixed(6),Number(marker.getPoint().coordinate_[1]).toFixed(6)];
                    var newstring = arryold.toString();
                    if(newstring === oldstring){
                        console.info(data);
                        var strHTML1 = '<p>核录地点:</br>'+data.checkdept+'</p><p>机动车所有人:</br>'+data.name+'</p><p>身份证号:</br>'+data.sfzh+'<p>车牌号:</br>'+data.plateNo+'<p>'+'<p>警员姓名:</br>'+data.policename+'<p>'+'<p>警员手机号:</br>'+data.policephone+'<p>';
                        marker.openInfoWindow(strHTML1)
                    }
                    }

              }
           }
        },map);  
        } 
}
/*这里地图结束*/