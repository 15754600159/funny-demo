define("scopa/common/init",["./utils","common/user","./serverlog","base64","core/common/showelement","core/common/snapshot","./config","./mapping","./schema","./harts","select2","moment","easing","scrollbar"],function(a){a("./utils"),a("./config"),a("./mapping"),a("select2"),a("moment"),a("easing"),a("scrollbar"),mining.ajaxTimeout=mining.utils.loadLogin;var b=0,c=setInterval(function(){var a=$('head link[href="http://10.25.1.234/PGIS_S_TileMap/css/EzServer.css"]');(a.size()>0||b>6e4)&&(clearInterval(c),a.remove()),b+=500},500);$.extend(mining,{localdata:{dataset:{},getdata:function(){return{data:mining.utils.localStorage(mining.localname.localdata)||{},count:mining.utils.localStorage(mining.localname.localdatacount)||{}}},setdata:function(a){mining.localdata.dataset=a.data,mining.utils.localStorage(mining.localname.localdata,a.data),mining.utils.localStorage(mining.localname.localdatacount,a.count)},get:function(a){return mining.localdata.dataset[a]},add:function(a){$.isArray(a)||(a=[a]);var b=mining.localdata.getdata();$.each(a,function(a,c){if(c&&(c.gid||c.id)){var d=c.gid||c.id;b.data[d]?b.count[d]++:b.count[d]=1,b.data[d]=c}}),mining.localdata.setdata(b)},del:function(a){$.isArray(a)||(a=[a]);var b=mining.localdata.getdata();$.each(a,function(a,c){if(c&&(c.gid||c.id)){var d=c.gid||c.id;b.count[d]&&b.count[d]--,b.count[d]<=0&&(delete b.data[d],delete b.count[d])}}),mining.localdata.setdata(b)}}}),mining.localdata.dataset=mining.localdata.getdata().data,$(function(){mining.mappingutils.get(),$(document).on("click",".navbar .logout",function(){$ajax.ajax({url:mining.baseurl.pass+"/logout",success:function(){mining.utils.clearLocalData(),mining.utils.gotoUrl("index.html")},error:function(a){mining.utils.alertMsg(a,"登出失败，请稍后重试！","error")}}),mining.utils.serverLog(3,-1!=window.location.href.indexOf("core.html")?"core":"console")})})});
