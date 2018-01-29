package com.minginglamp;

import com.fasterxml.jackson.databind.JsonNode;
import com.minginglamp.utils.ExcelOperations;
import com.minginglamp.utils.JsonUtils;
import org.apache.poi.openxml4j.exceptions.InvalidFormatException;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.ss.usermodel.WorkbookFactory;

import java.io.File;
import java.io.IOException;
import java.util.Iterator;
import java.util.List;

/**
 * Created by lilongfei on 2017/5/23.
 */
public class Test {

    public static void main(String[] args) throws IOException, InvalidFormatException {
//        Workbook wb = WorkbookFactory.create(new File("/Users/lilongfei/Desktop/template.xlsx"));
//        Sheet sheet1 = wb.getSheetAt(0);
//        System.out.println(sheet1.getSheetName());
//        Sheet sheet2 = wb.getSheetAt(1);
//        System.out.println(sheet2.getSheetName());
//        Row row1 = sheet1.getRow(1);
//        Row row2 = sheet2.getRow(2);
//        System.out.println(row2.getCell(0));

//        String json = "[{\"a\":\"1\",\"b\":\"2\",\"c\":{\"d\":\"1\"}}]";
//        Iterator<JsonNode> iterator = JsonUtils.getNode(json).iterator();
//        while(iterator.hasNext()){
//            JsonNode node = iterator.next();
//            System.out.println(node.findValue("a").asText());
//            System.out.println(node.toString());
//        }

        String json = "{\"tag\":\"经侦黑名单\",\"fields\":{\"test\":\"测试1\"}}";
        System.out.println(JsonUtils.getjsonvalue(json,"tag").asText());

    }
}