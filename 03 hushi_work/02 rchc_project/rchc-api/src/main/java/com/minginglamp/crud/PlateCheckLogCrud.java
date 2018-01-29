package com.minginglamp.crud;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.minginglamp.model.PlateCheckLog;

public interface PlateCheckLogCrud extends JpaRepository<PlateCheckLog, String> {
	
	@Query(value="from PlateCheckLog p where 1=1 and createTime between ?1 and ?2 and source like ?3 and plateNo like ?4 and checkaddress like ?5 and plateType like ?6 and tags like ?7 and tags like ?8 and checkdept like ?9 and policename like ?10 and policeno like ?11 and name like ?12 order by createTime desc")
	public Page<PlateCheckLog> findPage(String startTime, String endTime, String source, String plateNo,String checkaddress,String plateType,String tags,String tags2,String ucode,String policename,String policeno,String name,Pageable pageable);
	
	@Query(value="from PlateCheckLog p where 1=1 and createTime between ?1 and ?2 and source like ?3 and plate_no like ?4 and  checkaddress like ?5 and plateType like ?6 and tags like ?7 and tags like ?8 and personif = ?9 and checkdept like ?10 and policename like ?11 and policeno like ?12 and name like ?13 order by createTime desc")
	public Page<PlateCheckLog> findPageTags(String startTime, String endTime, String source,String plateNo,String checkaddress,String plateType,String tags,String tags2,String personif,String ucode,String policename,String policeno,String name,Pageable pageable);

	
	   PlateCheckLog findById(String id);
	
}
