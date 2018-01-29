define(function(require, exports, module){

	/**
     * @name Snapshot
     * @class 提供：获取快照(get)，创建快照(save)，删除快照(del)，打开快照(open)，导入快照(import)，分享快照(share)，推送快照(push)，复制快照(copy)，获取快照缩略图(thumbnail) 方法。
     * 快照尺寸380 * 350
     */
	var requestUrl = {
			get: mining.baseurl.core + '/snapshot/load',								//获取快照：[get]  sid(快照ID)
			save: mining.baseurl.core + '/snapshot/save',								//创建快照：[post] user_id(用户ID) name(快照名称) description(描述) graphData(json数据) thumbnail(缩略图) type(0为图析快照，1为地图快照) parent(父级快照ID)
			share: mining.baseurl.core + '/snapshot/shareProject',						//分享快照：[get]  sid(快照ID)
			push: mining.baseurl.core + '/snapshot/pushProject',						//推送快照：[post] sid(快照ID) fid(推送者id) tid(被推送者id) comment(评论) type(0为用户推用户，1为用户推群组)
			delPic: mining.baseurl.core + '/snapshot/delete',							//删除快照：[get]  sid(快照ID)
			del: mining.baseurl.core + '/snapshot/deleteProject',								//删除快照：[get]  sid(快照ID)
			thumbnail: mining.baseurl.core + "/snapshot/getThumbnail",					//获取快照缩略图：sid(快照ID)
			checkname: mining.baseurl.core + '/snapshot/nameExists'	,				//(name, type)
			sharePic:mining.baseurl.core + '/snapshot/share',
			pushPic:mining.baseurl.core + '/snapshot/push',
			
			getalltheme: mining.baseurl.core + '/judgeTheme/getAll',
			updatetheme: mining.baseurl.core + '/judgeTheme/update',	//id: ID name: 研判主题名称；description: 新的研判主题的描述；author: 创建者ID；type：权限管理（留以后使用）
			savetheme: mining.baseurl.core + '/judgeTheme/insert'		//name: 研判主题名称；description: 研判主题的描述；author: 创建者
		};
							
	/**
     * @name Snapshot#getSnapshot
     * @function   
     * @desc 获取快照。
     * @param {Object} options
     */
	var getSnapshot = function(option){
		var op = $.extend({
			id: '',	//快照ID
			success: null,
			error: null
		}, option);
	
		if(mining.utils.isEmpty(op.id)) return;
		$ajax.ajax({
   			url: requestUrl.get,
   			data: {
   				sid: op.id
   			},
			success: function(data){
				if(data.graphData && typeof data.graphData == 'string') data.graphData = JSON.parse(data.graphData);
				if(!mining.utils.isEmpty(op.success) && $.isFunction(op.success))op.success.call(this, data);
			},
			error: function(data){
				mining.utils.alertMsg(data, '获取快照信息失败，请稍后重试', 'error');
				if(!mining.utils.isEmpty(op.error) && $.isFunction(op.error))op.error.call(this, data);
			}
   		});
	}
							
	/**
     * @name Snapshot#saveSnapshot
     * @function   
     * @desc 创建快照。
     * @param {Object} options
     */
	var saveSnapshot = function(option){
		var op = $.extend({
			graph: null,	//图析实例
			title: '保存快照',
			data: null,//快照集数据
			success: null,
			error: null
		}, option),
		snapshotProj = mining.utils.localStorage(mining.localname.snapshotProject),
		graphJsonNew,
		graphPng;
	
		if(!mining.utils.isEmpty(op.graph)){
			if(op.graph.nodes().length < 1) return;
			var graphJson = op.graph.json(),
				graphJsonNew = {
					data: {e:[], v:[]},	//原始数据
					params: {
						position: {},	//点的坐标集
						locked: [],	 	//锁定元素
						zoom: 1,	 	//缩放级别
						pan: {x:0, y:0}	//画布偏移
					}
				},
				themedesc = '';
				
			if(graphJson.elements.nodes){
				$.each(graphJson.elements.nodes, function(i,n){
					graphJsonNew.data.v.push(n.data.data);
					graphJsonNew.params.position[n.data.id] = n.position;
					if(n.locked)graphJsonNew.params.locked.push(n.data.id);
				})
			}
			if(graphJson.elements.edges){
				$.each(graphJson.elements.edges, function(i,n){
					graphJsonNew.data.e.push(n.data.data);
				});
			}
			graphJsonNew.params.zoom = graphJson.zoom;
			graphJsonNew.params.pan = graphJson.pan;
			op.graph.zoom(0.51);
			var graphPng = op.graph.png({
				maxWidth: 380,
				maxHeight: 350,
				full: true
			});
		}else if(!mining.utils.isEmpty(op.data)){
			graphJsonNew = typeof op.data.graphData == 'string' ? op.data.graphData : JSON.stringify(op.data.graphData);
			graphPng = op.data.thumbnail;
		}
		if(mining.utils.isEmpty(graphJsonNew) || mining.utils.isEmpty(graphPng)) return;
		$dialog({
    		title: op.title,
    		width: 600,
    		onshow: function(){
    			var $dlg = this, $node = $(this.node), allThemeArr = [];
    			
    			$('.main').addClass('blur');//添加背景模糊效果
				$node.addClass('saveSnapshot');
    			$dlg.content(['<div class="col-sm-4 nopadding">',
						'<div class="snapshotimg"><img src="' + graphPng + '"><span class="selectbtn"></span></div>',
					'</div>',
    				'<form class="form-horizontal required-validate col-sm-8 nopadding infobox">',
			    		'<div class="form-group">',
			    	    	'<label class="col-sm-3 control-label">保存方式：</label>',
			    	    	'<div class="col-sm-9 nopadding">',
			    	    		'<a class="a_check uncheck" create="false" href="javascript:;">现有研判主题</a><a class="a_check uncheck" create="true" href="javascript:;">新建研判主题</a>',
			    	    	'</div>',
			    	  	'</div>',
			    	  	'<div class="form-group">',
			    	    	'<label class="col-sm-3 control-label">研判主题：</label>',
			    	    	'<div class="col-sm-9 nopadding">',
			    	    		'<input type="text" name="themename" maxlength="50" class="form-control required" placeholder="请填写名称...">',
			    	    	'</div>',
			    	  	'</div>',
	              		'<div class="form-group">',
			    	    	'<label class="col-sm-3 control-label">主题描述：</label>',
			    	    	'<div class="col-sm-9 nopadding">',
			    	    		'<textarea name="themedesc" class="form-control" maxlength="120" placeholder="请填写描述..." style="height:74px;"></textarea>',
			    	    	'</div>',
			    	  	'</div>',
			    	  	'<div class="form-group">',
			    	    	'<label class="col-sm-3 control-label">快照名称：</label>',
			    	    	'<div class="col-sm-9 nopadding">',
			    	    		'<input type="text" name="snapname" maxlength="50" class="form-control required" placeholder="请填写名称...">',
			    	    	'</div>',
			    	  	'</div>',
	              		'<div class="form-group">',
			    	    	'<label class="col-sm-3 control-label">快照描述：</label>',
			    	    	'<div class="col-sm-9 nopadding">',
			    	    		'<textarea name="snapdesc" class="form-control" maxlength="120" placeholder="请填写描述..." style="height:74px;"></textarea>',
			    	    	'</div>',
			    	  	'</div>',
		    	  	'</form>'].join(''));
				
				if(snapshotProj){
					allThemeArr.push(snapshotProj);
				}
				$ajax.ajax({
					url: requestUrl.getalltheme,
					success: function(result){
						if(result && result.listObj)allThemeArr = allThemeArr.concat(result.listObj);
						if(mining.utils.isEmpty(allThemeArr)){
							$('[create=true]',$node).click();
						}else{
							$('[create=false]',$node).click();
						}
					},
					error: function(result){
						if(mining.utils.isEmpty(allThemeArr)){
							$('[create=true]',$node).click();
						}else{
							$('[create=false]',$node).click();
						}
					}
				});
				var refreshThemeList = function(isCreate){
					isCreate = isCreate || 'true';
					if(mining.utils.isEmpty(allThemeArr) || isCreate == 'true'){
						$('[name=themename]',$node).select2('destroy').val('');
						$('[name=themedesc]',$node).val('');
						return;
					}
					
					var themeData = [];
					$.each(allThemeArr, function(i,n){
						themeData.push({id:n.id, text:n.name, desc: n.description});
					});
					$('[name=themename]',$node).select2({
						data: themeData
			    	}).on('change', function(){
			    		themedesc = $(this).select2('data').desc;
			    		$('[name=themedesc]',$node).val(themedesc);
			    	}).select2('val', themeData[0].id).change();
				}
				$('[create]',$node).on('click', function(){
					$(this).addClass('checked').siblings('.a_check').removeClass('checked').addClass('uncheck');
					refreshThemeList($(this).attr('create') );
				});
				
				$('[name=themename],[name=themedesc],[name=snapname],[name=snapdesc]',$node).on('focus', function(){
					$(this).removeClass('error');
				});
				var $img = $('.snapshotimg img',$node), 
					w = $img.width(), 
					h = $img.height(),
					pw = $img.parent().width(), 
					ph = $img.parent().height();
					
				if(w/h < pw/ph){
					$img.css('height', '100%');
				}else{
					$img.css('width', '100%');
				}
    		},
    		okValue: '确定',
    		ok: function(){
    			var $dlg = this, $node = $(this.node),
    				themename = $('[name=themename]',$node).select2('data').text,
    				submitData = {
    					themeid: $('[name=themename]',$node).val(),
	    				themedesc: $('[name=themedesc]',$node).val(),
	    				snapname: $('[name=snapname]',$node).val(),
	    				snapdesc: $('[name=snapdesc]',$node).val()
    				};
    			
    			$.each(submitData, function(i,n){
    				if(mining.utils.isEmpty(n)){
    					$('[name=' + i + '].required',$node).addClass('error');
    				}
    			});
    			if($('.error',$node).size() > 0){
    				return false;
    			}
    			
    			var submitSnapshot = function(themeId){
					//description: 描述graphData: 图数据user_id: 创建者用户名status: 快照集状态type: 快照集类型，0: 图析；1: 地图thumbnail: 快照缩略图base64字符串, judgeThemeId研判主题Id
    				$ajax.ajax({
						url: requestUrl.save,
						type: 'post',
						data: {
							name: submitData.snapname,
							description: submitData.snapdesc,
							user_id: mining.userinfo.user_id,
							judgeThemeId: themeId,
							type: 0,
							thumbnail: graphPng,
							graphData: JSON.stringify(graphJsonNew)
						},
	    				success: function(data){
	    					$dlg.close().remove();
	    					$dialog.alert(op.title + '成功！', 'success');
	    					if(!mining.utils.isEmpty(op.success) && $.isFunction(op.success))op.success.call(this, data);
	    					try{
	    						scopaConfig.pages.cooperation.getCooperationDataCounts();
	    						scopaConfig.pages.cooperation.photosAbord();
	    					}catch(e){}
	    					mining.utils.serverLog(22, submitData.themeid + '-' + submitData.snapname);//用户行为记录
	    				},
	    				error: function(data){
	    					mining.utils.alertMsg(data, op.title + '失败，请稍后重试', 'error');
	    					if(!mining.utils.isEmpty(op.error) && $.isFunction(op.error))op.error.call(this, data);
	    				}
					});
    			}
    			if($('[create=true]',$node).hasClass('checked')){
    				//name: 研判主题名称；description: 研判主题的描述；author: 创建者
    				$ajax.ajax({
						url: requestUrl.savetheme,
						type: 'post',
						data: {
							name: submitData.themeid,
							description: submitData.themedesc,
							author: mining.userinfo.user_id
						},
	    				success: function(result){
	    					submitSnapshot(result.obj);
	    				},
	    				error: function(result){
	    					mining.utils.alertMsg(result, '创建研判主题失败，请稍后重试', 'error');
	    					if(!mining.utils.isEmpty(op.error) && $.isFunction(op.error))op.error.call(this, data);
	    				}
					});
    			}else{
    				if(submitData.themedesc != 'themedesc'){
    					////id: ID name: 研判主题名称；description: 新的研判主题的描述；author: 创建者ID；type：权限管理（留以后使用）
	    				$ajax.ajax({
							url: requestUrl.updatetheme,
							type: 'post',
							data: {
								id: submitData.themeid,
								name: themename,
								description: submitData.themedesc,
								author: mining.userinfo.user_id
							},
		    				success: function(result){
		    					submitSnapshot(submitData.themeid);
		    				},
		    				error: function(result){
		    					mining.utils.alertMsg(result, '更新研判主题失败，请稍后重试', 'error');
		    					if(!mining.utils.isEmpty(op.error) && $.isFunction(op.error))op.error.call(this, data);
		    				}
						});
    				}
    				submitSnapshot(submitData.themeid);
    			}
				return false;
    			/****************************************************/
    			
    			var saveData = {
					user_id: mining.userinfo.user_id,
					name: $('[name=name]',$node).val().trim(),
					description: $('[name=desc]',$node).val(),
					graphData: graphJsonNew,
					thumbnail: graphPng,
					type: 0
				}, hasError = false
    			
				if($('[create=true]',$node).hasClass('checked')){
					$.extend(saveData, {create: snapshotProj.id});
				}else{
                    if(mining.utils.isEmpty(saveData.name)){
                        $dialog.alert('输入快照名称！', 'error',10000, function(){
                        $('[name=name]',$node).focus();
                    });
                     return false;
                }
					var checkName = function(checkdata){
						if(checkdata.message != 'true')return false;
						$dialog.alert('快照名称已被占用！', 'error',10000, function(){
							$('[name=name]',$node).focus();
						});
						hasError = true;
					}
					$ajax.ajax({
						url: requestUrl.checkname,
						data: {
							name: saveData.name,
							type: saveData.type
						},
						async: false,
						success: checkName,
						error: checkName
					});
				}
				if(hasError)return false;
    			$ajax.ajax({
					url: requestUrl.save,
					type: 'post',
					data: saveData,
    				success: function(data){
    					$dlg.close().remove();
    					$dialog.alert(op.title + '成功！', 'success');
    					if(!mining.utils.isEmpty(op.success) && $.isFunction(op.success))op.success.call(this, data);
    				},
    				error: function(data){
    					mining.utils.alertMsg(data, op.title + '失败，请稍后重试', 'error');
    					if(!mining.utils.isEmpty(op.error) && $.isFunction(op.error))op.error.call(this, data);
    				}
				});
    		},
    		cancelValue: '取消',
    		cancel: true,
    		onclose: function(){
    			$('.main').removeClass('blur');//去除背景模糊效果
    			if(!mining.utils.isEmpty(op.graph))op.graph.zoom(graphJson.zoom);
    		}
    	}).showModal();
	}
	
	/**
     * @name Snapshot#delSnapshot
     * @function   
     * @desc 删除快照集。
     * @param {Object} options
     */
	var delSnapshot = function(option){
		var op = $.extend({
			id: '',	//快照集ID
			title: '删除快照集',
			success: null,
			error: null
		}, option);
	
		if(mining.utils.isEmpty(op.id)) return;
		$dialog.confirm({
			title: op.title,
	        content: '您确定要&nbsp;<b class="red">删除该快照集</b>&nbsp;吗？',
	        ok: function(){
	        	var $dlg = this;
	        	$ajax.ajax({
	       			url: requestUrl.del,
	       			data: {
	       				name: op.id
	       			},
       				success: function(data){
       					$dialog.alert(op.title + '成功！', 'success');
       					if(!mining.utils.isEmpty(op.success) && $.isFunction(op.success))op.success.call(this, data);
       				},
       				error: function(data){
       					mining.utils.alertMsg(data, op.title + '失败，请稍后重试', 'error');
       					if(!mining.utils.isEmpty(op.error) && $.isFunction(op.error))op.error.call(this, data);
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
	 * @name Snapshot#delSnapshot
	 * @function
	 * @desc 删除快照。
	 * @param {Object} options
	 */
	var delPicSnapshot = function(option){
		var op = $.extend({
			id: '',	//快照集ID
			title: '删除快照',
			success: null,
			error: null
		}, option);

		if(mining.utils.isEmpty(op.id)) return;
		$dialog.confirm({
			title: op.title,
			content: '您确定要&nbsp;<b class="red">删除该快照</b>&nbsp;吗？',
			ok: function(){
				var $dlg = this;
				$ajax.ajax({
					url: requestUrl.delPic,
					data: {
						sid: op.id
					},
					success: function(data){
						$dialog.alert(op.title + '成功！', 'success');
						if(!mining.utils.isEmpty(op.success) && $.isFunction(op.success))op.success.call(this, data);
					},
					error: function(data){
						mining.utils.alertMsg(data, op.title + '失败，请稍后重试', 'error');
						if(!mining.utils.isEmpty(op.error) && $.isFunction(op.error))op.error.call(this, data);
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
     * @name Snapshot#openSnapshot
     * @function   
     * @desc 打开快照到图析。
     * @param {Object} options
     */
	var openSnapshot = function(option){
		var op = $.extend({
			id: '',	//快照ID
			title: '打开快照',
			success: null,
			error: null
		}, option);
	
		if(mining.utils.isEmpty(op.id)) return;
		var action = '';
		$dialog({
			title: '研判-图析',
	        content: '<span class="artui-dialog-confirm"></span><span>是否清空图析已有分析结果？</span>',
	        button:[{
	            value: '是',
	            callback: function () {
	                action = 'open';
	            },
	            autofocus: true
	        },
	        {
	            value: '否',
	            callback: function () {
	                 action = 'import';
	            }
	        },
	        {
	            value: '取消'
	        }],
	        onclose: function(){
	        	if(mining.utils.isEmpty(action))return;
	        	getSnapshot({
	       			id: op.id,
	       			success: function(data){
	       				mining.utils.localStorage(mining.localname.graphSnapshot, {
							graph: data.obj.graphData,
							action: action
						});
						mining.utils.localStorage(mining.localname.snapshotProject, {
							id: data.obj.judgeThemeId
						});
						mining.utils.hashChange('graph');
	       			}
	       		});
	        }
		}).showModal();
		
		/*$dialog.confirm({
			title: op.title,
			content: '操作会清空当前图析数据，您确定要打开此快照吗？',
			okVlaue: '确定',
			ok: function(){
	       		getSnapshot({
	       			id: op.id,
	       			success: function(data){
	       				mining.utils.localStorage(mining.localname.graphSnapshot, {
							graph: data.graphData,
							action: 'open'
						});
						mining.utils.localStorage(mining.localname.snapshotProject, {
							id: data.id,
							name: data.name,
							description: data.description
						});
						mining.utils.hashChange('graph');
	       			}
	       		});
			},
			cancelValue: '取消',
			cancel: true
		});*/
	}
	
	/**
     * @name Snapshot#importSnapshot
     * @function   
     * @desc 导入快照到图析。
     * @param {Object} options
     */
	var importSnapshot = function(option){
		var op = $.extend({
			id: '',	//快照ID
			title: '导入快照',
			success: null,
			error: null
		}, option);
	
		if(mining.utils.isEmpty(op.id)) return;
		getSnapshot({
   			id: op.id,
   			success: function(data){
   				mining.utils.localStorage(mining.localname.graphSnapshot, {
					graph: data.graphData,
					action: 'import'
				});
				mining.utils.hashChange('graph');
   			}
   		});
	}
	
	/**
     * @name Snapshot#shareSnapshot
     * @function   
     * @desc 分享快照集。
     * @param {Object} options
     */
	var shareSnapshot = function(option){
		var op = $.extend({
			id: '',	//快照集ID
			title: '分享快照集',
			success: null,
			error: null
		}, option);
	
		if(mining.utils.isEmpty(op.id)) return;
		$dialog.confirm({
			title: op.title,
	        content: '您确定要&nbsp;<b class="red">分享该快照集</b>&nbsp;吗？',
	        ok: function(){
	        	var $dlg = this;
	        	$ajax.ajax({
	       			url: requestUrl.share,
	       			data: {
	       				name: op.id
	       			},
       				success: function(data){
       					$dialog.alert(op.title + '成功！', 'success');
       					if(!mining.utils.isEmpty(op.success) && $.isFunction(op.success))op.success.call(this, data);
       				},
       				error: function(data){
       					mining.utils.alertMsg(data, op.title + '失败，请稍后重试', 'error');
       					if(!mining.utils.isEmpty(op.error) && $.isFunction(op.error))op.error.call(this, data);
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
     * @name Snapshot#shareSnapshot
     * @function
     * @desc 分享快照。
     * @param {Object} options
     */
    var sharePicSnapshot = function(option){
        var op = $.extend({
            id: '',	//快照集ID
            title: '分享快照',
            success: null,
            error: null
        }, option);

        if(mining.utils.isEmpty(op.id)) return;
        $dialog.confirm({
            title: op.title,
            content: '您确定要&nbsp;<b class="red">分享该快照</b>&nbsp;吗？',
            ok: function(){
                var $dlg = this;
                $ajax.ajax({
                    url: requestUrl.sharePic,
                    data: {
                        sid: op.id
                    },
                    success: function(data){
                        $dialog.alert(op.title + '成功！', 'success');
                        if(!mining.utils.isEmpty(op.success) && $.isFunction(op.success))op.success.call(this, data);
                    },
                    error: function(data){
                        mining.utils.alertMsg(data, op.title + '失败，请稍后重试', 'error');
                        if(!mining.utils.isEmpty(op.error) && $.isFunction(op.error))op.error.call(this, data);
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
     * @name Snapshot#pushSnapshot
     * @function   
     * @desc 推送快照集。
     * @param {Object} options
     */
	var pushSnapshot = function(option){
		var op = $.extend({
			id: '',	//快照集ID
			title: '推送快照集',
			thumbnail: '',
			success: null,
			error: null
		}, option);
		
		if(mining.utils.isEmpty(op.id)) return;
		$dialog({
			title: false,
    		width: 660,
    		padding: 0,
			onshow: function(){
				var $dlg = this, $node = $(this.node);
				
				$('.main').addClass('blur');//添加背景模糊效果
				$node.addClass('saveSnapshot');
    			$dlg.content(['<div class="col-sm-4 imgbox" style="height:360px;">',
						'<div class="title">快照预览</div>',
						'<div class="snapshotimg" style="margin-top:80px;"><img src="' + op.thumbnail + '" style="max-width:100%;max-height:100%"><span class="selectbtn"></span></div>',
					'</div>',
    				'<form class="form-horizontal required-validate col-sm-8 nopadding infobox">',
    					'<div class="title">' + op.title + '<span class="closebtn">×</span></div>',
			    		'<div class="form-group">',
							'<label class="col-sm-3 control-label">推送类型</label>',
							'<div class="col-sm-8">',
								'<select name="type" style="width:280px" placeholder="请选择...">', 
									'<option></option>',
									'<option value="2">推送到用户</option>',
									'<option value="3">推送到群组</option>',
								'</select>',
							'</div>',
						'</div>',
						'<div class="form-group">',
							'<label class="col-sm-3 control-label">推送对象</label>',
							'<div class="col-sm-8">',
								'<input type="text" name="tid" style="width:280px" placeholder="请选择..."></input>',
							'</div>',
						'</div>',
						'<div class="form-group">',
							'<label class="col-sm-3 control-label">推送理由</label>',
							'<div class="col-sm-8">',
								'<textarea name="comment" class="form-control" maxlength="200" placeholder="请填写理由..." style="height:100px;"></textarea>',
							'</div>',
						'</div>',
			    	  	'<button type="button" class="cancelbtn">取消</button>',
			    	  	'<button type="button" class="submitbtn">确定</button>',
		    	  	'</form>'].join(''));
				
				$('[name=type]',$node).select2({
			    	dropdownCssClass: 'artui-select2'
				}).on('change', function(){
					var userModule = require('common/user');
					
					if($(this).val() == '2'){
						userModule.getalluser({
							success: function(data){
								var dataArr = [];
								
								$.each(data, function(i,n){
									if(n.user_id == mining.userinfo.user_id)return;
									dataArr.push({id: n.user_id, text: n.name});
								});
								$('[name=tid]',$node).select2({
									data: dataArr,
									dropdownCssClass: 'artui-select2'
								}).select2('val', dataArr[0].id);
							}
						});
					}else{
						userModule.getallgroup({
							success: function(data){
								var dataArr = [];
								
								$.each(data, function(i,n){
									dataArr.push({id: n.user_gid, text: n.name});
								});
								$('[name=tid]',$node).select2({
									data: dataArr,
									dropdownCssClass: 'artui-select2'
								}).select2('val', dataArr[0].id);
							}
						});
					}
				
					
				}).on('select2-open', function(){
					$(this).siblings('label.error').remove();
				});
				$('[name=tid]',$node).select2({
					data: [],
					dropdownCssClass: 'artui-select2'
				});
				
				$('.submitbtn',$node).on('click', function(){
	    			$ajax.ajax({
						url: requestUrl.push,
						type: 'post',
						data: {//sid(快照ID) fid(推送者id) tid(被推送者id) comment(评论) type(0为用户推用户，1为用户推群组)
							name: op.id,
							fid: mining.userinfo.user_id,
							type: $('[name=type]',$node).val(),
							tid: $('[name=tid]',$node).val(),
							comment: $('[name=comment]',$node).val()
						},
	    				success: function(data){
	    					$dlg.close().remove();
	    					$dialog.alert(op.title + '成功！', 'success');
	       					if(!mining.utils.isEmpty(op.success) && $.isFunction(op.success))op.success.call(this, data);
	    				},
	    				error: function(data){
	    					mining.utils.alertMsg(data, op.title + '失败，请稍后重试', 'error');
	       					if(!mining.utils.isEmpty(op.error) && $.isFunction(op.error))op.error.call(this, data);
	    				}
					});
				});
				$('.closebtn,.cancelbtn',$node).on('click', function(){
					$dlg.close().remove();
				});
			},
    		onclose: function(){
    			$('.main').removeClass('blur');//去除背景模糊效果
    		}
		}).showModal();
	}

    /**
     * @name Snapshot#pushSnapshot
     * @function
     * @desc 推送快照。
     * @param {Object} options
     */
    var pushPicSnapshot = function(option){
        var op = $.extend({
            id: '',	//快照集ID
            title: '推送快照集',
            thumbnail: '',
            success: null,
            error: null
        }, option);

        if(mining.utils.isEmpty(op.id)) return;
        $dialog({
            title: false,
            width: 660,
            padding: 0,
            onshow: function(){
                var $dlg = this, $node = $(this.node);

				$('.main').addClass('blur');//添加背景模糊效果
                $node.addClass('saveSnapshot');
                $dlg.content(['<div class="col-sm-4 imgbox" style="height:360px;">',
                    '<div class="title">快照预览</div>',
                    '<div class="snapshotimg" style="margin-top:80px;"><img src="' + op.thumbnail + '" height="100"><span class="selectbtn"></span></div>',
                    '</div>',
                    '<form class="form-horizontal required-validate col-sm-8 nopadding infobox">',
                    '<div class="title">' + op.title + '<span class="closebtn">×</span></div>',
                    '<div class="form-group">',
                    '<label class="col-sm-3 control-label">推送类型</label>',
                    '<div class="col-sm-8">',
                    '<select name="type" style="width:280px" placeholder="请选择...">',
                    '<option></option>',
                    '<option value="0">推送到用户</option>',
                    '<option value="1">推送到群组</option>',
                    '</select>',
                    '</div>',
                    '</div>',
                    '<div class="form-group">',
                    '<label class="col-sm-3 control-label">推送对象</label>',
                    '<div class="col-sm-8">',
                    '<input type="text" name="tid" style="width:280px" placeholder="请选择..."></input>',
                    '</div>',
                    '</div>',
                    '<div class="form-group">',
                    '<label class="col-sm-3 control-label">推送理由</label>',
                    '<div class="col-sm-8">',
                    '<textarea name="comment" class="form-control"  maxlength="200" placeholder="请填写理由..." style="height:100px;"></textarea>',
                    '</div>',
                    '</div>',
                    '<button type="button" class="cancelbtn">取消</button>',
                    '<button type="button" class="submitbtn">确定</button>',
                    '</form>'].join(''));

                $('[name=type]',$node).select2({
                    dropdownCssClass: 'artui-select2'
                }).on('change', function(){
                    var userModule = require('common/user');

                    if($(this).val() == '0'){
                        userModule.getalluser({
                            success: function(data){
                                var dataArr = [];

                                $.each(data, function(i,n){
                                    if(n.user_id == mining.userinfo.user_id)return;
                                    dataArr.push({id: n.user_id, text: n.name});
                                });
                                $('[name=tid]',$node).select2({
                                    data: dataArr,
                                    dropdownCssClass: 'artui-select2'
                                }).select2('val', dataArr[0].id);
                            }
                        });
                    }else{
                        userModule.getallgroup({
                            success: function(data){
                                var dataArr = [];

                                $.each(data, function(i,n){
                                    dataArr.push({id: n.user_gid, text: n.name});
                                });
                                $('[name=tid]',$node).select2({
                                    data: dataArr,
                                    dropdownCssClass: 'artui-select2'
                                }).select2('val', dataArr[0].id);
                            }
                        });
                    }


                }).on('select2-open', function(){
                    $(this).siblings('label.error').remove();
                });
                $('[name=tid]',$node).select2({
                    data: [],
                    dropdownCssClass: 'artui-select2'
                });

                $('.submitbtn',$node).on('click', function(){
                    $ajax.ajax({
                        url: requestUrl.push,
                        type: 'post',
                        data: {//sid(快照ID) fid(推送者id) tid(被推送者id) comment(评论) type(0为用户推用户，1为用户推群组)
                            sid: op.id,
                            fid: mining.userinfo.user_id,
                            type: $('[name=type]',$node).val(),
                            tid: $('[name=tid]',$node).val(),
                            comment: $('[name=comment]',$node).val()
                        },
                        success: function(data){
                            $dlg.close().remove();
                            $dialog.alert(op.title + '成功！', 'success');
                            if(!mining.utils.isEmpty(op.success) && $.isFunction(op.success))op.success.call(this, data);
                        },
                        error: function(data){
                            mining.utils.alertMsg(data, op.title + '失败，请稍后重试', 'error');
                            if(!mining.utils.isEmpty(op.error) && $.isFunction(op.error))op.error.call(this, data);
                        }
                    });
                });
                $('.closebtn,.cancelbtn',$node).on('click', function(){
                    $dlg.close().remove();
                });
            },
    		onclose: function(){
    			$('.main').removeClass('blur');//去除背景模糊效果
    		}
        }).showModal();
    }

    /**
     * @name Snapshot#copySnapshot
     * @function   
     * @desc 复制快照。
     * @param {Object} options
     */
	var copySnapshot = function(option){
		var op = $.extend({
			id: '',	//快照ID
			title: '复制快照',
			success: null,
			error: null
		}, option);
		
		if(mining.utils.isEmpty(op.id)) return;
		getSnapshot({
			id: op.id,
			success: function(data){
				saveSnapshot({
					title: op.title,
					data: data,
					success: op.success,
					error: op.error
				});
			}
		});
		//
	}
	
	/**
     * @name Snapshot#getThumbnail
     * @function   
     * @desc 获取快照缩略图。
     * @param {Object} options
     */
	var getThumbnail = function(option){
		var op = $.extend({
			id: '',	//快照ID
			title: '获取快照缩略图',
			success: null,
			error: null
		}, option);
		
		if(mining.utils.isEmpty(op.sid)) return;
		$ajax.ajax({
			url: requestUrl.thumbnail,
			data: {
				sid: op.sid
			},
			success: function(data) {
				if(mining.utils.isEmpty(data.result)){
					if(!mining.utils.isEmpty(op.error) && $.isFunction(op.error))op.error.call(this, data);
				}else{
					if(!mining.utils.isEmpty(op.success) && $.isFunction(op.success))op.success.call(this, data.result);
				}
			},
			error: function(data) {
				seajs.log(op.title + '失败，请稍后重试');
				if(!mining.utils.isEmpty(op.error) && $.isFunction(op.error))op.error.call(this, data);
			}
		});
	}
	
	       	
   	/*$page.off('click', '.action_push').on('click', '.action_push', function(){
		$dialog({
			title: '推送快照',
			width: 600,
			onshow: function(){
				var $dlg = this, $node = $(this.node);
					
				$('.main').addClass('blur');//添加背景模糊效果
				$dlg.content(['<form class="form-horizontal required-validate">',
								'<div class="form-group">',
								'<label class="col-sm-3 control-label">推送部门</label>',
								'<div class="col-sm-8">',
									'<select style="width:390px" class="select2-ipt" placeholder="请输入推送部门">', 
									'<option></option>',
									'<option>省厅</option>',
									'<option>市局</option>',
									'<option>区县分局</option>',
									'</select>',
								'</div>',
								'</div>',
								'<div class="form-group">',
								'<label class="col-sm-3 control-label">推送人员</label>',
								'<div class="col-sm-8">',
									'<input type="text" class="form-control" placeholder="请输入推送人员"></input>',
								'</div>',
								'</div>',
							'<div class="form-group">',
								'<label class="col-sm-3 control-label">推送理由</label>',
								'<div class="col-sm-8">',
									'<textarea name="description" class="form-control" placeholder="请填写理由..." style="height:100px;"></textarea>',
								'</div>',
								'</div>',
							'</form>'].join(''));
					require('select2');
					$('.select2-ipt', $node).select2();
					$node.initUI();
			},
			okValue: '确定',
			ok: function(){
				$dialog.alert('推送快照成功！', 'success');
			},
			cancelValue: '取消',
			cancel: true,
			onclose: function(){
				$('.main').removeClass('blur');//去除背景模糊效果
				$('.tooltip').remove();
			}
		}).showModal();
	});*/
	
	
	return {
		get: getSnapshot,
		save: saveSnapshot,
		del: delSnapshot,
		delPic:delPicSnapshot,
		open: openSnapshot,
		import: importSnapshot,
		share: shareSnapshot,
		sharePic:sharePicSnapshot,
		push: pushSnapshot,
		pushPic:pushPicSnapshot,
		thumbnail: getThumbnail
	}
});