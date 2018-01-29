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
@Table(name="local_concern_cars")
public class LocalConcernCars {
	
	private static final long serialVersionUID = -3641426206379490180L;
	@Id
    @Column(name = "id", nullable = true)
    @GenericGenerator(name="idGenerator", strategy="uuid") //这个是hibernate的注解/生成32位UUID
    @GeneratedValue(generator="idGenerator")
	private String id;
	
	 @Column(name = "owner_name")
     private String ownerName;
	 
	 @Column(name = "owner_idcard_no")
     private String ownerIdcardNo;
	 
	 @Column(name = "owner_phone")
     private String ownerPhone;
	 
	 @Column(name = "plate_no")
     private String plateNo;
	 
	 @Column(name = "plate_type")
     private String plateType;
	 
	 @Column(name = "china_car_brand")
     private String chinaCarBrand;
	 
	 @Column(name = "hjdq_place")
     private String hjdqPlace;
	 
	 @Column(name = "reason")
     private String reason;
	 
	 @Column(name = "hjdq_address")
     private String hjdqAddress;
	 
	 @Column(name = "xz_place")
     private String xzPlace;
	 @Column(name = "deal_request")
     private String dealRequest;

	 @Column(name = "import_time")
		private String importTime;
		
		@Column(name = "import_no")
		private String importNo;
		
		@Column(name = "bd_endtime")
		private String bdEndtime;
		
		
		@Column(name = "cx_sign")
		private String cxSign;
		
		@Column(name = "import_name")
		private String importName;
		
		@Column(name = "data_type")
		private String dataType;
		
}
