define(function (require) {
    require('../../common/gallery/tablesorter/jquery.tablesorter.min');
    var config = require('./urlconfig');
    var isScale = true;
    var graphModule = new (require('core/common/graphchart/graphchart'))();
    function initGraph(seg) {
        graphModule.init({
            container: $('.r_second'),
            readyCallback: function () {
                graph = this;
                window.dragon = graph;
                $.ajax({
                    url: config.url + "/bg/bggx",
                    data: {sfzh: seg},
                    success: function (data) {
                        $('.r_second').append('<span id="scale" class="icon-enlarge2"></span>');
                        var data = JSON.parse(data);
                        graphModule.appenddata({v: [data.v[0]]});
                        setTimeout(function () {
                            graphModule.appenddata(data);
                        }, 300)
                    }
                })
            },
            dataCallback: function () {
                setTimeout(function () {
                    graphModule.adjustzoom();
                }, 500)
            }
        });
    }
    /*查询结果*/
    $('.search-logo').click(function (e) {
        e.stopPropagation();
        e.preventDefault();
        var keyword = $('#keyword').val();
        var reg = /^[0-9]*/;
        if (reg.test(keyword)) {
            console.log(1);
        } else {
            console.log(2);
        }
    });
    var $scale = $('#scale');
    var $left = $('.con_left');
    var $right = $('.con_right');
    var $rsecond = $('.r_second');
    var $rthird = $('.r_third');

    $rsecond.on('click', '#scale', function (e) {
        //var graphModule1 = new (require('core/common/graphchart/graphchart'))();
        e.preventDefault();
        e.stopPropagation();
        if (isScale) {
            $scale.addClass('icon-shrink2');
            $left.hide();
            $right.animate({
                'width': '100%'
            }, 500)
            $rsecond.animate({'height': '800px'}, 500);
            $rthird.hide();
            setTimeout(function () {
                graph.zoom(0.6);
            }, 600);
            setTimeout(function () {
                graphModule.adjustzoom();
            }, 600);
            isScale = false;
        } else {
            $scale.removeClass('icon-shrink2');
            $left.show();
            $right.css({
                'width': '35%'
            })
            $rsecond.css({'height': '316px'});
            $rthird.show();
            graph.zoom(0.2);
            setTimeout(function () {
                graphModule.adjustzoom();
            }, 600);
            isScale = true
        }
    })
    $(function () {
        $.ajax({
            type: "get",
            url: config.url + "/bg/czAll",
            async: true,
            success: function (data) {
                //总的表格
                var i = 1;
                $.each(data, function (k, v) {
                    var Num = Number(v.dctx) + Number(v.dctz) + Number(v.txtz) + Number(v.tx) + Number(v.thb) + Number(v.twtz) + Number(v.twz) + Number(v.cy) + Number(v.th) + Number(v.wfztsw) + Number(v.tcz);
                    $('#jifen_tbody').append(
                        "<tr>" +
                        "<td>" + i + "</td>" +
                        "<td>" + v.sfzh + "</td>" +
                        "<td>" + v.xm + "</td>" +
                        "<td class='orange'>" + v.total + "</td>" +
                        "<td class='sparse'>" + Num + "</td>" +
                        "<td class='dense'>" + v.zf + "</td>" +
                        "<td><button class='btn btn-default' style='margin-right:4px;'>图析</button><button class='btn btn-default'>详情</button></td>" +
                        "</tr>"
                    );
                    i++;
                });
                Moren();
                $('#jifen_tbody').on('click', 'tr', function () {
                    $(this).css('background', '#d9e8fb').siblings('tr').css('background', '#f9f9f9');
                    //var graphModule = new (require('core/common/graphchart/graphchart'))();
                    var sfzh = $(this).children('td').eq(1).text();
                    //标签模块
                    //$('.r_second').empty('div');
                    initGraph(sfzh);
                    $.ajax({
                        type: "get",
                        url: config.url + "/bg/bq?sfzh=" + sfzh,
                        async: true,
                        success: function (data1) {
                            $('.cz_xm').html('');
                            $('.infoMation>span').hide();
                            var str = '';

                            $.each(data1, function (k, v) {
                                str = v.xm + '---身份证号：' + v.sfzh
                                if (v.zdr == 1) $('.zdr').show();
                                if (v.yhdc == 1) $('.yhdc').show();
                                if (v.yrcls == 1) $('.yrcls').show();
                                if (v.cjbgry == 1) $('.cjbgry').show();
                                if (v.lsdcry == 1) $('.lsdcry').show();
                                if (v.gzdw_zf == 1) $('.gzdw_zf').show();
                                if (v.gzdw_ygc == 1) $('.gzdw_ygc').show();
                                if (v.gzdw_jtj == 1) $('.gzdw_jtj').show();
                                if (v.gzdw_flgzz == 1) $('.gzdw_flgzz').show();
                                if (v.zdgzdx_bcdc == 1) $('.zdgzdx_bcdc').show();
                                if (v.zdgzdx_gjfj == 1) $('.zdgzdx_gjfj').show();
                            });
                            $('.cz_xm').text(str);
                        }
                    });
                    //右边的表格
                    $.ajax({
                        type: "get",
                        url: config.url + "/code/qzbl",
                        async: true,
                        success: function (dataLx) {
                            var types = {};

                            $.each(dataLx, function (k, v) {
                                types[v.code] = v.name
                            });
                            $.ajax({
                                type: "get",
                                url: config.url + "/bg/gz?czsfzh=" + sfzh,
                                async: true,
                                success: function (data2) {
                                    $('#r_tbody').empty();
                                    //规则
                                    //console.log(data2)
                                    $.each(data2.bgGz1List, function (k, v) {
                                        var gzdw_zf = '',
                                            gzdw_ygc = '',
                                            lsdcry = '',
                                            cjbgry = '',
                                            gzdw_flgzz = '',
                                            gzdw_jtj = '',
                                            yhdc = '',
                                            yrcls = '',
                                            zdgzdx_bcdc = '',
                                            zdgzdx_gjfj = '',
                                            zdgzdx_sjdb = '',
                                            zdr = '';
                                        //分数
                                        var gzdw_zf1 = '',
                                            gzdw_ygc1 = '',
                                            lsdcry1 = '',
                                            cjbgry1 = '',
                                            gzdw_flgzz1 = '',
                                            gzdw_jtj1 = '',
                                            yhdc1 = '',
                                            yrcls1 = '',
                                            zdgzdx_bcdc1 = '',
                                            zdgzdx_gjfj1 = '',
                                            zdgzdx_sjdb1 = '',
                                            zdr1 = '';

                                        $.each(v, function (i, g) {
                                            if (i == 'gzdw_zf' && g > 0) {
                                                gzdw_zf = '政府工作人员<br />'
                                                gzdw_zf1 = g + '<br />'
                                            } else if (i == 'gzdw_ygc' && g > 0) {
                                                gzdw_ygc = '运管处工作人员<br />'
                                                gzdw_ygc1 = g + '<br />'
                                            } else if (i == 'lsdcry' && g > 0) {
                                                lsdcry = '历史打处人员<br />'
                                                lsdcry1 = g + '<br />'
                                            } else if (i == 'cjbgry' && g > 0) {
                                                cjbgry = '参加罢工人员<br />'
                                                cjbgry1 = g + '<br />'
                                            } else if (i == 'gzdw_flgzz' && g > 0) {
                                                gzdw_flgzz = '法律工作者<br />'
                                                gzdw_flgzz1 = g + '<br />'
                                            } else if (i == 'gzdw_jtj' && g > 0) {
                                                gzdw_jtj = '交通局工作人员<br />'
                                                gzdw_jtj1 = g + '<br />'
                                            } else if (i == 'yhdc' && g > 0) {
                                                yhdc = '一户多车<br />'
                                                yhdc1 = g + '<br />'
                                            } else if (i == 'yrcls' && g > 0) {
                                                yrcls = '一人车量数<br />'
                                                yrcls1 = g + '<br />'
                                            } else if (i == 'zdgzdx_bcdc' && g > 0) {
                                                zdgzdx_bcdc = '重点关注对象<br />'
                                                zdgzdx_bcdc1 = g + '<br />'
                                            } else if (i == 'zdgzdx_gjfj' && g > 0) {
                                                zdgzdx_gjfj = '重点关注对象_公交分局<br />'
                                                zdgzdx_gjfj1 = g + '<br />'
                                            } else if (i == 'zdgzdx_sjdb' && g > 0) {
                                                zdgzdx_sjdb = '重点关注对象_司机代表<br />'
                                                zdgzdx_sjdb1 = g + '<br />'
                                            } else if (i == 'zdr' && g > 0) {
                                                zdr = '重点人员<br />'
                                                zdr1 = g + '<br />'
                                            }
                                        });
                                        $('#r_tbody').append(
                                            "<tr>" +
                                            "<td>" + v.xm + "</td>" +
                                            "<td>车主本人</td>" +
                                            "<td>" + gzdw_zf + gzdw_ygc + lsdcry + cjbgry + gzdw_flgzz + gzdw_jtj + yhdc + yrcls + zdgzdx_bcdc + zdgzdx_gjfj + zdgzdx_sjdb + zdr + "</td>" +
                                            "<td>" + gzdw_zf1 + gzdw_ygc1 + lsdcry1 + cjbgry1 + gzdw_flgzz1 + gzdw_jtj1 + yhdc1 + yrcls1 + zdgzdx_bcdc1 + zdgzdx_gjfj1 + zdgzdx_sjdb1 + zdr1 + "</td>" +
                                            "</tr>"
                                        )
                                    });
                                    /*$('#r_tbody>tr').eq(0).css({
                                     background: '#abcdef',
                                     color: '#fff',
                                     });*/
                                    $.each(data2.bgGzList, function (k, v) {
                                        var gzdw_zf = '',
                                            gzdw_ygc = '',
                                            lsdcry = '',
                                            cjbgry = '',
                                            gzdw_flgzz = '',
                                            gzdw_jtj = '',
                                            yhdc = '',
                                            yrcls = '',
                                            zdgzdx_bcdc = '',
                                            zdgzdx_gjfj = '',
                                            zdgzdx_sjdb = '',
                                            zdr = '';
                                        //分数
                                        var gzdw_zf1 = '',
                                            gzdw_ygc1 = '',
                                            lsdcry1 = '',
                                            cjbgry1 = '',
                                            gzdw_flgzz1 = '',
                                            gzdw_jtj1 = '',
                                            yhdc1 = '',
                                            yrcls1 = '',
                                            zdgzdx_bcdc1 = '',
                                            zdgzdx_gjfj1 = '',
                                            zdgzdx_sjdb1 = '',
                                            zdr1 = '';
                                        //console.log(v)
                                        $.each(v, function (i, g) {
                                            if (i == 'gzdw_zf' && g > 0) {
                                                gzdw_zf = '政府工作人员<br />'
                                                gzdw_zf1 = g + '<br />'
                                            } else if (i == 'gzdw_ygc' && g > 0) {
                                                gzdw_ygc = '运管处工作人员<br />'
                                                gzdw_ygc1 = g + '<br />'
                                            } else if (i == 'lsdcry' && g > 0) {
                                                lsdcry = '历史打处人员<br />'
                                                lsdcry1 = g + '<br />'
                                            } else if (i == 'cjbgry' && g > 0) {
                                                cjbgry = '参加罢工人员<br />'
                                                cjbgry1 = g + '<br />'
                                            } else if (i == 'gzdw_flgzz' && g > 0) {
                                                gzdw_flgzz = '法律工作者<br />'
                                                gzdw_flgzz1 = g + '<br />'
                                            } else if (i == 'gzdw_jtj' && g > 0) {
                                                gzdw_jtj = '交通局工作人员<br />'
                                                gzdw_jtj1 = g + '<br />'
                                            } else if (i == 'yhdc' && g > 0) {
                                                yhdc = '一户多车<br />'
                                                yhdc1 = g + '<br />'
                                            } else if (i == 'yrcls' && g > 0) {
                                                yrcls = '一人车量数<br />'
                                                yrcls1 = g + '<br />'
                                            } else if (i == 'zdgzdx_bcdc' && g > 0) {
                                                zdgzdx_bcdc = '重点关注对象<br />'
                                                zdgzdx_bcdc1 = g + '<br />'
                                            } else if (i == 'zdgzdx_gjfj' && g > 0) {
                                                zdgzdx_gjfj = '重点关注对象_公交分局<br />'
                                                zdgzdx_gjfj1 = g + '<br />'
                                            } else if (i == 'zdgzdx_sjdb' && g > 0) {
                                                zdgzdx_sjdb = '重点关注对象_司机代表<br />'
                                                zdgzdx_sjdb1 = g + '<br />'
                                            } else if (i == 'zdr' && g > 0) {
                                                zdr = '重点人员<br />'
                                                zdr1 = g + '<br />'
                                            }
                                        });
                                        $('#r_tbody').append(
                                            "<tr>" +
                                            "<td>" + v.xm + "</td>" +
                                            "<td>" + types[v.type] + "</td>" +
                                            "<td>" + gzdw_zf + gzdw_ygc + lsdcry + cjbgry + gzdw_flgzz + gzdw_jtj + yhdc + yrcls + zdgzdx_bcdc + zdgzdx_gjfj + zdgzdx_sjdb + zdr + "</td>" +
                                            "<td>" + gzdw_zf1 + gzdw_ygc1 + lsdcry1 + cjbgry1 + gzdw_flgzz1 + gzdw_jtj1 + yhdc1 + yrcls1 + zdgzdx_bcdc1 + zdgzdx_gjfj1 + zdgzdx_sjdb1 + zdr1 + "</td>" +
                                            "</tr>"
                                        )
                                    });
                                }
                            });
                        }
                    });

                })

            },
            complete: function (data) {
                $('#l_table').tablesorter({
                    headers: {0: {sorter: false}, 1: {sorter: false}, 2: {sorter: false}, 6: {sorter: false}}
                });
                /* $('.search-logo').click(function () {
                 //需要操作的代码
                 var key = $('#keyword').val();
                 var tbody = $('#jifen_tbody');
                 var tr = tbody.children('tr');
                 var tablength = tr.length;
                 $.each(tr, function () {
                 var isName = $(this).children('td:nth-child(3)').text().match(key);
                 var isNum = $(this).children('td:nth-child(2)').text().match(key);
                 if (isName || isNum) {
                 $(this).show();
                 } else {
                 $(this).hide();
                 }
                 })
                 })*/
            }

        });
        //标签 表格 默认选取大表格中的第一个
        function Moren() {
            var Firsfzh = $('#jifen_tbody>tr:first').children('td').eq(1).text();
            initGraph(Firsfzh);
            $.ajax({
                type: "get",
                url: config.url + "/bg/bq?sfzh=" + Firsfzh,
                async: true,
                success: function (data1) {
                    $('.infoMation>span').hide();
                    var str = '';
                    $.each(data1, function (k, v) {
                        str = v.xm + '---身份证号：' + v.sfzh
                        if (v.zdr == 1) $('.zdr').show();
                        if (v.yhdc == 1) $('.yhdc').show();
                        if (v.yrcls == 1) $('.yrcls').show();
                        if (v.cjbgry == 1) $('.cjbgry').show();
                        if (v.lsdcry == 1) $('.lsdcry').show();
                        if (v.gzdw_zf == 1) $('.gzdw_zf').show();
                        if (v.gzdw_ygc == 1) $('.gzdw_ygc').show();
                        if (v.gzdw_jtj == 1) $('.gzdw_jtj').show();
                        if (v.gzdw_flgzz == 1) $('.gzdw_flgzz').show();
                        if (v.zdgzdx_bcdc == 1) $('.zdgzdx_bcdc').show();
                        if (v.zdgzdx_gjfj == 1) $('.zdgzdx_gjfj').show();
                    });
                    $('.cz_xm').text(str);
                }
            });
            //右边的表格
            $.ajax({
                type: "get",
                url: config.url + "/code/qzbl",
                async: true,
                success: function (dataLx1) {
                    var types = {}
                    $.each(dataLx1, function (k, v) {
                        types[v.code] = v.name
                    });
                    $.ajax({
                        type: "get",
                        url: config.url + "/bg/gz?czsfzh=" + Firsfzh,
                        async: true,
                        success: function (data2) {
                            $('#r_tbody').empty();
                            //规则

                            //console.log(data2)
                            $.each(data2.bgGz1List, function (k, v) {
                                var gzdw_zf = '',
                                    gzdw_ygc = '',
                                    lsdcry = '',
                                    cjbgry = '',
                                    gzdw_flgzz = '',
                                    gzdw_jtj = '',
                                    yhdc = '',
                                    yrcls = '',
                                    zdgzdx_bcdc = '',
                                    zdgzdx_gjfj = '',
                                    zdgzdx_sjdb = '',
                                    zdr = '';
                                //分数
                                var gzdw_zf1 = '',
                                    gzdw_ygc1 = '',
                                    lsdcry1 = '',
                                    cjbgry1 = '',
                                    gzdw_flgzz1 = '',
                                    gzdw_jtj1 = '',
                                    yhdc1 = '',
                                    yrcls1 = '',
                                    zdgzdx_bcdc1 = '',
                                    zdgzdx_gjfj1 = '',
                                    zdgzdx_sjdb1 = '',
                                    zdr1 = '';
                                $.each(v, function (i, g) {
                                    if (i == 'gzdw_zf' && g > 0) {
                                        gzdw_zf = '政府工作人员<br />'
                                        gzdw_zf1 = g + '<br />'
                                    } else if (i == 'gzdw_ygc' && g > 0) {
                                        gzdw_ygc = '运管处工作人员<br />'
                                        gzdw_ygc1 = g + '<br />'
                                    } else if (i == 'lsdcry' && g > 0) {
                                        lsdcry = '历史打处人员<br />'
                                        lsdcry1 = g + '<br />'
                                    } else if (i == 'cjbgry' && g > 0) {
                                        cjbgry = '参加罢工人员<br />'
                                        cjbgry1 = g + '<br />'
                                    } else if (i == 'gzdw_flgzz' && g > 0) {
                                        gzdw_flgzz = '法律工作者<br />'
                                        gzdw_flgzz1 = g + '<br />'
                                    } else if (i == 'gzdw_jtj' && g > 0) {
                                        gzdw_jtj = '交通局工作人员<br />'
                                        gzdw_jtj1 = g + '<br />'
                                    } else if (i == 'yhdc' && g > 0) {
                                        yhdc = '一户多车<br />'
                                        yhdc1 = g + '<br />'
                                    } else if (i == 'yrcls' && g > 0) {
                                        yrcls = '一人车量数<br />'
                                        yrcls1 = g + '<br />'
                                    } else if (i == 'zdgzdx_bcdc' && g > 0) {
                                        zdgzdx_bcdc = '重点关注对象<br />'
                                        zdgzdx_bcdc1 = g + '<br />'
                                    } else if (i == 'zdgzdx_gjfj' && g > 0) {
                                        zdgzdx_gjfj = '重点关注对象_公交分局<br />'
                                        zdgzdx_gjfj1 = g + '<br />'
                                    } else if (i == 'zdgzdx_sjdb' && g > 0) {
                                        zdgzdx_sjdb = '重点关注对象_司机代表<br />'
                                        zdgzdx_sjdb1 = g + '<br />'
                                    } else if (i == 'zdr' && g > 0) {
                                        zdr = '重点人员<br />'
                                        zdr1 = g + '<br />'
                                    }
                                });
                                $('#r_tbody').append(
                                    "<tr>" +
                                    "<td>" + v.xm + "</td>" +
                                    "<td>车主本人</td>" +
                                    "<td>" + gzdw_zf + gzdw_ygc + lsdcry + cjbgry + gzdw_flgzz + gzdw_jtj + yhdc + yrcls + zdgzdx_bcdc + zdgzdx_gjfj + zdgzdx_sjdb + zdr + "</td>" +
                                    "<td>" + gzdw_zf1 + gzdw_ygc1 + lsdcry1 + cjbgry1 + gzdw_flgzz1 + gzdw_jtj1 + yhdc1 + yrcls1 + zdgzdx_bcdc1 + zdgzdx_gjfj1 + zdgzdx_sjdb1 + zdr1 + "</td>" +
                                    "</tr>"
                                )
                            });
                            /*$('#r_tbody>tr').eq(0).css({
                             background: '#abcdef',
                             color: '#fff'
                             });*/
                            $.each(data2.bgGzList, function (k, v) {
                                var gzdw_zf = '',
                                    gzdw_ygc = '',
                                    lsdcry = '',
                                    cjbgry = '',
                                    gzdw_flgzz = '',
                                    gzdw_jtj = '',
                                    yhdc = '',
                                    yrcls = '',
                                    zdgzdx_bcdc = '',
                                    zdgzdx_gjfj = '',
                                    zdgzdx_sjdb = '',
                                    zdr = '';
                                //分数
                                var gzdw_zf1 = '',
                                    gzdw_ygc1 = '',
                                    lsdcry1 = '',
                                    cjbgry1 = '',
                                    gzdw_flgzz1 = '',
                                    gzdw_jtj1 = '',
                                    yhdc1 = '',
                                    yrcls1 = '',
                                    zdgzdx_bcdc1 = '',
                                    zdgzdx_gjfj1 = '',
                                    zdgzdx_sjdb1 = '',
                                    zdr1 = '';
                                $.each(v, function (i, g) {
                                    if (i == 'gzdw_zf' && g > 0) {
                                        gzdw_zf = '政府工作人员<br />'
                                        gzdw_zf1 = g + '<br />'
                                    } else if (i == 'gzdw_ygc' && g > 0) {
                                        gzdw_ygc = '运管处工作人员<br />'
                                        gzdw_ygc1 = g + '<br />'
                                    } else if (i == 'lsdcry' && g > 0) {
                                        lsdcry = '历史打处人员<br />'
                                        lsdcry1 = g + '<br />'
                                    } else if (i == 'cjbgry' && g > 0) {
                                        cjbgry = '参加罢工人员<br />'
                                        cjbgry1 = g + '<br />'
                                    } else if (i == 'gzdw_flgzz' && g > 0) {
                                        gzdw_flgzz = '法律工作者<br />'
                                        gzdw_flgzz1 = g + '<br />'
                                    } else if (i == 'gzdw_jtj' && g > 0) {
                                        gzdw_jtj = '交通局工作人员<br />'
                                        gzdw_jtj1 = g + '<br />'
                                    } else if (i == 'yhdc' && g > 0) {
                                        yhdc = '一户多车<br />'
                                        yhdc1 = g + '<br />'
                                    } else if (i == 'yrcls' && g > 0) {
                                        yrcls = '一人车量数<br />'
                                        yrcls1 = g + '<br />'
                                    } else if (i == 'zdgzdx_bcdc' && g > 0) {
                                        zdgzdx_bcdc = '重点关注对象<br />'
                                        zdgzdx_bcdc1 = g + '<br />'
                                    } else if (i == 'zdgzdx_gjfj' && g > 0) {
                                        zdgzdx_gjfj = '重点关注对象_公交分局<br />'
                                        zdgzdx_gjfj1 = g + '<br />'
                                    } else if (i == 'zdgzdx_sjdb' && g > 0) {
                                        zdgzdx_sjdb = '重点关注对象_司机代表<br />'
                                        zdgzdx_sjdb1 = g + '<br />'
                                    } else if (i == 'zdr' && g > 0) {
                                        zdr = '重点人员<br />'
                                        zdr1 = g + '<br />'
                                    }
                                });
                                $('#r_tbody').append(
                                    "<tr>" +
                                    "<td>" + v.xm + "</td>" +
                                    "<td>" + types[v.type] + "</td>" +
                                    "<td>" + gzdw_zf + gzdw_ygc + lsdcry + cjbgry + gzdw_flgzz + gzdw_jtj + yhdc + yrcls + zdgzdx_bcdc + zdgzdx_gjfj + zdgzdx_sjdb + zdr + "</td>" +
                                    "<td>" + gzdw_zf1 + gzdw_ygc1 + lsdcry1 + cjbgry1 + gzdw_flgzz1 + gzdw_jtj1 + yhdc1 + yrcls1 + zdgzdx_bcdc1 + zdgzdx_gjfj1 + zdgzdx_sjdb1 + zdr1 + "</td>" +
                                    "</tr>"
                                )
                            });
                        }
                    });

                }
            });
        }
    })
});
