define(function(require, exports, module){
	
    /**
     * @name User
     * @class 提供：获取所有用户(getalluser)，获取所有用户组(getallgroup)，创建快照(save)，删除快照(del) 方法。
     */
	var requestUrl = {
			get: mining.baseurl.pass + '/getUserInfo',
			alluser: mining.baseurl.console + '/user/allUsers',
			allgroup: mining.baseurl.console + '/user/allGroups'
		};
							
	/**
     * @name User#getInfo
     * @function   
     * @desc 获取当前用户信息。
     * @param {Object} options
     */
	var getInfo = function(option){
		var op = $.extend({
			title: '获取当前用户信息',
			success: null,
			error: null
		}, option);
	
		if(mining.utils.isEmpty(op.success)) return;
		$ajax.ajax({
   			url: requestUrl.get,
			success: function(data){
				var user = null;
				try{
					user = data.obj;
				}catch(e){
					user = data;
				}
				if(!mining.utils.isEmpty(op.success) && $.isFunction(op.success))op.success.call(this, user);
			},
			async: false,
			error: function(data){
				if(!mining.utils.isEmpty(op.error) && $.isFunction(op.error))op.error.call(this, data);
			}
   		});
	}
							
	/**
     * @name User#getAllUser
     * @function   
     * @desc 获取所有用户。
     * @param {Object} options
     */
	var getAllUser = function(option){
		var op = $.extend({
			title: '获取所有用户列表',
			success: null,
			error: null
		}, option);
	
		if(mining.utils.isEmpty(op.success)) return;
		$ajax.ajax({
   			url: requestUrl.alluser,	async: false,
			success: function(data){
				if(!mining.utils.isEmpty(op.success) && $.isFunction(op.success))op.success.call(this, data.listObj);
			},
			error: function(data){
				mining.utils.alertMsg(data, op.title + '失败，请稍后重试！', 'error');
				if(!mining.utils.isEmpty(op.error) && $.isFunction(op.error))op.error.call(this, data);
			}
   		});
	}
							
	/**
     * @name User#getAllGroup
     * @function   
     * @desc 获取所有用户组。
     * @param {Object} options
     */
	var getAllGroup = function(option){
		var op = $.extend({
			title: '获取所有用户组列表',
			success: null,
			error: null
		}, option);
	
		if(mining.utils.isEmpty(op.success)) return;
		$ajax.ajax({
   			url: requestUrl.allgroup,
			success: function(data){
				if(!mining.utils.isEmpty(op.success) && $.isFunction(op.success))op.success.call(this, data.listObj);
			},
			error: function(data){
				mining.utils.alertMsg(data, op.title + '失败，请稍后重试！', 'error');
				if(!mining.utils.isEmpty(op.error) && $.isFunction(op.error))op.error.call(this, data);
			}
   		});
	}
	
	
	return {
		get: getInfo,
		getalluser: getAllUser,
		getallgroup: getAllGroup
	}
});