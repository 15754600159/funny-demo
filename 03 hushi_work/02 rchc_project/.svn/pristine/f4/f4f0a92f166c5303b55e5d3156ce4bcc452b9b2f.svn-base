package com.minginglamp.crud;

import com.minginglamp.model.TaskDetail;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

/**
 * Created by lilongfei on 2017/5/20.
 */
public interface TaskDetailCrud extends JpaRepository<TaskDetail,Integer>{

    List<TaskDetail> findByIdCardAndJobId(String idCard,int jobId);

    List<TaskDetail> findByJobId(int jobId);
}
