package com.minginglamp;

import com.google.common.collect.Lists;
import com.google.common.collect.Maps;
import com.minginglamp.model.TaskData;
import com.minginglamp.model.TaskDetail;
import com.minginglamp.utils.HBaseUtils;

import org.apache.commons.codec.digest.DigestUtils;
import org.apache.poi.openxml4j.exceptions.InvalidFormatException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.hadoop.hbase.HbaseTemplate;

import java.io.IOException;
import java.util.List;
import java.util.Map;

/**
 * Created by lilongfei on 2017/5/23.
 */
public class Teste {

    @Autowired
    private  static  HbaseTemplate hbaseTemplate;

    @Value("${hbase.tag.table.name}")
    private static  String tagTable;


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

//        String json = "{\"tag\":\"经侦黑名单\",\"fields\":{\"test\":\"测试1\"}}";
//        System.out.println(JsonUtils.getjsonvalue(json,"tag").asText());
        TaskData taskData = new TaskData();
        taskData.setIdCard("111");
        List<TaskData> datas = Lists.newArrayList(taskData);;
        Map<String,String> cards = Maps.newHashMap();
        datas.stream().forEach(s->cards.put(DigestUtils.md5Hex(s.getIdCard()).toUpperCase(),s.getIdCard()));
        Map<String,String> querys = Maps.newHashMap();
        querys.putAll(cards);
        Map<String,List<TaskDetail>> allData = HBaseUtils.get(hbaseTemplate,tagTable,querys,TaskDetail.class);
        System.out.println("allData" + allData);
    }
}