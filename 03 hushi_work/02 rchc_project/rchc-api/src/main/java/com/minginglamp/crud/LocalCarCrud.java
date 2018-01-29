package com.minginglamp.crud;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import com.minginglamp.model.LocalConcernCars;

public interface LocalCarCrud extends JpaRepository<LocalConcernCars,Integer>{


	   @Query(value = "update local_concern_cars  set owner_name=?2 , owner_idcard_no=?3 , owner_phone=?4 , plate_no=?5 , plate_type=?6 , china_car_brand=?7 , hjdq_place=?8 , reason=?9 "
	   		+ ", hjdq_address=?10 , xz_place=?11 , deal_request=?12 , bd_endtime=?13,  data_type=?14 where id=?1 ", nativeQuery = true)
	   @Modifying  
	   public int updateLocalCar(String id,String ownerName,String ownerIdcardNo,String ownerPhone,String plateNo,String plateType,String chinaCarBrand,String hjdqPlace,String reason,String hjdqAddress,
				String xzPlace,String dealRequest,String bdEndtime,String dataType);
}
