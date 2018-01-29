define(function(require){
    var $page = $('.page-event'),
        $mainBox;
    require('echarts');

    var userId = mining.userinfo.user_id,
        dataUrl = mining.baseurl.gongan + '/',
        docParameters = {
            'yjqbDetail':{
                'el':'.list-container .report-detail',
                'path':'zdsj/yjqb/info'
            },
            'relatedInfo':{
                'el':'.detail-related .relatedInfo table tbody',
                'path':'associate/qingbao'
            },
            'relatedPerson':{
                'el':'.detail-related .relatedPerson table tbody',
                'path':'associate/skeleton'
            },
            'relatedEvents':{
                'el':'.detail-related .relatedEvents table tbody',
                'path':'associate/event'
            }
        },
        parameters = '?applicantId=' + userId,
        downloadFile = mining.baseurl.host + ':18080/sjz/gongan/zdsj/yjsb/fj/download',
        yjqbSuggest = dataUrl + 'zdsj/yjqb/suggest' + parameters,
        labelsUpdateUrl = dataUrl + 'zdsj/labels/update' + parameters,
        tagModifyUrl = mining.baseurl.apphost + '/tuning/services/sjz/gongan/zdsj/yjqb/nlp/event_tag_modify',
        filterTagsUrl = mining.baseurl.apphost + '/tuning/services/sjz/gongan/zdsj/yjqb/nlp/filterTags',
        initial = true,
        sourceFrom = '',
        otherName = '',
        pageNo = 1,
        pageSize = 30,
        dataOriginal = null,
        getGroupData = require('./getGroupData');

    var getTemplateHtml = function (type, obj) {
        switch(type){
            case 'yjqbDetail':
                var data = obj.listObj[0], 
                    categoryArr = [], 
                    labelsArr = [], 
                    fjArr = [],
                    baseInfo = [],
                    membersArr = [],
                    tagInset = getTemplateHtml('tagInsert');
                dataOriginal = data;
                labelsArr = getTemplateHtml('tagsInfo',data.labels);

                // $.each(data.labels,function(i,n){
                    // labelsArr.push('<span class="tag-current" title="' + n + '">' + n + '<i class="scopaicon scopaicon-shanchuxiao del-tag"></i></span>');
                // });
                $.each(data.fj,function(k,v){
                    fjArr.push('<li><a href="javascript:;" class="attachment-btn" data-fjid="' + v.id + '" title="' + v.name + '">' + v.name + '</a> </li>');//<input type="checkbox">
                });
                $.each(data.category,function(i,n){
                    $.each(n,function(categoryId,categoryValue){
                        categoryArr.push(['<div class="category-label category' + (i + 1) + '">',
                                        '<span class="tag-current" data-category-id="' + categoryId + '">' + categoryValue + '<span>',
                                    '</div>'].join(''));
                    });
                });
                if(data.type == '事件预警'){
                    if(data.zdry){
                        $.each(data.zdry,function(k,v){
                            membersArr.push(v.name);
                        });
                    }
                    baseInfo = ['<li class="ellipsis" title="' + data.xxwh + '"><span>信息文号：</span><b>' + data.xxwh + '</b> </li>',
                                '<li class="ellipsis" title="' + data.type + '"><span>情报类型：</span><b>' + data.type + '</b></li>',
                                '<li class="ellipsis" title="' + membersArr.join('  ') + '"><span>骨干人员姓名：</span><b>' + membersArr.join('  ') + '</b></li>',
                                '<li class="ellipsis" title="' + data.sjgm + '"><span>事件规模：</span><b>' + data.sjgm + '</b> </li>',
                                '<li class="ellipsis" title="' + data.jjcs + '"><span>聚集场所：</span><b>' + data.jjcs + '</b></li>',
                                '<li class="ellipsis" title="' + data.sjfw + '"><span>事件范围：</span><b>' + data.sjfw + '</b> </li>',
                                '<li class="ellipsis" title="' + data.hxsq + '"><span>目标诉求：</span><b>' + data.hxsq + '</b></li>',
                                '<li class="ellipsis" title="' + data.cjdw + '"><span>报送单位：</span><b>' + data.cjdw + '</b></li>',
                                '<li class="ellipsis" title="' + data.cjsj + '"><span>报送时间：</span><b>' + data.cjsj + '</b></li>'];
                }else{
                    baseInfo = ['<li class="ellipsis" title="' + data.xxwh + '"><span>信息文号：</span><b>' + data.xxwh + '</b> </li>',
                                '<li class="ellipsis" title="' + data.type + '"><span>情报类型：</span><b>' + data.type + '</b></li>',
                                '<li class="ellipsis" title="' + data.cjdw + '"><span>报送单位：</span><b>' + data.cjdw + '</b></li>',
                                '<li class="ellipsis" title="' + data.cjsj + '"><span>报送时间：</span><b>' + data.cjsj + '</b></li>'];
                }
                return ['<div class="detail-title">' + otherName + '-' + data.type + '</div>',
                        '<div class="detail-content" data-detail-id="' + data.id + '">',
                            '<div class="detail-left pull-left">',
                                '<div class="base-info">',
                                    '<ul class="top-label">',
                                        baseInfo.join(''),
                                    '</ul>',
                                '</div>',
                                '<div class="title ellipsis" title="' + data.bt + '">' + data.bt + '</div>',
                                '<div class="content">',
                                    '<div class="content-box">',
                                        data.xxzw,
                                    '</div>',
                                '</div>',
                                '<div class="attachment-box"> 附件：',//<a class="attachment-btn checkAllFj">全选</a> <a class="attachment-btn downFj">下载</a>
                                    '<div class="attachment-list">',
                                        '<ul>',
                                            fjArr.join(''),
                                        '</ul>',
                                    '</div>',
                                '</div>',
                            '</div>',
                            '<div class="detail-right pull-right">',
                                '<div class="detail-toolbar">',
                                    (sourceFrom == 'report' ? '' : '<span class="btn-current btn-intelligence">情报串并</span><span class="btn-current btn-suggest">情报反馈</span>'),
                                    '<span class="btn-current btn-to-file">群体档案</span>',
                                '</div>',
                                '<div class="detail-labels-panel">',
                                    '<div class="panel-box category-box">',
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
                                                tagInset,
                                            '</div>',
                                            '<div class="action-btn">',
                                                '<span class="' + (labelsArr.length > 0 ? 'btn-current' : 'btn-current-disabled') + ' btn-combination">保存标签</span>',
                                            '</div>',
                                        '</div>',
                                    '</div>',
                                '</div>',
                            '</div>',
                        '</div>',
                        '<div class="detail-related">',
                            '<div class="tab tab-related">',
                                '<ul>',
                                    '<li serverLog="427" tab="relatedInfo">关联情报</li>',
                                    '<li tab="relatedPerson" class="hidden">关联重点人</li>',
                                    '<li serverLog="428" tab="relatedEvents">关联事件</li>',
                                '</ul>',
                            '</div>',
                            '<div class="related-box relatedInfo hidden">',
                                '<table class="grid tablesorter newtable">',
                                    '<thead>',
                                        '<tr>',
                                            '<th class="ellipsis width5">序号</th>',
                                            '<th class="ellipsis width15">信息文号</th>',
                                            '<th class="ellipsis width15">情报标题</th>',
                                            '<th class="ellipsis width10">群体类别</th>',
                                            '<th class="ellipsis width10">紧急程度</th>',
                                            '<th class="ellipsis width10">填报时间</th>',
                                            '<th class="ellipsis width15">报送单位</th>',
                                            '<th class="ellipsis width10">情报类型</th>',
                                            '<th class="ellipsis width10">处理状态</th>',
                                        '</tr>',
                                    '</thead>',
                                    '<tbody></tbody>',
                                '</table>',
                            '</div>',
                            '<div class="related-box relatedPerson hidden">',
                                '<table class="grid tablesorter newtable">',
                                    '<thead>',
                                        '<tr>',
                                            '<th class="ellipsis width5">序号</th>',
                                            '<th class="ellipsis width15">信息文号</th>',
                                            '<th class="ellipsis width15">情报标题</th>',
                                            '<th class="ellipsis width10">群体类别</th>',
                                            '<th class="ellipsis width10">紧急程度</th>',
                                            '<th class="ellipsis width10">填报时间</th>',
                                            '<th class="ellipsis width15">报送单位</th>',
                                            '<th class="ellipsis width10">情报类型</th>',
                                            '<th class="ellipsis width10">处理状态</th>',
                                        '</tr>',
                                    '</thead>',
                                    '<tbody></tbody>',
                                '</table>',
                            '</div>',
                            '<div class="related-box relatedEvents hidden">',
                                '<table class="grid tablesorter newtable">',
                                    '<thead>',
                                        '<tr>',
                                            '<th class="ellipsis width5">序号</th>',
                                            '<th class="ellipsis width15">事件编号</th>',
                                            '<th class="ellipsis width15">事件名称</th>',
                                            '<th class="ellipsis width10">群体类别</th>',
                                            '<th class="ellipsis width10">事件规模</th>',
                                            '<th class="ellipsis width15">聚集场所</th>',
                                            '<th class="ellipsis width20">处理结果</th>',
                                            '<th class="ellipsis width10">事发时间</th>',
                                        '</tr>',
                                    '</thead>',
                                    '<tbody></tbody>',
                                '</table>',
                            '</div>',
                        '</div>'].join('');
                break;
            case 'suggestDialog':
                return ['<div class="suggest-dialog" data-detail-id="' + obj.id + '">',
                            '<div class="title" title="">' + obj.title + '</div>',
                            '<div class="description-info">',
                                obj.content,
                            '</div>',
                            '<div class="suggest-box">',
                                '<div class="panel-title pull-left">',
                                    '<span>| </span>处理意见',
                                '</div>',
                                '<div class="input-box pull-left">',
                                    '<textarea name="suggest-info" class="suggest-info" placeholder=""></textarea>',
                                '</div>',
                            '</div>',
                        '</div>'].join('');
                break;
            case 'relatedInfo':
                var i = 0, datalist = [], data = obj.obj,len = (data.length > 5 ? 5 : data.length);
                if(data.length == 0){
                    datalist.push(['<tr data-item-id=""><td colspan="7" class="isEmpty">暂无数据</td></tr>'].join());
                }else{
                    for(i;i<len;i++){
                        var itemData = data[i],
                            j = 0;
                        datalist.push(['<tr data-item-id="' + itemData.id + '">',
                                            '<td class="ellipsis width5">' + (i + 1) + '</td>',
                                            '<td class="ellipsis width15">' + (itemData.wh || '') + '</td>',
                                            '<td class="ellipsis width15" title="' + (itemData.bt || '') + '">' + (itemData.bt || '') + '</td>',
                                            '<td class="ellipsis width10">' + (itemData.category || '') + '</td>',
                                            '<td class="ellipsis width10">' + (itemData.jjcd || '') + '</td>',
                                            '<td class="ellipsis width10">' + (itemData.tbsj || '') + '</td>',
                                            '<td class="ellipsis width15">' + (itemData.fwdw || '') + '</td>',
                                            '<td class="ellipsis width10">' + (itemData.type || '') + '</td>',
                                            '<td class="ellipsis width10">' + (itemData.clzt || '') + '</td>',
                                        '</tr>'].join(''));
                    }
                }
                return datalist.join('');
                break;
            case 'relatedPerson':
                var i = 0, datalist = [], data = obj.obj,len = (data.length > 5 ? 5 : data.length);
                if(data.length == 0){
                    datalist.push(['<tr data-item-id=""><td colspan="7" class="isEmpty">暂无数据</td></tr>'].join());
                }else{
                    for(i;i<len;i++){
                        var itemData = data[i],
                            j = 0;
                        datalist.push(['<tr data-item-id="' + itemData.id + '">',
                                            '<td class="ellipsis width5">' + (i + 1) + '</td>',
                                            '<td class="ellipsis width15">' + (itemData.xxwh || '') + '</td>',
                                            '<td class="ellipsis width15" title="' + (itemData.bt || '') + '">' + (itemData.bt || '') + '</td>',
                                            '<td class="ellipsis width10">' + (itemData.category[0] || '') + '</td>',
                                            '<td class="ellipsis width10">' + (itemData.jjcd || '') + '</td>',
                                            '<td class="ellipsis width10">' + (itemData.tbsj || '') + '</td>',
                                            '<td class="ellipsis width15">' + (itemData.fwdw || '') + '</td>',
                                            '<td class="ellipsis width10">' + (itemData.type || '') + '</td>',
                                            '<td class="ellipsis width10">' + (itemData.clzt || '') + '</td>',
                                        '</tr>'].join(''));
                    }
                }
                return datalist.join('');
                break;
            case 'relatedEvents':
                var i = 0, datalist = [], data = obj.obj,len = (data.length > 5 ? 5 : data.length);
                if(data.length == 0){
                    datalist.push(['<tr data-item-id=""><td colspan="7" class="isEmpty">暂无数据</td></tr>'].join());
                }else{
                    for(i;i<len;i++){
                        var itemData = data[i],
                            j = 0;
                        datalist.push(['<tr data-item-id="' + itemData.id + '">',
                                            '<td class="ellipsis width5">' + (i + 1) + '</td>',
                                            '<td class="ellipsis width15">' + (itemData.id || '') + '</td>',
                                            '<td class="ellipsis width15">' + (itemData.name || '') + '</td>',
                                            '<td class="ellipsis width10">' + (itemData.type || '') + '</td>',
                                            '<td class="ellipsis width10">' + (itemData.sjgm || '') + '</td>',
                                            '<td class="ellipsis width15">' + (itemData.jjcs || '') + '</td>',
                                            '<td class="ellipsis width20">' + (itemData.cljg || '') + '</td>',
                                            '<td class="ellipsis width10">' + (itemData.sfsj || '') + '</td>',
                                        '</tr>'].join(''));
                    }
                }
                return datalist.join('');
                break;
            case 'tagsInfo':
                var labelsArr = [];
                $.each(obj,function(i,n){
                    labelsArr.push('<span class="tag-current" title="' + n + '">' + n + '<i class="scopaicon scopaicon-shanchuxiao del-tag"></i></span>');
                });
                return labelsArr;
                break;
            case 'tagInsert':
                return '<span style="display: inline-block;"><input class="add-tags-input pull-left" type="text" placeholder="在此输入标签"/><span class="btn-current add-tag-btn pull-left"> + </span></span>';
                break;
            default:
                break;
        }
    }

    var init = function(dataId,callback,source){
        userId = mining.userinfo.user_id;
        parameters = '?applicantId=' + userId;
        yjqbSuggest = dataUrl + 'zdsj/yjqb/suggest' + parameters;
        labelsUpdateUrl = dataUrl + 'zdsj/labels/update' + parameters;
        tagModifyUrl = mining.baseurl.apphost + '/tuning/services/sjz/gongan/zdsj/yjqb/nlp/event_tag_modify';
        filterTagsUrl = mining.baseurl.apphost + '/tuning/services/sjz/gongan/zdsj/yjqb/nlp/filterTags';
        if(source){
            sourceFrom = source.sourceFrom;
            otherName = source.otherName;
        }
        $('.bread-nav .breadcrumb li.tab-other',$page).removeClass('hidden').text(otherName);
        $mainBox = $('.list-container .report-detail',$page);
        $(docParameters['yjqbDetail'].el).empty();
        var params = [];
        params.push('id=' + dataId);
        getData('yjqbDetail',params,callback,source);
        //if(window.location.host.indexOf('qbbigdata') == -1 && window.location.host.indexOf('1gongan') == -1){
            filterTagsAction();
        //}
    }

    var getData = function(type,p,callback,source){
        var params = [], url = '';
        url = dataUrl + docParameters[type].path + parameters + (p.length > 0 ? '&' + p.join('&') : '') + (params.length > 0 ? '&' + params.join('&') : '');
        dataLoad(url,function(data){
            renderData(data,type,callback);
        });
    }

    var renderData = function(datalist,type,callback,source){
        if(source){
                datalist.sourceForm = source;
            }
        var str = getTemplateHtml(type,datalist),
            $el = $(docParameters[type].el);
        $el.html(str);
        if(type == 'yjqbDetail'){
            tableAction();
            btnsAction(callback);
        }
    }

    var filterTagsAction = function(){
        $ajax.ajax({
            url: filterTagsUrl,
            data: {
                userID: userId,
                caseID: dataOriginal.id,
                labels: dataOriginal.labels,
                title: dataOriginal.bt,
                content: $(dataOriginal.xxzw).text()
            },
            type: 'post',
            success: function(result){
                if(result.statusCode == '200'){
                    var tagsInfoHtml = getTemplateHtml('tagsInfo',result.labels).join(''),
                        tagInsertHtml = getTemplateHtml('tagInsert');
                    $mainBox.find('.detail-content .labels-box .panel-list .info-box').html(tagsInfoHtml + tagInsertHtml);
                }
            },
            error: function(err){
                console.log(err);
            }
        });
    }


    var btnsAction = function(callback){
        $mainBox.find('.detail-toolbar .btn-intelligence').off('click').on('click',function(){
            var categoryIds = [], 
                categoryTexts = [], 
                labelsTexts = [], 
                infoId = $('.detail-content',$mainBox).attr('data-detail-id');
            $.each($mainBox.find('.category-label .tag-current[data-category-id]'),function(){
                categoryIds.push($(this).attr('data-category-id'));
                categoryTexts.push($(this).text());
            });
            $.each($mainBox.find('.labels-box .tag-current'),function(){
                labelsTexts.push($(this).text());
            });
            $mainBox.addClass('hidden');
            $('.bread-nav .breadcrumb li.tab-other',$page).empty().addClass('hidden');
            if(callback){
                callback(infoId,categoryIds,categoryTexts,labelsTexts);
            }
            mining.utils.serverLog(423);
        });
        $mainBox.find('.detail-toolbar .btn-suggest').off('click').on('click',function(){
            $dialog({
                title:'反馈',
                width: 558,
                height: 279,
                onshow:function(){
                    var $dlg = this, $node = $(this.node);
                    var dataObj = {
                        id:$('.page-event .list-container .report-detail .detail-content').attr('data-detail-id'),
                        title: $('.page-event .list-container .report-detail .detail-content>.detail-left>.title').text(),
                        content:$('.page-event .list-container .report-detail .detail-content>.detail-left>.content .content-box').text()
                    };
                    var dialogHtml = getTemplateHtml('suggestDialog',dataObj);
                    $dlg.content(dialogHtml);
                    
                },
                okValue: '确定',
                ok: function(){
                    var dataId = $('.page-event .list-container .report-detail .detail-content').attr('data-detail-id');
                    $ajax.ajax({
                        url: yjqbSuggest + '&id=' + dataId + '&suggest=' + $('.suggest-dialog .suggest-box .input-box .suggest-info').val(),
                        success: function(data){
                            $dialog.alert('反馈成功');
                        },
                        error: function(err){
                            console.log(err);
                        }
                    });
                    mining.utils.serverLog(424);
                },
                cancelValue: '取消',
                cancel: true,
                onclose: function(){
                    // $('.main').removeClass('blur');//去除背景模糊效果
                }
            }).showModal();
        });
        $mainBox.find('.detail-toolbar .btn-to-file').off('click').on('click',function(){
            $('.bread-nav .breadcrumb li.tab-other',$page).empty().addClass('hidden');
            var categoryId = '';
            categoryId = $mainBox.find('.category-label .tag-current[data-category-id]:last').attr('data-category-id');
            getGroupData.get(categoryId);
            mining.utils.serverLog(425);
        });
    }

    var tableAction = function(){
        var opTags = {
            delete: [], 
            add: []
        };  


        $mainBox.find('.detail-content .base-info').mCustomScrollbar({
            theme: 'minimal'
        });
        $mainBox.find('.detail-content .detail-labels-panel').mCustomScrollbar({
            theme: 'minimal'
        });
        $mainBox.find('.detail-content .content').mCustomScrollbar({
            theme: 'minimal'
        });
        $mainBox.find('.detail-content .attachment-list').mCustomScrollbar({
            theme: 'minimal'
        });
        $mainBox.find('.detail-content .labels-box .panel-list').mCustomScrollbar({
            theme: 'minimal'
        });

        
        $mainBox.find('.detail-content .detail-left .attachment-box .checkAllFj').off('click').on('click',function(){
            var $lis = $mainBox.find('.detail-content .attachment-box .attachment-list li'),
                $lisChecked = $mainBox.find('.detail-content .attachment-box .attachment-list li.checked');
            if($lis.length == $lisChecked.length){
                $lis.removeClass('checked').find('input[type="checkbox"]').prop('checked',false);
            }else{
                $lis.addClass('checked').find('input[type="checkbox"]').prop('checked',true);
            }
        });
        $mainBox.find('.detail-content .detail-left .attachment-box .attachment-list li input[type="checkbox"]').off('click').on('click',function(){
            var checked = this.checked;
            if(checked){
                $(this).parents('li:first').addClass('checked');
            }else{
                $(this).parents('li:first').removeClass('checked');
            }
        });
        $mainBox.find('.detail-content .attachment-box .attachment-list li a').off('click').on('click',function(){
            var fjId = $(this).attr('data-fjid');
            mining.utils.fileDownload(downloadFile,{applicantId:userId,id:fjId},'get');
        });
        $mainBox.find('.detail-content .detail-left .attachment-box .downFj').off('click').on('click',function(){
            $mainBox.find('.detail-content .attachment-box .attachment-list li.checked a').click();
        });

        $('.detail-content .labels-box',$mainBox).off('click','.del-tag').on('click','.del-tag',function(){
            var $cTag = $(this).parents('span.tag-current:first');
            opTags.delete.push($cTag.attr('title'));
            $cTag.remove();
            if($('.detail-content .labels-box .info-box .tag-current',$mainBox).size() == 0){
                $('.detail-content .labels-box .btn-combination',$mainBox)
                    .removeClass('btn-current')
                    .addClass('btn-current-disabled');
            }
        });
        $('.detail-content .labels-box',$mainBox).off('click','.add-tag-btn').on('click','.add-tag-btn',function(){
            var $newTagInput = $('.detail-content .labels-box .add-tags-input',$mainBox);
            if(!mining.utils.isEmpty($newTagInput.val().trim())){
                opTags.add.push($newTagInput.val());
                $(this).parents('span:first').before('<span class="tag-current">' + $newTagInput.val() + '<i class="scopaicon scopaicon-shanchuxiao del-tag"></i></span>');
                $newTagInput.val('');
                $('.detail-content .labels-box .btn-combination',$mainBox)
                    .addClass('btn-current')
                    .removeClass('btn-current-disabled');
            }
        });
        $('.detail-content .labels-box .btn-current.btn-combination',$mainBox).off('click').on('click',function(){
            var labelsData = [];
            $.each($('.detail-content .labels-box span.tag-current',$mainBox),function(i,n){
                labelsData.push($(n).text());
            })
            $ajax.ajax({
                url: labelsUpdateUrl + '&qingbaoId=' + $('.detail-content',$mainBox).attr('data-detail-id') + '&labels=' + labelsData,
                success: function(result){
                    if(result.statusCode == '200'){
                        var qbId=$('.detail-content',$mainBox).attr('data-detail-id');
                        $dialog.alert('保存成功',function(){  getData($('.detail-related .tab li.active',$mainBox).attr('tab'),['qingbaoId=' + qbId]);});
                    }
                },
                error: function(err){
                    console.log(err);
                }
            });
           // if(window.location.host.indexOf('qbbigdata') == -1 && window.location.host.indexOf('1gongan') == -1){
                $ajax.ajax({
                    url: tagModifyUrl,
                    data: {
                        userID: userId,
                        caseID: $('.detail-content',$mainBox).attr('data-detail-id'),
                        tag_types: JSON.stringify(opTags)
                    },
                    type: 'post',
                    success: function(result){
                        if(result.statusCode == '200'){
                            console.log('保存成功');
                        }
                    },
                    error: function(err){
                        console.log(err);
                    }
                });
           // }
            mining.utils.serverLog(426);
        });

        $('.detail-related .tab',$mainBox).off('click','li').on('click','li',function(){
            $(this).addClass('active').siblings().removeClass('active');
            var tabName = $(this).attr('tab'),
                qbId = $('.detail-content',$mainBox).attr('data-detail-id'),
                $relatedBox = $('.detail-related .' + tabName,$mainBox),
                serverLog = parseInt($(this).attr('serverLog'));
            $relatedBox.removeClass('hidden').siblings('.related-box').addClass('hidden');
            if($relatedBox.find('table tbody tr').length == 0 || $relatedBox.find('table tbody tr:first').attr('data-item-id').length == 0 ){
                getData(tabName,['qingbaoId=' + qbId]);
            }
            mining.utils.serverLog(serverLog);
        });
        $('.detail-related .tab-related li:first',$mainBox).click();
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
