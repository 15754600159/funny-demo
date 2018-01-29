/**
 * @name graphChart
 * @class 提供关系图分析相关功能。
 * @requires cytoscape, cytoscape-navigator, cytoscape-panzoom
 */

/**
 * @name graphChart#init
 * @function   
 * @desc 初始化关系图。
 * @param {Object} options
 * @example
 * define(function(require) {
 *     $(function() {
 *         var graph, graphModule = new (require('core/common/graphchart/graphchart'))();
 * 
 *         graphModule.init({
 *     	       container: $('#graphChart', $page),	//必填
 *     	       layout: 'circle',
 *     	       elements: {nodes:[]},
 *     	       zoom: 1,
 *     	       minZoom: 0.1,
 *     	       maxZoom: 6,
 *     	       animate: 300,
 *     	       snapshot: false, //是否检测快照
 *     	       navigator: false, //是否支持导航控件
 *     	       panzoom: false,	//是否支持缩放控件
 *     	       
 *     	       //三级缩放控制
 *     	       zoombig: 1,
 *     	       zoomnormal: 0.5,
 *     	       zoomsmall: 0.2,
 *     	       
 *     	       //回调方法
 *     	       eventchart: null,
 *     	       noteschart: null,
 *     	       readyCallback: function(){
 * 					graph = this;
 *     	       },
 *     	       dataCallback: null,
 *     	       selectCallback: null,
 *     	       resizeCallback: null,
 *     	       clickCallback: null,
 *     	       dblclickCallback: null
 *         });
 *     });
 * });
 */

/**
 * @name graphChart#snapshot
 * @function   
 * @desc 初始化快照。
 * @param 无
 */

/**
 * @name graphChart#refresh
 * @function   
 * @desc 刷新图数据。
 * @param {Bollean} fromhistory - 是否从历史记录中获取，默认false
 * @example
 * define(function(require) {
 *     $(function() {
 *         graphModule.refresh();
 *     });
 * });
 */

/**
 * @name graphChart#appenddata
 * @function   
 * @desc 添加数据。
 * @param {Object, Bollean} data - 点边数据, selected - 是否选中，默认true
 * @example
 * 	graphModule.appenddata({v:[], e:[]});
 */

/**
 * @name graphChart#layout
 * @function   
 * @desc 切换布局。
 * @param {String} name - 布局名称，必填，可选： auto | grid | circle | breadthfirst | concentric
 * @example
 * 	graphModule.layout('auto');
 */

/**
 * @name graphChart#delelements
 * @function   
 * @desc 删除画布元素。
 * @param {String} selector - 选择器，默认'all'，可选：all | :selected | :unselected ...
 * @example
 * 	graphModule.delelements(':selected');
 */

/**
 * @name graphChart#timefilter
 * @function   
 * @desc 时间筛选。
 * @param {Array, Array, Array} range - 时间范围数组 range[0]为起始时间 range[1]为截止时间, checkedLabel - 被选中label数组, uncheckLabel - 未选中label数组
 * 
 * 	图析Timeline交互高亮规则可参考http://confluence.mininglamp.com/pages/viewpage.action?pageId=6196601
 */

/**
 * @name graphChart#labelfilter
 * @function   
 * @desc 类别筛选。
 * @param {Array} labels - 被选中的label数组
 */

/**
 * @name graphChart#adjustzoom
 * @function   
 * @desc 调整画布到展示所有元素。
 * @param 无
 */

/**
 * @name graphChart#closeentity
 * @function   
 * @desc 实体回收。即删除相邻实体中只有1度关系的实体。
 * @param {Object} eles - 画布元素
 * @example
 * 	graphModule.closeentity(graph.$('.new'));
 */

/**
 * @name graphChart#history
 * @function   
 * @desc 显示关系图历史记录。
 * @param {String} type - 操作类型，默认值'backward'，可选：forward | backward | final
 */

/**
 * @name graphChart#getnodedata
 * @function   
 * @desc 格式化实体数据为关系图点数据。
 * @param {Object, Object, Bollean} data - 实体数据 属性键值对, nodepos - 画布坐标 默认{x:100, y:100}, selected - 是否被选中 默认false
 */

/**
 * @name graphChart#getedgedata
 * @function   
 * @desc 格式化实体数据为关系图点数据。
 * @param {Object, Bollean} data - 实体数据 属性键值对, selected - 是否被选中 默认false
 */

/**
 * @name graphChart#showphoto
 * @function   
 * @desc 显示实体照片。
 * @param {Bollean} param - 是否显示 默认false
 */

/**
 * @name graphChart#updateicon
 * @function   
 * @desc 显示标签图标。
 * @param {Bollean} param - 是否显示 默认true
 */
define("scopa/core/common/graphchart/graphchart",["cytoscape","cytoscape-navigator","cytoscape-panzoom","cytoscape-qtip","cytoscape-ngraph-forcelayout","cytoscape-navigatorcss","cytoscape-panzoomcss","./config/layout","./config/style","jqueryui","./config/polayout"],function(a,b,c){var d=a("cytoscape"),e=a("cytoscape-navigator"),f=a("cytoscape-panzoom"),d=a("cytoscape"),g=a("cytoscape-qtip"),h=a("cytoscape-ngraph-forcelayout");a("cytoscape-navigatorcss"),a("cytoscape-panzoomcss"),e(d,$),f(d,$),g(d,$),h(d),c.exports=function(){var b,c,e,f,g,h={container:$("#graphChart"),layout:"circle",elements:{nodes:[]},zoom:1,minZoom:.1,maxZoom:6,animate:300,snapshot:!1,navigator:!1,panzoom:!1,shownormal:!1,readyCallback:null,selectCallback:null,resizeCallback:null,clickCallback:null,dblclickCallback:null,dataCallback:null,zoombig:1,zoomnormal:.5,zoomsmall:.2,eventchart:null,noteschart:null},i=[],j=a("./config/layout"),k=a("./config/style"),l=null,m=function(b){var c=$.extend(h,b),e="string"==typeof c.container?$(c.container):c.container;if(!(e.size()<1)){if(!mining.utils.isEmpty(l))return l;if(h.snapshot){var f=mining.utils.clone(k);k=[],$.each(f,function(a,b){"edge"==b.selector&&(b.css["text-background-color"]="#f6f7f9"),"node"==b.selector&&(b.css["background-clip"]="none",b.css["background-width"]="68px",b.css["background-height"]="68px",b.css.width="70px",b.css.height="70px",b.css.border="0"),k.push(b)})}if(l=d({container:e[0],elements:c.elements,style:k,layout:$.extend({},j[c.layout],{animate:!1}),ready:function(){l=this,this.show_photo=!1,this.show_note=!0,l.elements().length>0?l.animate({zoom:c.zoom,pan:{x:0,y:0}},{duration:c.animate}):l.zoom(1),mining.utils.isEmpty(c.elements)||F(),c.readyCallback&&c.readyCallback.call(this,l),c.snapshot&&B(!0)},zoom:c.minZoom,pan:{x:e.width()/2,y:e.height()/2},minZoom:c.minZoom,maxZoom:c.maxZoom,zoomingEnabled:!0,userZoomingEnabled:!0,panningEnabled:!0,userPanningEnabled:!0,boxSelectionEnabled:!1,selectionType:"single",touchTapThreshold:8,desktopTapThreshold:4,autolock:!1,autoungrabify:!1,autounselectify:!1,headless:!1,styleEnabled:!0,hideEdgesOnViewport:!1,hideLabelsOnViewport:!0,textureOnViewport:!1,motionBlur:!1,motionBlurOpacity:.2,wheelSensitivity:.25,pixelRatio:1,initrender:function(){},renderer:{}}),c.navigator){var g=e.height()-160,i=e.width()-220;e.after('<div class="graphnavigator box-shadow" style="top:'+g+"px;left:"+i+'px;"><div class="cytoscape-navigator"></div><div class="cytoscape-navigatorTitle">导航器</div></div>');var m=e.siblings(".graphnavigator");l.navigator({container:$(".cytoscape-navigator"),viewLiveFramerate:0,thumbnailEventFramerate:30,thumbnailLiveFramerate:!1,dblClickDelay:200,removeCustomContainer:!0,rerenderDelay:100}),a("jqueryui"),m.draggable({handle:".cytoscape-navigatorTitle",opacity:.6,containment:"parent"}),mining.utils.winResize({name:function(){m.animate({top:e.height()-160,left:e.width()-220},10)}},!1),$(".page-graph .graphnavigator").on("mouseup",function(){mining.utils.serverLog(28)})}if(c.panzoom){var n={zoomFactor:.05,zoomDelay:45,minZoom:c.minZoom,maxZoom:c.maxZoom,fitPadding:50,panSpeed:1,panDistance:10,panDragAreaSize:75,panMinPercentSpeed:.25,panInactiveArea:8,panIndicatorMinOpacity:.5,autodisableForMobile:!0,sliderHandleIcon:"ui-cytoscape-panzoom-minus",zoomInIcon:"ui-cytoscape-panzoom-plus",zoomOutIcon:"ui-cytoscape-panzoom-minus",resetIcon:"ui-cytoscape-panzoom-full"};l.panzoom(n),$(".page-graph .cy-panzoom").on("mouseup",function(){mining.utils.serverLog(27)})}l.on("zoom",function(){o()}),l.on("mousedown",function(){$("#graphChart").addClass("mousedown")}),l.on("pan",function(){}),l.on("mouseup",function(){$("#graphChart").removeClass("mousedown"),setTimeout(function(){l.boxSelectionEnabled()&&scopa_timelineaction&&l.$(".nofilter:selected").unselect()},200)}),l.on("resize",function(){window.SCOPA_ChartResize_timer_run||h.resizeCallback&&h.resizeCallback.call()});var p,q=!1;l.on("click",function(){return clearTimeout(p),q&&h.dblclickCallback?(h.dblclickCallback.call(),q=!1,void 0):(q=!0,p=setTimeout(function(){q=!1},300),void 0)}),$(document).off("keydown.graphchart").on("keydown.graphchart",function(a){a.keyCode==mining.keyCode.SHIFT&&l.boxSelectionEnabled(!0)}),$(document).off("keyup.graphchart").on("keyup.graphchart",function(a){a.keyCode==mining.keyCode.SHIFT&&(l.boxSelectionEnabled(!1),l.userPanningEnabled(!0))})}},n=300,o=function(){window.scopa_snapshotaction||(clearTimeout(b),b=setTimeout(p,n))},p=function(){if(!(l.elements().length>mining.graphMaxMnu/3)){var a=l.zoom();a>h.zoombig?l.elements().addClass("showbigger").removeClass("shownormal showsmall hidtxt hidicon"):a>=h.zoomnormal?l.elements().addClass("shownormal").removeClass("showbigger showsmall hidtxt hidicon"):a>=h.zoomsmall?l.elements().addClass("shownormal hidtxt").removeClass("showbigger showsmall hidicon"):l.elements().addClass("showsmall hidtxt hidicon").removeClass("showbigger shownormal")}},q=function(a){var b=[];return b.push(mining.mappingutils.getType(a),a.label,mining.mappingutils.getName(a)),a.class&&b.push(a.class),"person"==a.label&&"女"==a.PERSON_xb&&b.push("women"),"custom"==a.specificType&&b.push("new"),b.join(" ")},r=function(a,b){var c=mining.mappingutils.getShowlabel(a,b),d=[];return $.each(c,function(a,b){d.push(b.value)}),d.join("\n")},s=function(a,b,c){var d=r(a),e=window.SCOPA_GraphChart_AddMore?d:r(a,"show_bigger"),f=mining.mappingutils.getGraphIcon(a),g=q(a),h=!1;return"熊大"==a.PERSON_xm&&(a.photoUrl=staticUrl+"/scopa/images/core/xd.png"),"person"!=a.label||"non_cri_person"!=a.type&&"non_eventful_person"!=a.type||(f=f.replace("/graphicon/","/graphicon/special/")),a.etype=a.etype?a.etype:mining.mappingutils.getType(a)||"entity",i.length>0&&-1!=i.indexOf(a.gid.toString())&&(f=f.replace(".png","_noted.png"),h=!0,g+=" noted"),{group:"nodes",data:{id:String(a.gid),name:d,showbigger:mining.utils.isEmpty(e)?d:e,data:a,noted:h,etype:a.etype,image:f},position:b||{x:100,y:100},classes:g,selected:c||!1}},t=function(a,b){var c=r(a),d=window.SCOPA_GraphChart_AddMore?c:r(a,"show_bigger"),e=q(a);return a.etype=a.etype?a.etype:"relation",{group:"edges",data:{id:String(a.gid),source:String(a.from),target:String(a.to),data:a,etype:a.etype,event:mining.utils.isEmpty(a.showlabel)?c:a.showlabel,showbigger:mining.utils.isEmpty(d)?c:d},classes:e,selected:b}},u=0,v=(r_random=0,[]),w=function(a,b){window.SCOPA_GraphChart_AddMore=!1,u=l.elements().length;try{a.e&&(u+=a.e.length),a.v&&(u+=a.v.length)}catch(c){}u>mining.graphMaxMnu?$dialog.confirm({id:"appendDataDlg",title:"图析数据",content:"添加新数据后图析元素将多于 <b>"+mining.graphMaxMnu+"</b>，影响您的操作体验，您确定要继续添加吗？",ok:function(){mining.utils.isEmpty(a)||mining.utils.isEmpty(a.v)||(window.SCOPA_GraphChart_AddMore=!0,mining.utils.modalLoading(),setTimeout(function(){x(a,b)},10))},onshow:function(){mining.utils.modalLoading("close")}}):x(a,b)},x=function(b,c){if(u>4e3)return mining.utils.modalLoading("close"),void 0;u>500&&(mining.utils.modalLoading(),mining.utils.loadingMsg("绘制图析数据，请您稍等......"));var d=[],e=[],f={x:0,y:100},g=0,j=!0,k=[],m=null;if(i=[],j=b.v&&b.v.length>200?!1:!0,l.nodes().length>0)if(b.v){var n=!1;$.each(b.v,function(a,b){var c=l.$("#"+b.gid);return c.length>0&&c.selected()?(m=c,n=!0,!1):void 0}),!n&&b.e&&b.e.length>0&&l.$("#"+b.e[0].from).length>0&&(m=l.$("#"+b.e[0].from))}else m=l.$(":selected").length>0?l.$(":selected"):l.nodes()[0];m&&(f=m.position()),c=mining.utils.isEmpty(c)?!0:c,$.each(b.v,function(a,b){if(l.$("#"+b.gid).length<1){if(mining.utils.isEmpty(b.type))return k.push(b.gid),void 0;e.pushOnly(String(b.gid))}}),g=e.length;var o=mining.utils.clone(v);if($.each(l.nodes(),function(a,b){o.pushOnly(b.position())}),console.log(l.nodes().length+"   --  "+JSON.stringify(o)),v=[],v=a("./config/polayout").get({existpo:o,targetnodepo:f,newnodenum:g}),console.log(JSON.stringify(v)),b.v&&b.v.length>0&&h.noteschart&&h.noteschart.isNoted({dataIds:e,async:!1,callback:function(a){i=a.listObj}}),b.e&&$.each(b.e,function(a,b){if(b.etype=b.etype?b.etype:"relation",!("harts"!=b.label&&mining.utils.isEmpty(b.type)&&"event"!=b.etype||k.length&&(-1!=k.indexOf(b.from)||-1!=k.indexOf(b.to)))){if(c&&l.$("#"+b.gid).length>0)try{scopa_infosideaction=!0,l.$("#"+b.gid).select(),setTimeout(function(){scopa_infosideaction=!1},300)}catch(e){}"harts"==b.label&&mining.mappingutils.setRuleIds(b),d.push(t(b,c))}}),b.v){var p=[];$.each(b.v,function(a,b){var g=String(b.gid);if(-1!=p.indexOf(g)||-1==e.indexOf(g)||"harts"!=b.label&&mining.utils.isEmpty(b.type)){if(c)try{scopa_infosideaction=!0,l.$("#"+b.gid).select(),setTimeout(function(){scopa_infosideaction=!1},300)}catch(h){}}else nodepos=j?{x:f.x,y:f.y}:v.shift(),d.push(s(b,nodepos,c)),p.push(g)})}if(l.add(d),window.SCOPA_GraphChart_AddMore=!1,F(),l.$(".mouseover").removeClass("mouseover"),!j||e.length<1)return z(),void 0;for(var q=0,r=0;r<e.length;r++)l.$("#"+e[r]).animate({position:v[r]},{duration:300,complete:function(){q++,q==g&&z()}})},y=300,z=function(){clearTimeout(c),c=setTimeout(function(){setTimeout(function(){l.elements().length>mining.graphMaxMnu/3?l.fit():l.nodes().length<4?l.animate({zoom:1.1,center:!0},{duration:300}):l.animate({fit:{padding:60}},{duration:300})},1),h.snapshot&&mining.utils.saveGraphHistory(l)},y),Q(l.show_photo),T()},A=function(a){var b=[],c=[];return mining.utils.isEmpty(a)&&(a=l.nodes()),$.each(a,function(a,d){mining.utils.isEmpty(d.position())||(b.push(d.position().x),c.push(d.position().y))}),{x1:b.min(),y1:c.min(),x2:b.max(),y2:c.max()}},B=function(a){a=a||!1;var b=mining.utils.localStorage(mining.localname.graphSnapshot);return b?(mining.utils.localStorage(mining.localname.graphSnapshot,null),mining.utils.openGraphSnapshot(l,b.graph,b.action),o(),setTimeout(function(){mining.utils.saveGraphHistory(l),F()},300),void 0):(a&&mining.utils.openGraphHistory(l,"final",F),z(),o(),setTimeout(F,300),void 0)},C=-1,D=100,E=!1,F=function(a){return"select"==a?(h.selectCallback&&h.selectCallback.call(),mining.utils.modalLoading("close"),void 0):(o(),clearTimeout(e),e=setTimeout(function(){G(),h.dataCallback?h.dataCallback.call():mining.utils.modalLoading("close")},D),void 0)},G=function(){$.each(l.elements(),function(a,b){b.off("mouseover mouseout click select unselect lock unlock drag remove").on({mouseover:function(){b.addClass("mouseover")},click:function(a){window.event.ctrlKey&&setTimeout(function(){b.neighborhood().union(b).select()},10),h.clickCallback&&h.clickCallback.call(this,a);var c,d=b.data(),e=mining.mappingutils.getType(d.data);-1!=$.hash().indexOf("graph")?"entity"==e?c=48:"relation"==e&&(c=83):-1!=$.hash().indexOf("file")&&("entity"==e?c=442:"relation"==e&&(c=443)),c&&mining.utils.serverLog(c,mining.mappingutils.getTypeName(d.data)+" - "+(d.name||d.event))},mouseout:function(){b.removeClass("mouseover")},select:function(){E||-1!=C||(C=setTimeout(function(){H(),clearTimeout(C),C=-1},D))},unselect:function(){E||-1!=C||(C=setTimeout(function(){H(),clearTimeout(C),C=-1},D))},lock:function(){b.data().locked=!0,T(b)},unlock:function(){b.data().locked=!1,T(b)},drag:function(){},remove:function(){v=[],h.noteschart&&h.noteschart.close([b.data().data.gid])}})})},H=function(){if(window.scopa_infosideaction)return scopa_infosideaction=!1,void 0;E=!0;var a=l.elements(".needSelectArr");$.each(l.elements(":selected"),function(b,c){c.isNode()?c.hasClass("event")?a=a.add(c.connectedEdges(".event")):(a=a.add(c.connectedEdges()),a=a.add(c.connectedEdges().connectedNodes(".event"))):c.hasClass("event")&&(a=a.add(c.connectedNodes(".event")))}),l.batch(function(){a.select()}),scopa_timelineaction&&l.batch(function(){l.elements(":selected.nofilter").unselect()}),h.selectCallback&&h.selectCallback(),E=!1},I=function(a){if("auto"==a){var b=l.edges().length;l.layout({name:"cytoscape-ngraph.forcelayout",async:{maxIterations:1e3,stepsPerCycle:30,waitForStep:!1},physics:{springLength:(20>b?10*b:2*b+200)+200,springCoeff:8e-4,gravity:-300.2,theta:.8,dragCoeff:.02,timeStep:20,iterations:1e4,fit:!0,stableThreshold:9e-6},iterations:1e4,refreshInterval:16,refreshIterations:10,stableThreshold:2,animate:!0,fit:!0});try{clearTimeout(f)}catch(c){}return f=setTimeout(function(){mining.utils.saveGraphHistory(l)},100),void 0}if(l.nodes(":selected").not(":locked").length>1&&l.nodes(":selected").not(":locked").length!=l.nodes().length&&"breadthfirst"!=a){var d=A(l.nodes(":selected").not(":locked"));if("grid"==a){var e=63*l.nodes(":selected").not(":locked").length;d.x1==d.x2&&(d.x2+=e),d.y1==d.y2&&(d.y2+=e)}seajs.log(d),l.nodes(":selected").not(":locked").layout($.extend({},j[a],{boundingBox:d,stop:function(){mining.utils.saveGraphHistory(l)}}))}else l.layout($.extend({},j[a],{boundingBox:void 0,stop:function(){var a=A(),b=l.extent();a.x1<b.x1||a.x2>b.x2||a.y1<b.y1||a.y2>b.y2?(l.animate({fit:{padding:20},center:{}},{duration:300,complete:function(){}}),mining.utils.saveGraphHistory(l)):mining.utils.saveGraphHistory(l)}}))},J=function(a){var b;if(a=a||"all","all"==a)b=l.elements(":unlocked").remove();else if(l.$("node.event:selected").length<1)b=l.$(a).filter(":unlocked").remove();else{var c=l.$(a).filter(":unlocked");b=c.remove()}l.removeFromPool(b),F(),mining.utils.saveGraphHistory(l)},K=function(a,b,c){l.elements().length>mining.graphMaxMnu/3&&l.startBatch(),l.elements().addClass("nofilter");var d=l.elements("node.entity").filterFn(function(a){return a.connectedEdges().length<1});$.each(d,function(c,d){var e=d.data().data,f=mining.mappingutils.getName(e);-1!=b.indexOf(f)&&L(a,e,d)}),$.each(l.elements("edge.relation"),function(d,e){var f=e.data().data,g=mining.mappingutils.getName(f);if(-1==c.indexOf(g)){var h=mining.mappingutils.getTimeList(f),i=!1;return $.each(h,function(c,d){-1!=b.indexOf(d.label)&&$.each(d.time,function(b,c){var d=new Date(parseInt(c));return a[0]<=d&&d<=a[1]?(i=!0,!0):void 0})}),0==h.length&&(i=!0),i?(e.removeClass("nofilter"),e.connectedNodes().removeClass("nofilter"),!0):void 0}});var e=l.elements("node.nofilter").filterFn(function(a){return a.connectedEdges().length>0});$.each(e,function(d,e){var f=e.data().data,g=mining.mappingutils.getName(f);return-1==b.indexOf(g)&&-1==c.indexOf(g)?(e.removeClass("nofilter"),void 0):(L(a,f,e),void 0)}),l.elements().length>mining.graphMaxMnu/3&&l.endBatch()},L=function(a,b,c){var d=mining.mappingutils.getTimeList(b),e=!1;mining.utils.isEmpty(d)||($.each(d,function(b,c){mining.utils.isEmpty(c.time)||$.each(c.time,function(b,c){var d=new Date(parseInt(c));return a[0]<=d&&d<=a[1]?(e=!0,!0):void 0})}),e&&c.removeClass("nofilter"))},M=function(a){l.elements().length>mining.graphMaxMnu/3&&l.startBatch(),$.each(l.$("node.entity,edge.relation,node.event"),function(b,c){var d=c.data().data,e=mining.mappingutils.getTimeList(d);$.each(e,function(b,d){-1!=a.indexOf(d.label)&&(c.addClass("nofilter"),c.hasClass("event")&&c.connectedEdges().addClass("nofilter"))})}),l.elements().length>mining.graphMaxMnu/3&&l.endBatch()},N=function(a){var b;1==a.filter(".entity").length?b=a.neighborhood(".entity"):(b=a.filter(".entity"),$.each(a.filter(".entity"),function(a,c){b=b.add(c.connectedEdges().connectedNodes())})),$.each(b,function(a,b){1==b.connectedEdges().length&&b.addClass("closeentitynode")});var a=l.filter(".closeentitynode").not(":locked").remove();l.removeFromPool(a),h.dataCallback(),mining.utils.saveGraphHistory(l)},O=!1,P=100,Q=function(a){O=a;try{clearTimeout(g)}catch(b){}g=setTimeout(function(){l.show_photo=O,$(".updateNodeImg").remove();var a=l.nodes(":selected");a.length<1&&(a=l.nodes()),a.each(function(a,b){var c=b.data();if(O){if(c.photo)return b.style({"background-image":c.photo,"background-clip":"node","background-width":b.style("background-width"),"background-height":b.style("background-height"),width:b.style("width"),height:b.style("height"),"border-width":"2px"}),void 0;var d=mining.mappingutils.getGraphIcon(c.data,"big"),e=$(".updateNodeImg[gid="+c.id+"]");if(c.photochecked||-1!=d.indexOf("/graphicon/")||e.size()>0)return;$("body").append('<img src="'+d+'" class="updateNodeImg" gid="'+c.id+'" style="display:none;">'),e=$(".updateNodeImg[gid="+c.id+"]"),e[0].onerror=function(){l.$("#"+$(this).attr("gid")).data().photochecked=!0,$(this).remove()},e[0].onload=function(){if(O){var a=l.$("#"+$(this).attr("gid")),c=this.src;a.data().photo=c,a.data().photochecked=!0,a.style({"background-image":c,"background-clip":"node","background-width":b.style("background-width"),"background-height":b.style("background-height"),width:b.style("width"),height:b.style("height"),"border-width":"2px"})}}}else b.style({"background-image":c.image,"background-clip":"none","background-width":b.style("background-width"),"background-height":b.style("background-height"),width:parseInt(b.style("width")+2)+"px",height:parseInt(b.style("height")+2)+"px","border-width":"0"})})},P)},R=["noted","locked"],S=null,T=function(a){1==S&&(S=null);try{clearTimeout(g),S?S.isNode()&&(S=S.add(a)):S=a}catch(b){}g=setTimeout(function(){if("boolean"==typeof a)l.show_note=a;else if(a&&!a.isNode())return;"object"!=typeof a?a=l.nodes("."+R.join(",.")):null!=S&&(a=S,S=null),$.each(a,function(a,b){var c=b.data().data,d=mining.mappingutils.getGraphIcon(c),e=-1==b.style()["background-image"].indexOf("/graphicon/")?!0:!1;"person"!=c.label||"non_cri_person"!=c.type&&"non_eventful_person"!=c.type||(d=d.replace("/graphicon/","/graphicon/special/")),b.removeClass(R.join(" ")),$.each(R,function(a,c){b.data()[c]&&(d=d.replace(".png","_"+c+".png"),b.addClass(c))}),l.show_note||(d=d.replace("_noted","")),b.data().image=d,e||b.style({"background-image":d})})},P)},U=function(a){a=a||"backward",mining.utils.openGraphHistory(l,a,function(){F(),o()})},V=function(){var a=[];$.each(l.nodes(),function(b,c){a.push(c.data().data.gid),c.data().noted=!1,T(c)}),h.noteschart.isNoted({dataIds:a,async:!1,callback:function(a){i=a.listObj,a.listObj&&$.each(a.listObj,function(a,b){var c=l.$("#"+b);c.data().noted=!0,T(c)})}})};return{init:m,refresh:F,snapshot:B,appenddata:w,layout:I,delelements:J,timefilter:K,labelfilter:M,adjustzoom:z,closeentity:N,history:U,getnodedata:s,getedgedata:t,refreshstate:V,showphoto:Q,updateicon:T}}});
