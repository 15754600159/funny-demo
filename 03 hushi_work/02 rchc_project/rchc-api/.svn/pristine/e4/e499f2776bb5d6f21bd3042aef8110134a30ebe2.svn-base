package com.minginglamp.service;

import java.sql.ResultSet;
import java.sql.ResultSetMetaData;
import java.sql.SQLException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.minginglamp.common.PageInquire;
import com.minginglamp.crud.DwdmCrud;
import com.minginglamp.model.Dwdm;

@Service
public class DwdmService {
	
	@Autowired
	DwdmCrud dwdmCrud;
	
	@Autowired
	PageInquire pageInquire;

	public List<Dwdm> findAll()
	{
		return dwdmCrud.findAll();
		
	}

	public Map<String, String> getDwdmMap(String code) {
		String qsql = "";
		if(code!=null&&!code.equals("")){
			qsql = " WHERE code like '" + code + "%'";
		}
		Map<String, String> map = new HashMap<String, String>();
		String sqlu = "select code,name from tb_d_dwdm" + qsql;
		ResultSet result = pageInquire.findPage(sqlu);

		ResultSetMetaData rsmd;
		try {
			rsmd = result.getMetaData();
			int count = rsmd.getColumnCount();
			while (result.next()) {
				for (int i = 1; i <= count; i++) {
					String key = result.getString("code");
					String value = result.getString("name");
					map.put(key, value);
				}
			}

		} catch (SQLException e1) {
			// TODO Auto-generated catch block
			e1.printStackTrace();
		}
		return map;
	}

}
