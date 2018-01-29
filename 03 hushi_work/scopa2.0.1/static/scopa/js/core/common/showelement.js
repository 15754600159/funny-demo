define(function(require, exports, module){
	
	/**
     * @name ActionGraph
     * @class 添加到图析。
     */
    
    var showElements = function(data, hash, event){
    	if(mining.utils.isEmpty(data) || mining.utils.isEmpty(hash))return;
		if(data.v || data.e || event == '2'){//event=2为群体档案
			switch(hash){
				case 'graph': 
					var elements = getGraphElements(data);
					if($('.page-graph').hasClass('active') && event){
						var pan = dragon.pan();
						$.each(elements.nodes, function(i,n){
							n.position.x = event.pageX - pan.x;
							n.position.y = event.pageY - 50 + ( i * 150) - pan.y;
						});
					}
					mining.utils.localStorage(mining.localname.graphSnapshot, {
						graph: {elements: elements},
						action: 'import'
					});
					break;
				case 'map':
					var snapshotData = mining.utils.localStorage(mining.localname.mapSnapshot) || [];
					if(!snapshotData.filelist) snapshotData.filelist = [];
					$.each(getMapFileElements(data), function(i,n){
						snapshotData.pushOnly(n);
					});
					mining.utils.localStorage(mining.localname.mapSnapshot, snapshotData);
					break;
				case 'file':
					var transformData = [], dataArr = [], tabType = 1;
					if(event == '2'){
						dataArr = data;
						tabType = event;
					}else{
						transformData = getMapFileElements(data);
						$.each(transformData, function(i,n){
							if(!n.etype)n.etype = mining.mappingutils.getType(n);
							if(typeof n.locked != 'undefined')delete n.locked;
							if(n.label == 'doc' || (n.label == 'media' && n.type == 'doc')){
								tabType = 3;
							}
							dataArr.push(n);
						});
					}
					mining.utils.updateFileData('add', {dataArr:dataArr, tabType:tabType});
				
					/*var emptyData = {current:'', navtabs:[], filelist:[], filedata:[]};
					var transformData = getMapFileElements(data),
						snapshotData = mining.utils.localStorage(mining.localname.fileSnapshot) || emptyData;
					// if(!snapshotData.filelist) snapshotData.filelist = [];
					snapshotData.filelist = [];
					if(!snapshotData.navtabs) snapshotData.navtabs = [];
					if(!snapshotData.filedata) snapshotData.filedata = [];
					if(snapshotData.filedata.length > 0){
						var filedataArr = [].concat(snapshotData.filedata);
						$.each(filedataArr,function(k,v){
							if($.inArray(v.gid, snapshotData.navtabs) < 0){
								snapshotData.filedata.remove(v);
							}
						});
					}
					$.each(transformData, function(i,n){
						if(!n.etype)n.etype = mining.mappingutils.getType(n);
						if(typeof n.locked != 'undefined')delete n.locked;
						if(n.label == 'doc' || (n.label == 'media' && n.type == 'doc')){
							snapshotData.navtabs.pushOnly(n.gid);
						}else{
							snapshotData.filelist.pushOnly(n.gid);
						}
						snapshotData.filedata.pushOnly(n);
					});

					var relationArr = [];
					$.each(transformData, function(i,n){
						if(n.etype == 'relation')relationArr.push(n);
					});
					if(relationArr.length == 1){
						snapshotData.current = relationArr[0].gid;
					}else{
						snapshotData.current = transformData[0].gid;
					}
					mining.utils.localStorage(mining.localname.fileSnapshot, snapshotData);*/
					break;
			}
			var _hash = $.hash();
			if(mining.utils.isEmpty(_hash) && window.top){
				window.top.mining.utils.hashChange(hash);
				return;
			}
			if($.hash().indexOf(hash) == -1){
				mining.utils.hashChange(hash);
			}else{
				$('.subpage.active').data('module').snapshot();
			}
		}
    }
    
    /**/
    var getElements = function(data, type){
    	type = type || 'graph';
    	switch(type){
    		case 'graph':getGraphElements();break;
    		case 'map':getMapElements();break;
    		case 'file':getFileElements();break;
    		default:getGraphElements();break;
    	}
    }
    
    var getGraphElements = function(data){
   		var elements = {nodes:[], edges:[]};
    	
    	if(mining.utils.isEmpty(data))return elements;
		if(data.v){
			$.each(data.v, function(i,n){
				n.etype = n.etype ? n.etype : 'entity';
				elements.nodes.push({
					data: {
						id: String(n.gid), 
						name: getName(n), 
						showbigger: getName(n, 'show_bigger'), 
						data: n, 
						etype: n.etype,
						image: mining.mappingutils.getGraphIcon(n)
					}, 
					position:{
						x: 100, 
						y: 100 + (i * 100)
					}, 
					classes: getClasses(n),
					selected: true
				});
			});
		}
		if(data.e){
			$.each(data.e, function(i,n){
				n.etype = n.etype ? n.etype : 'relation';
				elements.edges.push({
					data: {
						id: String(n.gid), 
						source: String(n.from), 
						target: String(n.to), 
						data: n, 
						etype: n.etype,
						event: (mining.utils.isEmpty(n.showlabel) ? getName(n) : n.showlabel)
					}, 
					classes: getClasses(n),
					selected: true
				});
			});
		}
		
		return elements;
    }
    
    var getMapFileElements = function(data){
    	var entityData = {},
    		transferDataArr = [];
    	
    	if(mining.utils.isEmpty(data))return transferDataArr;
    	
		if(data.v){
			$.each(data.v, function(i,n){
				n.etype = n.etype ? n.etype : 'entity';
				transferDataArr.push(n);
				entityData[n.gid] = n;
				
			});
		}
		if(data.e){
			$.each(data.e, function(i,n){
				n.etype = n.etype ? n.etype : 'relation';
				transferDataArr.push($.extend(n, {source: entityData[n.from], target: entityData[n.to]}));
			});
		}
		
		return transferDataArr;
    }
    
    
    
    var getClasses = function(data){
    	var classArr = [];
			
		classArr.push(data.etype, data.label, mining.mappingutils.getName(data));
		if(data.class)classArr.push(data.class);
		if(data.label == 'person' && data.PERSON_xb == '女')classArr.push('women');
		if(data.specficType == 'custom')classArr.push('new')

		return classArr.join(' ');
		//return data.etype + ' ' + data.label + ' ' + mining.mappingutils.getName(data) + ' ' + (data.class ? data.class : '') + (data.label == 'person' && data.PERSON_xb == '女' ? ' women':'');
	}
    
	var getName = function(data, key){
		var labelArr = mining.mappingutils.getShowlabel(data, key),
			labels = [];
			
		$.each(labelArr, function(i,n){
			labels.push(n.value);
		});
		
		return labels.join('\n');
	}
    
	return{
		show: showElements,
		get: getElements
	}
});