package com.minginglamp.crud;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import com.minginglamp.model.LocalConcernPersons;


public interface LocalPersonCrud extends JpaRepository<LocalConcernPersons,Integer>{

	
	   @Query(value = "update local_concern_persons set name=?2 , idcard_no=?3 , sex=?4 , national=?5 , hjdq_place=?6 , hjdq_address=?7 , xz_place=?8 , xz_address=?9 "
	   		+ ", lg_place=?10 , lg_person=?11 , reason=?12 , deal_request=?13,  bd_endtime=?14, data_type=?15 where Id=?1 ", nativeQuery = true)
	   @Modifying  
	   public int updateLocalPerson(String id,String name,String idcardNo,String sex,String national,String hjdqPlace,String hjdqAddress,String xzPlace,String xzAddress,String lgPlace,String lgPerson,String reason,
				String dealRequest,String bdEndtime,String dataType);
}
