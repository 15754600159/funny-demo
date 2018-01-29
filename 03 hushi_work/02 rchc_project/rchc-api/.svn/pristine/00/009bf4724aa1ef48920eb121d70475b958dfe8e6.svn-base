package com.minginglamp.crud;



import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.minginglamp.model.PersonCheck;
import com.minginglamp.model.PersonTagInfo;

public interface PersonCheckCrud extends JpaRepository<PersonCheck,Integer>{
	/**
	 * @return
	 */
	@Query(  value = "from PersonCheck p where 1=1 and name like %?1  and idcardNo like %?2 and national like %?3 "
			                                      + "and checkTime like %?4",
			 countQuery = "SELECT COUNT(*) from PersonCheck p where 1=1 and name like %?1  and idcardNo like %?2  and national like %?3 and checkTime like %?4"
			 )
	 public  Page<PersonCheck> overview(String name,String idcardNo,String national,String checkTime,String checkPlace,String addressDetails,String personneltype,String policeName,String queryPlace,String checkReason,Pageable pageable);
	
	
	  int deleteById(int id);
	  
	  List<PersonCheck> findByIdcardNo(String  idcardNo);
	  
	  
	  
	 
	  
}
