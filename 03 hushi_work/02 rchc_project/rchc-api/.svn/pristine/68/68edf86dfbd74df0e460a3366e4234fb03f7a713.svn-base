//package com.minginglamp.service;
//
//import java.io.IOException;
//import java.util.Date;
//import java.util.HashMap;
//import java.util.HashSet;
//import java.util.List;
//import java.util.Map;
//
//import org.apache.commons.lang.time.DateFormatUtils;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.scheduling.annotation.Scheduled;
//import org.springframework.stereotype.Component;
//import org.springframework.stereotype.Service;
//
//import com.alibaba.fastjson.JSONObject;
//import com.minginglamp.utils.HBaseUtil;
//import com.minginglamp.utils.Md5Util;
//
//import lombok.extern.java.Log;
//
//@Service
//@Log
//@Component
////@EnableScheduling
//public class RyhcService {
//
//	@Autowired
//	JwtPersonService jwtPersonService;
//
//	@Autowired
//	PersonTagInfoService personTagInfoService;
//	
//	@Autowired 
//	ConcernPersonService concernPersonService;
//	
//	@Autowired
//	LKPersonService lkPersonService;
//
//	boolean boo = true;
//	int i = 0;
//
//	@Scheduled(cron = "${job.every5minute.cron}")
//	public void everySecond() throws Exception {
//		if (boo) {
//			boo = false;
//			System.out.println("人第" + (++i) + "次调用，每秒任务，当前时间：" + nowTime());
//			log.info("第" + (++i) + "次调用，每秒任务，当前时间：" + nowTime());
//			List<String> selectIdcard = jwtPersonService.selectIdcard();
//			for (int j = 0; j < selectIdcard.size(); j++) {
//				String sfzh = selectIdcard.get(j);
//				System.out.println(sfzh);
//				HashSet<String> tag = new HashSet<String>();
//				// 获取hbase返回数据
//				Map<String, String> tagByIdcard = getTagByIdcard(sfzh);
//
//				// 如果有数据
//				if (tagByIdcard.get(sfzh) != "") {
//					// 解析tag
//					List<Object> jsonObject = JSONObject.parseArray(tagByIdcard
//							.get(sfzh));
//					System.out.println("删除之前所查");
//					personTagInfoService.delete(sfzh);
//					for (int z = 0; z < jsonObject.size(); z++) {
//						// 添加info数据
//						System.out.println("添加info数据");
//						personTagInfoService.add(sfzh, ((JSONObject) jsonObject
//								.get(z)).get("tag").toString(),
//								jsonObject.get(z).toString());
//						// 记录标签
//						tag.add(((JSONObject) jsonObject.get(z)).get("tag")
//								.toString());
//					}
//					// 修改clhc_flag
//					jwtPersonService.updateFlag(sfzh);
//					
//				} 
//				
//				//本地关注人员
//				if(concernPersonService.findOne(sfzh)){
//					tag.add("本地关注人员");
//				}
//				if(lkPersonService.findOne(sfzh)){
//					tag.add("临时布控人员");
//				}
//				// 修改clhc_tag
//				jwtPersonService.updateTag(
//						sfzh,
//						tag.toString().substring(1,
//								tag.toString().length() - 1));
//			}
//			boo = true;
//		}
//	}
//
//	private String nowTime() {
//		return DateFormatUtils.format(new Date(), "yyyy-MM-dd HH:mm:ss");
//	}
//
//	public static Map<String, String> getTagByIdcard(String sfzh) {
//		Map<String, String> map = new HashMap<String, String>();
//		try {
//			Map<String, String> result = HBaseUtil.getResult("person_tag",
//					Md5Util.Md5(sfzh));
//			map.put(sfzh, result.get(Md5Util.Md5(sfzh)));
//		} catch (IOException e) {
//			// TODO Auto-generated catch block
//			e.printStackTrace();
//		}
//		return map;
//	}
//}
