define(function(require){
    var $page = $('.page-forewarn');
    var createControl= new require('core/control/controldialog'),
        showModule = require('core/common/showelement');
   	require('tablesorter');
    require('echarts');
          var nav= require('core/app/fixednav');
    //刷新布局
    var pageResize = function(){}
    mining.utils.winResize({name:pageResize});

    var userId = mining.userinfo.user_id,
        getvertex = mining.baseurl.core + '/query/getVertexByIndex', //根据身份证号码获取点信息 ?value=370105198202223003&index=key
        dataUrl = mining.baseurl.gongan + '/',
        docParameters = {
            'gangList':{
                'el':'.forewarn-content .data-list table tbody',
                'path':'groups/lists'
            },
            'gangDetails':{
                'el':'.forewarn-box .forewarn-info',
                'path':'groups/info'
            },
            'gangTags':{
                'el':'.forewarn-box .forewarn-tags',
                'path':'groups/rules'
            },
            'gangTypes':{
                'el':'.forewarn-box .group-types select',
                'path':'groups/types'
            }
        },
        parameters = '?applicantId=' + userId,
        initial = true,
        initialTags = true,
        isFilter = false,
        isAppend = false,
        isOrder = false,
        orderParams = [],
        ruleIds = [],
        dangerData = {},
        pageNo = 1,
        pageSize = 30,
        isClicked = true,
        startTime = '',
        endTime = '';

    var getTemplateHtml = function (type, obj) {
        switch(type){
            case 'gangList':
                var i = 0, datalist = [], data = obj.bodyData, count = (obj.pageNo - 1) * obj.pageSize;
                if(obj.totalCount > 0 && data.length == 0){
                    pageNo = pageNo - 1;
                }
                if(obj.totalCount == 0){
                    datalist.push(['<tr data-gang-id=""><td colspan="6" class="isEmpty">暂无数据</td></tr>'].join());
                }else{
                    for(i;i<data.length;i++){
                        var itemData = data[i],
                            activePercent = itemData.activity,
                            dangerPercent = itemData.risk,
                            gatherPercent = itemData.density,
                            activeW = parseInt(activePercent * 100) + '%',
                            dangerW = parseInt(dangerPercent * 100) + '%',
                            gatherW = parseInt(gatherPercent * 100) + '%',
                            activeExtent = activePercent > 0.8 ? 'dense-bg' : (activePercent <= 0.5 ? 'sparse-bg' : 'moderate-bg'),
                            dangerExtent = dangerPercent > 0.8 ? 'dense-bg' : (dangerPercent <= 0.5 ? 'sparse-bg' : 'moderate-bg'),
                            gatherExtent = gatherPercent > 0.8 ? 'dense-bg' : (gatherPercent <= 0.5 ? 'sparse-bg' : 'moderate-bg'),
                            j = 0,
                            arr = [],
                            memberIds = [],
                            members = itemData.gangMember;
                        for(j;j<members.length;j++){
                            memberIds.push(members[j].id);
                        }
                        datalist.push(['<tr ids="' + memberIds.join(',') + '" data-gang-id="' + itemData.gangId + '">',
                                            '<td class="fix60">' + (i + 1 + count) + '</td>',
                                            '<td class="fix100">' + itemData.gangType + '</td>',
                                            '<td class="fix100">' + itemData.memberCount + '</td>',
                                            '<td class="fix-time">' + itemData.lastActiveTime + '</td>',
                                            '<td class="fix-text fix-statistics">',
                                                '<span>' + Math.round(activePercent * 100) + '%</span>',
                                                '<span class="statistics-box"><i class="statistics-bg ' + activeExtent + '" style="width:' + activeW + '"></i></span>',
                                            '</td>',
                                            '<td class="fix-text fix-statistics">',
                                                '<span>' + Math.round(dangerPercent * 100) + '%</span>',
                                                '<span class="statistics-box"><i class="statistics-bg ' + dangerExtent + '" style="width:' + dangerW + '"></i></span>',
                                            '</td>',
                                            '<td class="fix-text fix-statistics">',
                                                '<span>' + Math.round(gatherPercent * 100) + '%</span>',
                                                '<span class="statistics-box"><i class="statistics-bg ' + gatherExtent + '" style="width:' + gatherW + '"></i></span>',
                                            '</td>',
                                            '<td class="fix60 to-graph"><span class="icon icon-tomappinganalysis"></span></td>',
                                        '</tr>'].join(''));
                    }
                }
                return datalist.join('');
                break;
            case 'gangDetails':
                var i = 0, j = 0, m = 0, memberlist = [], eventlist = [], arr = [], dangerArr = [], legendArr = [], data = obj.obj,
                    activePercent = data.activity,
                    dangerPercent = data.risk,
                    gatherPercent = data.density,
                    activeExtent = activePercent > 0.8 ? 'dense-bg' : (activePercent <= 0.5 ? 'sparse-bg' : 'moderate-bg'),
                    dangerExtent = dangerPercent > 0.8 ? 'dense-bg' : (dangerPercent <= 0.5 ? 'sparse-bg' : 'moderate-bg'),
                    gatherExtent = gatherPercent > 0.8 ? 'dense-bg' : (gatherPercent <= 0.5 ? 'sparse-bg' : 'moderate-bg'),
                    members = data.gangMember,
                    events = data.events;
                for(i;i<members.length;i++){
                    var s = members[i].name ? members[i].name : members[i].id;
                    memberlist.push(s);
                }
                for(j;j<events.length;j++){
                    eventlist.push('<p class="event-info">' + events[j].eventDesc + '</p>');
                }
                dangerData['memberCount'] = data.memberCount;
                dangerData['memberCountDetail'] = memberCountDetail = data.memberCountDetail;
                dangerData['legendData'] = [];
                dangerData['series'] = [];
                for(m;m<memberCountDetail.length;m++){
                    var flag = memberCountDetail[m].flag + '人员',
                        count = memberCountDetail[m].count;
                    dangerArr.push(['<p class="info-box">',
                                        '<span class="type-text">' + flag + '</span>',
                                        '<span>' + count + '人</span>',
                                    '</p>'].join(''));
                    legendArr.push(['<p>',
                                        '<span class="legends-icon' + (m + 1) + '"></span>',
                                        '<span class="legends-text">' + flag + '</span>',
                                    '</p>'].join(''));
                    dangerData['series'].push({value:count,name:flag});
                }
                arr = ['<div class="base-info">',
                            '<div class="infos">',
                                '<p><label>团伙类型</label>' + data.gangType + '</p>',
                                '<p><label>团伙成员</label><span class="memberName-list">' + memberlist.join('&nbsp;') + '</span></p>',
                                '<p><label>活动地点</label>' + data.lastActiveLocation + '</p>',
                            '</div>',
                            '<div class="events">',
                                '<p><label>异常事件</label></p>',
                                '<div class="events-list">',
                                    eventlist.join(''),
                                '</div>',
                                '<p><i class="show-list"></i><i class="hide-list hidden"></i></p>',
                            '</div>',
                        '</div>',
                        '<div class="statistics-info">',
                            '<div class="info">',
                                '<p class="banner-title"><label>危险度</label><i class="statistics-bg"><i class="statistics-bg ' + dangerExtent + '" style="width:' + dangerPercent * 100 + '%"></i></i><span>' + Math.round(dangerPercent * 100) + '%</span></p>',
                                '<div id="danger-pie"></div>',
                                '<div class="legends">',
                                    legendArr.length > 0 ? legendArr.join('') : '',
                                '</div>',
                            '</div>',
                            '<div class="info">',
                                '<p class="banner-title"><label>聚集度</label><i class="statistics-bg"><i class="statistics-bg ' + gatherExtent + '" style="width:' + gatherPercent * 100 + '%"></i></i><span>' + Math.round(gatherPercent * 100) + '%</span></p>',
                                dangerArr.length > 0 ? dangerArr.join('') : '',
                            '</div>',
                            '<div class="info">',
                                '<p class="banner-title"><label>活跃度</label><i class="statistics-bg"><i class="statistics-bg ' + activeExtent + '" style="width:' + activePercent * 100 + '%"></i></i><span>' + Math.round(activePercent * 100) + '%</span></p>',
                            '</div>',
                        '</div>']
                return (obj.statusCode == '200' ? arr.join('') : '');
                break;
            case 'gangTags':
                var i = 0, arr = [], data = obj.listObj;
                arr.push('<ul>');
                for(i;i<data.length;i++){
                    var itemData = data[i];
                    arr.push(['<li class="tags-icon' + itemData.ruleId + ' selected" data-rule-id="' + itemData.ruleId + '"' + (i == (data.length - 1) ? ' style="margin-right: 0;"' : '') + '>',
                            '<div class="tag-info">',
                                '<span>' + itemData.ruleName + '</span>',
                                '<span>' + (itemData.groupCount ? itemData.groupCount : 0) + '个</span>',
                                '<span class="tag-des hidden">' + itemData.ruleDescription + '</span>',
                            '</div>',
                            '<div class="bg"></div>',
                        '</li>'].join(''));
                }
                
                arr.push('</ul>');
                return arr.join('');
                break;
            case 'gangTypes':
                var arr = [];
                arr.push('<option value="default" selected>团伙类型</option>');
                $.each(obj.listObj,function(i,n){
                    arr.push('<option value="' + n.gangTypeName + '">' + n.gangTypeName + '</option>');
                });
                return arr.join('');
                break;
            default:
                break;
        }
    }

    var initPage = function(){
        nitial = true;
        initialTags = true;
        isFilter = false;
        isAppend = false;
        isOrder = false;
        orderParams = [];
        ruleIds = [];
        dangerData = {};
        pageNo = 1;
        isClicked = true;
        pageSize = 30;
        startTime = '';
        endTime = '';
        if(!isAppend){
            pageNo = 1;
            isClicked = true;
        }
        $page = $('.page-forewarn')
        mining.utils.loadPage($page, function(){
            resetOrder();
            getData('gangTags',[]);
            // getData('gangTypes',[]);
            if(window.showForewarnDetail && !mining.utils.isEmpty(window.showForewarnDetail)){
                getData('gangList',['groupId=' + window.showForewarnDetail]);
                window.showForewarnDetail = '';
            }else{
                getData('gangList',[]);
            }
            $('.goApp',$page).on('click',mining.utils.toAppHome);
             nav.init($('.forewarn-box',$page),2);
        });

    }

    var resetOrder = function(){
        $('.forewarn-content .forewarn-list th.order-data[data-order-filed="lastActiveTime"]',$page).addClass('order-desc')
            .siblings('.order-data')
            .removeClass('order-desc')
            .removeClass('order-asc');
    }

    var getData = function(type,p){
        var params = [], url = '';
        if(type == 'gangList'){
            params.push('pageNo=' + pageNo);
            params.push('pageSize=' + pageSize);
        }
        url = dataUrl + docParameters[type].path + parameters + (p.length > 0 ? '&' + p.join('&') : '') + (params.length > 0 ? '&' + params.join('&') : '');
        dataLoad(url,function(data){renderData(data,type,docParameters[type].el);});
    }

    

    var renderData = function(datalist,type,el){
        var str = getTemplateHtml(type,datalist);
        if(type == 'gangList'){
            if(isAppend){
                $(el,$page).append(str);
            }else{
                $(el,$page).html(str);
            }
        }else{
            $(el,$page).html(str);
        }
        if(type != 'gangTags'){
            tableAction();
            filterDataAction(); 
        }
    }

    // 过滤条件
    var filterDataAction = function(){
        $('.forewarn-box .forewarn-tags li',$page).off('click').on('click',function(){
            if(initial){
                initial = false;
                $(this).siblings().removeClass('selected');
            }else{
                $(this).toggleClass('selected');
            }
            var ids = $(this).parent().find('li.selected'), i = 0, params = [];
            ruleIds = [];
            for(i;i<ids.length;i++){
                ruleIds.push($(ids[i]).attr('data-rule-id'));
            }
            isAppend = false;
            pageNo = 1;
            isClicked = true;
            resetOrder();
            filterData();
             mining.utils.serverLog(501,$(this).find('.tag-info span:first').text());
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
        $('.forewarn-list input[name=reservation]',$page).daterangepicker({
            opens: 'left',
            format:'YYYY-MM-DD',
            timePicker: true,
            applyClass: 'btn-primary',
            clearClass: 'btn-primary'
        }, function(start, end, label, action) {
            startTime = mining.utils.dateFormat(new Date(start), 'yyyy-MM-dd');
            endTime = mining.utils.dateFormat(new Date(end), 'yyyy-MM-dd');
            isAppend = false;
            pageNo = 1;
            isClicked = true;
            filterData();
        });

        $('.forewarn-box .filters .group-types select',$page).select2({
            minimumResultsForSearch: Infinity
        });
        //团伙类型
        $('.forewarn-box .filters .group-types select',$page).off('change').on('change',function(){
            isAppend = false;
            pageNo = 1;
            isClicked = true;
            filterData();
        });

        // 关键字搜索
        $('.forewarn-list .searchbox .searchbox-btn',$page).off('click').on('click',function(){
            isAppend = false;
            pageNo = 1;
            isClicked = true;
            filterData();
            mining.utils.serverLog(503,$('.forewarn-list .filters',$page).find('.searchbox input.searchbox-ipt').val());
        });
        $('.forewarn-list .searchbox .searchbox-ipt',$page).off('keyup').on('keyup', function (e) {
            if(e.keyCode == 13) {
                isAppend = false;
                pageNo = 1;
                isClicked = true;
                filterData();

                mining.utils.serverLog(503,$('.forewarn-list .filters',$page).find('.searchbox input.searchbox-ipt').val());
            }
        });
    }

    // 过滤数据
    var filterData = function(){
        var params = [],
            $filter = $('.forewarn-list .filters',$page),
            // types = $filter.find('.group-types select').val(), // 获取团伙类型
            keys = $filter.find('.searchbox input.searchbox-ipt').val(), //获取搜索关键字
            i = 0;
        isFilter = true;

        // 规则id
        if(ruleIds.length > 0){
            params.push('ruleIds=' + ruleIds.join(','));
        }

        // 团伙类型
        // if(types!='default'){
        //     params.push('groupTypes='+ types);
        // }
        // 起始时间
        if(startTime.length > 0 || endTime.length > 0){
            params.push('startTime=' + startTime);
            params.push('endTime=' + endTime);
        }
        // 关键字搜索 
        if(keys && keys.length > 0){
            params.push('keyword=' + keys);
        }

        getData('gangList',params);
    }


    var tableAction = function(){
        // 添加scrollbar
        $(".forewarn-content .data-list",$page).mCustomScrollbar({
            theme: 'minimal',
            callbacks:{
                onTotalScroll: function(){
                    ++pageNo;
                    isAppend = true;
                    if(isFilter){
                        filterData();
                    }else if(isOrder){
                        getData('gangList',orderParams);
                    }else{
                        getData('gangList',[]);
                    }
                }
            }
        });

        fixedThead($('.forewarn-content .data-list',$page));

        //修正td宽度
        // $('table .fix-statistics').width(($('.forewarn-list .data-list',$page).width() - 511)/3);

        //排序
        $('.forewarn-content .forewarn-list .fixedthead th.order-data',$page).off('click').on('click',function(){
            isAppend = false;
            isFilter = false;
            isOrder = true;
            var $dataTable = $('.forewarn-content .data-list',$page);
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
            
            var $filter = $('.forewarn-list .filters',$page),
            	types = $filter.find('.group-types select').val(), // 获取团伙类型
            	keys = $filter.find('.searchbox input.searchbox-ipt').val() //获取搜索关键字
             // 规则id
	        if(ruleIds.length > 0){
	            orderParams.push('ruleIds=' + ruleIds.join(','));
	        }
	
	        // 团伙类型
	        // if(types!='default'){
	        //     orderParams.push('groupTypes='+ types);
	        // }
	        // 关键字搜索 
	        if(keys && keys.length > 0){
	            orderParams.push('keyword=' + keys);
	        }

            pageNo = 1;
            isClicked = true;
            orderParams.push('orderByField=' + $(this).attr('data-order-filed'));
            orderParams.push('order=' + $(this).attr('data-order'));
            getData('gangList',orderParams);
        });
      
        // 展示团伙详情
        $('.forewarn-box .forewarn-list .data-list table tbody tr',$page).off('click').on('click',function(){
            if($(this).attr('data-gang-id').length == 0){
                $(docParameters['gangDetails'].el,$page).html('');
                return false;
            }
            $(this).addClass('active').siblings().removeClass('active');
            var params = [];
            params.push('groupId=' + $(this).attr('data-gang-id'));
            getData('gangDetails',params);
            if(dangerData['series'].length > 0){
                $('#danger-pie, .statistics-info .legends').removeClass('hidden');
                var ec = echarts,
                    pieChart = ec.init(document.getElementById('danger-pie')),
                    showLoading = {
                        text: 'loading...',
                        effect: 'bubble',
                        textStyle: {
                            fontSize: 20
                        }
                    };
                var option = {
                    title : {
                        show:false
                    },
                    tooltip : {
                        show:false,
                        trigger: 'item',
                        formatter: "{a} <br/>{b} : {c} ({d}%)"
                    },
                    legend: {
                        show:false,
                        orient : 'vertical',
                        x : 'right',
                        itemWidth:10,
                        itemHeight:10,
                        data:dangerData['legendData']
                    },
                    toolbox: {
                        show : false
                    },
                    calculable : false,
                    series : [
                        {
                            name:'危险度',
                            type:'pie',
                            radius : '100%',
                            center: ['50%', '50%'],
                            itemStyle: {
                                normal: {
                                    label: {
                                        show: false
                                    },
                                    labelLine:{
                                        show: false
                                    },
                                    //bar 的颜色
                                    color: function (seriesIndex) {
                                        if(seriesIndex.dataIndex == 0) {
                                            return '#5360af';
                                        }else if(seriesIndex.dataIndex == 1) {
                                            return '#ea618b';
                                        }else if(seriesIndex.dataIndex == 2) {
                                            return '#17c1d5';
                                        }else {
                                            return '#41c5d4';
                                        }
                                    }
                                }
                            },
                            data:dangerData['series'],
                            hoverAnimation: false
                        }
                    ]
                };
                pieChart.clear();
                pieChart.hideLoading();
                pieChart.setOption(option);
            }else{
                $('#danger-pie, .statistics-info .legends').addClass('hidden');
            }
            
            // 添加scrollbar
            $(".forewarn-content .forewarn-info .statistics-info",$page).mCustomScrollbar({
                theme: 'minimal'
            });
                
            $('.forewarn-box .forewarn-info .base-info .events .show-list').off('click').on('click',function(){
                $(this).addClass('hidden').siblings('i').removeClass('hidden');
                $('.forewarn-box .base-info .events .events-list',$page).css('height','auto');
                $('.forewarn-box .base-info .events',$page).css('height',function(){
                    return $('.forewarn-box .base-info .events',$page).height() + $('.forewarn-box .base-info .events .events-list',$page).height();
                });
                $('.forewarn-box .base-info .events .events-list',$page).mCustomScrollbar({
                    theme: 'minimal'
                });
            });

            $('.forewarn-box .forewarn-info .base-info .events .hide-list').off('click').on('click',function(){
                $(this).addClass('hidden').siblings('i').removeClass('hidden');
                $('.forewarn-box .base-info .events .events-list',$page).removeAttr('style');
                $('.forewarn-box .base-info .events',$page).removeAttr('style');
            });

            $('.forewarn-box .base-info .infos .memberName-list, .forewarn-box .base-info .events .event-info',$page).popover({
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
        // if($('.forewarn-box .forewarn-list .data-list table tbody tr',$page).length > 0 && $(docParameters['gangDetails'].el + '>div',$page).length == 0){
        if(isClicked){
            isClicked = false;
            $('.forewarn-box .forewarn-list .data-list table tbody tr',$page).eq(0).click();
        }
            
        // }


        $('.forewarn-box .forewarn-list .data-list table tbody tr .to-graph .icon-tomappinganalysis',$page).off('click').on('click', function(e){
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
             mining.utils.serverLog(504,$(this).parents('tr:first').attr('ids'));
        });
    }

    /* 根据身份证号获取信息 */
    var getVertex = function(ids, callback){
        $ajax.ajax({
            url: getvertex,
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
            async: false,
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
