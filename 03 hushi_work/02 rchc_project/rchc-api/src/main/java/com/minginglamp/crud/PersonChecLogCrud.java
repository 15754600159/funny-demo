package com.minginglamp.crud;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.minginglamp.model.PersonCheckLog;

/**
 * Created by lilongfei on 2017/5/20.
 */
public interface PersonChecLogCrud extends JpaRepository<PersonCheckLog,String>{

//    List<PersonCheckLog> getBySeq(String seq);
	/*//全部数据tags参数00
	@Query(value="from PersonCheckLog p where 1=1 and createTime between ?1 and ?2 and sfzh like ?3 and source like ?4 and tags like ?5 and checkaddress like ?6 and personType like ?7 and tags like ?8 and name like ?9 and checkdept like ?10 and policename like ?11 and policeno like ?12 order by createTime desc")
	public Page<PersonCheckLog> findPage(String startTime, String endTime,String sfzh, String tagetunit,String tags, String checkaddress,String personType,String tags2,String names,String ucode,String policename,String policeno,Pageable pageable);
	
	//预警数据tags参数01
	@Query(value="from PersonCheckLog p where 1=1 and createTime between ?1 and ?2 and sfzh like ?3 and source like ?4  and tags like ?5 and checkaddress like ?6 and personType like ?7 and tags like ?8 and personif = ?9 and name like ?10 and checkdept like ?11 and policename like ?12 and policeno like ?13 order by createTime desc")
	public Page<PersonCheckLog> findPageTags(String startTime, String endTime,String sfzh,String tagetunit,String tags,String checkaddress,String personType, String tags2,String personif,String names,String ucode,String policename,String policeno,Pageable pageable);*/
	
	
//	List<PersonCheckLog> getBySeq(String seq);
	List<PersonCheckLog> findBySfzh(String sfzh);

}
