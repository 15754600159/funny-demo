var exportTotalZj;
$(document).ready(function($) {
    initSelect('fnation',mzMap);
    sortMZ('fnation');
    initSelect('hldd-zj',hsXzqhMap);
    initSelect('rylx-zj',libCode);
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
        

// $("#beginTime").val(now());
// $("#endTime").val(lastweek());
$("#search-ry-zj").bind('click', function () {
    var a =  timechuo($('#beginTime').val(),$('#endTime').val()); 
    if(a ==1){
        return
    }
    pagipationQueryZj(0,10,paginationzj);
});
pagipationQueryZj(0,10,paginationzj);
$(".map").css('display', 'none');
//mapload();
//select();
//$(".map").css('display', 'none');
});

/*关系研判*/
/*$(document).on('click','.btn-gxyp',function(){
    var data = $(this).parent('td').attr('tid');
    //console.log(data)
    //console.log(userNo)
    window.open('http://yp.hsga.nn/core.html?username='+userNo+'#!scopa/graph/key/'+data);
});*/
/*背景审查*/
/*$(document).on('click','.btn-bjhc',function(){
    var data = $(this).parent('td').attr('tid');
    console.log(data)
    console.log(userNo)
    window.open('http://10.101.139.21:8777/subview/taskDetail.html?'+data);
});*/
/*档案*/
/*$(document).on('click','.btn-da',function(){
    
    var data = $(this).html();
    // console.log(data)
    // console.log(userNo)
    window.open('http://yp.hsga.nn/core.html?username='+userNo+'#!scopa/file/key/'+data);
});*/



/**
 * 分页控件
 * @param total
 */
 function selectzj(){
    $.ajax({
        url: host+'/importantPersonCategory/listCategory',
        type: 'get',
        dataType: 'json',
    })
    .done(function(data) {
        var list="<option value=''>-全部-</option>";
        for (var i = 0; i < data.length; i++) {
             list+="<option value='"+data[i].code+"'>"+data[i].name+"</option>";
           
        }
         $("#rybq-zj").html(list);
    })
    .fail(function() {
        console.log("error");
    })
    .always(function() {
        console.log("complete");
    });
    
}
function changezj(a){
    console.info(a);
    $.ajax({
        url: host+'/importantPersonCategory/listCategoryByCode?code='+a,
        type: 'get',
        dataType: 'json',
    })
    .done(function(data) {
        console.log(data[0].name);
        $("#rybq-zj").attr('code', a);
         var list="<option value=''>-全部-</option>";
        for (var i = 0; i < data.length; i++) {
             list+="<option value='"+data[i].code+"'>"+data[i].name+"</option>";
           
        }
         $("#rylb-zj").html(list);
    })
    .fail(function() {
        console.log("error");
    })
    .always(function() {
        console.log("complete");
    });
    
}
function xichangezj(a){
    console.info(a);
    $("#rylb-zj").attr('code', a);
    }

function paginationzj(data) {
    BootstrapPagination(
        $("#pagination-zj"), {
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
            pagipationQueryZj(pageIndex,pageSize,paginationzj);
        },
    });
}


/**
 * 分页器查询
 * @param pageIndex 当前页数
 * @param pageSize 每页显示条数
 */
function pagipationQueryZj(pageIndex,pageSize, paginationzj){
    // 查询数据
    //结束时间
    //var endTime = "&endTime="+$("#reservation").val().split(",")[1];
    //var size1=pageSize;
    var huji=shirt('fregion');
    if($('#forgid').attr('code')){
        var zzjg = $('#forgid').attr('code').split('-')[0];
    }else{
        var zzjg = '';
    }
    
    
    Post("/zaPerson/info/findpagetable",$.param({           
    	fname:$('#fname').val(),
        fnation:$('#fnation').val(),
        fcardtype:$('#fcardtype').val(),
        fcardnum:$('#fcardnum').val(),
        fregion:huji,
        faddress:$('#faddress').val(),
        fregperson:$('#fregperson').val(),
        beginTime:$('#beginTime').val(),
        endTime:$('#endTime').val(),
        forgid:zzjg,
        fcollecttype:$('#fcollecttype').val(),
        sjly:$('#sjly').val(),
        flibcode:$('#rylx-zj').val(),
        jczbs:$('#jczbs').val(),
    	pageno: pageIndex,
    	size: pageSize
    }), function (data) {
        var htmlobj="";
        $("#tableBody-zj").empty();
        count=data.content.length;
        if(data.content && data.content.length > 0 ) {
            exportTotalZj = data.totalElements;
            $.each(data.content, function (index, item) {
                $("#tableBody-zj").append(
                    "<tr>"+
                    "<td class='aa lineh' title='"+(item.fname==undefined?'':item.fname)+"'>"+(item.fname==undefined?'':item.fname)+"</td>"+
                    "<td ><a class='btn-da aa lineh' title='"+(item.fcardnum==undefined?'':item.fcardnum)+"'>"+(item.fcardnum==undefined?'':item.fcardnum)+"</a></td>"+
                    "<td class='aa lineh' title='"+item.fnation+"'>"+item.fnation+"</td>"+
                    "<td class='aa lineh' title='"+item.fcardtype+"'>"+item.fcardtype+"</td>"+
                    "<td class='aa lineh' title='"+item.fcollecttype+"'>"+item.fcollecttype+"</td>"+
                    "<td class='aa lineh' title='"+item.sjly+"'>"+item.sjly+"</td>"+
                    "<td class='aa lineh' title='"+item.sysdate+"'>"+item.sysdate+"</td>"+
                    "<td class='aa lineh' title='"+(item.faddress == undefined ? '':item.faddress)+"'>"+(item.faddress == undefined ? '':item.faddress)+"</td>"+
                    "<td class='aa lineh' title='"+(item.fregperson==undefined?'':item.fregperson)+"'>"+(item.fregperson==undefined?'':item.fregperson)+"</td>"+
                    "<td class='aa lineh' title='"+(item.forgid==undefined?'':item.forgid)+"'>"+(item.forgid==undefined?'':item.forgid)+"</td>"+
                    "<td class='aa lineh' title='"+(item.fregion==undefined?'':item.fregion)+"'>"+(item.fregion==undefined?'':item.fregion)+"</td>"+
                    "<td class='aa lineh' title='"+(item.flibcode==undefined?'':item.flibcode)+"'>"+(item.flibcode==undefined?'':item.flibcode)+"</td>"+
                    "<td class='aa lineh' title='"+(item.jczbs==undefined?'':item.jczbs)+"'>"+(item.jczbs==undefined?'':item.jczbs)+"</td>"+
                    
                    "<td tid='"+(item.fcardnum==undefined?'':item.fcardnum)+"'><img title='关系研判' class='cz btn-gxyp' src='../img/gxyp.png'>&nbsp;<img title='背景审查' class='cz btn-bjhc' src='../img/bjsc.png'>&nbsp;<img title='查看' class='cz see' data='"+JSON.stringify(item)+"' src='../img/ck.png'>&nbsp;</td>"+
                    "</tr>"
                );
            });
        }
        else{
            $("#tableBody-zj").append(
                "<tr>"+
                "<td colspan='999'>"+ "搜索结果为空" + "</td>" +
                "</tr>"
            )
        }
		paginationzj && paginationzj(data);
        
    })
    //pagination(data);
}

$(document).on("click", "#export-zj", function() {
        var huji=shirt('fregion');
         if($('#forgid').attr('code')){
            var zzjg = $('#forgid').attr('code').split('-')[0];
        }else{
            var zzjg = '';
        }
         if(exportTotalZj>10000){
            $.confirm({
                title: '提示',
                content: '导出数据量较大，页面导出仅支持最多10000条数据的导出，如果要全部导出，请联系系统管理员',
                buttons: {
                    确定: function () {
                        window.location.href=host+'/zaPerson/info/exportZaPerson?pageno=0&size=10000'+
                            '&fname='+$('#fname').val()+
                            '&fnation='+$('#fnation').val()+
                            '&fcardtype='+$('#fcardtype').val()+
                            '&fcardnum='+$('#fcardnum').val()+
                            '&fregion='+huji+
                            '&faddress='+$('#faddress').val()+
                            '&fregperson='+$('#fregperson').val()+
                            '&beginTime='+$('#beginTime').val()+
                            '&endTime='+$('#endTime').val()+
                            '&forgid='+zzjg+
                            '&fcollecttype='+$('#fcollecttype').val()+
                            '&sjly='+$('#sjly').val()+
                            '&flibcode='+$('#rylx-zj').val()+
                            '&jczbs='+$('#jczbs').val();
                    },
                    取消: function () {
                       
                    },
                }
            })
        }else{
            window.location.href=host+'/zaPerson/info/exportZaPerson?pageno=0&size=10000'+
                            '&fname='+$('#fname').val()+
                            '&fnation='+$('#fnation').val()+
                            '&fcardtype='+$('#fcardtype').val()+
                            '&fcardnum='+$('#fcardnum').val()+
                            '&fregion='+huji+
                            '&faddress='+$('#faddress').val()+
                            '&fregperson='+$('#fregperson').val()+
                            '&beginTime='+$('#beginTime').val()+
                            '&endTime='+$('#endTime').val()+
                            '&forgid='+zzjg+
                            '&fcollecttype='+$('#fcollecttype').val()+
                            '&sjly='+$('#sjly').val()+
                            '&flibcode='+$('#rylx-zj').val()+
                            '&jczbs='+$('#jczbs').val();
        }
});