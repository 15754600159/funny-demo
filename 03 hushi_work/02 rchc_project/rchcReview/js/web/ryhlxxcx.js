var exportTotal;
var exportTotalLte;
var exportTotalXf;

$(document).ready(function($) {
    initSelect('bhlr_mz',mzMap);
    initSelect('xf_mz',mzMap);
    initSelect('lte_mz',mzMap);
    //initSelect('forgid',dwdm);
    sortMZ('bhlr_mz');
    sortMZ('xf_mz');
    sortMZ('lte_mz');
    //initSelect('rylb',zdryxlMap);
    initSelect('hldd',hsXzqhMap);
    initSelect('hldd-lte',hsXzqhMap);
    //initDwdm(dwdm);
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
    //绑定查询按钮事件
    
    // 页面重置表单重置按钮 恢复初始时间
    $('#myTabContent input[type="reset"]').on('click', function(e){
        var target = $(this),
            formBox = target.parents('form'),
            startTimeElem = formBox.find('.form_datetime')[0],
            endTimeElem = formBox.find('.form_datetime')[1];
        setTimeout(function(){
            $(startTimeElem).val(lastweek());
            $(endTimeElem).val(now());
        }, 10)
    })


    /*$(document).on("click", "#hldw", function() {
        $('.dtree').removeClass('hide');
    });*/

    //这里是定义了时间问题，默认取最近的一周时间

$("#hlsj_end").val(now());
$("#hlsj_start").val(lastweek());
$("#hlsj_end-lte").val(now());
$("#hlsj_start-lte").val(lastweek());
$("#xf_end").val(now());
$("#xf_start").val(lastweek());
$("#endTime").val(now());
$("#beginTime").val(lastweek());

$("#search-ry").bind('click', function () {
    var a =  timechuo($('#hlsj_start').val(),$('#hlsj_end').val()); 
        if(a ==1){
            return
        }
    pagipationQuery(1,10,pagination);
    mapload(1,10);
});

$("#search-lte").bind('click', function () {
    var a =  timechuo($('#hlsj_start-lte').val(),$('#hlsj_end-lte').val()); 
        if(a ==1){
            return
        }
    pagipationQuerylte(1,10,pagination);
    maploadlte(1,10);
});

$("#search-xf").bind('click', function () {
    var a =  timechuo($('#xf_start').val(),$('#xf_end').val()); 
        if(a ==1){
            return
        }
    pagipationQueryxf(0,10,paginationxf);
});
pagipationQuery(1,10,pagination);
pagipationQueryxf(0,10,paginationxf);
pagipationQuerylte(1,10,paginationlte);
$(".map").css('display', 'none');
mapload(1,10);
maploadlte(1,10);
select();
//$(".map").css('display', 'none');
});

/*关系研判*/
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
/*档案*/
$(document).on('click','.btn-da',function(){
    
    var data = $(this).html();
    // console.log(data)
    // console.log(userNo)
    window.open('http://yp.hsga.nn/core.html?username='+userNo+'#!scopa/file/key/'+data);
});



/**
 * 分页控件
 * @param total
 */

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
         $("#rybq-lte").html(list);
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
function changelte(a){
    console.info(a);
    if(a){
         $.ajax({
                url: host+'/importantPersonCategory/listCategoryByCode?code='+a,
                type: 'get',
                dataType: 'json',
            })
            .done(function(data) {
                console.log(data[0].name);
                $("#rybq-lte").attr('code', a);
                 var list="<option value=''>-全部-</option>";
                for (var i = 0; i < data.length; i++) {
                     list+="<option value='"+data[i].name+"'>"+data[i].name+"</option>";
                   
                }
                 $("#rylx-lte").html(list);
                 $("#rylx-lte").removeAttr("disabled")
            })
            .fail(function() {
                console.log("error");
            })
            .always(function() {
                console.log("complete");
            });
    }else{
        var list="<option value=''>-全部-</option>";
        $("#rylx-lte").html(list);
       $("#rylx-lte").attr("disabled","disabled")
    }   
}
function xichange(a){
    console.info(a);
    $("#rylx").attr('code', a);
 }
 function xichangelte(a){
    console.info(a);
    $("#rylx-lte").attr('code', a);
 }
function mapload(pageIndex,pageSize){
    var huji = shirt('hjdqh');
    var personif = $("#loading").css('display', 'block');
    var startTime=$("#hlsj_start").val();
    var endTime = $("#hlsj_end").val();
    var keng ="";
    if($("#rybq").find("option:selected").attr('tid')){
        keng = $("#rybq").find("option:selected").attr('tid');
    }
    $.ajax({
        url: rchcIp+":9897/personcheck/info/findpageCompare",
        type: 'post',
        dataType: 'json',
        data: { 
            pageno:pageIndex, 
            size: pageSize,
            name:$('#bhlr_xm').val(),
            idcardNo:$('#bhlr_sfzh').val(),
            national:$('#bhlr_mz').val(),
            beginTime:$('#hlsj_start').val(),
            endTime:$('#hlsj_end').val(),
            ucode:getUcode('citySel','ucodeName'),
            addressDetails:huji,
            policeName:$('#hlr').val(),
            pcode:     $("#jyh").val(),
            checkAddress:$('#hldd').val(),
            checkSource:$('#hcly').val(),
            personif:$("#yj").val(),
            ryhcTag2:$("#yjlx").val(),
            ryhcTag:keng,
            personneltype:$("#rylb").val()
        },
    })
    .done(function(data) {
        console.log(data.result); 
        var data = data.result;
        $("#loading").css('display', 'none');
        //[0].checkLocation;
        for (var i = 0; i < data.length; i++) {
            if(data[i].checkLocation){
                if(Number(data[i].ryhcFlag)>0){
                    var jd = data[i].checkLocation.split(",")[0];
                    var wd = data[i].checkLocation.split(",")[1];
                    var position = new EzCoord(jd,wd);
                    var icon3 = new EzIcon({
                        src: '../images/redmarker.png',
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
                                var strHTML1 = '<p>名字:</br>'+data[i].name+'</p><p>性别:'+(dataJx(data[i].sex,xb))+'</p><p>身份证号:</br>'+data[i].idcardNo+'<p>警员:</br>'+data[i].policeName+'<p>';
                                marker.openInfoWindow(strHTML1)
                            }
                        }
                    }
                }
            }
        },map);  
    } 
}
function maploadlte(pageIndex,pageSize){
    var huji = shirt('hjdqh-lte');
    var personif = $("#loading").css('display', 'block');
    var startTime=$("#hlsj_start-lte").val();
    var endTime = $("#hlsj_end-lte").val();
    var keng ="";
    if($("#rybq").find("option:selected").attr('tid')){
        keng = $("#rybq").find("option:selected").attr('tid');
    }
    $.ajax({
        url: rchcIp+":9897/personcheck/info/findpageCompare",
        type: 'post',
        dataType: 'json',
        data: { 
            pageno:pageIndex, 
            size: pageSize,
            name:$('#bhlr_xm-lte').val(),
            idcardNo:$('#bhlr_sfzh-lte').val(),
            national:$('#lte_mz').val(),
            beginTime:$('#hlsj_start-lte').val(),
            endTime:$('#hlsj_end-lte').val(),
            ucode:getUcode('citySel-lte','ucodeName-lte'),
            addressDetails:huji,
            policeName:$('#hlr-lte').val(),
            pcode:     $("#jyh-lte").val(),
            checkAddress:$('#hldd-lte').val(),
            checkSource:$('#hcly-lte').val(),
            personif:$("#yj-lte").val(),
            ryhcTag2:$("#yjlx-lte").val(),
            ryhcTag:keng,
            personneltype:$("#rylx-lte").val()
        },
    })
    .done(function(data) {
        console.log(data.result); 
        var data = data.result;
        $("#loading").css('display', 'none');
        //[0].checkLocation;
        for (var i = 0; i < data.length; i++) {
            if(data[i].checkLocation){
                if(Number(data[i].ryhcFlag)>0){
                    var jd = data[i].checkLocation.split(",")[0];
                    var wd = data[i].checkLocation.split(",")[1];
                    var position = new EzCoord(jd,wd);
                    var icon3 = new EzIcon({
                        src: '../images/redmarker.png',
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
                                var strHTML1 = '<p>名字:</br>'+data[i].name+'</p><p>性别:'+(dataJx(data[i].sex,xb))+'</p><p>身份证号:</br>'+data[i].idcardNo+'<p>警员:</br>'+data[i].policeName+'<p>';
                                marker.openInfoWindow(strHTML1)
                            }
                        }
                    }
                }
            }
        },map);  
    } 
}
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
            mapload(pageIndex+1,pageSize)
        },
    });
}
function paginationlte(data) {
    BootstrapPagination(
        $("#pagination-lte"), {
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
            pagipationQuerylte(pageIndex+1,pageSize,pagination);
            maploadlte(pageIndex+1,pageSize)
        },
    });
}
function paginationxf(data) {
    BootstrapPagination(
        $("#xf_pagination"), {
        layoutScheme: "lefttext,pagesizelist,firstpage,prevgrouppage,prevpage,pagenumber,nextpage,nextgrouppage,lastpage,pageinput,righttext",
        //记录总数。
        total: data.totalElements,
        //分页尺寸。指示每页最多显示的记录数量。
        pageSize: data.pageSize,
        //当前页索引编号。从其开始（从0开始）的整数。
        pageIndex: data.pageNo,
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
            pagipationQueryxf(pageIndex,pageSize,paginationxf);
        },
    });
}

$(document).on("click", "#export-ry", function() {
    var huji = shirt('hjdqh');
    var keng ="";
    if($("#rybq").find("option:selected").attr('tid')){
        keng = $("#rybq").find("option:selected").attr('tid');
    }
    if(exportTotal>10000){
        $.confirm({
            title: '提示',
            content: '导出数据量较大，页面导出仅支持最多10000条数据的导出，如果要全部导出，请联系系统管理员',
            buttons: {
                确定: function () {
                    window.location.href=host+'/personcheck/info/exportCompare?'+
                        'pageno=1&size=10000&name='+$('#bhlr_xm').val()+
                        '&idcardNo='+$('#bhlr_sfzh').val()+
                        '&national='+$('#bhlr_mz').val()+
                        '&beginTime='+$('#hlsj_start').val()+
                        '&endTime='+$('#hlsj_end').val()+
                        '&ucode='+getUcode('citySel','ucodeName')+
                        '&addressDetails='+huji+ 
                        '&policeName='+$('#hlr').val()+
                        '&pcode='+$("#jyh").val()+
                        '&checkAddress='+$('#hldd').val()+
                        '&checkSource='+$('#hcly').val()+
                        '&personif='+$('#yj').val()+
                        '&ryhcTag2='+$("#yjlx").val()+
                        '&ryhcTag='+keng+
                        '&personneltype='+$("#rylx").val();
                },
                取消: function () {
                   
                },
            }
        })
    }else{
        window.location.href=host+'/personcheck/info/exportCompare?'+
                        'pageno=1&size=10000&name='+$('#bhlr_xm').val()+
                        '&idcardNo='+$('#bhlr_sfzh').val()+
                        '&national='+$('#bhlr_mz').val()+
                        '&beginTime='+$('#hlsj_start').val()+
                        '&endTime='+$('#hlsj_end').val()+
                        '&ucode='+getUcode('citySel','ucodeName')+
                        '&addressDetails='+huji+ 
                        '&policeName='+$('#hlr').val()+
                        '&pcode='+$("#jyh").val()+
                        '&checkAddress='+$('#hldd').val()+
                        '&checkSource='+$('#hcly').val()+
                        '&personif='+$('#yj').val()+
                        '&ryhcTag2='+$("#yjlx").val()+
                        '&ryhcTag='+keng+
                        '&personneltype='+$("#rylx").val();
    }
});
$(document).on("click", "#export-ry-lte", function() {
    var huji = shirt('hjdqh-lte');
    var keng ="";
    if($("#rybq").find("option:selected").attr('tid')){
        keng = $("#rybq").find("option:selected").attr('tid');
    }
    if(exportTotalLte>10000){
        $.confirm({
            title: '提示',
            content: '导出数据量较大，页面导出仅支持最多10000条数据的导出，如果要全部导出，请联系系统管理员',
            buttons: {
                确定: function () {
                    window.location.href=host+'/personcheck/info/exportCompare?pageno=1&size=10000&name='+$('#bhlr_xm').val()+
                        '&idcardNo='+$('#bhlr_sfzh-lte').val()+
                        '&personif='+$('#yj-lte').val()+
                        '&national='+$('#lte_mz').val()+
                        '&beginTime='+$('#hlsj_start-lte').val()+
                        '&endTime='+$('#hlsj_end-lte').val()+
                        '&ucode='+getUcode('citySel-lte','ucodeName-lte')+
                        '&addressDetails='+huji+ 
                        '&policeName='+$('#hlr-lte').val()+
                        '&pcode='+$("#jyh-lte").val()+
                        '&checkAddress='+$('#hldd-lte').val()+
                        '&checkSource='+$('#hcly-lte').val()+
                        '&ryhcTag2='+$("#yjlx-lte").val()+
                        '&ryhcTag='+keng+
                        '&personneltype='+$("#rylx-lte").val();
                },
                取消: function () {
                   
                },
            }
        })
    }else{
        window.location.href=host+'/personcheck/info/exportCompare?pageno=1&size=10000&name='+$('#bhlr_xm').val()+
                        '&idcardNo='+$('#bhlr_sfzh-lte').val()+
                        '&personif='+$('#yj-lte').val()+
                        '&national='+$('#lte_mz').val()+
                        '&beginTime='+$('#hlsj_start-lte').val()+
                        '&endTime='+$('#hlsj_end-lte').val()+
                        '&ucode='+getUcode('citySel-lte','ucodeName-lte')+
                        '&addressDetails='+huji+ 
                        '&policeName='+$('#hlr-lte').val()+
                        '&pcode='+$("#jyh-lte").val()+
                        '&checkAddress='+$('#hldd-lte').val()+
                        '&checkSource='+$('#hcly-lte').val()+
                        '&ryhcTag2='+$("#yjlx-lte").val()+
                        '&ryhcTag='+keng+
                        '&personneltype='+$("#rylx-lte").val();
    }
});
$(document).on("click", "#export-xf", function() {
    var huji = "";
        var code = $('#xf_hjdqh').attr('code');
        if($('#xf_hjdqh').val() !=""){
               if(code){
               huji = $('#xf_hjdqh').attr('code')+"-"+$("#xf_hjdqh").val();
               }else{
               huji = 'null-'+$("#xf_hjdqh").val()
               }
        }else{
           huji=''
        }
    var jcz ='';
    var na = $("#xf_jcz").val();
    if ( na==''){
        jcz='';
    }else{
        jcz=na
    }
    var yj = '';
    var nas =  $("#xf_yjlx").val();
    if (nas=='') {
        yj=''
    }else{
        yj =nas;
    }

    var mz='';
    var gp =$("#xf_mz").find("option:selected").text();
    if(gp=='-全部-'){
        mz=''
    }else{
        mz = gp;
    }

    /* name:$('#xf_name').val(),
        idcardNo:$('#xf_sfzh').val(),
        nation:$('#xf_mz').val(),
        beginTime:$('#xf_start').val(),
        endTime:$('#xf_end').val(),
        pageno: pageIndex,
        size: pageSize,
        areacode:huji,
        stationname:jcz,
        dubious:yj,
        dubious2:$("#xf_yj").val(),*/
    if(exportTotalXf>10000){
        $.confirm({
            title: '提示',
            content: '导出数据量较大，页面导出仅支持最多10000条数据的导出，如果要全部导出，请联系系统管理员',
            buttons: {
                确定: function () {
                    window.location.href=host+'/xfPerson/info/exportXfPerson?pageno=0&size=10000&name='+$('#xf_name').val()+
                        '&cardno='+$('#xf_sfzh').val()+
                        '&nation='+mz+
                        '&beginTime='+$('#xf_start').val()+
                        '&endTime='+$('#xf_end').val()+
                        '&areacode='+huji+ 
                        '&stationname='+jcz+
                        '&dubious='+yj+
                        '&dubious2='+$("#xf_yj").val();
                },
                取消: function () {
                   
                },
            }
        })
    }else{
        window.location.href=host+'/xfPerson/info/exportXfPerson?pageno=0&size=10000&name='+$('#xf_name').val()+
            '&cardno='+$('#xf_sfzh').val()+
            '&nation='+mz+
            '&beginTime='+$('#xf_start').val()+
            '&endTime='+$('#xf_end').val()+
            '&areacode='+huji+ 
            '&stationname='+jcz+
            '&dubious='+yj+
            '&dubious2='+$("#xf_yj").val();
    }
});

/**
 * 分页器查询
 * @param pageIndex 当前页数
 * @param pageSize 每页显示条数
 */
 rchcIp
function pagipationQuery(pageIndex,pageSize, pagination){
    // 查询数据
    //结束时间
    //var endTime = "&endTime="+$("#reservation").val().split(",")[1];
    //var size1=pageSize;
    var huji=shirt('hjdqh');
    var keng ="";
    if($("#rybq").find("option:selected").attr('tid')){
        keng = $("#rybq").find("option:selected").attr('tid');
    }
    Post("/personcheck/info/findpageCompare",$.param({
    	name:$('#bhlr_xm').val(),
        idcardNo:$('#bhlr_sfzh').val(),
        national:$('#bhlr_mz').val(),
        beginTime:$('#hlsj_start').val(),
        endTime:$('#hlsj_end').val(),
        ucode:getUcode('citySel','ucodeName'),
        addressDetails:huji,
        policeName:$('#hlr').val(),
        pcode:     $("#jyh").val(),
        checkAddress:$('#hldd').val(),
        checkSource:$('#hcly').val(),
        personif:$("#yj").val(),
        ryhcTag2:$("#yjlx").val(),
        ryhcTag:keng,
        personneltype:$("#rylx").val(),
    	pageno: pageIndex,
    	size: pageSize
        
        
        
    }), function (data) {
        var htmlobj="";
        $("#tableBody").empty();
        count=data.result.length;
        if(data.result && data.result.length > 0 ) {
            exportTotal = data.total;
            $.each(data.result, function (index, item) {
                var tags = '';

                if(item.ryhcTag.indexOf("无背景")>-1||item.ryhcTag.indexOf("无资料")>-1||item.ryhcTag==''){
                     tags = "<span class='btn btn-success'>无背景</span>";
                }else if(item.ryhcTag&&item.ryhcTag!=''){
                     $.each(item.ryhcTag.split(','), function(index1, item1){
                         tags += "<span class='btn btn-danger'>"+dataJx(item1,rybqMap,'')+"</span>";
                     });
                }

                var led = '';
                if (item.ryhcFlag== 1) {
                    led ="<img src='../images/waring.png' style='width:26px;height:auto'>";
                }
                $("#tableBody").append(
                    "<tr>"+
                    "<td>"+led+"</td>"+
                    "<td class='aa lineh' title='"+(item.name==undefined?'':item.name)+"'>"+(item.name==undefined?'':item.name)+"</td>"+
                    "<td ><a class='btn-da aa lineh' title='"+(item.idcardNo==undefined?'':item.idcardNo)+"'>"+(item.idcardNo==undefined?'':item.idcardNo)+"</a></td>"+
                    "<td class='aa lineh' title='"+(dataJx(item.sex,xb))+"'>"+(dataJx(item.sex,xb))+"</td>"+
                    /*"<td class='aa lineh' title='"+(item.idcardNo==undefined?'':item.idcardNo.substr(6,8))+"'>"+(item.idcardNo==undefined?'':item.idcardNo.substr(6,8))+"</td>"+*/
                    "<td class='aa lineh' title='"+(dataJx(item.national,mzMap))+"'>"+(dataJx(item.national,mzMap))+"</td>"+
                    "<td class='aa lineh' title='"+(item.domicile==null?'':item.domicile)+"'>"+(item.domicile==null?'':item.domicile)+"</td>"+
                    "<td class='aa lineh' title='"+(item.checkTime==undefined?'':item.checkTime)+"'>"+(item.checkTime==undefined?'':item.checkTime)+"</td>"+
                    "<td class='aa lineh' title='"+(dataJx(item.checkAddress,nmXzqhMap))+"'>"+(dataJx(item.checkAddress,nmXzqhMap))+"</td>"+
                    "<td class='aa lineh' title='"+(dataJx(item.ucode,dwdm))+"'>"+(dataJx(item.ucode,dwdm))+"</td>"+
                    "<td class='aa lineh' title='"+(item.checkReason==undefined?'':item.checkReason)+"'>"+(item.checkReason==undefined?'':item.checkReason)+"</td>"+
                    "<td class='aa lineh' title='"+(item.checkSource==undefined?'':item.checkSource)+"'>"+(item.checkSource==undefined?'':item.checkSource)+"</td>"+
                    "<td class='aa lineh' title='"+(item.policeName == undefined ? '':item.policeName)+"'>"+(item.policeName == undefined ? '':item.policeName)+"</td>"+
                    "<td class='aa lineh' title='"+(item.pcode==undefined?'':item.pcode)+"'>"+(item.pcode==undefined?'':item.pcode)+"</td>"+
                    "<td class='aa lineh' title='"+(item.policePhone==undefined?'':item.policePhone)+"'>"+(item.policePhone==undefined?'':item.policePhone)+"</td>"+
                    "<td class='ryTag aa' style='overflow:auto' idn='"+item.idcardNo+"'>"+tags+"</td>"+
                    "<td class='aa lineh' title='"+(item.personneltype==undefined?'':item.personneltype)+"'>"+(item.personneltype==undefined?'':item.personneltype)+"</td>"+
                    // "<td><a href='#' class='fuck lineh' idcardNo="+(item.idcardNo==undefined?'':item.idcardNo)+">地图</a></td>"+
                    "<td tid='"+item.idcardNo+"'><img title='关系研判' class='cz btn-gxyp' src='../img/gxyp.png'>&nbsp;<img title='背景审查' class='cz btn-bjhc' src='../img/bjsc.png'>&nbsp;<img title='查看' class='cz see' data='"+JSON.stringify(item)+"' src='../img/ck.png'>&nbsp;<img title='地图' idcardNo="+(item.idcardNo==undefined?'':item.idcardNo)+" class='cz fuck lineh' src='../img/dt.png'></td>"+
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
        $(".ryTag").mCustomScrollbar({
             axis:"x", // horizontal scrollbar
             theme:'minimal-dark'
        });
		pagination && pagination(data);
        
    })
    //pagination(data);
}
function pagipationQuerylte(pageIndex,pageSize, pagination){
    // 查询数据
    //结束时间
    //var endTime = "&endTime="+$("#reservation").val().split(",")[1];
    //var size1=pageSize;
    var huji=shirt('hjdqh-lte');
    var keng ="";
    if($("#rybq").find("option:selected").attr('tid')){
        keng = $("#rybq").find("option:selected").attr('tid');
    }
    Post("/personcheck/info/findpageCompare",$.param({
        name:$('#bhlr_xm-lte').val(),
        idcardNo:$('#bhlr_sfzh-lte').val(),
        national:$('#lte_mz').val(),
        beginTime:$('#hlsj_start-lte').val(),
        endTime:$('#hlsj_end-lte').val(),
        ucode:getUcode('citySel-lte','ucodeName-lte'),
        addressDetails:huji,
        policeName:$('#hlr-lte').val(),
        pcode:     $("#jyh-lte").val(),
        checkAddress:$('#hldd-lte').val(),
        checkSource:$('#hcly-lte').val(),
        personif:$("#yj-lte").val(),
        ryhcTag2:$("#yjlx-lte").val(),
        ryhcTag:keng,
        personneltype:$("#rylx-lte").val(),
        pageno: pageIndex,
        size: pageSize
        
        
        
    }), function (data) {
        var htmlobj="";
        $("#tableBody-lte").empty();
        count=data.result.length;
        if(data.result && data.result.length > 0 ) {
            exportTotalLte = data.total;
            $.each(data.result, function (index, item) {
                var tags = '';

                if(item.ryhcTag.indexOf("无背景")>-1||item.ryhcTag.indexOf("无资料")>-1||item.ryhcTag==''){
                     tags = "<span class='btn btn-success'>无背景</span>";
                }else if(item.ryhcTag&&item.ryhcTag!=''){
                     $.each(item.ryhcTag.split(','), function(index1, item1){
                         tags += "<span class='btn btn-danger'>"+dataJx(item1,rybqMap,'')+"</span>";
                     });
                }

                var led = '';
                if (item.ryhcFlag== 1) {
                    led ="<img src='../images/waring.png' style='width:26px;height:auto'>";
                }
                $("#tableBody-lte").append(
                    "<tr>"+
                    "<td>"+led+"</td>"+
                    "<td class='aa lineh' title='"+(item.name==undefined?'':item.name)+"'>"+(item.name==undefined?'':item.name)+"</td>"+
                    "<td ><a class='btn-da aa lineh' title='"+(item.idcardNo==undefined?'':item.idcardNo)+"'>"+(item.idcardNo==undefined?'':item.idcardNo)+"</a></td>"+
                    "<td class='aa lineh' title='"+(dataJx(item.sex,xb))+"'>"+(dataJx(item.sex,xb))+"</td>"+
                    /*"<td class='aa lineh' title='"+(item.idcardNo==undefined?'':item.idcardNo.substr(6,8))+"'>"+(item.idcardNo==undefined?'':item.idcardNo.substr(6,8))+"</td>"+*/
                    "<td class='aa lineh' title='"+(dataJx(item.national,mzMap))+"'>"+(dataJx(item.national,mzMap))+"</td>"+
                    "<td class='aa lineh' title='"+(item.domicile==null?'':item.domicile)+"'>"+(item.domicile==null?'':item.domicile)+"</td>"+
                    "<td class='aa lineh' title='"+(item.checkTime==undefined?'':item.checkTime)+"'>"+(item.checkTime==undefined?'':item.checkTime)+"</td>"+
                    "<td class='aa lineh' title='"+(dataJx(item.checkAddress,nmXzqhMap))+"'>"+(dataJx(item.checkAddress,nmXzqhMap))+"</td>"+
                    "<td class='aa lineh' title='"+(dataJx(item.ucode,dwdm))+"'>"+(dataJx(item.ucode,dwdm))+"</td>"+
                    "<td class='aa lineh' title='"+(item.checkReason==undefined?'':item.checkReason)+"'>"+(item.checkReason==undefined?'':item.checkReason)+"</td>"+
                    "<td class='aa lineh' title='"+(item.checkSource==undefined?'':item.checkSource)+"'>"+(item.checkSource==undefined?'':item.checkSource)+"</td>"+
                    "<td class='aa lineh' title='"+(item.policeName == undefined ? '':item.policeName)+"'>"+(item.policeName == undefined ? '':item.policeName)+"</td>"+
                    "<td class='aa lineh' title='"+(item.pcode==undefined?'':item.pcode)+"'>"+(item.pcode==undefined?'':item.pcode)+"</td>"+
                    "<td class='aa lineh' title='"+(item.policePhone==undefined?'':item.policePhone)+"'>"+(item.policePhone==undefined?'':item.policePhone)+"</td>"+
                    "<td class='ryTag aa' style='overflow:auto' idn='"+item.idcardNo+"'>"+tags+"</td>"+
                    "<td class='aa lineh' title='"+(item.personneltype==undefined?'':item.personneltype)+"'>"+(item.personneltype==undefined?'':item.personneltype)+"</td>"+
                    // "<td><a href='#' class='fuck lineh' idcardNo="+(item.idcardNo==undefined?'':item.idcardNo)+">地图</a></td>"+
                    "<td tid='"+item.idcardNo+"'><img title='关系研判' class='cz btn-gxyp' src='../img/gxyp.png'>&nbsp;<img title='背景审查' class='cz btn-bjhc' src='../img/bjsc.png'>&nbsp;<img title='查看' class='cz see' data='"+JSON.stringify(item)+"' src='../img/ck.png'>&nbsp;<img title='地图' idcardNo="+(item.idcardNo==undefined?'':item.idcardNo)+" class='cz fuck-lte lineh' src='../img/dt.png'></td>"+
                    "</tr>"
                );
            });
        }
        else{
            $("#tableBody-lte").append(
                "<tr>"+
                "<td colspan='999'>"+ "搜索结果为空" + "</td>" +
                "</tr>"
            )
        }
        $(".ryTag").mCustomScrollbar({
             axis:"x", // horizontal scrollbar
             theme:'minimal-dark'
        });
        paginationlte && paginationlte(data);
        
    })
    //pagination(data);
}


function pagipationQueryxf(pageIndex,pageSize, paginationxf){
    // 查询数据
    //结束时间
    //var endTime = "&endTime="+$("#reservation").val().split(",")[1];
    //var size1=pageSize;
    var huji = "";
        var code = $('#xf_hjdqh').attr('code');
        if($('#xf_hjdqh').val() !=""){
               if(code){
               huji = $('#xf_hjdqh').attr('code')+"-"+$("#xf_hjdqh").val();
               }else{
               huji = 'null-'+$("#xf_hjdqh").val()
               }
        }else{
           huji=''
        }
    var jcz ='';
    var na = $("#xf_jcz").val();
    if ( na==''){
        jcz='';
    }else{
        jcz=na
    }
    var yj = '';
    var nas =  $("#xf_yjlx").val();
    if (nas=='') {
        yj=''
    }else{
        yj =nas;
    }
    var mz='';
    var gp =$("#xf_mz").find("option:selected").text();
    if(gp=='-全部-'){
        mz=''
    }else{
        mz = gp;
    }
    Post("/xfPerson/info/findpage",$.param({
        name:$('#xf_name').val(),
        cardno:$('#xf_sfzh').val(),
        nation:mz,
        beginTime:$('#xf_start').val(),
        endTime:$('#xf_end').val(),
        pageno: pageIndex,
        size: pageSize,
        areacode:huji,
        stationname:jcz,
        dubious:yj,
        dubious2:$("#xf_yj").val(),
        
        
        
    }), function (data) {
        var htmlobj="";
        $("#tableBody_xf").empty();
        console.info(data)
        count=data.content.length;
        if(data.content && data.content.length > 0 ) {
            exportTotalXf = data.totalElements;
            $.each(data.content, function (index, item) {
                var led = '';
                if (item.personif== 1) {
                    led ="<img src='../images/waring.png' style='width:26px;height:auto'>";
                }
                $("#tableBody_xf").append(
                    "<tr>"+
                    "<td class='aa lineh' >"+led+"</td>"+
                    "<td class='aa lineh' title='"+item.name+"'>"+item.name+"</td>"+
                    "<td class='aa lineh' title='"+item.cardno+"'>"+item.cardno+"</td>"+
                    "<td class='aa lineh' title='"+item.sex+"'>"+item.sex+"</td>"+
                    "<td class='aa lineh' title='"+item.birthday+"'>"+item.birthday+"</td>"+
                    "<td class='aa lineh' title='"+item.nation+"'>"+item.nation+"</td>"+
                    "<td class='aa lineh' title='"+item.areacode+"'>"+item.areacode+"</td>"+
                    "<td class='aa lineh' title='"+item.sysdate+"'>"+item.sysdate+"</td>"+
                    "<td class='aa lineh' title='"+item.dubious+"'>"+item.dubious+"</td>"+
                    "<td class='aa lineh' title='"+item.isdispatched+"'>"+item.isdispatched+"</td>"+
                    "<td class='aa lineh' title='"+item.checkresult+"'>"+item.checkresult+"</td>"+
                    "<td class='aa lineh' title='"+item.stationname+"'>"+item.stationname+"</td>"+
                    "<td class='aa lineh'  tid='"+item.cardno+"'><img title='关系研判' class='cz btn-gxyp' src='../img/gxyp.png'>&nbsp;<img title='背景审查' class='cz btn-bjhc' src='../img/bjsc.png'>&nbsp;<img title='查看' class='cz see' data='"+JSON.stringify(item)+"' src='../img/ck.png'>&nbsp</td>"+
                    
                     "</tr>"
                );
            });
        }
        else{
            $("#tableBody_xf").append(
                "<tr>"+
                "<td colspan='999'>"+ "搜索结果为空" + "</td>" +
                "</tr>"
            )
        }
        paginationxf && paginationxf(data);
        
    })
    //pagination(data);
}
/*标签详情*/
$(document).on('click','.ryTag span',function(){
    $('#myModal').modal('show');
    $('.modal-body').html('');
    $('#myModalLabel').html('');
    var idcardNo = $(this).parents('td').attr('idn');
    var tag = $(this).html();
    if(tag.indexOf("无背景")==-1){
        $.ajax({
            url: host+'/personcheck/info/findTag/'+idcardNo+'/'+tag,
            type: 'GET',
            dataType: 'json',
            success: function(data){
                 
                $('#myModalLabel').html(tag);
                $.each(data, function(index, item) {
                    var tagInfos = eval('(' + item.tagInfo + ')').fields;
                    $.each(tagInfos, function(index1, item1) {
                        item1 = brReg(item1);
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
                                 $('.modal-body').append('<span>'+index1+'：</span><span>'+(item2=="null"?'':item2)+'</span><br>'); 
                            }
                        }else{
                             $('.modal-body').append('<span>'+index1+'：</span><span>'+(item1=="null"?'':item1)+'</span><br>'); 

                        }
                    });
                    $('.modal-body').append('<span style="color:#3b72d2;">—————————————————————————————————</span>');
                    $('.modal-body').append('<br>');
                    
                });
            }
        });
    }else{
        $('.modal-body').html('无背景');
    }
    
});
$(document).on('click','.see',function(){
    var data = JSON.parse($(this).attr('data'));
    console.log(data);
    $('#myModal_see').modal('show');
    $('#tableBody_modal_see').html('');
    console.info(data.cardno);
    if(data.cardno){
        $('#tableBody_modal_see').append(
        '<tr><td>被核录人</td><td><span>'+data.name+'</span></td></tr>'+
        '<tr><td>身份证号</td><td><span>'+data.cardno+'</span></td></tr>'+
        '<tr><td>性别</td><td><span>'+data.sex+'</span></td></tr>'+
        '<tr><td>民族</td><td><span>'+data.nation+'</span></td></tr>'+
        '<tr><td>户籍地</td><td><span>'+data.areacode+'</span></td></tr>'+
        '<tr><td>进入时间</td><td><span>'+data.sysdate+'</span></td></tr>'+
        '<tr><td>信访单位</td><td><span>'+data.stationname+'</span></td></tr>'+
        '<tr><td>预警类型</td><td><span>'+data.dubious+'</span></td></tr>'+
        '<tr><td>是否为布控人员</td><td><span>'+data.isdispatched+'</span></td></tr>'+
        '<tr><td>比对状态</td><td><span>'+data.checkresult+'</span></td></tr>'

        )
    }

        if(data.idcardNo){
        $('#tableBody_modal_see').append(
        '<tr><td>被核录人</td><td><span>'+data.name+'</span></td></tr>'+
        '<tr><td>身份证号</td><td><span>'+data.idcardNo+'</span></td></tr>'+
        '<tr><td>人员类型</td><td><span>'+(data.personneltype==undefined?'':data.personneltype)+'</span></td></tr>'+
        '<tr><td>性别</td><td><span>'+(dataJx(data.sex,xb))+'</span></td></tr>'+
        '<tr><td>民族</td><td><span>'+(dataJx(data.national,mzMap))+'</span></td></tr>'+
        '<tr><td>户籍地</td><td><span>'+(data.domicile==null?'':data.domicile)+'</span></td></tr>'+
        '<tr><td>核查时间</td><td><span>'+data.checkTime+'</span></td></tr>'+
        '<tr><td>核查地点</td><td><span>'+(dataJx(data.checkAddress,nmXzqhMap))+'</span></td></tr>'+
        '<tr><td>核查单位</td><td><span>'+(dataJx(data.ucode,dwdm))+'</span></td></tr>'+
        '<tr><td>核录原因</td><td><span>'+(data.checkReason==undefined?'':data.checkReason)+'</span></td></tr>'+
        '<tr><td>核查来源</td><td><span>'+(data.checkSource==undefined?'':data.checkSource)+'</span></td></tr>'+
        '<tr><td>警员姓名</td><td><span>'+data.policeName+'</span></td></tr>'+
        '<tr><td>警员警号</td><td><span>'+data.pcode+'</span></td></tr>'+
        '<tr><td>警员手机号</td><td><span>'+data.policePhone+'</span></td></tr>'
    );
    }
    if(data.fcardnum){
            $('#tableBody_modal_see').append(
            '<tr><td>姓名</td><td><span>'+data.fname+'</span></td></tr>'+
            '<tr><td>身份证号</td><td><span>'+data.fcardnum+'</span></td></tr>'+
            '<tr><td>民族</td><td><span>'+data.fnation+'</span></td></tr>'+
            '<tr><td>数据来源</td><td><span>'+data.sjly+'</span></td></tr>'+
            '<tr><td>登记时间</td><td><span>'+data.sysdate+'</span></td></tr>'+
            '<tr><td>登记人</td><td><span>'+data.fregperson+'</span></td></tr>'+
            '<tr><td>住址</td><td><span>'+data.faddress+'</span></td></tr>'
        );
    }
    
});

$(document).on('click', '#daomap', function(event) {
    gomap("reload");  
});
$(document).on('click', '#daomap-lte', function(event) {
    gomaplte("reload");  
});
$(document).on('click', '.fuck', function(event) {
    console.info(this);
    var no = $(this).attr('idcardNo');
    gomap(no);
    /* Act on the event */
});
$(document).on('click', '.fuck-lte', function(event) {
    console.info(this);
    var no = $(this).attr('idcardNo');
    gomaplte(no);
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
function gomaplte(data){
     if(data =="reload"){
         var text = $("#daomap-lte").html();
      var startTime,endTime
      if (text=="到地图") {
        $(".tableall").addClass('animated bounceOutLeft');
        $("#daomap-lte").html("到表格")
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
        $("#daomap-lte").html("到地图");
        $(".map").addClass('bounceOutLeft');
        $(".map").css('display', 'none');
        setTimeout(function(){
        $(".map").removeClass('bounceOutLeft');
        $(".tableall").css('display', 'block');
         $(".tableall").addClass('bounceInRight');
        },500)
    };
   

     }else{
     var text = $("#daomap-lte").html();
      var startTime,endTime
      if (text=="到地图") {
        $(".tableall").addClass('animated bounceOutLeft');
        $("#daomap-lte").html("到表格")
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
        $("#daomap-lte").html("到地图");
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
                url: hosturl+"/personcheck/info/findByIdcardNo/"+data,
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
                        src: '../images/hotspot.png',
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
                        var strHTML1 = '<p>名字:</br>'+data[i].name+'</p><p>性别:'+(data[i].sex==1?'男':'女')+'</p><p>身份证号:</br>'+data[i].idcardNo+'<p>警员:</br>'+data[i].policeName+'<p>';
                        marker.openInfoWindow(strHTML1)
                    }
                    }
                   
                }
              }
           }
        },map);  
        } 
}