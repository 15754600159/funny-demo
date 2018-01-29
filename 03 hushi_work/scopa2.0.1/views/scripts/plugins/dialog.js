/* dialog扩展 */
var $ = require('jquery');
var _ = require('underscore');
require('./dialog-plus.js');

$.extend(dialog, {
    topIndex: function () {
        //顶级zIndex
        if (_.isEmpty(dialog) || _.isEmpty(dialog.list)) return 2014;
        var indexArr = [];
        $.each(dialog.list, function (i, n) {
            indexArr.push(n.zIndex);
        });
        return _(indexArr).max() + 1;
    },
    alert: function (content, type, time, callback) {
        var time_def = 6000,
            title;

        if (typeof content == 'number') {
            content += '';
        }
        if (typeof content != 'string') {
            console.log("调用 dialog.alert 时类型出错！暂只支持字符型，请检查。");
            return;
        }

        //关闭前一个弹框
        if (!_.isEmpty(dialog.get('Alert'))) {
            dialog.get('Alert').close();
        }

        if (typeof type == 'number') {
            time_def = type;
            type = 'message';
        } else if (typeof type == 'function') {
            callback = type;
            type = 'message';
        }
        if (typeof time == 'function') {
            callback = time;
        }
        if (typeof time == 'number') {
            time_def = time;
        }

        if (type == 'success') {
            title = '成功啦';
            content = '<span class="artui-dialog-alert-success"></span><span>' + content + '</span>';
        } else if (type == 'warning') {
            title = '提醒';
            content = '<span class="artui-dialog-alert-warning"></span><span>' + content + '</span>';
        } else if (type == 'error') {
            title = '出错啦';
            content = '<span class="artui-dialog-alert-error"></span><span>' + content + '</span>';
        } else {
            title = '消息';
        }
        content = '<div class="artui-dialog-alert">' + content + '</div>';

        var $d = dialog({
            title: title,
            id: 'Alert',
            zIndex: dialog.topIndex(),
            fixed: true,
            time: time_def,
            padding: '15px 30px',
            content: content,
            okValue: '知道了',
            ok: true,
            onbeforeremove: callback
        }).showModal();

        if (time_def != 0) {
            setTimeout(function () {
                //$d.close().remove();
            }, time_def);
        }

        return $d;
    },
    confirm: function (options) {
        options = $.extend({
            title: '提醒',
            content: '您确定要执行本操作？',
            zIndex: dialog.topIndex(),
            fixed: true,
            padding: '15px 30px',
            cancelValue: '取消',
            cancel: true,
            okValue: '确定',
            ok: true
        }, options);

        options.content = '<span class="artui-dialog-confirm"></span><span>' + options.content + '</span>';
        return dialog(options).showModal();
    },
    open: function (title, content, aButton, fnCb) {
        return dialog({
            title: title,
            content: content,
            button: aButton,
            onshow: function () {
                //重新设置主要内容区域
                this.content(content);
                if (fnCb && typeof fnCb === 'function') {
                    fnCb(this);
                }
            }
        }).showModal();
    },
    loading: function () {
        return dialog({
            id: 'loadingDiv',
            lock: true,
            zIndex: dialog.topIndex(),
            fixed: true,
            content: '<div class="progress"></div>'
        }).showModal();
    },
    close: function ($d) {
        if ($d) {
            $d.close().remove();
        }
    }
});
module.exports = dialog;
