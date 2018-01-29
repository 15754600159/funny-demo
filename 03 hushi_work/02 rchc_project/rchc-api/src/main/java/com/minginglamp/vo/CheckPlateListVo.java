package com.minginglamp.vo;

import lombok.Data;

@Data
public class CheckPlateListVo {

	// 标签
	private String tags;

	private String sfzh;

	private String plateType;

	private String name;

	private String plateNo;
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
	// 核查地点
	private String checkPlace;

}
