define(function(require){
	var $page = $('.page-event'),
		dataUrl = mining.baseurl.gongan + '/zdsj/yjqb/label?applicantId=' + mining.userinfo.user_id,
		labelsObj = {},
		// isSet = false,
		checkType = 'checkbox';
	var init = function (el,labels,callback,t) {
		dataUrl = mining.baseurl.gongan + '/zdsj/yjqb/label?applicantId=' + mining.userinfo.user_id;
		if(t){
			checkType = 'radio';
		}
		labelsObj = {};
		getData(el,labels,callback);
	}
	var getTemplateHtml = function(type,obj){
		switch(type){
			case 'labelTree':
				var arr = [];
				arr.push('<ul class="labels1" data-pid="">');
				$.each(obj,function(keyFirst,valueFirst){
					arr.push(['<li data-level="1" class="' + (!mining.utils.isEmpty(valueFirst.children) ? 'hasChildren' : '') + '">',
								'<span><input type="' + checkType + '" data-id="' + keyFirst + '" /></span>',
								'<i class="' + (!mining.utils.isEmpty(valueFirst.children) ? 'up' : '') + '" data-panel-box="' + keyFirst + '"></i>',
								'<span>' + valueFirst.name + '</span>'].join(''));
					if(!mining.utils.isEmpty(valueFirst.children)){
						arr.push('<ul class="labels2 hidden" data-pid="' + keyFirst + '">');
						$.each(valueFirst.children,function(keySecond,valueSecond){
							arr.push(['<li data-level="2" class="' + (!mining.utils.isEmpty(valueSecond.children) ? 'hasChildren' : '') + '">',
										'<span><input type="' + checkType + '" data-id="' + keySecond + '" /></span>',
										'<i class="' + (!mining.utils.isEmpty(valueSecond.children) ? 'up' : '') + '" data-panel-box="' + keySecond + '"></i>',
										'<span>' + valueSecond.name + '</span>'].join(''));
							if(!mining.utils.isEmpty(valueSecond.children)){
								arr.push('<ul class="labels3 hidden" data-pid="' + keySecond + '">');
								$.each(valueSecond.children,function(keyThird,valueThird){
									arr.push(['<li data-level="3" class="' + (!mining.utils.isEmpty(valueThird.children) ? 'hasChildren' : '') + '">',
												'<span><input type="' + checkType + '" data-id="' + keyThird + '" /></span>',
												'<i></i>',
												'<span>' + valueThird.name + '</span>',
											'</li>'].join(''));
								});
								arr.push('</ul>');
							}
							arr.push('</li>');
						});
						arr.push('</ul>');
					}
					arr.push('</li>');
				});
				arr.push('</ul>');
				return ['<div class="labeltreelist">',
							'<div class="labeltree">',
								'<div class="labeltree-box">',
									arr.join(''),
								'</div>',
							'</div>',
							'<div class="btn-label-box">',
								'<span class="btn-current choose-label">确定</span>',
								'<span class="btn-current cancel-label">取消</span>',
							'</div>',
						'</div>'].join('');
				break;
			default:
				break;
		}
	}
	var getData = function(el,labels,callback){
		$ajax.ajax({
			url: dataUrl,
			success: function(data) {
				formatData(data.listObj,el,labels,callback);
			}
		});
	}
	var formatData = function(data,el,labels,callback){
		var plabels = {},labelsThird = {}, labelsOther = {};
		$.each(data,function (k,v) {
            labelsObj[v.id] = v;
            if(!v.pId){
                // 生成一级标签
                if(!plabels.hasOwnProperty(v.id)){
                    plabels[v.id] = {};
                }
                plabels[v.id] = v;
            }else{
                if(!labelsOther.hasOwnProperty(v.id)){
                    labelsOther[v.id] = v;
                }
            }
        });
        // 生成二级标签
        $.each(plabels,function(labelKey,labelValue){
            if(!plabels[labelKey].hasOwnProperty('children')){
                plabels[labelKey].children = {};
            }
            $.each(labelsOther,function(i,n){
                if(n.pId == labelValue.id){
                    plabels[labelKey].children[i] = n;
                    delete labelsOther[i];
                }
            });
        });
        // 生成三级标签
        $.each(plabels,function(firstKey,firstValue){
            $.each(firstValue.children,function(j,secondValue){
            	if(!secondValue.hasOwnProperty('children')){
                	plabels[firstKey].children[j].children = {};
                }
                $.each(labelsOther,function(thirdKey,thirdValue){
                    if(thirdValue.pId == secondValue.id){
                        plabels[firstKey].children[j].children[thirdKey] = thirdValue;
                        delete n;
                    }
                });
            });
        });
        // $.each(plabels,function(i,n){
        // 	$.each(n.children,function(j,m){
        // 		plabels[i].children[m.id].children = {};
        // 		if(labelsThird.hasOwnProperty(m.id)){
        // 			plabels[i].children[m.id].children = labelsThird[m.id];
        // 		}
        // 	});
        	
        // });
        var $mainBox = $('.list-container .' + el,$page),
        	labelsData = [];
        $mainBox.append(getTemplateHtml('labelTree',plabels))
			.find('.labeltreelist .labeltree').mCustomScrollbar({
				theme: "minimal",
			});
		if(labels.length > 0){
			// isSet = true;
			setStatus();
		}
		$mainBox.find('.labeltreelist .labeltree li i').off('click').on('click',function(){
			var dataPanelId = $(this).attr('data-panel-box');
			if($(this).hasClass('up')){
				$(this).removeClass('up').addClass('down');
				$mainBox.find('.labeltreelist .labeltree ul[data-pid="' + dataPanelId + '"]').removeClass('hidden');
			}else{
				$(this).removeClass('down').addClass('up');
				$mainBox.find('.labeltreelist .labeltree ul[data-pid="' + dataPanelId + '"]').addClass('hidden');
			}
		});
		$mainBox.find('.labeltreelist .labeltree input[type="' + checkType + '"]',$page).on('click',function(e){
			mining.utils.stopBubble(e);
			var checked = this.checked,
				$itemLi = $(this).parents('li:first'),
				labelLevel = $itemLi.attr('data-level');
			if(checkType == 'radio'){
				$mainBox.find('.labeltreelist .labeltree input[type="' + checkType + '"]',$page).prop('checked',false);
			}
			$(this).prop('checked',checked);
			// if(isSet){
			// 	if(checked && labelLevel != 1){
			// 		changeStatus($(this).parents('ul[data-pid]:first').attr('data-pid'));
			// 	}
			// 	if(!checked && $itemLi.hasClass('hasChildren')){
			// 		$itemLi.find('li input[type="checkbox"]').prop('checked',checked);
			// 	}
			// }
		});

		$(document).off('click.eventLabelTreePanel').on('click.eventLabelTreePanel',function(e){
            if(!$(e.target).hasClass('labeltreelist') && !$(e.target).parents().hasClass('labeltreelist')){
                $('.labeltreelist',$mainBox).remove();
            }
        });
		
		$mainBox.find('.labeltreelist .choose-label',$page).off('click').on('click',function(){
			$.each($mainBox.find('.labeltreelist .labeltree input[type="' + checkType + '"]:checked'),function(key,item){
				labelsData.push(labelsObj[$(this).attr('data-id')]);
			});
			$(this).parents('.labeltreelist').remove();
			callback(labelsData);
		});
		$mainBox.find('.labeltreelist .cancel-label',$page).off('click').on('click',function(){
			$(this).parents('.labeltreelist').remove();
		});
		function setStatus(){
			$.each(labels,function(i,item){
				var $itemLabel = $mainBox.find('.labeltreelist .labeltree li input[type="' + checkType + '"][data-id="' + item + '"]',$page);
				if(!$itemLabel.attr('checked')){
					$itemLabel.click();
				}
			});
			// isSet = false; 
		}
		function changeStatus(lId){
			var $labelsBox = $mainBox.find('.labeltreelist .labeltree .labeltree-box'),
				$nLable = $labelsBox.find('li input[type="' + checkType + '"][data-id="' + lId + '"]');
			if(!$nLable.attr('checked')){
				$nLable.click();
			}
		}

	}
	return {
        init: init
    }
});