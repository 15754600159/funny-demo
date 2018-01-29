define(function (require) {
    var $page = $('.page-mapping'),
        requestUrl = {
            list:mining.testBaseUrl+'/harts/mapping'
        };
    //刷新布局
    var pageResize = function () {
        //TODO
    };
    /* 初始化 */
    var initPage = function () {
        mining.utils.loadPage($page, function(){
            mining.utils.winResize({name:pageResize});
            console.info('mapping initPage');
            initMapping();
            addEvent();

            seajs.log('mapping');
        });
    };

    var addEvent = function () {
    };
    var initMapping = function () {
        console.info('initMapping');
        $ajax.ajax({
            url: requestUrl.list,
            async: false,
            success: function(result){
                console.info('initMapping success');
                var tr=[];
                $.each(result.rule,function(k,v){
                    var index = k + 1;
                    tr.push('<tr data-id="'+ v.id+'"><td>'+ index+'</td><td>'+ v.id+'</td><td>'+ v.name+'</td><td>'+ v.event.join(',')+'</td>' +
                        '<td>'+ v.description+'</td>');
                });
                $('#table_mapping').find('tbody').html(tr.join(''));
            },
            error: function(result){
                console.info('initMapping error');
            }
        });
        console.info('initMapping done');
    };
    return {
        init: initPage
    };
});
