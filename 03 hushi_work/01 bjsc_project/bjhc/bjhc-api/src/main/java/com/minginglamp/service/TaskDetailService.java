package com.minginglamp.service;

import com.google.common.collect.Lists;
import com.google.common.collect.Maps;
import com.minginglamp.crud.RelationDetailCrud;
import com.minginglamp.crud.TaskDetailCrud;
import com.minginglamp.crud.TaskDetailMapper;
import com.minginglamp.model.RelationDetail;
import com.minginglamp.model.TaskDetail;
import com.minginglamp.utils.RelationMap;
import lombok.extern.java.Log;
import org.apache.commons.codec.digest.DigestUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;

/**
 * Created by lilongfei on 2017/5/20.
 */
@Log
@Service
public class TaskDetailService {

    @Autowired
    private TaskDetailCrud taskDetailCrud;

    @Autowired
    private TaskDetailMapper taskDetailMapper;

    @Autowired
    private RelationDetailCrud relationDetailCrud;

    public List<TaskDetail> findByJobId(int jobId){
        return taskDetailMapper.findTaskDetail(jobId);
    }

    public List<TaskDetail> findByTagAndJob(String tag,int jobId){
        List<String> taglist = Lists.newArrayList();
        if (tag.contains(","))  {
            Arrays.stream(tag.split(",")).forEach(s->taglist.add(RelationMap.map.get(s)));
        } else {
        	String aa = RelationMap.map.get(tag);
            taglist.add(RelationMap.map.get(tag));
        }
      //  log.info("taglist:"+taglist.toString());
        Map<String,Object> map = Maps.newHashMap();
        map.put("jobId",jobId);
        map.put("tags",taglist);
        return taskDetailMapper.findTaskByTagAndJobId(map);
    }

    public Map<String,Object> findByCard(int jobId,String idCard){
      //  log.info(jobId+"---------"+idCard);
        Map<String,Object> result = Maps.newHashMap();
        result.put("person",taskDetailCrud.findByIdCardAndJobId(idCard, jobId));
        result.put("relation",relationDetailCrud.findByJobIdAndRelationCardMd5(jobId,
                DigestUtils.md5Hex(idCard).toUpperCase()));
      //  log.info(result.toString());
        return result;
    }

    public List<RelationDetail> findRelationByJobId(int jobId){
        return relationDetailCrud.findByJobId(jobId);
    }

    public List<TaskDetail> findDetailsByCard(int jobId,String idCard){
        return taskDetailMapper.findTaskByCard(jobId,idCard);
    }

    public List<TaskDetail> findAllByJobId(int jobId){
        return taskDetailCrud.findByJobId(jobId);
    }
}
