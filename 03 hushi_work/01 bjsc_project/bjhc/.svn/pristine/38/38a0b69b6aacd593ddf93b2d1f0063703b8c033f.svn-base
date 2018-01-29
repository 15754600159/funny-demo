package com.minginglamp.crud;

import com.minginglamp.model.TaskInfo;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

/**
 * Created by lilongfei on 2017/5/20.
 */
public interface TaskInfoCrud extends JpaRepository<TaskInfo,Integer>{

    int deleteByIdAndUserId(int id,String userId);

    TaskInfo findByUserIdAndId(String userId,int jobId);
}
