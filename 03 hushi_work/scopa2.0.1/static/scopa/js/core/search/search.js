define(function(require){
	/* ---------- 首页 ---------- */
	var $page = $('.page-search'),
		requestUrl = {
			infolist: mining.baseurl.core + '/mining/listAll',//列出所有挖掘结果，参数：pageNo, pageSize
			getvertex: mining.baseurl.core + '/query/getVertexByIndex', //根据身份证号码获取点信息 ?value=370105198202223003&index=key
			getpath: mining.baseurl.core + '/query/getPath', //根据点 ID ?vids=[16784,819216880,163856552]&hop=1
			snapshotlist: mining.baseurl.core + '/snapshot/listAll',	// user_id, pageSize, pageNo, keyword(name desc author), starttime, endtime
			load: mining.baseurl.core + '/snapshot/load',				//sid
			search: mining.baseurl.core + '/query/search',			//content  type: all,entity,relation,event,media
			search_snapshot: mining.baseurl.core + '/snapshot/listByEntity',	//entity:'实体id'  pageNo  pageSize
			expandEdge: mining.baseurl.core + '/query/expandEdge'//?eid=XXX&label=XXX
		},
		searchModule = require('./searchresult');
	
	//刷新布局
    var pageResize = function(){
    	var infoH = $page.height() - $('.homesearch',$page).height() - 230,
    		searchH = $page.height() - 118;
    		
    	$('.searchlist,.resultinfo',$page).height(searchH);
    	$('.resultinfo .snapshotlist',$page).height(infoH/2);
    	$('.resultinfo .proplist',$page).height(infoH/2);
    }
    
	/* 初始化首页 */
    var initPage = function(){
    	$page = $('.page-search')
    	mining.utils.loadPage($page, function(){
			mining.utils.winResize({name:pageResize}); 
    		
    		//搜索
    		initSearch();
       	
	    	seajs.log('首页');
    	});
    }
    
    /* 搜索 */
    var initSearch = function(){
    	searchModule.init();
    }
	
    return {
    	init: initPage
    }
});