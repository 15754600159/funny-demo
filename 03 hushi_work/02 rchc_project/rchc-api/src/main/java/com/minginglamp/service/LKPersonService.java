package com.minginglamp.service;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;

import org.apache.tomcat.jdbc.pool.ConnectionPool;
import org.apache.tomcat.jdbc.pool.DataSource;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class LKPersonService {

	@Autowired
	DataSource dataSource;
	
	public boolean findOne(String sfzh) {
		// TODO Auto-generated method stub
		ConnectionPool pool = dataSource.getPool();
    	Connection conn = null;
    	boolean result = false;
    	 try {
             conn = pool.getConnection();
             PreparedStatement ps = conn.prepareStatement("select * from hs_gongan_cmd.tb_m_zdrlsbkzlxx where BBKRZJHM=?");
             ps.setString(1, sfzh);
             ResultSet rs = ps.executeQuery();
             result = rs.next();
             conn.close();
         } catch (Exception e) {
             e.printStackTrace();
         } finally{
        	 if(conn != null){
        		 conn=null;
        	 }
         }
        return result;
	}
}
