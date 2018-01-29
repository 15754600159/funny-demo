package com.minginglamp.reflect;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;

import com.minginglamp.model.LocalConcernPersons;

@Service
public class MapperService {

	
		@Autowired
		JdbcTemplate jdbcTemplate;
	
	   @SuppressWarnings("unchecked")  
	   //  @Override  
	     public List<LocalConcernPersons> getAllUser() { 
	      
	          String sql = "SELECT Id AS id,name AS name,idcard_no AS idcardNo,sex AS sex,national AS national FROM local_concern_persons";  
	          String [] fields = {"id","name","idcardNo","sex","national"};  
	          List<LocalConcernPersons> users = jdbcTemplate.query(sql,new MyMapper("com.minginglamp.model.LocalConcernPersons", fields)); 
	          
	          System.out.println(users);
	          return users;
	         
	      } 
}
