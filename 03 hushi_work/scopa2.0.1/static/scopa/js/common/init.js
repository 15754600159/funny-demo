define(function(require){
	
	/* 扩展 mining */
	require('./utils');
	require('./config');
	require('./mapping');
	
	/* 预加载插件 */
	require('select2');
	require('moment');
	require('easing');
	require('scrollbar');
	
	mining.ajaxTimeout = mining.utils.loadLogin;
	
	//pgis样式表处理
	var pgisCssCount = 0,
		pgisCssTimer= setInterval(function(){
			var $css = $('head link[href="http://10.25.1.234/PGIS_S_TileMap/css/EzServer.css"]');
			if($css.size() > 0 || pgisCssCount > 60000){
				clearInterval(pgisCssTimer);
				$css.remove()				
			}
			pgisCssCount += 500;
		},500);
	
    $(function(){
    	/*---------- 全局控制 ----------*/
        //获取mapping
        mining.mappingutils.get();
        
        //登出
        $(document).on('click', '.navbar .logout', function(){
        	$ajax.ajax({
        		url: mining.baseurl.pass + '/logout',
        		success: function(){
        			mining.utils.clearLocalData();
        			mining.utils.gotoUrl('index.html');
        		},
        		error: function(data){
        			mining.utils.alertMsg(data, '登出失败，请稍后重试！', 'error');
        		}
        	});
        	mining.utils.serverLog(3, (window.location.href.indexOf('core.html') != -1 ? 'core' : 'console'));//用户行为记录
        });
    });
});