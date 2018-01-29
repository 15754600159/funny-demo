var exportTotal;
var requestUrl = {
    upload: host + '/localcar/info/check'
};

$(document).ready(function($) {
    // initSelect('cllx',cllxMap);
	initPlateTypeSelect();
    select();
    $("#drsj_start").val(lastweek())
    $("#drsj_end").val(now())
    //绑定查询按钮事件
    $("#search-bdry").bind('click', function () {
        var a =  timechuo($('#cl_startTime').val(),$('#cl_endTime').val());
        if(a ==1){
            return
        }
        pagipationQuery(1,10,pagination);
    });
    pagipationQuery(1,10,pagination);

    // 重置按钮功能
    $('.serach-tab input[type="reset"]').on('click', function(){
        // 还原之前的时间
        setTimeout(function(){
            $("#drsj_start").val(lastweek());
            $("#drsj_end").val(now());
        }, 10)
    })

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

    $('#import-cl').off('click').on('click', function () {
        $('.error').addClass('hide');
    });
    /*导入确定按钮*/
    $('.import-cl-ok').off('click').on('click', function () {
        var excelname = $('#excel-import').val();
        if (excelname!= '') {
            var reg = /^.*\.(?:xls|xlsx)$/i;//文件名可以带空格
            if (!reg.test(excelname)) {//校验不通过
                alert("请上传excel格式的文件!");
                return;
            }
        }else{
            $('.error').removeClass('hide');
            return;
        }
        $('form.uploadfj').ajaxSubmit({
            url: requestUrl.upload,
            type: 'POST',
            data:{'importNo':userNo,'importName':userName},
            dataType: 'json',
            success: function (result) {
                if(result.msg=='上传成功'){
                    $('#myModal').modal('hide');
                    location.reload(); 
                }else{
                    alert('导入失败');
                }
            },
            error: function (result) {
               
            }
        });
    });
    /*下载模板*/
    $('#download-cl').off('click').on('click', function () {
        location.href = 'http://'+location.host + '/rchcReview/template/carImport.xlsx';
         
    });


});

function initPlateTypeSelect(){
	 $.ajax({
        url: host+'/localcar/info/listPlateType',
        type: 'get',
        dataType: 'json'
    })
    .done(function(data) {
        console.info(data)
        var list="<option value=''>-全部-</option>";
        /*for (var i = 0; i < data.length; i++) {
             
           
        }*/
        $.each(data, function(index, val) {
             /* iterate through array or object */
             list+="<option value='"+index+"'>"+val+"</option>";
        });
        $("#cllx").html(list);
    });
}

/*撤销恢复方法*/
$(document).on('click','.cxSign',function(){
    var text = $(this).attr('title');
    var btn = $(this);

    var impNo = $(this).attr('no');
    var impNa = $(this).attr('na');
    var tid = $(this).attr('tid');
    if(text=="撤销"){
        $.confirm({
            title: '提示',
            content: '确定撤销吗?',
            buttons: {
                确定: function () {
                    Post("/localcar/info/update",
                        $.param({
                            id:tid,  
                            currentUserNo:userNo,
                            currentUserName:userName,             
                            importNo:impNo,    
                            importName:impNa
                        }),
                        function(data){
                            //{"success":0,"msg":"更新失败"},{"success":1,"msg":"更新成功"}
                            if(data.success==0){
                                alert(data.msg);
                            }else if(data.success==1){
                                console.log(data.msg);
                                btn.attr('title','恢复');
                                btn.attr('src','../img/hf.png');
                                console.log(btn.html());
                            }

                        }
                    );
                },
                取消: function () {
                   
                },
            }
        })
    }else{
        $.confirm({
            title: '提示',
            content: '确定恢复吗?',
            buttons: {
                确定: function () {
                    Post("/localcar/info/updateReset",
                        $.param({
                            id:tid,  
                            currentUserNo:userNo,
                            currentUserName:userName,             
                            importNo:impNo,    
                            importName:impNa
                        }),
                        function(data){
                            if(data.success==0){
                                alert(data.msg);
                            }else if(data.success==1){
                                console.log(data.msg);
                                btn.attr('title','撤销');
                                btn.attr('src','../img/cx.png');
                                console.log(btn.html());
                            }
                        }
                    );
                },
                取消: function () {
                   
                },
            }
        })

    }

});
/*修改方法*/
$(document).on('click','.alert_cl',function(){

    var data = JSON.parse($(this).attr('data'));

    $('#tableBody_modal2').attr('tid',data.id);

    $('#xm_a').val(data.ownerName);
    $('#sfzh_a').val(data.ownerIdcardNo);

    $('#cph_a').val(data.plateNo);
    $('#cllx_a').val(data.plateType);
    $('#zwppmc_a').val(data.chinaCarBrand);

    $('#hjdq_a').val(data.hjdqPlace);
    $('#hjdxz_a').val(data.hjdqAddress);
    $('#xzdq_a').val(data.xzPlace);
    $('#sy_a').val(data.reason);
    $('#czyq_a').val(data.dealRequest);
    $('#sjlx_a').val(data.dataType);
    $('#bdzq_a').val(data.bdEndtime);
    $('#myModal2').modal('show');

});

$(document).on('click','#alert_ok',function(){
    var id_a = $('#tableBody_modal2').attr('tid');

    var sfzh_a = $('#sfzh_a').val();
    var xm_a = $('#xm_a').val();
    var cph_a = $('#cph_a').val();
    var cllx_a = $('#cllx_a').val();
    var zwppmc_a = $('#zwppmc_a').val();
    var hjdq_a = $('#hjdq_a').val();
    var hjdxz_a = $('#hjdxz_a').val();
    var xzdq_a = $('#xzdq_a').val();
    var sy_a = $('#sy_a').val();
    var czyq_a = $('#czyq_a').val();
    var sjlx_a = $('#sjlx_a').val();
    var bdzq_a = $('#bdzq_a').val();

    Post("/localcar/info/updateCar",$.param({
        id:id_a,
        name:xm_a,
        idcardNo:sfzh_a,
        plateNo:cph_a,
        plateType:cllx_a,
        chinaCarBrand:zwppmc_a,
        hjdqPlace:hjdq_a,
        hjdqAddress:hjdxz_a,
        xzPlace:xzdq_a,
        reason:sy_a,
        dealRequest:czyq_a,
        dataType:sjlx_a,
        bdEndtime:bdzq_a
    }), function (data) {
        //{"success":1,"msg":"更新成功"}
        if(data.success==0){
            alert(data.msg);
        }else if(data.success==1){
            console.log(data.msg);
            $('#myModal2').modal('hide');
            location.reload();
        }

    });

});

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



$(document).on('click','#export-bdcl',function(){
        if(exportTotal>10000){
        $.confirm({
            title: '提示',
            content: '导出数据量较大，页面导出仅支持最多10000条数据的导出，如果要全部导出，请联系系统管理员',
            buttons: {
                确定: function () {
                        window.location.href=host+'/localcar/info/export?pageno=1&size=10000'+
                                '&names='+$('#bhr_xm').val()+
                                '&idcardNo='+$('#bhlr_sfzh').val()+
                                '&plateNo='+$('#cph').val()+
                                '&plateType='+$('#cllx').val()+
                                '&dataType='+$('#gzlx').val()+
                                '&beginTime='+$('#drsj_start').val()+
                                '&endTime='+$('#drsj_end').val()+
                                '&importName='+$("#drr_xm").val()+
                                '&reason='+$("#clgzlx").val()+
                                '&currentUserNo='+userNo;
                },
                取消: function () {
                   
                },
            }
        })
    }else{
            window.location.href=host+'/localcar/info/export?pageno=1&size=10000'+
                                '&names='+$('#bhr_xm').val()+
                                '&idcardNo='+$('#bhlr_sfzh').val()+
                                '&plateNo='+$('#cph').val()+
                                '&plateType='+$('#cllx').val()+
                                '&dataType='+$('#gzlx').val()+
                                '&beginTime='+$('#drsj_start').val()+
                                '&endTime='+$('#drsj_end').val()+
                                '&importName='+$("#drr_xm").val()+
                                '&reason='+$("#clgzlx").val()+
                                '&currentUserNo='+userNo;
    }
});
/**
 * 分页器查询
 * @param pageIndex 当前页数
 * @param pageSize 每页显示条数
 */
function pagipationQuery(pageIndex,pageSize, pagination){
    Post("/localcar/info/findpage",$.param({
        names:     $('#bhr_xm').val(),
        idcardNo:  $('#bhlr_sfzh').val(),
        plateNo:   $('#cph').val(),
        plateType: $('#cllx').val(),
        dataType:  $('#gzlx').val(),
        beginTime: $('#drsj_start').val(),
        endTime:   $('#drsj_end').val(),
        importName:$("#drr_xm").val(),
        reason:    $("#clgzlx").val(),
        pageno:      pageIndex, 
        size:        pageSize,
        currentUserNo:userNo
    }), function (data) {
        var htmlobj="";
        $("#tableBody").empty();
        $("#ckAll").prop("checked",false); 
        count=data.result.length;
        if(data.result && data.result.length > 0 ) {
            exportTotal = data.total;
            $.each(data.result, function (index, item) {
                 var check = '';
                 var roleName='';
                if(sessionStorage.user){
                    roleName = JSON.parse(sessionStorage.user).roles[0].name;
                }
                if(item.importNo==userNo||roleName =='超级管理员'){
                   check = "<input  type='checkbox' value='"+item.id+"' name='sub'>";
                }else{
                    check =''
                }
                $("#tableBody").append(
                    "<tr>"+
                    "<td class='aa lineh'>"+check+"</td>"+
                    "<td class='aa' title='"+(item.dataType==undefined?'':item.dataType)+"'>"+(item.dataType==undefined?'':item.dataType)+"</td>"+
                    "<td class='aa' title='"+(item.reason==undefined?'':item.reason)+"'>"+(item.reason==undefined?'':item.reason)+"</td>"+
                    "<td class='aa' title='"+(item.ownerName==undefined?'':item.ownerName)+"'>"+(item.ownerName==undefined?'':item.ownerName)+"</td>"+
                    "<td class='aa' title='"+(item.ownerIdcardNo==undefined?'':item.ownerIdcardNo)+"'>"+(item.ownerIdcardNo==undefined?'':item.ownerIdcardNo)+"</td>"+
                    "<td class='aa' title='"+(item.plateNo==undefined?'':item.plateNo)+"'>"+(item.plateNo==undefined?'':item.plateNo)+"</td>"+
                    "<td class='aa' title='"+(item.plateType==undefined?'':item.plateType)+"'>"+(item.plateType==undefined?'':item.plateType)+"</td>"+
                    // "<td class='aa' title='"+(item.chinaCarBrand==undefined?'':item.chinaCarBrand)+"'>"+(item.chinaCarBrand==undefined?'':item.chinaCarBrand)+"</td>"+
                    "<td class='aa' title='"+(item.hjdqPlace==undefined?'':item.hjdqPlace)+"'>"+(item.hjdqPlace==undefined?'':item.hjdqPlace)+"</td>"+
                    "<td class='aa' title='"+(item.hjdqAddress==undefined?'':item.hjdqAddress)+"'>"+(item.hjdqAddress==undefined?'':item.hjdqAddress)+"</td>"+
                    "<td class='aa' title='"+(item.xzPlace==undefined?'':item.xzPlace)+"'>"+(item.xzPlace==undefined?'':item.xzPlace)+"</td>"+
                    "<td class='aa' title='"+(item.reason==undefined?'':item.reason)+"'>"+(item.reason==undefined?'':item.reason)+"</td>"+
                    "<td class='aa' title='"+(item.dealRequest==undefined?'':item.dealRequest)+"'>"+(item.dealRequest==undefined?'':item.dealRequest)+"</td>"+
                    "<td class='aa' title='"+(item.bdEndtime==undefined?'':item.bdEndtime)+"'>"+(item.bdEndtime==undefined?'':item.bdEndtime)+"</td>"+
                    "<td class='aa' title='"+(item.importName==undefined?'':item.importName)+"'>"+(item.importName==undefined?'':item.importName)+"</td>"+
                    "<td class='aa' title='"+(item.importTime==undefined?'':item.importTime)+"'>"+(item.importTime==undefined?'':item.importTime)+"</td>"+
                    "<td class='aa'>"+
                    "<img title='"+(item.cxSign==0?'撤销':'恢复')+"' class='cz cxSign"+(role(item.importNo))+"' no='"+item.importNo+"' na='"+item.importName+"' tid='"+item.id+"' src='"+(item.cxSign==0?'../img/cx.png':'../img/hf.png')+"'>&nbsp;"+
                    "<img title='修改' src='../img/bj.png' class='cz alert_cl"+(role(item.importNo))+"' data='"+JSON.stringify(item)+"'>"+
                    "&nbsp;<img title='查看' class='cz see' data='"+JSON.stringify(item)+"' src='../img/ck.png'>"+
                    "</td>"+

                    //<button class='cxSign"+(role(item.importNo))+"' no='"+item.importNo+"' na='"+item.importName+"' tid='"+item.id+"'>"+(item.cxSign==0?'撤销':'恢复')+"</button>"+
                    //"<button class='alert_cl"+(role(item.importNo))+"' data='"+JSON.stringify(item)+"'>修改</button>"+
                    //"<button class='see' data='"+JSON.stringify(item)+"'>查看</button>"+
                    //"</td>"+
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
    })
}

$(document).on('click','.see',function(){
    var data = JSON.parse($(this).attr('data'));
    console.log(data);
    $('#myModal_see').modal('show');
    $('#tableBody_modal_see').html('');
    $('#tableBody_modal_see').append(
        '<tr><td>关注类型</td><td><span>'+(data.dataType==undefined?'':data.dataType)+'</span></td></tr>'+
        '<tr><td>姓名</td><td><span>'+data.ownerName+'</span></td></tr>'+
        '<tr><td>身份证号</td><td><span>'+data.ownerIdcardNo+'</span></td></tr>'+
        '<tr><td>车牌号</td><td><span>'+data.plateNo+'</span></td></tr>'+
        '<tr><td>车辆类型</td><td><span>'+data.plateType+'</span></td></tr>'+
        '<tr><td>中文品牌名称</td><td><span>'+data.chinaCarBrand+'</span></td></tr>'+
        '<tr><td>户籍地区</td><td><span>'+data.hjdqPlace+'</span></td></tr>'+
        '<tr><td>户籍地详址</td><td><span>'+data.hjdqAddress+'</span></td></tr>'+
        '<tr><td>现住地区</td><td><span>'+data.xzPlace+'</span></td></tr>'+
        '<tr><td>事由</td><td><span>'+data.reason+'</span></td></tr>'+
        '<tr><td>处置要求</td><td><span>'+data.dealRequest+'</span></td></tr>'+
        '<tr><td>比对截止日期</td><td><span>'+(data.bdEndtime==undefined?'':data.bdEndtime)+'</span></td></tr>'+
        '<tr><td>导入人</td><td><span>'+data.importName+'</span></td></tr>'+
        '<tr><td>导入时间</td><td><span>'+data.importTime+'</span></td></tr>'
    );
});

function confire(data){
    var length = $("input[name='sub']:checked").length;
    if(length==0){
         $.alert({
        title: '提示!',
        content: '请选择需要批量修改的列表',
        });
     };
     if(length>0){
        $(".form_datetime").datetimepicker({
        language:  'zh-CN',
        format:'yyyy-mm-dd hh:ii:ss',
        weekStart: 1,
        todayBtn:  1,
        autoclose: 1,
        todayHighlight: 1,
        startView: 2,
        forceParse: 0,
        showSecond:1,
        minuteStep:1,
    });
         $.confirm({
            title: '提示',
            content: '确定批量修改比对止期吗',
            buttons: {
                确定: function () {
                    $('#myModal3').modal('show')
                  
                   
                },
                取消: function () {
                   
                },
            }
        })
     }

}
$("#ok").on("click",function(){
   var time =  $(".biduizhiqi").val();
   if(time ==""){
    $(".jinggao").css("display","block");
    return
   }
   $('#myModal3').modal('hide')
   var list =  $("input[type='checkbox']");
   
      var val="";
      var ids=[];
      for(i=0;i<list.length;i++){
        if (list[i].checked) {
            val = list[i].value
           ids.push(val);
        }
    } ;
       $.ajax({
                url:host+ '/localcar/info/batchUpdateBdTime',
                type: 'post',
                  contentType: 'application/json',
                dataType: 'json',
                data: JSON.stringify({
                "ids": ids,
                "currentUserNo": userNo,
                "bdDndtime":time
                }),
                })

                 .done(function(data) {
                    console.log(data); 
                    pagipationQuery(1,10,pagination);
                    
                 })
                 .fail(function() {
                    console.log("error");
                 })
                 .always(function() {
                    console.log("complete");
                 });    
     

})

  $("#ckAll").click(function() {
   $("input[name='sub']").prop("checked",this.checked); 
  });

  function chexiao(){
     var length = $("input[name='sub']:checked").length;
      if(length==0){
         $.alert({
        title: '提示!',
        content: '请选择需要批量撤销的列表',
        });
     };
      if(length>0){
        var list =  $("input[name='sub']");

        var val="";
        var ids=[];
        for(i=0;i<list.length;i++){
        if (list[i].checked) {
            val = list[i].value
           ids.push(val);
        }
        } ;
         $.confirm({
            title: '提示',
            content: '确定批量撤销吗？',
            buttons: {
                确定: function () {
                    $.ajax({
                    url:host+ '/localcar/info/batchCancel',
                    type: 'post',
                     contentType: 'application/json',
                    dataType: 'json',
                    data: JSON.stringify({
                    "ids": ids,
                    "currentUserNo": userNo
                    }),
                    })

                    .done(function(data) {
                       console.log(data); 
                        pagipationQuery(1,10,pagination);
                        $("#ckAll").prop("checked",false); 
                       
                    })
                    .fail(function() {
                       console.log("error");
                    })
                    .always(function() {
                       console.log("complete");
                    });
                  
                   
                },
                取消: function () {
                   
                },
            }
        })
     }
  }
  
 function reset(){
     var length = $("input[name='sub']:checked").length;
      if(length==0){
         $.alert({
        title: '提示!',
        content: '请选择需要批量恢复的列表',
        });
     };
      if(length>0){
        var list =  $("input[name='sub']");

        var val="";
        var ids=[];
        for(i=0;i<list.length;i++){
        if (list[i].checked) {
            val = list[i].value
           ids.push(val);
        }
        } ;
         $.confirm({
            title: '提示',
            content: '确定批量恢复吗？',
            buttons: {
                确定: function () {
                    $.ajax({
                    url:host+ '/localcar/info/batchReset',
                    type: 'post',
                     contentType: 'application/json',
                    dataType: 'json',
                    data: JSON.stringify({
                    "ids": ids,
                    "currentUserNo": userNo
                    }),
                    })

                    .done(function(data) {
                       console.log(data); 
                        pagipationQuery(1,10,pagination);
                        $("#ckAll").prop("checked",false); 
                       
                    })
                    .fail(function() {
                       console.log("error");
                    })
                    .always(function() {
                       console.log("complete");
                    });
                  
                   
                },
                取消: function () {
                   
                },
            }
        })
     }
  }
function select(){
    $.ajax({
        url: host+'/localcar/info/findDataType',
        type: 'get',
        dataType: 'json',
    })
    .done(function(data) {
        var list="<option value=''>-全部-</option>";
        for (var i = 0; i < data.length; i++) {
             list+="<option value='"+data[i]+"'>"+data[i]+"</option>";
           
        }
         $("#gzlx").html(list);
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
                url: host+'/localcar/info/findReason',
                type: 'get',
                dataType: 'json',
                data:{'dataType':a}
            })
            .done(function(data) {
                $("#gzlx").attr('code', a);
                 var list="<option value=''>-全部-</option>";
                for (var i = 0; i < data.length; i++) {
                     list+="<option value='"+data[i]+"'>"+data[i]+"</option>";
                   
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
