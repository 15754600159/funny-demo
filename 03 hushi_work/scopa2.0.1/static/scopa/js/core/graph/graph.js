define(function(require){
	/*---------- 图析 ----------*/
	var $page = $('.page-graph'),
		graphModule = new (require('core/common/graphchart/graphchart'))(),
		eventModule = new (require('core/common/eventchart/eventchart'))(),
		notesModule = new (require('core/common/noteschart/noteschart'))(),
		infosideModule = new (require('core/common/infoside/infoside'))(),
		graphmenuModule = require('./graphmenu/graphmenu'),
		timelineModule = new (require('core/common/timeline'))(),
		toolbarModule = require('./toolbar/toolbar'),
		$graph,
		$toolbar,
		$graphchart,
		$timeline,
		$infoside,
		graph = null,
		timer;
		
	/* 刷新布局 */
    var pageResize = function(){
		var gap = 0;
    	if($timeline.hasClass('scale-small')){
    		gap = 100;
    	}
    	$graph.add($graphchart).height($page.height() - $timeline.height() - 2 + gap - $('.breadnavbg',$page).height());
    	if(!mining.utils.isEmpty(graph))graph.resize();
    }
    
	var initData = {
		nodes: [
			/*{"data":{"id":"1835224","name":"耿久久\n130431196301164409","showbigger":"耿久久\n130431196301164409","data":{"zylb":"省、军级的企、事业单位及其工作机构负责人","rylb":"普通人","xm":"耿久久","gid":1835224,"xb":"女","label":"person","type":"common","mz":"外国血统","key":"130431196301164409","ssx":"河北省衡水市枣强县","photoUrl":"http://k1222.mzhen.cn/static/scopa/images/avatar/40.jpg","etype":"entity","time":"2015-10-10 19:31:41"},"etype":"entity"},"position":{"x":820.5370943740866,"y":832.4161126124711},"group":"nodes","removed":false,"selected":true,"selectable":true,"locked":false,"grabbed":false,"grabbable":true,"classes":"entity person person_common shownormal"},
			{"data":{"id":"999801288","name":"A1301984100002000010001\n电缆被盗案","showbigger":"A1301984100002000010001\n盗窃\n电缆被盗案\n20140717100500","data":{"jyaq":"2014年07月15日18时许,宣翔宇报警:宣翔宇(女\\,联系电话13783878524)于东湖北郡58号附近发现联通电缆被盗，遂报警","geo":{"type":"POINT","lat":38.86980438232422,"lng":115.49170684814453},"slrq":"20140717100500","ajbh":"A1301984100002000010001","gid":999801288,"ajzt":"已受案","label":"case","type":"common","ajlb":"盗窃","ajdz":"东湖北郡","ajmc":"电缆被盗案","etype":"entity","time":"2015-10-10 19:34:55"},"etype":"entity"},"position":{"x":856.617602619898,"y":255.1640369179554},"group":"nodes","removed":false,"selected":true,"selectable":true,"locked":false,"grabbed":false,"grabbable":true,"classes":"entity case case_common shownormal hidtxt"},
			{"data":{"id":"164184512","name":"宣翔宇\n130105199908314600","showbigger":"宣翔宇\n130105199908314600","data":{"zylb":"饭馆、餐厅服务员","rylb":"普通人","xm":"宣翔宇","gid":164184512,"xb":"女","label":"person","type":"common","mz":"白族","key":"130105199908314600","ssx":"河北省衡水市景县","photoUrl":"http://k1222.mzhen.cn/static/scopa/images/avatar/60.jpg","etype":"entity","time":"2015-10-10 19:33:41"},"etype":"entity"},"position":{"x":499.56501209108603,"y":514.7578788607036},"group":"nodes","removed":false,"selected":true,"selectable":true,"locked":false,"grabbed":false,"grabbable":true,"classes":"entity person person_common shownormal hidtxt"}*/
		]
	}
	
	/* 初始化图析 */
	var initPage = function(){
		$page = $('.page-graph');
		mining.utils.loadPage($page, function(){
			$page.data('module', graphModule);
			$graph = $('.graph', $page);
			$toolbar = $('.toolbar', $page);
			$graphchart = $('#graphChart', $page);
			$timeline = $('.timeline', $page);
			$infoside = $('.infoside', $page);
			mining.utils.winResize({name:pageResize}, true);
			
			if(mining.utils.isEmpty(graph)){
				var timefilter = function(range, checkedLabel, uncheckLabel){
					graphModule.timefilter(range, checkedLabel, uncheckLabel);
					eventModule.timefilter(range, checkedLabel, uncheckLabel);
				}
				var legendfilter = function(labels){
					graphModule.labelfilter(labels);
					eventModule.labelfilter(labels);
				}
				var dataCallback = function(){
					try{clearTimeout(timer);}catch(e){};
					timer = setTimeout(function(){
						console.time('graph-dataCallback');
						console.time('graph-dataCallback-infoside');
						mining.utils.loadingMsg('计算统计信息，请您稍等......');
						infosideModule.refresh({
							graph: graph,
							eventModule: eventModule,
							container: $('.infoside', $page)
						});
						console.timeEnd('graph-dataCallback-infoside');
						console.time('graph-dataCallback-timeline');
						timelineModule.refresh({
							graph: graph,
							eventModule: eventModule,
							container: $('.timeline', $page),
							timefilter: timefilter,
							legendfilter: legendfilter
						});
						console.timeEnd('graph-dataCallback-timeline');
						eventModule.refresh();
						console.timeEnd('graph-dataCallback');
						mining.utils.modalLoading('close');
						console.timeEnd('***ExpandEvent');
						console.timeEnd('***ExpandEntity');
					},100);
				}
				var selectCallback = function(){
					try{clearTimeout(timer);}catch(e){};
					timer = setTimeout(function(){
						console.time('graph-selectCallback');
						infosideModule.show({
							graph: graph,
							eventModule: eventModule,
							container: $('.infoside', $page)
						});
						console.timeEnd('graph-selectCallback');
					},100);
				}
				
				graphModule.init({
					container: $('#graphChart', $page),
					elements: initData,
					snapshot: true,
					navigator: true,
					panzoom: true,
					eventchart: eventModule,
					noteschart: notesModule,
					readyCallback: function(){
						graph = this;
						window.dragon = graph;
						window.graphModule = graphModule;
						window.graphmenuModule = graphmenuModule;
						window.graphNotesMoudle = notesModule;
						window.graphInfosideModule = infosideModule;
						
						//初始化右键菜单
						graphmenuModule.init({
							graphModule: graphModule,
							eventModule: eventModule,
							notesModule: notesModule,
							graph: graph,
							container: $('#graphChart', $page)
						});
						
						//初始化工具条
						toolbarModule.init({
							graphModule: graphModule,
							eventModule: eventModule,
							graph: graph,
							container: $('.toolbar', $page)
						});
						
						//初始化时间线
						timelineModule.init({
							graph: graph,
							eventModule: eventModule,
							container: $('.timeline', $page),
							timefilter: timefilter,
							legendfilter: legendfilter
						});
						
						//初始化右侧
						infosideModule.init({
							graph: graph,
							eventModule: eventModule,
							container: $('.infoside', $page)
						});
						mining.utils.chartResize();
						//graphModule.appenddata({v:[{"PERSON_lx":"瓜子脸","PERSON_jszzt":"有效","PERSON_jlcxsj":"1483117261000","PERSON_ztrybh":"447588901404346046","PERSON_fzrq":"1483117261000","PERSON_zxrq":"1454169600000","PERSON_hjdz":"中国北京北京西城区第0小区第0楼第0单元第0层0门","PERSON_sfly":"是","PERSON_tx":"瘦","PERSON_zjlx":"证件类型","type":"non_cri_person","PERSON_bjzdrybh":"481320287106084144","PERSON_ch":"熊1_外号","PERSON_mgqlkjb":"1","PERSON_lydpzl":"鸦片","key":"110102198405077335","PERSON_nrbjzdryksj":"1483117261000","PERSON_zzmm":"团员","PERSON_tprq":"1454169600000","PERSON_sjzdrybh":"650345679455063490","PERSON_csdxz":"中国北京北京西城区第0小区第0楼第0单元第0层0门","PERSON_dzyx":"0930361180.mlamp.co","PERSON_xzdxz":"中国北京北京西城区第0小区第0楼第0单元第0层0门","PERSON_yxqs":"1264913999000","label":"person","PERSON_hzh":"G40365016","PERSON_lxdh":"13678635387","PERSON_zcxh":"42","PERSON_gzdw":"明略搬砖人员","PERSON_wwxm":"熊1_外文姓名","PERSON_zy":"耍杂技的","PERSON_sfzyxrq":"2555942400000","PERSON_zjhm":"证件号码138807912255548280","PERSON_ky":"无","PERSON_sjhm":"13678635387","PERSON_swrq":"1483117261000","PERSON_zjcx":"小轿车","gid":"16856","PERSON_hyzk":"已婚","PERSON_zjlasj":"1483117261000","PERSON_jzqx":"6年","PERSON_zsdpzl":"吗啡","PERSON_sfzqfrq":"1264867200000","PERSON_yxqz":"1483117261000","PERSON_dna":"DNA976450645205667","PERSON_grgs":"我的自白","PERSON_tssf":"熊1_特殊身份","PERSON_sg":"177","PERSON_csrq":"452707200000","PERSON_zjxy":"基督教","PERSON_xb":"男","PERSON_swzxlb":"A","key_label":"110102198405077335_person","PERSON_xdcs":"东小口镇","PERSON_xm":"熊1","PERSON_jsh":"4534","PERSON_zxbh":"证芯编号210908561212078433","PERSON_cym":"熊1_曾用名","PERSON_xq":"50","PERSON_wfrybh":"541635683160690038","PERSON_jlbgsj":"1483117261000","PERSON_mz":"满族","PERSON_xx":"O","PERSON_whcd":"大专","PERSON_rxid":"888911453060057","PERSON_zxbs":"B","PERSON_jlxzsj":"1483117261000","PERSON_tbtsbj":"无","PERSON_fzjg":"东小口镇派出所","PERSON_zwbh":"指纹编号395561815560288","etype":"entity"}]});
					},
					selectCallback: selectCallback,
					dataCallback: function(){
						dataCallback();
					},
					resizeCallback: function(){
						try{clearTimeout(timer);}catch(e){};
						timer = setTimeout(function(){
							console.time('graph-resizeCallback');
							timelineModule.refresh({
								graph: graph,
								eventModule: eventModule,
								container: $('.timeline', $page),
								timefilter: timefilter,
								legendfilter: legendfilter
							});
							console.timeEnd('graph-resizeCallback');
						},100);
					},
					dblclickCallback: function(){
						try{clearTimeout(timer);}catch(e){};
						timer = setTimeout(function(){
							console.time('graph-dblclickCallback');
							var scale = 'small';
							if($('.infoside .scalebox .scalebtn-small',$page).is(':visible'))scale = 'full';
							infosideModule.scale({
								graph: graph,
								eventModule: eventModule,
								container: $('.infoside', $page),
								scale: scale
							});
							timelineModule.scale({
								graph: graph,
								container: $('.timeline', $page),
								scale: scale
							});
							console.timeEnd('graph-dblclickCallback');
							mining.utils.serverLog(45);//用户行为记录
						},100);
					}
				});
				
				//初始化事件展示
				eventModule.init({
					selectCallback: selectCallback,
					dataCallback: dataCallback
				});
				window.graphEventModule = eventModule;

				// 初始化便签
				notesModule.init({
					dataCallback: function(gid) {
						graphModule.refreshstate(gid);
					}
				});
			}else{
				//生成测试数据 mining.utils.localStorage(mining.localname.graphSnapshot,{action:'open',graph:mining.utils.getGraphSnapshot(dragon).graph})
				//检查快照
				graphModule.snapshot();
			}
			
			seajs.log('图析');
		});
    }
    
    
    return {
    	init: initPage
    }
});
