package com.minginglamp.service;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

import org.apache.tomcat.jdbc.pool.ConnectionPool;
import org.apache.tomcat.jdbc.pool.DataSource;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class JwtPersonService {
	
	@Autowired
	DataSource  dataSource;

	public  List<String> selectIdcard() {
		// TODO Auto-generated method stub
		ConnectionPool pool = dataSource.getPool();
    	Connection conn = null;
    	List<String> result = new ArrayList<String>();
    	 try {
             conn = pool.getConnection();
             PreparedStatement ps = conn.prepareStatement("select idcard_no from jwt_check_person_log_1501 where ryhc_flag!='1' OR ryhc_flag is null");
             ResultSet rs = ps.executeQuery();
             while (rs.next()) {
                 result.add(rs.getString("idcard_no"));
             }
            
         } catch (Exception e) {
             e.printStackTrace();
         } finally{
        	 if(conn != null){
        		 try {
					conn.close();
				} catch (SQLException e) {
					// TODO Auto-generated catch block
					e.printStackTrace();
				}
        	 }
         }
    	 System.out.println(result.toString()+"------------"+result.size());
    	 return result;
	}
	
	public int updateFlag(String idcard) {
		// TODO Auto-generated method stub
		ConnectionPool pool = dataSource.getPool();
    	Connection conn = null;
    	int b = 0;
    	try {
             conn = pool.getConnection();
             System.out.println(idcard);
             PreparedStatement ps = conn.prepareStatement("update jwt_check_person_log_1501 set ryhc_flag='1'  where idcard_no = ?");
             ps.setString(1, idcard);
             ps.executeUpdate();
             b = ps.getUpdateCount();
             conn.close();
         } catch (Exception e) {
             e.printStackTrace();
         } finally{
        	 if(conn != null){
        		 conn=null;
        	 }
         }
    	System.out.println(b);
		return b;
	}
	
	@Transactional
	public int updateTag(String sfzh,String tag) {
		// TODO Auto-generated method stub
		ConnectionPool pool = dataSource.getPool();
    	Connection conn = null;
    	int b = 0;
    	try {
             conn = pool.getConnection();
             PreparedStatement ps = conn.prepareStatement("update jwt_check_person_log_1501 set ryhc_tag=? where idcard_no=?");
             ps.setString(1, tag);
             ps.setString(2, sfzh);
             ps.executeUpdate();
             b = ps.getUpdateCount();
             conn.close();
         } catch (Exception e) {
             e.printStackTrace();
         } finally{
        	 if(conn != null){
        		 conn=null;
        	 }
         }
    	System.out.println(b);
		return b;
	}
}
