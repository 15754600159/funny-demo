var jwtRyCode ;
var jwtRySource ;
var Type;
$(document).ready(function($) {
	$("#hlsblx").val('jwt');
	jwtInitTime();
	jwtQuery('jwt');
	
	// 重置按钮功能
    $('.serach-tab input[type="reset"]').on('click', function(){
        // 还原之前的时间
        setTimeout(function(){
            $("#ksrq").val(lastweek());
            $("#jsrq").val(now());
        }, 10)
    })
});

$(document).on('change','#hlsblx',function(){
	var sb = $("#hlsblx").find("option:selected").val();
	if(sb=="jwt"){
		$('#jcz-tj').attr('checked',false);
	  	$('#dwdw').html('核查单位');
	  	$('#lastCol').parent('th').css("display", "");
	  	$('.jcztj').removeClass('hide');
	  	jwtQuery(sb);
	}else if(sb=="jj"){
		
		$('#dwdw').html('核查点位');
		$('#lastCol').parent('th').css("display", "none");
		$('.jcztj').addClass('hide');
		$('#jcz-tj').attr('checked',false);
		jwtQuery(sb);
	}else if(sb=="lte"){
	  	$('#dwdw').html('核查单位');
	  	/*$('#lastCol').parent('th').css("display", "");
	  	$('.jcztj').removeClass('hide');*/
	  	$('#jcz-tj').attr('checked',false);
	  	jwtQuery(sb);
	}
	console.log(sb);
});

$(document).on('click','#jwt-search-cl',function(){
	var sb = $("#hlsblx").find("option:selected").val();
	if($('#jcz-tj').is(":checked")){
		$('#dwdw').html('核查点位');
		$('#lastCol').parent('th').css("display", "none");
		if(sb=='jwt'){
			jwtQuery('jcz');
		}else{
			jwtQuery('lte-jcz');
		}
		
	}else{
		$('#dwdw').html('核查单位');
	  	$('#lastCol').parent('th').css("display", "");
	  	$('.jcztj').removeClass('hide');
		jwtQuery(sb);
	}
});
$(document).on('click','#jwt-export-cl',function(){
	var ksrq = $('#ksrq').val();
	var jsrq = $('#jsrq').val();
	var jwtCodes = "";
    $('input:checkbox[name=jwtRows]:checked').each(function(i){
       	if(0==i){
        	jwtCodes = $(this).attr('code');
       	}else{
        	jwtCodes += (","+$(this).attr('code'));
       	}
    });
    console.log(jwtCodes);
    var jwtCols = "";
    $('input:checkbox[name=jwtCols]:checked').each(function(i){
       	if(0==i){
        	jwtCols = $(this).attr('exp');
       	}else{
        	jwtCols += (","+$(this).attr('exp'));
       	}
    });
    source = $("#hlsblx").val();
    console.log(jwtCols)
    if($('#jcz-tj').is(":checked")){
		source = 'jcz';
		jwtCols = jwtCols.replace(',deviceCount','');
	}
    
    window.location.href=host+'/countPlateCheck/export?beginTime='+ksrq+
    						  '&endTime='+jsrq+
    						  '&codes='+jwtCodes+
    						  '&columNames='+jwtCols+
    						  '&source='+source;
});
/*$(document).on('click','#jwt-export-check',function(){
	var ksrq = $('#ksrq').val();
	var jsrq = $('#jsrq').val();
	var code = $(this).attr('code');
    window.location.href=host+'/countPlateCheck/exportSubExcel?beginTime='+ksrq+'&endTime='+jsrq+'&code='+code+'&source=jwt&type=checkCount';
});
$(document).on('click','#jwt-export-compar',function(){
	var ksrq = $('#ksrq').val();
	var jsrq = $('#jsrq').val();
	var code = $(this).attr('code');
    window.location.href=host+'/countPlateCheck/exportSubExcel?beginTime='+ksrq+'&endTime='+jsrq+'&code='+code+'&source=jwt&type=comparCount';
});
$(document).on('click','#jwt-export-warn',function(){
	var ksrq = $('#ksrq').val();
	var jsrq = $('#jsrq').val();
	var code = $(this).attr('code');
    window.location.href=host+'/countPlateCheck/exportSubExcel?beginTime='+ksrq+'&endTime='+jsrq+'&code='+code+'&source=jwt&type=warnCount';
});*/
$(document).on('click','.jwt-export-sub',function(){
	var sb = $("#hlsblx").find("option:selected").val();
	var ksrq = $('#ksrq').val();
	var jsrq = $('#jsrq').val();
	var code = $(this).attr('code');
	var tid = $(this).attr('tid');
    window.location.href=host+'/countPlateCheck/exportSubExcel?beginTime='+ksrq+'&endTime='+jsrq+'&code='+code+'&source='+sb+'&type='+tid;
});
$(document).on('click','#jwt-export-device',function(){
	var ksrq = $('#ksrq').val();
	var jsrq = $('#jsrq').val();
	var code = $(this).attr('code');
    window.location.href=host+'/countPlateCheck/exportDeviceExcel?beginTime='+ksrq+'&endTime='+jsrq+'&code='+code+'&source=jwt';
});
$(document).on('click','#jwt-export-subWarn',function(){
	var sb = $("#hlsblx").find("option:selected").val();
	if($('#jcz-tj').is(":checked")){
		sb = 'jcz';
	}
	var ksrq = $('#ksrq').val();
	var jsrq = $('#jsrq').val();
	var code = $(this).attr('code');
    window.location.href=host+'/countPlateCheck/exportWarnDetailExcel?beginTime='+ksrq+'&endTime='+jsrq+'&code='+code+'&source='+sb;
});
$(document).on('click','#jwt-export-jczDetails',function(){
	var sb = $("#hlsblx").find("option:selected").val();
	if($('#jcz-tj').is(":checked")){
		sb = 'jcz';
	}
	var ksrq = $('#ksrq').val();
	var jsrq = $('#jsrq').val();
	var code = $(this).attr('code');
	var type = $(this).attr('tid');
    window.location.href=host+'/countPlateCheck/exportDetailExcel?beginTime='+ksrq+'&endTime='+jsrq+'&code='+code+'&source='+sb+'&type='+type;
});
$(document).on('click','.checkModal',function(){
	var code = $(this).parents('tr').attr('tid');
	var ksrq = $('#ksrq').val();
	var jsrq = $('#jsrq').val();
	var source = $('#hlsblx').val();
	console.log('code:'+code);
	$('#myModal').modal('show');
	$('.modal-dialog').css({'width':'45%'});
	$("#jwtPage").remove();
	$('#myModalLabel').html('');
	$('#myModalLabel').html('核查详情<button class="btn btn-modal btn-success" style="float:right;" data-dismiss="modal" aria-hidden="true">关闭</button><button class="btn btn-modal btn-success jwt-export-sub" style="float:right;" id="jwt-export-check" code="'+code+'" tid="checkCount">导出</button>');
	$('.modal-body table').html('');
	$('.modal-body table').append('请稍候...');
	$("#loading").css('display', 'block');//等待gif
	$.ajax({
		url: host+'/countPlateCheck/countCheckByCode',
		type: 'GET',
		dataType: 'json',
		data: {'beginTime':ksrq,'endTime':jsrq,'code':code,'source':source},
		success:function(data){
			$('.modal-body table').html('');
			$('.modal-body table').append('<thead><tr><td>核查单位</td><td>核查数</td></tr></thead><tbody>');
			$.each(data,function(index, el) {
				$('.modal-body table').append('<tr tid="'+el.code+'"><td>'+el.name+'</td><td>'+el.count+'</td></tr>');
			});
			$('.modal-body table').append('</tbody>');
			
		},
		error:function(data){
			console.log(data)
		}
	});
});
$(document).on('click','.comparModal',function(){
	var code = $(this).parents('tr').attr('tid');
	var ksrq = $('#ksrq').val();
	var jsrq = $('#jsrq').val();
	var source = $('#hlsblx').val();
	console.log('code:'+code);
	$('#myModal').modal('show');
	$('.modal-dialog').css({'width':'45%'});
	$("#jwtPage").remove();
	$('#myModalLabel').html('');
	$('#myModalLabel').html('比中详情<button class="btn btn-modal btn-success" style="float:right;" data-dismiss="modal" aria-hidden="true">关闭</button><button class="btn btn-modal btn-success jwt-export-sub" style="float:right;" id="jwt-export-compar" code="'+code+'" tid="comparCount">导出</button>');
	$('.modal-body table').html('');
	$('.modal-body table').append('请稍候...');
	$("#loading").css('display', 'block');//等待gif
	$.ajax({
		url: host+'/countPlateCheck/countComparByCode',
		type: 'GET',
		dataType: 'json',
		data: {'code':code,'beginTime':ksrq,'endTime':jsrq,'source':source},
		success:function(data){
			$('.modal-body table').html('');
			$('.modal-body table').append('<thead><tr><td>核查单位</td><td>比中数</td></tr></thead><tbody>');
			$.each(data,function(index, el) {
				$('.modal-body table').append('<tr tid="'+el.code+'"><td>'+el.name+'</td><td>'+el.count+'</td></tr>');
			});
			$('.modal-body table').append('</tbody>');
			
		},
		error:function(data){
			console.log(data)
		}
	});
});
$(document).on('click','.warnModal',function(){
	Type = $(this).attr('tid');
	var code = $(this).parents('tr').attr('tid');
	var ksrq = $('#ksrq').val();
	var jsrq = $('#jsrq').val();
	var source = $('#hlsblx').val();
	console.log('code:'+code);
	$('#myModal').modal('show');
	$('.modal-dialog').css({'width':'45%'});
	$("#jwtPage").remove();
	$('#myModalLabel').html('');
	$('#myModalLabel').html('预警详情<button class="btn btn-modal btn-success" style="float:right;" data-dismiss="modal" aria-hidden="true">关闭</button><button class="btn btn-modal btn-success jwt-export-sub" style="float:right;" id="jwt-export-warn" code="'+code+'" tid="warnCount">导出</button>');
	$('.modal-body table').html('');
	$('.modal-body table').append('请稍候...');
	$("#loading").css('display', 'block');//等待gif
	$.ajax({
		url: host+'/countPlateCheck/countWarnByCode',
		type: 'GET',
		dataType: 'json',
		data: {'code':code,'beginTime':ksrq,'endTime':jsrq,'source':source},
		success:function(data){
			$('.modal-body table').html('');
			$('.modal-body table').append('<thead><tr><td>核查单位</td><td>预警数</td></tr></thead><tbody>');
			$.each(data,function(index, el) {
				$('.modal-body table').append('<tr tid="'+el.code+'"><td>'+el.name+'</td><td class="subWarnModal"><a>'+el.count+'</a></td></tr>');
			});
			$('.modal-body table').append('</tbody>');
			
		},
		error:function(data){
			console.log(data)
		}
	});
});
$(document).on('click','.sixModal',function(){
	var code = $(this).parents('tr').attr('tid');
	var tid = $(this).attr('tid');
	var ksrq = $('#ksrq').val();
	var jsrq = $('#jsrq').val();
	var source = $('#hlsblx').val();
	var lx;
	switch (tid) {
		case 'ztCount':
			lx='--在逃';
			break;
		case 'sdCount':
			lx='--涉毒';
			break;
		case 'sfCount':
			lx='--涉访';
			break;
		case 'sjCount':
			lx='--涉疆';
			break;
		case 'skCount':
			lx='--涉恐';
			break;
		case 'swCount':
			lx='--涉稳';
			break;
		case 'dqCount':
			lx='大庆关注';
			break;
		default:
			lx='';
			break;
	}
	$('#myModal').modal('show');
	$('.modal-dialog').css({'width':'45%'});
	$("#jwtPage").remove();
	$('#myModalLabel').html('');
	$('#myModalLabel').html('预警细项'+lx+'<button class="btn btn-modal btn-success" style="float:right;" data-dismiss="modal" aria-hidden="true">关闭</button><button class="btn btn-modal btn-success jwt-export-sub" style="float:right;" code="'+code+'" tid="'+tid+'">导出</button>');
	$('.modal-body table').html('');
	$('.modal-body table').append('请稍候...');
	$("#loading").css('display', 'block');//等待gif
	$.ajax({
		url: host+'/countPlateCheck/countSubWarnByCode',
		type: 'GET',
		dataType: 'json',
		data: {'beginTime':ksrq,'endTime':jsrq,'code':code,'source':source,'type':tid},
		success:function(data){
			$('.modal-body table').html('');
			$('.modal-body table').append('<thead><tr><td>核查单位</td><td>预警数</td></tr></thead><tbody>');
			$.each(data,function(index, el) {
				$('.modal-body table').append('<tr tid="'+el.code+'"><td>'+el.name+'</td><td>'+el.count+'</td></tr>');
			});
			$('.modal-body table').append('</tbody>');
			
		},
		error:function(data){
			console.log(data)
		}
	});
});
$(document).on('click','.jczDetails',function(){
	Type = $(this).attr('tid');
	jwtRyCode = $(this).parent('tr').attr('tid');
	jwtRySource = $('#hlsblx').val();
	$('#myModal').modal('show');
	$('.modal-dialog').css({'width':'90%'});
	var lx;
	switch (Type) {
		case 'checkCount':
			lx='核查';
			break;
		case 'comparCount':
			lx='比中';
			break;
		case 'warnCount':
			lx='预警';
			break;
		case 'ztCount':
			lx='在逃';
			break;
		case 'sdCount':
			lx='涉毒';
			break;
		case 'sfCount':
			lx='涉访';
			break;
		case 'sjCount':
			lx='涉疆';
			break;
		case 'skCount':
			lx='涉恐';
			break;
		case 'swCount':
			lx='涉稳';
			break;
		case 'dqCount':
			lx='大庆关注';
			break;
		default:
			lx='';
			break;
	}
	$('#myModalLabel').html('');
	$('#myModalLabel').html(lx+'人员详细信息<button class="btn btn-modal btn-success" style="float:right;" data-dismiss="modal" aria-hidden="true">关闭</button><button class="btn btn-modal btn-success" style="float:right;"  id="jwt-export-jczDetails" code="'+jwtRyCode+'" tid="'+Type+'">导出</button>');
	$('.modal-body table').html('');
	$('.modal-body table').append('请稍候...');
	/*分页*/
	$("#jwtPage").remove();
	$(".modal-body").append('<div id="jwtPage" style="text-align: right"><ul id="pagination" class="pagination"></ul></div>')
	pagipationQuery(1,10,pagination);

});
$(document).on('click','.subWarnModal',function(){
	jwtRyCode = $(this).parents('tr').attr('tid');
	jwtRySource = $('#hlsblx').val();
	console.log('code:'+jwtRyCode);
	$('#myModal').modal('show');
	$('.modal-dialog').css({'width':'90%'});
	$('#myModalLabel').html('');
	$('#myModalLabel').html('核查车辆详细信息<button class="btn btn-modal btn-success" style="float:right;" data-dismiss="modal" aria-hidden="true">关闭</button><button class="btn btn-modal btn-success" style="float:right;" id="jwt-export-subWarn" code="'+jwtRyCode+'">导出</button>');
	$('.modal-body table').html('');
	$('.modal-body table').append('请稍候...');
	/*分页*/
	$("#jwtPage").remove();
	$(".modal-body").append('<div id="jwtPage" style="text-align: right"><ul id="pagination" class="pagination"></ul></div>')
	pagipationQuery(1,10,pagination);
});
$(document).on('click','.deviceModal',function(){
	var code = $(this).parents('tr').attr('tid');
	var ksrq = $('#ksrq').val();
	var jsrq = $('#jsrq').val();
	var source = $('#hlsblx').val();
	console.log('code:'+code);
	$('#myModal').modal('show');
	$('.modal-dialog').css({'width':'45%'});
	$("#jwtPage").remove();
	$('#myModalLabel').html('');
	$('#myModalLabel').html('警务通使用详情<button class="btn btn-modal btn-success" style="float:right;" data-dismiss="modal" aria-hidden="true">关闭</button><button class="btn btn-modal btn-success" style="float:right;" id="jwt-export-device" code="'+code+'">导出</button>');
	$('.modal-body table').html('');
	$('.modal-body table').append('请稍候...');
	$("#loading").css('display', 'block');//等待gif
	$.ajax({
		url: host+'/countPlateCheck/listDeviceByCode',
		type: 'GET',
		dataType: 'json',
		data: {'code':code,'beginTime':ksrq,'endTime':jsrq,'source':source},
		success:function(data){
			$('.modal-body table').html('');
			$('.modal-body table').append('<thead><tr><td>序号</td><td>警员警号</td><td>警员姓名</td><td>警员手机号</td><td>核录人数</td></tr></thead><tbody>');
			$.each(data,function(index, el) {
				$('.modal-body table').append('<tr><td>'+(index+1)+'</td><td>'+el.policeNo+'</td><td>'+(el.policeName==null?'':el.policeName)+'</td><td>'+el.policePhone+'</td><td>'+el.count+'</td></tr>');
			});
			$('.modal-body table').append('</tbody>');
			
		},
		error:function(data){
			console.log(data)
		}
	});
});
function jwtQuery(source){
	var ksrq = $('#ksrq').val();
	var jsrq = $('#jsrq').val();
	$("#loading").css('display', 'block');//等待gif
	$.ajax({
		url: host+'/countPlateCheck/countDept?beginTime='+ksrq+'&endTime='+jsrq+'&source='+source,
		type: 'GET',
		success: function(data){
			console.log(data);
			
			$('#jwt-tableBody').html('');
			if($('#jcz-tj').is(":checked")){
				source='jcz';
			}
			switch (source) {
				case 'jwt':
					$('#sbs').attr('checked',true);
					$('#sbs').attr('disabled',false);
					$.each(data,function(index, el) {
						$('#jwt-tableBody').append(
							'<tr tid="'+el.code+'">'+
								'<th class="text-left"><input name="jwtRows" type="checkbox" checked="checked" code="'+el.code+'" '+(el.code==''?"disabled=\"true\"":'')+'> '+el.name+'</th>'+
								'<td class="checkModal"><a>'+el.checkCount+'</a></td>'+
								'<td class="comparModal"><a>'+el.comparCount+'</a></td>'+
								'<td class="warnModal"><a>'+el.warnCount+'</a></td>'+
								'<td class="sixModal" tid="ztCount"><a>'+el.ztCount+'</a></td>'+
								'<td class="sixModal" tid="sdCount"><a>'+el.sdCount+'</a></td>'+
								'<td class="sixModal" tid="sfCount"><a>'+el.sfCount+'</a></td>'+
								'<td class="sixModal" tid="sjCount"><a>'+el.sjCount+'</a></td>'+
								'<td class="sixModal" tid="skCount"><a>'+el.skCount+'</a></td>'+
								'<td class="sixModal" tid="swCount"><a>'+el.swCount+'</a></td>'+
								'<td class="sixModal" tid="dqCount"><a>'+el.dqCount+'</a></td>'+
								'<td class="deviceModal"><a>'+el.deviceCount+'</a></td>'+
							'</tr>');
					});
					break;
				case 'lte':
					$('#sbs').attr('checked',true);
					$('#sbs').attr('disabled',false);
					$.each(data,function(index, el) {
						$('#jwt-tableBody').append(
							'<tr tid="'+el.code+'">'+
								'<th class="text-left"><input name="jwtRows" type="checkbox" checked="checked" code="'+el.code+'" '+(el.code==''?"disabled=\"true\"":'')+'> '+el.name+'</th>'+
								'<td class="checkModal"><a>'+el.checkCount+'</a></td>'+
								'<td class="comparModal"><a>'+el.comparCount+'</a></td>'+
								'<td class="warnModal"><a>'+el.warnCount+'</a></td>'+
								'<td class="sixModal" tid="ztCount"><a>'+el.ztCount+'</a></td>'+
								'<td class="sixModal" tid="sdCount"><a>'+el.sdCount+'</a></td>'+
								'<td class="sixModal" tid="sfCount"><a>'+el.sfCount+'</a></td>'+
								'<td class="sixModal" tid="sjCount"><a>'+el.sjCount+'</a></td>'+
								'<td class="sixModal" tid="skCount"><a>'+el.skCount+'</a></td>'+
								'<td class="sixModal" tid="swCount"><a>'+el.swCount+'</a></td>'+
								'<td class="sixModal" tid="dqCount"><a>'+el.dqCount+'</a></td>'+
								'<td class="deviceModal"><a>'+el.deviceCount+'</a></td>'+
							'</tr>');
					});
					break;
				case 'jcz':
					$('#sbs').attr('checked',false);
					$('#sbs').attr('disabled',true);
					$.each(data,function(index, el) {
						$('#jwt-tableBody').append(
							'<tr tid="'+el.code+'">'+
								'<th class="text-left"><input name="jwtRows" type="checkbox" checked="checked" code="'+el.code+'" '+(el.code==''?"disabled=\"true\"":'')+'> '+el.name+'</th>'+
								'<td class="jczDetails" tid="checkCount"><a>'+el.checkCount+'</a></td>'+
								'<td class="jczDetails" tid="comparCount"><a>'+el.comparCount+'</a></td>'+
								'<td class="jczDetails" tid="warnCount"><a>'+el.warnCount+'</a></td>'+
								'<td class="jczDetails" tid="ztCount"><a>'+el.ztCount+'</a></td>'+
								'<td class="jczDetails" tid="sdCount"><a>'+el.sdCount+'</a></td>'+
								'<td class="jczDetails" tid="sfCount"><a>'+el.sfCount+'</a></td>'+
								'<td class="jczDetails" tid="sjCount"><a>'+el.sjCount+'</a></td>'+
								'<td class="jczDetails" tid="skCount"><a>'+el.skCount+'</a></td>'+
								'<td class="jczDetails" tid="swCount"><a>'+el.swCount+'</a></td>'+
								'<td class="jczDetails" tid="dqCount"><a>'+el.dqCount+'</a></td>'+
							'</tr>');
					});
					break;
				default:
					// statements_def
					break;
			}
		},
		error: function(data){
			console.log(data);
		}
	})
	.done(function() {
		console.log("success");
	})
	.fail(function() {
		console.log("error");
	})
	.always(function() {
		console.log("complete");
	});
	
}

function jwtInitTime(){
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
	var noww= year+'-'+month+'-'+day+' '+'10:'+'00:'+'00';
	console.info(noww)
    $("#jsrq").val(noww);
    var dates = new Date(date.getTime());
    var month = dates.getMonth()+1;
    var day = dates.getDate()-1;
    var hour = dates.getHours();
    var minute = dates.getMinutes();
    var second = dates.getSeconds();
    if(Number(month)<10){
       month="0"+month;
    }
    if(Number(day)<10){
       day = "0"+day
    }
    var sec = year+'-'+month+'-'+day+' '+'10:'+'00:'+'00';
    console.info(sec)
    $("#ksrq").val(sec);
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
        },
    });
}

/**
 * 分页器查询
 * @param pageIndex 当前页数
 * @param pageSize 每页显示条数
 */
function pagipationQuery(pageIndex,pageSize, pagination){
	$("#loading").css('display', 'block');//等待gif
	var ksrq = $('#ksrq').val();
	var jsrq = $('#jsrq').val();
	if($('#jcz-tj').is(":checked")){
		jwtRySource = 'jcz';
	}
    if($('#jcz-tj').is(":checked")){
    	if(jwtRySource=='jwt'||jwtRySource == 'jcz'){
    		jwtRySource = 'jcz';
    	}else{
    		jwtRySource = 'lte-jcz';
    	}
		
		$.ajax({
	    	url: host+'/countPlateCheck/listDetailsByCode',
	    	type: 'POST',
	    	contentType: 'application/json',
	    	dataType: 'json',
	    	data: JSON.stringify({'beginTime': ksrq,'endTime':jsrq,'code':jwtRyCode,'source':jwtRySource,'type':Type,'pageno':pageIndex,'size':pageSize}),
	    	success: function (data) {
				        if(data.result && data.result.length > 0 ) {
				            $('.modal-body table').html('');
							$('.modal-body table').append('<thead><tr><td>序号</td><td>车辆标签</td><td>车牌号码</td><td>机动车所有人</td><td>车辆类型</td><td>身份证号</td><td>核查时间</td><td>核录地点</td><td>核录单位</td><td>警员姓名</td><td>警员手机号</td><td>列管单位</td></tr></thead><tbody>');
							$.each(data.result,function(index, el) {
								$('.modal-body table').append('<tr><td>'+(index+1)+'</td><td>'+el.tags+'</td><td>'+el.plateNo+'</td><td>'+(el.name==null?'':el.name)+'</td><td>'+el.plateType+'</td><td>'+(el.sfzh==null?'':el.sfzh)+'</td><td>'+el.createTime+'</td><td>'+el.checkAddress+'</td><td>'+el.checkdept+'</td><td>'+(el.policeName==null?'':el.policeName)+'</td><td>'+el.policephone+'</td><td>'+(el.checkPlace==null?'':el.checkPlace)+'</td></tr>');
							});
							$('.modal-body table').append('</tbody>');
				        }else{
				        	$('.modal-body table').html('');
				            $(".modal-body table").append(
				                "<tr>"+
				                "<td colspan='999'>"+ "搜索结果为空" + "</td>" +
				                "</tr>"
				            )
				        }
						pagination && pagination(data);
				    }
	    });
	}else if(jwtRySource=='jwt'){
	    $.ajax({
	    	url: host+'/countPlateCheck/listWarnByCode',
	    	type: 'POST',
	    	contentType: 'application/json',
	    	dataType: 'json',
	    	data: JSON.stringify({'beginTime': ksrq,'endTime':jsrq,'code':jwtRyCode,'source':jwtRySource,'pageno':pageIndex,'size':pageSize}),
	    	success: function (data) {
				        if(data.result && data.result.length > 0 ) {
				            $('.modal-body table').html('');
							$('.modal-body table').append('<thead><tr><td>序号</td><td>车辆标签</td><td>车牌号码</td><td>机动车所有人</td><td>车辆类型</td><td>身份证号</td><td>核查时间</td><td>核录地点</td><td>核录单位</td><td>警员姓名</td><td>警员手机号</td><td>列管单位</td></tr></thead><tbody>');
							$.each(data.result,function(index, el) {
								$('.modal-body table').append('<tr><td>'+(index+1)+'</td><td>'+el.tags+'</td><td>'+el.plateNo+'</td><td>'+(el.name==null?'':el.name)+'</td><td>'+el.plateType+'</td><td>'+(el.sfzh==null?'':el.sfzh)+'</td><td>'+el.createTime+'</td><td>'+el.checkAddress+'</td><td>'+el.checkdept+'</td><td>'+(el.policeName==null?'':el.policeName)+'</td><td>'+el.policephone+'</td><td>'+(el.checkPlace==null?'':el.checkPlace)+'</td></tr>');
							});
							$('.modal-body table').append('</tbody>');
				        }else{
				        	$('.modal-body table').html('');
				            $(".modal-body table").append(
				                "<tr>"+
				                "<td colspan='999'>"+ "搜索结果为空" + "</td>" +
				                "</tr>"
				            )
				        }
						pagination && pagination(data);
				    }
	    });
	}else if(jwtRySource=='lte'){
	    $.ajax({
	    	url: host+'/countPlateCheck/listWarnByCode',
	    	type: 'POST',
	    	contentType: 'application/json',
	    	dataType: 'json',
	    	data: JSON.stringify({'beginTime': ksrq,'endTime':jsrq,'code':jwtRyCode,'source':jwtRySource,'pageno':pageIndex,'size':pageSize}),
	    	success: function (data) {
				        if(data.result && data.result.length > 0 ) {
				            $('.modal-body table').html('');
							$('.modal-body table').append('<thead><tr><td>序号</td><td>车辆标签</td><td>车牌号码</td><td>机动车所有人</td><td>车辆类型</td><td>身份证号</td><td>核查时间</td><td>核录地点</td><td>核录单位</td><td>警员姓名</td><td>警员手机号</td><td>列管单位</td></tr></thead><tbody>');
							$.each(data.result,function(index, el) {
								$('.modal-body table').append('<tr><td>'+(index+1)+'</td><td>'+el.tags+'</td><td>'+el.plateNo+'</td><td>'+(el.name==null?'':el.name)+'</td><td>'+el.plateType+'</td><td>'+(el.sfzh==null?'':el.sfzh)+'</td><td>'+el.createTime+'</td><td>'+el.checkAddress+'</td><td>'+el.checkdept+'</td><td>'+(el.policeName==null?'':el.policeName)+'</td><td>'+el.policephone+'</td><td>'+(el.checkPlace==null?'':el.checkPlace)+'</td></tr>');
							});
							$('.modal-body table').append('</tbody>');
				        }else{
				        	$('.modal-body table').html('');
				            $(".modal-body table").append(
				                "<tr>"+
				                "<td colspan='999'>"+ "搜索结果为空" + "</td>" +
				                "</tr>"
				            )
				        }
						pagination && pagination(data);
				    }
	    });
	}
}