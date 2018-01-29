define(function(require){
    var $page = $('.page-covert');
    var showModule = require('core/common/showelement');
    require('tablesorter');
    require('echarts');
    require('daterangepicker');
       var nav= require('core/app/fixednav');
    //刷新布局
    var pageResize = function(){}
    mining.utils.winResize({name:pageResize});

    var userId = mining.userinfo.user_id,
        requestUrl = {
            getByLabel: mining.baseurl.core + '/query/getByLabel',  //?vid='+_id+'&labels=[railway_record]
            getEventsByType: mining.baseurl.core + '/archive/getEventsByType',//?objId=130533198110084118&type=railway&pageNo=1&pageSize=10
            getPath: mining.baseurl.core + '/query/getPath',    //?vids=[16384,xxxxx,xxxx]&labels=[label1,label2]&hop=3
            getvertex: mining.baseurl.core + '/query/getVertexByIndex', //根据身份证号码获取点信息 ?value=370105198202223003&index=key
            dataUrl: mining.baseurl.gongan + '/',
            personInfoUrl: 'http://qbbigdata.sjzs.eb:8080/picture/person?sfzh=',
            filterTagsUrl: mining.baseurl.core + '/query/getPathByFilter'
        },
        docParameters = {
            'yxzdrList':{
                'el':'.covert-content .data-list table tbody',
                'path':'yxzdr/lists'
            },
            'yxzdrEvents':{
                'el':'.covert-box .covert-info .base-info .events',
                'path':'yxzdr/info'
            },
            'yxzdrDetails':{
                'el':'.covert-box .covert-info .base-info .infos'
            },
            'yxzdrTags':{
                'el':'.covert-box .covert-tags',
                'path':'yxzdr/rules'
            }
        },
        parameters = '?applicantId=' + userId,
        initial = true,
        initialTags = true,
        isFilter = false,
        isAppend = false,
        isOrder = false,
        orderParams = [],
        types = [],
        dangerData = {},
        pageNo = 1,
        pageSize = 30,
        startTime = '',
        endTime = '',
        graphModule = null,
        graph = null,
        isClicked = true,
        residentProperty = {
            primary: {
                XM:'姓名',
                MZ:'民族',
                XB:'性别',
                HYZK:'婚姻状况',
                SFZH:'身份证号',
                JGSSX:'籍贯省市县',
                HKSZD:'户口所在地',
                ZZXZ:'住址详址'
            },
            minor:{
                WHCD:'文化程度',
                SG:'身高',
                RYBH:'人员编号',
                FWCS:'服务处所',
                CYM:'曾用名',
                CSDXZ:'出生地祥址',
                CSD:'出生地',
                BYQK:'兵役情况'
            }
        };

    var getTemplateHtml = function (type, obj) {
        switch(type){
            case 'yxzdrList':
                var i = 0, datalist = [], data = obj.bodyData, count = (obj.pageNo - 1) * obj.pageSize;
                if(obj.totalCount > 0 && data.length == 0){
                    pageNo = pageNo - 1;
                }
                if(obj.totalCount == 0){
                    datalist.push(['<tr data-yxzdr-id=""><td colspan="6" class="isEmpty">暂无数据</td></tr>'].join());
                    $(docParameters['yxzdrEvents'].el).empty();
                    $(docParameters['yxzdrDetails'].el).empty();
                    if(graphModule){graphModule.delelements('all');}
                }else{
                    for(i;i<data.length;i++){
                        var itemData = data[i],
                            activePercent = itemData.activity,
                            dangerPercent = itemData.risk,
                            activeW = parseInt(activePercent * 100) + '%',
                            dangerW = parseInt(dangerPercent * 100) + '%',
                            activeExtent = activePercent > 0.8 ? 'dense-bg' : (activePercent <= 0.5 ? 'sparse-bg' : 'moderate-bg'),
                            dangerExtent = dangerPercent > 0.8 ? 'dense-bg' : (dangerPercent <= 0.5 ? 'sparse-bg' : 'moderate-bg'),
                            j = 0,
                            arr = [],
                            memberIds = [],
                            members = itemData.gangMember;
                        for(j;j<members.length;j++){
                            memberIds.push(members[j].id);
                        }
                        datalist.push(['<tr ids="' + memberIds.join(',') + '" data-yxzdr-id="' + members[0].id + '" data-gang-id="' + itemData.gangId + '">',
                                            '<td class="width10">' + (i + 1 + count) + '</td>',
                                            '<td class="width10" title="' + members[0].name + '">' + members[0].name + '</td>',
                                            '<td class="width15" title="' + members[0].id + '">' + members[0].id + '</td>',
                                            '<td class="width15" title="' + itemData.lastActiveTime + '">' + itemData.lastActiveTime + '</td>',
                                            '<td class="fix-text width20">',
                                                '<span>' + Math.round(activePercent * 100) + '%</span>',
                                                '<span class="statistics-box"><i class="statistics-bg ' + activeExtent + '" style="width:' + activeW + '"></i></span>',
                                            '</td>',
                                            '<td class="fix-text width20">',
                                                '<span>' + Math.round(dangerPercent * 100) + '%</span>',
                                                '<span class="statistics-box"><i class="statistics-bg ' + dangerExtent + '" style="width:' + dangerW + '"></i></span>',
                                            '</td>',
                                            '<td class="width10 to-graph"><span class="icon icon-tomappinganalysis" title="发送到图析"></span></td>',
                                        '</tr>'].join(''));
                    }
                }
                return datalist.join('');
                break;
            case 'yxzdrEvents':
                var arr = [];
                $.each(obj.obj.events,function(k,v){
                    arr.push('<p class="event-info" data-original-title="" title="">' + v.eventDesc + '</p>');
                });
                return ['<p><label>异常事件</label></p>',
                        '<div class="events-list">',
                            arr.join(''),
                        '</div>',
                        '<p><i class="show-list"></i><i class="hide-list hidden"></i></p>'].join('');
                break;
            case 'yxzdrDetails':
                var arr = [], j = 0;
                 $.each(obj.primary,function(i,n){
                    if(!mining.utils.isEmpty(obj.dataInfo[i]) || obj.sourcetag == 'personInfo'){
                        arr.push('<span class="text ellipsis ' + (j % 2 == 0 ? 'pull-left' : 'pull-right') + '" title="' + n.name + '：' + n.value + '"><label class="infos-label">' + n.name + '：</label><span class="infos-value">' + n.value + '</span></span>');
                        if(j<7)j++;
                    }
                });
                arr = ['<div class="primary-info">',
                            '<div class="itemthumb entity pull-left" style="background-image:url("' + obj.svgicon + '");">',
                               '<img src="' + obj.picUrl + '" _src="' + obj.svgicon + '">',
                            '</div>',
                            '<div class="primary-box pull-left">',
                                '<div class="keyinfo ellipsis">',
                                    '<b class="title-info ellipsis pull-left" title="' + obj.title + '">' + obj.title + '</b>',
                                '</div>',
                                '<div class="infolist">',
                                    arr.join(''),
                                '</div>',
                            '</div>',
                        '</div>'];
                return arr.join('');
                break;
            case 'yxzdrTags':
                var i = 0, arr = [], data = obj.listObj, ruleName = {'1':'涉恐','2':'涉毒','3':'拐卖妇女儿童'};
                for(i;i<data.length;i++){
                    var itemData = data[i];
                    arr.push(['<li class="tags-icon' + itemData.ruleId + ' selected" data-type="' + ruleName[itemData.ruleId] + '" data-rule-id="' + itemData.ruleId + '"' + (i == (data.length - 1) ? ' style="margin-right: 0;"' : '') + '>',
                            '<div class="tag-info">',
                                '<span>' + itemData.ruleName + '</span>',
                                '<span>' + (itemData.groupCount ? itemData.groupCount : 0) + '个</span>',
                                '<span class="tag-des hidden">' + itemData.ruleDescription + '</span>',
                            '</div>',
                            '<div class="bg"></div>',
                        '</li>'].join(''));
                }
                
                return ['<ul>',
                            arr.join(''),
                        '</ul>'].join('');
                break;
            default:
                break;
        }
    }

    var initPage = function(){
        initial = true;
        initialTags = true;
        isFilter = false;
        isAppend = false;
        isOrder = false;
        orderParams = [];
        types = [];
        dangerData = {};
        pageNo = 1;
        pageSize = 30;
        startTime = '';
        endTime = '';
        graphModule = null;
        graph = null;
        isClicked = true;
        if(!isAppend){
            pageNo = 1;
            isClicked = true;
        }
        $('.page-covert')
        mining.utils.loadPage($page, function(){
            resetOrder();
            getData('yxzdrTags',[]);
            if(window.showCovertPersonId && !mining.utils.isEmpty(window.showCovertPersonId)){
                getData('yxzdrList',['groupId=' + window.showCovertPersonId]);
                window.showCovertPersonId = '';
            }else{
                getData('yxzdrList',[]);
            }
            $('.goApp',$page).on('click',mining.utils.toAppHome);
            nav.init($('.covert-box',$page),2);
        });
    }

    var resetOrder = function(){
        $('.covert-content .covert-list th.order-data[data-order-filed="lastActiveTime"]',$page).addClass('order-desc')
            .siblings('.order-data')
            .removeClass('order-desc')
            .removeClass('order-asc');
    }

    var getData = function(type,p){
        var params = [], url = '';
        if(type == 'yxzdrList'){
            params.push('pageNo=' + pageNo);
            params.push('pageSize=' + pageSize);
        }
        url = requestUrl.dataUrl + docParameters[type].path + parameters + (p.length > 0 ? '&' + p.join('&') : '') + (params.length > 0 ? '&' + params.join('&') : '');

        dataLoad(url,function(data){renderData(data,type,docParameters[type].el);});
    }

    

    var renderData = function(datalist,type,el){
        var str = getTemplateHtml(type,datalist);
        if(type == 'yxzdrList'){
            if(isAppend){
                $(el,$page).append(str);
            }else{
                $(el,$page).html(str);
            }
        }else{
            $(el,$page).html(str);
        }
        if(type != 'yxzdrTags'){
            tableAction();
            filterDataAction(); 
        }
    }

    // 过滤条件
    var filterDataAction = function(){
        $('.covert-box .covert-tags li',$page).off('click').on('click',function(){
            if(initial){
                initial = false;
                $(this).siblings().removeClass('selected');
            }else{
                $(this).toggleClass('selected');
            }
            var ids = $(this).parent().find('li.selected'), i = 0, params = [];
            types = [];
            for(i;i<ids.length;i++){
                types.push($(ids[i]).attr('data-type'));
            }
            isAppend = false;
            pageNo = 1;
            isClicked = true;
            resetOrder();
            filterData();
            mining.utils.serverLog(522,$(this).find('.tag-info span:first').text());
        }).popover({
            trigger:'hover',
            placement:'bottom',
            html:true,
            content:function() {
                var str = $(this).find('span.tag-des').text();
                return '<div class="text-box">' + str + '</div>';
            }
        });

        //按周期模糊搜索
        $('.covert-list input[name=reservation]',$page).daterangepicker({
            format:'YYYY-MM-DD',
            applyClass: 'btn-primary',
            clearClass: 'btn-primary'
        }, function(start, end, label, action) {
            // if( $(event.target).hasClass('clearBtn')){
            //     $('input[name="reservation"]',$page).val('');
            // }
            isAppend = false;
            pageNo = 1;
            isClicked = true;
            filterData();
            mining.utils.serverLog(523,start.format('YYYY-MM-DD')+','+end.format('YYYY-MM-DD'));
        }).on('clear.daterangepicker', function(){
            $(this).val('');
        });

        // 关键字搜索
        $('.covert-list .searchbox .searchbox-btn',$page).off('click').on('click',function(){
            isAppend = false;
            pageNo = 1;
            isClicked = true;
            filterData();

            mining.utils.serverLog(524, $('.covert-list .filters',$page).find('.searchbox input.searchbox-ipt').val());
        });
        $('.covert-list .searchbox .searchbox-ipt',$page).off('keyup').on('keyup', function (e) {
            if(e.keyCode == 13) {
                isAppend = false;
                pageNo = 1;
                isClicked = true;
                filterData();
                mining.utils.serverLog(524, $('.covert-list .filters',$page).find('.searchbox input.searchbox-ipt').val());
            }
        });
    }

    // 过滤数据
    var filterData = function(){
        var params = [],
            $filter = $('.covert-list .filters',$page),
            keys = $filter.find('.searchbox input.searchbox-ipt').val(), //获取搜索关键字
            i = 0;
        isFilter = true;

        // 规则id
        if(types.length > 0){
            params.push('groupTypes=' + types.join(','));
        }

        // 起始时间
        if($('[name="reservation"]',$page).val()!=''){
            startTime = $('input[name="reservation"]',$page).data('daterangepicker').startDate.format('YYYY-MM-DD');
            endTime = $('input[name="reservation"]',$page).data('daterangepicker').endDate.format('YYYY-MM-DD');
            params.push('startTime=' + startTime);
            params.push('endTime=' + endTime);
        }

        // 关键字搜索 
        if(keys && keys.length > 0){
            params.push('keyword=' + keys);
        }

        getData('yxzdrList',params);
    }


    var tableAction = function(){
        // 添加scrollbar
        $(".covert-content .data-list",$page).mCustomScrollbar({
            theme: 'minimal',
            callbacks:{
                onTotalScroll: function(){
                    ++pageNo;
                    isAppend = true;
                    if(isFilter){
                        filterData();
                    }else if(isOrder){
                        getData('yxzdrList',orderParams);
                    }else{
                        getData('yxzdrList',[]);
                    }
                }
            }
        });

        fixedThead($('.covert-content .data-list',$page));

        //修正td宽度
        // $('table .fix-statistics').width(($('.covert-list .data-list',$page).width() - 540)/2);

        //排序
        $('.covert-content .covert-list .fixedthead th.order-data',$page).off('click').on('click',function(){
            isAppend = false;
            isFilter = false;
            isOrder = true;
            var $dataTable = $('.covert-content .data-list',$page);
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
            
            var $filter = $('.covert-list .filters',$page),
                keys = $filter.find('.searchbox input.searchbox-ipt').val() //获取搜索关键字
             // 规则id
            if(types.length > 0){
                orderParams.push('groupTypes=' + types.join(','));
            }

            // 起始时间
            if($('[name="reservation"]',$page).val()!=''){
                startTime = $('input[name="reservation"]',$page).data('daterangepicker').startDate.format('YYYY-MM-DD');
                endTime = $('input[name="reservation"]',$page).data('daterangepicker').endDate.format('YYYY-MM-DD');
                orderParams.push('startTime=' + startTime);
                orderParams.push('endTime=' + endTime);
            }
    
            // 关键字搜索 
            if(keys && keys.length > 0){
                orderParams.push('keyword=' + keys);
            }

            pageNo = 1;
            isClicked = true;
            orderParams.push('orderByField=' + $(this).attr('data-order-filed'));
            orderParams.push('order=' + $(this).attr('data-order'));
            getData('yxzdrList',orderParams);
        });
      
        // 展示重点人详情
        $('.covert-box .covert-list .data-list table tbody tr',$page).off('click').on('click',function(){
            if($(this).attr('data-yxzdr-id').length == 0)return;
            $(this).addClass('active').siblings().removeClass('active');
            var params = [],
                dataKeyId = $(this).attr('data-yxzdr-id'),
                dataGangId = $(this).attr('data-gang-id'),
                itemData = null;
            params.push('groupId=' + dataGangId);
            getData('yxzdrEvents',params);
            $('.covert-box .covert-info .base-info .events').css('height','');
            function getPersonDetailInfo(data){
                itemData = data.v[0];
                var primaryArr = mining.mappingutils.getProperties(itemData, 'primary'),
                    svgicon = mining.mappingutils.getGraphIcon(itemData),
                    primaryData = {
                        primary: primaryArr,
                        picUrl: (itemData.photoUrl ? itemData.photoUrl : svgicon),
                        svgicon: svgicon,
                        title: mining.mappingutils.getTitle(itemData),
                        sourcetag: '',
                        dataInfo: itemData
                    };
                renderData(primaryData,'yxzdrDetails',docParameters['yxzdrDetails'].el);

                getPersonInfo(dataKeyId,function(personData){
                    primaryData.primary = personData.primaryProperty;
                    primaryData.picUrl = personData.picInfo;
                    primaryData.svgicon = svgicon;
                    primaryData.sourcetag = 'personInfo';
                    renderData(primaryData,'yxzdrDetails',docParameters['yxzdrDetails'].el);
                });
                itemData.etype = mining.mappingutils.getType(itemData);
                formatRelatedEntity(itemData);
            }
            getVertex(dataKeyId,function(data){getPersonDetailInfo(data);})
            
            // 添加scrollbar
            $(".covert-content .covert-info .statistics-info",$page).mCustomScrollbar({
                theme: 'minimal'
            });
                
            $('.covert-box .covert-info .base-info .events').off('click','.show-list').on('click','.show-list',function(){
                $(this).addClass('hidden').siblings('i').removeClass('hidden');
                $('.covert-box .base-info .events .events-list',$page).css('height','auto');
                $('.covert-box .base-info .events',$page).css('height',function(){
                    return $('.covert-box .base-info .events',$page).height() + $('.covert-box .base-info .events .events-list',$page).height();
                });
                $('.covert-box .base-info .events .events-list',$page).mCustomScrollbar({
                    theme: 'minimal'
                });
            });

            $('.covert-box .covert-info .base-info .events').off('click','.hide-list').on('click','.hide-list',function(){
                $(this).addClass('hidden').siblings('i').removeClass('hidden');
                $('.covert-box .base-info .events .events-list',$page).removeAttr('style');
                $('.covert-box .base-info .events',$page).removeAttr('style');
            });

            $('.covert-box .base-info .infos .memberName-list, .covert-box .base-info .events .event-info',$page).popover({
                trigger:'hover',
                placement:'bottom',
                html:true,
                content:function() {
                    var str = $(this).text();
                    return '<div class="text-box">' + str + '</div>';
                }
            }).on('shown.bs.popover',function(){
                $('.control .text-box').mCustomScrollbar({
                    theme: 'minimal'
                });
            });
        });
        // if($('.covert-box .covert-list .data-list table tbody tr',$page).length > 0 && $(docParameters['yxzdrDetails'].el + '>div',$page).length == 0){
        if(isClicked){
            isClicked = false;
            $('.covert-box .covert-list .data-list table tbody tr',$page).eq(0).click();
        }
            
        // }


        $('.covert-box .covert-list .data-list table tbody tr .to-graph .icon-tomappinganalysis',$page).off('click').on('click', function(e){
            e = e || window.event;
            if(e.preventDefault) {
                e.preventDefault();
                e.stopPropagation();
            }else{
                e.returnValue = false;
                e.cancelBubble = true;
            }
            getVertex($(this).parents('tr:first').attr('ids'), function(result){
                showModule.show(result, 'graph');
            });
            mining.utils.serverLog(525,$(this).parents('tr:first').attr('ids'));
        });
    }

    /* 关联实体 */
    var formatFiledata = function(fdata,callback){
        $ajax.ajax({
            url: requestUrl.filterTagsUrl + '?vid=' + fdata.gid + '&filterProperty=PERSON_bjzdrybh&hop=2&groupby=PERSON_zdrlx',
            success: function(data){
                var eledata = {v:[], e:[]},
                    reg = /(\d+)|(.*(本区|外省|本市|本省).*)/;
                    
                if(!mining.utils.isEmpty(data.bodyData.pathInfo)){
                	var vertexHop = (data.bodyData.vertexHop ? data.bodyData.vertexHop[0] : {});
                	$.each(data.bodyData.pathInfo,function(pathInfoIndex,pathInfoValue){
                        $.each(pathInfoValue,function(key,value){
                            if(!reg.test(key) && key != 'NULL'){
                                	if(value.v){
                                		$.each(value.v,function(vIndex,vValue){
                                			if(!vertexHop[vValue.gid] || vValue.gid == fdata.gid)return;
                                        	eledata.v.pushOnly(vValue);
                                        	eledata.e.pushOnly({
                                        		gid: fdata.gid + '_' + vValue.gid,
                                        		from: fdata.gid,
                                        		to: vValue.gid,
    											label: 'train_event',
    											etype: 'event',
    											class: 'hop' + vertexHop[vValue.gid]
                                        	});
    	                                });
                                	}
                                    /*if(value.e){
                                    	$.each(value.e,function(eIndex,eValue){
    	                                    eledata.e.pushOnly(eValue);
    	                                });
                                    }*/
                            }
                        });
                    });
                }
                callback(eledata);
            },
            error: function(err){
                console.log(err);
            }
        });
    }
    var showFiledataCharts = function(itemData){
        if(!graph)return;
        graph.elements().remove();
        graphModule.appenddata({v:[itemData], e:[]}, true);
        formatFiledata(itemData,function (data) {
            graphModule.appenddata(data, false);
        });
    }
    var formatRelatedEntity = function(itemData){
        if(graphModule){
            delete graphModule;
        }
        graphModule = new (require('core/common/graphchart/graphchart'))(),
        graphModule.init({
            container: $('.covert-box .covert-info .statistics-info .relatedchart',$page),
            readyCallback: function(){
                graph = this;
                showFiledataCharts(itemData);
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
                mining.utils.alertMsg(data, '获取团伙信息失败，请稍后重试！', 'error');
            }
        });
    }

    // 根据身份证号从人口库中取数据
    var getPersonInfo = function(id,callback){
        $ajax.ajax({
            url: requestUrl.personInfoUrl + id,//'/scopa/static/scopa/js/core/file/testdata.json',
            success: function(data){
                if(mining.utils.isEmpty(data))return;
                var personData = {
                        picInfo: 'data:image/png;base64,' + data.XP,
                        primaryProperty: {}
                    };
                $.each(residentProperty.primary,function(dataKey,dataValue){
                    personData.primaryProperty[dataKey] = {
                        name: dataValue,
                        value: data[dataKey]
                    }
                });
                // $.each(residentProperty.minor,function(dataKey,dataValue){
                //     personData.minorProperty[dataKey] = {
                //         name: dataValue,
                //         value: data[dataKey]
                //     }
                // });
                callback(personData);
            },
            error: function(err){
                console.log(err);
            } 
        });
    }

    //固定表头
    var fixedThead = function($tablewrap){
        var ths = '';
        $('th',$tablewrap).each(function(){
            ths += '<th class="' + $(this).attr('class') + '" data-order-filed="' + $(this).attr('data-order-filed') + '" style="width:' + $(this).outerWidth() + 'px;text-align:center;">' + $(this).text() + '</th>';
        });
        $('.fixedthead',$page).remove();
        $tablewrap.before('<table class="fixedthead ' + $tablewrap.find('table').attr('class') + '" style="width:' + $tablewrap.outerWidth() + 'px;position:absolute;z-index:10;"><thead><tr>' + ths + '</tr></thead></table>');
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
