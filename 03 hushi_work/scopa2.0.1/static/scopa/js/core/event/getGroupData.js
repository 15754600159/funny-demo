define(function(require){
	

	var getGroupData = function(id,callback){
        var dataUrl = mining.baseurl.gongan + '/zdsj/qtfile/info?applicantId=' + mining.userinfo.user_id + '&id=',
            showModule = require('core/common/showelement');
		$ajax.ajax({
			url: dataUrl + id,
			async: false,
            success: function(data){
            	if(callback){
            		callback(data);
            	}else{
            		showModule.show([data.obj], 'file', '2');
            	}
            },
            error: function(err) {
                console.log(err);
            }
		});
	}
	return {
        get: getGroupData
    }
});