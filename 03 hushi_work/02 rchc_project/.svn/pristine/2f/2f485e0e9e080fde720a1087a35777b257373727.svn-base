package com.minginglamp.model;

import java.sql.ResultSet;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;

import lombok.Data;
import lombok.ToString;

@Data
@ToString
@Entity
@Table(name="person_tag_info")
public class PersonTagInfo {

	
	private static final long serialVersionUID = -3641426206379490180L;
	@Id
	@GeneratedValue
	private Integer id;
	
	 @Column(name = "sfzh")
	private String sfzh;
	 
	 @Column(name = "tag")
	private String tag;
	 
	 @Column(name = "tag_info")
	private String tagInfo;

//	public PersonTagInfo(Integer id, String sfzh, String tag, String tagInfo) {
//		super();
//		this.id = id;
//		this.sfzh = sfzh;
//		this.tag = tag;
//		this.tagInfo = tagInfo;
//	}
//
//	public static PersonTagInfo getPersonTagInfo(ResultSet rs) throws Exception{
//			return new PersonTagInfo(rs.getInt("id"), rs.getString("sfzh"),rs.getString("tag"), rs.getString("tag_info"));
//		}
	
	 
}
