package com.minginglamp.utils;

import java.io.File;
import java.io.InputStream;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.HashSet;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

import org.apache.commons.beanutils.PropertyUtils;
import org.apache.commons.lang.StringUtils;
import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.ss.usermodel.WorkbookFactory;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.fasterxml.jackson.databind.JsonNode;
import com.google.common.collect.Lists;
import com.google.common.collect.Maps;
import com.google.common.collect.Sets;
import com.minginglamp.common.PageHelper;
import com.minginglamp.model.CarCheck;
import com.minginglamp.model.LocalConcernCars;
import com.minginglamp.model.LocalConcernPersons;
import com.minginglamp.model.PersonCheck;
import com.minginglamp.model.PersonCheckLog;
import com.minginglamp.model.PlateCheckLog;
import com.minginglamp.model.RelationDetail;
import com.minginglamp.model.SfLocalPerson;
import com.minginglamp.model.TaskDetail;
import com.minginglamp.model.XfPerson;
import com.minginglamp.model.ZaPerson;
import com.minginglamp.vo.CheckDeviceListVo;
import com.minginglamp.vo.CheckPersonListVo;
import com.minginglamp.vo.CheckPlateListVo;
import com.minginglamp.vo.CountCheckLogVo;
import com.minginglamp.vo.CountpersonCheckLogDeptVo;
import com.minginglamp.vo.PersonCarVo;

import lombok.extern.java.Log;

/**
 * Created by lilongfei on 2017/5/20.
 */
@Log
public class ExcelOperations {

    static Logger logger = LoggerFactory.getLogger(ExcelOperations.class.getName());

    
    /**
     * 读取excel
     * @param schemas excel对应类描述
     * @param cls excel对应类
     * @param inputStream excel数据流
     * @param from 起始数据行
     * @param <T>
     * @return
     * @throws Exception
     * lilongfei ---2017-07-07
     */
    public static <T> List<T> readrcExcel(String[] schemas, Class<?> cls, InputStream inputStream,int from) throws Exception{
        Workbook wb = WorkbookFactory.create(inputStream);
        Sheet sheet = wb.getSheetAt(0);
        List<T> list = new ArrayList<>();
        for(Row row : sheet){
            if(row.getRowNum() > from){
                int end = row.getLastCellNum();
                int begin = row.getFirstCellNum();
                T t = (T) cls.newInstance();
                for(int i = begin ; i < end ; i++){
                    Cell cell = row.getCell(i);
                    if(cell!=null)
                    {
                    switch (cell.getCellTypeEnum()) {
                        case STRING:
                            PropertyUtils.setProperty(t,schemas[i],cell.getRichStringCellValue().getString().trim());
                            break;
                        case NUMERIC:
                            PropertyUtils.setProperty(t,schemas[i],cell.getNumericCellValue());
                            break;
                        case BOOLEAN:
                            PropertyUtils.setProperty(t,schemas[i],cell.getBooleanCellValue());
                            break;
                        case FORMULA:
                            PropertyUtils.setProperty(t,schemas[i],cell.getCellFormula());
                            break;
                    }
                  }
                }
                list.add(t);
            }
        }
        return list;
    }
    
    public static List<String[]> readRCExcelFile(InputStream inputStream){
        try{
            Workbook wb = WorkbookFactory.create(inputStream);
            Sheet sheet = wb.getSheetAt(0);
            
            List<String[]> datas= new ArrayList<String[]>();
            for(Row row : sheet){
                logger.info("row index:"+row.getRowNum());
                if(row.getRowNum() != 0) {
                	int cells = row.getPhysicalNumberOfCells();
                	String[] data=new String[cells];
                	for (int j = 0;j < cells; j++) {
                			   data[j] = ("").equals(row.getCell(j).getStringCellValue())?"":row.getCell(j).getStringCellValue();
                }
            	datas.add(data);
            }
            }
            logger.info("excel data:" + datas);
            return datas;
        }catch (Exception e){
            logger.error("excel 解析失败");
            return null;
        }
    }
   
   
    public static List<String> readExcelFile(InputStream inputStream){
        try{
            Workbook wb = WorkbookFactory.create(inputStream);
            Sheet sheet = wb.getSheetAt(0);

            List<String> datas = Lists.newArrayList();
            for(Row row : sheet){
                logger.info("row index:"+row.getRowNum());
                if(row.getRowNum() != 0) {
                    datas.add(row.getCell(0).getStringCellValue());
                }
            }
            logger.info("excel data:" + datas);
            return removeDuplicateWithOrder(datas);
        }catch (Exception e){
            logger.error("excel 解析失败");
            return null;
        }
    }
    

    public static Map<String,Object> parseIdCard(List<String> origin){

        Map<String,Object> counts = Maps.newHashMap();
        if(origin == null){
            counts.put("success",0);
            counts.put("failed",0);
            counts.put("data",null);
            return counts;
        }else{
            int success = 0;
            int failed = 0;
            List<String> data = Lists.newArrayList();
            for(String idCard:origin){
                if(new IdcardValidator().isValidatedAllIdcard(idCard)) 
                {
                	success +=1;data.add(idCard);
                } 
                else 
                {
                	failed += 1;
                }
            }
//            log.info("check success:"+data);
            counts.put("success",success);
            counts.put("failed",failed);
            counts.put("data",data);
            return counts;
        }
    }

    public static Workbook writeExcel(String template,List<TaskDetail> details,List<RelationDetail> relationDetails) throws Exception {
        Workbook wb = WorkbookFactory.create(new File(template));
//        log.info(wb.getSheetName(0));
//        log.info(wb.getSheetName(1));
        Sheet sheet1 = wb.getSheetAt(0);
//        log.info(sheet1.getSheetName());
        Sheet sheet2 = wb.getSheetAt(1);
//        log.info(sheet2.getSheetName());

        String[] s1 = {"name","idCard","sex","nation","birthday","birthplace","tag","source","info","fields"};
        String[] s11 = {"tag","source","info","fields"};
        String idCard = "";
        int row = 1;
        for(TaskDetail taskDetail : details){
            int index = 0;
            Row row1 = sheet1.createRow(row);
//            log.info("excel:"+taskDetail.getTagDetail());
            if(idCard.equals((PropertyUtils.getProperty(taskDetail,"idCard")))){
                for(String s : s11){
                    if("fields".equals(s)){
                        Object value = PropertyUtils.getProperty(taskDetail,s);
//                        log.info(value == null ? "" : value.toString());
                        row1.createCell(index + 6).setCellValue(value == null ? "" : combindField(value.toString()));
                    }else{
                        Object value = PropertyUtils.getProperty(taskDetail,s);
                        row1.createCell(index + 6).setCellValue(value == null ? "" : value.toString());
                    }
                    index ++;
                }
            }else{
                idCard = PropertyUtils.getProperty(taskDetail,"idCard").toString();
                for(String s : s1){
                    if("fields".equals(s)){
                        Object value = PropertyUtils.getProperty(taskDetail,s);
//                        log.info(value == null ? "" : value.toString());
                        row1.createCell(index).setCellValue(value == null ? "" : combindField(value.toString()));
                    }else{
                        Object value = PropertyUtils.getProperty(taskDetail,s);
                        row1.createCell(index).setCellValue(value == null ? "" : value.toString());
                    }
                    index ++;
                }
            }
            row++;
        }

        int rowNum2 = 1;
        String[] s2 = {"relationName","relationCard","name","idCard","sex","nation","birthday","birthplace","tag","source","info","fields"};
        for(RelationDetail relationDetail : relationDetails){
            int index = 0;
            Row row2 = sheet2.createRow(rowNum2);
            for(String s : s2){
                if("fields".equals(s)){
                    Object value = PropertyUtils.getProperty(relationDetail,s);
                    row2.createCell(index + 6).setCellValue(value == null ? "" : combindField(value.toString()));
                }else{
                    Object value = PropertyUtils.getProperty(relationDetail,s);
                    row2.createCell(index).setCellValue(value == null ? "" : value.toString());
                }
                index ++;
            }
            rowNum2 ++;
        }
        return wb;

    }

    //PageHelper pageHelper List<PersonCheck> personChecks
    public static Workbook writePersonExcel(String template,PageHelper pageHelper) throws Exception {
        Workbook wb = WorkbookFactory.create(new File(template));
        List<PersonCheck> personChecks = (List<PersonCheck>)pageHelper.getResult();
        Sheet sheet = wb.getSheetAt(0);
        int rowNum = 1;
        String[] s1 = {"name","idcardNo","sex","personcsrq","national", "checkTime","ucode", "policeName","pcode","policePhone","checkAddress","checkReason","checkSource"};

        for(PersonCheck personCheck : personChecks){
            int index = 0;
            Row row1 = sheet.createRow(rowNum);
            for(String s : s1){
            	Object value = PropertyUtils.getProperty(personCheck,s);
            	row1.createCell(index).setCellValue(value == null ? "" : value.toString());
                index ++;
            }
            rowNum ++;
        }
        return wb;
    }
    
    public static Workbook writePersonCheckLogExcel(String template,List<PersonCheckLog> personCheckLogList) throws Exception {
        Workbook wb = WorkbookFactory.create(new File(template));
        Sheet sheet = wb.getSheetAt(0);
        int rowNum = 1;
        // 预警列
        // 核查来源
        String[] s1 = {"name","sfzh","sex","nation","policename", "policeno","policephone","checkdept", "checkaddress","createTime","source","pushResult","pushTaget","tags","personType","birthplace","lgdw"};
        //遍历集合存到excel中
        for(PersonCheckLog personCheckLog : personCheckLogList){
            int index = 0;
            Row row1 = sheet.createRow(rowNum);
            for(String s : s1){
            	Object value = PropertyUtils.getProperty(personCheckLog,s);
            	row1.createCell(index).setCellValue(value == null ? "" : value.toString());
                index ++;
            }
            rowNum ++;
        }
        return wb;
    }
    public static Workbook writeXfPersonCheckExcel(String template,List<XfPerson> xfPersonList) throws Exception {
        Workbook wb = WorkbookFactory.create(new File(template));
        Sheet sheet = wb.getSheetAt(0);
        int rowNum = 1;
        // 预警列
        // 核查来源
        String[] s1 = {"name","cardno","sex","birthday", "nation","areacode", "sysdate","dubious","isdispatched","checkresult","stationname"};
        //遍历集合存到excel中
        for(XfPerson xfPerson : xfPersonList){
            int index = 0;
            Row row1 = sheet.createRow(rowNum);
            for(String s : s1){
            	Object value = PropertyUtils.getProperty(xfPerson,s);
            	row1.createCell(index).setCellValue(value == null ? "" : value.toString());
                index ++;
            }
            rowNum ++;
        }
        return wb;
    }
    
    public static Workbook writeZaPersonCheckExcel(String template,List<ZaPerson> zaPersonList) throws Exception {
        Workbook wb = WorkbookFactory.create(new File(template));
        Sheet sheet = wb.getSheetAt(0);
        int rowNum = 1;
        // 预警列
        // 核查来源
        String[] s1 = {"fname","fcardnum","fnation","fcardtype", "fcollecttype","sjly", "fregtime","faddress","fregperson","forgid","fregion","flibcode","jczbs"};
        //遍历集合存到excel中
        for(ZaPerson zaPerson : zaPersonList){
            int index = 0;
            Row row1 = sheet.createRow(rowNum);
            for(String s : s1){
            	Object value = PropertyUtils.getProperty(zaPerson,s);
            	row1.createCell(index).setCellValue(value == null ? "" : value.toString());
                index ++;
            }
            rowNum ++;
        }
        return wb;
    }
    public static Workbook writePlateCheckLogExcel(String template,List<PlateCheckLog> plateCheckLogList) throws Exception {
        Workbook wb = WorkbookFactory.create(new File(template));
        Sheet sheet = wb.getSheetAt(0);
        int rowNum = 1;
        // 预警列
        // 核查来源
        String[] s1 = {"plateNo","name","sfzh","plateType","policename","policeno","policephone","createTime","source","checkdept", "checkaddress","pushTarget","czyq","tags","birthplace","lgdw"};

        for(PlateCheckLog plateCheckLog : plateCheckLogList){
            int index = 0;
            Row row1 = sheet.createRow(rowNum);
            for(String s : s1){
            	Object value = PropertyUtils.getProperty(plateCheckLog,s);
            	row1.createCell(index).setCellValue(value == null ? "" : value.toString());
                index ++;
            }
            rowNum ++;
        }
        return wb;
    }
    //
    public static Workbook writeComparePersonExcel(String template,PageHelper pageHelper) throws Exception {
        Workbook wb = WorkbookFactory.create(new File(template));
        List<PersonCheck> personChecks = (List<PersonCheck>)pageHelper.getResult();
        Sheet sheet = wb.getSheetAt(0);
        int rowNum = 1;
        String[] s1 = {"name","idcardNo","sex","national", "checkTime", "ucode","domicile","policeName","pcode","policePhone","checkAddress","checkReason","checkSource","ryhcTag","personneltype"};

        for(PersonCheck personCheck : personChecks){
            int index = 0;
            Row row1 = sheet.createRow(rowNum);
            for(String s : s1){
            	Object value = PropertyUtils.getProperty(personCheck,s);
            	row1.createCell(index).setCellValue(value == null ? "" : value.toString());
                index ++;
            }
            rowNum ++;
        }
        return wb;
    }
    
    public static Workbook writeLocalPersonExcel(String template,PageHelper pageHelper) throws Exception {
        Workbook wb = WorkbookFactory.create(new File(template));
        List<LocalConcernPersons> localConcernPersons =(List<LocalConcernPersons>)pageHelper.getResult(); 
        Sheet sheet = wb.getSheetAt(0);
        int rowNum = 1;
        String[] s1 = {"dataType","idcardNo","name","sex","national","hjdqPlace","hjdqAddress","xzPlace","xzAddress","lgPlace","bdEndtime"};
        for(LocalConcernPersons LocalConcernPerson : localConcernPersons){
            int index = 0;
            Row row1 = sheet.createRow(rowNum);
            for(String s : s1){
            	Object value = PropertyUtils.getProperty(LocalConcernPerson,s);
            	row1.createCell(index).setCellValue(value == null ? "" : value.toString());
                index ++;
            }
            rowNum ++;
        }
        return wb;
    }
    
    public static Workbook writeLocalPersonsExcel(String template,PageHelper pageHelper) throws Exception {
        Workbook wb = WorkbookFactory.create(new File(template));
        List<SfLocalPerson> sfLocalPersons =(List<SfLocalPerson>)pageHelper.getResult(); 
        Sheet sheet = wb.getSheetAt(0);
        int rowNum = 1;
        String[] s1 = {"fdataType","fssyj","fgmsfhm","fxm","fxbdm","fmzdm","fhjdzSsxqdm","fhjdzQhnxxdz","flgdw","fssyj","fdealtype","fdeadline","finputperson","sysdate"};
        for(SfLocalPerson sfLocalPerson : sfLocalPersons){
            int index = 0;
            Row row1 = sheet.createRow(rowNum);
            for(String s : s1){
            	Object value = PropertyUtils.getProperty(sfLocalPerson,s);
            	row1.createCell(index).setCellValue(value == null ? "" : value.toString());
                index ++;
            }
            rowNum ++;
        }
        return wb;
    }
    
    public static Workbook writeLocalCarExcel(String template,PageHelper pageHelper) throws Exception {
        Workbook wb = WorkbookFactory.create(new File(template));
        @SuppressWarnings("unchecked")
		List<LocalConcernCars> localConcernCars =(List<LocalConcernCars>)pageHelper.getResult(); 
        Sheet sheet = wb.getSheetAt(0);
        int rowNum = 1;
        String[] s1 = {"dataType","reason","ownerName","ownerIdcardNo","plateNo","plateType","hjdqPlace","hjdqAddress","xzPlace","reason","dealRequest","bdEndtime","importName","importTime"};

        for(LocalConcernCars localCars : localConcernCars){
            int index = 0;
            Row row1 = sheet.createRow(rowNum);
            for(String s : s1){
            	Object value = PropertyUtils.getProperty(localCars,s);
            	row1.createCell(index).setCellValue(value == null ? "" : value.toString());
                index ++;
            }
            rowNum ++;
        }
        return wb;
    }
    
    public static Workbook writeCarExcel(String template,List<CarCheck> carChecks) throws Exception {
        Workbook wb = WorkbookFactory.create(new File(template));
        Sheet sheet = wb.getSheetAt(0);
        int rowNum = 1;
        String[] s1 = {"plateType","plateNo","carBrand","plateType","bodyColor","ownerName","ownerIdcardNo","checkTime","ucode","policeName","pcode","policePhone","checkAddress","checkReason","checkSource"};
        for(CarCheck carCheck : carChecks){
            int index = 0;
            Row row1 = sheet.createRow(rowNum);
            for(String s : s1){
            	Object value = PropertyUtils.getProperty(carCheck,s);
            	row1.createCell(index).setCellValue(value == null ? "" : value.toString());
                index ++;
            }
            rowNum ++;
        }
        return wb;
    }
    //List<CarCheck> carChecks
    public static Workbook writeCompareCarExcel(String template,PageHelper pageHelper) throws Exception {
        Workbook wb = WorkbookFactory.create(new File(template));
        List<CarCheck> carChecks = (List<CarCheck>)pageHelper.getResult();
        Sheet sheet = wb.getSheetAt(0);
        int rowNum = 1;
        String[] s1 = {"carBrand","plateNo","plateType","bodyColor","ownerName","ownerIdcardNo","checkTime","ucode","policeName","pcode","policePhone","checkAddress","checkSource","clchTag","dataType"};
        for(CarCheck carCheck : carChecks){
            int index = 0;
            Row row1 = sheet.createRow(rowNum);
            for(String s : s1){
            	Object value = PropertyUtils.getProperty(carCheck,s);
            	row1.createCell(index).setCellValue(value == null ? "" : value.toString());
                index ++;
            }
            rowNum ++;
        }
        return wb;
    }
    
    private static String combindField(String fields){
        JsonNode jsonNode = JsonUtils.getNode(fields);
        if(jsonNode != null){
            Iterator<Map.Entry<String, JsonNode>> fs = jsonNode.fields();
            StringBuilder stringBuilder = new StringBuilder();
            while (fs.hasNext()){
                Map.Entry<String, JsonNode> entry =  fs.next();
                stringBuilder.append(entry.getKey());
                stringBuilder.append(":");
                stringBuilder.append(entry.getValue().asText());
                stringBuilder.append(",");
            }
            stringBuilder.delete(stringBuilder.length()-1,stringBuilder.length());
            
            return stringBuilder.toString();
           
        }else{
            return "";
        }

    }

    //ArrayList排重
    public static List removeDuplicateWithOrder(List list) {
        HashSet set = Sets.newHashSet();
        List newList = Lists.newArrayList();
        for (Iterator iter = list.iterator(); iter.hasNext();) {
            Object element = iter.next();
            if (set.add(element))
                newList.add(element);
        }
        return newList;
    }
    
    public static Workbook writePersonInfoFindExcel(String template,List<List<PersonCarVo>> personCarList) throws Exception {
        Workbook wb = WorkbookFactory.create(new File(template));
        Sheet sheet = wb.getSheetAt(0);
        int rowNum = 1;
        List<PersonCarVo> personList = personCarList.get(0);
        personList.add(personCarList.get(2).get(0));
        for(PersonCarVo personCarVo : personList){
            Row row = sheet.createRow(rowNum);
            row.createCell(0).setCellValue(personCarVo.getCodeName());
            row.createCell(1).setCellValue(personCarVo.getCountQp());
            row.createCell(2).setCellValue(personCarVo.getCountQpCompare());
            rowNum ++;
        }
        
        return wb;
    }
    
    public static Workbook writeDomicileCountExcel(String template,List<PersonCarVo> personCarList) throws Exception {
        Workbook wb = WorkbookFactory.create(new File(template));
        Sheet sheet = wb.getSheetAt(0);
        int rowNum = 1;
        for(PersonCarVo personCarVo : personCarList){
            Row row = sheet.createRow(rowNum);
            row.createCell(0).setCellValue(personCarVo.getCodeName());
            row.createCell(1).setCellValue(personCarVo.getCountQp());
            row.createCell(2).setCellValue(personCarVo.getCountQpCompare());
            rowNum ++;
        }
        
        return wb;
    }
    
	public static Workbook writeCountCheckdeptExcel(String template, List<CountpersonCheckLogDeptVo> list, String codes,
			String columNames, String source) throws Exception {
		Workbook wb = WorkbookFactory.create(new File(template));
		Sheet sheet = wb.getSheetAt(0);
		String[] codeList = codes.split(",");
		String[] columNameList = columNames.split(",");

		Map<String, String> columMap = new HashMap<String, String>();
		if (StringUtils.isNotBlank(source) && (source.equals("jj") || source.equals("jcz"))) {
			columMap.put("name", "核查点位");
		} else if (StringUtils.isNotBlank(source) && (source.equals("zj"))) {
			columMap.put("name", "核查地点");
			columMap.put("jzCount", "进站数");
			columMap.put("czCount", "出站数");
		} else {
			columMap.put("name", "核查单位");
		}
		columMap.put("checkCount", "核查数");
		columMap.put("comparCount", "比中数");
		columMap.put("warnCount", "预警数");
		columMap.put("skCount", "涉恐数");
		columMap.put("swCount", "涉稳数");
		columMap.put("sdCount", "涉毒数");
		columMap.put("sfCount", "上访数");
		columMap.put("ztCount", "在逃数");
		columMap.put("sjCount", "涉疆数");
		columMap.put("dqCount", "大庆关注数");
		columMap.put("deviceCount", "设备数");
		

		Row row = sheet.createRow(0);
		for (int i = 0; i < columNameList.length; i++) {
			if (columMap.containsKey(columNameList[i])) {
				row.createCell(i).setCellValue(columMap.get(columNameList[i]));
			}
		}

		Map<String, String> codeMap = new HashMap<String, String>();
		for (String code : codeList) {
			codeMap.put(code, code);
		}

		int rowNum = 1;
		for (CountpersonCheckLogDeptVo countpersonCheckLogDeptVo : list) {
			int index = 0;
			if (StringUtils.isBlank(countpersonCheckLogDeptVo.getCode())
					|| codeMap.containsKey(countpersonCheckLogDeptVo.getCode())) {
				Row row1 = sheet.createRow(rowNum);
				for (String s : columNameList) {
					Object value = PropertyUtils.getProperty(countpersonCheckLogDeptVo, s);
					row1.createCell(index).setCellValue(value == null ? "" : value.toString());
					index++;
				}
				rowNum++;
			}
		}

		return wb;
	}

	public static Workbook writeCountCheckSubDeptExcel(String template, List<CountCheckLogVo> list, String type)
			throws Exception {
		Workbook wb = WorkbookFactory.create(new File(template));
		Sheet sheet = wb.getSheetAt(0);

		String countName = "数量";
		if (type.equals("checkCount")) {
			countName = "核查数";
		} else if (type.equals("comparCount")) {
			countName = "比重数";
		} else if (type.equals("warnCount")) {
			countName = "预警数";
		} else if (type.equals("ztCount")) {
			countName = "在逃数";
		} else if (type.equals("skCount")) {
			countName = "涉恐数";
		} else if (type.equals("swCount")) {
			countName = "涉稳数";
		} else if (type.equals("sdCount")) {
			countName = "涉毒数";
		} else if (type.equals("sjCount")) {
			countName = "涉疆数";
		} else if (type.equals("sfCount")) {
			countName = "涉访数";
		}else if (type.equals("dqCount")) {
			countName = "大庆关注数";
		}
		Row row = sheet.createRow(0);
		row.createCell(0).setCellValue("核查单位");
		row.createCell(1).setCellValue(countName);

		int rowNum = 1;
		for (CountCheckLogVo countCheckLogVo : list) {
			Row row1 = sheet.createRow(rowNum);
			row1.createCell(0).setCellValue(countCheckLogVo.getName());
			row1.createCell(1).setCellValue(countCheckLogVo.getCount());
			rowNum++;
		}

		return wb;
	}

	public static Workbook writeCountCheckDeviceExcel(String template, List<CheckDeviceListVo> list) throws Exception {
		Workbook wb = WorkbookFactory.create(new File(template));
		Sheet sheet = wb.getSheetAt(0);

		Row row = sheet.createRow(0);
		row.createCell(0).setCellValue("警员警号");
		row.createCell(1).setCellValue("警员姓名");
		row.createCell(2).setCellValue("警员手机号");
		row.createCell(3).setCellValue("核录人数");

		int rowNum = 1;
		for (CheckDeviceListVo checkDeviceListVo : list) {
			Row row1 = sheet.createRow(rowNum);
			row1.createCell(0).setCellValue(checkDeviceListVo.getPoliceNo());
			row1.createCell(1).setCellValue(checkDeviceListVo.getPoliceName());
			row1.createCell(2).setCellValue(checkDeviceListVo.getPolicePhone());
			row1.createCell(3).setCellValue(checkDeviceListVo.getCount());
			rowNum++;
		}

		return wb;
	}

	public static Workbook writePersonWarnDetailExcel(String template, List<CheckPersonListVo> list, String source) throws Exception {
		Workbook wb = WorkbookFactory.create(new File(template));
		Sheet sheet = wb.getSheetAt(0);
		int rowNum = 1;
		if (StringUtils.isNotBlank(source) && source.equals("xfj")) {
			String[] s1 = { "personType", "name", "sfzh", "sex", "nation", "hjdPlace", "createTime", "checkdept", "checkPlace"};
			for (CheckPersonListVo vo : list) {
				int index = 0;
				Row row1 = sheet.createRow(rowNum);
				for (String s : s1) {
					Object value = PropertyUtils.getProperty(vo, s);
					row1.createCell(index).setCellValue(value == null ? "" : value.toString());
					index++;
				}
				rowNum++;
			}
		} else {
			String[] s1 = { "personType", "name", "sfzh", "sex", "nation", "hjdPlace", "createTime", "checkdept", "policeName",
					"policephone", "checkAddress", "checkPlace"};
			for (CheckPersonListVo vo : list) {
				int index = 0;
				Row row1 = sheet.createRow(rowNum);
				for (String s : s1) {
					Object value = PropertyUtils.getProperty(vo, s);
					row1.createCell(index).setCellValue(value == null ? "" : value.toString());
					index++;
				}
				rowNum++;
			}
		}
		

		
		return wb;
	}

	public static Workbook writePlateWarnDetailExcel(String template, List<CheckPlateListVo> list) throws Exception {
		Workbook wb = WorkbookFactory.create(new File(template));
		Sheet sheet = wb.getSheetAt(0);
		int rowNum = 1;
		String[] s1 = { "tags", "plateNo", "name", "plateType", "sfzh", "createTime", "checkAddress", "checkdept",
				"policeName", "policephone", "checkPlace" };

		for (CheckPlateListVo vo : list) {
			int index = 0;
			Row row1 = sheet.createRow(rowNum);
			for (String s : s1) {
				Object value = PropertyUtils.getProperty(vo, s);
				row1.createCell(index).setCellValue(value == null ? "" : value.toString());
				index++;
			}
			rowNum++;
		}
		return wb;
	}

  
}
