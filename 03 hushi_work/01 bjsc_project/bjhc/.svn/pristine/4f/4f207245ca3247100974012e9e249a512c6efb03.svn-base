package com.minginglamp.crud;

import com.minginglamp.model.TaskData;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

/**
 * Created by lilongfei on 2017/5/20.
 */
public interface TaskDataCrud extends JpaRepository<TaskData,Integer>{

    List<TaskData> getBySeq(String seq);
}
