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
import com.minginglamp.model.ImportantPersonCategory;

@Service
public class ImportantPersonCategoryService {
	
	@Autowired
	PageInquire pageInquire;
	
	public List<ImportantPersonCategory> listCategory() {
		
		String sql = " SELECT code,name FROM hs_rchc.important_person_category group by code order by field(code,'770000000000'),name desc ";
		
		System.out.println(sql);
		
		ResultSet rs = pageInquire.findPage(sql);
		List<ImportantPersonCategory> categoryList = new ArrayList<ImportantPersonCategory>();
		try {
			while (rs.next()) { 
				ImportantPersonCategory category = new ImportantPersonCategory();
				category.setCode(rs.getString("code"));
				category.setName(rs.getString("name"));
					
				categoryList.add(category);
			}
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
       
		return categoryList;

	}
	
	public List<ImportantPersonCategory> listCategoryByCode(String code) {
		String sql = " SELECT * FROM hs_rchc.important_person_category where code = " + code;
		
		System.out.println(sql);
		ResultSet rs = pageInquire.findPage(sql);
		List<ImportantPersonCategory> categoryList = new ArrayList<ImportantPersonCategory>();
		try {
			while (rs.next()) { 
				ImportantPersonCategory category = new ImportantPersonCategory();
				category.setCode(rs.getString("subcode"));
				category.setName(rs.getString("subname"));
					
				categoryList.add(category);
			}
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
       
		return categoryList;

	}
	
	public Map<String,String> listCategoryMap() {
		
		String sql = " SELECT code,name FROM hs_rchc.important_person_category group by code";
		
		System.out.println(sql);
		ResultSet rs = pageInquire.findPage(sql);
		Map<String,String> categoryMap = new HashMap<String,String>();
		try {
			while (rs.next()) { 
				categoryMap.put(rs.getString("code"), rs.getString("name"));
			}
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
       
		return categoryMap;

	}
	public Map<String,String> listUcodeMap(){
		
		String sql = " SELECT code,name FROM hs_rchc.tb_d_dwdm";
		System.out.println(sql);
		ResultSet rs = pageInquire.findPage(sql);
		Map<String,String> ucodeMap = new HashMap<String,String>();
		try {
			while (rs.next()) { 
				ucodeMap.put(rs.getString("code"), rs.getString("name"));
			}
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return ucodeMap;
		
	}
	public Map<String,String> listSubCategoryMap() {
		
		String sql = " SELECT subcode,subname FROM hs_rchc.important_person_category";
		
		System.out.println(sql);
		ResultSet rs = pageInquire.findPage(sql);
		Map<String,String> categoryMap = new HashMap<String,String>();
		try {
			while (rs.next()) { 
				categoryMap.put(rs.getString("subcode"), rs.getString("subname"));
			}
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
       
		return categoryMap;

	}
	
	public Map<String,String> listHjdqhCategoryMap() {
			
			String sql = " SELECT CODE,NAME FROM hs_rchc.t_d_qgxzqh";
			
			System.out.println(sql);
			ResultSet rs = pageInquire.findPage(sql);
			Map<String,String> categoryHjdqhMap = new HashMap<String,String>();
			try {
				while (rs.next()) { 
					categoryHjdqhMap.put(rs.getString("CODE"), rs.getString("NAME"));
				}
			} catch (SQLException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
	       
			return categoryHjdqhMap;
	
		}
	public Map<String,String> listReHjdqhCategoryMap() {
		
		String sql = " SELECT CODE,REMARK FROM hs_rchc.t_d_qgxzqh";
		
		System.out.println(sql);
		ResultSet rs = pageInquire.findPage(sql);
		Map<String,String> categoryHjdqhMap = new HashMap<String,String>();
		try {
			while (rs.next()) { 
				categoryHjdqhMap.put(rs.getString("CODE"), rs.getString("REMARK"));
			}
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
       
		return categoryHjdqhMap;

	}
	
	
	public Map<String,String> listcardTypeMap() {
		
		String sql = " SELECT code,name FROM hs_rchc.zd_cardtype";
		
		System.out.println(sql);
		ResultSet rs = pageInquire.findPage(sql);
		Map<String,String> categorycardTypeMap = new HashMap<String,String>();
		try {
			while (rs.next()) { 
				categorycardTypeMap.put(rs.getString("code"), rs.getString("name"));
			}
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
       
		return categorycardTypeMap;

	}
}
