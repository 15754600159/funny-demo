package com.minginglamp.crud;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import com.minginglamp.model.SfLocalPerson;

public interface SfLocalPersonCrud extends JpaRepository<SfLocalPerson,Integer>{

	       @Query(value = "update sf_v_zdgk_zdry_jk_1500 set f_xm=?2 , f_gmsfhm=?3 , f_xbdm=?4 , f_mzdm=?5 , f_hjdz_ssxqdm=?6 , f_hjdz_qhnxxdz=?7 , f_xzdq=?8 , f_xzdz=?9 "
		   		+ ", f_lgdw=?10 , f_lgr=?11 , f_ssyj=?12 , f_dealtype=?13,  f_deadline=?14, f_data_type=?15 where id=?1 ", nativeQuery = true)
		   @Modifying  
		   public int updateLocalPerson(String id,String name,String idcardNo,String sex,String national,String hjdqPlace,String hjdqAddress,String xzPlace,String xzAddress,String lgPlace,String lgPerson,String reason,
					String dealRequest,String bdEndtime,String dataType);
}
