define(function(require, exports, module){

	/**
     * @name Comment
     * @class 提供：获取单个标注(get)，获取标注列表(list)，添加标注(add) 方法。
     */
	var requestUrl = {
			get: mining.baseurl.core + '/comment/getByCommentId',		//获取单个标注：[get]  id(标注ID)
			list: mining.baseurl.core + '/comment/getByElementId',		//获取标注列表：[post] id(实体/关系/事件ID) pageNo pageSize
			add: mining.baseurl.core + "/comment/add",					//添加标注：[post] uid(用户ID) eid(实体/关系/事件ID) type comment
			del: mining.baseurl.core + "/comment/del"					//删除标注：[get] id(评论ID)
		};
							
	/**
     * @name Comment#getComment
     * @function   
     * @desc 获取标注。
     * @param {Object} options
     */
	var getComment = function(option){
		var op = $.extend({
			id: '',	//标注ID
			title: '获取标注信息',
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
				if(!mining.utils.isEmpty(op.success) && $.isFunction(op.success))op.success.call(this, data);
			},
			error: function(data){
				mining.utils.alertMsg(data, op.title + '失败，请稍后重试！', 'error');
				if(!mining.utils.isEmpty(op.error) && $.isFunction(op.error))op.error.call(this, data);
			}
   		});
	}
							
	/**
     * @name Comment#getCommentList
     * @function   
     * @desc 获取标注列表。
     * @param {Object} options
     */
	var getCommentList = function(option){
		var op = $.extend({
			id: '',	//标注ID
			title: '获取标注列表',
			pageNo: 1,
			pageSize: 50,
			success: null,
			error: null
		}, option);
	
		if(mining.utils.isEmpty(op.id)) return;
   		$ajax.ajax({
			url: requestUrl.list,
			data: {
				id: op.id,
				pageNo: op.pageNo,
				pageSize: op.pageSize
			},
			success: function(data){
				if(!mining.utils.isEmpty(op.success) && $.isFunction(op.success))op.success.call(this, data);
			},
			error: function(){
				mining.utils.alertMsg(data, op.title + '失败，请稍后重试！', 'error');
				if(!mining.utils.isEmpty(op.error) && $.isFunction(op.error))op.error.call(this, data);
			}
		});
	}
							
	/**
     * @name Comment#addComment
     * @function   
     * @desc 创建标注。
     * @param {Object} options
     */
	var addComment = function(option){
		var op = $.extend({
			uid: mining.userinfo.user_id,	//用户id
			eid: '',	//实体/关系/事件ID
			type: '',
			title: '创建标注',
			success: null,
			error: null
		}, option);
	
		if(mining.utils.isEmpty(op.uid) || mining.utils.isEmpty(op.eid)) return;
		$dialog({
    		title: op.title,
    		width: 600,
    		onshow: function(){
    			var $dlg = this, $node = $(this.node);
				
    			$('.main').addClass('blur');//添加背景模糊效果
				$dlg.content(['<form class="form-horizontal required-validate" onsubmit="return false;">',
					'<div class="form-group">',
		    	    	'<label class="col-sm-2 control-label">标注内容</label>',
		    	    	'<div class="col-sm-10">',
		    	    		'<textarea name="comment" class="form-control" placeholder="请填写..." style="height:200px;"></textarea>',
		    	    	'</div>',
		    	  	'</div>',
				'</form>'].join(''));
    		},
    		okValue: '确定',
    		ok: function(){
    			var $dlg = this, $node = $(this.node);
    			var comment = $('[name=comment]',$node).val();
    			
    			if(mining.utils.isEmpty(comment))return false;
    			$ajax.ajax({
    				url: requestUrl.add,
    				data: {
    					content: JSON.stringify({
	    					uid: op.uid,
	    					eid: op.eid,
	    					type: op.type,
	    					comment: comment
    					})
					},
    				type: 'post',
    				success: function(data){
    					$dlg.close().remove();
    					$dialog.alert(op.title + '成功！', 'success');
    					if(!mining.utils.isEmpty(op.success) && $.isFunction(op.success))op.success.call(this, data);
    				},
    				error: function(data){
    					mining.utils.alertMsg(data, op.title + '失败，请稍后重试！', 'error');
    					if(!mining.utils.isEmpty(op.error) && $.isFunction(op.error))op.error.call(this, data);
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
     * @name Comment#delComment
     * @function   
     * @desc 删除标注。
     * @param {Object} options
     */
	var delComment = function(option){
		var op = $.extend({
			id: '',
			title: '删除标注',
			success: null,
			error: null
		}, option);
	
		if(mining.utils.isEmpty(op.id)) return;
		$dialog.confirm({
            title: op.title,
            content: '您确定要删除该标注信息吗？',
            ok: function(){
                $ajax.ajax({
                    url: requestUrl.del,
                    data:{
                    	id: op.id
                    },
                    success: function (data) {
    					$dialog.alert(op.title + '成功！', 'success');
    					if(!mining.utils.isEmpty(op.success) && $.isFunction(op.success))op.success.call(this, data);
                    },
                    error:function(data){
                        mining.utils.alertMsg(data, op.title + '失败，请稍后重试！', 'error');
    					if(!mining.utils.isEmpty(op.error) && $.isFunction(op.error))op.error.call(this, data);
                    }
                });
            }
        });
	}
	
	
	return {
		get: getComment,
		list: getCommentList,
		add: addComment,
		del: delComment
	}
});