define(function(require, exports, module){
	
	/*北京开发环境*/
    var basehost = 'http://k1222.mlamp.co';
    var baseurl = {
    		host: basehost,
    		pass: basehost + '/tuning/services/pass',
	    	core: basehost + '/tuning/services/core',
	    	console: basehost + '/tuning/services/console',
	    	analysis: basehost + '/tuning/services/analysis',
	    	nlpdemo: basehost + ':7180/nlpdemo',
	    	gongan: basehost + '/tuning/services/sjz/gongan',
	    	apphost: 'http://d25.mlamp.co:5000',
	    	hartsmapping: 'http://29v1.mlamp.co:9099/harts/mapping',
			hartsevent:'http://29v1.mlamp.co:9099/harts/event',
			cona: basehost + ':8090'
	    }
	
	/*石家庄生产环境*/
	/*var basehost = 'http://qbbigdata.sjzs.eb';
    var baseurl = {
    		host: basehost,
    		pass: basehost + '/tuning/services/pass',
	    	core: basehost + '/tuning/services/core',
	    	console: basehost + '/tuning/services/console',
	    	analysis: basehost + '/tuning/services/analysis',
	    	nlpdemo: basehost + ':7180/nlpdemo',
	    	gongan: basehost + '/tuning/services/sjz/gongan',
	    	apphost: basehost + ':5000',
	    	hartsmapping: basehost + ':5054/harts/mapping',
			hartsevent: basehost + ':5054/harts/event',
			cona: 'http://qbscopa1.sjz.eb:8090'
	    }*/
    
	$.extend(mining, {
		baseurl: baseurl,
		history: 5,
        localname: {
        	//core
        	graphMapping: 'SCOPA_GraphMapping',
        	
        	graphHistory: 'SCOPA_GraphHistory',
        	graphSnapshot: 'SCOPA_GraphSnapshot',
        	
        	mapSnapshot: 'SCOPA_MapSnapshot',
        	mapHistory: 'SCOPA_MapHistory',
        	
        	fileSnapshot: 'SCOPA_FileSnapshot',
        	fileHistory: 'SCOPA_FileHistory',
        	fileAnalyze: 'SCOPA_FileAnalyze',
        	
        	snapshotProject: 'SCOPA_snapshotProject',
        	timelineColor: 'SCOPA_TimelineColor',
        	
        	
        	//new core
        	mapping: 'SCOPA_Mapping',
        	history: 'SCOPA_History',
        	snapshot: 'SCOPA_Snapshot',
        	template: 'SCOPA_Template',
        	config: 'SCOPA_Config'
        },
        roleRelation: {
            import: 10,//导航栏 导入
            addEntity:11,//图析-添加实体
            addRelation:12,//图析-添加关系
            radiusSearch:13,//地图-半径搜索
            pathSearch:14,//地图-路径搜索
            viewFile:15,//档案-查看文件
            importFile:16,//档案-导入文件
            cooperationCommon: 17,//协作-公用tab
			control:21,//应用-多元布控
			controlRole:22,//应用-多元布控列表审核按钮权限
			point:26,//应用-积分预警
			forewarn:27,//应用-团伙预警
			events:30,
			intelligence:31,
			report:32,
			eventforewarn:33,
			labels:34,
			covert:28,
			dynamic:29,
			analysis:35,
			cha:36
        },
        /*//石家庄生产环境
        roleRelation: {
            import: 10,//导航栏 导入
            addEntity:11,//图析-添加实体
            addRelation:12,//图析-添加关系
            radiusSearch:13,//地图-半径搜索
            pathSearch:14,//地图-路径搜索
            viewFile:15,//档案-查看文件
            importFile:16,//档案-导入文件
            cooperationCommon: 17,//协作-公用tab
			control:34,//应用-多元布控
			controlRole:22,//应用-多元布控列表审核按钮权限
			point:37,//应用-积分预警
			forewarn:36,//应用-团伙预警
			events:30,
			intelligence:31,
			report:32,
			eventforewarn:41,
			labels:33,
			covert:35,
			dynamic:38,
			analysis:39,
			cha:40
        },*/
        mapping: (function(){
       		var m = mining.utils.localStorage('SCOPA_Mapping');
	       	if(mining.utils.isEmpty(m) && mining.mappingutils){
				m = mining.mappingutils.get(baseurl.console);
			}
			return m;
        })(),
        userinfo: {},
		/**
		 * @name Utils#jsonAjax
	     * @function   
	     * @desc json格式ajax。
	     * @param {Object} op	【必选】
	     */
        jsonAjax: function(op){
        	if(mining.utils.isEmpty(op.data))return;
        	$ajax.ajax($.extend(op,{
        		type: 'post',
        		datatype: 'json',
        		contentType: 'appliction/json',
        		data: (typeof op.data == 'string' ? op.data : JSON.stringify(op.data))
        	}));
        },
        graphMaxMnu: 2000,
        iconameArr: ["entity","relation","event","entity-graphicon-atm","entity-graphicon-yihang","entity-graphicon-bank-card","entity-graphicon-bayonet","entity-graphicon-big-car","entity-graphicon-browser_account","entity-graphicon-car","entity-graphicon-case","entity-graphicon-cell_phone_imei","entity-graphicon-cell_phone_mac","entity-graphicon-collective-household","entity-graphicon-document","entity-graphicon-email_account_suser","entity-graphicon-email_accounts","entity-graphicon-email_accounts_manger","entity-graphicon-entity-registered","entity-graphicon-families","entity-graphicon-feiqiankezhongdianren","entity-graphicon-file","entity-graphicon-flights","entity-graphicon-hotel","entity-graphicon-human","entity-graphicon-huochecheci","entity-graphicon-huzhao","entity-graphicon-IP","entity-graphicon-jizhan","entity-graphicon-mac","entity-graphicon-micro_blog_account","entity-graphicon-organization","entity-graphicon-phone","entity-graphicon-picture","entity-graphicon-product","entity-graphicon-public_security_intelligence","entity-graphicon-qiankezhongdianren","entity-graphicon-qq_and_wechat_group_number","entity-graphicon-qq_and_wechat_number","entity-graphicon-small-car","entity-graphicon-taobao_account","entity-graphicon-telephone","entity-graphicon-video","entity-graphicon-wangba","entity-graphicon-wifi","entity-graphicon-account","entity-graphicon-architecture","entity-graphicon-audio","relation-graphicon-zhanghuduizhanghu","relation-graphicon-renzhanghusuoshu","relation-graphicon-cell_phone","relation-graphicon-cell_phonenumber","relation-graphicon-email","relation-graphicon-father_child","relation-graphicon-group_members","relation-graphicon-guardian","relation-graphicon-huhuguanxi","relation-graphicon-human_alarm","relation-graphicon-mate","relation-graphicon-micro_blog_friends","relation-graphicon-micro_blog_staterelease","relation-graphicon-mixture","relation-graphicon-mother_child","relation-graphicon-paccancy","relation-graphicon-people_involved_in_the_case","relation-graphicon-people_reported_the_cas","relation-graphicon-police_case","relation-graphicon-qq_and_wechat_friends","relation-graphicon-qq_and_wechat_number2","relation-graphicon-relation-suspiction","relation-graphicon-relatives","relation-graphicon-renhuzhaoguanxi","relation-graphicon-renshouji-m-guanxi","relation-graphicon-taobao","relation-graphicon-telephone_directory","relation-graphicon-the-part-of","relation-graphicon-victim_warning_instance","relation-graphicon-victimsof_the_case","relation-graphicon-went-together","relation-graphicon-uniE948","relation-graphicon-browser_account2","relation-graphicon-car2","event-graphicon-quxian","event-graphicon-ruzhangjiaoyi","event-graphicon-wnagyindenglu","event-graphicon-chuzhangjiaoyi","event-graphicon-communication","event-graphicon-departures","event-graphicon-email2","event-graphicon-event-nowifi","event-graphicon-event-register","event-graphicon-huoche","event-graphicon-huzhaodingpiao","event-graphicon-huzhaohuoche","event-graphicon-huzhaokonggangligang","event-graphicon-huzhaowangba","event-graphicon-huzhaozhusu","event-graphicon-micro_blog_privateletter","event-graphicon-micro_blog_staterelease2","event-graphicon-mobile_sms","event-graphicon-mobilephone_company_wifi","event-graphicon-paccancy2","event-graphicon-qq_and_wechat_chat","event-graphicon-qq_and_wechat_groupchat","event-graphicon-qq_and_wechat_staterelease","event-graphicon-taobao_search","event-graphicon-taobao_view","event-graphicon-url_view","event-graphicon-wangba2","event-graphicon-accommodation","event-graphicon-booking","event-graphicon-case2","event-graphicon-checkpoint"]
	});
});