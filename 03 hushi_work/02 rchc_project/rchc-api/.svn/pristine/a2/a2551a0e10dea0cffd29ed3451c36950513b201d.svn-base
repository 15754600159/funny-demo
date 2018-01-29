package com.minginglamp.service;

import java.io.IOException;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.minginglamp.common.PageInquire;
import com.minginglamp.model.HSxzqh;

@Service
public class XzqhService {

	@Autowired
	PageInquire pageInquire;

	public String getXZQHByCode(String code){
		String codeName = "";
		String hsXzqhMap = "{\"150000\":\"内蒙古呼和浩特市辖区\",\"150100\":\"内蒙古呼和浩特市辖区\",\"150101\":\"内蒙古呼和浩特市市辖区\",\"150102\":\"内蒙古呼和浩特市新城区\",\"150103\":\"内蒙古呼和浩特市回民区\",\"150104\":\"内蒙古呼和浩特市玉泉区\",\"150105\":\"内蒙古呼和浩特市赛罕区\",\"150107\":\"呼市经济开发区\",\"150108\":\"呼市城南区\",\"150109\":\"呼市南地分局\",\"150121\":\"内蒙古土默特左旗\",\"150122\":\"内蒙古托克托县\",\"150123\":\"内蒙古和林格尔县\",\"150124\":\"内蒙古清水河县\",\"150125\":\"内蒙古武川县\",\"150198\":\"呼市公交分局\"}";
        ObjectMapper mapper = new ObjectMapper();
		try {
			JsonNode userJsonNode = mapper.readTree(hsXzqhMap);
			if(userJsonNode.get(code)!=null){
				codeName = userJsonNode.get(code).asText();
			}else{
				codeName = code;
			}
		} catch (JsonProcessingException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return codeName;
	}

	public Map<String, String> listHSxzqhMap() {

		String sql = " SELECT code,name FROM tb_d_hsxzqh";

		System.out.println(sql);
		ResultSet rs = pageInquire.findPage(sql);
		Map<String, String> categoryMap = new HashMap<String, String>();
		try {
			if (rs != null) {
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
	
	public List<HSxzqh> listHSxzqh() {

		String sql = " SELECT code,name FROM tb_d_hsxzqh where code <> '150101'";

		System.out.println(sql);
		ResultSet rs = pageInquire.findPage(sql);
		List<HSxzqh> hsxzqhList = new ArrayList<HSxzqh>();
		try {
			if (rs != null) {
				while (rs.next()) {
					HSxzqh hsxzqh =  new HSxzqh();
					hsxzqh.setCode(rs.getString("code"));
					hsxzqh.setName(rs.getString("name"));
					hsxzqhList.add(hsxzqh);
				}
			}
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return hsxzqhList;

	}

}
