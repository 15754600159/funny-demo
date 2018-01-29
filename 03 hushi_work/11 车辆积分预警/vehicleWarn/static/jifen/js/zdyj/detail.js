$(function () {
    var url = window.location.search.substring(1);
   // var url = 'zdsjlx=涉军群体&qtlx=企业军转干部';
    init();
    function init() {
        var getParaObj = util.getUrlParameter(url);

        util.request({
            url: util.getServerUrl('/member/getQtlxMem/'+getParaObj.zdsjlx+'/'+getParaObj.qtlx),
            success:function (data) {
                var $tbody = $('.l_table').find('tbody');
                var $thead =  $('.l_table').find('thead');
                $thead.append('<tr>'+
                    '<th>序号</th>'+
                    '<th>身份证号</th>'+
                    '<th>姓名</th>'+
                    '<th>是否骨干</th>'+
                    '<th class="header adjust">基础积分</th>'+
                    '<th class="header">行为特征积分</th>'+
                    '<th class="header">关系维度积分</th>'+
                    '<th>状态</th>'+
                    '<th>操作</th>'+
                    ' </tr>');
                $.each(data,function (k,v) {
                    var baseScore = util.getClassName(v.jcjf);
                    var behavior = util.getClassName(v.xwtzjf);
                    var relation = util.getClassName(v.gxwdjf);
                    $tbody.append(
                        ' <tr>'+
                        '<td>'+(k+1)+'</td>'+
                        '<td>'+v.sfzh+'</td>'+
                        '<td>'+v.xm+'</td>'+
                        '<td>'+(v.sfggcy || '')+'</td>'+
                        '<td>'+
                        '<span class="number">'+v.jcjf+'</span>'+
                        '<span class="stat-box">'+
                        '<i class="stat-bg '+baseScore+'"'+'style=width:'+v.jcjf+'%'+'></i>'+
                        '</span>'+
                        '</td>'+
                        '<td>'+
                        '<span class="number">'+v.xwtzjf+'</span>'+
                        '<span class="stat-box">'+
                        '<i class="stat-bg '+behavior+'"'+'style=width:'+v.xwtzjf+'%'+'></i>'+
                        '</span>'+
                        '</td>'+
                        '<td>'+
                        '<span class="number">'+v.gxwdjf+'</span>'+
                        '<span class="stat-box">'+
                        '<i class="stat-bg '+relation+'"'+'style=width:'+v.gxwdjf+'%'+'></i>'+
                        '</span>'+
                        '</td>'+
                        '<td>已确认</td>'+
                        '<td><span class="opertation" data-zdsjlx='+v.zdsjlx+' data-qtlx='+v.qtlx+' data-sfzh='+v.sfzh+'></span></td>'+
                        '</tr>')
                })
            },
            error:function (msg) {
                console.log(msg);
            }
        });
        util.search();
        $('#qtlx').text(getParaObj.zdsjlx);
        $('#qtmc').text(getParaObj.qtlx);
        //操作跳转
        $('#l_table').on('click','.opertation',function () {
            var zdsjlx = $(this).data('zdsjlx');
            var qtlx = $(this).data('qtlx');
            var sfzh = $(this).data('sfzh');
            window.open('./judge.html?zdsjlx='+zdsjlx+'&qtlx='+qtlx+'&sfzh='+sfzh);
        });
    }

    //初始化表格排序
    $('#l_table').tablesorter({
        headers: {
            0: {sorter: false},
            1: {sorter: false},
            2: {sorter: false},
            3: {sorter: false},
            7: {sorter: false},
            8: {sorter: false}}
    });
})


$(function(){
    $('.l_table tbody').on('click', 'tr', function(){
        var sfzh = $('td:eq(1)', this).text();
        //$('#r_tbody').empty();
        util.request({
            url: util.getServerUrl('/member/getJfzl/' + sfzh),
            success:function (data) {
                var $tbody= $('#r_tbody').empty();
                $.each(data, function(i, r){
                    $tbody.append('<tr>\
										  <td>'+(i+1)+'</td>\
										  <td>'+r.type+'</td>\
										  <td>'+r.rule+'</td>\
										  <td class="mid-score">'+('+' + r.coin)+'</td>\
										</tr>');
                });
            },
            error:function (msg) {
                console.log(msg);
            }
        });
    });
});
