define(function(require, exports, module) {


    // 下拉框初始查询
    function selectInitQuery(selectID, htmlCode, url){

        $.ajax({
                type: 'GET',
                url: url,
                dataType: 'json',
                success: function(data){
                    var provinceGroup = data.province;
                    for(var i = 0; i<provinceGroup.length; i++){
                        htmlCode += '<option>' + provinceGroup[i] + '</option>';
                    }
                    $('#' + selectID).html(htmlCode);
                },
                error: function(){
                    //...
                    console.log('下拉框初始查询出错了！');
                } 
         });
        
    }






    // 页面右下角页面翻页控制器事件绑定
    function pageControlBind(){
        $('.pageControl li').not('.pageControl li:first').not('.pageControl li:last').off('click').on('click', function(e){
            var nodeLi = e.currentTarget;
            var index = $(nodeLi).index();
            var nodeGroup = $('.pageControl li');
            var page = $(nodeLi).text();
            var pageName = '.page' + page;
            var htmlCode = '';

            // 右下角页面分页控制器
            $('.pageControl li').not('.pageControl li:first').not('.pageControl li:last').removeClass('active');
            $(nodeLi).addClass('active');

            switch(index){
                case 1:
                    var node1 = $(nodeGroup[1]);
                    if(node1.text() > 2){
                        $('.pageControl li:eq(4), .pageControl li:eq(5)').remove();
                        htmlCode = `<li><a href="#">${Number(node1.text()) - 2}</a></li>
                                           <li><a href="#">${Number(node1.text()) - 1}</a></li>`;
                        node1.before(htmlCode);
                    }else if(node1.text() == 2){
                        $('.pageControl li:eq(5)').remove();
                        htmlCode = `<li><a href="#">${Number(node1.text()) - 1}</a></li>`;
                        node1.before(htmlCode);
                    }else{
                        //do nothing...
                    }
                    // 添加元素之后再绑定一次
                    pageControlBind();
                    break;
                case 5:
                    var node5 = $(nodeGroup[5]);
                    if(node5.text() < pages-1){
                        $('.pageControl li:eq(1), .pageControl li:eq(2)').remove();
                        htmlCode = `<li><a href="#">${Number(node5.text()) + 1}</a></li>
                                           <li><a href="#">${Number(node5.text()) + 2}</a></li>`;
                        node5.after(htmlCode);
                    }else if(node5.text() == pages-1){
                        $('.pageControl li:eq(1)').remove();
                        htmlCode = `<li><a href="#">${Number(node5.text()) + 1}</a></li>`;
                        node5.after(htmlCode);
                    }else{
                        //do nothing...
                    }
                    // 添加元素之后再绑定一次
                    pageControlBind();
                    break;
                default:
                    // do nothing...
            }

            // 页面左下角提示信息
            $('.pageInfo .dataSubNum').text(size*page);

            // 列表信息显示隐藏
            $('#tableBody tr').hide();
            $(pageName).show();
        });

        // 上一页
        $('.pageControl li:first').off('click').on('click', function(){
            var activeNode = $('.pageControl').find('.active');
            var preIndex = activeNode.index() - 1;
            if(activeNode.text() <= 1) return ;
            var preNode = $('.pageControl li').eq(preIndex);
            preNode.trigger('click');
        });
        // 下一页
        $('.pageControl li:last').off('click').on('click', function(){
            var activeNode = $('.pageControl').find('.active');
            var nextIndex = activeNode.index() + 1;
            if(activeNode.text() >= pages) return ;
            var nextNode = $('.pageControl li').eq(nextIndex);
            nextNode.trigger('click');
        });

    }







    //下拉框的联动（籍贯3级）    
    function selectLink(){
        // 省份籍贯的change监听
        $('#myDataShen').change(function(){
            var province = $('#myDataShen option:selected').text();
            $('#myDataXian').html('<option>区县籍贯</option>');
            var data = {
                jgdm_sf: province
            };

            $.ajax({
                    type: 'GET',
                    url: url.shi,
                    data: data,
                    dataType: 'json',
                    success: function(data){
                        var shiGroup = data.shi;
                        var htmlCode = '<option>市级籍贯</option>';
                        for(var i = 0; i<shiGroup.length; i++){
                            htmlCode += '<option>' + shiGroup[i] + '</option>';
                        }
                        $('#myDataShi').html(htmlCode);
                    },
                    error: function(){
                        //...
                        console.log('查询市级籍贯出错了！');
                    } 
             });
        });

        // 市级籍贯的change监听
        $('#myDataShi').change(function(){
            var province = $('#myDataShen option:selected').text();
            var shi = $('#myDataShi option:selected').text();
            var data = {
                jgdm_sf: province,
                jgdm_s: shi
            };

            $.ajax({
                    type: 'GET',
                    url: url.xian,
                    data: data,
                    dataType: 'json',
                    success: function(data){
                        var xianGroup = data.xian;
                        var htmlCode = '<option>区县籍贯</option>';
                        for(var i = 0; i<xianGroup.length; i++){
                            htmlCode += '<option>' + xianGroup[i] + '</option>';
                        }
                        $('#myDataXian').html(htmlCode);
                    },
                    error: function(){
                        //...
                        console.log('查询区县籍贯出错了！');
                    } 
             });
        });
    }





     //下拉框的联动（行政区划2级）    
    function selectLink2(){
        // 一级行政区划的change监听
        $('#myDataYiji').change(function(){
            var yiJi = $('#myDataYiji option:selected').text();
            var data = {
                ld_xzqh: yiJi
            };

            $.ajax({
                    type: 'GET',
                    url: url.erJi,
                    data: data,
                    dataType: 'json',
                    success: function(data){
                        var erJiGroup = data.erJi;
                        var htmlCode = '<option>一级行政区划</option>';
                        for(var i = 0; i<erJiGroup.length; i++){
                            htmlCode += '<option>' + erJiGroup[i] + '</option>';
                        }
                        $('#myDataErji').html(htmlCode);
                    },
                    error: function(){
                        //...
                        console.log('查询二级行政区划出错了！');
                    } 
             });
        });

    }






    return {
        selectInitQuery: selectInitQuery,
        pageControlBind: pageControlBind,
        selectLink: selectLink,
        selectLink2: selectLink2
    };
    
    
});




//加载日历
// function calendar(){
// 	startDate =moment(moment().subtract(30, 'days').calendar()).format("YYYY-MM-DD");
//          endDate = moment().format("YYYY-MM-DD");

//     //日期，默认时间设成当日到前30天
//     $('#reservation').val(startDate + ' - ' + endDate);
//     $('#reservation').daterangepicker({
//         'locale': locale,
//         format:"YYYY-MM-DD",
//         startDate:startDate,
//         endDate:endDate,
//     }, function(start, end) {
//         startTime=start.format('YYYY-MM-DD');
//         endTime=end.format('YYYY-MM-DD');
//         console.log(startTime);
//     });

// }