define(function(require){
    var $page = $('.page-event'),
        $mainBox;
    require('pagination');

    var userId = mining.userinfo.user_id,
        dataUrl = mining.baseurl.gongan + '/',
        docParameters = {
            'yjqbList':{
                'el':'.data-list .data-table table tbody',
                'path':'zdsj/yjqb/list'
            },
            'pagesCount':{
                'el':'.data-page .totalcount'
            },
            'pages':{
                'el':'.data-page .pages'
            },
            'tagsBox':{
                'el':'.data-list .label-tags-box .labels-panel'
            }
        },
        parameters = '?applicantId=' + userId,
        initial = true,
        isFilter = false,
        categoryIds = [],
        checkedData = [],
        labelsData = [],
        pageNo = 1,
        pageSize = 20;

    var reportdetail = require('./reportdetail'),
        addreport = require('./addreport'),
        labelTree = require('./labelTree');
    var getTemplateHtml = function (type, obj) {
        switch(type){
            case 'yjqbList':
                var i = 0, datalist = [], data = obj.bodyData;
                if(data.length == 0){
                    datalist.push(['<tr data-yjqb-id=""><td colspan="9" class="isEmpty">暂无数据</td></tr>'].join());
                }else{
                    for(i;i<data.length;i++){
                        var itemData = data[i],
                            j = 0,
                            arr = [];
                        datalist.push(['<tr data-yjqb-id="' + itemData.id + '">',
                                            '<td class="ellipsis width5"><input class="checkSingleBox" type="checkbox"></td>',
                                            '<td class="ellipsis width10" title="' + itemData.wh + '">' + itemData.wh + '</td>',
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
                break;
            case 'tagsBox':
                var categoryArr = [], labelsArr = [];
                $.each(obj.category,function(i,n){
                    categoryArr.push(['<div class="category-label category' + (i + 1) + '">',
                                    '<span class="tag-current" data-category-id="' + n + '">' + obj.categoryName[i] + '<span>',
                                '</div>'].join(''));
                });
                $.each(obj.labels,function(i,n){
                    labelsArr.push('<span class="tag-current" title="' + n + '">' + n + '<i class="scopaicon scopaicon-shanchuxiao del-tag"></i></span>');
                });
                return ['<div class="panel-box category-box">',
                            '<div class="panel-bar">',
                                '<div class="bar-title">分类标签</div>',
                            '</div>',
                            '<div class="panel-list">',
                                categoryArr.join(''),
                            '</div>',
                        '</div>',
                        '<div class="panel-box labels-box">',
                            '<div class="panel-bar">',
                                '<div class="bar-title">特征标签</div>',
                            '</div>',
                            '<div class="panel-list">',
                                '<div class="info-box">',
                                    labelsArr.join(''),
                                    '<span style="display: inline-block;"><input class="add-tags-input" type="text" placeholder="在此输入标签"/><span class="btn-current add-tag-btn"> + </span></span>',
                                '</div>',
                                '<div class="action-btn">',
                                    '<span class="btn-current btn-combination">组合串并</span>',
                                '</div>',
                            '</div>',
                        '</div>'].join('');
                break;
            default:
                break;
        }
    }

    var init = function(categoryId){
        userId = mining.userinfo.user_id;
        parameters = '?applicantId=' + userId;
        $mainBox = $('.list-container .intelligence',$page);
        categoryIds = [];
        resetValue(true);
        initial = true;
        if(categoryId){
            pageNo = 1;
            categoryIds = [].concat(categoryId);
            // categoryIds.push(categoryId);
            // resetValue(true);
            filterData();
        }else{
            getData('yjqbList',[]);
        }
        filterDataAction();
    }



    var getData = function(type,p){
        var params = [], url = '';
        if(type == 'yjqbList'){
            params.push('pageNo=' + pageNo);
            params.push('pageSize=' + pageSize);
        }
        url = dataUrl + docParameters[type].path + parameters + (p.length > 0 ? '&' + p.join('&') : '') + (params.length > 0 ? '&' + params.join('&') : '');
        dataLoad(url,function(data){
            renderData(data,type);
            if(type == 'yjqbList'){
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
                    getData('yjqbList',[]);
                }
            }
        }
    }

    var renderData = function(datalist,type){
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
            labelTree.init('intelligence',categoryIds,function(data){
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
                // getData('yjqbList',params);
            });
            mining.utils.serverLog(409);
        });

        //类型
        $('.filters .yjqb-types select',$mainBox).off('change').on('change',function(){
            initial = true;
            pageNo = 1;
            filterData();
            var typesLog = $('.filters .yjqb-types select',$mainBox).val();
            mining.utils.serverLog(411,typesLog);
        });

        // 关键字搜索
        $('.filters .searchbox .searchbox-btn',$mainBox).off('click').on('click',function(){
            initial = true;
            pageNo = 1;
            filterData();
            var keywordsLog = $('.filters .searchbox input.searchbox-ipt',$mainBox).val();
            mining.utils.serverLog(410,keywordsLog);
        });
        $('.filters .searchbox .searchbox-ipt',$mainBox).off('keyup').on('keyup', function (e) {
            if(e.keyCode == 13) {
                pageNo = 1;
                initial = true;
                filterData();
                var keywordsLog = $('.filters .searchbox input.searchbox-ipt',$mainBox).val();
                mining.utils.serverLog(410,keywordsLog);
            }
        });

        $('.filters',$mainBox).off('click','.btn-current.btn-combination').on('click','.btn-current.btn-combination',function(){
            $('.list-container .report-add',$page).removeClass('hidden');
            addreport.init(checkedData,'intelligence');
            mining.utils.serverLog(412);
        });

        $('.filters',$mainBox).off('click','.btn-current.btn-cancel').on('click','.btn-current.btn-cancel',function(){
            categoryIds = [];
            resetValue(true);
            initial = true;
            getData('yjqbList',[]);
            mining.utils.serverLog(413);
        });
    }

    // 过滤数据
    var filterData = function(){
        var params = [],
            $filter = $('.filters',$mainBox),
            types = $filter.find('.yjqb-types select').val(), // 获取情报类型
            keys = $filter.find('.searchbox input.searchbox-ipt').val(), //获取搜索关键字
            i = 0;
        isFilter = true;

        if(labelsData.length > 0){
            params.push('labels=' + labelsData.join(','));
        }

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
        getData('yjqbList',params);
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
            $('.data-list .label-tags-box',$mainBox).addClass('hidden').find('.labels-panel').empty();
            $('.data-list .data-box',$mainBox).removeClass('narrow');
            labelsData = [];
            checkedData = [];
        }
    }

    var tableAction = function(){
        // 添加scrollbar
        $(".data-list .data-table",$mainBox).mCustomScrollbar({
            theme: 'minimal'
        });
        // $(".data-list .label-tags-box",$mainBox).mCustomScrollbar({
        //     theme: 'minimal'
        // });
        

        fixedThead($('.data-list .data-table',$mainBox));
      
        // 展示详情
        $('.data-list .data-table table tbody tr',$mainBox).off('click').on('click',function(){
            var id = $(this).attr('data-yjqb-id');
            if(mining.utils.isEmpty(id))return;
            showDetailInfo(id);
        });
        checkListAction();
        if(checkedData.length > 0){
            $.each(checkedData,function(i,n){
                $('.data-list .data-table table tr[data-yjqb-id="' + n + '"] .checkSingleBox',$mainBox).prop('checked',true);
            });
            var nTotalCount = $('.data-list .data-table table tr .checkSingleBox',$mainBox).length,
                nSelectedCount = $('.data-list .data-table table tr .checkSingleBox:checked',$mainBox).length,
                $checkAll = $('table .checkAllBox',$mainBox);
            if(nSelectedCount == nTotalCount){
                //全选
                $checkAll.prop({'indeterminate':false,"checked":true});
            }else if(nSelectedCount == 0){
                //全不选
                $checkAll.prop({'indeterminate':false,"checked":false});
            }else{
                //未全选
                $checkAll.prop({"checked":false,'indeterminate':true});
            }
        }
    }

    var showDetailInfo = function(dataId){
        $('.list-container .report-detail',$page).removeClass('hidden');
        reportdetail.init(dataId,function(infoId,ids,categoryTexts,labelsTexts){
            pageNo = 1;
            categoryIds = ids;
            resetValue(true);
            $('.filters .btn-cancel',$mainBox).removeClass('hidden');
            $('.data-list .label-tags-box',$mainBox).removeClass('hidden');
            $('.data-list .data-box',$mainBox).addClass('narrow');
            fixedThead($('.data-list .data-table',$mainBox));
            renderData({category:ids,categoryName:categoryTexts,labels:labelsTexts},'tagsBox');
            $('.data-list .label-tags-box .labels-box .panel-list').mCustomScrollbar({
                theme: 'minimal'
            });
            $('.data-list .label-tags-box',$mainBox).off('click','.del-tag').on('click','.del-tag',function(){
                $(this).parents('span.tag-current:first').remove();
            });
            $('.data-list .label-tags-box',$mainBox).off('click','.add-tag-btn').on('click','.add-tag-btn',function(){
                var $newTagInput = $('.data-list .label-tags-box .add-tags-input',$mainBox);
                if(!mining.utils.isEmpty($newTagInput.val().trim())){
                    $(this).parents('span:first').before('<span class="tag-current">' + $newTagInput.val() + '<i class="scopaicon scopaicon-shanchuxiao del-tag"></i></span>');
                    $newTagInput.val('');
                }
            });
            $('.data-list .label-tags-box .btn-combination',$mainBox).off('click').on('click',function(){
                labelsData = [];
                $.each($('.data-list .label-tags-box .labels-box span.tag-current',$mainBox),function(i,n){
                    labelsData.push($(n).text());
                })
                filterData();
                mining.utils.serverLog(414);
            });
            $('.data-list .label-tags-box .btn-combination',$mainBox).click();
        },{sourceFrom:'intelligence',otherName:'情报收集详情'});
    }

    var checkListAction = function(){
        var $checkAll = $('table .checkAllBox',$mainBox),
            $checkSingle = $('.data-list .data-table table td:first-child',$mainBox);
        // var $checkAll = $('table .checkAllBox',$mainBox),
        //     $checkSingle = $('.data-list .data-table table .checkSingleBox',$mainBox);
        // 全选
        $checkAll.on('click',function(e){
            mining.utils.stopBubble(e);
            var checked = this.checked;
            $checkSingle.find('.checkSingleBox').prop("checked",checked);
            if(checked){
                $.each($checkSingle.find('.checkSingleBox'),function(){
                    checkedData.pushOnly($(this).parents('tr:first').attr('data-yjqb-id'));
                });
            }else{
                $.each($checkSingle.find('.checkSingleBox'),function(){
                    checkedData.remove($(this).parents('tr:first').attr('data-yjqb-id'));
                });
            }
            if(checkedData.length >= 2){
                $('.filters .btn-combination',$mainBox).removeClass('btn-current-disabled').addClass('btn-current');
            }else{
                $('.filters .btn-combination',$mainBox).removeClass('btn-current').addClass('btn-current-disabled');
            }
        });
        $checkSingle.on('click',function(e){
            mining.utils.stopBubble(e);
            if($(e.target).hasClass('checkSingleBox')){
                var checked = e.target.checked,
                    $nSelected = $('.data-list .data-table table .checkSingleBox:checked',$mainBox),
                    nSelectedCount = $nSelected.length,
                    nTotalCount = $checkSingle.length;
                $(e.target).prop('checked',checked);
                if(checked){
                    checkedData.pushOnly($(e.target).parents('tr:first').attr('data-yjqb-id'));
                }else{
                    checkedData.remove($(e.target).parents('tr:first').attr('data-yjqb-id'));
                }
                if(nSelectedCount == nTotalCount){
                    //全选
                    $checkAll.prop({'indeterminate':false,"checked":true});
                }else if(nSelectedCount == 0){
                    //全不选
                    $checkAll.prop({'indeterminate':false,"checked":false});
                }else{
                    //未全选
                    $checkAll.prop({"checked":false,'indeterminate':true});
                }
                if(checkedData.length >= 2){
                    $('.filters .btn-combination',$mainBox).removeClass('btn-current-disabled').addClass('btn-current');
                }else{
                    $('.filters .btn-combination',$mainBox).removeClass('btn-current').addClass('btn-current-disabled');
                }
            }
        });
    }


    //固定表头
    var fixedThead = function($tablewrap){
        var ths = '';
        $('th',$tablewrap).each(function(){
            ths += '<th class="' + $(this).attr('class') + '" data-order-filed="' + $(this).attr('data-order-filed') + '" style="text-align:center;">' + $(this).html() + '</th>';
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
        init: init,
        showDetail: showDetailInfo
    }
});
