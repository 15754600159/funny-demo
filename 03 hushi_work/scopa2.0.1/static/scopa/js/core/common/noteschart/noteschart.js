define(function(require, exports, module){
	/**
     * @name notesChart
     * @class 提供事件弹窗展示。
     */
    module.exports = function(){
    	var notesConfig = {
    		readyCallback: null,
    		selectCallback: null,
    		resizeCallback: null,
    		clickCallback: null,
    		dblclickCallback: null,
    		dataCallback: null,

    	},
    	dlgIdArr = [],
    	notesdATA = {},
        requestUrl = {
            getAllNotes: mining.baseurl.core + '/note/listAllByItemId',
            insertNote: mining.baseurl.core + '/note/insert',
            delNote: mining.baseurl.core + '/note/deleteById',
            updateNote: mining.baseurl.core + '/note/updateById',
            existList: mining.baseurl.core + '/note/existList'
        },
        userId = mining.userinfo.user_id,
        userName = mining.userinfo.name;

    	var getTemplateHtml = function(type,dataObj){
            switch(type){
                case 'note':
                    var arr = [],
                        noteType = dataObj.noteType || 'show',
                        dataList = dataObj.listObj || [];
                        noteInfoArr = [];
                    if(!mining.utils.isEmpty(dataList)){
                        $.each(dataList,function(index,item){
                            var isMine = (userId == item.userId ? true : false),
                                obj = {
                                    noteType: noteType,
                                    item: item,
                                    isMine: isMine
                                };
                            noteInfoArr.push(getTemplateHtml('noteDetails',obj));
                        });
                    }else{
                        var obj = {
                            noteType: noteType,
                            item: {},
                            isMine: true
                        };
                        noteInfoArr.push(getTemplateHtml('noteDetails',obj));
                    }
                    return ['<i class="note-icon" data-gid="' + dataObj.dataId + '" data-etype="' + dataObj.dataType + '"></i>',
                            '<div class="notes-main" data-gid="' + dataObj.dataId + '">',
                                '<div class="note-bar">',
                                    (noteType == 'add' ? '' : '<span class="total pull-left">共<span class="count">' + dataList.length + '</span>条</span>'),
                                    '<span class="btns pull-right">',
                                        (noteType == 'add' ? '<span class="share-btn share" title="分享"></span>' : ''),
                                        '<span class="scopaicon scopaicon-guanbi close-tip" title="关闭"></span>',
                                    '</span>',
                                '</div>',
                                '<div class="note-panel">',
                                    (noteType == 'show' ? getTemplateHtml('addNote') : ''),
                                    '<div class="note-list">',
                                        '<div class="note-list-box">',
                                            noteInfoArr.join(''),
                                        '</div>',
                                    '</div>',
                                    (noteType == 'add' ? getTemplateHtml('addBottom') : ''),
                                '</div>',
                            '</div>'].join('');
                    break;
                case 'addNote':
                    return '<div class="add-note"><span class="btn-current btn-note btn-add">添加便签</span></div>';
                    break;
                case 'addBottom':
                    return '<div class="add-note-bottom"><span class="btn-current btn-note btn-save">确定</span></div>';
                    break;
                case 'noteDetails':
                    var isMine = dataObj.isMine,
                        item = dataObj.item,
                        noteType = dataObj.noteType,
                        noteBase = [];
                    
                    function getAuthorityBtns(authority){
                        var btnsArr = ['<span class="item-btns pull-right">',
                                            (authority == 1 ? '<span class="share-btn share" title="分享"></span>' : '<span class="share-btn cancel-share" title="取消分享"></span>'),
                                            '<span class="scopaicon scopaicon-baocun btn-save' + (noteType == 'insert' ? '' : ' hidden') + '" title="保存"></span>',
                                            '<span class="scopaicon scopaicon-shanchuxiao del-note" title="删除"></span>',
                                        '</span>'];
                        return btnsArr.join('');
                    }

                    if(noteType != 'add'){
                        noteBase = ['<div class="note-base">',
                                        '<span class="user-name ellipsis' + (noteType == 'insert' ? ' narrow' : '') + ' pull-left" data-user-id="' + (item.userId || '') + '"' + (isMine ? '' : ' style="width:100%;"') + '>',
                                            '<span title="' + (item.userName || '') + '">' + (item.userName || '') + '</span>',
                                            (isMine ? '<i class="scopaicon scopaicon-wode"></i>' : ''),
                                            '<span class="note-time" title="' + (item.time ? mining.utils.dateFormat(new Date(item.time),'yyyy-MM-dd hh:mm:ss') : '') + '">' + (item.time ? mining.utils.dateFormat(new Date(item.time),'yyyy-MM-dd hh:mm:ss') : '') + '</span>',
                                        '</span>',
                                        (isMine ? getAuthorityBtns(item.authority) : ''),
                                    '</div>'];
                    }

                    return ['<div class="item-note" data-status="' + noteType + '" data-note-id="' + (item.id || '') + '">',
                                noteBase.join(''),
                                '<div class="note-details">',
                                    '<div class="note-info-show' + (isMine ? '' : ' readonly') + '">',
                                        '<span class="note-info">' + (item.note || '') + '</span>',
                                        '<span class="cursor-blink"></span>',
                                        '<span class="prompt-info">' + (item.note ? '' : '请输入100字以内') + '</span>',
                                    '</div>',
                                    '<textarea value="' + (item.note || '') + '" ' + (noteType != 'show' ? 'placeholder="请输入100字以内"' : '') + ' maxlength="100" ' + (isMine ? '' : 'readonly') + '>' + (item.note || '') + '</textarea>',
                                '</div>',
                            '</div>'].join('');
                    break;
                default:
                    break;
            }
    	}

    	var initNotes = function(config){
    		$.extend(notesConfig,config);
    	}

        // 展开便签
        var openNotes = function(arg){
            $.fn.qtip.zindex = 2000;
            arg.node.qtip({
                content: {
                    text: function(event, api){
                        return arg.tplHtml; 
                    }
                },
                position: {
                    my: 'top center',
                    at: 'bottom center',
                    container: $('.page-graph')
                },
                style: {
                    classes: 'notes-box',
                    width: '298px',
                    height: '304px',
                    tip: {
                        corner: false
                    }
                },
                show: {
                    ready: true,
                    event: false
                },
                hide: {
                    event: false
                },
                events: {
                    render: function(event,api){
                        setEventsAction(api);
                    }
                }
            });
        }

    	// show note
    	var showNotes = function(noteData){
            getAllNotes({
                dataId: noteData.gid,
                callback: function(data){
                    var notes = {
                            dataId: noteData.gid,
                            dataType: noteData.etype,
                            noteType: 'show',
                            listObj: data.listObj
                        },
                        tplHtml = getTemplateHtml('note',notes);
                    openNotes({
                        node: noteData.element,
                        tplHtml: tplHtml
                    });
                }
            });
    	}

    	// add note
        var addNotes = function(noteData){
            var notes = {
                    dataId: noteData.gid,
                    dataType: noteData.etype,
                    noteType: 'add'
                },
                tplHtml = getTemplateHtml('note',notes);
            openNotes({
                node: noteData.element,
                tplHtml: tplHtml
            });
        }

        // get note
        var getAllNotes = function(arg){
            noteRequest({
                url: requestUrl.getAllNotes,
                param: {
                    itemId: arg.dataId
                },
                msg: '获取便签列表',
                callback: arg.callback,
                async: true
            });
        }

        var setEventsAction = function(tipDom){
            var isShare = 1,
                noteBeforeEdit = '',
                noteDom = tipDom.elements.content,
                checkdomgap = 100,
                checkdomcount = 0,
                checktdommax = 3000,
            	checkdomtimer = setInterval(function(){
	            	if($(noteDom).find('.note-list').size() > 0 || checkdomcount > checktdommax){
	            		clearInterval(checkdomtimer);
	            		$(noteDom).find('.note-list').mCustomScrollbar({
		                    theme: 'minimal'
		                });
	            	}else{
	            		checkdomcount += checkdomgap;
	            	}
	            }, checkdomgap);

            // 关闭tip
            $(noteDom).off('click','.note-bar .close-tip').on('click','.note-bar .close-tip',function(e){
                tipDom.hide(e);
                tipDom.destroy();
            });

            // 添加便签
            $(noteDom).off('click','.add-note .btn-add').on('click','.add-note .btn-add',function(){
                var obj = {
                        noteType: 'insert',
                        item: {
                            userId: userId,
                            userName: userName,
                            authority: 1
                        },
                        isMine: true
                    },
                    tpl = getTemplateHtml('noteDetails',obj);
                $(this).parent().addClass('hidden');
                $(noteDom).find('.note-list').height('100%').find('.note-list-box').prepend(tpl);
            });

            // 设置公有
            $(noteDom).off('click','.notes-main .share').on('click','.notes-main .share',function(){
                var $noteEl = $(this).parents('.item-note:first');
                if($noteEl.attr('data-status') == 'show'){
                    var noteId = $noteEl.attr('data-note-id'),
                        param = {
                            id: noteId,
                            authority: 0
                        },
                        obj = {
                            param: param,
                            msg: '设置便签公有化',
                            callback: function(result){
                                $noteEl.find('.share').removeClass('share').addClass('cancel-share').attr('title','取消分享');
                            },
                        };
                    updateNote(obj);
                }else{
                    isShare = 0;
                    $(this).removeClass('share').addClass('cancel-share').attr('title','取消分享');
                }
            });

            // 设置私有
            $(noteDom).off('click','.notes-main .cancel-share').on('click','.notes-main .cancel-share',function(){
                var $noteEl = $(this).parents('.item-note:first');
                if($noteEl.attr('data-status') == 'show'){
                    var noteId = $noteEl.attr('data-note-id'),
                        param = {
                            id: noteId,
                            authority: 1
                        },
                        obj = {
                            param: param,
                            msg: '设置便签私有化',
                            callback: function(result){
                                $noteEl.find('.cancel-share').removeClass('cancel-share').addClass('share').attr('title','分享');
                            },
                        };
                    updateNote(obj);
                }else{
                    isShare = 1;
                    $(this).removeClass('cancel-share').addClass('share').attr('title','分享');
                }
            });

            // 删除已创建的便签
            $(noteDom).off('click','.item-btns .del-note').on('click','.item-btns .del-note',function(){
                var $noteEl = $(this).parents('.item-note:first'),
                	gid = $noteEl.attr('data-note-id');
                if($noteEl.attr('data-status') == 'show'){
                    $dialog.confirm({
                    title: '删除便签',
                    content: '您确定要删除该便签信息吗？',
                    ok: function(){
                        var obj = {
                            param: {
                                id: gid
                            },
                            callback: function(result){
                                notesConfig.dataCallback(gid);
                                $noteEl.remove();
                                $(noteDom).find('.total .count').text($(noteDom).find('.note-list-box .item-note').size());
                            }
                        }
                        delNote(obj);
                    }
                });
                }else{
                    $noteEl.remove();
                    $(noteDom).find('.add-note').removeClass('hidden');
                }
            });

            // 保存便签
            $(noteDom).off('click','.item-note .btn-save').on('click','.item-note .btn-save',function(){
                var $noteEl = $(this).parents('.item-note:first'),
                    noteTxt = $noteEl.find('textarea').val(),
                    $noteTip = $(noteDom).find('.note-icon'),
                    dataId = $noteTip.attr('data-gid'),
                    etype = $noteTip.attr('data-etype');
                if(noteTxt.length > 100){
                    $dialog.alert('便签内容长度不能超过100，请重新输入','warning');
                    return;
                }
                if($noteEl.attr('data-status') == 'show'){
                    var noteId = $noteEl.attr('data-note-id'),
                        param = {
                            id: noteId,
                            note: noteTxt
                        },
                        obj = {
                            param: param,
                            msg: '更新便签内容',
                            callback: function(result){
                                $noteEl.find('.btn-save').addClass('hidden');
                                $noteEl.find('.user-name').removeClass('narrow');
                            },
                        };
                    updateNote(obj);
                }else{
                    var obj = {
                        dataId: dataId,
                        etype: etype,
                        noteTxt: noteTxt,
                        isShare: isShare,
                        tipDom: tipDom,
                        isNew: false
                    };
                    addNewNote(obj);
                }
            });
            
            $(noteDom).off('click','.add-note-bottom .btn-save').on('click','.add-note-bottom .btn-save',function(){
                var $noteEl = $(noteDom).find('.item-note'),
                    noteTxt = $noteEl.find('textarea').val(),
                    $noteTip = $(noteDom).find('.note-icon'),
                    dataId = $noteTip.attr('data-gid'),
                    etype = $noteTip.attr('data-etype'),
                    obj = {
                        dataId: dataId,
                        etype: etype,
                        noteTxt: noteTxt,
                        isShare: isShare,
                        tipDom: tipDom,
                        isNew: true
                    };
                if(noteTxt.length > 100){
                    $dialog.alert('便签内容长度不能超过100，请重新输入','warning');
                    return;
                }
                addNewNote(obj);
            });

            // 编辑便签 && 显示保存按钮
            $(noteDom).on('focus','.note-details textarea',function(){
                // $(this).parent().find('.cursor-blink').text('|');
                var $itemEl = $(this).parents('.item-note:first');
                if($itemEl.find('.btn-save').hasClass('hidden')){
                    noteBeforeEdit = $(this).val();
                }
                $itemEl.find('.btn-save').removeClass('hidden');
                $itemEl.find('.user-name').addClass('narrow');
            }).on('keyup','.note-details textarea',function(){
                // var $itemEl = $(this).parents('.item-note:first');
                if(mining.utils.isEmpty($(this).val())){
                    $(this).parent().find('.note-info-show')
                        .find('.note-info').empty().parent()
                        .find('.prompt-info').text('请输入100字以内');
                }else if($(this).val().length >= 100){
                    $dialog.alert('便签输入内容长度已达上限，内容长度需小于100','warning',2000);
                }else{
                    $(this).parent().find('.note-info-show')
                        .find('.prompt-info').empty().parent()
                        .find('.note-info').text($(this).val());
                }
            }).on('blur','.note-details textarea',function(){
                // $(this).parent().find('.cursor-blink').empty();
                var $itemEl = $(this).parents('.item-note:first');
                if($itemEl.attr('data-status') == 'show'){
                    if(noteBeforeEdit == $(this).val()){
                        $itemEl.find('.btn-save').addClass('hidden');
                        $itemEl.find('.user-name').removeClass('narrow');
                    }
                }
            });

            // 编辑便签
            $(noteDom).off('click','.note-details .note-info-show').on('click','.note-details .note-info-show',function(){
                $(this).parent().find('textarea').focus();
            });
        }

        var addNewNote = function(arg) {
            if(mining.utils.isEmpty(arg.noteTxt)){
                $dialog.alert('便签内容不能为空','warning');
                return;
            };
            var param = {
                    itemId: arg.dataId,
                    type: arg.etype != 'node' ? 1 : 0,
                    userId: userId,
                    note: arg.noteTxt,
                    authority: arg.isShare
                },
                obj = {
                    param: param,
                    callback: function(result){
                        if(arg.isNew){
                            notesConfig.dataCallback(param.itemId);
                        }
                        getAllNotes({
                            dataId: arg.dataId,
                            callback: function(data){
                                var notes = {
                                        dataId: arg.dataId,
                                        dataType: arg.etype,
                                        noteType: 'show',
                                        listObj: data.listObj
                                    },
                                    tplHtml = getTemplateHtml('note',notes);
                                // $(noteDom).html(tplHtml);
                                arg.tipDom.set('content.text', tplHtml);
                            }
                        });
                    },
                };
            insertNote(obj);
        }

        // insert new note
        var insertNote = function(arg){
            noteRequest({
                url: requestUrl.insertNote,
                param: arg.param,
                msg: '添加便签',
                showMsg: true,
                callback: arg.callback,
                type: 'post',
                async: true
            });
        }

    	// del note
        var delNote = function(arg){
            noteRequest({
                url: requestUrl.delNote,
                param: arg.param,
                msg: '删除便签',
                type: 'post',
                callback: arg.callback
            });
        }

        var updateNote = function(arg){
            noteRequest({
                url: requestUrl.updateNote,
                param: arg.param,
                msg: arg.msg,
                showMsg: true,
                callback: arg.callback,
                type: 'post',
                async: true
            });
        }

        // close notes
        var closeNotes = function(gids){
            if(gids){
                $.each(gids,function(i,n){
                    $('.notes-box .notes-main[data-gid="' + n + '"] .close-tip').click();
                });
            }else{
                $('.notes-box .notes-main .close-tip').click();
            }
        }

        var isNoted = function(arg){
            noteRequest({
                url: requestUrl.existList,
                param: {
                    itemIds: arg.dataIds.join(',')
                },
                type: 'post',
                msg: '获取列表',
                callback: arg.callback,
                async: arg.async
            });
        }

        var noteRequest = function(arg){
            $ajax.ajax({
                url: arg.url,
                data: arg.param,
                type: arg.type || 'get',
                async: arg.async,
                success: function(data){
                    if(arg.showMsg)$dialog.alert(arg.msg + '成功','success');
                    if(arg.callback)arg.callback(data);
                },
                error: function(err){
                    $dialog.alert(arg.msg + '失败','error');
                    return;
                }
            });
        }

        return {
            init: initNotes,
            show: showNotes,
            add: addNotes,
            close: closeNotes,
            isNoted: isNoted
        }
    }
});