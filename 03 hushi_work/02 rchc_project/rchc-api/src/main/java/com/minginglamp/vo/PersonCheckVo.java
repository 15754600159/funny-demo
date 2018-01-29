package com.minginglamp.vo;

import com.minginglamp.model.PersonCheck;

public class PersonCheckVo implements java.io.Serializable {

	
	private static final long serialVersionUID = 5093077222333366963L;
	
	PersonCheck personCheck;
	
	private String pcode;
	 
	private String policeName;
	private String policePhone;
	
	private String ucode;
	
	private String idcardNo;
	
	
	private String name;
	
	private String sex;
	
	private String national;
	private String addressDetails;
	
	private String domicile;
	
	
	private String personneltype;
	
	private String checkTime;
	
	private String queryType;
	
	private String queryPlace;
	
	private String checkAddress;
	
	private String qgztry;
	
	private String qgwffz;
	
	private String qgxfd;
	private String bdzdry;
	
	private String checkReason;
	
	private String localFlag;
	private String checkLocation;
	
	private String checkPlace;
	private String checkFlag;
	
	private int count;
	
	

	public int getCount() {
		return count;
	}
	public void setCount(int count) {
		this.count = count;
	}
	public PersonCheck getPersonCheck() {
		return personCheck;
	}
	public void setPersonCheck(PersonCheck personCheck) {
		this.personCheck = personCheck;
	}
	public String getPcode() {
		return pcode;
	}
	public void setPcode(String pcode) {
		this.pcode = pcode;
	}
	public String getPoliceName() {
		return policeName;
	}
	public void setPoliceName(String policeName) {
		this.policeName = policeName;
	}
	public String getPolicePhone() {
		return policePhone;
	}
	public void setPolicePhone(String policePhone) {
		this.policePhone = policePhone;
	}
	public String getUcode() {
		return ucode;
	}
	public void setUcode(String ucode) {
		this.ucode = ucode;
	}
	public String getIdcardNo() {
		return idcardNo;
	}
	public void setIdcardNo(String idcardNo) {
		this.idcardNo = idcardNo;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getSex() {
		return sex;
	}
	public void setSex(String sex) {
		this.sex = sex;
	}
	public String getNational() {
		return national;
	}
	public void setNational(String national) {
		this.national = national;
	}
	public String getAddressDetails() {
		return addressDetails;
	}
	public void setAddressDetails(String addressDetails) {
		this.addressDetails = addressDetails;
	}
	public String getDomicile() {
		return domicile;
	}
	public void setDomicile(String domicile) {
		this.domicile = domicile;
	}
	public String getPersonneltype() {
		return personneltype;
	}
	public void setPersonneltype(String personneltype) {
		this.personneltype = personneltype;
	}
	public String getCheckTime() {
		return checkTime;
	}
	public void setCheckTime(String checkTime) {
		this.checkTime = checkTime;
	}
	public String getQueryType() {
		return queryType;
	}
	public void setQueryType(String queryType) {
		this.queryType = queryType;
	}
	public String getQueryPlace() {
		return queryPlace;
	}
	public void setQueryPlace(String queryPlace) {
		this.queryPlace = queryPlace;
	}
	public String getCheckAddress() {
		return checkAddress;
	}
	public void setCheckAddress(String checkAddress) {
		this.checkAddress = checkAddress;
	}
	public String getQgztry() {
		return qgztry;
	}
	public void setQgztry(String qgztry) {
		this.qgztry = qgztry;
	}
	public String getQgwffz() {
		return qgwffz;
	}
	public void setQgwffz(String qgwffz) {
		this.qgwffz = qgwffz;
	}
	public String getQgxfd() {
		return qgxfd;
	}
	public void setQgxfd(String qgxfd) {
		this.qgxfd = qgxfd;
	}
	public String getBdzdry() {
		return bdzdry;
	}
	public void setBdzdry(String bdzdry) {
		this.bdzdry = bdzdry;
	}
	public String getCheckReason() {
		return checkReason;
	}
	public void setCheckReason(String checkReason) {
		this.checkReason = checkReason;
	}
	public String getLocalFlag() {
		return localFlag;
	}
	public void setLocalFlag(String localFlag) {
		this.localFlag = localFlag;
	}
	public String getCheckLocation() {
		return checkLocation;
	}
	public void setCheckLocation(String checkLocation) {
		this.checkLocation = checkLocation;
	}
	public String getCheckPlace() {
		return checkPlace;
	}
	public void setCheckPlace(String checkPlace) {
		this.checkPlace = checkPlace;
	}
	public String getCheckFlag() {
		return checkFlag;
	}
	public void setCheckFlag(String checkFlag) {
		this.checkFlag = checkFlag;
	}
	public static long getSerialversionuid() {
		return serialVersionUID;
	}
	
	
	public PersonCheck  change(PersonCheckVo personCheckVo)
	{
		PersonCheck personCheck = new PersonCheck();
		personCheck.setPcode(personCheckVo.getPcode());
		personCheck.setPoliceName(personCheckVo.getPoliceName());
		personCheck.setPolicePhone(personCheckVo.getPolicePhone());
		personCheck.setUcode(personCheckVo.getUcode());
		personCheck.setIdcardNo(personCheckVo.getIdcardNo());
		personCheck.setName(personCheckVo.getName());
		personCheck.setSex(personCheckVo.getSex());
		personCheck.setNational(personCheckVo.getNational());
		personCheck.setAddressDetails(personCheckVo.getAddressDetails());
		personCheck.setDomicile(personCheckVo.getDomicile());
		personCheck.setPersonneltype(personCheckVo.getPersonneltype());
		personCheck.setCheckTime(personCheckVo.getCheckTime());
		personCheck.setQueryType(personCheckVo.getQueryType());
		personCheck.setQueryPlace(personCheckVo.getQueryPlace());
		personCheck.setCheckAddress(personCheckVo.getCheckAddress());
		personCheck.setQgztry(personCheckVo.getQgztry());
		personCheck.setQgwffz(personCheckVo.getQgwffz());
		personCheck.setQgxfd(personCheckVo.getQgxfd());
		personCheck.setBdzdry(personCheckVo.getBdzdry());
		personCheck.setCheckReason(personCheckVo.getCheckReason());
		personCheck.setLocalFlag(personCheckVo.getLocalFlag());
		personCheck.setCheckLocation(personCheckVo.getCheckLocation());
		personCheck.setCheckPlace(personCheckVo.getCheckPlace());
		personCheck.setCheckFlag(personCheckVo.getCheckFlag());
		
		return personCheck;
	}
	
	 
}
