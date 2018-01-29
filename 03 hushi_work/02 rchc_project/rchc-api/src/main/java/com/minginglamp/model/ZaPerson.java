package com.minginglamp.model;

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
@Table(name="za_v_r_person_jzl_1501")
public class ZaPerson {

	@Id
	@GeneratedValue
	 @Column(name = "f_personid")
	private String fpersonid;
	
	 @Column(name = "f_name")
		private String fname;
	 
	 @Column(name = "f_sex")
		private String fsex;
	 
	 @Column(name = "f_birthday")
		private String fbirthday;
	 
	 @Column(name = "f_nation")
		private String fnation;
	 
	 @Column(name = "f_cardtype")
		private String fcardtype;
	 
	 @Column(name = "f_cardnum")
		private String fcardnum;
	 
	 @Column(name = "f_region")
		private String fregion;
	 
	 @Column(name = "f_address")
		private String faddress;
	 
	 @Column(name = "f_regperson")
		private String fregperson;
	 
	 
	 @Column(name = "f_regtime")
		private String fregtime;
	 
	 @Column(name = "f_reglinktype")
		private String freglinktype;
	 
	 @Column(name = "f_uploadtime")
		private String fuploadtime;
	 
	 @Column(name = "f_companynum")
		private String fcompanynum;
	 
	 @Column(name = "f_terminalnum")
		private String fterminalnum;
	 
	 @Column(name = "f_version")
		private String fversion;
	 
	 @Column(name = "f_name_qp")
		private String fnameqp;
	 
	 @Column(name = "f_orgid")
		private String forgid;
	 
	 @Column(name = "f_collecttype")
		private String fcollecttype;
	 
	 @Column(name = "sysdate")
		private String sysdate;
	 
	 @Column(name = "sjly")
		private String sjly;
	 
	 @Column(name = "jczbs")
		private String jczbs;
	
	 @Column(name = "f_lib_code")
		private String flibcode;
	
}
