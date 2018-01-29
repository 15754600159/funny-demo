/**
 * Created by Administrator on 16-9-30.
 */
define(function (require) {
    var $page = $('.page-actionlog'),
        requestUrl = {
            getList: mining.baseurl.host + ':18080/sjz/gongan/operation/count',
            getListByUser:mining.baseurl.host + ':18080/sjz/gongan/operation/list',
            getUsers:mining.baseurl.console + '/user/allUsers'
            //http://qbbigdata.sjzs.eb:18080/sjz/gongan/operation/count?applicantId=admin&pageNo=1&pageSize=5&startTime=2016-09-27&endTime=2016-09-28
            //http://qbbigdata.sjzs.eb:18080/sjz/gongan/operation/list?applicantId=admin&queryId=guoxiaoxi&pageNo=1&pageSize=5&startTime=2016-09-27&endTime=2016-09-29%2023:59:59
        };
    require('daterangepicker');
    var serverlog=require('common/serverlog');
    var totalCount = 0;
    //刷新布局
    var pageResize = function () {
        $(".list_container", $page).height(mining.browser.h -200);
        //TODO
    };
    Date.prototype.format = function() {
        var month=this.getMonth()+1,date=this.getDate()
        return this.getFullYear()+'-'+(month<10?'0':'')+month+'-'+(date<10?'0':'')+date+' '+this.getHours()+':'+this.getMinutes()+':'+this.getSeconds();
    };
    /* 初始化 */
    var initPage = function () {
        mining.utils.loadPage($page, function () {
        	$page = $('.page-actionlog');
            mining.utils.winResize({name: pageResize});
            
            $('input[name=reservation]',$page).daterangepicker({
                opens: 'left',
                format:'YYYY-MM-DD',
                timePicker: true,
                applyClass: 'btn-primary',
                clearClass: 'btn-primary',
                showDropdowns: true
            }, function(start, end, label, action) {
                $('.list_container',$page).attr('pageno',1);
                $('#tableLog tbody', $page).html('');
                getList();
            }).on('clear.daterangepicker', function(){
                $(this).val('');
            });
            function loadUserList(){
				$ajax.ajax({
                    url: requestUrl.getUsers,
                    success: function(result){
                    	 var options = [];
                    	  options.push('<option value="">全部用户</option>');
                        $.each(result.listObj, function (k, v) {
                            options.push('<option value="' + v.user_id + '">' + v.name + '</option>');
                        });
                        $('select.selectUser',$page).html(options.join('')).select2({
                            minimumResultsForSearch: Infinity
                        }).on('change', function () {
                        	$('.list_container',$page).attr('pageno',1);
                			$('#tableLog tbody', $page).html('');
                           getList(false);
                        });
                    },
                    error: function(result){

                    }
                });
			}
            var getParam = function(isScroll){
            	var pageno=$('.list_container',$page).attr('pageno');
                if(!pageno) pageno=1;
                if(isScroll)
                    pageno++;
                var starttime='',endtime='';
                if($('[name=reservation]',$page).val()!=''){
                    starttime=$('[name=daterangepicker_start]').val()+' 00:00:00';
                    endtime=$('[name=daterangepicker_end]').val()+' 23:59:59';
                }
                var parm={
                        applicantId: mining.userinfo.user_id, startTime: starttime, endTime: endtime,
                        pageNo: pageno,
                        pageSize: 30
                   };
                var url=requestUrl.getList;
                if($('select.selectUser').val()!=null&&$('select.selectUser').val().length>0)
                {
                	parm['queryId']=$('select.selectUser').val();
                	url=requestUrl.getListByUser
                }
                
                return {
                	url: url,
                	data: parm
                }
            }
            function getList(isScroll) {
                var param = getParam(isScroll);
                	
                $ajax.ajax({
                    url: param.url,
                    data: param.data ,
                    success: function (result) {
                        var trs = [],length=  $('#tableLog tbody tr').length, hasError = false;
                    	$.each(result.bodyData, function (index, obj) {
	                        try{
	                            var op=JSON.parse(obj.opid);
	                            if (op && serverlog['op_' + op.opid]) {
	                                var opid = serverlog['op_' + op.opid] ? serverlog['op_' + op.opid] : '', 
	                                	con = serverlog['con_' + op.opid] ? serverlog['con_' + op.opid] : '',
	                                	browser = op.browser.ua + '-' + op.browser.v + ',' + op.browser.w + 'x' + op.browser.h,
	                                    uid = obj.user_id ? obj.user_id : '', 
	                                    uname = obj.name ? obj.name : '';
	                                
	                                trs.push(['<tr>',
	                                	'<td>' + (length + index + 1) + '</td>',
	                                	'<td title="' + opid + '">' + opid + '</td>',
	                                	'<td title="' + con + '">' + con + '</td>',
	                                	'<td title="' + op.content + '">' + op.content + '</td>',
	                                	'<td title="' + browser + '">' + browser + '</td>',
	                                	'<td>' + uid + '</td><td>' + uname + '</td>',
	                                	'<td>' + (new Date(Number(obj.time + '000'))).format() + '</td>',
                                	'</tr>'].join(''))
	                            }
	                        }catch(e){
	                        	/*mining.utils.modalLoading('close');
	                        	$('#tableLog tbody').html('<tr><td colspan="7" class="gray txtc">暂无数据</td></tr>');
                        	 	$('.xlsbtn',$page).removeClass('button_hover');
	                        	$dialog.alert('返回数据<b class="red">第 ' + index + ' 条无法识别</b>，请检查！','error');
	                        	hasError = true;
	                        	return false;*/
	                        }
                        });
                        
                        if(hasError)return;
                        if(result.bodyData.length>0){
                            if(isScroll){
                                $('.list_container',$page).attr('pageno',Number(pageno)+1);
                                $('#tableLog tbody').append(trs.join(''));
                            }else{
                                $('#tableLog tbody').html(trs.join(''));
                                $('.list_container',$page).attr('pageno',1);
                            }
                            $('.xlsbtn',$page).addClass('button_hover');
                        }else{
                        	 $('#tableLog tbody').html('<tr><td colspan="7" class="gray txtc">暂无数据</td></tr>');
                        	 $('.xlsbtn',$page).removeClass('button_hover');
                        }
                        totalCount = result.totalCount
                    },
                    error: function (result) {

                    }
                });
            }
            loadUserList();
            getList();
            $(".list_container", $page).mCustomScrollbar({
                theme: 'minimal',
                callbacks: {
                    onTotalScroll: function () {
                        getList(true);
                    }
                }
            });
            $('.searchbox-btn', $page).off('click').on('click', function () {
                $('.list_container',$page).attr('pageno',1);
                $('#tableLog tbody', $page).html('');
                getList();
            });
            
            //下载table数据
            $('.xlsbtn',$page).off('click').on('click', function(){
            	var title = '导出用户行为日志',
            		trange = $('[name=reservation]',$page).val(),
            		fname = '户行为日志' + (trange ? trange : '').replaceAll(' ','');
            	
            	if(totalCount < 1)return;
				$dialog.confirm({
					title: title,
			        content: '您确定要导出当前条件下&nbsp;<b class="red">' + totalCount + ' 条用户行为日志</b>&nbsp;吗？xls文件名称：<input type="txt" style="width:210px;" name="filename" value="' + fname + '"/>',
			        ok: function(){
			        	var $dlg = this, 
			        		$node = $(this.node), 
			        		filename = $('[name=filename]',$node).val(), 
			        		param = getParam(false);
			        	
			        	param.data.pageNo = 1;
			        	param.data.pageSize = totalCount;
			        	mining.utils.modalLoading();
		                $ajax.ajax({
		                    url: param.url,
		                    data: param.data ,
		                    success: function (result) {
		                        var xlsdata = {
		                        	thead: [],
		                        	tbody: []
		                        },hasError = false; 
		                        
		                        $('#tableLog thead tr',$page).each(function(){
		                        	var trArr = [];
		                        	$(this).find('th').each(function(){
		                        		trArr.push($(this).text());
		                        	});
		                        	xlsdata.thead.push(trArr);
		                        });
		                        $.each(result.bodyData, function (index, obj) {
		                        	try{
	                            		var op = JSON.parse(obj.opid);
		                        		if (op && serverlog['op_' + op.opid]) {
			                                var opid = serverlog['op_' + op.opid] ? serverlog['op_' + op.opid] : '', 
			                                	con = serverlog['con_' + op.opid] ? serverlog['con_' + op.opid] : '',
	                                			browser = op.browser.ua + '-' + op.browser.v + ',' + op.browser.w + 'x' + op.browser.h,
			                                    uid = obj.user_id ? obj.user_id : '', 
			                                    uname = obj.name ? obj.name : '';
			                                    
											xlsdata.tbody.push([(index + 1),opid,con,op.content,browser,uid,uname,(new Date(Number(obj.time + '000'))).format()]);
			                            }
		                        	}catch(e){
		                        		/*mining.utils.modalLoading('close');
			                        	$dialog.alert('返回数据<b class="red">第 ' + index + ' 条无法识别</b>，请检查！','error');
			                        	hasError = true;
			                        	return false;*/
			                        }
		                        }); 
		                        if(hasError)return;
		                        mining.utils.modalLoading('close');
		                        mining.utils.json2xls({
				        			data: xlsdata,
				            		filename: (filename ? filename : fname).replaceAll(' ','')
								});
					        	$dialog.alert('导出 <b class="red">' + xlsdata.tbody.length + '条数据</b> 成功！', 'success');
		                    },
		                    error: function (result) {
								mining.utils.alertMsg(result,'获取数据失败！', 'error');
		                    }
		                });
			        }
				});
            });
        });
    };


    return {
        init: initPage
    }
});
