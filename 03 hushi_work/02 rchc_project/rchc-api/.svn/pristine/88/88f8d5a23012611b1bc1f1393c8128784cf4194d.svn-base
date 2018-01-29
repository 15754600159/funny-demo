package com.minginglamp.service;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.tomcat.jdbc.pool.ConnectionPool;
import org.apache.tomcat.jdbc.pool.DataSource;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.minginglamp.model.CarCheck;

@Service
public class JwtCarService {

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
               //  result.put("id", JwtCar.getJwtCar(rs).getJwtCar(rs).toString());
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

	public Map<String, Object> selectAll() {
		// TODO Auto-generated method stub
		ConnectionPool pool = dataSource.getPool();
    	Connection conn = null;
    	Map<String, Object> result = new HashMap<String, Object>();
    	 try {
             conn = pool.getConnection();
             PreparedStatement ps = conn.prepareStatement("select * from jwt_check_cars_log_1501");
             ResultSet rs = ps.executeQuery();
             while (rs.next()) {
            //     result.put(rs.getString("id"),JwtCar.getJwtCar(rs).toString());
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
	public int updateFlag(String plate_no,String plate_type) {
		// TODO Auto-generated method stub
		ConnectionPool pool = dataSource.getPool();
    	Connection conn = null;
    	int b = 0;
    	try {
             conn = pool.getConnection();
             PreparedStatement ps = conn.prepareStatement("update jwt_check_cars_log_1501 set clhc_flag='1' where plate_no = ? and plate_type=?");
             ps.setString(1, plate_no);
             ps.setString(2, plate_type);
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
	public int updateTag(String plate_no,String plate_type,String tag) {
		// TODO Auto-generated method stub
		ConnectionPool pool = dataSource.getPool();
    	Connection conn = null;
    	int b = 0;
    	try {
             conn = pool.getConnection();
             PreparedStatement ps = conn.prepareStatement("update jwt_check_cars_log_1501 set clhc_tag=? where plate_no = ? and plate_type=?");
             ps.setString(1, tag);
             ps.setString(2, plate_no);
             ps.setString(3, plate_type);
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
	public int delete(String id) {
		// TODO Auto-generated method stub
		ConnectionPool pool = dataSource.getPool();
    	Connection conn = null;
    	int delete=-1;
    	 try {
             conn = pool.getConnection();
             PreparedStatement ps = conn.prepareStatement("delete from jwt_check_cars_log_1501 where id = " + id);
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

	public List<String> selectPlate() {
		// TODO Auto-generated method stub
		ConnectionPool pool = dataSource.getPool();
    	Connection conn = null;
    	List<String> result = new ArrayList<String>();
    	 try {
             conn = pool.getConnection();
             PreparedStatement ps = conn.prepareStatement("select * from jwt_check_cars_log_1501 where clhc_flag !='1' OR clhc_flag is null");
             ResultSet rs = ps.executeQuery();
             while (rs.next()) {
                 result.add(rs.getString("plate_type")+rs.getString("plate_no"));
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
    	 return result;
	}
}
