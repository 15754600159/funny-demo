/* eslint-disable quotes */
app.constants = {
	// 重大事件预警码表
	zdsjyj_dict_array: [
		'nation', //民族
		'gjc',  //关键词
		'qbxslb', //情报线索类别
		'asjbs',  //案事件标识
		'cylb',  //成员类别
		'xb', //性别
		'xsly', //线索来源
		'xsgglb', //线索骨干类别
		'xsggryjs', //线索骨干人员角色
		'sjccssgm', //涉及损失
		'sjzdhd', //涉及重大活动
		'asjdlb', //案事地点类别
		'sszt', //涉事主体
		'sjrsgm', //涉及人数
		'xsly', //线索信息来源
		'ssyy', //涉事诱因
		'bxxs', //表现形式
		'sjmgsd', //涉及敏感时点 -- (另外接口获取)
		// 'sslb', //涉事类别 -- (另外接口获取)
		// 'personCategory', //人员类别 -- (另外接口获取)
	],
	// sslbTreeData: {}, //涉事类别树数据
	// rylbTreeData: {}, //人员类别树数据
	// mgsqFullData: {}, //敏感时期详细数据
	// cjdwTreeData: {}, //采集单位树数据
	userStatus: {
		nameMap: {
			"0": "已删除",
			"1": "可用",
			"2": "禁用"
		},
		keyMap: {
			"已删除": "0",
			"可用": "1",
			"禁用": "2"
		}
	},
	// 数据字典类型
	dataDictType: {
		nameMap: {
			"10": "性别",
			"11": "籍贯",
			"12": "民族",
			"13": "政治面貌",
			"21": "警衔",
			"22": "职务",
		}
	},
	genderCode: {
		nameMap: {
			"1": "男",
			"2": "女",
			"3": "未知",
			"9": "未说明",
		}
	},
	// 政治面貌
	politicsStatus: {
		nameMap: {
			"1": "党员",
			"2": "团员",
			"3": "群众"
		}
	},
	//警衔
	policeRankCode: {
		nameMap: {
			"1": "总警监",
			"2": "副总警监",
			"3": "警监（一级）",
			"4": "警监（二级）",
			"5": "警监（三级）",
			"6": "警司（一级）",
			"7": "警司（二级）",
			"8": "警司（三级）",
			"9": "警员（一级）",
			"10": "警员（二级）"
		}
	},
	//职务
	positionCode: {
		nameMap: {
			"1": "一级警员",
			"2": "二级警员",
			"3": "三级警员",
			"4": "一级警长",
			"5": "二级警长",
			"6": "三级警长",
			"7": "四级警长"
		}
	},
	originCode: {
		nameMap: {
			"11": "北京市",
			"12": "天津市",
			"13": "河北省",
			"14": "山西省",
			"15": "内蒙古自治区",
			"21": "辽宁省",
			"22": "吉林省",
			"23": "黑龙江省",
			"31": "上海市",
			"32": "江苏省",
			"33": "浙江省",
			"34": "安徽省",
			"35": "福建省",
			"36": "江西省",
			"37": "山东省",
			"41": "河南省",
			"42": "湖北省",
			"43": "湖南省",
			"44": "广东省",
			"45": "广西壮族自治区",
			"46": "海南省",
			"50": "重庆市",
			"51": "四川省",
			"52": "贵州省",
			"53": "云南省",
			"54": "西藏自治区",
			"61": "陕西省",
			"62": "甘肃省",
			"63": "青海省",
			"64": "宁夏回族自治区",
			"65": "新疆维吾尔自治区",
			"71": "台湾省",
			"81": "香港特别行政区",
			"82": "澳门特别行政区"
		}
	},
	nationCode: {
		nameMap: {
			"01": "汉族",
			"02": "蒙古族",
			"03": "回族",
			"04": "藏族",
			"05": "维吾尔族",
			"06": "苗族",
			"07": "彝族",
			"08": "壮族",
			"09": "布依族",
			"10": "朝鲜族",
			"11": "满族",
			"12": "侗族",
			"13": "瑶族",
			"14": "白族",
			"15": "土家族",
			"16": "哈尼族",
			"17": "哈萨克族",
			"18": "傣族",
			"19": "黎族",
			"20": "傈僳族",
			"21": "佤族",
			"22": "畲族",
			"23": "高山族",
			"24": "拉祜族",
			"25": "水族",
			"26": "东乡族",
			"27": "纳西族",
			"28": "景颇族",
			"29": "柯尔克孜族",
			"30": "土族",
			"31": "达斡尔族",
			"32": "仫佬族",
			"33": "羌族",
			"34": "布朗族",
			"35": "撒拉族",
			"36": "毛难族",
			"37": "仡佬族",
			"38": "锡伯族",
			"39": "阿昌族",
			"40": "普米族",
			"41": "塔吉克族",
			"42": "怒族",
			"43": "乌孜别克族",
			"44": "俄罗斯族",
			"45": "鄂温克族",
			"46": "崩龙族",
			"47": "保安族",
			"48": "裕固族",
			"49": "京族",
			"50": "塔塔尔族",
			"51": "独龙族",
			"52": "鄂伦春族",
			"53": "赫哲族",
			"54": "门巴族",
			"55": "珞巴族",
			"56": "基诺族",
			"97": "其他"
		}
	}
};
