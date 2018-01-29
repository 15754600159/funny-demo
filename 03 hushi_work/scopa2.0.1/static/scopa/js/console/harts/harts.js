define(function (require) {
    var $page = $('.page-harts');

    //刷新布局
    var pageResize = function () {
        $(".list_container", $page).height(mining.browser.h -200);
        //TODO
    };
    mining.utils.winResize({name:pageResize});
    /* 初始化 */
    var initUrl = function () {
        var remoteTestBaseUrl = 'http://29v1.mlamp.co:9099';
        var localTestBaseUrl0 = 'http://localhost:3333';
        var localTestBaseUrl1 = 'http://localhost:9999';
        var localTestBaseUrl2 = 'http://localhost:9099';
        mining.testBaseUrl = localTestBaseUrl1;
    };
    var initPage = function () {
        mining.utils.loadPage($page, function () {
            initUrl();
            $('.harts-home').show();
            var hartsModule = {
                datasource: require('../../harts/datasource/datasource'),
                model: require('../../harts/model/model'),
                rule: require('../../harts/rule/rule'),
                mapping: require('../../harts/mapping/mapping'),
                task: require('../../harts/task/task')
            };

            //路由控制
            var pageChage = function(nav){
                $('.nav-harts').addClass('active').siblings('.active').removeClass('active');
                $('.page-harts').addClass('active').siblings('.subpage').removeClass('active');

                if(mining.utils.isEmpty(nav))nav = 'home';
                $('.harts-home').hide();
                $('.harts .nav-' + nav).addClass('active').siblings('.active').removeClass('active');
                $('.nav-active').animate({left: $('.nav-' + nav + ' a').offset().left - 45}, {duration: 300, easing: 'easeInQuart'});
                $('.harts .page-' + nav).addClass('active').siblings('.subpage').removeClass('active');
                mining.utils.closeDlg();
                hartsModule[nav].init();
            };
            var urlHash = $.hash('parse');
            if(typeof urlHash['module'] === 'undefined') {
                $('.harts .nav').removeClass('active');
                $('.harts .page-home').addClass('active');
            }else{
                var nav = urlHash['module'];
                pageChage(nav);
            }
        });
    };

    return {
        init: initPage
    }
});
