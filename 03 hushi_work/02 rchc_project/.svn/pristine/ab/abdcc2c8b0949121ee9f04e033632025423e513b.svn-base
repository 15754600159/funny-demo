package com.minginglamp.service;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.util.HashMap;
import java.util.Map;

import org.apache.tomcat.jdbc.pool.ConnectionPool;
import org.apache.tomcat.jdbc.pool.DataSource;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.minginglamp.model.PersonTagInfo;

@Service
public class PersonTagInfoService {

	@Autowired
	DataSource dataSource;

	public Map<String, Object> selectTagInfoByTag(String sfzh,String tag) {
		// TODO Auto-generated method stub
		ConnectionPool pool = dataSource.getPool();
    	Connection conn = null;
    	Map<String, Object> result = new HashMap<String, Object>();
    	 try {
             conn = pool.getConnection();
             PreparedStatement ps = conn.prepareStatement("select * from person_tag_info where id=? and tag = ?");
             ps.setString(1, sfzh);
             ps.setString(2, tag);
             ResultSet rs = ps.executeQuery();
             while (rs.next()) {
                 result.put(tag, rs.getString("tag_info"));
             }
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

	@Transactional
	public int add(String sfzh,String tag,String tag_info) {
		// TODO Auto-generated method stub
		ConnectionPool pool = dataSource.getPool();
    	Connection conn = null;
    	int b = 0;
    	try {
             conn = pool.getConnection();
             PreparedStatement ps = conn.prepareStatement("insert into person_tag_info(sfzh,tag,tag_info) values(?,?,?)");
             ps.setString(1,sfzh);
             ps.setString(2,tag);
             ps.setString(3,tag_info);
             ps.execute();
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
	public int delete(String sfzh) {
		// TODO Auto-generated method stub
		ConnectionPool pool = dataSource.getPool();
    	Connection conn = null;
    	int delete=0;
    	 try {
             conn = pool.getConnection();
             PreparedStatement ps = conn.prepareStatement("delete from person_tag_info where sfzh = ?");
             ps.setString(1, sfzh);
             delete = ps.executeUpdate();
             System.out.println(delete);
             conn.close();
         } catch (Exception e) {
             e.printStackTrace();
         } finally{
        	 if(conn != null){
        		 conn=null;
        	 }
         }
    	 System.out.println(delete);
		return delete;
	}

}
