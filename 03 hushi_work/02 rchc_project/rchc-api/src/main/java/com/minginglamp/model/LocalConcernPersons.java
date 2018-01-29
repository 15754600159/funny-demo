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
@Table(name="local_concern_persons")
public class LocalConcernPersons {

	private static final long serialVersionUID = -3641426206379490180L;


	@Id
    @Column(name = "Id", nullable = true)
    @GenericGenerator(name="idGenerator", strategy="uuid") //这个是hibernate的注解/生成32位UUID
    @GeneratedValue(generator="idGenerator")
    private String id;
	
	@Column(name = "name")
	private String name;
	
	@Column(name = "idcard_no")
	private String idcardNo;
	
	@Column(name = "sex")
	private String sex;
	@Column(name = "national")
	private String national;
	
	@Column(name = "hjdq_place")
	private String hjdqPlace;
	
	@Column(name = "hjdq_address")
	private String hjdqAddress;
	
	@Column(name = "xz_place")
	private String xzPlace;
	
	@Column(name = "xz_address")
	private String xzAddress;
	
	@Column(name = "lg_place")
	private String lgPlace;
	
	
	@Column(name = "lg_person")
	private String lgPerson;
	
	@Column(name = "reason")
	private String reason;
	
	@Column(name = "deal_request")
	private String dealRequest;
	
	@Column(name = "data_type")
	private String dataType;
	
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
	
	
}
