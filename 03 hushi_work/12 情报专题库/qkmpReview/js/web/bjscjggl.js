'use strict';

$(function () {
    /**-----mian----------------------------------------------------------------------------------------------------------------------------- */
	// 获取标签颜色
	getTagLevel();
	
	// 页面初始化
    initPage();

    /**
     * @desc: 页面初始化
     * @param: none
     * @return: undefined 
     */
    function initPage() {
        resizeFunc();

        // 页面窗口大小变化 重新计算布局
        $(window).resize(resizeFunc);

        // 点击事件监听
        bindClickFunc();

        // 获取人员信息
        getPersonInfo();

    }

    /**-----逻辑方法----------------------------------------------------------------------------------------------------------------------- */

    /**
     * 获取 标签颜色
     */
    var tagLevel = null;
    function getTagLevel(){
    	if(!tagLevel){
    		$.ajax({
    			type : "get",
    			url : bjhchost + "/task/tag/getLevelMaps",
    			async : true,
    			success : function(data) {
    				tagLevel = data.msg;
    				// console.log(tagLevel);
    			}
    		});
    	}
    }
    
    /**
     * @desc: 改变页面html的font-size大小 和 搜索结果result-table-box 元素的top值
     * @param: none
     * @return: undefined 
     */
    function resizeFunc() {
        //重新设置html的font-size
        var width = document.body.clientWidth;
        var fontSize = (width - 1680) * 0.0298 + 50;
        $('html').css('font-size', fontSize);

    }


    /**
     * @desc: 页面点击事件绑定
     * @param: none
     * @return: undefined 
     */
    function bindClickFunc() {}

    /**
     * @desc: 获取人员信息
     * @param: none
     * @return: undefined 
     */
    function getPersonInfo() {
        var sfz = GetQueryString('sfzh'); //获取参数身份证号
        $.ajax({
            type: "get",
            url: bjhchost+ "/task/info/one/" + sfz,
            async: true,
            success: function(data) {
                // console.log(data)
                var ownInfo = data.msg[0].details,
                    relativesInfo = data.msg[0].relations,
                    ownInfoHtmlCode = '',
                    relativesInfoHtmlCode = '';
                
                // console.log(ownInfo)
                // console.log(JSON.parse(ownInfo.tagDetail)[0])
                
                ownInfoHtmlCode = getOwnInfoHtmlCode(ownInfo);
                relativesInfoHtmlCode = getRelativesInfoHtmlCode(relativesInfo);

                $('.content-card .own-info-box').html(ownInfoHtmlCode);
                $('.content-card .relatives-info-box').html(relativesInfoHtmlCode);

                // 标签详细信息 popover提示框初始化
                $("[data-toggle='popover']").popover({
                    // template: '<div class="popover" role="tooltip"><div class="arrow"></div><h3 class="popover-title">aaaaa</h3><div class="popover-content">bbbb</div></div>',
                });
            }
        });


    }

    /**
     * @desc 根据个人自身详细信息，拼接个人自身详细信息card HTML代码
     * @param {*个人自身详细信息} ownInfo Object 
     * @return {*个人自身详细信息card HTML代码} String
     */
    function getOwnInfoHtmlCode(ownInfo){
        // console.log(ownInfo);
        var occupationListHtmlCode = '',
            ownInfoHtmlCode = '';
        
        //人员标签
        var tagLevelMap = tagLevel;
        var tag = ownInfo.tag && ownInfo.tag!='null'?ownInfo.tag :'' ;
        var tagDetail = ownInfo.tagDetail && ownInfo.tagDetail!='null'?JSON.parse(ownInfo.tagDetail): '';
    	var tagDangerHtml = '';
    	var tagWarningHtml = '';
    	var tagInfoHtml = '';
    	if(tag&&tagDetail){
    		var tagArr = tag.split(",");
    		if(tagArr.length > 0){
    			var i = 0;
    			for(i=0;i<tagArr.length;i++){
    				var tagStr = tagArr[i].trim();
    				var tagDetailObject = tagDetail[i].fields;
                    var tagDetailStr = '';
                    for(var key of Object.keys(tagDetailObject)){
                        // console.log(key + ': ' + tagDetailObject[key])
                        tagDetailStr += key + ': ' + tagDetailObject[key] + '<br>';
                    }
    				if(tagLevelMap[tagStr] && tagLevelMap[tagStr] == "1"){
    					tagDangerHtml += '<a class="label label-danger" role="button" tabindex="0" data-html="html" data-toggle="popover" title="'+ tagArr[i] +'" data-content="' + tagDetailStr + '" data-placement="bottom" data-trigger="focus">'+ tagArr[i] +'</a>';
    				}else if(tagLevelMap[tagStr] && tagLevelMap[tagStr] == "2"){
    					tagWarningHtml += '<a class="label label-warning" role="button" tabindex="0" data-html="html" data-toggle="popover" title="'+ tagArr[i] +'" data-content="' + tagDetailStr + '" data-placement="bottom" data-trigger="focus">'+ tagArr[i] +'</a>';
    				}else{
    					tagInfoHtml += '<a class="label label-info" role="button" tabindex="0" data-html="html" data-toggle="popover" title="'+ tagArr[i] +'" data-content="' + tagDetailStr + '" data-placement="bottom" data-trigger="focus">'+ tagArr[i] +'</a>';
    				}
    			}
    		}
    	}
    	tagDangerHtml = tagDangerHtml == "" ? '<span class="label label-danger">无信息</span>' :tagDangerHtml;
    	tagWarningHtml = tagWarningHtml == "" ? '<span class="label label-warning">无信息</span>' :tagWarningHtml;
    	tagInfoHtml = tagInfoHtml == "" ? '<span class="label label-info">无信息</span>' :tagInfoHtml;
        
        ownInfoHtmlCode = `<div class="blue-label"></div>
                            <div class="own-info-card">
                                <div class="own-basic-info-box">
                                    <div class="head-icon-box">
                                        <img src="http://10.100.9.60:9082/dzda/rygk/RequestPhoto.jsp?sfzh=${ownInfo.idCard}" alt="head-icon">
                                    </div>
                                    <div class="own-basic-info">
                                        <h3>${ownInfo.name}</h3>
                                        <p>身份证号：<span>${ownInfo.idCard}</span></p>
                                        <p>性别：<span>${ownInfo.sex}</span></p>
                                        <p>民族：<span>${ownInfo.nation==null||ownInfo.nation=='null'?'无信息':ownInfo.nation}</span></p>
                                        <p>户籍地：<span>${ownInfo.birthplace==null||ownInfo.birthplace=='null'?'无信息':ownInfo.birthplace}</span></p>
                                        <p>现住地：<span>${ownInfo.xzz==null||ownInfo.xzz=='null'?'无信息':ownInfo.xzz}</span></p>
                                        <p>职业：<span>${ownInfo.zy1==null||ownInfo.zy1=='null'?'无信息':ownInfo.zy1}</span></p>
                                    </div>
                                    <div class="own-occupation">
                                        <div class="tags">
                                            <div class="label-word">职业：</div>
                                            <div class="labels">`;
        var zytag = {};
        
        var zy2 = (ownInfo.zy2==null||ownInfo.zy2=='null'?'' : ownInfo.zy2)+"";
    	// console.log(zy2);
    	if(zy2){
    		if(isJSON(zy2)){
    			var zy2 = $.parseJSON(ownInfo.zy2);
    	        for(var i in zy2){
    	        	zytag[zy2[i].tag] = "true";
    	        }
    	        console.log(zytag);
    	        $.each(zytag, function(k,v) {
    	        	 ownInfoHtmlCode += `<span class="label label-info">${k}</span>`;
    	        })
    		}
    	}else{
    		 ownInfoHtmlCode += `<span class="label label-info">无信息</span>`;
    	}
        
        ownInfoHtmlCode += '</div></div>';
        occupationListHtmlCode = getOccupationList(zy2);
        ownInfoHtmlCode += occupationListHtmlCode;
        ownInfoHtmlCode += `</div>
                        </div>
                        <div class="own-label-box">
                                <div class="tags row red-tags">
                                    <div class="col-md-2 label-word">红色标签：</div>
                                    <div class="col-md-10 labels">`+ tagDangerHtml +`
                                    </div>
                                </div>
                                <div class="tags row yellow-tags">
                                    <div class="col-md-2 label-word">黄色标签：</div>
                                    <div class="col-md-10 labels">`+ tagWarningHtml +`
                                    </div>
                                </div>
                                <div class="tags row blue-tags">
                                    <div class="col-md-2 label-word">蓝色标签：</div>
                                    <div class="col-md-10 labels">`+ tagInfoHtml +`
                                    </div>
                                </div>
                        </div>
                    </div>`;

        return ownInfoHtmlCode;
    }
    
    /**
     * @desc 根据亲属详细信息，拼接亲属详细信息card HTML代码
     * @param {*亲属详细信息} relativesInfo Object 
     * @return {*亲属详细信息card HTML代码} String
     */
    function getRelativesInfoHtmlCode(relativesInfo){
        // console.log(relativesInfo);
        var relativesInfoHtmlCode = '';
            
        for(var i = 0, j = relativesInfo.length; i < j; i++){
            var occupationListHtmlCode = '',
                relativeInfo = relativesInfo[i],
                zy2 = $.parseJSON(relativeInfo.zy2),
                tagsArray = relativeInfo.tag.split(/[,，]/);

            if(zy2 !== null){
                occupationListHtmlCode = '<div class="occupation-box"><span class="occu-label">职业：</span><ol>';
                for(var i in zy2){
                    occupationListHtmlCode += `<li>${zy2[i].tag} `;
                    for(var j in zy2[i].fields){
                    	if(zy2[i].fields[j]&&formatStr(zy2[i].fields[j])){
                    		occupationListHtmlCode += ` ${j}: ${formatStr(zy2[i].fields[j])} `
                    	}
                    }
                    occupationListHtmlCode += '</li>';
                }
                occupationListHtmlCode += '</ol></div>';
            }else{
                occupationListHtmlCode = `<div class="occupation-box">
                                                <span class="occu-label">职业：</span>
                                                无信息
                                            </div>`;
            }
            
            relativesInfoHtmlCode += `<div class="relative-card">
                                        <div class="head-icon-box">
                                            <img src="http://10.100.9.60:9082/dzda/rygk/RequestPhoto.jsp?sfzh=${relativeInfo.idCard}" alt="head-icon">
                                        </div>
                                        <div class="person-info-box">
                                            <div class="top-right-part">
                                                <div class="basic-info-box">
                                                    <h3 class="person-name">${relativeInfo.name}</h3>
                                                    <div class="person-info-row row">
                                                        <div class="col-md-5">身份证号：<span class="person-sfzh">${relativeInfo.idCard}</span></div>
                                                    </div>
                                                    <div class="person-info-row row">
                                                    <div class="col-md-2">民族：<span class="person-nation">${relativeInfo.nation === null||relativeInfo.nation == 'null' ? '无信息' : relativeInfo.nation}</span></div>
                                                    <div class="col-md-5">职业：<span class="person-occupation">${relativeInfo.zy1 === null||relativeInfo.zy1 == 'null' ? '无信息' : relativeInfo.zy1}</span></div>
                                                    <div class="col-md-2">性别：<span class="person-sex">${relativeInfo.sex === null||relativeInfo.sex == 'null' ? '无信息' : relativeInfo.sex}</span></div>
                                                    </div>
                                                    <div class="person-info-row row">
                                                        <div class="col-md-12">户籍地：<span class="person-domicile">${relativeInfo.birthplace === null||relativeInfo.birthplace== 'null' ? '无信息' : relativeInfo.birthplace}</span></div>
                                                    </div>
                                                    <div class="person-info-row row">
                                                        <div class="col-md-12">现住地：<span class="person-residence">${relativeInfo.xzz === null||relativeInfo.xzz == 'null' ? '无信息' : relativeInfo.xzz}</span></div>
                                                    </div>
                                                </div>`;
            relativesInfoHtmlCode += occupationListHtmlCode;
            relativesInfoHtmlCode += `<div class="view-details-button">
                                            <div class="button">
                                                <img src="../../img/bjscxq/page-icon.png" alt="check">
                                                <span><a href="yjlDetails.html?sfzh=${relativeInfo.idCard}">查看详情</a></span>
                                            </div>
                                            <div class="button" onclick="toSCOPA('${relativeInfo.idCard}');">
	                                            <img src="../../img/bjscxq/page-icon.png" alt="check">
	                                            <span>跳到图析</span>
	                                        </div>
                                        </div>
                                    </div>
                                    <div class="bottom-right-part">
                                        <div class="tags row">
                                            <div class="col-md-11 labels">`;
            var tagLevelMap = tagLevel;
            for(var i = 0, j = tagsArray.length; i < j; i++){
            	var tagStr = tagsArray[i].trim();
				if(tagLevelMap[tagStr] && tagLevelMap[tagStr] == "1"){
					relativesInfoHtmlCode += `<span class="label label-danger">`+ tagStr +`</span>`;
				}else if(tagLevelMap[tagStr] && tagLevelMap[tagStr] == "2"){
					relativesInfoHtmlCode += `<span class="label label-warning">`+ tagStr +`</span>`;
				}else{
					relativesInfoHtmlCode += `<span class="label label-info">`+ tagStr +`</span>`;
				}
               //  relativesInfoHtmlCode += `<span class="label label-danger">${tagsArray[i]}</span>`;
            } 
            relativesInfoHtmlCode += '</div></div></div></div></div>';
        }

        return relativesInfoHtmlCode;
    }
    
    /**
     * @desc 获取个人自身 职业列表html代码
     * @param {*职业列表信息} zy2 Array 
     * @return {*职业列表信息 HTML代码} String
     */
    function getOccupationList(zy2){
        var occupationListHtmlCode = '<div class="occupation-list"><ol>';
        for(var i in zy2){
            occupationListHtmlCode += `<li>${zy2[i].tag} `;
            for(var j in zy2[i].fields){
            	if(zy2[i].fields[j]&&formatStr(zy2[i].fields[j])){
            		occupationListHtmlCode += ` ${j}: ${formatStr(zy2[i].fields[j])} `
            	}
            }
            occupationListHtmlCode += '</li>';
        }
        occupationListHtmlCode += '</ol></div>';

        return occupationListHtmlCode;
    }

    /**
     * 职业 字段格式化
     */
    function formatStr(itemStr){
    	itemStr = itemStr.replace('\\n','').replace(' ','');
    	return itemStr;
    }




    /**-------工具方法----------------------------------------------------------------------------------------------------------------------------------*/ 

    /**
     * @desc 比较两个字符串是否相等 相等返回true
     * @param {*字符串1} str1 String
     * @param {*字符串2} str2 String
     * @return Boolean
     */
    function compareStr(str1, str2){
        return $.trim(str1) === $.trim(str2);
    }




})

//跳到图析
function toSCOPA(id){
	var username = '014591';
	window.open('http://yp.hsga.nn/core.html?username='+username+'#!scopa/graph/key/'+id);
	
}