define(function (require) {
    var $page = $('.page-task'),
        requestUrl = {
            base: mining.testBaseUrl + '/harts/task',
            list: function (status, type) {
                return mining.testBaseUrl + '/harts/task/?status=' + status + '&category=' + type
            },
            detail:mining.testBaseUrl+'/harts/task/detail'
        };
    //刷新布局
    var pageResize = function () {
        //TODO
    };
    /* 初始化 */
    var initPage = function () {
        mining.utils.loadPage($page, function(){
            mining.utils.winResize({name:pageResize});
            console.info('task initPage');
            initTaskList();
            addEvent();

            seajs.log('任务');
        });
    };

    var addEvent = function () {
        //表格 编辑
        // TODO: scroll format
        $('#table_task', $page).off('click', 'td.show').on('click', 'td.show', function () {
            console.log('show');
            var id = $(this).parents('tr').data('id');
            $ajax.ajax({
                url: requestUrl.detail,
                data: {id: id},
                success: function(result){
                    $dialog({
                        title:'任务详情',
                        content:'<div class="task_dialog"><div class="content">' +
                        '<div class="row"><span>ID</span><input type="text" class="control task_name" value="'+result.id+'"/></div> '+
                        '<div class="row"><span>类型</span><input type="text" class="control category" value="'+result.category+'"/></div> '+
                        '<div class="row"><span>状态</span><input type="text" class="control status" value="'+result.status+'"/></div> '+
                        '<div class="row"><span>创建时间</span><input type="text" class="control createTime" value="'+result.createTime+'"/></div> '+
                        '<div class="row"><span>结束时间</span><input type="text" class="control finishTime" value="'+result.finishTime+'"/></div> '+
                        '<div class="row"><span>REF</span><input type="text" class="control refId" value="'+result.refId+'"/></div> '+
                        '<div class="row"><span>JSON内容</span><input type="text" class="control jsonContent" value="'+result.jsonContent+'"/></div> '+
                        '</div> </div>',
                        width: 400,height:230,
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
        $('#btnList', $page).off('click').on('click', function () {
            console.log('list');
            var status = $('.select_status :selected').val();
            var category = $('.select_category :selected').val();
            $ajax.ajax({
                url: requestUrl.list(status, category),
                success: function(result){
                    console.info('initTaskList success');
                    var tr=[];
                    $.each(result,function(k,v){
                        var index = k + 1;
                        tr.push('<tr data-id="'+ v.id+'"><td>'+ index+'</td><td>'+ v.id+'</td><td>'+ v.category+'</td>' +
                            '<td>'+ v.status+'</td><td>'+ v.createTime+'</td><td>'+ v.finishTime+'</td>' +
                            '<td>'+ v.refId+'</td><td>'+ v.jsonContent+'</td>' +
                            '<td class="show"><span class="icon icon-show"></span>详细</td></tr>');
                    });
                    $('#table_task').find('tbody').html(tr.join(''));
                },
                error: function(result){
                    console.info('initTaskList error');
                }
            });
        });
    };
    var initTaskList = function () {
        console.info('initTaskList');
        // $('.select').select2({minimumResultsForSearch: Infinity});
        $ajax.ajax({
            url: requestUrl.base,
            success: function(result){
                console.info('initTaskList success');
                var tr=[];
                $.each(result,function(k,v){
                    var index = k + 1;
                    tr.push('<tr data-id="'+ v.id+'"><td>'+ index+'</td><td>'+ v.id+'</td><td>'+ v.category+'</td>' +
                        '<td>'+ v.status+'</td><td>'+ v.createTime+'</td><td>'+ v.finishTime+'</td>' +
                        '<td>'+ v.refId+'</td><td>'+ v.jsonContent+'</td><td>'+ v.errorMsg+'</td>');
                });
                $('#table_task').find('tbody').html(tr.join(''));
            },
            error: function(result){
                console.info('initTaskList error');
            }
        });
    };
    return {
        init: initPage
    }
});