/*
|------------------------------------------------------------------------------
|                                   EzMapAPI.js
|
|@author: qianleyi
|@date: 2015-11-27
|@descript: 基础地图初始化配置设置
|------------------------------------------------------------------------------
*/

var ezMap = {
    /**
     * 二维数组：可以插入多个图层对象
     * 参数说明：[]表示图层组,数组中[i][0]表示图层名,[i][1]表示图层的URL,[i][2]表示图层的参数设置
     * 参数类型：Array
     * 取值范围：无限制
     * 默认值：无
     */
    MapSrcURL: [
        ["矢量地图", "http://10.101.138.10/PGIS_S_LWTileMap/Maps/qgsl", {
             type: 'wmts',
             crs: '4326',
             wrapX: false,
             layer: 'arcgissl12',
             matrixSet: 'c',
             format: 'tiles',
             style: 'default',
             imageSRC: '../images/shiliang.png',
             customOpts: {
                 isTDT: true,
                 print: true,
                 layers: "arcgissl12"
             }
         }],
		 ["影像地图", "http://10.101.138.10/PGIS_S_LWTileMap/Maps/qgyx", {
             type: 'wmts',
             crs: '4326',
             wrapX: false,
             layer: 'arcgissl12',
             matrixSet: 'c',
             format: 'tiles',
             style: 'default',
             imageSRC: '../images/yingxiang.png',
             customOpts: {
                 isTDT: true,
                 print: true,
                 layers: "arcgissl12"
             }
         }],
		 ["导航地图", "http://10.101.138.10/PGIS_S_LWTileMap/Maps/qgdh", {
             type: 'wmts',
             crs: '4326',
             wrapX: false,
             layer: 'arcgissl12',
             matrixSet: 'c',
             format: 'tiles',
             style: 'default',
             imageSRC: '../images/layer_shiliang.png',
             customOpts: {
                 isTDT: true,
                 print: true,
                 layers: "arcgissl12"
             }
         }]
    ],

    /**
     * 参数说明：设置地图初始化中心位置
     * 参数类型：Array<Float,Float>
     * 取值范围：无限制
     * 默认值：无
     */
    //CenterPoint: [104.114129,37.550339],
    CenterPoint: [111.69851,40.79927],
    // CenterPoint: [106.7054, 26.8419],
    // CenterPoint: [492567.23876, 326339.30273],

    /**
     * 参数说明：设置全图显示时地图显示范围
     * 参数类型：[minx,miny,maxx,maxy]
     * 取值范围：无限制
     * 默认值：无
     */
    MapFullExtent: [111.48118,40.68426,111.93815,40.9136],
    //MapFullExtent: [116.264129,39.590339,116.564129,39.79],

    /**
     * 参数说明：设置地图初始显示级别
     * 参数类型：Int
     * 取值范围：无限制
     * 默认值：无
     */
    MapInitLevel: 12,

    /**
     * 参数说明：设置地图显示的最大级别
     * 参数类型：Int
     * 取值范围：无限制
     * 默认值：无
     */
    MapMaxLevel: 20,

    /**
     * 参数说明：设置地图显示的最小级别
     * 参数类型：Int
     * 取值范围：无限制
     * 默认值：无
     */
    MapMinLevel: 0,

    /**
     * 参数说明：是否添加地图级别控制条hover样式
     * 参数类型：Boolean
     * 取值范围：无限制
     * 默认值：无
     */
    isTitleArea: true,

    /**
     * 参数说明：Animation 瓦片是否提前加载
     * 参数类型：Boolean
     * 取值范围：无限制
     * 默认值：false
     */
    loadTilesWhileAnimating: false
};

(function(ezMap) {
    var scriptName = "EzMapAPI\\.js";
    var keyWord = "key";

    (function(ezMap) {
        var isOL = new RegExp("(^|(.*?\\/))(" + scriptName + ")(\\?|$)");
        var scripts = document.getElementsByTagName('script');
        for (var i = 0, len = scripts.length; i < len; i++) {
            var src = scripts[i].getAttribute('src');
            if (src) {
                var match = src.match(isOL);
                if (match) {
                    var key = src.indexOf(keyWord + "=");
                    if (key == -1) {
                        break;
                    }
                    var get_par = src.slice(keyWord.length + key + 1);
                    var nextPar = get_par.indexOf("&");
                    if (nextPar != -1) {
                        get_par = get_par.slice(0, nextPar);
                    }
                    ezMap.AuthorKey = get_par;
                    break;
                }
            }
        }
    })(ezMap);
})(ezMap);
