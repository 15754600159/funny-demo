$(document).ready(function($) {
    initSelect('hcdd',hsXzqhMap);
    initSelect('yjlx',yjlxC);
    select();
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
      //这里是定义了时间问题，默认取最近的一周时间
     
    $("#cl_endTime").val(now());
     
     $("#cl_startTime").val(lastweek())
	//绑定查询按钮事件
    $("#search-ry").bind('click', function () {
       var a =  timechuo($('#cl_startTime').val(),$('#cl_endTime').val());
        if(a ==1){
            return
        }
        pagipationQuery(1,10,pagination);
         mapload()
    });
	pagipationQuery(1,10,pagination);
    mapload();
     $(".map").css('display', 'none');



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
  function change(a){
    console.info(a);
    if(a){
       $.ajax({
              url: host+'/importantCarCategory/listCategoryByCode?code='+a,
              type: 'get',
              dataType: 'json',
          })
          .done(function(data) {
              console.log(data[0].name);
              $("#clbq").attr('code', a);
               var list="<option value=''>-全部-</option>";
              for (var i = 0; i < data.length; i++) {
                   list+="<option value='"+data[i].name+"'>"+data[i].name+"</option>";
                 
              }
               $("#clgzlx").html(list);
          })
          .fail(function() {
              console.log("error");
          })
          .always(function() {
              console.log("complete");
          });
    }else{
      var list="<option value=''>-全部-</option>";
      $("#clgzlx").html(list);
    }
   
    
  }
function xichange(a){
    console.info(a);
    $("#clgzlx").attr('code', a);
  }

 function mapload(){
                map.clear();
                 var hosturl = "http://10.101.139.22:9897";
                 $("#loading").css('display', 'block');
                 var startTime=$("#ry_startTime").val();
                 var endTime = $("#ry_endTime").val();
                 $.ajax({
                    url: hosturl+"/carcheck/info/findpageCompare",
                    type: 'post',
                    dataType: 'json',
                    data: { 
                    plateNo:     $('#cph').val(),
                    beginTime:   $('#cl_startTime').val(),
                    endTime:     $('#cl_endTime').val(),
                    checkAddress:$('#hcdd').val(),
                    pcode:       $("#jyh").val(),
                    personif:    $('#yj').val(),
                    clchTag2:    $('#yjlx').val(),
                    clchTag:     $('#clbq').find("option:selected").attr('tid'),
                    dataType:    $('#clgzlx').val(),
                    ucode:       getUcode(),
                    policeName:  $('#jyxm').val(),
                    ownerName: $('#jdcsyrxm').val(),
                    pageno:      1, 
                    size:        99999
                    },
                 })

                 .done(function(data) {
                    console.log(data.result); 
                    var data = data.result;
                     $("#loading").css('display', 'none');
                    //[0].checkLocation;
                    for (var i = 0; i < data.length; i++) {
                        if(data[i].checkLocation){
                            if(Number(data[i].clhcFlag)>0){
                               /* if(data[i].clchTag=="违章车辆"){
                                var jd = data[i].checkLocation.split(",")[0];
                                var wd = data[i].checkLocation.split(",")[1];
                                var position = new EzCoord(jd,wd);
                                var icon3 = new EzIcon({
                                src: '../images/marker-icon.png',
                                });
                                alert(1)
                                var marker = new EzMarker(position,icon3);
                                map.addOverlay(marker);
                                }
                                if (data[i].clchTag=="违法车辆") {
                                   var jd = data[i].checkLocation.split(",")[0];
                                var wd = data[i].checkLocation.split(",")[1];
                                var position = new EzCoord(jd,wd);
                                var icon3 = new EzIcon({
                                src: '../images/yellowmarker.png',
                                });
                                var marker = new EzMarker(position,icon3);
                                map.addOverlay(marker); 
                                }
                                if(data[i].clchTag=="部级前科人员车辆"){
                                var jd = data[i].checkLocation.split(",")[0];
                                var wd = data[i].checkLocation.split(",")[1];
                                var position = new EzCoord(jd,wd);
                                var icon3 = new EzIcon({
                                src: '../images/bluemarker.png',
                                });
                                var marker = new EzMarker(position,icon3);
                                map.addOverlay(marker); 
                                }
                                 if(data[i].clchTag.indexOf(",")>0){
                                var jd = data[i].checkLocation.split(",")[0];
                                var wd = data[i].checkLocation.split(",")[1];
                                var position = new EzCoord(jd,wd);
                                var icon3 = new EzIcon({
                                src: '../images/redmarker.png',
                                });
                                var marker = new EzMarker(position,icon3);
                                map.addOverlay(marker); 
                                }*/
                                var jd = data[i].checkLocation.split(",")[0];
                                var wd = data[i].checkLocation.split(",")[1];
                                var position = new EzCoord(jd,wd);
                                var icon3 = new EzIcon({
                                src: '../images/redmarker.png',
                                });
                                var marker = new EzMarker(position,icon3);
                                map.addOverlay(marker); 
                         
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
                        if(data[i].checkLocation){
                             arry = [Number(data[i].checkLocation.split(",")[0]).toFixed(6),Number(data[i].checkLocation.split(",")[1]).toFixed(6)];
                        var oldstring = arry.toString();
                        var arryold = new Array;
                        arryold = [Number(marker.getPoint().coordinate_[0]).toFixed(6),Number(marker.getPoint().coordinate_[1]).toFixed(6)];
                        var newstring = arryold.toString();
                        if(newstring === oldstring){
                            console.info(data[i]);
                            
                        var strHTML1 = '<p>车牌号:</br>'+(data[i].plateNo==undefined?'':data[i].plateNo)+'</p>'+'<p>所有人:</br>'+data[i].ownerName+'</p><p>车辆品牌:'+(data[i].carBrand==undefined?'':data[i].carBrand)+'</p><p> 公民身份证号:</br>'+data[i].ownerIdcardNo+'<p>警员:</br>'+data[i].policeName+'<p>';
                        marker.openInfoWindow(strHTML1)
                        }
                        }
                       
                    }
                  }
               }
            },map);  
            } 
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
        total: data.total,
        //分页尺寸。指示每页最多显示的记录数量。
        pageSize: data.pageSize,
        //当前页索引编号。从其开始（从0开始）的整数。
        pageIndex: data.pageNo-1,
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
            pagipationQuery(pageIndex+1,pageSize,pagination);
        },
    });
}
$(document).on('click', '#daomap', function(event) { 
 gomap("reload"); 
});

/*关系研判*/
$(document).on('click','.btn-gxyp',function(){
    var data = $(this).parent('td').attr('tid');
    //console.log(data)
    //console.log(userNo)
    window.open('http://yp.hsga.nn/core.html?username='+userNo+'#!scopa/graph/key/'+data);
});
/*档案*/
$(document).on('click','.btn-da',function(){
    
    var data = $(this).html();
    // console.log(data)
    // console.log(userNo)
    window.open('http://yp.hsga.nn/core.html?username='+userNo+'#!scopa/file/key/'+data);
});

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

/*导出*/
$(document).on('click','#export-cl',function(){
    window.location.href=host+'/carcheck/info/exportCompare?personif='+$('#yj').val()+
                                                      '&plateNo='+$('#cph').val()+
                                                      '&beginTime='+$('#cl_startTime').val()+
                                                      '&endTime='+$('#cl_endTime').val()+
                                                      '&checkAddress='+$('#hcdd').val()+
                                                      '&pcode='+$("#jyh").val()+
                                                      '&clchTag='+$('#clbq').find("option:selected").attr('tid')+
                                                      '&clchTag2='+$('#yjlx').val()+
                                                      '&dataType='+$('#clgzlx').val()+
                                                      '&ucode='+getUcode()+
                                                      '&policeName='+$('#jyxm').val()+
                                                      '&ownerName='+$('#jdcsyrxm').val();
});

/**
 * 分页器查询
 * @param pageIndex 当前页数
 * @param pageSize 每页显示条数
 */
function pagipationQuery(pageIndex,pageSize, pagination){
    var map = {1:'<span class="btn btn-success">正常车辆</span>',2:'<span class="btn btn-warning">本地关注车辆</span>',3:'<span class="btn btn-danger">部级重点车</span>',23:'<span class="btn btn-warning">本地关注车辆</span><span class="btn btn-danger">部级重点车</span>'};
    
    Post("/carcheck/info/findpageCompare",$.param({
        personif:    $('#yj').val(),
        plateNo:     $('#cph').val(),
        beginTime:   $('#cl_startTime').val(),
        endTime:     $('#cl_endTime').val(),
        checkAddress:$('#hcdd').val(),
        pcode:       $("#jyh").val(),
        clchTag:     $('#clbq').find("option:selected").attr('tid'),
        clchTag2:    $('#yjlx').val(),
        dataType:    $('#clgzlx').val(),
        ucode:       getUcode(),
        pageno:      pageIndex, 
        size:        pageSize,
        policeName:  $('#jyxm').val(),
        ownerName: $('#jdcsyrxm').val()
    }), function (data) {
        var htmlobj="";
        $("#tableBody").empty();
        count=data.result.length;
        if(data.result && data.result.length > 0 ) {
            $.each(data.result, function (index, item) {
                var tags = '';
                if(item.clchTag){
                	 $.each(item.clchTag.split(','), function(index, item){
                         tags += "<span class='btn btn-danger'>"+item+"</span>";
                     });
                }
                $("#tableBody").append(
                    "<tr>"+
                    "<td><a class='btn-da lineh'>"+(item.plateNo==undefined?'':item.plateNo)+"</a></td>"+
                    "<td class='aa lineh' title='"+(item.carBrand==undefined?'':item.carBrand)+"'>"+(item.carBrand==undefined?'':item.carBrand)+"</td>"+
                    "<td class='aa lineh' title='"+(dataJx(item.plateType,cllxMap))+"'>"+(dataJx(item.plateType,cllxMap))+"</td>"+
                    "<td class='aa lineh' title='"+(ysJx(item.bodyColor,csysMap))+"'>"+(dataJx(item.bodyColor,csysMap))+"</td>"+
                    "<td class='aa lineh' title='"+(item.ownerName==undefined?'':item.ownerName)+"'>"+(item.ownerName==undefined?'':item.ownerName)+"</td>"+
                    "<td class='aa lineh' title='"+(dataJx(item.ucode,dwdm))+"'>"+(dataJx(item.ucode,dwdm))+"</td>"+
                    "<td class='aa lineh' title='"+(item.checkTime==undefined?'':item.checkTime)+"'>"+(item.checkTime==undefined?'':item.checkTime)+"</td>"+
                    "<td class='aa lineh' title='"+(dataJx(item.checkAddress,nmXzqhMap))+"'>"+(dataJx(item.checkAddress,nmXzqhMap))+"</td>"+
                    "<td class='aa lineh' title='"+(item.policeName==undefined?'':item.policeName)+"'>"+(item.policeName==undefined?'':item.policeName)+"</td>"+
                    "<td class='aa lineh' title='"+(item.pcode==undefined?'':item.pcode)+"'>"+(item.pcode==undefined?'':item.pcode)+"</td>"+
                    "<td class='aa lineh' title='"+(item.policePhone==undefined?'':item.policePhone)+"'>"+(item.policePhone==undefined?'':item.policePhone)+"</td>"+
                    "<td  class='clTag aa' pn='"+item.plateNo+"' pt='"+item.plateType+"'>"+tags+"</td>"+
                    "<td class='aa lineh' title='"+(item.dataType==undefined?'':item.dataType)+"'>"+(item.dataType==undefined?'':item.dataType)+"</td>"+
                    "<td tid='"+item.plateNo+"'><img title='关系研判' class='cz btn-gxyp' src='../img/gxyp.png'>&nbsp;<img title='查看' class='cz see' data='"+JSON.stringify(item)+"' src='../img/ck.png'>&nbsp;<img title='地图' plateNo='"+(item.plateNo==undefined?'':item.plateNo)+"' class='cz fuck lineh' src='../img/dt.png'></td>"+
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
       $(".clTag").mCustomScrollbar({
       axis:"x", // horizontal scrollbar
       theme:'minimal-dark'
      });
		pagination && pagination(data);
    })
}

$(document).on('click','.see',function(){
    var data = JSON.parse($(this).attr('data'));
    
    $('#tableBody_modal_see').html('');
    $('#tableBody_modal_see').append(
    	'<tr><th colspan="2">车辆比对详情</td></tr>'+
        '<tr><td width="20%">车牌号</td><td><span>'+data.plateNo+'</span></td></tr>'+
        '<tr><td>车辆品牌</td><td><span>'+data.carBrand+'</span></td></tr>'+
        '<tr><td>车辆类型</td><td><span>'+(dataJx(data.plateType,cllxMap))+'</span></td></tr>'+
        '<tr><td>颜色</td><td><span>'+(dataJx(data.bodyColor,csysMap))+'</span></td></tr>'+
        '<tr><td>机动车所有人</td><td><span>'+data.ownerName+'</span></td></tr>'+
        '<tr><td>核查单位</td><td><span>'+(dataJx(data.ucode,dwdm))+'</span></td></tr>'+
        '<tr><td>核查时间</td><td><span>'+data.checkTime+'</span></td></tr>'+
        '<tr><td>核查地点</td><td><span>'+(dataJx(data.checkAddress,nmXzqhMap))+'</span></td></tr>'+
        '<tr><td>警员号</td><td><span>'+data.pcode+'</span></td></tr>'+
        '<tr><td>警员手机号</td><td><span>'+data.policePhone+'</span></td></tr>'+
        '<tr><td>车辆标签</td><td><span>'+data.clchTag+'</span></td></tr>'+
        '<tr><td>车辆关注类型</td><td><span>'+(data.dataType==undefined?'':data.dataType)+'</span></td></tr>'
    );
    console.log(data);
    var plateNo = data.plateNo;
    var plateType = data.plateType;
    console.log(plateNo + plateType);
    if(data.clchTag){
    	 $('#tableBody_modal_see').append('<tr><th colspan="2">车辆标签详情</td></tr>'); 
    	    $.each(data.clchTag.split(','), function(indexq, itemq){
    	    	$.ajax({
    	            url: host+'/carcheck/info/findTag/'+plateNo+'/'+itemq+'/'+plateType,
    	            type: 'GET',
    	            dataType: 'json',
    	            success: function(data){
    	            	$('#tableBody_modal_see').append('<tr><td colspan="2">'+itemq+'</td></tr>'); 
    	            	$('#tableBody_modal_see').append('<tr><td colspan="2" id="tag'+indexq+'"></td></tr>'); 
    	                $.each(data, function(index, item) {
    	                	$('#tableBody_modal_see #tag'+indexq).append('<span>数据来源：</span><span>'+eval('(' + item.tagInfo + ')').source+"</span><br>"); 
    	                    var tagInfos = eval('(' + item.tagInfo + ')').fields;
    	                    console.log(tagInfos);
    	                    $.each(tagInfos, function(index1, item1) {
                               if(index1=='重点人员类别标记'){
                                if(item1){
                                    item1 = zdrylbbj[item1.split(',')[1].substring(0,4)];
                                }
                            }else if(index1=='重点人员细类'){
                                if(item1){
                                    if(item1.indexOf(',')!=-1){
                                        var ite = item1.split(',');
                                        var item2 = '';
                                        $.each(ite,function(index, el) {
                                          item2 += zdryxlMap[el]+',';
                                        });
                                    }else{
                                      item2 = dataJx(item1,zdryxlMap);
                                    } 
                                    $('#tableBody_modal_see #tag'+indexq).append('<span>'+index1+'：</span><span>'+(item2=="null"?'':item2)+'</span><br>'); 
                                }
                            }else{
                                $('#tableBody_modal_see #tag'+indexq).append('<span>'+index1+'：</span><span>'+(item1=="null"?'':item1)+'</span><br>'); 
                            }
    	                    });
    	                    	
    	                    if(index!=(data.length-1)){
    	                    	$('#tableBody_modal_see #tag'+indexq).append('<span  style="display: block;color:#3b72d2;margin: 3px 0px;">—————————————————————————————————</span>');
    	                    }
    	                });
    	            }
    	        });
    	    });
    }
    
    $('#myModal_see').modal('show');
});
/*标签详情*/
$(document).on('click','.clTag span',function(){
    $('#myModal').modal('show');
    $('.modal-body').html('');
    $('#myModalLabel').html('');
    var plateNo = $(this).parents('td').attr('pn');
    var plateType = $(this).parents('td').attr('pt');
    var tag = $(this).html();
    $.ajax({
        url: host+'/carcheck/info/findTag/'+plateNo+'/'+tag+'/'+plateType,
        type: 'GET',
        dataType: 'json',
        success: function(data){
            $('#myModalLabel').html(tag);
            $.each(data, function(index, item) {
            	console.log(item);
            	$('.modal-body').append('<span>数据来源：</span><span>'+eval('(' + item.tagInfo + ')').source+'</span><br>'); 
                var tagInfos = eval('(' + item.tagInfo + ')').fields;
                $.each(tagInfos, function(index1, item1) {
                    item1 = brReg(item1);
                    if(index1=='重点人员细类'){
                        if(item1){
                            if(item1.indexOf(',')!=-1){
                                var ite = item1.split(',');
                                var item2 = '';
                                $.each(ite,function(index, el) {
                                  item2 += dataJx(el,zdryxlMap)+',';
                                });
                            }else{
                              item2 = dataJx(item1,zdryxlMap);
                            } 
                             $('.modal-body').append('<span>'+index1+'：</span><span>'+(item2=="null"?'':item2)+'</span><br>'); 
                        }
                    }else{
                         $('.modal-body').append('<span>'+index1+'：</span><span>'+(item1=="null"?'':item1)+'</span><br>'); 

                    }
                });
                $('.modal-body').append('<span style="color:#3b72d2;">———————————————————————————————</span>');
                $('.modal-body').append('<br>');
                
            });
        }
    });
    
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
$(document).on('click', '.fuck', function(event) {
    var no = $(this).attr('plateNo');
    gomap(no);
    /* Act on the event */
});

function pointpop(data){
        var data =data;
        console.info(data)
         map.clear();
             var hosturl = "http://10.101.139.22:9897";
             $("#loading").css('display', 'block');

             $.ajax({
                url: hosturl+"/carcheck/info/findByPlateNo/"+data,
                type: 'get',
                dataType: 'json',
             })

             .done(function(data) {
                console.log(data); 
                var data = data;
                 $("#loading").css('display', 'none');
                //[0].checkLocation;
               for (var i = 0; i < data.length; i++) {
                    if(data[i].checkLocation){
                        if(Number(data[i].ryhcFlag)>0){
                        var jd = data[i].checkLocation.split(",")[0];
                        var wd = data[i].checkLocation.split(",")[1];
                        var position = new EzCoord(jd,wd);
                        var icon3 = new EzIcon({
                        src: '../images/marker-icon.png',
                        });
                        var marker = new EzMarker(position,icon3);
                        map.addOverlay(marker);
                        }else{
                        var jd = data[i].checkLocation.split(",")[0];
                        var wd = data[i].checkLocation.split(",")[1];
                        var position = new EzCoord(jd,wd);

                        var marker = new EzMarker(position);
                        map.addOverlay(marker);
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
                    if(data[i].checkLocation){
                         arry = [Number(data[i].checkLocation.split(",")[0]).toFixed(6),Number(data[i].checkLocation.split(",")[1]).toFixed(6)];
                    var oldstring = arry.toString();
                    var arryold = new Array;
                    arryold = [Number(marker.getPoint().coordinate_[0]).toFixed(6),Number(marker.getPoint().coordinate_[1]).toFixed(6)];
                    var newstring = arryold.toString();
                    if(newstring === oldstring){
                        console.info(data[i]);
                        var strHTML1 = '<p>车牌号:</br>'+(data[i].plateNo==undefined?'':data[i].plateNo)+'</p>'+'<p>所有人:</br>'+data[i].ownerName+'</p><p>车辆品牌:'+(data[i].carBrand==undefined?'':data[i].carBrand)+'</p><p> 公民身份证号:</br>'+data[i].ownerIdcardNo+'<p>警员:</br>'+data[i].policeName+'<p>';
                        marker.openInfoWindow(strHTML1)
                    }
                    }
                   
                }
              }
           }
        },map);  
        } 
}