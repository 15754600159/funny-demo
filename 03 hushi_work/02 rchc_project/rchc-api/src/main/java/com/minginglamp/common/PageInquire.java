package com.minginglamp.common;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.util.List;
import java.util.Map;

import org.apache.tomcat.jdbc.pool.ConnectionPool;
import org.apache.tomcat.jdbc.pool.DataSource;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.support.rowset.SqlRowSet;
import org.springframework.stereotype.Component;

import lombok.extern.java.Log;

@Log
@Component
public class PageInquire {

	  @Autowired
	  DataSource dataSource;
	  
		@Autowired
		private JdbcTemplate jdbcTemplate;
	
	public ResultSet findPage(String sql){
		long startTime = System.currentTimeMillis();
		ConnectionPool pool = dataSource.getPool();
    	Connection conn = null;
    	ResultSet rs =null;
    	try {
    		System.out.println(pool.getActive());
            conn = pool.getConnection();
            System.out.println(pool.getActive());
            System.out.println(conn);
           //  String sql1="select * from jwt_check_person_log_1501";
            PreparedStatement ps = conn.prepareStatement(sql);
            rs = ps.executeQuery();
           /* System.out.println(rs.toString());
             while (rs.next()) {
               System.out.println(rs.getString("pcode"));
            	// pageHelper.setResult(rs.get);
             }*/
            
            conn.close();
         } catch (Exception e) {
             e.printStackTrace();
         } finally{
        	if(conn != null){
        		conn=null;
        	}
        	 
         }
		  long endTime = System.currentTimeMillis();
		  log.info("程序运行时间：" + (endTime - startTime) + "ms");
		return rs;
   }
	
	
	public SqlRowSet findPageForSqlRowSet(String sql){
		long startTime = System.currentTimeMillis();
		SqlRowSet rs  = jdbcTemplate.queryForRowSet(sql);
		long endTime = System.currentTimeMillis();
		log.info("程序运行时间：" + (endTime - startTime) + "ms");
		return rs;
	}
	
	public List<Map<String,Object>> findPageForList(String sql){
		long startTime = System.currentTimeMillis();
		List<Map<String,Object>> rs  = jdbcTemplate.queryForList(sql);
		long endTime = System.currentTimeMillis();
		log.info("程序运行时间：" + (endTime - startTime) + "ms");
		return rs;
	}
	
	
	
	public void excuteUpdateForSql(String sql){
		long startTime = System.currentTimeMillis();
		jdbcTemplate.execute(sql);
		long endTime = System.currentTimeMillis();
		log.info("程序运行时间：" + (endTime - startTime) + "ms");
		 //return rs;
	}
	
	public int excuteUpdate(String sql){
		long startTime = System.currentTimeMillis();
		ConnectionPool pool = dataSource.getPool();
    	Connection conn = null;
    	int rs =0;
    	 try {
             System.out.println(pool.getActive());
             conn = pool.getConnection();
             System.out.println(pool.getActive());
             System.out.println(conn);
           //  String sql1="select * from jwt_check_person_log_1501";
             PreparedStatement ps = conn.prepareStatement(sql);
             rs = ps.executeUpdate();
           /* System.out.println(rs.toString());
             while (rs.next()) {
               System.out.println(rs.getString("pcode"));
            	// pageHelper.setResult(rs.get);
             }*/
             conn.close();
         } catch (Exception e) {
             e.printStackTrace();
         } finally{
        	 if(conn != null){
        		 conn=null;
        	 }
        	 
         }
 		long endTime = System.currentTimeMillis();
		log.info("程序运行时间：" + (endTime - startTime) + "ms");
		return rs;
	 }
			
}
