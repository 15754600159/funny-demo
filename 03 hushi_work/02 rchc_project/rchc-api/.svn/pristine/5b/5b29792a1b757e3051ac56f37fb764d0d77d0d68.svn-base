package com.minginglamp.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;

import org.hibernate.annotations.GenericGenerator;

import lombok.Data;
import lombok.ToString;

@Data
@ToString
@Entity
@Table(name="plate_check_log")
public class PlateCheckLog {
	@Id
    @Column(name = "id", nullable = false)
    @GenericGenerator(name="idGenerator", strategy="uuid") //这个是hibernate的注解/生成32位UUID
    @GeneratedValue(generator="idGenerator")
    private String id;
	
	/**
	 * 查询来源
	 */
	@Column(name = "source")
	private String source;
	
	/**
	 * 车牌类型
	 */
	@Column(name = "plate_type")
	private String plateType;
	
	/**
	 * 车牌号
	 */
	@Column(name = "plate_no")
	private String plateNo;
	
	/**
	 * 所有的tag标签，以空格分割
	 */
	@Column(name = "tags")
	private String tags;
	
	/**
	 * 详细的tag信息
	 */
	@Column(name = "tagsContent")
	private String tagsContent;
	
	@Column(name = "create_time")
	private String createTime;
	
	@Column(name = "push_target")
	private String pushTarget;
	
	/**
	 * 身份证号
	 */
	@Column(name = "sfzh")
	private String sfzh;
	
	/**
	 * 車主姓名
	 */
	@Column(name = "name")
	private String name;
	
	/**
	 * 性别
	 */
	@Column(name = "sex")
	private String sex;
	
	/**
	 * 民族
	 */
	@Column(name = "nation")
	private String nation;
	
	/**
	 * 顏色
	 */
	@Column(name = "color")
	private String color;
	
	/**
	 * 车辆类型
	 */
	@Column(name = "vehicle_type")
	private String vehicleType;
	
	/**
	 * 是否正常人
	 */
	@Column(name = "personif")
	private String personif;
	
	/**
	 * 处置要求
	 */
	@Column(name = "czyq")
	private String czyq;
	
	/**
	 * 检查地点
	 */
	@Column(name = "check_address")
	private String checkaddress;
	
	/**
	 * 经纬度
	 */
	@Column(name = "location")
	private String location;
	
	/**
	 * 所属单位
	 */
	@Column(name = "checkdept")
	private String checkdept;
	
	/**
	 * 核查原因
	 */
	@Column(name = "check_reason")
	private String checkreason;
	
	/**
	 * 警员编号
	 */
	@Column(name = "policeno")
	private String policeno;
	
	/**
	 * 警员姓名
	 */
	@Column(name = "police_name")
	private String policename;
	
	/**
	 * 警员手机号
	 */
	@Column(name = "policephone")
	private String policephone;
	
	@Column(name = "update_jwt_flag")
	private String updatejwtflag;
	
	//birthplace
	@Column(name = "birthplace")
	private String birthplace;
	
	@Column(name = "lg_place")
	private String lgdw;
	
	
}
