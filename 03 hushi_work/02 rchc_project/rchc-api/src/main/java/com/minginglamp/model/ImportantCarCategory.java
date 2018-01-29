package com.minginglamp.model;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonFormat;

import lombok.Data;
import lombok.ToString;

@Data
@ToString
@Entity
@Table(name="important_car_category")
public class ImportantCarCategory {
	@Id
	@GeneratedValue
	private Integer id;
	
	 @Column(name = "code")
	 private String code;
	 
	 
	 @Column(name = "name")
	 private String name;
	 
	 @Column(name = "subcode")
	 private String subcode;
	 
	 @Column(name = "subname")
	 private String subname;
	 
    @JsonFormat(pattern = "yyyy/MM/dd HH:mm:ss")
    @Column(name = "create_time",nullable = false)
    private Date createTime;
	 
}
