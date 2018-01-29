package com.minginglamp.vo;

import lombok.Data;

@Data
public class CheckPersonListVo {

	// 重点人员类型
	private String personType;
	// 人员标签
	private String tags;

	private String name;

	private String sfzh;

	private String sex;

	private String nation;
	// 核查时间
	private String createTime;
	// 核查单位
	private String checkdept;
	// 警员姓名
	private String policeName;
	// 警员手机号
	private String policephone;
	// 核查地点
	private String checkAddress;

	private String checkPlace;
	//户籍地
	private String hjdPlace;
}
