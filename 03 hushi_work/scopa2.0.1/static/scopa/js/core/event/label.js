define(function (require) {
    var $page = $('.page-event'),
        $mainBox;
    var userId = mining.userinfo.user_id,
        dataUrl = mining.baseurl.gongan + '/',
        docParameters = {
            'labelFirst':{
                'el':'.label-list',
                'path':'zdsj/yjqb/label'
            },
            'labelSecond':{
                'el':'.label-list .small-list .tags',
                'path':'zdsj/label'
            },
            'labelThird':{
                'el':'.label-third'
            }
        },
        parameters = '?applicantId=' + userId,
        labelThird = {},
        labelsAll = {};


    var init = function(){
        userId = mining.userinfo.user_id;
        parameters = '?applicantId=' + userId;
        $mainBox = $('.list-container .labels',$page);
        getData('labelFirst',[]);
    }

    var getTemplateHtml = function (type, obj){
        switch(type){
            case 'labelFirst':
                var data = obj.listObj, arrLeft = [], arrRight = [], labelsObj = {}, count = 0, labelsOther = {};
                $.each(data,function (k,v) {
                    labelsAll[v.id] = v;
                    if(!v.pId){
                        // 生成一级标签
                        if(!labelsObj.hasOwnProperty(v.id)){
                            labelsObj[v.id] = {};
                        }
                        labelsObj[v.id] = v;
                        // labelsObj[v.id].id = v.id;
                        // labelsObj[v.id].name = v.name;
                        // if(!labelsObj[v.id].hasOwnProperty('children')){
                        //     labelsObj[v.id].children = [];
                        // }
                    }else{
                        if(!labelsOther.hasOwnProperty(v.id)){
                            labelsOther[v.id] = v;
                            // labelsOther[v.pId].id = v.id;
                        }
                        // if(labelsObj.hasOwnProperty(v.pId)){
                        //     // 生成二级标签
                        //     labelsObj[v.pId].children.push({
                        //         id: v.id,
                        //         name: v.name
                        //     });
                        // }else{
                        //     // 生成三级标签
                        //     if(!labelThird.hasOwnProperty(v.pId)){
                        //         labelThird[v.pId] = [];
                        //     }
                        //     labelThird[v.pId].push({
                        //         id: v.id,
                        //         name: v.name
                        //     });
                        // }
                    }
                });
                // 生成二级标签
                $.each(labelsObj,function(labelKey,labelValue){
                    if(!labelsObj[labelKey].hasOwnProperty('children')){
                        labelsObj[labelKey].children = [];
                    }
                    $.each(labelsOther,function(i,n){
                        if(n.pId == labelValue.id){
                            labelsObj[labelKey].children.push(n);
                            delete labelsOther[i];
                        }
                    });
                });
                // 生成三级标签
                // $.each(labelsObj,function(firstKey,firstValue){
                //     $.each(firstValue.children,function(j,secondValue){
                //         $.each(labelsOther,function(thirdKey,thirdValue){
                //             if(thirdValue.pId == secondValue.id){
                //                 if(!labelThird.hasOwnProperty(thirdValue.pId)){
                //                     labelThird[thirdValue.pId] = [];
                //                 }
                //                 labelThird[thirdValue.pId].push(thirdValue);
                //                 // if(secondValue.hasOwnProperty('children')){

                //                 // }
                //                 // if(!labelsObj[labelKey].hasOwnProperty('children')){
                //                 //     labelsObj[labelKey].children = [];
                //                 // }
                //                 // labelsObj[labelKey].children.push(n);
                //                 // delete n;
                //             }
                //         });
                //     });
                // });
                
                // 生成三级标签
                $.each(labelsOther,function(key,value){
                    if(!labelThird.hasOwnProperty(value.pId)){
                        labelThird[value.pId] = [];
                    }
                    labelThird[value.pId].push(value);
                    delete labelsOther[key];
                });

                $.each(labelsObj,function(keyid,item){
                    var childArr = [], str = [];
                    $.each(item.children,function (i,n) {
                        childArr.push('<span class="tags tag-current" data-id="' + n.id + '" data-pId="' + item.id + '" title="' + n.name + '">' + n.name + '<i class="icon icon-dropdown2"></i></span>')
                    });
                    str = ['<div class="label-item">',
                                '<span class="label-big" data-id="' + item.id + '" title="' + item.name + '">' + item.name + '</span>',
                                childArr.length > 0 ? '<div class="small-list">' + childArr.join('') + '</div>' : '',
                            '</div>'];
                    if(count % 2 == 0){
                        arrLeft.push(str.join(''));
                    }else{
                        arrRight.push(str.join(''));
                    }
                    count++;
                });
                
                return ['<div class="label-left-box">',
                            arrLeft.join(''),
                        '</div>',
                        '<div class="label-right-box">',
                            arrRight.join(''),
                        '</div>'].join('');
                break;
            case 'labelThird':
                var arr = [];
                $.each(obj,function(i,n){
                    arr.push('<span class="tags tag-current" data-id="' + n.id + '" data-pId="' + n.pId + '" title="' + n.name + '">' + n.name + '</span>');
                });
                return arr.join('');
                break;
            default:
                break;
        }
    }

    var getData = function(type,p){
        var params = [], url = '';
        url = dataUrl + docParameters[type].path + parameters + (p.length > 0 ? '&' + p.join('&') : '') + (params.length > 0 ? '&' + params.join('&') : '');
        dataLoad(url,function(data){
            if(type == 'labelFirst'){
                renderData(data,type);
            }else{
                return data;                
            }
        });
    }

    var renderData = function(datalist,type,el){
        var str = getTemplateHtml(type,datalist),
            $el = $(docParameters[type].el,$mainBox);
        
        if($el.hasClass('label-third') && currentOffset){
        	$el.remove();
        	$('.events-box .labels').append('<div class="label-third">' + str + '</div>');
        	$('.events-box .label-third').css({
	        	top: currentOffset.top - 94,
	        	left: currentOffset.left - 30
	        }).mCustomScrollbar({
	            theme: 'minimal'
	        });
        }else{
        	$el.html(str);
        }
        tableAction();
    }
	
	var currentOffset = null;
    var tableAction = function(){
        $(".label-box",$mainBox).mCustomScrollbar({
            theme: 'minimal',
			callbacks:{
				onScrollStart: function(){
					$('.events-box .label-third').hide();
				}
			}
        });
        // 绑定三级标签数据
        $.each($(docParameters['labelSecond'].el,$mainBox),function(){
            var labelId = $(this).attr('data-id');
            if(labelThird.hasOwnProperty(labelId)){
                $(this).addClass('hasChildren').data('data',labelThird[labelId]);
                $(this).find('i').data('data',labelThird[labelId]);
            }
            $(this).add($(this).find('i')).off('click').on('click',function(e){
                mining.utils.stopBubble(e);
				if($(this).hasClass('tag-current')){
					currentOffset = $(this).offset();
				}else{
					currentOffset = $(this).parent().offset();
				}
                $(docParameters['labelThird'].el,$mainBox).empty().addClass('hidden');
                if($(this).data('data')){
                    $(docParameters['labelThird'].el,$mainBox).removeClass('hidden');
                    var labelData = $(this).data('data');
                    labelData.pId = $(this).attr('data-id');
                    renderData(labelData,'labelThird');
                }
                mining.utils.serverLog(422);
            });
        });
        $(document).off('click.labelThird').on('click.labelThird',function(e){
            if(!$(e.target).hasClass('tags') && !$(e.target).parents().hasClass('label-third')){
                $(docParameters['labelThird'].el,$mainBox).empty().addClass('hidden');
            }
        });
    }

    var dataLoad = function(url, success){
        $ajax.ajax({
            url: url,
            async: false,
            success: function(data){
                success(data);
            },
            error: function(err) {
                console.log(err);
            }
        });
    }

    return {
        init: init
    }
});
