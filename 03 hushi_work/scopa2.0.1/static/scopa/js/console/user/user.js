define(function(require){
	/* ---------- 首页 ---------- */
	var $page = $('.page-user'),
		requestUrl = {getUsers:mining.baseurl.console + '/user/allUsers',getUserById:mining.baseurl.console + '/user/lookupUser',
        updateUser:mining.baseurl.console + '/user/updateUser',getGroups:mining.baseurl.console + '/user/allGroups',
		getUserByGroup:mining.baseurl.console + '/user/getUsersByGroup',addGroup:mining.baseurl.console + '/user/addUserg',
			deleteGroup:mining.baseurl.console + '/user/deleteUserg',addUserTog:mining.baseurl.console + '/user/addUser2g',
			deleteUser:mining.baseurl.console + '/user/deleteUser',getGroupByUser:mining.baseurl.console + '/user/getGroup',getRoleByUser:mining.baseurl.console + '/user/getRoleList',
			addUser:mining.baseurl.console + '/user/addUser',getAllUnit:mining.baseurl.console + '/user/allUnits',
            getUserByUnit:mining.baseurl.console + '/user/getUsersByUnit',delUserFromGroup:mining.baseurl.console + '/user/deleteUserFromGroup',
			addUnit:mining.baseurl.console + '/user/addUnit',updateUnit:mining.baseurl.console + '/user/updateUnit',
			deleteUnit:mining.baseurl.console + '/user/deleteUnit',getAllAdmins:mining.baseurl.console + '/admin/allAdmins',
            addAdmin:mining.baseurl.console + '/admin/add',deleteAdmin:mining.baseurl.console + '/admin/delete',getAdminInfo:mining.baseurl.console + '/admin/lookup',
            addRoleForUser:mining.baseurl.console + '/user/addRole',delRoleOfUser:mining.baseurl.console + '/user/deleteRole',
            role_getAll: mining.baseurl.console + '/role/getAll'
		};
    var checkModule = require('./check');
	//刷新布局
    var pageResize = function(){
    	$('.d_user,.d_group,.d_unit,.d_manager',$page).height($page.height() - 100);
    	//TODO
    }
    
	/* 初始化 */
    var initPage = function(){
    	mining.utils.loadPage($page, function(){
			mining.utils.winResize({name:pageResize}); 
			function loadUserList(){
				$ajax.ajax({
                    url: requestUrl.getUsers,
                    async: false,
                    success: function(result){
                       var tr=[];
                        $.each(result.listObj,function(k,v){
                          tr.push('<tr uid="'+ v.user_id+'"><td>'+ v.user_id+'</td><td>'+ v.name+'</td><td>'+ v.internal_id+'</td><td title="'+v.email+'">'+ v.email+'</td><td>'+ v.unit_name+'</td><td><span class="icon icon-delete4 catbtn btn-del"></span></td></tr>');

                        });
                      $('#tableUser tbody ').html(tr.join(''));

                    },
                    error: function(result){

                    }
                });
			}
			function showUserInfo(id){
				$ajax.ajax({
					url: requestUrl.getUserById,
					data:{user_id:id},
					async: false,
					success: function(result){
						$('#uname').val(result.obj.name);
						$('#password').val(result.obj.password);
						$('#email').val(result.obj.email);
						$('#cell').val(result.obj.cell);
                        $('#uunit').select2('val',result.obj.unit);
                        $('#uinternal').val(result.obj.internal_id);
					},
					error: function(result){

					}
				});
			}
			function getGroupByuser(id){
                $('#groupInfo  ').empty();
				$ajax.ajax({
					url: requestUrl.getGroupByUser,
					data:{user_id:id},
					async: false,
					success: function(result){
						var divRow=[];
                        $.each(result.listObj, function (k, v) {
                            var row = '<div class="col-xs-1 label">组' + (k + 1) + '</div> <div class="col-xs-4"><input type="text"  value="' + v.name + '" disabled  class="txt"/> </div><div class="col-xs-1 " style="  padding: 0;"> <span class="icon icon-delete4 btn-del catbtn" gId="' + v.user_gid + '"></span></div> ';
                            if (k % 2 == 0) {
                                divRow.push(' <div class="row">' + row);
                            }
                            else {
                                divRow.push(row + ' </div>');
                            }
                        });
						$('#groupInfo  ').html(divRow.join(''));
					},
					error: function(result){

					}
				});
			}
            function getRoleByUser(id){
              $('#roleInfo  ').empty();
                $ajax.ajax({
                    url: requestUrl.getRoleByUser,
                    data:{user_id:id},
                    async: false,
                    success: function(result){
                        var divRow=[];
                        $.each(result.listObj,function(k,v){
                            var row='<div class="col-xs-1 label">角色'+(k+1)+'</div> <div class="col-xs-4"><input type="text"  value="'+ v.name+'" disabled  class="txt"/> </div><div class="col-xs-1 " style="    padding: 0;"> <span class="icon icon-delete4 btn-del catbtn" rId="'+ v.id+'"></span></div> ';
                            if(k%2==0){
                                divRow.push(' <div class="row">'+row);
                            }
                           else{
                                divRow.push(row+' </div>');
                            }
                        });
                      $('#roleInfo  ').html(divRow.join(''));
                    },
                    error: function(result){

                    }
                });
            }
			function getAllGroups(){
				$ajax.ajax({
					url: requestUrl.getGroups,
					async: false,
					success: function(result){
						var data=[];
						$.each(result.listObj,function(k,v){
                            data.push({gid: v.user_gid,name:v.name,unitname: v.unit});
						});
                        createTable('tableGroup','<tr gid={gid}><td>{gid}</td><td>{name}</td><td>{unitname}</td></tr>',data);
					},
					error: function(result){

					}
				});
			}
			function getUserByGroup(gId){
                $('#userBygroup tbody ').empty();
                createTable('userBygroup','<tr uid={uid}><td>{uid}</td><td>{name}</td><td>{internal_id}</td><td>{unitname}</td><td>{email}</td><td>{cell}</td></tr>',[]);
                $ajax.ajax({
					url: requestUrl.getUserByGroup,
					data:{user_gid:gId},
					async: false,
					success: function(result){
						var data=[];
						$.each(result.listObj,function(k,v){
							data.push({uid: v.user_id,name: v.name,internal_id: v.internal_id,unitname:v.unit_name,email: v.email,cell: v.cell});
						});
                        createTable('userBygroup','<tr uid={uid}><td>{uid}</td><td>{name}</td><td>{internal_id}</td><td>{unitname}</td><td>{email}</td><td>{cell}</td></tr>',data);
					},
					error: function(result){

					}
				});
			}
            function getAllUnit(){
                $('#tableUnit tbody ').empty();
                $ajax.ajax({
                    url: requestUrl.getAllUnit,
                    async: false,
                    success: function(result){
                        var options=[];
                        var data=[];
                        $.each(result.listObj,function(k,v){
                            data.push({uid: v.unit_id,name: v.unit_name,desc: v.unit_desc,email: v.unit_email,cell: v.unit_tel+'</td></tr>'});
                            options.push('<option value="'+ v.unit_id+'">'+ v.unit_name+'</option>');
                        });
                        createTable('tableUnit','<tr unit={uid}><td>{name}</td><td>{desc}</td><td>{email}</td><td>{cell}</td></tr>',data);
                        $('#a_unit').html(options.join(''));
                        $('#a_unit').select2({
                           minimumResultsForSearch: Infinity
                        });
                        $('#uunit').html(options.join(''));
                        $('#uunit').select2({
                            minimumResultsForSearch: Infinity
                        });
                    },
                    error: function(result){

                    }
                });
            }
            function getUserByUnit(name){
                $('#userByunit tbody ').empty();
                createTable('userByunit','<tr uid={uid}><td>{uid}</td><td>{name}</td><td>{internal_id}</td><td>{unit}</td><td>{email}</td><td>{cell}</td></tr>',[]);
                $ajax.ajax({
                    url: requestUrl.getUserByUnit,
                    data:{unit:name},
                    async: false,
                    success: function(result){
                        var data=[];
                        $.each(result.listObj,function(k,v){
                            data.push({uid: v.user_id,name: v.name,internal_id: v.internal_id,unit: v.unit_name,email: v.email,cell: v.cell});
                        });
                        createTable('userByunit','<tr uid={uid}><td>{uid}</td><td>{name}</td><td>{internal_id}</td><td>{unit}</td><td>{email}</td><td>{cell}</td></tr>',data);
                    },
                    error: function(result){

                    }
                });
            }
            function getAllAdmins(){
                $('#tableAdmin tbody ').empty();
                $ajax.ajax({
                    url: requestUrl.getAllAdmins,
                    async: false,
                    success: function(result){
                        var data=[];
                        $.each(result.listObj,function(k,v){
                            data.push({id: v.id,name: v.name,email:v.email,cell: v.cell,unit:v.unit_name});
                        });
                        createTable('tableAdmin','<tr aid={id}><td>{name}</td><td>{unit}</td><td>{email}</td><td>{cell}</td></tr>',data);
                    },
                    error: function(result){

                    }
                });
            }
            function getAdminInfo(Id){
                $ajax.ajax({
                    url: requestUrl.getAdminInfo,
                    data:{id:Id},
                    async: false,
                    success: function(result){
                        $('#a_name').val(result.obj.name);
                        $('#a_password').val(result.obj.password);
                        $('#a_email').val(result.obj.email);
                        $('#a_cell').val(result.obj.cell);
                        $('#a_unit').select2('val',result.obj.unit);
                    },
                    error: function(result){

                    }
                });
            }
            function createTable( tableId,trHtml,totalData){
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
                var gridFtl = {
                    pageTemplate: '<div class="gridTotal pull-left">每页&nbsp;10条 &nbsp;<span class="gray">&nbsp;&nbsp;</span>共<b>{totalCount}</b>条记录</div>' +
                    '<input type="button" value="首页" class="page-bt first-page" title="首页">' +
                    '<input type="button" value="上一页" class="page-bt pre-page" title="上一页">' +
                    '第 <span style="color: #6ea3db">{pageNo}</span> 页' +
                    '<input type="button" value="下一页" class="page-bt next-page" title="下一页">' +
                    '<input type="button" value="末页" class="page-bt last-page" title="末页">' +

                    ''
                };
                var bodyTemplate= trHtml;
                var grid = Grid.init({
                    holder: tableId,
                    bodyTemplate:bodyTemplate,
                    dataSource: getData,
                    pageTemplate: gridFtl.pageTemplate,
                    pageSize: 10,
                    sendOnPageSize:true
                });
                grid.send();
            }
			var addEvent=function(){
				$('#userTab li',$page).on('click',function(){
					$(this).siblings().removeClass('current');
					$(this).addClass('current');
					var key=$(this).attr('key');
					$('.show').removeClass('show').addClass('hidden');
					$('.'+key).removeClass('hidden').addClass('show');
                    $('.'+key+' .table tbody tr:first').click();
				});
				$('#tableUser tbody ',$page).delegate('tr','click',function(ev){
                    var uid=$(this).attr('uid');
					showUserInfo(uid);
					getGroupByuser(uid);
                    getRoleByUser(uid);
                    $(this).parent().find('.selected').removeClass('selected');
                    $(this).addClass('selected');
				});
                $('.btn-addGroup',$page).off('click').on('click',function(){
                    var uid=$('#tableUser tr.selected',$page).attr('uid');
                    var newdialog = $dialog({
                        title: '添加群组 ',
                        content: '<div class="dlg_main">'+
                        '<ul id="list-group"></ul> '+
                        '<div style="text-align: center; margin-top: 10px" ><button class="btnblue btnSubmit">确定</button></div> </div>',
                        width: 300,
                        height:200,
                        onshow: function () {
                            var $dlgPage = $(this.node);
                            $ajax.ajax({
                                url: requestUrl.getGroups,
                                async: false,
                                success: function (result) {
                                    var li = [];
                                    $.each(result.listObj, function (k, v) {
                                        li.push('<li gid="' + v.user_gid + '" ><input type="radio" name="rolelist"/> <span>' + v.name + '</span></li>');
                                    });
                                    $('#list-group ',$dlgPage).html(li.join('')).height(170).mCustomScrollbar({  theme: 'minimal'});
                                },
                                error: function (result) {
                                }
                            });
                            $('#list-group ',$dlgPage).on('click','li',function(){
                                $(this).find('input').prop("checked",true) ;
                            });
                            $('.btnSubmit',$dlgPage).on('click',function(){
                                var gid=$('input[name=rolelist]:checked',$dlgPage).parent().attr('gid');
                                $ajax.ajax({
                                    url: requestUrl.addUserTog,
                                    type: 'post',
                                    dataType: 'json',
                                    data: {"user_id":uid, "user_gid":gid},
                                    success: function (result) {
                                        if (result.statusCode == 200) {
                                            $dialog.alert("添加成功",'success',function(){ newdialog.close().remove(); getGroupByuser(uid)});
                                        }
                                    },
                                    error:function(e){
                                        $dialog.alert("添加失败，"+ e.message,'error');
                                    }
                                });
                            });
                        }

                    }).showModal();
                });
                $('.btn-addRole',$page).off('click').on('click',function(){
                    var uid=$('#tableUser tr.selected',$page).attr('uid');
                    var dlgRole = $dialog({
                        title: '添加角色 ',
                        content: '<div class="dlg_main">'+
                        '<ul id="list-role"></ul> '+
                        '<div style="text-align: center; margin-top: 10px" ><button class="btnblue btnSubmit">确定</button></div> </div>',
                        width: 300,
                        height:200,
                        onshow: function () {
                            var $dlgPage = $(this.node);
                            $ajax.ajax({
                                url: requestUrl.role_getAll,
                                async: false,
                                success: function (result) {
                                    var li = [];
                                    $.each(result.listObj, function (k, v) {
                                        li.push('<li rid="' + v.id + '" ><input type="radio" name="rolelist"/> <span>' + v.name + '</span></li>');
                                    });
                                    $('#list-role ',$dlgPage).html(li.join('')).height(170).mCustomScrollbar({  theme: 'minimal'});
                                },
                                error: function (result) {
                                }
                            });
                            $('#list-role ',$dlgPage).on('click','li',function(){
                                $(this).find('input').prop("checked",true) ;
                            });
                            $('.btnSubmit',$dlgPage).on('click',function(){
                                var rid=$('input[name=rolelist]:checked',$dlgPage).parent().attr('rid');
                                $ajax.ajax({
                                    url: requestUrl.addRoleForUser,
                                    type: 'post',
                                    dataType: 'json',
                                    data: {
                                        user_id:uid ,
                                        role_id: rid
                                    },
                                    success: function (result) {
                                        if (result.statusCode == 200) {
                                            $dialog.alert("添加成功",'success', function () {
                                                dlgRole.close().remove();
                                                getRoleByUser(uid)
                                            });
                                        }
                                    },
                                    error:function(e){
                                        $dialog.alert("添加失败，"+ e.message,'error');
                                    }
                                });
                            });
                        }

                    }).showModal();
                });
                $('#roleInfo',$page).off('click','.btn-del').on('click','.btn-del',function(){
                    var rid=$(this).attr('rId');
                    var uid=$('#tableUser tr.selected',$page).attr('uid');
                    $dialog.confirm({
                        title: '删除角色',
                        content: '您确定要删除该用户的角色吗？',
                        ok: function(){
                            $ajax.ajax({
                                url: requestUrl.delRoleOfUser,
                                async: false,
                                data: {
                                    user_id:uid,
                                    role_id: rid
                                },
                                success: function (result) {
                                    if (result.statusCode == 200) {
                                        $dialog.alert("删除成功",'success',function(){ getRoleByUser(uid)});
                                    }
                                },
                                error: function (e) {
                                    $dialog.alert("删除失败,"+ e.message,'error');
                                }
                            });
                        }
                    });

                });
                $('#groupInfo',$page).off('click','.btn-del').on('click','.btn-del',function(){
                    var gid=$(this).attr('gId');
                    var uid=$('#tableUser tr.selected').attr('uid');
                    $dialog.confirm({
                        title: '删除群组',
                        content: '您确定要删除该群组吗？',
                        ok: function(){
                            $ajax.ajax({
                                url: requestUrl.delUserFromGroup,
                                type:'post',
                                data: {"user_gid":gid,user_id:uid},
                                success: function (result) {
                                    if (result.statusCode == 200) {
                                        $dialog.alert("删除成功",'success',function(){ getGroupByuser(uid)});
                                    }
                                },
                                error: function (e) {
                                    $dialog.alert("删除失败,"+ e.message,'error');
                                }
                            });
                        }
                    });

                });
				$('#tableGroup tbody ',$page).delegate('tr','click',function(ev){
					getUserByGroup($(this).attr('gid'));
                    $(this).parent().find('.selected').removeClass('selected');
                    $(this).addClass('selected');
				});
                $('#tableUnit tbody ',$page).delegate('tr','click',function(ev){
                    getUserByUnit($(this).attr('unit'));
                    $(this).parent().find('.selected').removeClass('selected');
                    $(this).addClass('selected');
                });
                $('#userBygroup tbody ',$page).delegate('tr','click',function(ev){
                    $(this).parent().find('.selected').removeClass('selected');
                    $(this).addClass('selected');
                });
                $('#tableAdmin tbody ',$page).delegate('tr','click',function(ev){
                    getAdminInfo($(this).attr('aid'));
                    $(this).parent().find('.selected').removeClass('selected');
                    $(this).addClass('selected');
                });
				$('#btnSave',$page).off('click').on('click',function(){
                    var postObj={"user_id":$('#tableUser tr.selected').attr('uid'),"name":$('#uname').val(),"internal_id":$('#uinternal').val(),
                        "email":$('#email').val(),"password":$('#password').val(),"cell":$('#cell').val(),"unit":$('#uunit').val()};
                    $ajax.ajax({
                        url: requestUrl.updateUser,
                        type: 'post',
                        dataType:'json',
                        data:postObj,
                        success: function (result) {
                            if (result.statusCode == 200) {
                                $dialog.alert("保存成功",'success',function(){  loadUserList();});
                            }
                        },
                        error:function(e){
                            $dialog.alert("保存失败",'error');
                        }
                    });
				});
                $('#btnSaveAdmin').on('click',function(){

                });
				$('#btnAddGroup',$page).off('click').on('click',function(){
					var newdialog = $dialog({
						title: '添加群组 ',
						content: '<div class="addForm"><span>id</span><input id="gid"></div> <div class="addForm"><span>名称</span><input id="name"></div>'+
                        '<div class="addForm"><span>描述</span><input id="desc"></div>',
						width: 400,
						cancelValue: '取消',
						cancel: function() {
							newdialog.close().remove();
						},
						okValue: '确认',
						ok: function() {
							var postObj=   {"user_gid":$('#gid').val(),"name":$('#name').val(),unit:$('#desc').val()};
							$ajax.ajax({
								url: requestUrl.addGroup,
								type: 'post',
								dataType:'json',
								data:postObj,
								success: function (result) {
									if (result.statusCode == 200) {
										$dialog.alert("添加群组成功",'success',function(){  newdialog.close().remove();getAllGroups();});
									}
								},
								error:function(e){
									$dialog.alert("添加失败，"+e.message,'error');
								}
							});

						}
					}).showModal();
				});
				$('#btnDelGroup',$page).off('click').on('click',function(){
                    $dialog.confirm({
                        title: '删除群组',
                        content: '您确定要删除该群组吗？',
                        ok: function(){
                            $ajax.ajax({
                                url: requestUrl.deleteGroup,
                                type: 'post',
                                dataType:'json',
                                data:{"user_gid":$('#tableGroup tr.selected').attr('gid')},
                                success: function (result) {
                                    if (result.statusCode == 200) {
                                        $dialog.alert("删除成功",'success',function(){getAllGroups();});
                                    }
                                },
                                error:function(){
                                    $dialog.alert("删除失败",'error');
                                }
                            });
                        }
                    });


				});
				$('#delUserFromGroup',$page).off('click').on('click',function(){
                    var gid=$('#userBygroup tr.selected').attr('uid');
                    if(!gid){
                        $dialog.alert('没有可以删除的用户','warning');
                        return;
                    }
                    $dialog.confirm({
                        title: '删除用户',
                        content: '您确定要删除该群组用户吗？',
                        ok: function(){
                            $ajax.ajax({
                                url: requestUrl.delUserFromGroup,
                                type: 'post',
                                dataType:'json',
                                data:{"user_gid":$('#tableGroup tr.selected').attr('gid'),user_id:gid},
                                success: function (result) {
                                    if (result.statusCode == 200) {
                                        $dialog.alert('删除成功','success',function(){getUserByGroup($('#tableGroup tr.selected').attr('gid'))} );
                                    }
                                },
                                error:function(e){
                                    $dialog.alert("删除失败",'error');
                                }
                            });
                        }
                    });

				});
				$('#btnAddUserToGroup',$page).off('click').on('click',function(){
                    //组现有用户
                    var table=  $('#tableUser').html().replace($('#userBygroup tbody').html().trim(),'') ;
					var newdialog = $dialog({
						title: '添加用到群组 ',
						content:'<table class="grid table addTable">'+table+'</table>' ,
						width: 600,
						cancelValue: '取消',
						cancel: function() {
							newdialog.close().remove();
						},
						okValue: '确认',
						ok: function() {
                            var gid=$('#tableGroup tr.selected').attr('gid');
							var postObj=   {"user_id":$('.addTable .selected').attr('uid'), "user_gid":gid};
							$ajax.ajax({
								url: requestUrl.addUserTog,
								type: 'post',
								dataType:'json',
								data:postObj,
								success: function (result) {
									if (result.statusCode == 200) {
										$dialog.alert('添加成功','success',function(){  newdialog.close().remove();getUserByGroup(gid)});
									}
								},
								error:function(e){
									$dialog.alert("添加失败，"+e.message,'error');
								}
							});

						}
					}).showModal();
				});
				$('#btnAddUnit',$page).off('click').on('click',function(){
					var newdialog = $dialog({
						title: '添加域 ',
						content: '<div class="addForm"><span>id</span><input id="unit_id"></div> <div class="addForm"><span>名称</span><input id="unit_name"></div>'+
						' <div class="addForm"><span>描述</span><input id="unit_desc"></div> <div class="addForm"><span>电话</span><input id="unit_tel"></div> <div class="addForm"><span>邮箱</span><input id="unit_email"></div>',
						width: 400,
						cancelValue: '取消',
						cancel: function() {
							newdialog.close().remove();
						},
						okValue: '确认',
						ok: function() {
							var postObj=   {"unit_id":$('#unit_id').val(),"unit_name":$('#unit_name').val(),"unit_desc":$('#unit_desc').val(),"unit_tel":$('#unit_tel').val(),"unit_email":$('#unit_email').val()};
							$ajax.ajax({
								url: requestUrl.addUnit,
								type: 'post',
								dataType:'json',
								data:postObj,
								success: function (result) {
									if (result.statusCode == 200) {
										$dialog.alert("添加域成功",'success',function(){  newdialog.close().remove();getAllUnit();});
									}
								},
								error:function(e){
									$dialog.alert("添加失败，"+e.message,'error');
								}
							});

						}
					}).showModal();
				});
				$('#btnDelUnit',$page).off('click').on('click',function(){
                    $dialog.confirm({
                        title: '删除域',
                        content: '删除域将删除域内的所有用户，您确定要删除吗？',
                        ok: function(){
                            $ajax.ajax({
                                url: requestUrl.deleteUnit,
                                type: 'get',
                                dataType:'json',
                                data:{"unit_id":$('#tableUnit tr.selected').attr('unit')},
                                success: function (result) {
                                    if (result.statusCode == 200) {
                                        $dialog.alert("删除成功",'success',function(){getAllUnit();});
                                    }
                                },
                                error:function(e){
                                    $dialog.alert("删除失败",'error');
                                }
                            });
                            return false;
                        }
                    })
				});
                $('#btnAddAdmin',$page).off('click').on('click',function(){
                    var newdialog = $dialog({
                        title: '添加管理员 ',
                        content: '<div class="addForm"><span>id</span><input id="admin_id"></div> <div class="addForm"><span>姓名</span><input id="admin_name"></div> <div class="addForm"><span>密码</span><input id="admin_password"></div>'+
                        ' <div class="addForm"><span>单位</span><select name="admin_unit" id="admin_unit" class="select"> '+$('#a_unit').html()+'</select></div> <div class="addForm"><span>电话</span><input id="admin_cell"></div> <div class="addForm"><span>邮箱</span><input id="admin_email"></div>',
                        width: 400,
                        cancelValue: '取消',
                        cancel: function() {
                            newdialog.close().remove();
                        },
                        okValue: '确认',
                        ok: function() {
                            var postObj=   {"id":$('#admin_id').val(),"name":$('#admin_name').val(),"password":$('#admin_password').val(),"unit":$('#admin_unit').val(),"cell":$('#admin_cell').val(),"email":$('#admin_email').val()};
                            if($('#admin_id').val()==""||$('#admin_name').val()==""){
                                $dialog.alert("请填写相关信息"); 
                            }else{
                                $ajax.ajax({
                                url: requestUrl.addAdmin,
                                type: 'post',
                                dataType:'json',
                                data:postObj,
                                success: function (result) {
                                    if (result.statusCode == 200) {
                                        $dialog.alert("添加管理员成功",'success',function(){  newdialog.close().remove();getAllAdmins();});
                                    }
                                },
                                error:function(e){
                                    $dialog.alert("添加失败，"+e.message,'error');
                                }
                            });

                            }
                            
                        }
                    }).showModal();
                    $('#admin_unit').select2({minimumResultsForSearch: Infinity});
                });
                $('#btnDelAdmin',$page).off('click').on('click',function(){
                    $dialog.confirm({
                        title: '删除管理员',
                        content: '您确定要删除该管理员吗？',
                        ok: function(){
                            $ajax.ajax({
                                url: requestUrl.deleteAdmin,
                                type: 'get',
                                dataType:'json',
                                data:{"id":$('#tableAdmin tr.selected').attr('aid')},
                                success: function (result) {
                                    if (result.statusCode == 200) {
                                        $dialog.alert("删除成功",'success',function(){getAllAdmins();});
                                    }
                                },
                                error:function(e){
                                    $dialog.alert("删除失败",'error');
                                }
                            });
                        }
                    })
                });
                $(document).delegate('.addTable tr','click',function(){
                    $(this).parent().find('.selected').removeClass('selected');
                    $(this).addClass('selected');
                });
				$('#btnAddUser',$page).off('click').on('click',function(){
					var newdialog = $dialog({
						title: '添加用户 ',
						content: '<div class="addForm"><span>用户名</span><input id="add_uid"></div> <div class="addForm"><span>姓名</span><input id="add_name" maxlength="50"></div>'+
                        ' <div class="addForm"><span>警号</span><input id="add_internal" maxlength="50"></div><div class="addForm"><span>密码</span><input id="add_password"></div>'+
						'<div class="addForm"><span>邮箱</span><input id="add_email"></div><div class="addForm"><span>电话</span><input id="add_cell"></div><div class="addForm"><span>单位</span><select name="admin_unit" id="add_unit" class="select"> '+$('#a_unit').html()+'</select></div>',
						width: 400,
						cancelValue: '取消',
						cancel: function() {
							newdialog.close().remove();
						},
						okValue: '确认',
						ok: function() {
							var postObj={"user_id":$('#add_uid').val(),"name":$('#add_name').val(),"internal_id":$('#add_internal').val(),"email":$('#add_email').val(),"password":$('#add_password').val(),"cell":$('#add_cell').val(),"unit":$('#add_unit').val()};
							$ajax.ajax({
								url: requestUrl.addUser,
								type: 'post',
								dataType:'json',
								data:postObj,
								success: function (result) {
									if (result.statusCode == 200) {
										$dialog.alert("添加用户成功",function(){  newdialog.close().remove();loadUserList();});
									}
								},
								error:function(e){
                                    if (e.statusCode == 300)    $dialog.alert("用户名已经存在",'warning');
                                    else
                                        $dialog.alert("添加失败，"+e.message,'error');
								}
							});

						}
					}).showModal();
                    $('#add_unit').select2({minimumResultsForSearch: Infinity});

				});
				$('#tableUser',$page).off('click','.btn-del').on('click','.btn-del',function(){
                    var uid=$(this).parents('tr').attr('uid');
                    $dialog.confirm({
                        title: '删除用户',
                        content: '您确定要删除该用户吗？',
                        ok: function(){
                            $ajax.ajax({
                                url: requestUrl.deleteUser,
                                type: 'post',
                                dataType:'json',
                                data:{"user_id":uid},
                                success: function (result) {
                                    if (result.statusCode == 200) {
                                        $dialog.alert("删除用户成功",'success',function(){  loadUserList();  $('#tableUser tbody tr:first').click();});
                                    }
                                },
                                error:function(e){
                                    $dialog.alert("删除失败",'error');
                                }
                            });
                        }
                    });

				});
			}
			var ini=function(){
			 	loadUserList();
				getAllGroups();
                getAllUnit();
                getAllAdmins();
				addEvent();
                $('#tableUser tbody tr:first').click();
                $('#tableGroup tbody tr:first').click();
                $('#tableUnit tbody tr:first').click();
                $('#tableAdmin tbody tr:first').click();
			};
			ini();

            checkModule.init($(".d_form" ,$page)[0]);

    	});
    }
    
    
    return {
    	init: initPage
    }
});