define(function (require) {
    require('harts/common/lodash.min');
    require('harts/common/json2');
    var $page = $('.page-rule'),
        requestUrl = {
            base: mining.testBaseUrl + '/harts/rule',
            list: mining.testBaseUrl + '/harts/rule?withContent=true',
            detail: function (ruleId) {
                return  mining.testBaseUrl + '/harts/rule/' + ruleId;
            },
            trigger: function (ruleId) {
                return  mining.testBaseUrl + '/harts/rule/' + ruleId + '?action=trigger';
            },
            tuningStatus: mining.testBaseUrl + '/harts/integration/tuning',
            tuningDiff: mining.testBaseUrl + '/harts/integration/tuning/diff',
            resourceConfig: mining.testBaseUrl + '/harts/resourceConfig',
            taskList: function (ruleId) {
                return mining.testBaseUrl + '/harts/rule/' + ruleId + '/task'
            }/*,
            source: function (ruleId) { // TODO: SHOULD ADD TO REST
                return null;
            },
            taskDetail: function (ruleId, taskId) {
                return mining.testBaseUrl + '/harts/rule/' + ruleId + '/task/' + ruleTaskId
            },
            ruleTaskAct: function (ruleId, action, overwrite) {
                if (typeof overwrite === 'undefined') {
                    overwrite = 'false'
                }
                return mining.testBaseUrl + '/harts/rule/' + ruleId + '?action1=' + action + '&overwrite=' + overwrite
            }*/
        };
    var currentRule;
    //刷新布局
    var pageResize = function () {
        //TODO
    };
    /* 初始化 */
    var initPage = function () {
        mining.utils.loadPage($page, function(){
            mining.utils.winResize({name:pageResize});
            console.info('rule initPage');
            showRulePart();
            initRuleList();
            addEvent();

            seajs.log('规则');
        });
    };

    var showRulePart = function () {
        $page.find('.part-rule').show();
        $page.find('.part-ruleTask').hide();
    };

    var showJobPart = function () {
        $page.find('.part-ruleTask').show();
        $page.find('.part-rule').hide();
    };

    var addEvent = function () {
        //表格 编辑
        // TODO: scroll format
        $('#table_rule', $page).off('click', 'td.show').on('click', 'td.show', function () {
            console.log('show');
            var id = $(this).parents('tr').data('id');
            $ajax.ajax({
                url: requestUrl.detail(id),
                success: function(result){
                    $dialog({
                        title:'规则详情',
                        content:'<div class="rule_dialog"><div class="content">' +
                        '<div class="row"><span>ID</span><input type="text" class="control id" value="'+result.id+'"/></div> '+
                        '<div class="row"><span>名称</span><input type="text" class="control name" value="'+result.name+'"/></div> '+
                        '<div class="row"><span>状态</span><input type="text" class="control status" value="'+result.status+'"/></div> '+
                        '<div class="row"><span>创建时间</span><input type="text" class="control createTime" value="'+result.createTime+'"/></div> '+
                        '<div class="row"><span>描述</span><input type="text" class="control description" value="'+result.description+'"/></div> '+
                        '<div class="row"><span>数据模型</span><textarea class="control models" rows="3" cols="40">'+result.models+'</textarea></div> '+
                        '<div class="row"><span>预设</span><textarea class="control predef" rows="3" cols="40">'+result.predef+'</textarea></div> '+
                        '<div class="row"><span>数据模型</span><textarea class="control content" rows="3" cols="40">'+result.content+'</textarea></div> '+
                        '</div> </div>',
                        width: 400,height:300,
                        cancelValue:'取消',okValue:'确认',
                        ok:function(){
                        },
                        cancel:function(){}
                    }).showModal();
                },
                error: function(result){

                }
            });

        });
        $('#table_rule', $page).off('click', 'td.edit').on('click', 'td.edit', function () {
            console.log('edit');
            var id = $(this).parents('tr').data('id');
            $ajax.ajax({
                url: requestUrl.detail(id),
                success: function(result){
                    $dialog({
                        title:'规则详情',
                        content:'<div class="rule_dialog"><div class="content"><form id="editForm">' +
                        // '<div class="row"><span>ID</span><input type="text" class="control id" value="'+result.id+'"/></div> '+
                        '<div class="row"><span>名称</span><input type="text" class="control name" value="'+result.name+'"/></div> '+
                        // '<div class="row"><span>状态</span><input type="text" class="control status" value="'+result.status+'"/></div> '+
                        // '<div class="row"><span>创建时间</span><input type="text" class="control createTime" value="'+result.createTime+'"/></div> '+
                        '<div class="row"><span>描述</span><input type="text" class="control description" value="'+result.description+'"/></div> '+
                        '<div class="row"><span>数据模型</span><input type="text" class="control models" value="'+result.models+'"/></div> '+
                        '<div class="row"><span>预设</span><input type="text" class="control predef" value="'+result.predef+'"/></div> '+
                        '<div class="row"><span>DSL</span><input type="text" class="control content" value="'+result.content+'"/></div> '+
                        '</form></div> </div>',
                        width: 400,height:230,
                        cancelValue:'取消',okValue:'确认',
                        ok:function(){
                            $.ajax({
                                url: requestUrl.detail(id),
                                type: 'put',
                                contentType: 'application/json',
                                data: $('#editForm').serialize(),
                                async: false,
                                success: function(result){
                                    initRuleList();
                                    $dialog({
                                        title:'信息',
                                        content:'已提交',
                                        okValue:'确认'
                                    }).showModal();
                                },
                                error: function(result){

                                }
                            });
                        },
                        cancel:function(){}
                    }).showModal();
                },
                error: function(result){

                }
            });
        });
        $('#table_rule', $page).off('click', 'td.delete').on('click', 'td.delete', function () {
            console.log('delete');
            var id = $(this).parents('tr').data('id');
            $ajax.ajax({
                url: requestUrl.detail(id),
                success: function(result){
                    $dialog({
                        title:'警告',
                        content:'确定删除吗?',
                        width: 400,height:230,
                        cancelValue:'取消',okValue:'确认',
                        ok:function(){
                            $.ajax({
                                url: requestUrl.detail(id),
                                type: 'DELETE',
                                contentType: 'application/json',
                                async: false,
                                success: function(result){
                                    initRuleList();
                                    $dialog({
                                        title:'信息',
                                        content:'已删除',
                                        okValue:'确认'
                                    }).showModal();
                                },
                                error: function(result){

                                }
                            });
                        },
                        cancel:function(){}
                    }).showModal();
                },
                error: function(result){

                }
            });
        });
        $('#table_rule', $page).off('click', 'td.trigger').on('click', 'td.trigger', function () {
            console.log('trigger');
            var id = $(this).parents('tr').data('id');
            $dialog({
                title:'任务',
                content:'<div class="task_dialog"><div class="content"><form id="triggerForm">' +
                '<div class="row"><span>资源配置</span><input type="text" name="resourceConfig" class="control resourceConfig" value=""/></div> '+
                '<div class="row"><span>覆盖</span><input type="radio" name="overwriteRule" class="control overwriteRule" value=true checked/>true' +
                '<input type="radio" name="overwriteRule" class="control overwriteRule" value=false/>false</div> '+
                '<div class="row"><span>去重</span><input type="radio" name="eventDeduplicate" class="control eventDeduplicate" value=true checked/>true' +
                '<input type="radio" name="eventDeduplicate" class="control eventDeduplicate" value=false/>false</div> '+
                '<div class="row"><span>历史输入</span><input type="text" name="historyInput" class="control historyInput" value=""/></div> '+
                '<div class="row"><span>增量输入</span><input type="text" name="deltaInput" class="control deltaInput" value=""/></div> '+
                '<div class="row"><span>历史输出</span><input type="text" name="historyOutput" class="control historyOutput" value=""/></div> '+
                '<div class="row"><span>增量输出</span><input type="text" name="deltaOutput" class="control deltaOutput" value=""/></div> '+
                '<div class="row"><span>全量输出</span><input type="text" name="fullOutput" class="control fullOutput" value=""/></div> '+
                '</form></div> </div>',
                width: 400,height:230,
                cancelValue:'取消',okValue:'确认',
                ok:function(){
                    var data = {
                        resourceConfig: $('#triggerForm').find('.resourceConfig').val(),
                        overwriteRule: $('#triggerForm').find('.overwriteRule:checked').val() == 'true',
                        eventDeduplicate: $('#triggerForm').find('.eventDeduplicate:checked').val() == 'true',
                        historyInput: $('#triggerForm').find('.historyInput').val(),
                        deltaInput: $('#triggerForm').find('.deltaInput').val() || null,
                        historyOutput: $('#triggerForm').find('.historyOutput').val() || null,
                        deltaOutput: $('#triggerForm').find('.deltaOutput').val() || null,
                        fullOutput: $('#triggerForm').find('.fullOutput').val()
                    };
                    $.ajax({
                        url: requestUrl.trigger(id),
                        type: 'POST',
                        contentType: 'application/json',
                        async: false,
                        data: JSON.stringify(data),
                        success: function(result){
                            initRuleList();
                            $dialog({
                                title:'信息',
                                content:'已提交',
                                okValue:'确认'
                            }).showModal();
                        },
                        error: function(result){

                        }
                    });
                },
                cancel:function(){}
            }).showModal();
        });
        $('#table_rule', $page).off('click', 'td.ruleTask').on('click', 'td.ruleTask', function () {
            console.log('ruleTask');
            showJobPart();
            currentRule = $(this).parents('tr').data('id');
            /*$ajax.ajax({
                url: requestUrl.detail(currentRule),
                success: function(result){
                    var rule_content = '<table>' +
                        '<tr><td>ID</td><td>'+result.id+'</td></tr>'+
                        '<tr><td>名称</td><td>'+result.name+'</td></tr>'+
                        '<tr><td>状态</td><td>'+result.status+'</td></tr>'+
                        '<tr><td>创建时间</td><td>'+result.createTime+'</td></tr>'+
                        '<tr><td>描述</td><td>'+result.description+'</td></tr>'+
                        '</table>';
                    $('.rule-content').html(rule_content);
                },
                error: function(result){

                }
            });*/
            getRuleTask();
        });
        $('body').off('click', '.addRuleModel,.addRulePredef').on('click', '.addRuleModel,.addRulePredef', function (event) {
            $(event.target).parent('div').append('<input type="text" class="control" value=""/>')
        });
        $('#btnAdd', $page).off('click').on('click', function () {
            console.log('add');
            $dialog({
                title:'新建规则',
                content:'<div class="rule_dialog"><div class="content"><form id="addForm">' +
                // '<div class="row"><span>ID</span><input type="text" class="control id" value=""/></div> '+
                '<div class="row"><span>名称</span><input type="text" class="control name" value=""/></div> '+
                // '<div class="row"><span>状态</span><input type="text" class="control status" value=""/></div> '+
                // '<div class="row"><span>创建时间</span><input type="text" class="control createTime" value=""/></div> '+
                '<div class="row"><span>描述</span><input type="text" class="control description" value=""/></div> '+
                '<div class="row modelsWrap"><span>数据模型</span><button class="btn btn-default btn-xs models addRuleModel">+</button><input type="text" class="control" value=""/></div> '+
                '<div class="row predefWrap"><span>预设</span><button class="btn btn-default btn-xs predef addRulePredef">+</button><input type="text" class="control" value=""/></div> '+
                '<div class="row"><span>DSL</span><textarea class="control content" rows="3" cols="40"></textarea></div> '+
                '</form></div> </div>',
                width: 400,
                cancelValue:'取消',
                cancel: function() {},
                okValue:'确认',
                ok: function() {
                    var data = {
                        name: $('#addForm').find('.name').val(),
                        description: $('#addForm').find('.description').val(),
                        models: inputsTrimToArray($('#addForm').find('.modelsWrap').find('input')),
                        predef: inputsTrimToArray($('#addForm').find('.predefWrap').find('input')),
                        content: $('#addForm').find('.content').val()
                    };
                    $.ajax({
                        url: requestUrl.base,
                        type: 'POST',
                        contentType: 'application/json',
                        async: false,
                        data: JSON.stringify(data),
                        success: function(result){
                            initRuleList();
                            $dialog({
                                title:'信息',
                                content:'已提交',
                                okValue:'确认'
                            }).showModal();
                        },
                        error:function(e){
                        }
                    });

                }
            }).showModal();
        });
        /*$('#btnDiff', $page).off('click').on('click', function () {
            console.log('diff');
            $ajax.ajax({
                url: requestUrl.tuningStatus,
                success: function(result){
                    var content = function () {
                        var rs = _.map(result, function (e) {
                            var ruleId = e.ruleId;
                            var times = function () {
                                var ts = _.map(e.times, function (t) {
                                    var checked = _.head(e.times) === t ? ' checked' : '';
                                    return '<input type="radio" name="' + ruleId + '_time" value="' + t + '" class="rule-time ' + ruleId + '"' + checked + '/>' + t;
                                });
                                return _.join(ts, '');
                            }();
                            return '<div class="row"><span><input type="checkbox" value="' + ruleId + '" class="rule-tuning" checked>' + ruleId + '</span>' + times + '</div>';
                        });
                        return _.join(rs, '');
                    }();
                    $dialog({
                        title:'Diff',
                        content: content,
                        width: 400,height:230,
                        cancelValue:'取消',okValue:'确认',
                        ok:function(){
                            var data = _.map($('input.rule-tuning:checked'), function (e) {
                                var ruleId = $(e).val();
                                var rule_time = $('.rule-time.' + ruleId + ':checked').val();
                                return {ruleId: ruleId, rule_time: rule_time};
                            });
                            $ajax.ajax({
                                url: requestUrl.tuningDiff,
                                type:'POST',
                                data: data,
                                async: false,
                                success: function(result){
                                    console.log(result);
                                    $dialog({
                                        title: '信息',
                                        content: '已提交'
                                    }).showModal();
                                }
                            });
                        },
                        cancel:function(){}
                    }).showModal();
                }
            });
        });

        $('#table_ruleTask', $page).off('click', 'td.show').on('click', 'td.show', function () {
            console.log('show');
            var id = $(this).parents('tr').data('id');
            $ajax.ajax({
                url: requestUrl.ruleTaskDetail(currentRule, id),
                success: function(result){
                    $dialog({
                        title:'任务详情',
                        content:'<div class="ruleTask_dialog"><div class="content">' +
                        '<div class="row"><span>ID</span><input type="text" class="control id" value="'+result.id+'"/></div> '+
                        '<div class="row"><span>时间</span><input type="text" class="control time" value="'+result.time+'"/></div> '+
                        '<div class="row"><span>规则</span><input type="text" class="control ruleId" value="'+result.ruleId+'"/></div> '+
                        '<div class="row"><span>状态</span><input type="text" class="control status" value="'+result.status+'"/></div> '+
                        '<div class="row"><span>资源配置</span><input type="text" class="control resouceConfig" value="'+result.resouceConfig+'"/></div> '+
                        '<div class="row"><span>事件去重</span><input type="text" class="control eventDeduplicate" value="'+result.eventDeduplicate+'"/></div> '+
                        '<div class="row"><span>历史输入</span><input type="text" class="control historyInput" value="'+result.historyInput+'"/></div> '+
                        '<div class="row"><span>增量输入</span><input type="text" class="control deltaInput" value="'+result.deltaInput+'"/></div> '+
                        '<div class="row"><span>历史输出</span><input type="text" class="control historyOutput" value="'+result.historyOutput+'"/></div> '+
                        '<div class="row"><span>增量输出</span><input type="text" class="control deltaOutput" value="'+result.deltaOutput+'"/></div> '+
                        '<div class="row"><span>全量输出</span><input type="text" class="control fullOutput" value="'+result.fullOutput+'"/></div> '+
                        '<div class="row"><span>描述</span><input type="text" class="control description" value="'+result.description+'"/></div> '+
                        '</div> </div>',
                        width: 400,height:230,
                        cancelValue:'取消',okValue:'确认',
                        ok:function(){},
                        cancel:function(){}
                    }).showModal();
                },
                error: function(result){

                }
            });

        });
        $('#table_ruleTask', $page).off('click', 'td.cancel').on('click', 'td.cancel', function () {
            console.log('cancel');
            var id = $(this).parents('tr').data('id');
            var action = 'cancel';
            $dialog({
                title:'确定吗?',
                content:'确定取消正在运行的任务吗?',
                width: 400,height:230,
                cancelValue:'取消',okValue:'确认',
                ok:function(){
                    $ajax.ajax({
                        url: requestUrl.ruleTaskAct(currentRule, action),
                        type:'POST',
                        data: {ruleTaskId: id},
                        async: false,
                        success: function(result){
                            console.log(result.message);
                            var c = 'na';
                            switch (result.message) {
                                case 'created':
                                    c = '已提交任务';
                                    getRuleTask();
                                    break;
                                case 'uncompleted':
                                    c = '任务未完成';
                                    break;
                                case 'canceled':
                                    c = '任务已取消';
                                    getRuleTask();
                                    break;
                                case 'not_available':
                                    c = '不可用';
                                    break;
                                default:
                                    c = 't';
                                    break;
                            }

                            $dialog({
                                title: '信息',
                                content: c
                            }).showModal();
                        }
                    });
                },
                cancel:function(){}
            }).showModal();
        });
        $('#btnDeltaJob', $page).off('click').on('click', function () {
            console.log('delta ruleTask');
            var datasourceElm;
            var resourceConfigElm;
            var getDatasourceList = $.ajax({
                url: requestUrl.source(currentRule)
            });
            getDatasourceList.done(function(result){
                datasourceElm = function () {
                    var dss =  _.map(result, function (rc) {
                        return '<option value="' + rc + '">' + rc + '</option>';
                    });
                    return dss.join('');
                }();
            });
            var getResourceConfigElm = $.ajax({
                url: requestUrl.resourceConfig
            });
            getResourceConfigElm.done(function(result){
                resourceConfigElm = function () {
                    var rces =  _.map(result, function (rc) {
                        return '<option value="' + rc.name + '">' + rc.description + '</option>';
                    });
                    return rces.join('');
                }();
            });
            $.when(getDatasourceList, getResourceConfigElm).done(function () {
                $dialog({
                    title:'新建增量任务',
                    content:'<div class="ruleTask_dialog"><div class="content">' +
                    // '<div class="row"><span>动作</span><input type="radio" name="action" class="control action" value="trigger" checked/>trigger<input type="radio" name="action" class="control action" value="cancel"/>cancel</div> '+
                    // '<div class="row"><span>覆盖</span><input type="radio" name="overwrite" class="control overwrite" value="true"/>true<input type="radio" name="overwrite" class="control overwrite" value="false" checked/>false</div> '+
                    '<div class="row">资源配置 <select name="resouceConfig" id="resouceConfig" class="control select resouceConfig">' +
                    resourceConfigElm +
                    '</select></div>' +
                    '<div class="row"><span>事件去重</span><input type="text" class="control eventDeduplicate"/></div> '+
                    '<div class="row"><span>历史输入</span><input type="text" class="control historyInput"/></div> '+
                    '<div class="row">增量输入 <select name="deltaInput" id="deltaInput" class="control select deltaInput" multiple="multiple">' +
                    datasourceElm +
                    '</select></div>' +
                    '<div class="row"><span>增量输出</span><input type="text" class="control deltaOutput"/></div> '+
                    '<div class="row"><span>全量输出</span><input type="text" class="control fullOutput"/></div> '+
                    '</div> </div>',
                    width: 400,height:230,
                    cancelValue:'取消',okValue:'确认',
                    ok:function(){
                        var $dlg = this._$('content');
                        // var $dlg = $('.ruleTask_dialog');
                        // var action = $dlg.find('.action:checked').val();
                        var action = 'trigger';
                        // var overwrite = $dlg.find('.overwrite:checked').val();
                        var overwrite = false;
                        $.ajax({
                            url: requestUrl.ruleTaskAct(currentRule, action, overwrite),
                            type:'POST',
                            data: {
                                resouceConfig: $dlg.find('.resouceConfig').val(),
                                eventDeduplicate: $dlg.find('.eventDeduplicate').val(),
                                historyInput: $dlg.find('.historyInput').val(),
                                deltaInput: $dlg.find('.deltaInput').val(),
                                deltaOutput: $dlg.find('.deltaOutput').val(),
                                fullOutput: $dlg.find('.fullOutput').val()
                            },
                            async: false,
                            success: function(result){
                                console.log(result);
                                console.log(result.message);
                                var c = 'na';
                                switch (result.message) {
                                    case 'created':
                                        c = '已提交任务';
                                        getRuleTask();
                                        break;
                                    case 'uncompleted':
                                        c = '任务未完成';
                                        break;
                                    case 'canceled':
                                        c = '任务已取消';
                                        getRuleTask();
                                        break;
                                    case 'not_available':
                                        c = '不可用';
                                        break;
                                    default:
                                        c = 't';
                                        break;
                                }

                                $dialog({
                                    title: '信息',
                                    content: c
                                }).showModal();
                            }
                        });
                    },
                    cancel:function(){}
                }).showModal();
                $('.select').select2({minimumResultsForSearch: Infinity, placeholder: "Select a state"});
            });
        });
        $('#btnFullJob', $page).off('click').on('click', function () {
            console.log('full ruleTask');
            var datasourceElm;
            var resourceConfigElm;
            var getDatasourceList = $.ajax({
                url: requestUrl.source(currentRule)
            });
            getDatasourceList.done(function(result){
                datasourceElm = function () {
                    var dss =  _.map(result, function (rc) {
                        return '<option value="' + rc + '">' + rc + '</option>';
                    });
                    return dss.join('');
                }();
            });
            var getResourceConfigElm = $.ajax({
                url: requestUrl.resourceConfig
            });
            getResourceConfigElm.done(function(result){
                resourceConfigElm = function () {
                    var rces =  _.map(result, function (rc) {
                        return '<option value="' + rc.name + '">' + rc.description + '</option>';
                    });
                    return rces.join('');
                }();
            });
            $.when(getDatasourceList, getResourceConfigElm).done(function () {
                $dialog({
                    title: '新建全量任务',
                    content: '<div class="ruleTask_dialog"><div class="content">' +
                    // '<div class="row"><span>动作</span><input type="radio" name="action" class="control action" value="trigger" checked/>trigger<input type="radio" name="action" class="control action" value="cancel"/>cancel</div> '+
                    // '<div class="row"><span>覆盖</span><input type="radio" name="overwrite" class="control overwrite" value="true"/>true<input type="radio" name="overwrite" class="control overwrite" value="false" checked/>false</div> '+
                    '<div class="row">资源配置 <select name="resouceConfig" id="resouceConfig" class="control select resouceConfig">' +
                    resourceConfigElm +
                    '</select></div>' +
                    '<div class="row"><span>事件去重</span><input type="text" class="control eventDeduplicate"/></div> ' +
                    '<div class="row"><span>历史输入</span><input type="text" class="control historyInput"/></div> ' +
                    '<div class="row"><span>增量输入</span><input type="text" class="control deltaInput"/></div> ' +
                    '<div class="row"><span>增量输出</span><input type="text" class="control deltaOutput"/></div> ' +
                    '<div class="row"><span>全量输出</span><input type="text" class="control fullOutput"/></div> ' +
                    '</div> </div>',
                    width: 400, height: 230,
                    cancelValue: '取消', okValue: '确认',
                    ok: function () {
                        var $dlg = this._$('content');
                        // var $dlg = $('.ruleTask_dialog');
                        // var action = $dlg.find('.action:checked').val();
                        var action = 'trigger';
                        // var overwrite = $dlg.find('.overwrite:checked').val();
                        var overwrite = true;
                        $ajax.ajax({
                            url: requestUrl.ruleTaskAct(currentRule, action, overwrite),
                            type:'POST',
                            data: {
                                resouceConfig: $dlg.find('.resouceConfig').val(),
                                eventDeduplicate: $dlg.find('.eventDeduplicate').val(),
                                historyInput: $dlg.find('.historyInput').val(),
                                deltaInput: $dlg.find('.deltaInput').val(),
                                deltaOutput: $dlg.find('.deltaOutput').val(),
                                fullOutput: $dlg.find('.fullOutput').val()
                            },
                            async: false,
                            success: function (result) {
                                console.log(result.message);
                                var c = 'na';
                                switch (result.message) {
                                    case 'created':
                                        c = '已提交任务';
                                        getRuleTask();
                                        break;
                                    case 'uncompleted':
                                        c = '任务未完成';
                                        break;
                                    case 'canceled':
                                        c = '任务已取消';
                                        getRuleTask();
                                        break;
                                    case 'not_available':
                                        c = '不可用';
                                        break;
                                    default:
                                        c = 't';
                                        break;
                                }

                                $dialog({
                                    title: '信息',
                                    content: c
                                }).showModal();
                            }
                        });
                    },
                    cancel: function () {
                    }
                }).showModal();
                $('.select').select2({minimumResultsForSearch: Infinity});
            });
        });*/
        $('#btnBack', $page).off('click').on('click', function () {
            console.log('back');
            showRulePart();
            $('#table_ruleTask').find('tbody').html('');
            currentRule = undefined;
        });
    };

    var inputsTrimToArray = function (elems) {
        return _.filter(_.map(elems, function (e) {
            return $(e).val()
        }), function (e) {
            return e.trim() != ''
        })
    };
    var getRuleTask = function () {
        $ajax.ajax({
            url: requestUrl.taskList(currentRule),
            success: function(result){
                console.info('initRuleList success');
                var tr=[];
                $.each(result,function(k,v){
                    var index = k + 1;
                    tr.push('<tr data-id="'+ v.id+'"><td>'+ index+'</td><td>'+ v.id+'</td><td>'+ v.category+'</td><td>'+ v.status+'</td>' +
                        '<td>'+ v.createTime+'</td><td>'+ v.finishTime+'</td><td>'+ v.progress+'</td><td>'+ v.refId+'</td>' +
                        '<td>'+ v.jsonContent+'</td><td>'+ v.errorMsg+'</td>' /* +
                        '<td class="show"><span class="icon icon-show"></span>详细</td>' +
                        (v.status == '1' ? '<td class="cancel"><span class="icon icon-cancel"></span>取消</td>' : '')*/);
                });
                $('#table_ruleTask').find('tbody').html(tr.join(''));
            },
            error: function(result){
                console.info('initRuleList error');
            }
        });
    };
    var initRuleList = function () {
        console.info('initRuleList');
        $ajax.ajax({
            url: requestUrl.list,
            success: function(result){
                console.info('initRuleList success');
                var tr=[];
                $.each(result,function(k,v){
                    var index = k + 1;
                    tr.push('<tr data-id="'+ v.id+'"><td>'+ index+'</td><td>'+ v.id+'</td><td>'+ v.name+'</td><td>'+ v.status+'</td>' +
                        '<td>'+ v.createTime+'</td><td>'+ v.description+'</td><td>'+ v.models+'</td>' +
                        '<td>'+ v.predef+'</td><td>'+ v.content+'</td>' +
                        '<td class="show"><span class="glyphicon glyphicon-eye-open"></span>详细</td>' +
                        '<td class="delete"><span class="glyphicon glyphicon-trash"></span>删除</td>' +
                        '<td class="trigger"><span class="glyphicon glyphicon-play"></span>任务</td>' +
                        '<td class="ruleTask"><span class="glyphicon glyphicon-list"></span>任务列表</td></tr>');
                });
                $('#table_rule').find('tbody').html(tr.join(''));
            },
            error: function(result){
                console.info('initRuleList error');
            }
        });
        console.info('initRuleList done');
    };
    return {
        init: initPage
    }
});
