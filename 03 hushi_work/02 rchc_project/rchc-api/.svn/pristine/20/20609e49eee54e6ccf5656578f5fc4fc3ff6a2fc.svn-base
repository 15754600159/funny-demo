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
@Table(name="person_check_log")
public class PersonCheckLog {
	
	private static final long serialVersionUID = -3641426206379490180L;
    @Id
    @Column(name = "id", nullable = true)
    @GenericGenerator(name="idGenerator", strategy="uuid") //这个是hibernate的注解/生成32位UUID
    @GeneratedValue(generator="idGenerator")
    private String id;
	
	@Column(name = "source")
	private String source;
	
	@Column(name = "sfzh")
	private String sfzh;
	
	@Column(name = "person_type")
	private String personType;
	
	@Column(name = "push_result")
	private String pushResult;
	
	@Column(name = "personif")
	private String personif;
	
	@Column(name = "tags")
	private String tags;
	
	@Column(name = "tagsContent")
	private String tagsContent;
	
	@Column(name = "name")
	private String name;
	
	@Column(name = "push_taget")
	private String pushTaget;
	
	@Column(name = "create_time")
	private String createTime;
	
	@Column(name = "birthday")
	private String birthday;
	
	@Column(name = "birthplace")
	private String birthplace;
	
	@Column(name = "nation")
	private String nation;
	
	@Column(name = "sex")
	private String sex;
	
	@Column(name = "czyq")
	private String czyq;
	
	@Column(name = "lg_place")
	private String lgdw;
	
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
	 * 核查原因
	 */
	@Column(name = "check_reason")
	private String checkreason;
	
	/**
	 * 警员手机号
	 */
	@Column(name = "policephone")
	private String policephone;
	
}
