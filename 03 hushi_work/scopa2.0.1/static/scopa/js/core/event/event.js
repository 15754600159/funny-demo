define(function (require) {
    var $page = $('.page-event');
    var mainModule = {
        events: require('./eventlist'),
        intelligence: require('./intelligence'),
        eventforewarn: require('./eventforewarn'),
        report: require('./report'),
        labels: require('./label')
    };
   var nav= require('core/app/fixednav');
    /*初始化*/
    var initPage = function(itemName){
    	$page = $('.page-event')
        mining.utils.loadPage($page, function(){
            initAction(itemName);
            nav.init($('.events-box',$page),1,initAction);
        });
    }
    var initAction = function(itemName){
        $('.goApp',$page).on('click',function(){
            mining.utils.toAppHome();
            mining.utils.serverLog(405);
        });
        /*tab*/
        $('.tab',$page).off('click','li').on('click','li',function(){
            var tabText = $(this).text(),
                tabName = $(this).attr('tab'),
                serverLog = parseInt($(this).attr('serverLog'));
            $(this).addClass('active').siblings().removeClass('active');
            $('.' + tabName,$page).removeClass('hidden').siblings('.event-container').addClass('hidden');
            $('.bread-nav .breadcrumb li.tab-page',$page).text(tabText);
            seajs.log(tabName);
            mainModule[tabName].init();
            mining.utils.serverLog(serverLog,tabText);
        });
        if(window.showEventDetailsId && !mining.utils.isEmpty(window.showEventDetailsId)){
            $('.tab-top li[tab="intelligence"]',$page).click();
            mainModule['intelligence'].showDetail(window.showEventDetailsId);
            window.showEventDetailsId = '';
        }else if(window.showEventList && !mining.utils.isEmpty(window.showEventList)){
            $('.tab-top li[tab="intelligence"]',$page).click();
            window.showEventList = '';
        }else{
            if(itemName){
                $('.tab-top li[tab="' + itemName + '"]',$page).click();
            }else if($('.tab-top li.active',$page).length > 0){
                $('.tab-top li.active',$page).click();
            }else{
                $('.tab-top li[tab="events"]',$page).click();
            }
        }

        $('.bread-nav .breadcrumb li.tab-page',$page).off('click').on('click',function(){
            $('.report-detail, .report-add',$page).addClass('hidden');
            $('.bread-nav .breadcrumb li.tab-other',$page).empty().addClass('hidden');
        });
        $('.bread-nav .breadcrumb li',$page).eq(2).addClass('hidden');
    }
    return {
        init: initPage
    }
});