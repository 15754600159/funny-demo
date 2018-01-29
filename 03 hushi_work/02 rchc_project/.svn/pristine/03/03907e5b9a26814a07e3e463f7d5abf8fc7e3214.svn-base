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

import com.minginglamp.model.PlateTagInfo;

@Service
public class PlateTagInfoService {

	@Autowired
	DataSource dataSource;

	public Map<String, Object> selectOne(String id) {
		// TODO Auto-generated method stub
		ConnectionPool pool = dataSource.getPool();
    	Connection conn = null;
    	Map<String, Object> result = new HashMap<String, Object>();
    	 try {
             conn = pool.getConnection();
             PreparedStatement ps = conn.prepareStatement("select * from plate_tag_info where id=?");
             ps.setString(1, id);
             ResultSet rs = ps.executeQuery();
             while (rs.next()) {
//                 result.put("id", PlateTagInfo.getPlateTagInfo(rs).toString());
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
	public int add(String plate_type,String plate_no,String tag,String tag_info) {
		// TODO Auto-generated method stub
		ConnectionPool pool = dataSource.getPool();
    	Connection conn = null;
    	int b = 0;
    	try {
             conn = pool.getConnection();
             PreparedStatement ps = conn.prepareStatement("insert into plate_tag_info(plate_type,plate_no,tag,tag_info) values(?,?,?,?)");
             ps.setString(1,plate_type);
             ps.setString(2,plate_no);
             ps.setString(3,tag);
             ps.setString(4,tag_info);
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
	public int delete(String plate_no,String plate_type) {
		// TODO Auto-generated method stub
		ConnectionPool pool = dataSource.getPool();
    	Connection conn = null;
    	int delete=-1;
    	 try {
             conn = pool.getConnection();
             PreparedStatement ps = conn.prepareStatement("delete from plate_tag_info where plate_no = ? and plate_type=?");
             ps.setString(1, plate_no);
             ps.setString(2, plate_type);
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
		return delete;
	}

}
