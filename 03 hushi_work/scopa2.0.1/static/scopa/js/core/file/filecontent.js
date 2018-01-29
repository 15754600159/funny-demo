define(function(require){
	var defaultConfig = {
            container: null,
            readyCallback: null,
            clickCallback: null
        },
        preUrl = mining.baseurl.core,
        requestUrl = {
            expandEdge: preUrl + '/query/expandEdge',//?eid=XXX&label=XXX
            searchMedia: preUrl + '/query/getByLabel',  //?vid='+_id+'&labels=[media_doc]
            searchSnapshot: preUrl + '/snapshot/listByEntity',    //keyword: 关键词type: [0: graph, 1: map]pageNo:pageSize:starttime:endtime:
            getrule: mining.baseurl.console + '/rule/get',
            merge: preUrl + '/query/merge',	//POST 调用：参数 ids, events, rules, keyword(ids, events, rules 都是 JSONArray)
            expandHartsEdge: preUrl + '/query/expandHartsEdge',//?eid0=110104198403160432&eid1=130102198807150610&events=railway,hotel身份证号
            getEventsByType: preUrl + '/archive/getEventsByType',//?objId=130533198110084118&type=railway&pageNo=1&pageSize=10
            expandEdge: preUrl + '/query/expandEdge',//?eid=XXX&label=XXX
            personInfoUrl: 'http://qbbigdata.sjzs.eb:8080/picture/person?sfzh=',
            getByLabel: preUrl + '/query/getByLabel',	//?vid='+_id+'&labels=[railway_record]
    		getPath: preUrl + '/query/getPath',	//?vids=[16384,xxxxx,xxxx]&labels=[label1,label2]&hop=3
            criminalUrl: mining.baseurl.gongan + '/criminal/alert/1?keyword=',
            filterTagsUrl: preUrl + '/query/getPathByFilter',
            getVertexByIdUrl: preUrl + '/query/getVertexById?vid=',
            getInfoByTagsUrl: mining.baseurl.gongan + '/zdsj/yjqb/list'
        },
        snapshotModule = require('core/common/snapshot'),
        listModule = require('./filelist'),
        navtabModule = require('./filenavtabs'),
        point= new require('core/point/point'),
        // eventIntelligence = require('core/event/intelligence'),
        graphModule = null,
        currentFile = null,
        $content = null,
        $page = null,
        filedata = null,
        graph = null,
	    ruleList = [],
        entityEventsData = {
            eventsType: [],
            eventsData: []
        },
        qList = [[1,2,3],[4,5,6],[7,8,9],[10,11,12]],
        residentProperty = {
            primary: {
                XM:'姓名',
                SFZH:'身份证号',
                MZ:'民族',
                JGSSX:'籍贯省市县',
                XB:'性别',
                HKSZD:'户口所在地',
                HYZK:'婚姻状况',
                ZZXZ:'住址详址'
            },
            minor:{
                WHCD:'文化程度',
                SG:'身高',
                RYBH:'人员编号',
                FWCS:'服务处所',
                CYM:'曾用名',
                CSDXZ:'出生地详址',
                CSD:'出生地',
                BYQK:'兵役情况'
            },
            minorFilter:{
                WHCD:'PERSON_whcd',
                SG:'PERSON_sg',
                CYM:'PERSON_cym',
                CSDXZ:'PERSON_csdxz',
                CSD:'PASSPORT_csd'
            }
        },
        reg = /(\d+)|(.*(本区|外省|本市|本省).*)/,
        eventsParam = require('./eventsList');
        
    var initFileContent = function(config){
        config = $.extend(defaultConfig, config);
        $content = (typeof config.container == 'string' ? $(config.container) : config.container);
        
        //获取事件碰撞列表
        $ajax.ajax({
            url: requestUrl.getrule,
            success: function(data){
                $.each(data.listObj, function(i,n){
                    ruleList.push(n.name);
                })
            },
            error: function(data){
                seajs.log(data);
            }
        })
    }

    var getTemplateHtml = function(type, obj){
        switch(type){
            case 'entityPrimary':
                var arr = [],j = 0;
                $.each(obj.primary,function(i,n){
                    if(!mining.utils.isEmpty(filedata[i]) || obj.sourcetag == '712'){
                        arr.push('<span class="text ellipsis ' + (obj.sourcetag == '712' ? (j % 2 == 0 ? 'pull-left person-info-left' : 'pull-right person-info-right') : '') + '" title="' + n.name + '：' + n.value + '"><label class="infos-label">' + n.name + '：</label><span class="infos-value">' + n.value + '</span></span>');
                        if(j<7)j++;
                    }
                });
                return ['<div class="itemthumb entity pull-left" style="background-image:url(' + obj.svgicon + ');">',
                            '<img src="' + obj.picUrl + '" _src="' + obj.svgicon + '">',
                        '</div>',
                        obj.personTag.length > 0 ? '<i class="person-tag-icon"><i class="scopaicon scopaicon-zhongdianrenbiaoshi"></i></i>' : '',
                        '<div class="primary-box pull-left">',
                            '<div class="keyinfo ellipsis"><b class="title-info ellipsis pull-left">' + obj.title + '</b>' + (obj.personTag.length > 0 ? '<span class="person-tag">' + obj.personTag + '</span>' : '') + '<span class="file-point hidden"></span></div>',
                            '<div class="infolist">',
                                arr.join(''),
                            '</div>',
                        '</div>'].join('');
                break;
            case 'entityMinor':
                var arr = [];
                $.each(obj.minor,function(i,n){
                    if(n.value.length > 0){
                        arr.push('<li class="infos ellipsis" title="' + n.name + '：' + n.value + '"><label class="infos-label">' + n.name + '：</label><span class="infos-value">' + n.value + '</span></li>');
                    }
                });
                return ['<ul>',
                            arr.join(''),
                        '</ul>'].join('');
                break;
            case 'entityTimeAction':
                var now = new Date(), 
                    n = 0,
                    currentYear = now.getFullYear(),
                    yearsList = [];
                for(n;n<15;n++){
                    var y = currentYear - n;
                    yearsList.push('<option value="' + y + '"' + (y == currentYear ? ' selected' : '') + '>' + y + '年</option>');
                }
                return ['<select class="years-value pull-left">',
                            yearsList.join(''),
                        '</select>',
                        '<select class="time-value pull-left">',
                            '<option value="month">月记录</option>',
                            '<option value="quarter">季度记录</option>',
                        '</select>',
                        '<span class="show-details btn-current">查询</span>'].join('');
                break;
            case 'entityEventsList':
                var typeArr = [], typeHtmlArr = [], eventArr = [], dataList = obj.data, eventsList = obj.eventsList, eventTime = obj.eventTime, eventsInfo = {}, i = 1,j = 0, years = obj.years;
                entityEventsData.eventsType = [];
                entityEventsData.eventsData = [];
                var areaLen = (eventTime == 'quarter' ? 4 : 12);
                for(i;i<=areaLen;i++){
                    eventsInfo['m' + i] = {};
                    eventsInfo['m' + i]['dataList'] = [];
                }
                $.each(dataList,function(dataIndex,n){
                    if($.inArray(n.label, entityEventsData.eventsType) < 0 ){
                        entityEventsData.eventsType.push(n.label);
                    }
                    var m = $.inArray(n.label, entityEventsData.eventsType),
                        monthValue = new Date(parseInt(n.time)).getMonth() + 1,
                        dateValue = new Date(parseInt(n.time)).getDate(),
                        dateCount = getDateNum(years,monthValue),
                        listNo = 'details-list' + (m + 1);
                    if(eventTime == 'quarter'){
                        var quarterValue = (Math.floor((monthValue % 3 == 0 ? (monthValue / 3) : (monthValue / 3 + 1)))),
                            mList = qList[parseInt(quarterValue - 1)],
                            dateNum = 0;
                        $.each(mList,function(monthIndex,v){
                            if(v == monthValue){
                                dateValue = dateNum + dateValue;
                            }
                            dateNum = dateNum + getDateNum(years,v);
                        });
                        dateCount = dateNum;
                        monthValue = quarterValue;
                    }
                    if(!(listNo in eventsInfo['m' + monthValue])){
                        eventsInfo['m' + monthValue][listNo] = [];
                    }
                    eventsInfo['m' + monthValue]['dataList'].push(n);
                    eventsInfo['m' + monthValue][listNo].push('<i class="event-point" style="width:calc(100% / ' + dateCount + ');" data-count="' + dateCount + '" data-left="' + (dateValue - 1) + '"></i>');
                });

                $.each(entityEventsData.eventsType,function(typeIndex,n){
                    eventArr.push('<div class="types" style="height:calc(100% / ' + (entityEventsData.eventsType.length == 0 ? 1 : entityEventsData.eventsType.length) + ')"><span class="icon ' + mining.mappingutils.getFontName(n) + '" title="' + (eventsList[n].replace('事件_','')) + '"></span><span class="type-info hidden">' + (eventsList[n].replace('事件_','')) + '</span></div>');
                });
                $.each(eventsInfo,function(j,m){
                    typeHtmlArr.push('<div class="events-info-time" style="width:calc(100% / ' + areaLen + ');" data-time="' + (eventTime == 'quarter' ? 'q' + j.replace('m','') : j) + '">');
                    $.each(entityEventsData.eventsType,function(i,n){
                        typeHtmlArr.push(['<div class="events-details-list details-list' + (i + 1) + '" style="height:calc(100% / ' + (entityEventsData.eventsType.length == 0 ? 1 : entityEventsData.eventsType.length) + ')">',
                                            m['details-list' + (i + 1)] ? m['details-list' + (i + 1)].join('') : '',
                                        '</div>'].join(''));
                    });
                    typeHtmlArr.push('</div>');
                    entityEventsData.eventsData.push(m['dataList']);
                });

                return ['<div class="event-type-list pull-left">',
                            eventArr.join(''),
                        '</div>',
                        '<div class="event-list pull-left">',
                            typeHtmlArr.join(''),
                        '</div>'].join('');
                break;
            case 'eventTimePoint':
                var arr = [], i = 0;
                arr.push('<span class="time-point">' + obj.years + '</span>');
                if(obj.eventTime == 'quarter'){
                    for(i;i<3;i++){
                        arr.push('<span class="time-point">' + (i + 1) + '</span>');
                    }  
                }else{
                    for(i;i<11;i++){
                        arr.push('<span class="time-point">' + ((i + 2) < 10 ? '0' + (i + 2) : (i + 2)) + '</span>');
                    }
                }
                arr.push('<span class="time-point">' + (parseInt(obj.years) + 1) + '</span>');
                return arr.join('');
                break;
            case 'entityEventsDetails':
                var typeArr = [], eventsArr = [], timePointList = [], dataList = obj.data, eventsList = obj.eventsList, dataTime = obj.dataTime, years = obj.years;
                $.each(entityEventsData.eventsType,function(i,n){
                    typeArr.push('<div class="types"><span class="icon ' + mining.mappingutils.getFontName(n) + '" title="' + (eventsList[n].replace('事件_','')) + '"></span><span class="type-info">' + (eventsList[n].replace('事件_','')) + '</span></div>');
                });
                $.each(dataTime,function(i,n){
                    var dateNum = getDateNum(years,n),
                        j = 0;
                    for(j;j<dateNum;j++){
                        timePointList.push('<span class="time-point' + (j == 0 ? ' month' : '') + '"><i class="' + (j == 0 ? 'month-point' : 'date-point') + '"></i><span class="time-text">' + (j == 0 ? n + '月' : (j + 1)) + '</span></span>');
                    }
                });
                $.each(entityEventsData.eventsType,function(eventIndex,eventValue){
                    eventsArr.push('<div class="events-info-item item-list' + (eventIndex + 1) + '">');
                    $.each(dataList,function(dataIndex,dataValue){
                        if(dataValue.label != eventValue)return;
                        var itemTime = new Date(parseInt(dataValue.time)),
                            itemMonth = itemTime.getMonth() + 1,
                            itemDate = itemTime.getDate(),
                            dateNum = 0,
                            monthPointCount = 1,
                            infoArr = [],
                            txtArr = [];
                        $.each(dataTime,function(j,v){
                            if(itemMonth == v){
                                dateNum = dateNum + itemDate;
                                return false;
                            }else{
                                dateNum = dateNum + getDateNum(years,v);
                                monthPointCount++;
                            }
                        });
                        $.each(mining.mappingutils.getShowlabel(dataValue,'big'),function(labelIndex,labelValue){
                            if(labelIndex == 2)return false;
                            infoArr.push('<p class="events-text-info ellipsis">' + labelValue.value + '</p>');
                            txtArr.push(labelValue.name + ':' + labelValue.value);
                        });
                        eventsArr.push(['<div class="detail-show" title="' + txtArr.join('&#10;') + '" data-time="' + mining.utils.dateFormat(itemTime,'yyyyMMdd') + '" data-mcount="' + monthPointCount + '" data-dcount="' + dateNum + '" data-date="' + itemDate + '">',
                                            infoArr.join(''),
                                            '<div class="arrowhead">',
                                                '<em class="frame"></em>',
                                                '<span class="frame"></span>',
                                                '<div class="line"></div>',
                                            '</div>',
                                        '</div>'].join(''));
                    });
                    eventsArr.push('</div>');
                });
                if(entityEventsData.eventsType.length < 5){
                    for(var i = 0;i < (5 - entityEventsData.eventsType.length);i++){
                        typeArr.unshift('<div class="types"><span class="icon"></span><span class="type-info"></span></div>');//unshift
                        eventsArr.unshift('<div class="events-info-item"></div>')
                    }
                }
                return ['<div class="event-type-list pull-left">',
                            typeArr.join(''),
                            '<div class="time-line"></div>',
                        '</div>',
                        '<div class="event-list pull-left">',
                            '<div class="event-detail-list">',
                                eventsArr.join(''),
                            '</div>',
                            '<div class="event-time">',
                                '<div class="time-line"></div>',
                                '<div class="date-line">',
                                    timePointList.join(''),
                                '</div>',
                            '</div>',
                        '</div>'].join('');
                break;
            case 'eventsTable':
                var thead = [], tbody = [], tableHtml = '';
                $.each(obj.head,function(i,n){
                    thead.push('<th class="ellipsis" title="' + mining.mappingutils.getPropLabel(n) + '">' + mining.mappingutils.getPropLabel(n) + '</th>');
                });
                $.each(obj.body,function(i,n){
                    tbody.push('<tr>');
                    $.each(obj.head,function(j,value){
                        tbody.push('<td class="ellipsis" title="' + (n[value] ? n[value] : '') + '">' + (n[value] ? n[value] : '') + '</td>');
                    });
                    tbody.push('</tr>');
                });
                tableHtml = ['<table class="table bordertop">',
                                '<thead>',
                                    '<tr>',
                                        thead.join(''),
                                    '</tr>',
                                '</thead>',
                                '<tbody>',
                                    tbody.join(''),
                                '</tbody>',
                            '</table>'].join('');
                return obj.body.length > 0 ? tableHtml : '';
                break;
            case 'snapshotList':
                var arr = [], i = 0, len = obj.bodyData.length;
                if(obj.totalCount == 0){
                    arr.push('<li class="gray">暂无相关研判子图</li>');
                }else{
                    for(i;i<len;i++){
                        var itemData = obj.bodyData[i]
                        arr.push(['<li class="snapshot-item" data-id="' + itemData.id + '">',
                                    '<div class="item-pic">',
                                        '<div class="pic-border">',
                                            '<img src="' + preUrl + '/snapshot/getThumbnail?sid=' + itemData.id + '">',
                                        '</div>',
                                    '</div>',
                                    '<div class="item-info">',
                                        '<p class="ellipsis"><label class="infos-label">名称：</label><span class="infos-value sna-title" title="' + itemData.name + '">' + itemData.name + '</span></p>',
                                        '<p>',
                                            '<span class="info-author ellipsis">',
                                                '<label class="infos-label">作者：</label><span class="infos-value" title="' + itemData.author.user_id + '">' + itemData.author.user_id + '</span>',
                                            '</span>',
                                            '<span class="info-time pull-right">' + mining.utils.dateFormat(new Date(itemData.ts),'yyyy.MM.dd') + '</span>',
                                        '</p>',
                                    '</div>',
                                '</li>'].join(''));
                    }
                }
                return arr.join('');
                break;
            case 'relationPrimary':
                var sourceArr = [], targetArr = [], tags = [];
                $.each(obj.source.data,function(i,n){
                    if(!mining.utils.isEmpty(filedata.source[i])){
                        sourceArr.push('<span class="text ellipsis" title="' + n.name + '：' + n.value + '"><label class="infos-label">' + n.name + '：</label><span class="infos-value">' + n.value + '</span></span>');
                    }
                });
                $.each(obj.target.data,function(i,n){
                    if(!mining.utils.isEmpty(filedata.target[i])){
                        targetArr.push('<span class="text ellipsis" title="' + n.name + '：' + n.value + '"><label class="infos-label">' + n.name + '：</label><span class="infos-value">' + n.value + '</span></span>');
                    }
                });
                $.each(obj.relationTags,function(i,n){
                    tags.push('<span>' + n + '</span>');
                });
                return ['<div class="relations-show">',
                            '<div class="relation-entity-box">',
                                '<div class="entity-pic pull-left" style="background-image:url(' + obj.source.svgicon+ ');">',
                                    '<img src="' + obj.source.picUrl + '" _src="' + obj.source.svgicon + '">',
                                '</div>',
                                '<div class="relation pull-left">',
                                    '<i class="relation-bg"></i>',
                                    '<span class="relation-txt">' + tags.join('') + '</span>',
                                '</div>',
                                '<div class="entity-pic pull-left" style="background-image:url(' + obj.target.svgicon+ ');">',
                                    '<img src="' + obj.target.picUrl + '" _src="' + obj.target.svgicon + '">',
                                '</div>',
                            '</div>',
                        '</div>',
                        '<div class="primary-box">',
                            '<div class="infolist primary-left pull-left">',
                                sourceArr.join(''),
                            '</div>',
                            '<div class="infolist primary-right pull-left">',
                                targetArr.join(''),
                            '</div>',
                        '</div>'].join('');
                break;
            case 'relationEntityMinor':
                var sourceArr = [], targetArr = [];
                $.each(obj.source,function(i,n){
                    sourceArr.push('<li class="infos ellipsis" title="' + n.name + '：' + n.value + '"><label class="infos-label">' + n.name + '：</label><span class="infos-value">' + n.value + '</span></li>');
                });
                $.each(obj.target,function(i,n){
                    targetArr.push('<li class="infos ellipsis" title="' + n.name + '：' + n.value + '"><label class="infos-label">' + n.name + '：</label><span class="infos-value">' + n.value + '</span></li>');
                });
                return ['<ul class="pull-left minor-left">',
                            sourceArr.join(''),
                        '</ul>',
                        '<ul class="pull-left minor-right">',
                            targetArr.join(''),
                        '</ul>'].join('');
                break;
            case 'relationAttr':
                var arr = [];
                $.each(obj,function(i,n){
                    arr.push('<li class="ellipsis" title="' + n.name + '：' + n.value + '"><label class="infos-label">' + n.name + '：</label><span class="infos-value">' + n.value + '</span></li>');
                });
                return ['<ul>',
                            arr.join(''),
                        '</ul>'].join('');
                break;
            case 'relationAttrItem':
                return '<li class="ellipsis" title="' + obj.name + '：' + obj.value + '"><label class="infos-label">' + obj.name + '：</label><span class="infos-value">' + obj.value + '</span></li>';
                break;
            case 'hartsTravel':
                var thead = [], tbody = [];
                $.each(obj.head,function(i,n){
                    if(n.label == 'eTRAIN_fz' || n.label == 'ePASSPORTFTRAIN_fz' || n.label == 'eFLIGHTlg_djjc' || n.label == 'ePASSPORTFLIGHTlg_djjc'){
                        thead.push('<th class="ellipsis" title="行程">行程</th>');
                    }else if(n.label == 'eTRAIN_dz' || n.label == 'ePASSPORTFTRAIN_dz' || n.label == 'eFLIGHTlg_ddjc' || n.label == 'ePASSPORTFLIGHTlg_ddjc'){
                        return;
                    }else{
                        thead.push('<th class="ellipsis" title="' + n.name + '">' + n.name + '</th>');
                    }
                });
                $.each(obj.body,function(i,n){
                    var travelInfo = [];
                    tbody.push('<tr>');
                    $.each(obj.head,function(j,m){
                        if(m.label == 'ccrq' || m.label == 'new_cc' || m.label == 'hbrq' || m.label == 'hbh'){
                            tbody.push('<td title="' + n[0][m.label] + '">' + n[0][m.label] + '</td>');
                        }else if(m.label == 'eTRAIN_fz' || m.label == 'ePASSPORTTRAIN_fz' || m.label == 'eFLIGHTlg_djjc' || n.label == 'ePASSPORTFLIGHTlg_djjc'){
                            travelInfo.push(['<div class="station-point start-station pull-left">',
                                                '<span class="station" title="' + n[0][m.label] + '">' + n[0][m.label] + '</span>',
                                                '<span class="time hidden">07:30</span>',
                                            '</div>'].join(''));
                        }else if(m.label == 'eTRAIN_dz' || m.label == 'ePASSPORTTRAIN_dz' || m.label == 'eFLIGHTlg_ddjc' || n.label == 'ePASSPORTFLIGHTlg_ddjc'){
                            travelInfo.push(['<div class="station-point end-station pull-left">',
                                                '<span class="station" title="' + n[0][m.label] + '">' + n[0][m.label] + '</span>',
                                                '<span class="time hidden">07:30</span>',
                                            '</div>'].join(''));
                            travelInfo.push(['<div class="station-point-bg">',
                                                '<i class="point start-point"></i>',
                                                '<i class="line"></i>',
                                                '<i class="point end-point"></i>',
                                            '</div>'].join(''));
                            tbody.push('<td>' + travelInfo.join('') + '</td>');
                        }else{
                            tbody.push(['<td class="pad0">',
                                            '<div class="info-details ellipsis" title="' + n[0][m.label] + '">' + n[0][m.label] + '</div>',
                                            '<div class="info-details ellipsis" title="' + n[1][m.label] + '">' + n[1][m.label] + '</div>',
                                        '</td>'].join(''));
                        }
                    });
                    tbody.push('</tr>');
                });
                
                return ['<table class="table bordertop">',
                            '<thead>',
                                '<tr>',
                                    thead.join(''),
                                '</tr>',
                            '</thead>',
                            '<tbody>',
                                tbody.join(''),
                            '</tbody>',
                        '</table>'].join('');
                break;
            case 'hartsLive':
                var thead = [], tbody = [];
                $.each(obj.head,function(i,n){
                    thead.push('<th class="ellipsis" title="' + n.name + '">' + n.name + '</th>');
                });
                $.each(obj.body,function(i,n){
                    tbody.push('<tr>');
                    $.each(obj.head,function(j,m){
                        if(m.label == 'eHOTEL_ldmc' || m.label == 'ePASSPORTHOTEL_ldmc'){
                            tbody.push('<td title="' + n[0][m.label] + '">' + n[0][m.label] + '</td>');
                        }else{
                            tbody.push(['<td class="pad0">',
                                            '<div class="info-details ellipsis" title="' + n[0][m.label] + '">' + n[0][m.label] + '</div>',
                                            '<div class="info-details ellipsis" title="' + n[1][m.label] + '">' + n[1][m.label] + '</div>',
                                        '</td>'].join(''));
                        }
                    });
                    tbody.push('</tr>');
                });
                
                return ['<table class="table bordertop">',
                            '<thead>',
                                '<tr>',
                                    thead.join(''),
                                '</tr>',
                            '</thead>',
                            '<tbody>',
                                tbody.join(''),
                            '</tbody>',
                        '</table>'].join('');
                break;
            case 'bubble':
                return ['<div style="width:' + obj.width + 'px;height:auto;">' + obj.text + '</div>'].join('');
                break;
            case 'filterTags':
                return '<span class="tag-current tags-info ellipsis" title="' + obj.name + '"' + (obj.label ? 'data-label="' + obj.label + '"' : '') + '>' + obj.name + '</span>';
                break;
            case 'groupBaseInfo':
                return ['<div class="itemthumb pull-left" style="background-image:url(../static/scopa/images/file/file-group.png);">',
                            '<img src="../static/scopa/images/file/file-group.png" _src="../static/scopa/images/file/file-group.png">',
                        '</div>',
                        '<div class="primary-box pull-left">',
                            '<div class="infolist pull-left">',
                                (obj.name ? '<span class="group-label tag-current ellipsis">' + obj.name + '<i></i></span>' : ''),
                                (obj.sjfw ? '<span class="text ellipsis " title="涉及范围：' + obj.sjfw + '"><label class="infos-label">涉及范围：</label><span class="infos-value">' + obj.sjfw + '</span></span>' : ''),
                                (obj.sjgm ? '<span class="text ellipsis " title="涉及规模：' + obj.sjgm + '"><label class="infos-label">涉及规模：</label><span class="infos-value">' + obj.sjgm + '</span></span>' : ''),
                            '</div>',
                            '<div class="infolist pull-left">',
                                (obj.hxsq ? '<span class="text ellipsis " title="核心诉求：' + obj.hxsq + '"><label class="infos-label">核心诉求：</label><span class="infos-value">' + obj.hxsq + '</span></span>' : ''),
                                (obj.xcyy ? '<span class="text ellipsis " title="形成原因：' + obj.xcyy + '"><label class="infos-label">形成原因：</label><span class="infos-value">' + obj.xcyy + '</span></span>' : ''),
                                (obj.gjzc ? '<span class="text ellipsis " title="国家政策：' + obj.gjzc + '"><label class="infos-label">国家政策：</label><span class="infos-value">' + obj.gjzc + '</span></span>' : ''),
                            '</div>',
                        '</div>'].join('');
                break;
            case 'groupEvents':
                var arr = [];
                $.each(obj,function(i,n){
                    arr.push(['<tr data-event-id="' + n.id + '">',
                                '<td class="width20 ellipsis" title="' + (n.name || '') + '">' + (n.name || '') + '</td>',
                                '<td class="width20 ellipsis" title="' + (n.jjcs || '') + '">' + (n.jjcs || '') + '</td>',
                                '<td class="width20 ellipsis" title="' + (n.sjgm || '') + '">' + (n.sjgm || '') + '</td>',
                                '<td class="width20 ellipsis" title="' + (n.cljg || '') + '">' + (n.cljg || '') + '</td>',
                                '<td class="width20 ellipsis" title="' + (n.sfsj || '') + '">' + (n.sfsj || '') + '</td>',
                            '</tr>'].join(''));
                });
                return ['<table class="table">',
                            '<thead>',
                                '<tr>',
                                    '<th class="width20" title="事件名称">事件名称</th>',
                                    '<th class="width20" title="聚集场所">聚集场所</th>',
                                    '<th class="width20" title="事件规模">事件规模</th>',
                                    '<th class="width20" title="处理结果">处理结果</th>',
                                    '<th class="width20" title="事发时间">事发时间</th>',
                                '</tr>',
                            '</thead>',
                            '<tbody>',
                                arr.join(''),
                            '</tbody>',
                        '</table>'].join('');
                break;
            case 'groupMembers':
                var arr = [];
                $.each(obj,function(i,n){
                    arr.push(['<tr data-member-id="' + n.sfzh + '">',
                                '<td class="width20 ellipsis" title="' + (n.name || '') + '">' + (n.name || '') + '</td>',
                                '<td class="width20 ellipsis" title="' + (n.sfzh || '') + '">' + (n.sfzh || '') + '</td>',
                                '<td class="width20 ellipsis" title="' + (n.phone || '') + '">' + (n.phone || '') + '</td>',
                                '<td class="width40 ellipsis" title="' + (n.tag || '') + '">' + (n.tag || '') + '</td>',
                            '</tr>'].join(''));
                });
                return ['<table class="table">',
                            '<thead>',
                                '<tr>',
                                    '<th class="width20" title="姓名">姓名</th>',
                                    '<th class="width20" title="身份证号">身份证号</th>',
                                    '<th class="width20" title="手机号">手机号</th>',
                                    '<th class="width40" title="标签">标签</th>',
                                '</tr>',
                            '</thead>',
                            '<tbody>',
                                arr.join(''),
                            '</tbody>',
                        '</table>'].join('');
                break;
            case 'groupInformation':
                var infoData = obj.bodyData, arr = [];
                $.each(infoData,function(i,n){
                    var _txt = (i + 1) + '.' + n.bt;
                    arr.push('<li data-info-id="' + n.id + '"><span class="info-text ellipsis" title="' + _txt + '">' + _txt + '</span><span class="info-time">' + n.tbsj + '</span></li>');
                });
                return arr.join('');
                break;
            default:
                break;
        }
    }

    // 获取当月的天数
    var getDateNum = function(years,month){
        var d = new Date();
        d.setYear(years);
        d.setDate(1);
        d.setMonth(month);
        var newTime = new Date(d.getTime()-1000*60*60*24),
            dateNum = newTime.getDate();
        return dateNum;
    }

    var showFileContent = function(data){


        data = data || {};
        var isGroup = true,
            etype = 'group',
            contentBoxId = '';
        if(data.itemType == '2'){
            contentBoxId = data.label.id;
        }else{
            isGroup = false;
            etype = mining.mappingutils.getType(data);
            contentBoxId = data.gid;
        }

        $('.toolbar .file-analyze, .toolbar .file-save, .toolbar .file-delete').addClass('hidden');
        $('.toolbar .file-tograph, .toolbar .file-tomap').removeClass('disable');
        $('.content-box .' + etype + '-box').removeClass('hidden').siblings('.filecontent-box').addClass('hidden');
        $('.content-box',$page).attr('gid',contentBoxId).attr('tabid',data.tabId).data('data',data);

        if(isGroup){
            formatGroup('group',data);
        }else{
            filedata = mining.mappingutils.formatProperty(data);

            if(etype == 'entity'){
                formatEntity(etype);
            }else if(etype == 'relation'){
                formatRelation(etype,(data.label == 'harts' ? 'harts' : 'ordinary'));
            }
        }
    } 

    var formatEntity = function(type){
        var primaryArr = mining.mappingutils.getProperties(filedata, 'primary'),
            minorArr = mining.mappingutils.getProperties(filedata, 'minor'),
            svgicon = mining.mappingutils.getGraphIcon(filedata),
            personTag = '',
            primaryData = {
                primary: primaryArr,
                picUrl: (filedata.photoUrl ? filedata.photoUrl : svgicon),
                svgicon: svgicon,
                title: mining.mappingutils.getTitle(filedata),
                sourcetag: '',
                personTag: personTag
            },
            minorData = {
                minor: minorArr
            },
            el = type + '-box';
            if(primaryArr.hasOwnProperty('PERSON_zdrlx') && primaryArr.PERSON_zdrlx.value.length > 0){
                var tagText = primaryArr.PERSON_zdrlx.value;
                if(!reg.test(tagText) && tagText != 'NULL' && tagText != 'vertexHop'){
                    primaryData.personTag = tagText;
                    personTag = tagText;
                }
            }
            
        $('.' + el,$content).removeClass('hidden').siblings('.filecontent-box').addClass('hidden');

        // 渲染主属性
        $('.' + el + ' .primary-info',$content).html(getTemplateHtml('entityPrimary',primaryData));
        
        mining.utils.checkImg($('.itemthumb img',$('.' + el + ' .primary-info',$content)));
        
        if(($('.' + el + ' .primary-info .infolist .text',$content).length % 2) == 1){
            $('.' + el + ' .primary-info .infolist .text:last',$content).width('98%');
        }
        // 渲染副属性
        $('.' + el + ' .minor-info .minorlist',$content).html(getTemplateHtml('entityMinor',minorData));
        

        $('.' + el + ' .minor-info .panel-list',$content).mCustomScrollbar({
            theme: 'minimal'         
        });
        if(($('.' + el + ' .minor-info .minorlist .infos',$content).length % 2) == 1){
            $('.' + el + ' .minor-info .minorlist .infos:last',$content).width('100%');
        }

        function getPointAction(){
            $ajax.ajax({
                url: requestUrl.criminalUrl + filedata.key,
                success: function(data){
                    if(data.bodyData.length > 0){
                        $('.' + el + ' .primary-info .file-point',$content).removeClass('hidden').text(Math.round(data.bodyData[0]['score_alert'])).off('click').on('click',function(){
                            point.init(filedata.key);
                        });
                    }
                },
                error: function(err){
                    console.log(err);
                }
            });
        }
        
        if(filedata.label == 'person' && (filedata.key && filedata.key.length > 0)){
            if(window.location.host.indexOf('qbbigdata') > -1 || window.location.host.indexOf('1gongan') > -1){
                // 712版本，从石家庄人口库取属性数据
                $ajax.ajax({
                    url: requestUrl.personInfoUrl + filedata.key,
                    abort: true,
                    success: function(data){
                        if(mining.utils.isEmpty(data))return;
                        var picInfo = data.XP,
                            primaryProperty = {},
                            minorProperty = {};
                        $.each(residentProperty.primary,function(dataKey,dataValue){
                            primaryProperty[dataKey] = {
                                name: dataValue,
                                value: data[dataKey]
                            };
                        });
                        $.each(residentProperty.minor,function(dataKey,dataValue){
                            minorProperty[dataKey] = {
                                name: dataValue,
                                value: data[dataKey]
                            };
                            if(data[dataKey] && !mining.utils.isEmpty(data[dataKey]) && residentProperty.minorFilter.hasOwnProperty(dataKey)){
                                delete minorData.minor[residentProperty.minorFilter[dataKey]];
                            }
                        });
                        primaryData.primary = primaryProperty;
                        primaryData.picUrl = mining.utils.isEmpty(picInfo) ? svgicon : 'data:image/png;base64,' + picInfo;
                        primaryData.sourcetag = '712';
                        minorData.minor = $.extend(minorProperty, minorData.minor);
                        $('.' + el + ' .primary-info',$content).html(getTemplateHtml('entityPrimary',primaryData));
                        $('.' + el + ' .minor-info .minorlist',$content).html(getTemplateHtml('entityMinor',minorData));
                        getPointAction();
                    },
                    error: function(err){
                        console.log(err);
                    }
                });
            }
            getPointAction();
        }

        formatRelatedEntity(el);
        getSnapshotInfo(el);
        entityEvents(el);
    }

    // 实体相关事件
    var entityEvents = function(el){
        $('.' + el + ' .event-info .event-summary',$content).removeClass('hidden').siblings().addClass('hidden');
        $('.' + el + ' .event-info .event-box .events-view',$content).removeClass('hidden').siblings().addClass('hidden');
        $('.' + el + ' .event-info .bar-btn .show-events-list .show-list-btn',$content).parents('li.actionbtn').removeClass('hidden').siblings('.show-events-view').addClass('hidden');
        var events = mining.mappingutils.getClassList('event'),
            labels = [],
            eventsList = {};
        $.each(events,function(i,n){
            labels.push(n.label);
            eventsList[n.label] = n['label_name'];
        });
        $('.' + el + ' .event-info .event-summary .event-action',$content).html(getTemplateHtml('entityTimeAction'));
        $('.' + el + ' .event-info .event-summary .event-action select',$content).select2({
            minimumResultsForSearch: Infinity
        });
        $('.' + el + ' .event-info .bar-btn .show-events-list .show-list-btn').off('click').on('click',function(){
            $(this).parents('li.actionbtn').addClass('hidden').siblings('.show-events-view').removeClass('hidden');
            $('.' + el + ' .event-info .event-box .events-list').removeClass('hidden').siblings().addClass('hidden');
            if($(this).attr('data-entity-id') != filedata.gid){
                $(this).attr('data-entity-id',filedata.gid);
                $('.' + el + ' .event-info .event-box .events-list .event-table-tags',$content).empty();
                var $dataTagsBox = $('.' + el + ' .event-info .event-box .events-list .event-table-box',$content);
                $dataTagsBox.find('.table-list').empty();
                $dataTagsBox.prev('.fixedthead').remove();
                var p = {
                    id: filedata.key,
                    labels: labels
                }
                getEntityEventsTable(el, p,eventsList);
            }
            mining.utils.serverLog(437);
        });
        $('.' + el + ' .event-info .bar-btn .show-events-view .show-view-btn').off('click').on('click',function(){
            $(this).parents('li.actionbtn').addClass('hidden').siblings('.show-events-list').removeClass('hidden');
            $('.' + el + ' .event-info .event-box .events-view').removeClass('hidden').siblings().addClass('hidden');
            mining.utils.serverLog(438);
        });
        $('.' + el + ' .event-info .event-summary .event-action .show-details').off('click').on('click',function(){
            var $actionBox = $('.' + el + ' .event-info .event-summary .event-action'),
                yearsValue = $actionBox.find('select.years-value').val(),
                eventTime = $actionBox.find('select.time-value').val(),
                p = {
                    id: filedata.key,
                    labels: labels,
                    starttime: yearsValue + '-01-01 00:00:00',
                    endtime: yearsValue + '-12-31 23:59:59',
                    years: yearsValue
                };
            getEntityEvents(el, p,eventsList,eventTime);
            mining.utils.serverLog(439,p.starttime + '/' + p.endtime);
        });

        $('.' + el + ' .event-info .event-action .show-details').click();

        $('.' + el + ' .event-info .event-detail .event-action .return-back').off('click').on('click',function(){
            $('.' + el + ' .event-info .event-summary',$content).removeClass('hidden').siblings().addClass('hidden');
        });
        
    }

    var getEntityEvents = function(el, params, eventsList, eventTime){
        mining.utils.modalLoading();
        $ajax.ajax({
            url: requestUrl.getEventsByType,
            data: {
                objId: params.id,
                types: JSON.stringify(params.labels),
                starttime: params.starttime,
                endtime: params.endtime,
                keyword: ''
            },
            type: 'get',
            success: function(result){
               renderEntityEventsList(el,result,eventsList,eventTime,params);
               mining.utils.modalLoading('close');
            },
            error: function(result){
                mining.utils.alertMsg(result, '获取数据失败，请稍后重试！', 'error');
                mining.utils.modalLoading('close');
            }
        });
    }

    var renderEntityEventsList = function(el,result,eventsList,eventTime,params){
        var objData = {
            data: result.bodyData,
            eventsList: eventsList,
            eventTime: eventTime,
            years: params.years
        };
        $('.' + el + ' .event-info .event-summary .event-type',$content).html(getTemplateHtml('entityEventsList',objData));
        $.each($('.' + el + ' .event-info .event-summary .event-type .event-list .event-point',$content),function(){
            var leftValue = $(this).parent().outerWidth() / $(this).attr('data-count') * $(this).attr('data-left');
            $(this).css('left',leftValue + 'px');
        });
        $.each($('.' + el + ' .event-info .event-summary .event-type .events-info-time',$content),function(){
            var itemIndex = $(this).index();
            $(this).data('data',entityEventsData.eventsData[itemIndex]);
        });
        $('.' + el + ' .event-info .event-summary .event-time',$content).html(getTemplateHtml('eventTimePoint',{eventTime: eventTime,years: params.years}));
        $.each($('.' + el + ' .event-info .event-summary .event-time .time-point',$content),function(){
            var itemIndex = $(this).index(),
                detailsWidtn = $('.' + el + ' .event-info .event-summary .event-type .events-info-time',$content).outerWidth(),
                leftValue = 36 + detailsWidtn * itemIndex;
            $(this).css('left',leftValue);
        });
        $('.' + el + ' .event-info .event-summary .event-type .events-info-time',$content).off('click').on('click',function(){
            $('.' + el + ' .event-info .event-detail',$content).removeClass('hidden').siblings().addClass('hidden');
            var dataObj = {
                dataList: $(this).data('data'),
                dataTime: $(this).attr('data-time')
            };
            renderEntityEventsDetails(el,dataObj,eventsList,eventTime,params);
            mining.utils.serverLog(440);
        });
    }

    var renderEntityEventsDetails = function(el,result,eventsList,eventTime,params){
        var objData = {
                data: result.dataList,
                eventsList: eventsList,
                years: params.years
            };
        if(result.dataTime.indexOf('q') > -1){
            var index = result.dataTime.replace('q','');
            objData.dataTime = qList[parseInt(index - 1)];
        }else{
            objData.dataTime = [parseInt(result.dataTime.replace('m',''))];
        }
        
        $('.' + el + ' .event-info .event-detail .event-type .events-data-list',$content).html(getTemplateHtml('entityEventsDetails',objData));
        var $eventListBox = $('.' + el + ' .event-info .event-detail .event-type .event-list',$content),
            $eventTypeList = $('.' + el + ' .event-info .event-detail .event-type .event-type-list',$content);
        $eventListBox.find('.event-detail-list',$content).css('height',$eventListBox.height() - 40);
        $eventListBox.mCustomScrollbar({
            theme: 'minimal',
            axis: 'x',
            advanced:{ 
                autoExpandHorizontalScroll: true 
            }
        });
        if($eventListBox.find('.events-info-item').height() < 45){
            $eventTypeList.find('.type-info').addClass('hidden');
            $eventTypeList.find('.types .icon').css('margin-top','-11px');
        }
        var dateBottomValue = {};
        $.each($('.' + el + ' .event-info .event-detail .event-type .event-list .detail-show',$content),function(i,n){
            var datePointCount = $(n).attr('data-dcount'),
                monthPointCount = $(n).attr('data-mcount'),
                itemDate = $(n).attr('data-date'),
                nodeWidth = $(n).outerWidth(),
                leftValue = (datePointCount - monthPointCount) * 20 + monthPointCount * 30 - (itemDate == 1 ? 15 : 10),
                setLeft = (leftValue - nodeWidth / 2) > 0 ? (leftValue - nodeWidth / 2) + 'px': 0,
                setRight = 'initial',
                randomValue = Math.round(Math.random()*10),
                bottomValue = parseInt($(n).css('bottom')) + randomValue,
                indexValue = $(n).parent().index(),
                parentDomHeight = $(n).parent().height(),
                lineHeight = parentDomHeight * ( $(n).parent().parent().children().length - (indexValue + 1)) + randomValue,
                dateTimeValue = $(n).attr('data-time');
                
            if(leftValue + nodeWidth > $(n).parent().outerWidth()){
                setRight = 0;
                setLeft = 'initial';
            }
            if($(n).parent().height() < 45){
                if(indexValue != 4){
                    lineHeight = lineHeight - (randomValue / 2);
                }
                $(n).height(28).find('.events-text-info').css({
                    'height': '14px',
                    'line-height': '14px'
                });
            }
            if(!dateBottomValue['b' + dateTimeValue]){
                dateBottomValue['b' + dateTimeValue] = randomValue;
            }else{
                bottomValue = bottomValue + dateBottomValue['b' + dateTimeValue] + 6;
                lineHeight = lineHeight + dateBottomValue['b' + dateTimeValue] + 6;
                dateBottomValue['b' + dateTimeValue] = randomValue;
            }
            $(this).css({'left':setLeft,'right':setRight,'bottom':bottomValue + 'px','width':$(n).outerWidth() + Math.round(Math.random()*10)}).on('mouseenter',function(){
                $(this).css('z-index',6).addClass('active');
            }).on('mouseleave',function(){
                $(this).css('z-index','').removeClass('active');
            });
            var arrowLeft = 0;
            if(setLeft == 0){
                arrowLeft = leftValue;
            }else if(setRight == 0){
                arrowLeft = $(this).outerWidth() - ($(this).parent().outerWidth() - leftValue) - 6;

            }else{
                arrowLeft = (nodeWidth - 12) / 2;
            }
            $(this).find('.arrowhead').css('left',arrowLeft + 'px').find('.line').height(lineHeight);
            
        });
    }

    var getEntityEventsTable = function(el, params, eventsList){
        mining.utils.modalLoading();
        $ajax.ajax({
            url: requestUrl.getEventsByType,
            data: {
                objId: params.id,
                types: JSON.stringify(params.labels),
                starttime: '',
                endtime: '',
                keyword: ''
            },
            type: 'get',
            success: function(result){
               renderEntityEventsTable(el,result,eventsList,params);
               $('.' + el + ' .event-info .event-box .events-list .event-table-tags .tags-info',$content).first().click();
               mining.utils.modalLoading('close');
            },
            error: function(result){
                mining.utils.alertMsg(result, '获取数据失败，请稍后重试！', 'error');
                mining.utils.modalLoading('close');
            }
        });
    }

    var renderEntityEventsTable = function(el,result,eventsList,params){
        var eventTypes = eventsParam.eventList,
            eventMapping = eventsParam.eventmapping,
            $tagsBox = $('.' + el + ' .event-info .event-box .events-list .event-table-tags',$content),
            $dataTagsBox = $('.' + el + ' .event-info .event-box .events-list .event-table-box',$content),
            dataObj = {};
        $.each(result.bodyData,function(i,n){
            if(!dataObj.hasOwnProperty(n.label)){
                dataObj[n.label] = [];
            }
            dataObj[n.label].push(mining.mappingutils.formatProperty(n));
        });
        var hasEvents=false;
        $.each(eventTypes,function(i,v){
            if(mining.utils.isEmpty(dataObj[v]))return;
            hasEvents=true;
            var labelName = mining.mappingutils.getLabelName(v).replace('事件_','');
            $tagsBox.append(getTemplateHtml('filterTags',{name: labelName,label:v})).find('.tags-info').last().data('data',dataObj[v]);
        });
        if(!hasEvents)
        {
            $tagsBox.html('相关事件暂未定义');
        }
        $tagsBox.off('click','.tags-info').on('click','.tags-info',function(){
            $(this).addClass('active').siblings().removeClass('active');
            var tagsData = {
                head: eventMapping[$(this).attr('data-label')].split(','),
                body: $(this).data('data')
            };
            $dataTagsBox.find('.table-list').html(getTemplateHtml('eventsTable',tagsData));
            if($dataTagsBox.find('.table-list').height() < $dataTagsBox.height()){
                $dataTagsBox.find('.table-list table').addClass('auto');
            }
            fixedThead($dataTagsBox);
        });
        $dataTagsBox.mCustomScrollbar({
            theme: 'minimal'
        });
    }

    // 关系
    var formatRelation = function(type,label){
        var sourceData = filedata.source,
            sourcePrimary = mining.mappingutils.getProperties(sourceData, 'primary'),
            sourceMinor = mining.mappingutils.getProperties(sourceData, 'minor'),
            sourceSvgicon = mining.mappingutils.getGraphIcon(sourceData),
            targetData = filedata.target,
            targetPrimary = mining.mappingutils.getProperties(targetData, 'primary'),
            targetMinor = mining.mappingutils.getProperties(targetData, 'minor'),
            targetSvgicon = mining.mappingutils.getGraphIcon(targetData),
            primaryData = {
                source:{
                    data: sourcePrimary,
                    picUrl: (sourceData.photoUrl ? sourceData.photoUrl : sourceSvgicon),
                    svgicon: sourceSvgicon
                },
                target:{
                    data: targetPrimary,
                    picUrl: (targetData.photoUrl ? targetData.photoUrl : targetSvgicon),
                    svgicon: targetSvgicon
                },
                relationTags: []
            },
            minorData = {
                source: sourceMinor,
                target: targetMinor
            },
            el = type + '-box',
            elBox = label + '-relation';
        if(label == 'harts'){
            primaryData.relationTags = mining.mappingutils.getRuleLabel(filedata);
        }else{
            $.each(mining.mappingutils.getShowlabel(filedata),function(i,n){
                primaryData.relationTags.push(n.value);
            });
        }

        $('.' + elBox,$content).removeClass('hidden').siblings('.relation').addClass('hidden');
        $('.' + elBox,$content).parents('.filecontent-box').removeClass('hidden').siblings('.filecontent-box').addClass('hidden');
        
        // 渲染主属性
        $('.' + el + ' .primary-info',$content).html(getTemplateHtml('relationPrimary',primaryData));
        
        mining.utils.checkImg($('.entity-pic img',$('.' + el + ' .primary-info',$content)));
        $('.' + el + ' .primary-info .primary-box',$content).mCustomScrollbar({
            theme: 'minimal'         
        });
        var infolist = $('.' + el + ' .primary-info .infolist',$content);
        $.each(infolist,function(i,n){
            if(($(n).find('.text').length % 2) == 1){
                $(n).find('.text').last().width('100%');
            }
        });

        
        if(label == 'harts'){
            getHartsEvents(elBox);
        }else{
            $('.' + el + ' .ordinary-relation .minorlist',$content).html(getTemplateHtml('relationEntityMinor',minorData));
            
            $('.' + el + ' .ordinary-relation .minor-info .panel-list',$content).mCustomScrollbar({
                theme: 'minimal'         
            });

            var uls = $('.' + el + ' .minor-info .minorlist ul',$content),
                relationAttr = mining.mappingutils.getProperties(filedata);
            $ajax.ajax({
                url: requestUrl.expandEdge,
                data: {
                    eid: filedata.gid,
                    label: filedata.label
                },
                success: function(data){
                    if(mining.utils.isEmpty(data) || mining.utils.isEmpty(data.edge_info))return;
                    $.each(data.edge_info, function(i,n){
                        var  proInfo=	mining.mappingutils.getProperties(n);
                        $.each(proInfo, function(k,o){
                            $('.' + el + ' .ordinary-relation .relation-details .relation-list ul').append(getTemplateHtml('relationAttrItem',o));
                        });
                    });
                }
            });
            $('.' + el + ' .ordinary-relation .relation-details .relation-list').html(getTemplateHtml('relationAttr',relationAttr));
            
            $('.' + el + ' .ordinary-relation .relation-details .relation-box').mCustomScrollbar({
                theme: 'minimal'         
            });
            $.each(uls,function(i,n){
                if(($(n).find('.infos').length % 2) == 1){
                    $(n).find('.infos').last().css('width','100%');
                }
            });
        }
        formatRelatedEntity(el);
        getSnapshotInfo(el);
    }

    // 群体档案
    var formatGroup = function(type,data){
        var el = type + '-box';
        // 群体基本信息
        var baseInfo = data.label;
        $('.' + el + ' .group-base .primary-info',$content).html(getTemplateHtml('groupBaseInfo',baseInfo));

        renderGroupTagsAction(el,data.tags,data.label.id);

        // 群体事件
        var eventInfo = data.events,
            $eventBox = $('.' + el + ' .group-info .group-event',$content);
        $eventBox.find('.event-box .list-box').mCustomScrollbar({
            theme: 'minimal'         
        });
        $eventBox.find('.eventlist').html(getTemplateHtml('groupEvents',eventInfo));
        if($eventBox.find('.eventlist').height() < $eventBox.find('.event-box').height()){
            $eventBox.find('.eventlist table').addClass('auto');
        }
        fixedThead($eventBox.find('.list-box'));
        renderGroupMembersAction(el,data.persons);
    }

    var renderGroupTagsAction = function(el,tags,categoryId){
        // 群体标签
        var $tagsBox = $('.' + el + ' .group-base .tags-box',$content),
            $tagsInfoBox = $tagsBox.find('.tags-list');
        $tagsInfoBox.empty();
        $.each(tags,function(i,v){
            $tagsInfoBox.append(getTemplateHtml('filterTags',{name: v}));
        });

        var textArr = [];
        $.each($tagsBox.find('.tags-info'),function(){
            textArr.push($(this).text());
        });

        function getRelatedInfo(tagsText,categoryId){
            $ajax.ajax({
                url: requestUrl.getInfoByTagsUrl,
                data:{
                    applicantId: mining.userinfo.user_id,
                    labels: tagsText,
                    category: categoryId
                },
                type: 'get',
                success: function(data){
                    renderInfoAction(el,data);
                },
                error: function(err){
                    mining.utils.alertMsg(err, '获取数据失败，请稍后重试！', 'error');
                }
            });
        }

        $tagsBox.off('click','.tags-info').on('click','.tags-info',function(){
            if($(this).hasClass('active')){
                $(this).removeClass('active');
                getRelatedInfo(textArr.join(','),categoryId);
            }else{
                $(this).addClass('active').siblings().removeClass('active');
                var tagsText = $(this).text();
                getRelatedInfo(tagsText,categoryId);
            }
            
            mining.utils.serverLog(454);
        });

        getRelatedInfo(textArr.join(','),categoryId);
    }

    var renderInfoAction = function(el,infos){
        // 相关情报
        var $infosBox = $('.' + el + ' .group-info .information-box .list-box',$content);
        $infosBox.mCustomScrollbar({
            theme: 'minimal'         
        });
        $infosBox.find('ul').html(getTemplateHtml('groupInformation',infos));

        $infosBox.off('click','li').on('click','li',function(){
            var infoId = $(this).attr('data-info-id');
            window.showEventDetailsId = infoId;
            mining.utils.hashChange('event');
            mining.utils.serverLog(456);
        });
    }


    var renderGroupMembersAction = function(el,members){
        if(graph){
            $('.' + el + ' .graph-info .filter-tags',$page).addClass('hidden').empty();
            graph.elements().remove();
        };
        
        // 骨干成员
        var $memberBox = $('.' + el + ' .group-info .group-member',$content);
        $memberBox.find('.member-box .list-box').mCustomScrollbar({
            theme: 'minimal'         
        });
        $memberBox.find('.memberlist').html(getTemplateHtml('groupMembers',members));
        if($memberBox.find('.memberlist').height() < $memberBox.find('.member-box').height()){
            $memberBox.find('.memberlist table').addClass('auto');
        }
        fixedThead($memberBox.find('.list-box'));

        $memberBox.find('.memberlist table tbody').off('click','tr').on('click','tr',function(e){
            var memberId = $(this).attr('data-member-id');
            $ajax.ajax({
                url: requestUrl.getVertexByIdUrl + memberId,
                type: 'get',
                success: function(data){
                    filedata = data.v[0];
                    if(!filedata)return;
                    filedata.etype = mining.mappingutils.getType(filedata);
                    formatRelatedEntity(el);
                },
                error: function(err){
                    mining.utils.alertMsg(err, '获取数据失败，请稍后重试！', 'error');
                }
            });
            if(typeof e.altKey != 'undefined')mining.utils.serverLog(455);
        });
        $memberBox.find('.memberlist table tbody tr:first').click();
    }

    // harts相关事件
    var getHartsEvents = function(el){
        $('.' + el + ' .harts-box .relation-list',$content).empty();
        mining.utils.getHartsData({
        	data: filedata,
        	success: function(result){
        		var mergeData = mining.utils.formatHartsMerge(result);
                $('.' + el + ' .harts-box',$content).mCustomScrollbar({
                    theme: 'minimal'         
                });
                $('.' + el + ' .harts-box',$content).addClass('hidden');
                var liveData = mergeData['hotel_event'],
                    trainData = mergeData['train_event'],
                    flightData = mergeData['flightlg_event'];
                var count = 0;
                if(trainData){
                    $('.' + el + ' .train-travel').removeClass('hidden');
                    count++;
                }
                if(flightData){
                    $('.' + el + ' .flight-travel').removeClass('hidden');
                    count++;
                }
                if(liveData){
                    $('.' + el + ' .hotel-live').removeClass('hidden');
                    count++;
                }
                $('.' + el + ' .harts-box',$content).css('height','calc((100% - ' + (15 * (count - 1)) + 'px) / ' + count + ')');
                
                if(trainData && trainData.body.length > 0){
                    $('.' + el + ' .train-travel .relation-list',$content).html(getTemplateHtml('hartsTravel',trainData));
                    if($('.' + el + ' .train-travel .relation-list',$content).height() < $('.' + el + ' .train-travel .relation-list',$content).parents('.harts-box').height()){
                        $('.' + el + ' .train-travel .relation-list table',$content).addClass('auto');
                    }
                    fixedThead($('.' + el + ' .train-travel',$content));
                }
                if(flightData && flightData.body.length > 0){
                    $('.' + el + ' .flight-travel .relation-list',$content).html(getTemplateHtml('hartsTravel',flightData));
                    if($('.' + el + ' .flight-travel .relation-list',$content).height() < $('.' + el + ' .flight-travel .relation-list',$content).parents('.harts-box').height()){
                        $('.' + el + ' .flight-travel .relation-list table',$content).addClass('auto');
                    }
                    fixedThead($('.' + el + ' .flight-travel',$content));
                }
                if(liveData && liveData.body.length > 0){
                    $('.' + el + ' .hotel-live .relation-list',$content).html(getTemplateHtml('hartsLive',liveData));
                    if($('.' + el + ' .hotel-live .relation-list',$content).height() < $('.' + el + ' .hotel-live .relation-list',$content).parents('.harts-box').height()){
                        $('.' + el + ' .hotel-live .relation-list table',$content).addClass('auto');
                    }
                    fixedThead($('.' + el + ' .hotel-live',$content));
                }
        	}
        });
    }

    /* 关联实体 */
    var formatFiledata = function(fdata){
    	var _data = mining.utils.clone(fdata),
    		eledata = {v:[], e:[]};
    		
    	if(filedata.etype == 'entity'){
    		eledata.v.push(_data);
    	}else{
    		eledata.v.push(_data.source);
    		delete _data.source;
    		eledata.v.push(_data.target);
    		delete _data.target;
    		eledata.e.push(_data);
    	}
    	
    	return eledata
    }
    var showFiledataCharts = function(){
    	if(!graph)return;
    	graph.elements().remove();
    	graphModule.appenddata(formatFiledata(filedata), true);
		if(filedata.etype == 'entity'){
			var classList = mining.mappingutils.getClassList('relation'), 
				labelAndProp = {}, 
				ruleIdArr = [],
				labels = [];
		
			$.each(classList, function(i,n){
				labels.push(n.label);
			});
			$.each(labels, function(i,n){
				var _type = classList[n].children[0].type;
				labelAndProp[n] = mining.mapping.objList[n + (mining.utils.isEmpty(_type) ? '' : '_' + _type)].timeline;
			});
			ruleIdArr = mining.mappingutils.getRuleIds();
			$ajax.ajax({
				url: requestUrl.getByLabel,
				data: {
					vid: filedata.gid,
					labels: JSON.stringify(labelAndProp),
					rule_ids: JSON.stringify(ruleIdArr),
					starttime: '',
					endtime: '',
					keyword: ''
				},
				type: 'get',
				success: function(result){
					setTimeout(function(){
						graphModule.appenddata(result, false);
					}, 300);
				},
				error: function(result){
					mining.utils.alertMsg(result, '获取数据失败，请稍后重试！', 'error');
				}
			});
		}else if(filedata.etype == 'relation'){
			var vids = [filedata.source.gid, filedata.target.gid],
				labels = [];
			
			labels = mining.mappingutils.getLabels('relation');
			$ajax.ajax({
				url: requestUrl.getPath,
				data: {
					vids: JSON.stringify(vids),
					labels: JSON.stringify(labels),
					hop: 1,
					keyword: ''
				},
				success: function(result){
					setTimeout(function(){
						graphModule.appenddata(result, false);
					}, 300)
				},
				error: function(result){
					mining.utils.alertMsg(result, '获取数据失败，请稍后重试！', 'error');
				}
			});
		}
    }
    var clickstate = false;
    var formatRelatedEntity = function(el){
    	if(graphModule){
    		delete graphModule;
    	}
    	graphModule = new (require('core/common/graphchart/graphchart'))(),
    	graphModule.init({
			container: $('.' + el + ' .relatedchart',$page),
			readyCallback: function(){
				window.filegraph1 = this;
				graph = this;
				showFiledataCharts();
				mining.utils.chartResize();
            },
            clickCallback: function(e){
                if(!clickstate){
                    clickstate = true;
                    var ele = e.cyTarget,
                        _data = ele.data().data,
                        etype = mining.mappingutils.getType(_data);

                  if(ele.isEdge()){
                     $.extend(_data, {
                         target: ele.target().data().data,
                         source: ele.source().data().data
                     });
                    }
                    showGraphData(_data);
                    if(etype == 'entity'){
                        mining.utils.serverLog(442);
                    }else if(etype == 'relation'){
                        mining.utils.serverLog(443);
                    }
                    timer = setTimeout(function(){
                        clickstate = false;
                    },1000);
                }
             //    clearTime
            	// var ele = e.cyTarget,
            	// 	_data = ele.data().data;
            	// if(ele.isEdge()){
            	// 	$.extend(_data, {
            	// 		target: ele.target().data().data,
            	// 		source: ele.source().data().data
            	// 	});
            	// }

                
            },
            dblclickCallback:function(e){
                return;
            }
        });
        $('.' + el + ' .graph-info .send-btn',$page).off('click').on('click',function(e){
            var eleLen = graph.elements().length,
                listArr = [];
            if(eleLen == 0)return;
            $.each(graph.elements(),function(index,ele){
                var data = ele.data().data, 
                    type = mining.mappingutils.getType(data);
                if(type == 'relation'){
                    data = $.extend(data, {source: ele.source().data().data, target: ele.target().data().data});
                }
                listArr.push(data);
                mining.utils.stopBubble(e);
            });
            showGraphData(listArr,'addList');
            mining.utils.serverLog(441);
        });
        $('.' + el + ' .graph-info .filter-tags',$page).addClass('hidden').empty();
        if(filedata.label == 'person'){
            $ajax.ajax({
                url: requestUrl.filterTagsUrl + '?vid=' + filedata.gid + '&filterProperty=PERSON_bjzdrybh&hop=2&groupby=PERSON_zdrlx',
                success: function(data){
                    var $tagsBox = $('.' + el + ' .graph-info .filter-tags',$page);
                    $tagsBox.empty();
                    if(!mining.utils.isEmpty(data.bodyData.pathInfo)){
                        $.each(data.bodyData.pathInfo,function(i,n){
                            $.each(n,function(k,v){
                                if(!reg.test(k) && k != 'NULL'){
                                    $tagsBox.removeClass('hidden');
                                    $tagsBox.append(getTemplateHtml('filterTags',{name: k})).find('.tags-info').last().data('data',v);
                                }
                            });
                        });
                    }
                },
                error: function(err){
                    console.log(err);
                }
            });
        }
        $('.' + el + ' .graph-info .filter-tags',$page).off('click','.tags-info').on('click','.tags-info',function(){
            $(this).siblings().removeClass('active');
        	if($(this).hasClass('active')){
        		$(this).removeClass('active');
        		showFiledataCharts();
        		return;
        	}
    		$(this).addClass('active');
        	var itemTagData = $(this).data('data'),
        		zdrlx = $(this).attr('title'),
                dataForGraph = {v:[],e:[]};
                
            // $.each(itemTagData,function(i,n){
                $.each(itemTagData.v,function(vIndex,vValue){
                	//filterProperty=PERSON_bjzdrybh&hop=2&groupby=PERSON_zdrlx',
                	if(vValue.PERSON_zdrlx && vValue.PERSON_zdrlx == zdrlx){
                		vValue.class = 'red';
                	}
                    dataForGraph.v.pushOnly(vValue);
                });
                $.each(itemTagData.e,function(eIndex,eValue){
                    dataForGraph.e.pushOnly(eValue);
                });
            // });
            graph.elements().remove();
            graphModule.appenddata(dataForGraph, false);
            graph.$('#' + filedata.gid).addClass('selected');
        });
    }

    /* 添加左侧list */
    var showGraphData = function(data, t){
        var $fileside = $('.fileside',$page);
        if(t && t == 'addList'){
            mining.utils.updateFileData('add',{dataArr:data,tabType:'1'},function(result){
                navtabModule.add(result,true);
            });
        }else{
            if(data.key && data.key.indexOf('******') > -1){
                $dialog.alert('对不起，您没有查看该数据的权限。','warning','1000');
                return;
            }
            var title = mining.mappingutils.getTitle(data);
            mining.utils.updateFileData('addItem',{dataArr:[data],tabId:$('.content-box',$page).attr('tabid')},function(result){
                listModule.add(data,true);
            });
        }
    }

    /* 含有该对象的研判子图 */
    var getSnapshotInfo = function(el){
        $('.' + el + ' .snapshot-info .snapshotitem').removeAttr('style');
        var liWidth = 163, 
            pageSize = 10,
            setNewLeftVlaue = 0;
        function getData(n,isAdd){
            var $snapshotList = $('.' + el + ' .snapshot-info .snapshotitem'),
                total = $snapshotList.attr('pSize'),
                pageNo = n;
                
            if($snapshotList.find('li[sid]').length > 0 && $snapshotList.find('li[sid]').length == total) return;
            $ajax.ajax({
                url: requestUrl.searchSnapshot,
                data: {
                    user_id: mining.userinfo.user_id,
                    keyword: filedata.gid,
                    type: 0,
                    pageNo: pageNo,
                    pageSize: pageSize
                },
                success: function(data){
                    if(isAdd){
                        $snapshotList.append(getTemplateHtml('snapshotList',data)).attr('pNo',pageNo).attr('pTotal',data.totalCount);
                    }else{
                        $snapshotList.html(getTemplateHtml('snapshotList',data)).attr('pNo',pageNo).attr('pTotal',data.totalCount);
                    }
                    if(data.totalCount > 0){
                        $snapshotList.width((liWidth * $snapshotList.find('li').length));
                    }
                },
                error: function(data){
                    mining.utils.alertMsg(data, '获取子图数据失败，请稍后重试！', 'error');
                }
            });
        }
        getData(1);
        // 右按钮滚动到最后一个，调取接口继续加载子图数据
        $('.' + el + ' .slider-pre .scopaicon').off('click').on('click',function(){
            var $snapshotList = $('.' + el + ' .snapshot-info .snapshotitem');
            if(($snapshotList.outerWidth() > $snapshotList.parent().outerWidth()) && setNewLeftVlaue < 0){
                setNewLeftVlaue = setNewLeftVlaue + liWidth;
                $snapshotList.css('left',setNewLeftVlaue + 'px');
            }
        });
        $('.' + el + ' .slider-next .scopaicon').off('click').on('click',function(){
            var $snapshotList = $('.' + el + ' .snapshot-info .snapshotitem');
            if(($snapshotList.outerWidth() > $snapshotList.parent().outerWidth()) && ((Math.abs(setNewLeftVlaue)) + $snapshotList.parent().outerWidth() < $snapshotList.outerWidth())){
                setNewLeftVlaue = setNewLeftVlaue - liWidth;
                $snapshotList.css('left',setNewLeftVlaue + 'px');
            }else{
                var pNo = parseInt($snapshotList.attr('pNo')),
                    pTotal = parseInt($snapshotList.attr('pTotal'));
                if(pNo * pageSize < pTotal){
                    getData((pNo + 1),true);
                    setNewLeftVlaue = setNewLeftVlaue - liWidth;
                    $snapshotList.css('left',setNewLeftVlaue + 'px');
                }
            }
        });
        $('.' + el + ' .snapshot-info .snapshotitem').off('click','li').on('click','li',function(){
            var itemId = $(this).attr('data-id'),
                logTitle = $(this).find('.sna-title').text();
            snapshotModule.open({id:itemId});
            mining.utils.serverLog(444,logTitle);
        });
    }

    /* 固定表头 */
    var fixedThead = function($tablewrap){
        var ths = '';
        $('th',$tablewrap).each(function(){
            ths += '<th class="' + $(this).attr('class') + '" title="' + $(this).attr('title') + '" style="width:' + $(this).outerWidth() + 'px;text-align:center;">' + $(this).text() + '</th>';
        });
        $tablewrap.prev('.fixedthead').remove();
        $tablewrap.before('<table class="' + $tablewrap.find('table').attr('class') + ' fixedthead" style="width:' + $tablewrap.outerWidth() + 'px;position:absolute;z-index:10;background-color:#fff;"><thead><tr>' + ths + '</tr></thead></table>');
    }

    return {
        init: initFileContent,
        show: showFileContent
    }
});