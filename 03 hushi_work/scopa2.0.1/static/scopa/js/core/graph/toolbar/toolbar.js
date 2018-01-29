define(function(require, exports, module){
	
	/**
     * @name Toolbar
     * @class 描述。
     * @requires jquery
     */
    
    var defaultConfig = {
    	graphModule: null,
    	eventModule: null,
    	graph: null,
    	container: null
    },
    requestUrl = {
    	transferExcel: mining.baseurl.host + '/tuning/services/snapshot/transferExcel'
    },
    customElement = require('core/common/customelement'),
    snapshotModule = require('core/common/snapshot'),
    dataflowModule = require('./dataflow'),
    globeModule = require('./globe'),
    eventModule,
    graphModule;
    
    
	var initToolbar =  function(config){
		
		config = config || {};
		for(var key in config){
			config[key] = config[key] || defaultConfig[key];
		}
		graphModule = config.graphModule;
		eventModule = config.eventModule;
		var graph = config.graph,
			$toolbar = (typeof config.container == 'string' ? $(config.container) : config.container);
		
		if(mining.utils.isEmpty(graph) || $toolbar.size() < 1) return;
		
		//后退
		$('.undo',$toolbar).off('click').on('click', function(){
			graphModule.history('backward');
			mining.utils.serverLog(9);//用户行为记录
		});
		
		//前进
		$('.redo',$toolbar).off('click').on('click', function(){
			graphModule.history('forward');
			mining.utils.serverLog(10);//用户行为记录
		});
		//权限
		if(!mining.utils.hasRoleForAction('addEntity')){
			$('.add-entity',$toolbar).addClass('hide');
		}
		if(!mining.utils.hasRoleForAction('addRelation')){
			$('.add-relation',$toolbar).addClass('hide');
		}
		//
		//添加实体
		$('.add-entity',$toolbar).off('click').on('click', function(){
			customElement.add({
				type: 'entity',
				success: function(result){
					$.extend(result.v[0], {
						class: 'new'
					})
					graphModule.appenddata(result);
				}
			});
			mining.utils.serverLog(11);//用户行为记录
		});
		
		//添加关系
		$('.add-relation',$toolbar).off('click').on('click', function(){
			var selection = graph.$('.entity:selected');
			
			if(selection.length < 2){
				 $dialog.alert('请选择至少 2 个实体！', 'warning');
				 return;
			}
			customElement.add({
				type: 'relation',
				from: selection[0].data().data,
				to: selection[1].data().data,
				success: function(result){
					$.extend(result.e[0], {
						class: 'new'
					})
					graphModule.appenddata(result);
				}
			});
			mining.utils.serverLog(12);//用户行为记录
		});
		
		//锁定
		$('.lock',$toolbar).off('click').on('click', function(){
			graph.$('node:selected').lock();
			mining.utils.saveGraphHistory(graph);
			try{
				var nameArr = [];
				$.each(graph.$('node:selected'), function(i,n){
					nameArr.push(n.data().name);
				});
				mining.utils.serverLog(13, nameArr.join(','));//用户行为记录
			}catch(e){}
		});
		
		//解锁
		$('.unlock',$toolbar).off('click').on('click', function(){
			graph.$('node:selected').unlock();
			mining.utils.saveGraphHistory(graph);
			try{
				var nameArr = [];
				$.each(graph.$('node:selected'), function(i,n){
					nameArr.push(n.data().name);
				});
				mining.utils.serverLog(14, nameArr.join(','));//用户行为记录
			}catch(e){}
		});
		
		//自动排布
		$('.layout-auto',$toolbar).off('click').on('click', function(){
			graphModule.layout('auto');
			mining.utils.serverLog(15);//用户行为记录
		});
		
		//网格排布
		$('.layout-grid',$toolbar).off('click').on('click', function(){
			if(isrun)$('.layout-theme',$toolbar).click();
			graphModule.layout('grid');
			mining.utils.serverLog(16);//用户行为记录
		});
		
		//层次排布
		$('.layout-grade',$toolbar).off('click').on('click', function(){
			if(isrun)$('.layout-theme',$toolbar).click();
			graphModule.layout('breadthfirst');
			mining.utils.serverLog(17);//用户行为记录
		});
		
		//环形排布
		$('.layout-circle',$toolbar).off('click').on('click', function(){
			if(isrun)$('.layout-theme',$toolbar).click();
			graphModule.layout('circle');
			mining.utils.serverLog(18);//用户行为记录
		});
		
		//分类排布
		$('.layout-group',$toolbar).off('click').on('click', function(){
			if(isrun)$('.layout-theme',$toolbar).click();
			graphModule.layout('circle');
		});
		
		//DataFlow 数据流动
		var isrun = false
		$('.layout-theme',$toolbar).off('click').on('click', function(){
			
			//临时添加单项流动效果 start
			var idArr1 = ["#139264016672","#98304016760","#139264033056","#139264049440","#163840016680","#163840033064","#204800016568","#5qzfslr8-1rz676zk-88c9h-2m30n454","#5qzfsk6c-1rz676zk-88c9h-239m4ilk","#5qzfsilg-1rz676zk-88c9h-239m45yg","#5qzfsox0-1rz676zk-88c9h-1rz67w9s","#6wdq5mp0-1rz676zk-88c9h-195ro8s8","#5qzfsnc4-1rz676zk-88c9h-1rz67jmo"]
			
			if(dragon.$(idArr1.join(',')).length == idArr1.length){
					
			}
			//临时添加单项流动效果 end
			var posArr = [], 
				pan = dragon.pan(), 
				zoom = dragon.zoom(), 
				w = 10,
				eles = dragon.$('edge:selected').not('.event');
				
			if(eles.length < 1)eles = dragon.$('edge').not('.event');
			$.each(eles, function(i,n){
				posArr.push({
					x1: (n.source().position().x - w) * zoom + pan.x,
					y1: (n.source().position().y - w) * zoom + pan.y,
					x2: (n.target().position().x + w) * zoom + pan.x,
					y2: (n.target().position().y + w) * zoom + pan.y,
					d: 'oneway'
				});
			});
			if(!isrun){
				if(posArr.length < 1)return;
				dataflowModule.run(posArr);
				isrun = true;
				$(this).addClass('active');
				$(document).off('click.dataflow').on('click.dataflow', function(e){
					if(isrun && ($(e.target).parents('.timeline').size() + $(e.target).parents('.infoside').size() + $(e.target).parents('.toolbar').size() < 1))$('.layout-theme',$toolbar).click();
				});
				try{
					var nameArr = [];
					$.each(graph.$('node:selected'), function(i,n){
						nameArr.push(mining.mappingutils.getTypeName(n.data().data) + '-' + n.data().name);
					});
					mining.utils.serverLog(19, nameArr.join(','));//用户行为记录
				}catch(e){}
			}else{
				dataflowModule.stop();
				isrun = false;
				$(this).removeClass('active')
			}
		});
		
		//点重要度
		$('.elementscore',$toolbar).off('click mouseenter mouseleave').on('click', function(){
			var $this = $(this);
			$this.add($('.active',$this)).removeClass('active');
			closeScoreShow();
		}).on('mouseenter', function(){
			var $this = $(this);
			$('.subaction',$this).slideDown('fast');
		}).on('mouseleave', function(){
			var $this = $(this);
			$('.subaction',$this).slideUp('fast');
		});
		$('.elementscore1,.elementscore2,.elementscore3,.elementscore4',$toolbar).off('click').on('click', function(e){
			mining.utils.stopBubble(e);
			var $this = $(this);
			if($this.hasClass('active')){
				closeScoreShow();
				$this.add($('.elementscore',$toolbar)).removeClass('active');
				return;
			}
			$this.addClass('active').siblings().removeClass('active');
			$('.elementscore',$toolbar).addClass('active');
			openScoreShow($this.attr('centrality'));
			mining.utils.serverLog(20, $('.text',$this).text() + '-' + $this.attr('centrality'));//用户行为记录
		});
		var openScoreShow = function(centrality){
			closeScoreShow();
			/* 打分
			 * 接口http://qbscopa16.sjz.eb/analysis/services/analysis/score
				参数：
				graphData JSONObject
				distribution 默认值NormalDistribution 可选值 NormalDistribution
				centrality 默认值 DegreeCentrality 可选值DegreeCentrality ClosenessCentrality BetweennessCentrality ClusteringCoefficient
				levels JSONArray 默认值[0.7, 0.9]
				
				*   中文翻译
				* 	Betweenness Centrality——中介性
					Closeness Centrality——紧密性
					clusteringCoefficient——聚集系数
					degree Centrality——度中心性

				* */
			
			$ajax.ajax({
				//url: mining.baseurl.analysis + '/score',
				url: mining.baseurl.host+'/tuning/services/olap/analysis/score',
				data: {
					graphData: JSON.stringify(dragon.json().elements),
					centrality: centrality,
					levels: JSON.stringify([0.7, 0.9])
				},
				type: 'post',
				success: function(data){
					$.each(data.content, function(i,n){
						if(n.level == 2){
							dragon.$('#'+n.id).style({
								'width': '119px',
								'height': '119px',
								'background-width': '119px',
								'background-height': '119px'
							}).addClass('scoreview');
						}else if(n.level == 3){
							dragon.$('#'+n.id).style({
								'width': '143px',
								'height': '143px',
								'background-width': '143px',
								'background-height': '143px'
							}).addClass('scoreview');
						}
					});
				},
				error: function(data){
					seajs.log(data);
				}
			});
		}
		var closeScoreShow = function(){
			$.each(dragon.$('.scoreview'), function(i,n){
				n.style({
					'width': '63px',
					'height': '63px',
					'background-width': '63px',
					'background-height': '63px'
				}).removeClass('.scoreview');
			});
		}
		
		//球形展示
		$('.analysis',$toolbar).off('click').on('click', function(){
			if(!window.globeTest)return;
			globeModule.init();
		});
		
		
		//选择多个
		$('.select-multi',$toolbar).off('click').on('click', function(){
			$(this).toggleClass('active');
			graph.boxSelectionEnabled($(this).hasClass('active'));
			graph.userPanningEnabled(!graph.boxSelectionEnabled());
			mining.utils.serverLog(21);//用户行为记录
		});
		
		//保存快照
		$('.save-snapshot',$toolbar).off('click').on('click', function(){
			snapshotModule.save({
				graph: graph
			});
			mining.utils.serverLog(22);//用户行为记录
		});
		
		//导出数据
		$('.add-data',$toolbar).off('click').on('click', function(){
			var graphData = {v:[], e:[]},
				graphPng = graph.png({
					full: true
				});
			
			$.each(graph.nodes('.entity'), function(i,n){
				graphData.v.push(n.data().data);
			});
			if(graphData.v.length < 1){
				$dialog.alert('没有数据，无法下载！', 'warning');
				return;
			}
			mining.utils.fileDownload(requestUrl.transferExcel,{
				graphData: JSON.stringify(graphData),
				thumbnail: graphPng
			});
			mining.utils.serverLog(23);//用户行为记录
		});
		
		//清空图析
		$('.clearall',$toolbar).off('click').on('click', function(){
			graphModule.delelements('all');
			eventModule.delelements('all');
			mining.utils.localStorage(mining.localname.snapshotProject, null);
			mining.utils.serverLog(24);//用户行为记录
		});
		
		/* 键盘操作 */
		$(document).off('keydown.toolbar').on('keydown.toolbar', function(e){
			if(e.keyCode == mining.keyCode.SHIFT && $('.page-graph .breadnav-graph').hasClass('active')){
				$('.select-multi',$toolbar).addClass('active');
				//graph.boxSelectionEnabled(true);
				mining.utils.serverLog(25);//用户行为记录
			}
		});
		$(document).off('keyup.toolbar').on('keyup.toolbar', function(e){
			if(e.keyCode == mining.keyCode.SHIFT && $('.page-graph .breadnav-graph').hasClass('active')){
				$('.select-multi',$toolbar).removeClass('active');
				//graph.boxSelectionEnabled(false);
			}else if(e.keyCode == mining.keyCode.DEL){
				mining.utils.serverLog(26);//用户行为记录
			}
		});
		$(document).off('click.serverlog', '.ui-cytoscape-panzoom-minus .ui-cytoscape-panzoom-plus').on('click.serverlog', '.ui-cytoscape-panzoom-minus .ui-cytoscape-panzoom-plus', function(){
			mining.utils.serverLog(27);//用户行为记录
		});
		$(document).off('mousedown.serverlog', '.cytoscape-navigator').on('mousedown.serverlog', '.cytoscape-navigator', function(){
			mining.utils.serverLog(28);//用户行为记录
		});
	}
	
	return {
		init: initToolbar
	}
	
});
