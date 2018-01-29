define(function(require){
    var $page = $('.page-control');
    var createControl= new require('core/control/controldialog');
    require('tablesorter');
    //刷新布局
    var pageResize = function(){

    }
      var nav= require('core/app/fixednav');
    mining.utils.winResize({name:pageResize});
    /*
        审核状态 0：未审核，1：审核通过，2：审核失败，3：已撤销
        "不同状态下不同用户的操作项：
        1）未审核：
        普通：撤销                管理人员：撤销、审批
        2）审核通过：
        普通：撤销                管理人员：撤销
        3）审核失败：
        普通：重新提交         管理人员：重新提交
        4）已撤销
        普通：重新提交         管理人员：重新提交"
    */
    var userId = mining.userinfo.user_id,
        dataUrl = mining.baseurl.gongan + '/',
        getEventDataUrl = mining.baseurl.core + '/archive/getEventByKey',
        showModule = require('core/common/showelement'),
        docParameters = {
            'forewarnList':{
                'el':'.control-box .forewarn-control[data-box="forewarnList"]',
                'timeEl':'forewarnList',
                'path':'control/batches',
                'isFilter':false,
                'isAppend':false,
                'isOrder':false,
                'filters':[
                {
                    'keys':'controlModeId',
                    'values':'.filters .control-model select'
                }],
                'fixhead':true,
                'orderParams':[],
                'pageNo': 1,
                'startTime':'',
                'endTime':'',
                'autowidth':630
            },
            'forewarnDetails':{
                'el':'.control-box .forewarn-control[data-box="forewarnDetails"]',
                'timeEl':'forewarnDetails',
                'path':'control/items',
                'isFilter':false,
                'isAppend':false,
                'isOrder':false,
                'filters': [{
                    'keys':'targetIds',
                    'values':'.filters .control-types select'
                },
                {
                    'keys':'controlModeId',
                    'values':'.filters .control-model select'
                }],
                'fixhead':true,
                'orderParams':[],
                'pageNo': 1,
                'startTime':'',
                'endTime':'',
                'autowidth':780
            },
            'controlList':{
                'el':'.control-box .control-list',
                'timeEl':'controlList',
                'path':'controls',
                'isFilter':false,
                'isAppend':false,
                'isOrder':false,
                'filters':[{
                    'keys':'controlUnitId',
                    'values':'.filters .control-units select'
                },{
                    'keys':'status',
                    'values':'.filters .control-status select'
                },
                {
                    'keys':'controlModeId',
                    'values':'.filters .control-model select'
                }],
                'fixhead':true,
                'orderParams':[],
                'pageNo': 1,
                'startTime':'',
                'endTime':'',
                'autowidth':1330
            },
            'detailTags':{
                'el':'.control-box .filters .control-types',
                'path':'control/targets'
            },
            'unitsList':{
                'el':'.control-box .control-list .control-units',
                'path':'control/units'
            },
            'eventList':{
                'path':'control/batch/info'
            },
            'revocation':{
                'path':'control/cancel'
            }
        },
        parameters = '?applicantId=' + userId,
        initial = true,
        currentType = 'forewarnDetails',
        typeList = ['forewarnList','forewarnDetails','controlList'],
        // pageNo = 1,
        pageSize = 30;
    var getTemplateHtml = function (type, obj) {
        switch(type){
            case 'forewarnList':
                var i = 0, datalist = [], data = obj.bodyData, count = (obj.pageNo - 1) * obj.pageSize;
                if(obj.totalCount > 0 && data.length == 0){
                    docParameters[type].pageNo = docParameters[type].pageNo - 1;
                }
                if(obj.totalCount == 0){
                    datalist.push(['<tr>',
                                    '<td colspan="8" class="isEmpty">暂无数据</td>',
                                '</tr>'].join(''));
                }else{
                    for(i;i<data.length;i++){
                        var itemData = data[i], j = 0, jxtbr = itemData.jxtbr, jxtbrArr = [];
                        for(j;j<jxtbr.length;j++){
                            jxtbrArr.push(jxtbr[j].name);
                        }
                        datalist.push(['<tr>',
                                            '<td class="width5">' + (i + 1 + count) + '</td>',
                                            '<td class="width10">' + itemData.controlMode + '</td>',
                                            '<td class="width10">' + itemData.controlId + '</td>',
                                            '<td class="width10">' + itemData.controlLevelName + '</td>',
                                            '<td class="width10">' + itemData.eventNum + '</td>',
                                            '<td class="width10"><span class="control-content">' + (jxtbrArr.length > 0 ? jxtbrArr.join('&nbsp;') : '') + '</span></td>',
                                            '<td class="width10">' + (itemData.applicant ? itemData.applicant : '') + '</td>',
                                            '<td class="width15" >' + (itemData.lastestEventTime ? itemData.lastestEventTime : '') + '</td>',
                                            '<td class="width20"><span class="forewarn-event">' + (itemData.lastestEventInfo ? itemData.lastestEventInfo : '') + '</span></td>',
                                            '<td class="eventList-data hidden" data-control-id="' + itemData.controlId + '"></td>',
                                        '</tr>'].join(''));
                    }
                }
                return datalist.join('');
                break;
            case 'forewarnDetails':
                var i = 0, datalist = [], data = obj.bodyData, count = (obj.pageNo - 1) * obj.pageSize;
                if(obj.totalCount > 0 && data.length == 0){
                    docParameters[type].pageNo = docParameters[type].pageNo - 1;
                }
                if(obj.totalCount == 0){
                    datalist.push(['<tr>',
                                    '<td colspan="8" class="isEmpty">暂无数据</td>',
                                '</tr>'].join(''));
                }else{
                    for(i;i<data.length;i++){
                        var itemData = data[i],
                            itemControl = itemData.control,
                            itemControlItem = itemData.controlItem,
                            j = 0, 
                            jxtbr = itemData.jxtbr, 
                            jxtbrArr = [];
                        for(j;j<jxtbr.length;j++){
                            jxtbrArr.push(jxtbr[j].name);
                        }
                        datalist.push(['<tr data-forewarn-id="' + itemData.controlId + '" data-subject="' + itemData.subject + '" data-object="' + itemData.object + '" data-occurrence="' + itemData.occurrence + '">',
                                        '<td class="width5">' + (i + 1 + count) + '</td>',
                                        '<td class="width10">' + itemData.controlMode + '</td>',
                                        '<td class="width10">' + itemData.number.replace('_vehicle','').replace('1_','大型车_').replace('2_','小型车_') + '</td>',
                                        '<td class="width10">' + itemData.controlLevelName + '</td>',
                                        '<td class="width10">' + itemData.targetName + '</td>',
                                        '<td class="width10">' + itemData.controlId + '</td>',
                                        '<td class="width15">' + (itemData.eventTime ? itemData.eventTime : '') + '</td>',
                                        '<td class="width10"><span class="control-content">' + (jxtbrArr.length > 0 ? jxtbrArr.join('&nbsp;') : '') + '</span></td>',
                                        '<td class="width15"><span class="control-content">' +  (itemData.event ? itemData.event : '')  + '</span></td>',
                                        '<td class="width5 to-graph"><span class="icon icon-tomappinganalysis"></span></td>',
                                    '</tr>'].join(''));
                        }
                }
                return datalist.join('');
                break;
            case 'controlList':
                var i = 0, datalist = [], arr = [], 
                data = obj.bodyData,
                count = (obj.pageNo - 1) * obj.pageSize,
                controlStatus = ['未审核','审核通过','已拒绝','已撤销'],
                operations = [
                    {
                        'user':[
                            ['repeal-btn', '撤销']
                        ],
                        'admin':[
                            ['repeal-btn', '撤销'],
                            ['verify-btn', '审批']
                        ]
                    },{
                        'user':[
                            ['repeal-btn', '撤销']
                        ],
                        'admin':[
                            ['repeal-btn', '撤销']
                        ]
                    },{
                        'user':[
                            ['commit-btn', '重新提交']
                        ],
                        'admin':[
                            ['commit-btn', '重新提交']
                        ]
                    },{
                        'user':[
                            ['commit-btn', '重新提交']
                        ],
                        'admin':[
                            ['commit-btn', '重新提交']
                        ]
                    }
                ];
                if(obj.totalCount > 0 && data.length == 0){
                    docParameters[type].pageNo = docParameters[type].pageNo - 1;
                }
                if(obj.totalCount == 0){
                    datalist.push(['<tr>',
                                    '<td colspan="10" class="isEmpty">暂无数据</td>',
                                '</tr>'].join(''));
                }else{
                    for(i;i<data.length;i++){
                        var itemData = data[i],
                            op = mining.utils.hasRoleForAction('controlRole') ? operations[itemData.status].admin : operations[itemData.status].user,
                            j = 0,
                            ops = ['<span class="operations details-btn icon-more" title="详细信息"></span>'];
                        for(j;j<op.length;j++){
                            var o = op[j];
                            ops.push('<span class="operations ' + o[0] + '" title="' + o[1] + '"></span>');
                        }
                        ops.push('&nbsp;<span class=" warn-view glyphicon glyphicon-eye-open" style="  cursor: pointer;" title="查看预警信息"> </span>');
                        datalist.push(['<tr>',
                                    '<td class="width5">' + (i + 1 + count) + '</td>',
                                    '<td class="width10">' + itemData.controlMode + '</td>',
                                    '<td class="width5">' + itemData.controlId + '</td>',
                                    '<td class="width10">' + (itemData.applyTime?itemData.applyTime:'') + '</td>',
                                    '<td class="width10">' + (itemData.controlUnit?itemData.controlUnit:'') + '</td>',
                                    '<td class="width10">' + (itemData.startTime?itemData.startTime:'') + '</td>',
                                    '<td class="width10">' + (itemData.endTime?itemData.endTime:'') + '</td>',
                                    '<td class="width5">' + (itemData.applicant?itemData.applicant:itemData.applicantId) + '</td>',
                                    '<td class="width10"><span class="control-content">' + (itemData.controlReason?itemData.controlReason:'') + '</span></td>',
                                    '<td class="width10"><span class="control-content split">' + (itemData.controlContent?itemData.controlContent:'') + '</span></td>',
                                    '<td class="width5"><span class="verify-status status' + itemData.status + '"' + (itemData.status==2?(' data-remark="' + (itemData.remark?itemData.remark:'') + '"'):'') + '>' + controlStatus[itemData.status] + '</span></td>',
                                    '<td class="width10" data-control-id="' + itemData.controlId + '">',
                                        ops.join(''),
                                    '</td>',
                                '</tr>'].join(''));
                    }
                }
                return datalist.join('');
                break;
            case 'detailTags':
                var i = 0, datalist = [],arr = [], data = obj.listObj;
                for(i;i<data.length;i++){
                    var itemData = data[i];
                    datalist.push('<option value="' + itemData.controlTargetId + '">' + itemData.controlTarget + '</option>');
                }
                arr = ['<select class="select">',
                            '<option value="default" selected>布控类型</option>',
                            datalist.join(''),
                        '</select>'];
                return arr.join('');
                break;
            case 'unitsList':
                var i = 0, datalist = [],arr = [], data = obj.listObj;
                for(i;i<data.length;i++){
                    var itemData = data[i];
                    datalist.push('<option value="' + itemData.controlUnitId + '">' + itemData.controlUnitName + '</option>');
                }
                arr = ['<select class="select">',
                            '<option value="default" selected>管控单位</option>',
                            datalist.join(''),
                        '</select>'];
                return arr.join('');
                break;
            case 'bubble':
                var i = 0, datalist = [],arr = [], data = obj.listObj;
                if(data.length == 0){
                    return '';
                }else{
                    for(i;i<data.length;i++){
                        var itemData = data[i];
                        datalist.push(['<div class="case-intro">',
                                '<p>' + itemData.controlId + '</p>',
                                '<p>' + itemData.eventTime + '</p>',
                                '<p>' + itemData.eventInfo + '</p>',
                            '</div>'].join(''));
                    }
                    return '<div class="case-box">' + datalist.join('') + '</div>';
                }
                break;
            default:
                break;
        }
    }

    var initPage = function(){
        if(!docParameters[currentType].isAppend){
            docParameters[currentType].pageNo = 1;
        }
        $page = $('.page-control');
        mining.utils.loadPage($page, function(){
            resetOrder();
            bannerForewarnAction();
            nav.init($('.control-box',$page),2);
        });

    }

    var resetOrder = function(){
        $(docParameters['forewarnList'].el + ' .data-list th.order-data[data-order-filed="lastEventTime"]',$page).removeClass('order-asc').addClass('order-desc')
            .siblings('.order-data')
            .removeClass('order-desc')
            .removeClass('order-asc');
        $(docParameters['forewarnDetails'].el + ' .data-list th.order-data[data-order-filed="eventTime"]',$page).removeClass('order-asc').addClass('order-desc')
            .siblings('.order-data')
            .removeClass('order-desc')
            .removeClass('order-asc');
        $(docParameters['controlList'].el + ' .data-list th.order-data[data-order-filed="applyTime"]',$page).removeClass('order-asc').addClass('order-desc')
            .siblings('.order-data')
            .removeClass('order-desc')
            .removeClass('order-asc');
    }

    var getData = function(type,p,fn){
        var params = [], url = '',dataInfo = null;
        if($.inArray(type, typeList) >= 0){
            params.push('pageNo=' + docParameters[type].pageNo);
            params.push('pageSize=' + pageSize);
        }

        url = dataUrl + docParameters[type].path + parameters + (p.length > 0 ? '&' + p.join('&') : '') + (params.length > 0 ? '&' + params.join('&') : '');
        
        dataLoad(url,function(data){
            if(fn){
                fn(data,type,docParameters[type].el);
            }else{
                dataInfo = data;
            }
        });
        if(dataInfo){
            return dataInfo;
        }
    }

    var renderData = function(datalist,type,el){
        var str = getTemplateHtml(type,datalist);
        if($.inArray(type, typeList) >= 0){
            if(docParameters[currentType].isAppend){
                $(el + ' .list-table table tbody',$page).append(str);
            }else{
                $(el + ' .list-table table tbody',$page).html(str);
            }
        }else{
            $(el ,$page).html(str);
        }
        tableAction(type);
        filterDataAction();
    }
    
    var bannerForewarnAction = function(){
        $('.goApp', $page).on('click', mining.utils.toAppHome);
        $('.control-forewarn-box',$page).removeClass('hidden').siblings('.control-box').addClass('hidden');
        $('.bread-nav .breadcrumb li:last-child',$page).text('布控预警');
        $('.control-box .control-tabs .tabs li',$page).off('click').on('click',function(){
            $(this).addClass('active').siblings().removeClass('active');
            var datatype = currentType = $(this).attr('data-type');
            resetOrder();
            $('.forewarn-control[data-box="' + datatype + '"]',$page).removeClass('hidden').siblings().addClass('hidden');
            // if($('.forewarn-control[data-box="' + datatype + '"] .data-list .list-table tbody tr',$page).length == 0){
                if(datatype == 'forewarnDetails'){
                    if($(docParameters["detailTags"].el).html().trim().length==0)
                        getData('detailTags',[],renderData);
                }
            filterData();
             //   getData(datatype,[],renderData);
                 mining.utils.serverLog(505,$(this).text());
            // }
        });

        // 默认加载
        $('.control-box .control-tabs li',$page).eq(1).click();
        
        $('.control-box .control-tabs .control-btn',$page).off('click').on('click',function(){
            createControl.create(false,function(){
                refreshList('controlList');
            });
            mining.utils.serverLog(530);
        });
        $('.control-box .control-tabs .control-batch-btn',$page).off('click').on('click',function(){
            createControl.create(true,function(){
                refreshList('controlList');
            });
            mining.utils.serverLog(510);
        });
        $('.control-box .control-tabs .control-list-btn',$page).off('click').on('click',function(){
            $('.control-list-box',$page).removeClass('hidden').siblings('.control-box').addClass('hidden');
            $('.bread-nav .breadcrumb li:last-child',$page).text('布控列表');
            var datatype = currentType = $(this).attr('data-type');
            resetOrder();
            if($('.control-box .control-list .control-units select',$page).length==0)
                getData('unitsList',[],renderData);
            filterData();
           // getData(datatype,[],renderData);
            bannerListAction();
        });
    }

    var refreshList = function(type){
        resetOrder();
        if(type == 'controlList'){
            $('.control-box .control-tabs .control-list-btn',$page).click();
        }else if(type == 'forewarnDetails'){
            $('.control-box .control-tabs li',$page).eq(1).click();
        }else if(type == 'forewarnList'){
            $('.control-box .control-tabs li',$page).eq(0).click();
        }
        
    }

    // 过滤条件
    var filterDataAction = function(){
        // 布控类型过滤
        $('.forewarn-control .filters .control-types select',$page).off('change').on('change',function(){
            docParameters[currentType].isAppend = false;
            docParameters[currentType].pageNo = 1;
            filterData();
            mining.utils.serverLog(508,$(this).find('option:selected').text());
        });
        $('.forewarn-control .filters .filters-tags span',$page).off('click').on('click',function(){
            if(initial){
                initial = false;
                $(this).siblings().removeClass('selected');
            }else{
                $(this).toggleClass('selected');
            }
            docParameters[currentType].isAppend = false;
            docParameters[currentType].pageNo = 1;
            filterData();
        });


        var opens = 'left';
        if(currentType == 'controlList'){
            opens = 'right';
        }

        //按周期模糊搜索
        $(docParameters[currentType].el + ' input[name=reservation]',$page).daterangepicker({
            opens: opens,
            format:'YYYY-MM-DD',
            applyClass: 'btn-primary',
            clearClass: 'btn-primary'
        }, function(start, end, label, action) {
            docParameters[currentType].isAppend = false;
            docParameters[currentType].pageNo = 1;
            filterData();
            if(currentType=="controlList")
                mining.utils.serverLog(531,start.format('YYYY-MM-DD')+','+end.format('YYYY-MM-DD'));
            else
                mining.utils.serverLog(507,start.format('YYYY-MM-DD')+','+end.format('YYYY-MM-DD'));
        }).on('clear.daterangepicker', function(){
            $(this).val('');
        });

        // 关键字搜索
        $('.control-box .searchbox .searchbox-btn',$page).off('click').on('click',function(){
            docParameters[currentType].isAppend = false;
            docParameters[currentType].pageNo = 1;
            filterData();
            if(currentType=="controlList")
                mining.utils.serverLog(532, $( docParameters[currentType].el+' .filters').find('.searchbox input.searchbox-ipt').val());
            else
                mining.utils.serverLog(509, $( docParameters[currentType].el+' .filters').find('.searchbox input.searchbox-ipt').val());
        });
        $('.control-box .searchbox .searchbox-ipt',$page).off('keyup').on('keyup', function (e) {
            if(e.keyCode == 13) {
                docParameters[currentType].isAppend = false;
                docParameters[currentType].pageNo = 1;
                filterData();
                 if(currentType=="controlList")
                    mining.utils.serverLog(532, $( docParameters[currentType].el+' .filters').find('.searchbox input.searchbox-ipt').val());
                else
                    mining.utils.serverLog(509, $( docParameters[currentType].el+' .filters').find('.searchbox input.searchbox-ipt').val());
            }
        });

        $('.control-box select',$page).select2({
            minimumResultsForSearch: Infinity
        });

        // 管控单位过滤
        $('.control-list .control-units select',$page).off('change').on('change',function(){
            docParameters[currentType].isAppend = false;
            docParameters[currentType].pageNo = 1;
            filterData();
              mining.utils.serverLog(533,$(this).find('option:selected').text());
        });
        // 状态过滤
        $('.control-list .control-status select',$page).off('change').on('change',function(){
            docParameters[currentType].isAppend = false;
            docParameters[currentType].pageNo = 1;
            filterData();
              mining.utils.serverLog(534,$(this).find('option:selected').text());
        });
        //布控方式
        $('.control-box .control-model select',$page).off('change').on('change',function(){
            docParameters[currentType].isAppend = false;
            docParameters[currentType].pageNo = 1;
            filterData();

              mining.utils.serverLog(535,$(this).find('option:selected').text());
        });
    }

    // 过滤数据
    var filterData = function(){
        var params = [],
            el = docParameters[currentType].el,
            filters = docParameters[currentType].filters,
            keyword = $(el + ' .filters .searchbox .searchbox-ipt',$page).val(),
            // startTime = docParameters[currentType].startTime,
            // endTime = docParameters[currentType].endTime,
            i = 0;
        docParameters[currentType].isFilter = true;
        docParameters[currentType].fixhead = true;
        for(i;i < filters.length;i++){
            var filter = filters[i],
                key = filter.keys,
                value = $(el + ' ' + filter.values,$page).val();
            if(value!='default'){
                params.push(key + '=' + value);
            }
        }

        
        // 起始时间
        // if(startTime.length > 0 || endTime.length > 0){
        //     params.push('startTime=' + startTime);
        //     params.push('endTime=' + endTime);
        // }
        if($(docParameters[currentType].el + ' input[name="reservation"]',$page).val()!=''){
            docParameters[currentType].startTime = $(docParameters[currentType].el + ' input[name="reservation"]',$page).data('daterangepicker').startDate.format('YYYY-MM-DD');
            docParameters[currentType].endTime = $(docParameters[currentType].el + ' input[name="reservation"]',$page).data('daterangepicker').endDate.format('YYYY-MM-DD');
            params.push('startTime=' + docParameters[currentType].startTime);
            params.push('endTime=' + docParameters[currentType].endTime);
        }
        // 关键字搜索
        if(keyword && keyword.length > 0){
            params.push('keyword=' + keyword);
        }
        if(docParameters[currentType].orderParams&&docParameters[currentType].orderParams.length>0)
            params=params.concat(docParameters[currentType].orderParams);
        getData(currentType,params,renderData);
    }

    var bannerListAction = function(){
        $('.control-box .control-tabs .control-btn',$page).off('click').on('click',function(){
            createControl.create(false,
                function(){
                    refreshList('controlList');
                }
            );
            mining.utils.serverLog(530);
        });
        $('.control-box .control-tabs .control-batch-btn',$page).off('click').on('click',function(){
            createControl.create(true,function(){
                refreshList('controlList');
            });
            mining.utils.serverLog(510);
        });
        $('.control-box .control-tabs .return-btn',$page).off('click').on('click',function(){
            $('.control-forewarn-box',$page).removeClass('hidden').siblings('.control-box').addClass('hidden');
            $('.bread-nav .breadcrumb li:last-child',$page).text('布控预警');
            $('.control-box .control-tabs li.active',$page).click();
        });
    }

    var tableAction = function(type){
        // 列表添加scrollbar
        $(docParameters[currentType].el + ' .data-list .list-table').mCustomScrollbar({
            theme: 'minimal',
            callbacks:{
                onTotalScroll: function(){
                    // ++pageNo;
                    docParameters[currentType].isAppend = true;
                    docParameters[currentType].pageNo = docParameters[currentType].pageNo + 1;
                    if(docParameters[currentType].isFilter){
                        // docParameters[currentType].isAppend = true;
                        filterData();
                    }else if(docParameters[currentType].isOrder){
                        // isAppend = true;
                        getData(currentType,docParameters[currentType].orderParams,renderData);
                    }else{
                        // docParameters[currentType].isAppend = true;
                        getData(currentType,[],renderData);
                    }
                }
            }
        });
        // if(docParameters[type].fixhead){
            fixedThead($(docParameters[currentType].el + ' .data-list .list-table',$page));

            //修正td宽度
            // $(docParameters[currentType].el + ' .data-list table .auto-width',$page).width($(docParameters[currentType].el + ' .data-list',$page).width() - docParameters[currentType].autowidth);
        // }


        $(docParameters[currentType].el + ' .data-list .fixedthead th.order-data',$page).off('click').on('click',function(){
            docParameters[currentType].isAppend = false;
            docParameters[currentType].isFilter = false;
            docParameters[currentType].isOrder = true;
            var $dataTable = $(docParameters[currentType].el + ' .data-list .list-table',$page);
            docParameters[currentType].orderParams = [];
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

            if($(docParameters[currentType].el + ' input[name="reservation"]',$page).val()!=''){
                docParameters[currentType].startTime = $(docParameters[currentType].el + ' input[name="reservation"]',$page).data('daterangepicker').startDate.format('YYYY-MM-DD');
                docParameters[currentType].endTime = $(docParameters[currentType].el + ' input[name="reservation"]',$page).data('daterangepicker').endDate.format('YYYY-MM-DD');
                docParameters[currentType].orderParams.push('startTime=' + docParameters[currentType].startTime);
                docParameters[currentType].orderParams.push('endTime=' + docParameters[currentType].endTime);
            }
            
            docParameters[currentType].pageNo = 1;
            docParameters[currentType].orderParams.push('orderByField=' + $(this).attr('data-order-filed'));
            docParameters[currentType].orderParams.push('order=' + $(this).attr('data-order'));
            filterData();
           // getData(currentType,docParameters[currentType].orderParams,renderData);
        });

        // 获取气泡需要的详细数据
        $('span.forewarn-event').popover({
                                trigger:'click',
                                placement:'left',
                                html:true,
                                content:function(){
                                    var $dataBox = $(this).parents('tr:first').find('td.eventList-data'),
                                        dataList = $dataBox.html(),
                                        eventList = null;
                                    $(this).parents('tr:first').siblings().find('div.popover').remove();
                                    if(dataList.length > 0){
                                        eventList = JSON.parse(dataList);
                                    }else{
                                        var params = [];
                                        params.push('controlId=' + $dataBox.attr('data-control-id'));
                                        eventList = getData('eventList',params);
                                        if(eventList){
                                            $dataBox.html(JSON.stringify(eventList));
                                        }
                                    }
                                    var eventlistHtml = getTemplateHtml('bubble',eventList);
                                    if(eventlistHtml.length == 0){
                                        return false;
                                    }else{
                                        return eventlistHtml;
                                    }
                                }
                            }).on('shown.bs.popover',function(){
                                $('.control-box .case-box').mCustomScrollbar({
                                    theme: 'minimal'
                                });
                            });

        
        $(document).off('click.bubble-close').on('click.bubble-close',function (e) {
            if(!($(e.target).parents('.popover').length > 0 || $(e.target).hasClass('popover')) && !$(e.target).hasClass('forewarn-event')){
                $('span.forewarn-event').popover('hide');
            }
        });

        //显示布控内容
        $('.data-list tbody .control-content').popover({
            trigger:'hover',
            placement:'left',
            html:true,
            content:function(){
                var text = $(this).text();
                if($(this).hasClass('split')){
                    var t = text.split(','), i = 0, arr = [];
                    for(i;i<t.length;i++){
                        arr.push(t[i]);
                    }
                    text = arr.join('</br>');
                }
                return text;
            }
        });

        //显示拒绝理由
        $('.controlList tbody .verify-status').popover({
            trigger:'hover',
            placement:'left',
            html:true,
            content:function(){
                var remarkInfo = $(this).attr('data-remark');
                return remarkInfo;
            }
        });

        $('.controlList tbody tr span.operations').off('click').on('click',function(e){
            e = e || window.event;
            if(e.preventDefault) {
                e.preventDefault();
                e.stopPropagation();
            }else{
                e.returnValue = false;
                e.cancelBubble = true;
            }
            if($(this).hasClass('repeal-btn')){
                var dataId = $(this).parent().attr('data-control-id');
                $dialog.confirm({
                    title: '撤销审核',
                    width: 220, height: 70,
                    padding: 0,
                    content:'是否撤销该布控申请？',
                    okValue: '确定',
                    ok: function(){
                        $ajax.ajax({
                            url: dataUrl + docParameters['revocation'].path,
                            type: 'post',
                            data:{
                            	applicantId: userId,
                            	controlId: dataId
                            },
                            success: function(data){
                                refreshList('controlList');
                            },
                            error: function(data){
                                mining.utils.alertMsg(data, '撤销布控申请失败，请稍后重试！', 'error');
                            }
                        });
                    },
                    cancelValue: '取消',
                    cancel: true,
                    onclose: function(){
                        $('.main').removeClass('blur');//去除背景模糊效果
                    }
                }).showModal();
                mining.utils.serverLog(537,dataId);
            }else if($(this).hasClass('verify-btn')){
               createControl.review({
                   id:$(this).parent().attr('data-control-id'),
                   fun:function(){
                       refreshList('controlList');
                   }
               });
                mining.utils.serverLog(536,$(this).parent().attr('data-control-id'));
            }else if($(this).hasClass('details-btn')){
                createControl.review({
                    id:$(this).parent().attr('data-control-id'),
                    detail:true,
                    fun:function(){
                        refreshList('controlList');
                    }
                });
                 mining.utils.serverLog(538,$(this).parent().attr('data-control-id'));
            }else{
                createControl.create(false,function(){
                        refreshList('controlList');
                    },$(this).parent().attr('data-control-id')
                );
                 mining.utils.serverLog(539,$(this).parent().attr('data-control-id'));
            }

        });
        $('.controlList tbody tr span.warn-view').off('click').on('click',function(e){
            var controlId=$(this).parent().attr('data-control-id');

            $('.control-forewarn-box',$page).removeClass('hidden').siblings('.control-box').addClass('hidden');
            $('.bread-nav .breadcrumb li:last-child',$page).text('布控预警');
            $( '.control-box .forewarn-control[data-box="forewarnDetails"] .filters .searchbox .searchbox-ipt',$page).val(controlId);
            $('.control-box .control-tabs li.active',$page).click();
        });
        // to-graph
        $(docParameters['forewarnDetails'].el + ' .data-list').off('click','.to-graph').on('click','.to-graph',function() {
            var $item = $(this).parents('tr:first'),
                dataSubject = $item.attr('data-subject'),
                dataObject = $item.attr('data-object'),
                dataOccurrence = $item.attr('data-occurrence');
            mining.utils.serverLog(506,dataSubject);
            $ajax.ajax({
                url: getEventDataUrl + '?subject=' + dataSubject + '&object=' + dataObject + '&occurrence=' + dataOccurrence,
                success: function(data){
                	if(!data.v){
                		$dialog.alert('未获取到主体信息！','warning');
                		return;
                	}
                    var dataForGraph = mining.utils.frmatEventData(data.v[0],data.event);
                    dataForGraph.v.push(data.v[0]);
                    showModule.show(dataForGraph, 'graph');
                },
                error: function(err){
                    console.log(err);
                }
            });

        })
    }

    //固定表头
    var fixedThead = function($tablewrap){
        var ths = '';
            //tableName = $tablewrap.find('table').attr('class').split(' ')[1];
        // docParameters[currentType].fixhead = false;
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
        init: initPage,
        refresh: refreshList
    }
});
