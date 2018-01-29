/**
 * Created by admin on 2016/5/31.
 */
define(function (require, exports, module) {

    /**
     * @name Details
     * @class 右侧详情功能。
     */
    var
        requestUrl = {
            merge: mining.baseurl.core + '/query/merge',	//POST 调用：参数 ids, events, rules, keyword(ids, events, rules 都是 JSONArray)
            expandHartsEdge: mining.baseurl.core + '/query/expandHartsEdge'//?eid0=110104198403160432&eid1=130102198807150610&events=railway,hotel身份证号
        },
        rulList = [];
    module.exports = function () {

        var createHartsDetail = function (data,$container ,key1,key2) {
            var mergedata = [];
            ruleList = mining.mappingutils.getHartEvents(data);
            $.ajax({
                url: requestUrl.merge,
                type: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                contentType: "application/json",
                data: JSON.stringify({
                    ids: [data.to_key, data.from_key],
                    events:[],// mining.mappingutils.getHartEvents(data),
                    rules: ruleList,
                    withObject: false	//是否碰出旅馆、火车等小实体
                }),
                success: function (mdata) {
                      mergedata = mdata.l || [];
                    //  mergedata.push(mdata.l[0]);
					createHartsDetail2(data,$container ,key1,key2,mergedata)
                },
                error: function (result) {
                    mining.utils.alertMsg(result, '获取数据失败，请稍后重试！', 'error');
                }
            });
        }
        
        var createHartsDetail2 = function (data,$container ,key1,key2,mergedata) {
        	$.ajax({
                url: requestUrl.expandHartsEdge,
                data: {
                    eid0: data.from_key,
                    eid1: data.to_key,
                    events: ruleList.join(',')
                },
                type: 'get',
                success: function (result) {
                    edge_info = result.edge_info;
                    createHartsDetail3(data,$container ,key1,key2,mergedata,edge_info);
                },
                error: function (result) {
                    seajs.log('获取事件信息失败，请稍后重试！')
                }
            });
            
        }
        
        var createHartsDetail3 = function (data,$container ,key1,key2,mergedata,edge_info) {
        	$(' main', $container).remove();
            if (mining.utils.isEmpty(edge_info)) return;

            var getTxt = function (sdata, name) {
                var _txt = '';
                var property = ['<div class="property hide">'];
                $.each(mining.mappingutils.getProperties(sdata, 'primary'), function (k, v) {
                    property.push('<span style="display: block" >' + v.name + '：' + v.value + '</span>');
                });
                property.push('</div>');
                $.each(mining.mappingutils.getShowlabel(sdata, 'bigger'), function (k, v) {
                    _txt += '<span style="display: block" class="txt" >' + v.value + '</span>';
                });

                return _txt + property.join('');
            }
            if($container.siblings('.eventtab').length==0){
                $container.before("<ul class='eventtab'><li class='active' ismerge='true'>命中事件</li><li ismerge='false' >全部事件</li></ul>");
            }
            $('table', $container).after("<main role='main'><ol class='timelineinfo'></ol></main>");
            var createHtml = function (isMerge) {
            	isMerge = isMerge == 'true' ? true : false;
                var mergeEvent=[];
                $.each(edge_info, function (i, n) {
                    var dataArr=[];
                    $.each(n.events, function (name, o) {
                        var arr= o[0].concat(o[1]);
                         dataArr =dataArr.concat(arr);
                        dataArr.sort(function (a, b) {
                            return parseInt(b.time) - parseInt(a.time);
                        });
                    });
                    $.each(mergedata, function (p, q) {
                        $.each(dataArr, function (h, g) {
                            if (mining.utils.isEmpty(g))dataArr.remove(g);
                            try {
                                if (q.from == g.id) {
                                    g.harts = true;
                                    mergeEvent.push(g);
                                    $.each(dataArr, function (_h, _g) {
                                        if (q.to == _g.id) {
                                            // dataArr.remove(_g);
                                            mergeEvent.push(_g);
                                            g.toId=_g.id
                                            return true;
                                        }
                                    });

                                    return true;
                                }
                            } catch (e) {
                                seajs.log(g)
                            }
                        })
                    });
                    if(isMerge){
                        dataArr=mergeEvent;
                    }
                    if (dataArr.length == 0) {
                        $('main',$container).html("没有数据");
                        return;
                    }else {
                        $('main',$container).html('<ol class="timelineinfo"></ol>');
                    }
                    var lastDate = moment(parseInt(dataArr[0].time)).format('YYYY-MM-DD');
                    $.each(dataArr, function (p, q) {
                        if (mining.utils.isEmpty(q) || mining.utils.isEmpty(q.key)) {
                            return;
                        }
                        var date = moment(parseInt(q.time)).format('YYYY-MM-DD');
                        var _time = moment(parseInt(q.time)).format('YYYY-MM-DD HH:mm:ss'),
                            isLR = '';

                        if (key1.indexOf(q.key) != -1) {
                            isLR = 'l';
                        } else if (key2.indexOf(q.key) != -1) {
                            isLR = 'r';
                        }
                        if (mining.utils.isEmpty(isLR)) {
                            return;
                        }
                        $('.timelineinfo:first', $container).append([(lastDate != date ? '<li class="dateinfo  timelineinfo-r" >' + lastDate + '</li>' : '') +
                        '<li eventid="'+ q.id+'" toid="'+ q.toId+'" class="timelineinfo-' + (q.harts ? 'l harts' : isLR) + '">',
                            getTxt(q, name),
                            /*  "<time datetime='" + _time + "'>" + _time + "</time>",*/
                            "<button></button>",
                            '</li>' + (p == dataArr.length - 1 ? '<li class="dateinfo  timelineinfo-r" >' + date + '</li>' : '')].join(''));
                        lastDate = date;
                    });
                    //设置命中事件对齐
                    $.each($('.harts',$container),function(k,v){
                        var top=  $(v).offset().top,
                            toTop=$('.timelineinfo li[eventid='+$(v).attr('toid')+']').offset().top;
                        $(v).css('top',(toTop-top)+'px');
                    }) ;
                    //
                    //缩小间距

                        $.each($('.timelineinfo li',$container),function(k,v){
                            var li=$(v);
                            var top = li.offset().top,
                                prevTop,
                                oldTop = li.css('top').replace('px', ''),
                                prev;
                            oldTop = isNaN(oldTop) ? 0 : Number(oldTop);
                            prev=li.prev();
                            if(prev&&prev.length>0){
                                prevTop=prev.offset().top;
                                if((li.attr('eventid')==prev.attr('toid'))||(li.attr('toid')==prev.attr('eventid'))){
                                    li.css('top',(prevTop-top+oldTop)+'px');
                                }else{
                                    var cha=prevTop+prev.outerHeight()+10-top;//高度差
                                    li.css('top',(cha+oldTop)+'px');
                                }
                            }
                         /*   if(li.hasClass('dateinfo')){
                                prev=li.prev();
                            }
                            else if(li.prevAll('.dateinfo').length>0){
                                prev=li.prevAll('.dateinfo').eq(0);
                            }
                            if(prev){
                                prevTop=prev.offset().top;
                                li.css('top',(prevTop+prev.outerHeight()+10-top+oldTop)+'px');
                            }*/
                        }) ;
                        $('.timelineinfo',$container).height($('.timelineinfo li:last').outerHeight()+$('.timelineinfo li:last').offset().top-200);

                    //
                    $('.timelineinfo .property', $container).mCustomScrollbar({
                        theme:"minimal"
                    });
                });
            }

            $container.parent().off('click', '.eventtab li').on('click', '.eventtab li', function () {
                $(this).addClass('active').siblings().removeClass('active');
                createHtml($(this).attr('ismerge'));
            });
            $container.off('mouseover mouseout', '.timelineinfo li').on('mouseover', '.timelineinfo li', function () {
                $(this).css('z-index', 111).find('.property').removeClass('hide');
            }).on('mouseout', '.timelineinfo li', function () {
                $(this).css('z-index', 100).find('.property').addClass('hide');
            });

            $(' .eventtab li:first', $container.parent()).click();
        }
        
        return {
            init: createHartsDetail
        }
    }
});