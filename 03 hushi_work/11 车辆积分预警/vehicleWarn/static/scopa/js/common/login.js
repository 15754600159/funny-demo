define(function(require) {
	$(function() {
		/*---------- 登录 ----------*/
		mining.utils.loadLogin({
			container: '.mainlogin',
			success: function(data, sdata) {
				mining.utils.clearLocalData();
				if(sdata.type != '0'){
					mining.utils.localStorage(mining.localname.config, {
						username: sdata.username
					});
				}
				mining.utils.gotoUrl((sdata.type == '0' ? 'core' : 'console') + '.html');
			}
		});
	});
});