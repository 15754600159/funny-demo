'use strict';

$(function () {
    /**-----mian---------------------------------------------- */
    // 页面初始化
    initPage();
    


    /**-----function------------------------------------------ */
    /**
     * @desc: 页面初始化
     * @param: none
     * @return: undefined 
     */
    function initPage(){
        resizeFunc();

        // 页面窗口大小变化 重新计算布局
        $(window).resize(resizeFunc);

        // 点击事件监听
        bindClickFunc();
    }

    /**
     * @desc: 改变页面html的font-size大小 和 搜索结果result-table-box 元素的top值
     * @param: none
     * @return: undefined 
     */
    function resizeFunc(){
        //重新设置html的font-size
        var width = $(document).width();
        var fontSize = (width - 1680) * 0.0298 + 50;
        $('html').css('font-size', fontSize);

        //重新设置搜索结果框的top值（包括背景审查、情况摸排）
        var height = $("body").height() + 18;
        $('.result-table-box, .qkmp').css('top', height);

    }

    /**
     * @desc: 页面点击事件绑定
     * @param: none
     * @return: undefined 
     */
    function bindClickFunc(){
        // checkBox全选/全不选功能实现
        $("#CheckAll").click(function() { 
            var flag = $(this).prop("checked"); 
            $(".condition-filter-box .items .item").each(function() { 
                $(this).prop("checked", flag); 
            }) 
        })

        // 背景审查、情况摸排页面切换
        // $('.search-bar .search-type span').on('click', function(e){
        //     var target = $(e.currentTarget);
        //     target.siblings().removeClass('active');
        //     target.addClass('active');
        //     if(target.text() === '背景审查'){
        //         $('html').removeClass('qkmp-page').addClass('bjsc-page');
        //     }else{
        //         $('html').removeClass('bjsc-page').addClass('qkmp-page');
        //     }

        //     //页面切换也需要 重新设置搜索结果框的top值（包括背景审查、情况摸排）
        //     var height = $("body").height() + 18;
        //     $('.result-table-box, .qkmp').css('top', height);
        // })

    }




})