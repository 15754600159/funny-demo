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
            mining.utils.getHartsData({data:data,success:function(result){
                    seajs.log(result)  
                    createHartsDetail3(data,$container ,key1,key2,result.hits,result.all);
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
                    property.push('<span style="display: block" >' + v.name + ':' + v.value + '</span>');
                });
                property.push('</div>');
                $.each(mining.mappingutils.getShowlabel(sdata, 'bigger'), function (k, v) {
                    _txt += '<span style="display: block" class="txt" >' + v.name + ':' + v.value + '</span>';
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
                var dataArr=[];
                $.each(edge_info.events, function (name, o) {
                    dataArr =dataArr.concat(o);
                    dataArr.sort(function (a, b) {
                        return parseInt(b.time) - parseInt(a.time);
                    });
                });
                
                $.each(mergedata.pairs, function (p, q) {
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
                dataArr.sort(function (a, b) {
                    return parseInt(b.time) - parseInt(a.time);
                });
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
                    '<li eventid="'+ q.id+'" toid="'+ q.toId+'" class="timelineinfo-' + (q.harts ? (isLR+' harts' ): isLR) + '">',
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
              
                if(isMerge){
                    var gap = 0;
                	$('.timelineinfo li.dateinfo:first').nextAll('li').each(function(){
                    	var $this = $(this),
                    		thistop = $this.css('top');
                    	
                    	if(thistop == 'auto') thistop = 0;
                		if($this.hasClass('harts')) gap += 42;
                    	$this.css('top', parseInt(thistop) - gap + 'px');
                    });
                }else{
                	var $firstharts = $('.timelineinfo li.harts:first'),
                		gap = 0, 
                		hartsAtTop = true;
                		
                	if($firstharts.next('li').hasClass('dateinfo')){
                		hartsAtTop = false;
                	}
                	if(hartsAtTop){
                		$firstharts.add($firstharts.nextAll('li')).each(function(){
	                    	var $this = $(this),
	                    		thistop = $this.css('top');
	                    	
	                    	if(thistop == 'auto') thistop = 0;
                    		if($this.hasClass('harts') && $this.height() < 35) gap += 42;
	                    	$this.css('top', parseInt(thistop) - gap + 'px');
	                    });
                	}else{
                		if($firstharts.height() < 35){
                			gap = 42;
                		}else{
                			gap = 22;
                		}
                		$firstharts.nextAll('li').each(function(){
	                    	var $this = $(this),
	                    		thistop = $this.css('top');
	                    	
	                    	if(thistop == 'auto') thistop = 0;
	                    	if($this.next().hasClass('harts') && $this.height() < 35) gap += 42;
	                    	$this.css('top', parseInt(thistop) - gap + 'px');
	                    });
                	}
                }
                //
                $('.timelineinfo .property', $container).mCustomScrollbar({
                    theme:"minimal"
                });
                
            }

            $container.parent().off('click', '.eventtab li').on('click', '.eventtab li', function () {
                var _ismerge = $(this).attr('ismerge');
                $(this).addClass('active').siblings().removeClass('active');
                createHtml(_ismerge);
                if(_ismerge == 'false'){
                	mining.utils.serverLog(53);//用户行为记录
                }
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