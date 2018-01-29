package com.minginglamp.service;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import org.apache.tomcat.jdbc.pool.ConnectionPool;
import org.apache.tomcat.jdbc.pool.DataSource;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ConcernCarService {

	@Autowired
	DataSource dataSource;
	
	public boolean findOne(String plate_no,String plate_type) {
		// TODO Auto-generated method stub
		ConnectionPool pool = dataSource.getPool();
    	Connection conn = null;
    	boolean result = false;
    	 try {
             conn = pool.getConnection();
             PreparedStatement ps = conn.prepareStatement("select * from local_concern_car where plate_no=? and plate_type=?");
             ps.setString(1, plate_no);
             ps.setString(2, plate_type);
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
