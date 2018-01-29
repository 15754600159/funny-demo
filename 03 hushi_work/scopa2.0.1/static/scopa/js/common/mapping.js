define(function(require, exports, module){
	/**
	 * @name MappingUtils
     * @function   
     * @desc 前后端 Mapping 表的获取和解析相关方法集。（本体：实体/关系/事件）
     * 一些约定：
     * 		1.SCOPA里的本体（实体/关系/事件）由 label（大类）+ type（细类）的组合唯一确定出来；
     * 		2.label属性不能为空，type属性可以为空；
     * 		3.tuning返回数据里索引数据均由key表示；
     */
	    
	mining.mappingutils =  {
		/**
		 * @name Utils#get
	     * @function   
	     * @desc 获取Mapping表（force为true则强制刷新Mapping）。
	     * @param {String} baseurl
	     */
       	get: function(baseurl, force){
       		if(!mining.utils.isEmpty(mining.mapping) && !force) return;
       		var _baseurl = baseurl || mining.baseurl.console;
       		
			$ajax.ajax({
				url: _baseurl + '/elementparameter/getMapping',
				success: function(m){
					//m = require('./schema');
					m.obj.objList['harts'] = {
						label_name: "隐性关系",
						type_name: "隐性关系",
						label: "harts",
						element_type: "relation",
						timeline: 'time_list',
						type: "",
						fields: "type"
					}
					
					$.each(m.obj.objList, function(i,n){
						var defaultProp = {
								common: ['primary_prop','minor_prop','fields','icon_prop','title','show','show_bigger','groupby','timeline'],
								entity: ['key_prop','key_mapping','menu'],
								relation: ['subject_label','object_label'],
								event: []
							};
						
						$.each(defaultProp.common, function(j,o){
							if(!n[o])n[o] = '';
						});
						$.each(defaultProp[n.element_type], function(j,o){
							if(!n[o])n[o] = '';
						});
						var minorArr = [];
						if(mining.utils.isEmpty(n.minor_prop)){
							$.each(n.fields.split(','), function(j,o){
								if(n.primary_prop.indexOf(o) == -1)minorArr.push(o);
							});
						}else{
							$.each(n.minor_prop.split(','), function(j,o){
								if(n.primary_prop.indexOf(o) == -1)minorArr.push(o);
							});
						}
						n.minor_prop = minorArr.join(',');
					});
					//添加 hartsMapping
					var harts = require('./harts');
					if(mining.baseurl.hartsmapping){
						$ajax.ajax({
							url: mining.baseurl.hartsmapping,
							async: false,
							success: function(result){
								harts.harts = result.rule;
							},
							error: function(){
								seajs.log('呼叫园长：获取HartsMapping失败啦！')
							}
						});
					}
					if(harts.harts){
						var hartsMapping = {},
							hartsEventMapping = {};
						
						$.each(harts.harts, function(i,n){
							hartsMapping['harts_' + n.id] = n;
						});
						$.each(harts.eventmapping, function(i,n){
							hartsEventMapping[i] = n;
						});
						$.extend(m.obj, {
							hartsMapping: hartsMapping,
							hartsEventMapping: hartsEventMapping
						});
					}
					//处理时间格式化
					$.each(m.obj.propertyMapping, function(i,n){
						if(n.time_format != '')n.time_format = n.time_format.replace('yyyy', 'YYYY').replace('dd', 'DD');
					});
					
					mining.utils.localStorage(mining.localname.mapping, m.obj);
					mining.mapping = m.obj;
				},
				error: function(data){
					$dialog.alert('获取数据schema失败，请稍后重试！','error');
					seajs.log(data);
				}
			});
        },
		/**
		 * @name Utils#getName
	     * @function   
	     * @desc 获取本体名称 （前后端约定本体名称由 label(大类) + type(细类) 组成，type 可以为空）。
	     * @param {Object} data
	     * @return {String} name
	     */
       	getName: function(data){
       		var name = '';
       		
       		if(!mining.utils.isEmpty(data) && typeof data == 'object' && !mining.utils.isEmpty(data.label)){
       			name = data.label + (!mining.utils.isEmpty(data.type) ? '_' + data.type : '');
       		}
       		
       		return name;
        },
		/**
		 * @name Utils#getMapping
	     * @function   
	     * @desc 获取本体mapping数据。
	     * @param {Object || String} param
	     * @return {Object} mapping
	     */
       	getMapping: function(param){
       		var objmapping = undefined;
       		
       		/*零时处理错误的type：
       			事件-卡口(trafficmonitor_event)，
       			事件-违章车辆(vehicle_event)，
       			关系-人车所有_V1.1(vehicle_relation)，
       			关系-人车违章(cirminalVehicle_relation)*/
       		var _changeType = function(label, type){
       			if(label.indexOf('trafficmonitor_event') != -1 || label.indexOf('vehicle_event') != -1 || label.indexOf('vehicle_relation') != -1 || label.indexOf('criminalVehicle_relation') != -1){
       				type = type.replace('big_vehicle', 'other').replace('small_vehicle', 'other');
       			}
       			
       			return type;
       		}
       		if(typeof param == 'string'){
       			param = _changeType(param, param);
       		}else if(typeof param == 'object' && param.label && param.type && typeof param.label == 'string'){
       			param.type = _changeType(param.label, param.type);
       		}
       		
       		try{
       			var name = typeof param == 'string' ?  param : mining.mappingutils.getName(param);
       			objmapping = mining.mapping.objList[name];
       		}catch(e){}
       		
       		return objmapping;
        },
		/**
		 * @name Utils#getType
	     * @function   
	     * @desc 获取本体类型。
	     * @param {Object | String} param
	     * @return {String} type (entity | relation | event)
	     */
       	getType: function(param){
       		var element_type = '',
       			obj = mining.mappingutils.getMapping(param);
       		
       		if(!param) return '';
       		if(typeof param == 'string' && !mining.utils.isEmpty(obj)){
       			element_type = obj['element_type'];
       		}else{
       			if(!mining.utils.isEmpty(param['element_type'])){
	       			element_type = param['element_type'];
       			}else{
	       			element_type = obj ? obj['element_type'] : '';
       			}
       		}
       		if(mining.utils.isEmpty(element_type) && typeof param == 'string' ){
       			var classList = mining.mappingutils.getClassList();
       			if(classList.relation[param]){
       				
       			}
       			$.each(classList, function(i,n){
       				if(!mining.utils.isEmpty(n[param])){
       					element_type = i;
       					return false;
       				}
       			});
       		}
       		return element_type;
        },
		/**
		 * @name Utils#getLabelName
	     * @function   
	     * @desc 获取本体大类中文名称。
	     * @param {Object | String} param
	     * @return {String} label_name
	     */
       	getLabelName: function(param){
       		var labelname = '';
			try{
				labelname = mining.mappingutils.getMapping(param)['label_name'];
			}catch(e){}
			if(mining.utils.isEmpty(labelname) && typeof param == 'string'){
				var classList = mining.mappingutils.getClassList();
				$.each(classList, function(i,n){
					if(!mining.utils.isEmpty(n[param])){
						labelname = n[param].label_name;
						return false;
					}
				});
			}
			
			return labelname;
        },
		/**
		 * @name Utils#getLabel
	     * @function   
	     * @desc 获取本体大类中文名称。
	     * @param {Object | String} param
	     * @return {Object} {label,name}
	     */
       	getLabel: function(param){
       		var label = '', labelname = '';
			try{
				var _obj = mining.mappingutils.getMapping(param);
				label = _obj.label;
				labelname = _obj.label_name;
			}catch(e){
				if(typeof param == 'string'){
					var classList = mining.mappingutils.getClassList();
					$.each(classList, function(i,n){
						if(!mining.utils.isEmpty(n[param])){
							label = n[param].label;
							labelname = n[param].label_name;
							return false;
						}
					});
				}
			}
			
			return {
				name: label,
				value: labelname
			}
        },
		/**
		 * @name Utils#getTypeName
	     * @function   
	     * @desc 获取本体细类中文名称 。
	     * @param {Object | String} param
	     * @return {String} type_name
	     */
       	getTypeName: function(param){
			try{
				return mining.mappingutils.getMapping(param)['type_name'];
			}catch(e){
				return '';
			}
        },
		/**
		 * @name Utils#getFontName
	     * @function   
	     * @desc 获取本体ICON字体名称 。
	     * @param {Object | String} param
	     * @return {String} fontname
	     */
       	getFontName: function(param){
			try{
				var obj = mining.mappingutils.getMapping(param),
					icon_mapping = '';
					
				if(obj){
					icon_mapping = obj['icon_mapping'];
				}else{
					var classList = mining.mappingutils.getClassList();
	       			$.each(classList, function(i,n){
	       				if(n[param]){
	       					icon_mapping = mining.mappingutils.getMapping(n[param].label + '_' + n[param].children[0].type)['icon_mapping'] || '';
	       					return false;
	       				}
	       			});
				}
				return 'graphicon ' + icon_mapping.substring(icon_mapping.indexOf('-')+1, icon_mapping.length);
			}catch(e){
				return '';
			}
        },
		/**
		 * @name Utils#getTypeList
	     * @function   
	     * @desc 获取本体细类列表。
	     * @param {String} type [all | entity | relation | event]
	     * @return {Object} objs
	     */
       	getTypeList: function(type){
       		var objs = {};
       		
       		type = type || 'all';
       		$.each(mining.mapping.objList, function(i,n){
       			if(type == 'all' || type == n.element_type) objs[i] = n.type_name;
       		});
       		
       		return objs;
        },
		/**
		 * @name Utils#getLabels
	     * @function   
	     * @desc 获取本体大类列表。
	     * @param {String} type [all | entity | relation | event]
	     * @return {Array} arr
	     */
        getLabels: function(type){
        	var arr = [];
        	
        	type = type || 'all';
        	$.each(mining.mapping.objList, function(i,n){
        		if(arr.indexOf(n.label) == -1 && (type == 'all' || type == n.element_type)) arr.push(n.label);
        	});
        	
        	return arr;
        },
		/**
		 * @name Utils#getClassList
	     * @function
	     * @desc 获取本体大类和细类列表。
	     * @param {String} type [all | entity | relation | event]
	     * @return {Object} objs
	     */
       	getClassList: function(type){
       		var classList = {entity:{}, relation:{}, event:{}}, resultList;
       		
       		$.each(mining.mapping.objList, function(i,n){
       			var etype = n.element_type;
       			if(mining.utils.isEmpty(classList[etype][n.label])){
       				classList[etype][n.label] = {
       					label: n.label,
       					label_name: n.label_name,
       					children: []
       				}
       			}
       			classList[etype][n.label].children.push({
   					type: n.type,
   					type_name: n.type_name
       			});
       		});
       		
       		if(type != 'all' && classList[type]){
       			return classList[type];
       		}
       		return classList;
        },
		/**
		 * @name Utils#getProperties
	     * @function   
	     * @desc 获取本体属性列表。
	     * @param {Object | String} param
	     * @param {String} type [primary | minor | key]
	     * @return {Object} props
	     */
       	getProperties: function(param, type){
       		var obj = mining.mappingutils.getMapping(param),
       			propArr = [],
       			primaryArr = [],
       			minorArr = [],
       			arr = [],
       			props = {},
       			propsmap, propname;
       		
       		var setProData = function(n, propname){
       			propsmap = mining.utils.clone(mining.mapping.propertyMapping[propname]) || {};
       			
       			props[n] = propsmap;
       			if(typeof param == 'string'){
       				props[n].value = '';
       			}else if(n == 'label' || n == 'type'){
       				props[n].value = obj[n + '_name'];
       			}else if(mining.utils.isEmpty(propsmap.time_format)){
       				if(param[n])props[n].value = param[n];
       			}else{
       				var _val = (param[n] && (param[n].indexOf('-') == -1 || param[n].indexOf('-') == 0)) ? mining.utils.getUTCTime(parseInt(param[n]), propsmap.time_format) : param[n];
       				
					props[n].value = (_val  == 'Invalid date' ? param[n] : _val);
       			}
       			try{
       				props[n].value = props[n].value.trim();
       			}catch(e){}
       			if(mining.utils.isEmpty(props[n].value) && typeof param != 'string')delete props[n];
       		}
       		if(mining.utils.isEmpty(obj)){
       			if(!mining.utils.isEmpty(param) && mining.utils.isEmpty(param.label)){
       				$.each(param, function(i,n){
       					if(typeof i == 'string')setProData(i,i);
       				});
       			}
       			return props;
       		}
       		if(type == 'key'){
       			propsmap = mining.utils.clone(mining.mapping.propertyMapping[obj.key_prop]) || {name:'', time_format:''};
       			props.name = propsmap.name;
       			props.value = typeof param == 'string' ? '' : (mining.utils.isEmpty(propsmap.time_format) ? param.key : mining.utils.getUTCTime(parseInt(param.key), propsmap.time_format));
       		}else{
       			primaryArr = obj.primary_prop.split(',');
       			minorArr = obj.minor_prop.split(',');
       			filesArr = obj.fields.split(',');
       			propArr = primaryArr.concat(minorArr);
	       		switch(type){
		    		case 'primary': arr = primaryArr; break;
		    		case 'minor': arr = minorArr; break;
		    		case 'fields': arr = filesArr; break;
		    		default: arr = propArr; break;
		    	}
	       		$.each(arr, function(i,n){
	       			if(n == 'key' && !mining.utils.isEmpty(obj.key_prop)){
	       				propname = obj.key_prop;
	       			}else{
	       				propname = n;
	       			}
	       			setProData(n, propname);
	       		});
	       		
	       		//添加用户自定义属性
	       		if(type == 'minor' && typeof param == 'object' && param.specficType == 'custom'){
	       			if(param.owner)props.owner = {
	       				data_type: 'string',
						name: '添加人',
						time_format: '',
						value: param.owner
					}
	       			if(param.lastModifyTime)props.lastModifyTime = {
	       				data_type: 'string',
						name: '添加时间',
						time_format: '',
						value: moment(parseInt(param.lastModifyTime)).format('YYYY-MM-DD HH:ss:mm')
					}
	       			if(param.description)props.description = {
	       				data_type: 'string',
						name: '标注',
						time_format: '',
						value: param.description
					}
	       		}
       		}
       		
       		
       		return props;
        },
		/**
		 * @name Utils#getPropLabel
	     * @function   
	     * @desc 获取属性中文名称。
	     * @param {Object} param
	     * @return {String} label
	     */
       	getPropLabel: function(param){
       		return mining.mapping.propertyMapping[param] ? mining.mapping.propertyMapping[param].name : '';
        },
		/**
		 * @name Utils#getitle
	     * @function   
	     * @desc 获取title。
	     * @param {Object} data
	     * @return {String} title
	     */
       	getTitle: function(data){
       		var obj = mining.mappingutils.getMapping(data),
       			titlePopArr = [],
       			titleArr = [];
       		
       		if(data.label && data.label == 'harts'){
       			titleArr.push(mining.mappingutils.getRuleLabel(data));
       		}else if(!mining.utils.isEmpty(obj) && !mining.utils.isEmpty(obj.title)){
       			titlePopArr = obj.title.split(',');
		    	$.each(titlePopArr, function(j,m){
		    		var value = mining.mappingutils.formatProperty(mining.utils.newObj(m,data[m]))[m];
		    		
		    		if(!value || typeof value != 'string') return;
		    		if(m == 'label' || m == 'type'){
						value = obj[m + '_name'];
					}/*else if(m == 'freq'){
						value += '次';
					}*/
		    		titleArr.push(value);
		    	});
       		}
		    	
		    return titleArr.join('-');
        },
        /**
		 * @name Utils#getGroupBy
	     * @function   
	     * @desc 获取统计属性列表。
	     * @param {String | Object} param
	     * @return {Array} propArr
	     */
       	getGroupBy: function(param){
       		try{
	       		return mining.mappingutils.getMapping(param)['groupby'].split(',');
       		}catch(e){
       			return [];
       		}
        },
		/**
		 * @name Utils#getShowlabel
	     * @function   
	     * @desc 从Mapping表解析label中文显示。
	     * @param {Object} data
	     * @param {String} showtype [show_normal | show_bigger]
	     * @return {Array} labels
	     */
       	getShowlabel: function(data, showtype){
       		showtype = showtype || 'show_normal';	//show_normal | show_bigger
       		
       		if(showtype != 'show_normal') showtype = 'show_bigger';
       		
       		var labelArr = [];
       		
       		if(data && data.label == 'harts'){
       			if(!mining.hartsrule){
       				mining.hartsrule = [{
	       				ids:[],
	       				name: '同住',
	       				count: 0
	       			},{
	       				ids:[],
	       				name: '同行',
	       				count: 0
	       			}]
       				$.each(mining.mapping.hartsMapping, function(i,n){
       					if(n.name.indexOf('同住') != -1){
       						mining.hartsrule[0].ids.push(n.id);
       					}else{
       						mining.hartsrule[1].ids.push(n.id);
       					}
       				});
       			}
       			mining.hartsrule[0].count = mining.hartsrule[1].count = 0;
       			var frequencies = data.frequencies ? (data.frequencies.indexOf(';') != -1 ? data.frequencies.split(';') : data.frequencies.split(',')) : [];
				var names = mining.mappingutils.getRuleLabel(data);
				
				$.each(frequencies, function(i,n){
					var _d = n.split(':');
					$.each(mining.hartsrule, function(j,m){
						if(m.ids.indexOf(parseInt(_d[0])) != -1){
							if(m.name == '同行'){
								m.count += parseInt(_d[1]);
							}else{
								m.count = Math.max(m.count, parseInt(_d[1]));
							}
							return false;
						}
					});
				});
				$.each(mining.hartsrule, function(i,n){
					if(n.count > 0){
						labelArr.push({
							name: n.name,
							value:  n.name + ':' + n.count + '次'
						});
					}
				});
				
				return labelArr;
       		}
       		var obj = mining.mappingutils.getMapping(data);
       			
       		if(!mining.utils.isEmpty(obj) && !mining.utils.isEmpty(obj[showtype])){
				$.each(obj[showtype].split(','), function(i,n){
					var value = mining.mappingutils.formatProperty(mining.utils.newObj(n,data[n]))[n];
					
					if(mining.utils.isEmpty(value)) return;
					if(n == 'label' || n == 'type'){
						value = obj[n + '_name'];
					}/*else if(n == 'freq'){
						value += '次';
					}*/
					labelArr.push({
						name: mining.mappingutils.getPropLabel(n),
						value: value
					});
				});
       		}
       		
			return labelArr;
        },
		/**
		 * @name Utils#getMenu
	     * @function   
	     * @desc 从Mapping表解析菜单展示项。
	     * @param {String | Object} param
	     * @return {Object} menuObj
	     */
       	getMenu: function(param){
       		var obj = null,
       			menuObj = {entity:[], event:[]},
       			obj = mining.mappingutils.getMapping(param);
       		
       		if(obj && obj.menu && !mining.utils.isEmpty(obj.menu)){
       			$.each(obj.menu.split(','), function(i,n){
       				var type = mining.mappingutils.getType(n),
       					label = mining.mappingutils.getLabelName(n);
       				
					if(type == 'relation'){
						menuObj.entity.push({
							name: n,
							label: label
						});
					}else if(type == 'event'){
						menuObj.event.push({
							name: n,
							label: label
						});
					}
       			});
       		}
       		return menuObj;
        },
		/**
		 * @name Utils#getGraphIcon
	     * @function   
	     * @desc 获取图析svg图标路径。
	     * @param {String | Object} data
	     * @param {String} type['smaller','normal','big']
	     * @return {String} url
	     */
       	getGraphIcon: function(data, type){
       		var obj = mining.mappingutils.getMapping(data),
       			noted = data && data.noted || false,
       			locked = data && data.locked || false,
       			showArr = [],
       			path = iconname = '';
       		
       		if(mining.utils.isEmpty(obj)){
       			if(data.label == 'doc'){
       				iconname = 'entity_document';
       				if(noted) iconname += '_noted';
       				if(locked) iconname += '_locked';
	   				return staticUrl + '/scopa/images/core/' + iconname + '.png'
	   			}else{
	       			iconname = 'default';
	   			}
       		}else{
       			type = type || 'normal';
	       		if(type == 'smaller'){
	       			iconname = obj.element_type;
	       		}else if(type == 'big' && data.label== 'person' && !mining.utils.isEmpty(data.photoUrl)){
	   				return data.photoUrl;
	   			}else{
	       			iconname = obj.icon_mapping;
	   			}
				if(mining.utils.isEmpty(iconname)){
					iconname = obj.element_type;
				}
				if(obj.label == 'person' && data.PERSON_xb == '女'){
					iconname += '_women';
				}
       		}
			if(noted) iconname += '_noted';
			if(locked) iconname += '_locked';
   			
			
			return staticUrl + '/scopa/images/graphicon/' + iconname + '.png';
        },
		/**
		 * @name Utils#getMapIcon
	     * @function   
	     * @desc 获取地图svg图标路径。
	     * @param {String | Object} data
	     * @param {String} type['small','normal','big']
	     * @return {String} url
	     */
       	getMapIcon: function(data, type){
       		return mining.mappingutils.getGraphIcon(data, type);
        },
		/**
		 * @name Utils#formatProperty
	     * @function   
	     * @desc 格式化属性值。
	     * @param {Object} data
	     * @return {Array} properties
	     */
       	formatProperty: function(data){
       		var sdata = mining.utils.clone(data);
       		
			$.each(sdata, function(i,n){
				var prop = mining.mapping.propertyMapping[i]; 
				if(prop && typeof n == 'string'){
					if(prop){
						if(!mining.utils.isEmpty(prop.time_format)){
							var _val = moment(n).format() == 'Invalid date' ? parseInt(n) : n;
							sdata[i] = mining.utils.getUTCTime(_val, prop.time_format);
						}else if(sdata[i]){
							sdata[i] = n.replace(' 00:00:00','');
						}
					}
				}
	    	});
       		
       		return sdata;
        },
		/**
		 * @name Utils#setRuleIds
	     * @function   
	     * @desc 设置Harts规则id。
	     * @param {Object} data
	     * @return {Object} data
	     */
       	setRuleIds: function(data){
       		//harts边rule_ids为空时的处理 TODO
			try{
				if(data.label == 'harts' && data.rule_ids == ''){
					var _freArr = data.frequencies.split(';'), _idArr = [];
					$.each(_freArr, function(i,n){
						_idArr.push(n.split(':')[0]);
					})
					data.rule_ids = _idArr.join(';');
				}
			}catch(e){}
			
			return data;
        },
		/**
		 * @name Utils#getRuleLabel
	     * @function   
	     * @desc 获取Harts规则翻译。
	     * @param {Object} data
	     * @return {Array} nameArr
	     */
       	getRuleLabel: function(data){
       		var names = [];
       		
			mining.mappingutils.setRuleIds(data);
			ruleIds = data.rule_ids ? (data.rule_ids.indexOf(';') != -1 ? data.rule_ids.split(';') : data.rule_ids.split(',')) : [];
			
			$.each(ruleIds, function(i,n){
				var ruleInfo = mining.mapping.hartsMapping['harts_' + n];
				if(ruleInfo)names = names.concat(ruleInfo.name);
			});
			
			return names;
        },
		/**
		 * @name Utils#getRuleIds
	     * @function   
	     * @desc 获取Harts规则翻译。
	     * @return {Array} idArr
	     */
       	getRuleIds: function(){
       		var idArr = [];
       		
       		$.each(mining.mapping.hartsMapping, function(i,n){
       			idArr.push(n.id);
       		})
			
			return idArr;
        },
		/**
		 * @name Utils#getHartEvents
	     * @function   
	     * @desc 解析Harts边包含事件。
	     * @param {Object} data
	     * @return {Array} events
	     */
        getHartEvents: function(data){
        	mining.mappingutils.setRuleIds(data);//harts边rule_ids为空时的处理 TODO
        	var ruleIds = data.rule_ids ? (data.rule_ids.indexOf(';') != -1 ? data.rule_ids.split(';') : data.rule_ids.split(',')) : [],
        		events = [];
				
			$.each(ruleIds, function(i,n){
				var ruleInfo = mining.mapping.hartsMapping['harts_' + n];
				if(ruleInfo)events = events.concat(ruleInfo.event);
			});
			//去重
			var _arr = [];
			$.each(events, function(i,n){
				_arr.pushOnly(n);
			});
			
			return _arr;
        },
        /**
		 * @name Utils#getTimeProp
	     * @function   
	     * @desc 获取时间属性。
	     * @param {Object} data
	     * @return {Array} timeList
	     */
       	getTimeProp: function(param){
       		var _obj = mining.mappingutils.getMapping(param),
       			timePro = {key:'', name:'', value: ''};
       		
			try{
	       		timePro.key = _obj.timeline;
				timePro.name = mining.mappingutils.getPropLabel(timePro.key);
				timePro.value = mining.mappingutils.formatProperty(mining.utils.newObj(timePro.key, param[timePro.key]))[timePro.key];
			}catch(e){}
			
			return timePro;
        },
		/**
		 * @name Utils#getHartsList
	     * @function   
	     * @desc 解析Harts边包含隐性关系。
	     * @param {Object} data
	     * @return {Array} typelist
	     */
        getHartsList: function(data){
        	mining.mappingutils.setRuleIds(data);//harts边rule_ids为空时的处理 TODO
        	var ruleList = data.rule_ids ? data.rule_ids.split(';') : [],
        		typelist = [];
				
			$.each(ruleList, function(i,n){
				var label = 'harts_' + n,
					ruleInfo = mining.mapping.hartsMapping[label];
					
				if(ruleInfo){
					typelist.push($.extend(ruleInfo, {
						gid: data.gid,
						label: label
					}));
				}
			});
			
			return typelist;
       },
		/**
		 * @name Utils#getHartsTimeList
	     * @function   
	     * @desc 解析Harts边包含时间。
	     * @param {Object} data
	     * @return {Array} timelist
	     */
        getHartsTimeList: function(data){
        	var ruleTimeList = data.time_list ? data.time_list.split(';') : [],
        		timelist = [];
				
			$.each(ruleTimeList, function(i,n){
				var ruleId = n.substring(0, n.indexOf(':')),
					time = n.substring(n.indexOf(':') + 1, n.length);
				
				if(mining.utils.isEmpty(time) || time.indexOf('*') != -1) return;
				var label = 'harts_' + ruleId,
					ruleInfo = mining.mapping.hartsMapping[label];
				if(ruleInfo){
					timelist.push($.extend(ruleInfo, {
						gid: data.gid,
						label: label,
						time: time.split(',')
					}));
				}
			});
			
			return timelist;
       },
        /**
		 * @name Utils#getTimeList
	     * @function   
	     * @desc 获取时间属性。
	     * @param {Object} data
	     * @return {Array} timeList
	     */
       	getTimeList: function(data){
       		var label = typeof data == 'string' ? data : mining.mappingutils.getName(data),
       			obj = mining.mappingutils.getMapping(label),
       			timeList = [];
       		
       		if(obj){
       			if(obj.label == 'harts'){
	       			timeList = mining.mappingutils.getHartsTimeList(data);
	       		}else{
	       			var timelist =  data.specialtime;
	       			
	       			if(mining.utils.isEmpty(timelist) && !mining.utils.isEmpty(obj.timeline)){
	       				timelist = data[obj.timeline];
	       			}
		       		try{
		       			if(!mining.utils.isEmpty(timelist) && timelist.indexOf('*') == -1){
		       				var timeArr = timelist.split(',');
		       				
		       				$.each(timeArr, function(i,n){
		       					var _d = parseInt(n), _start = 2649600000;//Date.parse("Feb 01 1970 00:00:00");
		       					if(_d < _start || new Date(_d) == 'Invalid Date')timeArr.remove(n);
		       				});
		       				if(!mining.utils.isEmpty(timeArr)){
		       					timeList.push({
					       			gid: data.gid,
					       			label: label,
					       			name: obj.type_name,
					       			time: timeArr
					       		});
		       				}
		       			}
		       		}catch(e){}
	       		}
       		}
       		
       		return timeList;
        }
	}
});