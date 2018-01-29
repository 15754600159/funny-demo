/**
 * Created by admin on 2016/8/23.
 */
/**
 * Created by admin on 2016/6/2.
 */
define(function(require){
    var initPage = function($page,index,fun){
        var nav= ' <div class="fixed-nav ">' +
            '<div class="nav-box hide '+(index==1?'active':'')+'">' +
            '<div class="nav-title">重大事件预警 <span class="icon  icon-dropdown2 pull-right"></span></div>' +
            '<ul class="nav-list">' +
            '<li  url="#!scopa/event"  tab="events" role="events">事件分析</li>' +
            '<li  url="#!scopa/event"  tab="intelligence" role="intelligence">情报收集</li>' +
            '<li  url="#!scopa/event"  tab="report" role="report">报送管理</li>' +
            '<li  url="#!scopa/eventforewarn"  tab="eventforewarn" role="eventforewarn">事件预警</li>' +
            '<li  url="#!scopa/event" tab="labels" role="labels">群体分类</li>' +
            '</ul>' +
            '</div>' +
            '<div class="nav-box hide '+(index==2?'active':'')+'">' +
            '<div class="nav-title">重点人管控<span class="icon  icon-dropdown2 pull-right"></span></div>' +
            '<ul class="nav-list">' +
            '<li  url="#!scopa/control" role="control">多元布控</li>' +
            '<li  url="#!scopa/covert" role="covert">隐性重点人发现</li>' +
            '<li  url="#!scopa/forewarn" role="forewarn">智能社会网络分析</li>' +
            '<li  url="#!scopa/point" role="point">重点人行为特征智能分析</li>' +
             '<li  url="#!scopa/dynamic" role="dynamic">高危地域/群体动态管控</li>' +
            '</ul>' +
            '</div>' +
            '<div class="nav-box hide '+(index==3?'active':'')+'">' +
            '<div class="nav-title">综合治安研判<span class="icon  icon-dropdown2 pull-right"></span></div>' +
            '<ul class="nav-list">' +
            '<li  url="#!scopa/analysis" role="analysis">治安态势分析</li>' +
            '<li  url="#!scopa/cba" role="cha">案件智能串并分析</li>' +
            '</ul>' +
            '</div>' +
            '<div class="slider"><span ></span></div>' +
             '<div class="slider-close hide"><span ></span></div>' +
            ' </div>';

        if($('.fixed-nav',$page).length==0){
            $page.append(nav);
             $.each($('.nav-list li',$page),function(index,item){
                var role=$(item).attr('role');
                if(!mining.utils.hasRoleForAction(role)){
                    $(item).addClass('hide');
                }
            });
        }
        $('.fixed-nav .slider',$page).off('click').on('click',function(e){
               e = e || window.event;
            if(e.preventDefault) {
                e.preventDefault();
                e.stopPropagation();
            }else{
                e.returnValue = false;
                e.cancelBubble = true;
            }
            var that=$(this).parent();
            that.animate({left:"0px"});
            $('.nav-box',that).removeClass('hide');
            $('.slider',that).addClass('hide');
            $('.slider-close',that).removeClass('hide');
        });
        var closeSilder=function(){
            $('.fixed-nav',$page).animate({left:"-190px"},function(){
                $('.fixed-nav .nav-box',$page).addClass('hide');
                $('.fixed-nav .slider-close',$page).addClass('hide');
                $('.fixed-nav .slider',$page).removeClass('hide');
            });
        }
       $('.fixed-nav .slider-close',$page).off('click').on('click',function(e){
            closeSilder();
       });
        $(document).off('click.fixednav').on('click.fixednav', function(e){
	    	if($(e.target).parents('.fixed-nav').size() > 0)return;
	    	closeSilder();
	    });
        $('.fixed-nav .nav-list li',$page).off('click').on('click',function(e){
               e = e || window.event;
            if(e.preventDefault) {
                e.preventDefault();
                e.stopPropagation();
            }else{
                e.returnValue = false;
                e.cancelBubble = true;
            }
            var url=$(this).attr('url');
            window.location=url;
            $('.subpage.page-app .list-app [url].active').removeClass('active')
            $('.subpage.page-app .list-app [url="' + url+ '"]').addClass('active')
            fun&&fun($(this).attr('tab'));
        });
        if($('.iframe-analysis,.iframe-cba',$page).length>0){
            var dom=window.frames[0].document;
            var frmState=function(){
                if(dom.readyState=="complete"){
                    $(window.frames[0].document).off('click').on('click',function(){
                       closeSilder();
                        
                    });
                    window.clearTimeout(t);
                }
            }
            var t= window.setTimeout(frmState,1000);
        }
       
        mining.utils.loadPage($page, function(){

        });
    }

    return {
        init: initPage
    }
});