package com.minginglamp.utils;

import com.fasterxml.jackson.databind.JsonNode;
import com.google.common.collect.Lists;
import com.google.common.collect.Maps;
import com.google.common.collect.Sets;
import com.minginglamp.model.TagParse;
import lombok.extern.java.Log;
import org.apache.commons.beanutils.PropertyUtils;
import org.apache.commons.lang.StringUtils;
import org.apache.hadoop.hbase.Cell;
import org.apache.hadoop.hbase.CellUtil;
import org.apache.hadoop.hbase.client.Get;
import org.apache.hadoop.hbase.client.HTableInterface;
import org.apache.hadoop.hbase.client.Result;
import org.apache.hadoop.hbase.util.Bytes;
import org.springframework.data.hadoop.hbase.HbaseTemplate;
import org.springframework.data.hadoop.hbase.TableCallback;
import org.springframework.util.CollectionUtils;

import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.Set;

/**
 * Created by lilongfei on 2017/5/20.
 */
@Log
public class HBaseUtils {

    public static  <T> Map<String,List<T>> get(HbaseTemplate hbaseTemplate,String tableName,
                                               final Map<String,String> keys, Class<T> cls) {
        return hbaseTemplate.execute(tableName, new TableCallback<Map<String,List<T>>>() {
            @Override
            public Map<String,List<T>> doInTable(HTableInterface table) throws Throwable {
                List<Get> gets = Lists.newArrayList();
                for (String row : keys.keySet()) {
                    Get get = new Get(Bytes.toBytes(row));
                    gets.add(get);
                }
                Result[] tableResult = table.get(gets);
                if (tableResult == null) {
                    return null;
                }
                Map<String,List<T>> map = Maps.newHashMap();
                for(Result result : tableResult){
                    if(result.getRow() != null){
                        String key = new String(result.getRow(),"UTF-8");
                        if(CollectionUtils.isEmpty(result.listCells())){
                            Object obj = cls.newInstance();
                            PropertyUtils.setProperty(obj,"tag","无资料");
                        }else{
                            Object obj = cls.newInstance();
                            List<TagParse> tagParses = Lists.newArrayList();
                            for(Cell cell : result.listCells()){
//                                log.info("field:"+new String(CellUtil.cloneQualifier(cell),"UTF-8"));
//                                log.info("value:"+new String(CellUtil.cloneValue(cell),"UTF-8"));
                                String field = new String(CellUtil.cloneQualifier(cell),"UTF-8");
                                String value = new String(CellUtil.cloneValue(cell),"UTF-8");
                                if("tag".equals(field)){
                                    if(StringUtils.isNotBlank(value)){
                                        if(JsonUtils.getNode(value) != null){
                                            Iterator<JsonNode> iterator = JsonUtils.getNode(value).elements();
                                            if(!iterator.hasNext()){
                                                TagParse tagParse = new TagParse();
                                                tagParse.setTag("无背景");
                                                tagParses.add(tagParse);
                                            }
                                            while(iterator.hasNext()){
                                                JsonNode node = iterator.next();
                                                TagParse tagParse = new TagParse();
                                                tagParse.setTag(node.findValue("tag").asText());
                                                tagParse.setTagDetail(node.toString());
                                                tagParses.add(tagParse);
                                            }
                                        }
                                    }else{
                                        TagParse tagParse = new TagParse();
                                        tagParse.setTag("无背景");
                                        tagParses.add(tagParse);
                                    }
                                    for(TagParse tagParse : tagParses){
                                        PropertyUtils.setProperty(obj,"tag",tagParse.getTag());
                                        PropertyUtils.setProperty(obj,"tagDetail",tagParse.getTagDetail());
                                        if(map.containsKey(key)){
                                            map.get(key).add((T) obj);
                                        }else{
                                            map.put(key, Lists.newArrayList((T) obj));
                                        }
                                        log.info(key+":"+obj);
                                    }
                                    obj = cls.newInstance();
                                    tagParses.clear();

                                }else{
                                    PropertyUtils.setProperty(obj,field,value);
                                }
                            }
                        }
                        keys.remove(key);
                    }
                }
                if(keys != null && !keys.isEmpty()){
                    for(String key : keys.keySet()){
                        Object obj = cls.newInstance();
                        PropertyUtils.setProperty(obj,"idCard",keys.get(key));
                        PropertyUtils.setProperty(obj,"tag","无资料");
                        if(map.containsKey(key)){
                            map.get(key).add((T) obj);
                        }else{
                            map.put(key, Lists.newArrayList((T) obj));
                        }
                    }
                }
                return map;
            }
        });
    }



    public static Map<String,Set<String>> getKeys(HbaseTemplate hbaseTemplate, String tableName, final Set<String> keys){
        return hbaseTemplate.execute(tableName, new TableCallback<Map<String,Set<String>>>() {
            @Override
            public Map<String,Set<String>> doInTable(HTableInterface hTableInterface) throws Throwable {
                List<Get> gets = Lists.newArrayList();
                for (String row : keys) {
                    Get get = new Get(Bytes.toBytes(row));
                    gets.add(get);
                }
                log.info("query:"+keys);
                Result[] tableResult = hTableInterface.get(gets);

                if (tableResult == null) {
                    return null;
                }
                Map<String,Set<String>> map = Maps.newHashMap();
                for(Result result : tableResult) {
                    log.info("row key:"+result.getRow());
                    if(result.getRow() != null){
                        String key = new String(result.getRow(), "UTF-8");
                        if (CollectionUtils.isEmpty(result.listCells())) {
                            map.put(key, null);
                        } else {
                            Set<String> columns = Sets.newHashSet();
                            for (Cell cell : result.listCells()) {
                                String field = new String(CellUtil.cloneQualifier(cell), "UTF-8");
                                columns.add(field);
                            }
                            map.put(key, columns);
                        }
                    }
                }
                return map;
            }
        });
    }
}
