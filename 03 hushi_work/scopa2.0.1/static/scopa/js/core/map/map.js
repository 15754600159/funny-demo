define(function(require){
	/*---------- 地图 ----------*/
	var $page = $('.page-map'),
		//baidu
		mapModule = require('core/common/mapchart/baidu/mapchart'),
		toolbarModule = require('./toolbar/baidu/toolbar'),
		//pgis
		/*mapModule = new (require('core/common/mapchart/pgis/mapchart'))(),
		toolbarModule = require('./toolbar/pgis/toolbar'),*/
		
		timelineModule = new (require('core/common/timeline'))(),
		infosideModule = new (require('core/common/infoside/infoside'))(),
		eventModule = new (require('core/common/eventchart/eventchart'))(),
		$map,
		$toolbar,
		$mapchart,
		$timeline,
		$infoside,
		map = null;
	
	//刷新布局
    var pageResize = function(){
    	var gap = 0;
    	if($timeline.hasClass('scale-small')){
    		gap = 100;
    	}
    	$map.add($mapchart).height($page.height() - $timeline.height() - 2 + gap - $('.breadnavbg',$page).height());
    	//if(!mining.utils.isEmpty(map))map.resize();
    }
    
	var initPage = function(){
		$page = $('.page-map');
		mining.utils.loadPage($page, function(){
			$map = $('.map', $page);
			$page.data('module', mapModule);
			$toolbar = $('.toolbar', $page);
			$mapchart = $('#mapGraph', $page);
			$timeline = $('.timeline', $page);
			$infoside = $('.infoside', $page);
			mining.utils.winResize({name:pageResize}, true);
			
			if(mining.utils.isEmpty(map)){
				var timefilter = function(range, checkedLabel, uncheckLabel){
					mapModule.timefilter(range, checkedLabel, uncheckLabel);
					eventModule.timefilter(range, checkedLabel, uncheckLabel);
				}
				var legendfilter = function(labels){
					mapModule.labelfilter(labels);
					eventModule.labelfilter(labels);
				}
				var dataCallback = function(){
					try{clearTimeout(timer);}catch(e){};
					timer = setTimeout(function(){
						infosideModule.refresh({
							graph: map,
							eventModule: eventModule,
							container: $('.infoside', $page)
						});
						timelineModule.refresh({
							graph: map,
							eventModule: eventModule,
							container: $('.timeline', $page),
							timefilter: timefilter,
							legendfilter: legendfilter
						});
					},100);
				}
				var selectCallback = function(){
					try{clearTimeout(timer);}catch(e){};
					timer = setTimeout(function(){
						infosideModule.show({
							graph: map,
							eventModule: eventModule,
							container: $('.infoside', $page)
						});
					},100);
				}
				
				mapModule.init({
					id: 'mapGraph',
					readyCallback: function(bdmap){
						map = bdmap;
						window.bdmap = map;
						//初始化工具条
						toolbarModule.init({
							map: map,
							eventModule: eventModule,
							mapModule: mapModule,
							container: $('.toolbar', $page)
						});
						
						//初始化时间线
						timelineModule.init({
							graph: map,
							eventModule: eventModule,
							container: $('.timeline', $page),
							timefilter: timefilter,
							legendfilter: legendfilter
						});
						
						//初始化右侧
						infosideModule.init({
							graph: map,
							eventModule: eventModule,
							container: $('.infoside', $page)
						});
						
						/*mapModule.appenddata([
							{
								geo:{lng:114.52186,lat:38.03666},
								"PERSON_mz":"汉族",
							"PERSON_csrq":"496339200000","PERSON_xb":"男","PERSON_hjdz":"陕西省岐山县枣林镇仝寨村火星凹组56号","gid":407197762016,"PERSON_jlxzsj":"20150817085131","label":"person","type":"other","PERSON_xm":"李博龙","key":"610323198509246312","photoUrl":"http://zdry.zx.eb:9080/zdry/photo.do?sfzh=610323198509246312","etype":"entity"
							}
							
						])*/
						/*mapModule.appenddata([{
			"HOTEL_cyrs": "5",
			"HOTEL_cws": "60",
			"HOTEL_lxdh": "87232197",
			"HOTEL_ssfjdm": "130105",
			"HOTEL_frsfz": "15212719690709332X",
			"type": "other",
			"HOTEL_ztbgrq": "1256054400000",
			"HOTEL_qyxz": "个人",
			"HOTEL_ldxj": "其他",
			"HOTEL_zjl": "王艳玲",
			"HOTEL_zbx": "114.48099000",
			"HOTEL_zby": "38.04789000",
			"HOTEL_ldmc": "裕丰招待所",
			"key": "1301050130_hotel",
			"HOTEL_lddj": "其他",
			"geo": {
				"type": "POINT",
				"lat": 38.047889709472656,
				"lng": 114.48098754882812
			},
			"HOTEL_zxbz": "未注销",
			"HOTEL_fddbr": "王艳玲",
			"HOTEL_fjs": "30",
			"HOTEL_zt": "装机开业",
			"lddm": "1301050130",
			"HOTEL_zazrr": "王永新",
			"label": "hotel",
			"HOTEL_sspcsdm": "130105020",
			"HOTEL_ldxz": "河北省石家庄市新华区北大街2号",
			"HOTEL_hylx": "A",
			"HOTEL_gxdwmc": "石家庄市公安局新华路派出所",
			"gid": 147463012824,
			"HOTEL_ssxmc": "内蒙古自治区锡林郭勒盟太仆寺旗",
			"HOTEL_bars": "5",
			"HOTEL_babdh": "87232197",
			"photoUrl": "http:\/\/zdry.zx.eb:9080\/zdry\/photo.do?sfzh=1301050130_hotel"
		}]);*/
					},
					selectCallback: selectCallback,
					dataCallback: function(){
						dataCallback();
						eventModule.refresh();
					},
					resizeCallback: function(){
						timelineModule.refresh({
							graph: map,
							eventModule: eventModule,
							container: $('.timeline', $page),
							timefilter: timefilter,
							legendfilter: legendfilter
						});
					},
					dblclickCallback: function(){
						var scale = 'small';
						if($('.infoside .scalebox .scalebtn-small',$page).is(':visible'))scale = 'full';
						infosideModule.scale({
							graph: map,
							eventModule: eventModule,
							container: $('.infoside', $page),
							scale: scale
						});
						timelineModule.scale({
							graph: map,
							eventModule: eventModule,
							container: $('.timeline', $page),
							timefilter: timefilter,
							legendfilter: legendfilter,
							scale: scale
						});
						mining.utils.serverLog(65);//用户行为记录
					}
				});
			}else{
				mapModule.snapshot();
			}
			
			//初始化事件展示
			eventModule.init({
				selectCallback: selectCallback/*,
				dataCallback: dataCallback*/
			});
			
			//记录地图初始化
			window.SCOPA_MAP_GRAPH = true;
			
			seajs.log('地图');
		});
    }


    return {
    	init: initPage
    }
});