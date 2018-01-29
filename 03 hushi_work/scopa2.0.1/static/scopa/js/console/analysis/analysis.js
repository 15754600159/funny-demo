define(function(require){
	/* ---------- 首页 ---------- */
	var $page = $('.page-analysis'),
		requestUrl = {getRules:mining.baseurl.console + '/rule/get',getRule:mining.baseurl.console + '/rule/get/',
        getEvent:mining.baseurl.console + '/element/allByType',getBatch:mining.baseurl.console + '/batchShow/all',
        checkRule:mining.baseurl.console + '/rule/check',updateRule:mining.baseurl.console + '/rule/update',
            getBatchByName:mining.baseurl.console + '/batchShow/get',addBatch:mining.baseurl.console + '/batchShow/add',
            delBatch:mining.baseurl.console + '/batchShow/delete',upDateBatch:mining.baseurl.console + '/batchShow/update',
        addRule:mining.baseurl.console + '/rule/add'};
	require('jqueryui');
    require('select2');
	//刷新布局
    var pageResize = function(){
        //TODO
    }
    
	/* 初始化 */
    var initPage = function(){
    	mining.utils.loadPage($page, function(){
		//	mining.utils.winResize({name:pageResize});
	    	seajs.log('分析模型');

			function getAllRules(){
				$ajax.ajax({
					url: requestUrl.getRules,
					async: false,
					success: function(result){
						var listHtml = [];
						$.each(result.listObj, function (k, v) {
							listHtml.push('<li class="item" key="'+ v.name+'" listType="rule"><span class="icon-'+mining.mappingutils.getName(v)+'"></span> ' + v.cname + '</li>');
						});
						$('#listContainer_rule').html( listHtml.join(''));
                        $('#select_status').select2({minimumResultsForSearch: Infinity});
					},
					error: function(result){

					}
				});
			}
            function  getAllBatch(){
                $ajax.ajax({
                    url: requestUrl.getBatch,
                    async: false,
                    success: function(result){
                        var listHtml = [];
                        $.each(result.listObj, function (k, v) {
                            listHtml.push('<li class="item" key="'+ v.name+'" listType="tactics"><span class="icon-'+mining.mappingutils.getName(v)+'"></span> ' + v.cname + '</li>');
                        });
                        $('#listContainer_batch').html( listHtml.join(''));
                    },
                    error: function(result){

                    }
                });
            }
            function getEvent(){
                $ajax.ajax({
                    url: requestUrl.getEvent,
                    data:{type:2},
                    async: false,
                    success: function(result){
                        var options=[];
                        $.each(result.listObj,function(k,v){
                            options.push('<option value="'+ v.label+'">'+ v.labelName+'</option>')
                        });
                        $('#select_event').html(options.join('')).select2({minimumResultsForSearch: Infinity});
                    },
                    error: function(result){

                    }
                });
            }
            function getRule(rule){
                $ajax.ajax({
                    url: requestUrl.getRule+rule,
                    async: false,
                    success: function(result){
                        $('#select_status').select2('val',result.obj.status+'')
                        $('#rule').val(result.obj.rule);
                        $('#rule').attr('ruleId',result.obj.id);
                        $('#select_event').select2('val',result.obj.name);
                    },
                    error: function(result){

                    }
                });
            }
            function checkRule(){
                var content={};
                content['name']=  $('#select_event').val();
                content['rule']=JSON.parse($('#rule').val());
                $ajax.ajax({
                    url: requestUrl.checkRule,
                    type: 'post',
                    dataType:'json',
                    data:{"content":JSON.stringify(content)},
                    success: function (result) {
                        if (result.statusCode == 200) {
                            $dialog.alert("检查成功",'success');
                        }
                    },
                    error:function(ex){
                        $dialog.alert("检查失败",'error');
                    }
                });
            }
            function saveRule(){
                var content={};
                content['id']=   $('#rule').attr('ruleId')-0;
                content["name"]=  $('#select_event').val();
                content['rule']=JSON.parse($('#rule').val());
                content['cname']=$('#listContainer_rule li.current').text();
                content['staff']=$('.userinfo').text();
                $ajax.ajax({
                    url: requestUrl.updateRule,
                    type: 'post',
                    dataType:'json',
                    data:{"content":JSON.stringify(content)},
                    success: function (result) {
                        if (result.statusCode == 200) {
                            $dialog.alert("更新成功",'success');
                        }
                    },
                    error:function(ex){
                        $dialog.alert("更新失败",'error');
                    }
                });
            }

            function saveBatch(){
                var content={};
                content["name"]=  $('#select_event').val();
                content["desc"]=  $('#desc').val();
                content["config"] =   $('#config').val();
                content["command"]=   $('#command').val();
                $ajax.ajax({
                    url: requestUrl.upDateBatch,
                    type: 'post',
                    dataType:'json',
                    data:content ,
                    success: function (result) {
                        if (result.statusCode == 200) {
                            $dialog.alert("更新成功",'success');
                        }
                    },
                    error:function(ex){
                        $dialog.alert("更新失败",'error');
                    }
                });
            }
            function getBatch(name){
                $ajax.ajax({
                    url: requestUrl.getBatchByName,
                    data:{name:name},
                    async: false,
                    success: function(result){
                        $('#desc').val(result.obj._desc);
                        $('#config').val(result.obj.config);
                        $('#command').val(result.obj.command);
                    },
                    error: function(result){

                    }
                });
            }
            function setCurrentClass(obj) {
                $(obj).siblings().removeClass('current');
                $(obj).addClass('current');
            }
            var addEvent = function () {
                $('.listContainer',$page).delegate('li', 'click', function (ev) {
                    setCurrentClass(this);
                    if($(this).attr('listType')=='tactics'){
                        $('.d_tactics').removeClass('hidden');
                        $('.d_rule').addClass('hidden');
                        getBatch($(this).attr('key'));
                    }
                    if($(this).attr('listType')=='rule'){
                        $('.d_rule').removeClass('hidden');
                        $('.d_tactics').addClass('hidden');
                        getRule($(this).attr('key'));
                    }
                });
                $('#btnSave',$page).on('click',function(){
                    if( $('.ui-accordion-content-active li.current',$page).attr('listType')=='rule'){
                        saveRule();
                    }
                    if( $('.ui-accordion-content-active li.current',$page).attr('listType')=='tactics'){
                        saveBatch();
                    }
                });
                $('#btnTest',$page).on('click',function(){
                    if( $('.ui-accordion-content-active li.current',$page).attr('listType')=='rule'){
                        checkRule();;
                    }
                    if( $('.ui-accordion-content-active li.current',$page).attr('listType')=='tactics'){
                       $dialog.alert('测试成功','success');
                    }
                });
                $('#btnAddRule').on('click',function(){
                    var newdialog = $dialog({
                        title: '添加规则 ',
                        content: ' <div class="addForm"><span>name</span><input id="name"></div><div  class="addForm"><span>规则</span><textarea id="rule"></textarea></div>',
                        width: 400,
                        cancelValue: '取消',
                        cancel: function() {
                            newdialog.close().remove();
                        },
                        okValue: '确认',
                        ok: function() {
                            var postObj=   {"name":$('#name').val(),"rule":$('#rule').val()};
                            $ajax.ajax({
                                url: requestUrl.addRule,
                                type: 'post',
                                dataType:'json',
                                data:postObj,
                                success: function (result) {
                                    if (result.statusCode == 200) {
                                        $dialog.alert("添加成功",'success',function(){  newdialog.close().remove();});
                                    }
                                },
                                error:function(){
                                    $dialog.alert("添加失败",'error');
                                }
                            });

                        }
                    }).showModal();
                });
                $('#addBatch').on('click',function(){
                    var newdialog = $dialog({
                        title: '添加战法 ',
                        content: ' <div class="addForm"><span>名称</span><input id="name"></div><div  class="addForm"><span>描述</span><textarea id="desc"></textarea></div><div class="addForm"><span>配置</span><textarea id="config"></textarea></div><div class="addForm"><span>执行命令</span><textarea id="command"></textarea></div>',
                        width: 400,
                        cancelValue: '取消',
                        cancel: function() {
                            newdialog.close().remove();
                        },
                        okValue: '确认',
                        ok: function() {
                            var postObj=   {"name":$('#name').val(),"desc":$('#desc').val(),"config":$('#config').val(),"command":$('#command').val()};
                            $ajax.ajax({
                                url: requestUrl.addBatch,
                                type: 'post',
                                dataType:'json',
                                data:postObj,
                                success: function (result) {
                                    if (result.statusCode == 200) {
                                        $dialog.alert("添加成功",'success',function(){  newdialog.close().remove();});
                                    }
                                },
                                error:function(){
                                    $dialog.alert("添加失败",'error');
                                }
                            });

                        }
                    }).showModal();
                });
            }
            function setAccordion(){
                var icons = {
                    header: "data-icon down",
                    activeHeader: "data-icon up"
                };
                $("#accordion",$page).accordion({ heightStyle: "content",icons:icons,active:0});
            }
			var ini=function(){
                getEvent();
				getAllRules();
                getAllBatch();
                addEvent();
                setAccordion();
                $('#select_status').select2({minimumResultsForSearch: Infinity});
                $('#listContainer_rule li').first().click();

			}
			ini();
    	});
    }
    
    
    return {
    	init: initPage
    }
});