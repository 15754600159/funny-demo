define(function(require, exports, module){
	
	/**
     * @name Plugin
     * @class 描述。
     * @requires jquery
     * @author 杨春霞
     * @version v1.0.0  
     */

    /* 
    接口说明：
    上传文档：/nlpdemo/upload，返回文档Id
	获取文档内容：/nlpdemo/docContent?id=docid
	获取文档实体关系提取结果：/nlpdemo/extractInfo?id=docid
	同时获取文档内容和提取结果：/nlpdemo/docContentExtract?id=docid
	保存提取的数据：/nlpdemo/saveExtraction，post：{docid:"9527", extraction: JSON.stringify({e: [], v: [],annotatedText: ""})}
	清除保存的边、点数据：/nlpdemo/clearExtraction?docid=docid
	对前端已经打开的文件，可以单独调用以下API提取文本中的实体和关系信息/nlpdemo/extractInfo?id=<doc_id>
	*/

    var graphModule = new (require('core/common/graphchart/graphchart'))(),
		infosideModule = new (require('core/common/infoside/infoside'))(),
		navtabsModule = require('./filenavtabs'),
		graphData = null,
		graph = null,
		selectionRange = true,
		requestUrl = {
			getFileUrl: mining.baseurl.nlpdemo + '/docContentExtract?id=',
			delAnalyzeUrl: mining.baseurl.nlpdemo + '/clearExtraction?docid=',
			uploadFileUrl: mining.baseurl.nlpdemo + '/upload',
			saveExtractionUrl: mining.baseurl.nlpdemo + '/saveExtraction',
			extractInfoUrl: mining.baseurl.nlpdemo + '/extractInfo?id=',
			getFileListUrl: mining.baseurl.nlpdemo + '/getFilelist?user='
		};

    var $content,
    	$page,
    	contentText = '',//原文
    	annotatedText = '', //处理过的文章内容
    	extractInfo = {e:[],v:[],annotatedText:''}, //提取的信息
    	fileanalyzed = [],  //分析过的文章
    	// fileSnapshot = mining.utils.localStorage(mining.localname.fileSnapshot),
    	fileAnalyze = mining.utils.localStorage(mining.localname.fileAnalyze) || {},
    	itemTabData = {};
   
    seajs.log('文档分析');

    /* 模板渲染 */
	var getTemplateHtml = function (type, obj) {
		switch(type){
			case 'addentity':
				return ['<form class="form-horizontal required-validate" onsubmit="return false;">',
							'<div class="form-group">',
				    	    	'<label class="col-sm-3 control-label">内容</label>',
				    	    	'<div class="col-sm-8"><span style="line-height: 20px;">' + obj.text + '</span></div>',
				    	  	'</div>',
							'<div class="form-group">',
				    	    	'<label class="col-sm-3 control-label">类型</label>',
				    	    	'<div class="col-sm-8">',
				    	    		'<input type="text" name="label" class="required" placeholder="请选择..." style="width:100%;">',
				    	    	'</div>',
				    	  	'</div>',
				    	  	'<div class="form-group">',
				    	    	'<label class="col-sm-3 control-label">属性</label>',
				    	    	'<div class="col-sm-8">',
				    	    		'<div class="propertylist">',
					    	    		'<div class="propertyinfo" style="margin-bottom:8px;border:1px dashed rgba(255,255,255,0);">',
											'<input type="text" name="propertykey" class="form-control block" placeholder="请选择..." style="width:45%;"/>&nbsp;-&nbsp;',
											'<input type="text" name="propertyval" class="form-control block" placeholder="请输入..." style="width:45%;"/>&nbsp;',
											'<span class="glyphicon glyphicon-plus propertyplus block disabled" title="增加"></span>',
										'</div>',
									'</div>',
				    	    	'</div>',
				    	  	'</div>',
		              		'<div class="form-group">',
				    	    	'<label class="col-sm-3 control-label">标注</label>',
				    	    	'<div class="col-sm-8">',
				    	    		'<textarea name="desc" class="form-control" placeholder="请填写..." style="height:100px;"></textarea>',
				    	    	'</div>',
				    	  	'</div>',
						'</form>'].join('');
				break;
			case 'addrelation':
				return ['<form class="form-horizontal required-validate" onsubmit="return false;">',
							'<div class="form-group">',
				    	    	'<label class="col-sm-3 control-label">内容</label>',
				    	    	'<div class="col-sm-8"><span style="line-height: 20px;">' + obj.text + '</span></div>',
				    	  	'</div>',
							'<div class="form-group">',
				    	    	'<label class="col-sm-3 control-label">实体1</label>',
				    	    	'<div class="col-sm-8">',
				    	    		'<select name="source" style="width:100%;">' + obj.optionArr + '</select>',
				    	    	'</div>',
				    	  	'</div>',
							'<div class="form-group">',
				    	    	'<label class="col-sm-3 control-label">实体2</label>',
				    	    	'<div class="col-sm-8">',
				    	    		'<select name="target" style="width:100%;">' + obj.optionArr + '</select>',
				    	    	'</div>',
				    	  	'</div>',
							'<div class="form-group">',
				    	    	'<label class="col-sm-3 control-label">类型</label>',
				    	    	'<div class="col-sm-8">',
				    	    		'<input type="text" name="relation" class="required" placeholder="请选择..." style="width:100%;">',
				    	    	'</div>',
				    	  	'</div>',
				    	  	'<div class="form-group">',
				    	    	'<label class="col-sm-3 control-label">属性</label>',
				    	    	'<div class="col-sm-8">',
				    	    		'<div class="propertylist">',
					    	    		'<div class="propertyinfo" style="margin-bottom:8px;border:1px dashed rgba(255,255,255,0);">',
											'<input type="text" name="propertykey" class="form-control block" placeholder="请选择..." style="width:44%;"/>&nbsp;-&nbsp;',
											'<input type="text" name="propertyval" class="form-control block" placeholder="请输入..." style="width:44%;"/>&nbsp;',
											'<span class="glyphicon glyphicon-plus propertyplus block disabled" title="增加"></span>',
										'</div>',
									'</div>',
				    	    	'</div>',
				    	  	'</div>',
		              		'<div class="form-group">',
				    	    	'<label class="col-sm-3 control-label">标注</label>',
				    	    	'<div class="col-sm-8">',
				    	    		'<textarea name="desc" class="form-control" placeholder="请填写..." style="height:100px;"></textarea>',
				    	    	'</div>',
			    	    	'</div>',
						'</form>'].join('');
		        break;
			case 'menuAdd':
				return ['<ul class="content-menu-list">',
		                '<li class="menu-addentity"><i class="scopaicon scopaicon-tianjiashiti"></i>添加实体</li>',
		                '<li class="menu-addrelation"><i class="scopaicon scopaicon-tianjiaguanxi"></i>添加关系</li>',
		            '</ul>'].join('');
		        break;
		    case 'menuAlter':
		    	return ['<ul class="content-menu-list">',
		                // '<li class="menu-modify">编辑</li>',
		                '<li class="menu-delete"><i class="scopaicon scopaicon-qingkong"></i>删除</li>',
		            '</ul>'].join('');
		        break;
			case 'contentEntity':
				return '<span class="entity" gid="' + obj.gid + '">' + obj.text + '</span>';
				break;
			case 'contentRelation':
				return '<span class="relation" gid="' + obj.gid + '">' + obj.text + '</span>';
				break;
			case 'addAttr':
				return ['<div class="propertyinfo" style="margin-bottom:8px;border:1px dashed rgba(255,255,255,0);">',
							'<input type="text" name="propertykey" class="block" placeholder="请选择..." style="width:45%;"/>&nbsp;-&nbsp;',
							'<input type="text" name="propertyval" class="form-control block" placeholder="请输入..." style="width:45%;"/>&nbsp;',
							'<span class="glyphicon glyphicon-plus propertyplus block" style="cursor:pointer;" title="增加"></span>',
						'</div>'].join('');
				break;
			case 'importfile':
				return ['<form class="form-horizontal required-validate" id="import-fileanalyze" onsubmit="return false;">',
							'<div class="import-panel">',
								'<div class="document-upload">',
									'<input type="file" name="file" />',
								'</div>',
							'</div>',
						'</form>'].join('');
				break;
			case 'minorArr':
				return ['<tr>',
							'<td><label class="attr-title">' + obj.label + '：</label><span class="attr-value"><input type="text" readonly class="noteditstatus" value="' + obj.value + '" /></span></td>',
						'</tr>'].join('');
				break;
			case 'docList':
				var arr = [];
				$.each(obj,function(i,n){
					arr.push(['<tr data-id="' + n.id + '">',
								'<td>' + n.id + '</td>',
								'<td>' + n.filename + '</td>',
							'</tr>'].join(''));
				});
				return ['<div class="page-filelist-box">',
							'<table class="table table-hover">',
								'<thead>',
									'<tr>',
										'<th style="font-weight: bold;">文档id</th>',
										'<th style="font-weight: bold;">文档名称</th>',
									'</tr>',
								'</thead>',
								'<tbody>',
									arr.join(''),
								'</tbody>',
							'</table>',
						'</div>'].join('');
				break;
			default:
				break;
		}
	}

	var creatTab = function(data){
		var docTitle = data.filename,
			docId = data.id,
			obj = {
				'filename': docTitle,
			    'gid': docId
			};
		mining.utils.updateFileData('add',{dataArr:[obj],tabType:'3'},function(result){
			navtabsModule.add($.extend(obj,result), true);
		});
	}

    /* upload file*/
	var uploadFileAction = function(){
		mining.utils.modalLoading();
		$ajax.ajaxSubmit($('#import-fileanalyze'),{
            url: requestUrl.uploadFileUrl,
            success: function(data){
              	docId = data.id;
            	if(data.hasOwnProperty('exceptionMsg')){
            		mining.utils.modalLoading('close');
            		$dialog.alert(data.exceptionMsg);
            		return false;
            	}
				contentText = data.content;
				// navtabsModule.add(tabs, true);
				creatTab(data);
				showFileAction(docId,data);
        	},
         	error: function(err){
         		mining.utils.modalLoading('close');
         		if(err.hasOwnProperty('exceptionMsg')){
            		$dialog.alert(err.exceptionMsg);
            		return false;
            	}
          		console.log(err);
         	}
        });
	}

	// load content
	var openDocListAction = function(){
		$ajax.ajax({
			url: requestUrl.getFileListUrl + mining.userinfo.user_id,
			success: function(data) {
				var filelist = data.filelist;
				$dialog({
					title: '文档列表',
					width: 500,
					height: 200,
					padding: '10px 20px',
					onshow: function(){
						var $dlg = this, $node = $(this.node);
						
						$dlg.content(getTemplateHtml('docList',filelist));
						$('.page-filelist-box').mCustomScrollbar({
				    		theme: 'minimal'
				    	}); 
				    	$('.page-filelist-box table tr').off('click').on('click',function(){
				    		var itemId = $(this).attr('data-id');
				    		getDocContent(itemId,true);
				    		$dlg.close().remove();
				    	});
					}
				}).showModal();
			},
			error:function(err){
				console.log(err);
			}
		});
	}

	// 获取文档列表中文档数据
	var getDocContent = function(docId,isAddTab){
		if(docId == $content.attr('gid'))return;
		mining.utils.modalLoading();
		$ajax.ajax({
			url: requestUrl.getFileUrl + docId,
			success: function(data){
				contentText = data.content;
				if(isAddTab){
					data.id = docId;
					creatTab(data);
				}
				if(mining.utils.isEmpty(data.extraction)){
					if($.inArray(docId, fileanalyzed) > -1){
						fileAnalyze = mining.utils.localStorage(mining.localname.fileAnalyze) || {};
						if(fileAnalyze[docId]){
							var interimData = fileAnalyze[docId];
							graphData = interimData;
							annotatedText = graphData.extraction.annotatedText;
							extractInfo = graphData.extraction;
							// fileanalyzed.pushOnly(docId);
						}else{
							fileanalyzed.remove(docId);
						}
					}
					showFileAction(docId,data);
				}else{
					graphData = data;
					annotatedText = graphData.extraction.annotatedText; //分析后内容
					extractInfo = graphData.extraction;
					fileanalyzed.pushOnly(docId);
					showFileAction(docId,data,true);
				}
				
			},
			error: function(err){
				mining.utils.modalLoading('close');
				console.log(err);
			}
		});
	}

	/* 保存文档 */
	var saveFileAction = function(docId){
        mining.utils.modalLoading();
        if(extractInfo && extractInfo.hasOwnProperty('annotatedText')){
        	extractInfo.annotatedText = $('.content-text-details',$page).html();
	        // 遍历剩下的graph节点，组装成新的数据
			var eArr = [],
				vArr = [];
			if(graph){
				if(graph.elements() && graph.elements().length > 0){
					$.each(graph.elements(),function(eIndex,eItem){
						var eData = eItem.data().data,
							etype = eData.category;
						contentText = extractInfo.originalText;
						annotatedText = $($('.content-panel .content-text .content-text-details',$page).clone()).find('span').removeClass('active').parents('.content-text-details').html();
						if(etype == 'entity'){
							vArr.pushOnly(eData);
						}else if(etype == 'relation'){
							eArr.pushOnly(eData);
						}
					});
				}
				extractInfo = {
					annotatedText: annotatedText,
					originalText: contentText,
					e: eArr,
					v: vArr
				}
			}else{
				extractInfo = null;
			}
			
        }
        var extractionData = {
            'docid': docId,
            'username': mining.userinfo.user_id,
            'extraction': extractInfo ? JSON.stringify(extractInfo) : null
        };
        
        
        $.post(requestUrl.saveExtractionUrl,extractionData,function(data){
        	mining.utils.modalLoading('close');
            if(data.status == 'success'){
                $dialog.alert('数据保存成功');
                delete data.status;
                // fileSnapshot = mining.utils.localStorage(mining.localname.fileSnapshot);
                // fileSnapshot.current = data.id;
                var $tabEle = $('.filenavtabs .tabslist .tab-panel[gid="' + docId + '"]'),
                	tabId = $tabEle.attr('data-tabid'),
					tabData = $tabEle.data('data'),
					randomNum = tabId.substr(tabId.length - 3),
					newTabId = 'tab' + data.id + randomNum;
                tabData.gid = data.id;
                tabData.tabId = newTabId;
                // mining.utils.updateFileData('changeTab',{tabId:newTabId});
                // mining.utils.updateFileData('changeItem',{tabId:newTabId,itemId:data.id});
                $tabEle.attr('gid',data.id).attr('data-tabid',newTabId).data('data',tabData);
                $('.filenavtabs .tabsmorelist li[gid="' + docId + '"]').attr('gid',data.id).attr('data-tabid',newTabId).data('data',tabData);
                // $.each(fileSnapshot.navtabs,function(i,n){
                // 	if(n == docId){
                // 		fileSnapshot.navtabs[i] = data.id;
                // 	}
                // });
                // $.each(fileSnapshot.filedata,function(i,n){
                // 	if(n.gid == docId){
                // 		fileSnapshot.filedata[i]['gid'] = data.id;
                // 	}
                // });
				fileanalyzed.remove(docId);
                fileAnalyze = mining.utils.localStorage(mining.localname.fileAnalyze) || {};
                if(fileAnalyze[docId]){
                	delete fileAnalyze[docId];
                }
                mining.utils.localStorage(mining.localname.fileAnalyze,fileAnalyze);
                // mining.utils.localStorage(mining.localname.fileSnapshot,fileSnapshot);
                // fileSnapshot = mining.utils.localStorage(mining.localname.fileSnapshot);
                mining.utils.updateFileData('changeKey',{tabId:newTabId,keyId:tabId,newKeyId:newTabId,docId:docId,newDocId:data.id});
            }
        },'json');
	}


	var clearFileAction = function(docId){
		mining.utils.modalLoading();
		$ajax.ajax({
            url: requestUrl.delAnalyzeUrl + docId,
            success: function(data){
            	mining.utils.modalLoading('close');
                if(data.status == 'success'){
                	// analyzeFileAction(docId);
                	initFileAnalyzeBox(true);
                	$('.content-text-details',$page).removeClass('loading').html(extractInfo.originalText);
                	extractInfo = null;
                    $dialog.alert('数据清除成功');
                }else{
                    $dialog.alert(data.error);
                }
            },
            error: function(err){
            	mining.utils.modalLoading('close');
                console.log(err);
            }
         });
	}

	/* 初始化页面布局 */
	var initFileAnalyzeBox = function(isClear){
		if(isClear){
			$('.content-text-details',$page).removeClass('loading').html(contentText);
		}else{
			$('.content-text-details',$page).addClass('loading').empty();
		}
		$('.attrlist-panel .propertylist tbody',$page).empty().removeClass('hidden');
		$('.content-panel',$page).height('100%');
		$('.attrlist-panel',$page).addClass('hidden');
		$('.file-info',$page).addClass('hidden');
		$('.file-show',$page).removeClass('analyzed');
	}


    /* load文档数据 */
	var analyzeFileAction = function(docId){
		mining.utils.modalLoading();
		// $('.content-box',$page).attr('gid',docId).attr('tabid','tab' + docId);
		$ajax.ajax({
			url: requestUrl.extractInfoUrl + docId,
			success: function(data){
				graphData = data;
				annotatedText = graphData.extraction.annotatedText; //分析后内容
				contentText = data.content;
				extractInfo = graphData.extraction;
				fileAnalyze = mining.utils.localStorage(mining.localname.fileAnalyze) || {};
				if(fileAnalyze){
					fileAnalyze[docId] = {};
					fileAnalyze[docId] = graphData;
				}
				
				mining.utils.localStorage(mining.localname.fileAnalyze,fileAnalyze);
				fileAnalyze = mining.utils.localStorage(mining.localname.fileAnalyze);
				fileanalyzed.pushOnly(docId);
				showFileAction(docId,data,true);
			},
			error: function(err){
				mining.utils.modalLoading('close');
				console.log(err);
			}
		});
	}    

	/* 显示文档正文内容 */
	var showFileAction = function(docId, data, isAnalyze){
		$content.attr('gid',docId).attr('tabid','tab' + docId);
		$('.toolbar .file-analyze, .toolbar .file-save, .toolbar .file-delete').removeClass('hidden');
		$('.toolbar .file-tograph, .toolbar .file-tomap').addClass('disable');
		$('.content-box .fileanalyze-box').removeClass('hidden').siblings('.filecontent-box').addClass('hidden');

		if($('.fileanalyze-box',$content).attr('gid') && $('.fileanalyze-box',$content).attr('gid').length > 0){
			initFileAnalyzeBox();
		}
		// $content.attr('gid',docId);
		$('.fileanalyze-box',$content).attr('gid',docId);
		$('.fileanalyze-box .content-panel .document-title').html(data.filename);
		$('.fileanalyze-box .content-panel .document-size').html(data.fileSize);
		if($.inArray(docId, fileanalyzed) > -1 || isAnalyze){
			$('.content-panel',$page).css('height',$('.file-show .show-box',$page).outerHeight() - 200);
			$('.content-text-details',$page).removeClass('loading').html(annotatedText);
			$('.attrlist-panel',$page).removeClass('hidden');
			$('.file-show',$page).addClass('analyzed');
			$('.file-info',$page).removeClass('hidden');
			$('#fileAnalyzeGraph',$content).height($('.fileAnalyzeGraph',$page).height());
			

			// 初始化面板
	    	initializePanelAction();

			// 绑定图析区域事件 
			graphPanelAction();
			
			// 绑定正文区域事件
	    	contentPanelAction();

	    	// 绑定关闭panel按钮
	    	panelAction();
		}else{
			$('.content-text-details',$page).removeClass('loading').html(contentText);
		}
		mining.utils.modalLoading('close');
		// 正文区添加scrollbar
		var $mainArea = $('.content-panel .content-text',$page);
		$mainArea.mCustomScrollbar({
    		theme: 'minimal'
    	}); 
	}


	/* 正文区域事件 */
	var contentPanelAction = function(){
		$('.content-text',$page).off('click').on('click', function(e){
			var dom = e.target;
			if(dom.nodeName == 'SPAN' && (dom.className == 'entity' || dom.className == 'relation')){
				var gid = $(dom).attr('gid');
				$('.content-text span[gid]',$page).removeClass('active');
				$('.content-text span[gid="' + gid + '"]',$page).addClass('active');
				graph.$(':selected').unselect();
				graph.$('#' + gid).select();
				var filedata = graph.$('#' + gid).data().data;
				
				//主副属性
		    	var minorArr = mining.mappingutils.getProperties(filedata);
				$('.fileanalyze-box .attrlist-panel .propertylist tbody',$page).empty();
		    	$.each(minorArr, function(i,n){
		    		if(typeof filedata[i] != 'string') return;
		    		$('.fileanalyze-box .attrlist-panel .propertylist tbody',$page).append(getTemplateHtml('minorArr',{'label':n.name,'value':n.value}));
		    	});
		    	attrPanelAction();
			}else{
				graph.$(':selected').unselect();
				$('.fileanalyze-box .attrlist-panel .propertylist tbody',$page).empty();
			}
		});
		  	
		var $mainArea = $('.content-panel .content-text .content-text-details',$page);
    	// 手动分析正文
    	$mainArea.unbind('contextmenu').bind('contextmenu',function(e){
    		var focusDom = null,
    			focusText = '';
    		if(window.getSelection || document.getSelection){
    			focusDom = window.getSelection ? window.getSelection().getRangeAt(0) : document.getSelection().getRangeAt(0);
    			focusText = focusDom.toString();
    			selectionRange = true;
    		}else if(document.selection && document.selection.createRange()){
    			focusDom = document.selection.createRange();
    			focusText = focusDom.text;
    			selectionRange = false;
    		}
    		if(focusText && focusText.length > 0){
    			// 选择文字内容后调用右键菜单
	    		var obj = {
	    			eventPosX:e.pageX,
	    			eventPosY:e.pageY,
	    			text:focusText,
	    			focusDom:focusDom,
	    			menu:'menuAdd'
	    		} 
	    		displayContentAaction(obj);
	    	}else if(e.target.nodeName == 'SPAN'){
	    		// 选择文字内容后调用右键菜单
	    		var obj = {
	    			eventPosX:e.pageX,
	    			eventPosY:e.pageY,
	    			text:e.target,
	    			menu:'menuAlter'
	    		} 
	    		displayContentAaction(obj);
	    	}
    		return false;
    	});
	}

	/* 属性区域事件 */
	var attrPanelAction = function(){
		var $attrPanelList = $('.attrlist-panel .panel-list',$page);
    	// 点击编辑属性
    	$attrPanelList.find('table td').off('dblclick').on('dblclick',function(){
    		var $input = $(this).find('span.attr-value>input.noteditstatus').removeClass('noteditstatus').removeAttr('readonly'),
            	l = $input.val().length;
            $input.focus().prop({
                selectionStart:l,
                selectionEnd:l
            });
    	}).find('span.attr-value>input').off('blur').on('blur',function(){
    		$(this).prop('readonly','true').addClass('noteditstatus');
    	});;
	}

	/* 图析区域事件 */
	var graphPanelAction = function(){
		// 图析区添加scrollbar
		graphModule.init({
			container: $('#fileAnalyzeGraph', $page),
			navigator:false,
			readyCallback: function(){
				window.filegraph2 = this;
				graph = this;
				//初始化详情
				infosideModule.init({
					graph: graph,
					container: $('.groupinfoside', $page)
				});
				mining.utils.chartResize();
			},
			dataCallback: function(){
				infosideModule.refresh({
					graph: graph,
					container: $('.groupinfoside', $page),
					details: false,
					timereel: false,
					selectec: false
				});
			},
			selectCallback: function(){
				if(graph.$(':selected').length>0){
					var filedata = graph.$(':selected').data().data,
						gid = filedata.gid;
					//主副属性
			    	var minorArr = mining.mappingutils.getProperties(filedata);
			    	// 更新属性列表
					$('.fileanalyze-box .attrlist-panel .propertylist tbody',$page).empty();
			    	$.each(minorArr, function(i,n){
			    		if(typeof filedata[i] != 'string') return;
			    		$('.fileanalyze-box .attrlist-panel .propertylist tbody',$content).append(getTemplateHtml('minorArr',{'label':n.name,'value':n.value}));
			    	});
			    	attrPanelAction();
			    	// 正文中高亮
					$('.content-text span[gid]',$page).removeClass('active');
					$('.content-text span[gid="' + gid + '"]',$page).addClass('active');
				}else{
					$('.content-text span[gid]',$page).removeClass('active');
					$('.fileanalyze-box .attrlist-panel .propertylist tbody',$page).empty();
				}
			}
		});
		graphModule.delelements('all');
		graphModule.appenddata(graphData.extraction, false);
		graphModule.layout('breadthfirst');//分层排布
		$('.grouplist',$page).mCustomScrollbar({
    		theme: 'minimal'
    	});
	}

	/* 正文区域右键事件 */
	var displayContentAaction = function(obj){
		var $menu = $('.content-menu'),
			$mainArea = $('.content-panel .content-text-details',$page);
		$menu.empty().removeClass('hidden').append(getTemplateHtml(obj.menu)).css({
			'left':obj.eventPosX + 15,
			'top':obj.eventPosY + 15
		});
		// 添加实体
		$menu.find('li.menu-addentity').off('click').on('click',function(){
			$menu.empty().addClass('hidden');
			$dialog({
				title: '添加实体',
				width: 500,
				padding: '20px 0 0',
				onshow: function(){
					var $dlg = this, $node = $(this.node);
					
					$('.main').addClass('blur');//添加背景模糊效果
					$dlg.content(getTemplateHtml('addentity',obj));
					
					//添加属性
					var entityList = mining.mappingutils.getTypeList('entity'),
						tmpl = getTemplateHtml('addAttr');

					var refreshProList = function(){
						var proData = $('.propertylist',$node).data('proData'),
							laveData = mining.utils.clone(proData),
							proArr = [],
							emtpycount = 0;
						
						$('[name=propertykey]',$node).each(function(i){
							var _data = $(this).select2('data');
							
							if(!mining.utils.isEmpty(_data)){
								laveData.remove(_data);
							}else{
								$(this).select2('val', laveData.shift().id);
							}
						});
						$('[name=propertykey]',$node).each(function(i){
							var _data = $(this).select2('data'),
								thisdata = mining.utils.clone(laveData);
							
							thisdata.splice(0, 0, _data);
							$(this).select2({
								data: thisdata,
						    	dropdownCssClass: 'artui-select2'
					  		}).on('change', refreshProList).select2('val', thisdata[0].id);
						});
					}
					
					$('[name=label]',$node).select2({
					    data: (function(){
					    	var arr = [];
					    	$.each(entityList, function(i,n){
								arr.push({
									id: i,
									text: n
								});
							});
							
							return arr;
					    })(),
				    	dropdownCssClass: 'artui-select2'
					}).on('change', function(){
						var labelname = $(this).val(),
							prolist = mining.mappingutils.getProperties(labelname),
							proData = [];

						$.each(prolist, function(i,n){
							proData.push({id: i,text: n.name});
						});
						$('.propertylist',$node).data('proData', proData).empty().append(tmpl);
						if($('[name=propertykey]',$node).size() >= proData.length)$('.propertyplus',$node).addClass('disabled');
						$('[name=propertykey]',$node).select2({
							data: proData,
					    	dropdownCssClass: 'artui-select2'
				    	}).select2('val', proData[0].id);
					}).on('select2-open', function(){
						$(this).siblings('label.error').remove();
					});
					
					$node.on('change', '[name=propertykey]', function(){
						$(this).siblings('[name=propertyval]').val('');
					});
					$node.on('mouseover', '.propertyplus,.propertyminus', function(){
						$(this).parent().css('border-color','rgba(255,255,255,0.5)');
					}).on('mouseout', '.propertyplus,.propertyminus', function(){
						$(this).parent().css('border-color','rgba(255,255,255,0)');
					}).on('click', '.propertyplus', function(e){
						var proData = $('.propertylist',$node).data('proData'),
							$parent = $(this).parent(),
							$newinfo = $(tmpl).append('<span class="glyphicon glyphicon-minus propertyminus" title="删除"></span>');
						
						window.getSelection ? window.getSelection().removeAllRanges() : document.selection.empty(); 
						if($(this).hasClass('disabled') || mining.utils.isEmpty(proData))return;
						$('.propertyplus',$newinfo).remove();
						if($parent.siblings().size()>0){
							$parent.siblings().last().after($newinfo);
						}else{
							$parent.after($newinfo);
						}
						if($('[name=propertykey]',$node).size() >= proData.length)$(this).addClass('disabled');
						$('[name=propertykey]',$newinfo).select2({
							data: proData,
					    	dropdownCssClass: 'artui-select2'
				    	});
						refreshProList();
					}).on('click', '.propertyminus', function(){
						$('.propertyplus',$node).removeClass('disabled');
						$(this).parent().remove();
						refreshProList();
					});
					$('.propertylist',$node).parent().mCustomScrollbar({
						theme: 'minimal'         
					}).css('max-height', '300px');
				},
				okValue: '确定',
				ok: function(){
					var $dlg = this, 
						$node = $(this.node),
						labelname = $('[name=label]',$node).val(),
						proData = {},
						gid = '',
						nodedata = {e: [], v: []};
					
					if(mining.utils.isEmpty(labelname))return false;
					$('[name=propertykey]',$node).each(function(){
						var key = $(this).val(),
							value = $(this).siblings('[name=propertyval]').val();
						
						if(mining.utils.isEmpty(key) || mining.utils.isEmpty(value))return;
						proData[key] = value;
					});
					if(labelname.indexOf('person') != -1 && mining.utils.isEmpty(proData['xb'])){
						proData['xb'] = '男';
					}
					gid = 'custom_entity_' + mining.utils.randomInt(0, 99999);
					var mappingdata = mining.mapping.objList[labelname];
					obj.gid = gid;
					nodedata.v.push($.extend(proData, {
						gid: gid,
						etype: 'entity',
						category: 'entity',
						label: mappingdata.label,
						type: mappingdata.type
					}));
					graphModule.appenddata(nodedata);
					graph.$('#'+gid).addClass('new');
					// graphModule.layout('breadthfirst');//分层排布
					$dlg.close().remove();
					var str = getTemplateHtml('contentEntity',obj);
					if(selectionRange){
						obj.focusDom.deleteContents();
 						obj.focusDom.insertNode($(str).get(0));
					}else{
						var strHtml = obj.focusDom.htmlText;
						obj.focusDom.select();
						obj.focusDom.pasteHTML(str);
					}
					contentPanelAction();
					$('.content-text [gid="' + gid + '"]',$page).click();
				},
				cancelValue: '取消',
				cancel: true,
	    		onclose: function(){
	    			$('.main').removeClass('blur');//去除背景模糊效果
	    		}
			}).showModal();
		});
		// 添加关系
		$menu.find('li.menu-addrelation').off('click').on('click',function(){
			$menu.empty().addClass('hidden');
			$dialog({
				title: '添加关系',
				width: 500,
				padding: '20px 0 0',
				onshow: function(){
					var $dlg = this, $node = $(this.node);
					
					var entityArr = [], optionArr = [];
					$.each(graph.$('node'), function(i,n){
						var _data = n.data().data, title = '';
						
						$.each(mining.mappingutils.getShowlabel(_data), function(i,n){
							title += ('-' + n.value)
						})
						if(title != ''){
							entityArr.push({
								id: _data.gid,
								name: title
							});
						}
					})
					$.each(entityArr, function(i,n){
						optionArr.push('<option value="' + n.id + '">' + n.name + '</option>');
					})
					obj.optionArr = optionArr;
					
					$('.main').addClass('blur');//添加背景模糊效果
					$dlg.content(getTemplateHtml('addrelation',obj));
					
					//添加属性
					var relationList = mining.mappingutils.getTypeList('relation'),
						relationArr = [],
						relationData = [],
						tmpl = getTemplateHtml('addAttr');
					
					$('select',$node).select2();
					var refreshProList = function(){
						var proData = $('.propertylist',$node).data('proData'),
							laveData = mining.utils.clone(proData),
							proArr = [],
							emtpycount = 0;
						
						$('[name=propertykey]',$node).each(function(i){
							var _data = $(this).select2('data');
							
							if(!mining.utils.isEmpty(_data)){
								laveData.remove(_data);
							}else{
								$(this).select2('val', laveData.shift().id);
							}
						});
						$('[name=propertykey]',$node).each(function(i){
							var _data = $(this).select2('data'),
								thisdata = mining.utils.clone(laveData);
							
							thisdata.splice(0, 0, _data);
							$(this).select2({
								data: thisdata,
						    	dropdownCssClass: 'artui-select2'
					  		}).on('change', refreshProList).select2('val', thisdata[0].id);
						});
					}
					
					
					
					$('[name=relation]',$node).select2({
						data: (function(){
							var arr = [];
							$.each(relationList, function(i,n){
								if(mining.utils.isEmpty(n)) return;
								arr.push({
									id: i,
									text: n
								});
							});
							
							return arr;
						})(),
				    	dropdownCssClass: 'artui-select2'
			    	}).on('change', function(){
						var labelname = $('[name=relation]',$node).val(),
							prolist = mining.mappingutils.getProperties(labelname),
							proData = [];

						$.each(prolist, function(i,n){
							if(mining.utils.isEmpty(n)) return;
							proData.push({id: i,text: n.name});
						});
						$('.propertylist',$node).data('proData', proData).empty().append(tmpl);
						if($('[name=propertykey]',$node).size() >= proData.length)$('.propertyplus',$node).addClass('disabled');
						$('[name=propertykey]',$node).select2({
							data: proData,
					    	dropdownCssClass: 'artui-select2'
				    	}).select2('val', proData[0].id);
					});
					
					$node.on('change', '[name=propertykey]', function(){
						$(this).siblings('[name=propertyval]').val('');
					});
					$node.on('mouseover', '.propertyplus,.propertyminus', function(){
						$(this).parent().css('border-color','rgba(255,255,255,0.5)');
					}).on('mouseout', '.propertyplus,.propertyminus', function(){
						$(this).parent().css('border-color','rgba(255,255,255,0)');
					}).on('click', '.propertyplus', function(e){
						var proData = $('.propertylist',$node).data('proData'),
							$parent = $(this).parent(),
							$newinfo = $(tmpl).append('<span class="glyphicon glyphicon-minus propertyminus" title="删除"></span>');
						
						window.getSelection ? window.getSelection().removeAllRanges() : document.selection.empty(); 
						if($(this).hasClass('disabled') || mining.utils.isEmpty(proData))return;
						$('.propertyplus',$newinfo).remove();
						if($parent.siblings().size()>0){
							$parent.siblings().last().after($newinfo);
						}else{
							$parent.after($newinfo);
						}
						if($('[name=propertykey]',$node).size() >= proData.length)$(this).addClass('disabled');
						$('[name=propertykey]',$newinfo).select2({
							data: proData,
					    	dropdownCssClass: 'artui-select2'
				    	});
						refreshProList();
					}).on('click', '.propertyminus', function(){
						$('.propertyplus',$node).removeClass('disabled');
						$(this).parent().remove();
						refreshProList();
					});
					$('.propertylist',$node).parent().mCustomScrollbar({
						theme:"minimal"         
					}).css('max-height', '300px');
				},
				okValue: '确定',
				ok: function(){
					var $dlg = this, 
						$node = $(this.node);
						labelname = $('[name=relation]',$node).val(),
						proData = {},
						gid = '',
						nodedata = {e: [], v: []};
					
					if(mining.utils.isEmpty(labelname))return false;
					$('[name=propertykey]',$node).each(function(){
						var key = $(this).val(),
							value = $(this).siblings('[name=propertyval]').val();
						
						if(mining.utils.isEmpty(key) || mining.utils.isEmpty(value))return;
						
						proData[key] = value;
					});
					
					gid = 'custom_relation_' + mining.utils.randomInt(0, 99999);
					var mappingdata = mining.mapping.objList[labelname];
					obj.gid = gid;
					nodedata.e.push($.extend(proData, {
						gid: gid,
						etype: 'relation',
						category: 'relation',
						label: mappingdata.label,
						type: mappingdata.type,
						from: $('[name=source]',$node).val(),
						to: $('[name=target]',$node).val()
					}));
					graphModule.appenddata(nodedata);
					graphModule.layout('breadthfirst');//分层排布
					graph.$('#'+gid).addClass('new');
					$dlg.close().remove();
					var str = getTemplateHtml('contentRelation',obj);
					if(selectionRange){
						obj.focusDom.deleteContents();
 						obj.focusDom.insertNode($(str).get(0));
					}else{
						var strHtml = obj.focusDom.htmlText;
						obj.focusDom.select();
						obj.focusDom.pasteHTML(str);
					}
					contentPanelAction();
					$('.content-text [gid="' + gid + '"]',$page).click();
				},
				cancelValue: '取消',
				cancel: true,
	    		onclose: function(){
	    			$('.main').removeClass('blur');//去除背景模糊效果
	    		}
			}).showModal();
		});

		// 删除实体或关系
		$menu.find('li.menu-delete').off('click').on('click',function(){
			$menu.empty().addClass('hidden');
			var gid = $(obj.text).attr('gid'),
				content = $('.content-text-details',$page).html(),
				el = $('.content-text-details span[gid="' + gid + '"]',$page);
			// 文档中取消高亮
			$.each(el,function(){
				content = content.replace($(this).prop('outerHTML'), $(this).text());
			});
			$('.content-text-details',$page).html(content);
			// 删除graph中元素
			graph.$('#' + gid).select();
			graphModule.delelements(':selected');
			graph.$(':selected').unselect();
			contentPanelAction();
		});

		// 点击页面其他位置，菜单消失
		$(document).off('mousedown.dismenu').on('mousedown.dismenu',function(e){
			if(!$(e.target).parents().hasClass('content-menu-list')){
				$menu.addClass('hidden');
			}
		});
	}

	var initializePanelAction = function(){
		var $attrPanelList = $('.attrlist-panel .panel-list');
		// 属性区添加scrollbar
		$attrPanelList.mCustomScrollbar({
    		theme: 'minimal'
    	});

    	var $statisticArea = $('.statistic-panel .panel-list');
		// 统计区添加scrollbar
		$statisticArea.mCustomScrollbar({
    		theme: 'minimal'
    	});
	}

	/* 面板resize */
	var panelAction = function(){
		var $showBox = $('.file-show',$page),
			$attrCloseBtn = $('.close-attr-panel',$page),
			$attrShowBtn = $showBox.find('.drag-vertical-line-change'),
			$attrPanel = $('.attrlist-panel',$page),
			$contentPanel = $('.content-panel',$page),
			$infoBox = $('.file-info',$page),
			$statisticsCloseBtn = $('.close-statistics-panel',$page),
			$statisticsShowBtn = $infoBox.find('.drag-vertical-line-change'),
			$statisticsPanel = $('.statistics-panel',$page),
			$graphPanel = $('.graphinfo-panel',$page);


		// 属性列表panel关闭
		$attrCloseBtn.off('click').on('click',function(){
			var panelH = $showBox.height();
			$attrPanel.addClass('hidden');
			$attrShowBtn.removeClass('hidden');
			$contentPanel.css({
				'height': panelH + 'px'
			});
		});

		// 属性列表panel展开
		$attrShowBtn.off('click').on('click',function(){
			$attrPanel.removeClass('hidden');
			$attrShowBtn.addClass('hidden');
			var panelH = $contentPanel.height() - $attrPanel.height();
			$contentPanel.css({
				'height': panelH + 'px'
			});
		});

		

		// 统计列表panel关闭
		$statisticsCloseBtn.off('click').on('click',function(){
			$statisticsPanel.addClass('hidden');
			$statisticsShowBtn.removeClass('hidden');
			$graphPanel.css({
				'height':'100%'
			});
		});

		// 统计列表panel展开
		$statisticsShowBtn.off('click').on('click',function(){
			$statisticsPanel.removeClass('hidden');
			$statisticsShowBtn.addClass('hidden');
			var panelH = $graphPanel.height() - $statisticsPanel.height() - 10;
			$graphPanel.css({
				'height': panelH + 'px'
			});
		});
	}


	/* 固定表头 */
    var fixedThead = function($tablewrap){
        var ths = '';
        $('th',$tablewrap).each(function(){
            ths += '<th style="width:' + $(this).width() + 'px;text-align:center;">' + $(this).text() + '</th>';
        });
        $('.fixedthead',$content).remove();
        $tablewrap.before('<table class="fixedthead" style="width:' + $tablewrap.width() + 'px;position:absolute;z-index:10;"><thead><tr>' + ths + '</tr></thead></table>');
    }

	/* 初始化 */
    var init = function(){
    	$content = $('.page-file .content-box');
	    $(document).off('click', '.fileanalyze').on('click', '.fileanalyze', function(){
	    	var docId = $(this).attr('data-docid');
	    	analyzeFileAction(docId,true);;
		});
	}

 	return {
    	init: init,
    	show: getDocContent,
    	getTmp: getTemplateHtml,
    	uploadFile: uploadFileAction,
    	saveFile: saveFileAction,
    	clearFile: clearFileAction,
    	anaFile: analyzeFileAction,
    	opList: openDocListAction
    }
});
