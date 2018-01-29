/**
 * Created by ycx on 2016/7/27.
 */
define(function (require) {
    var $page = $('.page-point');
    var nav= require('core/app/fixednav');
    // var preUrl = mining.baseurl.gongan + '/criminal',
    var requestUrl = {
            //dataUrl:'http://k1268.mlamp.co:8080/sjz/gongan' + '/criminal/',
            dataUrl: mining.baseurl.gongan+ '/criminal/',
            getvertex: mining.baseurl.core + '/query/getVertexByIndex'
        },
        docParameters = {
            'pointList':{
                'el':'.point-data-list .forewarn-list .data-list table tbody',
                'path':'alert/1?'
            },
            'pointEvents':{
                'el':'.point-data-list .forewarn-info .list-info table tbody',
                'path':'records'
            },
            'pointInfos':{
                'el':'.point-data-list .forewarn-info .base-info .infos'
            },
            'pointTags':{
                'el':'.point-data-list .forewarn-info .base-info .tags .tag-list'
            },
            'pointTypes':{
                'el':'.point-data-details .point-types .types-list',
                'path':'model/type_list'
            },
            'pointChart':{
                'el':'.point-data-details .point-item-details .point-chart .property',
                'path':'model/distribution_label_list?'
            },
            'pointRules':{
                'el':'.point-data-details .point-item-details .point-rules',
                'path':'model/distribution?'
            }
        },
        isFilter = false,
        isAppend = false,
        isOrder = false,
        orderParams = [],
        pageNo = 1,
        pageSize = 30,
        graphModule = null,
        graph = null,
        showModule = require('core/common/showelement'),
        data = [],
        app = require('core/app/app'),
        isinit = true,
        isShowed = false,
        chart= require('./pointchart'),filekey;
    var getTemplateHtml = function (type, obj) {
        switch(type){
            case 'pointList':
                var i = 0, datalist = [], data = obj.bodyData, count = (obj.pageNo - 1) * obj.pageSize;
                var getScoreClass = function (score) {
                    return score > 300 ? 'dense' : (score <=200 ? 'sparse' : 'moderate');
                };
                if(obj.totalCount > 0 && data.length == 0){
                    pageNo = pageNo - 1;
                }
                if(obj.totalCount == 0){
                    datalist.push(['<tr data-point-id=""><td colspan="8" class="isEmpty">暂无数据</td></tr>'].join());
                }else{
                    for(i;i<data.length;i++){
                        var itemData = data[i],
                            j = 0,
                            arr = [];
                        $.each(JSON.parse(itemData.label),function(k,v){
                            arr.push(v);
                        });
                        datalist.push(['<tr data-point-id="' + itemData.id + '" data-point-name="'+itemData.name +'" data-point-label="' + arr.join(',') + '">',
                                            '<td class="fix60">' + (i + 1 + count) + '</td>',
                                            '<td class="auto-width">' + itemData.id + '</td>',
                                            '<td class="auto-width">' + itemData.name + '</td>',
                                            '<td class="fix100">' + itemData.type + '</td>',
                                            '<td class="fix-time ' + getScoreClass(itemData.score_single) + '">' + Math.round(itemData.score_single) + '</td>',
                                            '<td class="fix-time ' + getScoreClass(itemData.score_relation) + '">' + Math.round(itemData.score_relation) + '</td>',
                                            '<td class="fix-time ' + getScoreClass(itemData.score_alert) + '">' + Math.round(itemData.score_alert) + '</td>',                           
                                            '<td class="fix100"><span class="icon icon-toarchives to-file"></span><span class="icon icon-tomappinganalysis to-graph"></span></td>',
                                        '</tr>'].join(''));
                    }
                }
                return datalist.join('');
                break;
            case 'pointEvents':
                var arr = [];
                $.each(obj.obj.criminalEvents,function(k,v){
                    var desc= v.description.split(' ').length>1? v.description.split(' ')[1]: v.description;
                    desc=desc.replace('NULL','');
                    arr.push(['<tr>',
                                '<td class="ellipsis" title="' + v.date + '">' + v.date + '</td>',
                                '<td class="ellipsis" title="' + v.type_event + '">' +(mining.utils.isEmpty(v.type_event)?'':v.type_event.split(',')[0])  + '</td>',
                                '<td class="ellipsis" title="' + desc + '">' + desc + '</td>',
                                '<td class="ellipsis" title="' + v.type_rule + '">' + v.type_rule + '</td>',
                                '<td class="ellipsis" title="' + v.score + '">' + (mining.utils.isEmpty(v.score) ?'': v.score)+ '</td>',
                            '</tr>'].join(''));
                });
                return arr.join('');
                break;
            case 'pointInfos':
                return ['<div class="photo" style="background-image:url(' + obj.svgicon + ');">',
                            '<img src="' + obj.picUrl + '" _src="' + obj.svgicon + '" />',
                        '</div>',
                        '<div class="details">',
                            '<span>' + obj.pData.PERSON_xm + '</span>',
                            '<span>' + obj.pData.key + '</span>',
                        '</div>'].join('');
                break;
            case 'pointTags':
                var arr = [], i = 0, labels = [];
                if(obj.length > 0){
                    labels = obj.split(',');
                    for(i; i < labels.length; i++){
                        arr.push('<span class="tag" title="' + labels[i] + '">' + labels[i] + '</span>');
                    }
                }
                return arr.join('');
                break;
            case 'pointTypes':
                var arr = [], i = 0, data = obj.data||obj.obj.data;
                for(i;i<data.length;i++){
                    arr.push('<span class="type-item" data-key="' + data[i].key + '" title="' + data[i].desc + '">' + data[i].desc + '</span>');
                }
                return arr.join('');
                break;
            case 'pointChart':
                var i = 0, arr = [], data =  obj.data||obj.obj.data;
                for(i;i<data.length;i++){
                    var itemData = data[i];
                    arr.push('<option value="' + itemData.distLabel + '">' + itemData.desc + '</option>');
                }
                return ['<label class="title">类别：</label>',
                        '<select class="label-types select" data-type="' + (obj.type||obj.obj.type) + '">',
                            arr.join(''),
                        '</select>'].join('');
                break;
            case 'pointRules':
                var i = 0, arr = [], data =  obj.data||obj.obj.data;
                createChart(obj);
                var rules=data.rule_list;
                for(i;i<rules.length;i++){
                    var itemData = rules[i];
                    arr.push('<tr><td>'+itemData.desc+'</td><td>'+itemData.score+'</td></tr>');
                }
                return [' <div class="rule-title" >积分规则</div>',
                    '<table class="rule-table"><thead><tr><th>年龄</th><th>积分</th></tr></thead><tbody>'+arr.join('')+'</tbody></table>'].join('');

                break;
            default:
                break;
        }
    }

    var initPage = function(key){
        if(!isAppend){
            pageNo = 1;
        }
        $page = $('.page-point');
        if(key && key.length > 0){
            filekey=key;
        }
        window.location='#!scopa/point';

        mining.utils.loadPage($page, function(){
            resetOrder();
            bannerForewarnAction();
            nav.init($page,2);
            var params = [];
            $page.find('.searchbox input.searchbox-ipt').val(filekey);
            if(filekey && filekey.length > 0){
                params.push('keyword=' + filekey);
            }
            params.push('orderBy=score_alert');
            params.push('order=desc');
            getData('pointList',params);
            $('select',$page).select2({
                minimumResultsForSearch: Infinity
            });
        });

    }

    var resetOrder = function(){
        $('.point-data-list .data-list th.order-data[data-order-filed="score_alert"]',$page).addClass('order-desc')
            .siblings('.order-data')
            .removeClass('order-desc')
            .removeClass('order-asc');
    }

    var getData = function(type,p,fun){
        var params = [], url = '';
        if(type == 'pointList'){
            params.push('pageNo=' + pageNo);
            params.push('pageSize=' + pageSize);
        }
        url = requestUrl.dataUrl + docParameters[type].path + (p.length > 0 ? p.join('&') : '') + (params.length > 0 ? '&' + params.join('&') : '');
        dataLoad(url,function(data){
            if(type == 'pointChart'){
                var typeKey = p[0].replace('type=','');
                $(docParameters[type].el,$page).find('.type-item[data-key="' + typeKey + '"]').data('data',data);
            }
            if(type=='pointEvents'){
                formatRelatedEntity(data);
            }
            renderData(data,type);
            fun&&fun();
        });
    }

    var bannerForewarnAction = function(){
        $('.goApp',$page).on('click',mining.utils.toAppHome);
        $('.action-btns .show-point-module',$page).off('click').on('click',function(){
            $(this).addClass('hidden').siblings().removeClass('hidden');
            $('.point-data-list',$page).addClass('hidden').siblings().removeClass('hidden');
            if(!isShowed){
                moduleAction();
                $(docParameters['pointTypes'].el,$page).find('.type-item').eq(0).click();
                $(docParameters['pointChart'].el,$page).find('.label-types').change();
            }
        });
        $('.action-btns .return-point-list',$page).off('click').on('click',function(){
            $(this).addClass('hidden').siblings().removeClass('hidden');
            $('.point-data-details',$page).addClass('hidden').siblings().removeClass('hidden');
        });
    };
    //生成图表
    var createChart=function(data){
        //散点图
        chart.init(data);
    };
    var renderData = function(datalist,type){
        var str = getTemplateHtml(type,datalist),
            $el = $(docParameters[type].el,$page);
        if(type == 'pointList'){
            if(isAppend){
                $el.append(str);
            }else{
                $el.html(str);
            }
        }else{
            $el.html(str);
        }
        tableAction();
        filterDataAction();
    };

    // 过滤条件
    var filterDataAction = function(){
        // 关键字搜索
        $('.point-data-list .searchbox .searchbox-btn',$page).off('click').on('click',function(){
            isAppend = false;
            pageNo = 1;
            filterData();
            mining.utils.serverLog(560,$('.forewarn-list .filters',$page).find('.searchbox input.searchbox-ipt').val());
        });
        $('.point-data-list .searchbox .searchbox-ipt',$page).off('keyup').on('keyup', function (e) {
            if(e.keyCode == 13) {
                isAppend = false;
                pageNo = 1;
                filterData();
                mining.utils.serverLog(560,$('.forewarn-list .filters',$page).find('.searchbox input.searchbox-ipt').val());
            }
        });
        $('.selectType',$page).on('change',function(){
            isAppend = false;
            pageNo = 1;
            filterData();
        });
    }

    // 过滤数据
    var filterData = function(){
        var params = [],
            $filter = $('.point-data-list .filters',$page),
            keys = $filter.find('.searchbox input.searchbox-ipt').val(), //获取搜索关键字
            i = 0;
        isFilter = true;
      //  params.push('type='+$('select.selectType',$filter).val());
        // 关键字搜索 
        if(keys && keys.length > 0){
            params.push('keyword=' + keys);
        }
        getData('pointList',params);
    };
    var tableAction = function(){
        // 添加scrollbar
        $(".point-data-list .data-list",$page).mCustomScrollbar({
            theme: 'minimal',
            callbacks:{
                onTotalScroll: function(){
                    ++pageNo;
                    isAppend = true;
                    if(isFilter){
                        filterData();
                    }else if(isOrder){
                        getData('pointList',orderParams);
                    }else{
                        getData('pointList',[]);
                    }
                }
            }
        });

        fixedThead($('.point-data-list .data-list',$page));

        //排序
        $('.point-data-list .fixedthead th.order-data',$page).off('click').on('click',function(){
            isAppend = false;
            isFilter = false;
            isOrder = true;
            var $dataTable = $('.point-data-list .data-list',$page);
            orderParams = [];
            if($(this).hasClass('order-asc')){
                $(this).removeClass('order-asc').addClass('order-desc')
                .attr('data-order','desc')
                .siblings('.order-data').removeClass('order-asc').removeClass('order-desc');
                $dataTable.find('thead th').eq($(this).index()).removeClass('order-asc').addClass('order-desc')
                .attr('data-order','desc')
                .siblings('.order-data').removeClass('order-asc').removeClass('order-desc');
            }else{
                $(this).removeClass('order-desc').addClass('order-asc')
                .attr('data-order','asc')
                .siblings('.order-data').removeClass('order-asc').removeClass('order-desc');
                $dataTable.find('thead th').eq($(this).index()).removeClass('order-desc').addClass('order-asc')
                .attr('data-order','asc')
                .siblings('.order-data').removeClass('order-asc').removeClass('order-desc');
            }
            
            var $filter = $('.point-data-list .filters',$page),
                keys = $filter.find('.searchbox input.searchbox-ipt').val() //获取搜索关键字
    
            // 关键字搜索 
            if(keys && keys.length > 0){
                orderParams.push('keyword=' + keys);
            }

            pageNo = 1;
            orderParams.push('orderBy=' + $(this).attr('data-order-filed'));
            orderParams.push('order=' + $(this).attr('data-order'));
            getData('pointList',orderParams);
        });
      
        // 展示重点人详情
        $('.point-data-list .data-list table tbody tr',$page).off('click').on('click',function(){
            if($(this).attr('data-point-id').length == 0)return;
            var params = [],
                dataKeyId = $(this).attr('data-point-id'),
                labels = $(this).attr('data-point-label');
            $(this).addClass('select').siblings().removeClass('select');
            // 渲染标签
            // renderData(labels,'pointTags');
            $(docParameters['pointTags'].el,$page).html(getTemplateHtml('pointTags',labels));
            

            params.push('/' + dataKeyId);
            getData('pointEvents',params);

            function getPersonPhoto(data){
                if(data.v&&data.v.length>0){
                    var svgicon = mining.mappingutils.getGraphIcon(data.v[0]).replace('_locked',''),
                        proData = {
                            picUrl: data.v[0].photoUrl ? data.v[0].photoUrl : svgicon,
                            svgicon: svgicon,
                            pData: data.v[0]
                        };
                    renderData(proData,'pointInfos');
                    // $(docParameters['pointInfos'].el,$page).html(getTemplateHtml('pointInfos',proData));
                    mining.utils.checkImg($(docParameters['pointInfos'].el,$page).find('.photo img'));
                }
            }
            getVertex(dataKeyId,function(data){getPersonPhoto(data);})
            
            // tags添加scrollbar
            $(".point-data-list .forewarn-info .tags",$page).mCustomScrollbar({
                theme: 'minimal'
            });
            // 列表添加scrollbar
            $(".point-data-list .forewarn-info .list-info",$page).mCustomScrollbar({
                theme: 'minimal'
            });

            fixedThead($('.point-data-list .forewarn-info .list-info',$page));
            // TODO:graph event
        });
        if($('.point-data-list .data-list table tbody tr',$page).length > 0 && isinit){
            $('.point-data-list .data-list table tbody tr',$page).eq(0).click();
            isinit = false;
        }
        $('.point-data-list .data-list .to-file,.point-data-list .data-list .to-graph',$page).off('click').on('click', function(e){
            e = e || window.event;
            if(e.preventDefault) {
                e.preventDefault();
                e.stopPropagation();
            }else{
                e.returnValue = false;
                e.cancelBubble = true;
            }
            getVertex($(this).parents('tr:first').attr('data-point-id'), function(result){
                if($(e.target).hasClass('to-graph')){
                    showModule.show(result, 'graph');
                    mining.utils.serverLog(562,$(this).parents('tr').attr('data-point-id')+','+$(this).parents('tr').attr('data-point-name'));
                }else if($(e.target).hasClass('to-file')){
                    showModule.show(result, 'file');
                    mining.utils.serverLog(561,$(this).parents('tr').attr('data-point-id')+','+$(this).parents('tr').attr('data-point-name'));
                }
            });
        });
        $('.chart-btns .to-file,.chart-btns .to-graph',$page).off('click').on('click', function(e){
            if(!graph)return;
            var nodeData = [], href = 'graph',log=[];
            var nodes=graph.nodes(':selected').length>0?graph.nodes(':selected'):graph.nodes();
            $.each(nodes, function(i,n){
            	nodeData.push(n.data().data);
                log.push(n.data().data.key);
            });
            if($(e.target).hasClass('to-file')){
               href = 'file';
               mining.utils.serverLog(563,log.join(','));
            }
            if(href=='graph')  mining.utils.serverLog(564,log.join(','));
            showModule.show({v:nodeData}, href);
        });
         
            
            
        if(!$('.label-types',$page).hasClass('select2-container')){
            $('select.label-types',$page).select2({
            minimumResultsForSearch: Infinity
            });
        }
        
    };
    var formatRelatedEntity = function(itemData){
        var data = itemData.obj.criminalRelations;
        if(mining.utils.isEmpty(data)){
        	$('.graph-info',$page).html('<span class="graph" style="position:relation;left:40%;top:47%;">无关系维度信息</span>')
        	 return
        }
        
        var graphData = {nodes:[], edges:[]},
        	keyArr = [];
        	//name = $('.point-data-list .data-list table tbody tr.select',$page).attr('data-point-name');
        	
        //graphData.push({ "type": "non_eventful_person", "label": "person",name:name, data:{ "key":data[0].id,gid:data[0].id}});
        
        $.each(data,function(k,v){
        	var showlabel = v.type_rule + '（' +(mining.utils.isEmpty(v.score)?100: v.score)  + '分）';
        	
        	keyArr.pushOnly(v.id);
        	keyArr.pushOnly(v.id_related);
        	graphData.edges.push({
        		group:'edges', 
				data: {
					id: 'custom_relation_' + mining.utils.randomInt(0, 99999),
					source: v.id, 
					target: v.id_related,
					data: v,
					etype: 'relation',
					event: showlabel,
					showbigger: showlabel
				}, 
				selected: false
        		
        	});
        });
    	if(graphModule){
        	delete graphModule;
        }
        
        graphModule = new (require('core/common/graphchart/graphchart'))();
        graphModule.init({
        	container:  $('.graph-info',$page),
			snapshot: false,
			navigator: false,
			panzoom: false,
            readyCallback: function () {
                graph = this;
                getVertex(keyArr.join(','),function(result){
		        	var entityData = {};
                    if(result.v.length==0) return;
		        	$.each(result.v, function(i,n){
		        		entityData[n.key] = n;
		        		graphData.nodes.push(graphModule.getnodedata(n));
		        	});
		        	$.each(graphData.edges, function(i,n){
		        		n.data.source = String(entityData[n.data.source].gid);
		        		n.data.target = String(entityData[n.data.target].gid);
		        	});
		        	graph.add(graphData);
		        	graphModule.layout('breadthfirst')
		        })
            }
        });
    }
    var formatRelatedEntityBak = function(itemData){
        var data=itemData.obj.criminalRelations;
        if(mining.utils.isEmpty(data)) return;
        var graphData=[],relationData=[];
        var name=$('.point-data-list .data-list table tbody tr.select',$page).attr('data-point-name');
        graphData.push({ "type": "non_eventful_person", "label": "person",name:name, data:{ "key":data[0].id,gid:data[0].id}});
        $.each(data,function(k,v){
            getVertex(v.id_related,function(result){
                name=result.v&&result.v.length>0? result.v[0].PERSON_xm:'';
              	graphData.push({ "type": v.type_related.split(',')[2],name:name, "key": v.id_related,gid: v.id_related, "label": v.type_related.split(',')[1]});
                relationData.push({
                from: data[0].id,
                gid: "iytnwb-d08-2721h-2pk0rs",
                label: "relation",
                to: v.id_related,
                type: "other"});
            })
           
        });
        if(graphModule){
            delete graphModule;
        }
        graphModule = new (require('core/common/graphchart/graphchart'))();
        graphModule.init({
            container:  $('.graph-info',$page),
            navigator: false,
            zoom: 0.5,
            layout: 'grid',
            shownormal: true,
            elements: {nodes: []},
            readyCallback: function () {
                graph = this;
                graphModule.appenddata({v:graphData, e:relationData}, true);
            }
        });
    }

    /* 根据身份证号获取信息 */
    var getVertex = function(ids, callback){
        $ajax.ajax({
            url: requestUrl.getvertex,
            data: {
                value: ids,
                index: 'key'
            },
            success: function(data){
                callback(data);
            },
            error: function(data){
                mining.utils.alertMsg(data, '获取信息失败，请稍后重试！', 'error');
            }
        });
    };

    var moduleAction = function(){
        $(docParameters['pointTypes'].el, $page).off('click').on('click', function (e) {
            if ($(e.target).hasClass('type-item')) {
                if (!mining.utils.isEmpty($(this).data('data'))) {
                    renderData($(this).data('data'), 'pointChart');
                } else {
                    var params = [];
                    params.push('type=' + $(e.target).attr('data-key'));
                    getData('pointChart', params,function(){ $(docParameters['pointChart'].el,$page).find('.label-types').change();});
                }
                $(e.target).addClass('active').siblings().removeClass('active');
                mining.utils.serverLog(565,$(e.target).text());
            }
        });
        $(docParameters['pointChart'].el, $page).on('change','.label-types', function () {
            $('.point-rules',$page).html('');
            $('.charts',$page).html('');
            var params = [];
            params.push('type=' + $(this).attr('data-type'));
            params.push('distLabel=' + $(this).val());
            getData('pointRules', params);
            mining.utils.serverLog(566,$(this).text());
        });
        // 渲染左侧types
        getData('pointTypes',[], function (){
            $(docParameters['pointTypes'].el,$page).find('.type-item').eq(0).click();
        });
    };

    //固定表头
    var fixedThead = function($tablewrap){
        var ths = '';
        $('th',$tablewrap).each(function(){
            ths += '<th class="' + $(this).attr('class') + '" data-order-filed="' + $(this).attr('data-order-filed') + '" style="width:' + $(this).outerWidth() + 'px;text-align:center;">' + $(this).text() + '</th>';
        });
        $('.fixedthead',$tablewrap.parent()).remove();
        $tablewrap.before('<table class="fixedthead" style="width:' + $tablewrap.outerWidth() + 'px;position:absolute;z-index:10;"><thead><tr>' + ths + '</tr></thead></table>');
    }

    var dataLoad = function(url, success){
        $ajax.ajax({
            url: url,
            success: function(data){
                success(data);
            },
            error: function(err) {
                console.log(err);
            }
        });
    }

    return {
        init: initPage
    }
});