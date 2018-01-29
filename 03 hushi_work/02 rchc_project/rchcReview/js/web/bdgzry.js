var exportTotal;
var requestUrl = {
    upload: host + '/sflocalperson/info/check'
};

initSelect('mz_a',mzMap);
sortMZ('mz_a');
initSelect('xb_a',xb);
$(document).ready(function($) {
    initSelect('bhlr_mz',mzMap);
    sortMZ('bhlr_mz');
    select(); 
    now()
    $("#drsj_start").val(lastweek())
    $("#drsj_end").val(now())

    // 页面表单重置按钮点击
    $('.serach-tab input[type="reset"]').on('click', function(){
        // 还原之前的时间
        setTimeout(function(){
            $("#drsj_start").val(lastweek());
            $("#drsj_end").val(now());
        }, 10)
    })

    //绑定查询按钮事件
    $("#search-bdry").bind('click', function () {
        var a =  timechuo($('#drsj_start').val(),$('#drsj_end').val());
        if(a ==1){
            return
        }
        pagipationQuery(1,10,pagination);
    });
    pagipationQuery(1,10,pagination);

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


    
    $('#import-ry').off('click').on('click', function () {
        $('.error').addClass('hide');
    });
    /*导入确定按钮*/
    $('.import-ry-ok').off('click').on('click', function () {
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
    $('#download-ry').off('click').on('click', function () {
        location.href = 'http://'+location.host + '/rchcReview/template/personImport.xlsx';
         
    });


});

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
                    Post("/sflocalperson/info/update",
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
                    Post("/sflocalperson/info/updateReset",
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
$(document).on('click','.alert_ry',function(){
    

    var data = JSON.parse($(this).attr('data'));

    $('#tableBody_modal2').attr('tid',data.id);

    $('#mz_a option:selected').text(dataJx(data.fmzdm,mzMap));
    $('#xb_a option:selected').text(dataJx(data.fxbdm,xb));
    $('#sfzh_a').val(data.fgmsfhm);
    $('#xm_a').val(data.fxm);
    $('#hjdq_a').val(data.fhjdzSsxqdm);
    $('#hjdxz_a').val(data.fhjdzQhnxxdz);
    $('#xzdq_a').val(data.fxzdq);
    $('#xzdxz_a').val(data.fxzdz);
    $('#lgdw_a').val(data.flgdw);
    $('#lgr_a').val(data.flgr);
    $('#sy_a').val(data.fssyj);
    $('#czyq_a').val(data.fdealtype);
    $('#sjlx_a').val(data.fdataType);
    $('#bdzq_a').val(data.fdeadline);
    $('#myModal2').modal('show');

});
$(document).on('click','#alert_ok',function(){
    var id_a = $('#tableBody_modal2').attr('tid');
    var mz_a = $('#mz_a option:selected').text();
    var xb_a = $('#xb_a option:selected').text();
    var sfzh_a = $('#sfzh_a').val();
    var xm_a = $('#xm_a').val();
    var hjdq_a = $('#hjdq_a').val();
    var hjdxz_a = $('#hjdxz_a').val();
    var xzdq_a = $('#xzdq_a').val();
    var xzdxz_a = $('#xzdxz_a').val();
    var lgdw_a = $('#lgdw_a').val();
    var lgr_a = $('#lgr_a').val();
    var sy_a = $('#sy_a').val();
    var czyq_a = $('#czyq_a').val();
    var sjlx_a = $('#sjlx_a').val();
    var bdzq_a = $('#bdzq_a').val();

    var data = {id:id_a,name:xm_a,idcardNo:sfzh_a,sex:xb_a,national:mz_a,hjdqPlace:hjdq_a,hjdqAddress:hjdxz_a,xzPlace:xzdq_a,xzAddress:xzdxz_a,lgPlace:lgdw_a,lgPerson:lgr_a,reason:sy_a,dealRequest:czyq_a,dataType:sjlx_a,bdEndtime:bdzq_a};
    console.log(data);

    Post("/sflocalperson/info/updatePerson",$.param({
        id:id_a,name:xm_a,idcardNo:sfzh_a,sex:xb_a,national:mz_a,hjdqPlace:hjdq_a,hjdqAddress:hjdxz_a,xzPlace:xzdq_a,xzAddress:xzdxz_a,lgPlace:lgdw_a,lgPerson:lgr_a,reason:sy_a,dealRequest:czyq_a,dataType:sjlx_a,bdEndtime:bdzq_a
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


$(document).on('click','#export-bdry',function(){
    if(exportTotal>10000){
        $.confirm({
            title: '提示',
            content: '导出数据量较大，页面导出仅支持最多10000条数据的导出，如果要全部导出，请联系系统管理员',
            buttons: {
                确定: function () {
                    window.location.href=host+'/sflocalperson/info/export?pageno=1&size=10000'+
                            '&names='+$('#bhr_xm').val()+
                            '&idcardNo='+$('#bhlr_sfzh').val()+
                            '&national='+(mzMap[$('#bhlr_mz').val()]==undefined?'':mzMap[$('#bhlr_mz').val()]+'族')+
                            '&dataType='+$('#gzlx').val()+
                            '&beginTime='+$('#drsj_start').val()+
                            '&endTime='+$('#drsj_end').val()+
                            '&importName='+$("#drr_xm").val()+
                            '&reason='+$("#rygzlx").val()+
                            '&currentUserNo='+userNo;
                },
                取消: function () {
                   
                },
            }
        })
    }else{
        window.location.href=host+'/sflocalperson/info/export?pageno=1&size=10000'+
                            '&names='+$('#bhr_xm').val()+
                            '&idcardNo='+$('#bhlr_sfzh').val()+
                            '&national='+(mzMap[$('#bhlr_mz').val()]==undefined?'':mzMap[$('#bhlr_mz').val()]+'族')+
                            '&dataType='+$('#gzlx').val()+
                            '&beginTime='+$('#drsj_start').val()+
                            '&endTime='+$('#drsj_end').val()+
                            '&importName='+$("#drr_xm").val()+
                            '&reason='+$("#rygzlx").val()+
                            '&currentUserNo='+userNo;
    }
});

/**
 * 分页器查询
 * @param pageIndex 当前页数
 * @param pageSize 每页显示条数
 */
function pagipationQuery(pageIndex,pageSize, pagination){
    var xb = {1:'男',2:'女'};
    Post("/sflocalperson/info/findpage",$.param({
        names:$('#bhr_xm').val(),
        idcardNo:$('#bhlr_sfzh').val(),
        national:$('#bhlr_mz').val(),
        dataType:$('#gzlx').val(),
        beginTime:$('#drsj_start').val(),
        endTime:$('#drsj_end').val(),
        pageno: pageIndex,
        size: pageSize,
        importName: $("#drr_xm").val(),
        currentUserNo:userNo,
        reason:    $("#rygzlx").val()

    }), function (data) {
         $("#ckAll").prop("checked",false); 
        var htmlobj="";
        $("#tableBody").empty();
        count=data.result.length;
        if(data.result && data.result.length > 0 ) {
            exportTotal = data.total;
            $.each(data.result, function (index, item) {
                var check = '';
                var roleName='';
                if(sessionStorage.user){
                    roleName = JSON.parse(sessionStorage.user).roles[0].name;
                }
                if(item.finputno==userNo||roleName =='超级管理员'){
                   check = "<input  type='checkbox' value='"+item.id+"' name='sub'>";
                }else{
                    check =''
                }
                $("#tableBody").append(
                    "<tr>"+		
					"<td class='aa lineh'>"+check+"</td>"+
                    "<td class='aa lineh' title='"+(item.fdataType==undefined?'':item.fdataType)+"'>"+(item.fdataType==undefined?'':item.fdataType)+"</td>"+
                    "<td class='aa lineh' title='"+(item.fssyj==undefined?'':item.fssyj)+"'>"+(item.fssyj==undefined?'':item.fssyj)+"</td>"+
					"<td class='aa lineh' title='"+(item.fgmsfhm==undefined?'':item.fgmsfhm)+"'>"+(item.fgmsfhm==undefined?'':item.fgmsfhm)+"</td>"+
                    "<td class='aa lineh' title='"+(item.fxm==undefined?'':item.fxm)+"'>"+(item.fxm==undefined?'':item.fxm)+"</td>"+
                    "<td class='aa lineh' title='"+(dataJx(item.fxbdm,xb))+"'>"+(dataJx(item.fxbdm,xb))+"</td>"+
                    "<td class='aa lineh' title='"+(dataJx(item.fmzdm,mzMap))+"'>"+(dataJx(item.fmzdm,mzMap))+"</td>"+
                    "<td class='aa lineh' title='"+(dataJx(item.fhjdzSsxqdm,nmXzqhMap))+"'>"+(dataJx(item.fhjdzSsxqdm,nmXzqhMap))+"</td>"+
                    "<td class='aa lineh' title='"+(item.fhjdzQhnxxdz==undefined?'':item.fhjdzQhnxxdz)+"'>"+(item.fhjdzQhnxxdz==undefined?'':item.fhjdzQhnxxdz)+"</td>"+
                    "<td class='aa lineh' title='"+(dataJx(item.flgdw,dwdm2))+"'>"+(dataJx(item.flgdw,dwdm2))+"</td>"+
                    "<td class='aa lineh' title='"+(item.fssyj==undefined?'':item.fssyj)+"'>"+(item.fssyj==undefined?'':item.fssyj)+"</td>"+
                    "<td class='aa lineh' title='"+(dataJx(item.fdealtype,dealtype))+"'>"+(dataJx(item.fdealtype,dealtype))+"</td>"+
                    "<td class='aa lineh' title='"+(item.fdeadline==undefined?'':item.fdeadline)+"'>"+(item.fdeadline==undefined?'':item.fdeadline)+"</td>"+
                    "<td class='aa lineh' title='"+(item.finputperson==undefined?'':item.finputperson)+"'>"+(item.finputperson==undefined?'':item.finputperson)+"</td>"+
                    "<td class='aa lineh' title='"+(item.sysdate==undefined?'':item.sysdate)+"'>"+(item.sysdate==undefined?'':item.sysdate)+"</td>"+
                    "<td class='aa'>"+
                    // <button class='cxSign"+(role(item.finputNo))+"' no='"+item.finputNo+"' na='"+item.finputperson+"' tid='"+item.fid+"'>"+(item.fzxbs==0?'撤销':'恢复')+"</button>"+
                    "<img title='"+(item.fzxbs==0?'撤销':'恢复')+"' class='cz cxSign"+(role(item.finputno))+"' no='"+item.finputno+"' na='"+item.finputperson+"' tid='"+item.id+"' src='"+(item.fzxbs==0?'../img/cx.png':'../img/hf.png')+"'>&nbsp;"+
                    "<img title='修改' src='../img/bj.png' class='cz alert_ry"+(role(item.finputno))+"' data='"+JSON.stringify(item)+"'>"+
                    // "<button class='see' data='"+JSON.stringify(item)+"'>查看</button>"+

                    "&nbsp;<img title='查看' class='cz see' data='"+JSON.stringify(item)+"' src='../img/ck.png'>"+
                    "</td>"+
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
    //pagination(data);
}
$(document).on('click','.see',function(){
    var data = JSON.parse($(this).attr('data'));
    console.log(data);
    $('#myModal_see').modal('show');
    $('#tableBody_modal_see').html('');
    $('#tableBody_modal_see').append(
        '<tr><td>关注类型</td><td><span>'+(data.fdataType==undefined?'':data.fdataType)+'</span></td></tr>'+
        '<tr><td>身份证号</td><td><span>'+(data.fgmsfhm==undefined?'':data.fgmsfhm)+'</span></td></tr>'+
        '<tr><td>姓名</td><td><span>'+(data.fxm==undefined?'':data.fxm)+'</span></td></tr>'+
        '<tr><td>性别</td><td><span>'+(dataJx(data.fxbdm,xb))+'</span></td></tr>'+
        '<tr><td>民族</td><td><span>'+(dataJx(data.fmzdm,mzMap))+'</span></td></tr>'+
        '<tr><td>户籍地区</td><td><span>'+(dataJx(data.fhjdzSsxqdm,nmXzqhMap))+'</span></td></tr>'+
        '<tr><td>户籍祥址</td><td><span>'+(data.fhjdzQhnxxdz==undefined?'':data.fhjdzQhnxxdz)+'</span></td></tr>'+
        '<tr><td>现住地</td><td><span>'+(data.fxzdq==undefined?'':data.fxzdq)+'</span></td></tr>'+
        '<tr><td>现住祥址</td><td><span>'+(data.fxzdz==undefined?'':data.fxzdz)+'</span></td></tr>'+
        '<tr><td>列管单位</td><td><span>'+(dataJx(data.flgdw,dwdm))+'</span></td></tr>'+
        '<tr><td>事由</td><td><span>'+(data.fssyj==undefined?'':data.fssyj)+'</span></td></tr>'+
        '<tr><td>处置要求</td><td><span>'+(dataJx(data.fdealtype,dealtype))+'</span></td></tr>'+
        '<tr><td>比对截止日期</td><td><span>'+(data.fdeadline==undefined?'':data.fdeadline)+'</span></td></tr>'+
        '<tr><td>导入人</td><td><span>'+(data.finputperson==undefined?'':data.finputperson)+'</span></td></tr>'+
        '<tr><td>导入时间</td><td><span>'+(data.sysdate==undefined?'':data.sysdate)+'</span></td></tr>'
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
   var time =  $(".datatimes").val();
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
                url:host+ '/sflocalperson/info/batchUpdateBdTime',
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
                    url:host+ '/sflocalperson/info/batchCancel',
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
                    url:host+ '/sflocalperson/info/batchReset',
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
        url: host+'/sflocalperson/info/findDataType',
        type: 'get',
        dataType: 'json',
    })
    .done(function(data) {
        var list="<option value=''>-全部-</option>";
        for (var i = 0; i < data.length; i++) {
            if(data[i]!='00'){
             list+="<option value='"+data[i]+"'>"+data[i]+"</option>";
            }
           
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
                url: host+'/sflocalperson/info/findReason',
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
                 $("#rygzlx").html(list);
            })
            .fail(function() {
                console.log("error");
            })
            .always(function() {
                console.log("complete");
            });
    }else{
        var list="<option value=''>-全部-</option>";
        $("#rygzlx").html(list);
    }
   
    
}
function xichange(a){
    console.info(a);
    $("#rygzlx").attr('code', a);
}
