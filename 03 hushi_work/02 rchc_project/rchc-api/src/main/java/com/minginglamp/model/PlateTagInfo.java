package com.minginglamp.model;

import java.sql.ResultSet;
import java.sql.SQLException;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;

import org.apache.hadoop.hdfs.server.namenode.status_jsp;
import org.hibernate.annotations.GenericGenerator;

import lombok.Data;
import lombok.ToString;

/**
 * 
 * @author thn
 *
 */
@Data
@ToString
@Entity
@Table(name = "plate_tag_info")
public class PlateTagInfo {
	private static final long serialVersionUID = -8305384335499291806L;
	
	@Id
    @Column(name = "id", nullable = true)
    @GenericGenerator(name="idGenerator", strategy="uuid") //这个是hibernate的注解/生成32位UUID
    @GeneratedValue(generator="idGenerator")
    private int id;
	
	@Column(name = "plate_type",nullable = false)
    private String plateType;
	
	@Column(name = "plate_no",nullable = false)
    private String plateNo;
	
	@Column(name = "tag",nullable = false)
    private String tag;
	
	@Column(name = "tag_info",nullable = false)
    private String tagInfo;

//	public int getId() {
//		return id;
//	}
//
//	public void setId(int id) {
//		this.id = id;
//	}
//
//	public String getPlateNo() {
//		return plateNo;
//	}
//
//	public void setPlateNo(String plateNo) {
//		this.plateNo = plateNo;
//	}
//
//	public String getTag() {
//		return tag;
//	}
//
//	public void setTag(String tag) {
//		this.tag = tag;
//	}
//
//	public String getTagInfo() {
//		return tagInfo;
//	}
//
//	public void setTagInfo(String tagInfo) {
//		this.tagInfo = tagInfo;
//	}
//	
//	public String getPlateType() {
//		return plateType;
//	}
//
//	public void setPlateType(String plateType) {
//		this.plateType = plateType;
//	}
//
//	public static long getSerialversionuid() {
//		return serialVersionUID;
//	}
//
//	public PlateTagInfo(int id, String plateType ,String plateNo, String tag, String tagInfo) {
//		super();
//		this.id = id;
//		this.plateType = plateType;
//		this.plateNo = plateNo;
//		this.tag = tag;
//		this.tagInfo = tagInfo;
//	}
//	
//	public static PlateTagInfo getPlateTagInfo(ResultSet rs) throws Exception{
//		return new PlateTagInfo(rs.getInt("id"), rs.getString("plate_type"),rs.getString("plate_no"), rs.getString("tag"), rs.getString("tag_info"));
//	}
	
}
