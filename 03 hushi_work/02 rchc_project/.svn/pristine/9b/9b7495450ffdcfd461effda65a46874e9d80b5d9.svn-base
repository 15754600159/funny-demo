package com.minginglamp.service;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

import org.mortbay.log.Log;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.RequestParam;

import com.fasterxml.jackson.databind.JsonNode;
import com.minginglamp.common.PageHelper;
import com.minginglamp.common.PageInquire;
import com.minginglamp.crud.LocalCarCrud;
import com.minginglamp.model.LocalConcernCars;
import com.minginglamp.utils.ResultMsg;
import com.minginglamp.vo.LocalPersonVo;
import com.mysql.jdbc.ResultSetMetaData;

@Service
public class LocalCarService {

	@Autowired
	LocalCarCrud localCarCrud;

	@Autowired
	PageInquire pageInquire;

	@Autowired
	DictionaryService dictionaryService;
	@Transactional
	public LocalConcernCars save(LocalConcernCars localConcernCar) {
		return localCarCrud.save(localConcernCar);

	}
	
	 public List<String> findDataType()
	    {
		  String sql ="select DISTINCT  data_type from local_concern_cars "
		  		+ "where data_type <> '' and data_type is not null";
			
			System.out.println(sql);
			ResultSet rs = pageInquire.findPage(sql);
			List<String> dataTypes = new ArrayList<String>();
			try {
				while (rs.next()) {
					
					String  dataType = rs.getString("data_type") ;
					dataTypes.add(dataType);	
				}
				
			} catch (SQLException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
			
		     return dataTypes;
	    }
	 public List<String> findReason(String dataType)
	    {
		  String sql ="select DISTINCT  reason from local_concern_cars where reason <> '' and reason is not null";
			if(dataType!=null && !"".equals(dataType))
			{
		   sql = "select DISTINCT reason from local_concern_cars where reason <> '' "
		 		+ "and reason is not null and data_type = '"+dataType+"'";
			}
			System.out.println(sql);
			ResultSet rs = pageInquire.findPage(sql);
			List<String> reasons = new ArrayList<String>();
			try {
				while (rs.next()) {
					
					String  reason = rs.getString("reason") ;
					reasons.add(reason);	
				}
				
			} catch (SQLException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
			
		     return reasons;
	    }

	public PageHelper findPage(String ownerName, String ownerIdcardNo, String plateNo, String plateType,
			String chinaCarBrand, String hjdqPlace, String reason, String hjdqAddress, String xzPlace,
			String dealRequest, String beginTime, String endTime, String importNo,String importName,String dataType,int pageno, int size,
			String currentUserNo) {
		int count = 0;
		PageHelper pageHelper = new PageHelper();
		JsonNode plateTypeJsonNode = dictionaryService.getPlateType();
		String sqlw = "";

		if (ownerName != null && !"".equals(ownerName)) {
			sqlw = sqlw + " and owner_name like '%" + ownerName + "%'";
		}

		if (ownerIdcardNo != null && !"".equals(ownerIdcardNo)) {
			sqlw = sqlw + " and owner_idcard_no like '%" + ownerIdcardNo + "%'";
		}
		if (plateNo != null && !"".equals(plateNo)) {
			sqlw = sqlw + " and plate_no = '" + plateNo + "'";
		}
		if (plateType != null && !"".equals(plateType)) {
			sqlw = sqlw + " and plate_type like '%" + plateType + "%'";
		}

		if (chinaCarBrand != null && !"".equals(chinaCarBrand)) {
			sqlw = sqlw + " and china_car_brand like '%" + chinaCarBrand + "%'";
		}
		if (hjdqPlace != null && !"".equals(hjdqPlace)) {
			sqlw = sqlw + " and hjdq_place like '%" + hjdqPlace + "%'";
		}

		if (reason != null && !"".equals(reason)) {
			sqlw = sqlw + " and reason like '%" + reason + "%'";
		}

		if (xzPlace != null && !"".equals(xzPlace)) {
			sqlw = sqlw + " and xz_place like '%" + xzPlace + "%'";
		}
		if (hjdqAddress != null && !"".equals(hjdqAddress)) {
			sqlw = sqlw + " and hjdq_address like '%" + hjdqAddress + "%'";
		}
		if (dealRequest != null && !"".equals(dealRequest)) {
			sqlw = sqlw + " and deal_request like '%" + dealRequest + "%'";
		}

		if (beginTime != null && !"".equals(beginTime) && endTime != null && !"".equals(endTime)) {
			sqlw = sqlw + " and import_time between '" + beginTime + "' and '" + endTime + "'";
		}

		if (importNo != null && !"".equals(importNo)) {
			sqlw = sqlw + " and import_no like '%" + importNo + "%'";
		}
		
		if (importName != null && !"".equals(importName)) {
			sqlw = sqlw + " and import_name like '%" + importName + "%'";
		}
		
		if (dataType != null && !"".equals(dataType)) {
			sqlw = sqlw + " and data_type like '%" + dataType + "%'";
		}

		String sqlc =  " select count(*) c from local_concern_cars where 1=1 " + sqlw + " and (cx_sign='0' or (cx_sign='1' and import_no = '"+currentUserNo+"'))" ;
		System.out.println(sqlc);
		ResultSet resultSet = pageInquire.findPage(sqlc);

		try {
			if (resultSet.next()) {
				count = Integer.parseInt(resultSet.getString("c"));
			}
		} catch (NumberFormatException e1) {
			// TODO Auto-generated catch block
			e1.printStackTrace();
		} catch (SQLException e1) {
			// TODO Auto-generated catch block
			e1.printStackTrace();
		}

		String sql = " select * from local_concern_cars where 1=1  " + sqlw + " and (cx_sign='0' or (cx_sign='1' and import_no = '"+currentUserNo+"')) limit " + (pageno - 1) * size
				+ " , " + size; 
		System.out.println(sql);
		ResultSet rs = pageInquire.findPage(sql);
		List<LocalConcernCars> localConcernCars = new ArrayList<LocalConcernCars>();
		LocalConcernCars localConcernCar = null;
		try {
			// ResultSetMetaData md = rs.getMetaData();
			// int columnCount = md.getColumnCount();
			while (rs.next()) {
				// for (int i = 1; i <= columnCount; i++) {

					localConcernCar = new LocalConcernCars();
					localConcernCar.setId(rs.getString("id"));
					localConcernCar.setOwnerName(rs.getString("owner_name"));
					localConcernCar.setOwnerIdcardNo(rs.getString("owner_idcard_no"));
					localConcernCar.setPlateNo(rs.getString("plate_no"));
				//	localConcernCar.setPlateType(rs.getString("plate_type"));
					  String platetype = rs.getString("plate_type");
						if (platetype != null && !platetype.equals("")) {
							if (plateTypeJsonNode.get(platetype) != null) {
								platetype = plateTypeJsonNode.get(platetype).asText();
							}
							localConcernCar.setPlateType(platetype);
						}
					localConcernCar.setChinaCarBrand(rs.getString("china_car_brand"));
					localConcernCar.setHjdqPlace(rs.getString("hjdq_place"));
					localConcernCar.setReason(rs.getString("reason"));
					localConcernCar.setHjdqAddress(rs.getString("hjdq_address"));
					localConcernCar.setXzPlace(rs.getString("xz_place"));
					localConcernCar.setDealRequest(rs.getString("deal_request"));
					localConcernCar.setImportTime(rs.getString("import_time"));
					localConcernCar.setImportNo(rs.getString("import_no"));
					localConcernCar.setCxSign(rs.getString("cx_sign"));
					localConcernCar.setImportName(rs.getString("import_name"));
					localConcernCar.setDataType(rs.getString("data_type"));
					localConcernCar.setBdEndtime(rs.getString("bd_endtime"));
				// }
				localConcernCars.add(localConcernCar);

			}
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		int totalpage = 0;
		if (count % size == 0) {
			totalpage = count / size;
		} else {
			totalpage = (count / size) + 1;
		}
		pageHelper.setPageNo(pageno);
		pageHelper.setPageSize(size);
		pageHelper.setResult(localConcernCars);
		pageHelper.setTotalPage(totalpage);
		pageHelper.setTotal(count);

		return pageHelper;
	}

	
	 @Transactional
		public ResultMsg updateCar(String id,String ownerName,String ownerIdcardNo,String ownerPhone,String plateNo,String plateType,String chinaCarBrand,String hjdqPlace,String reason,String hjdqAddress,
				String xzPlace,String dealRequest,String bdEndtime,String dataType){
			ResultMsg msg = null ;
			int count = localCarCrud.updateLocalCar(id,ownerName,ownerIdcardNo,ownerPhone,plateNo,plateType,chinaCarBrand,hjdqPlace,reason,hjdqAddress,
                    xzPlace,dealRequest,bdEndtime,dataType);
			if(count==1)
				{
					msg= msg.success("更新成功");
				}else if(count==0)
				{
					msg = msg.error("更新失败");
				}
				
				return msg;
			}
	 
	public ResultMsg update(String id, String importNo, String importName, String currentUserNo, String currentUserName,
			String cxSign) {
		ResultMsg msg = null;

			String sql = "update local_concern_cars set  cx_sign = '" + cxSign + "' where Id= '" + id + "'";
			Log.info("修改1撤销 0默认:{}", sql);
			int rs = pageInquire.excuteUpdate(sql);
			if (rs == 1) {
				msg = ResultMsg.success("更新成功");
			} else if (rs == 0) {
				msg = ResultMsg.error("更新失败");
			}
		return msg;
	}

	/**
	 * 
	 * @param idArry
	 * @param currentUserNo
	 * @param cxSign
	 *            0 默认 1撤销
	 * @return
	 */
	@Transactional
	public ResultMsg batchUpdateReset(LocalPersonVo localPersonVo) {
		ResultMsg msg = null;
		String ids = "";
		for (String id : localPersonVo.getIds()) {
			ids += "'" + id + "',";
		}
		ids = ids.substring(0, ids.length() - 1);

		/*String sql = "select COUNT(*) c from local_concern_cars where import_no <> '" + localPersonVo.getCurrentUserNo()
				+ "' and id in (" + ids + ") ";
		Log.debug(sql);
		ResultSet result = pageInquire.findPage(sql);
		int count = 0;
		try {
			if (result.next()) {
				count = Integer.parseInt(result.getString("c"));
			}
			if (count > 0) {
				Log.debug("只能撤销当前登录人 导入的数据");
				msg = ResultMsg.error("只能撤销当前登录人 导入的数据");
				return msg;
			}*/
			// 1撤销 0默认
			String updateSql = "update local_concern_cars set cx_sign = '" + localPersonVo.getCxSign()
					+ "' WHERE id in (" + ids + ") ";
			Log.info("修改修改时间:{}", updateSql);
			int rs = pageInquire.excuteUpdate(updateSql);
			if (rs > 0) {
				msg = ResultMsg.success("更新成功");
			} else if (rs == 0) {
				msg = ResultMsg.error("更新失败");
			}

			return msg;

		/*} catch (NumberFormatException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}

		return msg;*/
	}

	@Transactional
	public ResultMsg batchUpdateBdTime(LocalPersonVo localPersonVo) {
		ResultMsg msg = null;
		String ids = "";
		for (String id : localPersonVo.getIds()) {
			ids += "'" + id + "',";
		}
		ids = ids.substring(0, ids.length() - 1);

		/*String sql = "select COUNT(*) c from local_concern_persons where import_no <> '"
				+ localPersonVo.getCurrentUserNo() + "' and id in (" + ids + ") ";
		Log.debug(sql);
		ResultSet result = pageInquire.findPage(sql);
		int count = 0;
		try {
			if (result.next()) {
				count = Integer.parseInt(result.getString("c"));
			}
			if (count > 0) {
				Log.debug("只能修改当前登录人 导入的数据");
				msg = ResultMsg.error("只能修改当前登录人 导入的数据");
				return msg;
			}*/
			String updateSql = "update local_concern_cars set bd_endtime = '" + localPersonVo.getBdDndtime()
					+ "' WHERE id in (" + ids + ") ";
			int rs = pageInquire.excuteUpdate(updateSql);
			if (rs > 0) {
				msg = ResultMsg.success("更新成功");
			} else if (rs == 0) {
				msg = ResultMsg.error("更新失败");
			}

			return msg;

		/*} catch (NumberFormatException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}

		return msg;*/
	}

	public List<String> listPlateType() {
		String sql = " SELECT distinct(plate_type) platetype  FROM hs_rchc.local_concern_cars WHERE plate_type <> ''";

		System.out.println(sql);
		ResultSet rs = pageInquire.findPage(sql);
		List<String> plateTypeList = new ArrayList<String>();
		try {
			while (rs.next()) {
				plateTypeList.add(rs.getString("platetype"));
			}
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			}

		return plateTypeList;

		}
	
}
