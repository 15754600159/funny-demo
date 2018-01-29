<%@ page contentType="text/html;charset=UTF-8" %>
<%@ include file="/webpage/include/taglib.jsp"%>
<html>
<head>
	<title>规则信息管理</title>
	<meta name="decorator" content="default"/>
	<script type="text/javascript">
		var validateForm;
		function doSubmit(){//回调函数，在编辑和保存动作时，供openDialog调用提交表单。
		  if(validateForm.form()){
			  $("#inputForm").submit();
			  return true;
		  }
	
		  return false;
		}
		$(document).ready(function() {
			validateForm = $("#inputForm").validate({
				submitHandler: function(form){
					loading('正在提交，请稍等...');
					form.submit();
				},
				errorContainer: "#messageBox",
				errorPlacement: function(error, element) {
					$("#messageBox").text("输入有误，请先更正。");
					if (element.is(":checkbox")||element.is(":radio")||element.parent().is(".input-append")){
						error.appendTo(element.parent().parent());
					} else {
						error.insertAfter(element);
					}
				}
			});
			
		});
		function addRow(list, idx, tpl, row){
			$(list).append(Mustache.render(tpl, {
				idx: idx, delBtn: true, row: row
			}));
			$(list+idx).find("select").each(function(){
				$(this).val($(this).attr("data-value"));
			});
			$(list+idx).find("input[type='checkbox'], input[type='radio']").each(function(){
				if("true" == $(this).attr("data-value")){
					$(this).attr("checked","checked");
					return;
				}
				var ss = $(this).attr("data-value").split(',');
				for (var i=0; i<ss.length; i++){
					if($(this).val() == ss[i]){
						$(this).attr("checked","checked");
					}
				}
			});
			$("#select_fType" + idx).change(function(){
				var fType = $(this).val();
				var fRule = $("#select_fRule" + idx).val();
				showRuleTableControls(list, idx, fType, fRule);
			});
			$("#select_fRule" + idx).change(function(){
				var fType = $("#select_fType" + idx).val();
				var fRule = $(this).val();
				showRuleTableControls(list, idx, fType, fRule);
			});
			if(typeof(row) == 'undefined'){
				$("#select_fType" + idx).val("01");
				$("#select_fRule" + idx).val("1");
				showRuleTableControls(list, idx, "01", "1");
			}else{
				showRuleTableControls(list, idx, row.ftype, row.frule);
			}
		}
		function showRuleTableControls(list, idx, fType, fRule){
			hideAllRuleTableControls(list, idx, fType, fRule);
			if(fType == "01" && fRule == "1"){
				$("#td_tieluCfdsfxt" + idx).show();
				$("#td_tieluMddsfxt" + idx).show();
				$("#td_tieluTcc" + idx).show();
			}else if(fType == "00" && fRule == "1"){
				$("#td_qicheCfdsfxt" + idx).show();
				$("#td_qicheMddsfxt" + idx).show();
				$("#td_qicheTcc" + idx).show();
			}else if(fType == "02" && fRule == "1"){
				$("#td_minhangCishu" + idx).show();
				$("#td_minhangZjjg" + idx).show();
			}else if(fType == "03" && fRule == "2"){
				
			}else if(fType == "03" && fRule == "3"){
				$("#td_lvdianDctzcs" + idx).show();
				$("#td_lvdianRuzhusjjg" + idx).show();
				$("#td_lvdianLikaisjjg" + idx).show();
			}else if(fType == "04" && fRule == "4"){
				$("#td_wangbaSwjg" + idx).show();
				$("#td_wangbaXwjg" + idx).show();
			}
		}
		function hideAllRuleTableControls(list, idx, fType, fRule){
			$("#td_tieluCfdsfxt" + idx).hide();
			$("#td_tieluMddsfxt" + idx).hide();
			$("#td_tieluTcc" + idx).hide();
			$("#td_qicheCfdsfxt" + idx).hide();
			$("#td_qicheMddsfxt" + idx).hide();
			$("#td_qicheTcc" + idx).hide();
			$("#td_minhangCishu" + idx).hide();
			$("#td_minhangZjjg" + idx).hide();
			$("#td_lvdianDctzcs" + idx).hide();
			$("#td_lvdianRuzhusjjg" + idx).hide();
			$("#td_lvdianLikaisjjg" + idx).hide();
			$("#td_wangbaSwjg" + idx).hide();
			$("#td_wangbaXwjg" + idx).hide();
		}
		function delRow(obj, prefix){
			var id = $(prefix+"_id");
			var delFlag = $(prefix+"_delFlag");
			if (id.val() == ""){
				$(obj).parent().parent().remove();
			}else if(delFlag.val() == "0"){
				delFlag.val("1");
				$(obj).html("&divide;").attr("title", "撤销删除");
				$(obj).parent().parent().addClass("error");
			}else if(delFlag.val() == "1"){
				delFlag.val("0");
				$(obj).html("&times;").attr("title", "删除");
				$(obj).parent().parent().removeClass("error");
			}
		}
		$(document).ready(function() {
	        laydate({
	            elem: '#rHdkssjdStart', //目标元素。由于laydate.js封装了一个轻量级的选择器引擎，因此elem还允许你传入class、tag但必须按照这种方式 '#id .class'
	            event: 'focus' //响应事件。如果没有传入event，则按照默认的click
	        });
	        laydate({
	            elem: '#rHdkssjdEnd', //目标元素。由于laydate.js封装了一个轻量级的选择器引擎，因此elem还允许你传入class、tag但必须按照这种方式 '#id .class'
	            event: 'focus' //响应事件。如果没有传入event，则按照默认的click
	        });
	        laydate({
	            elem: '#rHdjssjdStart', //目标元素。由于laydate.js封装了一个轻量级的选择器引擎，因此elem还允许你传入class、tag但必须按照这种方式 '#id .class'
	            event: 'focus' //响应事件。如果没有传入event，则按照默认的click
	        });	
	        laydate({
	            elem: '#rHdjssjdEnd', //目标元素。由于laydate.js封装了一个轻量级的选择器引擎，因此elem还允许你传入class、tag但必须按照这种方式 '#id .class'
	            event: 'focus' //响应事件。如果没有传入event，则按照默认的click
	        });	
		});
	</script>
</head>
<body class="hideScroll">
	<form:form id="inputForm" modelAttribute="rule" action="${ctx}/rule/rule/save" method="post" class="form-horizontal">
		<form:hidden path="id"/>
		<sys:message content="${message}"/>	
		<table class="table table-bordered  table-condensed dataTables-example dataTable no-footer">
		   <tbody>
		    	<tr>
		         <td class="width-15 active">	<label class="pull-right">规则名称：</label></td>
		         <td class="width-35">
						<form:input path="rName" htmlEscape="false" maxlength="50" class="form-control required"/>
		        
		         </td>
		         
		         <td class="width-15 active">	<label class="pull-right">规则状态：</label></td>
		         <td class="width-35">
		        		<form:select path="rStatus" class="form-control">
							<form:options items="${fns:getDictList('RULE_STATUS')}"
								itemLabel="label" itemValue="value" htmlEscape="false" />
						</form:select>
		         </td>
		      </tr>
		       <tr>
		         <td class="width-15 active">	<label class="pull-right">描述：</label></td>
		         <td class="width-35" colspan="3">
		        	<form:textarea path="rDesc" htmlEscape="false" rows="1" maxlength="100" class="form-control"/>
		         </td>
		      </tr>
		      
		      <tr>
		      	 <td class="width-15 active">	<label class="pull-right">户籍：</label></td>
		         <td class="width-35">
						<form:select path="rHuji" class="form-control m-b">
							<form:option value="" label="-全部-"/>
							<form:options items="${fns:getDictList('tb_d_qgxzqh')}" itemLabel="label"
								itemValue="value" htmlEscape="false" />
						</form:select>
		         </td>
		         
		         <td class="width-15 active">	<label class="pull-right">民族：</label></td>
		         <td class="width-35">
					<form:select path="rMinzu" class="form-control">
							<form:option value="" label="-全部-"/>
							<form:options items="${fns:getDictList('nation')}" itemLabel="label"
								itemValue="value" htmlEscape="false" />
						</form:select>
		        
		         </td>
		      </tr>
		      
		       <tr>
		      	 <td class="width-15 active">	<label class="pull-right">身份证号：</label></td>
		         <td class="width-35">
						<form:input path="rSfzh" htmlEscape="false" maxlength="50" class="form-control"/>
		         </td>
		         
		         <td class="width-15 active">	<label class="pull-right">姓名：</label></td>
		         <td class="width-35">
						<form:input path="rXm" htmlEscape="false" maxlength="50" class="form-control"/>
		         </td>
		      </tr>
		      
		      <tr>
		         <td class="width-15 active">	<label class="pull-right">性别：</label></td>
		         <td class="width-35">
		       		 	<form:select path="rXingbie" class="form-control">
		       		 		<form:option value="" label="-全部-"/>
							<form:options items="${fns:getDictList('sex')}" itemLabel="label"
								itemValue="value" htmlEscape="false" />
						</form:select>
					</td>
		         
		         <td class="width-15 active">	<label class="pull-right">年龄区间：</label></td>
		         <td class="width-35">
						<table>
							<tr>
								<td class="width-40"><form:input path="rAgeStart"
										htmlEscape="false" maxlength="3"
										class="form-control required" /></td>
								<td class="width-20">至</td>
								<td class="width-40"><form:input path="rAgeEnd"
										htmlEscape="false" maxlength="3"
										class="form-control required" /></td>
							</tr>
						</table>
					</td>
		      </tr>
		      <tr>
		         <td class="width-15 active">	<label class="pull-right">辖区：</label></td>
		         <td class="width-35">
		       		 	<form:select path="rXiaqu" class="form-control m-b">
							<form:option value="" label="-全部-"/>
							<form:options items="${fns:getDictList('tb_d_qgxzqh')}" itemLabel="label"
								itemValue="value" htmlEscape="false" />
						</form:select>
					</td>
		         
		         <td class="width-15 active">	<label class="pull-right">是否本地：</label></td>
		         <td class="width-35">
						<form:select path="rLocal" class="form-control m-b">
							<form:option value="-1" label="-全部-"/>
							<form:option value="1" label="本地"/>
							<form:option value="0" label="外地"/>
						</form:select>
					</td>
		      </tr>
		      <tr>
		         <td class="width-15 active">	<label class="pull-right">活动开始时间段：</label></td>
		         <td class="width-35" colspan="3">
						<table>
							<tr>
								<td class="width-40"><input id=rHdkssjdStart name="rHdkssjdStart" type="text" maxlength="20" class="laydate-icon form-control layer-date input-sm"
					value="${rule.rHdkssjdStart}"/></td>
								<td class="width-20">至</td>
								<td class="width-40"><input id=rHdkssjdEnd name="rHdkssjdEnd" type="text" maxlength="20" class="laydate-icon form-control layer-date input-sm"
					value="${rule.rHdkssjdEnd}"/></td>
							</tr>
						</table>
					</td>
		      </tr>
		      <tr>
		      	 <td class="width-15 active">	<label class="pull-right">活动结束时间段：</label></td>
		         <td class="width-35" colspan="3">
						<table>
							<tr>
								<td class="width-40"><input id=rHdjssjdStart name="rHdjssjdStart" type="text" maxlength="20" class="laydate-icon form-control layer-date input-sm"
					value="${rule.rHdjssjdStart}"/></td>
								<td class="width-20">至</td>
								<td class="width-40"><input id=rHdjssjdEnd name="rHdjssjdEnd" type="text" maxlength="20" class="laydate-icon form-control layer-date input-sm"
					value="${rule.rHdjssjdEnd}"/></td>
							</tr>
						</table>
					</td>
		      </tr>
		      <tr>
		         <td class="width-15 active">	<label class="pull-right">人员类别：</label></td>
		         <td class="width-35">
		       		 	<form:select path="rRylb" class="form-control m-b">
							<form:option value="" label="-全部-"/>
							<form:options items="${fns:getDictList('tb_d_zdryxl')}" itemLabel="label"
								itemValue="value" htmlEscape="false" />
						</form:select>
					</td>
		         
		         <td class="width-15 active">	<label class="pull-right">活动场所类型：</label></td>
		         <td class="width-35">
						<form:select path="rHdcslx" class="form-control m-b">
							<form:option value="" label="-全部-"/>
							<form:options items="${fns:getDictList('RULE_TYPE')}" itemLabel="label"
								itemValue="value" htmlEscape="false" />
						</form:select>
					</td>
		      </tr>
		      <tr>
		         <td class="width-15 active">	<label class="pull-right">活动场所名称：</label></td>
		         <td class="width-35" colspan="3">
		        	<form:textarea path="rHdcsmc" htmlEscape="false" rows="1" maxlength="100" class="form-control"/>
		         </td>
		      </tr>
		      <tr>
		         <td class="width-15 active">	<label class="pull-right">出发地：</label></td>
		         <td class="width-35">
		       		 	<form:select path="rCfd" class="form-control m-b">
							<form:option value="" label="-全部-"/>
							<form:options items="${fns:getDictList('tb_d_qgxzqh')}" itemLabel="label"
								itemValue="value" htmlEscape="false" />
						</form:select>
					</td>
		         
		         <td class="width-15 active">	<label class="pull-right">目的地：</label></td>
		         <td class="width-35">
						<form:select path="rMdd" class="form-control m-b">
							<form:option value="" label="-全部-"/>
							<form:options items="${fns:getDictList('tb_d_qgxzqh')}" itemLabel="label"
								itemValue="value" htmlEscape="false" />
						</form:select>
					</td>
		      </tr>
		      <tr>
		      <td class="width-15 active">	<label class="pull-right">群体大小下限：</label></td>
		         <td class="width-35">
						<form:input path="rMinsize" htmlEscape="false" maxlength="50" class="form-control"/>
		        
		         </td>
		      </tr>
		     
		 	</tbody>
		</table>
		
		<div class="tabs-container">
            <ul class="nav nav-tabs">
				<li class="active"><a data-toggle="tab" href="#tab-1" aria-expanded="true">规则任务子表：</a>
                </li>
            </ul>
            <div class="tab-content">
				<div id="tab-1" class="tab-pane active">
			<a class="btn btn-white btn-sm" onclick="addRow('#ruleTableList', ruleTableRowIdx, ruleTableTpl);ruleTableRowIdx = ruleTableRowIdx + 1;" title="新增"><i class="fa fa-plus"></i> 新增</a>
			<table id="contentTable" class="table table-striped table-bordered table-condensed">
				
				<tbody id="ruleTableList">
				</tbody>
			</table>
			<script type="text/template" id="ruleTableTpl">//<!--
				<tr id="ruleTableList{{idx}}">
					<td class="hide">
						<input id="ruleTableList{{idx}}_id" name="ruleTableList[{{idx}}].id" type="hidden" value="{{row.id}}"/>
						<input id="ruleTableList{{idx}}_delFlag" name="ruleTableList[{{idx}}].delFlag" type="hidden" value="0"/>
					</td>

					<td class="text-center" width="130px">
						活动类型
						<select id="select_fType{{idx}}" name="ruleTableList[{{idx}}].fType" class="form-control" data-value="{{row.ftype}}">
							<option value="00">汽车</option>
							<option value="01">火车</option>
							<option value="02">飞机</option>
							<option value="03">宾馆</option>
							<option value="04">网吧</option>
						</select>
					</td>
					<td class="text-center" width="170px">
					活动规则
					<select id="select_fRule{{idx}}" name="ruleTableList[{{idx}}].fRule" class="form-control" data-value="{{row.frule}}">
							<option value="1" selected="selected">同行</option>
							<option value="2">同屋居住</option>
							<option value="3">多次同住</option>
							<option value="4">同上网</option>
						</select>
					</td>
					<td class="text-center" width="80" id='td_minhangCishu{{idx}}' style="display:none">
						飞机同行次数 <input name="ruleTableList[{{idx}}].minhangCishu" type="text" value="{{row.minhangCishu}}"/>
					</td>
					<td class="text-center" width="80" id='td_minhangZjjg{{idx}}' style="display:none">
						飞机值机间隔<input name="ruleTableList[{{idx}}].minhangZjjg" type="text" value="{{row.minhangZjjg}}"/>
					</td>
					<td class="text-center" width="80" id='td_tieluCfdsfxt{{idx}}' style="display:none">
						<input type="checkbox" name="ruleTableList[{{idx}}].tieluCfdsfxt" data-value='{{row.tieluCfdsfxt}}'/> 铁路出发地是否相同
					</td>
					<td class="text-center" width="80" id='td_tieluMddsfxt{{idx}}' style="display:none">
						<input type="checkbox" name="ruleTableList[{{idx}}].tieluMddsfxt" data-value='{{row.tieluMddsfxt}}'/>铁路目的地是否相同
					</td>
					<td class="text-center" width="80" id='td_tieluTcc{{idx}}' style="display:none">
						<input type="checkbox" name="ruleTableList[{{idx}}].tieluTcc" data-value='{{row.tieluTcc}}'/>铁路同车次
					</td>
					<td class="text-center" width="80" id='td_lvdianDctzcs{{idx}}' style="display:none">
						 多次同住次数<input name="ruleTableList[{{idx}}].lvdianDctzcs" type="text" value="{{row.lvdianDctzcs}}"/>
					</td>
					<td class="text-center" width="80" id='td_lvdianRuzhusjjg{{idx}}' style="display:none">
						旅店 入住时间间隔<input name="ruleTableList[{{idx}}].lvdianRuzhusjjg" type="text" value="{{row.lvdianRuzhusjjg}}"/>
					</td>
					<td class="text-center" width="80" id='td_lvdianLikaisjjg{{idx}}' style="display:none">
						旅店离开时间间隔<input name="ruleTableList[{{idx}}].lvdianLikaisjjg" type="text" value="{{row.lvdianLikaisjjg}}"/>
					</td>
					<td class="text-center" width="80" id='td_wangbaSwjg{{idx}}' style="display:none">
						上网间隔<input name="ruleTableList[{{idx}}].wangbaSwjg" type="text" value="{{row.wangbaSwjg}}"/>
					</td>
					<td class="text-center" width="80" id='td_wangbaXwjg{{idx}}' style="display:none">
						下网间隔<input name="ruleTableList[{{idx}}].wangbaXwjg" type="text" value="{{row.wangbaXwjg}}"/>
					</td>
					<td class="text-center" width="80" id='td_qicheCfdsfxt{{idx}}' style="display:none">
						<input type="checkbox" name="ruleTableList[{{idx}}].qicheCfdsfxt" data-value='{{row.qicheCfdsfxt}}'/>汽车-出发地是否相同
					</td>
					<td class="text-center" width="80" id='td_qicheMddsfxt{{idx}}' style="display:none">
						<input type="checkbox" name="ruleTableList[{{idx}}].qicheMddsfxt" data-value='{{row.qicheMddsfxt}}'/>汽车-目的地是否相同
					</td>
					<td class="text-center" width="80" id='td_qicheTcc{{idx}}' style="display:none">
						<input type="checkbox" name="ruleTableList[{{idx}}].qicheTcc" data-value='{{row.qicheTcc}}'/>汽车-是否同车次
					</td>
					
					<td class="text-center" width="10">
						{{#delBtn}}<span class="close" onclick="delRow(this, '#ruleTableList{{idx}}')" title="删除">&times;</span>{{/delBtn}}
					</td>
				</tr>//-->
			</script>
			
			<script type="text/javascript">
				var ruleTableRowIdx = 0, ruleTableTpl = $("#ruleTableTpl").html().replace(/(\/\/\<!\-\-)|(\/\/\-\->)/g,"");
				$(document).ready(function() {
					var data = ${fns:toJson(rule.ruleTableList)};
					for (var i=0; i<data.length; i++){
						addRow('#ruleTableList', ruleTableRowIdx, ruleTableTpl, data[i]);
						ruleTableRowIdx = ruleTableRowIdx + 1;
					}
				});
			</script>
			</div>
		</div>
		</div>
	</form:form>
</body>
</html>