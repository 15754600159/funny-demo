---
title: JavaScript之jQuery组件封装
date: 2018-10-27
categories: "JavaScript"
tags: 
     - JavaScript
     - 博客
---

1. 思想：
    1. 利用立即执行函数(闭包)封装组件方法，避免污染全局作用域；
    2. 将方法挂到$.fn对象上，即可在jQuery实例对象上调用封装得方法；
<!-- more -->
```JavaScript
// html
<select name="select" class="select"></select>

// plugin
(function($) {
    /**
     * @desc 一个异步获取下拉框数据的组件
     * @param options { object } 配置参数对象
     * @param options.url { string } 获取数据路径
     * @param options.textField { string } option的显示文本对应返回数据中的字段名
     * @param options.valueField { string } option的value对应返回数据中的字段名
     * @return target { jquery object } 返回jquery对象本身，提供链式调用
     */
    $.fn.initSelect = function(options) {
        const defaultOptions = {
            textField: 'text',
            valueField: 'value',
        }  // 用户可调配置
        const target = this
        let optionCode = ''

        $.extend(options, defaultOptions)
        $.ajax({
            url: options.url,
            method: 'GET',
            success: function(res) {
                const { data } = res
                optionCode = data
                    .map(elem => (`<option value="${elem[options.valueField]}">${elem[options.textField]}</option>`))
                    .join('')
                target.empty().html(optionCode)
            },
        })

        return target
    }
}(jQuery))

// logic
$(document).ready(function() {
    $('.select').initSelect({ url: '/select' })
})
```