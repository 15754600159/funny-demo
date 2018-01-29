package com.minginglamp.crud;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.minginglamp.model.PlateTagInfo;

public interface CarTagInfoCrud extends JpaRepository<PlateTagInfo,Integer>{
	
	List<PlateTagInfo> findByPlateNoAndTagAndPlateType(String plateNo,String tag,String plateType);
	


}
