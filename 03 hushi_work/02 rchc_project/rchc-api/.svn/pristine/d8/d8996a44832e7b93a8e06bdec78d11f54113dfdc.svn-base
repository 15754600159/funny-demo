package com.minginglamp.service;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.minginglamp.common.PageInquire;
import com.minginglamp.model.ImportantCarCategory;

@Service
public class ImportantCarCategoryService {
	
	@Autowired
	PageInquire pageInquire;
	
	public List<ImportantCarCategory> listCategory() {
		
		String sql = " SELECT code,name FROM hs_rchc.important_car_category group by code  order by name desc ";
		
		System.out.println(sql);
		ResultSet rs = pageInquire.findPage(sql);
		List<ImportantCarCategory> categoryList = new ArrayList<ImportantCarCategory>();
		try {
			if (rs!=null) { 
				while (rs.next()) { 
					ImportantCarCategory category = new ImportantCarCategory();
					category.setCode(rs.getString("code"));
					category.setName(rs.getString("name"));
						
					categoryList.add(category);
				}
			}
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
       
		return categoryList;

	}
	
	public List<ImportantCarCategory> listCategoryByCode(String code) {
		String sql = " SELECT * FROM hs_rchc.important_car_category where code = " + code;
		
		System.out.println(sql);
		ResultSet rs = pageInquire.findPage(sql);
		List<ImportantCarCategory> categoryList = new ArrayList<ImportantCarCategory>();
		try {
			if (rs!=null) { 
				while (rs.next()) { 
					ImportantCarCategory category = new ImportantCarCategory();
					category.setCode(rs.getString("subcode"));
					category.setName(rs.getString("subname"));
						
					categoryList.add(category);
				}
			}
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
       
		return categoryList;

	}
	
	public Map<String,String>  listCategoryMap() {
		
		String sql = " SELECT code,name FROM hs_rchc.important_car_category group by code";
		
		System.out.println(sql);
		ResultSet rs = pageInquire.findPage(sql);
		Map<String,String> categoryMap = new HashMap<String,String>();
		try {
			if (rs!=null) { 
				while (rs.next()) { 
					categoryMap.put(rs.getString("code"), rs.getString("name"));
				}
			}
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
       
		return categoryMap;

	}
	
	public Map<String,String> listSubCategoryMap() {
		
		String sql = " SELECT subcode,subname FROM hs_rchc.important_car_category";
		
		System.out.println(sql);
		ResultSet rs = pageInquire.findPage(sql);
		Map<String,String> categoryMap = new HashMap<String,String>();
		try {
			if (rs!=null) { 
				while (rs.next()) { 
					categoryMap.put(rs.getString("subcode"), rs.getString("subname"));
				}
			}
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
       
		return categoryMap;

	}
}
