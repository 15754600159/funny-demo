define(function(require) {
    require('./jquery.tablesorter.min');
    require('./plugins/bootstrap-pagination.min');
    // var config = require('./urlconfig');
    var isScale = true;
    var graphModule = new(require('core/common/graphchart/graphchart'))();
    var util = require('./zdyj/util.js').util;
    var $scale = $('#scale');
    var $left = $('.con_left');
    var $right = $('.con_right');
    var $rsecond = $('.r_second');
    var $rthird = $('.r_third');
    /* 身份证和姓名的查询接口*/

    $('.r_second').on('click', '#scale', function(e) {
        e.stopPropagation();
        if (isScale) {
            $scale.addClass('icon-shrink2');
            $left.hide();
            $right.animate({
                'width': '100%'
            }, 500)
            $rsecond.animate({ 'height': '800px' }, 500);
            $rthird.hide();
            setTimeout(function() {
                graph.zoom(0.6);
            }, 600);
            setTimeout(function() {
                graphModule.adjustzoom();
            }, 600);
            isScale = false;
        } else {
            $scale.removeClass('icon-shrink2');
            $left.show();
            $right.animate({
                'width': '35%'
            }, 500)
            $rsecond.animate({ 'height': '316px' }, 500);
            $rthird.show();
            setTimeout(function() {
                graph.zoom(0.2);
            }, 600);
            setTimeout(function() {
                graphModule.adjustzoom();
            }, 600);
            isScale = true
        }
    })
    $(function() {
        var url = window.location.search.substring(1);
        var getParaObj = util.getUrlParameter(url);
        $.ajax({
            type: "get",
            url: '/zdsjyj/member/getQtlxMem/' + getParaObj.zdsjlx + '/' + getParaObj.qtlx,
            headers:{
                'operate_type':1,
                'user_token':sessionStorage.getItem('userToken')
            },
            success: function(data) {
                //排序
                if(data.message === 'login deny'){
                    alert('session过期，请重新登录!');
                    location.href = 'http://10.102.6.141';
                    return false;
                }
                data.data = data.data.sort(function(a,b){
                    var totala = parseInt(a.jcjf) + parseInt(a.xwtzjf) + parseInt(a.gxwdjf);
                    var totalb = parseInt(b.jcjf) + parseInt(b.xwtzjf) + parseInt(b.gxwdjf);
                    console.log(totala + "---" + totalb);
                    return totalb-totala;
                });
                console.log(data.data);
                var $tbody = $('#jifen_tbody');
                $.each(data.data, function(k, v) {
                    var baseScore = util.getClassName(v.jcjf);
                    var behavior = util.getClassName(v.xwtzjf);
                    var relation = util.getClassName(v.gxwdjf);
                    // console.log(v);
                    $tbody.append(
                        '<tr>' +
                        '<td>' + (k + 1) + '</td>' +
                        '<td>' + v.sfzh + '</td>' +
                        '<td>' + v.xm + '</td>' +
                        '<td>' + v.sfggcy + '</td>' +
                        '<td>' +
                        '<span class="number">' + v.jcjf + '</span>' +
                        '<span class="stat-box">' +
                        '<i class="stat-bg ' + baseScore + '"' + 'style=width:' + v.jcjf + '%' + '></i>' +
                        '</span>' +
                        '</td>' +
                        '<td>' +
                        '<span class="number">' + v.xwtzjf + '</span>' +
                        '<span class="stat-box">' +
                        '<i class="stat-bg ' + behavior + '"' + 'style=width:' + v.xwtzjf + '%' + '></i>' +
                        '</span>' +
                        '</td>' +
                        '<td>' +
                        '<span class="number">' + v.gxwdjf + '</span>' +
                        '<span class="stat-box">' +
                        '<i class="stat-bg ' + relation + '"' + 'style=width:' + v.gxwdjf + '%' + '></i>' +
                        '</span>' +
                        '</td>' +
                        '<td>'+(v.status==0? '未确认':'已确认')+'</td>' +
                        '<td><span class="opertation" data-zdsjlx=' + v.zdsjlx + ' data-qtlx=' + v.qtlx + ' data-sfzh=' + v.sfzh + '></span></td>' +
                        '</tr>')
                })
                $('.l_table tbody').on('click', 'tr', function() {
                    var sfzh = $('td:eq(1)', this).text();
                    //获取右边表格的内容
                    util.request({
                        url: util.getServerUrl('/member/getJfzl/' + sfzh),
                        success: function(data) {
                            var $tbody = $('#r_tbody').empty();
                            var $infomation = $('.r_header .infoMation').empty();
                            $.each(data, function(i, r) {
                                var num = parseInt(r.coin);
                                var name = '';
                                if(num>80){
                                    name = 'high-score'
                                }else if(num>40){
                                    name = 'mid-score'
                                }else{
                                    name = 'low-score'
                                }
                                $tbody.append('<tr>\
                                          <td>' + (i + 1) + '</td>\
                                          <td>' + r.type + '</td>\
                                          <td>' + r.rule + '</td>\
                                          <td class='+name+'>' + ('+' + r.coin) + '</td>\
                                        </tr>');
                                $infomation.append('<span>' + r.rule + '</span>')
                            });
                        },
                        error: function(msg) {
                            console.log(msg);
                        }
                    });
                });
                util.search();
                $('#qtlx').text(getParaObj.zdsjlx);
                $('#qtmc').text(getParaObj.qtlx);
                //操作跳转
                $('#l_table').on('click', '.opertation', function() {
                    var zdsjlx = $(this).data('zdsjlx');
                    var qtlx = $(this).data('qtlx');
                    var sfzh = $(this).data('sfzh');
                    window.open('./judge.html?zdsjlx=' + zdsjlx + '&qtlx=' + qtlx + '&sfzh=' + sfzh);
                });
                Moren();
                $('#jifen_tbody').on('click', 'tr', function() {
                    $(this).css('background', '#d9e8fb').siblings('tr').css('background', '#f9f9f9');
                    var graphModule = new(require('core/common/graphchart/graphchart'))();
                    var sfzh = $(this).children('td').eq(1).text();
                    var usrname = $(this).children('td').eq(2).text();
                    $('.r_header .cz_xm').empty();
                    $('.r_header .cz_xm').append('<span>'+usrname+'</span><span>'+sfzh+'</span>');
                    //标签模块
                    //$('.r_second').empty('div');
                    graphModule.init({
                        container: $('.r_second'),
                        readyCallback: function() {
                            window.dragon = this;
                            $.ajax({
                                url: util.getServerUrl('/graphs/getAnalysisWithGraph'),
                                data: { sfzh: sfzh },
                                headers:{
                                    'operate_type':1,
                                    'user_token':sessionStorage.getItem('userToken')
                                },
                                success: function(data) {
                                    if(data.message === 'login deny'){
                                        alert('session过期，请重新登录!');
                                        location.href = 'http://10.102.6.141';
                                        return false;
                                    }
                                    $('.r_second').append('<span id="scale" class="icon-enlarge2"></span>');
                                    var data = JSON.parse(data);
                                    graphModule.appenddata({ v: [data.v[0]] });
                                    setTimeout(function() {
                                        graphModule.appenddata(data);
                                    }, 300)
                                }
                            })
                        },
                        selectCallback: function() {},
                        dataCallback: function() {
                            setTimeout(function() {
                                graphModule.adjustzoom();
                            }, 500)
                        }
                    });
                })
            },
            complete: function(data) {
                $('#l_table').tablesorter({
                    headers: {
                        0: { sorter: false },
                        1: { sorter: false },
                        2: { sorter: false },
                        3: { sorter: false },
                        7: { sorter: false },
                        8: { sorter: false }
                    }
                });
                /*传递参数*/
                $('.detail').click(function(e) {
                    e.stopPropagation();
                    var sfid = $(this).parent().parent().children('td:nth-child(2)').text();
                    window.open('./yjlDetails.html?id=' + sfid);
                })
            }
        });
        //标签 表格 默认选取大表格中的第一个
        function Moren() {
            var graphModule = new(require('core/common/graphchart/graphchart'))();
            var Firsfzh = $('#jifen_tbody>tr:first').children('td').eq(1).text();
            var username = $('#jifen_tbody>tr:first').children('td').eq(2).text();
            $('.r_header .cz_xm').append('<span>'+username+'</span><span>'+Firsfzh+'</span>');
            graphModule.init({
                container: $('.r_second'),
                readyCallback: function() {
                    window.dragon = this;
                    $.ajax({
                        url: util.getServerUrl("/graphs/getAnalysisWithGraph"),
                        data: { sfzh: Firsfzh },
                        headers:{
                            'operate_type':1,
                            'user_token':sessionStorage.getItem('userToken')
                        },
                        success: function(data) {
                            if(data.message === 'login deny'){
                                alert('session过期，请重新登录!');
                                location.href = 'http://10.102.6.141/';
                                return false;
                            }
                            $('.r_second').append('<span id="scale" class="icon-enlarge2"></span>');
                            var data = JSON.parse(data);
                            graphModule.appenddata({ v: [data.v[0]] });
                            setTimeout(function() {
                                graphModule.appenddata(data);
                            }, 300)
                        }
                    })
                },
                dataCallback: function() {
                    setTimeout(function() {
                        graphModule.adjustzoom();
                    }, 500)
                }});
            util.request({
                        url: util.getServerUrl('/member/getJfzl/' + Firsfzh),
                        success: function(data) {
                            var $tbody = $('#r_tbody').empty();
                            $.each(data, function(i, r) {
                                $tbody.append('<tr>\
                                          <td>' + (i + 1) + '</td>\
                                          <td>' + r.type + '</td>\
                                          <td>' + r.rule + '</td>\
                                          <td class="mid-score">' + ('+' + r.coin) + '</td>\
                                        </tr>');
                                $('.r_header .infoMation').append('<span>' + r.rule + '</span>');
                            });
                        },
                        error: function(msg) {
                            console.log(msg);
                        }});
        }
    })
});