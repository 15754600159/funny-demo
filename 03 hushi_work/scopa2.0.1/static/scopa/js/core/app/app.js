/**
 * Created by admin on 2016/6/2.
 */
define(function(require){

    var $page = $('.page-app');
    var eventModule = require('core/event/event')
    window.toAppHome = false;

    var initPage = function(){
		$('.application').addClass('subpage page-app').attr('template', 'core/app');
		$page = $('.page-app');
        mining.utils.loadPage($page, function(){
            $.each($('.go-page-list li',$page),function(index,item){
                var role=$(item).attr('role');
                if(!mining.utils.hasRoleForAction(role)){
                    $(item).addClass('hide');
                }
            });
            $('.list-app .go-page-list li',$page).on('click',function(){
            	mining.utils.closeDlg();
                $('.active',$page).removeClass('active');
                $(this).addClass('active');
                var url=$(this).attr('url');
                window.location=url;
                if(url.indexOf('event')>-1)eventModule.init($(this).attr('tab'));
                mining.utils.serverLog(500,$(this).text());
            });
            if(window.toAppHome){
            	window.toAppHome = false;
                mining.utils.hashChange('app')
            }else {
                window.toAppHome = false;
                if( $('.active',$page).attr('url'))
                    window.location= $('.active',$page).attr('url');
            }

            $('.app',$page).mCustomScrollbar({
                theme: 'minimal'
            });

        });
    }

    return {
        init: initPage
    }
});