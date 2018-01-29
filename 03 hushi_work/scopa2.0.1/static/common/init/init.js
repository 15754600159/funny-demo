define(function (require) {

    /**
     * @name Init
     * @class 全站公用，页面初始化
     * @requires jQuery
     * @author 李博龙
     * @version v1.0.0
     */

    var $ = require('jquery'),
        mining = {};

    /* 全局化常用方法 */
    window.mining = mining;
    window.$ajax = require('ajax'),
    window.$dialog = require('dialog');
    
    /* 扩充mining */
    $.extend(mining,require('./config'));
    mining.utils = require('utils');
    require('./extend/utils');
    require.async('./extend/extend.css');
    mining.ajaxTimeout = mining.utils.loadLogin;
    
    /* 扩充jQuery方法 */
    require('./extend/jquery');
    
    /* 扩充dialog方法 */
    require('./extend/dialog');
    
    /* 异步加载Bootstrap框架JS */
    require.async('bootstrap/3.3.0/js/bootstrap.min.js');
    
    /* 浏览器resize */
    mining.utils.winResize({
        name: function(){
            $.extend(mining.browser, mining.utils.getBrowserInfo());
        }
    }, true);
    
    /* 页面初始化 */
    $(function () {
        seajs.log('common init complete!');
    });
});