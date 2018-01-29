define(function(require){
	/*---------- 协作 ----------*/
	var $page = $('.page-cooperate'),
		requestUrl = {
			page: staticUrl + '/whale/template/cooperate.html',
			list: mining.baseurl.core + '/snapshot/list',				// pageSize, pageNo, keyword(name desc author), starttime, endtime
            listByUser: mining.baseurl.core + '/snapshot/listByUser',	// user_id, pageSize, pageNo, keyword(name desc author), starttime, endtime
            listFeeds: mining.baseurl.core + '/snapshot/listFeeds'	,	// user_id, pageSize, pageNo, keyword(name desc author), starttime, endtime
            listAll:mining.baseurl.core + '/snapshot/listAll',
			listPushedFeeds:mining.baseurl.core + '/snapshot/listPushedFeeds',
            getProject:mining.baseurl.core + '/snapshot/getProject'
		},
		snapshotModule = require('core/common/snapshot'),
		pageSize = 10,  pjPageNo= 1,pjName='',
		filterData;
	require('select2');
	require('daterangepicker');

	Date.prototype.format = function() {
		return this.getFullYear()+'-'+(this.getMonth()+1)+'-'+this.getDate();
	};
	//刷新布局
    var pageResize = function(){
    	var row= Math.floor((mining.browser.h - $('.navbar').height() - $('.pageheader', $page).height()) / 295);
        row=row<1?1:row;
        var col=Math.floor( mining.browser.w/285);
        pageSize =row*col;
        $('.list',$page).height(mining.browser.h-200);
    }
    mining.utils.winResize({name:pageResize}); 
    
	
    var initPage = function(){

    	mining.utils.loadPage($page, function(){
		    //数据搜索 
			filterData = function(pno,flag){
                $('.project',$page).css('display','none');
                var tab = $('.navtab li.current',$page).attr('tab');
                pno=pno||(Number($('.snapshotlist[tab='+tab+']',$page).attr('pNo'))+1)||1;
                var total=$('.snapshotlist[tab='+tab+']',$page).attr('pSize');
                if(!flag){
                    if($('.snapshotlist[tab='+tab+'] .panel-item',$page).length==total&&total>0) return;
                }
                $('.snapshotlist',$page).css('display','none');
                $('.snapshotlist[tab='+tab+']',$page).css('display','block');
                if(!pno){
                    if($('.snapshotlist[tab='+tab+'] .panel-item',$page).length>0) return;
                    pno=1;
                }
                var url=requestUrl[tab];
                var starttime='';
                var endtime='';
                if($('[name=reservation]',$page).val()!=''){
                    starttime=$('[name=daterangepicker_start]').val()+' 00:00:00';
                    endtime=$('[name=daterangepicker_end]').val()+' 23:59:59';
                }
                $ajax.ajax({
                    url: url,
                    data: {//user_id(用户ID), type(快照类型[图析0 | 地图1]), keyword, pageNo, pageSize, starttime, endtime
                        name:'',  keyword: $('.pageheader [name=keyword]',$page).val(),starttime:starttime,endtime:endtime,
                        user_id:mining.userinfo.user_id ,
                        type: 0,
                        pageSize: pageSize,
                        pageNo:pno
                    },
                    success: function(data){
						var panelHtml=[];
						if(pno==1) $('.snapshotlist[tab='+tab+']',$page).html('');
                        $.each(data.bodyData,function(k,v){
                            var date=new Date(v.ts);
                            var count= v.count>1?'<span class="flag "> </span>':"";
                            var info='<span class="sp-item ellipsis" title="'+ v.name+'"> <span class="lbl">名称：</span> '+ v.name+'</span><span class="sp-item ellipsis" title="'+  (v.author ? v.author.name : v.user_id) +'"> <span class="lbl">作者：</span> '+  (v.author ? v.author.name : v.user_id) +'</span>'+
                                '<span class="sp-item"> <span class="lbl">类别：</span> '+ getType(v.status)+'</span><span class="sp-item"> '+
                                '<span class="sp-item"> <span class="lbl">时间：</span> '+date.getFullYear()+'-'+(date.getMonth()+1)+'-'+date.getDate()+'</span>';
							var btndis='';
							if(v.user_id!=mining.userinfo.user_id)
							{
								btndis='btn_disabled';
							}
                            var toolbar='<div class="action" pjname="'+ v.name+'" pid="'+ v.id+'"><button class="btnShareP '+btndis+'" title="分享"><span class="icon icon-share"></span></button><button class="btnPushP '+btndis+'" title="推送"><span class="icon icon-push"></span></button> '+
                                    '<button class="btnImportP btn_disabled" title="导入"><span class="icon icon-import"></span></button><button class="btnOpenP btn_disabled" title="打开"><span class="icon icon-open"></span></button><button title="删除" class="btnDeleteP '+btndis+'"><span class="icon icon-delete4"></span></button></div>';
                           	panelHtml.push('<div class="panel-item" search="'+$('.pageheader [name=keyword]',$page).val()+'"> <div class="item-pic">'+count+toolbar+' <img src="'+mining.baseurl.core + '/snapshot/getThumbnail?sid='+ v.id+'" > </div> <div class="item-info">'+info+'</div></div>');
                        });
						$('#totalproject').text(data.totalCount);
						$('#showproject').text(pno*pageSize>data.totalCount?data.totalCount:pno*pageSize);
                        if(pno==1&&data.totalCount==0){
                            $('.snapshotlist[tab='+tab+']',$page).html('<div class="txt-empty">暂无数据，请您<span class="sp-fresh">刷新</span>或<span>稍后重试</span></div>');
                        }
						$('.snapshotlist[tab='+tab+']',$page).append($( panelHtml.join(''))).attr('pNo',pno).attr('pSize',data.totalCount);
                        $('.list',$page).height(mining.browser.h-220);
                        $('.list',$page).mCustomScrollbar({
                            theme: 'minimal',
                            callbacks:{
                                onTotalScroll: function(){
                                    scrollLoad();
                                }
                            }
                        });
                    },
                    error: function(data){
                        $('#totalproject').text('0');
                        $('#showproject').text('0');
                    }
                });

		    };
			function getType(key){
				if(key==0)return '共享图';
				if(key==1) return '私有图';

			}

            function scrollLoad(){
                if( $('#totalproject').text()!=""&& $('#totalproject').text()== $('#showproject').text()) return;
             filterData();
            }
            function loadProject(){
                getProject(pjName,pjPageNo+1)
            }
			function getProject( name,pno){
                if(!pno){
                    pno=1;
                }
                pjName=name;
				var total= $('#picNum').html()-0;
                if(pno>1&&total<=pageSize) return;
                var starttime='';
                var endtime='';
                if($('[name=reservation]',$page).val()!=''){
                    starttime=$('[name=daterangepicker_start]').val()+' 00:00:00';
                    endtime=$('[name=daterangepicker_end]').val()+' 23:59:59';
                }
                var keyword=$('.panel-item').attr('search')?$('.panel-item').attr('search'):'';
				$ajax.ajax({
					url: requestUrl.getProject,
					data: {//user_id(用户ID), type(快照类型[图析0 | 地图1]), keyword, pageNo, pageSize, starttime, endtime
						name:name, 	keyword:keyword,starttime:starttime,endtime:endtime,
						user_id: mining.userinfo.user_id,
						type: 0,
                        pageSize: pageSize,
                        pageNo:pno

					},
					success: function(data){
                        $('.project').attr('pjname',pjName);
						var lihtml=[];
						$.each(data.bodyData,function(k,v){
							var dt=new Date(v.ts);
							var sp = '<span class="time splist">' +dt.format()  + '</span>' +
								'<span class="author splist"><span class="icon icon-user"></span> ' + v.author.name + '</span>' +
								'<span class="splist "><span class="icon icon-map2"></span> ' + v.author.unit_name + '</span>' +
								'<span class="comment hidden">' + (v.comment?v.comment:'')+ '</span>'+
                                '<span class="authorid hidden">' + v.author.user_id  + '</span>'+
								'<span class="name hidden">' + v.name + '</span>'+
                                '<span class="type hidden">' +getType(v.status)  + '</span>'+
                                '<span class="userid hidden">' + v.user_id  + '</span>'+
								'<span class="description hidden">' + v.description + '</span>';
							lihtml.push(' <li projectId='+ v.id+'><span class="pointbg"></span>'+sp+' </li>');
						});
						$('#picNum').html(data.totalCount);
                        if(pno==1){	$('#projectlist').html(lihtml.join(''));}else{
                            $('#projectlist').append(lihtml.join(''));
                        }
						$('.projectlist',$page).mCustomScrollbar({
							theme: 'minimal',axis:"y", callbacks:{
                                onTotalScroll: function(){
                                    loadProject();
                                }
                            }
						});
						$('#projectlist li').first().click();
						seajs.log(data)
					},
					error: function(data){
						seajs.log(data)
					}
				});
			}
			//按类型搜索
		    $('.pageheader [name=type]',$page).select2({
		    	ajax: {
		    		url: 'xxxx',
		    		results: function(data){
		    			var resultArr = [{id:'', text:'全部类型'}];
		    			$.each(data.data, function(i,n){
		    				resultArr.push({id:n, text:n});
		    			});
		    			return {results: resultArr}
		    		}
		    	}
		    }).on('change', function(){
		    	filterData(1);
		    });
		    
			//按组别搜索
		    $('.pageheader [name=snapshottype]',$page).select2({
		    	dropdownCssClass: 'pageheader-select2'
		    }).on('change', function(){
		    	filterData();
		    });
		    
		    //按周期模糊搜索
		    $('input[name=reservation]',$page).daterangepicker({
		    	opens: 'left',
		        format:'YYYY-MM-DD',
		        timePicker: true,
		        // ranges: {
		           // '今天': [moment(), moment()],
		           // '昨天': [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
		           // '过去7天': [moment().subtract(6, 'days'), moment()],
		           // '过去30天': [moment().subtract(29, 'days'), moment()],
		           // '本月': [moment().startOf('month'), moment().endOf('month')],
		           // '上月': [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')]
		        // },
		        applyClass: 'btn-primary',
		        clearClass: 'btn-primary'
		    }, function(start, end, label, action) {
                if( $(event.target).hasClass('clearBtn')){
                    $('input[name=reservation]',$page).val('');
                }
		    	filterData(1,true);
		    });
		  
		    //按名称、作者模糊搜索
		    $('.pageheader .searchbox-btn',$page).on('click', function(){
		    	filterData(1);
		    });
		    $('.pageheader .searchbox-ipt',$page).on('keyup', function(e){
		    	if(e.keyCode==mining.keyCode.ENTER){
		    		filterData(1,true);
		    	}
		    });
            //权限
            if(!mining.utils.hasRoleForAction('cooperationCommon')){
                $('.navtab li[tab=list]',$page).addClass('hide');
            }

            //
            $('.navtab li',$page).on('click',function(){
                $(this).parent().find('.current').removeClass('current');
                $(this).addClass('current');
				filterData(1,true);
            }) ;
            $('.snapshotlist ',$page).on('mouseover','.item-pic',function(){
                $(this).find('.action').css('display','block');
            }).on('mouseout','.item-pic',function(){
                $(this).find('.action').css('display','none');
            }) ;
            $('.project',$page).on('mouseover','.listpic',function(){
                $(this).find('.action').css('display','block');
            }).on('mouseout','.listpic',function(){
                $(this).find('.action').css('display','none');
            }) ;
			$('.snapshotlist',$page).off('click', '.item-pic').on('click','.item-pic',function(e){
                getProject($(this).find('.action').attr('pjname'));
				$('.project',$page).fadeIn(500);
				var element= e.target;
				var offset=$(element).parents('.panel-item').offset();
				$('.project',$page).offset({left:offset.left,top:offset.top});
                var overWidth=offset.left+$('.project').width()-$( document ).width();
                var overHeight=offset.top+$('.project').height()-$( document ).height();
                if(overWidth>0){
                    $('.project',$page).offset({left:offset.left-overWidth-20});
                }
                if(overHeight>0){
                    $('.project',$page).offset({top:offset.top-overHeight-20});
                }

			}) ;
			$('#btnClose').on('click',function(){
				$('.project',$page).fadeOut(500);
			});
			$('#projectlist').off('click', 'li').on('click','li',function(e){
				var item=$(this);
				item.parent().find('.current').removeClass('current');
				item.addClass('current');
				document.getElementById('projectimg').src=mining.baseurl.core + '/snapshot/getThumbnail?sid='+item.attr('projectId');
                $('.project .action',$page).attr('sid',item.attr('projectId'));
			    $('.project .desc',$page).empty();
                var   sppush=mining.utils.isEmpty(item.find('.comment').text())?'':'<span title="'+item.find('.comment').text()+'">推送原因：'+item.find('.comment').text()+'</span>';
				$('.project .desc',$page).html('<span class="ellipsis" title="'+item.find('.name').text()+'">名称：'+item.find('.name').text()+'</span><span class="ellipsis" title="'+item.find('.author').text()+'">作者：'+item.find('.author').text()+'</span>'+
                    '<span class="ellipsis" title="'+item.find('.type').text()+'">类别：'+item.find('.type').text()+'</span><span class="ellipsis" title="'+item.find('.time').text()+'">时间：'+item.find('.time').text()+'</span>'+
                    '<span class="ellipsis" title="'+item.find('.description').text()+'">备注：'+item.find('.description').text()+'</span>'+sppush);
		        //设置button显示
                var buttons= $('.project .action',$page);
                var user=item.find('.userid').text();
                var loginUser=mining.userinfo.user_id;
                if(loginUser==user){
                    buttons.find('button').removeClass('btn_disabled');//创建者：工具栏所有图标高亮可点击
                } else  if(loginUser==item.find('.authorid').text()){ //作者：工具栏导入、打开和删除图标高亮可点击，分享和推送图标置灰
                    buttons.find('.btnShare,.btnPush').addClass('btn_disabled');
                    buttons.find('.btnImport,.btnOpen,.btnDelete').removeClass('btn_disabled');
                }else{
                    buttons.find('.btnShare,.btnPush,.btnDelete').addClass('btn_disabled');// 其他人员：工具栏导入和打开图标高亮可点击，分享、推送和删除图标置灰
                    buttons.find('.btnImport,.btnOpen').removeClass('btn_disabled');
                }
            });

            $('.snapshotlist',$page).off('click', '.panel-item button').on('click','.panel-item button',function(ev){
                ev.stopPropagation();
                var button=$(this);
                var pname=button.parent().attr('pjname');
				if(button.hasClass('btn_disabled'))
					return;
                if(button.hasClass('btnShareP')){
                    snapshotModule.share({
                        id: pname,
                        success: function(){
							$('.navtab li.current',$page).click();
                        }
                    });
                }
                if(button.hasClass('btnPushP')){
                    var  thumbnail =$(this).parents('.item-pic').find('img').attr('src');
                    snapshotModule.push({
                        id: pname,
                        thumbnail: thumbnail,
                        success: function(){
                            $('.navtab li.current',$page).click();
                        }
                    });
                }
                if(button.hasClass('btnImportP')){
                    snapshotModule.import({
                        id: button.parent().attr('pid')
                    });
                }
                if(button.hasClass('btnOpenP')){
                    snapshotModule.open({
                        id: button.parent().attr('pid')
                    });
                }
                if(button.hasClass('btnDeleteP')){
                    snapshotModule.del({
                        id: pname,
                        success: function(){
							$('.navtab li.current',$page).click();
                        }
                    });
                }
            });
            $('.snapshotlist',$page).off('click', '.sp-fresh').on('click','.sp-fresh',function(ev){
                $('.navtab li.current',$page).click();
            });
            $('.project').off('dblclick','#projectimg').on('dblclick','#projectimg',function(){
                  var sid =$(this).parent().find('.action').attr('sid');
                 snapshotModule.open({
                 id: sid
                 });
            });

		});
        filterData(1,true);
    }

   	//分享快照
   	$page.off('click', '.btnShare').on('click', '.btnShare', function(){
        if($(this).hasClass('btn_disabled')) return;
        var sid =  $(this).parents('.project').attr('pjname');
        snapshotModule.share({
            id: sid,
            success: function(){
                $('.navtab li.current',$page).click();
            }
        });
   		/*snapshotModule.sharePic({
   			id: sid,
   			success: function(){
				$('.navtab li.current',$page).click();
   			}
   		});*/
   	});
   	//推送快照
   	$page.off('click', '.btnPush').on('click', '.btnPush', function(){
        if($(this).hasClass('btn_disabled')) return;
   		var
   			sid =  $(this).parents('.project').attr('pjname'),// $(this).parent().attr('sid'),
   			thumbnail =$(this).parents('.pic').find('img').attr('src');
/*   		snapshotModule.pushPic({
   			id: sid,
   			thumbnail: thumbnail,
            success: function(){
                $('.navtab li.current',$page).click();
            }
   		});*/
        snapshotModule.push({
            id: sid,
            thumbnail: thumbnail,
            success: function(){
                $('.navtab li.current',$page).click();
            }
        });
   	});
   	//导入快照
   	$page.off('click', '.btnImport').on('click', '.btnImport', function(){
   		var sid =  $(this).parent().attr('sid');
   		snapshotModule.import({
   			id: sid
   		});
   	});
   	//打开快照
   	$page.off('click', '.btnOpen').on('click', '.btnOpen', function(){
   		var sid =$(this).parent().attr('sid');
   		snapshotModule.open({
			id: sid
		});
   	});
   	//删除快照
   	$page.off('click', '.btnDelete').on('click', '.btnDelete', function(){
        if($(this).hasClass('btn_disabled')) return;
        var sid =$(this).parent().attr('sid');
   		snapshotModule.delPic({
   			id: sid,
   			success: function(){
				$('.navtab li.current',$page).click();
   			}
   		});
   	});

    return {
    	init: initPage
    }
});
