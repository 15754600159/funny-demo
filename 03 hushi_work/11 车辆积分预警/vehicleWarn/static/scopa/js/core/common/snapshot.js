define("scopa/core/common/snapshot",["common/user"],function(a){var b={get:mining.baseurl.core+"/snapshot/load",save:mining.baseurl.core+"/snapshot/save",share:mining.baseurl.core+"/snapshot/shareProject",push:mining.baseurl.core+"/snapshot/pushProject",delPic:mining.baseurl.core+"/snapshot/delete",del:mining.baseurl.core+"/snapshot/deleteProject",thumbnail:mining.baseurl.core+"/snapshot/getThumbnail",checkname:mining.baseurl.core+"/snapshot/nameExists",sharePic:mining.baseurl.core+"/snapshot/share",pushPic:mining.baseurl.core+"/snapshot/push",update:mining.baseurl.core+"/snapshot/update",getSpecial:mining.baseurl.core+"/snapshot/getIdByUniqueVersion",getalltheme:mining.baseurl.core+"/judgeTheme/getAll",updatetheme:mining.baseurl.core+"/judgeTheme/update",savetheme:mining.baseurl.core+"/judgeTheme/insert"},c=function(a){var c=$.extend({id:"",success:null,error:null},a);mining.utils.isEmpty(c.id)||$ajax.ajax({url:b.get,data:{sid:c.id},success:function(a){a.graphData&&"string"==typeof a.graphData&&(a.graphData=JSON.parse(a.graphData)),!mining.utils.isEmpty(c.success)&&$.isFunction(c.success)&&c.success.call(this,a)},error:function(a){mining.utils.alertMsg(a,"获取快照信息失败，请稍后重试","error"),!mining.utils.isEmpty(c.error)&&$.isFunction(c.error)&&c.error.call(this,a)}})},d=function(a){var c,d,e=$.extend({graph:null,title:"保存快照",data:null,auto:!1,success:null,error:null},a),f=mining.utils.localStorage(mining.localname.snapshotProject);if(mining.utils.isEmpty(e.graph))mining.utils.isEmpty(e.data)||(c="string"==typeof e.data.graphData?e.data.graphData:JSON.stringify(e.data.graphData),d=e.data.thumbnail);else{if(e.graph.nodes().length<1)return;var g=e.graph.json(),c={data:{e:[],v:[]},params:{position:{},locked:[],zoom:1,pan:{x:0,y:0}}},h={};g.elements.nodes&&$.each(g.elements.nodes,function(a,b){c.data.v.push(b.data.data),c.params.position[b.data.id]=b.position,b.locked&&c.params.locked.push(b.data.id)}),g.elements.edges&&$.each(g.elements.edges,function(a,b){c.data.e.push(b.data.data)}),c.params.zoom=g.zoom,c.params.pan=g.pan,e.graph.zoom(.51);var d=e.graph.png({maxWidth:380,maxHeight:350,full:!0})}if(!mining.utils.isEmpty(c)&&!mining.utils.isEmpty(d)){if(e.auto){var i="autosave";return getSpecial(i,function(a){var f=b.save,h="自动保存快照_"+moment().format("YYYY-MM-DD HH:mm:ss"),j={name:h,description:"",status:3,user_id:mining.userinfo.user_id,type:0,thumbnail:d,graphData:JSON.stringify(c),uniqueVersion:i};mining.utils.isEmpty(a)||(f=b.update,j.id=a[0]),$ajax.ajax({url:f,type:"post",data:j,success:function(){console.log("%cSuccess:自动保存快照成功！","color:green");try{3==j.status?scopaConfig.pages.cooperation.getPrivateSnapshot():(scopaConfig.pages.cooperation.getCooperationDataCounts(),scopaConfig.pages.cooperation.photosAbord())}catch(a){}},error:function(){console.log("%cError:自动保存快照失败！","color:#ff0000")},complete:function(){mining.utils.isEmpty(e.graph)||e.graph.zoom(g.zoom)}})}),void 0}$dialog({title:e.title,width:600,onshow:function(){var a=this,c=$(this.node),e=[];$(".main").addClass("blur"),c.addClass("saveSnapshot"),a.content(['<div class="col-sm-4 nopadding">','<div class="snapshotimg"><img src="'+d+'"><span class="selectbtn"></span></div>',"</div>",'<form class="form-horizontal required-validate col-sm-8 nopadding infobox">','<div class="form-group">','<label class="col-sm-3 control-label">研判主题：</label>','<div class="col-sm-9 nopadding">','<select name="themename" class="form-control" placeholder="请填选中..."></select>','<input type="text" name="newname" class="form-control newtheme" placeholder="请填写名称...">',"</div>","</div>",'<div class="form-group themedesc" style="display:none;">','<label class="col-sm-3 control-label">主题描述：</label>','<div class="col-sm-9 nopadding">','<textarea name="themedesc" class="form-control" maxlength="120" placeholder="请填写描述..." style="height:74px;"></textarea>',"</div>","</div>",'<div class="form-group">','<label class="col-sm-3 control-label">快照名称：</label>','<div class="col-sm-9 nopadding">','<input type="text" name="snapname" maxlength="50" class="form-control required" placeholder="请填写名称...">',"</div>","</div>",'<div class="form-group">','<label class="col-sm-3 control-label">快照描述：</label>','<div class="col-sm-9 nopadding">','<textarea name="snapdesc" class="form-control" maxlength="120" placeholder="请填写描述..." style="height:74px;"></textarea>',"</div>","</div>","</form>"].join(""));var g=[];$ajax.ajax({url:b.getalltheme,success:function(a){a&&a.listObj&&(e=e.concat(a.listObj)),i()},error:function(){i()}});var i=function(){$.each(e,function(a,b){b.id&&b.name&&(g.push('<option value="'+b.id+'">'+b.name+"</option>"),h[b.id]=b.name)}),$("[name=themename]",c).html(['<optgroup label="自定义">','<option value="personal">仅自己可见</option>','<option value="newtheme">新建研判主题</option>',"</optgroup>",'<optgroup label="已有研判主题">',g.join(""),"</optgroup>"].join("")).select2().on("change",function(){var a=$(this).select2("val"),b="";"personal"==a?($(".themedesc",c).slideUp("fast"),$(".newtheme",c).hide(),$(this).removeClass("required")):("newtheme"==a?($(".newtheme",c).show(),$(this).addClass("required")):($(".newtheme",c).hide(),b=h[$(this).select2("val")],$(this).removeClass("required")),$("[name=themedesc]",c).val(b),$(".themedesc",c).slideDown("fast"))}),f&&(f.judgeThemeId&&h[f.judgeThemeId]&&($("[name=themename]",c).select2("val",f.judgeThemeId),$("[name=themedesc]",c).val(h[f.judgeThemeId])),1==f.status&&$(".themedesc",c).slideDown("fast"),$("[name=snapname]",c).val(f.name),$("[name=snapdesc]",c).val(f.description))};$("[name=newname],[name=themedesc],[name=snapname],[name=snapdesc]",c).on("focus",function(){$(this).removeClass("error")});var j=$(".snapshotimg img",c),k=j.width(),l=j.height(),m=j.parent().width(),n=j.parent().height();m/n>k/l?j.css("height","100%"):j.css("width","100%")},okValue:"确定",ok:function(){var a=this,g=$(this.node),i=$("[name=themename]",g).select2("data").text,j=$("[name=newname]",g).val().replaceAll(" ",""),k=$("[name=themedesc]",g).val().trim(),l={name:$("[name=snapname]",g).val().replaceAll(" ",""),description:$("[name=snapdesc]",g).val().trim(),status:1,user_id:mining.userinfo.user_id,judgeThemeId:$("[name=themename]",g).select2("val"),type:0,thumbnail:d,graphData:JSON.stringify(c)};if(mining.utils.isEmpty(l.name)&&$("[name=snapname]",g).addClass("error"),"newtheme"==l.judgeThemeId&&mining.utils.isEmpty(j)&&$("[name=newname]",g).addClass("error"),$(".error",g).size()>0)return!1;var m=function(c){mining.utils.isEmpty(c)?delete l.judgeThemeId:l.judgeThemeId=c;var d=b.save;f&&f.name==l.name&&(d=b.update,l.id=f.id),$ajax.ajax({url:d,type:"post",data:l,success:function(b){a.close().remove(),$dialog.alert(e.title+"成功！","success"),!mining.utils.isEmpty(e.success)&&$.isFunction(e.success)&&e.success.call(this,b);try{3==l.status?scopaConfig.pages.cooperation.getPrivateSnapshot():(scopaConfig.pages.cooperation.getCooperationDataCounts(),scopaConfig.pages.cooperation.photosAbord())}catch(c){}mining.utils.serverLog(22,i+"-"+l.snapname)},error:function(a){mining.utils.alertMsg(a,e.title+"失败，请稍后重试","error"),!mining.utils.isEmpty(e.error)&&$.isFunction(e.error)&&e.error.call(this,a)}})};return"newtheme"==l.judgeThemeId?$ajax.ajax({url:b.savetheme,type:"post",data:{name:j,description:k,author:l.user_id},success:function(a){m(a.obj)},error:function(a){mining.utils.alertMsg(a,"创建研判主题失败，请稍后重试","error"),!mining.utils.isEmpty(e.error)&&$.isFunction(e.error)&&e.error.call(this,data)}}):"personal"==l.judgeThemeId?(l.status=3,m()):k!=h[l.judgeThemeId]?$ajax.ajax({url:b.updatetheme,type:"post",data:{id:l.judgeThemeId,name:i,description:k},success:function(){m(l.judgeThemeId)},error:function(a){mining.utils.alertMsg(a,"更新研判主题失败，请稍后重试","error"),!mining.utils.isEmpty(e.error)&&$.isFunction(e.error)&&e.error.call(this,data)}}):m(l.judgeThemeId),!1},cancelValue:"取消",cancel:!0,onclose:function(){$(".main").removeClass("blur"),mining.utils.isEmpty(e.graph)||e.graph.zoom(g.zoom)}}).showModal()}};window.getSpecial=function(a,c){a=a||"autosave",$ajax.ajax({url:b.getSpecial,data:{label:a},success:function(a){var b=[];a.listObj&&(b=a.listObj),!mining.utils.isEmpty(c)&&$.isFunction(c)&&c.call(this,b)},error:function(){}})};var e=function(a){var c=$.extend({id:"",title:"删除快照集",success:null,error:null},a);mining.utils.isEmpty(c.id)||$dialog.confirm({title:c.title,content:'您确定要&nbsp;<b class="red">删除该快照集</b>&nbsp;吗？',ok:function(){var a=this;return $ajax.ajax({url:b.del,data:{name:c.id},success:function(a){$dialog.alert(c.title+"成功！","success"),!mining.utils.isEmpty(c.success)&&$.isFunction(c.success)&&c.success.call(this,a)},error:function(a){mining.utils.alertMsg(a,c.title+"失败，请稍后重试","error"),!mining.utils.isEmpty(c.error)&&$.isFunction(c.error)&&c.error.call(this,a)},complete:function(){a.close().remove()}}),!1}})},f=function(a){var c=$.extend({id:"",title:"删除快照",success:null,error:null},a);mining.utils.isEmpty(c.id)||$dialog.confirm({title:c.title,content:'您确定要&nbsp;<b class="red">删除该快照</b>&nbsp;吗？',ok:function(){var a=this;return $ajax.ajax({url:b.delPic,data:{sid:c.id},success:function(a){$dialog.alert(c.title+"成功！","success"),!mining.utils.isEmpty(c.success)&&$.isFunction(c.success)&&c.success.call(this,a)},error:function(a){mining.utils.alertMsg(a,c.title+"失败，请稍后重试","error"),!mining.utils.isEmpty(c.error)&&$.isFunction(c.error)&&c.error.call(this,a)},complete:function(){a.close().remove()}}),!1}})},g=function(a){var b=$.extend({id:"",title:"打开快照",success:null,error:null},a);if(!mining.utils.isEmpty(b.id)){var d="";$dialog({title:"研判-图析",content:'<span class="artui-dialog-confirm"></span><span>是否清空图析已有分析结果？</span>',button:[{value:"是",callback:function(){d="open"},autofocus:!0},{value:"否",callback:function(){d="import"}},{value:"取消"}],onclose:function(){mining.utils.isEmpty(d)||c({id:b.id,success:function(a){mining.utils.localStorage(mining.localname.graphSnapshot,{graph:a.obj.graphData,action:d}),a.obj.user_id!=mining.userinfo.user_id||1!=a.obj.status&&3!=a.obj.status||a.obj.type&&1!=a.obj.type||mining.utils.localStorage(mining.localname.snapshotProject,a.obj),mining.utils.hashChange("graph")}})}}).showModal()}},h=function(a){var b=$.extend({id:"",title:"导入快照",success:null,error:null},a);mining.utils.isEmpty(b.id)||c({id:b.id,success:function(a){mining.utils.localStorage(mining.localname.graphSnapshot,{graph:a.graphData,action:"import"}),mining.utils.hashChange("graph")}})},i=function(a){var c=$.extend({id:"",title:"分享快照集",success:null,error:null},a);mining.utils.isEmpty(c.id)||$dialog.confirm({title:c.title,content:'您确定要&nbsp;<b class="red">分享该快照集</b>&nbsp;吗？',ok:function(){var a=this;return $ajax.ajax({url:b.share,data:{name:c.id},success:function(a){$dialog.alert(c.title+"成功！","success"),!mining.utils.isEmpty(c.success)&&$.isFunction(c.success)&&c.success.call(this,a)},error:function(a){mining.utils.alertMsg(a,c.title+"失败，请稍后重试","error"),!mining.utils.isEmpty(c.error)&&$.isFunction(c.error)&&c.error.call(this,a)},complete:function(){a.close().remove()}}),!1}})},j=function(a){var c=$.extend({id:"",title:"分享快照",success:null,error:null},a);mining.utils.isEmpty(c.id)||$dialog.confirm({title:c.title,content:'您确定要&nbsp;<b class="red">分享该快照</b>&nbsp;吗？',ok:function(){var a=this;return $ajax.ajax({url:b.sharePic,data:{sid:c.id},success:function(a){$dialog.alert(c.title+"成功！","success"),!mining.utils.isEmpty(c.success)&&$.isFunction(c.success)&&c.success.call(this,a)},error:function(a){mining.utils.alertMsg(a,c.title+"失败，请稍后重试","error"),!mining.utils.isEmpty(c.error)&&$.isFunction(c.error)&&c.error.call(this,a)},complete:function(){a.close().remove()}}),!1}})},k=function(c){var d=$.extend({id:"",title:"推送快照集",thumbnail:"",success:null,error:null},c);mining.utils.isEmpty(d.id)||$dialog({title:!1,width:660,padding:0,onshow:function(){var c=this,e=$(this.node);$(".main").addClass("blur"),e.addClass("saveSnapshot"),c.content(['<div class="col-sm-4 imgbox" style="height:360px;">','<div class="title">快照预览</div>','<div class="snapshotimg" style="margin-top:80px;"><img src="'+d.thumbnail+'" style="max-width:100%;max-height:100%"><span class="selectbtn"></span></div>',"</div>",'<form class="form-horizontal required-validate col-sm-8 nopadding infobox">','<div class="title">'+d.title+'<span class="closebtn">×</span></div>','<div class="form-group">','<label class="col-sm-3 control-label">推送类型</label>','<div class="col-sm-8">','<select name="type" style="width:280px" placeholder="请选择...">',"<option></option>",'<option value="2">推送到用户</option>','<option value="3">推送到群组</option>',"</select>","</div>","</div>",'<div class="form-group">','<label class="col-sm-3 control-label">推送对象</label>','<div class="col-sm-8">','<input type="text" name="tid" style="width:280px" placeholder="请选择..."></input>',"</div>","</div>",'<div class="form-group">','<label class="col-sm-3 control-label">推送理由</label>','<div class="col-sm-8">','<textarea name="comment" class="form-control" maxlength="200" placeholder="请填写理由..." style="height:100px;"></textarea>',"</div>","</div>",'<button type="button" class="cancelbtn">取消</button>','<button type="button" class="submitbtn">确定</button>',"</form>"].join("")),$("[name=type]",e).select2({dropdownCssClass:"artui-select2"}).on("change",function(){var b=a("common/user");"2"==$(this).val()?b.getalluser({success:function(a){var b=[];$.each(a,function(a,c){c.user_id!=mining.userinfo.user_id&&b.push({id:c.user_id,text:c.name})}),$("[name=tid]",e).select2({data:b,dropdownCssClass:"artui-select2"}).select2("val",b[0].id)}}):b.getallgroup({success:function(a){var b=[];$.each(a,function(a,c){b.push({id:c.user_gid,text:c.name})}),$("[name=tid]",e).select2({data:b,dropdownCssClass:"artui-select2"}).select2("val",b[0].id)}})}).on("select2-open",function(){$(this).siblings("label.error").remove()}),$("[name=tid]",e).select2({data:[],dropdownCssClass:"artui-select2"}),$(".submitbtn",e).on("click",function(){$ajax.ajax({url:b.push,type:"post",data:{name:d.id,fid:mining.userinfo.user_id,type:$("[name=type]",e).val(),tid:$("[name=tid]",e).val(),comment:$("[name=comment]",e).val()},success:function(a){c.close().remove(),$dialog.alert(d.title+"成功！","success"),!mining.utils.isEmpty(d.success)&&$.isFunction(d.success)&&d.success.call(this,a)},error:function(a){mining.utils.alertMsg(a,d.title+"失败，请稍后重试","error"),!mining.utils.isEmpty(d.error)&&$.isFunction(d.error)&&d.error.call(this,a)}})}),$(".closebtn,.cancelbtn",e).on("click",function(){c.close().remove()})},onclose:function(){$(".main").removeClass("blur")}}).showModal()},l=function(c){var d=$.extend({id:"",title:"推送快照集",thumbnail:"",success:null,error:null},c);mining.utils.isEmpty(d.id)||$dialog({title:!1,width:660,padding:0,onshow:function(){var c=this,e=$(this.node);$(".main").addClass("blur"),e.addClass("saveSnapshot"),c.content(['<div class="col-sm-4 imgbox" style="height:360px;">','<div class="title">快照预览</div>','<div class="snapshotimg" style="margin-top:80px;"><img src="'+d.thumbnail+'" height="100"><span class="selectbtn"></span></div>',"</div>",'<form class="form-horizontal required-validate col-sm-8 nopadding infobox">','<div class="title">'+d.title+'<span class="closebtn">×</span></div>','<div class="form-group">','<label class="col-sm-3 control-label">推送类型</label>','<div class="col-sm-8">','<select name="type" style="width:280px" placeholder="请选择...">',"<option></option>",'<option value="0">推送到用户</option>','<option value="1">推送到群组</option>',"</select>","</div>","</div>",'<div class="form-group">','<label class="col-sm-3 control-label">推送对象</label>','<div class="col-sm-8">','<input type="text" name="tid" style="width:280px" placeholder="请选择..."></input>',"</div>","</div>",'<div class="form-group">','<label class="col-sm-3 control-label">推送理由</label>','<div class="col-sm-8">','<textarea name="comment" class="form-control"  maxlength="200" placeholder="请填写理由..." style="height:100px;"></textarea>',"</div>","</div>",'<button type="button" class="cancelbtn">取消</button>','<button type="button" class="submitbtn">确定</button>',"</form>"].join("")),$("[name=type]",e).select2({dropdownCssClass:"artui-select2"}).on("change",function(){var b=a("common/user");"0"==$(this).val()?b.getalluser({success:function(a){var b=[];$.each(a,function(a,c){c.user_id!=mining.userinfo.user_id&&b.push({id:c.user_id,text:c.name})}),$("[name=tid]",e).select2({data:b,dropdownCssClass:"artui-select2"}).select2("val",b[0].id)}}):b.getallgroup({success:function(a){var b=[];$.each(a,function(a,c){b.push({id:c.user_gid,text:c.name})}),$("[name=tid]",e).select2({data:b,dropdownCssClass:"artui-select2"}).select2("val",b[0].id)}})}).on("select2-open",function(){$(this).siblings("label.error").remove()}),$("[name=tid]",e).select2({data:[],dropdownCssClass:"artui-select2"}),$(".submitbtn",e).on("click",function(){$ajax.ajax({url:b.push,type:"post",data:{sid:d.id,fid:mining.userinfo.user_id,type:$("[name=type]",e).val(),tid:$("[name=tid]",e).val(),comment:$("[name=comment]",e).val()},success:function(a){c.close().remove(),$dialog.alert(d.title+"成功！","success"),!mining.utils.isEmpty(d.success)&&$.isFunction(d.success)&&d.success.call(this,a)},error:function(a){mining.utils.alertMsg(a,d.title+"失败，请稍后重试","error"),!mining.utils.isEmpty(d.error)&&$.isFunction(d.error)&&d.error.call(this,a)}})}),$(".closebtn,.cancelbtn",e).on("click",function(){c.close().remove()})},onclose:function(){$(".main").removeClass("blur")}}).showModal()},m=function(a){var c=$.extend({id:"",title:"获取快照缩略图",success:null,error:null},a);mining.utils.isEmpty(c.sid)||$ajax.ajax({url:b.thumbnail,data:{sid:c.sid},success:function(a){mining.utils.isEmpty(a.result)?!mining.utils.isEmpty(c.error)&&$.isFunction(c.error)&&c.error.call(this,a):!mining.utils.isEmpty(c.success)&&$.isFunction(c.success)&&c.success.call(this,a.result)},error:function(a){seajs.log(c.title+"失败，请稍后重试"),!mining.utils.isEmpty(c.error)&&$.isFunction(c.error)&&c.error.call(this,a)}})};return{get:c,save:d,del:e,delPic:f,open:g,"import":h,share:i,sharePic:j,push:k,pushPic:l,thumbnail:m}});
