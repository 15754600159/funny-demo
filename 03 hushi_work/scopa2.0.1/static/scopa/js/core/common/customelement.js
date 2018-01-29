define(function(require, exports, module){

	/**
     * @name customelement
     * @class 提供：
     */
	var requestUrl = {
			addentity: mining.baseurl.core + '/customelement/addEntity',				//POST	user:用户，label:实体类型，description: 描述信息, properties：属性列表（jsonObject），属性中必须包含实体主键key	添加自定义实体	{v:[v1]}
			addrelation: mining.baseurl.core + '/customelement/addRelation',			//POST	user:用户，label:关系类型，description: 描述信息, properties：属性列表（jsonObject），属性中必须包含两端实体的id，实体id名称：from_id, to_id,其他的属性为关系的属性	添加自定义关系    {e:[e1]}
			delentity: mining.baseurl.core + '/customelement/deleteEntity',				//GET	user:用户，id：实体id	删除自定义实体	是否成功
			delrelation: mining.baseurl.core + '/customelement/deleteRelation',			//GET	user:用户，id：关系id	删除自定义关系  是否成功
			listentity: mining.baseurl.core + '/customelement/listEntitiesByUser',		//GET	user:用户，pageSize：分页大小（默认-1），pageNo：页码（默认-1）	获取特定用户的自定义实体	 {v:[v1,v2,v3]}
			listrelation: mining.baseurl.core + '/customelement/listRelationsByUser	'	//GET	user:用户，pageSize：分页大小（默认-1），pageNo：页码（默认-1）	获取特定用户的自定义关系	{e:[e1,e2,e3]}
		},
		/*	人-姓名+身份证号必填
			车-车型+车牌号必填
			户口-户号+地区码必填
			电话-电话号和号码所在地必填
			案件-案件号+案件名+案件描述必填
			酒店-酒店名称必填
			航班-航班班次+出发地/到达地必填
			火车车次-航班班次+出发地/到达地必填
			MAC地址-MAC地址必填
			银行卡-银行卡号+持卡人必填
			虚拟身份QQ号-QQ号必填
			虚拟身份微信号-微信号必填
			IP-IP地址必填*/
		requiredPro = {
			'person': ['PERSON_xm'],
			'vehicle': []
		},
		relationObjects = [];
	
	
	/**
     * @name customElement#addElement
     * @function   
     * @desc 添加用户元素。
     * @param {Object} options
     */
	var addElement = function(option){
		var op = $.extend({
			type: 'entity', // entity | realtion
			fromid: '',
			toid: '',
			success: null,
			error: null
		}, option);
	
		switch(op.type){
			case 'entity': addEntity(op);break;
			case 'relation': addRelation(op);break;
		}
	}
	
	/**
     * @name customElement#addEntity
     * @function
     * @desc 添加实体。
     * @param {Object} options
     */
	var addEntity = function(option){
		var op = $.extend({
			success: null,
			error: null
		}, option);
		
		$dialog({
			title: '添加实体',
			width: 500,
			padding: '20px 0 0',
			onshow: function(){
				var $dlg = this, $node = $(this.node);
				
				$('.main').addClass('blur');//添加背景模糊效果
				$dlg.content(['<form class="form-horizontal required-validate" onsubmit="return false;">',
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
				'</form>'].join(''));
				
				//添加属性
				var entityList = mining.mappingutils.getTypeList('entity'),
					tmpl = ['<div class="propertyinfo" style="margin-bottom:8px;border:1px dashed rgba(255,255,255,0);">',
						'<input type="text" name="propertykey" class="block" placeholder="请选择..." style="width:45%;"/>&nbsp;-&nbsp;',
						'<input type="text" name="propertyval" class="form-control block" placeholder="请输入..." style="width:45%;"/>&nbsp;',
						'<span class="glyphicon glyphicon-plus propertyplus block" style="cursor:pointer;" title="增加"></span>',
					'</div>'].join('');
				
					
					
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
						label = mining.mappingutils.getLabel(labelname).name,
						prolist = mining.mappingutils.getProperties(labelname),
						proData = [];
					
					$.each(prolist, function(i,n){
						proData.push({id: i,text: n.name});
					});
					try{
						var keyArr = mining.mapping.objList[labelname].key_mapping.split(',');
						
						$.each(keyArr, function(i,n){
							if(!mining.utils.isEmpty(n)){
								var _info = mining.mapping.propertyMapping[n];
								proData.push({id: n,text: _info.name});
							}
						})
					}catch(e){}
					$('.propertylist',$node).data('proData', proData).empty().append(tmpl);
					
					//添加默认必选
			    	var requiredProArr = [];
			    	try{requiredProArr = mining.mapping.objList[labelname].key_mapping.split(',');}catch(e){}
			    	if(requiredPro[label])requiredProArr = requiredProArr.concat(requiredPro[label]);
					if(!mining.utils.isEmpty(requiredProArr) && !mining.utils.isEmpty(requiredProArr[0])){
						$.each(requiredProArr, function(i,n){
							$('[name=propertykey]:last',$node).select2({
								data: proData,
						    	dropdownCssClass: 'artui-select2'
					    	}).select2('val', n).select2('enable', false);
					    	$('[name=propertyval]:last',$node).addClass('required');
					    	if(i < requiredProArr.length - 1)$('.propertylist',$node).append(tmpl);
						});
					}else{
						$('[name=propertykey]:last',$node).select2({
							data: proData,
					    	dropdownCssClass: 'artui-select2'
				    	}).select2('val', proData[0].id);
					}
					$('.propertyplus',$node).not($('.propertyplus:first',$node)).remove();
					if($('[name=propertykey]',$node).size() >= proData.length)$('.propertyplus',$node).addClass('disabled');
				}).on('select2-open', function(){
					$(this).siblings('label.error').remove();
				});
				
				$node.on('change', '[name=propertykey]', function(){
					$(this).siblings('[name=propertyval]').val('');
				});
				$node.on('focus', '[name=propertyval]', function(){
					$(this).removeClass('error');
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
					desc =  $('[name=desc]',$node).val().trim(),
					proData = {},
					proStrArr = [],
					nodedata = {e: [], v: []};
				
				if(mining.utils.isEmpty(labelname))return false;
				
				$('[name=propertykey]',$node).each(function(){
					var key = $(this).val(),
						$propertyval = $(this).siblings('[name=propertyval]'),
						value = $propertyval.val().trim();
					
					if(mining.utils.isEmpty(key) || mining.utils.isEmpty(value)){
						if($propertyval.hasClass('required'))$propertyval.addClass('error');
						return;
					}
					proData[key] = value;
					proStrArr.push($(this).select2('data').text + '：' + value);
				});
				
				if($('[name=propertyval].error',$node).size() > 0){
					return false;
				}
				var nodeId = 'custom_entity_' + mining.utils.randomInt(0, 99999),
					mappingdata = mining.mapping.objList[labelname];
				
				$.extend(proData, {
					type: mappingdata.type
				})
				$ajax.ajax({
					url: requestUrl.addentity,
					type: 'post',
					data: {
						user: mining.userinfo.user_id,
						label: mappingdata.label,
						description: desc,
						properties: JSON.stringify(proData)
					},
					success: function(result){
						$dialog.alert('添加实体成功！', 'success');
						$dlg.close().remove();
						if(op.success)op.success(result);
						mining.utils.serverLog(11,'实体名称：' + mappingdata.type_name + '；属性：' + proStrArr.join(','));//用户行为记录
					},
					error: function(result){
						var errormsg = '添加实体失败，请稍后重试！';
						if(result.message && !mining.utils.isEmpty(result.message))errormsg = result.message;
						$dialog.alert(errormsg, 'error');
						if(op.error)op.error(result);
					}
				});
				return false;
			},
			cancelValue: '取消',
			cancel: true,
    		onclose: function(){
    			$('.main').removeClass('blur');//去除背景模糊效果
    		}
		}).showModal();
	}
	
	/**
     * @name customElement#addRelation
     * @function   
     * @desc 添加关系。
     * @param {Object} options
     */
	var addRelation = function(option){
		var op = $.extend({
			from: null,
			to: null,
			success: null,
			error: null
		}, option), relationArr = [];
		
		if(mining.utils.isEmpty(op.from) || mining.utils.isEmpty(op.to)){
			 $dialog.alert('请选择至少 2 个实体！', 'warning');
			 return;
		}
		
		if(mining.utils.isEmpty(relationObjects)){
			setReactionObj();
		}
			
		$.each(relationObjects, function(i,n){
			if(n.labels.indexOf(op.from.label) != -1 && n.labels.indexOf(op.to.label) != -1)relationArr.push({id:n.id, text:n.name});
		});
		if(mining.utils.isEmpty(relationArr)){
			$dialog.alert('没有可匹配的关系！', 'warning');
			 return;
		}
		$dialog({
			title: '添加关系',
			width: 500,
			padding: '20px 0 0',
			onshow: function(){
				var $dlg = this, $node = $(this.node);
				
				$('.main').addClass('blur');//添加背景模糊效果
				$dlg.content(['<form class="form-horizontal required-validate" onsubmit="return false;">',
					'<div class="form-group">',
		    	    	'<label class="col-sm-3 control-label">名称</label>',
		    	    	'<div class="col-sm-8">',
		    	    		'<input type="text" name="relation" class="required" placeholder="请选择..." style="width:100%;">',
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
				'</form>'].join(''));
				
				//添加属性
				var relationData = [],
					tmpl = ['<div class="propertyinfo" style="margin-bottom:8px;border:1px dashed rgba(255,255,255,0);">',
						'<input type="text" name="propertykey" class="block" placeholder="请选择..." style="width:45%;"/>&nbsp;-&nbsp;',
						'<input type="text" name="propertyval" class="form-control block" placeholder="请输入..." style="width:45%;"/>&nbsp;',
						'<span class="glyphicon glyphicon-plus propertyplus block" style="cursor:pointer;" title="增加"></span>',
					'</div>'].join('');
				
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
					data: relationArr,
			    	dropdownCssClass: 'artui-select2'
		    	}).on('change', function(){
					var labelname = $('[name=relation]',$node).val(),
						label = mining.mappingutils.getLabel(labelname).name,
						prolist = mining.mappingutils.getProperties(labelname),
						proData = [];

					$.each(prolist, function(i,n){
						if(mining.utils.isEmpty(n)) return;
						proData.push({id: i,text: n.name});
					});
					$('.propertylist',$node).data('proData', proData).empty().append(tmpl);
					
					//添加默认必选
			    	var requiredProArr = [];
			    	if(requiredPro[label])requiredProArr = requiredProArr.concat(requiredPro[label]);
					if(!mining.utils.isEmpty(requiredProArr) && !mining.utils.isEmpty(requiredProArr[0])){
						$.each(requiredProArr, function(i,n){
							$('[name=propertykey]:last',$node).select2({
								data: proData,
						    	dropdownCssClass: 'artui-select2'
					    	}).select2('val', n).select2('enable', false);
					    	$('[name=propertyval]:last',$node).addClass('required');
					    	if(i < requiredProArr.length - 1)$('.propertylist',$node).append(tmpl);
						});
					}else{
						$('[name=propertykey]:last',$node).select2({
							data: proData,
					    	dropdownCssClass: 'artui-select2'
				    	}).select2('val', proData[0].id);
					}
					$('.propertyplus',$node).not($('.propertyplus:first',$node)).remove();
					if($('[name=propertykey]',$node).size() >= proData.length)$('.propertyplus',$node).addClass('disabled');
				});
				
				$node.on('change', '[name=propertykey]', function(){
					$(this).siblings('[name=propertyval]').val('');
				});
				$node.on('focus', '[name=propertyval]', function(){
					$(this).removeClass('error');
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
					desc =  $('[name=desc]',$node).val().trim(),
					proData = {
						from_id: op.from.gid,
						to_id: op.to.gid
					},
					proStrArr = ['form-'+op.from.key,'to-'+op.to.key],
					nodedata = {e: [], v: []};
				
				if(mining.utils.isEmpty(labelname))return false;
				$('[name=propertykey]',$node).each(function(){
					var key = $(this).val(),
						$propertyval = $(this).siblings('[name=propertyval]'),
						value = $propertyval.val().trim();
					
					if(mining.utils.isEmpty(key) || mining.utils.isEmpty(value)){
						if($propertyval.hasClass('required'))$propertyval.addClass('error');
						return;
					}
					proData[key] = value;
					proStrArr.push($(this).select2('data').text + '：' + value);
				});
				
				if($('[name=propertyval].error',$node).size() > 0){
					return false;
				}

				var nodeId = 'custom_relation_' + mining.utils.randomInt(0, 99999),
					mappingdata = mining.mapping.objList[labelname];
				
				/*object_label: "person"
				object_property: "jhr2gmsfhm"
				
				subject_label
				subject_property
				
				mappingdata['subject_property']*/
				$.extend(proData, {
					type: mappingdata.type
				})
				$ajax.ajax({
					url: requestUrl.addrelation,
					type: 'post',
					data: {
						user: mining.userinfo.user_id,
						label: mappingdata.label,
						description: desc,
						properties: JSON.stringify(proData)
					},
					success: function(result){
						$dialog.alert('添加关系成功！', 'success');
						$dlg.close().remove();
						if(op.success)op.success(result);
						mining.utils.serverLog(11,'关系名称：' + mappingdata.type_name + '；属性：' + proStrArr.join(','));//用户行为记录
					},
					error: function(result){
						var errormsg = '添加关系失败，请稍后重试！';
						if(result.message && !mining.utils.isEmpty(result.message))errormsg = result.message;
						$dialog.alert(errormsg, 'error');
						if(op.error)op.error(result);
					}
				});
				return false;
				/*nodedata.e.push($.extend(proData, {
					gid: nodeId ,
					label: mappingdata.label,
					type: mappingdata.type,
					from: graph.$('.entity:selected').first().data().id,
					to: graph.$('.entity:selected').last().data().id
				}));
				
				graphModule.appenddata(nodedata);
                graph.$('#'+nodeId).addClass('new');
				$dlg.close().remove();*/
			},
			cancelValue: '取消',
			cancel: true,
    		onclose: function(){
    			$('.main').removeClass('blur');//去除背景模糊效果
    		}
		}).showModal();
	}
	
	var setReactionObj = function(){
		var relationList = mining.mappingutils.getTypeList('relation');
		
		try{
			delete relationList.harts;
			delete relationList.noharts;
		}catch(e){}
		$.each(relationList, function(i,n){
			var mdata = mining.mapping.objList[i]
			
			if(mining.utils.isEmpty(mdata.subject_label) || mining.utils.isEmpty(mdata.object_label))return;
			relationObjects.push({
				id: i,
				name: n,
				labels: [mdata.subject_label, mdata.object_label]
			});
		});
	}
	
	
	/**
     * @name customElement#delElement
     * @function   
     * @desc 删除用户自定义元素。
     * @param {Object} options
     */
	var delElement = function(option){
		var op = $.extend({
			id: '',
			type: 'entity', // entity | realtion
			success: null,
			error: null
		}, option),
		typename = '实体',
		requesturl = requestUrl.delentity;
		
		if(mining.utils.isEmpty(op.id)) return;
		if(op.type == 'relation'){
			typename = '关系';
			requesturl = requestUrl.delrelation;
		}
		
		$dialog.confirm({
			title: '删除' + typename,
	        content: '您确定要&nbsp;<b class="red">删除该' + typename + '</b>&nbsp;吗？',
	        ok: function(){
	        	var $dlg = this;
	        	$ajax.ajax({
	       			url: requesturl,
	       			data: {
	       				user: mining.userinfo.user_id,
	       				id: op.id
	       			},
       				success: function(result){
       					$dialog.alert('删除' + typename + '成功！', 'success');
       					if(op.success)op.success(result);
       				},
       				error: function(result){
       					mining.utils.alert('删除' + typename + '失败，请稍后重试！', 'error');
       					if(op.error)op.error(result);
       				},
	                complete: function(data){
	                	$dlg.close().remove();
	                }
	       		});
	        	return false;
	        }
		});
	}
	
	/**
     * @name customElement#listElement
     * @function   
     * @desc 获取元素列表。
     * @param {Object} options
     */
	var listElement = function(){
		
	}
	
	
	return {
		add: addElement,
		del: delElement,
		list: listElement
	}
});