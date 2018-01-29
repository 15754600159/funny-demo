package com.minginglamp.service;

import com.google.common.collect.Lists;
import com.minginglamp.crud.TaskDataCrud;
import com.minginglamp.crud.TaskInfoCrud;
import com.minginglamp.crud.TaskInfoMapper;
import com.minginglamp.model.TaskData;
import com.minginglamp.model.TaskInfo;
import com.minginglamp.utils.JsonUtils;
import org.apache.commons.lang.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.CollectionUtils;

import java.util.*;

/**
 * Created by lilongfei on 2017/5/20.
 */
@Service
public class TaskInfoService {

    @Autowired
    private TaskInfoCrud taskInfoCrud;

//   @Autowired
//    private StringRedisTemplate stringRedisTemplate;

    @Autowired
    private TaskDataCrud taskDataCrud;

    @Autowired
    private TaskInfoMapper taskInfoMapper;

    public List<TaskInfo> findById(String sessionId) throws Exception {
//     String json = stringRedisTemplate.opsForValue().get(sessionId);
//        if(StringUtils.isBlank(json)){
//            throw new Exception("login deny");
//        }
//     String userId = JsonUtils.getjsonvalue(json,"1").asText();
        return taskInfoMapper.findByUserIdAndStatus("1",1);
    }

    public List<TaskInfo>  findByName(String sessionId,String name) throws Exception {
//        String json = stringRedisTemplate.opsForValue().get(sessionId);
//        if(StringUtils.isBlank(json)){
//            throw new Exception("login deny");
//        }
//        String userId = JsonUtils.getjsonvalue(json,"userId").asText();
        return taskInfoMapper.findByName("1",1,name);
    }

    @Transactional
    public int deleteById(String sessionId,int id) throws Exception {
//        String json = stringRedisTemplate.opsForValue().get(sessionId);
//        if(StringUtils.isBlank(json)){
//            throw new Exception("login deny");
//        }
//        String userId = JsonUtils.getjsonvalue(json,"userId").asText();
        return taskInfoCrud.deleteByIdAndUserId(id,"1");
    }

    @Transactional
    public TaskInfo save(String name,int count,String sessionId,String seq) throws Exception {

        TaskInfo taskInfo = new TaskInfo();
        taskInfo.setName(name);
//        String json = stringRedisTemplate.opsForValue().get(sessionId);
//        if(StringUtils.isBlank(json)){
//            throw new Exception("login deny");
//        }
//        String userId = JsonUtils.getjsonvalue(json,"userId").asText();
//        String userName = JsonUtils.getjsonvalue(json,"userName").asText();

        taskInfo.setUserId("1");
        taskInfo.setUserName("admin");
        taskInfo.setUpCount(count);
        taskInfo.setStatus(1);
        taskInfo.setSeq(seq);
        taskInfo.setFinish(0);
        return taskInfoCrud.save(taskInfo);
    }

    public String saveTaskData(List<String> list){
        List<TaskData> datas = Lists.newArrayList();
        String seq = UUID.randomUUID().toString();
        list.forEach(s -> {
            TaskData taskData = new TaskData();
            taskData.setIdCard(s);
            taskData.setSeq(seq);
            datas.add(taskData);
        });
        List<TaskData> results = taskDataCrud.save(datas);
        if(CollectionUtils.isEmpty(results)){
            return null;
        }else{
            return seq;
        }
    }

    public TaskInfo findByUserIdAndId(int jobId,String sessionId) throws Exception {
//        String json = stringRedisTemplate.opsForValue().get(sessionId);
//        if(StringUtils.isBlank(json)){
//            throw new Exception("login deny");
//        }
//        String userId = JsonUtils.getjsonvalue(json,"userId").asText();
        return taskInfoCrud.findByUserIdAndId("1",jobId);
    }
}
