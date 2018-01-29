package com.minginglamp.crud;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.minginglamp.model.PersonTagInfo;

public interface PersonTagInfoCrud extends JpaRepository<PersonTagInfo,Integer>{

	
	List<PersonTagInfo> findBySfzhAndTag(String sfzh,String ryhcTag);
}
