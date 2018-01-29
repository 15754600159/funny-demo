define(function (require) {

    var $page = $('.page-event'),
        userId = mining.userinfo.user_id,
        userName = mining.userinfo.name,
    	requestUrl = {
    		getinfo: mining.baseurl.gongan + '/zdsj/yjqb/info',
    		getsbfw: mining.baseurl.gongan + '/zdsj/sbfw',
    		getqblx: mining.baseurl.gongan + '/zdsj/qblx',
    		upload: mining.baseurl.host + ':18080/sjz/gongan/zdsj/yjsb/fj/upload',
    		delfj: mining.baseurl.gongan + '/zdsj/yjsb/fj/delete',
    		getcjdw: mining.baseurl.gongan + '/zdsj/cjdw',
    		getjjcd: mining.baseurl.gongan + '/zdsj/jjcd',
    		getxsbh: mining.baseurl.gongan + '/zdsj/yjqb/index',
    		ocr: mining.baseurl.gongan + '/image/ocr',
    		tagExtract: mining.baseurl.apphost + '/tuning/services/sjz/gongan/zdsj/yjqb/nlp/tagExtract',
    		save: mining.baseurl.gongan + '/zdsj/yjsb/submit',
            tagModifyUrl: mining.baseurl.apphost + '/tuning/services/sjz/gongan/zdsj/yjqb/nlp/event_tag_modify'
    	},
    	$report,
        editor,
        datalist = [],
        cbidArr = [],
        reporttab = '',
        getTagExtractState = false,
        editorModule = require('umeditor'),
        labelTree = require('./labelTree'),
        opTags = {
            'delete': [], 
            'add': []
        };
	
	require('select2');
	//刷新布局
    var pageResize = function(){
    	$('.add-report .form-horizontal',$page).height($('.report-add',$page).height()-122);
    }
    
    var init = function(ids, reporttab){
    	userId = mining.userinfo.user_id;
        userName = mining.userinfo.name;
        ids = ids || [];
        reporttab = reporttab || 'intelligence';
        datalist = [];
        cbidArr = [];
        opTags = {
            'delete': [], 
            'add': []
        }
        //ids = ['57a08f4d5004c8570c18c7ae','57a08fac5004c8570c18c7af','57a4596c5004c80f94f9d901']
       	mining.utils.winResize({name:pageResize});
        getInfo(ids, renderData);
    }
    
    var getInfo = function(ids, callback){
    	if(mining.utils.isEmpty(ids)){
    		if(callback)callback();
    		return;
    	}
    	$ajax.ajax({
    		url: requestUrl.getinfo,
    		data: {
    			applicantId: userId,
    			id: ids.join(',')
    		},
    		success: function(result){
    			datalist = result.listObj;
    			if(callback)callback();
    		},
    		error: function(result){
    			$dialog.alert('获取预警情报详情失败，请稍候重试！','error');
    		}
    	});
    }
    
    var renderData = function(ids){
    	$report = $('.add-report',$page);
    		
    	var templ = qblist = zdryxxtmpl = xxzwtmpl = filelist = fjtmpl = '', 
    		categoryData = [],
    		fjArr = [];
    	
    	if(datalist.length > 0) qblist = ['<div class="form-group">',
    	    	'<label class="col-sm-2 control-label">串并列表</label>',
    	    	'<div class="col-sm-8">',
    	    		'<div class="reportdatalist">',
    	    			'<div class="reportitemlist">',
    	    				'<table class="grid newtable"></table>',
    	    				'<a href="javascript:;" class="reportlist-show"><span class="glyphicon glyphicon-chevron-down"></span></a>',
	    				'</div>',
    	    		'</div>',
    	    		'<div class="reportinfo">列表条数：<span class="reportinfo-num">20条</span></div>',
    	    	'</div>',
    	  	'</div>'].join('');
    	zdryxxtmpl = ['<div class="zdryxxlist" style="margin-bottom:8px;border:1px dashed rgba(255,255,255,0);">',
			'<input type="text" name="uid" class="form-control block" placeholder="请输入身份证号..."/>&nbsp;-&nbsp;',
			'<input type="text" name="uname" class="form-control block" placeholder="请输入姓名..."/>&nbsp;-&nbsp;',
			'<input type="text" name="uphone" class="form-control block" placeholder="请输入手机号..."/>&nbsp;-&nbsp;',
			'是否重点人<label><input type="radio" name="uzdr" value="1" class="radio" checked="checked"/>是</label><label><input type="radio" name="uzdr" class="radio" value="0"/>否</label>&nbsp;',
			'<span class="glyphicon glyphicon-plus propertyplus block" title="增加"></span>',
		'</div>'].join('');
    	$.each(datalist, function(i,n){
    		xxzwtmpl += '<p>' + n.xxzw+ '</p>'
    		if(n.fj)fjArr = fjArr.concat(n.fj);
    		if(i == 0 && n.category){
    			$.each(n.category, function(j,m){
    				$.each(m, function(k,o){
	    				categoryData.pushOnly({
	    					id: k,
	    					text: o
	    				});
    				})
    			});
    		}
    		cbidArr.push(n.id);
    	});
    	if(fjArr.length > 0)fjtmpl = ['<div class="form-group">',
	    	'<label class="col-sm-2 control-label">原&nbsp;附&nbsp;件</label>',
	    	'<div class="col-sm-8">',
	    		'<div class="fjlist oldfjlist"></div>',
	    	'</div>',
	  	'</div>',].join('');
	  	try{UM.getEditor('myEditor').destroy();}catch(e){}
    	$report.html(['<div class="form-horizontal required-validate" >',
			qblist,
    	  	'<div class="form-group">',
    	    	'<label class="col-sm-2 control-label">线索编码</label>',
    	    	'<div class="col-sm-8">',
    	    		'<span class="xsbh"></span>',
    	    	'</div>',
    	  	'</div>',
    	  	'<div class="form-group">',
    	    	'<label class="col-sm-2 control-label">信息文号</label>',
    	    	'<div class="col-sm-8">',
    	    		'<input type="text" name="xxwh" class="form-control block required" placeholder="请输入...">',
    	    	'</div>',
    	  	'</div>',
    	  	'<div class="form-group">',
    	    	'<label class="col-sm-2 control-label">标　　题</label>',
    	    	'<div class="col-sm-8">',
    	    		'<input type="text" name="bt" class="form-control required" placeholder="请输入..." style="width:100%;">',
    	    	'</div>',
    	  	'</div>',
    	  	'<div class="form-group">',
    	    	'<label class="col-sm-2 control-label">类　　型</label>',
    	    	'<div class="col-sm-8">',
    	    		'<input type="text" name="qblx" class="form-control block required" placeholder="请选择..."/>',
    	    	'</div>',
    	  	'</div>',
    	  	'<div class="form-group">',
    	    	'<label class="col-sm-2 control-label">报送范围</label>',
    	    	'<div class="col-sm-3">',
    	    		'<input type="text" name="sbfw" class="form-control block required" placeholder="请选择..."/>',
    	    	'</div>',
    	  	'</div>',
    	  	'<div class="form-group">',
    	    	'<label class="col-sm-2 control-label">群体分类</label>',
    	    	'<div class="col-sm-8">',
    	    		'<input type="text" name="category" class="form-control block required" readonly="readonly" placeholder="请选择...">',
    	    		//'<input type="text" name="category" class="form-control block required" placeholder="请选择..."/>',
    	    	'</div>',
    	  	'</div>',
    	  	'<div class="form-group">',
    	    	'<label class="col-sm-2 control-label">紧急程度</label>',
    	    	'<div class="col-sm-8">',
    	    		'<input type="text" name="jjcd" class="form-control block required" placeholder="请选择..."/>',
    	    	'</div>',
    	  	'</div>',
    	  	'<div class="form-group needhid">',
    	    	'<label class="col-sm-2 control-label">事件规模</label>',
    	    	'<div class="col-sm-8">',
    	    		'<input type="text" name="sjgm" class="form-control" placeholder="请输入...">',
    	    	'</div>',
    	  	'</div>',
    	  	'<div class="form-group needhid">',
    	    	'<label class="col-sm-2 control-label">聚集场所</label>',
    	    	'<div class="col-sm-8">',
    	    		'<input type="text" name="jjcs" class="form-control" placeholder="请输入...">',
    	    	'</div>',
    	  	'</div>',
    	  	'<div class="form-group needhid">',
    	    	'<label class="col-sm-2 control-label">事件范围</label>',
    	    	'<div class="col-sm-8">',
    	    		'<input type="text" name="sjfw" class="form-control" placeholder="请输入...">',
    	    	'</div>',
    	  	'</div>',
    	  	'<div class="form-group needhid">',
    	    	'<label class="col-sm-2 control-label">目标诉求</label>',
    	    	'<div class="col-sm-8">',
    	    		'<input type="text" name="hxsq" class="form-control" placeholder="请输入...">',
    	    	'</div>',
    	  	'</div>',
    	  	'<div class="form-group needhid">',
    	    	'<label class="col-sm-2 control-label">骨干成员</label>',
    	    	'<div class="col-sm-8">',
    	    		'<div class="propertylist">',
	    	    		zdryxxtmpl,
					'</div>',
    	    	'</div>',
    	  	'</div>',
    	  	'<div class="form-group needhid">',
    	    	'<label class="col-sm-2 control-label">通联方式</label>',
    	    	'<div class="col-sm-8">',
    	    		'<input type="text" name="tlfs" class="form-control" placeholder="请输入...">',
    	    	'</div>',
    	  	'</div>',
      		'<div class="form-group">',
    	    	'<label class="col-sm-2 control-label">&nbsp;</label>',
    	    	'<div class="col-sm-8">',
    	    		'<form class="ocrfile" onsubmit="return false;" enctype="multipart/form-data">',
    	    			'<input type="file" name="value" id="zdsjOCR" accept="image/*" style="position:absolute;clip:rect(0 0 0 0)">',
    	    			'<input type="hidden" name="name">',
    	    			'<input type="hidden" name="applicantId" vaule="' + userId+ '">',
    	    		'</form>',
    	    		'<label class="btn-current btn-orc nomargin" for="zdsjOCR">扫描件分析</label>',
    	    	'</div>',
    	  	'</div>',
    	  	'<div class="form-group">',
    	  		'<label class="col-sm-2 control-label">情报详情</label>',
    	    	'<div class="col-sm-8">',
    	    		'<script type="text/plain" id="myEditor" style="width:100%;height:240px;">' + xxzwtmpl + '</script>',
    	    	'</div>',
    	  	'</div>',
      		'<div class="form-group">',
    	    	'<label class="col-sm-2 control-label">标　　签</label>',
    	    	'<div class="col-sm-8">',
    	    		'<div class="small-list">暂无标签</div>',
    	    	'</div>',
    	  	'</div>',
    	  	'<div class="form-group">',
    	    	'<label class="col-sm-2 control-label">上传附件</label>',
    	    	'<div class="col-sm-8">',
                    '<span class="btn-current upload-file">上传附件',
        	    		'<form class="uploadfj" onsubmit="return false;" enctype="multipart/form-data">',
        	    			'<input type="file" name="value">',
        	    			'<input type="hidden" name="name">',
        	    			'<input type="hidden" name="applicantId" vaule="' + userId+ '">',
        	    		'</form>',
                    '</span>',
    	    		'<div class="fjlist newfjlist"></div>',
    	    	'</div>',
    	  	'</div>',
    	  	fjtmpl,
    	  	'<div class="form-group">',
    	    	'<label class="col-sm-2 control-label">采集单位</label>',
    	    	'<div class="col-sm-8">',
    	    		'<span class="cjdw"></span>',
    	    	'</div>',
    	  	'</div>',
    	  	'<div class="form-group">',
    	    	'<label class="col-sm-2 control-label">采&nbsp;集&nbsp;人</label>',
    	    	'<div class="col-sm-8">',
    	    		'<span class="cjr"></span>',
    	    	'</div>',
    	  	'</div>',
    	  	'<div class="form-group">',
    	    	'<label class="col-sm-2 control-label">采集时间</label>',
    	    	'<div class="col-sm-8">',
    	    		'<span class="cjsj"></span>',
    	    	'</div>',
    	  	'</div>',
		'</div>',
	  	'<div class="form-group">',
	    	'<div class="col-sm-12 txtc" style="border-top:1px dashed #ccc;">',
	    		'<span class="btn-current yjsb-submit">提交</span>',
	    		'<span class="btn-current yjsb-cancel">取消</span>',
	    	'</div>',
	  	'</div>'].join(''));
		
		$.each(datalist, function(i,n){
			//$('.reportitemlist',$report).append('<div class="reportitem"><div class="reportitem-bt ellipsis" title="' + n.bt+ '">' + n.bt+ '</div><div class="reportitem-cjdw ellipsis" title="' + n.cjdw+ '">' + n.cjdw+ '</div><a href="javascript:;" class="reportitem-del">x</a></div>');
			$('.reportitemlist table',$report).append('<tr gid="' + n.id + '"><td class="reportitem-bt ellipsis" title="' + n.bt+ '">' + n.bt+ '</td><td class="reportitem-cjdw ellipsis" title="' + n.cjdw+ '">' + n.cjdw+ '</td><td><a href="javascript:;" class="reportitem-del"><span class="icon icon-delete3 font12"></span></a></td></div>');
		});
		$('.reportinfo-num',$report).html(datalist.length + '条');
		
		$('input',$report).on('focus', function(){
			$(this).removeClass('error')
		})
		
		//标题
		if(datalist.length > 0)$('[name=bt]',$report).val($('.reportitemlist .reportitem-bt:first',$report).attr('title')).on('focus', function(){
			$(this).removeClass('error');
		});
		
		//上报范围
		var getSBFW = function(){
			$ajax.ajax({
				url: requestUrl.getsbfw,
				data: {
					applicantId: userId,
					type: $('[name=qblx]',$report).val()
				},
				success: function(result){
					var sbfwData = [];
					
					$.each(result.listObj, function(i,n){
						sbfwData.push({id: n.id,text: n.name});
					});
					$('[name=sbfw]',$report).select2({
						data: sbfwData,
						dropdownCssClass: 'addprot-select2'
			    	}).on('select2-open', function(){
						$(this).removeClass('error');
					});
				},
				error: function(){}
			});
		}
		
		//情报类型
		$ajax.ajax({
			url: requestUrl.getqblx,
			data: {
				applicantId: userId
			},
			success: function(result){
				var sbfwData = [], currentId = '';
				
				$.each(result.listObj, function(i,n){
					sbfwData.push({id: n.id,text: n.name});
					if(datalist.length > 0 && n.name == datalist[0].type)currentId = n.id;
				});
				$('[name=qblx]',$report).select2({
					data: sbfwData,
					dropdownCssClass: 'addprot-select2'
		    	}).on('select2-open', function(){
					$(this).removeClass('error');
				}).off('change').on('change', function(){
					getSBFW();
					if($(this).val() == '3'){
						$('.needhid',$report).show();
					}else{
						$('.needhid',$report).hide();
						$('.zdryxxlist:first',$report).siblings('.zdryxxlist').remove();
						$('.needhid input',$report).val('');
					}
				});
				if(!mining.utils.isEmpty(currentId))$('[name=qblx]',$report).select2('val', currentId).change();
			},
			error: function(){}
		});
		
		//群体分类
		/*$('[name=category]',$report).select2({
			data: categoryData,
			dropdownCssClass: 'addprot-select2'
    	}).on('select2-open', function(){
			$(this).removeClass('error');
		});*/
		$('[name=category]',$report).on('click', function(){
			var offset = $(this).offset(), gid = $(this).attr('gid');
			
			$(this).removeClass('error');
			labelTree.init('report-add',[gid],function(data){
	            if(data.length > 0){
		            $('[name=category]',$report).val(data[0].name).attr('gid', data[0].id);
	            }
	        }, 'radio');
	        var checktimer = setInterval(function(){
	        	if($('.report-add .labeltreelist').size() > 0){
	        		clearInterval(checktimer);
		        		$('.report-add .labeltreelist').css({
		        		top: offset.top - 66,
		        		left: offset.left - 20,
		        		'z-index': 9999
		        	}).show();
	        	}
	        },10);
		});
		if(!mining.utils.isEmpty(categoryData)){
			var cdata = categoryData.reverse()[0]
			$('[name=category]',$report).val(cdata.text).attr('gid', cdata.id)
		}
		    	
		//紧急程度
		$ajax.ajax({
			url: requestUrl.getjjcd,
			data: {
				applicantId: userId
			},
			success: function(result){
				var sbfwData = [];
				
				$.each(result.listObj, function(i,n){
					sbfwData.push({id: n.id,text: n.name});
				});
				$('[name=jjcd]',$report).select2({
					data: sbfwData,
					dropdownCssClass: 'addprot-select2'
		    	}).on('select2-open', function(){
					$(this).removeClass('error');
				});
			},
			error: function(){}
		});
		
		//骨干成员
		zdryxxtmpl = $(zdryxxtmpl).find('.propertyplus').addClass('propertyminus glyphicon-minus').removeClass('propertyplus glyphicon-plus').end().find('[name=uzdr]').attr('name','newzdr').end()[0].outerHTML;
		$report.off('click', '.propertyplus').on('click', '.propertyplus', function(e){
			$(this).parent().after(zdryxxtmpl);
			$('[name=newzdr]',$report).attr('name', 'uzdr' + $('.zdryxxlist',$report).size());
		}).off('click','.propertyminus').on('click', '.propertyminus', function(){
			$(this).parent().remove();
		});
					
		//实例化编辑器
		editorModule(function(){
		    editor = UM.getEditor('myEditor');
		    editor.addListener('blur',getTagExtract);
		    getTagExtract();
		});
		
		//原附件
		$.each(fjArr, function(i,n){
			$('.oldfjlist',$report).append('<span class="fjitem ellipsis" title="' + n.name + '"><input type="checkbox" name="oldfj" class="checkbox" value="' + n.id + '"/>' + n.name + '</span>');
		});
		
		//采集单位
		$ajax.ajax({
			url: requestUrl.getcjdw,
			data: {
				applicantId: userId
			},
			success: function(result){
				var name = '';
				
				if(!mining.utils.isEmpty(result)){
					name = result.obj.name
				}
				$('.cjdw',$report).attr('gid', result.obj.id).text(name);
			}
		});
		
		//采集人
		$('.cjr',$report).attr('gid', mining.userinfo.user_id).text(mining.userinfo.name);
		
		//采集时间
		try{clearInterval(cjsjtimer);}catch(e){}
		$('.cjsj',$report).attr('gid', userId);
		var cjsjtimer = setInterval(function(){
			$('.cjsj',$report).text(moment().format('YYYY-MM-DD HH:mm:ss'));
		}, 1000);
		
		//线索编号
		$ajax.ajax({
			url: requestUrl.getxsbh,
			data: {
				applicantId: userId,
				cbid: cbidArr.join(',')
			},
			success: function(result){
				$('.xsbh',$report).text(result.obj.xsbh);
			}
		});
		
		$('.add-report .form-horizontal,.oldfjlist',$page).mCustomScrollbar({
			theme: "minimal",
			callbacks:{
				onScrollStart: function(){
					$('.report-add .labeltreelist').remove();
				}
			},
			advanced:{ 
				autoScrollOnFocus: false 
			}
		});
		
		initEvent();
		pageResize();
    }
    
    var getTagExtract = function(){
    	var content = UM.getEditor('myEditor').getContentTxt();
    	if(mining.utils.isEmpty(content))return;
    	getTagExtractState = true;
    	$('.small-list',$report).html('<span class="gray">将从以上情报详情中分析标签......</span>');
    	$ajax.ajax({
			url: requestUrl.tagExtract,
			type: 'post',
			abort: true,//重复请求时，取消上一次请求
			data:{
				content: content,
				title: $('[name=bt]',$report).val(),
                userID: userId
			},
			success: function(result){
                opTags = {
                    'delete': [], 
                    'add': []
                }
				initTag(result.obj.labels)
				getTagExtractState = false;
			}
		});
    }
    
    var initTag = function(labelArr){
    	$('.small-list',$report).empty();
    	if(mining.utils.isEmpty(labelArr)){
    			$('.small-list',$report).append('<span class="gray">暂无标签</span>');
    	}else{
    		$.each(labelArr, function(i,n){
				$('.small-list',$report).append('<span class="tags tag-current" title="' + n + '">' + n + '<i class="scopaicon scopaicon-shanchuxiao tagitem-del"></i></span>');
			});
    	}
        $('.small-list',$report).append('<span style="display: inline-block;"><input class="add-tags-input" type="text" placeholder="在此输入标签"/><span class="btn-current add-tag-btn"> + </span></span>');
    }
    
    var initEvent = function(){
    	$('.reportlist-show',$report).off('click').on('click', function(){
    		var $this = $(this);
    		
    		if($this.hasClass('active')){
    			$('.reportdatalist',$report).stop(true).animate({height:22},300);
    			$('.reportitemlist',$report).mCustomScrollbar('destroy').find('.reportitem-del').hide();
    			$this.removeClass('active').children('span').addClass('glyphicon-chevron-down').removeClass('glyphicon-chevron-up');
    		}else{
    			$('.reportitemlist',$report).mCustomScrollbar({
					theme: "minimal",
				}).find('.reportitem-del').show();
    			$('.reportdatalist',$report).stop(true).animate({height:$('.reportitemlist',$report).height()},300);
    			$this.addClass('active').children('span').removeClass('glyphicon-chevron-down').addClass('glyphicon-chevron-up');
    		}
    	});
    	
    	//切换情报
    	$('.reportitemlist table tr',$report).off('click').on('click', function(){
    		var gid = $(this).attr('gid'), bt = $(this).find('.reportitem-bt').text(),index = -1;
		        	
        	$.each(datalist, function(i,n){
        		if(n.id == gid){
        			index = i;
        			return false;
        		}
        	});
		    if(index == 0) return;	
    		$dialog.confirm({
				title: '切换情报',
		        content: '您确定要切换主情报为&nbsp;<b class="red">“' + bt + '</b>&nbsp;吗？已编辑信息将被重置！',
		        ok: function(){
		        	var thatArr = datalist.splice(index, 1);
		        	datalist = thatArr.concat(datalist);
		        	renderData();
		        }
			});
    	})
    	
    	//删除情报
    	$('.reportitemlist .reportitem-del',$report).off('click').on('click', function(e){
    		mining.utils.stopBubble(e);
    		var $this = $(this), 
    			$tr = $this.parents('tr:first'),
    			gid = $tr.attr('gid'),
    			bt = $('.reportitem-bt',$tr).attr('title');
    		
    		$dialog.confirm({
				title: '移除情报',
		        content: '您确定要&nbsp;<b class="red">移除“' + bt + '</b>&nbsp;吗？已编辑信息将被重置！',
		        ok: function(){
		        	var index = 0;
		        	$.each(datalist, function(i,n){
		        		if(n.id == gid){
		        			index = i;
		        			return false;
		        		}
		        	});
		        	datalist.splice(index,1);
		        	renderData();
		        }
			});
    	});
    	
    	//OCR扫描件分析btn-analysis
    	var uploadtimer;
    	$('form.ocrfile [name=value]',$report).off('change').on('change', function(){
    		var $this = $(this), $form = $this.parents('form:first'), 
    			path = $this.val(), 
    			name = path.substr(path.lastIndexOf('\\')+1, path.length);
    		
    		if(mining.utils.isEmpty(path)) return;
    		try{clearTimeout(uploadtimer);}catch(e){}
			uploadtimer = setTimeout(mining.utils.modalLoading,1000);
    		$('[name=name]',$form).val(name);
    		$ajax.ajaxSubmit($this.parent(),{
    			url: requestUrl.upload,
    			success: function(result){
    				$form[0].reset();
    				$ajax.ajax({
    					url: requestUrl.ocr,
    					data: {
    						fileid: result.obj.fileid
    					},
    					success: function(ocrresult){
    						try{clearTimeout(uploadtimer);mining.utils.modalLoading('close');}catch(e){}
    						if(!mining.utils.isEmpty(ocrresult.obj)){
    							UM.getEditor('myEditor').setContent(ocrresult.obj);
	    						getTagExtract();
    							$dialog.alert('分析内容添加成功！','success');
    						}else{
    							$dialog.alert('抱歉，未分析到任何内容可添加内容！','warning');
    						}
    					},
    					error: function(result){
    						try{clearTimeout(uploadtimer);mining.utils.modalLoading('close');}catch(e){}
    						var msg = '内容分析失败，请稍后重试！';
		    				if(result && result.message)msg = result.message;
		    				$dialog.alert(msg,'error');
    					}
    				});
    			},
    			error: function(result){
    				try{clearTimeout(uploadtimer);mining.utils.modalLoading('close');}catch(e){}
    				var msg = '文件上传失败，请稍后重试！';
    				if(result && (result.message || result.responseJSON.message))msg = result.message || result.responseJSON.message;
    				$dialog.alert(msg,'error');
    			}
    		});
    	});
    	
    	//删除标签
    	$report.off('click','.small-list .tagitem-del').on('click','.small-list .tagitem-del', function(){
    		var $this = $(this), 
    			$tag = $this.parents('.tags:first'),
    			name = $tag.attr('title');
    		
    		$dialog.confirm({
				title: '移除标签',
		        content: '您确定要&nbsp;<b class="red">移除“' + name + '</b>&nbsp;吗？',
		        ok: function(){
                    opTags['delete'].pushOnly($tag.attr('title'));
                    $tag.remove();
		        }
			});
    	});
    	
        // 添加标签
        $report.off('click','.small-list .add-tag-btn').on('click','.small-list .add-tag-btn', function(){
            var $newTagInput = $report.find('.small-list .add-tags-input');
            if(!mining.utils.isEmpty($newTagInput.val().trim())){
                opTags['add'].pushOnly($newTagInput.val());
                $(this).parents('span:first').before('<span class="tags tag-current" title="' + $newTagInput.val() + '">' + $newTagInput.val() + '<i class="scopaicon scopaicon-shanchuxiao tagitem-del"></i></span>');
                $newTagInput.val('');
            }
        });

    	//上传附件
    	$('form.uploadfj [name=value]',$report).off('change').on('change', function(){
    		var $this = $(this), $form = $this.parents('form:first'), 
    			path = $this.val(), 
    			name = path.substr(path.lastIndexOf('\\')+1, path.length);
    		
    		if(mining.utils.isEmpty(path)) return;
    		$('[name=name]',$form).val(name);
    		$ajax.ajaxSubmit($this.parent(),{
    			url: requestUrl.upload,
    			success: function(result){
    				$('.newfjlist',$report).append('<div class="fjitem" gid="' + result.obj.fileid + '" title="' + name + '">' + name + '<a href="javascript:;" class="fjitem-del red">删除</a></div>');
    				$form[0].reset();
    			},
    			error: function(result){
    				var msg = '文件上传失败，请稍后重试！';
    				if(result && (result.message || result.responseJSON.message))msg = result.message || result.responseJSON.message;
    				$dialog.alert(msg,'error');
    			}
    		});
    	});
    	
    	//删除附件
    	$report.off('click','.fjitem-del').on('click','.fjitem-del', function(){
    		var $item = $(this).parents('.fjitem:first'),
    			name = $item.attr('title'),
    			fjid = $item.attr('gid');
    			
    		$dialog.confirm({
				title: '删除附件',
		        content: '您确定要&nbsp;<b class="red">删除“' + name + '</b>&nbsp;吗？',
		        ok: function(){
		        	$item.slideUp(function(){
		        		$(this).remove();
		        	});
		        }
			});
    	});
    	
    	//提交
    	$('.yjsb-submit').off('click').on('click', function(){
    		var submitData = {
	    			applicantId: userId,
	    			bt: $('[name=bt]',$report).val(),
	    			sbfw: $('[name=sbfw]',$report).val(),
	    			type: $('[name=qblx]',$report).val(),
	    			category: $('[name=category]',$report).attr('gid'),
	    			jjcd: $('[name=jjcd]',$report).val(),
	    			xxwh: $('[name=xxwh]',$report).val(),
	    			
	    			sjgm: $('[name=sjgm]',$report).val(),
	    			jjcs: $('[name=jjcs]',$report).val(),
	    			sjfw: $('[name=sjfw]',$report).val(),
	    			hxsq: $('[name=hxsq]',$report).val(),
	    			zdryxx: '',//骨干成员
	    			tlfs: $('[name=tlfs]',$report).val(),
	    			labels: '',//标签
	    			xxzw: UM.getEditor('myEditor').getContent(),
	    			fj: '',//附件
	    			cjdw: $('.cjdw',$report).attr('gid'),
	    			cjsj: $('.cjsj',$report).text(),
	    			xsbh: $('.xsbh',$report).text(),
	    			cjr: userId,
	    			cbid: '',//来源情报
	    		}, zdryArr = [], labelArr = [], fjArr = [];
    		
    		submitData.cjsj = submitData.cjsj.substring(0, submitData.cjsj.length-2) + '00';//格式化时间到分钟，解决多次点击重复提交问题
    		//骨干成员
    		$('.zdryxxlist',$report).each(function(i,n){
    			var $this = $(this),
    				person_id = $('[name=uid]',$this).val(),
    				name = $('[name=uname]',$this).val(),
    				phone = $('[name=uphone]',$this).val(),
    				iskey = $('[type=radio]:checked',$this).val();
    			
    			if(mining.utils.isEmpty(person_id))return;
    			zdryArr.push({
    				person_id: person_id,
    				name: name,
    				phone: phone,
    				iskey: iskey
    			});
    		});
    		submitData.zdryxx = JSON.stringify(zdryArr);
    		
    		//标签
    		$('.small-list .tag-current', $report).each(function(){
    			labelArr.push($(this).attr('title'));
    		});
    		submitData.labels = labelArr.join(',');
    		
    		//附件
    		$('.newfjlist .fjitem',$report).each(function(){
    			fjArr.push($(this).attr('gid'));
    		});
    		$('.oldfjlist [name=oldfj]',$report).each(function(){
    			if(this.checked){
    				fjArr.push($(this).val());
    			}
    		});
    		submitData.fj = fjArr.join(',');
    		
    		//情报id
    		submitData.cbid = cbidArr.join(',');
    		
    		//数据检测
    		if(mining.utils.isEmpty(submitData.bt)){
    			$('[name=bt]',$report).addClass('error');
    		}
    		if(mining.utils.isEmpty(submitData.sbfw)){
    			$('[name=sbfw]',$report).addClass('error');
    		}
    		if(mining.utils.isEmpty(submitData.type)){
    			$('[name=qblx]',$report).addClass('error');
    		}
    		if(mining.utils.isEmpty(submitData.category)){
    			$('[name=category]',$report).addClass('error');
    		}
    		if(mining.utils.isEmpty(submitData.jjcd)){
    			$('[name=jjcd]',$report).addClass('error');
    		}
    		if(mining.utils.isEmpty(submitData.xxwh)){
    			$('[name=xxwh]',$report).addClass('error');
    		}
    		if($('.error',$report).size() > 0){
	    		$('.add-report .form-horizontal',$page).mCustomScrollbar('scrollTo',$('.error:first',$report));
	    		return;
    		}
    		
    		if(mining.utils.isEmpty(submitData.labels)){
    			$dialog.alert('标签不能为空！','warning');
    			return;
    		}
    		
    		if(mining.utils.isEmpty(submitData.xxzw)){
    			$dialog.alert('情报详情不能为空！','warning');
    			return;
    		}
    		
    		if(getTagExtractState){
    			$dialog.alert('正在从情报详情中分析标签，请您稍等！','warning');
    			return;
    		}
    		$ajax.ajax({
    			url: requestUrl.save,
    			data: submitData,
    			type: 'post',
    			success: function(result){
    				$dialog.alert('预警情报上报成功！','success', function(){
    					$('.report-add').addClass('hidden');
    					//$('.page-event .list-container .tab [tab=' + reporttab + ']').click();
                        //if(window.location.host.indexOf('qbbigdata') == -1 && window.location.host.indexOf('1gongan') == -1){
                            tagModifyAction(opTags,result.obj.id);
                       // }
					   $('.page-event .list-container .tab [tab=report]').click();
    				});
    			},
    			error: function(result){
    				$dialog.alert('预警情报上报失败，请稍后重试！','error');
    			}
    		});
    	});
    	
    	//取消
    	$('.yjsb-cancel', $report).off('click').on('click', function(){
    		$dialog.confirm({
				title: '取消上报',
		        content: '您确定要&nbsp;<b class="red">取消上报</b>&nbsp;吗？',
		        ok: function(){
		        	$('.report-add').addClass('hidden');
		        }
			});
    	});
    }

    var tagModifyAction = function (opTags,id) {
        $ajax.ajax({
            url: requestUrl.tagModifyUrl,
            data: {
                userID: userId,
                caseID: id,
                tag_types: JSON.stringify(opTags)
            },
            type: 'post',
            success: function(result){
                if(result.statusCode == '200'){
                    console.log('保存成功');
                }
            },
            error: function(err){
                console.log(err);
            }
        });
    }
    

    return {
        init: init
    }
});
