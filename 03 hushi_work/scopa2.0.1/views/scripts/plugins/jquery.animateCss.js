/**
 * Created by anchao on 2016/4/27.
 */
var jQuery = require('jquery');
(function ($) {
    var old = $.fn.animateCss;
    
    function AnimateCss(element,animationName,callback) {
        this.ver = '1.0';
        this.$element = $(element);
        this.animationName = animationName;
        this.callback = callback;
        this.init();
    }
    
    AnimateCss.prototype = {
        constructor:AnimateCss,
        init:function () {
            var animationEnd = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';
            var animationName = this.animationName;
            var cb = this.callback;
            this.$element.addClass('animated ' + animationName).one(animationEnd, function() {
                $(this).removeClass('animated ' + animationName);

                if($.isFunction(cb)){
                    cb.bind(this)();
                }
            });
        }
    };
    
    $.fn.animateCss = function (animationName,fnCb) {
        this.each(function () {
            new AnimateCss(this,animationName,fnCb);
        })
    };

    $.fn.animateCss.noConflict = function() {
        $.fn.animateCss = old;
        return this;
    };
})(jQuery);