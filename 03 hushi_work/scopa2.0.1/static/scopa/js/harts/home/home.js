define(function (require) {
    var $page = $('.page-home');
    //刷新布局
    var pageResize = function () {
        //TODO
    };
    /* 初始化 */
    var initPage = function () {
        mining.utils.loadPage($page, function(){
            mining.utils.winResize({name:pageResize});
            console.info('home initPage');

            seajs.log('home');
        });
    };

    return {
        init: initPage
    }
});