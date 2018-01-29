define(function(require, exports, module){
	/**
	 * Created by Administrator on 2015/12/18.
	 */
	//验证
	var regExps = {
	    "date": /^([1-2]\d{3})(0?[1-9]|10|11|12)([1-2]?[0-9]|0[1-9]|30|31)$/ig,
	    "mobilePhone": /^[0-9]{11}$/,// 移动手机
	    "idCard": /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/,// 身份证号
	    "postcode": /^[0-9]{6}$/,
	    "email": /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/,
	    "number": /^[0-9|.]*$/,// 数值
	    "money": /^(([1-9]{1}\d*)|([0]{1}))(\.(\d){1,2})?$/,
	    "numberLetter": /[A-Za-z].*[0-9]|[0-9].*[A-Za-z]/,
	    "fixedLineTelephone": /^(0[0-9]{2,3}\-)?([2-9][0-9]{6,7})+(\-[0-9]{1,4})?$/,
	    "positiveInteger": /^[0-9]*$/
	};
	var ERROR_CLASS = "checkError";
	var TOOLTIPDIV = "tooltipDiv" + (new Date()).getTime();
	var TOOLTIPDIV_TEXT = TOOLTIPDIV + "_T";
	function checkedInit(form) {
	    if (form.attributes["isCheck"]) {
	        addCheckEvent(form);
	        bindBodyEvent();
	    }
	}
	function createErrorTip() {
	    if (!$("#" + TOOLTIPDIV).length) {
	        $('<div id="' + TOOLTIPDIV + '" class="fieldTooltip"><div class="direction"></div><div id="' + TOOLTIPDIV_TEXT + '"></div></div>').appendTo(document.body);
	    }
	}
	function addCheckEvent(form) {
	    createErrorTip();
	    $.each($(form).find('input'), function (k, element) {
	        $(element).bind("blur", (function (ev) {
	            checkBlurFormat(element);
	        }));
	        $(element).bind("focus", (function (ev) {
	            var el = $(element);
	            var value = el.val();
	            var checkType = el.attr("checkType");
	        }));
	
	    });
	}
	function checkBlurFormat(element, isCheckFun) {
	    var checkStatus = 1;
	    if (element) {
	        var str = "";
	        var elObj = $(element);
	        try {
	            if (elObj.attr("checkType")) {
	                if (!testRegExp(elObj.attr("checkType"), elObj.val().trim())) {
	                    str = "校验失败";
	                }
	            }
	            if (elObj.attr("regExp")) {
	                var regExp = elObj.attr("regExp");
	                regExp = eval(regExp);
	                if (!testRegExp(null, elObj.val().trim(), regExp)) {
	                    str = "校验失败";
	                }
	            }
	
	        } catch (e) {
	        }
	        if (str && str.length > 0) {
	            elObj.addClass(ERROR_CLASS);
	            elObj.attr("errortip", str);
	        } else {
	            elObj.removeClass(ERROR_CLASS);
	            elObj.attr("errortip", "");
	            $("#" + TOOLTIPDIV).hide();
	            checkStatus = 0;
	        }
	        if (isCheckFun) {
	            isCheckFun(element, checkStatus);
	        }
	    }
	    return checkStatus;
	}
	function testRegExp(typeName, value, regExpObj) {
	    if (null != value && value.toString().length > 0) {
	        var regExp = "";
	        if (regExpObj) {
	            regExp = regExpObj;
	        } else {
	            regExp = regExps[typeName];
	        }
	        if (regExp) {
	            return regExp.test(value);
	        }
	    }
	    return true;
	}
	/** 绑定body事件，用来显示提示数据错误信息（数据为空,数据格式不正确等）* */
	function bindBodyEvent() {
	    $("body").unbind().bind("mouseover", function (ev) {
	        var obj = ev.srcElement || ev.target;
	        var tooltipDiv = $("#" + TOOLTIPDIV);
	        if ($(obj).hasClass(ERROR_CLASS)) {
	            var el = $(obj);
	            groupIsNullTip(tooltipDiv, el);
	            var y = el.offset().top;
	            var x = el.offset().left;
	            var elementW = el.width();
	            var h = el.height();
	            var w = el.width();
	            tooltipDiv.css("left", ((x + (elementW - w) / 2)) + "px");
	            tooltipDiv.css("top", (y + h + 10) + "px");
	            tooltipDiv.css("min-width", w + "px");
	            tooltipDiv.hide();
	            tooltipDiv.slideToggle(500);
	        } else {
	            tooltipDiv.hide();
	        }
	        //hideHelpTip();// 公共的，当点击body时将帮助系统关闭
	        //$("div.piup").hide();
	    });
	
	};
	function groupIsNullTip(tipObj, element) {
	    var str = "字段不能为空";
	    if (element.attr("errortip")) {
	        $("#" + TOOLTIPDIV_TEXT).html(element.attr("errortip"));
	    } else if (element.attr("tipText")) {
	        $("#" + TOOLTIPDIV_TEXT).html(element.attr("tipText") + "不能为空!");
	    } else {
	        $("#" + TOOLTIPDIV_TEXT).html(str);
	    }
	}
	
	return {
		init: checkedInit
	}
});
