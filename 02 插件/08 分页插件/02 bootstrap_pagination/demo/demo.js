/**
 * 1. 入门: https://my.oschina.net/shunshun/blog/204587
 * 2. api: bootstrap-paginator-master/documentation/index.html
 */
$(function(){
    var options = {
        size:"large", //设置控件的显示大小 [mini, small, normal, large]
        alignment:"left", //设置控件的对齐方式 [left, center, right]
        currentPage: 3, //设置当前页
        totalPages: 10, //设置总页数

        /**
         * @desc 当控件内的每个操纵按钮被渲染(render)时，都会调用该函数
         * @param type 为该控件的操作按钮的类型，如上图所示的五种类型：first、prev、page、next、last。
         * @param page 为该按钮所属第几页。
         * @param current 指示整个控件的当前页是第几页
         */
        // itemContainerClass: function(type, page, current){
        //     console.log('type: ' +　type);
        //     console.log('page: ' + page);
        //     console.log('current: ' +　current);
        // },

        /**
         * @desc 该参数的作用就是设置超链接的链接地址
         */
        // pageUrl: function(type, page, current){
        //     return "http://www.baidu.com"+page;
        // },

        /**
         * @desc 用于设置某个操作按钮是否显示
         */
        // shouldShowPage: function(type, page, current){
        //     switch(type)
        //     {
        //         case "first":
        //         case "last":
        //             return false;
        //         default:
        //             return true;
        //     }
        // },

        /**
         * @desc 控制每个操作按钮的显示文字
         */
        // itemTexts: function (type, page, current) {
        //     switch (type) {
        //         case "first":
        //             return "First";
        //         case "prev":
        //             return "Previous";
        //         case "next":
        //             return "Next";
        //         case "last":
        //             return "Last";
        //         case "page":
        //             return "p" + page;
        //     }
        // },
        
        /**
         * @desc 为操作按钮绑定click事件
         */
        onPageClicked: function(event,originalEvent,type,page){
            console.log('event: ' + event);
            console.log('originalEvent: ' + originalEvent);
            console.log('type: ' + type);
            console.log('page: ' +　page);
        },
        
        /**
         * @desc 为操作按钮绑定页码改变事件
         */
        // onPageChanged: function(event,oldPage,newPage){
        //     console.log('event: ' + event);
        //     console.log('oldPage: ' + oldPage);
        //     console.log('newPage: ' + newPage);
        // },


    }
    
    $('#example').bootstrapPaginator(options);

})