package com.minginglamp.service;

import java.io.IOException;

import org.springframework.stereotype.Service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;

@Service
public class DictionaryService {

	public JsonNode getNational() {
		String national = "{\"01\":\"汉\",\"02\":\"蒙古\",\"03\":\"回\",\"04\":\"藏\",\"05\":\"维吾尔\",\"06\":\"苗\",\"07\":\"彝\",\"08\":\"壮\",\"09\":\"布依\",\"10\":\"朝鲜\",\"11\":\"满\",\"12\":\"侗\",\"13\":\"瑶\",\"14\":\"白\",\"15\":\"土家\",\"16\":\"哈尼\",\"17\":\"哈萨克\",\"18\":\"傣\",\"19\":\"黎\",\"20\":\"傈僳\",\"21\":\"佤\",\"22\":\"畲\",\"23\":\"高山\",\"24\":\"拉祜\",\"25\":\"水\",\"26\":\"东乡\",\"27\":\"纳西\",\"28\":\"景颇\",\"29\":\"柯尔克孜\",\"30\":\"土\",\"31\":\"达斡尔\",\"32\":\"仫佬\",\"33\":\"羌\",\"34\":\"布朗\",\"35\":\"撒拉\",\"36\":\"毛南\",\"37\":\"仡佬\",\"38\":\"锡伯\",\"39\":\"阿昌\",\"40\":\"普米\",\"41\":\"塔吉克\",\"42\":\"怒\",\"43\":\"乌孜别克\",\"44\":\"俄罗斯\",\"45\":\"鄂温克\",\"46\":\"崩龙\",\"47\":\"保安\",\"48\":\"裕固\",\"49\":\"京\",\"50\":\"塔塔尔\",\"51\":\"独龙\",\"52\":\"鄂伦春\",\"53\":\"赫哲\",\"54\":\"门巴\",\"55\":\"珞巴\",\"56\":\"基诺\",\"57\":\"其它\",\"58\":\"入籍\",\"98\":\"外国血统\",\"99\":\"不祥\"}";
		ObjectMapper mapper = new ObjectMapper();
		JsonNode nationalJsonNode = null;
		try {
			nationalJsonNode = mapper.readTree(national);
		} catch (JsonProcessingException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return nationalJsonNode;
	}
	
	public JsonNode getLibCode() {
		String libCode = "{\"A_0101\":\"在逃人员\",\"A_0201\":\"全国吸贩毒人员\",\"A_0301\":\"全国被盗抢车辆\",\"A_0401\":\"全国违法犯罪人员\",\"B_0101\":\"布控人员\",\"B_0201\":\"布控国外人员\",\"B_0301\":\"布控手机\",\"B_0401\":\"布控车辆\",\"B_0501\":\"高危地区人员\",\"C_0101\":\"涉稳人员\",\"C_0201\":\"信访重点人员\",\"C_0202\":\"精神病人\",\"C_0203\":\"吸贩毒人员\",\"C_0204\":\"涉枪重点人员\",\"C_0205\":\"涉爆重点人员\",\"C_0206\":\"信访关注人员\",\"C_0207\":\"涉恐人员\",\"C_0208\":\"高危重点人员\",\"C_0209\":\"涉访人员\",\"C_0299\":\"其他重点人员\",\"D_0101\":\"高频加油人员\",\"D_0201\":\"高频加油车辆\",\"D_0301\":\"高频来访人员\",\"D_0401\":\"购油人员上访\",\"D_0501\":\"上访人员购油\",\"D_0601\":\"一键报警\",\"D_0701\":\"查缉堵截人员\",\"D_0702\":\"查缉堵截车辆\",\"D_0801\":\"爆破物品隔夜\"}";
		ObjectMapper mapper = new ObjectMapper();
		JsonNode libCodeJsonNode = null;
		try {
			libCodeJsonNode = mapper.readTree(libCode);
		} catch (JsonProcessingException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return libCodeJsonNode;
	}

	public JsonNode getPlateType() {
		String plateType = "{\"01\":\"大型汽车号牌\",\"02\":\"小型汽车号牌\",\"03\":\"使馆汽车号牌\",\"04\":\"领馆汽车号牌\",\"05\":\"境外汽车号牌\",\"06\":\"外籍汽车号牌\",\"07\":\"两、三轮摩托车号牌\",\"08\":\"两、三轮摩托车号牌\",\"09\":\"使馆摩托车号牌\",\"10\":\"领馆摩托车号牌\",\"11\":\"境外摩托车号牌\",\"12\":\"外籍摩托车号牌\",\"13\":\"农用运输车号牌\",\"14\":\"拖拉机号牌\",\"15\":\"挂车号牌\",\"16\":\"教练汽车号牌\",\"17\":\"教练摩托车号牌\",\"18\":\"试验汽车号牌\",\"19\":\"试验摩托车号牌\",\"20\":\"临时入境汽车号牌\",\"21\":\"临时入境摩托车号牌\",\"22\":\"临时行驶车号牌\",\"23\":\"警用汽车号牌\",\"24\":\"警用摩托号牌\",\"99\":\"其他号牌\"}";
		ObjectMapper mapper = new ObjectMapper();
		JsonNode plateTypeJsonNode = null;
		try {
			plateTypeJsonNode = mapper.readTree(plateType);
		} catch (JsonProcessingException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return plateTypeJsonNode;
	}
	
	public JsonNode ungetPlateType() {
		String plateType = "{\"大型汽车号牌\":\"01\",\"小型汽车号牌\":\"02\",\"使馆汽车号牌\":\"03\",\"领馆汽车号牌0\":\"4\",\"境外汽车号牌\":\"05\",\"外籍汽车号牌\":\"06\",\"两、三轮摩托车号牌\":\"07\",\"两、三轮摩托车号牌\":\"08\",\"使馆摩托车号牌\":\"09\",\"领馆摩托车号牌\":\"10\",\"境外摩托车号牌\":\"11\",\"外籍摩托车号牌\":\"12\",\"农用运输车号牌\":\"13\",\"拖拉机号牌\":\"14\",\"挂车号牌\":\"15\",\"教练汽车号牌\":\"16\",\"教练摩托车号牌\":\"17\",\"试验汽车号牌\":\"18\",\"试验摩托车号牌\":\"19\",\"临时入境汽车号牌\":\"20\",\"临时入境摩托车号牌\":\"21\",\"临时行驶车号牌\":\"22\",\"警用汽车号牌\":\"23\",\"警用摩托号牌\":\"24\",\"其他号牌\":\"99\"}";
		ObjectMapper mapper = new ObjectMapper();
		JsonNode plateTypeJsonNode = null;
		try {
			plateTypeJsonNode = mapper.readTree(plateType);
		} catch (JsonProcessingException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return plateTypeJsonNode;
	}

	public JsonNode getBodyColor() {
		String bodyColor = "{\"1\":\"红色\",\"2\":\"橙色\",\"4\":\"黄色\",\"5\":\"蓝色\",\"A\":\"白\",\"B\":\"灰\",\"C\":\"黄\",\"D\":\"粉\",\"E\":\"红\",\"G\":\"绿\",\"H\":\"蓝\",\"I\":\"棕\",\"J\":\"黑\",\"Z\":\"其他\"}";
		ObjectMapper mapper = new ObjectMapper();
		JsonNode bodyColorJsonNode = null;
		try {
			bodyColorJsonNode = mapper.readTree(bodyColor);
		} catch (JsonProcessingException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return bodyColorJsonNode;
	}

	public JsonNode getSblx() {
		String sblxMap = "{\"jj\":\"交警人证核验机\" ,\"jwt\":\"警务通\", \"zj\":\"闸机\", \"lte\":\"LTE\",\"xfj\":\"信访局\"}";
		ObjectMapper mapper = new ObjectMapper();
		JsonNode sblxJsonNode = null;
		try {
			sblxJsonNode = mapper.readTree(sblxMap);
		} catch (JsonProcessingException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return sblxJsonNode;
	}
	// 实时比对来源
	public JsonNode getSsbdly() {
		String sblxMap = "{\"jj\":\"交警\" ,\"jwt\":\"警务通\", \"xfj\":\"信访局\", \"hcz\":\"火车站闸机\",\"lte\":\"华为LTE\",\"pda\":\"PDA\",\"zhhzx\":\"指挥中心\"};";
		ObjectMapper mapper = new ObjectMapper();
		JsonNode ssbdlyJsonNode = null;
		try {
			ssbdlyJsonNode = mapper.readTree(sblxMap);
		} catch (JsonProcessingException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return ssbdlyJsonNode;
	}
	
}
