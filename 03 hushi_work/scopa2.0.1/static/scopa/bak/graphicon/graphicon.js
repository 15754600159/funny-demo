define(function(require){
    $(function(){
    	var iconCount = {
    		entity: 45,
    		relation: 34,
    		event: 31
    	}
    	/*---------- 图析图标展示 ----------*/
    	$ajax.ajax({
    		url: staticUrl + '/scopa/bak/graphicon/graphicon/demo.html',
    		async: false,
    		success: function(data){
    			$('body').append(data.substring(data.indexOf('<body>') + 6,data.lastIndexOf('<script')));
    			$('.bgc1.clearfix,.mhl.clearfix.mbl,fieldset').hide();
    			$('.mls').css({
    				'font-size':'16px',
    				'vertical-align': 'middle'
    			});
    			$('.glyph').css({
    				'width': '10em',
    				'margin': '0'
    			});
    			$('.graphnode-entity,.graphnode-relation,.graphnode-event,.graphnode-relation-line').on('click', function(){
    				$(this).toggleClass('active');
    			});
    			$('.clearfix.mhl.ptl:first .glyph').attr('element_type', 'entity');
    			$('.clearfix.mhl.ptl:last .glyph').each(function(i,n){
    				var etype = 'event';
    				if(i < iconCount.relation)etype = 'relation';
    				$(this).attr('element_type', etype);
    			});
    			$('.icolab h1').append('<span class="font12">（共有图标 ' + (iconCount.entity + iconCount.relation + iconCount.event) + ' 个：实体 ' + iconCount.entity +' 个、关系 ' + iconCount.relation +' 个、事件 ' + iconCount.event +' 个。）</span>');
    		},
    		error: function(data){
    			seajs.log(data);
    		}
    	});
    	
    	/*---------- 图析图标生成 ----------*/
    	var graphIcon = [
    			{name: 'entity', content: '', element_type: 'entity'},
    			{name: 'relation', content: '', element_type: 'relation'},
    			{name: 'event', content: '', element_type: 'event'}
    		], iconameArr = [];
    	$('.glyph').each(function(){
    		var $this = $(this), etype = $this.attr('element_type');
    		graphIcon.push({
    			name: etype + '-' + $('span[class^=graphicon-]',$this).attr('class'),
    			content: $('input.unitRight',$this).val(),
    			element_type: etype
    		});
    	});
    	$.each(graphIcon, function(i,n){
    		iconameArr.push('"' + n.name + '"');
    	});
    	seajs.log('ICON名称------------------------------------------')
    	seajs.log(iconameArr.join(','));
    	seajs.log('--------------------------------------------------')
    	//window.graphIcon = graphIcon;
		$('.getmapping').on('click', function(){
			mining.utils.gotoUrl(mining.baseurl.console + '/elementparameter/getMapping', '_blank');
		});
		
		var nodepositioin = {x: 37.7, y: 37.8};
		var lockNode = {"data":{"id":"123214124"},"position":{x: 0, y: 0},"group":"nodes","classes":"locked"}
		var noteNode = {"data":{"id":"123214125"},"position":{x: 0, y: 0},"group":"nodes","classes":"noted"}
		var initGraph = function(callback){
			$('#makeIcon').width(362).height(362);
	    	var cytoscape = require('cytoscape');
	    	var $container = $('#makeIcon'),
	    		icongraph = cytoscape({
					container: $container[0],
					elements: {
						nodes: [
							{"data":{"id":"123213123", content:'\ue900'},"position":{"x":0,"y":0},"group":"nodes","classes":"iconnode entity"},
							lockNode,
							noteNode
						]
					},
					style: [
						{
							selector: 'core',
							css: {
								'selection-box-color': 'rgba(72, 133, 184, 0.2)'
							}
						},
						{
							selector: 'node.iconnode',
							css: {
								'width': '60px',
								'height': '60px',
								'shape': 'ellipse',
								'background-fit': 'contain',
								'background-color': '#4887bd',
								'background-opacity': '1',
								'background-width': '60px',
								'background-height': '60px',
								'background-repeat': 'no-repeat',
								'background-clip': 'node',
								'color': '#fff',
								'font-family': 'graphicon',
								'font-size': '40px',
								'content': 'data(content)',
								'text-halign': 'center',
								'text-valign': 'center'
							}
						},
						{
							selector: 'node.entity',
							css: {
								'background-color': '#4887bd'
							}
						},
						{
							selector: 'node.person',
							css: {
								'background-color': '#5ca2af'
							}
						},
						{
							selector: 'node.women',
							css: {
								'background-color': '#d47fa9'
							}
						},
						{
							selector: 'node.vehicle',
							css: {
								'background-color': '#9f88c8'
							}
						},
						{
							selector: 'node.event',
							css: {
								'width': '45px',
								'height': '45px',
								'font-size': '30px',
								'shape': 'rectangle',
								'background-color': '#5b759d'
							}
						},
						{
							selector: 'node.relation',
							css: {
								'width': '45px',
								'height': '45px',
								'font-size': '30px',
								'shape': 'rectangle',
								'background-color': '#5b759d'
							}
						},
						{
							selector: 'node.noted',
							css: {
								'width': '60px',
								'height': '60px',
								'background-fit': 'none',
								'background-image': staticUrl + '/scopa/bak/graphicon/images/noted.png',
								'background-opacity': '0',
								'background-width': '18px',
								'background-height': '18px',
								'background-position-x': '41.5px',
								'background-position-y': '0px',
								'background-repeat': 'no-repeat',
								'background-clip': 'none'
							}
						},
						{
							selector: 'node.locked',
							css: {
								'width': '60px',
								'height': '60px',
								'background-fit': 'none',
								'background-image': staticUrl + '/scopa/bak/graphicon/images/locked.png',
								'background-opacity': '0',
								'background-width': '18px',
								'background-height': '22px',
								'background-position-x': '42px',
								'background-position-y': '38px',
								'background-repeat': 'no-repeat',
								'background-clip': 'none'
							}
						}
						
					],
					ready: function(evt){
						window.icongraph = this;
						icongraph = this;
						icongraph.zoom(6);
						setTimeout(function(){
							icongraph.$('node').position({x: 37.75, y: 37.75});
							callback.call();
						},100)
					},
					
					// initial viewport state:
					zoom: 1,
					pan: {x:0, y:0},
					
					// interaction options:
					  minZoom: 1e-50,
					  maxZoom: 1e50,
					  zoomingEnabled: true,
					  userZoomingEnabled: true,
					  panningEnabled: true,
					  userPanningEnabled: true,
					  boxSelectionEnabled: false,
					  selectionType: 'single',
					  touchTapThreshold: 8,
					  desktopTapThreshold: 4,
					  autolock: false,
					  autoungrabify: false,
					  autounselectify: false,
					
					  // rendering options:
					  headless: false,
					  styleEnabled: true,
					  hideEdgesOnViewport: false,
					  hideLabelsOnViewport: false,
					  textureOnViewport: false,
					  motionBlur: false,
					  motionBlurOpacity: 0.2,
					  wheelSensitivity: 1,
					  pixelRatio: 'auto',
					  initrender: function(evt){ /* ... */ },
					  renderer: { /* ... */ }
				});
		}
		var interval;
		var getIconData = function(){
			var iconNodeArr = [], 
				iconDataArr = [];
			
	    	$.each(graphIcon, function(i,n){
				iconNodeArr.push({
					group: 'nodes', 
					data: {
						id: n.name + 'node' + mining.utils.randomInt(999,999999),
						name: n.name,
						content: n.content
					}, 
					position: nodepositioin,
					classes: 'iconnode ' + n.element_type + (n.content.indexOf('women') != -1 ? ' women' : '')
				});
	    	});
	    	
	    	var index = 0, nameArr = [];
	    	interval = setInterval(function(){
	    		if(index > iconNodeArr.length - 1){
	    			clearInterval(interval);
	    			index = 0;
			    	interval = setInterval(function(){
			    		if(index > iconCount.entity){
			    			clearInterval(interval);
			    			index = 0;
					    	interval = setInterval(function(){
					    		if(index > iconCount.entity){
					    			clearInterval(interval);
					    			index = 0;
							    	interval = setInterval(function(){
							    		if(index > iconCount.entity){
							    			clearInterval(interval);
							    			window.iconBase64 = iconDataArr;
							    			
							    			/* 生成png处理为xml格式 */
							    			$.each(iconBase64, function(i,n){
							    				iconBase64[i] = '<icon><![CDATA[' + n.replace('data:image/png;base64,','') + ']]></icon>';
							    			});
							    			seajs.log(nameArr.join(','));
							    			seajs.log(iconBase64.join(''));
							    			$('#makeIcon').after('<b style="margin:20px 0 0;display:inline-block">png 图标 base64 xml 代码</b><br><textarea style="width:100%;height:55px;">' + iconBase64.join('') + '</textarea>');
							    			$('#makeIcon').after('<b style="margin:400px 0 0;display:inline-block">png 图标名称</b><br><textarea style="width:100%;height:55px;">' + nameArr.join(',') + '</textarea>');
									    	return;
							    		}
							    		icongraph.elements().remove();
						    			icongraph.add([iconNodeArr[index], lockNode, noteNode]);
						    			nameArr.push('"' + iconNodeArr[index].data.name + '_noted_locked"');
							    		setTimeout(function(){
							    			iconDataArr.push(icongraph.png());
							    			index++;
							    		}, 100);
							    	},300);
							    	return;
					    		}
					    		icongraph.elements().remove();
				    			icongraph.add([iconNodeArr[index], noteNode]);
				    			nameArr.push('"' + iconNodeArr[index].data.name + '_noted"');
					    		setTimeout(function(){
					    			iconDataArr.push(icongraph.png());
					    			index++;
					    		}, 100);
					    	},300);
					    	return;
			    		}
			    		icongraph.elements().remove();
		    			icongraph.add([iconNodeArr[index], lockNode]);
		    			nameArr.push('"' + iconNodeArr[index].data.name + '_locked"');
			    		setTimeout(function(){
			    			iconDataArr.push(icongraph.png());
			    			index++;
			    		}, 100);
			    	},300);
			    	return;
	    		}
	    		icongraph.elements().remove();
    			icongraph.add([iconNodeArr[index]]);
    			nameArr.push('"' + iconNodeArr[index].data.name + '"');
    			iconDataArr.push(icongraph.png());
	    		index++;
	    	},100);
		}
		$('.makeicon').on('click', function(){
			$dialog({
				title: '生成 png 图标名称和 base64 xml 代码',
				content: $('#makeIcon').css('visibility','visible')[0],
				width: 500,
				height: 600,
				fixed: true,
				onshow: function(){
					initGraph(getIconData);
					$('.main').addClass('blur');//添加背景模糊效果
				},
	    		onclose: function(){
	    			clearInterval(interval);
	    			$('.main').removeClass('blur');//去除背景模糊效果
	    		}
			}).showModal();
			$(this).hide();
		});
    });
});