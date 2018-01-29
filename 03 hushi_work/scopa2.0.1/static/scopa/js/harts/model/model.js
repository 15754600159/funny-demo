define(function (require) {
    require('harts/common/lodash.min');

    var $page = $('.page-model'),
        requestUrl = {
            source_list: mining.testBaseUrl + '/harts/datasource?withContent=true',
            source_detail: mining.testBaseUrl + '/harts/datasource',
            config: mining.testBaseUrl+'/harts/model/action?action=config',
            model_url: mining.testBaseUrl + '/harts/model'
        };

    var model_types = ["entity", "event", "relation"];
    //刷新布局
    var pageResize = function () {
        //TODO
    };

    var sourceNames = [];
    var sourceJsons = {};
    var optionsStr = "";

    /* 初始化 */
    var initPage = function () {
        mining.utils.loadPage($page, function () {
            mining.utils.winResize({name: pageResize});
            console.info('model initPage');
            initModelList();
            addEvent();
            seajs.log('数据模型');
        });
    };

    var addEvent = function () {
        //表格 编辑
        // TODO: scroll format
        $('#table_model', $page).off('click', 'td.show').on('click', 'td.show', function () {
            console.log('show');
            var myname = $(this).parents('tr').data('name');
            $ajax.ajax({
                url: (requestUrl.model_url + "/" + myname),
                //data: name,
                async: false,
                success: function (result) {
                    //var tr = [];
                    /*
                    $.each(_.filter(result.fields, function (x) {
                        return x.is_valid
                    }), function (k, v) {
                        var index = k + 1;
                        tr.push('<tr data-id="' + v.id + '"><td>' + index + '</td><td>' + v.name + '</td></tr>');
                    });*/
                    $dialog({
                        title: '数据模型详情',
                        content: '<div class="model_dialog"><div class="content">' +
                        '<div class="row"><span>名称</span><input type="text" class="control dlg_name" value="' + result.name + '"/></div> ' +
                        '<div class="row"><span>类型</span><input type="text" value="' + result.category + '" class="control dlg_desc"/></div>' +
                        '<div class="row"><span>创建时间</span><input type="text" value="' + result.createTime + '" class="control dlg_desc"/></div>' +
                        '<div class="row"><span>描述</span><textarea name="rule" id="config" cols="30" rows="10" class="txt">' + result.description + '</textarea>' +
                        '<div class="row"><span>JSON内容</span><textarea name="rule" id="config" cols="30" rows="10" class="txt">' + result.jsonContent + '</textarea></div> ' +
                        //'<div class="row"><table>' + tr.join('') + '</table></div>' +
                        '</div> </div>',
                        width: 400, height: 600,
                        cancelValue: '取消', okValue: '确认',
                        ok: function () {
                        },
                        cancel: function () {
                        }
                    }).showModal();
                },
                error: function (result) {

                }
            });

        });

        $('#table_model', $page).off('click', 'td.udf').on('click', 'td.udf', function () {
            console.log('Add udf');
            var myname = $(this).parents('tr').data('name');

            $ajax.ajax({
                url: (requestUrl.model_url + "/" + myname),
                //data: name,
                async: false,
                success: function (result) {
                    var modelObject = result;
                    var modelJsonObject = JSON.parse(result.jsonContent);
                    var fieldStr = "<option>选择字段</option>" +
                            _.map(modelJsonObject.fields, function (field) {
                                return '<option value=' + field + '>' + field + '</option>';
                            }).join('');
                    // if(modelJsonObject.sources.length > 0){
                    //     for (var i = 0; i < modelJsonObject.sources[0].fields.length; i++) {
                    //         var realField = modelJsonObject.fields[i];
                    //         // var leftIndex = modelJsonObject.sources[0].fields[i].indexOf("(");
                    //         // var fieldLen = modelJsonObject.sources[0].fields[i].length;
                    //         // if(leftIndex == -1) {
                    //         //     realField = modelJsonObject.sources[0].fields[i];
                    //         // } else {
                    //         //     realField = modelJsonObject.sources[0].fields[i].substring(leftIndex + 1, fieldLen - 1);
                    //         // }
                    //         filedsStr += (' <option value=' + realField + '>' + realField + '</option>');
                    //     }
                    // } else {
                    //     $dialog.alert("加载data model失败");
                    // }
                    //var
                    $dialog({
                        title: '添加udf',
                        content: '<div class="addForm"><span>选择字段</span><select name="fieldsList" id="selectedField" class="select">'+
                        fieldStr +
                        '</select></div>' +
                        '<div class="addForm"><span>udf</span><input id="udfStr" style="width: 30%;">' +
                        '<span>as new column</span><input id="newColumnStr" style="width: 30%;"></div>',
                        width: 400,
                        onshow: function () {
                            $('#selectedField').select2({minimumResultsForSearch: Infinity});
                        },
                        cancelValue: '取消', okValue: '确认',
                        ok: function () {
                            var para = $('#selectedField').find("option:selected").val();
                            var index = _.indexOf(modelJsonObject.fields, para);
                            // var selectedIdx = -1;
                            // for (var i = 1; i <= modelJsonObject.sources[0].fields.length; i++){
                            //     if($('#selectedField')[0][i].selected){
                            //         selectedIdx = (i - 1);
                            //         break;
                            //     }
                            // }
                            modelJsonObject.fields.push($('#newColumnStr').val());
                            _.each(modelJsonObject.sources, function (source) {
                                var field = source.fields[index];
                                var newField = $("#udfStr").val() + "(" + field + ")";
                                source.fields.push(newField);
                            });
                            // modelJsonObject.fields[selectedIdx] = $("#newColumnStr").val();
                            // for(var i = 0; i < modelJsonObject.sources.length; i++) {
                            //     var realField = modelJsonObject.fields[i];
                            //     var realField = "";
                            //     var leftIndex = modelJsonObject.sources[i].fields[selectedIdx].indexOf("(");
                            //     var fieldLen = modelJsonObject.sources[i].fields[selectedIdx].length;
                            //     if(leftIndex == -1) {
                            //         realField = modelJsonObject.sources[i].fields[selectedIdx];
                            //     } else {
                            //         realField = modelJsonObject.sources[i].fields[selectedIdx].substring(leftIndex + 1, fieldLen - 1);
                            //     }
                            //     modelJsonObject.sources[i].fields[selectedIdx] = $("#udfStr").val() + "(" + realField + ")";
                            // }

                            modelObject.jsonContent = JSON.stringify(modelJsonObject);
                            $ajax.ajax({
                                url: requestUrl.model_url,
                                type: 'PUT',
                                contentType: "application/json",
                                data: JSON.stringify(modelObject),
                                success: function (result) {
                                    if (result.status == "OK") {
                                        $dialog.alert("添加udf成功.");
                                        initModelList();
                                    }
                                },
                                error: function (e) {
                                    $dialog.alert("添加失败");
                                }
                            });

                        },
                        cancel: function () {
                        }
                    }).showModal();
                },
                error: function (result) {
                    $dialog.alert("加载data model失败",function(){  newdialog.close().remove();});
                }
            });
            //$('#sources').html(sourceNames.join(''));
            //console.info($('#sources').html());
            /*
            var newdialog = $dialog({
                title:"设置udf",
                content:'<div class="addForm"><span>数据模型</span> <select name="dataModelList" id="selectedDataModel" class="select"> '+
                optionsStr +
                '</select></div> ' +
                '<div class="addForm"> <span>udf</span><input id="udfStr" style="width: 98%;"></div> ',
                width: 400,
                cancelValue:'取消',
                cancel: function() {
                    newdialog.close().remove();
                },
                okValue:'确认',
                ok: function() {
                    var modelObject = JSON.parse(sourceJsons[$('#selectedDataModel').val()]);

                    //var postObj={"name":$('#selectedSource').val(),"location":location_arr};
                    $ajax.ajax({
                        url: requestUrl.addSource + '?name='+$('#selectedSource').val(),
                        type: 'POST',
                        contentType: "application/json",
                        data:JSON.stringify(location_arr),
                        success: function (result) {
                            if (result.statusCode == 200) {
                                $dialog.alert("添加location成功",function(){  newdialog.close().remove();});
                            }
                        },
                        error:function(e){
                            if (e.statusCode == 300)    $dialog.alert("location已经存在",'warning');
                            else
                                $dialog.alert("添加失败，"+e.message,'error');
                        }
                    });
                },
                cancel:function(){}
            }).showModal();
            */
        });

        var addSourceJsonObject = null;

        $('#table_model', $page).off('click', 'td.addSource').on('click', 'td.addSource', function () {
            console.log('Add Source');
            var myname = $(this).parents('tr').data('name');
            $ajax.ajax({
                url: (requestUrl.model_url + "/" + myname),
                //data: name,
                async: false,
                success: function (result) {
                    var modelObject = result;
                    addSourceJsonObject = JSON.parse(result.jsonContent);

                    //var
                    $dialog({
                        title: '添加数据源',
                        content:
                        '<div class="addForm"><span>数据源</span> <select name="addSourceList" id="addSources" class="select"> ' +
                        optionsStr +
                        '</select></div> ' +
                        '<div id="sourceMatch"></div>',
                        width: 400,
                        onshow: function () {
                            $('#addSources').select2({minimumResultsForSearch: Infinity});
                        },
                        cancelValue: '取消', okValue: '确认',
                        ok: function () {
                            var i = 0;
                            var newSource = {};
                            newSource.name = [];
                            newSource.name.push($("#addSources").val());
                            newSource.fields = [];

                            $("select").each(function(){
                                if(i > 0) {
                                    if((addSourceJsonObject.sources[0].fields[i-1]).indexOf("(") == -1){
                                        newSource.fields.push($(this).val());
                                    } else {
                                        var leftIndex = addSourceJsonObject.sources[0].fields[i-1].indexOf("(");
                                        var udfName = addSourceJsonObject.sources[0].fields[i-1].substring(0, leftIndex);
                                        newSource.fields.push(udfName + "(" + $(this).val() + ")");
                                    }
                                }
                                i++;
                            });

                            addSourceJsonObject.sources.push(newSource);
                            modelObject.jsonContent = JSON.stringify(addSourceJsonObject);
                            $ajax.ajax({
                                url: requestUrl.model_url,
                                type: 'PUT',
                                contentType: "application/json",
                                data: JSON.stringify(modelObject),
                                success: function (result) {
                                    if (result.status == "OK") {
                                        $dialog.alert("添加数据源成功.");
                                        initModelList();
                                    }
                                },
                                error: function (e) {
                                    $dialog.alert("添加失败");
                                }
                            });

                        },
                        cancel: function () {
                        }
                    }).showModal();
                },
                error: function (result) {
                    $dialog.alert("加载data model失败",function(){  newdialog.close().remove();});
                }
            });

        });

        $('body').off('change', "#addSources").on('change', "#addSources", function (event) {
            $("#sourceMatch").html("");
            var sourceObject = JSON.parse(sourceJsons[$(this).val()]);
            var selectStr = "<option>选择对应字段</option>";
            for (var i = 0; i < sourceObject.fields.length; i++) {
                selectStr += (' <option value=' + sourceObject.fields[i].name + '>' + sourceObject.fields[i].name + '</option>');
            }
            var htmlStr = _.map(addSourceJsonObject.fields, function (field) {
                return '<div class="addForm"><span>' + field + '</span> <select name="addSourceList" id="addSourceField" class="select">' +
                    selectStr +
                    '</select></div>';
            }).join('');
            // if(addSourceJsonObject.sources.length > 0){
            //     for (var i = 0; i < addSourceJsonObject.sources[0].fields.length; i++) {
            //
            //         var realField = addSourceJsonObject.fields[i];
            //         // var leftIndex = addSourceJsonObject.sources[0].fields[i].indexOf("(");
            //         // var fieldLen = addSourceJsonObject.sources[0].fields[i].length;
            //         // if(leftIndex == -1) {
            //         //     realField = addSourceJsonObject.sources[0].fields[i];
            //         // } else {
            //         //     realField = addSourceJsonObject.sources[0].fields[i].substring(leftIndex + 1, fieldLen - 1);
            //         // }
            //         //filedsStr += (' <option value=' + realField + '>' + realField + '</option>');
            //         htmlStr += '<div class="addForm"><span>' + realField + '</span> <select name="addSourceList" id="addSourceField" class="select">' +
            //         selectStr +
            //         '</select></div> '
            //     }
            // }
            $("#sourceMatch").html(htmlStr);
            $('#addSourceField').select2({minimumResultsForSearch: Infinity});
        });

        /*$('#table_model', $page).off('click', 'td.edit').on('click', 'td.edit', function () {
            console.log('edit');
            var name = $(this).parents('tr').data('name');
            $ajax.ajax({
                url: requestUrl.detail,
                data: {id: id},
                dataType: 'JSONP',
                async: false,
                success: function (result) {
                    var tr = [];
                    $.each(result.fields, function (k, v) {
                        var index = k + 1;
                        tr.push('<tr data-id="' + v.id + '"><td>' + index + '</td><td>' + v.name + '</td><td><input type="checkbox"' + (v.is_valid ? ' checked' : '') + '/></td></tr>');
                    });
                    $dialog({
                        title: '数据模型详情',
                        content: '<div class="model_dialog"><div class="content"><input type="hidden" class="control dlg-id" value="' + result.id + '"/>' +
                        '<div class="row"><span>名称</span><input type="text" class="control dlg-name" value="' + result.name + '"/></div> ' +
                        '<div class="row"><span>来源</span><input type="text" class="control dlg-source_name" value="' + result.source_name + '"/></div>' +
                        '<div class="row"><span>类型</span><input type="text" class="control dlg-model_type" value="' + result.model_type + '"/></div>' +
                        '<div class="row"><span>主键</span><input type="text" class="control dlg-primary_key" value="' + result.primary_key + '"/></div>' +
                        '<div class="row"><table>' + tr.join('') + '</table></div>' +
                        '</div> </div>',
                        width: 400, height: 600,
                        cancelValue: '取消', okValue: '确认',
                        ok: function () {
                            // 提交修改
                            var data = {};
                            data.id = $('.model_dialog .dlg-id').val();
                            data.name = $('.model_dialog .dlg-name').val();
                            data.source_name = $('.model_dialog .dlg-source_name').val();
                            data.model_type = $('.model_dialog .dlg-model_type').val();
                            data.primary_key = $('.model_dialog .dlg-primary_key').val();
                            data.fields = _.map($('.model_dialog table tr'), function (x) {
                                return {id: $(x).data('id'), is_valid: $(x).find('input').prop('checked')}
                            });
                            console.log(data);
                            $ajax.ajax({
                                url: requestUrl.update,
                                type: 'POST',
                                data: data,
                                dataType: 'JSON',
                                async: false,
                                success: function (result) {
                                    $dialog({
                                        title: '编辑完成'
                                    }).showModal();
                                },
                                error: function (result) {
                                }
                            });
                        },
                        cancel: function () {
                        }
                    }).showModal();
                },
                error: function (result) {

                }
            });

        });*/

        $('body').off('change', "#selectedSource").on('change', "#selectedSource", function (event) {
            function genCheckBox(id, name, value, showText) {
                var checkbox = '<form class="form-inline">' +
                    '<div class="checkbox">' +
                    '<label style="width: 200px">' +
                    '<input type="checkbox"' + ' name="' + name + '" class="checkbox ' + value + '" value="' + value + '" alt="' + showText +'" />' + showText +
                    '</label>' +
                    '</div>' +
                    '<label for="id_' + value + '">AS</label>' +
                    '<input type="text" class="text ' + value + '" id="id_' + value + '" value="' + value + '">' +
                '</form>';
                $("#" + id).append(checkbox);
            }

            $("#jsonbox").html("");
            $("#schemaFrame").html("");

            if ($(this).val() == null) {
                return;
            }
            else {
                //genCheckBox("jsonbox", "jsonbox", "123", $(this).val());
                var selectStr = "<option>选择entity id</option>";
                var source = JSON.parse(sourceJsons[$(this).val()]);
                for (var i = 0; i < source.fields.length; i++) {
                    selectStr += (' <option value=' + source.fields[i].name + '>' + source.fields[i].name + '</option>');
                    genCheckBox("jsonbox", "jsonbox", source.fields[i].name, source.fields[i].name);
                }

                //$("#schemaFrame").html('<div class="addForm"><span>entity id</span> <select name="entitySelect" id="entitySelect" class="select"> ' + selectStr + '</select></div> ');
            }
        });

        $('body').off('change', "#selectedType").on('change', "#selectedType", function (event) {
            $("#schemaFrame").html("");
            if ($('#selectedSource').val() == "选择数据源") {
                $dialog.alert("请先选择数据源");
            } else if ($('#selectedType').val() == "entity") {
                var selectStr = "<option>选择id</option>";
                var source = JSON.parse(sourceJsons[$("#selectedSource").val()]);
                for (var i = 0; i < source.fields.length; i++) {
                    selectStr += (' <option value=' + source.fields[i].name + '>' + source.fields[i].name + '</option>')
                }
                $("#schemaFrame").html('<div class="addForm"><span>id</span> <select name="idSelect" id="idSelect" class="select"> ' + selectStr + '</select></div> ');
            } else if ($('#selectedType').val() == "event") {
                var selectIdStr = "<option>选择entity id</option>";
                var selectTimeStr = "<option>选择时间字段</option>";
                var source = JSON.parse(sourceJsons[$("#selectedSource").val()]);
                for (var i = 0; i < source.fields.length; i++) {
                    selectIdStr += (' <option value=' + source.fields[i].name + '>' + source.fields[i].name + '</option>');
                    selectTimeStr += (' <option value=' + source.fields[i].name + '>' + source.fields[i].name + '</option>');
                }
                $("#schemaFrame").html('<div class="addForm"><span>entity id</span> <select name="idSelect" id="idSelect" class="select"> ' + selectIdStr + '</select></div> ' +
                    '<div class="addForm"><span>time</span> <select name="timeSelect" id="timeSelect" class="select"> ' + selectTimeStr + '</select></div> ');

            } else if ($('#selectedType').val() == "relation") {
                var selectEntity0Str = "<option>选择entity0</option>";
                var selectEntity1Str = "<option>选择entity1</option>";
                var selectTimesStr = "<option>选择时间字段</option>";
                var source = JSON.parse(sourceJsons[$("#selectedSource").val()]);
                for (var i = 0; i < source.fields.length; i++) {
                    selectEntity0Str += (' <option value=' + source.fields[i].name + '>' + source.fields[i].name + '</option>');
                    selectEntity1Str += (' <option value=' + source.fields[i].name + '>' + source.fields[i].name + '</option>');
                    selectTimesStr += (' <option value=' + source.fields[i].name + '>' + source.fields[i].name + '</option>');
                }
                $("#schemaFrame").html('<div class="addForm"><span>entity0</span> <select name="entity0Select" id="entity0Select" class="select"> ' + selectEntity0Str + '</select></div> ' +
                    '<div class="addForm"><span>entity1</span> <select name="entity1Select" id="entity1Select" class="select"> ' + selectEntity1Str + '</select></div> ' +
                    '<div class="addForm"><span>times</span> <select name="timesSelect" id="timesSelect" class="select"> ' + selectTimesStr + '</select></div> ');
            }
            $('#schemaFrame').find('select').select2({minimumResultsForSearch: Infinity});
        });

        $('#btnAdd', $page).off('click').on('click', function () {
            console.log('add');

            //$('#sources').html(sourceNames.join(''));
            //console.info($('#sources').html());
            var model_type_str = "<option>选择模型类型</option>";
            for (var i = 0; i < model_types.length; i++) {
                model_type_str += (' <option value=' + model_types[i] + '>' + model_types[i] + '</option>')
            }

            var newdialog = $dialog({
                title: '添加数据模型',
                content: '<div class="addForm"><span>数据源</span> <select name="sourceList" id="selectedSource" class="select"> ' +
                optionsStr +
                '</select></div> ' +
                '<div class="addForm"> <span>模型名</span><input id="model_name" style="width: 60%;"></div> ' +
                '<div class="addForm"> <span>模型类别</span><select name="selectedType" id="selectedType" class="select"> ' +
                model_type_str + '</select></div>' +
                '<div class="addForm"> <span>描述</span><input id="model_description" style="width: 60%;"></div> ' +
                '<div id="schemaFrame"></div>' +
                '<div id="jsonbox"></div>',
                width: 400,
                onshow: function () {
                    $('.addForm').find('select').select2({minimumResultsForSearch: Infinity});
                },
                cancelValue: '取消',
                cancel: function () {
                    newdialog.close().remove();
                },
                okValue: '确认',
                ok: function () {
                    var createDs = {};
                    createDs.id = 0;
                    createDs.createTime = "";
                    createDs.name = $('#model_name').val();
                    createDs.category = $('#selectedType').val();
                    createDs.description = $('#model_description').val();
                    var jsonDs = {};
                    jsonDs.name = $('#model_name').val();
                    jsonDs.schema = {};
                    if ($('#selectedType').val() == "entity") {
                        jsonDs.schema.id = $('#idSelect').val();
                    } else if ($('#selectedType').val() == "event") {
                        var srcEntityId = $('#idSelect').val();
                        jsonDs.schema.entity_id = $('#jsonbox').find('.text.'+srcEntityId).val();
                        var srcTime = $('#timeSelect').val();
                        jsonDs.schema.time = $('#jsonbox').find('.text.'+srcTime).val();
                    } else if ($('#selectedType').val() == "relation") {
                        jsonDs.schema.category = "harts";
                        jsonDs.schema.entity0 = $('#entity0Select').val();
                        jsonDs.schema.entity1 = $('#entity1Select').val();
                        jsonDs.schema.times = $('#timesSelect').val();
                    }

                    jsonDs.fields = [];
                    jsonDs.sources = [];
                    var sourceDs = {};
                    sourceDs.name = [];
                    sourceDs.name.push($('#selectedSource').val());
                    sourceDs.fields = [];

                    for (var i = 0; i < $('input:checkbox').length; i++) {
                        var box_name = $('#jsonbox').find('input:checkbox')[i].value;
                        var box_alias = $('#jsonbox').find('input:text')[i].value;
                        var box_checked = $('input:checkbox')[i].checked;
                        if (box_checked) {
                            jsonDs.fields.push(box_alias);
                            sourceDs.fields.push(box_name);
                        }
                    }

                    jsonDs.sources.push(sourceDs);
                    createDs.jsonContent = JSON.stringify(jsonDs);

                    //var postObj={"name":$('#selectedSource').val(),"location":location_arr};
                    $ajax.ajax({
                        url: requestUrl.model_url,
                        type: 'POST',
                        contentType: "application/json",
                        data: JSON.stringify(createDs),
                        success: function (result) {
                            if (result.status == "OK") {
                                $dialog.alert("添加data model 成功.", function () {
                                    newdialog.close().remove();
                                });
                                initModelList();
                            }
                        },
                        error: function (e) {
                            if (e.statusCode == 300)    $dialog.alert("location已经存在", 'warning');
                            else
                                $dialog.alert("添加失败，" + e.message, 'error');
                        }
                    });

                },
                cancel: function () {
                }
            }).showModal();
        });

        $('#btnCnf', $page).off('click').on('click', function () {
            console.log('config');

            $dialog.confirm({
                name: '配置数据模型',
                ok: function () {
                    $ajax.ajax({
                        url: requestUrl.config,
                        type: 'POST',
                        data: JSON.stringify({a:1}),
                        contentType: "application/json",
                        success: function (result) {
                            if (result.status == "OK") {
                                $dialog.alert("配置数据模型成功.");
                            }
                        },
                        error: function (e) {
                            $dialog.alert("配置失败，" + e.message, 'error');
                        }
                    });
                }
            })
        });

    };

    var initModelList = function () {
        sourceNames = [];
        optionsStr = "<option>选择数据源</option>";
        console.info('initModelList');
        $ajax.ajax({
            url: requestUrl.model_url,
            async: false,
            success: function (result) {
                console.info('initModelList success');
                var tr = [];
                $.each(result, function (k, v) {
                    var index = k + 1;
                    tr.push('<tr data-name="' + v.name + '"><td>' + index + '</td><td>' + v.id + '</td><td>' + v.name + '</td><td>' + v.category + '</td>' +
                        '<td>' + v.createTime + '</td><td class="show"><span class="glyphicon glyphicon-eye-open"></span>详细</td>' +
                        //'<td class="edit"><span class="glyphicon glyphicon-edit"></span>编辑</td>' +
                        '<td class="addSource"><span class="glyphicon glyphicon-plus"></span>添加数据源</td>' +
                        '<td class="udf"><span class="glyphicon glyphicon-pencil"></span>udf</td>' +
                        '</tr>');
                });
                $('#table_model').find('tbody').html(tr.join(''));
            },
            error: function (result) {
                console.info('initModelList error');
            }
        });
        console.info('initModelList done');

        console.log('Try to get datasources.');

        $ajax.ajax({
            url: requestUrl.source_list + "&version=0",
            async: true,
            success: function (result) {
                for (var i = 0; i < result.length; i++) {
                    sourceNames.push(result[i].name);
                    sourceJsons[result[i].name] = (result[i].jsonContent);
                    optionsStr += (' <option value=' + result[i].name + '>' + result[i].name + '</option>')
                }
                console.info('Get datasources success');
            },
            error: function (result) {
                console.info('Get datasources error');
            }
        });
    };
    return {
        init: initPage
    };
});