define(function (require) {
    /* ---------- 数据模型 ---------- */
    require('st-grid');
    require('select2');
    require('dialog');
    require('jqueryui');
    require('scrollbar');
    var $page = $('.page-data'),
        requestUrl = {getList:mining.baseurl.console + '/element/all',getObjById:mining.baseurl.console + '/element/get',
        getIcon:mining.baseurl.console + '/elementicon/getUnusedIcons',addProperty:mining.baseurl.console + '/elementparameter/addPropertyParameter',
        updateParam:mining.baseurl.console + '/elementparameter/updateParameters',getParam:mining.baseurl.console + '/elementparameter/getMetaParameterByElementType'};

    //刷新布局
    var pageResize = function () {
        $('.listContainer').css('max-height',$('.leftType').height()-150+'px');
        $('.tableContainer').height($('.content',$page).height()- $('.paramform',$page).height()-130);
        $('.listTypeContainer').css('max-height',$('.leftType').height()-20+'px');
        $('.paramform').css( 'max-height',$('.content',$page).height()-230+'px');

        //TODO
    }
    var dataObj = {'dataModel': [], 'dataRelation': [], 'dataEvent': []};
    /* 初始化 */
    var initPage = function () {
        mining.utils.loadPage($page, function () {
            mining.utils.winResize({name: pageResize});

            seajs.log('数据模型');
            function getData() {
                $ajax.ajax({
                    url: requestUrl.getList,
                    async: false,
                    success: function(result){
                        $.each(result.listObj, function (k, v) {
                            switch (v.objType) {
                                case 0:
                                    dataObj.dataModel.push(v);
                                    break;
                                case 1:
                                    dataObj.dataRelation.push(v);
                                    break;
                                case 2:
                                    dataObj.dataEvent.push(v);
                                    break;
                            }
                        })
                        loadList();
                    },
                    error: function(result){

                    }
                });

            }
            function getListLabel(data) {
                var list = [];
                var isInArray = function (list, label) {
                    for (var i=0;i<list.length;i++){
                        if (list[i].label == label) {
                            return true;
                        }
                    }
                    return false;
                }
                $.each(data, function (k, v) {
                    if(!isInArray(list, v.label)){
                        list.push({'name': v.labelName,'label': v.label, 'type': v.type});
                    }
                });
                var listHtml = [];
                $.each(list, function (k, v) {
                    listHtml.push('<li class="item ellipsis" key="'+ v.label+'" title="'+ v.name+'"><span class="'+mining.mappingutils.getFontName(v)+'"></span> ' + v.name + '</li>');
                })
                return listHtml.join('');
            }
            function getListType(data,label) {
                var list = [];
                $.each(data, function (k, v) {
                    if(v.label== label){
                        list.push(v);
                    }
                });
                return list;
            }
            function loadList() {
                $('#listContainer_entity').html(getListLabel(dataObj['dataModel']));
                $('#listContainer_relation').html(getListLabel(dataObj['dataRelation']));
                $('#listContainer_event').html(getListLabel(dataObj['dataEvent']));
                $('.listContainer').css('max-height',$('.leftType').height()-150+'px');

            }

            function loadListType(type,label) {
                var data =getListType(dataObj[type],label);
                var listHtml = [];
                $.each(data, function (k, v) {
                    listHtml.push('<li class="item ellipsis" objId="'+ v.id+'" objType="'+ v.objType+'" title="'+ v.typeName+'"><span class="'+mining.mappingutils.getFontName(v)+'"></span> ' + v.typeName + '</li>');
                })
                $('#listTypeContainer').html(listHtml.join(''));
            }

            function loadTable(data,dataParam) {
                var totalData = [];
                var obj={};
                var getTableCols=function(){
                    var thead=[];
                    var tbody=[];

                    $.each(dataParam,function(k,v){
                        if(v.keyFlag){
                            thead.push('<th>'+ v.name+'</th>');
                            tbody.push('<td key="'+ v.parameter+'" >{'+ v.parameter+'} </td>')
                            obj[v.parameter]=' - - ';
                        }
                    });
                    $('#tablehead thead tr').html($('<th>序号</th><th>属性</th><th>标签</th>'+thead.join('')));
                    return tbody.join('');
                };

                var getData = function (params) {
                    var result = {
                        totalCount: totalData.length
                    };
                    var pageNo = params.pageNo;
                    var pageSize = params.pageSize;

                    if (pageSize) {
                        var from = (pageNo - 1) * pageSize;
                        var to = Math.min(from + pageSize, totalData.length);
                        var bodyData = [];
                        for (var i = from; i < to; i++) {
                            bodyData.push(totalData[i]);
                        }
                        result.bodyData = bodyData;
                    } else {
                        result.bodyData = totalData;
                    }
                    for (var k in params) {
                        result[k] = params[k];
                    }
                    return result;
                };

                var bodyTemplate= '<tr key={property}><td>[]</td><td>{property}</td><td >{label}</td>'+getTableCols()+'</tr>';
                $.each(data, function (k, v) {
                    totalData.push(  $.extend({
                        property: v.property,
                        label: v.propertyName
                    },obj));
                });
                var grid = Grid.init({
                    holder: 'propertyTable',
                    bodyTemplate:bodyTemplate,
                    dataSource: getData,
                    nopage:true
                });
                grid.send();
                $.each($('#property .param select.select[multiple="multiple"]'),function(k,v){
                    setTableValue(this);
                }) ;
            }
            function setTableValue(obj){
                var values=$(obj).val();
                var key=$(obj).attr('key');
                $('#propertyTable td[key='+key+']').html(' - - ').removeClass('true');
                if(!(values instanceof Array))
                    values=new Array(values);
                if(values!=null){
                    $.each( values,function(k,v){
                        if(v)$('#propertyTable tr[key='+v+'] td[key='+key+']').html('').addClass('true');
                    });
                }
            }
            function loadProperty(objId,objType){
                $ajax.ajax({
                    url: requestUrl.getObjById,
                    data:{id:objId},
                    async: true,
                    complete:function(){
                        hiddenLoading();
                    },
                    success: function(result){
                        var data = result.obj.ppList;
                        var dataParam=result.obj.paramList;
                        loadForm(data,dataParam,objType);
                    },
                    error: function(result){

                    }
                });
            }
            function showSelect(propertydata,selectOption){
                var valArr = selectOption.split(','), optionList=['<option></option>'], ops = [];
                $.each(propertydata,function(k,v){
                    var validx = valArr.indexOf(v.property),select='';
                    if(validx != -1){
                    	select='selected="selected"';
                    }else{
                    	validx = valArr.length;
                    }
                    ops.push('<option value="'+ v.property+'" '+select+' validx="' + validx+ '">'+ v.propertyName+'(' + v.property + ')</option>');
                });
                ops.sort(function(a,b){return  parseInt($(a).attr('validx')) - parseInt($(b).attr('validx'))});
                
                return ['<option></option>'].concat(ops).join('');
            }
            function showIcon(){
                var optionList=[];
                $ajax.ajax({
                    url: requestUrl.getIcon,
                    async: false,
                    success: function(result){
                        for (var i=1;i<result.listObj.length;i++){
                            optionList.push('  <img src="'+result.listObj[i].iconPath+'" width="50" height="50" alt=""/>');
                        }
                        $('.iconContainer').html(optionList.join(''));
                    },
                    error: function(result){
                        for (var i=1;i<8;i++){
                            optionList.push('  <img src="../static/scopa/images/console/'+i+'.png" width="50" height="50" alt=""/>');
                        }
                        $('.iconContainer').html(optionList.join(''));
                    }
                });

            }
            function loadForm(data,dataParam,objType){
                var getParaVal=function(name){
                    for (var i=0;i<dataParam.length;i++){
                        if(dataParam[i].paraLabel==name){
                            return {'id': dataParam[i].id,'val':dataParam[i].paraValue} ;
                        }
                    }
                    return "";
                };
                $ajax.ajax({
                    url: requestUrl.getParam,
                    async: true,
                    data:{objType:objType},
                    beforeSend:function(){
                    showLoading();
                    },
                    complete:function(){
                        hiddenLoading();
                    },
                    success: function(result){
                        $('#property').empty();
                        var htmlArr=[];
                        $.each(result.listObj, function (k, v) {
                            var inner='';
                            var param=getParaVal(v.parameter);
                            var pValue = param.val || '';
                            if(v.keyFlag){//keyFlag表示该项结果集是否为属性
                                inner=' <select class="select" key="'+ v.parameter+'" ' + (v.parameter == 'timeline' ? '' : multiple="multiple") + '>' + showSelect(data, pValue) + '  </select>';
                            }else{
                                var ops = [];
                                inner='';
                                if(v.parameter=='menu'){
                                	var valArr = pValue.split(',');
                                    $.each(dataObj.dataRelation,function(i,n){
                                        var validx = valArr.indexOf(n.label), selected = '';
                                        if(validx != -1){
                                            selected = 'selected="true"';
                                        }else{
                                        	validx = valArr.length;
                                        }
                                        ops.push('<option value="'+ n.label+'" ' + selected + ' validx="' + validx + '">'+ n.labelName+'</option>')
                                    });
                                    ops.sort(function(a,b){ return parseInt($(a).attr('validx')) - parseInt($(b).attr('validx'))});
                                    inner = '<select class="select" key="menu" multiple="multiple">'+ops.join('')+' </select>'
                                }else if(v.parameter == 'icon_mapping'){
                                	var imgtmp = '<img iconame="' + pValue + '" src="' + staticUrl + '/scopa/images/graphicon/' + pValue + '.png" alt="' + pValue + '" width="">',
                                		valtmp = '<input key="'+ v.parameter+'" value="' + pValue + '" type="hidden">';
                                	
                                	inner= valtmp + (!mining.utils.isEmpty(pValue) ?  imgtmp : '') + '<a class="btn btn-xs btn-success getgraphicon" href="javascript:;"><span class="glyphicon glyphicon-picture" aria-hidden="true"></span>&nbsp;选择图标</a>';
                                }else if(v.parameter == 'gen_key_type'){
                                    inner = '<select class="select" key="gen_key_type"><option value="string" ' + (param.val== 'string' ? 'selected="selected"' : '') + '>string</option><option value="base64" ' + (param.val == 'base64' ? 'selected="selected"' : '') + '>base64</option></select>'
                                }else if(v.parameter == 'subject_label' || v.parameter == 'object_label'){
                                	var classList = mining.mappingutils.getClassList('entity'), options = '';
                                	$.each(classList, function(i,n){
                                		options += '<option value="' + i + '" ' + (i == param.val ? 'selected="selected"' : '') + '>' + n.label_name + '(' + i + ')</option>';
                                	})
                                    inner = '<select class="select" key="'+ v.parameter+'">' + options + '</select>'
                                }else{
                                	inner='<input key="'+ v.parameter+'" value="'+ param.val+'" type="text">  ';
                                }
                            }
                            var id=param.id?param.id:0;
                            htmlArr.push('<div class="row  param"><span class="sp-config" paramid="'+id +'" paramlabel="'+ v.parameter +'">'+ v.name+'</span> '+ inner + (!mining.utils.isEmpty(v.descr) ? '<span class="gray">（描述：' + v.descr + '）</span>' : '') + '</div>');
                        });
                        $('#property').html(htmlArr.join(''));
                        $('.paramform .select').select2({minimumResultsForSearch: Infinity,allowClear: true});
	                       setTimeout(function(){
	                       	 $('.paramform .param .select[key]').each(function(){
								setTableValue(this);
							});
	                       },300)
						$('.getgraphicon',$page).off('click').on('click', function(){
							$dialog({
								title: '选择图析图标',
								content: ['<div class="graphiconlist">',
											'<b class="title_entity">实体推荐图标</b>',
											'<div class="entitylist"></div>',
											'<b class="title_relation">关系推荐图标</b>',
											'<div class="relationlist"></div>',
											'<b class="title_event">事件推荐图标</b>',
											'<div class="eventlist"></div>',
										'</div>'].join(''),
								width: 900,
								onshow: function(){
									var $dlg = this, 
										$node = $(this.node),
										iconame = $('.getgraphicon',$page).siblings('img[iconame]').attr('iconame'),
										icontmp = '<a class="iconitem block" href="javascript:;" title="{iconame}"><img iconame="{iconame}" src="' + staticUrl + '/scopa/images/graphicon/{iconame}.png" alt="{iconame}"></a>';
									
									$.each(mining.iconameArr, function(i,n){
										var etype = n, index1 = n.indexOf('-');
										if( index1 != -1){
											etype = n.substring(0, index1);
										}
										$('.' + etype + 'list',$node).append(icontmp.replaceAll('{iconame}', n));
                                	});
                                	$('.title_entity',$node).append('（' + $('.entitylist a',$node).size() + '个）');
                                	$('.title_relation',$node).append('（' + $('.relationlist a',$node).size() + '个）');
                                	$('.title_event',$node).append('（' + $('.eventlist a',$node).size() + '个）');
                                	$('.main').addClass('blur');//添加背景模糊效果
                                	$('.iconitem',$node).on('click', function(){
                                		$('.iconitem',$node).not($(this)).removeClass('active').find('.glyphicon').remove();
                                		$(this).toggleClass('active');
                                		if($(this).hasClass('active')){
                                			$(this).append('<span class="glyphicon glyphicon-ok" aria-hidden="true"></span>');
                                		}else{
                                			$(this).find('.glyphicon').remove();
                                		}
                                	});
                                	if(!mining.utils.isEmpty(iconame))$('.iconitem [iconame=' + iconame + ']',$node).click();
                                	$dlg.reset();
								},
								okValue: '确定',
								ok: function(){
									var $dlg = this, $node = $(this.node), $icon = $('.iconitem.active',$node);
									
									$('.getgraphicon',$page).siblings('input').val($('[iconame]',$icon).attr('iconame')).siblings('img[iconame]').remove();
									if($icon.size() > 0){
										$('.getgraphicon',$page).before($('img',$icon)[0].outerHTML);
									}
								},
								cancelValue: '取消',
								cancel: true,
					    		onclose: function(){
					    			$('.main').removeClass('blur');//去除背景模糊效果
					    		}
							}).showModal();
						});

                        loadTable(data,result.listObj);
                        $('[paramlabel=primary_prop]',$page).parent().after($('[paramlabel=minor_prop]',$page).parent());
                        pageResize();
                    },
                    error: function(result){

                    }
                });

            }
            function saveForm(){
                var  content=[];
                $.each($('.paramform .param'),function(index,obj){
                    var id= $(this).find('span').attr('paramid');
                    var label= $(this).find('span').attr('paramlabel');
                    var getVal = function($select){
	                    	var selectedArr = $select.select2('data'), valArr = [];
	                    	if(!$.isArray(selectedArr)) selectedArr = [selectedArr];
	                    	$.each(selectedArr, function(i,n){
	                    		if(n && n.id)valArr.push(n.id);
	                    	});
	                    	
	                    	return valArr;
	                    },
	                    val = '';
	                    
                    var $select = $("select.select[key="+label+"]");
                    if($select.size() > 0){
                    	val = getVal($select);
                    }else{
                    	val = $("input[key="+label+"]").val();
                    }
                    
                    val=val instanceof Array ?val.join(','):val;
                    val=val==null?'':val;
                    if(id!='')
                        content.push({ id:id, obj_id:$('#listTypeContainer .current').attr('objid'), para_label:label, para_value:val })
                });
                 console.log( {content:JSON.stringify(content)} );
                $ajax.ajax({
                    url: requestUrl.updateParam,
                    type: 'post',
                    dataType:'json',
                    data:{content:JSON.stringify(content)},
                    success: function (result) {
                        if (result.statusCode == 200) {
                            $dialog.alert("保存成功",'success');
                        }
                    },
                    error:function(ex){
                        $dialog.alert("保存失败",'error');
                    }
                });
            }

            function setCurrentClass(obj) {
                $(obj).siblings().removeClass('current');
                $(obj).addClass('current');
            }
            function showLoading(){
              //  $('.data').prepend('<div class="data_loading">loading...</div>');
            }
            function hiddenLoading(){
                $('.data_loading').remove();
            }
            var addEvent = function () {
                $('.listContainer',$page).delegate('li', 'click', function (ev) {
                    loadListType($('.ui-accordion-header-active',$page).attr('key'),$(this).attr('key'));
                    setCurrentClass(this);
                    $('#listTypeContainer li',$page).first().click();
                });
                $('#listTypeContainer',$page).delegate('li', 'click', function (ev) {
                    showLoading();
                    loadProperty($(this).attr('objId'),$(this).attr('objType'));
                    setCurrentClass(this);
                });
                $('#btnSave',$page).on('click',function(e){
                    saveForm();
                });
                $('#btnAdd',$page).on('click',function(e){
                    var newdialog = $dialog({
                        title: 'add ',
                        content: ' <div class="row"><span>属性</span><input id="key"></div>',
                        width: 500,
                        height: 300,
                        cancelValue: '取消',
                        cancel: function() {
                            newdialog.close().remove();
                        },
                        okValue: '确认',
                        ok: function() {
                            var key = $('#key').val();
                            var objId= $('#listTypeContainer .current').attr('objid');
                            var postObj={obj_id:objId-0, property:key };
                            $ajax.ajax({
                                url: requestUrl.addProperty,
                                type: 'post',
                                dataType:'json',
                                data:postObj,
                                success: function (result) {
                                    if (result.statusCode == 200) {
                                        $dialog.alert("添加成功",'success',function(){  newdialog.close().remove(); });
                                    }
                                },
                                error:function(){
                                    $dialog.alert("添加失败",'error');
                                }
                            });

                        }
                    }).showModal();
                });
                $('#btnicon',$page).on('click',function(e){
                    $('.iconContainer',$page).css('display','block');
                });
                $('.iconContainer',$page).delegate('img','click',function(ev){
                    $("#showicon").css('background','url("'+this.src+'")').attr('iconurl',this.src);
                    $('.iconContainer',$page).css('display','none');
                });
                $('#btnAddEntity',$page).on('click',function(e){
                   /* var newdialog = $dialog({
                        title: 'add ',
                        content: ' <div class="row"><span>实体</span><input id="key"></div>',
                        width: 500,
                        height: 300,
                        cancelValue: '取消',
                        cancel: function() {
                            newdialog.close().remove();
                        },
                        okValue: '确认',
                        ok: function() {
                            var key = $('#key').val();
                            var objId= $('#listTypeContainer .current').attr('objid');
                            var postObj={obj_id:objId-0, property:key };
                            $ajax.ajax({
                                url: requestUrl.addProperty,
                                type: 'post',
                                dataType:'json',
                                data:postObj,
                                success: function (result) {
                                    if (result.statusCode == 200) {
                                        $dialog.alert("添加成功",'success',function(){  newdialog.close().remove();loadProperty(objId) });
                                    }
                                },
                                error:function(){
                                    $dialog.alert("添加失败",'error');
                                }
                            });

                        }
                    }).showModal();*/
                });
                $('#property',$page).delegate('.select','change',function(ev){
                    if($(this).attr('multiple')=='multiple'){
                        setTableValue(this);
                    }
                });
            }
            function ini(){
            	var dataLength = 0;
            	$.each(dataObj, function(i,n){
            		dataLength += n.length;
            	});
            	if(dataLength > 0)return;
                getData();
                addEvent();
                var icons = {
                    header: "data-icon down",
                    activeHeader: "data-icon up"
                };
                $("#accordion",$page).accordion({ heightStyle: "content",icons:icons,active:0});
                $('#listContainer_entity li').first().click();

                $('.tableContainer ',$page).mCustomScrollbar({
                 theme: 'minimal'
                 });
            }
            ini();

        });
    }


    return {
        init: initPage
    }
});