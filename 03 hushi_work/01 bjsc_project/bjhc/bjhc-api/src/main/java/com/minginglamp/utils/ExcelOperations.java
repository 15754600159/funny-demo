package com.minginglamp.utils;

import com.fasterxml.jackson.databind.JsonNode;
import com.google.common.collect.*;
import com.google.common.collect.Maps;
import com.minginglamp.model.RelationDetail;
import com.minginglamp.model.TaskDetail;

import lombok.extern.java.Log;
import org.apache.commons.beanutils.PropertyUtils;
import org.apache.poi.ss.usermodel.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.io.*;
import java.util.HashSet;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

/**
 * Created by lilongfei on 2017/5/20.
 */
@Log
public class ExcelOperations {

    static Logger logger = LoggerFactory.getLogger(ExcelOperations.class.getName());

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
                if(new IdcardValidator().isValidatedAllIdcard(idCard)) {success +=1;data.add(idCard);} else {failed += 1;}
            }
            log.info("check success:"+data);
            counts.put("success",success);
            counts.put("failed",failed);
            counts.put("data",data);
            return counts;
        }
    }

    public static Workbook writeExcel(String template,List<TaskDetail> details,List<RelationDetail> relationDetails) throws Exception {
        Workbook wb = WorkbookFactory.create(new File(template));
        log.info(wb.getSheetName(0));
        log.info(wb.getSheetName(1));
        Sheet sheet1 = wb.getSheetAt(0);
        log.info(sheet1.getSheetName());
        Sheet sheet2 = wb.getSheetAt(1);
        log.info(sheet2.getSheetName());

        String[] s1 = {"name","idCard","sex","nation","birthday","birthplace","tag","source","info","fields"};
        String[] s11 = {"tag","source","info","fields"};
        String idCard = "";
        int row = 1;
        for(TaskDetail taskDetail : details){
            int index = 0;
            Row row1 = sheet1.createRow(row);
            log.info("excel:"+taskDetail.getTagDetail());
            if(idCard.equals((PropertyUtils.getProperty(taskDetail,"idCard")))){
                for(String s : s11){
                    if("fields".equals(s)){
                        Object value = PropertyUtils.getProperty(taskDetail,s);
                        log.info(value == null ? "" : value.toString());
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
                        log.info(value == null ? "" : value.toString());
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
}
