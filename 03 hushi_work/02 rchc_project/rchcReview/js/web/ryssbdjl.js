var exportTotal;
$(document).ready(function($) {
	select();
    initSelect('qqly',sblxMap);
    //initCheckSource();
    initSelect('yjlx',yjlxR); 
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
    $("#search-ry").bind('click', function () {
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

    // 重置按钮功能
    $('.serach-tab input[type="reset"]').on('click', function(){
        // 还原之前的时间
        setTimeout(function(){
            $("#startTime").val(lastweek());
            $("#endTime").val(now());
        }, 10)
    })


});


function mapload(pageIndex,pageSize){  
            var keng ="";
            if($("#rybq").find("option:selected").attr('tid')){
                keng = $("#rybq").find("option:selected").attr('tid');
            }
            var huji = shirt('hjdqh');
            var personif = 
                 $("#loading").css('display', 'block');
                 var startTime=$("#hlsj_start").val();
                 var endTime = $("#hlsj_end").val();
                 $.ajax({
                    url: host+'/personcheck/info/findpersonchecklog',
                    type: 'GET',
                    dataType: 'json',
                    data: { 
                        'personif':    $('#yj').val(), 
                        'names':       $('#xm').val(),
                        'sfzh':        $('#sfzh').val(), 
                        'source':      $('#qqly').val(), 
                        'startTime':   $('#startTime').val(),
                        'endTime':     $('#endTime').val(), 
                        'tags':        keng,
                        'tags2':       $('#yjlx').val(), 
                        'personType':  $('#rylx').val(), 
                        'checkaddress':$('#checkAddress').val(),
                        'policename':  $('#jyxm').val(),
                        'policeno':    $('#jyh').val(),
                        'ucode':       getUcode('citySel','ucodeName'),
                        'birthplace':  huji,
                        'page':        pageIndex, 
                        'pageSize':    pageSize
                    },
                 })

                 .done(function(data) {
                    // console.log(data.msg); 
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
                    // console.log("complete");
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
                                var strHTML1 = '<p>名字:</br>'+data[i].name+'</p><p>性别:'+data[i].sex+'</p><p>身份证号:</br>'+data[i].sfzh+'<p>警员:</br>'+data[i].policename+'<p>';
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
    var no = $(this).attr('idcardNo');
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
                url: hosturl+"/personcheck/info/findBySfzh/"+data,
                type: 'get',
                dataType: 'json',
             })

             .done(function(data) {
                console.log(data); 
                var data = data;
                 $("#loading").css('display', 'none');
                //[0].checkLocation;
               for (var i = 0; i < data.length; i++) {
                    if(data[i].location||data[i].location.indexOf(',')){
                        if(Number(data[i].ryhcFlag)>0){
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
                    if(data[i].location){
                         arry = [Number(data[i].location.split(",")[0]).toFixed(6),Number(data[i].location.split(",")[1]).toFixed(6)];
                    var oldstring = arry.toString();
                    var arryold = new Array;
                    arryold = [Number(marker.getPoint().coordinate_[0]).toFixed(6),Number(marker.getPoint().coordinate_[1]).toFixed(6)];
                    var newstring = arryold.toString();
                    if(newstring === oldstring){
                        console.info(data[i]);
                        var strHTML1 = '<p>名字:</br>'+data[i].name+'</p><p>性别:'+data[i].sex+'</p><p>身份证号:</br>'+data[i].sfzh+'<p>警员:</br>'+data[i].policename+'<p>';
                        marker.openInfoWindow(strHTML1)
                    }
                    }
                   
                }
              }
           }
        },map);  
        } 
}

/*关于地图的一切到这里结束*/

function select(){
    $.ajax({
        url: host+'/importantPersonCategory/listCategory',
        type: 'get',
        dataType: 'json',
    })
    .done(function(data) {
        var list="<option value='' tid=''>-全部-</option>";
        for (var i = 0; i < data.length; i++) {
             list+="<option value='"+data[i].code+"' tid='"+data[i].name+"'>"+data[i].name+"</option>";
           
        }
         $("#rybq").html(list);
    })
    .fail(function() {
        console.log("error");
    })
    .always(function() {
        // console.log("complete");
    });    
}
function change(a){
    console.info(a);
    if(a){
         $.ajax({
                url: host+'/importantPersonCategory/listCategoryByCode?code='+a,
                type: 'get',
                dataType: 'json',
            })
            .done(function(data) {
                console.log(data[0].name);
                $("#rybq").attr('code', a);
                 var list="<option value=''>-全部-</option>";
                for (var i = 0; i < data.length; i++) {
                     list+="<option value='"+data[i].name+"'>"+data[i].name+"</option>";
                   
                }
                 $("#rylx").html(list);
                 $("#rylx").removeAttr("disabled")
            })
            .fail(function() {
                console.log("error");
            })
            .always(function() {
                console.log("complete");
            });
    }else{
        var list="<option value=''>-全部-</option>";
        $("#rylx").html(list);
       $("#rylx").attr("disabled","disabled")
    }   
}
function xichange(a){
    console.info(a);
    $("#rylx").attr('code', a);
}
// function initCheckSource(){
// 	initSelect('checkSource',checkSourceMap);
// 	$(document).on('change', '#checkSource', function(event) {
// 		var checkSource = $("#checkSource").val();
// 		console.log(checkSource);
// 		if(checkSource){
//             $("#checkAddress").removeAttr("disabled")
// 			$("#checkAddress").html('<option value="">-全部-</option>');
// 			initSelect('checkAddress',checkAddress[checkSource]);
// 		}else{
//             $("#checkAddress").attr("disabled","disabled");
//             $("#checkAddress").html('<option value="">-全部-</option>');
//         }
// 	});
// }

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
$(document).on('click','#export-ry',function(){
    var huji =shirt('hjdqh');
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
                                    var keng ="";
                                    if($("#rybq").find("option:selected").attr('tid')){
                                        keng = $("#rybq").find("option:selected").attr('tid');
                                    }
                                    window.location.href=host+'/personcheck/info/exportPersonCheckLog?personif='+$('#yj').val()+
                                                                                        '&names='+$('#xm').val()+
                                                                                        '&sfzh='+$('#sfzh').val()+ 
                                                                                        '&source='+$('#qqly').val()+
                                                                                        '&startTime='+$('#startTime').val()+ 
                                                                                        '&endTime='+$('#endTime').val()+ 
                                                                                        '&tags='+keng+
                                                                                        '&tags2='+$('#yjlx').val()+ 
                                                                                        '&personType='+$('#rylx').val()+ 
                                                                                        '&checkaddress='+$('#checkAddress').val()+ 
                                                                                        '&birthplace='+huji+ 
                                                                                        '&policename='+$('#jyxm').val()+ 
                                                                                        '&policeno='+$('#jyh').val()+ 
                                                                                        '&ucode='+getUcode('citySel','ucodeName');
                                },
                                取消: function () {
                                   
                                },
                            }
                        })
                    }else{
                        var keng ="";
                        if($("#rybq").find("option:selected").attr('tid')){
                            keng = $("#rybq").find("option:selected").attr('tid');
                        }
                        window.location.href=host+'/personcheck/info/exportPersonCheckLog?personif='+$('#yj').val()+
                                                                            '&names='+$('#xm').val()+
                                                                            '&sfzh='+$('#sfzh').val()+ 
                                                                            '&source='+$('#qqly').val()+
                                                                            '&startTime='+$('#startTime').val()+ 
                                                                            '&endTime='+$('#endTime').val()+ 
                                                                            '&tags='+keng+
                                                                            '&tags2='+$('#yjlx').val()+ 
                                                                            '&personType='+$('#rylx').val()+ 
                                                                            '&checkaddress='+$('#checkAddress').val()+ 
                                                                            '&birthplace='+huji+ 
                                                                            '&policename='+$('#jyxm').val()+ 
                                                                            '&policeno='+$('#jyh').val()+ 
                                                                            '&ucode='+getUcode('citySel','ucodeName');
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
    var keng ="";
    if($("#rybq").find("option:selected").attr('tid')){
        keng = $("#rybq").find("option:selected").attr('tid');
    }
    var huji =shirt('hjdqh');
    $("#loading").css('display', 'block');
    $.ajax({
    	//url: bjhcHost+'/task/info/findpersonchecklog',
        url: host+'/personcheck/info/findpersonchecklog',
    	type: 'GET',
    	dataType: 'json',
    	//data: {'startTime': '2017-07-21 17:00:00','endTime': '2017-07-21 17:00:02', 'page': pageIndex, 'pageSize': pageSize},
    	data: {     'personif':    $('#yj').val(), 

                    'names':       $('#xm').val(),
                    'sfzh':        $('#sfzh').val(), 
                    'source':      $('#qqly').val(), 
                    'startTime':   $('#startTime').val(),
                    'endTime':     $('#endTime').val(), 
                    'tags':        keng,
                    'tags2':       $('#yjlx').val(), 
                    'personType':  $('#rylx').val(), 
                    'checkaddress':$('#checkAddress').val(),
                    'policename':$('#jyxm').val(),
                    'policeno':$('#jyh').val(),
                    'ucode':getUcode('citySel','ucodeName'),
                    'birthplace':huji,
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
                    if(item.pushTaget){
                        if(item.pushTaget.indexOf(',')>-1){
                            $.each(item.pushTaget.split(','),function(index, el) {
                                ly += dataJx(el,ssbdly)+',';
                            });
                            ly=ly.substring(0,ly.length-1);
                        }else{
                            ly = dataJx(item.pushTaget,ssbdly);
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
	                    "<td class='aa' title='"+(item.name==undefined?'':item.name)+"'>"+(item.name==undefined?'':item.name)+"</td>"+
	                    "<td ><a class='btn-da aa' title='"+(item.sfzh==undefined?'':item.sfzh)+"'>"+(item.sfzh==undefined?'':item.sfzh)+"</td>"+
	                    "<td class='aa' title='"+(dataJx(item.sex,xb))+"'>"+(dataJx(item.sex,xb))+"</a></td>"+
	                    "<td class='aa' title='"+(dataJx(item.nation,mzMap))+"'>"+(dataJx(item.nation,mzMap))+"</td>"+
                        "<td class='aa' title='"+(item.birthplace==null?'':item.birthplace)+"'>"+(item.birthplace==null?'':item.birthplace)+"</td>"+
                        "<td class='aa' title='"+(item.createTime==undefined?'':item.createTime)+"'>"+(item.createTime==undefined?'':item.createTime)+"</td>"+
                        "<td class='aa' title='"+(item.checkaddress==undefined||item.checkaddress=="null"?'':item.checkaddress)+"'>"+(item.checkaddress==undefined||item.checkaddress=="null"?'':item.checkaddress)+"</td>"+
                        "<td class='aa' title='"+(item.checkdept==null?'':item.checkdept)+"'>"+(item.checkdept==null?'':item.checkdept)+"</td>"+
	                    "<td class='aa' title='"+(dataJx(item.source,sblxMap))+"'>"+(dataJx(item.source,sblxMap))+"</td>"+
	                    "<td class='aa' title='"+dataJx(item.pushResult,ssbdly)+"'>"+dataJx(item.pushResult,ssbdly)+"</td>"+
	                   // "<td class='aa' title='"+(dataJx(item.personif,zdrif))+"'>"+(dataJx(item.personif,zdrif))+"</td>"+
	                    "<td class='aa' title='"+ly+"'>"+ly+"</td>"+
                        "<td class='aa' title='"+(item.policename==null?'':item.policename)+"'>"+(item.policename==null?'':item.policename)+"</td>"+
                        "<td class='aa' title='"+(item.policeno==null?'':item.policeno)+"'>"+(item.policeno==null?'':item.policeno)+"</td>"+
                        "<td class='aa' title='"+item.policephone+"'>"+item.policephone+"</td>"+
                        "<td class='ryTag aa' title='"+(dataJx(item.tags,rybqMap,''))+"'>"+tag+"</td>"+
	                    "<td class='aa' title='"+(dataJx(item.personType,zdryxlMap,''))+"'>"+(dataJx(item.personType,zdryxlMap,''))+"</td>"+
                        "<td class='aa lineh'  tid='"+(item.sfzh==undefined?'':item.sfzh)+"'><img title='关系研判' class='cz btn-gxyp' src='../img/gxyp.png'>&nbsp;<img title='背景审查' class='cz btn-bjhc' src='../img/bjsc.png'>&nbsp;<img title='查看' class='cz see' data='"+JSON.stringify(item)+"' src='../img/ck.png'>&nbsp<img title='地图' idcardNo='"+(item.sfzh==undefined?'':item.sfzh)+"'  class='cz fuck lineh' src='../img/dt.png'></td>"+
						 
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
	        };
            $(".ryTag").mCustomScrollbar({
                 axis:"x", // horizontal scrollbar
                 theme:'minimal-dark'
            });
	        pagination && pagination(data);
	        
	    }
    });
}
$(document).on('click','.btn-gxyp',function(){
    var data = $(this).parent('td').attr('tid');
    //console.log(data)
    //console.log(userNo)
    window.open('http://yp.hsga.nn/core.html?username='+userNo+'#!scopa/graph/key/'+data);
});
/*背景审查*/
$(document).on('click','.btn-bjhc',function(){
    var data = $(this).parent('td').attr('tid');
    console.log(data)
    console.log(userNo)
    window.open('http://10.101.139.21:8777/subview/taskDetail.html?'+data);
});

/*标签详情*/
$(document).on('click','.ryTag span',function(){
    $('#myModal').modal('show');
    var tag = $(this).html();
    $('.modal-body').html('');
    if(tag.indexOf("无背景")==-1){
    	var dataStr =$(this).attr('cont');
    	if(isJSON(dataStr)){
    		data = JSON.parse(dataStr);
            if(!data){
                $('.modal-body').html('无内容');
            }else{
                $.each(data,function(ind, el) {
                    var tag = el.tag+'-'+el.source+'-'+el.info;
                    //$('#myModalLabel').html(tag);
                    $('.modal-body').append('<span>'+tag+'</span><br>'); 
                    $.each(el.fields, function(index, item) {
                        item = brReg(item);
                        if(index=='重点人员类别标记'){
                            var a = item.split(',')[1].substring(0, 4);
                            item = dataJx(a,zdrylbbj);
                            
                        }else if(index=='重点人员细类'){
                            item = (dataJx(item,zdryxlMap));
                        }
                        
                        $('.modal-body').append('<span>'+index+'：</span><span>'+(item=="null"?'':item)+'</span><br>'); 
                    });
                    $('.modal-body').append('<span style="color:#3b72d2;">——————————————————————————————</span>');
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
/*档案*/
$(document).on('click','.btn-da',function(){
    
    var data = $(this).html();
    // console.log(data)
    // console.log(userNo)
    window.open('http://yp.hsga.nn/core.html?username='+userNo+'#!scopa/file/key/'+data);
});

$(document).on('click','.see',function(){
    var data = JSON.parse($(this).attr('data'));
    console.log(data);
    $('#myModal_see').modal('show');
    $('#tableBody_modal_see').html('');
    console.info(data.cardno);
        $('#tableBody_modal_see').append(
        '<tr><td>被核录人</td><td><span>'+data.name+'</span></td></tr>'+
        '<tr><td>身份证号</td><td><span>'+data.sfzh+'</span></td></tr>'+
        '<tr><td>性别</td><td><span>'+data.sex+'</span></td></tr>'+
        '<tr><td>民族</td><td><span>'+data.nation+'</span></td></tr>'+
        '<tr><td>户籍地</td><td><span>'+(data.birthplace==null?'':data.birthplace)+'</span></td></tr>'+
        '<tr><td>核录时间</td><td><span>'+data.createTime+'</span></td></tr>'+
        '<tr><td>核查地点</td><td><span>'+data.checkaddress+'</span></td></tr>'+
        '<tr><td>设备类型</td><td><span>'+data.pushTaget+'</span></td></tr>'+
        '<tr><td>列管单位</td><td><span>'+(data.lgdw==null?'':data.lgdw)+'</span></td></tr>'+
        '<tr><td>推送结果</td><td><span>'+data.pushResult+'</span></td></tr>'+
        '<tr><td>警员警号</td><td><span>'+data.policeno+'</span></td></tr>'+
        '<tr><td>警员手机号</td><td><span>'+data.policephone+'</span></td></tr>'+
        '<tr><td>人员标签</td><td><span>'+data.tags+'</span></td></tr>'
        )

});