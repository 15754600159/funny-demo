define(function(require){
    var $page = $('.page-event'),
        $mainBox;
    require('pagination');

    var userId = 'admin',//mining.userinfo.user_id,
        dataUrl = mining.baseurl.gongan + '/',
        docParameters = {
            'yjsbList':{
                'el':'.data-list .data-table table tbody',
                'path':'zdsj/yjsb/list'
            },
            'pagesCount':{
                'el':'.data-page .totalcount'
            },
            'pages':{
                'el':'.data-page .pages'
            }
        },
        parameters = '?applicantId=' + userId,
        initial = true,
        isFilter = false,
        categoryIds = [],
        pageNo = 1,
        pageSize = 20;

    var reportdetail = require('./reportdetail'),
        addreport = require('./addreport'),
        labelTree = require('./labelTree');
    var getTemplateHtml = function (type, obj) {
        switch(type){
            case 'yjsbList':
                var i = 0, datalist = [], data = obj.bodyData;
                if(data.length == 0){
                    datalist.push(['<tr data-yjsb-id=""><td colspan="9" class="isEmpty">暂无数据</td></tr>'].join());
                }else{
                    for(i;i<data.length;i++){
                        var itemData = data[i],
                            j = 0,
                            arr = [];
                        datalist.push(['<tr data-yjsb-id="' + itemData.id + '">',
                                            '<td class="ellipsis width15" title="' + itemData.wh + '">' + itemData.wh + '</td>',
                                            '<td class="ellipsis width20" title="' + itemData.bt + '">' + itemData.bt + '</td>',
                                            '<td class="ellipsis width10" title="' + (itemData.category || '') + '">' + (itemData.category || '') + '</td>',
                                            '<td class="ellipsis width10" title="' + itemData.jjcd + '">' + itemData.jjcd + '</td>',
                                            '<td class="ellipsis width10" title="' + itemData.tbsj + '">' + itemData.tbsj + '</td>',
                                            '<td class="ellipsis width15" title="' + itemData.fwdw + '">' + itemData.fwdw + '</td>',
                                            '<td class="ellipsis width10" title="' + itemData.type + '">' + itemData.type + '</td>',
                                            '<td class="ellipsis width10" title="' + itemData.clzt + '">' + itemData.clzt + '</td>',
                                        '</tr>'].join(''));
                    }
                }
                return datalist.join('');
                break;
            case 'pagesCount':
                return ['共 <span class="total">' + obj.totalCount + '</span> 条数据，分 <span>' + obj.pagesCount + '</span> 页'].join('');
                break
            default:
                break;
        }
    }

    var init = function(categoryId){
        userId = mining.userinfo.user_id;
        parameters = '?applicantId=' + userId;
        $mainBox = $('.list-container .report',$page);
        categoryIds = [];
        initial = true;
        if(categoryId){
            categoryIds.push(categoryId);
            filterData();
        }else{
            getData('yjsbList',[]);
        }
        filterDataAction();
    }


    var getData = function(type,p){
        var params = [], url = '';
        if(type == 'yjsbList'){
            params.push('pageNo=' + pageNo);
            params.push('pageSize=' + pageSize);
        }
        url = dataUrl + docParameters[type].path + parameters + (p.length > 0 ? '&' + p.join('&') : '') + (params.length > 0 ? '&' + params.join('&') : '');
        dataLoad(url,function(data){
            renderData(data,type);
            if(type == 'yjsbList'){
                renderPages(data);
            }
        });
    }

    var renderPages = function(data){
        var pagesCount = Math.ceil(data.totalCount / pageSize);
        // render pageCount
        var pagesCountData = {
            totalCount: data.totalCount,
            pagesCount: pagesCount
        };
        renderData(pagesCountData,'pagesCount');
        // render pages
        var pagesData = {
            num_edge_entries:2,
            num_display_entries:4,
            callback:changePage,
            items_per_page:1,
            link_to:'javascript:;',
            current_page:(pageNo - 1),
            prev_text:'<i></i>',
            next_text:'<i></i>'
        };
        $(docParameters['pages'].el,$mainBox).pagination(pagesCount,pagesData);
        function changePage(pageIndex){
            pageNo = (pageIndex + 1);
            if(!(initial && pageNo == 1)){
                initial = false;
                if(isFilter){
                    filterData();
                }else{
                    getData('yjsbList',[]);
                }
            }
        }
    }

    var renderData = function(datalist,type,el){
        var str = getTemplateHtml(type,datalist),
            $el = $(docParameters[type].el,$mainBox);
        $el.html(str);
        tableAction();
    }

    // 过滤条件
    var filterDataAction = function(){
        $('.filters select',$mainBox).select2({
            minimumResultsForSearch: Infinity
        });

        // 标签
        $('.filters .label-filter',$mainBox).off('click').on('click',function(){
            var that = this;
            labelTree.init('report',categoryIds,function(data){
                var len = data.length,
                    params = [];
                categoryIds = [];
                pageNo = 1;
                $.each(data,function(i,n){
                    categoryIds.push(n.id);
                });
                resetValue();
                initial = true;
                // params.push('category=' + categoryIds.join(','));
                filterData();
                // getData('yjsbList',params);
            });
            mining.utils.serverLog(415);
        });

        //类型
        $('.filters .yjsb-types select',$mainBox).off('change').on('change',function(){
            initial = true;
            pageNo = 1;
            filterData();
            var typesLog = $('.filters .yjsb-types select',$mainBox).val();
            mining.utils.serverLog(417,typesLog);
        });

        // 关键字搜索
        $('.filters .searchbox .searchbox-btn',$mainBox).off('click').on('click',function(){
            initial = true;
            pageNo = 1;
            filterData();
            var keywordsLog = $('.filters .searchbox input.searchbox-ipt',$mainBox).val();
            mining.utils.serverLog(416,keywordsLog);
        });
        $('.filters .searchbox .searchbox-ipt',$mainBox).off('keyup').on('keyup', function (e) {
            if(e.keyCode == 13) {
                initial = true;
                pageNo = 1;
                filterData();
                var keywordsLog = $('.filters .searchbox input.searchbox-ipt',$mainBox).val();
                mining.utils.serverLog(416,keywordsLog);
            }
        });

        $('.filters .btn-combination',$mainBox).off('click').on('click',function(){
            var ids = [];
            $('.list-container .report-add',$page).removeClass('hidden');
            addreport.init([],'report');
            mining.utils.serverLog(418);
        });
    }

    // 过滤数据
    var filterData = function(){
        var params = [],
            $filter = $('.filters',$mainBox),
            types = $filter.find('.yjsb-types select').val(), // 获取情报类型
            keys = $filter.find('.searchbox input.searchbox-ipt').val(), //获取搜索关键字
            i = 0;
        isFilter = true;

        if(categoryIds.length > 0){
            params.push('category=' + categoryIds.join(','));
        }

        // 类型
        if(types!='default'){
            params.push('type='+ types);
        }
        // 关键字搜索 
        if(keys && keys.length > 0){
            params.push('labels=' + keys);
        }
        getData('yjsbList',params);
    }

    var resetValue = function(isResetSelect){
        if(categoryIds.length > 0){
            $('.filters .label-filter',$mainBox).text('已选标签  ' + categoryIds.length);
        }else{
            $('.filters .label-filter',$mainBox).text('标签选择');
        }
        if(isResetSelect){
            $('.filters .yjqb-types select',$mainBox).select2('val','default');
            $('.filters .searchbox .searchbox-btn',$mainBox).val('');
            $('.filters .btn-combination',$mainBox).removeClass('btn-current').addClass('btn-current-disabled');
            $('.filters .btn-cancel',$mainBox).addClass('hidden');
            checkedData = [];
        }
    }

    var tableAction = function(){
        // 添加scrollbar
        $(".data-list .data-table",$mainBox).mCustomScrollbar({
            theme: 'minimal'
        });

        fixedThead($('.data-list .data-table',$mainBox));
      
        // 展示详情
        $('.data-list .data-table table tbody tr',$mainBox).off('click').on('click',function(){
            var id = $(this).attr('data-yjsb-id');
            if(mining.utils.isEmpty(id))return;
            showDetailInfo(id);
        });

    }

    var showDetailInfo = function(dataId){
        $('.list-container .report-detail',$page).removeClass('hidden');
        reportdetail.init(dataId,null,{sourceFrom:'report',otherName:'报送管理详情'});
    }

    //固定表头
    var fixedThead = function($tablewrap){
        var ths = '';
        $('th',$tablewrap).each(function(){
            ths += '<th class="' + $(this).attr('class') + '" data-order-filed="' + $(this).attr('data-order-filed') + '" style="width:' + $(this).outerWidth() + 'px;text-align:center;">' + $(this).html() + '</th>';
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
        init: init
    }
});
