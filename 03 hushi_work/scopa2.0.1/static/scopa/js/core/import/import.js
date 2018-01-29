define(function(require) {
	var showModule = require('core/common/showelement');

	/* navbar import */
	var $importBtn = $('#btnIm');

	/* 
    接口说明：
    前缀：http://k1222.mlamp.co/tuning/services/core
    上传话单：/media/uploadFiles，返回文档Id
	预览数据：/media/previewFiles
	设置参数：/media/generateRecord
	存储导入数据：/media/storeRecord
	上传进度：/media/checkJobState
	获取文件可选编码：/media/getEncodings
	用户添加过的tag：http://k1222.mlamp.co/tuning/services/console/data/specific/tags?operator=XXX,会在数据源名称处使用
	*/
	var preUrl = mining.baseurl.core,//'http://k1222.mlamp.co/tuning/services/core',// mining.baseurl.core,
		requestUrl = {
			uploadFilesUrl: preUrl + '/media/uploadFiles',
			previewFilesUrl: preUrl + '/media/previewFiles',
			generateRecordUrl: preUrl + '/media/generateRecord',
			storeRecordUrl: preUrl + '/media/storeRecord',
			getEncodingsUrl: preUrl + '/media/getEncodings',
			checkJobStateUrl: preUrl + '/media/checkJobState',
			getUserTagsUrl: mining.baseurl.console + '/data/specific/tags?operator=',
			getThemeListUrl: preUrl + '/judgeTheme/getAll',
			creatNewThemeUrl: preUrl + '/judgeTheme/insert'
		},
		$page = null,
		$stepOne = null,
		$stepTwo = null,
		fileList = [], //upload文件list
		originalNames = [], //上传文件的原始文件名
		dataParams = {
        	filenames: [],
        	lines: 50, 
        	begin: 1, 
        	encoding:'NONE',
        	separator:',', 
        	mode: 'PHONE_CALL_MODE'
        }, // preview接口参数
        dataResultOne = {}, //preview data
        dataResultTwo = {}, //generateRecord data
        dataResultComplete = {}, //storeRecord data
        yearOfStart = '',//new Date().getFullYear(),
        datasourceTag = '',
        themeTag = '',
        themeDes = '',
        descriptionInfo = '',
        dataTarget = 'graph', //导入合并后发送图析or 入库:db
        pLeft = 0, 
        pTop = 0, // 控制设置合并中datalist滚动时的表头&列头位置
        opmap = {},
        optionsInputList = [],
        $importWindon = null,
        userTagsList = [],
        themeList = [],
        dataKey = {},
        isLegal = true,
        previewErrInfo = '',
        isTitleFocus = false,
        isThemeFocus = false,
        file2bjhm = null,
        imfileName = '';
	var getTemplateHtml = function(type, obj){
		switch(type){
			case 'breadNav':
				return ['<div class="import-bread-nav">',
							'<ul>',
								'<li class="config-file clear-bg active">1.设置文件<i class="icon-bg"></i></li>',
								'<li class="merger-data">2.选择数据合并<i class="icon-bg"></i></li>',
							'</ul>',
						'</div>'].join('');
				break;
			case 'importBox':
				var encodingsHtml = [], 
					arr = [], 
					i = 0, 
					encodingsList = obj.encodingsList;
				for(i;i<encodingsList.length;i++){
					encodingsHtml.push('<option value="' + encodingsList[i] + '">' + encodingsList[i] + '</option>');
				}
				arr = ['<div class="page-import">',
							'<div class="step-one">',
								'<div class="step-one-box">',
									'<div class="box-left pull-left">',
										'<div class="setvalue-box box-bg">',
											'<div class="set-box">',
												'<div class="setvalue-row pull-left">',
													'<label class="setvalue-title pull-left">文件名称</label>',
													'<span class="files-name ellipsis pull-left hidden"></span>',
													'<span class="upload-files pull-left">',
												    	'<i class="icon icon-add"></i>选择文件',
												    	'<form id="import-uploadFiles" enctype="multipart/form-data" onsubmit="return false;">',
						  									'<input type="file" name="files" multiple id="imfile"> ',
														'</form>',
													'</span>',
												'</div>',
												'<div class="setvalue-row pull-left">',
													'<label class="setvalue-title pull-left"><span>*</span>研判主题</label>',
													'<input type="text" class="theme-title pull-left" id="" placeholder="输入生成新主题">',
													'<a href="javascript:;" class="import-arrow"></a>',
												'</div>',
												'<div class="setvalue-row pull-left theme-description hidden">',
													'<label class="setvalue-title pull-left">主题描述</label>',
													'<textarea cols="65" rows="2" style="resize: none;" placeholder="限200字以内"></textarea>',
												'</div>',
												'<div class="setvalue-row pull-left">',
													'<label class="setvalue-title pull-left"><span>*</span>案件标签</label>',
													'<input type="text" class="datasource-title pull-left" id="" placeholder="输入案件标签">',
													'<a href="javascript:;" class="import-arrow"></a>',
												'</div>',
												'<div class="fold-box pull-left">',
													'<div class="drag-vertical-line-change"><span class="caret"></span></div>',
													'<div class="fold-box-content pull-left hidden">',
														'<div class="setvalue-separator pull-left">',
															'<label class="setvalue-title pull-left">设置分隔符</label>',
															'<div class="separator-box pull-left">',
														    	'<span class="choose-value">',
														    		'<span class="options">',
																	  	'<i class="choose" data-value="\t"></i>Tab键',
																	'</span>',
																	'<span class="options">',
																	  	'<i class="choose" data-value=";"></i>; (分号)',
																	'</span>',
																	'<span class="options">',
																	  	'<i class="choose active" data-value=","></i>, (逗号)',
																	'</span>',
																	'<span class="options">',
																	  	'<i class="choose" data-value=" "></i>空格',
																	'</span>',
														    	'</span>',
														    	'<span class="input-value">',
														    		'<span class="options">',
																	  	'<i class="choose others"></i>其他',
																	'</span>',
																	'<input type="text" class="separator-value" id="" placeholder="请输入" disabled>',
														    	'</span>',
															'</div>',
														'</div>',
														'<div class="setvalue-row pull-left">',
															'<label class="setvalue-title pull-left">选择编码类型</label>',
															'<select class="encoding-value pull-left">',
															  	encodingsHtml.join(''),
															'</select>',
														'</div>',
													'</div>',
												'</div>',
											'</div>',
										'</div>',
										'<div class="preview-panel">',
											'<div class="preview-box box-bg">',
												'<div class="banner-title">',
													'<span class="pull-left">数据预览</span>',
													'<div class="setvalue-row pull-left">',
														'<label class="setvalue-title pull-left">从</label>',
														'<input type="text" class="begin-value pull-left" id="" placeholder="1">',
														'<label class="setvalue-title pull-left">行提取列名</label>',
													'</div>',
												'</div>',
												'<div class="data-preview">',
													'<div class="preview-data-box">',
													'</div>',
												'</div>',
											'</div>',
										'</div>',
									'</div>',
									'<div class="box-right pull-left">',
										'<div class="view-box box-bg">',
											'<div class="mode-option-box">',
												'<div class="banner-title">模式选择</div>',
												'<div class="mode-options">',
													'<div class="options option-all pull-left">',
														'<span class="op-bg"></span>',
														'<span class="op-info">',
															'<i class="choose active" mode-type="PHONE_CALL_MODE"></i>话单数据关系',
														'</span>',
													'</div>',
													'<div class="options option-entity-relation pull-left">',
														'<span class="op-bg"></span>',
														'<span class="op-info">',
															'<i class="choose notallow" mode-type=""></i>实体及关系',
														'</span>',
													'</div>',
													'<div class="options option-entity pull-left">',
														'<span class="op-bg"></span>',
														'<span class="op-info">',
															'<i class="choose notallow" mode-type="PHONE_ENTITY_MODE"></i>单纯实体显示',
														'</span>',
													'</div>',
												'</div>',
											'</div>',
											'<div class="view-match-box">',
												'<div class="banner-title">视图匹配</div>',
												'<div class="view-match">',
													'<div class="match-box" mode-type="PHONE_CALL_MODE">',
														'<div class="match-left pull-left" data-key="phone1">',
															'<span class="match-bg">',
																'<i></i>',
															'本机号码</span>',
														'</div>',
														'<div class="match-relation pull-left">',
															'<div class="relation-msg" data-key="sms-event">',
																'<i class="relation-bg"></i>',
																'<span class="relation-info">短信事件</span>',
															'</div>',
															'<div class="relation-call" data-key="phone-call">',
																'<i class="relation-bg"></i>',
																'<span class="relation-info">电话事件</span>',
															'</div>',
														'</div>',
														'<div class="match-right pull-right" data-key="phone2">',
															'<span class="match-bg">',
																'<i></i>',
															'对方号码</span>',
														'</div>',
													'</div>',
													'<div class="match-box hidden" mode-type="PHONE_ENTITY_MODE">',
														'<div class="match-left pull-left" data-key="phone1">',
															'<span class="match-bg">',
																'<i></i>',
															'本机号码</span>',
														'</div>',
														'<div class="match-right pull-right" data-key="phone2">',
															'<span class="match-bg">',
																'<i></i>',
															'对方号码</span>',
														'</div>',
													'</div>',
												'</div>',
											'</div>',
										'</div>',
										'<div class="datasource-box box-bg">',
											'<div class="banner-title">数据来源</div>',
											'<div class="field-config">',
												'<div class="fields-list"></div>',
											'</div>',
										'</div>',
									'</div>',
								'</div>',
								'<div class="step-btns">',
									'<button class="next-step pull-right">下一步</button>',
								'</div>',
							'</div>',
							'<div class="step-two hidden">',
								'<div class="banner-title hidden">设置导入目标</div>',
								'<div class="merger-mode-options hidden">',
									'<span class="options">',
									  	'<i class="choose active" data-target="graph"></i>导入到图析及数据库',
									'</span>',
									'<span class="options">',
									  	'<i class="choose" data-target="db"></i>仅导入到数据库',
									'</span>',
								'</div>',
								'<div class="merger-data-box">',
									'<div class="data-list-type">',
										'<ul>',
											'<li record-type="entities" list-type="phoneNO_entity" class="active">实体列表</li>',
											'<li record-type="events" list-type="phone_event" class="active">电话事件列表</li>',
											'<li record-type="events" list-type="sms_event">短信事件列表</li>',
										'</ul>',
									'</div>',
									'<div class="data-list">',
										'<div class="entities-phoneNO_entity"></div>',
										'<div class="events-phone_event hidden"></div>',
										'<div class="events-sms_event hidden"></div>',
									'</div>',
								'</div>',
								'<div class="step-btns">',
									'<button class="complete-btn pull-right">完成</button>',
									'<button class="pre-step pull-right">上一步</button>',
								'</div>',
							'</div>',
						'</div>'];
				return arr.join('');
				break;
			case 'fieldConfig':
				var dataop = obj.dataop,
					ops = [],
					opsLi = [], 
					dataList = obj.list, 
					yearsList = [], 
					j = 0,
					n = 0, 
					currentYear = new Date().getFullYear(),
					shownArr = [],
					collapsedArr = [];
				opmap = {};
				dataKey = {};
				for(j;j<dataop.length;j++){
					ops.push('<option value="' + dataop[j] + '">' + dataop[j] + '</option>');
					optionsInputList.push(dataop[j]);
					opmap[dataop[j]] = j;
				}
				yearsList.push('<option value="default">&nbsp;</option>');
				for(n;n<10;n++){
					var y = currentYear - n;
					// yearsList.push('<option value="' + y + '"' + (y == yearOfStart ? ' selected' : '') + '>' + y + '</option>');
					yearsList.push('<option value="' + y + '">' + y + '</option>');
				}
				shownArr.push(['<div class="setvalue-row pull-left">',
								'<label class="setvalue-title pull-left" title="话单起始时间">话单起始时间</label>',
								'<select class="yearOfStart-value pull-left">',
									yearsList.join(''),
								'</select>',
							'</div>'].join(''));
				$.each(dataList,function(dataIndex,dataObj){
					$.each(dataObj,function(itemIndex,item){
						if(!dataKey[item.attrId]){
							dataKey[item.attrId] = [];
						}
						dataKey[item.attrId].push(item);
						if(item.displayLevel == 'hidden')return;
						var labelTitle = item.displayName,
							attrId = item.attrId,
							currentop = item.mappedColumn || '',
							isKey = item.primaryKey ? 'isKey' : '',
							inputType = item.inputType,
							options = item.options,
							displayLevel = item.displayLevel,
							opIndex = opmap[currentop],
							opList = [],
							controlHtml = '',
							opListForFieldInput = [];
						if(options.length > 0){
							var m = 0;
							for(m;m<options.length;m++){
								opList.push('<option value="' + options[m] + '"' + (options[m] == currentop ? 'selected="selected"' : '') + '>' + options[m] + '</option>');
								opListForFieldInput.push(options[m]);
							}
						}else{
							opList = [].concat(ops);
							if(currentop && currentop.length > 0){
								opList[opIndex] = $(opList[opIndex]).attr('selected',true).prop('outerHTML');
							}
						}
						
						if(isKey == ''){
							opList.unshift('<option value="default">&nbsp;</option>');
						}
						if(inputType == 'select'){
							controlHtml = ['<select id="' + attrId + '" class="config-source-field '+ isKey + ' ' + inputType +' pull-left">',
												opList.join(''),
											'</select>'].join('');
						}else{
							controlHtml = ['<input type="text" id="' + attrId + '" class="config-source-field '+ isKey + ' ' + inputType +' pull-left" value="' + (currentop && currentop.length > 0 ? currentop : '') + '" data-options="' + opListForFieldInput.join(',') + '">',].join('');
						}
						

						if(displayLevel == 'shown'){
							shownArr.push(['<div class="setvalue-row pull-left">',
												'<label class="setvalue-title pull-left" title="' + labelTitle + '">' + labelTitle + '</label>',
												controlHtml,
											'</div>'].join(''));
						}else if(displayLevel == 'collapsed'){
							collapsedArr.push(['<div class="setvalue-row pull-left">',
												'<label class="setvalue-title pull-left" title="' + labelTitle + '">' + labelTitle + '</label>',
												controlHtml,
											'</div>'].join(''));
						}
					});
				});
				
				return [shownArr.join(''),
						'<div class="fold-box pull-left' + (collapsedArr.length == 0 ? ' hidden' : '') + '">',
							'<div class="drag-vertical-line-change"><span class="caret"></span></div>',
							'<div class="fold-box-content pull-left hidden">',
								collapsedArr.join(''),
							'</div>',
						'</div>'].join('');
				break;
			case 'previewData':
				var theadData = obj[0],
					theadHtml = [],
					theadLen = theadData.length,
					tbodyData = obj.slice(1),
					tbodyHtml = [],
					tbodyLen = tbodyData.length,
					i = 0,
					j = 0;
				// 渲染表头
				theadHtml.push('<tr>');
				for(i;i<theadLen;i++){
					theadHtml.push('<th>' + theadData[i] + '</th>');
				}
				theadHtml.push('</tr>');
				// 渲染表数据
				for(j;j<tbodyLen;j++){
					var itemData = tbodyData[j],
						n = 0;
					tbodyHtml.push('<tr>');
					for(n;n<theadLen;n++){
						tbodyHtml.push('<td' + (n == 0 ? ' class="text-center"' : '') + ' title="' + itemData[n] + '">' + (itemData[n].length > 0 ? itemData[n] : '<i class="strut-bg"></i>') + '</td>');//i?
					}
					tbodyHtml.push('</tr>');
				}
				return ['<table class="table">',
							'<thead>',
								theadHtml.join(''),
							'</thead>',
							'<tbody>',
								tbodyHtml.join(''),
							'</tbody>',
						'</table>'].join('');
				break;
			case 'dataBox':
				var arr = [],
					theadData = obj.attributes,
					theadHtml = [],
					theadLen = theadData.length,
					tbodyData = obj.data,
					tbodyLen = tbodyData.length > 50 ? 50 : tbodyData.length,
					tbodyHtml = [],
					listTitleHtml = [],
					i = 0,
					j = 0,
					timeList = [];
				// 渲染表头
				theadHtml.push('<tr>');
				// if(obj.checkBox){
				// 	theadHtml.push('<th class="checkAllBox"><input type="checkbox" attr-type="select-all" checked="checked"></th>');
				// }
				theadHtml.push('<th class="dataSourceBox">数据来源</th>');
				for(i;i<theadLen;i++){
					theadHtml.push('<th>' + theadData[i].cn + '</th>');
					if(theadData[i].time){
						timeList.push(i);
					}
				}
				theadHtml.push('</tr>');

				listTitleHtml.push('<thead>');
				listTitleHtml.push('<tr>');
				// if(obj.checkBox){
				// 	listTitleHtml.push('<th class="checkAllBox"><input type="checkbox" attr-type="select-all" checked="checked"></th>');
				// }
				listTitleHtml.push('<th class="dataSourceBox">数据来源</th>');
				listTitleHtml.push('</tr>');
				listTitleHtml.push('</thead>');
				listTitleHtml.push('<tbody>');
				// 渲染表数据
				for(j;j<tbodyLen;j++){
					var itemData = tbodyData[j],
						n = 0,
						extractedData = itemData.extracted,
						extractedHtml = [],
						fixextractedHtml = [],
						storedData = itemData.stored,
						storedHtml = [],
						fixstoredHtml = [];
					for(n;n<theadLen;n++){
						if(n == 0){
							extractedHtml.push('<td class="dataSourceBox-info"><i class="data-source imported" tip-title="导入的数据"></i></td>');
							fixextractedHtml.push('<td class="dataSourceBox-info"><i class="data-source imported" tip-title="导入的数据"></i></td>');
						}
						if($.inArray(n, timeList) >= 0){
							var importTimeArr = [];
							if(extractedData[n].length > 0){
								$.each(extractedData[n].split('\001'),function(timeIndex,timeValue){
									importTimeArr.push(mining.utils.dateFormat(new Date(parseInt(timeValue)),'yyyy-MM-dd hh:mm:ss'));
								});
							}
							extractedHtml.push('<td title="' + (importTimeArr.length > 0 ? importTimeArr.join(' ') : '') + '">' + (importTimeArr.length > 0 ? importTimeArr.join(' ') : '') + '</td>');
						}else{
							extractedHtml.push('<td title="' + extractedData[n].replace(/\001/g, ' ') + '">' + extractedData[n].replace(/\001/g, ' ') + '</td>');
						}

						if(storedData && storedData.length > 0){
							if(n == 0){
								storedHtml.push('<td class="dataSourceBox-info"><i class="data-source db" tip-title="数据库数据"></i></td>');
								fixstoredHtml.push('<td class="dataSourceBox-info"><i class="data-source db" tip-title="数据库数据"></i></td>');
							}
							if($.inArray(n, timeList) >= 0){
								var timeArr = [];
								if(storedData[n].length > 0){
									$.each(storedData[n].split('\001'),function(timeIndex,timeValue){
										timeArr.push(mining.utils.dateFormat(new Date(parseInt(timeValue)),'yyyy-MM-dd hh:mm:ss'));
									});
								}
								
								storedHtml.push('<td title="' + (timeArr.length > 0 ? timeArr.join(' ') : '') + '">' + (timeArr.length > 0 ? timeArr.join(' ') : '') + '</td>');
							}else{
								storedHtml.push('<td title="' + storedData[n].replace(/\001/g, ' ') + '">' + storedData[n].replace(/\001/g, ' ') + '</td>');
							}
						}
					}
					extractedHtml.unshift('<tr>');
					extractedHtml.push('</tr>');
					tbodyHtml.push(extractedHtml.join(''));

					fixextractedHtml.unshift('<tr>');
					fixextractedHtml.push('</tr>');
					listTitleHtml.push(fixextractedHtml.join(''));

					if(storedData && storedData.length > 0){
						storedHtml.unshift('<tr>');
						storedHtml.push('</tr>');
						tbodyHtml.push(storedHtml.join(''));

						fixstoredHtml.unshift('<tr>');
						fixstoredHtml.push('</tr>');
						listTitleHtml.push(fixstoredHtml.join(''));
					}
				}
				listTitleHtml.push('</tbody>');
				arr = ['<div class="sfheader"></div>',
						'<div class="sheader"></div>',
						'<div class="fheader">',
							'<table class="table listTitle-box auto" data-key="' + obj.recordType + '" data-list-key="' + obj.listType + '">',
								listTitleHtml.join(''),
							'</table>',
						'</div>',
						'<div class="data-box">',
							'<table class="table data-show" data-key="' + obj.recordType + '" data-list-key="' + obj.listType + '">',
								'<thead>',
									theadHtml.join(''),
								'</thead>',
								'<tbody>',
									tbodyHtml.join(''),
								'</tbody>',
							'</table>',
						'</div>'];
				return arr.join('');
				break;
			case 'opsMenu':
				var arr = [],
					i = 0;
				for(i;i<obj.opsdata.length;i++){
					var item = obj.opsdata[i],
						txt = obj.tag;
					if(txt.length > 0){
						item = item.replace(/txt/g,'<span class="select2-match search-resule-info">' + txt + '</span>');
					}
					arr.push(['<li class="select2-results-dept-0 select2-result select2-result-selectable" index=' + i + '>',
								'<div class="select2-result-label">',
									(item == 'default' ? '&nbsp;' : item),
								'</div>',
							'</li>'].join(''));
				}
				return ['<div id="opLis-menu" class="opLis-menu ' + obj.type + ' select2-drop select2-drop-active">',
							'<ul class="select2-results">',
								arr.join(''),
							'</ul>',
						'</div>'].join('');
				break;
			case 'opsList':
				var arr = [],
					i = 0;
				if(obj.opsdata.length > 0){
					for(i;i<obj.opsdata.length;i++){
						var item = obj.opsdata[i],
							txt = obj.tag;
						if(txt.length > 0){
							var reg = new RegExp("\\"+txt,"g");
							item = item.replace(reg,'<span class="select2-match search-resule-info">' + txt + '</span>');
						}
						arr.push(['<li class="select2-results-dept-0 select2-result select2-result-selectable" index=' + i + '>',
									'<div class="select2-result-label">',
										item,
									'</div>',
								'</li>'].join(''));
					}
				}else{
					arr.push(['<li class="select2-results-dept-0 select2-result select2-result-selectable" index=' + i + '>',
								'<div class="select2-result-label">没有找到匹配项</div>',
							'</li>'].join(''));
				}
				return arr.join('');
				break;
			case 'opsTheme':
				var arr = [],
					i = 0;
				for(i;i<obj.opsdata.length;i++){
					var item = obj.opsdata[i].name,
						txt = obj.tag,
						themeId = obj.opsdata[i].id;
					if(txt.length > 0){
						item = item.replace(/txt/g,'<span class="select2-match search-resule-info">' + txt + '</span>');
					}
					if(item.length > 0){
						arr.push(['<li class="select2-results-dept-0 select2-result select2-result-selectable" index=' + i + ' data-theme-id="' + themeId + '">',
								'<div class="select2-result-label">',
									item,
								'</div>',
							'</li>'].join(''));
					}
				}
				return ['<div id="opLis-menu" class="opLis-menu ' + obj.type + ' select2-drop select2-drop-active">',
							'<ul class="select2-results">',
								arr.join(''),
							'</ul>',
						'</div>'].join('');
				break;
			case 'opsThemeList':
				var arr = [],
					i = 0;
				if(obj.opsdata.length > 0){
					for(i;i<obj.opsdata.length;i++){
						var item = obj.opsdata[i].name,
							themeId = obj.opsdata[i].id,
							txt = obj.tag;
						if(txt.length > 0){
							var reg = new RegExp("\\"+txt,"g");
							item = item.replace(reg,'<span class="select2-match search-resule-info">' + txt + '</span>');
						}
						arr.push(['<li class="select2-results-dept-0 select2-result select2-result-selectable" index=' + i + ' data-theme-id="' + themeId + '">',
									'<div class="select2-result-label">',
										item,
									'</div>',
								'</li>'].join(''));
					}
				}else{
					arr.push(['<li class="select2-results-dept-0 select2-result select2-result-selectable" index=' + i + '>',
								'<div class="select2-result-label">没有找到匹配项</div>',
							'</li>'].join(''));
				}
				return arr.join('');
				break;
			case 'impotFileBg':
				var arr = [],
					type = obj.type;
				if(type == 'state'){
					arr.push(['<div class="state-box">',
								'<div><div class="state-info"><span class="state-message left">0%</span></div></div>',
							'</div>'].join(''));
				}
				return ['<div id="impot-file-state" class="' + (obj.type == 'loading' ? 'loading' : 'state') + '">',
							'<div class="state-bg"></div>',
							(arr.length > 0 ? arr.join('') : ''),
						'</div>'].join('');
				break;
			case 'finishImport':
				return ['<div class="prompts-info-for-import">',
							'<p>是否清空已有话单分析结果？<p>',
							'<div>',
								'<form>',
					      			'<label class="radio-inline">',
					        			'<input type="radio" name="optionsRadios" id="" value="1" checked> 是',
					      			'</label>',
							      	'<label class="radio-inline">',
							       		'<input type="radio" name="optionsRadios" id="" value="2"> 否',
							      	'</label>',
					    		'</form>',
					    	'</div>',
					    '</div>'].join('');
				break;
			default:
				break;
		}
	}
	$importBtn.off('click').on('click',function(){
		$dialog({
			title:'导入文件',
			width: 1060,
			height: 635,
			onshow:function(){
				var $dlg = this, $node = $(this.node);
				$importWindon = this;
				// 添加dialog header
				var headerHtml = getTemplateHtml('breadNav');
				$node.find('.artui-dialog-title').css({
					'height': '34px',
					'padding': '0'
				}).height('34px').html(headerHtml);
				$node.find('.artui-dialog-body').css({
					'background-color':'#f1f3f6',
					'padding':'10px 20px'
				});
				// 获取可选编码类型
				var encodingsList = getEncodingsAction(),
					dataObj = {
						encodingsList: encodingsList
					};
				var dialogHtml = getTemplateHtml('importBox',dataObj);
				$dlg.content(dialogHtml);

				$page = $('.page-import');
				$stepOne = $('.step-one',$page);
				$stepTwo = $('.step-two',$page);
				$('.setvalue-box .drag-vertical-line-change',$stepOne).off('click').on('click',function(){
					var $arrow = $(this).find('.caret');

					if($arrow.hasClass('pullToDown')){
						$('.setvalue-box .fold-box-content',$stepOne).addClass('hidden');
						$('.setvalue-box .fold-box',$stepOne).css('margin-bottom','');
						$arrow.removeClass('pullToDown');
					}else{
						$('.setvalue-box .fold-box-content',$stepOne).removeClass('hidden');
						$('.setvalue-box .fold-box',$stepOne).css('margin-bottom',0);
						$arrow.addClass('pullToDown');
					}
				});
				
				// 初始化设置参数
				setParamsAction();

				// 绑定操作按钮事件
				operateBtnsAction();

				$('#imfile',$stepOne).on('click',function(){
					$(this).val('');
				}).on('change',function(){
					imfileName = $(this).val();
					dataParams = {
			        	filenames: [],
			        	lines: 50, 
			        	begin: 1, 
			        	encoding:'NONE',
			        	separator:',', 
			        	mode: 'PHONE_CALL_MODE'
			        }
					uploadFileAction();
				});
				
			}
		}).showModal();
	});

	var setParamsAction = function(){
		// 获取当前用户tags
		getUserTagsAction();
		getThemeListAction();

		// 案件标签
		$('.datasource-title',$stepOne).next('.import-arrow').off('click').on('click',function(e){
			mining.utils.stopBubble();
			if(!$(e.target).hasClass('up') && !isTitleFocus){
				$('.datasource-title',$stepOne).focus();
				isTitleFocus = true;
			}else{
				isTitleFocus = false;
			}
		});

		$('.datasource-title',$stepOne).on('focus',function(){
			$('#opLis-menu.tagsList').remove();
			$(this).next().addClass('up');
				var $cInput = $(this),
					options = userTagsList,
					p = {},
					lisHtml = '';

				p.tag = '';
				p.opsdata = options;
				p.type = 'tagsList';
				lisHtml = getTemplateHtml('opsMenu',p);
				$('body').append(lisHtml);
				var d = $(this).offset(),
					h = $(this).height(),
					cValue = $(this).val(),
					cIndex = 0,
					t = 0;
				for(t;t<options.length;t++){
					if(cValue != '' && cValue == options[t]){
						cIndex = t;
						break;
					}
				}
				$('#opLis-menu.tagsList').css({
					'top': (d.top + h + 5),
					'left': d.left,
					'width': '200px'
				}).find('li').off('click.op1').on('click.op1',function(){
					$(this).addClass('select2-highlighted').siblings().removeClass('select2-highlighted');
					$cInput.val($(this).text());
					$('#opLis-menu.tagsList').remove();
					$cInput.change();
				}).eq(cIndex).addClass('select2-highlighted');
				if(cIndex >= 7 && cIndex <= (options.length - 7)){
					$('#opLis-menu.tagsList ul').scrollTop((29 * cIndex));
				}else if(cIndex > (options.length - 7)){
					$('#opLis-menu.tagsList ul').scrollTop((29 * (options.length - 7)));
				}
		}).on('keyup',function(){
			$(this).removeClass('not-null');
			var $cInput = $(this),
				options = userTagsList,
				tag = $cInput.val(),
				i = 0,
				newOps = [],
				p = {},
				lisHtml = '';
			if(tag && tag.length > 0){
				for(i;i<options.length;i++){
					if(options[i].indexOf(tag) >= 0){
						newOps.push(options[i]);
					}
				}
				p.opsdata = newOps;
				p.tag = tag;
			}else{
				p.opsdata = options;
				p.tag = '';
			}
			lisHtml = getTemplateHtml('opsList',p);
			$('#opLis-menu.tagsList>ul').html(lisHtml);

			$('#opLis-menu.tagsList li').off('click.op2').on('click.op2',function(){
				$(this).addClass('select2-highlighted').siblings().removeClass('select2-highlighted');
				$cInput.val($(this).text());
				$('#opLis-menu.tagsList').remove();
				$('.datasource-title',$stepOne).change();
			});
		}).on('change',function(){
			$(this).next().removeClass('up');
			if($(this).val().length > 30){
				$dialog.alert('<div class="prompts-info-for-import">案件标签长度不能超过30</div>');
				return;
			}
			datasourceTag = $(this).val();
			$('#opLis-menu.tagsList').remove();
		}).on('blur',function(){
			$(this).next().removeClass('up');
		});

		// 研判主题
		$('.theme-title',$stepOne).next('.import-arrow').off('click').on('click',function(e){
			mining.utils.stopBubble();
			if(!$(e.target).hasClass('up') && !isThemeFocus){
				$('.theme-title',$stepOne).focus();
				isThemeFocus = true;
			}else{
				isThemeFocus = false;
			}
		});

		$('.theme-title',$stepOne).on('focus',function(){
			$('#opLis-menu.themeList').remove();
			$(this).next().addClass('up');
				var $cInput = $(this),
					options = themeList,
					p = {},
					lisHtml = '';

				p.tag = '';
				p.opsdata = options;
				p.type = 'themeList';
				lisHtml = getTemplateHtml('opsTheme',p);
				$('body').append(lisHtml);
				var d = $(this).offset(),
					h = $(this).height(),
					cValue = $(this).val(),
					cIndex = 0,
					t = 0;
				for(t;t<options.length;t++){
					if(cValue != '' && cValue == options[t]){
						cIndex = t;
						break;
					}
				}
				$('#opLis-menu.themeList').css({
					'top': (d.top + h + 5),
					'left': d.left,
					'width': '200px'
				}).find('li').off('click.op1').on('click.op1',function(){
					$(this).addClass('select2-highlighted').siblings().removeClass('select2-highlighted');
					$cInput.val($(this).text());
					$('#opLis-menu.themeList').remove();
					$cInput.change();
				}).eq(cIndex).addClass('select2-highlighted');
				if(cIndex >= 7 && cIndex <= (options.length - 7)){
					$('#opLis-menu.themeList ul').scrollTop((29 * cIndex));
				}else if(cIndex > (options.length - 7)){
					$('#opLis-menu.themeList ul').scrollTop((29 * (options.length - 7)));
				}
		}).on('keyup',function(e){
			$(this).removeClass('not-null');
			var $cInput = $(this),
				options = themeList,
				tag = $cInput.val(),
				i = 0,
				newOps = [],
				p = {},
				lisHtml = '';
			if(tag && tag.length > 0){
				for(i;i<options.length;i++){
					if(options[i].indexOf(tag) >= 0){
						newOps.push(options[i]);
					}
				}
				p.opsdata = newOps;
				p.tag = tag;
			}else{
				p.opsdata = options;
				p.tag = '';
			}
			lisHtml = getTemplateHtml('opsThemeList',p);
			$('#opLis-menu.themeList>ul').html(lisHtml);

			$('#opLis-menu.themeList li').off('click.op2').on('click.op2',function(){
				$(this).addClass('select2-highlighted').siblings().removeClass('select2-highlighted');
				$cInput.val($(this).text());
				$('#opLis-menu.themeList').remove();
				$('.theme-title',$stepOne).change();
			});
		}).on('change',function(){
			var showDes = true;
			$(this).next().removeClass('up');
			if($(this).val().length > 30){
				$dialog.alert('<div class="prompts-info-for-import">研判主题长度不能超过30</div>');
				return;
			}
			themeTag = $(this).val();
			$('#opLis-menu.themeList').remove();
			$.each(themeList,function(themeIndex,themeData){
				if(themeData.name == themeTag){
					showDes = false;
					return;
				}
			});
			if(showDes){
				$('.theme-description',$stepOne).removeClass('hidden');
			}else{
				$('.theme-description',$stepOne).addClass('hidden').val('');
				themeDes = '';
			}
			$('.theme-description textarea',$stepOne).on('change',function(){
				var textDes = $(this).val(),
					timer;
				if(textDes.length > 200){
					$dialog({
						title: '提示',
						width: 200,
						height: 50,
						onshow:function(){
							var $dlg = this, $infoNode = $(this.node);
							clearTimeout(timer);
							$dlg.content('<div class="prompts-info-for-import">主题描述长度不能超过200</div>');
							timer = setTimeout(function(){
								$dlg.close().remove();
								var len = $('.theme-description textarea',$stepOne).val().length;
								$('.theme-description textarea',$stepOne).addClass('not-null').focus().prop({
					                selectionStart: len,
					                selectionEnd: len
					            });
							}, 3000);
						},
						ok: function(){
							var len = $('.theme-description textarea',$stepOne).val().length;
							$('.theme-description textarea',$stepOne).addClass('not-null').focus().prop({
				                selectionStart: len,
				                selectionEnd: len
				            });
						},
						okValue: '知道了'
					}).showModal();
				}
				themeDes = $(this).val();
			});
		}).on('blur',function(){
			$(this).next().removeClass('up');
		});

		$(document).off('click.tagsList').on('click.tagsList',function(e){
			if(!$(e.target).parents().hasClass('opLis-menu.tagsList') && !$(e.target).hasClass('datasource-title')){
				$('#opLis-menu.tagsList').remove();
			}
		});
		$(document).off('click.themeList').on('click.themeList',function(e){
			if(!$(e.target).parents().hasClass('opLis-menu.themeList') && !$(e.target).hasClass('theme-title')){
				$('#opLis-menu.themeList').remove();
			}
		});

		// 分隔符
		var $redios = $('.separator-box',$stepOne);
		$redios.find('.options .choose').off('click').on('click',function(){
			$redios.find('.options .choose').removeClass('active');
			$(this).addClass('active');
			if($(this).hasClass('others')){
				$('.separator-value',$stepOne).removeAttr('disabled');
				$('.separator-value',$stepOne).on('change',function(){
					if($('.separator-value',$stepOne).val().length > 0){
						dataParams.separator = $('.separator-value',$stepOne).val();
					}else{
						$dialog.alert('分隔符不能为空');
					}
				});
			}else{
				$('.separator-value',$stepOne).prop('disabled',true);
				dataParams.separator = $(this).attr('data-value');
			}
			analyzeAction();
		});

		// select
		$('.encoding-value',$stepOne).select2({
		  	minimumResultsForSearch: Infinity
		});

		// 模式选择
		// var $modes = $('.mode-options',$stepOne);
		// $modes.find('.options .choose').off('click').on('click',function(e){
		// 	if($(this).hasClass('notallow')){return ;}
		// 	$(this).addClass('active').parents('.options').siblings().find('.choose').removeClass('active');
		// 	var modeType = $(this).attr('mode-type');
		// 	$('.match-box[mode-type="' + modeType + '"]',$stepOne).removeClass('hidden').siblings('.match-box').addClass('hidden');
		// 	dataParams.mode = modeType;
		// 	analyzeAction();
		// });

		// 列名行数
		$('.begin-value',$stepOne).on('change',function(){
			dataParams.begin = $(this).val();
			analyzeAction();
		});

		// 获取编码
		$('select.encoding-value',$stepOne).on('change',function(){
			dataParams.encoding = $(this).val();
			analyzeAction();
		})
		
		// 导入模式
		// $('.merger-mode-options .options .choose',$stepTwo).off('click').on('click',function(){
		// 	$(this).addClass('active').parent().siblings().find('.choose').removeClass('active');
		// 	dataTarget = $(this).attr('data-target');
  //   	});

    	// 数据列表
    	$('.data-list-type li').off('click').on('click',function(){
    		$(this).addClass('active').siblings().removeClass('active');
    		$('#impot-file-state').remove();
			$(getTemplateHtml('impotFileBg',{type:'loading'})).insertAfter('.container-fluid.main');

    		var recordType = $(this).attr('record-type'),
    			listType = $(this).attr('list-type'),
    			dataBoxKey = recordType + '-' + listType;
			var datapool = {},
				i = 0,
				dupdataobj = [],
				newdataobj = [];
			dupdataobj = dataResultTwo.obj.dupRecords[recordType];
			newdataobj = dataResultTwo.obj.newRecords[recordType];
				
			for(i;i<dupdataobj.length;i++){
				if(dupdataobj[i].displayLabel == listType){
					var dataobj = {};
					if(dupdataobj[i].data.length > 0){
						dataobj = dupdataobj[i];
						// datapool.checkBox = true;
					}else{
						dataobj = newdataobj[i];
						// datapool.checkBox = false;
					}
					datapool.attributes = dataobj.attributes;
					datapool.data = dataobj.data;
					datapool.recordType = recordType;
					datapool.listType = listType;
					break;
				}
			}
			var dataHtml = getTemplateHtml('dataBox',datapool);
			$('.' + dataBoxKey).removeClass('hidden').siblings().addClass('hidden');
			$('.' + dataBoxKey).empty().html(dataHtml);
			$('#impot-file-state').remove();

			if($('.' + dataBoxKey + ' .data-box .data-show').width() <= $('.' + dataBoxKey).width()){
				$('.' + dataBoxKey + ' .data-box .data-show').width(($('.' + dataBoxKey).width() - 1));
			}
			if($('.' + dataBoxKey + ' .data-box .data-show').height() < $('.' + dataBoxKey).height()){
				$('.' + dataBoxKey + ' .data-box .data-show').addClass('auto');
			}

			fixedThead($('.' + dataBoxKey + ' .data-box .data-show'), $('.' + dataBoxKey + ' .sheader'));
		    fixedTable($('.' + dataBoxKey + ' .fheader .listTitle-box'), $('.' + dataBoxKey + ' .sfheader'));

			$('.' + dataBoxKey + ' .data-box').mCustomScrollbar({
	    		theme: 'minimal',
	    		axis: 'yx',
	    		advanced:{ 
	    			autoExpandHorizontalScroll: true 
	    		},
	    		callbacks:{
	    			whileScrolling:function(){
	    				var $d = $(this).find('.mCSB_container'),
	    					p = $d.position(),
	    					l = p.left,
	    					t = p.top;
	    				// 修改sheader位置
	    				if(pLeft != l){
	    					pLeft = l;
	    					$('.' + dataBoxKey + ' .sheader',$stepTwo).css('left',l);
	    				}
	    				// 修改fheader位置
	    				if(pTop != t){
	    					pTop = t;
	    					$('.' + dataBoxKey + ' .fheader',$stepTwo).css('top',t);
	    				}
	    			}
	    		}
	    	});
    		
    		$('.data-source',$stepTwo).popover({
                trigger:'hover',
                placement:'right',
                html:true,
                content:function(){
                   	return '<div style="width: 100px;">' + $(this).attr('tip-title') + '</div>';
                }
            });

		    // checkListAction();
    	});
	}

	// 绑定checkbox
	var checkListAction = function(){
		var $checkAll = $('.data-list table .checkAllBox input[type="checkbox"]'),
			$checkSingle = $('.data-list table .checkSingleBox input[type="checkbox"]');
		// 全选
		$checkAll.on('click',function(){
			var $tableBox = $(this).parents('table').first(),
				recordType = $tableBox.attr('data-key'),
				listType = $tableBox.attr('data-list-key'),
				i = 0,
				checked = this.checked,
				dataObj = dataResultTwo.obj.dupRecords[recordType],
				$dTable = $('.data-list table[data-key="' + recordType + '"][data-list-key="' + listType + '"]'),
				$dCheckSingle = $dTable.find('input[type="checkbox"]');
            $dCheckSingle.prop("checked",checked);
            // 修改数据
            for(i;i<dataObj.length;i++){
            	if(dataObj[i].displayLabel == listType){
            		var dataList = dataObj[i].data,
            			j = 0;
            		for(j;j<dataList.length;j++){
            			dataResultTwo.obj.dupRecords[recordType][i]['data'][j].selected = checked;
            		}
            		break;
            	}
            }
		});
		$checkSingle.on('click',function(){
			var $tableBox = $(this).parents('table').first(),
				recordType = $tableBox.attr('data-key'),
				listType = $tableBox.attr('data-list-key'),
				i = 0,
				checked = this.checked,
				dataObj = dataResultTwo.obj.dupRecords[recordType],
				$tables = $('.data-list table[data-key="' + recordType + '"][data-list-key="' + listType + '"]'),
				$dTable = $('.data-list table.data-show[data-key="' + recordType + '"][data-list-key="' + listType + '"]'),
				$dCheckAll = $tables.find('.checkAllBox input[type="checkbox"]'),
				$nSelected = $('.data-list table.listTitle-box[data-key="' + recordType + '"][data-list-key="' + listType + '"] .checkSingleBox input[type="checkbox"]:checked'),
            	nSelectedCount = $nSelected.length,
            	nTotalCount = $dTable.find('.checkSingleBox input[type="checkbox"]').length,
            	index = $(this).attr('data-index');
            $dTable.find('.checkSingleBox input[type="checkbox"][data-index="' + index + '"]').prop('checked',false);
            // 修改数据
            for(i;i<dataObj.length;i++){
            	if(dataObj[i].displayLabel == listType){
            		dataResultTwo.obj.dupRecords[recordType][i]['data'][index].selected = checked;
            		break;
            	}
            }
            if(nSelectedCount == nTotalCount){
                //全选
                $dCheckAll.prop({'indeterminate':false,"checked":true});
            }else if(nSelectedCount == 0){
                //全不选
                $dCheckAll.prop({'indeterminate':false,"checked":false});
            }else{
                //未全选
                $dCheckAll.prop({"checked":false,'indeterminate':true});
            }
		});
	}

	var fixedThead = function($tablewrap, $fixheader, k){
        var ths = '';
        // docParameters[currentType].fixhead = false;
        $('th',$tablewrap).each(function(){
            ths += '<th' + ($(this).attr('class') ? ' class="' + $(this).attr('class') + '"' : '') + ' style="width:' + $(this).outerWidth() + 'px;"' + ($(this).attr('attr-type') ? ' attr-type="' + $(this).attr('attr-type') + '"' : '') + '>' + $(this).html() + '</th>';
        });
        $fixheader.empty().html('<table class="table fixedthead" data-key="' + $tablewrap.attr('data-key') + '" data-list-key="' + $tablewrap.attr('data-list-key') + '" style="width:' + $tablewrap.outerWidth() + 'px;"><thead><tr>' + ths + '</tr></thead></table>');
    }

    // 固定表头&列头单元格
    var fixedTable = function($tablewrap, $fixsfheader){
        $fixsfheader.empty().html('<table class="table fixedtable" data-key="' + $tablewrap.attr('data-key') + '" data-list-key="' + $tablewrap.attr('data-list-key') + '" style="width:' + $tablewrap.outerWidth() + 'px;">' + $tablewrap.find('thead').clone()[0].outerHTML + '</table>');
    }

	// upload files
	var uploadFileAction = function(){
		$('#impot-file-state').remove();
		$(getTemplateHtml('impotFileBg',{type:'loading'})).insertAfter('.container-fluid.main');

		// 上传新文件时重置各配置状态
		$('.datasource-title',$stepOne).val('');
		datasourceTag = '';
		$('.theme-title',$stepOne).val('');
		themeTag = '';
		$('.theme-description',$stepOne).val('');
		themeDes = '';
		var $redios = $('.separator-box',$stepOne);
		$redios.find('.options .choose').removeClass('active');
		$('.separator-value',$stepOne).val('').prop('disabled',true);
		$redios.find('.options .choose[data-value="' + dataParams.separator + '"]').addClass('active');
		$('.begin-value',$stepOne).val(dataParams.begin);
		$('select.encoding-value',$stepOne).val(dataParams.encoding);


		$ajax.ajaxSubmit($('#import-uploadFiles'),{
            url: requestUrl.uploadFilesUrl,
            contentType:'application/x-www-form-urlencoded; charset=utf-8',
            success: function(data){
            	$('#impot-file-state').remove();
              	if(data.statusCode == '200'){
              		fileList = data.obj.uploadNames;
              		originalNames = data.obj.originalNames;
              		$('.files-name',$stepOne).removeClass('hidden').html(originalNames[0]);
              		analyzeAction();
              	}else{
              		$dialog.alert(data.exceptionMsg);
              		$('#imfile',$stepOne).val('');
              		imfileName = '';
         			$('.files-name',$stepOne).addClass('hidden').html('');
         			$('.preview-box .data-preview .preview-data-box',$stepOne).empty();
         			$('.datasource-box .field-config .fields-list',$stepOne).empty();
              	}
        	},
         	error: function(err){
         		$('#impot-file-state').remove();
         		if(err.statusCode == '300'){
         			$dialog.alert(err.exceptionMsg);
         			$('#imfile',$stepOne).val('');
         			imfileName = '';
         			$('.files-name',$stepOne).addClass('hidden').html('');
         			$('.preview-box .data-preview .preview-data-box',$stepOne).empty();
         			$('.datasource-box .field-config .fields-list',$stepOne).empty();
         		}else{
         			console.log(err);
         		}
         	}
        });
	}

	// analyze files
	var analyzeAction = function(){
		if(fileList.length > 0){
			dataParams.filenames = fileList;
			$('#impot-file-state').remove();
			$(getTemplateHtml('impotFileBg',{type:'loading'})).insertAfter('.container-fluid.main');
			$ajax.ajax({
				url: requestUrl.previewFilesUrl,
	            type: 'post',
	            contentType:'application/json',
	            data: JSON.stringify(dataParams),
	            success: function(data){
	            	$('#impot-file-state').remove();
	                if(data.statusCode == '200'){
	                	isLegal = true;
	                	previewErrInfo = '';
	                	if(!data.obj.mappingTemplate){
	                		$dialog.alert('文件内容无法匹配已有模板，请确认数据来源是否正确');
	                	}
	                	dataResultOne = data;
	                	$('.begin-value',$stepOne).val(data.obj.begin);
	                	if(data.obj.encoding){
                			$('select.encoding-value',$stepOne).val(data.obj.encoding);
                			$('.encoding-value .select2-chosen',$stepOne).text(data.obj.encoding);
                			dataParams.encoding = data.obj.encoding;
                		}
	                	dataParams.begin = data.obj.begin;
	                	previewDataAction();
	                	datasourceAction();
	              	}else{
	              		isLegal = false;
	              		previewErrInfo = data.exceptionMsg;
	              		$dialog.alert(data.exceptionMsg);
	              		$('.preview-box .data-preview .preview-data-box',$stepOne).empty();
         				$('.datasource-box .field-config .fields-list',$stepOne).empty();
	              	}
	            },
	            error: function(err){
	            	isLegal = false;
	            	$('#impot-file-state').remove();
	            	if(err.statusCode == '300'){
	            		previewErrInfo = err.exceptionMsg;
	            		$dialog.alert(err.exceptionMsg);
	            		$('.preview-box .data-preview .preview-data-box',$stepOne).empty();
         				$('.datasource-box .field-config .fields-list',$stepOne).empty();
	            	}else{
	            		console.log(err);
	            	}
	            }
			});
		}
	}

	// 渲染预览数据
	var previewDataAction = function(){
		var previewData = dataResultOne.obj.tableData,
			$previewBox = $('.preview-box .data-preview',$stepOne),
			$previewDataBox = $previewBox.find('.preview-data-box'),
			previewHtml = getTemplateHtml('previewData',previewData);
		$previewDataBox.empty();
		$previewDataBox.html(previewHtml);

		if($previewDataBox.find('table').width() <= $previewBox.width()){
			$previewDataBox.find('table').width(($previewBox.width() - 1));
		}
		if($previewDataBox.find('table').height() < $previewBox.height()){
			$previewDataBox.find('table').addClass('auto');
		}

		$previewBox.addClass('border').mCustomScrollbar({
    		theme: 'minimal',
    		axis: 'yx',
    		advanced:{ 
    			autoExpandHorizontalScroll: true 
    		}
    	});
	}

	// 数据来源
	var datasourceAction = function(){
		var datamap = dataResultOne.obj.mapping,
			dataop = dataResultOne.obj.header,
			$datasourceBox = $('.datasource-box .field-config',$stepOne),
			$fieldsList = $datasourceBox.find('.fields-list'),
			isSelected = false;
		$datasourceBox.mCustomScrollbar({
    		theme: 'minimal'
    	});
		$fieldsList.empty();
		var itemData = {
				'dataop': dataop,
				'list': datamap
			},
			attrId = '';
		var sourceHtml = getTemplateHtml('fieldConfig',itemData);
		$fieldsList.html(sourceHtml);

		$('.datasource-box .drag-vertical-line-change',$stepOne).off('click').on('click',function(){
			var $arrow = $(this).find('.caret');
			if($arrow.hasClass('pullToDown')){
				$('.datasource-box .fold-box-content',$stepOne).addClass('hidden');
				$('.datasource-box .fold-box',$stepOne).css('margin-bottom','');
				$arrow.removeClass('pullToDown');
			}else{
				$('.datasource-box .fold-box-content',$stepOne).removeClass('hidden');
				$('.datasource-box .fold-box',$stepOne).css('margin-bottom',0);
				$arrow.addClass('pullToDown');
			}
		});

		// select
		$('select.config-source-field.select',$stepOne).select2();
		$('select.config-source-field.select_and_input',$stepOne).select2({
			minimumResultsForSearch: Infinity
		});
		$('.yearOfStart-value',$stepOne).select2({
			minimumResultsForSearch: Infinity
		});
		$('.yearOfStart-value',$stepOne).on('change',function(){
			yearOfStart = $(this).val();
		});
		$('select.config-source-field',$stepOne).on('change',function(){
			var attrKey = $(this).attr('id'),
				newValue = $(this).val() != 'default' ? $(this).val() : null;
			for(var i = 0;i<dataKey[attrKey].length;i++){
				dataKey[attrKey][i].mappedColumn = newValue;
			}
		});
		$('.config-source-field.select_and_input').on('focus',function(){
			$('#opLis-menu.selectList').remove();
			var $cInput = $(this),
				options = $cInput.attr('data-options').length > 0 ? $cInput.attr('data-options').split(',') : optionsInputList,
				p = {},
				lisHtml = '';
			
			if(!$cInput.hasClass('isKey')){
				options.unshift('default');
			}
			p.tag = '';
			p.opsdata = options;
			p.type = 'selectList';
			lisHtml = getTemplateHtml('opsMenu',p);
			$('body').append(lisHtml);
			var d = $(this).offset(),
				h = $(this).height(),
				cValue = $(this).val(),
				cIndex = 0,
				t = 0;
			for(t;t<options.length;t++){
				if(cValue != '' && cValue == options[t]){
					cIndex = t;
					break;
				}
			}
			$('#opLis-menu.selectList').css({
				'top': (d.top + h + 5),
				'left': d.left
			}).find('li').off('click.op1').on('click.op1',function(){
				$(this).addClass('select2-highlighted').siblings().removeClass('select2-highlighted');
				$cInput.val($(this).text());
				$('#opLis-menu.selectList').remove();
				isSelected = true;
				$cInput.change();
			}).eq(cIndex).addClass('select2-highlighted');
			if(cIndex >= 7 && cIndex <= (options.length - 7)){
				$('#opLis-menu.selectList ul').scrollTop((29 * cIndex));
			}else if(cIndex > (options.length - 7)){
				$('#opLis-menu.selectList ul').scrollTop((29 * (options.length - 7)));
			}
		}).on('keyup',function(){
			var $cInput = $(this),
				options = $cInput.attr('data-options').length > 0 ? $cInput.attr('data-options').split(',') : optionsInputList,
				tag = $cInput.val(),
				i = 0,
				newOps = [],
				p = {},
				lisHtml = '';
			isSelected = false;
			if(tag && tag.length > 0){
				for(i;i<options.length;i++){
					if(options[i].indexOf(tag) >= 0){
						newOps.push(options[i]);
					}
				}
				p.opsdata = newOps;
				p.tag = tag;
			}else{
				p.opsdata = options;
				p.tag = '';
			}
			lisHtml = getTemplateHtml('opsList',p);
			$('#opLis-menu.selectList>ul').html(lisHtml);

			$('#opLis-menu.selectList li').off('click.op2').on('click.op2',function(){
				$(this).addClass('select2-highlighted').siblings().removeClass('select2-highlighted');
				$cInput.val($(this).text());
				isSelected = true;
				$('#opLis-menu.selectList').remove();
			});
		}).on('change',function(){
			var attrKey = $(this).attr('id'),
				newValue = ($(this).val() == '' || $(this).val() == 'default') ? null : $(this).val();
			for(var i = 0;i<dataKey[attrKey].length;i++){
				if(isSelected){
					dataKey[attrKey][i].mappedColumn = newValue;
					dataKey[attrKey][i].manualInput = null;
				}else{
					dataKey[attrKey][i].manualInput = newValue;
				}
			}
			$('#opLis-menu.selectList').remove();
		});
		$('.config-source-field.input').on('focus',function(){
			var attrKey = $(this).attr('id').replace(dataKey + '-',''),
				itemIndex = $(this).parent().index() - 1,
				newValue = $(this).val() == 'default' ? null : $(this).val();
			if(datamap[dataKey][itemIndex].attrId == attrKey){
				dataResultOne.obj.mapping[dataKey][itemIndex].manualInput = newValue;
			}else{
				for(var i = 0;i<datamap[dataKey].length;i++){
					if(datamap[dataKey][i].attrId == attrKey){
						dataResultOne.obj.mapping[dataKey][i].manualInput = newValue;
					}
				}
			}
		});
		$(document).off('click.opLisMenu').on('click.opLisMenu',function(e){
			if(!$(e.target).parents().hasClass('opLis-menu.selectList') && !$(e.target).hasClass('select_and_input')){
				$('#opLis-menu.selectList').remove();
			}
		});
		$('.config-source-field.select',$stepOne).on('select2-focus',function(){
			$('#opLis-menu').remove();
		});
		if($fieldsList.html().length == 0){
			$('.match-box [data-key]').first().click();
		}
		$('.datasource-box .banner-title').on('click',function(){
			console.log(dataResultOne);
			console.log(dataKey);
		});
	}

	// getTags
	var getUserTagsAction = function(){
		$ajax.ajax({
            url: requestUrl.getUserTagsUrl + mining.userinfo.user_id,
            async: false,
            success: function(data){
                if(data.statusCode == '200'){
                	userTagsList = data.listObj;
                }else{
                    console.log('获取标签失败');
                }
            },
            error: function(err){
                if(err.statusCode == '300'){
            		console.log('获取标签失败');
            	}else{
            		console.log(err);
            	}
            }
        });
	}

	// getTheme
	var getThemeListAction = function(){
		$ajax.ajax({
            url: requestUrl.getThemeListUrl,
            async: false,
            success: function(data){
                if(data.statusCode == '200'){
                	themeList = data.listObj;
                }else{
                    console.log('获取主题失败');
                }
            },
            error: function(err){
                if(err.statusCode == '300'){
            		console.log('获取主题失败');
            	}else{
            		console.log(err);
            	}
            }
        });
	}
	
	var creatNewThemeAction = function(datapool){
		$ajax.ajax({
            url: requestUrl.creatNewThemeUrl,
            data: {
            	name: themeTag,
            	description: themeDes,
            	author: mining.userinfo.user_id
            },
            type: 'post',
            async: false,
            success: function(data){
            	if(data.statusCode == '200'){
            		console.log('创建新主题成功');
            	}else{
            		console.log('创建新主题失败或者该主题已存在');
            	}
				storeRecordAction(datapool);
            },
            error: function(err){
				if(err.statusCode == '300'){
					console.log('创建新主题失败或者该主题已存在');
					storeRecordAction(datapool);
				}else{
					console.log('创建新主题失败' + err);
				}
            }
        });
	}

	// getencodings
	var getEncodingsAction = function(){
		var encodings = [];
		$ajax.ajax({
            url: requestUrl.getEncodingsUrl,
            async: false,
            success: function(data){
                if(data.statusCode == '200'){
                	encodings = data.listObj;
                }else{
                    console.log('获取编码失败');
                }
            },
            error: function(err){
                if(err.statusCode == '300'){
            		console.log('获取编码失败');
            	}else{
            		console.log(err);
            	}
            }
        });
        return encodings;
    }

    var operateBtnsAction = function(){
    	$('.step-btns .next-step',$stepOne).off('click').on('click',function(){
    		$('#impot-file-state').remove();
    		if(!isLegal){
    			if(previewErrInfo.length > 0){
    				$dialog.alert(previewErrInfo);
    			}
    			return;
    		}
			$(getTemplateHtml('impotFileBg',{type:'state'})).insertAfter('.container-fluid.main');
    		// 检查数据
    		var fileListLen = imfileName.length;//$('#imfile',$stepOne).val().length;
    		var timer1 = 0,
    			timer2 = 0,
    			timer3 = 0,
    			timer4 = 0,
    			timer5 = 0;
    		if(datasourceTag.length == 0 || fileListLen == 0 || themeTag.length == 0){
    			$('#impot-file-state').remove();
				$dialog({
					title: '提示',
					width: 200,
					height: 50,
					onshow:function(){
						var $dlg = this, $infoNode = $(this.node);
						if(fileListLen == 0){
							clearTimeout(timer1);
							$dlg.content('<div class="prompts-info-for-import">没有可上传的文件</div>');
							timer1 = setTimeout(function(){
								$dlg.close().remove();
							}, 3000);
						}else if($('.theme-title',$stepOne).val().length > 30 || themeTag.length > 30){
							clearTimeout(timer4);
							$dlg.content('<div class="prompts-info-for-import">研判主题长度不能超过30</div>');
							timer4 = setTimeout(function(){
								$dlg.close().remove();
								var len = $('.theme-title',$stepOne).val().length;
								$('.theme-title',$stepOne).addClass('not-null').focus().prop({
					                selectionStart: len,
					                selectionEnd: len
					            });
							}, 3000);
						}else if($('.theme-title',$stepOne).val().length == 0 || themeTag.length == 0){
							clearTimeout(timer5);
							$dlg.content('<div class="prompts-info-for-import">研判主题不能为空</div>');
							timer5 = setTimeout(function(){
								$dlg.close().remove();
								$('.theme-title',$stepOne).addClass('not-null').focus().prop({
					                selectionStart: 0,
					                selectionEnd: 0
					            });
							}, 3000);
						}else if($('.datasource-title',$stepOne).val().length > 30 || datasourceTag.length > 30){
							clearTimeout(timer3);
							$dlg.content('<div class="prompts-info-for-import">案件标签长度不能超过30</div>');
							timer3 = setTimeout(function(){
								$dlg.close().remove();
								var len = $('.datasource-title',$stepOne).val().length;
								$('.datasource-title',$stepOne).addClass('not-null').focus().prop({
					                selectionStart: len,
					                selectionEnd: len
					            });
							}, 3000);
						}else if($('.datasource-title',$stepOne).val().length == 0 || datasourceTag.length == 0){
							clearTimeout(timer2);
							$dlg.content('<div class="prompts-info-for-import">案件标签不能为空</div>');
							timer2 = setTimeout(function(){
								$dlg.close().remove();
								$('.datasource-title',$stepOne).addClass('not-null').focus().prop({
					                selectionStart: 0,
					                selectionEnd: 0
					            });
							}, 3000);
						}
					},
					ok: function(){
						if(fileListLen != 0){
							if(themeTag.length == 0){
								$('.theme-title',$stepOne).addClass('not-null').focus().prop({
					                selectionStart: 0,
					                selectionEnd: 0
					            });
							}else if($('.theme-title',$stepOne).val().length > 30){
								var len = $('.theme-title',$stepOne).val().length;
								$('.theme-title',$stepOne).addClass('not-null').focus().prop({
					                selectionStart: len,
					                selectionEnd: len
					            });

							}else if(datasourceTag.length == 0){
								$('.datasource-title',$stepOne).addClass('not-null').focus().prop({
					                selectionStart: 0,
					                selectionEnd: 0
					            });
							}else if($('.datasource-title',$stepOne).val().length > 30){
								var len = $('.datasource-title',$stepOne).val().length;
								$('.datasource-title',$stepOne).addClass('not-null').focus().prop({
					                selectionStart: len,
					                selectionEnd: len
					            });

							} 
						}
					},
					okValue: '知道了'
				}).showModal();
				return ;
    		}
    		var datamap = dataResultOne.obj.mapping,
    			datasourceFields = {
		        	'phone1':'本机号码',
		        	'phone2':'对方号码',
		        	'sms-event':'短信事件',
		        	'phone-call':'电话事件'
		        };
    		for(var key in datamap){
    			var i = 0, itemData = datamap[key];
    			for(i;i<itemData.length;i++){
    				if(itemData[i].primaryKey && itemData[i].displayLevel == 'shown' && !((itemData[i].inputType == 'select' && itemData[i].mappedColumn != '' && itemData[i].mappedColumn != null) || (itemData[i].inputType == 'select_and_input' && ((itemData[i].mappedColumn != '' && itemData[i].mappedColumn != null) || (itemData[i].manualInput != '' && itemData[i].manualInput != null))))){
    					$('#impot-file-state').remove();
    					$dialog.alert(itemData[i].displayName + '不能为空');
    					return ;
    				}	
    			}
    		}
    		var datapool = {
    			filenames: dataParams.filenames,
			    begin: dataParams.begin,
			    tag: datasourceTag,
			    separator: dataParams.separator,
			    encoding: dataParams.encoding,
			    mapping: datamap,
			    mode: dataParams.mode,
			    yearOfStart: yearOfStart == 'default' ? '' : yearOfStart
    		}

    		// 跳转至下一步
    		$ajax.ajax({
				url: requestUrl.generateRecordUrl,
	            type: 'post',
	            contentType:'application/json',
	            data: JSON.stringify(datapool),
	            success: function(data){
	            	if(data.statusCode == '200'){
	            		if(data.obj.progress == 1){
	            			$('#impot-file-state').remove();
	            			nextStepAction(data.obj.nestedResponse);
		            	}else{
		            		checkJobActiob('nextStep', data.obj.jobId, data.obj.progress);
		            	}
	            	}else{
	            		$dialog.alert(data.exceptionMsg);
	            	}
	            },
	            error: function(err){
	            	$('#impot-file-state').remove();
	                if(err.statusCode == '300'){
	            		$dialog.alert(err.exceptionMsg);
	            	}else{
	            		console.log(err);
	            	}
	            }
			});
    	});
		
		// 上一步
		$('.step-btns .pre-step',$stepTwo).off('click').on('click',function(){
			$stepTwo.addClass('hidden');
    		$stepOne.removeClass('hidden');
		});

		// 完成
		$('.step-btns .complete-btn',$stepTwo).off('click').on('click',function(){
			$('#impot-file-state').remove();
			$(getTemplateHtml('impotFileBg',{type:'state'})).insertAfter('.container-fluid.main');

			var datapool = {
					filenames: originalNames,
					description: '',
					tag: datasourceTag,
					dupRecords: dataResultTwo.obj.dupRecords,
					newRecords: dataResultTwo.obj.newRecords,
					recordStat: dataResultTwo.obj.recordStat,
					file2bjhm: dataResultTwo.obj.file2bjhm,
					topic: themeTag
				},
				isCreat = true;

			$.each(themeList,function(themeIndex,themeData){
				if(themeData.name == themeTag){
					isCreat = false;
					return;
				}
			});
			if(isCreat){
				creatNewThemeAction(datapool);
			}else{
				storeRecordAction(datapool);
			}
		});
    }

    var storeRecordAction = function(datapool){
    	$ajax.ajax({
			url: requestUrl.storeRecordUrl,
			type: 'post',
			contentType: 'application/json',
			data: JSON.stringify(datapool),
			success: function(data){
				if(data.statusCode == '200'){
            		if(data.obj.progress == 1){
            			$('#impot-file-state').remove();
            			completeAction(data.obj.nestedResponse);
	            	}else{
	            		checkJobActiob('complete', data.obj.jobId, data.obj.progress);
	            	}
            	}else{
            		$dialog.alert(data.exceptionMsg);
            	}
			},
			error: function(err){
				$('#impot-file-state').remove();
				if(err.statusCode == '300'){
            		$dialog.alert(err.exceptionMsg);
            	}else{
            		console.log(err);
            	}
			}
		});
		mining.utils.serverLog(7, '文件名称：' + datapool.filenames + '；研判主题：' + datapool.topic + '；档案标签：' + datapool.tag);//用户行为记录

    }

    var nextStepAction = function(data){
    	dataResultTwo = data;
    	$stepOne.addClass('hidden');
		$stepTwo.removeClass('hidden');
		$('.import-bread-nav li.merger-data').addClass('active').siblings().removeClass('active');
		$('.data-list-type li').first().click();
    }

    var completeAction = function(data){
    	dataResultComplete = data;
    	$importWindon.close().remove();
		// if(dataTarget == 'graph'){
			$dialog({
				title: '提示',
				width: 220,
				height: 80,
				onshow:function(){
					var $dlg = this, $infoNode = $(this.node);
					var dialogHtml = getTemplateHtml('finishImport');
					$dlg.content(dialogHtml);
					$infoNode.find('.artui-dialog-close').addClass('hidden');
				},
				ok: function(){
					var isClear = true;
					if($('.prompts-info-for-import input[type="radio"]:checked').val() == 2){
						isClear = false;
					}
					scopaConfig.pages.judged.getJudgedDataByPhones(dataResultComplete.obj.records.bjhm,isClear);
					scopaConfig.pages.cooperation.getCooperationDataCounts();
					scopaConfig.pages.cooperation.getFileInfoConentData();
					mining.utils.hashChange('ticket');
				},
				okValue: '确定'
			}).showModal();
		// }
    }

    var checkJobActiob = function(type, jobId, progress){
    	var timer = 0,
    		progressInfo = parseInt(progress * 100) + '%';
    	if(parseInt(progress * 100) > 10){
    		$('#impot-file-state .state-message').removeClass('left').addClass('right');
    	}
    	$('#impot-file-state .state-message').text(progressInfo);
    	$('#impot-file-state .state-info').css('width',progressInfo);
    	$ajax.ajax({
    		url: requestUrl.checkJobStateUrl,
            data: {jobId:jobId},
            success: function(data){
            	if(data.statusCode == '200'){
            		if(data.obj.progress == 1){
            			$('#impot-file-state').remove();
            			if(type == 'nextStep'){
            				nextStepAction(data.obj.nestedResponse);
            			}else{
            				completeAction(data.obj.nestedResponse);
            			}
	            	}else{
	            		clearTimeout(timer);
		                timer = setTimeout(function(){
		                    checkJobActiob(type, jobId, data.obj.progress);
		                },1000);
	            	}
            	}else{
            		clearTimeout(timer);
            		$('#impot-file-state').remove();
            		$dialog.alert(data.exceptionMsg);
            	}
            },
            error: function(err){
            	clearTimeout(timer);
            	$('#impot-file-state').remove();
                if(err.statusCode == '300'){
            		$dialog.alert(err.exceptionMsg);
            	}else{
            		console.log(err);
            	}
            }
    	});
    }
});