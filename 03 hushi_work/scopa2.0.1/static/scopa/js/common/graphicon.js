define(function(require){
    $(function(){
    	/*---------- 图析图标展示 ----------*/
    	var graphIcon = {
    		entity: [{
    			label: '人',
    			name: 'person',
    			children: [{
	    			label: '普通人',
	    			name: 'person_common',
	    			content: '\ue961',
	    			content0: '\ue960'
	    		}, {
	    			label: '重点人员',
	    			name: 'person_eventful',
	    			content: '\ue963',
	    			content0: '\ue962'
	    		}]
    		}, {
    			label: '车',
    			name: 'vehicle',
    			children: [{
	    			label: '大型车',
	    			name: 'vehicle_big',
	    			content: '\ue96b'
	    		}, {
	    			label: '小型车',
	    			name: 'vehicle_small',
	    			content: '\ue96c'
	    		}]
    		}, {
    			label: '户口',
    			name: 'household',
    			children: [{
	    			label: '家庭户',
	    			name: 'household_family',
	    			content: '\ue95b'
	    		}, {
	    			label: '集体户',
	    			name: 'household_community',
    				content: '\ue95a'
	    		}]
    		}, {
    			label: '电话',
    			name: 'telephone',
    			children: [{
	    			label: '座机',
	    			name: 'telephone_landline',
	    			content: '\ue966'
	    		}, {
	    			label: '手机',
	    			name: 'telephone_mobile',
	    			content: '\ue967'
	    		}]
    		}, {
    			label: '虚拟身份',
    			name: 'virtualid',
    			children: [{
	    			label: 'QQ号',
	    			name: 'virtualid_qq',
	    			content: '\ue96e'
	    		}, {
	    			label: '微信号',
	    			name: 'virtualid_wechat',
	    			content: '\ue96f'
	    		}]
    		}, {
    			label: '档案文件',
    			name: 'archive',
    			children: [{
	    			label: '文件',
	    			name: 'archive_file',
	    			content: '\ue951'
	    		}, {
	    			label: '图片',
	    			name: 'archive_picture',
	    			content: '\ue952'
	    		}, {
	    			label: '音频',
	    			name: 'archive_audio',
	    			content: '\ue950'
	    		}, {
	    			label: '视频',
	    			name: 'archive_video',
	    			content: '\ue953'
	    		}]
    		}, {
    			label: '案件',
    			name: 'case',
    			content: '\ue956'
    		}, {
    			label: '酒店',
    			name: 'hotel',
    			content: '\ue958'
    		}, {
    			label: '航班',
    			name: 'flight',
    			content: '\ue957'
    		}, {
    			label: '火车',
    			name: 'train',
    			content: '\ue969'
    		}, {
    			label: 'MIC地址',
    			name: 'micaddress',
    			content: '\ue95d'
    		}, {
    			label: '银行卡',
    			name: 'bankcard',
    			content: '\ue954'
    		}, {
    			label: 'IP地址',
    			name: 'ipaddress',
    			content: '\ue95c'
    		}, {
    			label: 'WIFI',
    			name: 'wifi',
    			content: '\ue970'
    		}, {
    			label: '交通卡口',
    			name: 'trafficmonitor',
    			content: '\ue968'
    		}, {
    			label: '组织',
    			name: 'organization',
    			content: '\ue95e'
    		}, {
    			label: '建筑',
    			name: 'building',
    			content: '\ue955'
    		}, {
    			label: '账户',
    			name: 'account',
    			content: '\ue94e'
    		}, {
    			label: '物品',
    			name: 'product',
    			content: '\ue964'
    		}],
    		relation: [{
    			label: '同行类',
    			name: 'travel_relation',
    			content: '\ue9b4'
    		}, {
    			label: '同住类',
    			name: 'live_relation',
    			content: '\ue97a'
    		}, {
    			label: '亲缘类',
    			name: 'relatives_relation',
    			content: '\ue96e'
    		}, {
    			label: '通讯类',
    			name: 'communicate_relation',
    			content: '\ue979'
    		}, {
    			label: '违章类',
    			name: 'peccancy_relation',
    			content: '\ue97d'
    		}, {
    			label: '所属类',
    			name: 'partof_relation',
    			content: '\ue97c'
    		}, {
    			label: '嫌疑类',
    			name: 'suspect_relation',
    			content: '\ue97f'
    		}, {
    			label: '混合类',
    			name: 'mixing_relation',
    			content: '\ue97b'
    		}],
    		event: [{
    			label: '住宿',
    			name: 'hotel_event',
    			content: '\ue973'
    		}, {
    			label: '火车',
    			name: 'train_event',
    			content: '\ue978'
    		}, {
    			label: '飞机',
    			name: 'flight_event',
    			content: '\ue972'
    		}, {
    			label: '网吧',
    			name: 'internetcafe_event',
    			content: '\ue975'
    		}, {
    			label: '户籍',
    			name: 'household_event',
    			content: '\ue974'
    		}, {
    			label: 'WIFI围栏',
    			name: 'nowifi_event',
    			content: '\ue976'
    		}, {
    			label: '案件',
    			name: 'case_event',
    			content: '\ue971'
    		}, {
    			label: '卡口',
    			name: 'trafficmonitor_event',
    			content: '\ue977'
    		}]
    	}
    	
    	var iconImg = function(name, type){
    		type = type || 'entity';
    		var subtype = '';
    		if(name.indexOf('person') != -1)subtype = 'person ' + name;
    		if(name.indexOf('vehicle') != -1)subtype = 'vehicle';
    		return '<div class="graphicon type-' + type + ' ' + subtype + '"><span class="icon-' + name + '" title="' + name + '"></span></div>';
    	}
    	//实体
    	var entitylen = 0
    	$.each(graphIcon.entity, function(i,n){
    		entitylen += (n.children ? n.children.length : 1)
		});
    	$.each(graphIcon.entity, function(i,n){
    		if(!n.children){
    			$('table tbody').append(['<tr>',
					'<td>' + n.label + ' - ' + n.name + '</td>',
					'<td></td>',
					'<td>' + n.name + '</td>',
					'<td>' + iconImg(n.name) + '</td>',
				'</tr>'].join(''));
    			return;
    		}
    		$.each(n.children, function(j,k){
	    		$('table tbody').append(['<tr>',
					((i == 0 && j == 0) ? '<td class="txtc" rowspan="' + entitylen + '"><b>实体</b></td>' : ''),
					(j == 0 ? '<td class="" rowspan="' + n.children.length + '">' + n.label + ' - ' + n.name + '</td>' : ''),
					'<td>' + k.label + '</td>',
					'<td>' + k.name + '</td>',
					//'<td>' + (n.name == 'person' && k.name != 'person_common'? iconImg(k.name+'_1_1')+iconImg(k.name+'_1_0')+iconImg(k.name+'_0_1')+iconImg(k.name+'_0_0') : (k.name == 'person_common' ? iconImg(k.name+'_1')+iconImg(k.name+'_0') : iconImg(k.name))) + '</td>',
					'<td>' + (n.name == 'person' ? iconImg(k.name+'_1') + iconImg(k.name+'_0') : iconImg(k.name)) + '</td>',
				'</tr>'].join(''));
    		});
    	});
    	//关系
    	$.each(graphIcon.relation, function(i,n){
    		$('table tbody').append(['<tr>',
				(i == 0 ? '<td class="txtc" rowspan="' + graphIcon.relation.length + '"><b>关系</b></td>' : ''),
				'<td>' + n.label + '</td>',
				(i == 0 ? '<td rowspan="' + graphIcon.relation.length + '"></td>' : ''),
				'<td>' + n.name + '</td>',
				'<td>' + iconImg(n.name, 'relation') + '</td>',
			'</tr>'].join(''));
    	});
    	//事件
    	$.each(graphIcon.event, function(i,n){
    		$('table tbody').append(['<tr>',
				(i == 0 ? '<td class="txtc" rowspan="' + graphIcon.event.length + '"><b>事件</b></td>' : ''),
				'<td>' + n.label + '</td>',
				(i == 0 ? '<td rowspan="' + graphIcon.event.length + '"></td>' : ''),
				'<td>' + n.name + '</td>',
				'<td>' + iconImg(n.name, 'event') + '</td>',
			'</tr>'].join(''));
    	});
    	
    	$(document).on('click', '.graphicon', function(){
			$(this).toggleClass('active');
    	});
    	
    	return;
    	/*---------- 图析图标生成 ----------*/
    	$('#makeIcon').show();
    	require('cytoscape');
		var lockNode = {"data":{"id":"123214124"},"position":{x: 0, y: 0},"group":"nodes","classes":"locked"}
    	var $container = $('#makeIcon'),
    		icongraph = cytoscape({
				container: $container[0],
				elements: {
					nodes: [
						{"data":{"id":"123213123", content:'\ue961'},"position":{"x":0,"y":0},"group":"nodes","classes":"entity"},
						lockNode
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
							'font-family': 'ICON-SCOPA',
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
						selector: 'node.locked',
						css: {
							'width': '60px',
							'height': '60px',
							'background-fit': 'none',
							'background-image': staticUrl + '/scopa/theme/default/images/common/locked.png',
							'background-opacity': '0',
							'background-width': '18px',
							'background-height': '22px',
							'background-position-x': '44px',
							'background-position-y': '42px',
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
						getIconData();
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
			
	
		var getIconData = function(){
			//实体
			var iconNodeArr = [], 
				iconDataArr = [],
				nodepositioin = {x: 40.2, y: 42};
			
	    	$.each(graphIcon.entity, function(i,n){
	    		if(!n.children){
	    			iconNodeArr.push({
						group: 'nodes', 
						data: {
							id: n.name + 'node' + mining.utils.randomInt(999,999999),
							name: n.name,
							content: n.content
						}, 
						position: nodepositioin,
						classes: 'iconnode entity ' + n.name
					});
	    			return;
	    		}
	    		$.each(n.children, function(j,k){
					iconNodeArr.push({
						group: 'nodes', 
						data: {
							id: n.name + 'node' + mining.utils.randomInt(999,999999),
							name: k.name,
							content: k.content
						}, 
						position: nodepositioin,
						classes: 'iconnode entity ' + n.name
					});
	    		});
	    		if(n.name == 'person'){
	    			$.each(n.children, function(j,k){
						iconNodeArr.push({
							group: 'nodes', 
							data: {
								id: n.name + 'node' + mining.utils.randomInt(999,999999),
								name: k.name,
								content: k.content0
							}, 
							position: nodepositioin,
							classes: 'iconnode entity ' + n.name + ' women'
						});
		    		});
	    		}
	    	});
	    	//关系
	    	$.each(graphIcon.relation, function(i,n){
				iconNodeArr.push({
					group: 'nodes', 
					data: {
						id: n.name + 'node' + mining.utils.randomInt(999,999999),
						name: n.name,
						content: n.content
					}, 
					position: nodepositioin,
					classes: 'iconnode relation'
				});
	    	});
	    	//事件
	    	$.each(graphIcon.event, function(i,n){
	    		iconNodeArr.push({
					group: 'nodes', 
					data: {
						id: n.name + 'node' + mining.utils.randomInt(999,999999),
						name: n.name,
						content: n.content
					}, 
					position: nodepositioin,
					classes: 'iconnode event'
				});
	    	});
	    	
	    	var index = 0, nameArr = [];
	    	var interval = setInterval(function(){
	    		if(index > iconNodeArr.length - 1){
	    			clearInterval(interval);
	    			index = 0;
			    	interval = setInterval(function(){
			    		if(index > iconNodeArr.length - 1){
			    			clearInterval(interval);
			    			window.iconBase64 = iconDataArr;
			    			/* 生成png处理为xml格式 */
			    			
			    			$.each(iconBase64, function(i,n){
			    				iconBase64[i] = '<icon><![CDATA[' + n.replace('data:image/png;base64,','') + ']]></icon>';
			    			});
			    			seajs.log(nameArr.join(','));
			    			/* */
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
    });
});