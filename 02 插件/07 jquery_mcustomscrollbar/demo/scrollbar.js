/**
 * 1.入门: http://www.jianshu.com/p/550466260856   http://blog.csdn.net/u011500781/article/details/50771943
 * 2.theme: http://manos.malihu.gr/repository/custom-scrollbar/demo/examples/scrollbar_themes_demo.html
 * 3.API: http://manos.malihu.gr/jquery-custom-content-scroller/
 */

$(function(){
    $('.scrollbar').mCustomScrollbar({
        scrollButtons: {//上下按钮配置    
            enable: true,//是否添加按钮    
            //scrollType: 'pixels',//点击滚动是否有停顿效果    
            //scrollAmount: 50,//每次点击滚动的距离    
        }, 
    })
})