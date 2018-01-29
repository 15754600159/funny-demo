package com.minginglamp.service;

import com.google.common.collect.Lists;
import com.google.common.collect.Maps;
import com.google.common.collect.Sets;
import com.minginglamp.crud.RelationDetailCrud;
import com.minginglamp.crud.TaskDataCrud;
import com.minginglamp.crud.TaskDetailCrud;
import com.minginglamp.crud.TaskInfoCrud;
import com.minginglamp.model.RelationDetail;
import com.minginglamp.model.TaskData;
import com.minginglamp.model.TaskDetail;
import com.minginglamp.model.TaskInfo;
import com.minginglamp.utils.HBaseUtil;
import com.minginglamp.utils.HBaseUtils;
import com.minginglamp.utils.Md5Util;

import lombok.extern.java.Log;

import org.apache.commons.codec.digest.DigestUtils;
import org.apache.commons.lang.StringUtils;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.hadoop.hbase.HbaseTemplate;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.CollectionUtils;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.function.Predicate;
import java.util.stream.Collectors;

/**
 * Created by lilongfei on 2017/5/22.
 */
@Log
@Service
public class TaskDataService {

    @Autowired
    private TaskDataCrud taskDataCrud;

    @Autowired
    private TaskDetailCrud taskDetailCrud;

    @Autowired
    private RelationDetailCrud relationDetailCrud;

    @Autowired
    private HbaseTemplate hbaseTemplate;

    @Autowired
    private TaskInfoCrud taskInfoCrud;

    @Value("${hbase.tag.table.name}")
    private String tagTable;

    @Value("${hbase.relation.table.name}")
    private String relationTable;

    @Transactional
    public void saveData(int jobId,String seq){
        TaskInfo taskInfo = taskInfoCrud.findOne(jobId);
        if(taskInfo.getFinish() == 0 ){
            List<TaskData> dataList = taskDataCrud.getBySeq(seq);
            Map<String,Object> result = collectData(dataList,jobId);
            List<TaskDetail> details = (List<TaskDetail>) result.get("details");
            List<RelationDetail> relations = (List<RelationDetail>) result.get("relations");
            log.info("details:"+details.toString());
            taskDetailCrud.save(details);
            log.info("relations:"+relations.toString());
            relationDetailCrud.save(relations);
            taskInfo.setFinish(1);
            taskInfoCrud.save(taskInfo);
        }
    }

    public Map<String,Object> getOne(String idCard){
        TaskData taskData = new TaskData();
        taskData.setIdCard(idCard);
        Map<String,Object> datas = collectData(Lists.newArrayList(taskData),0);
//        List<TaskDetail> taskDetails = (List<TaskDetail>) datas.get("details");
//        TaskDetail taskDetail = taskDetails.get(0);
//        for(TaskDetail t : taskDetails){
//        	log.info(t.getTag()+"   "+t.getTagDetail());
//        }
//        StringBuilder builder = new StringBuilder();
//        taskDetails.forEach(s->{
//            if(builder.indexOf(s.getTag()) == -1){
//                builder.append(s.getTag());
//                builder.append(",");
//            }
//        });
//        taskDetail.setTag(builder.delete(builder.length()-1,builder.length()).toString());
        TaskDetail taskDetail = HBaseUtil.getOneTaskDetail(tagTable,idCard);
        datas.put("details",taskDetail);
        return datas;
    }

    public Map<String,Object> collectData(List<TaskData> datas,int jobId){

        Map<String,Object> map = Maps.newHashMap();
        Map<String,String> cards = Maps.newHashMap();
        datas.stream().forEach(s->cards.put(DigestUtils.md5Hex(s.getIdCard()).toUpperCase(),s.getIdCard()));
        Map<String,Set<String>> relations = HBaseUtils.getKeys(hbaseTemplate,relationTable,cards.keySet());
        Map<String,String> querys = Maps.newHashMap();
        querys.putAll(cards);
        if(relations != null){
            relations.values().forEach(s->{
                if(!CollectionUtils.isEmpty(s)){
                    s.stream().forEach(n->{querys.put(DigestUtils.md5Hex(n).toUpperCase(),n);});
                }});
        }
        Map<String,List<TaskDetail>> allData = HBaseUtils.get(hbaseTemplate,tagTable,querys,TaskDetail.class);
        List<TaskDetail> details = Lists.newArrayList();
        List<RelationDetail> relationDetails = Lists.newArrayList();
        Set<String> relationMap = Sets.newHashSet();
        log.info("allData:"+allData);
        allData.keySet().forEach(s->{
            if(cards.containsKey(s)){
                log.info("108key:"+s);
                allData.get(s).stream().forEach(r->{
                    r.setJobId(jobId);
                    r.setIdCard(cards.get(s));
                    details.add(r);
                });
            }
        });
        if(relations != null){
            for(String card : relations.keySet()){
                relations.get(card).stream().forEach(s-> {
                    allData.get(DigestUtils.md5Hex(s).toUpperCase()).forEach(r -> {
                        RelationDetail relationDetail = new RelationDetail();
                        BeanUtils.copyProperties(r, relationDetail);
                        relationDetail.setRelationCardMd5(card);
                        relationDetail.setRelationCard(cards.get(card));
                        relationDetail.setRelationName(allData.get(card).get(0).getName());
                        relationDetail.setJobId(jobId);
                        if (StringUtils.isNotBlank(r.getTag()) && !"无背景".equals(r.getTag())&& !"无资料".equals(r.getTag())) {
                            relationMap.add(cards.get(card));
                        }
                        relationDetails.add(relationDetail);
                    });
                });
            }
        }
        log.info(relationMap.toString());
        relationMap.stream().forEach(s->{
            TaskDetail taskDetail = allData.get(DigestUtils.md5Hex(s).toUpperCase()).get(0);
            taskDetail.setJobId(jobId);
            taskDetail.setIdCard(s);
            taskDetail.setTag("亲属有记录");
            taskDetail.setTagDetail("");
            details.add(taskDetail);
        });

        map.put("details",details);
        map.put("relations",relationDetails);

        return map;
    }
}
