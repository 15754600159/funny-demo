define(function(require){
	/*---------- 图析 ----------*/
	var $page,
		graphModule = new (require('core/common/graphchart/graphchart'))(),
		eventModule = new (require('core/common/eventchart/eventchart'))(),
		infosideModule = new (require('core/common/infoside/infoside'))(),
		timelineModule = new (require('core/common/timeline'))(),
		graphmenuModule = require('core/graph/graphmenu/graphmenu'),
		searchModule = new (require('core/graph/graphSearch'))(),
		toolbarModule = require('./toolbar/toolbar'),
		$graph,
		$toolbar,
		$graphchart,
		$timeline,
		$infoside,
		infosideUI,
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
    window.graphModule = graphModule;
	/* 初始化图析 */
	var initPage = function(){
		$page = $('.page-mygraph');
		mining.utils.loadPage($page, function(){
			$page.data('module', graphModule);
			$graph = $('.graph', $page);
			$toolbar = $('.toolbar', $page);
			$graphchart = $('#graphChart', $page);
			$timeline = $('.timeline', $page);
			$infoside = $('.infoside', $page);
			mining.utils.winResize({name:pageResize}, true);
			
			if(mining.utils.isEmpty(graph)){
				//Timeline-时间筛选回调
				var timefilter = function(range, checkedLabel, uncheckLabel){
					graphModule.timefilter(range, checkedLabel, uncheckLabel);
					eventModule.timefilter(range, checkedLabel, uncheckLabel);
				}
				//Timeline-类别筛选回调
				var legendfilter = function(labels){
					graphModule.labelfilter(labels);
					eventModule.labelfilter(labels);
				}
				
				//数据变动回调
				var dataCallback = function(){
					try{clearTimeout(timer);}catch(e){};
					timer = setTimeout(function(){
						mining.utils.loadingMsg('计算统计信息，请您稍等......');
						infosideModule.refresh({
							graph: graph,
							eventModule: eventModule,
							container: $('.infoside', $page)
						});
						timelineModule.refresh({
							graph: graph,
							eventModule: eventModule,
							container: $('.timeline', $page),
							timefilter: timefilter,
							legendfilter: legendfilter
						});
						eventModule.refresh();
						mining.utils.modalLoading('close');
					},100);
				}
				
				//元素选择变化回调
				var selectCallback = function(){
					try{clearTimeout(timer);}catch(e){};
					timer = setTimeout(function(){
						infosideModule.show({
							graph: graph,
							eventModule: eventModule,
							container: $('.infoside', $page)
						});
					},100);
				}
				
				$('.play-config-box .play-duration').select2({
		            minimumResultsForSearch: Infinity
		        });
		        $('.play-config-box .play-duration').prop("disabled", true);
				
				//初始化关系图
				graphModule.init({
					container: $('#graphChart', $page),
					snapshot: true,
					navigator: true,
					panzoom: true,
					eventchart: eventModule,
					readyCallback: function(){
						graph = this;
						window.dragon = graph;
						
						//初始化事件展示
						eventModule.init({
							graph: graph,
							selectCallback: selectCallback,
							dataCallback: dataCallback
						});
						
						//初始化右键菜单
						graphmenuModule.init({
							graphModule: graphModule,
							eventModule: eventModule,
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
						if(infosideModule)infosideModule.init({
							graph: graph,
							eventModule: eventModule,
							container: $('.infoside', $page)
						});
						mining.utils.chartResize();
						
						//添加测试数据
						var testData = require('./testdata');
						graphModule.appenddata({v:[testData.v[0]]});
						setTimeout(function(){
							graphModule.appenddata(testData);
						},300);
					},
					selectCallback: selectCallback,
					dataCallback: dataCallback,
					resizeCallback: function(){
						try{clearTimeout(timer);}catch(e){};
						timer = setTimeout(function(){
							timelineModule.refresh({
								graph: graph,
								eventModule: eventModule,
								container: $('.timeline', $page),
								timefilter: timefilter,
								legendfilter: legendfilter
							});
						},100);
					},
					dblclickCallback: function(){
						try{clearTimeout(timer);}catch(e){};
						timer = setTimeout(function(){
							var scale = 'small';
							if($('.infoside .scalebox .scalebtn-small',$page).is(':visible'))scale = 'full';
							if(infosideModule)infosideModule.scale({
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
						},100);
					}
				});

				// 初始化搜索
				searchModule.init({
					container: $('.search-panel', $page)
				});
				window.graphSearchModule = searchModule;
			}else{
				//检查快照
				graphModule.snapshot();
			}
		});
    }
    
    
    return {
    	init: initPage
    }
});
