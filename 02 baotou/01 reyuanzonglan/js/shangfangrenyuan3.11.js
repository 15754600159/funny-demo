define(function(require, exports, module) {
    var commonFunc = require('./person');

    $(function(){
        var pages,//分页数
              size;//页面数量

        // 省份籍贯下拉框初始查询
        commonFunc.selectInitQuery('myDataShen', '<option>省份籍贯</option>', url.sheng);
        // 查询的点击事件绑定
        queryClickBind();
        // 页面右下角页面翻页控制器事件绑定
        commonFunc.pageControlBind();
        //下拉框的联动
        commonFunc.selectLink();
    })
    
});





// 查询的点击事件绑定
function queryClickBind(){

    $('#query').off('click').on('click', function(){
        pages = 10;//分页数 ----------暂时写死
        size = 5;//每页显示信息数数量 ----------暂时写死
        var data = {
            jgdm_sf: $('#myDataShen option:selected').text(),
            jgdm_s: $('#myDataShi option:selected').text(),
            jgdm_qx: $('#myDataXian option:selected').text(),
            nl1: $('#myDataYear option:selected').val()*10,
            nl2: $('#myDataYear option:selected').val()*10 + 10,
            xbdm: $('#myDataSex option:selected').text(),
            from: pages,
            size1: size
        }
        // alert('jgdm_sf: ' + data.jgdm_sf + '; jgdm_s: ' + data.jgdm_s + '; jgdm_qx: ' + data.jgdm_qx + '; nl1: ' + data.nl1 + '; nl2: ' + data.nl2 + '; xbdm: ' + data.xbdm + '; from: ' + data.from + '; size1: ' + data.size1)
        $.ajax({
            type: 'GET',
            url: url.person11,
            dataType: 'json',
            data: data,
            success: function(person){
                //...
                // console.log(person.data);
                var personGroup = person.data;
                var htmlCode = '';
                for(var i = 0; i<(person.total + 1); i++){
                    var page = Math.ceil(i/size);
                    htmlCode += `<tr class="page${page}">
                                    <td>${personGroup[i].xm?personGroup[i].xm:'-'}</td>
                                    <td>${personGroup[i].zjhm?personGroup[i].zjhm:'-'}</td>
                                    <td>${personGroup[i].xbdm?personGroup[i].xbdm:'-'}</td>
                                    <td>${personGroup[i].mz?personGroup[i].mz:'-'}</td>
                                    <td>${personGroup[i].jgmc_sf?personGroup[i].jgmc_sf:'-'}-${personGroup[i].jgmc_s?personGroup[i].jgmc_s:'-'}-${personGroup[i].jgmc_qx?personGroup[i].jgmc_qx:'-'}</td>
                                    <td>${personGroup[i].nl?personGroup[i].nl:'-'}</td>
                                    <td>${personGroup[i].zy?personGroup[i].zy:'-'}</td>
                                    <td>${personGroup[i].xlmc?personGroup[i].xlmc:'-'}</td>
                                    <td>${personGroup[i].jlxmc?personGroup[i].jlxmc:'-'}</td>
                                    <td>${personGroup[i].sflxmc?personGroup[i].sflxmc:'-'}</td>
                                </tr>`;
                }
                $('#tableBody').html(htmlCode);
                //隐藏后面几页的数据
                $('#tableBody tr').not('.page1').hide();
                //显示左下角和右下角的元素
                $('.pageInfo, .dataPage').css('display', '')
                // 页面左下角提示信息
                $('.pageInfo .dataSubNum').text(size);
                $('.pageInfo .dataCouNum').text(person.total);
            },
            error: function(){
                //...
                console.log('人员总览信息查询出错了！');
            } 
        })
    })

}
