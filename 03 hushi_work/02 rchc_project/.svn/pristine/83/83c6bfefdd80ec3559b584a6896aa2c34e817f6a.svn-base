package com.minginglamp.crud;


import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.minginglamp.model.CarCheck;

public interface CarCheckCrud extends JpaRepository<CarCheck,Integer>{
	
	List<CarCheck> findByPlateNo(String plateNo);

}
