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