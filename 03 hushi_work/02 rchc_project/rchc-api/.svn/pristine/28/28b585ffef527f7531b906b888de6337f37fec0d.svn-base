//package com.minginglamp.service;
//
//import java.io.IOException;
//import java.util.Date;
//import java.util.HashMap;
//import java.util.HashSet;
//import java.util.List;
//import java.util.Map;
//import java.util.Set;
//
//import lombok.extern.java.Log;
//
//import org.apache.avro.data.Json;
//import org.apache.commons.lang.time.DateFormatUtils;
//import org.apache.hadoop.hbase.client.Result;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.scheduling.annotation.EnableScheduling;
//import org.springframework.scheduling.annotation.Scheduled;
//import org.springframework.stereotype.Component;
//import org.springframework.stereotype.Service;
//
//import com.alibaba.fastjson.JSONObject;
//import com.fasterxml.jackson.annotation.JsonUnwrapped;
//import com.minginglamp.model.PlateTagInfo;
//import com.minginglamp.utils.HBaseUtil;
//import com.minginglamp.utils.JsonUtils;
//import com.minginglamp.utils.Md5Util;
//
//
//@Log
//@Component
////@EnableScheduling
//@Service
//public class ClhcService {
//
//	@Autowired
//	JwtCarService jwtCarService;
//	
//	@Autowired
//	PlateTagInfoService plateTagInfoService;
//	
//	@Autowired
//	ConcernCarService concernCarService;
//	
//	@Autowired
//	LKCarService lkCarService;
//	
//	boolean b = true;
//	int i = 1;
//	@Scheduled(cron = "${job.every5minute.cron}")
//    public void everySecond() {
//		if(b){
//			b = false;
//	        System.out.println("车辆第" + (++i) + "次调用，每分钟任务，当前时间：" + nowTime());
//	        List<String> selectPlate = jwtCarService.selectPlate();
//	        for (int j = 0; j < selectPlate.size(); j++) {
//	        	System.out.println(selectPlate.get(j));
//	        }
//	        for (int j = 0; j < selectPlate.size(); j++) {
//	        	//获取号牌
//				String plate = selectPlate.get(j);
//				String plate_no = "";
//				String plate_type = "";
//				HashSet<String> tag = new HashSet<String>();
//				//获取车牌种类和号码
//				if(plate.length()==9){
//					plate_no = plate.substring(2, 9);
//					plate_type = plate.substring(0,2);
//				}else{
//					plate_no=plate;
//				}
//				//获取hbase返回数据
//				Map<String, String> tagByPlate = getTagByPlate(plate);
//				
//				
//	//			如果有数据
//				if(tagByPlate.get(plate)!=""){
//					//解析tag
//					List<Object> jsonObject=JSONObject.parseArray(tagByPlate.get(plate));
//					System.out.println("删除之前所查");
//					plateTagInfoService.delete(plate_no, plate_type);
//					for(int z=0;z<jsonObject.size();z++){
//						//添加info数据
//						plateTagInfoService.add(plate_type, plate_no,((JSONObject) jsonObject.get(z)).get("tag").toString(), jsonObject.get(z).toString());
//						tag.add(((JSONObject) jsonObject.get(z)).get("tag").toString());
////						System.out.println("=================================================================");
////						System.out.println(tag.toString());
////						System.out.println("=================================================================");
//					}
//					System.out.println(plate_no+"*********************"+plate_type);
//					//修改clhc_flag
//					jwtCarService.updateFlag(plate_no, plate_type);
//				}
//				
//				//本地关注车辆
//				if(concernCarService.findOne(plate_no, plate_type)){
//					tag.add("本地关注车辆");
//				}
//				if(lkCarService.findOne(plate_no, plate_type)){
//					tag.add("临时布控车辆");
//				}
//				//修改clhc_tag
//				jwtCarService.updateTag(plate_no, plate_type, tag.toString().substring(1,tag.toString().length()-1));
//			}
//	        b = true;
//		}
//        
//    }
//    
//    private String nowTime() {
//        return DateFormatUtils.format(new Date(), "yyyy-MM-dd HH:mm:ss");
//    }
//    
//    /**
//     * 获取hbase返回数据map(plate,tag)
//     * @param plate
//     * @return
//     */
//	public static Map<String, String> getTagByPlate(String plate){
//		Map<String, String> map = new HashMap<String, String>();
//		try {
//			Map<String, String> result = HBaseUtil.getResult("plate_tag", Md5Util.Md5(plate));
//			map.put(plate, result.get(Md5Util.Md5(plate)));
//		} catch (IOException e) {
//			// TODO Auto-generated catch block
//			e.printStackTrace();
//		}
//		return map;
//	}
//}
