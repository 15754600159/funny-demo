'use strict';

$(function () {

    // 屏幕适配
    initpage();
    $(window).resize(function () {
        initpage();
    })

    function initpage() {
        var view_width = document.getElementsByTagName('html')[0].getBoundingClientRect().width;
        var view_height = document.getElementsByTagName('html')[0].getBoundingClientRect().height;
        var _html = document.getElementsByTagName('html')[0];
        // view_width > 1400 ? _html.style.fontSize = 20 + 'px' : _html.style.fontSize = 13 + 'px';
        // _html.style.fontSize = 50 - (1920 - view_width)*0.0315 +  'px' ;
        // _html.style.fontSize = 50 - (1920 - view_width)*0.0215 +  'px' ;

        var fontSize = Math.min(50 - (1920 - view_width)*0.0215, 50 - (1080 - view_height)*0.0215*16/9);
        _html.style.fontSize = fontSize + 'px';

    }



    // 第三屏 页面左边 导航器功能
    // $('.content-container').on('click', function(e){
    //     var target = e.currentTarget;
    //     // 小黄线动画
    //     var top = $(target).offset().top;
    //     var height = $(target).height();
    //     $('.green-line').css({
    //         'top': top,
    //         'height': height
    //     });
    //     // 文字换边动画
    //     var parent = $(target).parent();
    //     parent.addClass('past-elem');
    //     parent.prevAll('.block-container').addClass('past-elem');
    //     parent.nextAll('.block-container').removeClass('past-elem');
    //     // 标题
    //     parent.siblings('.active').removeClass('active');
    //     parent.addClass('active');
    // })


    // 第三屏 中间文字内容 '了解详情' 的hover事件
    $(document).on('mouseover mouseout', '#galaxy .is-active .timeline-item-link', function(e){  
            
        var target = $(e.currentTarget);
        if(event.type == "mouseover"){   
                 //鼠标悬浮
              var index=target.attr('data-index');
            //   console.log(target.parents($('timeline-item.part-page.part22')).eq(1).children().eq(0).eq(0).children().eq(index).eq(0));
            //   console.log(target.parents($('timeline-item.part-page.part22')).eq(1).children().eq(0).eq(0).children().eq(index).eq(0)[0].className);
           // console.log(target.parents($('timeline-item.part-page.part22')).eq(1).children().eq(0).eq(0).children().eq(index).eq(0)[0]);
           if(index){
            if(index==0){
            target.parents($('timeline-item.part-page.part22')).eq(1).children().eq(0).eq(0).children().eq(0).eq(0)[0].className='';
            target.parents($('timeline-item.part-page.part22')).eq(1).children().eq(0).eq(0).children().eq(1).eq(0)[0].className='imgtog';
            }else{
                target.parents($('timeline-item.part-page.part22')).eq(1).children().eq(0).eq(0).children().eq(0).eq(0)[0].className='imgtog';
                target.parents($('timeline-item.part-page.part22')).eq(1).children().eq(0).eq(0).children().eq(1).eq(0)[0].className='';
            }
            target.addClass('is-hover');
        }else{
              target.addClass('is-hover');
              }
        }else if(event.type == "mouseout"){   
            //鼠标离开 
            target.removeClass('is-hover');
        } 
    })

     //微信图片二维码
     $('.share .iconContainer:first').hover(function(){
        $('.showerweima').animate({opacity:1})},
        function(){
        $('.showerweima').animate({opacity:0});
     })

    // // 发布会页面跳转
    // $('.click-area').on('click', function(){
    //     window.open("http://www.baidu.com");
    // })

    // // 发布会页面滚轮事件监听
    // var advPage = document.getElementsByClassName('background-img')[0];
    // function scrollFunc(){
    //     console.log('aa');
    //     $('#galaxy').css({
    //         visibility: 'visible',
    //     })
    // }

    // //W3C 
    // advPage.addEventListener("DOMMouseScroll", scrollFunc, false);
    // //IE/Opera/Chrome 
    // advPage.onmousewheel = scrollFunc;

})