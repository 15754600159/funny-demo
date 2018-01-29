define(function(require){
    var $page = $('.page-event'),
        $mainBox;
    require('echarts');

    var userId = mining.userinfo.user_id,
        dataUrl = mining.baseurl.gongan + '/',
        docParameters = {
            'zdsjList':{
                'el':'.data-list table tbody',
                'path':'event/analysis/list'
            },
            'zdsjInfo':{
                'el':'.chart-panel .info-events-chart',
                'path':'qingbao/count'
            },
            'zdsjMember':{
                'el':'.chart-panel .members-chart',
                'path':'skeleton/count'
            },
            'zdsjLabels':{
                'path':'zdsj/label'
            }
        },
        parameters = '?applicantId=' + userId,
        isInit = true,
        orderParams = [],
        pageNo = 1,
        pageSize = 200,
        categoryIds = [];

    var intelligence = require('./intelligence'),
        labelTree = require('./labelTree'),
        getGroupData = require('./getGroupData');
    var getTemplateHtml = function (type, obj) {
        switch(type){
            case 'timeFilter':
                var yearCurrent = new Date().getFullYear(), i = 0, arr = [];
                for(i;i < 16;i++){
                    arr.push('<option value="' + (yearCurrent - i) + '">' + (yearCurrent - i) + '</option>');
                }
                return ['<select class="year select">',
                            arr.join(''),
                        '</select>',
                        '<select class="partition select">',
                            '<option value="1">统计全年</option>',
                            '<option value="12">最近五年</option>',
                        '</select>'].join('');
                break;
            case 'zdsjList':
                var i = 0, datalist = [], data = obj.obj;
                if(data.length == 0){
                    datalist.push(['<tr data-zdsj-id=""><td colspan="7" class="isEmpty">暂无数据</td></tr>'].join());
                }else{
                    for(i;i<data.length;i++){
                        var itemData = data[i],
                            j = 0,
                            arr = [];
                        datalist.push(['<tr data-zdsj-id="' + itemData.id + '">',
                                            '<td class="ellipsis width5">' + (i + 1) + '</td>',
                                            '<td class="ellipsis width25" title="' + itemData.zdsj + '">' + itemData.zdsj + '</td>',
                                            '<td class="ellipsis width10" title="' + itemData.ggrysl + '">' + itemData.ggrysl + '</td>',
                                            '<td class="ellipsis width10" title="' + itemData.qbsl + '">' + itemData.qbsl + '</td>',
                                            '<td class="ellipsis width10" title="' + itemData.zdsjsl + '">' + itemData.zdsjsl + '</td>',
                                            '<td class="ellipsis width20" title="' + itemData.zxhdsj + '">' + itemData.zxhdsj + '</td>',
                                            '<td class="ellipsis width20 action-btns">',
                                                '<span class="scopaicon scopaicon-xiangguanziliao show-details" title="查看详情"></span><span class="scopaicon scopaicon-daodangan send-to-file" title="发送到档案"></span>',
                                            '</td>',
                                        '</tr>'].join(''));
                    }
                }
                return datalist.join('');
                break;
            default:
                break;
        }
    }

    var init = function(){
        userId = mining.userinfo.user_id;
        parameters = '?applicantId=' + userId;
        isInit = true;
        $mainBox = $('.list-container .events',$page);
        $('.chart-panel .members-chart .chart-filter',$mainBox).html(getTemplateHtml('timeFilter'));
        $('.chart-panel .info-events-chart .chart-filter',$mainBox).html(getTemplateHtml('timeFilter'));
        categoryIds = [];
        resetValue();
        btnAction();
        getData('zdsjList',[]);
        resetOrder();
        filterDataAction();
    }

    var getCharData = function(categoryId,type){
        var params = [],
            category = categoryId,
            startTime = $(docParameters[type].el + ' select.year',$mainBox).val() + '-01',
            endTime = $(docParameters[type].el + ' select.year',$mainBox).val() + '-12',
            partition = $(docParameters[type].el + ' select.partition',$mainBox).val();
        if(partition == 12){
            startTime = parseInt($(docParameters[type].el + ' select.year',$mainBox).val()) - 4 + '-01';
            endTime = parseInt($(docParameters[type].el + ' select.year',$mainBox).val()) + 1 + '-01';
        }
        params.push('category=' + category);
        params.push('startTime=' + startTime);
        params.push('endTime=' + endTime);
        params.push('partition=' + partition);
        getData(type,params);
    }

    var btnAction = function () {
        $('.members-chart .year, .members-chart .partition',$mainBox).on('change',function(){
            var categoryId = $(".data-list table tr.active",$mainBox).attr('data-zdsj-id');
            getCharData(categoryId,'zdsjMember');
        });

        $('.info-events-chart .year, .info-events-chart .partition',$mainBox).on('change',function(){
            var categoryId = $(".data-list table tr.active",$mainBox).attr('data-zdsj-id');
            getCharData(categoryId,'zdsjInfo');
        });
    }

    var resetOrder = function(){
        $('th.order-data[data-order-filed="zxhdsj"]',$mainBox).addClass('order-desc')
            .siblings('.order-data')
            .removeClass('order-desc')
            .removeClass('order-asc');
    }

    var getData = function(type,p){
        var params = [], url = '';
        if(type == 'zdsjList'){
            params.push('pageNo=' + pageNo);
            params.push('pageSize=' + pageSize);
        }
        url = dataUrl + docParameters[type].path + parameters + (p.length > 0 ? '&' + p.join('&') : '') + (params.length > 0 ? '&' + params.join('&') : '');
        dataLoad(url,function(data){
            if(type == 'zdsjList'){
                renderData(data,type);
            }else if(type == 'zdsjLabels'){
                // filterDataByCategory(data);
            }else{
                createChart(data.obj,type);
            }
        });
    }

    var resetValue = function(isResetSelect){
        if(categoryIds.length > 0){
            $('.label-filter',$mainBox).text('已选标签  ' + categoryIds.length);
        }else{
            $('.label-filter',$mainBox).text('标签选择');
        }
    }

    var renderData = function(datalist,type,el){
        var str = getTemplateHtml(type,datalist),
            $el = $(docParameters[type].el,$mainBox);
        $el.html(str);
        tableAction();
    }

    var filterDataAction = function(){
        // 标签
        $mainBox.off('click','.label-filter').on('click','.label-filter',function(){
            var that = this;
            labelTree.init('events',categoryIds,function(data){
                var len = data.length,
                    params = [];
                categoryIds = [];
                isInit = true;
                $.each(data,function(i,n){
                    categoryIds.push(n.id);
                });
                resetValue();
                params.push('category=' + categoryIds.join(','));
                getData('zdsjList',params);
            });
            mining.utils.serverLog(408);
        });
    }


    var createChart = function(data,type){
        var xAxis = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'],
            isYear = false;
        if($(docParameters[type].el + ' select.partition',$mainBox).val() == "12"){
            isYear = true;
            var start = $(docParameters[type].el + ' select.year',$mainBox).val() - 4;
            xAxis = [start + '', start + 1 + '',start + 2 + '',start + 3 + '',start + 4 + ''];
        }
        if(type == 'zdsjMember'){
            var dataArr = [];
            $.each(xAxis,function(i,n){
                var x = n, y = 0, r = 0;
                $.each(data,function(k,v){
                    var xValue = v.month + '';
                    if(isYear){
                        xValue = v.year + '';
                    }
                    if(xValue == n){
                        y = parseInt(v.relativity * 100);
                        r = (v.person_num) * 10;
                        return;
                    }
                });
                dataArr.push([x, y, r]);
            });
            drawCharAction(dataArr,xAxis);
        }else{
            var infoArr = [],eventArr = [];
            $.each(xAxis,function(i,n){
                var num = 0;
                $.each(data[0].qb,function(k,v){
                    var xValue = v.month + '';
                    if(isYear){
                        xValue = v.year + '';
                    }
                    if(xValue == n){
                        num = v.qb_num;
                        return;
                    }
                });
                infoArr.push(num);
            });
            $.each(xAxis,function(i,n){
                var num = 0;
                $.each(data[1].event,function(k,v){
                    var xValue = v.month + '';
                    if(isYear){
                        xValue = v.year + '';
                    }
                    if(xValue == n){
                        num = v.event_num;
                        return;
                    }
                });
                eventArr.push(num);
            });
            drawCharAction(infoArr,xAxis,'qb');
            drawCharAction(eventArr,xAxis,'event');
        }
    }


    var drawCharAction = function(data,xAxis,type){
        var params = {};
        if(type){
            if(type == 'qb'){
                params.chartColor = 'rgb(166, 99, 166)';
                params.chartText = '情报数';
                params.chartBox = 'info-chart';
            }else{
                params.chartColor = 'rgb(78, 188, 225)';
                params.chartText = '事件数';
                params.chartBox = 'events-chart';
            }
            params.chartType = 'line';
        }else{
            params.chartColor = 'rgba(110, 181, 1,0.6)';
            params.chartText = '骨干人数';
            params.chartBox = 'members-chart';
            params.chartType = 'scatter';
        }

        var ec = echarts,
            Chart = ec.init(document.getElementById(params.chartBox));

        var itemStyle = {
            normal: {
                color: params.chartColor
            }
        };
        var yAxis = {
                type: 'value',
                axisTick:{
                    inside: true
                },
                axisLabel:{
                    // formatter: '{value}%',
                    textStyle: {
                        color: '#666',
                        fontSize: 12
                    }
                },
                axisLine: {
                    lineStyle: {
                        type: 'dashed',
                        color: '$cdd7e0'
                    }
                },
                splitLine: {
                    lineStyle:{
                        type: 'dashed'
                    }
                },
                min: 0,
                max: 100
            };
        if(!type){
            yAxis.axisLabel.formatter = '{value}%';
        }else{
            data.max() > 10 ? yAxis.max = data.max() : yAxis.max = 10
        }
        var option = {
            backgroundColor: '#f9fafb',
            grid:{
                x: 40,
                x2: 20,
                y: 30,
                y2: 25
            },
            legend: {
                right: 10,
                data: [params.chartText],
                textStyle: {
                    color: '#707070',
                    fontSize: 12
                }
            },
            xAxis: {
                type: 'category',
                boundaryGap: false,
                splitLine: {
                    show: true,
                    lineStyle:{
                        type: 'dashed',
                        color: '$cdd7e0'
                    }
                    
                },
                axisTick:{
                    show: false
                },
                axisLabel:{
                    textStyle: {
                        color: '#666',
                        fontSize: 12
                    }
                },
                axisLine: {
                    lineStyle: {
                        type: 'dashed',
                        color: '$cdd7e0'
                    }
                },
                data: xAxis
            },
            yAxis: yAxis,
            visualMap: [
                {
                    left: 'right',
                    top: '10%',
                    show: false,
                    dimension: 2,
                    min: 0,
                    max: 250,
                    inRange: {
                        symbolSize: [0, 100]
                    }
                }
            ],
            series: [{
                name: params.chartText,
                type: params.chartType,
                itemStyle: itemStyle,
                data: data
            }]
        }
        Chart.setOption(option);
    }

    var tableAction = function(){        
        // 添加scrollbar
        $(".data-list",$mainBox).mCustomScrollbar({
            theme: 'minimal'
        });

        fixedThead($('.data-list',$mainBox));

        //排序
        // $('.fixedthead th.order-data',$mainBox).off('click').on('click',function(){
        //     var $dataTable = $('.data-list',$mainBox);
        //     orderParams = [];
        //     if($(this).hasClass('order-asc')){
        //         $(this).removeClass('order-asc').addClass('order-desc')
        //         .attr('data-order','desc')
        //         .siblings('.order-data').removeClass('order-asc').removeClass('order-desc');
        //         $dataTable.find('thead th').eq($(this).index()).removeClass('order-asc').addClass('order-desc')
        //         .attr('data-order','desc')
        //         .siblings('.order-data').removeClass('order-asc').removeClass('order-desc');
        //     }else{
        //         $(this).removeClass('order-desc').addClass('order-asc')
        //         .attr('data-order','asc')
        //         .siblings('.order-data').removeClass('order-asc').removeClass('order-desc');
        //         $dataTable.find('thead th').eq($(this).index()).removeClass('order-desc').addClass('order-asc')
        //         .attr('data-order','asc')
        //         .siblings('.order-data').removeClass('order-asc').removeClass('order-desc');
        //     }

        //     // pageNo = 1;
        //     orderParams.push('orderByField=' + $(this).attr('data-order-filed'));
        //     orderParams.push('order=' + $(this).attr('data-order'));
        //     getData('zdsjList',orderParams);
        // });
        
        var $dataTable = $('.data-list table tbody',$mainBox);  
        $dataTable.find('tr td:last-child').off('click').on('click',function(e){
            mining.utils.stopBubble(e);
            var id = $(this).parents('tr:first').attr('data-zdsj-id');
            if($(e.target).hasClass('show-details')){
                // getData('zdsjLabels',['pId=' + id]);
                filterDataByCategory(id);
                mining.utils.serverLog(406);
            }else if($(e.target).hasClass('send-to-file')){
                getGroupData.get(id);
                mining.utils.serverLog(407);
            }
        });
        
        // 绘制chart
        $dataTable.off('click','tr').on('click','tr',function(){
            var id = $(this).attr('data-zdsj-id');
            $(this).addClass('active').siblings().removeClass('active');
            $('select.year',$mainBox).val('2016');
            $('select.partition',$mainBox).val("1");
            $(".chart-panel select",$mainBox).select2({
                minimumResultsForSearch: Infinity
            });
            getCharData(id,'zdsjMember');
            getCharData(id,'zdsjInfo');
        });
        if(isInit){
            $dataTable.find('tr:first').click();
        }
    }

    var filterDataByCategory = function(data){
        $('.tab li[tab="intelligence"]',$page).addClass('active').siblings().removeClass('active');
        $('.list-container .intelligence',$page).removeClass('hidden').siblings('.event-container').addClass('hidden');
        // var ids = [];
        // $.each(data.listObj,function(k,v){
        //     ids.push(v.id);
        // });
        intelligence.init([data]);
    }


    //固定表头
    var fixedThead = function($tablewrap){
        var ths = '';
        $('th',$tablewrap).each(function(){
            ths += '<th class="' + $(this).attr('class') + '" data-order-filed="' + $(this).attr('data-order-filed') + '" style="width:' + $(this).outerWidth() + 'px;text-align:center;">' + $(this).html() + '</th>';
        });
        $('.fixedthead',$page).remove();
        $tablewrap.before('<table class="fixedthead ' + $tablewrap.find('table').attr('class') + '" style="width:' + $tablewrap.outerWidth() + 'px;position:absolute;z-index:11;"><thead><tr>' + ths + '</tr></thead></table>');
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
        init: init
    }
});
